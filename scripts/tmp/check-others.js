const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await ctx.newPage();

  const exercises = ['word-formation', 'odd-one-out', 'phrasal-verbs', 'tenses', 'vocabulary'];

  for (const ex of exercises) {
    await page.goto(`http://localhost:3000/hubflow/exercises/${ex}.html`);
    await page.evaluate(() => localStorage.setItem('lp-navigation-mode', 'sidebar'));
    await page.reload();
    await page.waitForTimeout(1500);

    const w = await page.evaluate(() => {
      const wrap = document.querySelector('.wrap');
      return wrap ? wrap.offsetWidth : 0;
    });
    console.log(`${ex}: wrap=${w}px`);
  }

  await browser.close();
})();
