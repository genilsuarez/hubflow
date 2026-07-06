const { execSync } = require('child_process');
const globalModules = execSync('npm root -g').toString().trim();
const { chromium } = require(globalModules + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });

  // Light mode - ing exercise
  await page.goto('http://localhost:3002/exercises/ing-spelling.html');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'scripts/tmp/exercise-v2-ing-light.png', fullPage: true });

  // Dark mode
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'scripts/tmp/exercise-v2-ing-dark.png', fullPage: true });

  // Noun adjuncts light
  await page.evaluate(() => document.documentElement.removeAttribute('data-theme'));
  await page.goto('http://localhost:3002/exercises/noun-adjuncts.html');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'scripts/tmp/exercise-v2-noun-light.png', fullPage: true });

  await browser.close();
  console.log('V2 screenshots saved');
})();
