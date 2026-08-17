/* ═══════════════════════════════════════════════════════
   HubFlow — Progress Store
   Score history, cross-app progress projection, and cloud sync.
   ═══════════════════════════════════════════════════════ */

import { MODULES, PROGRESS_RULES, HUBFLOW_PASS_SCORE_PCT, MODULE_DEPTH } from '../data/catalog.js';
import * as lpSupabase from './lp-supabase.js';
import {
  isCloudHydrated,
  reconcileHubflowProgressFromEvents,
  shouldDeferStatsDisplay,
  syncSingleApp,
  markLocalCacheBootstrapped,
  readScoreKeyBests,
  HUBFLOW_LOCAL_READY_KEY,
} from './sync-engine.js';
import { enrichHubflowContentEntry, checkLevelAdvancement } from './lp-progress-summary.js';

const PROGRESS_STORAGE_KEY = 'learnflow:progress:hubflow:v1';
const CATALOG_STORAGE_KEY = 'learnflow:catalog:hubflow:v1';
const ACTIVITY_STORAGE_KEY = 'learnflow:activity:hubflow:v1';
const STUDY_SEEN_STORAGE_KEY = 'learnflow:study-seen:hubflow:v1';
const SCORE_KEY_VERSION = ':v1';
const MAX_SCORE_HISTORY = 20;
const MAX_ACTIVITY_EVENTS = 200;
let projectionDocCache = null;

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null');
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function versionedKey(key) {
  return key + SCORE_KEY_VERSION;
}

function readScoreHistory(key) {
  const v1Key = versionedKey(key);
  const history = readJson(v1Key, []);
  if (Array.isArray(history) && history.length) return history;

  const legacy = readJson(`${key}:v2`, []);
  if (Array.isArray(legacy) && legacy.length) {
    try {
      localStorage.setItem(v1Key, JSON.stringify(legacy));
    } catch {
      /* usar legacy en memoria aunque no se persista */
    }
    return legacy;
  }
  return Array.isArray(history) ? history : [];
}

function migrateLegacyProjectionKeys() {
  const pairs = [
    ['learnflow:progress:hubflow:v1', 'learnflow:progress:hubflow:v2'],
    ['learnflow:activity:hubflow:v1', 'learnflow:activity:hubflow:v2'],
  ];
  pairs.forEach(([current, legacy]) => {
    if (localStorage.getItem(current) !== null) return;
    const old = localStorage.getItem(legacy);
    if (old !== null) {
      try {
        localStorage.setItem(current, old);
      } catch {
        /* ignore */
      }
    }
  });
}

function toIsoTimestamp(value) {
  if (typeof value !== 'string' || !value.includes('T')) return null;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : null;
}

function getAttemptTimestamp(attempt) {
  return toIsoTimestamp(attempt?.timestamp) || toIsoTimestamp(attempt?.date);
}

function createId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function getActivityProgress(activity) {
  const attempts = activity.scoreKeys.flatMap((key) =>
    readScoreHistory(key).map((attempt) => ({ ...attempt, scoreKey: key }))
  );
  const bestScorePct = attempts.reduce((best, attempt) => Math.max(best, Number(attempt.pct) || 0), 0);
  const passingTimestamps = attempts
    .filter((attempt) => Number(attempt.pct) >= activity.passScorePct)
    .map(getAttemptTimestamp)
    .filter(Boolean)
    .sort();
  const attemptTimestamps = attempts.map(getAttemptTimestamp).filter(Boolean).sort();

  // Completion requires ALL scoreKeys to have at least one passing attempt.
  // A single high score in one category no longer marks the whole activity done.
  const keysWithPass = new Set(
    attempts
      .filter((attempt) => Number(attempt.pct) >= activity.passScorePct)
      .map((attempt) => attempt.scoreKey)
  );
  const totalKeys = activity.scoreKeys.length;
  const completedKeys = activity.scoreKeys.filter((key) => keysWithPass.has(key)).length;
  const completed = totalKeys > 0 && completedKeys === totalKeys;

  return {
    completed,
    completedKeys,
    totalKeys,
    bestScorePct,
    attempts: attempts.length,
    completedAt: completed ? passingTimestamps.at(-1) || null : null,
    lastAttemptAt: attemptTimestamps.at(-1) || null,
  };
}

function invalidateProjectionCache() {
  projectionDocCache = null;
}

/** Recalcula si un item guardado (local o nube) está realmente completo según
 * la regla vigente, en vez de confiar en su flag `completed` — que puede
 * arrastrar un `true` de cuando el módulo tenía menos scoreKeys requeridas.
 * Mira solo las activityId de `rule.requiredActivities` (siempre 'practice'/
 * 'study', ver catalog.js) — `item.activities` puede traer además entradas
 * "match"/"timed" (rastreadas para la matriz/Maestría vía resolveScoreActivity,
 * no exigidas para Aprobado) que no deben contar aquí. */
function isStoredItemCompleted(contentId, item) {
  const rule = PROGRESS_RULES[contentId];
  const activities = item?.activities && typeof item.activities === 'object' ? item.activities : {};
  if (!rule) return Boolean(item?.completed);
  const requiredIds = rule.requiredActivities.map((activity) => activity.activityId);
  if (!requiredIds.length) return Boolean(item?.completed);
  const completedCount = requiredIds.filter((id) => {
    const activity = activities[id];
    return activity && (activity.totalKeys ?? 0) > 0 && activity.completedKeys === activity.totalKeys;
  }).length;
  return rule.completionRule === 'any' ? completedCount > 0 : completedCount === requiredIds.length;
}

function readProjectionDoc() {
  if (projectionDocCache) return projectionDocCache;
  reconcileHubflowProgressFromEvents();
  const doc = readJson(PROGRESS_STORAGE_KEY, null);
  if (!doc?.content) return null;

  // Poda ids fuera del catálogo vigente antes de usar el documento: lo llena el
  // cloud-merge de DeskFlow, que une filas de Supabase sin quitar contenido
  // renombrado/eliminado (ej. los vocab-pack-* del split de Vocabulary). Importa
  // sobre todo por getHubFlowProgressSummary(), que hace Math.max(computed,
  // stored) — ese Math.max es necesario para que un dispositivo nuevo vea el
  // progreso que solo existe en la nube, pero sin podar deja ganar un
  // completedContent inflado (40) sobre el real derivado de MODULES (24).
  const catalogIds = new Set(MODULES.map((module) => module.id));
  for (const contentId of Object.keys(doc.content)) {
    if (!catalogIds.has(contentId)) delete doc.content[contentId];
  }
  if (doc.summary) {
    const entries = Object.entries(doc.content);
    doc.summary = {
      ...doc.summary,
      // No confiar en `item.completed` tal cual: puede ser un flag heredado de
      // una regla de puntuación con menos scoreKeys que la vigente (ver fix en
      // mergeHubflowProgressItem). Se recalcula contra la regla actual.
      completedContent: entries.filter(([contentId, item]) => isStoredItemCompleted(contentId, item)).length,
      attemptedContent: entries.filter(([, item]) => (item?.attempts ?? 0) > 0).length,
      totalContent: MODULES.length,
    };
  }

  for (const item of Object.values(doc.content)) {
    enrichHubflowContentEntry(item);
  }
  projectionDocCache = doc;
  return doc;
}

function hasProgressSignal(item) {
  if (!item) return false;
  return Boolean(
    item.completed
    || (item.attempts ?? 0) > 0
    || (item.bestScorePct ?? 0) > 0
    || (item.progressPct ?? 0) > 0
  );
}

function mergeHubflowProgressItem(scoreDerived, projectionItem, rule) {
  if (!scoreDerived && !projectionItem) return null;
  if (!scoreDerived) return projectionItem ? { ...projectionItem } : null;
  if (!projectionItem || !hasProgressSignal(projectionItem)) return scoreDerived;

  const mergedActivities = { ...(projectionItem.activities || {}) };
  for (const [activityId, activity] of Object.entries(scoreDerived.activities || {})) {
    const existing = mergedActivities[activityId];
    if (!existing) {
      mergedActivities[activityId] = activity;
      continue;
    }
    // Los conteos de `existing` (foto vieja, de localStorage o de la nube) solo
    // son comparables con los de `activity` (recién calculados contra la regla
    // vigente) si se tomaron bajo la MISMA forma de regla — mismo totalKeys.
    // Si no coinciden, `existing` puede venir de categorías ya renombradas o
    // de un catálogo con distinto número de categorías/modos: un Math.max
    // ciego sobre totalKeys Y completedKeys por separado puede reconstruir un
    // "6 de 6" fantasma (viejo) que nunca corresponde a las 4 categorías
    // reales de hoy, marcando el módulo completo aunque falte una categoría
    // nueva sin hacer. totalKeys siempre sale del cálculo en vivo (nunca del
    // máximo con la foto vieja); completedKeys solo hereda de `existing`
    // cuando las formas coinciden (caso real: bootstrap en dispositivo nuevo,
    // regla sin cambios, historial local aún sin sincronizar).
    const sameShape = (existing.totalKeys ?? 0) === (activity.totalKeys ?? 0);
    const totalKeys = activity.totalKeys ?? 0;
    const completedKeys = sameShape
      ? Math.max(existing.completedKeys ?? 0, activity.completedKeys ?? 0)
      : (activity.completedKeys ?? 0);
    mergedActivities[activityId] = {
      ...existing,
      // Recalculado desde los conteos fusionados: un `completed` heredado de
      // una regla de puntuación previa (menos scoreKeys) no debe sobrevivir
      // si el catálogo actual exige más categorías/modos que antes.
      completed: totalKeys > 0 && completedKeys === totalKeys,
      completedKeys,
      totalKeys,
      bestScorePct: Math.max(existing.bestScorePct ?? 0, activity.bestScorePct ?? 0),
      attempts: Math.max(existing.attempts ?? 0, activity.attempts ?? 0),
      completedAt: existing.completedAt || activity.completedAt || null,
      lastAttemptAt: existing.lastAttemptAt || activity.lastAttemptAt || null,
    };
  }

  // `mergedActivities` puede traer además entradas "match"/"timed" —
  // resolveScoreActivity() ahora las registra en el ledger para que
  // sincronicen entre dispositivos (ver auditoría de House & Rooms), pero
  // no son parte de `rule.requiredActivities` (siempre 'practice'/'study').
  // Solo esas cuentan para Aprobado — si se usara Object.values(mergedActivities)
  // completo, un módulo con Match/Timed sin terminar nunca mostraría el ✓
  // aunque Study+Quiz ya estén al 100%.
  const requiredIds = rule ? rule.requiredActivities.map((activity) => activity.activityId) : null;
  const activityStates = requiredIds
    ? requiredIds.map((id) => mergedActivities[id]).filter(Boolean)
    : Object.values(mergedActivities);
  const completedCount = activityStates.filter((activity) => activity.completed).length;
  const completed = rule
    ? (rule.completionRule === 'any' ? completedCount > 0 : completedCount === requiredIds.length)
    : (Boolean(scoreDerived.completed) || Boolean(projectionItem.completed));

  // progressPct se deriva de `activityStates` ya saneado (mismo dato que
  // decide `completed` arriba), no de un Math.max entre scoreDerived y el
  // `progressPct` crudo de projectionItem: ese campo es un número suelto sin
  // relación con mergedActivities, así que una foto vieja con más scoreKeys
  // de las que exige el catálogo actual (ver fix de completedKeys/totalKeys
  // arriba) podía dejar el % pegado en un valor alto para siempre — nunca
  // baja porque Math.max nunca decrece.
  const totalKeysAll = activityStates.reduce((sum, activity) => sum + (activity.totalKeys ?? 0), 0);
  const completedKeysAll = activityStates.reduce((sum, activity) => sum + (activity.completedKeys ?? 0), 0);
  const progressPct = totalKeysAll > 0
    ? (completedKeysAll / totalKeysAll) * 100
    : Math.max(scoreDerived.progressPct ?? 0, projectionItem.progressPct ?? 0);

  return {
    ...projectionItem,
    ...scoreDerived,
    progressPct,
    completed,
    completedAt: completed ? (scoreDerived.completedAt || projectionItem.completedAt || null) : null,
    bestScorePct: Math.max(scoreDerived.bestScorePct ?? 0, projectionItem.bestScorePct ?? 0),
    attempts: Math.max(scoreDerived.attempts ?? 0, projectionItem.attempts ?? 0),
    activities: mergedActivities,
    title: scoreDerived.title || projectionItem.title,
  };
}

function getContentProgressFromScoreKeys(contentId) {
  const rule = PROGRESS_RULES[contentId];
  if (!rule) return null;

  const activities = Object.fromEntries(rule.requiredActivities.map((activity) => [
    activity.activityId,
    getActivityProgress(activity),
  ]));
  const activityStates = Object.values(activities);
  const completedCount = activityStates.filter((activity) => activity.completed).length;
  const completed = rule.completionRule === 'any'
    ? completedCount > 0
    : completedCount === activityStates.length;

  // Progress based on individual key completion across all activities
  const totalKeys = activityStates.reduce((sum, activity) => sum + activity.totalKeys, 0);
  const completedKeys = activityStates.reduce((sum, activity) => sum + activity.completedKeys, 0);
  const progressPct = rule.completionRule === 'any'
    ? (completed ? 100 : 0)
    : (totalKeys > 0 ? (completedKeys / totalKeys) * 100 : 0);

  const completedAt = completed
    ? activityStates.map((activity) => activity.completedAt).filter(Boolean).sort().at(-1) || null
    : null;

  return {
    contentId,
    title: MODULES.find((module) => module.id === contentId)?.title ?? contentId,
    contentType: 'exercise',
    progressPct,
    completed,
    completedAt,
    bestScorePct: activityStates.reduce((best, activity) => Math.max(best, activity.bestScorePct), 0),
    attempts: activityStates.reduce((total, activity) => total + activity.attempts, 0),
    activities,
  };
}

/**
 * Maestría (docs/to-do/mastery-tiers-plan.md §4.1): todas las categorías × todos
 * los modos con score de MODULE_DEPTH, excluyendo Battle y el requisito Study
 * (ya lo exige Aprobado aparte, ver getModuleMatrixProgress/computeModuleMatrixCore).
 * Requiere `completed` (Aprobado) también, para que la corona nunca aparezca
 * sin el check — la corona es un nivel encima, no un sustituto.
 */
function isModuleMastered(contentId, completed) {
  if (!completed) return false;
  const matrix = getModuleMatrixProgress(contentId);
  return Boolean(matrix && matrix.total > 0 && matrix.passed === matrix.total);
}

export function getContentProgress(contentId) {
  if (shouldDeferStatsDisplay()) {
    return {
      contentId,
      progressPct: 0,
      completed: false,
      mastered: false,
      bestScorePct: 0,
      attempts: 0,
      activities: {},
    };
  }
  const fromScores = getContentProgressFromScoreKeys(contentId);
  const projectionItem = readProjectionDoc()?.content?.[contentId] ?? null;
  const merged = mergeHubflowProgressItem(fromScores, projectionItem, PROGRESS_RULES[contentId]);
  if (!merged) return merged;
  // La tarjeta y el modal "Progreso del módulo" ya usaban esta grilla
  // categoría×modo (getModuleMatrixProgress, incluye Match — que
  // practice/study no cuentan) como fuente para el % que se ve. Pero
  // merged.progressPct de arriba sale de otro cálculo (practice+study sin
  // Match) mezclado con el snapshot histórico ya subido a Supabase, que
  // puede haber quedado congelado de una versión vieja del catálogo — de ahí
  // que tarjeta y "% en la nube" pudieran mostrar números distintos con los
  // mismos datos ya sincronizados. Unificado acá: la grilla gana si es
  // mayor, nunca baja el % ya alcanzado (mismo criterio de recordScore) —
  // y como esto alimenta publishHubFlowProgress(), también es lo que se
  // termina subiendo a Supabase.
  const matrix = getModuleMatrixProgress(contentId, { includeStudy: true });
  if (matrix && matrix.total > 0) {
    merged.progressPct = Math.max(merged.progressPct ?? 0, matrix.progressPct);
  }
  merged.mastered = isModuleMastered(contentId, merged.completed);
  return merged;
}

function buildHubFlowSummary(contentStates) {
  let completedActivities = 0;
  let totalActivities = 0;
  let attemptedActivities = 0;
  for (const item of contentStates) {
    const activities = Object.values(item.activities || {});
    totalActivities += activities.length;
    for (const activity of activities) {
      if (activity.completed) completedActivities++;
      if ((activity.attempts ?? 0) > 0 || (activity.completedKeys ?? 0) > 0) attemptedActivities++;
    }
  }
  return {
    progressPct: contentStates.length
      ? contentStates.reduce((total, item) => total + (item.progressPct ?? 0), 0) / contentStates.length
      : 0,
    completedContent: contentStates.filter((item) => item.completed).length,
    totalContent: MODULES.length,
    attemptedContent: contentStates.filter((item) => (item.attempts ?? 0) > 0).length,
    completedActivities,
    totalActivities,
    attemptedActivities,
  };
}

/** Unified summary — same rules as DeskFlow portal and learnflow:progress:hubflow:v1. */
function getHubFlowProgressSummary() {
  if (reconcileHubflowProgressFromEvents()) {
    invalidateProjectionCache();
  }
  const contentStates = MODULES.map((module) => getContentProgress(module.id)).filter(Boolean);
  const computed = buildHubFlowSummary(contentStates);
  const stored = readProjectionDoc()?.summary;
  if (!stored) return computed;

  return {
    progressPct: Math.max(computed.progressPct ?? 0, stored.progressPct ?? 0),
    completedContent: Math.max(computed.completedContent ?? 0, stored.completedContent ?? 0),
    totalContent: MODULES.length,
    attemptedContent: Math.max(computed.attemptedContent ?? 0, stored.attemptedContent ?? 0),
    completedActivities: Math.max(computed.completedActivities ?? 0, stored.completedActivities ?? 0),
    totalActivities: Math.max(computed.totalActivities ?? 0, stored.totalActivities ?? 0),
    attemptedActivities: Math.max(computed.attemptedActivities ?? 0, stored.attemptedActivities ?? 0),
  };
}

export function isContentCompleted(contentId) {
  return getContentProgress(contentId)?.completed || false;
}

export function isContentMastered(contentId) {
  return getContentProgress(contentId)?.mastered || false;
}

export function getBestScore(contentId) {
  return getContentProgress(contentId)?.bestScorePct || 0;
}

export function getProgressStats() {
  if (shouldDeferStatsDisplay()) {
    return {
      totalAttempts: 0,
      completedContent: 0,
      completedActivities: 0,
      totalActivities: 0,
      totalContent: MODULES.length,
    };
  }
  const summary = getHubFlowProgressSummary();
  const uniqueScoreKeys = new Set(
    Object.values(PROGRESS_RULES).flatMap((rule) =>
      rule.requiredActivities.flatMap((activity) => activity.scoreKeys)
    )
  );
  const scoreAttempts = [...uniqueScoreKeys].reduce(
    (total, key) => total + readScoreHistory(key).length,
    0
  );
  const activityEvents = readJson(ACTIVITY_STORAGE_KEY, null)?.events?.length ?? 0;
  return {
    totalAttempts: Math.max(
      scoreAttempts,
      summary.attemptedContent ?? 0,
      summary.attemptedActivities ?? 0,
      activityEvents
    ),
    completedContent: summary.completedContent ?? 0,
    completedActivities: summary.completedActivities ?? 0,
    totalActivities: summary.totalActivities ?? 0,
    totalContent: summary.totalContent ?? MODULES.length,
  };
}

function hasAnyLocalHubflowProgress() {
  const activity = readJson(ACTIVITY_STORAGE_KEY, null);
  if (activity?.events?.length) return true;
  const doc = readJson(PROGRESS_STORAGE_KEY, null);
  if (doc?.content && Object.values(doc.content).some((item) => hasProgressSignal(item))) return true;
  for (const module of MODULES) {
    const rule = PROGRESS_RULES[module.id];
    if (!rule) continue;
    for (const activityRule of rule.requiredActivities) {
      for (const key of activityRule.scoreKeys) {
        if (readScoreHistory(key).length > 0) return true;
      }
    }
  }
  return false;
}

function projectionFingerprint(projection) {
  return JSON.stringify({
    schemaVersion: projection.schemaVersion,
    catalogVersion: projection.catalogVersion,
    summary: projection.summary,
    content: projection.content,
  });
}

function publishHubFlowProgress() {
  const content = Object.fromEntries(MODULES.map((module) => [
    module.id,
    getContentProgress(module.id),
  ]));
  const contentStates = Object.values(content).filter(Boolean);
  const summary = buildHubFlowSummary(contentStates);
  const projection = {
    schemaVersion: 1,
    app: 'hubflow',
    updatedAt: new Date().toISOString(),
    catalogVersion: 'hubflow-catalog-v1',
    // Catálogo real vigente, fuera de summary/content a propósito: el
    // cloud-merge de DeskFlow (sync-engine.js) solo une content_ids de
    // Supabase sin podar ids huérfanos de catálogos viejos, así que
    // Object.keys(content).length ahí puede inflarse. catalogTotalContent
    // es la única fuente que sabe con certeza cuántos módulos hay AHORA.
    catalogTotalContent: MODULES.length,
    summary,
    content,
  };

  const existing = readJson(PROGRESS_STORAGE_KEY, null);
  const changed = !existing || projectionFingerprint(existing) !== projectionFingerprint(projection);

  if (changed) {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(projection));
    invalidateProjectionCache();
    notifyHubFlowProgressUpdated();
    // LearnFlow Progression System — docs/to-do/learnflow-progression-system.md.
    // Se evalúa aquí (no en recordScore) porque este es el único punto que ya
    // sabe que el documento de progreso cambió de verdad, no solo que hubo un
    // intento más. checkLevelAdvancement() lee el documento recién escrito.
    try {
      const result = checkLevelAdvancement();
      if (result.advanced) {
        window.dispatchEvent(new CustomEvent('lp-level-advanced-locally', { detail: result }));
        lpSupabase.updateCefrLevel(result.level).catch(() => { /* se reintenta en el próximo login */ });
      }
    } catch {
      /* no bloquear el guardado de progreso por un fallo en el cálculo de nivel */
    }
  }

  try {
    localStorage.setItem(HUBFLOW_LOCAL_READY_KEY, '1');
  } catch {
    /* ignore quota errors */
  }

  try {
    // learnflow:catalog:hubflow:v1 — tamaño de catálogo por separado de
    // learnflow:progress:hubflow:v1. clearGuestLocalProgress() (DeskFlow,
    // lp-guest-reset.js) borra todo lo que empieza con learnflow:progress:/
    // learnflow:activity: al hacer logout explícito (correcto, evita filtrar
    // progreso ajeno en un dispositivo compartido) — pero eso dejaba el
    // total en 0 también en modo invitado, aunque el catálogo es público.
    // Esta clave no matchea ese borrado, así que sobrevive al logout.
    localStorage.setItem(
      CATALOG_STORAGE_KEY,
      JSON.stringify({
        totalContent: MODULES.length,
        ids: MODULES.map((module) => module.id),
        updatedAt: projection.updatedAt,
      })
    );
  } catch {
    /* ignore quota errors */
  }

  return projection;
}

// Rebuild per-exercise score keys from the cloud projection (learnflow:progress:hubflow:v1).
// Score-history keys drive granular exercise UI; the v1 projection is the cross-app source.
function syncScoreKeysFromProgressDoc() {
  const doc = readProjectionDoc();
  if (!doc?.content) return false;

  let changed = false;
  for (const [contentId, item] of Object.entries(doc.content)) {
    if (!item) continue;
    const hasProgress =
      item.completed || (item.bestScorePct ?? 0) > 0 || (item.attempts ?? 0) > 0;
    if (!hasProgress) continue;

    const rule = PROGRESS_RULES[contentId];
    if (!rule) continue;

    const pct = Math.max(
      item.bestScorePct ?? 0,
      item.completed ? Math.max(HUBFLOW_PASS_SCORE_PCT, item.bestScorePct ?? 0) : 0
    );
    if (pct <= 0) continue;

    const timestamp = item.completedAt || doc.updatedAt || new Date().toISOString();

    for (const activity of rule.requiredActivities) {
      // The aggregate projection only carries one score for the whole activity —
      // it can't say which category/mode earned it. Backfilling is only safe
      // when the activity maps to exactly one scoreKey; for multi-key activities
      // (e.g. one per vocabulary category) it would wrongly clone a single
      // category's result onto every other untouched category. Skip those —
      // better to leave them unfilled than to fabricate false completions.
      if (activity.scoreKeys.length !== 1) continue;
      const [scoreKey] = activity.scoreKeys;
      // Antes se saltaba por completo si ya había CUALQUIER historial local,
      // así que un dispositivo con su propio progreso (aunque fuera menor al
      // de la nube) nunca recibía la mejora — exactamente el caso de "force
      // sync no cambia nada" reportado en localhost vs producción. Ahora se
      // fusiona con el mismo criterio "el progreso nunca baja" que usa
      // recordScore(): solo escribe si el dato de la nube es mejor.
      const history = readScoreHistory(scoreKey);
      const currentBest = history.reduce((max, a) => Math.max(max, Number(a.pct) || 0), 0);
      if (pct <= currentBest) continue;
      try {
        localStorage.setItem(
          versionedKey(scoreKey),
          JSON.stringify([{ pct, date: timestamp, timestamp }, ...history].slice(0, MAX_SCORE_HISTORY))
        );
        changed = true;
      } catch {
        /* ignore quota errors */
      }
    }
  }
  return changed;
}

function syncScoreKeysFromActivityDoc() {
  const doc = readJson(ACTIVITY_STORAGE_KEY, null);
  if (!doc?.events?.length) return false;

  let changed = false;
  for (const event of doc.events) {
    if (!event?.contentId || event.scorePct == null) continue;

    const rule = PROGRESS_RULES[event.contentId];
    if (!rule) continue;

    const activityRule =
      rule.requiredActivities.find((activity) => activity.activityId === event.activity) ||
      rule.requiredActivities[0];
    if (!activityRule) continue;

    // Legacy events (recorded before `metrics.scoreKey` existed) don't say which
    // key they belong to. Guessing is only safe for single-key activities — for
    // multi-key ones (e.g. one per vocabulary category) it would clone one
    // category's score onto every other untouched category (see the identical
    // guard in syncScoreKeysFromProgressDoc above).
    // `metricKey` confirmado (evento moderno) vs adivinado (evento legacy sin
    // scoreKey, solo seguro para actividades de una sola clave — ver guard
    // arriba). Solo el confirmado se fusiona por mejor puntaje; el adivinado
    // sigue siendo "solo si está vacío" para no arriesgar clonar un resultado
    // sobre una categoría distinta que ya tenía su propio dato real.
    const metricKey = typeof event.metrics?.scoreKey === 'string' ? event.metrics.scoreKey : null;
    const confirmedKeys = metricKey ? [metricKey] : [];
    const guessedKeys = !metricKey && activityRule.scoreKeys.length === 1
      ? activityRule.scoreKeys.filter((key) => readScoreHistory(key).length === 0)
      : [];

    const timestamp = event.occurredAt || doc.updatedAt || new Date().toISOString();
    const pct = Math.max(0, Math.min(100, Number(event.scorePct) || 0));

    const writeEntry = (scoreKey, history) => {
      try {
        const entry = {
          pct,
          date: timestamp,
          timestamp,
          context: { contentId: event.contentId, activity: event.activity, scoreKey },
        };
        localStorage.setItem(versionedKey(scoreKey), JSON.stringify([entry, ...history].slice(0, MAX_SCORE_HISTORY)));
        changed = true;
      } catch {
        /* ignore quota errors */
      }
    };

    for (const scoreKey of confirmedKeys) {
      if (!scoreKey) continue;
      // El mismo fix que en syncScoreKeysFromProgressDoc: fusiona por mejor
      // puntaje en vez de saltarse cualquier historial local existente —
      // así "forzar sync" sí puede levantar un dato que este dispositivo
      // tenía peor (o nunca tuvo) para esta categoría exacta.
      const history = readScoreHistory(scoreKey);
      const currentBest = history.reduce((max, a) => Math.max(max, Number(a.pct) || 0), 0);
      if (pct <= currentBest) continue;
      writeEntry(scoreKey, history);
    }

    for (const scoreKey of guessedKeys) {
      if (!scoreKey || readScoreHistory(scoreKey).length > 0) continue;
      writeEntry(scoreKey, []);
    }
  }
  return changed;
}

/**
 * Reconstruye las claves de score-history desde el agregado `score_key_bests`
 * (migración 027, cacheado por sync-engine).
 *
 * Es la única fuente que no depende de la ventana de 200 eventos de
 * `activity_events`: syncScoreKeysFromActivityDoc solo ve los 200 más
 * recientes, así que en un dispositivo distinto al que practicó, todo lo
 * anterior a esa ventana nunca aparecía (medido 2026-08-17: 87 scoreKeys en
 * la nube, 34 reconstruibles localmente — House & Rooms marcaba 2/8 con 8/8
 * ya ganado). El agregado trae el máximo por clave, sin techo temporal.
 *
 * Escribe con el mismo criterio monotónico que recordScore(): solo si el dato
 * de la nube supera el mejor local. Sin `context`, porque el agregado ya no
 * conserva de qué intento salió — solo el puntaje, que es lo único que la
 * matriz lee.
 */
function syncScoreKeysFromCloudBests() {
  const bests = readScoreKeyBests('hubflow');
  const entries = Object.entries(bests);
  if (!entries.length) return false;

  let changed = false;
  for (const [scoreKey, rawPct] of entries) {
    const pct = Math.max(0, Math.min(100, Number(rawPct) || 0));
    if (pct <= 0) continue;
    const history = readScoreHistory(scoreKey);
    const currentBest = history.reduce((max, a) => Math.max(max, Number(a.pct) || 0), 0);
    if (pct <= currentBest) continue;
    const timestamp = new Date().toISOString();
    try {
      localStorage.setItem(
        versionedKey(scoreKey),
        JSON.stringify([{ pct, date: timestamp, timestamp }, ...history].slice(0, MAX_SCORE_HISTORY))
      );
      changed = true;
    } catch {
      /* ignore quota errors */
    }
  }
  return changed;
}

export function hydrateHubFlowFromCloud() {
  reconcileHubflowProgressFromEvents();
  syncScoreKeysFromProgressDoc();
  syncScoreKeysFromActivityDoc();
  syncScoreKeysFromCloudBests();
  return publishHubFlowProgress();
}

function notifyHubFlowProgressUpdated() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('hubflow-progress-updated'));
}

function resolveScoreActivity(key, context) {
  const requestedContent = context?.contentId;
  const candidates = Object.entries(PROGRESS_RULES).flatMap(([contentId, rule]) =>
    rule.requiredActivities
      .filter((activity) => activity.scoreKeys.includes(key))
      .map((activity) => ({ contentId, activity }))
  );
  const requestedMatch = candidates.find(({ contentId, activity }) =>
    contentId === requestedContent && (!context?.activity || activity.activityId === context.activity)
  );
  if (requestedMatch) return requestedMatch;
  if (candidates.length) {
    return candidates.sort((a, b) => a.activity.scoreKeys.length - b.activity.scoreKeys.length)[0];
  }

  // Modos que la matriz de progreso rastrea (Match, Timed) pero que
  // PROGRESS_RULES no exige para Aprobado (solo Study + Quiz — ver
  // withStudyRequirement en catalog.js). Antes se descartaban aquí en
  // silencio, así que nunca llegaban al ledger de eventos ni, por lo tanto,
  // a la sincronización con Supabase: un Match ganado en un dispositivo
  // jamás aparecía en otro, aunque "forzar sync" se corriera mil veces (ver
  // auditoría de House & Rooms divergiendo 31%/25% entre dos orígenes con
  // la misma cuenta). Se registran igual, con un activityId derivado de la
  // propia clave — nunca 'practice'/'study' (los únicos nombres reales que
  // usa PROGRESS_RULES) — para que jamás se mezclen con las actividades
  // exigidas al reconciliar el ledger genérico (applyHubflowActivityEvents
  // en lp-progress-summary.js, que agrupa por (contentId, activity) sin
  // conocer el catálogo). isStoredItemCompleted/mergeHubflowProgressItem ya
  // filtran por rule.requiredActivities, así que esta entrada extra nunca
  // participa del criterio de Aprobado — solo viaja para que el % de la
  // matriz y Maestría (que sí miran las 4 columnas) sincronicen entre
  // dispositivos.
  if (requestedContent && MODULES.some((module) => module.id === requestedContent)) {
    const activityId = key.split('-').pop() || 'practice';
    if (activityId === 'practice' || activityId === 'study') return null;
    return {
      contentId: requestedContent,
      activity: { activityId, scoreKeys: [key], passScorePct: HUBFLOW_PASS_SCORE_PCT },
    };
  }
  return null;
}

function recordActivityEvent(key, pct, timestamp, context) {
  const match = resolveScoreActivity(key, context);
  if (!match) return;

  const ledger = readJson(ACTIVITY_STORAGE_KEY, {});
  const events = Array.isArray(ledger.events) ? ledger.events : [];
  const eventId = createId();
  const moduleTitle = MODULES.find((module) => module.id === match.contentId)?.title;
  const event = {
    eventId,
    runId: typeof context?.runId === 'string' ? context.runId : eventId,
    app: 'hubflow',
    contentId: match.contentId,
    title: moduleTitle || match.contentId,
    activity: context?.activity || match.activity.activityId,
    eventType: 'attempt_completed',
    occurredAt: timestamp,
    scorePct: pct,
    passed: pct >= match.activity.passScorePct,
    metrics: {
      ...(context?.metrics && typeof context.metrics === 'object' ? context.metrics : {}),
      scoreKey: key,
    },
  };
  if (Number.isFinite(context?.durationMs)) event.durationMs = Math.max(0, context.durationMs);
  localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify({
    schemaVersion: 1,
    app: 'hubflow',
    updatedAt: timestamp,
    events: [event, ...events].slice(0, MAX_ACTIVITY_EVENTS),
  }));
}

/**
 * Records a score using the legacy key/pct call shape. New callers may pass
 * { contentId, activity, runId, durationMs, metrics } as a third argument.
 */
export function recordScore(key, pct, context = {}) {
  const requestedPct = Math.max(0, Math.min(100, Number(pct) || 0));
  const timestamp = new Date().toISOString();
  const history = readScoreHistory(key);
  // El progreso nunca baja: un repaso incompleto (o cualquier otra causa) no
  // debe hacer retroceder un % ya alcanzado en un intento anterior — se
  // guarda el mayor entre el intento nuevo y el mejor histórico.
  const previousBest = history.reduce((max, a) => Math.max(max, Number(a.pct) || 0), 0);
  const normalizedPct = Math.max(requestedPct, previousBest);
  history.unshift({ pct: normalizedPct, date: timestamp, timestamp, context });
  localStorage.setItem(versionedKey(key), JSON.stringify(history.slice(0, MAX_SCORE_HISTORY)));
  recordActivityEvent(key, normalizedPct, timestamp, context);
  publishHubFlowProgress();
  scheduleCloudSync();
  // Auto-refresh the lesson progress button if present in the DOM
  if (typeof document !== 'undefined') {
    const contentId = context?.contentId
      || document.getElementById('lessonProgress')?.dataset?.contentId
      || document.getElementById('lessonProgressBtn')?.dataset?.contentId;
    if (contentId) renderLessonProgress(contentId);
  }
}

/**
 * Marca un item como visto en modo Study y, si el set de vistos creció,
 * refleja el % acumulado en el scoreKey `<prefix>-<cat>-study` vía
 * `recordScore` — mismo contrato que quiz/write/etc (ver PROGRESS_RULES en
 * data/catalog.js). El set de vistos se persiste aparte (STUDY_SEEN_STORAGE_KEY)
 * porque, a diferencia de un quiz, Study no tiene un intento con inicio/fin: la
 * cobertura se acumula entre sesiones y hay que recordar qué items concretos
 * ya se vieron, no solo el último % alcanzado.
 */
export function recordStudyItemSeen({ contentId, storagePrefix, category, term, totalItems }) {
  if (!storagePrefix || !category || !term || !totalItems) return;
  const scoreKey = `${storagePrefix}-${category}-study`;
  const map = readJson(STUDY_SEEN_STORAGE_KEY, {});
  const seen = new Set(map[scoreKey] || []);
  if (seen.has(term)) return;
  seen.add(term);
  map[scoreKey] = [...seen];
  try {
    localStorage.setItem(STUDY_SEEN_STORAGE_KEY, JSON.stringify(map));
  } catch {
    /* ignore quota errors */
  }
  const pct = Math.min(100, Math.round((seen.size / totalItems) * 100));
  recordScore(scoreKey, pct, { contentId, activity: 'study' });
}

// Sube progreso + eventos a Supabase cuando el usuario está autenticado.
// Debounced porque recordScore puede dispararse varias veces seguidas
// (p.ej. quiz de varias preguntas registrando cada intento).
let cloudSyncTimer = null;
let pendingCloudSync = false;

if (typeof window !== 'undefined') {
  window.addEventListener('lp-cloud-hydrated', () => {
    if (pendingCloudSync) scheduleCloudSync();
    invalidateProjectionCache();
    // hydrate completo (no solo reconcile): el evento llega justo después de
    // que sync-engine escribió la caché de score_key_bests, y sin releer las
    // claves de score-history acá el detalle granular recién aparecía en la
    // siguiente recarga de la página.
    hydrateHubFlowFromCloud();
    notifyHubFlowProgressUpdated();
  });
}

function scheduleCloudSync() {
  if (cloudSyncTimer) clearTimeout(cloudSyncTimer);
  cloudSyncTimer = setTimeout(async () => {
    cloudSyncTimer = null;
    if (window.lpGuestReset?.isExplicitLogout?.()) return;
    const authed = await lpSupabase.isAuthenticated().catch(() => false);
    if (!authed || window.lpGuestReset?.isExplicitLogout?.()) return;
    if (!isCloudHydrated()) {
      pendingCloudSync = true;
      return;
    }
    pendingCloudSync = false;

    publishHubFlowProgress();
    await syncSingleApp('hubflow');
  }, 500);
}

function refreshHubFlowFromPeerSync() {
  reconcileHubflowProgressFromEvents();
  invalidateProjectionCache();
  syncScoreKeysFromProgressDoc();
  syncScoreKeysFromActivityDoc();
  syncScoreKeysFromCloudBests();
  notifyHubFlowProgressUpdated();
}

if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  migrateLegacyProjectionKeys();
  hydrateHubFlowFromCloud();
  if (hasAnyLocalHubflowProgress()) {
    markLocalCacheBootstrapped();
  }

  window.addEventListener('storage', (event) => {
    if (event.key !== PROGRESS_STORAGE_KEY && event.key !== ACTIVITY_STORAGE_KEY) return;
    refreshHubFlowFromPeerSync();
  });

  window.addEventListener('lp-sync-peer', refreshHubFlowFromPeerSync);

  window.addEventListener('lp-guest-reset', () => {
    if (cloudSyncTimer) {
      clearTimeout(cloudSyncTimer);
      cloudSyncTimer = null;
    }
    pendingCloudSync = false;
    invalidateProjectionCache();
    try {
      localStorage.removeItem(HUBFLOW_LOCAL_READY_KEY);
    } catch {
      /* ignore */
    }
    hydrateHubFlowFromCloud();
    notifyHubFlowProgressUpdated();
  });
}

/** Stars calculation */
export function getStars(pct) {
  if (pct === 100) return 3;
  if (pct >= 60) return 2;
  return 1;
}

/**
 * Best score and pass/fail for a single scoreKey (e.g. `vocab-family-quiz`).
 * Used to decide what to suggest next once a mode/category is finished.
 */
export function getScoreStatus(key, passScorePct = HUBFLOW_PASS_SCORE_PCT) {
  const history = readScoreHistory(key);
  const bestPct = history.reduce((best, attempt) => Math.max(best, Number(attempt.pct) || 0), 0);
  return { attempted: history.length > 0, bestPct, passed: bestPct >= passScorePct };
}

/**
 * Renders (or updates) the module-progress detail button for an exercise page.
 * The button is relocated to .fc-nav (or .check-area) by exercise-shell.js.
 * Call on init and after each recordScore to keep labels current.
 * @param {string} contentId — module ID matching PROGRESS_RULES
 */
export function renderLessonProgress(contentId) {
  if (!contentId) return;

  const progress = getContentProgress(contentId);
  if (!progress) return;

  let container = document.getElementById('lessonProgress');
  if (!container) {
    container = document.createElement('div');
    container.id = 'lessonProgress';
    container.className = 'lesson-progress lesson-progress--anchor';
    container.hidden = true;
    document.body.appendChild(container);
  }
  container.dataset.contentId = contentId;

  const { completedKeys, totalKeys } = progress.activities
    ? Object.values(progress.activities).reduce((acc, act) => ({
        completedKeys: acc.completedKeys + act.completedKeys,
        totalKeys: acc.totalKeys + act.totalKeys,
      }), { completedKeys: 0, totalKeys: 0 })
    : { completedKeys: 0, totalKeys: 0 };

  const pct = Math.round(progress.progressPct);
  const summary = progress.completed
    ? 'Módulo completado'
    : `${completedKeys}/${totalKeys} categorías · ${pct}%`;

  let detailBtn = document.getElementById('lessonProgressBtn');
  if (!detailBtn) {
    detailBtn = document.createElement('button');
    detailBtn.id = 'lessonProgressBtn';
    detailBtn.type = 'button';
    detailBtn.className = 'lp-btn lp-btn--ghost lesson-progress__detail';
    detailBtn.textContent = '📊';
    detailBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = document.getElementById('lessonProgress')?.dataset.contentId
        || document.getElementById('lessonProgressBtn')?.dataset.contentId;
      if (id) openProgressDetail(id);
    });
    container.appendChild(detailBtn);
  }

  detailBtn.dataset.contentId = contentId;
  detailBtn.setAttribute('aria-label', `Ver detalle de progreso: ${summary}`);
  detailBtn.title = summary;

  if (typeof window !== 'undefined' && typeof window.__relocateLessonProgressBtn === 'function') {
    window.__relocateLessonProgressBtn();
  }

  renderModuleCompletionMarks(contentId);
}

/* ─── Módulo: matriz categoría × modo ────────────────────────────────────────
   El orden de secciones y modos sale de los chips visibles del ejercicio para
   que la tabla de progreso nunca contradiga lo que el usuario ve en pantalla.
   Cuando la página no está renderizada (o el módulo no tiene chips) se cae al
   orden canónico MODE_ORDER + el orden de los scoreKeys. */

const MODE_ORDER = ['quiz', 'match', 'timed', 'write', 'study', 'challenge', null];
const MODE_SHORT = { quiz: 'Quiz', match: 'Match', write: 'Write', study: 'Study', challenge: 'Chall.', timed: 'Timed', null: 'Quiz' };
const MODE_ICONS = { quiz: '⚡', match: '⇄', write: '✎', study: '◉', challenge: '◆', timed: '◷', null: '◉' };

/** Texto de un chip ignorando el badge de completado inyectado por esta capa. */
function pillLabelText(btn) {
  return [...btn.childNodes]
    .filter((node) => !(node.nodeType === 1 && node.classList?.contains('hf-done-dot')))
    .map((node) => node.textContent)
    .join('')
    .trim();
}

/** Orden visual de los mode tabs (`data-mode`) tal como se pintan en la página. */
function readVisualModeOrder() {
  return [...document.querySelectorAll('.pill-bar [data-mode], .ex-header__modes [data-mode]')]
    .map((btn) => btn.dataset.mode)
    .filter(Boolean);
}

/* Chips de sección: `#catBar [data-cat]` en la mayoría de motores,
   `#levelBar [data-level]` en los de spelling (ed/ing/noun-adjuncts). */
const SECTION_PILL_SELECTOR = '#catBar [data-cat], #levelBar [data-level]';

/** Orden + etiqueta visual de los chips de sección de la página. */
function readVisualCategories() {
  return [...document.querySelectorAll(SECTION_PILL_SELECTOR)].map((btn) => ({
    key: btn.dataset.cat ?? btn.dataset.level,
    label: pillLabelText(btn),
  }));
}

function humanizeCategoryKey(key) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()).trim();
}

/**
 * Núcleo (sin DOM) de la matriz categoría × modo de un módulo: qué categorías
 * y qué modos se rastrean, y el evaluador de celdas. No depende de los chips
 * visibles en pantalla, por lo que puede usarse tanto desde la página del
 * ejercicio (modal de detalle) como desde el dashboard (tarjetas de módulo),
 * donde el DOM del ejercicio de ese módulo no existe.
 *
 * `includeStudy` controla si la columna Study (requisito de Aprobado, no de
 * Maestría — mastery-tiers-plan.md §4.1/§5) entra en la matriz. Por defecto
 * queda fuera: los ✓ por categoría/modo del selector de la página de
 * ejercicio (`renderModuleCompletionMarks`) siempre significaron "quiz+match+
 * timed completos", y exigir también Study ahí borraría de golpe checks ya
 * ganados de cuentas reales sin relación con lo que esa marca comunica. El
 * modal de detalle y el % de la tarjeta del dashboard sí lo piden en `true`
 * explícitamente porque ahí sí hace falta ver si falta Study.
 * @param {string} contentId
 * @param {{includeStudy?: boolean}} [opts]
 * @returns {null | {passScorePct:number, prefix:string, categoryKeys:string[],
 *                   trackedModes:(string|null)[], cellFor:(cat:string, mode:string|null)=>object}}
 */
function computeModuleMatrixCore(contentId, { includeStudy = false } = {}) {
  const rule = PROGRESS_RULES[contentId];
  if (!rule) return null;

  const studyActivity = rule.requiredActivities.find((activity) => activity.activityId === 'study');
  const matrixActivities = rule.requiredActivities.filter((activity) => activity.activityId !== 'study');
  if (!matrixActivities.length) return null;

  const passScorePct = matrixActivities[0]?.passScorePct || HUBFLOW_PASS_SCORE_PCT;

  // Determine the storage prefix from the first scoreKey
  const sampleKey = matrixActivities[0]?.scoreKeys[0] || '';
  const prefix = sampleKey.split('-')[0]; // e.g. "vocab", "ing", "art"

  // Extract unique categories from scoreKeys
  const knownModes = ['quiz', 'match', 'write', 'study', 'challenge', 'timed'];
  const categoriesFromKeys = new Set();
  const modesFromKeys = new Set();
  let hasNoModeSuffix = false;

  for (const act of matrixActivities) {
    for (const key of act.scoreKeys) {
      const parts = key.split('-');
      const lastPart = parts[parts.length - 1];
      if (knownModes.includes(lastPart)) {
        parts.pop();
        modesFromKeys.add(lastPart);
      } else {
        hasNoModeSuffix = true;
      }
      parts.shift(); // remove prefix
      categoriesFromKeys.add(parts.join('-'));
    }
  }

  let trackedModes = [...modesFromKeys];

  // If no mode suffix found, it's a single-mode exercise (practice)
  if (hasNoModeSuffix && trackedModes.length === 0) {
    trackedModes = [null]; // null means "no suffix in key"
  }

  // Determine all possible modes based on engine type
  const depth = MODULE_DEPTH[contentId];
  if (depth) {
    const ENGINE_MODES_MAP = {
      flashcard: ['quiz', 'match', 'timed'],
      spelling: ['study', 'challenge', 'timed'],
      tts: trackedModes.length ? trackedModes : [null],
      analysis: trackedModes.length ? trackedModes : [null],
      custom: trackedModes.length ? trackedModes : [null],
    };
    const engineModes = ENGINE_MODES_MAP[depth.engine];
    if (engineModes) {
      // Merge: engine modes + any extra modes from the rules (e.g. 'write' for phrasal-verbs)
      const merged = new Set([...engineModes, ...modesFromKeys]);
      trackedModes = [...merged];
    }
  }

  // La columna Study (Fase 0/1 de mastery-tiers-plan.md §4.1) se agrega con su
  // propio umbral (100% de items vistos, no el passScorePct de quiz/match/timed)
  // solo cuando el caller la pide explícitamente (ver doc del includeStudy
  // arriba). No afecta el booleano de Maestría cuando se pide: `completed`
  // ya exige Study al 100%, así que esa celda siempre pasa cuando el módulo
  // está aprobado (ver isModuleMastered).
  const studyPassPct = studyActivity?.passScorePct ?? 100;
  if (includeStudy && studyActivity && !trackedModes.includes('study')) {
    trackedModes = [...trackedModes, 'study'];
  }

  const cellFor = (cat, mode) => {
    const threshold = mode === 'study' ? studyPassPct : passScorePct;
    const key = mode === null ? `${prefix}-${cat}` : `${prefix}-${cat}-${mode}`;
    const history = readScoreHistory(key);
    const best = history.reduce((max, a) => Math.max(max, Number(a.pct) || 0), 0);
    const attempts = history.length;
    return { key, best, attempts, passed: best >= threshold };
  };

  return {
    passScorePct,
    studyPassPct: includeStudy && studyActivity ? studyPassPct : null,
    prefix,
    categoryKeys: [...categoriesFromKeys],
    trackedModes,
    cellFor,
  };
}

/**
 * Deriva la matriz de progreso (secciones × modos) de un módulo, con orden y
 * etiquetas visuales tomadas de los chips en pantalla.
 * @param {string} contentId
 * @returns {null | {passScorePct:number, prefix:string, categories:{key:string,label:string}[],
 *                   displayModes:(string|null)[], cellFor:(cat:string, mode:string|null)=>object}}
 */
function buildModuleMatrix(contentId, { includeStudy = false } = {}) {
  const core = computeModuleMatrixCore(contentId, { includeStudy });
  if (!core) return null;
  const { passScorePct, studyPassPct, prefix, categoryKeys, trackedModes, cellFor } = core;

  // Orden de columnas = orden de los mode tabs en pantalla; los modos rastreados
  // que no tienen tab visible se anexan según el orden canónico.
  const visualModes = readVisualModeOrder();
  const displayModes = [
    ...visualModes.filter((m) => trackedModes.includes(m)),
    ...MODE_ORDER.filter((m) => trackedModes.includes(m) && !visualModes.includes(m)),
  ];

  // Orden y etiqueta de filas = chips de sección en pantalla (con su emoji);
  // las categorías sin chip visible conservan el orden de los scoreKeys.
  const visualCats = readVisualCategories();
  const visualLabels = new Map(visualCats.map((c) => [c.key, c.label]));
  const categoriesFromKeys = new Set(categoryKeys);
  const categories = [
    ...visualCats.filter((c) => categoriesFromKeys.has(c.key)),
    ...categoryKeys
      .filter((key) => !visualLabels.has(key))
      .map((key) => ({ key, label: humanizeCategoryKey(key) })),
  ];

  return { passScorePct, studyPassPct, prefix, categories, displayModes, cellFor };
}

/**
 * Progreso agregado de un módulo (categorías × modos rastreados), sin
 * depender del DOM del ejercicio — misma cuenta que el modal "Progreso del
 * módulo" (`openProgressDetail`), para que la tarjeta del dashboard y el
 * detalle nunca muestren porcentajes distintos para el mismo módulo.
 * @param {string} contentId
 * @returns {null | {passed:number, total:number, progressPct:number}}
 */
export function getModuleMatrixProgress(contentId, { includeStudy = false } = {}) {
  const core = computeModuleMatrixCore(contentId, { includeStudy });
  if (!core) return null;
  const { categoryKeys, trackedModes, cellFor } = core;

  let passed = 0;
  let total = 0;
  for (const cat of categoryKeys) {
    for (const mode of trackedModes) {
      total++;
      if (cellFor(cat, mode).passed) passed++;
    }
  }

  return { passed, total, progressPct: total > 0 ? (passed / total) * 100 : 0 };
}

/**
 * Lleva a la sección + modo exactos de una celda del modal de progreso,
 * simulando los clicks que cada motor de ejercicio (flashcard, spelling, …)
 * ya tiene cableados sobre sus propios chips — así el modal no necesita saber
 * nada del motor concreto, solo qué categoría y modo pedir.
 * @param {string} cat
 * @param {string|null} mode
 */
function navigateToModeCell(cat, mode) {
  document.querySelector(`#catBar [data-cat="${cat}"], #levelBar [data-level="${cat}"]`)?.click();
  if (mode != null) {
    document.querySelector(`.pill-bar [data-mode="${mode}"], .ex-header__modes [data-mode="${mode}"]`)?.click();
  }
}

/**
 * Opens a modal showing detailed per-category progress for a module.
 * Shows columns for each tracked mode (quiz, match, etc.) per category.
 * @param {string} contentId
 */
function openProgressDetail(contentId) {
  if (!contentId) return;
  const matrix = buildModuleMatrix(contentId, { includeStudy: true });
  if (!matrix) return;

  // Remove existing modal if open
  document.getElementById('progressDetailModal')?.remove();

  const { passScorePct, studyPassPct, categories, displayModes, cellFor } = matrix;
  const showModeInPill = displayModes.length > 1;

  const mod = MODULES.find(m => m.id === contentId);
  const moduleTitle = mod?.title || contentId;

  // Build per-category row data
  let passedTotal = 0;
  let totalCells = 0;

  const rowsHTML = categories.map(({ key: cat, label: displayLabel }) => {
    const pills = displayModes.map(mode => {
      const { best, attempts, passed } = cellFor(cat, mode);
      if (passed) passedTotal++;
      totalCells++;

      const cls = passed ? 'pg-status--pass' : attempts > 0 ? 'pg-status--tried' : '';
      const value = passed ? '✓' : attempts > 0 ? `${best}%` : '·';
      const modeLabel = MODE_SHORT[mode] || 'Quiz';
      const modeIcon = MODE_ICONS[mode] || '◉';
      const title = mode === 'study'
        ? `Study: ${attempts > 0 ? `${best}% visto` : 'pendiente'}`
        : `${modeLabel}: ${attempts > 0 ? `${best}%` : 'pendiente'}`;
      const modeMarkup = showModeInPill
        ? `<span class="pg-status__mode" aria-hidden="true">${modeIcon}</span>`
        : '';
      const navLabel = `${displayLabel} — ${title} — ir al ejercicio`;
      return `<button type="button" class="pg-status pg-status--nav ${cls}" data-nav-cat="${cat}" data-nav-mode="${mode ?? ''}" title="${title}" aria-label="${navLabel}">${modeMarkup}<span class="pg-status__value">${value}</span></button>`;
    }).join('');

    return `<li class="pg-item"><span class="pg-item__label">${displayLabel}</span><div class="pg-item__modes">${pills}</div></li>`;
  }).join('');

  // Encabezado de columnas (ícono + texto corto) alineado sobre las píldoras,
  // para que el modo de cada columna se lea de un vistazo sin tener que
  // pasar el mouse por cada píldora — mismas columnas/ancho que .pg-item__modes.
  const colHeadersHTML = displayModes.map(mode => {
    const icon = MODE_ICONS[mode] || '◉';
    const label = MODE_SHORT[mode] || 'Quiz';
    return `<span class="pg-col-header"><span class="pg-col-header__icon" aria-hidden="true">${icon}</span><span class="pg-col-header__label">${label}</span></span>`;
  }).join('');

  const pct = totalCells > 0 ? Math.round((passedTotal / totalCells) * 100) : 0;

  // Umbrales reales de Aprobado/Maestría — derivados de la regla vigente
  // (no de un 50% fijo: varía según cuántos modos rastree cada módulo), para
  // que el marcador de hito y las tarjetas de nivel siempre coincidan con lo
  // que `getContentProgress` (y por tanto el check ✓ del dashboard) exige.
  const progress = getContentProgress(contentId);
  const completed = Boolean(progress?.completed);
  const mastered = Boolean(progress?.mastered);
  const rule = PROGRESS_RULES[contentId];
  const aprobadoCells = rule
    ? rule.requiredActivities.reduce((sum, activity) => sum + activity.scoreKeys.length, 0)
    : null;
  const aprobadoPct = aprobadoCells != null && totalCells > 0
    ? Math.min(100, Math.round((aprobadoCells / totalCells) * 100))
    : null;
  const hasMasteryTier = aprobadoPct != null && aprobadoPct < 100;

  const tierClass = mastered ? 'pg-modal__summary-pill--mastery' : completed ? 'pg-modal__summary-pill--done' : '';
  const tierIcon = mastered ? '👑' : completed ? '✓' : '';
  const clampedPct = Math.min(pct, 100);
  const doneWidth = aprobadoPct != null ? Math.min(clampedPct, aprobadoPct) : clampedPct;
  const masteryWidth = aprobadoPct != null ? Math.max(0, clampedPct - aprobadoPct) : 0;

  const modal = document.createElement('div');
  modal.id = 'progressDetailModal';
  modal.className = 'pg-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'pgModalTitle');
  modal.innerHTML = `
    <div class="pg-modal__backdrop"></div>
    <div class="pg-modal__panel">
      <header class="pg-modal__header">
        <div class="pg-modal__mark" aria-hidden="true">📊</div>
        <div class="pg-modal__header-text">
          <p class="pg-modal__eyebrow">${moduleTitle}</p>
          <h3 id="pgModalTitle">Progreso del módulo</h3>
        </div>
        <span class="pg-modal__summary-pill ${tierClass}">${tierIcon ? `${tierIcon} ` : ''}${passedTotal}/${totalCells} · ${pct}%</span>
        <button type="button" class="pg-modal__close" aria-label="Cerrar detalle de progreso">✕</button>
      </header>
      ${hasMasteryTier ? `
      <div class="pg-modal__track" role="img" aria-label="${pct}% del módulo. Completado se alcanza en ${aprobadoPct}%, Maestría en 100%.">
        <div class="pg-modal__track-seg pg-modal__track-seg--done" style="width:${doneWidth}%"></div>
        <div class="pg-modal__track-seg pg-modal__track-seg--mastery" style="left:${aprobadoPct}%; width:${masteryWidth}%"></div>
        <span class="pg-modal__track-tick ${completed ? 'is-reached' : ''}" style="left:${aprobadoPct}%" title="Completado (${aprobadoPct}%)"></span>
      </div>` : ''}
      <div class="pg-modal__body">
        <div class="pg-col-headers" aria-hidden="true">
          <span class="pg-col-headers__spacer"></span>
          <div class="pg-col-headers__modes">${colHeadersHTML}</div>
        </div>
        <ul class="pg-list">${rowsHTML}</ul>
      </div>
      <footer class="pg-modal__legend">
        <span class="pg-legend-item">
          <span class="pg-status pg-status--pass">✓</span> ≥${passScorePct}%
          ${studyPassPct != null ? `<span class="pg-legend-item__note">(Study exige ${studyPassPct}% visto)</span>` : ''}
        </span>
        <span class="pg-legend-item"><span class="pg-status pg-status--tried">%</span> intentado</span>
        <span class="pg-legend-item"><span class="pg-status">·</span> pendiente</span>
      </footer>
      ${hasMasteryTier ? `
      <div class="pg-modal__tiers">
        <div class="pg-tier pg-tier--done ${completed ? 'is-reached' : ''}">
          <span class="pg-tier__icon" aria-hidden="true">✓</span>
          <span class="pg-tier__text"><strong>Completado</strong>Study + Quiz al 100%</span>
        </div>
        <div class="pg-tier pg-tier--mastery ${mastered ? 'is-reached' : ''}">
          <span class="pg-tier__icon" aria-hidden="true">👑</span>
          <span class="pg-tier__text"><strong>Maestría</strong>Las 4 columnas al 100%</span>
        </div>
      </div>` : ''}
    </div>
  `;

  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add('pg-modal--open'));

  const close = () => {
    modal.classList.remove('pg-modal--open');
    setTimeout(() => modal.remove(), 250);
  };
  modal.querySelectorAll('[data-nav-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      close();
      navigateToModeCell(btn.dataset.navCat, btn.dataset.navMode || null);
    });
  });
  modal.querySelector('.pg-modal__backdrop').addEventListener('click', close);
  modal.querySelector('.pg-modal__close').addEventListener('click', close);
  modal.querySelector('.pg-modal__close').focus();
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
  });
}

/** Pone o quita el badge ✓ de un chip, sin tocar su etiqueta. */
function stampDoneMark(btn, done, srLabel) {
  const dot = btn.querySelector('.hf-done-dot');
  btn.classList.toggle('is-done', done);
  if (done && !dot) {
    btn.insertAdjacentHTML('beforeend', `<span class="hf-done-dot" aria-hidden="true">✓</span>`);
  } else if (!done && dot) {
    dot.remove();
  }
  const base = btn.dataset.doneBaseLabel ?? (btn.dataset.doneBaseLabel = btn.getAttribute('aria-label') || pillLabelText(btn));
  btn.setAttribute('aria-label', done ? `${base} — ${srLabel}` : base);
}

/**
 * Marca con ✓ los chips de sección y los mode tabs ya superados (≥ passScorePct),
 * al estilo de los `toolbar-done-dot` de LyricFlow.
 * - Sección: todos sus modos rastreados superados.
 * - Modo: superado en todas las secciones.
 * @param {string} contentId
 */
export function renderModuleCompletionMarks(contentId) {
  const matrix = buildModuleMatrix(contentId);
  if (!matrix) return;
  const { categories, displayModes, cellFor } = matrix;
  if (!categories.length || !displayModes.length) return;

  document.querySelectorAll(SECTION_PILL_SELECTOR).forEach((btn) => {
    const cat = btn.dataset.cat ?? btn.dataset.level;
    if (!categories.some((c) => c.key === cat)) return;
    const done = displayModes.every((mode) => cellFor(cat, mode).passed);
    stampDoneMark(btn, done, 'sección completada');
  });

  // El tab Study se marca aparte con su propio umbral (100% de items vistos, no
  // el passScorePct de quiz/match/timed) — no participa del check de sección de
  // arriba para no exigir Study donde antes no hacía falta (ver includeStudy en
  // computeModuleMatrixCore).
  const studyMatrix = buildModuleMatrix(contentId, { includeStudy: true });

  document.querySelectorAll('.pill-bar [data-mode], .ex-header__modes [data-mode]').forEach((btn) => {
    const mode = btn.dataset.mode;
    if (mode === 'study') {
      if (!studyMatrix || !studyMatrix.studyPassPct) return;
      const done = studyMatrix.categories.every(({ key }) => studyMatrix.cellFor(key, 'study').passed);
      stampDoneMark(btn, done, 'modo completado');
      return;
    }
    if (!displayModes.includes(mode)) return;
    const done = categories.every(({ key }) => cellFor(key, mode).passed);
    stampDoneMark(btn, done, 'modo completado');
  });
}

/** Variante sin argumentos: resuelve el contentId desde el DOM de la página. */
export function refreshModuleCompletionMarks() {
  const id = document.getElementById('lessonProgress')?.dataset.contentId
    || document.getElementById('lessonProgressBtn')?.dataset.contentId;
  if (id) renderModuleCompletionMarks(id);
}
