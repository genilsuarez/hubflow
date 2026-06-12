// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 15000,
  use: {
    headless: true,
    baseURL: 'file:///Users/gsuarez/Documents/Code/LearnHub',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
