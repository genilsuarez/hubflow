const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ...devices['iPhone 14'] });
  const page = await context.newPage();
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const structure = await page.evaluate(() => {
    const content = document.querySelector('.content');
    if (!content) return [];
    return Array.from(content.children).map(el => ({
      tag: el.tagName,
      id: el.id || '',
      classes: el.className.substring(0, 60),
      display: getComputedStyle(el).display
    }));
  });
  console.log(JSON.stringify(structure, null, 2));

  // Also check what data attributes the nav buttons use
  const navBtns = await page.evaluate(() => {
    const btns = document.querySelectorAll('.bn-item');
    return Array.from(btns).map(b => ({
      target: b.getAttribute('data-target'),
      text: b.textContent.trim()
    }));
  });
  console.log('\nNav buttons:', JSON.stringify(navBtns, null, 2));

  await browser.close();
})();
