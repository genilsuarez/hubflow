const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });

  // Test 1: dark mode via query param
  await page.goto('file:///Users/gsuarez/Documents/Code/Learn/HubFlow/guides/noun-adjuncts.html?theme=dark');
  await page.waitForTimeout(300);

  const theme = await page.getAttribute('html', 'data-theme');
  console.log('1. data-theme attr:', theme === 'dark' ? 'PASS' : 'FAIL — got: ' + theme);

  // Test 2: background color is warm charcoal
  const bgColor = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--bg').trim());
  console.log('2. --bg value:', bgColor === '#1A1714' ? 'PASS' : 'FAIL — got: ' + bgColor);

  // Test 3: text color is warm white
  const textColor = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--text').trim());
  console.log('3. --text value:', textColor === '#EDE8E0' ? 'PASS' : 'FAIL — got: ' + textColor);

  // Test 4: toggle button is circular (guide-theme-toggle), not pill
  const toggleExists = await page.$('.guide-theme-toggle');
  const oldToggle = await page.$('.theme-btn');
  console.log('4. Toggle is .guide-theme-toggle:', toggleExists ? 'PASS' : 'FAIL');
  console.log('5. Old .theme-btn removed:', !oldToggle ? 'PASS' : 'FAIL');

  // Test 5: toggle shows sun icon in dark mode
  const icon = await page.textContent('#guideThemeToggle');
  console.log('6. Toggle icon in dark:', icon.includes('☀') ? 'PASS' : 'FAIL — got: ' + icon);

  // Test 6: click toggle → switches to light
  await page.click('#guideThemeToggle');
  await page.waitForTimeout(100);
  const afterClick = await page.getAttribute('html', 'data-theme');
  console.log('7. After click, data-theme:', afterClick === '' || afterClick === null ? 'PASS (light)' : 'FAIL — got: ' + afterClick);

  // Test 7: localStorage persisted
  const stored = await page.evaluate(() => localStorage.getItem('lp-theme'));
  console.log('8. localStorage lp-theme:', stored === 'light' ? 'PASS' : 'FAIL — got: ' + stored);

  // Test 8: toggle size >= 44px
  const box = await page.$eval('#guideThemeToggle', el => {
    const r = el.getBoundingClientRect();
    return { w: r.width, h: r.height };
  });
  console.log('9. Toggle size >= 44px:', box.w >= 44 && box.h >= 44 ? 'PASS' : `FAIL — ${box.w}x${box.h}`);

  // Screenshot
  await page.goto('file:///Users/gsuarez/Documents/Code/Learn/HubFlow/guides/noun-adjuncts.html?theme=dark');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'HubFlow/scripts/tmp/noun-adjuncts-dark-fixed.png' });
  console.log('\nScreenshot saved: HubFlow/scripts/tmp/noun-adjuncts-dark-fixed.png');

  await browser.close();
})();
