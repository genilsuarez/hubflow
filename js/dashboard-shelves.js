/* ═══════════════════════════════════════════════════════
   HubFlow Dashboard — Module Shelves
   Renders the module cards for each topic shelf on the "Explora por tema"
   section. Self-contained: reads catalog/progress data directly, no
   page-specific state.
   ═══════════════════════════════════════════════════════ */

import { MODULES, CATEGORIES, SUBCATEGORIES, getModuleDepth } from '../data/catalog.js';
import { getContentProgress } from './progress-store.js';
import { getActiveLevel, levelUnlocks, LEVEL_ORDER } from './lp-progress-summary.js';

const CATEGORY_SPINE = Object.fromEntries(Object.entries(CATEGORIES).map(([k, c]) => [k, c.spine]));
const MECHANIC_PRIORITY = ['tts', 'timed', 'quiz', 'study', 'write', 'match'];
const MECHANIC_LABEL = { tts: '🔊 Audio', timed: 'Timed', quiz: 'Quiz', study: 'Study', write: 'Write', match: 'Match' };

function pillsHTML(mod) {
  const pills = [`<span class="pill lvl">${mod.cefr.toUpperCase()}</span>`];
  const mechanics = mod.tags.filter(t => MECHANIC_PRIORITY.includes(t))
    .sort((a, b) => MECHANIC_PRIORITY.indexOf(a) - MECHANIC_PRIORITY.indexOf(b))
    .slice(0, 2);
  mechanics.forEach(t => pills.push(`<span class="pill">${MECHANIC_LABEL[t]}</span>`));
  return pills.join('');
}

function titleHTML(mod) {
  return mod.title;
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
  const pct = Math.round(progress.progressPct);
  if (progress.completed) {
    return `<div class="book-progress book-progress--done" aria-label="Completado"><span class="book-progress__check">✓</span><span class="book-progress__bar"><span class="book-progress__fill" style="width:100%"></span></span></div>`;
  }
  return `<div class="book-progress" aria-label="${pct}% completado"><span class="book-progress__bar"><span class="book-progress__fill" style="width:${pct}%"></span></span><span class="book-progress__pct">${pct}%</span></div>`;
}

function bookCardHTML(mod, spineClass) {
  return `<a class="book ${spineClass}" href="${mod.exercise}" data-id="${mod.id}" data-tags="${mod.tags.join(',')}" data-cefr="${mod.cefr}">
    <div class="book-spine"></div>
    <div class="book-icon">${mod.icon}</div>
    <div class="book-body">
      <div class="book-title">${titleHTML(mod)}</div>
      <div class="book-meta">${mod.meta}</div>
      ${depthHTML(mod)}
      <div class="book-pills">${pillsHTML(mod)}</div>
      ${progressHTML(mod)}
    </div>
  </a>`;
}

function renderShelf(containerId, modules, category) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const cls = CATEGORY_SPINE[category] || '';
  // Dentro de cada estantería (categoría/subcategoría) el orden de origen en
  // MODULES es temático, no por nivel — se reordena aquí para que A1→C2 se
  // vea consistente sin depender de mantener el array de catalog.js a mano.
  const sorted = [...modules].sort((a, b) => LEVEL_ORDER.indexOf(a.cefr) - LEVEL_ORDER.indexOf(b.cefr));
  el.innerHTML = sorted.map(mod => bookCardHTML(mod, cls)).join('');
  // Si el filtrado por nivel deja la subsección sin módulos, ocultar todo el
  // bloque (encabezado incluido) en vez de mostrar un título sin contenido.
  const subsec = el.closest('.subsec');
  if (subsec) subsec.classList.toggle('hidden', sorted.length === 0);
}

/**
 * LearnFlow Progression System — docs/to-do/learnflow-progression-system.md.
 * El nivel activo es criterio de ACCESO, no una sugerencia: el material por
 * encima de lp-level no se renderiza (sin mensaje de "bloqueado", según el
 * diseño — simplemente no existe en la vista hasta que se desbloquea).
 */
export function renderAllShelves() {
  const activeLevel = getActiveLevel();
  const unlocked = (m) => levelUnlocks(m.cefr, activeLevel);

  renderShelf('shelf-pronunciation', MODULES.filter(m => m.category === 'pronunciation' && unlocked(m)), 'pronunciation');
  renderShelf('shelf-analysis', MODULES.filter(m => m.category === 'analysis' && unlocked(m)), 'analysis');
  Object.keys(SUBCATEGORIES).forEach(sub => {
    renderShelf(`shelf-grammar-${sub}`, MODULES.filter(m => m.category === 'grammar' && m.subcategory === sub && unlocked(m)), 'grammar');
    renderShelf(`shelf-vocab-${sub}`, MODULES.filter(m => m.category === 'vocab' && m.subcategory === sub && unlocked(m)), 'vocab');
  });
}
