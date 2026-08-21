/**
 * HubFlow — Guide Shell
 * Lightweight sidebar + hamburger for guide pages (no ES modules, no exercise logic).
 * Mirrors exercise-shell.js sidebar UX without the exercise-specific parts.
 */
/* eslint-disable no-var */
(function () {
  'use strict';

  // Algunas páginas de guía incluyen este script dos veces (bug recurrente
  // en la plantilla de generación). Sin este guard, la segunda ejecución
  // reconstruye el hamburger/sidebar y produce un botón duplicado/roto.
  if (window.__hfGuideShellInit) return;
  window.__hfGuideShellInit = true;

  var NAVIGATION_MODE_KEY = 'hf-navigation-mode';

  function navigationMode() {
    return localStorage.getItem(NAVIGATION_MODE_KEY) === 'floating' ? 'floating' : 'sidebar';
  }

  function isPersistent() {
    return window.innerWidth >= 861 && navigationMode() === 'sidebar';
  }

  function themedAppHref(app) {
    return window.LpNavHelpers ? window.LpNavHelpers.themedAppHref(app) : ('/' + app + '/');
  }

  function navIcon(name) {
    return window.LpNavHelpers ? window.LpNavHelpers.navIcon(name) : '';
  }

  function currentTheme() {
    return window.LpNavHelpers ? window.LpNavHelpers.currentTheme() : 'light';
  }

  function currentThemeIcon() {
    return window.LpNavHelpers ? window.LpNavHelpers.currentThemeIcon() : '';
  }

  function toggleTheme() {
    if (window.LpNavHelpers) window.LpNavHelpers.toggleTheme();
  }

  // NAV items — mirrors the primary nav from exercise-shell
  var NAV_ITEMS = [
    { key: 'home',     href: '../index.html',              icon: 'home',    label: 'Inicio' },
    { key: 'all',      href: '../index.html?section=all',  icon: 'book',    label: 'Ejercicios' },
    { key: 'grammar',  href: '../index.html?section=grammar', icon: 'grammar', label: 'Grammar' },
    { key: 'vocab',    href: '../index.html?section=vocab',   icon: 'star',    label: 'Vocabulary' },
    { key: 'reading',  href: '../index.html?section=reading', icon: 'reading', label: 'Reading' },
    { key: 'guides',   href: '../index.html?section=guides',  icon: 'guide',   label: 'Guides',  active: true },
  ];

  function renderItems() {
    return NAV_ITEMS.map(function (s) {
      var active = s.active ? ' active' : '';
      var icon = navIcon(s.icon) || '<span aria-hidden="true">•</span>';
      return '<a class="sb-item' + active + '" href="' + s.href + '">'
        + '<span class="sb-icon">' + icon + '</span>'
        + '<span class="sb-label">' + s.label + '</span>'
        + '</a>';
    }).join('');
  }

  function buildSidebar(hamburgerBtn) {
    var scrim = document.createElement('div');
    scrim.className = 'lp-drawer-scrim';
    scrim.id = 'guideSidebarScrim';
    scrim.setAttribute('aria-hidden', 'true');

    var sidebar = document.createElement('aside');
    sidebar.className = 'sidebar lp-drawer';
    sidebar.id = 'guideSidebar';
    sidebar.setAttribute('aria-label', 'Navegación HubFlow');

    var loginLabel = (typeof lpLogin !== 'undefined' && lpLogin.getUser())
      ? lpLogin.getUser().name : 'Iniciar Sesión';
    var themeLabel = currentTheme() === 'dark' ? 'Modo claro' : 'Modo oscuro';

    sidebar.innerHTML = ''
      + '<div class="sb-brand">'
      +   '<span class="sb-mark" aria-hidden="true">H</span>'
      +   '<div><h1>HubFlow</h1><span class="sb-tag">LearnFlow</span></div>'
      +   '<button class="lp-icon-btn nav-mode-toggle" id="sbNavModeToggle" type="button"'
      +     ' aria-label="Cambiar modo de navegación" title="Cambiar modo de navegación">'
      +     '<span aria-hidden="true">◫</span></button>'
      + '</div>'
      + '<nav class="sb-nav" id="sbNav">' + renderItems() + '</nav>'
      + '<div class="sidebar-footer">'
      +   '<button class="sb-item" id="sbAboutBtn" type="button">'
      +     '<span class="sb-icon">' + navIcon('info') + '</span>'
      +     '<span class="sb-label">About LearnFlow</span>'
      +   '</button>'
      +   '<button class="sb-item" id="sbThemeBtn" type="button">'
      +     '<span class="sb-icon" id="sbThemeIcon">' + currentThemeIcon() + '</span>'
      +     '<span class="sb-label" id="sbThemeLabel">' + themeLabel + '</span>'
      +   '</button>'
      +   '<button class="sb-item" id="sbLoginBtn" type="button" aria-label="Iniciar sesión">'
      +     '<span class="sb-icon">' + navIcon('user') + '</span>'
      +     '<span class="sb-label" id="sbLoginLabel">' + loginLabel + '</span>'
      +   '</button>'
      +   '<a class="sb-item" href="' + themedAppHref('deskflow') + '" aria-label="Volver a LearnFlow">'
      +     '<span class="sb-icon">' + navIcon('home') + '</span>'
      +     '<span class="sb-label">Portal</span>'
      +   '</a>'
      + '</div>';

    document.body.prepend(scrim, sidebar);

    function openSidebar() {
      sidebar.classList.add('is-open');
      scrim.classList.add('is-open');
      scrim.setAttribute('aria-hidden', 'false');
    }

    function closeSidebar() {
      if (isPersistent()) return;
      sidebar.classList.remove('is-open');
      scrim.classList.remove('is-open');
      scrim.setAttribute('aria-hidden', 'true');
    }

    function applyMode() {
      if (isPersistent()) {
        sidebar.classList.add('is-open', 'is-persistent');
        scrim.classList.remove('is-open');
        document.body.classList.add('has-sidebar');
        if (hamburgerBtn) hamburgerBtn.style.display = 'none';
      } else {
        sidebar.classList.remove('is-open', 'is-persistent');
        document.body.classList.remove('has-sidebar');
        scrim.classList.remove('is-open');
        if (hamburgerBtn) hamburgerBtn.style.display = '';
      }
    }

    applyMode();
    window.addEventListener('resize', applyMode);
    window.addEventListener('storage', function (e) {
      if (e.key === NAVIGATION_MODE_KEY) applyMode();
    });

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openSidebar);
    scrim.addEventListener('click', closeSidebar);

    // Keyboard: Escape closes
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSidebar();
    });

    // Nav mode toggle
    var modeToggle = document.getElementById('sbNavModeToggle');
    if (modeToggle) {
      modeToggle.addEventListener('click', function () {
        var next = navigationMode() === 'sidebar' ? 'floating' : 'sidebar';
        localStorage.setItem(NAVIGATION_MODE_KEY, next);
        applyMode();
        if (next === 'floating') closeSidebar();
      });
    }

    // Theme toggle
    var themeBtn = document.getElementById('sbThemeBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        toggleTheme();
        var icon = document.getElementById('sbThemeIcon');
        var label = document.getElementById('sbThemeLabel');
        if (icon) icon.innerHTML = currentThemeIcon();
        if (label) label.textContent = currentTheme() === 'dark' ? 'Modo claro' : 'Modo oscuro';
      });
    }

    // About modal
    var aboutBtn = document.getElementById('sbAboutBtn');
    if (aboutBtn) {
      aboutBtn.addEventListener('click', function (event) {
        if (typeof lpAbout !== 'undefined') lpAbout.open(event);
        closeSidebar();
      });
    }

    // Login trigger
    if (typeof lpLogin !== 'undefined') {
      lpLogin.bindNavButton('#sbLoginBtn', { beforeOpen: closeSidebar, labelSelector: '#sbLoginLabel' });
      lpLogin.onUpdate && lpLogin.onUpdate(function (user) {
        var label = document.getElementById('sbLoginLabel');
        if (label) label.textContent = user ? user.name : 'Iniciar Sesión';
      });
    }
  }

  function init() {
    var topBar = document.querySelector('.top-bar');
    if (!topBar) return;

    // Guard: don't run twice
    if (topBar.dataset.guideShellInit) return;
    topBar.dataset.guideShellInit = '1';

    // Hoist top-bar to body (same as exercise-shell) so it spans full width
    var wrap = topBar.closest('.wrap, .page');
    if (wrap) document.body.insertBefore(topBar, wrap);

    // top-bar is position:relative (not fixed), no padding-top compensation needed

    // Replace "Reference Guide" with the page's h1 text
    var navTitle = topBar.querySelector('.nav-title');
    if (navTitle) {
      var h1 = document.querySelector('.page h1, main h1, h1');
      if (h1) navTitle.textContent = h1.textContent.trim();
    }

    // Create hamburger button
    var hamburgerBtn = document.createElement('button');
    hamburgerBtn.type = 'button';
    hamburgerBtn.className = 'lp-icon-btn';
    hamburgerBtn.innerHTML = navIcon('menu') || '<span aria-hidden="true">☰</span>';
    hamburgerBtn.setAttribute('aria-label', 'Abrir navegación');
    hamburgerBtn.setAttribute('aria-controls', 'guideSidebar');
    hamburgerBtn.setAttribute('aria-expanded', 'false');

    topBar.prepend(hamburgerBtn);

    buildSidebar(hamburgerBtn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
