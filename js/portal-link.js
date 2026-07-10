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
