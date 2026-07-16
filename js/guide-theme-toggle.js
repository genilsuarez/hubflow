(function() {
  const themeButton = document.getElementById('guideThemeToggle');
  if (!themeButton) return;

  const navTitle = document.querySelector('.nav-title');
  if (navTitle) {
    navTitle.classList.add('learnflow-guide-title');
    navTitle.textContent = 'HubFlow';
    navTitle.title = 'HubFlow';
  }

  const portalLink = document.createElement('a');
  portalLink.className = 'guide-theme-toggle';
  portalLink.href = '/deskflow/';
  portalLink.setAttribute('aria-label', 'Volver a LearnFlow');
  portalLink.title = 'Volver a LearnFlow';
  portalLink.textContent = '🏠';
  themeButton.before(portalLink);

  const hostname = location.hostname;
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.');
  if (isLocal) portalLink.href = `http://${hostname}:3000/`;

  function updateThemeButton() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeButton.textContent = isDark ? '☀️' : '🌙';
  }

  updateThemeButton();
  themeButton.addEventListener('click', function() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme === 'dark' ? 'dark' : '');
    localStorage.setItem('lp-theme', nextTheme);
    if (location.search.includes('theme=')) {
      const url = new URL(location.href);
      url.searchParams.set('theme', nextTheme);
      history.replaceState(null, '', url);
    }
    updateThemeButton();
  });

  portalLink.addEventListener('click', function() {
    if (!isLocal) return;
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const url = new URL(portalLink.href);
    url.searchParams.set('theme', theme);
    portalLink.href = url.toString();
  });
})();
