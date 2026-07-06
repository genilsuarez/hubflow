const path = require('path');
const globalModules = require('child_process').execSync('npm root -g').toString().trim();
const { chromium } = require(path.join(globalModules, 'playwright'));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });
  
  const filePath = path.resolve(__dirname, '../../index.html');
  await page.goto(`file://${filePath}`);
  await page.waitForTimeout(800);
  
  await page.screenshot({ 
    path: path.resolve(__dirname, 'hubflow-light.png'), 
    fullPage: false 
  });
  
  // Dark mode
  await page.click('#themeToggle');
  await page.waitForTimeout(400);
  await page.screenshot({ 
    path: path.resolve(__dirname, 'hubflow-dark.png'), 
    fullPage: false 
  });
  
  await browser.close();
  console.log('Screenshots saved: hubflow-light.png, hubflow-dark.png');
})();
