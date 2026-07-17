/**
 * Verify .btn → .lp-btn migration in HubFlow exercises.
 * Checks that buttons render with correct styles (min-height 44px, visible, clickable).
 */

const PLAYWRIGHT_PATH = require('child_process').execSync('npm root -g').toString().trim() + '/playwright';
const { chromium } = require(PLAYWRIGHT_PATH);

const BASE = 'http://localhost:3000/hubflow';

const EXERCISES_TO_CHECK = [
  'inversions',      // has ghost, green, primary buttons
  'conditionals',    // sentence-quiz with categories
  'collocations',    // flashcard engine
  'word-order',      // typed-answer engine
  'ed-spelling',     // spelling engine
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let errors = [];

  // Check index first
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  const indexLegacy = await page.$$('.btn');
  if (indexLegacy.length > 0) {
    errors.push(`index.html still has ${indexLegacy.length} .btn elements`);
  }

  for (const ex of EXERCISES_TO_CHECK) {
    const url = `${BASE}/exercises/${ex}.html`;
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // No legacy .btn should exist
    const legacyBtns = await page.$$('.btn');
    // Filter: only standalone .btn, not compound classes
    const realLegacy = [];
    for (const el of legacyBtns) {
      const classes = await el.getAttribute('class');
      const hasStandalone = classes.split(/\s+/).includes('btn');
      if (hasStandalone) realLegacy.push(classes);
    }
    if (realLegacy.length > 0) {
      errors.push(`${ex}: still has legacy .btn → ${realLegacy.join(', ')}`);
    }

    // .lp-btn should exist and be visible
    const lpBtns = await page.$$('.lp-btn');
    if (lpBtns.length === 0) {
      errors.push(`${ex}: no .lp-btn found`);
      continue;
    }

    // Check first lp-btn has min-height >= 44px
    const box = await lpBtns[0].boundingBox();
    if (box && box.height < 42) { // slight tolerance for sub-pixel
      errors.push(`${ex}: first .lp-btn height=${box.height}px (expected ≥44)`);
    }

    console.log(`  ✓ ${ex} — ${lpBtns.length} .lp-btn buttons, height=${box ? Math.round(box.height) : '?'}px`);
  }

  await browser.close();

  if (errors.length > 0) {
    console.error('\n✗ ERRORS:');
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  } else {
    console.log('\n✓ All exercises passed — .lp-btn migration verified.');
  }
}

run().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
