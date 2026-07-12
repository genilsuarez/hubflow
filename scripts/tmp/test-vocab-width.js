const { chromium, devices } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const iPhone = devices['iPhone 13'];
  const context = await browser.newContext({ ...iPhone });
  const page = await context.newPage();

  await page.goto('http://localhost:3002/exercises/vocabulary.html');
  await page.waitForTimeout(2000);

  // Check if page is wider than viewport
  const metrics = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    docWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    wrapWidth: document.querySelector('.wrap')?.scrollWidth,
    catBarWidth: document.getElementById('catBar')?.scrollWidth,
    catBarClientWidth: document.getElementById('catBar')?.clientWidth,
    catBarOverflow: getComputedStyle(document.getElementById('catBar')).overflowX,
    catWrapperWidth: document.getElementById('catWrapper')?.offsetWidth,
  }));

  console.log('Page metrics:', JSON.stringify(metrics, null, 2));

  if (metrics.docWidth > metrics.viewportWidth) {
    console.log('⚠️  PAGE IS WIDER THAN VIEWPORT by', metrics.docWidth - metrics.viewportWidth, 'px');
  } else {
    console.log('✓ Page fits viewport');
  }

  await page.screenshot({ path: 'HubFlow/scripts/tmp/iphone13-vocab.png' });

  // Now compare with opposites
  await page.goto('http://localhost:3002/exercises/opposites.html');
  await page.waitForTimeout(2000);

  const metrics2 = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    docWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    wrapWidth: document.querySelector('.wrap')?.scrollWidth,
    catBarWidth: document.getElementById('catBar')?.scrollWidth,
    catBarClientWidth: document.getElementById('catBar')?.clientWidth,
    catBarOverflow: getComputedStyle(document.getElementById('catBar')).overflowX,
    catWrapperWidth: document.getElementById('catWrapper')?.offsetWidth,
  }));

  console.log('\nOpposites metrics:', JSON.stringify(metrics2, null, 2));

  if (metrics2.docWidth > metrics2.viewportWidth) {
    console.log('⚠️  PAGE IS WIDER THAN VIEWPORT by', metrics2.docWidth - metrics2.viewportWidth, 'px');
  } else {
    console.log('✓ Page fits viewport');
  }

  await page.screenshot({ path: 'HubFlow/scripts/tmp/iphone13-opposites.png' });

  await browser.close();
})();
