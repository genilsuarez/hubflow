const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await ctx.newPage();

  const exercises = [
    'plural-endings', 'word-formation', 'odd-one-out', 'vocabulary',
    'phrasal-verbs', 'tenses', 'listening', 'dictation-sprint',
    'prepositions', 'ing-spelling', 'opposites'
  ];

  for (const ex of exercises) {
    await page.goto(`http://localhost:3000/hubflow/exercises/${ex}.html`);
    await page.evaluate(() => localStorage.setItem('lp-navigation-mode', 'sidebar'));
    await page.reload();
    await page.waitForTimeout(1200);

    const w = await page.evaluate(() => {
      const wrap = document.querySelector('.wrap');
      return wrap ? wrap.offsetWidth : 0;
    });
    console.log(`${ex}: wrap=${w}px`);
  }

  await browser.close();
})();
