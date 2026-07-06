const { execSync } = require('child_process');
const globalRoot = execSync('npm root -g').toString().trim();
const { chromium } = require(globalRoot + '/playwright');
const path = require('path');

const BASE = 'http://localhost:3002';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  const errors = [];
  const failedRequests = [];

  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('requestfailed', req => {
    failedRequests.push(`${req.method()} ${req.url()} - ${req.failure().errorText}`);
  });

  // Simulate what happens after SPA redirect: navigate from index by clicking
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // Click ed-spelling link
  await page.click('a[href="exercises/ed-spelling.html"]');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  const finalUrl = page.url();
  const html = await page.content();
  const title = await page.title();

  console.log('Final URL:', finalUrl);
  console.log('Title:', title);
  console.log('Console errors:', errors);
  console.log('Failed requests:', failedRequests);
  console.log('Has back-link:', html.includes('back-link'));
  console.log('Has card-grid:', html.includes('cardGrid'));

  // Check if CSS loaded by looking at body background
  const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  console.log('Body background:', bodyBg);

  await page.screenshot({ path: path.resolve(__dirname, 'debug-spa-nav.png') });
  console.log('\nScreenshot saved: debug-spa-nav.png');

  await browser.close();
})();
