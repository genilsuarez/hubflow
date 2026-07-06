const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  // Load index
  await page.goto('file:///Users/gsuarez/Documents/Code/Learn/HubFlow/index.html');
  await page.waitForTimeout(500);
  
  // Collect console errors
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));
  
  // Click first book (ing-spelling)
  await page.click('.book');
  await page.waitForTimeout(1500);
  
  // Screenshot after navigation
  await page.screenshot({ path: '/Users/gsuarez/Documents/Code/Learn/HubFlow/scripts/tmp/after-click.png' });
  
  // Check current URL
  console.log('URL after click:', page.url());
  console.log('Page title:', await page.title());
  
  // Check if there are JS errors
  if (errors.length > 0) {
    console.log('ERRORS:', JSON.stringify(errors, null, 2));
  } else {
    console.log('No JS errors detected');
  }
  
  // Try clicking back link
  const backLink = await page.$('.back-link');
  if (backLink) {
    console.log('Back link found, clicking...');
    await backLink.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '/Users/gsuarez/Documents/Code/Learn/HubFlow/scripts/tmp/after-back.png' });
    console.log('URL after back:', page.url());
  } else {
    console.log('No back link found!');
  }
  
  await browser.close();
})();
