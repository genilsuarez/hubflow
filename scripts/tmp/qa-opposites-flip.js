const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 420, height: 700 } });
  await page.goto('https://genilsuarez.github.io/hubflow/exercises/opposites.html');
  await page.waitForSelector('.fc-card');
  await page.waitForTimeout(500);

  // 1. Front of card
  await page.screenshot({ path: 'scripts/tmp/flip-1-front.png' });
  console.log('1. Front card captured');

  // 2. Press Enter to flip
  await page.keyboard.press('Enter');
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'scripts/tmp/flip-2-flipped.png' });
  console.log('2. Flipped card (back visible)');

  // 3. Press Enter to advance — critical test: should NOT flash answer
  await page.keyboard.press('Enter');
  await page.waitForTimeout(50);
  await page.screenshot({ path: 'scripts/tmp/flip-3-after-50ms.png' });
  console.log('3. 50ms after Enter from flipped');

  await page.waitForTimeout(100);
  await page.screenshot({ path: 'scripts/tmp/flip-4-after-150ms.png' });
  console.log('4. 150ms after Enter from flipped');

  await page.waitForTimeout(350);
  await page.screenshot({ path: 'scripts/tmp/flip-5-settled.png' });
  console.log('5. 500ms — should show front of next card');

  // 6. Flip again, then advance with ArrowRight
  await page.keyboard.press('Enter');
  await page.waitForTimeout(600);
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(50);
  await page.screenshot({ path: 'scripts/tmp/flip-6-arrow-50ms.png' });
  console.log('6. Arrow from flipped — 50ms');

  await page.waitForTimeout(450);
  await page.screenshot({ path: 'scripts/tmp/flip-7-arrow-settled.png' });
  console.log('7. Arrow settled — front of next card');

  await browser.close();
  console.log('\n✅ Done');
})();
