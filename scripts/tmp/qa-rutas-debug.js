const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  await page.goto('http://localhost:3000/hubflow/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.click('button[data-target="rutas"]');
  await page.waitForTimeout(600);

  // Check topbar greeting visibility
  const greeting = await page.$('.topbar-greeting');
  const greetingVisible = greeting ? await greeting.evaluate(el => {
    const style = getComputedStyle(el);
    return { display: style.display, visibility: style.visibility, height: el.offsetHeight };
  }) : null;
  console.log('Greeting computed:', greetingVisible);

  // Check data-active attribute on body
  const dataActive = await page.evaluate(() => document.body.dataset.active);
  console.log('body[data-active]:', dataActive);

  // Check tg-rutas elements visibility
  const tgRutas = await page.$$eval('.tg-rutas', els => els.map(el => ({
    tag: el.tagName,
    text: el.textContent.trim().substring(0, 50),
    display: getComputedStyle(el).display
  })));
  console.log('tg-rutas elements:', tgRutas);

  // Check topbar height
  const topbar = await page.$('.topbar');
  const topbarInfo = topbar ? await topbar.evaluate(el => ({
    height: el.offsetHeight,
    display: getComputedStyle(el).display,
    visible: el.offsetParent !== null
  })) : null;
  console.log('Topbar info:', topbarInfo);

  await browser.close();
})();
