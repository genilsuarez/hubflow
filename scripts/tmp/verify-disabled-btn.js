const globalModules = require('child_process').execSync('npm root -g').toString().trim();
const { chromium } = require(globalModules + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });

  // --- vocabulary.html (has overflow → btn enabled) ---
  console.log('=== vocabulary.html (overflow = btn enabled) ===');
  await page.goto('http://localhost:3002/exercises/vocabulary.html');
  await page.waitForTimeout(600);
  const vocabDisabled = await page.$eval('#catExpandBtn', el => el.disabled);
  console.log(`  Expand btn disabled: ${vocabDisabled} ${!vocabDisabled ? '✓ (correct, has overflow)' : '✗ should be enabled'}`);

  // Now pick a category with few pills (e.g. Shopping & Retail = 4 pills)
  // Click a category that has few sub-categories
  const shoppingPill = await page.$('button.pill-btn[data-cat]');
  // Find one with few pills by checking text
  const pills = await page.$$eval('#catBar .pill-btn', els => els.map(e => ({ text: e.textContent.trim(), cat: e.dataset.cat })));
  const shopping = pills.find(p => p.text.includes('Shopping'));
  if (shopping) {
    console.log(`\n=== After selecting "${shopping.text}" (few pills) ===`);
    await page.click(`#catBar button[data-cat="${shopping.cat}"]`);
    await page.waitForTimeout(300);
    const afterDisabled = await page.$eval('#catExpandBtn', el => el.disabled);
    const afterOverflow = await page.$eval('#catBar', el => el.scrollWidth > el.clientWidth + 20);
    console.log(`  Has overflow: ${afterOverflow}`);
    console.log(`  Expand btn disabled: ${afterDisabled} ${afterDisabled && !afterOverflow ? '✓ (correct, no overflow)' : afterOverflow ? '✓ (has overflow, enabled)' : '✗'}`);
  }

  // --- opposites.html (only 2 cats → no overflow → btn disabled) ---
  console.log('\n=== opposites.html (2 cats = no overflow → btn disabled) ===');
  await page.goto('http://localhost:3002/exercises/opposites.html');
  await page.waitForTimeout(600);
  const oppDisabled = await page.$eval('#catExpandBtn', el => el.disabled);
  console.log(`  Expand btn disabled: ${oppDisabled} ${oppDisabled ? '✓ (correct, no overflow)' : '✗ should be disabled'}`);

  await page.screenshot({ path: 'HubFlow/scripts/tmp/disabled-btn-opp.png', fullPage: false });

  await browser.close();
  console.log('\n✅ Done');
})();
