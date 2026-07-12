const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } }); // iPhone
  const page = await context.newPage();

  await page.goto('http://localhost:3002/exercises/vocabulary.html');
  await page.waitForSelector('#catExpandBtn');
  await page.waitForTimeout(1500); // wait for scroll hint animation

  // 1. Check initial state
  const btnDisabledBefore = await page.$eval('#catExpandBtn', el => el.disabled);
  console.log(`1. Button disabled before expand: ${btnDisabledBefore}`);

  // 2. Expand
  await page.click('#catExpandBtn');
  await page.waitForTimeout(300);
  const isExpanded = await page.$eval('#catWrapper', el => el.classList.contains('expanded'));
  console.log(`2. Expanded after click: ${isExpanded}`);

  // 3. Check button state while expanded (before selecting)
  const btnDisabledExpanded = await page.$eval('#catExpandBtn', el => el.disabled);
  const btnVisible = await page.$eval('#catExpandBtn', el => {
    const style = getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  });
  console.log(`3. Button disabled while expanded: ${btnDisabledExpanded}`);
  console.log(`3. Button visible while expanded: ${btnVisible}`);

  // 4. Select a different category pill (e.g., the 3rd one)
  const pills = await page.$$('#catBar .pill-btn');
  console.log(`4. Total pills: ${pills.length}`);
  if (pills.length >= 3) {
    await pills[2].click();
    await page.waitForTimeout(500);
  }

  // 5. After selection — check if collapsed (mobile auto-collapse)
  const isExpandedAfter = await page.$eval('#catWrapper', el => el.classList.contains('expanded'));
  console.log(`5. Still expanded after selection: ${isExpandedAfter}`);

  // 6. Check button state after selection
  const btnDisabledAfter = await page.$eval('#catExpandBtn', el => el.disabled);
  const btnVisibleAfter = await page.$eval('#catExpandBtn', el => {
    const style = getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity) > 0.3;
  });
  const btnPointerEvents = await page.$eval('#catExpandBtn', el => getComputedStyle(el).pointerEvents);
  console.log(`6. Button disabled after selection: ${btnDisabledAfter}`);
  console.log(`6. Button visible after selection: ${btnVisibleAfter}`);
  console.log(`6. Button pointer-events: ${btnPointerEvents}`);

  // 7. Take screenshot
  await page.screenshot({ path: 'HubFlow/scripts/tmp/vocab-after-select.png', fullPage: false });

  // 8. Try expanding again to confirm button works
  if (!btnDisabledAfter) {
    await page.click('#catExpandBtn');
    await page.waitForTimeout(300);
    const expandedAgain = await page.$eval('#catWrapper', el => el.classList.contains('expanded'));
    console.log(`7. Can expand again: ${expandedAgain}`);

    // 9. Screenshot expanded state
    await page.screenshot({ path: 'HubFlow/scripts/tmp/vocab-expanded-again.png', fullPage: false });
  } else {
    console.log(`7. FAIL — button is disabled, cannot expand again`);
    await page.screenshot({ path: 'HubFlow/scripts/tmp/vocab-btn-disabled.png', fullPage: false });
  }

  await browser.close();
  console.log('\nDone.');
})();
