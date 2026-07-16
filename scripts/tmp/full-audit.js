const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  // 1. Index — Resumen section
  await page.goto('http://localhost:3002/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'HubFlow/scripts/tmp/audit-index-resumen.png', fullPage: false });

  // Get topbar title metrics
  const indexResumen = await page.evaluate(() => {
    const title = document.querySelector('.topbar-greeting-title.tg-resumen');
    const topbar = document.querySelector('.topbar');
    const s = title ? getComputedStyle(title) : null;
    return {
      title: title ? title.textContent.trim() : 'N/A',
      fontSize: s ? s.fontSize : null,
      fontWeight: s ? s.fontWeight : null,
      lineHeight: s ? s.lineHeight : null,
      topbarHeight: topbar ? topbar.getBoundingClientRect().height : null,
      titleTop: title ? title.getBoundingClientRect().top : null,
    };
  });
  console.log('INDEX (Resumen):', JSON.stringify(indexResumen));

  // 2. Index — Mi Progreso section
  await page.evaluate(() => {
    const items = document.querySelectorAll('.bn-item');
    items.forEach(i => { if (i.dataset.key === 'mi-progreso') i.click(); });
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'HubFlow/scripts/tmp/audit-index-progreso.png', fullPage: false });

  const indexProgreso = await page.evaluate(() => {
    const title = document.querySelector('.topbar-greeting-title.tg-progreso');
    const s = title ? getComputedStyle(title) : null;
    return {
      title: title ? title.textContent.trim() : 'N/A',
      fontSize: s ? s.fontSize : null,
      display: s ? s.display : null,
    };
  });
  console.log('INDEX (Mi Progreso):', JSON.stringify(indexProgreso));

  // 3. All exercise types
  const exercises = [
    'ing-spelling.html',
    'ed-spelling.html',
    'articles.html',
    'vocabulary.html',
    'opposites.html',
    'word-order.html',
    'paraphrasing.html',
    'confusing-words.html',
    'tenses.html',
    'modals.html',
    'phonics.html',
    'irregular-verbs.html',
  ];

  console.log('\n--- EXERCISES ---');
  for (const ex of exercises) {
    await page.goto('http://localhost:3002/exercises/' + ex, { waitUntil: 'networkidle' });
    await page.waitForTimeout(200);

    const data = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const topBar = document.querySelector('.top-bar');
      const header = document.querySelector('.header');
      const hs = h1 ? getComputedStyle(h1) : null;
      const tbs = topBar ? getComputedStyle(topBar) : null;
      const hds = header ? getComputedStyle(header) : null;
      return {
        h1: hs ? {
          fontSize: hs.fontSize,
          fontWeight: hs.fontWeight,
          lineHeight: hs.lineHeight,
          margin: hs.margin,
          display: hs.display,
          height: Math.round(h1.getBoundingClientRect().height),
        } : null,
        topBar: tbs ? {
          height: Math.round(topBar.getBoundingClientRect().height),
          padding: tbs.padding,
          margin: tbs.margin,
          borderBottom: tbs.borderBottom,
        } : null,
        header: hds ? {
          padding: hds.padding,
          margin: hds.margin,
        } : null,
      };
    });

    const h1 = data.h1;
    const tb = data.topBar;
    const hd = data.header;
    console.log(`${ex.padEnd(25)} | h1: ${h1.fontSize} w${h1.fontWeight} lh=${h1.lineHeight} h=${h1.height}px d=${h1.display} m="${h1.margin}" | tb: h=${tb.height}px p="${tb.padding}" m="${tb.margin}" | hdr: p="${hd.padding}" m="${hd.margin}"`);
  }

  // Take screenshots of 4 key exercises
  for (const ex of ['ing-spelling.html', 'articles.html', 'vocabulary.html', 'word-order.html']) {
    await page.goto('http://localhost:3002/exercises/' + ex, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `HubFlow/scripts/tmp/audit-${ex.replace('.html', '')}.png`, clip: { x: 0, y: 0, width: 390, height: 260 } });
  }

  console.log('\nScreenshots saved in HubFlow/scripts/tmp/audit-*.png');
  await browser.close();
})();
