/**
 * QA: Verify back button preserves category section navigation
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

  // Test 1: Phrasal verbs (vocab) — back link rewritten
  await page.goto(`${BASE}/exercises/phrasal-verbs.html`);
  await page.waitForTimeout(300);
  const backLink1 = await page.$('a[href*="index.html"]');
  const href1 = await backLink1.getAttribute('href');
  log(href1.includes('section=vocab'), `Phrasal Verbs back link → ${href1}`);

  // Test 2: Click back, index opens on vocab
  await backLink1.click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(600);
  const activeSection1 = await page.$eval('body', el => el.dataset.active);
  log(activeSection1 === 'vocab', `After back from Phrasal Verbs → section: "${activeSection1}" (expected "vocab")`);

  // Test 3: Error Hunt (analysis) — back link rewritten
  await page.goto(`${BASE}/exercises/error-hunt.html`);
  await page.waitForTimeout(300);
  const backLink2 = await page.$('a[href*="index.html"]');
  const href2 = await backLink2.getAttribute('href');
  log(href2.includes('section=analysis'), `Error Hunt back link → ${href2}`);

  // Test 4: Click back, index opens on analysis
  await backLink2.click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(600);
  const activeSection2 = await page.$eval('body', el => el.dataset.active);
  log(activeSection2 === 'analysis', `After back from Error Hunt → section: "${activeSection2}" (expected "analysis")`);

  // Test 5: Phonics (pronunciation)
  await page.goto(`${BASE}/exercises/phonics.html`);
  await page.waitForTimeout(300);
  const backLink3 = await page.$('a[href*="index.html"]');
  const href3 = await backLink3.getAttribute('href');
  log(href3.includes('section=pronunciation'), `Phonics back link → ${href3}`);

  await backLink3.click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(600);
  const activeSection3 = await page.$eval('body', el => el.dataset.active);
  log(activeSection3 === 'pronunciation', `After back from Phonics → section: "${activeSection3}" (expected "pronunciation")`);

  // Test 6: Articles (grammar)
  await page.goto(`${BASE}/exercises/articles.html`);
  await page.waitForTimeout(300);
  const backLink4 = await page.$('a[href*="index.html"]');
  const href4 = await backLink4.getAttribute('href');
  log(href4.includes('section=grammar'), `Articles back link → ${href4}`);

  await backLink4.click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(600);
  const activeSection4 = await page.$eval('body', el => el.dataset.active);
  log(activeSection4 === 'grammar', `After back from Articles → section: "${activeSection4}" (expected "grammar")`);

  // Test 7: Sentence Combining (analysis, previously missing portal-link.js)
  await page.goto(`${BASE}/exercises/sentence-combining.html`);
  await page.waitForTimeout(300);
  const backLink5 = await page.$('a[href*="index.html"]');
  const href5 = await backLink5.getAttribute('href');
  log(href5.includes('section=analysis'), `Sentence Combining back link → ${href5}`);

  await backLink5.click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(600);
  const activeSection5 = await page.$eval('body', el => el.dataset.active);
  log(activeSection5 === 'analysis', `After back from Sentence Combining → section: "${activeSection5}" (expected "analysis")`);

  // Test 8: Index without any state defaults to resumen
  await page.evaluate(() => sessionStorage.clear());
  await page.goto(BASE);
  await page.waitForTimeout(500);
  const defaultSection = await page.$eval('body', el => el.dataset.active);
  log(defaultSection === 'resumen', `Index without state → section: "${defaultSection}" (expected "resumen")`);

  // Test 9: sessionStorage is consumed (one-shot, not sticky)
  await page.goto(`${BASE}/exercises/phrasal-verbs.html`);
  await page.waitForTimeout(300);
  const bl = await page.$('a[href*="index.html"]');
  await bl.click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(400);
  const ssAfter = await page.evaluate(() => sessionStorage.getItem('hf-back-section'));
  log(ssAfter === null, `sessionStorage cleared after use (value: ${ssAfter})`);

  // Test 10: Console errors check
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(`${BASE}/exercises/phrasal-verbs.html`);
  await page.waitForTimeout(300);
  await page.goto(BASE);
  await page.waitForTimeout(300);
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
