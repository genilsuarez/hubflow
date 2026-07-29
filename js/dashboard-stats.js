/* ═══════════════════════════════════════════════════════
   HubFlow Dashboard — Progress Views
   Rutas card, progress snapshot ring, last-activities list, header stats,
   and the "Mi Progreso" learning-paths accordion. All read-only views over
   catalog + progress data.
   ═══════════════════════════════════════════════════════ */

import { MODULES, catColor, moduleMap, getModuleDepth } from '../data/catalog.js';
import { LEARNING_PATHS } from '../data/learning-paths.js';
import { getBestScore, isContentCompleted, getProgressStats } from './progress-store.js';
import { shouldDeferStatsDisplay, shouldDeferActivityDisplay } from './sync-engine.js';
import { animateText, animateCssVar } from './lp-stats-animate.js';

export function renderRutas() {
  const grid = document.getElementById('rutasGrid');
  if (!grid) return;
  grid.innerHTML = LEARNING_PATHS.map(path => {
    const done = path.modules.filter(isContentCompleted).length;
    const total = path.modules.length;
    const nextIdx = path.modules.findIndex(id => !isContentCompleted(id));
    const steps = path.modules.map((id, i) => {
      const mod = moduleMap.get(id);
      const label = mod ? mod.title : id;
      const href = mod ? mod.exercise : '#';
      const isDone = isContentCompleted(id);
      const isCurrent = i === nextIdx;
      const cls = isDone ? 'done' : isCurrent ? 'current' : '';
      const depth = getModuleDepth(id);
      const itemsBadge = depth ? `<span class="ruta-step__items">${depth.items}</span>` : '';
      return `<a class="ruta-step ${cls}" href="${href}" title="${label}">${label}${itemsBadge}</a>`;
    }).join('');
    const color = 'var(--lp-accent)';
    const totalItems = path.modules.reduce((sum, id) => {
      const d = getModuleDepth(id);
      return sum + (d ? d.items : 0);
    }, 0);
    const totalTooltip = `${totalItems} items de práctica en ${total} ejercicios — cada uno con múltiples categorías y modos`;
    return `<div class="ruta-card" style="--ruta-color: ${color}">
      <div class="ruta-card__header">
        <span class="ruta-card__icon">${path.icon}</span>
        <div>
          <div class="ruta-card__title">${path.title} <span class="ruta-card__total" title="${totalTooltip}" aria-label="${totalTooltip}">${totalItems} items</span></div>
          <div class="ruta-card__cefr">${path.cefr}</div>
        </div>
        <span class="ruta-card__progress"><strong>${done}/${total}</strong> completados</span>
      </div>
      <p class="ruta-card__desc">${path.description}</p>
      <div class="ruta-card__steps">${steps}</div>
    </div>`;
  }).join('');
}

export function renderProgressSnapshot(animateReveal = false, { onOpenProgress } = {}) {
  const snapshot = document.getElementById('progressSnapshot');
  const ring = document.getElementById('snapshotRing');
  const pctEl = document.getElementById('snapshotPct');
  const statEl = document.getElementById('snapshotStat');
  const detailEl = document.getElementById('snapshotDetail');
  const exercises = MODULES.filter(m => m.exercise && m.category !== 'guides');
  const total = exercises.length;
  const defer = shouldDeferStatsDisplay();
  const completed = defer ? 0 : exercises.filter(m => isContentCompleted(m.id)).length;
  const pct = defer ? 0 : (total > 0 ? Math.round((completed / total) * 100) : 0);
  const activePaths = defer ? 0 : LEARNING_PATHS.filter(p => p.modules.some(id => getBestScore(id) > 0) && !p.modules.every(isContentCompleted)).length;
  const hasProgress = !defer && (completed > 0 || MODULES.some(m => getBestScore(m.id) > 0));

  if (!hasProgress) {
    snapshot.classList.add('progress-snapshot--empty');
    ring.style.setProperty('--progress', '0');
    pctEl.textContent = '0%';
    statEl.textContent = `0/${total}`;
    detailEl.textContent = 'Tu aventura empieza aquí';
    snapshot.setAttribute('aria-label', `Progreso HubFlow: 0 de ${total} ejercicios. Tu aventura empieza aquí`);
  } else {
    snapshot.classList.remove('progress-snapshot--empty');
    if (animateReveal && pct > 0) {
      animateCssVar(ring, '--progress', pct);
      animateText(pctEl, 0, pct, (v) => `${v}%`);
    } else {
      ring.style.setProperty('--progress', String(pct));
      pctEl.textContent = `${pct}%`;
    }
    statEl.textContent = `${completed}/${total}`;
    detailEl.textContent = `${activePaths} rutas activas`;
    snapshot.setAttribute(
      'aria-label',
      `Progreso HubFlow: ${pct} por ciento, ${completed} de ${total} ejercicios, ${activePaths} rutas activas`
    );
  }

  snapshot.onclick = () => onOpenProgress?.();
}

const ACTIVITY_KEY = 'learnflow:activity:hubflow:v1';
const MAX_LAST_ACTIVITIES = 5;

export function renderLastActivities() {
  const container = document.getElementById('lastActivities');
  if (!container) return;

  if (shouldDeferActivityDisplay('hubflow')) {
    container.innerHTML = '<p class="last-activities--empty">Aún no hay actividad registrada. ¡Empieza un ejercicio!</p>';
    return;
  }

  let ledger;
  try { ledger = JSON.parse(localStorage.getItem(ACTIVITY_KEY) || 'null'); } catch { ledger = null; }
  const events = Array.isArray(ledger?.events) ? ledger.events : [];

  // Deduplicate: keep only the most recent event per contentId
  const seen = new Set();
  const unique = [];
  for (const ev of events) {
    if (!ev.contentId || seen.has(ev.contentId)) continue;
    seen.add(ev.contentId);
    unique.push(ev);
    if (unique.length >= MAX_LAST_ACTIVITIES) break;
  }

  if (!unique.length) {
    container.innerHTML = '<p class="last-activities--empty">Aún no hay actividad registrada. ¡Empieza un ejercicio!</p>';
    return;
  }

  const cards = unique.map(ev => {
    const mod = moduleMap.get(ev.contentId);
    if (!mod) return '';
    const color = catColor(mod.category);
    const scoreClass = ev.passed ? 'la-card__score--pass' : 'la-card__score--fail';
    const scoreLabel = Math.round(ev.scorePct) + '%';
    return `<a class="la-card" href="${mod.exercise}" style="--la-color: ${color}">
      <div class="la-card__icon">${mod.icon}</div>
      <div class="la-card__body">
        <div class="la-card__name">${mod.title}</div>
      </div>
      <span class="la-card__score ${scoreClass}">${scoreLabel}</span>
    </a>`;
  }).join('');

  container.innerHTML = `
    <div class="last-activities__header">
      <span class="last-activities__title">Última actividad</span>
    </div>
    <div class="last-activities__list">${cards}</div>
  `;
}

export function refreshHeaderStats(animateReveal = false) {
  const progressStats = getProgressStats();
  const totalEl = document.getElementById('psTotal');
  const masteredEl = document.getElementById('psMastered');
  const attempts = progressStats.totalAttempts || 0;
  const completed = progressStats.completedContent || 0;
  const total = progressStats.totalContent || 0;
  if (animateReveal && attempts > 0) animateText(totalEl, 0, attempts);
  else totalEl.textContent = String(attempts);
  if (animateReveal && completed > 0) {
    animateText(masteredEl, 0, completed, (v) => `${v}/${total}`);
  } else {
    masteredEl.textContent = `${completed}/${total}`;
  }
}

const isPathModuleCompleted = isContentCompleted;

export function renderPaths() {
  const container = document.getElementById('pathsContainer');
  if (!container) return;
  container.innerHTML = LEARNING_PATHS.map(path => {
    const completed = path.modules.filter(isPathModuleCompleted);
    const completedCount = completed.length;
    const total = path.modules.length;
    const pct = Math.round((completedCount / total) * 100);
    const allDone = completedCount === total;
    const nextModule = path.modules.find(id => !isPathModuleCompleted(id));
    const nextMod = nextModule ? moduleMap.get(nextModule) : null;
    const statusLabel = allDone ? '✓ Completada' : completedCount > 0 ? 'En progreso' : 'Sin empezar';
    const statusClass = allDone ? ' completed' : completedCount > 0 ? ' in-progress' : '';
    const nextText = allDone ? '' : nextMod ? (completedCount > 0 ? 'Siguiente: ' : 'Empezar: ') + nextMod.title : '';

    const modulesHTML = path.modules.map((id, i) => {
      const mod = moduleMap.get(id);
      if (!mod) return '';
      const done = isPathModuleCompleted(id);
      const isNext = id === nextModule;
      const cls = done ? 'completed' : isNext ? 'current' : '';
      const step = done ? '✓' : String(i + 1);
      const best = done ? getBestScore(id) : 0;
      const statusHTML = done ? `<span class="pm-status done">⭐ ${best}%</span>`
        : isNext ? `<span class="pm-status next">${completedCount > 0 ? 'Siguiente →' : 'Empezar →'}</span>`
        : `<span class="pm-status locked">Pendiente</span>`;
      const canOpen = done || isNext;
      const tag = canOpen ? 'a' : 'div';
      const hrefAttr = canOpen ? ` href="${mod.exercise}"` : '';
      return `<${tag} class="path-module ${cls}"${hrefAttr}${canOpen ? '' : ' aria-disabled="true"'}>
        <div class="pm-step">${step}</div>
        <div class="pm-info"><div class="pm-title">${mod.icon} ${mod.title} <span class="pm-cefr">${mod.cefr.toUpperCase()}</span></div><div class="pm-meta">${mod.meta}</div></div>
        ${statusHTML}
      </${tag}>`;
    }).join('');

    return `<details class="path-accordion">
      <summary class="path-summary">
        <div class="path-summary-icon">${path.icon}</div>
        <div class="path-summary-body">
          <div class="path-summary-top">
            <span class="path-summary-title">${path.title}</span>
            <span class="path-summary-cefr">${path.cefr}</span>
            ${nextText ? `<span class="path-summary-next">${nextText}</span>` : ''}
          </div>
          <div class="path-summary-bar">
            <div class="path-summary-bar-track"><div class="path-summary-bar-fill" style="width:${pct}%"></div></div>
            <span class="path-summary-frac">${completedCount}/${total}</span>
          </div>
        </div>
        <div class="path-summary-right">
          <span class="path-summary-status${statusClass}">${statusLabel}</span>
          <span class="path-chevron">▼</span>
        </div>
      </summary>
      <div class="path-content">
        <p class="path-content-desc">${path.description}</p>
        <div class="path-modules">${modulesHTML}</div>
      </div>
    </details>`;
  }).join('');
}
