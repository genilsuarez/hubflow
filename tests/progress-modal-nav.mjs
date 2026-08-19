/**
 * HubFlow — El modal "Progreso del módulo" debe poder navegar a TODAS sus celdas.
 *
 * Cada celda del modal es un botón que lleva a (categoría × modo) del ejercicio.
 * Si el modo derivado de las scoreKeys no existe como `data-mode` en la página,
 * la celda se pinta pero no lleva a ninguna parte — que es justo el fallo que
 * este test evita que vuelva: Verb Tenses no cambiaba de modo al pulsar Quiz, y
 * articles/collocations/quantifiers/advanced-collocations/prepositions pintaban
 * una columna Match que su ejercicio no tiene.
 *
 * Replica la derivación de modos de computeModuleMatrixCore() en
 * js/progress-store.js — si esa cambia, este test debe cambiar con ella.
 */
import { readFileSync, existsSync } from 'node:fs';
import { MODULES, PROGRESS_RULES, MODULE_DEPTH } from '../data/catalog.js';

const KNOWN_MODES = ['quiz', 'match', 'write', 'study', 'challenge', 'timed', 'sort'];
const ENGINE_FORCED = {
  flashcard: ['quiz', 'match', 'timed'],
  spelling: ['study', 'challenge', 'timed'],
};

/** Nombres de `data-mode` que valen para un modo de la matriz. */
function domNamesFor(mode) {
  // Una scoreKey sin sufijo (mode === null) ES la columna Quiz, y esa columna
  // `hunt` es como error-hunt y punctuation-fix llaman a esa columna.
  // `hunt` es como error-hunt y punctuation-fix llaman a esa columna.
  if (mode === null || mode === 'quiz') return ['quiz', 'hunt'];
  return [mode];
}

function trackedModesFor(contentId) {
  const rule = PROGRESS_RULES[contentId];
  if (!rule) return null;
  const studyActivity = rule.requiredActivities.find(a => a.activityId === 'study');
  const matrixActivities = rule.requiredActivities.filter(a => a.activityId !== 'study');
  if (!matrixActivities.length) return null;

  const modesFromKeys = new Set();
  let hasNoModeSuffix = false;
  const masteryKeys = Array.isArray(rule.masteryKeys) ? rule.masteryKeys : [];
  for (const key of [...matrixActivities.flatMap(a => a.scoreKeys), ...masteryKeys]) {
    const last = key.split('-').pop();
    if (KNOWN_MODES.includes(last)) modesFromKeys.add(last);
    else hasNoModeSuffix = true;
  }

  let tracked = [...modesFromKeys];
  if (hasNoModeSuffix) tracked = [null, ...tracked];

  const forced = ENGINE_FORCED[MODULE_DEPTH[contentId]?.engine];
  if (forced) tracked = [...new Set([...forced, ...modesFromKeys])];

  if (studyActivity && !tracked.includes('study')) tracked = [...tracked, 'study'];
  return tracked;
}

let checked = 0;
const failures = [];

for (const mod of MODULES) {
  const tracked = trackedModesFor(mod.id);
  if (!tracked || !mod.exercise || !existsSync(mod.exercise)) continue;
  const html = readFileSync(mod.exercise, 'utf8');
  const pills = new Set([...html.matchAll(/data-mode="([a-z]+)"/g)].map(m => m[1]));
  if (!pills.size) continue; // motores sin barra de modos (shell dinámico)
  checked++;

  for (const mode of tracked) {
    if (!domNamesFor(mode).some(n => pills.has(n))) {
      failures.push(
        `${mod.id}: la matriz declara el modo '${mode ?? '(sin sufijo → Quiz)'}' `
        + `pero ${mod.exercise} solo tiene [${[...pills].join(', ')}]`
      );
    }
  }
}

// Además: `engine` en MODULE_DEPTH solo debe decir 'flashcard'/'spelling' si el
// ejercicio importa ese motor — es lo que fuerza columnas que no existen.
const ENGINE_FILE = { flashcard: 'flashcard-engine.js', spelling: 'spelling-engine.js' };
for (const mod of MODULES) {
  const engine = MODULE_DEPTH[mod.id]?.engine;
  if (!ENGINE_FILE[engine] || !mod.exercise || !existsSync(mod.exercise)) continue;
  const html = readFileSync(mod.exercise, 'utf8');
  const real = (html.match(/js\/engines\/([a-z0-9-]+\.js)/) || [])[1] || '(ninguno)';
  if (real !== ENGINE_FILE[engine]) {
    failures.push(
      `${mod.id}: MODULE_DEPTH declara engine '${engine}' pero ${mod.exercise} usa ${real} `
      + `— eso le fuerza columnas [${ENGINE_FORCED[engine].join(', ')}] que puede no tener`
    );
  }
}

if (failures.length) {
  console.error(`\n❌ Navegación del modal de progreso — ${failures.length} fallo(s):\n`);
  for (const f of failures) console.error('  • ' + f);
  process.exit(1);
}
console.log(`\n✅ Navegación del modal de progreso — ${checked} módulos, todas las celdas alcanzables`);
