const { chromium } = require('/Users/gsuarez/.npm/_npx/361ceb562f3b3235/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  // Seed v2 hubflow data, then check DeskFlow reads it
  await page.goto('http://localhost:3000/hubflow/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.evaluate(() => {
    localStorage.setItem('learnflow:progress:hubflow:v2', JSON.stringify({
      schemaVersion: 1, app: 'hubflow', updatedAt: new Date().toISOString(),
      catalogVersion: 'hubflow-catalog-v1',
      summary: { progressPct: 25, completedContent: 5, totalContent: 62, attemptedContent: 10 },
      content: {}
    }));
    localStorage.setItem('learnflow:activity:hubflow:v2', JSON.stringify({
      schemaVersion: 1, app: 'hubflow', updatedAt: new Date().toISOString(),
      events: [{
        eventId: 'e1', runId: 'r1', app: 'hubflow', contentId: 'vocabulary',
        title: 'Vocabulary Match', activity: 'practice', eventType: 'attempt_completed',
        occurredAt: new Date().toISOString(), scorePct: 85, passed: true
      }]
    }));
  });

  await page.goto('http://localhost:3000/deskflow/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(1500);
  
  const pageText = await page.textContent('body');
  console.log('DeskFlow sees HubFlow progress:', pageText.includes('25%') ? '✓' : '✗');
  console.log('DeskFlow sees HubFlow activity:', pageText.includes('Vocabulary Match') ? '✓' : '✗');
  
  await page.screenshot({ path: 'scripts/tmp/deskflow-v2-check.png', fullPage: false });
  console.log('Screenshot saved');
  await browser.close();
})();
