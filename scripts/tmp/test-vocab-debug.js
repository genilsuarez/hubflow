const { chromium, devices } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const iPhone = devices['iPhone 13'];
  const context = await browser.newContext({ ...iPhone });
  const page = await context.newPage();

  await page.goto('http://localhost:3002/exercises/vocabulary.html');
  await page.waitForTimeout(2000);

  // Find which children of .wrap are wider than viewport
  const widths = await page.evaluate(() => {
    const wrap = document.querySelector('.wrap');
    const results = [];
    for (const child of wrap.children) {
      const w = child.scrollWidth;
      if (w > 390) {
        results.push({
          tag: child.tagName,
          class: child.className,
          id: child.id,
          scrollWidth: w,
          offsetWidth: child.offsetWidth,
          children: Array.from(child.children).map(c => ({
            tag: c.tagName,
            class: c.className,
            id: c.id,
            scrollWidth: c.scrollWidth,
            offsetWidth: c.offsetWidth,
          }))
        });
      }
    }
    return results;
  });

  console.log('Wide elements in .wrap:');
  console.log(JSON.stringify(widths, null, 2));

  await browser.close();
})();
