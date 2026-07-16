const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  await page.goto('http://localhost:3002/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Navigate to Mi Progreso
  await page.evaluate(() => {
    const nav = document.querySelector('[data-key="mi-progreso"]');
    if (nav) nav.click();
    // Or try sidebar
    const links = document.querySelectorAll('.nav-item, [data-section]');
    links.forEach(l => {
      if (l.textContent.includes('Progreso') || l.dataset.section === 'mi-progreso') l.click();
    });
  });
  await page.waitForTimeout(500);

  // Check what's visible
  const data = await page.evaluate(() => {
    const greeting = document.querySelector('.topbar-greeting-title.tg-progreso');
    const topbar = document.querySelector('.topbar');
    if (!greeting) return { error: 'no .tg-progreso found', body: document.body.dataset.active };
    const gs = getComputedStyle(greeting);
    const ts = getComputedStyle(topbar);
    return {
      active: document.body.dataset.active,
      greeting: {
        text: greeting.textContent,
        fontSize: gs.fontSize,
        fontFamily: gs.fontFamily.split(',')[0],
        display: gs.display,
        overflow: gs.overflow,
        width: greeting.getBoundingClientRect().width,
        height: greeting.getBoundingClientRect().height,
      },
      topbar: {
        padding: ts.padding,
        height: topbar.getBoundingClientRect().height,
        overflow: ts.overflow,
      }
    };
  });
  console.log(JSON.stringify(data, null, 2));

  // Screenshot dark mode
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await page.waitForTimeout(300);
  await page.screenshot({
    path: 'HubFlow/scripts/tmp/index-progreso-dark.png',
    clip: { x: 0, y: 0, width: 390, height: 120 }
  });

  await browser.close();
})();
