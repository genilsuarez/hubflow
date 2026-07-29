/* ═══════════════════════════════════════════════════════
   HubFlow Dashboard — Hero Suggestion
   Picks and renders the "what to practice next" hero card. The suggested
   module is persisted so repeated dashboard visits don't reshuffle it, and
   the current suggestion stays fully internal to this module — callers never
   read or mutate it directly, they call refreshHeroSuggestion() instead.
   ═══════════════════════════════════════════════════════ */

import { MODULES, TAGS, catColor, moduleMap } from '../data/catalog.js';
import { LEARNING_PATHS } from '../data/learning-paths.js';
import { getBestScore, isContentCompleted } from './progress-store.js';
import { shouldDeferStatsDisplay } from './sync-engine.js';
import { prefersReducedMotion } from './lp-stats-animate.js';

function getSuggestion(exclude, { refresh = false } = {}) {
  if (!refresh) {
    const persisted = readPersistedHeroSuggestion();
    if (isPersistedHeroSuggestionValid(persisted)) {
      return persisted;
    }
  }

  const exercises = MODULES.filter(m => m.exercise && m.category !== 'guides');
  // Priority 1: recent attempt with score < 70%
  const needsImprovement = exercises.filter(m => {
    if (m.id === exclude) return false;
    const best = getBestScore(m.id);
    return best > 0 && best < 70;
  });
  if (needsImprovement.length) {
    needsImprovement.sort((a, b) => getBestScore(a.id) - getBestScore(b.id) || a.id.localeCompare(b.id));
    const mod = needsImprovement[0];
    return persistHeroSuggestion({ mod, reason: 'Mejorar tu último intento' });
  }
  // Priority 2: next incomplete module in most-progressed path
  const pathProgress = LEARNING_PATHS.map(path => {
    const done = path.modules.filter(isContentCompleted).length;
    const next = path.modules.find(id => id !== exclude && !isContentCompleted(id));
    return { path, done, next, pct: done / path.modules.length };
  }).filter(p => p.next && p.done > 0).sort((a, b) => b.pct - a.pct);
  if (pathProgress.length) {
    const { path, next } = pathProgress[0];
    const mod = moduleMap.get(next);
    if (mod) return persistHeroSuggestion({ mod, reason: `Continúa la ruta ${path.title}` });
  }
  // Priority 3: never attempted module at lowest CEFR
  const cefrOrder = TAGS.cefr;
  const unattempted = exercises.filter(m => m.id !== exclude && getBestScore(m.id) === 0 && !isContentCompleted(m.id));
  if (unattempted.length) {
    unattempted.sort((a, b) => cefrOrder.indexOf(a.cefr) - cefrOrder.indexOf(b.cefr));
    const mod = unattempted[0];
    return persistHeroSuggestion({ mod, reason: 'Algo nuevo para ti' });
  }
  // Priority 4: random from least-visited category
  const catCounts = {};
  exercises.forEach(m => { catCounts[m.category] = (catCounts[m.category] || 0) + (getBestScore(m.id) > 0 ? 1 : 0); });
  const leastCat = Object.entries(catCounts).sort((a, b) => a[1] - b[1])[0]?.[0];
  const pool = exercises.filter(m => m.category === leastCat && m.id !== exclude);
  if (pool.length) {
    pool.sort((a, b) => a.id.localeCompare(b.id));
    const mod = pool[0];
    return persistHeroSuggestion({ mod, reason: 'Explora esta categoría' });
  }
  return persistHeroSuggestion({ mod: exercises[0], reason: 'Practica hoy' });
}

const HERO_SUGGESTION_KEY = 'learnflow:hubflow:hero-suggestion:v1';

function readPersistedHeroSuggestion() {
  try {
    const raw = JSON.parse(localStorage.getItem(HERO_SUGGESTION_KEY) || 'null');
    if (!raw?.moduleId) return null;
    const mod = moduleMap.get(raw.moduleId);
    if (!mod) return null;
    return { mod, reason: raw.reason || 'Continúa practicando' };
  } catch {
    return null;
  }
}

function persistHeroSuggestion(suggestion) {
  try {
    localStorage.setItem(HERO_SUGGESTION_KEY, JSON.stringify({
      moduleId: suggestion.mod.id,
      reason: suggestion.reason,
      savedAt: new Date().toISOString(),
    }));
  } catch {
    /* noop */
  }
  return suggestion;
}

/** Exported standalone: `lp-guest-reset` only clears the persisted pick and
 *  lets the normal stats-refresh cycle compute a fresh one — it does not force
 *  the animated reset that the "Otra sugerencia" button does. */
export function clearPersistedHeroSuggestion() {
  try {
    localStorage.removeItem(HERO_SUGGESTION_KEY);
  } catch {
    /* noop */
  }
}

function isPersistedHeroSuggestionValid(suggestion) {
  if (!suggestion?.mod) return false;
  return !isContentCompleted(suggestion.mod.id);
}

let currentSuggestion = null;

export function renderHeroCard({ animateReveal = false, refreshSuggestion = false } = {}) {
  const heroCard = document.getElementById('heroCard');
  const launch = document.getElementById('heroLaunch');
  const iconEl = document.getElementById('heroIcon');
  const contextEl = document.getElementById('heroContext');
  const titleEl = document.getElementById('heroTitle');
  const metaEl = document.getElementById('heroMeta');
  const altBtn = document.getElementById('heroAlt');

  function setLaunchInteractive(enabled) {
    if (enabled) {
      launch.removeAttribute('aria-disabled');
      launch.removeAttribute('tabindex');
    } else {
      launch.setAttribute('aria-disabled', 'true');
      launch.setAttribute('tabindex', '-1');
    }
  }

  function revealHeroContent() {
    heroCard.classList.remove('hero-card--pending');
    heroCard.classList.add('hero-card--revealed');
  }

  if (shouldDeferStatsDisplay()) {
    heroCard.classList.add('hero-card--loading');
    heroCard.classList.remove('hero-card--welcome', 'hero-card--revealed', 'hero-card--pending');
    heroCard.style.removeProperty('--hero-spine');
    document.getElementById('resumenHero')?.style.removeProperty('--hero-spine');
    iconEl.textContent = '';
    contextEl.textContent = ' ';
    titleEl.textContent = ' ';
    metaEl.textContent = '';
    contextEl.setAttribute('aria-hidden', 'true');
    titleEl.setAttribute('aria-hidden', 'true');
    launch.href = '#';
    launch.setAttribute('aria-label', 'Cargando sugerencia');
    setLaunchInteractive(false);
    altBtn.hidden = true;
    return;
  }

  heroCard.classList.remove('hero-card--loading');
  const hasAnyProgress = MODULES.some(m => getBestScore(m.id) > 0);

  if (!hasAnyProgress) {
    heroCard.classList.add('hero-card--welcome');
    heroCard.classList.remove('hero-card--pending');
    heroCard.classList.add('hero-card--revealed');
    heroCard.style.setProperty('--hero-spine', 'var(--lp-accent)');
    heroCard.style.setProperty('--card-soft', 'var(--lp-accent-soft)');
    document.getElementById('resumenHero')?.style.setProperty('--hero-spine', 'var(--lp-accent)');
    document.getElementById('resumenHero')?.style.setProperty('--card-soft', 'var(--lp-accent-soft)');
    iconEl.textContent = '🚀';
    contextEl.textContent = 'Bienvenido a HubFlow';
    titleEl.textContent = MODULES.length + ' ejercicios te esperan';
    metaEl.textContent = 'Empieza por lo que más te llame o sigue una ruta guiada.';
    contextEl.removeAttribute('aria-hidden');
    titleEl.removeAttribute('aria-hidden');
    const firstPath = LEARNING_PATHS[0];
    const firstMod = firstPath ? moduleMap.get(firstPath.modules[0]) : MODULES[0];
    launch.href = firstMod ? firstMod.exercise : '#';
    launch.setAttribute('aria-label', 'Empezar ruta guiada');
    setLaunchInteractive(true);
    altBtn.hidden = true;
    return;
  }

  const suggestion = getSuggestion(
    refreshSuggestion ? currentSuggestion?.mod?.id : undefined,
    { refresh: refreshSuggestion }
  );
  currentSuggestion = suggestion;
  const { mod, reason } = suggestion;
  const color = catColor(mod.category);
  const soft = catColor(mod.category, true);
  heroCard.style.setProperty('--hero-spine', color);
  heroCard.style.setProperty('--card-soft', soft);
  document.getElementById('resumenHero')?.style.setProperty('--hero-spine', color);
  document.getElementById('resumenHero')?.style.setProperty('--card-soft', soft);
  heroCard.classList.remove('hero-card--welcome');
  iconEl.textContent = mod.icon;
  contextEl.textContent = reason;
  titleEl.textContent = mod.title;
  metaEl.textContent = mod.meta;
  contextEl.removeAttribute('aria-hidden');
  titleEl.removeAttribute('aria-hidden');
  launch.href = mod.exercise;
  launch.setAttribute('aria-label', 'Empezar: ' + mod.title);
  setLaunchInteractive(true);
  altBtn.hidden = false;
  altBtn.textContent = 'Otra sugerencia';

  if (animateReveal && !prefersReducedMotion()) {
    heroCard.classList.remove('hero-card--revealed');
    heroCard.classList.add('hero-card--pending');
    requestAnimationFrame(() => {
      requestAnimationFrame(revealHeroContent);
    });
  } else {
    revealHeroContent();
  }
}

/** Forces a fresh suggestion (ignores the persisted one) and re-renders —
 *  used by the "Otra sugerencia" button and the guest-reset handler, neither
 *  of which needs to know about `currentSuggestion` directly. */
export function refreshHeroSuggestion() {
  clearPersistedHeroSuggestion();
  currentSuggestion = null;
  renderHeroCard({ animateReveal: true, refreshSuggestion: true });
}
