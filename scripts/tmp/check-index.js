const GLOBAL_MODULES = require('child_process').execSync('npm root -g').toString().trim();
const { chromium } = require(GLOBAL_MODULES + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await page.goto('http://localhost:3002/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'scripts/tmp/hubflow-current.png', fullPage: true });
  console.log('Screenshot saved: scripts/tmp/hubflow-current.png');
  await browser.close();
})();
