#!/usr/bin/env node
/**
 * analyze-content.mjs — Análisis de balance y duplicados en HubFlow/data/*.js
 *
 * HubFlow no tiene un esquema rígido de módulos como FluentFlow (sin conteos
 * mínimos, sin registro central) — este script hace un análisis de calidad más
 * libre: balance de secciones dentro de cada archivo, casi-duplicados dentro
 * de cada archivo, y duplicados cruzados entre archivos distintos.
 *
 * Uso: node scripts/analyze-content.mjs
 */
import { readdirSync } from 'fs';
import { pathToFileURL } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');

function norm(s) {
  if (typeof s !== 'string') return '';
  return s.toLowerCase().replace(/[.,!?;:"']/g, '').replace(/___+/g, 'X').replace(/\s+/g, ' ').trim();
}

/** Best-effort primary text extraction across HubFlow's varied item shapes. */
function primaryText(item) {
  if (!item || typeof item !== 'object') return '';
  return (
    item.sentence || item.text || item.prompt ||
    (item.word_a && item.word_b ? `${item.word_a}/${item.word_b}` : '') ||
    item.verb || item.term || item.base || item.root || ''
  );
}

/** Levenshtein-ish similarity via longest-common-subsequence ratio (dependency-free). */
function similarity(a, b) {
  if (!a || !b) return 0;
  if (a === b) return 1;
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  if (longer.length === 0) return 1;
  const editDistance = levenshtein(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

function flatten(mod) {
  const d = mod.default || mod.CATEGORIES || mod.VERBS || mod.PAIRS || mod.LEVELS;
  if (!d) return null;
  if (Array.isArray(d)) return { __flat__: d };
  const out = {};
  for (const [key, val] of Object.entries(d)) {
    const items = Array.isArray(val) ? val : val.items;
    if (Array.isArray(items)) out[key] = items;
  }
  return out;
}

async function main() {
  const files = readdirSync(DATA_DIR).filter((f) => f.endsWith('.js'));

  const balanceIssues = [];
  const withinFileDups = [];
  const crossFileIndex = new Map(); // normText -> [{file, cat, idx}]

  for (const file of files) {
    const mod = await import(pathToFileURL(path.join(DATA_DIR, file)).href);
    const cats = flatten(mod);
    if (!cats) continue;

    const catNames = Object.keys(cats);
    const sizes = catNames.map((c) => cats[c].length);

    if (catNames.length >= 3) {
      const max = Math.max(...sizes);
      const min = Math.min(...sizes);
      if (min > 0 && max / min >= 3) {
        balanceIssues.push({ file, breakdown: catNames.map((c, i) => `${c}:${sizes[i]}`).join(', '), ratio: (max / min).toFixed(1) });
      }
    }

    for (const cat of catNames) {
      const items = cats[cat];
      const texts = items.map((it) => norm(primaryText(it)));

      // within-file near-duplicates (same category)
      for (let i = 0; i < items.length; i++) {
        if (!texts[i]) continue;
        for (let j = i + 1; j < items.length; j++) {
          if (!texts[j]) continue;
          if (texts[i] === texts[j]) {
            withinFileDups.push({ file, cat, ratio: '1.00 (exact)', a: primaryText(items[i]), b: primaryText(items[j]) });
          } else if (texts[i].length > 8 && similarity(texts[i], texts[j]) > 0.88) {
            withinFileDups.push({ file, cat, ratio: similarity(texts[i], texts[j]).toFixed(2), a: primaryText(items[i]), b: primaryText(items[j]) });
          }
        }
      }

      // cross-file index
      items.forEach((it, idx) => {
        const key = texts[idx];
        if (!key || key.length < 4) return;
        if (!crossFileIndex.has(key)) crossFileIndex.set(key, []);
        crossFileIndex.get(key).push({ file, cat, text: primaryText(it) });
      });
    }
  }

  console.log('='.repeat(70));
  console.log('BALANCE — archivos con categorías muy desiguales (ratio >= 3x)');
  console.log('='.repeat(70));
  balanceIssues.sort((a, b) => b.ratio - a.ratio);
  for (const b of balanceIssues) {
    console.log(`\n${b.file}  (max/min = ${b.ratio}x)`);
    console.log(`  ${b.breakdown}`);
  }

  console.log('\n' + '='.repeat(70));
  console.log(`CASI-DUPLICADOS dentro del mismo archivo (${withinFileDups.length})`);
  console.log('='.repeat(70));
  for (const d of withinFileDups) {
    console.log(`\n${d.file} [${d.cat}]  similitud=${d.ratio}`);
    console.log(`  A: ${d.a}`);
    console.log(`  B: ${d.b}`);
  }

  console.log('\n' + '='.repeat(70));
  console.log('DUPLICADOS ENTRE ARCHIVOS distintos (mismo texto exacto normalizado)');
  console.log('='.repeat(70));
  let crossCount = 0;
  for (const [key, occurrences] of crossFileIndex.entries()) {
    const uniqueFiles = new Set(occurrences.map((o) => o.file));
    if (uniqueFiles.size > 1) {
      crossCount++;
      console.log(`\n"${occurrences[0].text}"`);
      for (const o of occurrences) console.log(`  - ${o.file} [${o.cat}]`);
    }
  }
  console.log(`\n(${crossCount} textos repetidos entre archivos distintos)`);
}

main();
