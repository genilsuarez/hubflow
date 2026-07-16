const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await ctx.newPage();

  // Set sidebar mode
  await page.goto('http://localhost:3000/hubflow/exercises/plural-endings.html');
  await page.evaluate(() => localStorage.setItem('lp-navigation-mode', 'sidebar'));

  const exercises = [
    'plural-endings', 'modals', 'conditionals', 'phrasal-verbs',
    'tenses', 'listening', 'word-order', 'prepositions',
    'vocabulary', 'opposites', 'dictation-sprint', 'error-hunt'
  ];

  const results = [];

  for (const ex of exercises) {
    await page.goto(`http://localhost:3000/hubflow/exercises/${ex}.html`);
    await page.waitForTimeout(1200);

    const info = await page.evaluate(() => {
      const wrap = document.querySelector('.wrap');
      const header = document.querySelector('.header');
      const pillBar = document.querySelector('.pill-bar');
      const fcCard = document.querySelector('.fc-card');
      const body = document.body;
      return {
        hasSidebar: body.classList.contains('has-sidebar'),
        wrap: wrap ? wrap.offsetWidth : 0,
        header: header ? header.offsetWidth : 0,
        pillBar: pillBar ? pillBar.offsetWidth : 0,
        fcCard: fcCard ? fcCard.offsetWidth : 0,
      };
    });
    results.push({ exercise: ex, ...info });
  }

  console.log('Exercise Layout Check (viewport 1024px, sidebar persistent):');
  console.log('─'.repeat(70));
  console.log('Exercise'.padEnd(20) + 'Sidebar'.padEnd(10) + 'Wrap'.padEnd(8) + 'Header'.padEnd(9) + 'PillBar'.padEnd(9) + 'FcCard');
  console.log('─'.repeat(70));
  for (const r of results) {
    console.log(
      r.exercise.padEnd(20) +
      (r.hasSidebar ? '✓' : '✗').padEnd(10) +
      String(r.wrap).padEnd(8) +
      String(r.header).padEnd(9) +
      String(r.pillBar).padEnd(9) +
      String(r.fcCard)
    );
  }

  // Also check the index page isn't affected
  await page.goto('http://localhost:3000/hubflow/');
  await page.waitForTimeout(1200);
  const indexWrap = await page.evaluate(() => {
    const wrap = document.querySelector('.wrap');
    return wrap ? wrap.offsetWidth : 'no .wrap';
  });
  console.log('\n─'.repeat(70));
  console.log(`Index page .wrap width: ${indexWrap}`);

  // Screenshot a few for visual check
  await page.goto('http://localhost:3000/hubflow/exercises/plural-endings.html');
  await page.waitForTimeout(1500);
  // Switch to Practice mode to check word-options width
  await page.click('button[data-mode="practice"]');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'scripts/tmp/review-plural-practice.png', fullPage: false });

  await page.goto('http://localhost:3000/hubflow/exercises/tenses.html');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'scripts/tmp/review-tenses.png', fullPage: false });

  await page.goto('http://localhost:3000/hubflow/exercises/listening.html');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'scripts/tmp/review-listening.png', fullPage: false });

  console.log('\nScreenshots saved: review-plural-practice.png, review-tenses.png, review-listening.png');
  await browser.close();
})();
