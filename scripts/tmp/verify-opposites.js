const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 700 } });

  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

  await page.goto('http://localhost:3002/exercises/opposites.html');
  await page.waitForTimeout(1500);

  // 1. Study mode
  const study = await page.evaluate(() => {
    const area = document.querySelector('[data-area="study"]');
    const word = document.getElementById('fcWord');
    const emoji = document.getElementById('fcEmoji');
    const counter = document.getElementById('fcCounter');
    const accent = document.querySelector('h1 .accent');
    return {
      visible: area?.classList.contains('show'),
      word: word?.textContent,
      emoji: emoji?.textContent,
      counter: counter?.textContent,
      accentText: accent?.textContent,
    };
  });
  console.log('STUDY:', JSON.stringify(study));

  // 2. Switch to Quiz mode
  await page.click('[data-mode="quiz"]');
  await page.waitForTimeout(500);
  const quiz = await page.evaluate(() => {
    const area = document.querySelector('[data-area="quiz"]');
    const label = document.getElementById('quizLabel');
    const opts = document.querySelectorAll('.quiz-opt');
    return {
      visible: area?.classList.contains('show'),
      label: label?.textContent,
      optCount: opts.length,
    };
  });
  console.log('QUIZ:', JSON.stringify(quiz));

  // 3. Switch to Match mode
  await page.click('[data-mode="match"]');
  await page.waitForTimeout(500);
  const match = await page.evaluate(() => {
    const area = document.querySelector('[data-area="match"]');
    const pairs = document.querySelectorAll('.pair-item');
    const score = document.getElementById('pairScore');
    return {
      visible: area?.classList.contains('show'),
      pairCount: pairs.length,
      score: score?.textContent,
    };
  });
  console.log('MATCH:', JSON.stringify(match));

  // 4. Switch to Battle mode
  await page.click('[data-mode="battle"]');
  await page.waitForTimeout(500);
  const battle = await page.evaluate(() => {
    const area = document.querySelector('[data-area="battle"]');
    const round = document.getElementById('battleRound');
    const p1 = document.getElementById('p1Score');
    const emoji = document.getElementById('battleEmoji');
    return {
      visible: area?.classList.contains('show'),
      round: round?.textContent,
      p1Score: p1?.textContent,
      emoji: emoji?.textContent,
    };
  });
  console.log('BATTLE:', JSON.stringify(battle));

  // 5. Switch to Timed mode
  await page.click('[data-mode="timed"]');
  await page.waitForTimeout(500);
  const timed = await page.evaluate(() => {
    const timer = document.getElementById('timerBar');
    const display = document.getElementById('timerDisplay');
    const opts = document.querySelectorAll('.quiz-opt');
    return {
      timerVisible: timer?.classList.contains('show'),
      timerText: display?.textContent,
      optCount: opts.length,
    };
  });
  console.log('TIMED:', JSON.stringify(timed));

  // 6. Switch category to Synonyms
  await page.click('[data-mode="study"]');
  await page.waitForTimeout(300);
  const synBtn = await page.$('[data-cat="synonyms"]');
  if (synBtn) {
    await synBtn.click();
    await page.waitForTimeout(500);
  }
  const synonyms = await page.evaluate(() => {
    const word = document.getElementById('fcWord');
    const counter = document.getElementById('fcCounter');
    const activeBtn = document.querySelector('[data-cat].active');
    return {
      word: word?.textContent,
      counter: counter?.textContent,
      activeCat: activeBtn?.dataset.cat,
    };
  });
  console.log('SYNONYMS:', JSON.stringify(synonyms));

  // 7. Screenshot
  await page.click('[data-mode="study"]');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'scripts/tmp/opposites-homologated.png' });

  console.log('ERRORS:', JSON.stringify(errors));
  console.log(errors.length === 0 ? '✅ ALL MODES WORK' : '❌ ERRORS FOUND');

  await browser.close();
})();
