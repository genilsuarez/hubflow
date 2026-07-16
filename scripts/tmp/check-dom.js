const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await ctx.newPage();

  await page.goto('http://localhost:3000/hubflow/exercises/plural-endings.html');
  await page.evaluate(() => {
    localStorage.setItem('lp-navigation-mode', 'sidebar');
  });
  await page.reload();
  await page.waitForTimeout(2000);

  // Get the DOM structure around .wrap to understand what's constraining it
  const info = await page.evaluate(() => {
    const wrap = document.querySelector('.wrap');
    const bodyChildren = [...document.body.children].map(el => ({
      tag: el.tagName,
      cls: el.className,
      id: el.id,
      width: el.offsetWidth,
      display: getComputedStyle(el).display,
      position: getComputedStyle(el).position,
    }));

    // Check body styles
    const bodyStyle = getComputedStyle(document.body);

    return {
      bodyDisplay: bodyStyle.display,
      bodyFlexDirection: bodyStyle.flexDirection,
      bodyPaddingLeft: bodyStyle.paddingLeft,
      bodyAvailableWidth: document.body.clientWidth,
      bodyChildren,
      wrapParent: wrap?.parentElement?.tagName + '.' + wrap?.parentElement?.className,
      wrapComputedWidth: wrap ? getComputedStyle(wrap).width : null,
      wrapMaxWidth: wrap ? getComputedStyle(wrap).maxWidth : null,
      wrapMargin: wrap ? getComputedStyle(wrap).margin : null,
      wrapFlex: wrap ? getComputedStyle(wrap).flex : null,
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
