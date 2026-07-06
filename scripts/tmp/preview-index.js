const playwright = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await page.goto('file:///Users/gsuarez/Documents/Code/Learn/HubFlow/index.html');
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/Users/gsuarez/Documents/Code/Learn/HubFlow/scripts/tmp/hubflow-index-preview.png', fullPage: false });
  await browser.close();
  console.log('Done: hubflow-index-preview.png');
})();
