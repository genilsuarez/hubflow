const { execSync } = require('child_process');
const globalRoot = execSync('npm root -g').toString().trim();
const { chromium } = require(globalRoot + '/playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  const filePath = path.resolve(__dirname, '../../index.html');
  await page.goto('file://' + filePath);
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.resolve(__dirname, 'index-improved.png'), fullPage: false });
  console.log('Screenshot saved: scripts/tmp/index-improved.png');
  await browser.close();
})();
