#!/usr/bin/env node
// Normaliza el bloque de <script> compartidos y las 7 hojas de estilo base
// en las 150 páginas de exercises/, para que agregar/quitar un script o
// stylesheet compartido sea un cambio en un solo lugar en vez de a mano en
// 150 archivos. Ver docs/auditoria-y-plan.md — "templating HubFlow".
//
// Reemplazo QUIRÚRGICO, no reconstrucción del <head>: localiza el span
// exacto de las 9 <script src="../js/*.js"> y el span exacto de las 7
// <link rel="stylesheet" href="../css/BASE.css"> (verificado que son
// contiguos e idénticos en las 150 páginas antes de escribir este script) y
// reemplaza SOLO esos dos spans, byte a byte, con formato normalizado.
// Todo lo demás en el archivo — título, description, favicon, stylesheets
// extra del tipo de ejercicio, bloques <style> con CSS propio del ejercicio
// (26 páginas los tienen), y el <body> completo — queda sin tocar.
//
// Un primer intento de este script reconstruía el <head> entero desde una
// plantilla y BORRABA en silencio esos bloques <style> propios en 26
// páginas — se detectó en `git diff` antes de commitear, revertido, y
// reescrito con este enfoque de reemplazo puntual.
//
// Uso:
//   node scripts/generate-exercise-heads.mjs --check   # reporta drift, exit 1 si hay
//   node scripts/generate-exercise-heads.mjs            # aplica
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const EXERCISES_DIR = path.join(ROOT, 'exercises');
const CHECK_ONLY = process.argv.includes('--check');

const CANONICAL_SCRIPTS = [
  'lp-theme.js',
  'lp-input-zoom.js',
  'lp-nav-icons.js',
  'lp-platform-urls.js',
  'lp-guest-reset.js',
  'lp-login.js',
  'lp-nav-helpers.js',
  'lp-about-content.js',
  'lp-about.js',
];
const CANONICAL_BASE_STYLES = [
  'base.css',
  'components.css',
  'buttons.css',
  'exercise-enhanced.css',
  'sidebar.css',
  'lp-nav-active.css',
  'lp-about.css',
];

const CANONICAL_SCRIPT_BLOCK = CANONICAL_SCRIPTS.map((s) => `<script src="../js/${s}"></script>`).join('\n');
const CANONICAL_STYLE_BLOCK = CANONICAL_BASE_STYLES.map((s) => `<link rel="stylesheet" href="../css/${s}">`).join(
  '\n'
);

// Matchea el span completo desde el primer script canónico hasta el último,
// tolerando cualquier whitespace/indentación entre y dentro de las líneas —
// eso es justamente el drift que se quiere normalizar.
function spanRegex(files, tagBuilder) {
  const escaped = files.map((f) => tagBuilder(f).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return new RegExp(escaped.join('\\s*'), 's');
}

const SCRIPT_SPAN_RE = spanRegex(CANONICAL_SCRIPTS, (s) => `<script src="../js/${s}"></script>`);
const STYLE_SPAN_RE = spanRegex(CANONICAL_BASE_STYLES, (s) => `<link rel="stylesheet" href="../css/${s}">`);

async function processFile(file) {
  const filePath = path.join(EXERCISES_DIR, file);
  const html = await readFile(filePath, 'utf8');
  const head = html.slice(0, html.indexOf('<body>'));

  if (!SCRIPT_SPAN_RE.test(head)) throw new Error(`${file}: bloque de scripts compartidos no encontrado/no contiguo`);
  if (!STYLE_SPAN_RE.test(head)) throw new Error(`${file}: bloque de stylesheets base no encontrado/no contiguo`);

  let newHtml = html.replace(SCRIPT_SPAN_RE, CANONICAL_SCRIPT_BLOCK);
  newHtml = newHtml.replace(STYLE_SPAN_RE, CANONICAL_STYLE_BLOCK);

  if (newHtml === html) return 'unchanged';
  if (CHECK_ONLY) return 'drift';
  await writeFile(filePath, newHtml);
  return 'updated';
}

async function main() {
  const files = (await readdir(EXERCISES_DIR)).filter((f) => f.endsWith('.html'));
  const stats = { unchanged: 0, updated: 0, drift: 0 };
  const driftFiles = [];

  for (const file of files) {
    try {
      const result = await processFile(file);
      stats[result]++;
      if (result === 'drift') driftFiles.push(file);
    } catch (err) {
      console.error(`ERROR ${file}: ${err.message}`);
      process.exitCode = 1;
    }
  }

  console.log(
    `${files.length} páginas — ${stats.unchanged} sin cambio, ${stats.updated} actualizadas, ${stats.drift} con drift.`
  );
  if (driftFiles.length) {
    console.log('Con drift:', driftFiles.join(', '));
    process.exitCode = 1;
  }
}

main();
