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

import { readdirSync, existsSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';

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
};

/**
 * Catálogo central (data/catalog.js, Fase 0 del plan de recategorización).
 * Valida integridad de rutas, unicidad de ids, y que los 34 ejercicios en
 * exercises/*.html tengan una entrada — sin huérfanos en ningún sentido.
 */
async function validateCatalog() {
  const catalogPath = path.join(DATA_DIR, 'catalog.js');
  if (!existsSync(catalogPath)) return;

  const { MODULES, TAGS, SUBCATEGORIES } = await import(pathToFileURL(catalogPath).href);
  const allTags = new Set([...TAGS.skill, ...TAGS.cefr, ...TAGS.mechanic, ...TAGS.theme]);

  const seenIds = new Set();
  for (const m of MODULES) {
    if (seenIds.has(m.id)) err('CAT-DUPID', `catalog.js: duplicate module id "${m.id}"`);
    seenIds.add(m.id);

    for (const [field, p] of [['exercise', m.exercise], ['guide', m.guide], ['dataFile', m.dataFile]]) {
      if (p && !existsSync(path.join(ROOT_DIR, p))) {
        err('CAT-PATH', `catalog.js[${m.id}].${field}: file not found "${p}"`);
      }
    }

    if (!Array.isArray(m.tags) || m.tags.length < 3 || m.tags.length > 6) {
      err('CAT-TAGCOUNT', `catalog.js[${m.id}]: expected 3-6 tags, got ${m.tags?.length ?? 0}`);
    }
    for (const t of m.tags || []) {
      if (!allTags.has(t)) err('CAT-TAG', `catalog.js[${m.id}]: tag "${t}" not in closed vocabulary`);
    }
    if (m.subcategory && !SUBCATEGORIES[m.subcategory]) {
      err('CAT-SUBCAT', `catalog.js[${m.id}]: unknown subcategory "${m.subcategory}"`);
    }
  }

  // Every exercises/*.html must have a catalog entry (no orphans in either direction).
  const exerciseFiles = readdirSync(EXERCISES_DIR).filter((f) => f.endsWith('.html'));
  const catalogedExercises = new Set(MODULES.map((m) => path.basename(m.exercise)));
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
