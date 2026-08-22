/* ═══════════════════════════════════════════════════════
   HubFlow Dashboard — Progress Views
   Progress snapshot ring, last-activities list, header stats, the "Rutas
   guiadas" learning-paths accordion, and the "Mis estadísticas" breakdown
   by category/CEFR. All read-only views over catalog + progress data.
   ═══════════════════════════════════════════════════════ */

import { MODULES, CATEGORIES, TAGS, catColor, moduleMap } from '../data/catalog.js';
import { LEARNING_PATHS, PATH_STAGES, pathCefrRange, pathsByStage } from '../data/learning-paths.js';
import { getBestScore, isContentCompleted, isContentMastered, getProgressStats } from './progress-store.js';
import { shouldDeferStatsDisplay, shouldDeferActivityDisplay } from './sync-engine.js';
import { animateText, animateCssVar } from './lp-stats-animate.js';
import { shortMeta } from './dashboard-shelves.js';
import { getActiveLevel, levelUnlocks } from './lp-progress-summary.js';

/** Encabezado de etapa. El punto de color repite el del chip de filtro. */
function stageHeader({ id, label, hint }) {
  return `<h2 class="sec-head sec-head--sub rutas-stage-head"><span class="rutas-stage-dot" data-stage-dot="${id}" aria-hidden="true"></span>${label} <span class="rutas-stage-hint">${hint}</span></h2>`;
}

export function renderProgressSnapshot(animateReveal = false, { onOpenProgress } = {}) {
  const snapshot = document.getElementById('progressSnapshot');
  const ring = document.getElementById('snapshotRing');
  const pctEl = document.getElementById('snapshotPct');
  const statEl = document.getElementById('snapshotStat');
  const pathsEl = document.getElementById('snapshotPaths');
  const attemptsEl = document.getElementById('snapshotAttempts');
  const barFillEl = document.getElementById('snapshotBarFill');
  const exercises = MODULES.filter(m => m.exercise && m.category !== 'guides');
  const total = exercises.length;
  const defer = shouldDeferStatsDisplay();
  const completed = defer ? 0 : exercises.filter(m => isContentCompleted(m.id)).length;
  const pct = defer ? 0 : (total > 0 ? Math.round((completed / total) * 100) : 0);
  const activePaths = defer ? 0 : LEARNING_PATHS.filter(p => p.modules.some(id => getBestScore(id) > 0) && !p.modules.every(isContentCompleted)).length;
  const hasProgress = !defer && (completed > 0 || MODULES.some(m => getBestScore(m.id) > 0));

  snapshot.classList.toggle('progress-snapshot--empty', !hasProgress);
  if (animateReveal && pct > 0) {
    animateCssVar(ring, '--progress', pct);
    animateText(pctEl, 0, pct, (v) => `${v}%`);
  } else {
    ring.style.setProperty('--progress', String(pct));
    pctEl.textContent = `${pct}%`;
  }
  barFillEl.style.width = `${pct}%`;
  pathsEl.textContent = String(activePaths);
  statEl.textContent = `${completed}/${total}`;
  attemptsEl.textContent = String(defer ? 0 : (getProgressStats().totalAttempts || 0));
  snapshot.setAttribute(
    'aria-label',
    `Progreso HubFlow: ${pct} por ciento, ${completed} de ${total} ejercicios, ${activePaths} rutas activas`
  );

  snapshot.onclick = () => onOpenProgress?.();
}

const ACTIVITY_KEY = 'learnflow:activity:hubflow:v1';
const MAX_LAST_ACTIVITIES = 4;

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
  const statsEl = document.querySelector('.lp-header-stats');
  const totalEl = document.getElementById('psTotal');
  const masteredEl = document.getElementById('psMastered');
  const masteredLabel = document.getElementById('psMasteredLabel');
  const attemptsGroup = totalEl?.closest('.lp-header-stats__group');
  const divider = document.querySelector('.lp-header-stats__divider');
  const attempts = progressStats.totalAttempts || 0;
  const completed = progressStats.completedContent || 0;
  const total = progressStats.totalContent || 0;
  const hasActivity = attempts > 0 || completed > 0;

  // M2 — "0 intentos · 0/150" en usuario nuevo lee como app vacía. El 150 es la
  // propuesta de valor y se mantiene; lo que se oculta es el contador de
  // intentos y el "0/" del completado, no el catálogo. display:none inline —
  // `.lp-header-stats__group { display: flex }` empata en especificidad con
  // `[hidden]` y gana por venir después en la cascada, así que el atributo no alcanza.
  if (attemptsGroup) attemptsGroup.style.display = hasActivity ? '' : 'none';
  if (divider) divider.style.display = hasActivity ? '' : 'none';

  if (!hasActivity) {
    if (masteredLabel) masteredLabel.hidden = true;
    masteredEl.textContent = `${total} disponibles`;
    statsEl?.setAttribute('aria-label', `${total} ejercicios disponibles en el catálogo`);
    return;
  }

  if (masteredLabel) masteredLabel.hidden = false;
  if (animateReveal && attempts > 0) animateText(totalEl, 0, attempts);
  else totalEl.textContent = String(attempts);
  if (animateReveal && completed > 0) {
    animateText(masteredEl, 0, completed, (v) => `${v}/${total}`);
  } else {
    masteredEl.textContent = `${completed}/${total}`;
  }
  statsEl?.setAttribute(
    'aria-label',
    `${attempts} intentos de práctica, ${completed} de ${total} ejercicios aprobados`
  );
}

const isPathModuleCompleted = isContentCompleted;

/* ─── Rutas guiadas — preferencias de la barra de control ───
   Etapa visible, criterio de orden y densidad de vista. Se recuerdan porque
   la sección se re-renderiza entera en cada cambio de progreso (volver de un
   ejercicio, hidratación de nube, bfcache): sin persistir, el usuario perdía
   el filtro que acababa de elegir en cada vuelta. */
const PATHS_PREFS_KEY = 'hf-rutas-prefs-v1';
const PATHS_PREFS_DEFAULT = { stage: 'all', sort: 'progress', view: 'list' };
const PATH_SORTS = new Set(['progress', 'recommended', 'name']);

function loadPathsPrefs() {
  try {
    const saved = JSON.parse(localStorage.getItem(PATHS_PREFS_KEY) || 'null');
    if (!saved) return { ...PATHS_PREFS_DEFAULT };
    return {
      stage: PATH_STAGES.some(s => s.id === saved.stage) ? saved.stage : 'all',
      sort: PATH_SORTS.has(saved.sort) ? saved.sort : PATHS_PREFS_DEFAULT.sort,
      view: saved.view === 'grid' ? 'grid' : 'list',
    };
  } catch { return { ...PATHS_PREFS_DEFAULT }; }
}

let pathsPrefs = loadPathsPrefs();

function savePathsPrefs() {
  try { localStorage.setItem(PATHS_PREFS_KEY, JSON.stringify(pathsPrefs)); } catch { /* localStorage bloqueado */ }
}

function pathCompletedCount(path) {
  return path.modules.filter(isPathModuleCompleted).length;
}

/** 0 = en progreso, 1 = sin empezar, 2 = completada. El orden por "Progreso"
 *  pone arriba lo que ya arrancaste y manda al final lo que ya terminaste. */
function pathProgressRank(path) {
  const done = pathCompletedCount(path);
  if (done === path.modules.length) return 2;
  return done > 0 ? 0 : 1;
}

function sortPaths(paths) {
  if (pathsPrefs.sort === 'recommended') return paths;
  // Se decora con el índice curado para que los empates conserven el orden de
  // learning-paths.js (la secuencia pedagógica) en vez de quedar al azar.
  const decorated = paths.map((path, index) => ({ path, index }));
  if (pathsPrefs.sort === 'name') {
    decorated.sort((a, b) => a.path.title.localeCompare(b.path.title, 'es') || a.index - b.index);
  } else {
    decorated.sort((a, b) =>
      pathProgressRank(a.path) - pathProgressRank(b.path)
      || (pathCompletedCount(b.path) / b.path.modules.length) - (pathCompletedCount(a.path) / a.path.modules.length)
      || a.index - b.index);
  }
  return decorated.map(d => d.path);
}

export function renderPaths() {
  const container = document.getElementById('pathsContainer');
  if (!container) return;
  closePathMenu();
  container.classList.toggle('paths-full--grid', pathsPrefs.view === 'grid');
  const groups = pathsByStage().filter(({ stage }) => pathsPrefs.stage === 'all' || stage.id === pathsPrefs.stage);
  container.innerHTML = groups.map(({ stage, paths }) =>
    `<div class="rutas-stage" data-stage="${stage.id}">
      ${stageHeader(stage)}
      <div class="rutas-group">${renderPathAccordions(sortPaths(paths))}</div>
    </div>`
  ).join('');
  syncPathsControls();
  renderPathsAside();
}

/** Tarjeta lateral de "Rutas guiadas" — mismo par completado/total que el pill
 *  de la topbar (refreshHeaderStats), para que no puedan discrepar. */
export function renderPathsAside() {
  const ring = document.getElementById('rutasProgressRing');
  const pctEl = document.getElementById('rutasProgressPct');
  const statEl = document.getElementById('rutasProgressStat');
  if (!ring || !pctEl || !statEl) return;

  const defer = shouldDeferStatsDisplay();
  const stats = getProgressStats();
  const total = stats.totalContent || 0;
  const completed = defer ? 0 : (stats.completedContent || 0);
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  ring.style.setProperty('--progress', String(pct));
  pctEl.textContent = `${pct}%`;
  statEl.textContent = `${completed} de ${total} estrellas`;
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
    // Una ruta no puede llevar al "siguiente" módulo si X todavía está por
    // encima del nivel activo — no es clickeable (ver locked más abajo).
    const nextModLocked = nextMod && !levelUnlocks(nextMod.cefr, activeLevel);
    const statusLabel = allDone ? '✓ Completada' : completedCount > 0 ? 'En progreso' : 'Sin empezar';
    const statusClass = allDone ? ' completed' : completedCount > 0 ? ' in-progress' : '';

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

    // Los hijos del <summary> son celdas directas de su grid (sin wrappers):
    // eso permite recolocarlos por grid-template-areas en lista, tarjetas y
    // mobile sin cambiar el DOM. Ver .path-summary en index-shell.css.
    const nextHref = !allDone && nextMod && !nextModLocked ? nextMod.exercise : '';
    return `<details class="path-accordion" data-path-id="${path.id}">
      <summary class="path-summary" title="Ver los módulos de la ruta">
        <span class="path-summary-icon">${path.icon}</span>
        <span class="path-summary-top">
          <span class="path-summary-title">${path.title}</span>
          <span class="path-summary-cefr">${pathCefrRange(path)}</span>
        </span>
        <span class="path-summary-bar"><span class="path-summary-bar-track"><span class="path-summary-bar-fill" style="width:${pct}%"></span></span></span>
        <span class="path-summary-frac">${completedCount}/${total}</span>
        <span class="path-summary-status${statusClass}">${statusLabel}</span>
        <button type="button" class="path-menu-btn" data-path-menu="${path.id}" data-next-href="${nextHref}"
          aria-haspopup="menu" aria-expanded="false" aria-label="Opciones de ${path.title}">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/></svg>
        </button>
      </summary>
      <div class="path-content">
        <p class="path-content-desc">${path.description}</p>
        <div class="path-modules">${modulesHTML}</div>
      </div>
    </details>`;
  }).join('');
}

/* ─── Rutas guiadas — barra de control y menú (⋮) ─── */

/** Deja la barra de control en sintonía con las preferencias activas. Se
 *  vuelve a llamar tras cada render porque el estado vive en JS, no en el DOM. */
function syncPathsControls() {
  document.querySelectorAll('.rutas-stage-chip').forEach(chip => {
    const on = chip.dataset.stage === pathsPrefs.stage;
    chip.classList.toggle('is-active', on);
    chip.setAttribute('aria-selected', String(on));
  });
  document.querySelectorAll('.rutas-view__btn').forEach(btn => {
    const on = btn.dataset.view === pathsPrefs.view;
    btn.classList.toggle('is-active', on);
    btn.setAttribute('aria-pressed', String(on));
  });
  const sort = document.getElementById('pathSort');
  if (sort && sort.value !== pathsPrefs.sort) sort.value = pathsPrefs.sort;
}

function closePathMenu() {
  const menu = document.getElementById('pathMenu');
  if (!menu || menu.hidden) return;
  menu.hidden = true;
  menu.innerHTML = '';
  document.querySelectorAll('.path-menu-btn[aria-expanded="true"]')
    .forEach(b => b.setAttribute('aria-expanded', 'false'));
}

function openPathMenu(btn) {
  const menu = document.getElementById('pathMenu');
  const details = btn.closest('.path-accordion');
  if (!menu || !details) return;
  const isOpen = details.open;
  const nextHref = btn.dataset.nextHref || '';
  const startedCount = pathCompletedCount(LEARNING_PATHS.find(p => p.id === details.dataset.pathId) || { modules: [] });

  menu.innerHTML = `
    <button type="button" class="path-menu__item" role="menuitem" data-menu-action="toggle">
      ${isOpen ? 'Ocultar módulos' : 'Ver módulos'}
    </button>
    ${nextHref ? `<a class="path-menu__item" role="menuitem" href="${nextHref}">${startedCount > 0 ? 'Continuar ruta' : 'Empezar ruta'} →</a>` : ''}
    <span class="path-menu__sep" role="separator"></span>
    <button type="button" class="path-menu__item path-menu__item--muted" role="menuitem" data-menu-action="collapse-all">
      Colapsar todas las rutas
    </button>`;

  menu.hidden = false;
  btn.setAttribute('aria-expanded', 'true');
  // Medir después de mostrarlo: en `hidden` el ancho es 0 y el menú quedaría
  // pegado al borde derecho del botón en vez de alineado a su costado.
  const rect = btn.getBoundingClientRect();
  const width = menu.offsetWidth;
  const height = menu.offsetHeight;
  const left = Math.max(8, Math.min(rect.right - width, window.innerWidth - width - 8));
  const below = rect.bottom + 6;
  const top = below + height > window.innerHeight - 8 ? Math.max(8, rect.top - height - 6) : below;
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  menu.querySelector('.path-menu__item')?.focus();
}

/**
 * Conecta filtros, orden, densidad, menú (⋮) y el auto-scroll al expandir.
 * Todo por delegación: `renderPaths()` reemplaza el HTML de las filas en cada
 * refresco de progreso, así que un listener por fila se perdería en el camino.
 */
export function initPathsControls({ onOpenProgress } = {}) {
  const container = document.getElementById('pathsContainer');
  if (!container) return;

  document.querySelector('.rutas-stagebar')?.addEventListener('click', (e) => {
    const chip = e.target.closest('.rutas-stage-chip');
    if (!chip) return;
    pathsPrefs.stage = chip.dataset.stage;
    savePathsPrefs();
    renderPaths();
  });

  document.getElementById('pathSort')?.addEventListener('change', (e) => {
    pathsPrefs.sort = PATH_SORTS.has(e.target.value) ? e.target.value : PATHS_PREFS_DEFAULT.sort;
    savePathsPrefs();
    renderPaths();
  });

  document.querySelector('.rutas-view')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.rutas-view__btn');
    if (!btn) return;
    pathsPrefs.view = btn.dataset.view === 'grid' ? 'grid' : 'list';
    savePathsPrefs();
    renderPaths();
  });

  document.getElementById('rutasProgressBtn')?.addEventListener('click', () => onOpenProgress?.());

  // El ⋮ vive dentro del <summary>: sin frenar el evento, abrir el menú
  // también abriría/cerraría el acordeón.
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.path-menu-btn');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const wasOpen = btn.getAttribute('aria-expanded') === 'true';
    closePathMenu();
    if (!wasOpen) openPathMenu(btn);
  });

  const menu = document.getElementById('pathMenu');
  menu?.addEventListener('click', (e) => {
    const item = e.target.closest('[data-menu-action]');
    if (!item) { if (e.target.closest('a')) closePathMenu(); return; }
    const btn = document.querySelector('.path-menu-btn[aria-expanded="true"]');
    const details = btn?.closest('.path-accordion');
    if (item.dataset.menuAction === 'toggle' && details) details.open = !details.open;
    if (item.dataset.menuAction === 'collapse-all') {
      document.querySelectorAll('.path-accordion').forEach(d => { d.open = false; });
    }
    closePathMenu();
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('#pathMenu') || e.target.closest('.path-menu-btn')) return;
    closePathMenu();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePathMenu(); });
  // position:fixed no sigue al scroll del contenedor: se cierra en vez de
  // quedar flotando lejos de su fila.
  document.querySelector('.content')?.addEventListener('scroll', closePathMenu, { passive: true });
  window.addEventListener('resize', closePathMenu);

  // Auto-scroll al expandir una ruta que se sale de la zona visible. `toggle`
  // no burbujea, de ahí el listener en fase de captura.
  container.addEventListener('toggle', (e) => {
    const details = e.target.closest?.('.path-accordion');
    if (!details || !details.open) return;
    const scrollContainer = document.querySelector('.content');
    if (!scrollContainer) return;
    requestAnimationFrame(() => {
      const containerRect = scrollContainer.getBoundingClientRect();
      const detailsRect = details.getBoundingClientRect();
      if (detailsRect.bottom - containerRect.bottom <= 0) return;
      const summaryRect = details.querySelector('.path-summary').getBoundingClientRect();
      const summaryTop = summaryRect.top - containerRect.top + scrollContainer.scrollTop;
      scrollContainer.scrollTo({ top: summaryTop - 12, behavior: 'smooth' });
    });
  }, true);
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
    <span class="stat-card__label">${label}</span>
    <span class="stats-bar"><span class="stats-bar-track"><span class="stats-bar-fill" style="width:${pct}%"></span></span></span>
    <span class="stat-card__meta"><span class="stats-bar-frac">${done}/${total}</span><span class="stat-card__pct">${pct}%</span></span>
  </div>`;
}

const CATEGORY_ICONS = { vocab: '🧠', grammar: '✏️', pronunciation: '🔊', analysis: '🔍' };

/** Un color por nivel CEFR (mismo criterio que .level-badge en LyricFlow:
 * verde→teal→azul→ámbar→morado según se sube de nivel) en vez de una escala
 * de intensidad de un solo color — así cada píldora se distingue de un
 * vistazo en la grilla de "Por nivel". */
const CEFR_COLOR_VARS = { a1: '--lp-cat-green', a2: '--lp-cat-teal', b1: '--lp-cat-blue', b2: '--lp-cat-amber', c1: '--lp-cat-purple' };

/** Tarjeta-píldora de "Progreso por nivel" — grilla de celdas cortas
 * (badge + fracción arriba, barra ancha abajo), igual a la de LyricFlow,
 * en vez de la fila de una línea usada para categorías (labels largos no
 * caben en una celda angosta). */
function statsPillCard({ label, done, total, color }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const style = color ? ` style="--stat-color:${color}"` : '';
  return `<div class="stat-pill-card"${style}>
    <div class="stat-pill-card__top">
      <span class="stat-pill-card__badge">${label}</span>
      <span class="stats-bar-frac">${done}/${total}</span>
    </div>
    <div class="stats-bar-track"><div class="stats-bar-fill" style="width:${pct}%"></div></div>
  </div>`;
}

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
      color: `var(${CEFR_COLOR_VARS[level] ?? '--lp-accent'})`,
    };
  }).filter(row => row.total > 0);

  catEl.innerHTML = byCategory.map(statsBarRow).join('');
  cefrEl.innerHTML = byCefr.map(statsPillCard).join('');
}
