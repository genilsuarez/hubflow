const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  await page.goto('http://localhost:3000/hubflow/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // Click "Rutas guiadas" in sidebar
  await page.click('button[data-target="rutas"]');
  await page.waitForTimeout(600);

  await page.screenshot({ path: 'scripts/tmp/rutas-header.png', fullPage: false });
  console.log('Screenshot saved: scripts/tmp/rutas-header.png');
  await browser.close();
})();
