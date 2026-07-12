const playwright = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'log') console.log('[page]', msg.text());
  });
  page.on('pageerror', err => console.log('[page-error]', err.message));

  await page.goto('http://localhost:3002/exercises/vocabulary');
  await page.waitForSelector('#fcCard', { timeout: 5000 });

  // Intercept classList.toggle with stack trace
  await page.evaluate(() => {
    const card = document.getElementById('fcCard');
    const origToggle = DOMTokenList.prototype.toggle;
    card.classList.toggle = function(cls) {
      if (cls === 'flip') {
        const stack = new Error().stack;
        console.log('=== toggle flip called from:\n' + stack.split('\n').slice(1, 5).join('\n'));
      }
      return origToggle.call(this, cls);
    };
  });

  await page.click('#fcCard');
  await page.waitForTimeout(500);

  await browser.close();
})();
