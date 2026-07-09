const playwright = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  const errors = [];

  page.on('pageerror', err => errors.push(`PAGE ERROR: ${err.message}`));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(`CONSOLE: ${msg.text()}`); });

  // 1. Check index loads and card exists
  await page.goto('http://localhost:3002/index.html', { waitUntil: 'domcontentloaded' });
  const card = await page.$('a[href="exercises/verb-chunks.html"]');
  console.log(`[index.html] Card present: ${!!card}`);

  // 2. Check exercise page loads
  await page.goto('http://localhost:3002/exercises/verb-chunks.html', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  // Check title
  const title = await page.textContent('h1');
  console.log(`[verb-chunks.html] Title: ${title}`);

  // Check category buttons rendered
  const catBtns = await page.$$('.cat-btn');
  console.log(`[verb-chunks.html] Category buttons: ${catBtns.length}`);

  // Check mode buttons
  const modeBtns = await page.$$('.pill-btn');
  console.log(`[verb-chunks.html] Mode buttons: ${modeBtns.length}`);

  // Check practice area is visible (default mode)
  const practiceVisible = await page.$eval('[data-area="practice"]', el => el.classList.contains('show'));
  console.log(`[verb-chunks.html] Practice area visible: ${practiceVisible}`);

  // Check options rendered
  const opts = await page.$$('.word-opt');
  console.log(`[verb-chunks.html] Practice options rendered: ${opts.length}`);

  // 3. Test Study mode
  await page.click('[data-mode="study"]');
  await page.waitForTimeout(300);
  const studyVisible = await page.$eval('[data-area="study"]', el => el.classList.contains('show'));
  const fcTerm = await page.textContent('#fcTerm');
  console.log(`[Study] Visible: ${studyVisible}, Term: "${fcTerm}"`);

  // 4. Test Write mode
  await page.click('[data-mode="write"]');
  await page.waitForTimeout(300);
  const writeVisible = await page.$eval('[data-area="write"]', el => el.classList.contains('show'));
  const writeVerb = await page.textContent('#writeVerb');
  console.log(`[Write] Visible: ${writeVisible}, Verb: "${writeVerb}"`);

  // 5. Switch to Questions category
  const qBtn = await page.$('.cat-btn:nth-child(2)');
  if (qBtn) {
    await qBtn.click();
    await page.waitForTimeout(400);
    const term2 = await page.textContent('#writeVerb');
    console.log(`[Questions cat] Write verb: "${term2}"`);
  }

  // 6. Test dark mode toggle
  await page.click('#themeToggle');
  const isDark = await page.$eval('html', el => el.getAttribute('data-theme') === 'dark');
  console.log(`[Theme] Dark mode: ${isDark}`);

  // Summary
  if (errors.length) {
    console.log(`\n❌ ERRORS (${errors.length}):`);
    errors.forEach(e => console.log(`  ${e}`));
  } else {
    console.log('\n✅ All checks passed — no JS errors');
  }

  await browser.close();
})();
