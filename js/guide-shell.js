/**
 * HubFlow guide pages — auth/sync + nav actions (login, about).
 * Requires: lp-theme, lp-platform-urls, lp-nav-icons, lp-guest-reset, lp-login,
 *           lp-nav-helpers, lp-about (+ css), lp-about-content.js
 */
import { setupSupabaseAuth } from './lp-auth-setup.js';
import { hydrateHubFlowFromCloud } from './utils.js';

setupSupabaseAuth({
  onAfterLogin: () => hydrateHubFlowFromCloud(),
  onAfterLogout: () => hydrateHubFlowFromCloud(),
});

function ensureNavActions() {
  const navBar = document.querySelector('.nav-bar');
  if (!navBar) return;

  let actions = navBar.querySelector('.guide-nav-actions');
  if (!actions) {
    actions = document.createElement('div');
    actions.className = 'guide-nav-actions';
    navBar.appendChild(actions);
  }

  if (!document.getElementById('guideThemeToggle')) {
    const themeBtn = document.createElement('button');
    themeBtn.type = 'button';
    themeBtn.className = 'guide-theme-toggle';
    themeBtn.id = 'guideThemeToggle';
    themeBtn.setAttribute('aria-label', 'Cambiar tema');
    themeBtn.textContent = '🌙';
    actions.appendChild(themeBtn);
  }

  if (!document.getElementById('guideLoginBtn')) {
    const loginBtn = document.createElement('button');
    loginBtn.type = 'button';
    loginBtn.className = 'guide-login-btn';
    loginBtn.id = 'guideLoginBtn';
    loginBtn.setAttribute('aria-label', 'Iniciar sesión');
    loginBtn.innerHTML = '<span id="guideLoginLabel">👤</span>';
    actions.appendChild(loginBtn);
  }

  if (!document.getElementById('guideAboutBtn')) {
    const aboutBtn = document.createElement('button');
    aboutBtn.type = 'button';
    aboutBtn.className = 'guide-about-btn';
    aboutBtn.id = 'guideAboutBtn';
    aboutBtn.setAttribute('aria-label', 'About LearnFlow');
    aboutBtn.textContent = 'ℹ️';
    actions.appendChild(aboutBtn);
  }
}

ensureNavActions();

if (typeof lpLogin !== 'undefined') {
  lpLogin.bindNavButton('#guideLoginBtn', {
    labelSelector: '#guideLoginLabel',
  });
}

document.getElementById('guideAboutBtn')?.addEventListener('click', (event) => {
  if (typeof lpAbout !== 'undefined') lpAbout.open(event);
});

// Theme toggle (guide-theme-toggle.js pattern, inlined for single module load)
(function initGuideThemeToggle() {
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
  themeButton.addEventListener('click', () => {
    if (window.LPTheme) {
      window.LPTheme.toggleTheme();
    }
    updateThemeButton();
  });
})();
