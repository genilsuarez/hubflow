const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  await page.goto('http://localhost:3002/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Click sidebar nav for "Mi Progreso" — open sidebar first
  await page.evaluate(() => {
    // Try bottom nav on mobile
    const bnItems = document.querySelectorAll('.bn-item');
    bnItems.forEach(b => {
      if (b.textContent.includes('Progreso') || b.dataset.key === 'mi-progreso') b.click();
    });
  });
  await page.waitForTimeout(500);

  const active = await page.evaluate(() => document.body.dataset.active);
  console.log('Active section:', active);

  if (active !== 'mi-progreso') {
    // Try direct URL
    await page.goto('http://localhost:3002/#mi-progreso', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const active2 = await page.evaluate(() => document.body.dataset.active);
    console.log('After hash nav:', active2);
  }

  // Now check
  const data = await page.evaluate(() => {
    const greeting = document.querySelector('.topbar-greeting-title.tg-progreso');
    const ts = getComputedStyle(document.querySelector('.topbar'));
    const gs = greeting ? getComputedStyle(greeting) : null;
    return {
      active: document.body.dataset.active,
      greetingDisplay: gs ? gs.display : 'element not found',
      greetingFontSize: gs ? gs.fontSize : null,
      text: greeting ? greeting.textContent : 'N/A',
    };
  });
  console.log(JSON.stringify(data, null, 2));

  // Dark mode + screenshot
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(200);
  await page.screenshot({
    path: 'HubFlow/scripts/tmp/progreso-dark.png',
    clip: { x: 0, y: 0, width: 390, height: 100 }
  });
  console.log('Screenshot saved');

  await browser.close();
})();
