// Back button: append ?section= so index restores the category the user came from.
// Section comes from data/catalog.js (single source of truth for module category —
// see that file's header) instead of a hand-maintained map, so a newly added
// exercise never needs a second edit here to keep its back-link working.
import { MODULES } from '../data/catalog.js';

(function() {
  const file = location.pathname.split('/').pop().replace('.html', '');
  const mod = MODULES.find(function(m) {
    if (!m.exercise) return false;
    const exerciseFile = m.exercise.split('/').pop().split('#')[0].replace('.html', '');
    return exerciseFile === file;
  });
  const section = mod && mod.category;
  if (section) {
    const backLink = document.querySelector('a[href*="../index.html"]');
    if (backLink) {
      backLink.href = '../index.html?section=' + section;
      backLink.addEventListener('click', function() {
        sessionStorage.setItem('hf-back-section', section);
      });
    }
  }
})();

// Local dev: rewrite portal link to localhost
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  const pl = document.getElementById('portalLink');
  if (pl) pl.href = 'http://localhost:3000/';
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href*="localhost:"]');
    if (a) {
      const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const url = new URL(a.href);
      url.searchParams.set('theme', theme);
      a.href = url.toString();
    }
  });
}
