#!/usr/bin/env node
/**
 * CI guard — fail if HubFlow @media queries use non-canonical breakpoint values.
 * Canonical tiers defined in css/breakpoints.css (:root tokens + comment mapping).
 *
 * Vanilla apps ship CSS without PostCSS — @media (--lp-*) is invalid in browsers.
 *
 * Usage: node scripts/check-breakpoints.js
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('..', import.meta.url)));
const CSS_DIR = join(ROOT, 'css');

const SKIP_FILES = new Set(['css/breakpoints.css']);

const CANONICAL_WIDTH_PX = new Set([401, 639, 640, 767, 768, 860, 861, 1023, 1024]);

const FORBIDDEN_WIDTH_PX = new Set([
  170, 171, 310, 320, 330, 360, 374, 379, 390, 400, 419, 420, 460, 479, 480, 519, 520, 580,
  641, 719, 720, 759, 760, 769, 879, 880, 900, 1140, 1150, 1920,
]);

const OFF_BY_ONE = [
  { re: /max-width:\s*768px/, fix: 'max-width: 767px' },
  { re: /max-width:\s*640px/, fix: 'max-width: 639px' },
  { re: /min-width:\s*769px/, fix: 'min-width: 768px' },
  { re: /min-width:\s*641px/, fix: 'min-width: 640px' },
];

function walkCssFiles(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walkCssFiles(full, acc);
    else if (entry.endsWith('.css')) acc.push(full);
  }
  return acc;
}

function extractMediaPreambles(content) {
  const preambles = [];
  const re = /@media\s/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const start = m.index + m[0].length;
    if (content[start] !== '(') continue;
    let depth = 0;
    let i = start;
    for (; i < content.length; i++) {
      if (content[i] === '(') depth++;
      else if (content[i] === ')') {
        depth--;
        if (depth === 0) {
          preambles.push({ text: content.slice(start, i + 1), index: m.index });
          break;
        }
      }
    }
  }
  return preambles;
}

function lineOf(content, index) {
  return content.slice(0, index).split('\n').length;
}

function checkFile(filePath) {
  const rel = relative(ROOT, filePath);
  if (SKIP_FILES.has(rel)) return [];

  const content = readFileSync(filePath, 'utf8');
  const issues = [];

  for (const { text, index } of extractMediaPreambles(content)) {
    const line = lineOf(content, index);

    if (/--lp-[a-z0-9-]+/.test(text)) {
      issues.push({
        line,
        msg: 'PostCSS @custom-media tokens do not work in vanilla CSS — use literal @media from breakpoints.css mapping',
        text: `@media ${text}`,
      });
      continue;
    }

    if (/\b(max|min)-width:\s*\d+px/.test(text)) {
      const widthParts = text.match(/(max|min)-width:\s*\d+px/g) || [];
      for (const part of widthParts) {
        const px = Number(part.match(/\d+/)[0]);
        if (FORBIDDEN_WIDTH_PX.has(px)) {
          issues.push({
            line,
            msg: `Obsolete @media breakpoint ${px}px — use canonical tiers from breakpoints.css`,
            text: `@media ${text}`,
          });
        } else if (!CANONICAL_WIDTH_PX.has(px)) {
          issues.push({
            line,
            msg: `Non-canonical ${part} — allowed px values: ${[...CANONICAL_WIDTH_PX].sort((a, b) => a - b).join(', ')}`,
            text: `@media ${text}`,
          });
        }
      }
    }

    for (const { re, fix } of OFF_BY_ONE) {
      if (re.test(text)) {
        issues.push({
          line,
          msg: `Off-by-one in @media — use ${fix}`,
          text: `@media ${text}`,
        });
      }
    }
  }

  return issues.map(issue => ({ file: rel, ...issue }));
}

const allIssues = walkCssFiles(CSS_DIR).flatMap(checkFile);

if (allIssues.length === 0) {
  console.log('✅ Breakpoint check passed — all @media queries use canonical literal breakpoints.');
  process.exit(0);
}

console.error(`❌ Breakpoint check failed — ${allIssues.length} issue(s):\n`);
for (const { file, line, msg, text } of allIssues) {
  console.error(`  ${file}:${line}  ${msg}`);
  console.error(`    ${text}\n`);
}
process.exit(1);
