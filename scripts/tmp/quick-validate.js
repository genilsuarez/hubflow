const { execSync } = require('child_process');
const globalRoot = execSync('npm root -g').toString().trim();
const { chromium } = require(globalRoot + '/playwright');
const path = require('path');

const BASE = 'http://localhost:3002';
const OUT = path.resolve(__dirname);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  const failed = [];
  const errors = [];

  page.on('requestfailed', req => {
    failed.push(`${req.url()} - ${req.failure().errorText}`);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  // 1. Direct load of ed-spelling
  await page.goto(BASE + '/exercises/ed-spelling.html', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(2000);
  const url1 = page.url();
  const title1 = await page.title();
  const hasBackLink = await page.$('a.back-link');
  const hasCardGrid = await page.$('#cardGrid');
  console.log('1. Direct load ed-spelling.html');
  console.log('   URL:', url1);
  console.log('   Title:', title1);
  console.log('   Back link:', !!hasBackLink);
  console.log('   Card grid:', !!hasCardGrid);
  await page.screenshot({ path: path.join(OUT, 'validate-ed-direct.png') });

  // 2. Click back link
  if (hasBackLink) {
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }),
      hasBackLink.click()
    ]);
    await page.waitForTimeout(1000);
    console.log('\n2. Clicked back link');
    console.log('   URL:', page.url());
    await page.screenshot({ path: path.join(OUT, 'validate-back.png') });
  }

  // 3. Click ed-spelling from index
  const edLink = await page.$('a[href="exercises/ed-spelling.html"]');
  if (edLink) {
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }),
      edLink.click()
    ]);
    await page.waitForTimeout(2000);
    const url3 = page.url();
    const title3 = await page.title();
    const hasBackLink3 = await page.$('a.back-link');
    const hasCardGrid3 = await page.$('#cardGrid');
    console.log('\n3. Nav from index → ed-spelling');
    console.log('   URL:', url3);
    console.log('   Title:', title3);
    console.log('   Back link:', !!hasBackLink3);
    console.log('   Card grid:', !!hasCardGrid3);
    await page.screenshot({ path: path.join(OUT, 'validate-ed-nav.png') });
  }

  // Summary
  console.log('\n── Summary ──');
  if (failed.length > 0) {
    console.log('❌ Failed requests:', failed);
  }
  if (errors.length > 0) {
    console.log('⚠️  Console errors:', errors);
  }
  if (failed.length === 0 && errors.length === 0) {
    console.log('✅ No failed requests, no console errors');
  }

  await browser.close();
})();
