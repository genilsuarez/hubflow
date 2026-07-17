import { MODULES, PROGRESS_RULES } from '../data/catalog.js';

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

/** Theme toggle */
export function initTheme(storageKey = 'lp-theme') {
  const saved = localStorage.getItem(storageKey);
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  updateThemeButton();
}

export function toggleTheme(storageKey = 'lp-theme') {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme === 'dark' ? 'dark' : '');
  localStorage.setItem(storageKey, newTheme);
  updateThemeButton();
}

function updateThemeButton() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.textContent = isDark ? '☀️' : '🌙';
}

const PROGRESS_STORAGE_KEY = 'learnflow:progress:hubflow:v1';
const ACTIVITY_STORAGE_KEY = 'learnflow:activity:hubflow:v1';
const MAX_SCORE_HISTORY = 20;
const MAX_ACTIVITY_EVENTS = 200;

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null');
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function readScoreHistory(key) {
  const history = readJson(key, []);
  return Array.isArray(history) ? history : [];
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

export function getContentProgress(contentId) {
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
    contentType: 'exercise',
    progressPct,
    completed,
    completedAt,
    bestScorePct: activityStates.reduce((best, activity) => Math.max(best, activity.bestScorePct), 0),
    attempts: activityStates.reduce((total, activity) => total + activity.attempts, 0),
    activities,
  };
}

export function isContentCompleted(contentId) {
  return getContentProgress(contentId)?.completed || false;
}

export function getBestScore(contentId) {
  return getContentProgress(contentId)?.bestScorePct || 0;
}

export function getProgressStats(masterScorePct = 90) {
  const uniqueScoreKeys = new Set(
    Object.values(PROGRESS_RULES).flatMap((rule) =>
      rule.requiredActivities.flatMap((activity) => activity.scoreKeys)
    )
  );
  const content = MODULES.map((module) => getContentProgress(module.id)).filter(Boolean);
  return {
    totalAttempts: [...uniqueScoreKeys].reduce((total, key) => total + readScoreHistory(key).length, 0),
    masteredContent: content.filter((item) => item.bestScorePct >= masterScorePct).length,
    totalContent: content.length,
  };
}

export function publishHubFlowProgress() {
  const updatedAt = new Date().toISOString();
  const content = Object.fromEntries(MODULES.map((module) => [
    module.id,
    getContentProgress(module.id),
  ]));
  const contentStates = Object.values(content).filter(Boolean);
  const summary = {
    progressPct: contentStates.length
      ? contentStates.reduce((total, item) => total + item.progressPct, 0) / contentStates.length
      : 0,
    completedContent: contentStates.filter((item) => item.completed).length,
    totalContent: contentStates.length,
    attemptedContent: contentStates.filter((item) => item.attempts > 0).length,
  };
  const projection = {
    schemaVersion: 1,
    app: 'hubflow',
    updatedAt,
    catalogVersion: 'hubflow-catalog-v1',
    summary,
    content,
  };
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(projection));
  return projection;
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
  const event = {
    eventId,
    runId: typeof context?.runId === 'string' ? context.runId : eventId,
    app: 'hubflow',
    contentId: match.contentId,
    activity: context?.activity || match.activity.activityId,
    eventType: 'attempt_completed',
    occurredAt: timestamp,
    scorePct: pct,
    passed: pct >= match.activity.passScorePct,
    metrics: context?.metrics && typeof context.metrics === 'object' ? context.metrics : {},
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
  localStorage.setItem(key, JSON.stringify(history.slice(0, MAX_SCORE_HISTORY)));
  recordActivityEvent(key, normalizedPct, timestamp, context);
  publishHubFlowProgress();
  // Auto-refresh the lesson progress bar if present in the DOM
  if (typeof document !== 'undefined' && document.getElementById('lessonProgress')) {
    const contentId = context?.contentId || document.getElementById('lessonProgress')?.dataset?.contentId;
    if (contentId) renderLessonProgress(contentId);
  }
}

if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  publishHubFlowProgress();
}

/** Stars calculation */
export function getStars(pct) {
  if (pct === 100) return 3;
  if (pct >= 60) return 2;
  return 1;
}

/**
 * Renders a category picker bar (used by sentence-quiz-engine and
 * typed-answer-engine — identical markup/behavior in both, only the current
 * category is engine-local state, so it's read/written via getter/setter).
 */
export function renderCatBar({ containerId = 'catBar', categories, getCurrentCat, setCurrentCat, onChange }) {
  const bar = document.getElementById(containerId);
  const catKeys = Object.keys(categories);
  bar.innerHTML = catKeys.map(k =>
    `<button class="cat-btn ${k === getCurrentCat() ? 'active' : ''}" data-cat="${k}">${categories[k].icon} ${categories[k].label}</button>`
  ).join('');
  bar.querySelectorAll('[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      setCurrentCat(btn.dataset.cat);
      bar.querySelectorAll('[data-cat]').forEach(b => b.classList.toggle('active', b.dataset.cat === getCurrentCat()));
      onChange();
    });
  });

  // Auto-wrap with scroll arrows if not already wrapped
  const parent = bar.parentElement;
  if (!parent.classList.contains('cat-bar-wrap') && !parent.classList.contains('cat-scroll-wrapper')) {
    const wrap = document.createElement('div');
    wrap.className = 'cat-bar-wrap';
    const arrowL = document.createElement('button');
    arrowL.className = 'cat-bar-arrow cat-bar-arrow--left';
    arrowL.setAttribute('aria-label', 'Scroll left');
    arrowL.textContent = '\u2039';
    const arrowR = document.createElement('button');
    arrowR.className = 'cat-bar-arrow cat-bar-arrow--right';
    arrowR.setAttribute('aria-label', 'Scroll right');
    arrowR.textContent = '\u203A';

    parent.insertBefore(wrap, bar);
    wrap.appendChild(arrowL);
    wrap.appendChild(bar);
    wrap.appendChild(arrowR);

    const SCROLL_STEP = 140;
    function updateArrows() {
      const canLeft = bar.scrollLeft > 4;
      const canRight = bar.scrollLeft < bar.scrollWidth - bar.clientWidth - 4;
      arrowL.classList.toggle('visible', canLeft);
      arrowR.classList.toggle('visible', canRight);
      wrap.classList.toggle('cat-bar-wrap--fade-left', canLeft && !canRight);
      wrap.classList.toggle('cat-bar-wrap--fade-right', !canLeft && canRight);
      wrap.classList.toggle('cat-bar-wrap--fade-both', canLeft && canRight);
    }
    arrowL.addEventListener('click', () => { bar.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' }); });
    arrowR.addEventListener('click', () => { bar.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' }); });
    bar.addEventListener('scroll', updateArrows, { passive: true });
    new ResizeObserver(updateArrows).observe(bar);
    setTimeout(updateArrows, 50);
  }
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
  containerEl.classList.add('show');

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
 * Renders (or updates) an inline lesson-progress bar inside an exercise page.
 * Call on init and after each recordScore to keep the UI current.
 * @param {string} contentId — module ID matching PROGRESS_RULES
 * @param {object} [options]
 * @param {string} [options.insertAfter] — CSS selector(s) for the element after which to insert (comma-separated, tries each in order)
 */
export function renderLessonProgress(contentId, { insertAfter = '.pill-bar' } = {}) {
  if (!contentId) return;

  const progress = getContentProgress(contentId);
  if (!progress) return;

  let container = document.getElementById('lessonProgress');
  if (!container) {
    container = document.createElement('div');
    container.id = 'lessonProgress';
    container.className = 'lesson-progress';
    container.dataset.contentId = contentId;
    const selectors = insertAfter.split(',').map(s => s.trim());
    let anchor = null;
    for (const sel of selectors) {
      anchor = document.querySelector(sel);
      if (anchor) break;
    }
    if (anchor) anchor.insertAdjacentElement('afterend', container);
    else return;
  }

  const { completedKeys, totalKeys } = progress.activities
    ? Object.values(progress.activities).reduce((acc, act) => ({
        completedKeys: acc.completedKeys + act.completedKeys,
        totalKeys: acc.totalKeys + act.totalKeys,
      }), { completedKeys: 0, totalKeys: 0 })
    : { completedKeys: 0, totalKeys: 0 };

  const pct = Math.round(progress.progressPct);
  const label = progress.completed
    ? '✓ Completado'
    : `${completedKeys}/${totalKeys} categorías`;

  container.setAttribute('role', 'status');
  container.setAttribute('aria-label', `Progreso del ejercicio: ${pct}%`);
  container.innerHTML = `
    <span class="lesson-progress__label">${label}</span>
    <span class="lesson-progress__bar" aria-hidden="true">
      <span class="lesson-progress__fill${progress.completed ? ' lesson-progress__fill--done' : ''}" style="width:${pct}%"></span>
    </span>
    <span class="lesson-progress__pct">${pct}%</span>
  `;
}
