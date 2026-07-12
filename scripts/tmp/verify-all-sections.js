const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ...devices['iPhone 14'] });
  const page = await context.newPage();
  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const sections = ['resumen', 'vocab', 'grammar', 'pronunciation', 'analysis', 'guides'];

  console.log('=== HubFlow Mobile Height Verification (iPhone 14) ===\n');

  // Initial layout check
  const layout = await page.evaluate(() => {
    const shell = document.querySelector('.shell');
    const nav = document.querySelector('.bottom-nav');
    return {
      viewport: window.innerHeight,
      shellBottom: Math.round(shell.getBoundingClientRect().bottom),
      navTop: Math.round(nav.getBoundingClientRect().top),
      navHeight: Math.round(nav.getBoundingClientRect().height)
    };
  });
  console.log(`Viewport: ${layout.viewport}px`);
  console.log(`Shell bottom: ${layout.shellBottom}px`);
  console.log(`Nav top: ${layout.navTop}px`);
  console.log(`Gap/overlap: ${layout.navTop - layout.shellBottom}px (0 = perfect)\n`);

  let allPassed = true;

  for (const section of sections) {
    // Click the nav button for this section
    const btn = await page.$(`button.bn-item[data-target="${section}"]`);
    if (btn) {
      await btn.click();
      await page.waitForTimeout(400);
    }

    const result = await page.evaluate(() => {
      const content = document.querySelector('.content');
      const nav = document.querySelector('.bottom-nav');
      if (!content || !nav) return { error: 'missing elements' };

      const navTop = nav.getBoundingClientRect().top;

      // Scroll to absolute bottom
      content.scrollTop = content.scrollHeight;

      // Get the active section
      const activeSection = content.querySelector('.section.active-section');
      if (!activeSection) return { error: 'no active section' };

      // Find the last visible element (button, card, or block-level child)
      const candidates = activeSection.querySelectorAll(
        '.cat-btn, .lp-btn, .guide-card, .resumen-card, .shelf, button:not(.bn-item):not(.sb-item), a[href]'
      );
      let lastVisible = null;
      let lastBottom = 0;

      for (const el of candidates) {
        const r = el.getBoundingClientRect();
        if (r.height > 0 && r.bottom > lastBottom) {
          lastVisible = el;
          lastBottom = r.bottom;
        }
      }

      // Fallback: use last child of the section
      if (!lastVisible) {
        const children = Array.from(activeSection.children);
        for (let i = children.length - 1; i >= 0; i--) {
          const r = children[i].getBoundingClientRect();
          if (r.height > 0) {
            lastVisible = children[i];
            lastBottom = r.bottom;
            break;
          }
        }
      }

      if (!lastVisible) return { ok: true, note: 'empty section' };

      const isOk = lastBottom <= navTop + 1; // 1px tolerance
      return {
        ok: isOk,
        lastElementBottom: Math.round(lastBottom),
        navTop: Math.round(navTop),
        gap: Math.round(navTop - lastBottom),
        lastElementText: lastVisible.textContent.trim().substring(0, 50),
        scrollHeight: content.scrollHeight,
        clientHeight: content.clientHeight
      };
    });

    if (result.error) {
      console.log(`${section}: ⚠️  ${result.error}`);
    } else if (result.ok) {
      console.log(`${section}: ✅ OK (last element "${result.lastElementText}" — gap: ${result.gap}px)`);
    } else {
      console.log(`${section}: ❌ CUT OFF by ${-result.gap}px (last: "${result.lastElementText}", bottom=${result.lastElementBottom}, navTop=${result.navTop})`);
      allPassed = false;
    }
  }

  console.log(`\n${allPassed ? '✅ ALL SECTIONS PASS' : '❌ SOME SECTIONS HAVE ISSUES'}`);

  // Screenshot resumen scrolled to bottom
  const resumenBtn = await page.$('button.bn-item[data-target="resumen"]');
  if (resumenBtn) {
    await resumenBtn.click();
    await page.waitForTimeout(300);
  }
  await page.evaluate(() => {
    const c = document.querySelector('.content');
    if (c) c.scrollTop = c.scrollHeight;
  });
  await page.waitForTimeout(200);
  await page.screenshot({ path: '/Users/gsuarez/Documents/Code/Learn/HubFlow/scripts/tmp/iphone14-resumen-scrolled.png' });
  console.log('\nScreenshot: iphone14-resumen-scrolled.png');

  await browser.close();
})();
