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
 * Catálogo central (data/catalog.js, Fase 0 del plan de recategorización).
 * Valida integridad de rutas, unicidad de ids, y que los 34 ejercicios en
 * exercises/*.html tengan una entrada — sin huérfanos en ningún sentido.
 */
async function validateCatalog() {
  const catalogPath = path.join(DATA_DIR, 'catalog.js');
  if (!existsSync(catalogPath)) return;

  const { MODULES, TAGS, SUBCATEGORIES, PROGRESS_RULES, HUBFLOW_PASS_SCORE_PCT } = await import(pathToFileURL(catalogPath).href);
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
    if (m.subcategory && !SUBCATEGORIES[m.subcategory]) {
      err('CAT-SUBCAT', `catalog.js[${m.id}]: unknown subcategory "${m.subcategory}"`);
    }
  }

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

  const emittedScoreKeys = new Set();
  const exercisePaths = new Set(MODULES.filter((m) => !m.wip).map((module) => module.exercise.split('#')[0]));
  for (const exercisePath of exercisePaths) {
    const html = readFileSync(path.join(ROOT_DIR, exercisePath), 'utf8');
    const dataImport = html.match(/import\s+\{[^}]*\b(?:CATEGORIES|LEVELS)\b[^}]*\}\s+from\s+['"]\.\.\/data\/([^'"]+)['"]/);
    let categoryKeys = [];
    if (dataImport) {
      const dataModule = await import(pathToFileURL(path.join(DATA_DIR, dataImport[1])).href);
      categoryKeys = Object.keys(dataModule.CATEGORIES || dataModule.LEVELS || {});
    }
    if (categoryKeys.length === 0) {
      categoryKeys = [...html.matchAll(/data-cat=["']([^"']+)["']/g)].map((match) => match[1]);
    }

    for (const match of html.matchAll(/recordScore\(\s*`([^`]*\$\{currentCat\}[^`]*)`/g)) {
      categoryKeys.forEach((category) => emittedScoreKeys.add(match[1].replace('${currentCat}', category)));
    }

    const scorePrefix = html.match(/scoreKeyPrefix:\s*['"]([^'"]+)['"]/)?.[1];
    if (scorePrefix) categoryKeys.forEach((category) => emittedScoreKeys.add(`${scorePrefix}-${category}`));

    const storagePrefix = html.match(/storagePrefix:\s*['"]([^'"]+)['"]/)?.[1];
    if (storagePrefix && html.includes('SpellingEngine')) {
      const modes = [...html.matchAll(/data-mode=["']([^"']+)["']/g)].map((match) => match[1]);
      categoryKeys.forEach((category) => modes.forEach((mode) => emittedScoreKeys.add(`${storagePrefix}-${category}-${mode}`)));
    } else if (storagePrefix && html.includes('FlashcardEngine')) {
      categoryKeys.forEach((category) => emittedScoreKeys.add(`${storagePrefix}-${category}-quiz`));
    }
  }

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
