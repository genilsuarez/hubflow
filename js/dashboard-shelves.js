/* ═══════════════════════════════════════════════════════
   HubFlow Dashboard — Module Shelves
   Renders the module cards for each level accordion on Browse/Vocabulary/
   Grammar/Pronunciation/Analysis. Self-contained: reads catalog/progress
   data directly, no page-specific state.
   ═══════════════════════════════════════════════════════ */

import { MODULES, CATEGORIES, SUBCATEGORIES, getModuleDepth } from '../data/catalog.js';
import { getContentProgress, getModuleMatrixProgress } from './progress-store.js';
import { getActiveLevel, levelUnlocks, LEVEL_ORDER } from './lp-progress-summary.js';

const CATEGORY_SPINE = Object.fromEntries(Object.entries(CATEGORIES).map(([k, c]) => [k, c.spine]));
const MECHANIC_PRIORITY = ['tts', 'timed', 'quiz', 'study', 'write', 'match'];
const MECHANIC_LABEL = { tts: '🔊 Audio', timed: 'Timed', quiz: 'Quiz', study: 'Study', write: 'Write', match: 'Match' };

function pillsHTML(mod) {
  const pills = [`<span class="pill lvl">${mod.cefr.toUpperCase()}</span>`];
  const subLabel = SUBCATEGORIES[mod.subcategory];
  if (subLabel) pills.push(`<span class="pill">${subLabel}</span>`);
  const mechanics = mod.tags.filter(t => MECHANIC_PRIORITY.includes(t))
    .sort((a, b) => MECHANIC_PRIORITY.indexOf(a) - MECHANIC_PRIORITY.indexOf(b))
    .slice(0, 2);
  mechanics.forEach(t => pills.push(`<span class="pill">${MECHANIC_LABEL[t]}</span>`));
  return pills.join('');
}

function titleHTML(mod) {
  return mod.title;
}

/**
 * `mod.meta` es una lista larga "Item A · Item B · Item C..." (hasta ~120
 * caracteres) pensada como descripción, no para caber en una tarjeta angosta.
 * En vez de dejar que el CSS (line-clamp) la corte a media palabra o a mitad
 * de un item, se arma una versión corta tomando items completos hasta el
 * límite — nunca corta dentro de un item. El texto completo se mantiene en un
 * nodo oculto para que la búsqueda del dashboard (que lee `card.textContent`,
 * ver dashboard-filters.js) siga encontrando términos que quedaron fuera de
 * la versión corta.
 */
export function shortMeta(meta, maxLen = 44) {
  const items = meta.split(' · ');
  let result = items[0];
  for (let i = 1; i < items.length; i++) {
    const next = `${result} · ${items[i]}`;
    if (next.length > maxLen) break;
    result = next;
  }
  return result;
}

function metaHTML(mod) {
  const short = shortMeta(mod.meta);
  if (short.length >= mod.meta.length) return `<div class="book-meta">${mod.meta}</div>`;
  return `<div class="book-meta">${short}…<span hidden>${mod.meta}</span></div>`;
}

function depthHTML(mod) {
  const depth = getModuleDepth(mod.id);
  if (!depth) return '';
  const parts = [];
  parts.push(`<span class="book-depth__stat"><strong>${depth.items}</strong> items</span>`);
  if (depth.categories > 1) parts.push(`<span class="book-depth__stat"><strong>${depth.categories}</strong> cat</span>`);
  parts.push(`<span class="book-depth__stat"><strong>${depth.modes}</strong> modos</span>`);
  const battle = depth.hasBattle ? `<span class="book-depth__battle">⚔️ 2P</span>` : '';
  return `<div class="book-depth">${parts.join('<span style="opacity:.4">·</span>')}${battle}</div>`;
}

function progressHTML(mod) {
  const progress = getContentProgress(mod.id);
  if (!progress) return '';
  // Mismo cálculo (categorías × modos rastreados) que el modal "Progreso del
  // módulo" — evita que la tarjeta muestre un % distinto al del detalle para
  // el mismo módulo (ver getModuleMatrixProgress en progress-store.js).
  const matrix = getModuleMatrixProgress(mod.id);
  const pct = Math.round(matrix ? matrix.progressPct : progress.progressPct);
  if (progress.completed) {
    return `<div class="book-progress book-progress--done" aria-label="Completado"><span class="book-progress__check">✓</span><span class="book-progress__bar"><span class="book-progress__fill" style="width:100%"></span></span></div>`;
  }
  return `<div class="book-progress" aria-label="${pct}% completado"><span class="book-progress__bar"><span class="book-progress__fill" style="width:${pct}%"></span></span><span class="book-progress__pct">${pct}%</span></div>`;
}

/** La franja de color de la tarjeta sale de la categoría del propio módulo,
 * no de un parámetro externo — necesario para el acordeón "Browse", donde un
 * mismo nivel mezcla módulos de las 4 categorías con distinto color. */
function bookCardHTML(mod) {
  const cls = CATEGORY_SPINE[mod.category] || '';
  return `<a class="book ${cls}" href="${mod.exercise}" data-id="${mod.id}" data-tags="${mod.tags.join(',')}" data-cefr="${mod.cefr}">
    <div class="book-spine"></div>
    <div class="book-icon">${mod.icon}</div>
    <div class="book-body">
      <div class="book-title">${titleHTML(mod)}</div>
      ${metaHTML(mod)}
      ${depthHTML(mod)}
      <div class="book-pills">${pillsHTML(mod)}</div>
      ${progressHTML(mod)}
    </div>
  </a>`;
}

/** Progreso agregado de un nivel: X/Y módulos completados + barra — mismo
 * criterio que el header de unidad de FluentFlow (ProgressionDashboard). */
function levelProgressHTML(modules) {
  const total = modules.length;
  const completed = modules.filter(m => getContentProgress(m.id).completed).length;
  const pct = total ? Math.round((completed / total) * 100) : 0;
  return `<span class="subsec-progress">
    <span class="subsec-bar"><span class="subsec-bar__fill" style="width:${pct}%"></span></span>
    <span class="subsec-stats">${completed}/${total}</span>
  </span>`;
}

/**
 * Un bloque de nivel dentro de un acordeón (<details id="acc-${prefix}-${level}">,
 * ver index.html). Dos estados:
 *
 * - Desbloqueado (cefr <= nivel activo): pinta las tarjetas. Solo el nivel
 *   activo se auto-expande la primera vez que se ve ese nivel — luego el
 *   usuario controla el colapso/expansión (estilo acordeón de FluentFlow) y
 *   los renders siguientes no le pisan el estado porque el <details> nunca
 *   se recrea, solo se le actualiza el contenido.
 * - Bloqueado (cefr > nivel activo): el módulo sigue sin renderizarse (el
 *   nivel activo sigue siendo criterio de ACCESO, no una sugerencia — ver
 *   docs/to-do/learnflow-progression-system.md), pero ahora el encabezado sí
 *   se muestra, con candado y conteo, en vez de desaparecer del todo.
 */
function renderLevelBlock(prefix, level, modules, activeLevel, levelJustBecameActive) {
  const details = document.getElementById(`acc-${prefix}-${level}`);
  if (!details) return;
  const shelf = details.querySelector('.shelf');
  const summary = details.querySelector('summary');
  const locked = LEVEL_ORDER.indexOf(level) > LEVEL_ORDER.indexOf(activeLevel);

  details.classList.toggle('subsec--locked', locked);

  if (locked) {
    details.open = false;
    if (shelf) shelf.innerHTML = '';
    if (summary) {
      const count = modules.length;
      summary.innerHTML = `<span class="subsec-lock" aria-hidden="true">🔒</span><span class="subsec-label">${level.toUpperCase()}</span><span class="subsec-count">${count} ejercicio${count === 1 ? '' : 's'}</span>`;
    }
    details.classList.remove('hidden');
    return;
  }

  if (shelf) shelf.innerHTML = modules.map(bookCardHTML).join('');
  if (summary) summary.innerHTML = `<span class="subsec-label">${level.toUpperCase()}</span>${levelProgressHTML(modules)}`;
  details.classList.toggle('hidden', modules.length === 0);
  // Primera vez que este bloque se pinta (recién desbloqueado o carga inicial):
  // arranca abierto solo si es el nivel activo. Si el nivel activo cambia más
  // adelante (el usuario sube de nivel), se auto-abre el que se vuelve activo
  // — pero no se toca el resto: si el usuario ya colapsó/expandió algo a mano,
  // eso no se pisa en renders posteriores (estilo acordeón de FluentFlow).
  if (!details.dataset.accInit) {
    details.open = level === activeLevel;
    details.dataset.accInit = '1';
  } else if (levelJustBecameActive && level === activeLevel) {
    details.open = true;
  }
}

// Último nivel activo visto por renderAllShelves() — para detectar el
// instante en que sube de nivel y auto-abrir solo ese bloque, sin pisar los
// demás (ver renderLevelBlock).
let lastSeenActiveLevel = null;

/**
 * LearnFlow Progression System — docs/to-do/learnflow-progression-system.md.
 * El nivel activo es criterio de ACCESO, no una sugerencia: el material por
 * encima de lp-level no se renderiza. A diferencia de antes, el nivel en sí
 * (encabezado + conteo) sí se muestra como fila bloqueada — solo las
 * tarjetas quedan ocultas hasta desbloquear (ver renderLevelBlock).
 */
export function renderAllShelves() {
  const activeLevel = getActiveLevel();
  const levelJustBecameActive = activeLevel !== lastSeenActiveLevel;
  lastSeenActiveLevel = activeLevel;

  LEVEL_ORDER.forEach(level => {
    const atLevel = (cat) => MODULES.filter(m => m.category === cat && m.cefr === level);
    const vocab = atLevel('vocab');
    const grammar = atLevel('grammar');
    const pronunciation = atLevel('pronunciation');
    const analysis = atLevel('analysis');

    renderLevelBlock('vocab', level, vocab, activeLevel, levelJustBecameActive);
    renderLevelBlock('grammar', level, grammar, activeLevel, levelJustBecameActive);
    renderLevelBlock('pronunciation', level, pronunciation, activeLevel, levelJustBecameActive);
    renderLevelBlock('analysis', level, analysis, activeLevel, levelJustBecameActive);
    // Browse: las 4 categorías combinadas, en el mismo orden que catalog.js
    // (ya viene agrupado por nivel → por categoría, ver data/catalog.js).
    renderLevelBlock('all', level, [...vocab, ...pronunciation, ...grammar, ...analysis], activeLevel, levelJustBecameActive);
  });
}
