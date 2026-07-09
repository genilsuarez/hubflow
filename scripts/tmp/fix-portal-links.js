// Fix: inject local-dev portal link rewrite into all HubFlow exercises
const fs = require('fs');
const path = require('path');

const exercisesDir = path.join(__dirname, '../../exercises');
const files = fs.readdirSync(exercisesDir).filter(f => f.endsWith('.html'));

const snippet = `
<script>
// Local dev: rewrite portal link to localhost
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  const pl = document.getElementById('portalLink');
  if (pl) pl.href = 'http://localhost:3000/';
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href*="localhost:"]');
    if (a) {
      const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const url = new URL(a.href);
      url.searchParams.set('theme', theme);
      a.href = url.toString();
    }
  });
}
</script>`;

let modified = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(exercisesDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Skip if already has the rewrite
  if (html.includes('rewrite portal link to localhost')) {
    skipped++;
    continue;
  }

  // Only inject if the file has a portalLink
  if (!html.includes('portalLink')) {
    skipped++;
    continue;
  }

  // Insert before </body>
  if (html.includes('</body>')) {
    html = html.replace('</body>', snippet + '\n</body>');
  } else {
    // No </body> tag — append before </html> or at end
    if (html.includes('</html>')) {
      html = html.replace('</html>', snippet + '\n</html>');
    } else {
      html += snippet;
    }
  }

  fs.writeFileSync(filePath, html, 'utf8');
  modified++;
  console.log(`  ✓ ${file}`);
}

console.log(`\nDone: ${modified} modified, ${skipped} skipped`);
