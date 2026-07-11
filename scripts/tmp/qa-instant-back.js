/**
 * QA: Verify back button uses history.back() for instant nav and falls back correctly
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

  // Flow 1: Navigate index → exercise → back (should use history.back)
  await page.goto(BASE);
  await page.waitForTimeout(500);

  // Click into vocab section first
  await page.evaluate(() => {
    document.querySelector('[data-target="vocab"]').click();
  });
  await page.waitForTimeout(200);

  // Click phrasal verbs exercise link
  const exLink = await page.$('a[href="exercises/phrasal-verbs.html"]');
  if (exLink) {
    await exLink.click();
  } else {
    await page.goto(`${BASE}/exercises/phrasal-verbs.html`);
  }
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(500);

  // Measure back navigation time
  const startTime = Date.now();
  const backBtn = await page.$('a[href*="index.html"]');
  await backBtn.click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(100);
  const elapsed = Date.now() - startTime;
  
  const activeSection = await page.$eval('body', el => el.dataset.active);
  log(activeSection === 'vocab', `Section after back: "${activeSection}" (expected "vocab")`);
  log(elapsed < 1000, `Back navigation took ${elapsed}ms (should be < 1000ms for instant feel)`);

  // Flow 2: Direct visit to exercise (no referrer from index) — fallback works
  const page2 = await browser.newPage({ viewport: { width: 375, height: 667 } });
  await page2.goto(`${BASE}/exercises/error-hunt.html`);
  await page2.waitForTimeout(500);
  const backBtn2 = await page2.$('a[href*="index.html"]');
  const href2 = await backBtn2.getAttribute('href');
  log(href2.includes('section=analysis'), `Direct visit fallback href: ${href2}`);
  
  await backBtn2.click();
  await page2.waitForLoadState('domcontentloaded');
  await page2.waitForTimeout(600);
  const activeSection2 = await page2.$eval('body', el => el.dataset.active);
  log(activeSection2 === 'analysis', `Fallback navigation → section: "${activeSection2}" (expected "analysis")`);

  // Flow 3: No console errors in entire flow
  const errors = [];
  const page3 = await browser.newPage({ viewport: { width: 375, height: 667 } });
  page3.on('pageerror', e => errors.push(e.message));
  await page3.goto(BASE);
  await page3.waitForTimeout(300);
  await page3.goto(`${BASE}/exercises/articles.html`);
  await page3.waitForTimeout(300);
  const bl3 = await page3.$('a[href*="index.html"]');
  await bl3.click();
  await page3.waitForTimeout(500);
  log(errors.length === 0, `Console errors: ${errors.length}${errors.length ? ' — ' + errors[0] : ''}`);

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
