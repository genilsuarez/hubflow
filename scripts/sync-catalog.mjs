#!/usr/bin/env node
/**
 * sync-catalog.mjs — Sincroniza los valores derivados de data/catalog.js con la
 * realidad de data/*.js.
 *
 * catalog.js mantiene a mano dos cosas que en realidad se pueden calcular:
 *   - MODULE_DEPTH.items / .categories  → cuántos items y subcategorías tiene el módulo
 *   - PROGRESS_RULES_BASE  scoreKeys('x', [...]) → los nombres de las subcategorías
 *
 * Cuando alguien renombra o divide una categoría en un data file, esas copias
 * quedan desfasadas en silencio. Este script las recalcula desde la fuente real.
 *
 * Es codegen, no runtime: catalog.js sigue siendo un archivo estático y el
 * navegador nunca importa los 616 KB de data/ para pintar el dashboard.
 *
 * Uso:
 *   node scripts/sync-catalog.mjs           # corrige catalog.js in-place
 *   node scripts/sync-catalog.mjs --check   # solo reporta, exit 1 si hay desfase (CI)
 *
 * Se salta deliberadamente las entradas ya derivadas en runtime (vocabDepth),
 * las de forma distinta (spellingScoreKeys) y los módulos cuyo data file no
 * expone CATEGORIES/LEVELS.
 */

import { readFileSync, writeFileSync } from 'fs';
import { pathToFileURL } from 'url';
import path from 'path';
import { ROOT_DIR, deriveModuleFacts } from './lib/derive-catalog.mjs';

const CATALOG_PATH = path.join(ROOT_DIR, 'data', 'catalog.js');
const checkOnly = process.argv.includes('--check');

/**
 * Aísla el cuerpo de `const NAME = { ... };` para no editar fuera de él.
 * El `export` es opcional: PROGRESS_RULES_BASE es un const interno del que
 * catalog.js deriva el export público.
 */
function blockOf(source, name) {
  const hit = source.match(new RegExp(`^(?:export )?const ${name} = \\{`, 'm'));
  if (!hit) return null;
  const open = source.indexOf('{', hit.index);
  const end = source.indexOf('\n};', open);
  if (end === -1) return null;
  return { from: open, to: end, text: source.slice(open, end) };
}

/**
 * Reemplaza `field: N` absorbiendo la diferencia de dígitos en el espaciado
 * siguiente, para que MODULE_DEPTH conserve sus columnas alineadas.
 */
function repad(line, field, value) {
  return line.replace(
    new RegExp(`(${field}:\\s*)(\\d+)(,?)( *)`),
    (_, head, oldValue, comma, pad) => {
      const width = Math.max(1, pad.length + oldValue.length - String(value).length);
      return `${head}${value}${comma}${' '.repeat(width)}`;
    },
  );
}

/** Localiza la línea de un módulo dentro de un bloque (clave con o sin comillas). */
function lineOf(blockText, id) {
  const escaped = id.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&');
  const re = new RegExp(`^[ \\t]*'?${escaped}'?\\s*:.*$`, 'm');
  const hit = blockText.match(re);
  return hit ? { text: hit[0], index: hit.index } : null;
}

const facts = await import(pathToFileURL(CATALOG_PATH).href).then(({ MODULES }) =>
  deriveModuleFacts(MODULES),
);

let source = readFileSync(CATALOG_PATH, 'utf8');
const changes = [];
const skipped = [];

// ─── MODULE_DEPTH: items / categories ──────────────────────────────────────
{
  const block = blockOf(source, 'MODULE_DEPTH');
  if (!block) throw new Error('No se encontró MODULE_DEPTH en catalog.js');
  let text = block.text;

  for (const [id, fact] of facts) {
    // los no derivables conservan items/categories a mano, pero `modes` sí se
    // calcula (sale del HTML, no del data file)
    if (!fact.derivable) skipped.push(`${id} — ${fact.reason} (items/cats a mano)`);

    const line = lineOf(text, id);
    if (!line) continue;

    const derivado = line.text.includes('vocabDepth('); // items/categories ya vienen en runtime
    const currentItems = Number(line.text.match(/items:\s*(\d+)/)?.[1]);
    const currentCats = Number(line.text.match(/categories:\s*(\d+)/)?.[1]);
    const currentModes = line.text.match(/modes:\s*(\d+)/)?.[1];

    const cambiaConteo = fact.derivable && !derivado
      && !Number.isNaN(currentItems) && !Number.isNaN(currentCats)
      && (currentItems !== fact.items || currentCats !== fact.categories);
    const cambiaModos = fact.modes != null && Number(currentModes) !== fact.modes;
    if (!cambiaConteo && !cambiaModos) continue;

    let updated = line.text;
    if (cambiaConteo) {
      updated = repad(repad(updated, 'items', fact.items), 'categories', fact.categories);
      changes.push(
        `MODULE_DEPTH[${id}]: ${currentItems} items/${currentCats} cats → ${fact.items} items/${fact.categories} cats`,
      );
    }
    if (cambiaModos) {
      updated = currentModes !== undefined
        ? repad(updated, 'modes', fact.modes)
        // se inserta antes de hasBattle para no romper el orden de la línea
        : updated.replace(/(\s*)hasBattle:/, `$1modes: ${fact.modes}, hasBattle:`);
      changes.push(`MODULE_DEPTH[${id}]: modes ${currentModes ?? '(heredado del engine)'} → ${fact.modes}`);
    }

    text = text.slice(0, line.index) + updated + text.slice(line.index + line.text.length);
  }
  source = source.slice(0, block.from) + text + source.slice(block.to);
}

// ─── PROGRESS_RULES_BASE: nombres de subcategorías ─────────────────────────
// Se parchea la tabla literal, no el export `PROGRESS_RULES`, que catalog.js
// deriva de ella con withStudyRequirement().
{
  const block = blockOf(source, 'PROGRESS_RULES_BASE');
  if (!block) throw new Error('No se encontró PROGRESS_RULES_BASE en catalog.js');
  let text = block.text;

  for (const [id, fact] of facts) {
    if (!fact.derivable) continue;

    const line = lineOf(text, id);
    if (!line) continue;
    // spellingScoreKeys/VOCABULARY_* generan sus claves con otra convención.
    if (!line.text.includes('scoreKeys(') || line.text.includes('spellingScoreKeys(')) continue;

    // Solo el array literal de categorías; el prefijo y los modos son convención del engine.
    const arrayMatch = line.text.match(/scoreKeys\(\s*'[^']+'\s*,\s*\[([^\]]*)\]/);
    if (!arrayMatch) continue;

    const current = [...arrayMatch[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
    if (current.length === fact.categoryKeys.length && current.every((k, i) => k === fact.categoryKeys[i])) continue;

    const rendered = fact.categoryKeys.map((k) => `'${k}'`).join(', ');
    const updated = line.text.replace(
      /(scoreKeys\(\s*'[^']+'\s*,\s*\[)[^\]]*(\])/,
      (_, head, tail) => `${head}${rendered}${tail}`,
    );

    text = text.slice(0, line.index) + updated + text.slice(line.index + line.text.length);
    changes.push(`PROGRESS_RULES[${id}]: [${current.join(', ')}] → [${fact.categoryKeys.join(', ')}]`);
  }
  source = source.slice(0, block.from) + text + source.slice(block.to);
}

// ─── Reporte ───────────────────────────────────────────────────────────────
console.log('='.repeat(60));
console.log('🔄 HubFlow — SYNC CATALOG');
console.log('='.repeat(60));

if (skipped.length) {
  console.log(`\nℹ️  No derivables (${skipped.length}) — se mantienen a mano:`);
  skipped.forEach((s) => console.log(`   ${s}`));
}

if (changes.length === 0) {
  console.log('\n✅ catalog.js ya está sincronizado con data/*.js');
  process.exit(0);
}

console.log(`\n${checkOnly ? '❌' : '✏️'}  Desincronizado (${changes.length}):`);
changes.forEach((c) => console.log(`   ${c}`));

if (checkOnly) {
  console.log('\n❌ catalog.js no coincide con data/*.js');
  console.log('   Corregir con: node scripts/sync-catalog.mjs');
  console.log('='.repeat(60));
  process.exit(1);
}

writeFileSync(CATALOG_PATH, source);
console.log('\n✅ catalog.js actualizado');
console.log('='.repeat(60));
