const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });

  // Test LIGHT mode
  await page.goto('file:///Users/gsuarez/Documents/Code/Learn/HubFlow/guides/noun-adjuncts.html?theme=light');
  await page.waitForTimeout(300);

  const bgLight = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  console.log('1. Light body bg:', bgLight);

  const textColor = await page.evaluate(() => getComputedStyle(document.body).color);
  console.log('2. Light body text color:', textColor);

  const heroP = await page.$eval('.hero p', el => getComputedStyle(el).color);
  console.log('3. Light hero p color:', heroP);

  const h1Color = await page.$eval('.hero h1', el => getComputedStyle(el).color);
  console.log('4. Light h1 color:', h1Color);

  await page.screenshot({ path: 'HubFlow/scripts/tmp/noun-adjuncts-light-fixed.png' });
  console.log('\nLight screenshot saved');

  // Test DARK mode
  await page.goto('file:///Users/gsuarez/Documents/Code/Learn/HubFlow/guides/noun-adjuncts.html?theme=dark');
  await page.waitForTimeout(300);

  const bgDark = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  console.log('\n5. Dark body bg:', bgDark);

  const textDark = await page.evaluate(() => getComputedStyle(document.body).color);
  console.log('6. Dark body text color:', textDark);

  const heroPDark = await page.$eval('.hero p', el => getComputedStyle(el).color);
  console.log('7. Dark hero p color:', heroPDark);

  await page.screenshot({ path: 'HubFlow/scripts/tmp/noun-adjuncts-dark-fixed2.png' });
  console.log('Dark screenshot saved');

  await browser.close();
})();
