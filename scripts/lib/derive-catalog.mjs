/**
 * derive-catalog.mjs — Deriva desde data/*.js + exercises/*.html los valores que
 * catalog.js hoy mantiene a mano (MODULE_DEPTH, PROGRESS_RULES).
 *
 * Fuente única de esta lógica: la consumen tanto validate-content.js (para
 * detectar desincronización) como sync-catalog.mjs (para corregirla). No
 * duplicar el cálculo en ninguno de los dos.
 *
 * Dos granularidades distintas, a propósito:
 *   - deriveEmittedScoreKeys() → por archivo de ejercicio, unión de todos sus packs.
 *     Es lo que el runtime realmente escribe en localStorage.
 *   - deriveModuleFacts()      → por módulo del catálogo, resolviendo #pack=X.
 *     Es lo que MODULE_DEPTH necesita para contar items/categorías.
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT_DIR = path.join(__dirname, '..', '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');

const stripQuery = (p) => p.split('#')[0].split('?')[0];

/** Cuenta items tanto en la forma { items: [...] } como en LEVELS con arrays sueltos. */
function countItems(categoryValue) {
  if (Array.isArray(categoryValue)) return categoryValue.length;
  return categoryValue?.items?.length ?? 0;
}

const dataModuleCache = new Map();
async function loadDataModule(fileName) {
  if (dataModuleCache.has(fileName)) return dataModuleCache.get(fileName);
  const full = path.join(DATA_DIR, fileName);
  const mod = existsSync(full) ? await import(pathToFileURL(full).href) : null;
  dataModuleCache.set(fileName, mod);
  return mod;
}

const htmlCache = new Map();
function loadHtml(relPath) {
  if (htmlCache.has(relPath)) return htmlCache.get(relPath);
  const full = path.join(ROOT_DIR, relPath);
  const html = existsSync(full) ? readFileSync(full, 'utf8') : null;
  htmlCache.set(relPath, html);
  return html;
}

/**
 * Modos jugables de un ejercicio = botones [data-mode] distintos.
 *
 * No se infiere del engine: dentro de un mismo engine el número varía (los
 * flashcard van de 3 a 6 modos). Y para spelling, los 4 niveles son [data-cat],
 * no modos — contarlos como 3×4=12 los duplicaba con la cifra de categorías.
 */
function countModes(html) {
  if (!html) return null;
  const modos = new Set([...html.matchAll(/data-mode="([^"]+)"/g)].map((m) => m[1]));
  return modos.size || null;
}

/** Nombre del data file importado por un ejercicio, o null. */
function dataFileOf(html) {
  const hit = html?.match(
    /import\s+\{[^}]*\b(?:CATEGORIES|LEVELS)\b[^}]*\}\s+from\s+['"]\.\.\/data\/([^'"]+)['"]/,
  );
  return hit ? hit[1] : null;
}

/**
 * Packs de un ejercicio. Viven en dos sitios según el módulo:
 * vocabulary.js los exporta como PACKS; pronunciation-study.html los declara
 * inline. Se resuelven los dos para no tratar a uno como caso especial.
 *
 * El bloque inline se parsea con regex en vez de evaluarse: solo hace falta el
 * array `keys` de cada pack, y ejecutar código leído de un archivo no aporta
 * nada aquí salvo riesgo.
 */
function packsOf(html, dataModule) {
  if (dataModule?.PACKS) return dataModule.PACKS;
  const block = html?.match(/const\s+PACKS\s*=\s*\{([\s\S]*?)\n\};/);
  if (!block) return null;

  const packs = {};
  for (const entry of block[1].matchAll(/(\w+)\s*:\s*\{[^}]*?keys\s*:\s*\[([^\]]*)\]/g)) {
    const keys = [...entry[2].matchAll(/['"]([^'"]+)['"]/g)].map((k) => k[1]);
    if (keys.length) packs[entry[1]] = { keys };
  }
  return Object.keys(packs).length ? packs : null;
}

/**
 * Claves de scoreKey que cada ejercicio escribe realmente en localStorage.
 * Replica las convenciones de cada engine — es el contrato que PROGRESS_RULES
 * debe declarar exactamente.
 */
export async function deriveEmittedScoreKeys(modules) {
  const emitted = new Set();
  const exercisePaths = new Set(
    modules.filter((m) => !m.wip).map((m) => stripQuery(m.exercise)),
  );

  for (const exercisePath of exercisePaths) {
    const html = loadHtml(exercisePath);
    if (!html) continue;

    const dataFile = dataFileOf(html);
    const dataModule = dataFile ? await loadDataModule(dataFile) : null;
    let categoryKeys = Object.keys(dataModule?.CATEGORIES || dataModule?.LEVELS || {});
    if (categoryKeys.length === 0) {
      categoryKeys = [...html.matchAll(/data-cat=["']([^"']+)["']/g)].map((m) => m[1]);
    }

    for (const match of html.matchAll(/recordScore\(\s*`([^`]*\$\{currentCat\}[^`]*)`/g)) {
      categoryKeys.forEach((cat) => emitted.add(match[1].replace('${currentCat}', cat)));
    }

    const scorePrefix = html.match(/scoreKeyPrefix:\s*['"]([^'"]+)['"]/)?.[1];
    if (scorePrefix) categoryKeys.forEach((cat) => emitted.add(`${scorePrefix}-${cat}`));

    const storagePrefix = html.match(/storagePrefix:\s*['"]([^'"]+)['"]/)?.[1];
    if (storagePrefix && html.includes('SpellingEngine')) {
      const modes = [...html.matchAll(/data-mode=["']([^"']+)["']/g)].map((m) => m[1]);
      categoryKeys.forEach((cat) => modes.forEach((mode) => emitted.add(`${storagePrefix}-${cat}-${mode}`)));
    } else if (storagePrefix && html.includes('FlashcardEngine')) {
      categoryKeys.forEach((cat) => emitted.add(`${storagePrefix}-${cat}-quiz`));
    }

    // Shared Match mode (js/exercise-flow.js createMatchMode) — recordScore()
    // lives in exercise-flow.js, not in the exercise HTML, so it can't match
    // the generic recordScore(`...${currentCat}...`) scan above.
    const matchScoreKey = html.match(/matchScoreKey:\s*['"]([^'"]+)['"]/)?.[1];
    if (matchScoreKey) categoryKeys.forEach((cat) => emitted.add(`${matchScoreKey}-${cat}-match`));
  }
  return emitted;
}

/**
 * Por módulo: qué categorías le corresponden y cuántos items suman.
 *
 * `derivable: false` marca los módulos cuyo data file no expone una forma
 * CATEGORIES/LEVELS reconocible (opposites.js exporta PAIRS/SYNONYMS,
 * irregular-verbs.js exporta VERBS). Esos conservan sus valores a mano.
 */
export async function deriveModuleFacts(modules) {
  const facts = new Map();

  for (const m of modules) {
    if (m.wip) continue;

    const exercisePath = stripQuery(m.exercise);
    const html = loadHtml(exercisePath);
    const dataFile = dataFileOf(html) || (m.dataFile ? path.basename(m.dataFile) : null);
    const dataModule = dataFile ? await loadDataModule(dataFile) : null;
    const catalogue = dataModule?.CATEGORIES || dataModule?.LEVELS;

    // `modes` sale del HTML, así que se conoce aunque el data file no sea derivable.
    const modes = countModes(html);

    if (!catalogue) {
      facts.set(m.id, { id: m.id, derivable: false, modes, reason: `sin CATEGORIES/LEVELS en ${dataFile ?? 'data file'}` });
      continue;
    }

    // Un módulo puede ser una vista parcial (#pack=home) sobre un data file compartido.
    const packName = m.exercise.match(/pack=([^&#?]+)/)?.[1];
    let keys = Object.keys(catalogue);
    if (packName) {
      const packs = packsOf(html, dataModule);
      const pack = packs?.[packName];
      if (!pack?.keys) {
        facts.set(m.id, { id: m.id, derivable: false, reason: `pack "${packName}" no resoluble` });
        continue;
      }
      keys = pack.keys.filter((k) => catalogue[k]);
    }

    facts.set(m.id, {
      id: m.id,
      derivable: true,
      categoryKeys: keys,
      categories: keys.length,
      items: keys.reduce((sum, k) => sum + countItems(catalogue[k]), 0),
      modes,
    });
  }

  return facts;
}
