const { execSync } = require('child_process');
const globalRoot = execSync('npm root -g').toString().trim();
const { chromium } = require(globalRoot + '/playwright');
const path = require('path');

const BASE = 'http://localhost:3002';
const SCREENSHOTS_DIR = path.resolve(__dirname);

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const results = [];

  async function validatePage(url, name) {
    const page = await context.newPage();
    const errors = [];
    const failedRequests = [];

    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('requestfailed', req => {
      failedRequests.push(`${req.method()} ${req.url()} - ${req.failure().errorText}`);
    });

    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
      const status = response.status();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `local-${name}.png`) });

      results.push({
        name,
        url,
        status,
        errors: errors.length > 0 ? errors : null,
        failedRequests: failedRequests.length > 0 ? failedRequests : null,
        ok: status === 200 && failedRequests.length === 0
      });
    } catch (e) {
      results.push({ name, url, error: e.message, ok: false });
    }
    await page.close();
  }

  await validatePage(`${BASE}/`, 'index');
  await validatePage(`${BASE}/exercises/ing-spelling.html`, 'ing-spelling');
  await validatePage(`${BASE}/exercises/ed-spelling.html`, 'ed-spelling');
  await validatePage(`${BASE}/exercises/noun-adjuncts.html`, 'noun-adjuncts');
  await validatePage(`${BASE}/exercises/vocabulary.html`, 'vocabulary');
  await validatePage(`${BASE}/exercises/opposites.html`, 'opposites');

  // Navigation test: index → ed-spelling → back
  const navPage = await context.newPage();
  const navErrors = [];
  const navFailed = [];
  navPage.on('console', msg => { if (msg.type() === 'error') navErrors.push(msg.text()); });
  navPage.on('requestfailed', req => { navFailed.push(`${req.method()} ${req.url()}`); });

  await navPage.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 10000 });
  await navPage.waitForTimeout(1000);
  await navPage.click('a[href="exercises/ed-spelling.html"]');
  await navPage.waitForLoadState('domcontentloaded');
  await navPage.waitForTimeout(1500);
  const navUrl = navPage.url();
  await navPage.screenshot({ path: path.join(SCREENSHOTS_DIR, `local-nav-ed.png`) });

  results.push({
    name: 'nav: index → ed-spelling',
    url: navUrl,
    errors: navErrors.length > 0 ? navErrors : null,
    failedRequests: navFailed.length > 0 ? navFailed : null,
    ok: navUrl.includes('ed-spelling') && navFailed.length === 0
  });

  // Back link
  const backLink = await navPage.$('a.back-link');
  if (backLink) {
    await backLink.click();
    await navPage.waitForLoadState('domcontentloaded');
    await navPage.waitForTimeout(1000);
    const backUrl = navPage.url();
    await navPage.screenshot({ path: path.join(SCREENSHOTS_DIR, `local-nav-back.png`) });
    results.push({
      name: 'nav: ed-spelling → home',
      url: backUrl,
      ok: backUrl === `${BASE}/` || backUrl === `${BASE}/index.html`
    });
  } else {
    results.push({ name: 'nav: ed-spelling → home', error: 'back-link not found', ok: false });
  }

  await navPage.close();
  await browser.close();

  // Print
  console.log('\n══════════════════════════════════════');
  console.log('  HubFlow Local Server Validation');
  console.log('══════════════════════════════════════\n');

  let allOk = true;
  for (const r of results) {
    const icon = r.ok ? '✅' : '❌';
    console.log(`${icon} ${r.name}`);
    console.log(`   URL: ${r.url}`);
    if (r.status) console.log(`   Status: ${r.status}`);
    if (r.errors) console.log(`   Errors: ${JSON.stringify(r.errors)}`);
    if (r.failedRequests) console.log(`   Failed: ${JSON.stringify(r.failedRequests)}`);
    if (r.error) console.log(`   Error: ${r.error}`);
    if (!r.ok) allOk = false;
    console.log('');
  }

  console.log('══════════════════════════════════════');
  console.log(allOk ? '  ✅ ALL TESTS PASSED' : '  ❌ SOME TESTS FAILED');
  console.log('══════════════════════════════════════\n');

  process.exit(allOk ? 0 : 1);
})();
