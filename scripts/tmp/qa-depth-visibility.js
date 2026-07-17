const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  const errors = [];

  function check(condition, msg) {
    if (!condition) errors.push(msg);
    console.log(condition ? `  ✓ ${msg}` : `  ✗ ${msg}`);
  }

  // ═══ TEST 1: HubFlow index — depth badges on cards ═══
  console.log('\n── HubFlow Index: depth badges ──');
  await page.goto('http://localhost:3000/hubflow/?section=vocab', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const depthBadges = await page.$$('.book-depth');
  check(depthBadges.length > 0, `Depth badges rendered: ${depthBadges.length} cards have depth info`);

  // Check a specific card has items/modes
  const vocabDepth = await page.$('.book[data-id="vocabulary"] .book-depth');
  check(vocabDepth !== null, 'Vocabulary card has depth badge');
  if (vocabDepth) {
    const text = await vocabDepth.textContent();
    check(text.includes('500'), `Vocabulary shows 500 items (got: ${text.trim().substring(0, 60)})`);
    check(text.includes('5'), 'Vocabulary shows 5 modes');
    check(text.includes('2P'), 'Vocabulary shows Battle 2P badge');
  }

  // Check a non-battle card doesn't show 2P
  const ingDepth = await page.$('.book[data-id="ing-spelling"] .book-depth');
  if (ingDepth) {
    const text = await ingDepth.textContent();
    check(!text.includes('2P'), '-ing Spelling does NOT show Battle badge');
    check(text.includes('12'), '-ing Spelling shows 12 modes (spelling engine)');
  }

  // ═══ TEST 2: Rutas section in sidebar ═══
  console.log('\n── HubFlow Index: Rutas in sidebar ──');
  const rutasBtn = await page.$('button[data-target="rutas"]');
  check(rutasBtn !== null, 'Rutas button exists in sidebar');

  if (rutasBtn) {
    await rutasBtn.click();
    await page.waitForTimeout(300);
    const rutasSection = await page.$('.section[data-key="rutas"]');
    const isVisible = rutasSection ? await rutasSection.isVisible() : false;
    check(isVisible, 'Rutas section is visible after click');

    const rutaCards = await page.$$('.ruta-card');
    check(rutaCards.length === 6, `6 ruta cards rendered (got ${rutaCards.length})`);

    const steps = await page.$$('.ruta-step');
    check(steps.length > 0, `Ruta steps rendered: ${steps.length} steps total`);
  }

  // ═══ TEST 3: Dark mode ═══
  console.log('\n── Dark mode rendering ──');
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await page.waitForTimeout(200);

  const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  check(darkBg !== 'rgb(250, 247, 242)', 'Body background changed in dark mode');

  // Check depth badge is still readable in dark
  const depthVisible = await page.$eval('.book-depth', el => {
    const style = getComputedStyle(el);
    return parseFloat(style.opacity) > 0 || style.display !== 'none';
  });
  check(depthVisible, 'Depth badge visible in dark mode');

  // ═══ TEST 4: Mobile viewport ═══
  console.log('\n── Mobile viewport (375px) ──');
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(300);

  const mobileDepth = await page.$$('.book-depth');
  check(mobileDepth.length > 0, 'Depth badges still render on mobile');

  // ═══ TEST 5: Exercise page — depth banner ═══
  console.log('\n── Exercise page: depth banner ──');
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000/hubflow/exercises/phrasal-verbs.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const banner = await page.$('.depth-banner');
  check(banner !== null, 'Depth banner appears on exercise page');
  if (banner) {
    const bannerText = await banner.textContent();
    check(bannerText.includes('106'), `Phrasal verbs banner shows 106 items (got: ${bannerText.trim().substring(0, 80)})`);
    check(bannerText.includes('Battle'), 'Phrasal verbs banner shows Battle 2P');
  }

  // ═══ TEST 6: DeskFlow portal — updated HubFlow description ═══
  console.log('\n── DeskFlow portal: HubFlow description ──');
  await page.goto('http://localhost:3000/deskflow/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const portalText = await page.textContent('body');
  check(portalText.includes('55 módulos'), 'Portal shows "55 módulos" for HubFlow');
  check(portalText.includes('Battle'), 'Portal mentions Battle for HubFlow');

  // ═══ SUMMARY ═══
  console.log('\n══════════════════════════════════');
  if (errors.length === 0) {
    console.log(`✓ ALL CHECKS PASSED (${depthBadges.length} depth badges, rutas, dark mode, mobile, banner, portal)`);
  } else {
    console.log(`✗ ${errors.length} FAILURES:`);
    errors.forEach(e => console.log(`  - ${e}`));
  }

  await browser.close();
  process.exit(errors.length > 0 ? 1 : 0);
})();
