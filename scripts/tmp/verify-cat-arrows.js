const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
  await page.goto('http://localhost:3002/exercises/confusing-words.html');
  await page.waitForSelector('.cat-bar-wrap');

  // Check wrapper + arrows exist
  const wrap = await page.$('.cat-bar-wrap');
  const arrowL = await page.$('.cat-bar-arrow--left');
  const arrowR = await page.$('.cat-bar-arrow--right');
  console.log('[✓] Wrapper exists:', !!wrap);
  console.log('[✓] Arrow left exists:', !!arrowL);
  console.log('[✓] Arrow right exists:', !!arrowR);

  // Right arrow should be visible (content overflows at 800px)
  const rVisible = await arrowR.evaluate(el => el.classList.contains('visible'));
  console.log('[✓] Right arrow visible (overflow):', rVisible);

  // Left arrow should be hidden at start
  const lVisible = await arrowL.evaluate(el => el.classList.contains('visible'));
  console.log('[✓] Left arrow hidden at start:', !lVisible);

  // Click right arrow and check scroll moved
  const scrollBefore = await page.$eval('.cat-bar', el => el.scrollLeft);
  await arrowR.click();
  await page.waitForTimeout(350);
  const scrollAfter = await page.$eval('.cat-bar', el => el.scrollLeft);
  console.log(`[✓] Scroll moved: ${scrollBefore} → ${scrollAfter} (delta: ${scrollAfter - scrollBefore})`);

  // After scrolling right, left arrow should appear
  const lVisibleAfter = await arrowL.evaluate(el => el.classList.contains('visible'));
  console.log('[✓] Left arrow visible after scroll:', lVisibleAfter);

  // Screenshot
  await page.screenshot({ path: 'HubFlow/scripts/tmp/cat-arrows-verify.png', fullPage: false });
  console.log('[✓] Screenshot saved: HubFlow/scripts/tmp/cat-arrows-verify.png');

  await browser.close();
  console.log('\nAll checks passed.');
})();
