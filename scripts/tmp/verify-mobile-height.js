const { chromium, devices } = require('playwright');

(async () => {
  const iPhone = devices['iPhone 14'];
  const browser = await chromium.launch();
  const context = await browser.newContext({ ...iPhone });
  const page = await context.newPage();

  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Get layout measurements
  const measurements = await page.evaluate(() => {
    const shell = document.querySelector('.shell');
    const content = document.querySelector('.content');
    const nav = document.querySelector('.bottom-nav');
    const viewportH = window.innerHeight;

    const shellRect = shell ? shell.getBoundingClientRect() : null;
    const contentRect = content ? content.getBoundingClientRect() : null;
    const navRect = nav ? nav.getBoundingClientRect() : null;

    return {
      viewport: viewportH,
      shell: shellRect ? { top: shellRect.top, bottom: shellRect.bottom, height: shellRect.height } : null,
      content: contentRect ? { top: contentRect.top, bottom: contentRect.bottom, height: contentRect.height } : null,
      nav: navRect ? { top: navRect.top, bottom: navRect.bottom, height: navRect.height } : null,
      overlap: shellRect && navRect ? Math.max(0, shellRect.bottom - navRect.top) : 0
    };
  });

  console.log('\n=== LAYOUT MEASUREMENTS (iPhone 14) ===');
  console.log('Viewport height:', measurements.viewport);
  console.log('Shell:', JSON.stringify(measurements.shell));
  console.log('Content:', JSON.stringify(measurements.content));
  console.log('Bottom nav:', JSON.stringify(measurements.nav));
  console.log('Overlap (shell vs nav):', measurements.overlap, measurements.overlap > 0 ? '❌ CONTENT HIDDEN' : '✅ OK');

  // Check if last buttons in Resumen are visible by scrolling to bottom
  const scrollCheck = await page.evaluate(() => {
    const content = document.querySelector('.content');
    if (!content) return { error: 'no content' };

    // Scroll to the very bottom
    content.scrollTop = content.scrollHeight;

    const nav = document.querySelector('.bottom-nav');
    const navTop = nav ? nav.getBoundingClientRect().top : window.innerHeight;

    // Find the last visible button or card in the content area
    const allBtns = content.querySelectorAll('.cat-btn, .lp-btn, button, a.cat-btn');
    const lastBtn = allBtns[allBtns.length - 1];

    if (!lastBtn) return { error: 'no buttons found' };

    const btnRect = lastBtn.getBoundingClientRect();
    const isVisible = btnRect.bottom <= navTop;

    return {
      totalButtons: allBtns.length,
      lastButtonText: lastBtn.textContent.trim().substring(0, 40),
      lastButtonBottom: Math.round(btnRect.bottom),
      navTop: Math.round(navTop),
      isLastButtonVisible: isVisible,
      scrollHeight: content.scrollHeight,
      scrollTop: content.scrollTop,
      clientHeight: content.clientHeight
    };
  });

  console.log('\n=== SCROLL & LAST BUTTON CHECK ===');
  console.log('Total buttons in view:', scrollCheck.totalButtons);
  console.log('Last button text:', scrollCheck.lastButtonText);
  console.log('Last button bottom:', scrollCheck.lastButtonBottom);
  console.log('Nav top:', scrollCheck.navTop);
  console.log('Last button visible:', scrollCheck.isLastButtonVisible ? '✅ YES' : '❌ NO — CUT OFF');
  console.log('Content scroll: height=' + scrollCheck.scrollHeight + ', clientH=' + scrollCheck.clientHeight + ', scrollTop=' + scrollCheck.scrollTop);

  // Now check each section by navigating to it
  const sections = ['vocab', 'grammar', 'pronunciation', 'analysis', 'guides'];
  console.log('\n=== SECTION-BY-SECTION CHECK ===');

  for (const section of sections) {
    // Click the bottom nav button for this section
    const navBtn = await page.$(`button.bn-item[data-target="${section}"]`);
    if (!navBtn) {
      console.log(`${section}: ⚠️ no nav button found`);
      continue;
    }
    await navBtn.click();
    await page.waitForTimeout(300);

    const sectionCheck = await page.evaluate((sectionId) => {
      const content = document.querySelector('.content');
      if (!content) return { error: 'no content' };

      content.scrollTop = content.scrollHeight;

      const nav = document.querySelector('.bottom-nav');
      const navTop = nav ? nav.getBoundingClientRect().top : window.innerHeight;

      // Get the last element in the visible section
      const activeSection = document.querySelector(`.section[data-section="${sectionId}"]`) ||
                           document.querySelector(`[data-section="${sectionId}"]`);
      if (!activeSection) return { error: 'section not found: ' + sectionId };

      const lastChild = activeSection.querySelector(':scope > :last-child') ||
                       activeSection.lastElementChild;
      if (!lastChild) return { ok: true, note: 'empty section' };

      const rect = lastChild.getBoundingClientRect();
      return {
        ok: rect.bottom <= navTop,
        lastElementBottom: Math.round(rect.bottom),
        navTop: Math.round(navTop),
        gap: Math.round(navTop - rect.bottom)
      };
    }, section);

    if (sectionCheck.error) {
      console.log(`${section}: ⚠️ ${sectionCheck.error}`);
    } else if (sectionCheck.ok) {
      console.log(`${section}: ✅ OK (gap: ${sectionCheck.gap}px)`);
    } else {
      console.log(`${section}: ❌ CUT OFF by ${Math.round(sectionCheck.lastElementBottom - sectionCheck.navTop)}px`);
    }
  }

  // Take a screenshot of Resumen scrolled to bottom
  // Navigate back to resumen first
  const resumenBtn = await page.$('button.bn-item[data-target="resumen"]');
  if (resumenBtn) await resumenBtn.click();
  await page.waitForTimeout(300);
  await page.evaluate(() => {
    const content = document.querySelector('.content');
    if (content) content.scrollTop = content.scrollHeight;
  });
  await page.waitForTimeout(200);
  await page.screenshot({ path: '/Users/gsuarez/Documents/Code/Learn/HubFlow/scripts/tmp/iphone-resumen-bottom.png' });

  console.log('\n✅ Screenshot saved: iphone-resumen-bottom.png');

  await browser.close();
})();
