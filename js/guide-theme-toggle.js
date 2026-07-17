(function() {
  const themeButton = document.getElementById('guideThemeToggle');
  if (!themeButton) return;

  const navTitle = document.querySelector('.nav-title');
  if (navTitle) {
    navTitle.classList.add('learnflow-guide-title');
    navTitle.textContent = 'HubFlow';
    navTitle.title = 'HubFlow';
  }

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

})();
