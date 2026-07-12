const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  // iPhone SE viewport
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  });
  const page = await context.newPage();

  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('CONSOLE ERROR:', msg.text());
  });
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto('http://localhost:3002/exercises/vocabulary.html');
  await page.waitForSelector('#catExpandBtn');
  await page.waitForTimeout(2000); // wait for animations

  // Step 1: Check button exists
  const btnExists1 = await page.$('#catExpandBtn');
  console.log('1. Button exists initially:', !!btnExists1);
  await page.screenshot({ path: 'HubFlow/scripts/tmp/iphone-vocab-01-initial.png' });

  // Step 2: Expand
  await page.click('#catExpandBtn');
  await page.waitForTimeout(500);
  const isExpanded = await page.$eval('#catWrapper', el => el.classList.contains('expanded'));
  console.log('2. Expanded:', isExpanded);
  await page.screenshot({ path: 'HubFlow/scripts/tmp/iphone-vocab-02-expanded.png' });

  // Step 3: Check button in expanded state
  const btnExists2 = await page.$('#catExpandBtn');
  const btnDisabled2 = await page.$eval('#catExpandBtn', el => el.disabled);
  const btnDisplay2 = await page.$eval('#catExpandBtn', el => getComputedStyle(el).display);
  console.log('3. Button exists expanded:', !!btnExists2, 'disabled:', btnDisabled2, 'display:', btnDisplay2);

  // Step 4: Select a pill (e.g., "Cooking" - 2nd pill)
  const pills = await page.$$('#catBar .pill-btn');
  console.log('4. Total pills:', pills.length);
  if (pills.length >= 2) {
    await pills[1].click(); // Click "Cooking"
    await page.waitForTimeout(1000);
  }
  await page.screenshot({ path: 'HubFlow/scripts/tmp/iphone-vocab-03-after-select.png' });

  // Step 5: Check if button still exists
  const btnExists3 = await page.$('#catExpandBtn');
  console.log('5. Button exists after select:', !!btnExists3);
  if (btnExists3) {
    const btnDisabled3 = await page.$eval('#catExpandBtn', el => el.disabled);
    const btnDisplay3 = await page.$eval('#catExpandBtn', el => getComputedStyle(el).display);
    const btnOpacity3 = await page.$eval('#catExpandBtn', el => getComputedStyle(el).opacity);
    const btnRect = await page.$eval('#catExpandBtn', el => {
      const r = el.getBoundingClientRect();
      return { top: r.top, left: r.left, width: r.width, height: r.height, right: r.right };
    });
    const barRect = await page.$eval('#catBar', el => {
      const r = el.getBoundingClientRect();
      return { width: r.width, scrollWidth: el.scrollWidth, clientWidth: el.clientWidth, scrollLeft: el.scrollLeft };
    });
    console.log('5. Button disabled:', btnDisabled3, 'display:', btnDisplay3, 'opacity:', btnOpacity3);
    console.log('5. Button rect:', btnRect);
    console.log('5. Bar rect:', barRect);
  } else {
    console.log('5. BUTTON IS GONE FROM DOM!');
  }

  // Step 6: Check wrapper state
  const isExpanded2 = await page.$eval('#catWrapper', el => el.classList.contains('expanded'));
  console.log('6. Still expanded after select:', isExpanded2);

  await browser.close();
  console.log('\nDone.');
})();
