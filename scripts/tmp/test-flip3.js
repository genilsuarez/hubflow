const playwright = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'log') console.log('[page]', msg.text());
  });
  page.on('pageerror', err => console.log('[page-error]', err.message));

  // Intercept FlashcardEngine constructor to count instances
  await page.goto('about:blank');
  await page.evaluate(() => {
    window.__engineInstances = 0;
  });
  
  await page.goto('http://localhost:3002/exercises/vocabulary');
  await page.waitForSelector('#fcCard', { timeout: 5000 });

  // Check via getEventListeners equivalent - use debug approach
  // Count by observing the event propagation
  await page.evaluate(() => {
    const card = document.getElementById('fcCard');
    let clickCount = 0;
    // Wrap addEventListener to count future adds
    const orig = EventTarget.prototype.addEventListener;
    // Check if we can use Chrome DevTools protocol
    console.log('Card tagName:', card.tagName);
    console.log('Card id:', card.id);
    
    // Test: remove the card's listeners by cloning
    const parent = card.parentNode;
    const clone = card.cloneNode(true);
    parent.replaceChild(clone, card);
    
    // Now click the clone (should have 0 listeners)
    clone.click();
    const afterClone = clone.classList.contains('flip');
    console.log('After clone click (no listeners):', afterClone);
    
    // Put original back
    parent.replaceChild(card, clone);
  });

  await browser.close();
})();
