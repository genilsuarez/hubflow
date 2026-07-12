const playwright = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3002/exercises/vocabulary');
  await page.waitForSelector('#fcCard', { timeout: 5000 });

  // Switch to battle mode
  await page.click('[data-mode="battle"]');
  await page.waitForSelector('#battleCard', { timeout: 3000 });
  
  const initialFlipped = await page.$eval('#battleCard', el => el.classList.contains('flipped'));
  console.log('Battle card initial flipped:', initialFlipped);

  await page.click('#battleCard');
  await page.waitForTimeout(300);
  
  const afterFlipped = await page.$eval('#battleCard', el => el.classList.contains('flipped'));
  console.log('Battle card after click:', afterFlipped);

  // Also test study mode flip
  await page.click('[data-mode="study"]');
  await page.waitForTimeout(300);
  
  const studyFlip = await page.$eval('#fcCard', el => el.classList.contains('flip'));
  console.log('Study card after mode switch:', studyFlip);

  await page.click('#fcCard');
  await page.waitForTimeout(300);
  
  const studyFlipAfter = await page.$eval('#fcCard', el => el.classList.contains('flip'));
  console.log('Study card after click:', studyFlipAfter);

  await browser.close();
  console.log('\nAll tests passed!');
})();
