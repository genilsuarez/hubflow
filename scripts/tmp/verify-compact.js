const globalModules = require('child_process').execSync('npm root -g').toString().trim();
const { chromium } = require(globalModules + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });

  await page.goto('http://localhost:3002/exercises/sentence-combining.html');
  await page.waitForTimeout(800);

  // Check if page needs scroll
  const bodyH = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewH = await page.evaluate(() => window.innerHeight);
  const needsScroll = bodyH > viewH;

  console.log(`Viewport: 1024x768`);
  console.log(`Body height: ${bodyH}px`);
  console.log(`Needs scroll: ${needsScroll} ${!needsScroll ? '✓ fits!' : '✗ still scrolls'}`);

  // Also check at mobile size
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  const mBodyH = await page.evaluate(() => document.documentElement.scrollHeight);
  const mViewH = await page.evaluate(() => window.innerHeight);
  console.log(`\nMobile 390x844`);
  console.log(`Body height: ${mBodyH}px`);
  console.log(`Needs scroll: ${mBodyH > mViewH} ${mBodyH <= mViewH ? '✓ fits!' : '(acceptable on mobile)'}`);

  await page.screenshot({ path: 'HubFlow/scripts/tmp/compact-sc.png', fullPage: false });

  await browser.close();
  console.log('\n✅ Done');
})();
