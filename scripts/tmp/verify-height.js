const playwright = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext({
    ...playwright.devices['iPhone 14'],
  });
  const page = await context.newPage();
  await page.goto('http://localhost:3002');
  await page.waitForTimeout(1000);

  // Check shell and bottom-nav positions
  const metrics = await page.evaluate(() => {
    const shell = document.querySelector('.shell');
    const nav = document.querySelector('.bottom-nav');
    const content = document.querySelector('.content');
    const shellRect = shell.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const shellStyles = getComputedStyle(shell);
    
    // Check if content bottom overlaps with nav top
    const overlap = shellRect.bottom - navRect.top;
    
    // Scroll the content to the bottom
    content.scrollTop = content.scrollHeight;
    
    // After scrolling, check the last visible element
    const sections = document.querySelectorAll('.section');
    let activeSection = null;
    sections.forEach(s => { if (s.classList.contains('active-section')) activeSection = s; });
    
    const lastChild = activeSection ? activeSection.lastElementChild : null;
    const lastChildRect = lastChild ? lastChild.getBoundingClientRect() : null;
    
    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      shell: { top: shellRect.top, bottom: shellRect.bottom, height: shellRect.height },
      nav: { top: navRect.top, bottom: navRect.bottom, height: navRect.height },
      content: { top: contentRect.top, bottom: contentRect.bottom, height: contentRect.height, scrollHeight: content.scrollHeight, scrollTop: content.scrollTop, clientHeight: content.clientHeight },
      overlap,
      shellHeight: shellStyles.height,
      lastChildBottom: lastChildRect ? lastChildRect.bottom : null,
      lastChildVisible: lastChildRect ? lastChildRect.bottom <= navRect.top : null,
    };
  });

  console.log('=== iPhone 14 Height Verification ===');
  console.log(JSON.stringify(metrics, null, 2));
  
  if (metrics.overlap > 0) {
    console.log('\n❌ PROBLEM: Shell bottom overlaps nav by', metrics.overlap, 'px');
  } else {
    console.log('\n✅ OK: Shell bottom does not overlap nav (gap:', Math.abs(metrics.overlap), 'px)');
  }
  
  if (metrics.lastChildVisible === false) {
    console.log('❌ PROBLEM: Last child of active section is hidden behind nav');
  } else if (metrics.lastChildVisible === true) {
    console.log('✅ OK: Last child of active section is visible above nav');
  }

  // Screenshot scrolled to bottom
  await page.screenshot({ path: 'HubFlow/scripts/tmp/iphone14-bottom-check.png', fullPage: false });
  console.log('\nScreenshot saved.');

  await browser.close();
})();
