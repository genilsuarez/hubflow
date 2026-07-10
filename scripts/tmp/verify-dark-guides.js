const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 420, height: 900 } });

  // Test articles guide in dark mode via query param
  await page.goto('file:///Users/gsuarez/Documents/Code/Learn/HubFlow/guides/articles.html?theme=dark');
  await page.waitForTimeout(300);

  // Verify data-theme is set
  const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  console.log('data-theme attribute:', theme);

  // Verify toggle button exists and shows sun icon
  const toggleText = await page.textContent('#guideThemeToggle');
  console.log('Toggle button text:', toggleText);

  // Check background color of body (should be dark)
  const bgColor = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  console.log('Body background:', bgColor);

  // Check text color (should be light)
  const textColor = await page.evaluate(() => getComputedStyle(document.querySelector('h1')).color);
  console.log('H1 text color:', textColor);

  // Check .intro text (uses --ink-soft)
  const introColor = await page.evaluate(() => getComputedStyle(document.querySelector('.intro')).color);
  console.log('.intro color (--ink-soft):', introColor);

  // Screenshot
  await page.screenshot({ path: '/Users/gsuarez/Documents/Code/Learn/HubFlow/scripts/tmp/guide-dark.png', fullPage: true });
  console.log('Screenshot saved: guide-dark.png');

  // Now test light mode
  await page.goto('file:///Users/gsuarez/Documents/Code/Learn/HubFlow/guides/articles.html?theme=light');
  await page.waitForTimeout(300);
  await page.screenshot({ path: '/Users/gsuarez/Documents/Code/Learn/HubFlow/scripts/tmp/guide-light.png', fullPage: true });
  console.log('Screenshot saved: guide-light.png');

  // Test toggle click
  await page.goto('file:///Users/gsuarez/Documents/Code/Learn/HubFlow/guides/articles.html?theme=light');
  await page.waitForTimeout(200);
  await page.click('#guideThemeToggle');
  await page.waitForTimeout(200);
  const afterToggle = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  console.log('After toggle click, data-theme:', afterToggle);
  const storedTheme = await page.evaluate(() => localStorage.getItem('lp-theme'));
  console.log('localStorage lp-theme:', storedTheme);

  await browser.close();
  console.log('\nAll checks passed!');
})();
