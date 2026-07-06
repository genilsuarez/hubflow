const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = '/Users/gsuarez/Documents/Code/Learn/HubFlow';

// Simple static file server
const server = http.createServer((req, res) => {
  let filePath = path.join(ROOT, req.url === '/' ? '/index.html' : req.url);
  const ext = path.extname(filePath);
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
  };
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found: ' + filePath);
      return;
    }
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    res.end(data);
  });
});

server.listen(3456, async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));

  // Load index
  await page.goto('http://localhost:3456/');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(ROOT, 'scripts/tmp/server-index.png') });
  console.log('Index URL:', page.url());

  // Click first book link
  await page.click('.book');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(ROOT, 'scripts/tmp/server-exercise.png') });
  console.log('Exercise URL:', page.url());
  console.log('Exercise title:', await page.title());

  // Check for errors
  if (errors.length > 0) {
    console.log('ERRORS:', JSON.stringify(errors, null, 2));
  } else {
    console.log('No errors');
  }

  // Click back
  const backLink = await page.$('.back-link');
  if (backLink) {
    await backLink.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(ROOT, 'scripts/tmp/server-back.png') });
    console.log('Back URL:', page.url());
  }

  await browser.close();
  server.close();
});
