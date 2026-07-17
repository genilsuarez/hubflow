const { chromium } = require('/Users/gsuarez/.npm/_npx/361ceb562f3b3235/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  // Load HubFlow fresh — should be empty
  await page.goto('http://localhost:3000/hubflow/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(1000);

  // Check localStorage for v2 keys (publishHubFlowProgress runs on load)
  const keys = await page.evaluate(() => {
    return Object.keys(localStorage).filter(k => k.includes('hubflow'));
  });
  console.log('HubFlow keys in localStorage:', keys);

  const hasV2Progress = keys.includes('learnflow:progress:hubflow:v2');
  const hasV1Progress = keys.includes('learnflow:progress:hubflow:v1');
  console.log('v2 progress key:', hasV2Progress ? '✓' : '✗');
  console.log('v1 progress key still written:', hasV1Progress ? '✗ BAD' : '✓ Not written');

  // Check the progress content
  const progressData = await page.evaluate(() => {
    return JSON.parse(localStorage.getItem('learnflow:progress:hubflow:v2') || 'null');
  });
  console.log('Progress summary:', progressData?.summary);

  await browser.close();
})();
