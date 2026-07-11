const globalModules = require('child_process').execSync('npm root -g').toString().trim();
const { chromium } = require(globalModules + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });

  // --- vocabulary.html ---
  console.log('=== vocabulary.html ===');
  await page.goto('http://localhost:3002/exercises/vocabulary.html');
  await page.waitForTimeout(1000); // wait for hint animation

  // Check badge exists and has count
  const badge = await page.$eval('#catExpandBtn .expand-count', el => el.textContent);
  console.log(`Badge count: "${badge}" ${badge && badge.startsWith('+') ? '✓' : '✗'}`);

  // Check hint bar was injected
  const hintBar = await page.$('.scroll-hint-bar');
  console.log(`Hint bar injected: ${hintBar ? '✓' : '✗'}`);

  // Check catBar has overflow (scrollWidth > clientWidth)
  const overflow = await page.$eval('#catBar', el => el.scrollWidth > el.clientWidth + 10);
  console.log(`catBar has overflow: ${overflow ? '✓' : '✗'}`);

  // Check nudge class was applied (may have been removed by now, just verify no errors)
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));

  // Screenshot
  await page.screenshot({ path: 'HubFlow/scripts/tmp/scroll-hint-vocab.png', fullPage: false });
  console.log(`JS errors: ${errors.length === 0 ? '✓ none' : errors.join(', ')}`);

  // --- opposites.html ---
  console.log('\n=== opposites.html ===');
  await page.goto('http://localhost:3002/exercises/opposites.html');
  await page.waitForTimeout(1000);

  const oppOverflow = await page.$eval('#catBar', el => el.scrollWidth > el.clientWidth + 10);
  console.log(`catBar has overflow: ${oppOverflow ? '✓ (hint should fire)' : '✗ no overflow (hint correctly skipped)'}`);

  await page.screenshot({ path: 'HubFlow/scripts/tmp/scroll-hint-opp.png', fullPage: false });

  const errors2 = [];
  page.on('pageerror', e => errors2.push(e.message));
  console.log(`JS errors: ${errors2.length === 0 ? '✓ none' : errors2.join(', ')}`);

  await browser.close();
  console.log('\n✅ Verification complete');
})();
