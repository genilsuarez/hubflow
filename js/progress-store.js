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
  HUBFLOW_LOCAL_READY_KEY,
} from './sync-engine.js';
import { enrichHubflowContentEntry, checkLevelAdvancement } from './lp-progress-summary.js';

const PROGRESS_STORAGE_KEY = 'learnflow:progress:hubflow:v1';
const CATALOG_STORAGE_KEY = 'learnflow:catalog:hubflow:v1';
const ACTIVITY_STORAGE_KEY = 'learnflow:activity:hubflow:v1';
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

function readProjectionDoc() {
  if (projectionDocCache) return projectionDocCache;
  reconcileHubflowProgressFromEvents();
  const doc = readJson(PROGRESS_STORAGE_KEY, null);
  if (!doc?.content) return null;
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

function mergeHubflowProgressItem(scoreDerived, projectionItem) {
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
    mergedActivities[activityId] = {
      ...existing,
      completed: Boolean(existing.completed) || Boolean(activity.completed),
      completedKeys: Math.max(existing.completedKeys ?? 0, activity.completedKeys ?? 0),
      totalKeys: Math.max(existing.totalKeys ?? 0, activity.totalKeys ?? 0),
      bestScorePct: Math.max(existing.bestScorePct ?? 0, activity.bestScorePct ?? 0),
      attempts: Math.max(existing.attempts ?? 0, activity.attempts ?? 0),
      completedAt: existing.completedAt || activity.completedAt || null,
      lastAttemptAt: existing.lastAttemptAt || activity.lastAttemptAt || null,
    };
  }

  return {
    ...projectionItem,
    ...scoreDerived,
    progressPct: Math.max(scoreDerived.progressPct ?? 0, projectionItem.progressPct ?? 0),
    completed: Boolean(scoreDerived.completed) || Boolean(projectionItem.completed),
    completedAt: scoreDerived.completedAt || projectionItem.completedAt || null,
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

export function getContentProgress(contentId) {
  if (shouldDeferStatsDisplay()) {
    return {
      contentId,
      progressPct: 0,
      completed: false,
      bestScorePct: 0,
      attempts: 0,
      activities: {},
    };
  }
  const fromScores = getContentProgressFromScoreKeys(contentId);
  const projectionItem = readProjectionDoc()?.content?.[contentId] ?? null;
  return mergeHubflowProgressItem(fromScores, projectionItem);
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
      JSON.stringify({ totalContent: MODULES.length, updatedAt: projection.updatedAt })
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
      for (const scoreKey of activity.scoreKeys) {
        if (readScoreHistory(scoreKey).length > 0) continue;
        try {
          localStorage.setItem(
            versionedKey(scoreKey),
            JSON.stringify([{ pct, date: timestamp, timestamp }])
          );
          changed = true;
        } catch {
          /* ignore quota errors */
        }
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

    const metricKey = typeof event.metrics?.scoreKey === 'string' ? event.metrics.scoreKey : null;
    const scoreKeysToFill = metricKey
      ? [metricKey]
      : activityRule.scoreKeys.filter((key) => readScoreHistory(key).length === 0);

    if (!scoreKeysToFill.length) {
      const fallback =
        activityRule.scoreKeys.find((key) => readScoreHistory(key).length === 0) ||
        activityRule.scoreKeys[0];
      if (fallback) scoreKeysToFill.push(fallback);
    }

    const timestamp = event.occurredAt || doc.updatedAt || new Date().toISOString();
    const pct = Math.max(0, Math.min(100, Number(event.scorePct) || 0));

    for (const scoreKey of scoreKeysToFill) {
      if (!scoreKey || readScoreHistory(scoreKey).length > 0) continue;

      try {
        localStorage.setItem(
          versionedKey(scoreKey),
          JSON.stringify([
            {
              pct,
              date: timestamp,
              timestamp,
              context: { contentId: event.contentId, activity: event.activity, scoreKey },
            },
          ])
        );
        changed = true;
      } catch {
        /* ignore quota errors */
      }
    }
  }
  return changed;
}

export function hydrateHubFlowFromCloud() {
  reconcileHubflowProgressFromEvents();
  syncScoreKeysFromProgressDoc();
  syncScoreKeysFromActivityDoc();
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
  return candidates.sort((a, b) => a.activity.scoreKeys.length - b.activity.scoreKeys.length)[0] || null;
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
  const normalizedPct = Math.max(0, Math.min(100, Number(pct) || 0));
  const timestamp = new Date().toISOString();
  const history = readScoreHistory(key);
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

// Sube progreso + eventos a Supabase cuando el usuario está autenticado.
// Debounced porque recordScore puede dispararse varias veces seguidas
// (p.ej. quiz de varias preguntas registrando cada intento).
let cloudSyncTimer = null;
let pendingCloudSync = false;

if (typeof window !== 'undefined') {
  window.addEventListener('lp-cloud-hydrated', () => {
    if (pendingCloudSync) scheduleCloudSync();
    reconcileHubflowProgressFromEvents();
    invalidateProjectionCache();
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
}

/**
 * Opens a modal showing detailed per-category progress for a module.
 * Shows columns for each tracked mode (quiz, match, etc.) per category.
 * @param {string} contentId
 */
function openProgressDetail(contentId) {
  if (!contentId) return;
  const rule = PROGRESS_RULES[contentId];
  if (!rule) return;

  // Remove existing modal if open
  document.getElementById('progressDetailModal')?.remove();

  const passScorePct = rule.requiredActivities[0]?.passScorePct || HUBFLOW_PASS_SCORE_PCT;

  // Determine the storage prefix from the first scoreKey
  const sampleKey = rule.requiredActivities[0]?.scoreKeys[0] || '';
  const prefix = sampleKey.split('-')[0]; // e.g. "vocab", "ing", "art"

  // Extract unique categories from scoreKeys
  const knownModes = ['quiz', 'match', 'write', 'study', 'challenge', 'timed'];
  const categoriesFromKeys = new Set();
  const modesFromKeys = new Set();
  let hasNoModeSuffix = false;

  for (const act of rule.requiredActivities) {
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

  // For flashcard exercises, also check for match keys that exist in localStorage
  const categories = [...categoriesFromKeys];
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

  // Determine display modes — always show quiz first, then others
  const MODE_ORDER = ['quiz', 'match', 'timed', 'write', 'study', 'challenge', null];
  const MODE_SHORT = { quiz: 'Quiz', match: 'Match', write: 'Write', study: 'Study', challenge: 'Chall.', timed: 'Timed', null: 'Practice' };
  const MODE_ICONS = { quiz: '⚡', match: '⇄', write: '✎', study: '◉', challenge: '◆', timed: '◷', null: '◉' };
  const displayModes = MODE_ORDER.filter(m => trackedModes.includes(m));
  const showModeInPill = displayModes.length > 1;

  const mod = MODULES.find(m => m.id === contentId);
  const moduleTitle = mod?.title || contentId;

  // Build per-category row data
  let passedTotal = 0;
  let totalCells = 0;

  const rowsHTML = categories.map(cat => {
    const displayLabel = cat.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim();

    const pills = displayModes.map(mode => {
      const key = mode === null ? `${prefix}-${cat}` : `${prefix}-${cat}-${mode}`;
      const history = readScoreHistory(key);
      const best = history.reduce((max, a) => Math.max(max, Number(a.pct) || 0), 0);
      const attempts = history.length;
      const passed = best >= passScorePct;
      if (passed) passedTotal++;
      totalCells++;

      const cls = passed ? 'pg-status--pass' : attempts > 0 ? 'pg-status--tried' : '';
      const value = passed ? '✓' : attempts > 0 ? `${best}%` : '·';
      const modeLabel = MODE_SHORT[mode] || 'Practice';
      const modeIcon = MODE_ICONS[mode] || '◉';
      const title = `${modeLabel}: ${attempts > 0 ? `${best}%` : 'pendiente'}`;
      const modeMarkup = showModeInPill
        ? `<span class="pg-status__mode" aria-hidden="true">${modeIcon}</span>`
        : '';
      return `<span class="pg-status ${cls}" title="${title}">${modeMarkup}${value}</span>`;
    }).join('');

    return `<li class="pg-item"><span class="pg-item__label">${displayLabel}</span><div class="pg-item__modes">${pills}</div></li>`;
  }).join('');

  const pct = totalCells > 0 ? Math.round((passedTotal / totalCells) * 100) : 0;

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
        <span class="pg-modal__summary-pill">${passedTotal}/${totalCells} · ${pct}%</span>
        <button type="button" class="pg-modal__close" aria-label="Cerrar detalle de progreso">✕</button>
      </header>
      <div class="pg-modal__body"><ul class="pg-list">${rowsHTML}</ul></div>
      <footer class="pg-modal__legend">
        <span class="pg-legend-item"><span class="pg-status pg-status--pass">✓</span> ≥${passScorePct}%</span>
        <span class="pg-legend-item"><span class="pg-status pg-status--tried">%</span> intentado</span>
        <span class="pg-legend-item"><span class="pg-status">·</span> pendiente</span>
      </footer>
    </div>
  `;

  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add('pg-modal--open'));

  const close = () => {
    modal.classList.remove('pg-modal--open');
    setTimeout(() => modal.remove(), 250);
  };
  modal.querySelector('.pg-modal__backdrop').addEventListener('click', close);
  modal.querySelector('.pg-modal__close').addEventListener('click', close);
  modal.querySelector('.pg-modal__close').focus();
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
  });
}
