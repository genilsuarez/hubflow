const globalModules = require('child_process').execSync('npm root -g').toString().trim();
const { chromium } = require(globalModules + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });

  await page.goto('http://localhost:3002/exercises/sentence-combining.html');
  await page.waitForTimeout(600);

  // Get initial item counter
  const before = await page.$eval('#itemCounter', el => el.textContent.trim());
  console.log(`Before: counter = "${before}"`);

  // Type an answer and press Enter
  await page.fill('#answerInput', 'test answer');
  await page.press('#answerInput', 'Enter');
  await page.waitForTimeout(300);

  // Check: should still be on the same item (1/12), with result showing
  const after = await page.$eval('#itemCounter', el => el.textContent.trim());
  const nextVisible = await page.$eval('#nextBtn', el => el.style.display !== 'none');
  const checkVisible = await page.$eval('#checkBtn', el => el.style.display !== 'none');
  const answersShown = await page.$eval('#answersList', el => el.classList.contains('show'));

  console.log(`After Enter: counter = "${after}"`);
  console.log(`Next btn visible: ${nextVisible} ${nextVisible ? '✓' : '✗'}`);
  console.log(`Check btn hidden: ${!checkVisible} ${!checkVisible ? '✓' : '✗'}`);
  console.log(`Answers shown: ${answersShown} ${answersShown ? '✓' : '✗'}`);
  console.log(`Same item (didn't skip): ${before === after} ${before === after ? '✓' : '✗ SKIPPED!'}`);

  // Now press Enter again (from document) to go to next
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  const afterNext = await page.$eval('#itemCounter', el => el.textContent.trim());
  console.log(`\nAfter 2nd Enter: counter = "${afterNext}" ${afterNext !== after ? '✓ advanced' : '✗ stuck'}`);

  await browser.close();
  console.log('\n✅ Done');
})();
