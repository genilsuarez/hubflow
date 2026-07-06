const { execSync } = require('child_process');
const globalRoot = execSync('npm root -g').toString().trim();
const { chromium } = require(globalRoot + '/playwright');
const path = require('path');

const BASE = 'http://localhost:3002';
const OUT = path.resolve(__dirname);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });

  // Root should show index.html, not directory listing
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT, 'qa-root.png') });
  const rootTitle = await page.title();
  console.log('Root:', rootTitle === 'HubFlow' ? '✅' : '❌', 'Title:', rootTitle);

  // Exercise page should load correctly
  await page.goto(BASE + '/exercises/ed-spelling.html', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT, 'qa-ed.png') });
  const edTitle = await page.title();
  const hasCards = await page.$('#cardGrid');
  console.log('Ed-spelling:', edTitle.includes('-ed') && hasCards ? '✅' : '❌', 'Title:', edTitle, 'Cards:', !!hasCards);

  // Navigate back
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 10000 }),
    page.click('a.back-link')
  ]);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(OUT, 'qa-back-home.png') });
  const homeUrl = page.url();
  console.log('Back home:', homeUrl.includes('index.html') ? '✅' : '❌', 'URL:', homeUrl);

  await browser.close();
  console.log('\nScreenshots saved in scripts/tmp/');
})();
