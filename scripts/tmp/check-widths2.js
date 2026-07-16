const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await ctx.newPage();

  // Set localStorage to simulate persistent sidebar mode
  await page.goto('http://localhost:3000/hubflow/exercises/plural-endings.html');
  await page.evaluate(() => {
    localStorage.setItem('lp-navigation-mode', 'sidebar');
  });
  await page.reload();
  await page.waitForTimeout(2000);

  const widths = await page.evaluate(() => {
    const wrap = document.querySelector('.wrap');
    const header = document.querySelector('.header');
    const pillBar = document.querySelector('.pill-bar');
    const progress = document.querySelector('.progress');
    const fcCard = document.querySelector('.fc-card');
    const sidebar = document.querySelector('.sidebar');
    const body = document.body;

    return {
      bodyPaddingLeft: getComputedStyle(body).paddingLeft,
      bodyWidth: body.offsetWidth,
      hasSidebar: body.classList.contains('has-sidebar'),
      sidebarWidth: sidebar ? sidebar.offsetWidth : null,
      wrap: wrap ? { computed: getComputedStyle(wrap).maxWidth, actual: wrap.offsetWidth } : null,
      header: header ? { actual: header.offsetWidth } : null,
      pillBar: pillBar ? { actual: pillBar.offsetWidth } : null,
      progress: progress ? { actual: progress.offsetWidth } : null,
      fcCard: fcCard ? { computed: getComputedStyle(fcCard).maxWidth, actual: fcCard.offsetWidth } : null,
      viewportWidth: window.innerWidth,
    };
  });

  console.log(JSON.stringify(widths, null, 2));

  await page.screenshot({ path: 'scripts/tmp/plural-with-sidebar.png', fullPage: false });
  console.log('Screenshot saved');

  await browser.close();
})();
