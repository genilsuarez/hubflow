#!/usr/bin/env node
/**
 * validate-content.js — Validación de contenido de datos de HubFlow (data/*.js)
 *
 * HubFlow no tiene bundler ni test runner: este script importa cada módulo de
 * datos directamente con Node (ESM) y corre chequeos estructurales específicos
 * por ejercicio. Pensado para correr antes de commit/push en build.sh.
 *
 * Uso:
 *   node scripts/validate-content.js
 *
 * Exit codes:
 *   0 = sin errores
 *   1 = errores encontrados
 */

import { readdirSync, readFileSync, existsSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import { deriveEmittedScoreKeys, deriveModuleFacts } from './lib/derive-catalog.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const EXERCISES_DIR = path.join(ROOT_DIR, 'exercises');

const errors = [];
const warnings = [];
function err(code, msg) { errors.push(`[${code}] ${msg}`); }
function warn(code, msg) { warnings.push(`[${code}] ${msg}`); }

const clean = (s) => (s || '').replace(/[.,!?;:"']+$/, '').replace(/^["']+/, '');

/** Flatten a CATEGORIES-shaped module ({ key: { items: [...] } }) into [{cat, items}]. */
function flattenCategories(mod) {
  const CATEGORIES = mod.CATEGORIES || mod.LEVELS;
  if (!CATEGORIES) return null;
  return Object.entries(CATEGORIES).map(([cat, c]) => ({ cat, items: c.items || [] }));
}

function validateErrorHunt(mod, file) {
  const groups = flattenCategories(mod);
  if (!groups) return;
  for (const { cat, items } of groups) {
    items.forEach((item, ii) => {
      const words = (item.text || '').split(' ');
      for (const e of item.errors || []) {
        if (clean(words[e.index]) !== clean(e.word)) {
          err('EH-INDEX', `${file}[${cat}#${ii}]: word "${e.word}" declared at index ${e.index} but text[${e.index}]="${words[e.index]}"`);
        }
      }
    });
  }
}

function validateRegisterSwitch(mod, file) {
  const groups = flattenCategories(mod);
  if (!groups) return;
  for (const { cat, items } of groups) {
    items.forEach((item, ii) => {
      if (typeof item.source !== 'string' || !item.source.trim()) {
        err('RS-FIELD', `${file}[${cat}#${ii}]: missing or empty "source"`);
      }
      if (!Array.isArray(item.correct) || item.correct.length === 0 || item.correct.some((c) => !c || typeof c !== 'string')) {
        err('RS-CORRECT', `${file}[${cat}#${ii}]: "correct" must be a non-empty array of non-empty strings`);
      }
    });
  }
}

function validateSentenceCombining(mod, file) {
  const groups = flattenCategories(mod);
  if (!groups) return;
  for (const { cat, items } of groups) {
    items.forEach((item, ii) => {
      if (!Array.isArray(item.sentences) || item.sentences.length !== 2 || item.sentences.some((s) => !s || typeof s !== 'string')) {
        err('SC-SENTENCES', `${file}[${cat}#${ii}]: "sentences" must be an array of exactly 2 non-empty strings`);
      }
      if (!Array.isArray(item.correct) || item.correct.length === 0 || item.correct.some((c) => !c || typeof c !== 'string')) {
        err('SC-CORRECT', `${file}[${cat}#${ii}]: "correct" must be a non-empty array of non-empty strings`);
      }
    });
  }
}

function validateParagraphCloze(mod, file) {
  const groups = flattenCategories(mod);
  if (!groups) return;
  for (const { cat, items } of groups) {
    items.forEach((item, ii) => {
      const text = item.text || '';
      const markersInText = [...text.matchAll(/___(\d+)___/g)].map((m) => Number(m[1])).sort((a, b) => a - b);
      const blankNumbers = (item.blanks || []).map((b) => b.n).sort((a, b) => a - b);
      if (JSON.stringify(markersInText) !== JSON.stringify(blankNumbers)) {
        err('PC-MISMATCH', `${file}[${cat}#${ii}]: text markers ${JSON.stringify(markersInText)} don't match blanks ${JSON.stringify(blankNumbers)}`);
      }
      (item.blanks || []).forEach((b) => {
        if (!Array.isArray(b.correct) || b.correct.length === 0 || b.correct.some((c) => !c || typeof c !== 'string')) {
          err('PC-BLANK', `${file}[${cat}#${ii}] blank #${b.n}: "correct" must be a non-empty array of non-empty strings`);
        }
      });
    });
  }
}

function validateOddOneOut(mod, file) {
  const groups = flattenCategories(mod);
  if (!groups) return;
  for (const { cat, items } of groups) {
    items.forEach((item, ii) => {
      if (!Array.isArray(item.words) || item.odd === undefined || item.odd < 0 || item.odd >= item.words.length) {
        err('OOO-INDEX', `${file}[${cat}#${ii}]: "odd" index out of range for words=${JSON.stringify(item.words)}`);
      }
      if ((item.reason || '').includes('Actually:') || (item.reason || '').match(/\bActually\b.*\bActually\b/)) {
        err('OOO-DEBRIS', `${file}[${cat}#${ii}]: leftover authoring text in "reason": "${item.reason}"`);
      }
    });
  }
}

/** Generic exact-duplicate-item check for any CATEGORIES-shaped module. */
function validateDuplicates(mod, file) {
  const groups = flattenCategories(mod);
  if (groups) {
    for (const { cat, items } of groups) {
      const seen = new Map();
      items.forEach((item, ii) => {
        const key = JSON.stringify(item);
        if (seen.has(key)) {
          err('DUP-ITEM', `${file}[${cat}#${ii}]: exact duplicate of [${cat}#${seen.get(key)}]`);
        } else {
          seen.set(key, ii);
        }
      });
    }
    return;
  }
  // Flat arrays (VERBS, PAIRS, ...)
  const arr = mod.VERBS || mod.PAIRS;
  if (Array.isArray(arr)) {
    const seen = new Map();
    arr.forEach((item, i) => {
      const key = JSON.stringify(item);
      if (seen.has(key)) {
        err('DUP-ITEM', `${file}[${i}]: exact duplicate of [${seen.get(key)}]`);
      } else {
        seen.set(key, i);
      }
    });
  }
}

const SPECIAL = {
  'error-hunt.js': validateErrorHunt,
  'odd-one-out.js': validateOddOneOut,
  'register-switch.js': validateRegisterSwitch,
  'sentence-combining.js': validateSentenceCombining,
  'paragraph-cloze.js': validateParagraphCloze,
};

/**
 * Todo `correct` tiene que ser alcanzable desde las opciones que el engine
 * pinta, o el item es imposible de acertar y ni siquiera se resalta la
 * respuesta buena al fallar.
 *
 * Las opciones salen de item.options, cat.options o cat.pairs según el engine;
 * confusing-words además acepta formas conjugadas vía un baseMap de regex en su
 * HTML, así que se lee y se respeta. Sin lista de opciones (respuesta escrita)
 * no aplica.
 */
function parseBaseMap(html) {
  const raw = html.match(/const baseMap = \{([\s\S]*?)\};/)?.[1];
  if (!raw) return null;
  const map = new Map();
  for (const m of raw.matchAll(/'([^']+)':\s*\/\^\(([^)]*)\)\$\/i/g)) {
    map.set(m[1].toLowerCase(), new Set(m[2].toLowerCase().split('|')));
  }
  return map.size ? map : null;
}

async function validateAnswerable(MODULES) {
  for (const m of MODULES) {
    if (m.wip || !m.dataFile) continue;

    const dataPath = path.join(ROOT_DIR, m.dataFile.split('#')[0]);
    if (!existsSync(dataPath)) continue;
    const mod = await import(pathToFileURL(dataPath).href);
    const CATS = mod.CATEGORIES || mod.LEVELS;
    if (!CATS) continue;

    const exercisePath = path.join(ROOT_DIR, m.exercise.split('#')[0].split('?')[0]);
    const baseMap = existsSync(exercisePath) ? parseBaseMap(readFileSync(exercisePath, 'utf8')) : null;

    for (const [key, cat] of Object.entries(CATS)) {
      const items = Array.isArray(cat) ? cat : (cat.items || []);
      for (const [i, it] of items.entries()) {
        if (!it || it.correct == null) continue;
        const opts = Array.isArray(it.options) ? it.options
          : Array.isArray(cat.options) ? cat.options
          : Array.isArray(cat.pairs) ? cat.pairs
          : null;
        if (!opts) continue;

        for (const c of (Array.isArray(it.correct) ? it.correct : [it.correct])) {
          const target = String(c).toLowerCase();
          const alcanzable = opts.some((o) => {
            if (o === c || String(o).toLowerCase() === target) return true;
            return baseMap?.get(String(o).toLowerCase())?.has(target) ?? false;
          });
          if (!alcanzable) {
            err('DATA-ANSWER', `${m.dataFile}[${key}#${i}]: correct "${c}" no está entre las opciones [${opts.join(', ')}] — el item es inacertable`);
          }
        }
      }
    }
  }
}

/**
 * cefrByCategory (rebalanceo 2026-07-30, Fase 2 — docs/to-do/hubflow-cefr-rebalance.md)
 * declara el nivel CEFR de cada categoría interna de un módulo escalonado
 * (technology-internet, phrasal-verbs, etc.). Debe coincidir 1:1 con las
 * categorías reales del data file: ni claves huérfanas (categoría renombrada
 * o borrada) ni categorías sin nivel asignado (categoría nueva sin clasificar).
 */
async function validateCefrByCategory(MODULES) {
  const CEFR_LEVELS = new Set(['a1', 'a2', 'b1', 'b2', 'c1', 'c2']);
  for (const m of MODULES) {
    if (m.wip || !m.cefrByCategory || !m.dataFile) continue;

    const dataPath = path.join(ROOT_DIR, m.dataFile.split('#')[0]);
    if (!existsSync(dataPath)) continue;
    const mod = await import(pathToFileURL(dataPath).href);
    const realKeys = new Set(Object.keys(mod.CATEGORIES || mod.LEVELS || {}));
    const declaredKeys = new Set(Object.keys(m.cefrByCategory));

    for (const key of declaredKeys) {
      if (!realKeys.has(key)) {
        err('CAT-CEFRCAT', `catalog.js[${m.id}].cefrByCategory: "${key}" no existe en ${m.dataFile} — corregir o eliminar`);
      }
      const level = m.cefrByCategory[key];
      if (!CEFR_LEVELS.has(level)) {
        err('CAT-CEFRCAT', `catalog.js[${m.id}].cefrByCategory["${key}"]: nivel "${level}" no es un CEFR válido`);
      }
    }
    for (const key of realKeys) {
      if (!declaredKeys.has(key)) {
        err('CAT-CEFRCAT', `catalog.js[${m.id}].cefrByCategory: falta la categoría "${key}" (existe en ${m.dataFile} pero no tiene nivel declarado)`);
      }
    }
  }
}

/**
 * Los botones de acción van en #exBottomNav, no sueltos en el contenido.
 * ex-bottom-nav.js solo iza ids concretos, así que un id propio deja el botón
 * flotando — es lo que pasaba con `writeCheck` y con `battleActions`.
 */
function validateBottomNavContract() {
  const CANON_BATTLE = ['battleClaim', 'battleJudge', 'battleNext'];
  // ids de acción que ex-bottom-nav.js reconoce y coloca en la barra
  const CANON_BTN = new Set(['checkBtn', 'nextBtn', 'prevBtn', 'hintBtn', 'skipBtn',
    'shuffleBtn', 'speakBtn', 'listenBtn', 'studySpeakBtn', 'lessonProgressBtn']);

  for (const file of readdirSync(EXERCISES_DIR).filter((f) => f.endsWith('.html'))) {
    const html = readFileSync(path.join(EXERCISES_DIR, file), 'utf8');

    // 1) grupos .battle-actions con id no canónico
    for (const m of html.matchAll(/<div[^>]*class="[^"]*battle-actions[^"]*"[^>]*id="([^"]+)"/g)) {
      if (!CANON_BATTLE.includes(m[1])) {
        err('NAV-BTN', `exercises/${file}: grupo battle "${m[1]}" no es ${CANON_BATTLE.join('/')} — se quedará fuera de la barra`);
      }
    }

    // 2) botón de comprobar con id propio dentro de un [data-area]
    for (const m of html.matchAll(/<button[^>]*\bid="(\w*[Cc]heck\w*)"/g)) {
      if (!CANON_BTN.has(m[1]) && !/insertInBottomNav/.test(html)) {
        err('NAV-BTN', `exercises/${file}: botón "${m[1]}" no es #checkBtn ni se coloca con __insertInBottomNav — quedará fuera de la barra`);
      }
    }
  }
}

/**
 * El sidebar de index.html es HTML estático (se pinta antes de que corra el JS),
 * así que no puede generarse desde js/nav-sections.js. Aquí se comprueba que no
 * haya derivado: es lo que dejó "Rutas guiadas" en el dashboard pero fuera del
 * sidebar de los ejercicios.
 *
 * Desde el refactor de sidebar (Opción D, docs/to-do/hubflow-sidebar-refactor.md)
 * solo las secciones `primary: true` (Inicio, Rutas, Mis estadísticas) viven en
 * el sidebar — las categorías y "guides" se movieron a chips en #catalogToolbar
 * y ya no se validan aquí; siguen siendo válidas para `?section=` y back-nav vía
 * NAV_SECTION_KEYS (validado en la sección 3, el mirror `var vs`).
 */
async function validateNavSections() {
  const navPath = path.join(ROOT_DIR, 'js', 'nav-sections.js');
  const indexPath = path.join(ROOT_DIR, 'index.html');
  if (!existsSync(navPath) || !existsSync(indexPath)) return;

  const { NAV_SECTIONS, NAV_SECTION_KEYS } = await import(pathToFileURL(navPath).href);
  const html = readFileSync(indexPath, 'utf8');
  const primarySections = NAV_SECTIONS.filter((s) => s.primary);
  const primaryKeys = new Set(primarySections.map((s) => s.key));

  // 1) Sidebar estático: mismas secciones primarias y mismas etiquetas — las
  //    categorías/guides no deben aparecer aquí (viven en #catalogChips).
  const sidebar = html.match(/<nav class="sb-nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
  if (!sidebar) {
    err('NAV-SYNC', 'index.html: no se encontró <nav class="sb-nav"> para validar');
  } else {
    const rendered = new Map(
      [...sidebar.matchAll(/data-target="([^"]+)"[\s\S]*?<span class="sb-label">([^<]*)<\/span>/g)]
        .map(([, key, label]) => [key, label.replace(/&amp;/g, '&').trim()]),
    );
    for (const s of primarySections) {
      if (!rendered.has(s.key)) {
        err('NAV-SYNC', `index.html: falta la sección "${s.key}" (${s.label}) en el sidebar estático`);
      } else if (rendered.get(s.key) !== s.label) {
        err('NAV-SYNC', `index.html: sección "${s.key}" dice "${rendered.get(s.key)}", nav-sections.js dice "${s.label}"`);
      }
    }
    for (const key of rendered.keys()) {
      if (!primaryKeys.has(key)) {
        err('NAV-SYNC', `index.html: sección "${key}" en el sidebar no es una sección primaria (nav-sections.js) — las categorías van como chip en #catalogChips, no en el sidebar`);
      }
    }
  }

  // 2) Estanterías del dashboard: el <div class="sec-head"> de cada sección de
  //    categoría debe decir lo mismo que CATEGORIES.
  const { CATEGORIES, TAGS } = await import(pathToFileURL(path.join(DATA_DIR, 'catalog.js')).href);
  for (const [key, cat] of Object.entries(CATEGORIES)) {
    const section = html.match(
      new RegExp(`<section class="section" data-key="${key}">\\s*<div class="sec-head">([^<]*)</div>`),
    );
    if (section && section[1].replace(/&amp;/g, '&').trim() !== cat.label) {
      err('NAV-SYNC', `index.html: sección "${key}" titula "${section[1].trim()}", CATEGORIES dice "${cat.label}"`);
    }
  }

  // Las 4 categorías (+ "all"/Browse, que las combina) se agrupan en un
  // acordeón por nivel CEFR (<details id="acc-${catKey}-${level}">), no por
  // subcategoría — la subcategoría (donde existe) vive como tag dentro de la
  // tarjeta (ver pillsHTML en dashboard-shelves.js).
  for (const catKey of ['all', 'vocab', 'grammar', 'pronunciation', 'analysis']) {
    for (const level of TAGS.cefr) {
      const sub = html.match(
        new RegExp(`id="acc-${catKey}-${level}" data-level="${level}"[^>]*>\\s*<summary class="sec-head sec-head--sub">([^<]*)</summary>\\s*<div class="shelf" id="shelf-${catKey}-${level}">`),
      );
      if (!sub) {
        err('NAV-SYNC', `index.html: falta la subsección "${level}" en la sección "${catKey}"`);
      } else if (sub[1].trim() !== level.toUpperCase()) {
        err('NAV-SYNC', `index.html: subsección "${level}" de "${catKey}" titula "${sub[1].trim()}", se esperaba "${level.toUpperCase()}"`);
      }
    }
  }

  // 3) Espejo del script inline pre-paint (no puede importar módulos).
  const inline = html.match(/var vs = \[([^\]]+)\]/)?.[1];
  if (!inline) {
    err('NAV-SYNC', 'index.html: no se encontró el array "vs" del script de early section detection');
  } else {
    const keys = [...inline.matchAll(/'([^']+)'/g)].map((m) => m[1]);
    const missing = NAV_SECTION_KEYS.filter((k) => !keys.includes(k));
    const extra = keys.filter((k) => !NAV_SECTION_KEYS.includes(k));
    if (missing.length || extra.length) {
      err('NAV-SYNC', `index.html "var vs": desincronizado con nav-sections.js${missing.length ? ` — falta [${missing}]` : ''}${extra.length ? ` — sobra [${extra}]` : ''}`);
    }
    if (keys[0] !== 'resumen') {
      err('NAV-SYNC', `index.html "var vs": 'resumen' debe ir primero (el filtro usa indexOf > 0), va "${keys[0]}"`);
    }
  }
}

/**
 * Catálogo central (data/catalog.js, Fase 0 del plan de recategorización).
 * Valida integridad de rutas, unicidad de ids, y que los 34 ejercicios en
 * exercises/*.html tengan una entrada — sin huérfanos en ningún sentido.
 */
/**
 * LEARNING_PATHS referencia ids de módulo a mano y su orden es lo que el
 * dashboard propone como progresión. Tres cosas se rompían en silencio:
 * un id renombrado dejaba el paso apuntando al vacío; un módulo fuera de orden
 * CEFR mandaba al usuario a un B2 antes que a un B1; y un módulo nuevo que no
 * entra a ninguna ruta queda invisible para el sistema guiado — le pasó a los
 * 71 módulos del rebalanceo de julio 2026, ninguno entró a una ruta.
 */
async function validateLearningPaths(MODULES, TAGS) {
  const pathsPath = path.join(DATA_DIR, 'learning-paths.js');
  if (!existsSync(pathsPath)) return;
  const { LEARNING_PATHS, pathCefrRegressions, pathSections } = await import(pathToFileURL(pathsPath).href);

  const moduleIds = new Set(MODULES.map((m) => m.id));
  const pathIds = new Set();
  const covered = new Set();

  for (const p of LEARNING_PATHS) {
    if (pathIds.has(p.id)) err('PATH-ID', `learning-paths.js: ruta duplicada "${p.id}"`);
    pathIds.add(p.id);

    // `cefr` se derivaba mal en cuanto el catálogo re-nivelaba un módulo, y
    // `color` no lo leía nadie: ambos se quitaron a propósito.
    if ('cefr' in p) err('PATH-FIELD', `learning-paths.js[${p.id}]: no declarar "cefr" — se deriva con pathCefrRange()`);
    if ('color' in p) err('PATH-FIELD', `learning-paths.js[${p.id}]: "color" no lo lee ningún render — quitarlo o cablearlo primero`);

    const seen = new Set();
    for (const id of p.modules) {
      if (!moduleIds.has(id)) err('PATH-ID', `learning-paths.js[${p.id}]: módulo "${id}" no existe en catalog.js`);
      else covered.add(id);
      if (seen.has(id)) err('PATH-DUP', `learning-paths.js[${p.id}]: módulo "${id}" repetido dentro de la misma ruta`);
      seen.add(id);
    }

    for (const { from, to } of pathCefrRegressions(p)) {
      err('PATH-ORDER', `learning-paths.js[${p.id}]: "${from}" → "${to}" baja de nivel CEFR — los pasos van de menor a mayor`);
    }

    // Principio 2: una ruta responde a "¿qué logro?", así que cruza secciones.
    // `deepDive` es la puerta de salida, y solo se abre cuando la cola de una
    // categoría no tiene pareja temática en ninguna otra (las dos rutas de
    // pronunciación por encima de A2).
    const sections = pathSections(p);
    if (!p.deepDive && sections.size < 3) {
      err('PATH-SECTIONS', `learning-paths.js[${p.id}]: cruza ${sections.size} sección(es) (${[...sections].join(', ')}) — el mínimo son 3, o marcarla deepDive con motivo`);
    }
    if (p.deepDive && sections.size >= 3) {
      err('PATH-SECTIONS', `learning-paths.js[${p.id}]: marcada deepDive pero ya cruza ${sections.size} secciones — quitar la excepción`);
    }
  }

  // Cobertura: warning y no error. El catálogo siempre tendrá más módulos que
  // rutas; lo que importa es que el número sea visible en cada build, para que
  // añadir 40 módulos sin engancharlos no vuelva a pasar desapercibido.
  const perLevel = TAGS.cefr
    .map((level) => {
      const all = MODULES.filter((m) => m.cefr === level);
      return `${level.toUpperCase()} ${all.filter((m) => covered.has(m.id)).length}/${all.length}`;
    })
    .join(' · ');
  const pct = Math.round((covered.size / moduleIds.size) * 100);
  if (pct < 100) {
    warn('PATH-COVERAGE', `las rutas cubren ${covered.size}/${moduleIds.size} módulos (${pct}%) — ${perLevel}`);
  }
}

async function validateCatalog() {
  const catalogPath = path.join(DATA_DIR, 'catalog.js');
  if (!existsSync(catalogPath)) return;

  const { MODULES, TAGS, CATEGORIES, SUBCATEGORIES, PROGRESS_RULES, HUBFLOW_PASS_SCORE_PCT } = await import(pathToFileURL(catalogPath).href);
  const allTags = new Set([...TAGS.skill, ...TAGS.cefr, ...TAGS.mechanic, ...TAGS.theme]);

  const seenIds = new Set();
  for (const m of MODULES) {
    if (seenIds.has(m.id)) err('CAT-DUPID', `catalog.js: duplicate module id "${m.id}"`);
    seenIds.add(m.id);

    if (m.wip) continue;

    for (const [field, p] of [['exercise', m.exercise], ['guide', m.guide], ['dataFile', m.dataFile]]) {
      const pathOnly = p ? p.split('#')[0].split('?')[0] : p;
      if (pathOnly && !existsSync(path.join(ROOT_DIR, pathOnly))) {
        err('CAT-PATH', `catalog.js[${m.id}].${field}: file not found "${p}"`);
      }
    }

    if (!Array.isArray(m.tags) || m.tags.length < 3 || m.tags.length > 6) {
      err('CAT-TAGCOUNT', `catalog.js[${m.id}]: expected 3-6 tags, got ${m.tags?.length ?? 0}`);
    }
    for (const t of m.tags || []) {
      if (!allTags.has(t)) err('CAT-TAG', `catalog.js[${m.id}]: tag "${t}" not in closed vocabulary`);
    }
    // Sin esto, un typo en `category` deja el módulo sin estantería: no aparece
    // en ninguna sección del dashboard y nadie se entera.
    if (!CATEGORIES[m.category]) {
      err('CAT-CATEGORY', `catalog.js[${m.id}]: category "${m.category}" no existe en CATEGORIES`);
    }
    if (m.subcategory && !SUBCATEGORIES[m.subcategory]) {
      err('CAT-SUBCAT', `catalog.js[${m.id}]: unknown subcategory "${m.subcategory}"`);
    }
  }

  await validateAnswerable(MODULES);
  await validateCefrByCategory(MODULES);

  const moduleIds = new Set(MODULES.map((module) => module.id));
  for (const module of MODULES) {
    const rule = PROGRESS_RULES[module.id];
    if (!rule) {
      err('CAT-PROGRESS', `catalog.js[${module.id}]: missing explicit progress rule`);
      continue;
    }
    if (!['all', 'any'].includes(rule.completionRule)) {
      err('CAT-PROGRESS', `catalog.js[${module.id}]: completionRule must be "all" or "any"`);
    }
    if (!Array.isArray(rule.requiredActivities) || rule.requiredActivities.length === 0) {
      err('CAT-PROGRESS', `catalog.js[${module.id}]: requiredActivities must not be empty`);
      continue;
    }
    for (const activity of rule.requiredActivities) {
      if (!activity.activityId || !Array.isArray(activity.scoreKeys) || activity.scoreKeys.length === 0) {
        err('CAT-PROGRESS', `catalog.js[${module.id}]: activity requires activityId and exact scoreKeys`);
      }
      if (activity.passScorePct !== HUBFLOW_PASS_SCORE_PCT) {
        err('CAT-PROGRESS', `catalog.js[${module.id}].${activity.activityId}: passScorePct must be ${HUBFLOW_PASS_SCORE_PCT}`);
      }
      if (new Set(activity.scoreKeys).size !== activity.scoreKeys.length) {
        err('CAT-PROGRESS', `catalog.js[${module.id}].${activity.activityId}: duplicate scoreKeys`);
      }
    }
  }
  for (const contentId of Object.keys(PROGRESS_RULES)) {
    if (!moduleIds.has(contentId)) err('CAT-PROGRESS', `progress rule references unknown content "${contentId}"`);
  }

  // La derivación vive en scripts/lib/derive-catalog.mjs — la comparte
  // sync-catalog.mjs, que además sabe corregir lo que aquí solo se reporta.
  const emittedScoreKeys = await deriveEmittedScoreKeys(MODULES);

  const wipIds = new Set(MODULES.filter((m) => m.wip).map((m) => m.id));
  const declaredScoreKeys = new Set(Object.entries(PROGRESS_RULES)
    .filter(([id]) => !wipIds.has(id))
    .flatMap(([, rule]) => rule.requiredActivities.flatMap((activity) => activity.scoreKeys))
  );
  for (const key of emittedScoreKeys) {
    if (!declaredScoreKeys.has(key)) err('CAT-SCOREKEY', `runtime score key "${key}" has no progress rule`);
  }
  for (const key of declaredScoreKeys) {
    if (!emittedScoreKeys.has(key)) err('CAT-SCOREKEY', `progress score key "${key}" is not emitted by any exercise`);
  }

  // MODULE_DEPTH alimenta el "20 items · 2 categorías" que ve el usuario. Es
  // auto-corregible, así que el error apunta al script en vez de pedir edición
  // a mano (un conteo en duro ya se desincronizó en silencio antes — ver el
  // comentario de vocabDepth() en catalog.js).
  const { MODULE_DEPTH } = await import(pathToFileURL(catalogPath).href);
  const facts = await deriveModuleFacts(MODULES);
  for (const [id, fact] of facts) {
    const depth = MODULE_DEPTH[id];
    if (!fact.derivable || !depth) continue;
    if (depth.items !== fact.items || depth.categories !== fact.categories) {
      err('CAT-DEPTH', `catalog.js MODULE_DEPTH[${id}]: declara ${depth.items} items/${depth.categories} cats, data/*.js tiene ${fact.items}/${fact.categories} — corregir con "node scripts/sync-catalog.mjs"`);
    }
  }

  // Los modos salen de los [data-mode] del ejercicio, no del engine: dentro de
  // un mismo engine varían (flashcard va de 3 a 6), y en spelling los 4 niveles
  // son [data-cat] — contarlos como modos duplicaba la cifra de categorías.
  for (const [id, fact] of facts) {
    if (fact.modes == null) continue;
    const declarado = MODULE_DEPTH[id]?.modes;
    if (declarado !== fact.modes) {
      err('CAT-DEPTH', `catalog.js MODULE_DEPTH[${id}]: declara ${declarado ?? '(heredado del engine)'} modos, el ejercicio tiene ${fact.modes} — corregir con "node scripts/sync-catalog.mjs"`);
    }
  }

  await validateLearningPaths(MODULES, TAGS);

  // Every exercises/*.html must have a catalog entry (no orphans in either direction).
  const exerciseFiles = readdirSync(EXERCISES_DIR).filter((f) => f.endsWith('.html'));
  const catalogedExercises = new Set(MODULES.map((m) => path.basename(m.exercise.split('#')[0].split('?')[0])));
  for (const f of exerciseFiles) {
    if (!catalogedExercises.has(f)) err('CAT-ORPHAN', `exercises/${f}: not registered in catalog.js`);
  }
}

async function run() {
  const files = readdirSync(DATA_DIR).filter((f) => f.endsWith('.js'));

  for (const file of files) {
    const mod = await import(pathToFileURL(path.join(DATA_DIR, file)).href);
    validateDuplicates(mod, file);
    if (SPECIAL[file]) SPECIAL[file](mod, file);
  }

  await validateCatalog();
  await validateNavSections();
  validateBottomNavContract();

  console.log('============================================================');
  console.log('📊 HubFlow — CONTENT VALIDATION REPORT');
  console.log('============================================================\n');
  console.log(`📦 Files checked: ${files.length}`);

  if (errors.length > 0) {
    console.log(`\n❌ ERRORS (${errors.length}):`);
    errors.forEach((e) => console.log(`  ${e}`));
  }
  if (warnings.length > 0) {
    console.log(`\n⚠️  WARNINGS (${warnings.length}):`);
    warnings.forEach((w) => console.log(`  ${w}`));
  }

  console.log('\n============================================================');
  console.log(`RESULT: ${errors.length} errors, ${warnings.length} warnings`);
  console.log(errors.length === 0 ? '✅ No errors found' : '❌ Errors found — fix before deploying');
  console.log('============================================================');

  process.exit(errors.length > 0 ? 1 : 0);
}

run();
