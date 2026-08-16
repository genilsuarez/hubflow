/* ═══════════════════════════════════════════════════════
   HubFlow Dashboard — Progress Views
   Progress snapshot ring, last-activities list, header stats, the "Rutas
   guiadas" learning-paths accordion, and the "Mis estadísticas" breakdown
   by category/CEFR. All read-only views over catalog + progress data.
   ═══════════════════════════════════════════════════════ */

import { MODULES, CATEGORIES, TAGS, catColor, moduleMap } from '../data/catalog.js';
import { LEARNING_PATHS, pathCefrRange, pathsByStage } from '../data/learning-paths.js';
import { getBestScore, isContentCompleted, isContentMastered, getProgressStats } from './progress-store.js';
import { shouldDeferStatsDisplay, shouldDeferActivityDisplay } from './sync-engine.js';
import { animateText, animateCssVar } from './lp-stats-animate.js';
import { shortMeta } from './dashboard-shelves.js';
import { getActiveLevel, levelUnlocks } from './lp-progress-summary.js';

/** Encabezado de etapa. Ocupa el ancho completo del grid de dos columnas. */
function stageHeader({ label, hint }) {
  return `<h2 class="sec-head sec-head--sub rutas-stage-head">${label} <span class="rutas-stage-hint">${hint}</span></h2>`;
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
  const sesGroup = totalEl?.closest('.lp-header-stats__group');
  const divider = document.querySelector('.lp-header-stats__divider');
  const attempts = progressStats.totalAttempts || 0;
  const completed = progressStats.completedContent || 0;
  const total = progressStats.totalContent || 0;
  const hasActivity = attempts > 0 || completed > 0;

  // M2 — "0 ses · 0/150" en usuario nuevo lee como app vacía. El 150 es la
  // propuesta de valor y se mantiene; lo que se oculta es el "0 ses" y el
  // "0/" del completado, no el catálogo. display:none inline — `.lp-header-
  // stats__group { display: flex }` empata en especificidad con `[hidden]`
  // y gana por venir después en la cascada, así que el atributo no alcanza.
  if (sesGroup) sesGroup.style.display = hasActivity ? '' : 'none';
  if (divider) divider.style.display = hasActivity ? '' : 'none';

  if (!hasActivity) {
    masteredEl.textContent = `${total} disponibles`;
    return;
  }

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
  container.innerHTML = pathsByStage().map(({ stage, paths }) =>
    stageHeader(stage) + renderPathAccordions(paths)
  ).join('');
}

function renderPathAccordions(paths) {
  const activeLevel = getActiveLevel();
  return paths.map(path => {
    const completed = path.modules.filter(isPathModuleCompleted);
    const completedCount = completed.length;
    const total = path.modules.length;
    const pct = Math.round((completedCount / total) * 100);
    const allDone = completedCount === total;
    const nextModule = path.modules.find(id => !isPathModuleCompleted(id));
    const nextMod = nextModule ? moduleMap.get(nextModule) : null;
    // Una ruta no puede prometer "Siguiente: X" si X todavía está por encima
    // del nivel activo — no es clickeable (ver locked más abajo).
    const nextModLocked = nextMod && !levelUnlocks(nextMod.cefr, activeLevel);
    const statusLabel = allDone ? '✓ Completada' : completedCount > 0 ? 'En progreso' : 'Sin empezar';
    const statusClass = allDone ? ' completed' : completedCount > 0 ? ' in-progress' : '';
    const nextText = allDone || nextModLocked ? '' : nextMod ? (completedCount > 0 ? 'Siguiente: ' : 'Empezar: ') + nextMod.title : '';

    const modulesHTML = path.modules.map((id, i) => {
      const mod = moduleMap.get(id);
      if (!mod) return '';
      const done = isPathModuleCompleted(id);
      // Mismo criterio de acceso que Browse/las 4 categorías (ver
      // dashboard-shelves.js) — antes las rutas ignoraban el nivel activo y
      // todo era siempre clickeable, lo que las hacía inconsistentes con el
      // resto del dashboard. Ahora el paso bloqueado se ve (como en
      // FluentFlow) pero no navega.
      const locked = !done && !levelUnlocks(mod.cefr, activeLevel);
      const isNext = !locked && id === nextModule;
      const cls = done ? 'completed' : locked ? 'locked' : isNext ? 'current' : '';
      const step = done ? '✓' : locked ? '🔒' : String(i + 1);
      const best = done ? getBestScore(id) : 0;
      const statusHTML = done ? `<span class="pm-status done">⭐ ${best}%</span>`
        : locked ? `<span class="pm-status locked">Bloqueado</span>`
        : isNext ? `<span class="pm-status next">${completedCount > 0 ? 'Siguiente →' : 'Empezar →'}</span>`
        : `<span class="pm-status pending">Pendiente</span>`;
      const tag = locked ? 'div' : 'a';
      const hrefAttr = locked ? '' : ` href="${mod.exercise}"`;
      const disabledAttr = locked ? ' aria-disabled="true"' : '';
      return `<${tag} class="path-module ${cls}"${hrefAttr}${disabledAttr}>
        <div class="pm-step">${step}</div>
        <div class="pm-info"><div class="pm-title">${mod.icon} ${mod.title} <span class="pm-cefr">${mod.cefr.toUpperCase()}</span></div><div class="pm-meta" title="${mod.meta}">${shortMeta(mod.meta)}</div></div>
        ${statusHTML}
      </${tag}>`;
    }).join('');

    return `<details class="path-accordion">
      <summary class="path-summary">
        <div class="path-summary-icon">${path.icon}</div>
        <div class="path-summary-body">
          <div class="path-summary-top">
            <span class="path-summary-title">${path.title}</span>
            <span class="path-summary-cefr">${pathCefrRange(path)}</span>
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

/** Tarjetas de "Mis estadísticas" — mismo lenguaje visual de tinted-card que
 * tiles/hero-card/book (ver css/lp-tinted-surface.css), aplicado localmente
 * vía --stat-color para no tocar ese archivo compartido entre apps. */
function statsBarRow({ label, done, total, icon, color, iconText }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const style = color ? ` style="--stat-color:${color}"` : '';
  const iconCls = iconText ? 'stat-card__icon stat-card__icon--text' : 'stat-card__icon';
  return `<div class="stat-card"${style}>
    <span class="${iconCls}" aria-hidden="true">${icon || '📘'}</span>
    <div class="stat-card__body">
      <div class="stat-card__top">
        <span class="stat-card__label">${label}</span>
        <span class="stat-card__pct">${pct}%</span>
      </div>
      <div class="stats-bar">
        <div class="stats-bar-track"><div class="stats-bar-fill" style="width:${pct}%"></div></div>
      </div>
      <span class="stats-bar-frac">${done}/${total}</span>
    </div>
  </div>`;
}

const CATEGORY_ICONS = { vocab: '🧠', grammar: '✏️', pronunciation: '🔊', analysis: '🔍' };

/** Metáfora de crecimiento por nivel CEFR — de semilla a trofeo — y una
 * escala de intensidad sobre --lp-accent para que el color exprese
 * progresión en vez de reutilizar los colores de categoría (que ya
 * significan otra cosa en el resto del dashboard). */
const CEFR_ICONS = { a1: '🌱', a2: '🌿', b1: '🪴', b2: '🌳', c1: '🏆' };
const CEFR_INTENSITY = { a1: 40, a2: 55, b1: 70, b2: 85, c1: 100 };

const STUDY_MASTERY_BANNER_DISMISSED_KEY = 'hf-study-mastery-banner-dismissed';

/**
 * Aviso puntual de lanzamiento (docs/to-do/mastery-tiers-plan.md §4.4/§6 Fase 2):
 * Study ahora también cuenta para el ✓ de Aprobado, así que módulos que ya
 * tenían check pueden perderlo hasta repasar Study. Solo se muestra a quien
 * ya tenía progreso previo (a una cuenta nueva no le dice nada) y se puede
 * descartar — el dismiss se recuerda en localStorage y no vuelve a aparecer.
 */
export function renderStudyMasteryBanner() {
  const el = document.getElementById('studyMasteryBanner');
  if (!el) return;
  if (shouldDeferStatsDisplay()) { el.hidden = true; return; }

  let dismissed = false;
  try { dismissed = localStorage.getItem(STUDY_MASTERY_BANNER_DISMISSED_KEY) === '1'; } catch { /* localStorage bloqueado */ }
  if (dismissed) { el.hidden = true; return; }

  const stats = getProgressStats();
  const hasPriorProgress = (stats.completedContent || 0) > 0 || (stats.totalAttempts || 0) > 0;
  el.hidden = !hasPriorProgress;

  const closeBtn = document.getElementById('studyMasteryBannerClose');
  if (closeBtn && !closeBtn.dataset.bound) {
    closeBtn.dataset.bound = '1';
    closeBtn.addEventListener('click', () => {
      el.hidden = true;
      try { localStorage.setItem(STUDY_MASTERY_BANNER_DISMISSED_KEY, '1'); } catch { /* localStorage bloqueado */ }
    });
  }
}

/** Contador de Maestría (docs/to-do/mastery-tiers-plan.md §4.1/§6 Fase 3) —
 * aparte del contador de Aprobados que ya vive en refreshHeaderStats/
 * progressSnapshot, no en su lugar. */
export function renderMasteryCount() {
  const el = document.getElementById('masteryCount');
  if (!el) return;
  if (shouldDeferStatsDisplay()) { el.hidden = true; return; }

  const exercises = MODULES.filter(m => m.exercise && m.category !== 'guides');
  const masteredCount = exercises.filter(m => isContentMastered(m.id)).length;

  el.hidden = masteredCount === 0;
  const textEl = document.getElementById('masteryCountText');
  if (textEl) {
    textEl.textContent = `${masteredCount} módulo${masteredCount === 1 ? '' : 's'} en Maestría`;
  }
}

/** "Mis estadísticas" — desglose de completado por categoría y por nivel CEFR. */
export function renderStatsBreakdown() {
  const catEl = document.getElementById('statsByCategory');
  const cefrEl = document.getElementById('statsByCefr');
  if (!catEl || !cefrEl) return;

  const exercises = MODULES.filter(m => m.exercise && m.category !== 'guides');

  const byCategory = Object.entries(CATEGORIES).map(([key, cat]) => {
    const mods = exercises.filter(m => m.category === key);
    return {
      label: cat.label,
      done: mods.filter(m => isContentCompleted(m.id)).length,
      total: mods.length,
      icon: CATEGORY_ICONS[key],
      color: catColor(key),
    };
  });

  const byCefr = TAGS.cefr.map(level => {
    const mods = exercises.filter(m => m.cefr === level);
    return {
      label: level.toUpperCase(),
      done: mods.filter(m => isContentCompleted(m.id)).length,
      total: mods.length,
      icon: CEFR_ICONS[level],
      color: `color-mix(in srgb, var(--lp-accent) ${CEFR_INTENSITY[level] ?? 60}%, var(--lp-border-strong))`,
    };
  }).filter(row => row.total > 0);

  catEl.innerHTML = byCategory.map(statsBarRow).join('');
  cefrEl.innerHTML = byCefr.map(statsBarRow).join('');
}
