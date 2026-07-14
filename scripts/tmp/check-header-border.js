const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  await page.goto('http://localhost:3002/exercises/ing-spelling.html');
  await page.waitForSelector('.card-grid');

  // Crop around top-bar bottom
  const topBarInfo = await page.evaluate(() => {
    const tb = document.querySelector('.top-bar');
    const r = tb.getBoundingClientRect();
    return { x: 0, y: r.y, width: 1024, height: r.height + 30 };
  });

  await page.screenshot({ 
    path: '/Users/gsuarez/Documents/Code/Learn/HubFlow/scripts/tmp/topbar-border.png', 
    clip: topBarInfo
  });
  console.log('Screenshot saved.');

  await browser.close();
})();
