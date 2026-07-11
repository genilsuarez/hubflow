/**
 * QA: Verify no flash/jump when navigating back to index with ?section=
 * Checks that the target section is visible immediately (no resumen flash).
 */
const npmRoot = require('child_process').execSync('npm root -g').toString().trim();
const { chromium } = require(npmRoot + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 667 } });
  const BASE = 'http://localhost:3002';
  const results = [];

  function log(pass, msg) {
    results.push({ pass, msg });
    console.log(`${pass ? '✅' : '❌'} ${msg}`);
  }

  // Test 1: Navigate from exercise, check no resumen flash
  // We'll check what's visible at DOMContentLoaded (before module script runs)
  await page.goto(`${BASE}/exercises/phrasal-verbs.html`);
  await page.waitForTimeout(300);

  const backLink = await page.$('a[href*="index.html"]');
  await backLink.click();
  await page.waitForLoadState('domcontentloaded');

  // At this point CSS should already be showing vocab, not resumen
  const resumenVisible = await page.$eval('.section[data-key="resumen"]', el => {
    return window.getComputedStyle(el).display;
  });
  log(resumenVisible === 'none', `Resumen display at DOMContentLoaded: "${resumenVisible}" (expected "none")`);

  // After full load, check correct section is active
  await page.waitForTimeout(600);
  const activeSection = await page.$eval('body', el => el.dataset.active);
  log(activeSection === 'vocab', `Final active section: "${activeSection}" (expected "vocab")`);

  // Test 2: data-init-section is cleaned up after JS runs
  const hasAttr = await page.$eval('html', el => el.hasAttribute('data-init-section'));
  log(!hasAttr, `data-init-section cleaned up: ${!hasAttr}`);

  // Test 3: Direct navigation to index (no params) — resumen shows normally
  await page.evaluate(() => sessionStorage.clear());
  await page.goto(BASE);
  await page.waitForLoadState('domcontentloaded');
  const resumenDirect = await page.$eval('.section[data-key="resumen"]', el => {
    return window.getComputedStyle(el).display;
  });
  log(resumenDirect === 'block', `Resumen visible on direct visit: "${resumenDirect}" (expected "block")`);

  // Test 4: Full flow — click back from grammar exercise
  await page.goto(`${BASE}/exercises/articles.html`);
  await page.waitForTimeout(300);
  const bl2 = await page.$('a[href*="index.html"]');
  await bl2.click();
  await page.waitForLoadState('domcontentloaded');
  const resumenGrammar = await page.$eval('.section[data-key="resumen"]', el => {
    return window.getComputedStyle(el).display;
  });
  const grammarVisible = await page.$eval('.section[data-key="grammar"]', el => {
    return window.getComputedStyle(el).display;
  });
  log(resumenGrammar === 'none', `Resumen hidden when coming from grammar: "${resumenGrammar}"`);
  log(grammarVisible === 'block', `Grammar visible immediately: "${grammarVisible}"`);

  // Test 5: Check analysis flow too
  await page.goto(`${BASE}/exercises/error-hunt.html`);
  await page.waitForTimeout(300);
  const bl3 = await page.$('a[href*="index.html"]');
  await bl3.click();
  await page.waitForLoadState('domcontentloaded');
  const analysisVisible = await page.$eval('.section[data-key="analysis"]', el => {
    return window.getComputedStyle(el).display;
  });
  log(analysisVisible === 'block', `Analysis visible immediately: "${analysisVisible}"`);

  // Test 6: Console errors
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(`${BASE}/exercises/phonics.html`);
  await page.waitForTimeout(200);
  const bl4 = await page.$('a[href*="index.html"]');
  await bl4.click();
  await page.waitForTimeout(600);
  log(errors.length === 0, `Console errors: ${errors.length}`);

  // Summary
  console.log('\n─── SUMMARY ───');
  const passed = results.filter(r => r.pass).length;
  console.log(`${passed}/${results.length} checks passed`);
  if (passed < results.length) {
    console.log('FAILED:');
    results.filter(r => !r.pass).forEach(r => console.log(`  - ${r.msg}`));
  }

  await browser.close();
  process.exit(passed === results.length ? 0 : 1);
})();
