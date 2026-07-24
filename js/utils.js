import { MODULES, PROGRESS_RULES, HUBFLOW_PASS_SCORE_PCT, MODULE_DEPTH } from '../data/catalog.js';
import * as lpSupabase from './lp-supabase.js';
import {
  isCloudHydrated,
  reconcileHubflowProgressFromEvents,
  shouldDeferStatsDisplay,
  syncSingleApp,
} from './sync-engine.js';
import { enrichHubflowContentEntry, recomputeProgressDocumentSummary } from './lp-progress-summary.js';

/* ═══════════════════════════════════════════════════════
   HubFlow — Shared Utilities
   ═══════════════════════════════════════════════════════ */

/** Fisher-Yates shuffle (returns new array) */
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const PROGRESS_STORAGE_KEY = 'learnflow:progress:hubflow:v1';
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
export function getHubFlowProgressSummary() {
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

export function publishHubFlowProgress() {
  const updatedAt = new Date().toISOString();
  const content = Object.fromEntries(MODULES.map((module) => [
    module.id,
    getContentProgress(module.id),
  ]));
  const contentStates = Object.values(content).filter(Boolean);
  const summary = buildHubFlowSummary(contentStates);
  const projection = {
    schemaVersion: 1,
    app: 'hubflow',
    updatedAt,
    catalogVersion: 'hubflow-catalog-v1',
    summary,
    content,
  };
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(projection));
  invalidateProjectionCache();
  notifyHubFlowProgressUpdated();
  return projection;
}

// Rebuild per-exercise score keys from the cloud projection (learnflow:progress:hubflow:v1).
// Score-history keys drive granular exercise UI; the v1 projection is the cross-app source.
export function syncScoreKeysFromProgressDoc() {
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

export function syncScoreKeysFromActivityDoc() {
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

const CAT_EXPANDER_INIT = 'data-cat-expander-init';
const CAT_PILL_SELECTOR = '.cat-btn, .pill-btn';

function ensureCatScrollWrapper(bar, wrapperId = 'catWrapper') {
  let parent = bar.parentElement;

  if (parent?.classList.contains('cat-bar-wrap')) {
    const host = parent.parentElement;
    const wrap = document.createElement('div');
    wrap.className = 'cat-scroll-wrapper';
    if (wrapperId) wrap.id = wrapperId;
    host.insertBefore(wrap, parent);
    wrap.appendChild(bar);
    parent.remove();
    return wrap;
  }

  if (parent?.classList.contains('cat-scroll-wrapper')) {
    if (wrapperId && !parent.id) parent.id = wrapperId;
    return parent;
  }

  const wrap = document.createElement('div');
  wrap.className = 'cat-scroll-wrapper';
  if (wrapperId) wrap.id = wrapperId;
  parent.insertBefore(wrap, bar);
  wrap.appendChild(bar);
  return wrap;
}

function ensureCatExpandButton(bar) {
  let expandBtn = bar.querySelector('.cat-expand-btn');
  if (!expandBtn) {
    expandBtn = document.createElement('button');
    expandBtn.className = 'cat-expand-btn';
    expandBtn.type = 'button';
    expandBtn.setAttribute('aria-label', 'Expandir categorías');
    expandBtn.setAttribute('aria-expanded', 'false');
    expandBtn.title = 'Ver todas';
    expandBtn.innerHTML = '<span class="expand-count"></span><span class="expand-icon">▼</span>';
    bar.appendChild(expandBtn);
    return expandBtn;
  }

  if (!expandBtn.querySelector('.expand-count')) {
    expandBtn.insertAdjacentHTML('afterbegin', '<span class="expand-count"></span>');
  }
  if (!expandBtn.querySelector('.expand-icon')) {
    const icon = document.createElement('span');
    icon.className = 'expand-icon';
    icon.textContent = '▼';
    expandBtn.appendChild(icon);
  }
  if (expandBtn.parentElement === bar && expandBtn !== bar.lastElementChild) {
    bar.appendChild(expandBtn);
  }
  return expandBtn;
}

function runCatBarScrollHint(bar, wrapper, expandBtn) {
  const { scrollWidth, clientWidth } = bar;
  if (scrollWidth <= clientWidth + 20) return;

  expandBtn.classList.add('nudge');
  expandBtn.addEventListener('animationend', () => expandBtn.classList.remove('nudge'), { once: true });

  const peekDist = Math.min(60, scrollWidth - clientWidth);
  bar.style.scrollBehavior = 'smooth';
  bar.scrollLeft = peekDist;
  setTimeout(() => { bar.scrollLeft = 0; }, 500);

  let hintBar = wrapper.querySelector('.scroll-hint-bar');
  if (!hintBar) {
    hintBar = document.createElement('div');
    hintBar.className = 'scroll-hint-bar';
    wrapper.appendChild(hintBar);
  }
  setTimeout(() => hintBar.classList.add('flash'), 100);
  setTimeout(() => hintBar.classList.remove('flash'), 1200);
}

/**
 * Unified category bar: horizontal scroll, edge fades, and expand/collapse.
 * Upgrades legacy .cat-bar-wrap (arrow navigation) automatically.
 */
export function initCatBarExpander({
  barId = 'catBar',
  wrapperId = 'catWrapper',
  hintOnLoad = false,
} = {}) {
  const bar = document.getElementById(barId);
  if (!bar) return;

  const wrapper = ensureCatScrollWrapper(bar, wrapperId);
  ensureCatExpandButton(bar);

  const expandBtn = bar.querySelector('.cat-expand-btn');
  const expandCount = expandBtn?.querySelector('.expand-count');

  function getPills() {
    return bar.querySelectorAll(CAT_PILL_SELECTOR);
  }

  function countHiddenPills() {
    if (!expandBtn || !expandCount) return;
    if (wrapper.classList.contains('expanded')) {
      expandBtn.disabled = false;
      expandCount.textContent = '';
      expandBtn.title = 'Colapsar';
      return;
    }

    const barRect = bar.getBoundingClientRect();
    let hidden = 0;
    getPills().forEach((pill) => {
      const rect = pill.getBoundingClientRect();
      if (rect.right < barRect.left + 4 || rect.left > barRect.right - 36) hidden++;
    });

    const hasOverflow = bar.scrollWidth > bar.clientWidth + 20;
    expandCount.textContent = hidden > 0 ? `+${hidden}` : '';
    expandBtn.title = hidden > 0 ? `${hidden} más` : 'Ver todas';
    expandBtn.disabled = !hasOverflow && hidden === 0;
  }

  function updateFades() {
    if (wrapper.classList.contains('expanded')) return;
    const { scrollLeft, scrollWidth, clientWidth } = bar;
    wrapper.classList.toggle('fade-left', scrollLeft > 8);
    wrapper.classList.toggle('fade-right', scrollLeft + clientWidth < scrollWidth - 8);
    countHiddenPills();
  }

  if (expandBtn) {
    expandBtn.onclick = () => {
      const expanded = wrapper.classList.toggle('expanded');
      expandBtn.setAttribute('aria-expanded', expanded);
      if (expanded) {
        if (expandCount) expandCount.textContent = '';
        expandBtn.title = 'Colapsar';
        return;
      }

      const active = bar.querySelector(`${CAT_PILL_SELECTOR}.active`);
      if (active) {
        bar.style.scrollBehavior = 'auto';
        requestAnimationFrame(() => {
          active.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'instant' });
          bar.style.scrollBehavior = '';
        });
      }
      requestAnimationFrame(updateFades);
    };
  }

  if (!wrapper.getAttribute(CAT_EXPANDER_INIT)) {
    wrapper.setAttribute(CAT_EXPANDER_INIT, '1');

    bar.addEventListener('scroll', updateFades, { passive: true });
    new MutationObserver(updateFades).observe(bar, { childList: true });
    new MutationObserver(() => {
      if (!wrapper.classList.contains('expanded')) updateFades();
    }).observe(wrapper, { attributes: true, attributeFilter: ['class'] });
    new ResizeObserver(updateFades).observe(bar);

    if (hintOnLoad) {
      setTimeout(() => runCatBarScrollHint(bar, wrapper, expandBtn), 400);
    }
  }

  requestAnimationFrame(updateFades);
}

/**
 * Renders a category picker bar (used by sentence-quiz-engine and
 * typed-answer-engine — identical markup/behavior in both, only the current
 * category is engine-local state, so it's read/written via getter/setter).
 */
export function renderCatBar({ containerId = 'catBar', categories, getCurrentCat, setCurrentCat, onChange, formatLabel }) {
  const bar = document.getElementById(containerId);
  const expandBtn = bar.querySelector('.cat-expand-btn');
  const catKeys = Object.keys(categories);
  const pills = catKeys.map((k) => {
    const cat = categories[k];
    const label = formatLabel ? formatLabel(k, cat) : `${cat.icon} ${cat.label}`;
    return `<button class="cat-btn ${k === getCurrentCat() ? 'active' : ''}" data-cat="${k}">${label}</button>`;
  }).join('');
  bar.querySelectorAll('.cat-btn').forEach(el => el.remove());
  if (expandBtn) expandBtn.insertAdjacentHTML('beforebegin', pills);
  else bar.innerHTML = pills;
  bar.querySelectorAll('[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      setCurrentCat(btn.dataset.cat);
      bar.querySelectorAll('[data-cat]').forEach(b => b.classList.toggle('active', b.dataset.cat === getCurrentCat()));
      onChange();
    });
  });

  initCatBarExpander({ barId: containerId });
}

/** Groups a Timer instance with its total duration so both can be reset in
 *  one call (used by sentence-quiz-engine and typed-answer-engine). */
export function makeTimerState() {
  return {
    timer: null,
    timedSeconds: 0,
    stop() {
      if (this.timer) { this.timer.stop(); this.timer = null; }
      this.timedSeconds = 0;
    },
  };
}

/** Hoist practice action buttons into the shared #exBottomNav (stats + ✓ / → / ⏭). */
export function setupPracticeBottomNav(attempt = 0) {
  const checkBtn = document.getElementById('checkBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (!checkBtn || !nextBtn) return;

  const nav = document.getElementById('exBottomNav');
  if (!nav) {
    if (attempt < 40) setTimeout(() => setupPracticeBottomNav(attempt + 1), 50);
    return;
  }

  const hintBtn = document.getElementById('hintBtn');
  const skipBtn = document.getElementById('skipBtn');
  const progressBtn = document.getElementById('lessonProgressBtn');

  checkBtn.className = 'lp-btn lp-btn--primary typed-action-btn typed-action-btn--check';
  checkBtn.textContent = '✓';
  checkBtn.setAttribute('aria-label', 'Comprobar respuesta');
  checkBtn.title = 'Comprobar';

  nextBtn.className = 'lp-btn lp-btn--primary typed-action-btn typed-action-btn--next';
  nextBtn.textContent = '→';
  nextBtn.setAttribute('aria-label', 'Siguiente');
  nextBtn.title = 'Siguiente';
  nextBtn.hidden = true;

  if (hintBtn) {
    hintBtn.className = 'lp-btn lp-btn--ghost typed-hint-btn';
    hintBtn.textContent = '💡';
    hintBtn.setAttribute('aria-label', 'Mostrar pista');
    hintBtn.setAttribute('aria-pressed', 'false');
    hintBtn.title = 'Pista';
  }

  if (skipBtn) {
    skipBtn.className = 'lp-btn lp-btn--ghost typed-action-btn typed-action-btn--skip';
    skipBtn.textContent = '⏭';
    skipBtn.setAttribute('aria-label', 'Saltar');
    skipBtn.title = 'Saltar';
  }

  const wrapper = checkBtn.parentElement;
  let insertAfter = progressBtn?.parentElement === nav ? progressBtn : null;

  if (hintBtn && hintBtn.parentElement !== nav) {
    if (insertAfter) insertAfter.insertAdjacentElement('afterend', hintBtn);
    else nav.insertBefore(hintBtn, nav.firstChild);
    insertAfter = hintBtn;
  }

  if (checkBtn.parentElement !== nav) {
    if (insertAfter?.parentElement === nav) insertAfter.insertAdjacentElement('afterend', checkBtn);
    else nav.appendChild(checkBtn);
    insertAfter = checkBtn;
  }

  if (nextBtn.parentElement !== nav) {
    if (insertAfter?.parentElement === nav) insertAfter.insertAdjacentElement('afterend', nextBtn);
    else nav.appendChild(nextBtn);
    insertAfter = nextBtn;
  }

  if (skipBtn && skipBtn.parentElement !== nav) {
    if (insertAfter?.parentElement === nav) insertAfter.insertAdjacentElement('afterend', skipBtn);
    else nav.appendChild(skipBtn);
  }

  const meta = document.querySelector('.typed-answer-meta');
  if (meta && hintBtn && !meta.contains(hintBtn)) {
    const counter = meta.querySelector('.item-counter');
    if (counter) meta.parentElement?.insertBefore(counter, meta);
    meta.remove();
  }

  if (wrapper && wrapper !== nav && wrapper.tagName === 'DIV' && !wrapper.id && !wrapper.classList.length) {
    wrapper.remove();
  }

  nav.classList.add('ex-bottom-nav--practice');
}

export function setPracticeBottomNav({ check = true, next = false, skip = true } = {}) {
  const checkBtn = document.getElementById('checkBtn');
  const nextBtn = document.getElementById('nextBtn');
  const skipBtn = document.getElementById('skipBtn');
  if (checkBtn) checkBtn.hidden = !check;
  if (nextBtn) nextBtn.hidden = !next;
  if (skipBtn) skipBtn.hidden = !skip;
}

/** Progress bar update */
export function updateProgress(current, total, fillEl, txtEl, pctEl) {
  const pct = Math.round((current / total) * 100);
  if (fillEl) fillEl.style.width = `${pct}%`;
  if (txtEl) txtEl.textContent = `${current} / ${total}`;
  if (pctEl) pctEl.textContent = `${pct}%`;
}

/** Timer utility */
export class Timer {
  constructor(seconds, onTick, onEnd) {
    this.seconds = seconds;
    this.remaining = seconds;
    this.onTick = onTick;
    this.onEnd = onEnd;
    this.interval = null;
  }
  start() {
    this.remaining = this.seconds;
    this.onTick(this.remaining);
    this.interval = setInterval(() => {
      this.remaining--;
      this.onTick(this.remaining);
      if (this.remaining <= 0) { this.stop(); this.onEnd(); }
    }, 1000);
  }
  stop() {
    if (this.interval) { clearInterval(this.interval); this.interval = null; }
  }
  reset(seconds) {
    this.stop();
    if (seconds !== undefined) this.seconds = seconds;
    this.remaining = this.seconds;
  }
}

/** Format timer display */
export function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/** Show result overlay */
export function showResult({ correct, total, containerEl, onRestart, onStudy, elapsedSeconds }) {
  const pct = Math.round((correct / total) * 100);
  const stars = getStars(pct);
  const titles = { 3: 'Perfect! 🎉', 2: 'Well done!', 1: 'Keep practicing!' };

  const timeHtml = elapsedSeconds != null
    ? `<div class="result-time">⏱ ${formatTime(elapsedSeconds)}</div>`
    : '';

  containerEl.innerHTML = `
    <div class="result-box">
      <button class="result-close" id="resultClose" aria-label="Close">✕</button>
      <div class="result-stars">
        <span class="result-star ${stars >= 1 ? 'lit' : ''}">⭐</span>
        <span class="result-star ${stars >= 2 ? 'lit' : ''}">⭐</span>
        <span class="result-star ${stars >= 3 ? 'lit' : ''}">⭐</span>
      </div>
      <div class="result-title">${titles[stars]}</div>
      <div class="result-sub">${correct}/${total} correct — ${pct}%</div>
      ${timeHtml}
      <div class="result-btns">
        <button class="lp-btn lp-btn--primary" id="resultRestart">🔄 Try Again</button>
        ${onStudy ? '<button class="lp-btn lp-btn--ghost" id="resultStudy">📖 Study</button>' : ''}
      </div>
    </div>
  `;
  // Move overlay to body to escape .wrap stacking context (z-index: 1)
  if (containerEl.parentElement !== document.body) {
    document.body.appendChild(containerEl);
  }
  containerEl.classList.add('show');

  requestAnimationFrame(() => {
    containerEl.querySelector('#resultClose').addEventListener('click', () => {
      containerEl.classList.remove('show');
    });
    containerEl.querySelector('#resultRestart')?.addEventListener('click', () => {
      containerEl.classList.remove('show');
      onRestart();
    });
    containerEl.querySelector('#resultStudy')?.addEventListener('click', () => {
      containerEl.classList.remove('show');
      onStudy();
    });
  });

  return pct;
}

/* ═══════════════════════════════════════════════════════
   Text-to-Speech (Web Speech API) — shared TTS helper
   ═══════════════════════════════════════════════════════ */

/** Returns true if the browser supports speech synthesis. */
export function isSpeechAvailable() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/**
 * Speak text aloud using the Web Speech API.
 * @param {string} text - The text to speak.
 * @param {object} [opts] - { lang='en-GB', rate=0.85, pitch=1 }
 */
export function speak(text, { lang = 'en-GB', rate = 0.85, pitch = 1 } = {}) {
  if (!isSpeechAvailable() || !text) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = rate;
  u.pitch = pitch;
  window.speechSynthesis.speak(u);
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
export function openProgressDetail(contentId) {
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
