const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [];

  function check(condition, msg) {
    if (!condition) errors.push(msg);
    console.log(condition ? `  ✓ ${msg}` : `  ✗ ${msg}`);
  }

  console.log('\n── Rutas header ──');
  await page.goto('http://localhost:3000/hubflow/?section=rutas', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // Check greeting is visible
  const greeting = await page.$('.topbar-greeting');
  const greetingVisible = greeting ? await greeting.isVisible() : false;
  check(greetingVisible, 'Greeting visible on Rutas section');

  // Check rutas-specific text
  const title = await page.$('.tg-rutas .topbar-greeting-title, .topbar-greeting-title.tg-rutas');
  const sub = await page.$('.tg-rutas .topbar-greeting-sub, .topbar-greeting-sub.tg-rutas');
  
  // Get visible text from greeting
  const greetingText = greeting ? await greeting.textContent() : '';
  check(greetingText.includes('1,400'), `Header shows "1,400+ items" (got: ${greetingText.trim().substring(0, 100)})`);
  check(greetingText.includes('Battle'), 'Header mentions Battle');
  check(greetingText.includes('55 módulos'), 'Header shows 55 módulos');

  // Check search bar is hidden
  const searchBar = await page.$('.search-bar');
  const searchVisible = searchBar ? await searchBar.isVisible() : false;
  check(!searchVisible, 'Search bar is hidden on Rutas');

  // Check filter is hidden
  const filterMenu = await page.$('.filter-menu');
  const filterVisible = filterMenu ? await filterMenu.isVisible() : false;
  check(!filterVisible, 'Filter menu is hidden on Rutas');

  console.log('\n══════════════════════════════════');
  if (errors.length === 0) {
    console.log('✓ ALL CHECKS PASSED');
  } else {
    console.log(`✗ ${errors.length} FAILURES:`);
    errors.forEach(e => console.log(`  - ${e}`));
  }

  await browser.close();
  process.exit(errors.length > 0 ? 1 : 0);
})();
