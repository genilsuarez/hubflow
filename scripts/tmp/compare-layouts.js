const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 768 } });

  // Screenshot plural-endings
  const page1 = await ctx.newPage();
  await page1.goto('http://localhost:3000/hubflow/exercises/plural-endings.html');
  await page1.waitForTimeout(1500);
  await page1.screenshot({ path: 'scripts/tmp/plural-endings-layout.png', fullPage: true });
  console.log('plural-endings screenshot saved');

  // Screenshot vocabulary in Match mode
  const page2 = await ctx.newPage();
  await page2.goto('http://localhost:3000/hubflow/exercises/vocabulary.html');
  await page2.waitForTimeout(1500);
  // Click "Match" mode pill
  await page2.click('button[data-mode="match"]');
  await page2.waitForTimeout(800);
  await page2.screenshot({ path: 'scripts/tmp/vocabulary-match-layout.png', fullPage: true });
  console.log('vocabulary match screenshot saved');

  await browser.close();
})();
