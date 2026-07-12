const playwright = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  
  // Collect console logs
  const logs = [];
  page.on('console', msg => logs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => logs.push(`[ERROR] ${err.message}`));

  await page.goto('http://localhost:3002/exercises/vocabulary');
  await page.waitForSelector('#fcCard', { timeout: 5000 });

  // Check initial state
  const hasFcCard = await page.$('#fcCard');
  console.log('fcCard found:', !!hasFcCard);

  const initialFlip = await page.$eval('#fcCard', el => el.classList.contains('flip'));
  console.log('Initial flip state:', initialFlip);

  // Click on the card
  await page.click('#fcCard');
  await page.waitForTimeout(600);

  const afterClickFlip = await page.$eval('#fcCard', el => el.classList.contains('flip'));
  console.log('After click flip state:', afterClickFlip);

  // Check if there are any errors
  const errors = logs.filter(l => l.includes('[ERROR]') || l.includes('error'));
  if (errors.length) {
    console.log('Errors found:');
    errors.forEach(e => console.log('  ', e));
  }

  // Also check number of click event listeners on fcCard
  const listenerCount = await page.evaluate(() => {
    const card = document.getElementById('fcCard');
    // Can't directly get listeners, but we can test toggle
    const before = card.classList.contains('flip');
    card.click();
    const after = card.classList.contains('flip');
    card.click();
    const afterSecond = card.classList.contains('flip');
    return { before, after, afterSecond };
  });
  console.log('Manual toggle test:', JSON.stringify(listenerCount));

  if (logs.length) {
    console.log('\nAll console logs:');
    logs.forEach(l => console.log('  ', l));
  }

  await browser.close();
})();
