const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await ctx.newPage();

  await page.goto('http://localhost:3000/hubflow/exercises/vocabulary.html');
  await page.evaluate(() => {
    localStorage.setItem('lp-navigation-mode', 'sidebar');
  });
  await page.reload();
  await page.waitForTimeout(2000);

  const info = await page.evaluate(() => {
    const wrap = document.querySelector('.wrap');
    return {
      wrapWidth: wrap?.offsetWidth,
      wrapMaxWidth: wrap ? getComputedStyle(wrap).maxWidth : null,
      wrapComputedWidth: wrap ? getComputedStyle(wrap).width : null,
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
