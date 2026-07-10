/**
 * Inject inline theme init script + critical styles into all HubFlow exercise pages.
 * Prevents flash of unstyled content when navigating with ?theme=dark.
 */
const fs = require('fs');
const path = require('path');

const exercisesDir = path.join(__dirname, '../../exercises');
const files = fs.readdirSync(exercisesDir).filter(f => f.endsWith('.html'));

const themeScript = `<script>var p=new URLSearchParams(location.search).get('theme'),t=p||localStorage.getItem('lp-theme');if(p)localStorage.setItem('lp-theme',p);if(t==='dark')document.documentElement.setAttribute('data-theme','dark')</script>`;
const criticalStyles = `<style>body{background:#FAF7F2;color:#2C2418}[data-theme="dark"] body{background:#1A1714;color:#EDE8E0}</style>`;
const injection = themeScript + '\n' + criticalStyles;

let modified = 0;

for (const file of files) {
  const filePath = path.join(exercisesDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Skip if already has the inline theme script
  if (html.includes('lp-theme')) {
    console.log(`SKIP (already has theme init): ${file}`);
    continue;
  }

  // Insert before the first <link rel="stylesheet"> in <head>
  const insertPoint = html.indexOf('<link rel="stylesheet"');
  if (insertPoint === -1) {
    console.log(`SKIP (no stylesheet link found): ${file}`);
    continue;
  }

  html = html.slice(0, insertPoint) + injection + '\n' + html.slice(insertPoint);
  fs.writeFileSync(filePath, html, 'utf8');
  modified++;
  console.log(`FIXED: ${file}`);
}

console.log(`\nDone. Modified ${modified}/${files.length} files.`);
