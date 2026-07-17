/**
 * Migrate legacy .btn classes to .lp-btn in HubFlow HTML and JS files.
 * Only targets standalone "btn" and "btn--*" class names in class attributes
 * and JS template literal strings. Does NOT touch compound classes like
 * pill-btn, cat-btn, listen-btn, play-btn, cat-expand-btn, etc.
 * Does NOT touch JS variable names like `btn`.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const ROOT = new URL('../../', import.meta.url).pathname;

// Only match btn/btn--* when preceded by " or space (class context) and followed
// by " or space or end-of-class-list. This avoids pill-btn, cat-btn, etc.
function migrateClasses(content) {
  // Replace class attribute values in HTML
  // Pattern: class="..." contents
  return content.replace(/class="([^"]*)"/g, (match, classes) => {
    const migrated = migrateClassList(classes);
    return `class="${migrated}"`;
  }).replace(/class=\\"([^"]*)\\"/g, (match, classes) => {
    // Template literals in JS with escaped quotes
    const migrated = migrateClassList(classes);
    return `class=\\"${migrated}\\"`;
  });
}

function migrateClassList(classes) {
  return classes
    .split(/\s+/)
    .map(cls => {
      switch (cls) {
        case 'btn': return 'lp-btn';
        case 'btn--primary': return 'lp-btn--primary';
        case 'btn--green': return 'lp-btn--success';
        case 'btn--red': return 'lp-btn--danger';
        case 'btn--purple': return 'lp-btn--purple';
        case 'btn--ghost': return 'lp-btn--ghost';
        case 'btn--blue': return 'lp-btn--primary';
        case 'btn--orange': return 'lp-btn--primary';
        case 'btn--next': return 'lp-btn--primary';
        case 'btn--sm': return ''; // remove, no equivalent
        default: return cls;
      }
    })
    .filter(Boolean)
    .join(' ');
}

// Process exercise HTML files
const exercisesDir = join(ROOT, 'exercises');
const htmlFiles = readdirSync(exercisesDir).filter(f => f.endsWith('.html'));
let htmlChanged = 0;

for (const file of htmlFiles) {
  const path = join(exercisesDir, file);
  const original = readFileSync(path, 'utf8');
  const migrated = migrateClasses(original);
  if (migrated !== original) {
    writeFileSync(path, migrated);
    htmlChanged++;
  }
}

// Process JS engine files — these use template literals with class="..."
const jsFiles = [
  'js/flashcard-engine.js',
  'js/spelling-engine.js',
  'js/sentence-quiz-engine.js',
  'js/typed-answer-engine.js',
  'js/utils.js',
];

let jsChanged = 0;
for (const rel of jsFiles) {
  const path = join(ROOT, rel);
  const original = readFileSync(path, 'utf8');
  const migrated = migrateClasses(original);
  if (migrated !== original) {
    writeFileSync(path, migrated);
    jsChanged++;
  }
}

// Process index.html
const indexPath = join(ROOT, 'index.html');
const indexOriginal = readFileSync(indexPath, 'utf8');
const indexMigrated = migrateClasses(indexOriginal);
if (indexMigrated !== indexOriginal) {
  writeFileSync(indexPath, indexMigrated);
  console.log('  index.html migrated');
}

console.log(`Done: ${htmlChanged} exercise HTML files + ${jsChanged} JS files migrated.`);
