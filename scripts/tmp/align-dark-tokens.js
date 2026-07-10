/**
 * Align inline dark mode variables in HubFlow guides with the design system tokens.
 * Replace the old blueish dark palette with the warm charcoal palette from base.css.
 */

const fs = require('fs');
const path = require('path');

const guidesDir = path.join(__dirname, '../../guides');
const files = fs.readdirSync(guidesDir).filter(f => f.endsWith('.html'));

// Old → New mappings (from base.css dark tokens)
const REPLACEMENTS = [
  // Core backgrounds/surfaces
  ['--bg:#1a1a2e', '--bg:#1A1714'],
  ['--text:#eaeaea', '--text:#EDE8E0'],
  ['--muted:#888', '--muted:#998E84'],
  ['--surface:#16213e', '--surface:#282420'],
  ['--border:#2a2a4e', '--border:#3D362C'],
  ['--ink-soft:#b0b8c4', '--ink-soft:#B5ADA2'],
  // Semantic light backgrounds (dark mode versions)
  ['--red-light:#4a2020', '--red-light:#3D1A1A'],
  ['--blue-light:#1a2d4a', '--blue-light:#1A2A3D'],
  ['--green-light:#1a3d2a', '--green-light:#1A2D20'],
  ['--yellow-light:#3d3510', '--yellow-light:#2D2510'],
  ['--purple-light:#2a1a3d', '--purple-light:#221A30'],
  ['--orange-light:#3d2a10', '--orange-light:#2D2510'],
  ['--teal-light:#1a3d3a', '--teal-light:#1A2D2D'],
];

let patchedCount = 0;

for (const file of files) {
  const filePath = path.join(guidesDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  for (const [oldVal, newVal] of REPLACEMENTS) {
    if (html.includes(oldVal)) {
      html = html.replace(oldVal, newVal);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    patchedCount++;
  }
}

console.log(`Aligned dark tokens in ${patchedCount} guides.`);
