/**
 * Patch HubFlow guides with dark mode support:
 * 1. Add theme init script in <head> (before first <link rel="stylesheet">)
 * 2. Complete missing dark mode variables (--ink-soft, --red-dark, --blue-dark, --green-dark, --yellow, --orange, --teal, --purple)
 * 3. Add theme toggle button in nav-bar
 * 4. Add toggle CSS + JS at bottom
 */

const fs = require('fs');
const path = require('path');

const guidesDir = path.join(__dirname, '../../guides');
const files = fs.readdirSync(guidesDir).filter(f => f.endsWith('.html'));

// Theme init script (same as index.html uses)
const THEME_INIT_SCRIPT = `<script>var p=new URLSearchParams(location.search).get('theme'),t=p||localStorage.getItem('lp-theme');if(p)localStorage.setItem('lp-theme',p);if(t==='dark')document.documentElement.setAttribute('data-theme','dark')</script>`;

// Dark variables that are commonly missing
const DARK_VARS_TO_ADD = `--ink-soft:#b0b8c4;--red-dark:#FF9F9F;--blue-dark:#7AC7FF;--green-dark:#6FE8A8;--yellow:#E8C468;--orange:#F4A861;--teal:#5ED4CC;--purple:#C4A5FF;`;

// Theme toggle button HTML
const TOGGLE_BTN_HTML = `<button class="guide-theme-toggle" id="guideThemeToggle" aria-label="Toggle theme">🌙</button>`;

// Theme toggle CSS (inserted before </style>)
const TOGGLE_CSS = `
/* THEME TOGGLE */
.guide-theme-toggle{
  width:36px;height:36px;border-radius:50%;border:1.5px solid var(--border);
  background:var(--surface);cursor:pointer;font-size:1rem;display:flex;
  align-items:center;justify-content:center;transition:transform .2s,border-color .2s;
  min-width:44px;min-height:44px;
}
.guide-theme-toggle:hover{transform:scale(1.08);border-color:var(--blue,var(--yellow));}
.guide-theme-toggle:focus-visible{outline:2px solid var(--blue,#2F6FD8);outline-offset:2px;}
.nav-bar{gap:8px;}
`;

// Theme toggle JS (inserted before </body>)
const TOGGLE_JS = `<script>
(function(){
  var btn=document.getElementById('guideThemeToggle');
  if(!btn)return;
  function upd(){var d=document.documentElement.getAttribute('data-theme')==='dark';btn.textContent=d?'☀️':'🌙';}
  upd();
  btn.addEventListener('click',function(){
    var isDark=document.documentElement.getAttribute('data-theme')==='dark';
    var next=isDark?'light':'dark';
    document.documentElement.setAttribute('data-theme',next==='dark'?'dark':'');
    localStorage.setItem('lp-theme',next);
    if(location.search.includes('theme=')){var u=new URL(location.href);u.searchParams.set('theme',next);history.replaceState(null,'',u);}
    upd();
  });
})();
</script>`;

let patchedCount = 0;
let skippedCount = 0;

for (const file of files) {
  const filePath = path.join(guidesDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Add theme init script if missing
  if (!html.includes("localStorage.getItem('lp-theme')") && !html.includes('localStorage.getItem("lp-theme")')) {
    // Insert before first <link rel="stylesheet"
    const linkMatch = html.match(/<link\s+rel="stylesheet"/);
    if (linkMatch) {
      const idx = html.indexOf(linkMatch[0]);
      html = html.slice(0, idx) + THEME_INIT_SCRIPT + '\n' + html.slice(idx);
      modified = true;
    }
  }

  // 2. Complete dark variables - add missing ones to existing [data-theme="dark"] block
  const darkBlockRegex = /\[data-theme="dark"\]\s*\{([^}]+)\}/;
  const darkMatch = html.match(darkBlockRegex);
  if (darkMatch) {
    const existingBlock = darkMatch[1];
    let additions = '';

    if (!existingBlock.includes('--ink-soft')) additions += '--ink-soft:#b0b8c4;';
    if (!existingBlock.includes('--red-dark')) additions += '--red-dark:#FF9F9F;';
    if (!existingBlock.includes('--blue-dark')) additions += '--blue-dark:#7AC7FF;';
    if (!existingBlock.includes('--green-dark')) additions += '--green-dark:#6FE8A8;';
    // Only add --yellow if it's in root but not in dark (some guides use different accent)
    if (existingBlock.includes('--yellow-light') && !existingBlock.includes('--yellow:') && html.includes('--yellow:')) {
      additions += '--yellow:#E8C468;';
    }
    if (existingBlock.includes('--orange-light') && !existingBlock.includes('--orange:') && html.includes('--orange:')) {
      additions += '--orange:#F4A861;';
    }
    if (existingBlock.includes('--teal-light') && !existingBlock.includes('--teal:') && html.includes('--teal:')) {
      additions += '--teal:#5ED4CC;';
    }
    if (!existingBlock.includes('--purple:') && html.includes('--purple:')) {
      additions += '--purple:#C4A5FF;';
    }

    if (additions) {
      // Insert additions at the end of the dark block (before closing })
      const newBlock = darkMatch[0].replace(/\}\s*$/, additions + '}');
      html = html.replace(darkMatch[0], newBlock);
      modified = true;
    }
  }

  // 3. Add theme toggle CSS before </style> (if not already present)
  if (!html.includes('guide-theme-toggle') && !html.includes('theme-btn')) {
    const styleEnd = html.lastIndexOf('</style>');
    if (styleEnd !== -1) {
      html = html.slice(0, styleEnd) + TOGGLE_CSS + html.slice(styleEnd);
      modified = true;
    }
  }

  // 4. Add toggle button in nav-bar (after nav-title or at end of nav)
  if (!html.includes('guideThemeToggle') && !html.includes('themeBtn')) {
    // Pattern 1: has nav-title span
    const navTitlePattern = /<span class="nav-title">Reference Guide<\/span>/;
    if (navTitlePattern.test(html)) {
      html = html.replace(navTitlePattern, `<span class="nav-title">Reference Guide</span>\n  ${TOGGLE_BTN_HTML}`);
      modified = true;
    } else {
      // Pattern 2: look for </nav> and insert before it
      const navCloseIdx = html.indexOf('</nav>');
      if (navCloseIdx !== -1) {
        html = html.slice(0, navCloseIdx) + `  ${TOGGLE_BTN_HTML}\n` + html.slice(navCloseIdx);
        modified = true;
      }
    }
  }

  // 5. Add toggle JS before </body> (if not already present)
  if (!html.includes('guideThemeToggle') || (!html.includes("btn.addEventListener('click'") && !html.includes('toggleTheme'))) {
    // Only add if we added our toggle button
    if (html.includes('guideThemeToggle') && !html.includes("btn.addEventListener('click'")) {
      const bodyEnd = html.lastIndexOf('</body>');
      if (bodyEnd !== -1) {
        html = html.slice(0, bodyEnd) + TOGGLE_JS + '\n' + html.slice(bodyEnd);
        modified = true;
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    patchedCount++;
    console.log(`PATCHED: ${file}`);
  } else {
    skippedCount++;
    console.log(`SKIPPED: ${file} (already has dark mode)`);
  }
}

console.log(`\nDone: ${patchedCount} patched, ${skippedCount} skipped.`);
