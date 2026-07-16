const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1024, height: 768 } });
  const page = await ctx.newPage();

  await page.goto('http://localhost:3000/hubflow/exercises/plural-endings.html');
  await page.evaluate(() => localStorage.setItem('lp-navigation-mode', 'sidebar'));

  const exercises = [
    'plural-endings', 'tenses', 'vocabulary', 'odd-one-out',
    'phrasal-verbs', 'listening', 'dictation-sprint', 'error-hunt',
    'word-order', 'paragraph-cloze', 'irregular-verbs'
  ];

  console.log('Exercise'.padEnd(22) + 'Wrap'.padEnd(8) + 'Card/Content');
  console.log('─'.repeat(55));

  for (const ex of exercises) {
    await page.goto(`http://localhost:3000/hubflow/exercises/${ex}.html`);
    await page.waitForTimeout(1200);

    const info = await page.evaluate(() => {
      const wrap = document.querySelector('.wrap');
      const fcCard = document.querySelector('.fc-card');
      const sentCard = document.querySelector('.sentence-card');
      const oooCard = document.querySelector('.ooo-card');
      const quizCard = document.querySelector('.quiz-card');
      const card = fcCard || sentCard || oooCard || quizCard;
      return {
        wrap: wrap ? wrap.offsetWidth : 0,
        card: card ? card.offsetWidth : 0,
        cardClass: card ? card.className : 'none',
      };
    });
    console.log(`${ex.padEnd(22)}${String(info.wrap).padEnd(8)}${info.card} (${info.cardClass})`);
  }

  // Screenshots of a few to verify visually
  await page.goto('http://localhost:3000/hubflow/exercises/tenses.html');
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'scripts/tmp/final-tenses.png', fullPage: false });

  await page.goto('http://localhost:3000/hubflow/exercises/vocabulary.html');
  await page.waitForTimeout(1200);
  await page.click('button[data-mode="match"]');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'scripts/tmp/final-vocab-match.png', fullPage: false });

  console.log('\nScreenshots saved');
  await browser.close();
})();
