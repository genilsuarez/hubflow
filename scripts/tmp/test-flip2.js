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

  // Monkey-patch classList.toggle to count calls
  await page.evaluate(() => {
    const card = document.getElementById('fcCard');
    let toggleCount = 0;
    const origToggle = card.classList.toggle.bind(card.classList);
    card.classList.toggle = function(cls) {
      if (cls === 'flip') {
        toggleCount++;
        console.log(`toggle('flip') call #${toggleCount}`);
      }
      return origToggle(cls);
    };
    window._getToggleCount = () => toggleCount;
  });

  // Now click the card  
  await page.click('#fcCard');
  await page.waitForTimeout(300);

  const count = await page.evaluate(() => window._getToggleCount());
  console.log(`Total toggle('flip') calls after 1 click: ${count}`);

  const flipState = await page.$eval('#fcCard', el => el.classList.contains('flip'));
  console.log('Flip state:', flipState);

  await browser.close();
})();
