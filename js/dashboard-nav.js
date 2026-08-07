/* ═══════════════════════════════════════════════════════
   HubFlow Dashboard — Navigation Shell
   Theme toggle, navigation drawer/mode, about/login triggers. Self-
   initializing. The two functions setActive() needs to call back into
   (`syncTopbarNavButtons`, `setNavigationDrawerOpen`) are returned.
   ═══════════════════════════════════════════════════════ */

import { CATEGORIES } from '../data/catalog.js';
import { NAV_SECTION_KEYS } from './nav-sections.js';

export function initDashboardNav() {
  const themeBtns = [...document.querySelectorAll('.theme-toggle')];
  function upd() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeBtns.forEach((button) => {
      const icon = button.querySelector('.sb-icon');
      const label = button.querySelector('.sb-label');
      if (icon) {
        if (window.LpNavIcons) window.LpNavIcons.setTheme(icon, isDark);
      } else {
        button.textContent = isDark ? '☀️' : '🌙';
      }
      if (label) label.textContent = isDark ? 'Modo claro' : 'Modo oscuro';
      button.setAttribute('aria-label', isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
    });
  }
  upd();
  themeBtns.forEach((b) => {
    b.onclick = () => {
      window.LpNavHelpers?.toggleTheme(b.querySelector('.sb-icon'));
      upd();
    };
  });

  // Unified navigation mode
  const NAVIGATION_MODE_KEY = 'lp-navigation-mode';
  const NAVIGATION_MODES = new Set(['sidebar', 'floating']);
  const sidebar = document.getElementById('sidebar');
  const sidebarScrim = document.getElementById('sidebarScrim');
  const navigationLauncher = document.getElementById('navigationLauncher');
  const navigationModeToggle = document.getElementById('navigationModeToggle');
  const topbar = document.querySelector('.topbar');
  const topbarMenuToggle = document.getElementById('topbarMenuToggle');
  // Las secciones de catálogo son las 4 categorías + la de guías; las de
  // resumen son el resto. Derivadas para que agregar una categoría no exija
  // acordarse de tocar esta línea.
  const CATALOG_SECTIONS = new Set([...Object.keys(CATEGORIES), 'guides', 'all']);
  const OVERVIEW_SECTIONS = new Set(NAV_SECTION_KEYS.filter((k) => !CATALOG_SECTIONS.has(k)));

  function syncDrawerPersistent() {
    const persistent = window.innerWidth >= 861 && document.documentElement.dataset.navigationMode === 'sidebar';
    sidebar.classList.toggle('is-persistent', persistent);
  }

  function setNavigationDrawerOpen(open) {
    sidebar.classList.toggle('is-open', open);
    sidebarScrim.classList.toggle('is-open', open);
    sidebarScrim.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('lp-drawer-open', open);
    const openLabel = 'Cerrar navegación';
    const closedLabel = 'Abrir navegación';
    if (navigationLauncher) {
      navigationLauncher.setAttribute('aria-expanded', String(open));
      navigationLauncher.setAttribute('aria-label', open ? openLabel : 'Abrir navegación flotante');
    }
    if (topbarMenuToggle) {
      topbarMenuToggle.setAttribute('aria-expanded', String(open));
      topbarMenuToggle.setAttribute('aria-label', open ? openLabel : closedLabel);
    }
    if (open && typeof lpLogin !== 'undefined' && lpLogin.refreshNavLabels) {
      lpLogin.refreshNavLabels();
    }
  }

  function setNavigationMode(mode, persist = false) {
    const resolvedMode = NAVIGATION_MODES.has(mode) ? mode : 'sidebar';
    const isFloating = resolvedMode === 'floating';
    document.documentElement.dataset.navigationMode = resolvedMode;
    navigationModeToggle.setAttribute('aria-pressed', String(isFloating));
    navigationModeToggle.setAttribute('aria-label', isFloating ? 'Usar barra lateral fija' : 'Usar navegación flotante');
    navigationModeToggle.title = isFloating ? 'Muestra la barra lateral fija' : 'Oculta la barra lateral y usa un menú flotante';
    const icon = navigationModeToggle.querySelector('span');
    if (icon) icon.textContent = isFloating ? '▣' : '◫';
    if (persist) localStorage.setItem(NAVIGATION_MODE_KEY, resolvedMode);
    syncDrawerPersistent();
    setNavigationDrawerOpen(false);
    const active = document.body.dataset.active;
    if (active) syncTopbarNavButtons(!OVERVIEW_SECTIONS.has(active));
  }

  syncDrawerPersistent();
  window.addEventListener('resize', syncDrawerPersistent);

  function syncTopbarNavButtons(isSecondaryTopbar) {
    const isDesktop = window.innerWidth >= 861;
    const isFloating = document.documentElement.dataset.navigationMode === 'floating';
    if (topbarMenuToggle) topbarMenuToggle.hidden = !isSecondaryTopbar || isDesktop;
    if (navigationLauncher) {
      navigationLauncher.hidden = isSecondaryTopbar ? !(isDesktop && isFloating) : false;
    }
    if (topbar) topbar.classList.toggle('topbar--secondary', isSecondaryTopbar);
  }

  window.addEventListener('resize', () => {
    const active = document.body.dataset.active;
    if (active) syncTopbarNavButtons(!OVERVIEW_SECTIONS.has(active));
  });
  setNavigationMode(localStorage.getItem(NAVIGATION_MODE_KEY));
  navigationModeToggle.addEventListener('click', () => {
    const nextMode = document.documentElement.dataset.navigationMode === 'floating' ? 'sidebar' : 'floating';
    setNavigationMode(nextMode, true);
  });
  document.getElementById('drawerCloseBtn')?.addEventListener('click', () => setNavigationDrawerOpen(false));
  navigationLauncher.addEventListener('click', () => setNavigationDrawerOpen(!sidebar.classList.contains('is-open')));
  if (topbarMenuToggle) {
    topbarMenuToggle.addEventListener('click', () => setNavigationDrawerOpen(!sidebar.classList.contains('is-open')));
  }
  sidebarScrim.addEventListener('click', () => setNavigationDrawerOpen(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setNavigationDrawerOpen(false);
  });

  function setupSidebarScrollHint() {
    const nav = document.getElementById('sbNav');
    if (!nav) return;

    function syncNavScrollHint() {
      const atEnd = nav.scrollHeight - nav.scrollTop <= nav.clientHeight + 2;
      nav.classList.toggle('is-scroll-end', atEnd);
    }

    nav.addEventListener('scroll', syncNavScrollHint, { passive: true });
    window.addEventListener('resize', syncNavScrollHint);
    syncNavScrollHint();
  }

  setupSidebarScrollHint();
  window.addEventListener('storage', (event) => {
    if (event.key === NAVIGATION_MODE_KEY) setNavigationMode(event.newValue);
  });

  document.getElementById('aboutTrigger').addEventListener('click', (event) => {
    lpAbout.open(event, { inertElements: [document.querySelector('.shell')] });
  });
  lpLogin.bindNavButton('#loginTrigger', {
    labelSelector: '.sb-label',
    onSync(user, btn) {
      btn.setAttribute('aria-label', user ? user.name + ' — perfil' : 'Iniciar sesión');
    },
  });

  return { syncTopbarNavButtons, setNavigationDrawerOpen };
}
