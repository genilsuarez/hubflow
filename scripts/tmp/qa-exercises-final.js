const path = require('path');
const globalModules = require('child_process').execSync('npm root -g').toString().trim();
const { chromium } = require(path.join(globalModules, 'playwright'));

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  const baseUrl = 'http://localhost:3002';
  const exercises = [
    { name: 'ing-spelling', path: '/exercises/ing-spelling.html' },
    { name: 'noun-adjuncts', path: '/exercises/noun-adjuncts.html' },
    { name: 'vocabulary', path: '/exercises/vocabulary.html' }
  ];

  for (const ex of exercises) {
    await page.goto(`${baseUrl}${ex.path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `scripts/tmp/qa-${ex.name}-light.png`, fullPage: true });

    // Dark mode
    const toggle = await page.$('.theme-toggle');
    if (toggle) await toggle.click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `scripts/tmp/qa-${ex.name}-dark.png`, fullPage: true });

    // Reset to light
    const toggle2 = await page.$('.theme-toggle');
    if (toggle2) await toggle2.click();
    await page.waitForTimeout(200);
  }

  console.log('QA screenshots taken for all exercises (light + dark)');
  await browser.close();
})();
