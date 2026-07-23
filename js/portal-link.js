// Back button: use history.back() for instant navigation when the user came from
// the index. Falls back to ?section= link for direct visits (bookmarks, external links).
import { MODULES } from '../data/catalog.js';

(function() {
  const file = location.pathname.split('/').pop().replace('.html', '');
  const mod = MODULES.find(function(m) {
    if (!m.exercise) return false;
    const exerciseFile = m.exercise.split('/').pop().split('#')[0].replace('.html', '');
    return exerciseFile === file;
  });
  const section = mod && mod.category;
  if (!section) return;

  const backLink = document.querySelector('a[href*="../index.html"]');
  if (!backLink) return;

  // Always set href as fallback (direct visits, or if history.back fails).
  // Deliberately NOT "../index.html?section=..." — the local dev server (serve,
  // cleanUrls:true) redirects .html URLs to their extensionless form and drops
  // the query string in that redirect, silently landing on "resumen" instead
  // (same gotcha documented in exercises/vocabulary.html's own pack routing,
  // which is why that one uses a hash instead). "../" resolves the same way
  // in both local dev and static hosting (GitHub Pages) without a redirect.
  backLink.href = '../?section=' + section;

  // If the referrer is the index (user came from there), use history.back for instant restore
  var fromIndex = document.referrer && (
    document.referrer.includes('/index.html') ||
    document.referrer.replace(/\?.*$/, '').replace(/\/$/, '').endsWith(location.pathname.replace(/\/exercises\/.*$/, ''))
  );

  backLink.addEventListener('click', function(e) {
    sessionStorage.setItem('hf-back-section', section);
    if (fromIndex && history.length > 1) {
      e.preventDefault();
      history.back();
    }
  });
})();

const portalLink = document.getElementById('portalLink');
if (portalLink) {
  let href = window.LPPlatformUrls ? window.LPPlatformUrls.portalHref() : '/deskflow/';
  portalLink.setAttribute('aria-label', 'Volver a LearnFlow');
  portalLink.title = 'Volver a LearnFlow';
  if (window.LPTheme) href = window.LPTheme.appendThemeToHref(href);
  portalLink.href = href;
}
