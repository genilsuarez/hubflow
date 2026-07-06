const { execSync } = require('child_process');
const globalModules = execSync('npm root -g').toString().trim();
const { chromium } = require(globalModules + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });

  // Light mode - ing exercise
  await page.goto('http://localhost:3002/exercises/ing-spelling.html');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scripts/tmp/exercise-ing-light.png', fullPage: true });

  // Dark mode
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'scripts/tmp/exercise-ing-dark.png', fullPage: true });

  // Noun adjuncts exercise
  await page.evaluate(() => document.documentElement.removeAttribute('data-theme'));
  await page.goto('http://localhost:3002/exercises/noun-adjuncts.html');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scripts/tmp/exercise-noun-light.png', fullPage: true });

  await browser.close();
  console.log('Screenshots saved');
})();
