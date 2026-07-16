const { chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await page.goto('http://localhost:3000/hubflow/exercises/plural-endings.html');
  await page.waitForTimeout(2000);

  const widths = await page.evaluate(() => {
    const wrap = document.querySelector('.wrap');
    const header = document.querySelector('.header');
    const pillBar = document.querySelector('.pill-bar');
    const progress = document.querySelector('.progress');
    const fcCard = document.querySelector('.fc-card');
    const scrollBody = document.querySelector('.scroll-body');
    const studyArea = document.querySelector('[data-area="study"]');

    return {
      wrap: wrap ? { computed: getComputedStyle(wrap).maxWidth, actual: wrap.offsetWidth } : null,
      header: header ? { actual: header.offsetWidth } : null,
      pillBar: pillBar ? { actual: pillBar.offsetWidth } : null,
      progress: progress ? { actual: progress.offsetWidth } : null,
      fcCard: fcCard ? { computed: getComputedStyle(fcCard).maxWidth, actual: fcCard.offsetWidth } : null,
      scrollBody: scrollBody ? { actual: scrollBody.offsetWidth } : null,
      studyArea: studyArea ? { actual: studyArea.offsetWidth, display: getComputedStyle(studyArea).display } : null,
      viewportWidth: window.innerWidth,
    };
  });

  console.log(JSON.stringify(widths, null, 2));
  await browser.close();
})();
