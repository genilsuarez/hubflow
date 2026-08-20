/* ═══════════════════════════════════════════════════════
   HubFlow Dashboard — Module Shelves
   Renders the module cards for each level accordion on Browse/Vocabulary/
   Grammar/Pronunciation/Analysis. Self-contained: reads catalog/progress
   data directly, no page-specific state.
   ═══════════════════════════════════════════════════════ */

import { MODULES, CATEGORIES, SUBCATEGORIES, getModuleDepth } from '../data/catalog.js';
import { getContentProgress, getModuleMatrixProgress } from './progress-store.js';
import { getActiveLevel, LEVEL_ORDER } from './lp-progress-summary.js';

const CATEGORY_SPINE = Object.fromEntries(Object.entries(CATEGORIES).map(([k, c]) => [k, c.spine]));
const MECHANIC_PRIORITY = ['tts', 'timed', 'quiz', 'study', 'write', 'match'];
const MECHANIC_LABEL = { tts: 'Audio', timed: 'Timed', quiz: 'Quiz', study: 'Study', write: 'Write', match: 'Match' };

function primaryMechanic(mod) {
  const mechanics = mod.tags
    .filter((t) => MECHANIC_PRIORITY.includes(t))
    .sort((a, b) => MECHANIC_PRIORITY.indexOf(a) - MECHANIC_PRIORITY.indexOf(b));
  return mechanics[0] || 'study';
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
  const parts = [`<span class="book-depth__stat"><strong>${depth.items}</strong> items</span>`];
  if (depth.categories > 1) {
    parts.push(`<span class="book-depth__stat"><strong>${depth.categories}</strong> cat</span>`);
  }
  parts.push(`<span class="book-depth__stat"><strong>${depth.modes}</strong> modos</span>`);
  if (depth.hasBattle) {
    parts.push(`<span class="book-depth__battle">⚔️ 2P</span>`);
  }
  return `<div class="book-depth">${parts.join('<span class="book-depth__sep" aria-hidden="true">·</span>')}</div>`;
}

function progressCounts(mod, progress) {
  const matrix = getModuleMatrixProgress(mod.id, { includeStudy: true });
  const depth = getModuleDepth(mod.id);
  const total = (matrix && matrix.total > 0)
    ? matrix.total
    : (depth?.items ?? 0);

  if (progress?.completed) {
    return { done: total, total, pct: 100 };
  }

  // Misma fuente para fracción y % — evita "8/16 · 100%" cuando la grilla
  // y progressPct venían de caminos distintos.
  if (matrix && matrix.total > 0) {
    const pct = Math.round(Math.max(matrix.progressPct, progress?.progressPct ?? 0));
    const done = Math.min(matrix.total, Math.max(matrix.passed, Math.round((pct / 100) * matrix.total)));
    return { done, total: matrix.total, pct };
  }

  const pct = Math.round(progress?.progressPct ?? 0);
  const done = Math.round((pct / 100) * total);
  return { done, total, pct };
}

function progressHTML(mod) {
  const progress = getContentProgress(mod.id);
  if (!progress) return '';
  const { done, total, pct } = progressCounts(mod, progress);
  const crown = progress.mastered
    ? `<span class="book-progress__crown" role="img" aria-label="Maestría">👑</span>`
    : '';

  let state = 'idle';
  let status = 'Sin empezar';
  if (progress.completed) {
    state = 'done';
    status = progress.mastered ? 'Maestría' : 'Completado';
  } else if (pct > 0) {
    state = 'active';
    status = 'En progreso';
  }

  const nums = total > 0
    ? `<span class="book-progress__nums">${done} / ${total} · ${pct}%</span>`
    : `<span class="book-progress__nums">${pct}%</span>`;

  return `<div class="book-progress book-progress--${state}" aria-label="${status}: ${pct}%">
    ${nums}
    <span class="book-progress__bar" aria-hidden="true"><span class="book-progress__fill" style="width:${pct}%"></span></span>
    <span class="book-progress__status">${state === 'done' ? `<span class="book-progress__check">✓</span>${crown}` : ''}${status}</span>
  </div>`;
}

function footHTML(mod, progress) {
  const topic = SUBCATEGORIES[mod.subcategory] || '';
  const mechanic = MECHANIC_LABEL[primaryMechanic(mod)] || 'Study';
  let cta = `${mechanic} →`;
  if (progress?.completed) cta = 'Repasar →';
  else if ((progress?.progressPct ?? 0) > 0) cta = 'Continuar →';
  const topicHtml = topic
    ? `<span class="book-topic">${topic}</span>`
    : `<span class="book-topic" aria-hidden="true"></span>`;
  return `<div class="book-foot">${topicHtml}<span class="book-cta">${cta}</span></div>`;
}

/** La franja de color de la tarjeta sale de la categoría del propio módulo,
 * no de un parámetro externo — necesario para el acordeón "Browse", donde un
 * mismo nivel mezcla módulos de las 4 categorías con distinto color. */
function bookCardHTML(mod) {
  const cls = CATEGORY_SPINE[mod.category] || '';
  const progress = getContentProgress(mod.id);
  return `<a class="book ${cls}" href="${mod.exercise}" data-id="${mod.id}" data-tags="${mod.tags.join(',')}" data-cefr="${mod.cefr}">
    <div class="book-icon" aria-hidden="true">${mod.icon}</div>
    <div class="book-body">
      <div class="book-head">
        <div class="book-title">${titleHTML(mod)}</div>
        <span class="book-cefr">${mod.cefr.toUpperCase()}</span>
      </div>
      ${metaHTML(mod)}
      ${depthHTML(mod)}
      ${progressHTML(mod)}
      ${footHTML(mod, progress)}
    </div>
  </a>`;
}

/** Progreso agregado de un nivel: X/Y módulos completados + % + barra. */
function levelProgressHTML(modules) {
  const total = modules.length;
  const completed = modules.filter((m) => getContentProgress(m.id).completed).length;
  const pct = total ? Math.round((completed / total) * 100) : 0;
  return `<span class="subsec-progress">
    <span class="subsec-stats">${completed} de ${total} completados · ${pct}%</span>
    <span class="subsec-bar"><span class="subsec-bar__fill" style="width:${pct}%"></span></span>
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

  LEVEL_ORDER.forEach((level) => {
    const atLevel = (cat) => MODULES.filter((m) => m.category === cat && m.cefr === level);
    const vocab = atLevel('vocab');
    const grammar = atLevel('grammar');
    const pronunciation = atLevel('pronunciation');
    const analysis = atLevel('analysis');

    renderLevelBlock('vocab', level, vocab, activeLevel, levelJustBecameActive);
    renderLevelBlock('grammar', level, grammar, activeLevel, levelJustBecameActive);
    renderLevelBlock('pronunciation', level, pronunciation, activeLevel, levelJustBecameActive);
    renderLevelBlock('analysis', level, analysis, activeLevel, levelJustBecameActive);
    // Browse: las 4 categorías en el mismo orden que los chips del toolbar
    // (Vocabulary → Grammar → Pronunciation → Analysis).
    renderLevelBlock('all', level, [...vocab, ...grammar, ...pronunciation, ...analysis], activeLevel, levelJustBecameActive);
  });
}
