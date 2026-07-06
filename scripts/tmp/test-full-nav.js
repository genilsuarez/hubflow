const ROOT = require('child_process').execSync('npm root -g').toString().trim();
const { chromium } = require(ROOT + '/playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3457;
const BASE = path.resolve(__dirname, '../..');

// Simple static server
function createServer() {
  return http.createServer((req, res) => {
    let url = req.url.split('?')[0];
    if (url === '/') url = '/index.html';
    const filePath = path.join(BASE, url);
    const ext = path.extname(filePath);
    const mimeTypes = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml' };
    try {
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
      res.end(content);
    } catch (e) {
      res.writeHead(404);
      res.end('Not found: ' + url);
    }
  });
}

(async () => {
  const server = createServer();
  server.listen(PORT);
  console.log('Server on port', PORT);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });

  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

  // 1. Load index
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
  console.log('Index loaded. Title:', await page.title());

  // 2. Click first book card (-ing)
  await page.click('.book');
  await page.waitForLoadState('networkidle');
  console.log('Navigated to:', page.url());
  console.log('Exercise title:', await page.title());

  // Check if cardGrid has children (exercise loaded)
  const cardCount = await page.locator('#cardGrid .word-card').count();
  console.log('Cards rendered:', cardCount);

  await page.screenshot({ path: path.join(__dirname, 'nav-exercise.png'), fullPage: true });

  // 3. Click mode buttons
  const modeButtons = await page.locator('[data-mode]').all();
  console.log('Mode buttons found:', modeButtons.length);
  for (const btn of modeButtons) {
    const mode = await btn.getAttribute('data-mode');
    await btn.click();
    await page.waitForTimeout(300);
    const cardsAfter = await page.locator('#cardGrid .word-card').count();
    console.log(`  Mode "${mode}" clicked — cards: ${cardsAfter}`);
  }

  // 4. Click level buttons
  const levelButtons = await page.locator('[data-level]').all();
  console.log('Level buttons found:', levelButtons.length);
  for (const btn of levelButtons) {
    const level = await btn.getAttribute('data-level');
    const isLocked = await btn.evaluate(el => el.classList.contains('locked'));
    if (isLocked) { console.log(`  Level "${level}" — LOCKED, skipping`); continue; }
    await btn.click();
    await page.waitForTimeout(300);
    const cardsAfter = await page.locator('#cardGrid .word-card').count();
    console.log(`  Level "${level}" clicked — cards: ${cardsAfter}`);
  }

  await page.screenshot({ path: path.join(__dirname, 'nav-after-clicks.png'), fullPage: true });

  // 5. Click back link
  await page.click('.back-link');
  await page.waitForLoadState('networkidle');
  console.log('Back to:', page.url());
  const indexTitle = await page.title();
  console.log('Back at index:', indexTitle);

  await page.screenshot({ path: path.join(__dirname, 'nav-back-index.png'), fullPage: true });

  // 6. Try vocabulary module (different engine)
  await page.click('.book.b-vocab');
  await page.waitForLoadState('networkidle');
  console.log('Vocab page:', page.url(), '- title:', await page.title());
  await page.screenshot({ path: path.join(__dirname, 'nav-vocab.png'), fullPage: true });

  // 7. Check all errors
  if (errors.length) {
    console.log('\n⚠️ ERRORS DETECTED:');
    errors.forEach(e => console.log(' ', e));
  } else {
    console.log('\n✅ No JS errors detected');
  }

  await browser.close();
  server.close();
})();
