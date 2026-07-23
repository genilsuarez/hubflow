// HubFlow — Exercise Shell
// Builds the sidebar drawer, restructures the header (☰ + branding),
// and appends a footer — matching the LyricFlow player layout.
// Replaces portal-link.js for exercise pages.

import { MODULES, getModuleDepth } from '../data/catalog.js';
import { initCatBarExpander, hydrateHubFlowFromCloud, renderLessonProgress, setupPracticeBottomNav } from './utils.js';
import { setupSupabaseAuth } from './lp-auth-setup.js';

setupSupabaseAuth({ onAfterLogin: () => hydrateHubFlowFromCloud() });

// ─── Helpers ───────────────────────────────────────────────────────────────────

function themedAppHref(app) {
  let href = window.LPPlatformUrls
    ? window.LPPlatformUrls.appHref(app)
    : `https://genilsuarez.github.io/${app}/`;
  if (window.LPTheme) href = window.LPTheme.appendThemeToHref(href);
  return href;
}

function currentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function currentThemeIcon() {
  if (window.LpNavIcons) return window.LpNavIcons.themeIcon(currentTheme() === 'dark');
  return '';
}

function navIcon(name) {
  return window.LpNavIcons ? window.LpNavIcons.svg(name) : '';
}

function toggleTheme() {
  if (window.LPTheme) {
    window.LPTheme.toggleTheme();
    return;
  }
  const isDark = currentTheme() === 'dark';
  const next = isDark ? 'light' : 'dark';
  document.documentElement.classList.add('theme-transitioning');
  if (next === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  else document.documentElement.removeAttribute('data-theme');
  localStorage.setItem('lp-theme', next);
  const url = new URL(location.href);
  if (url.searchParams.has('theme')) {
    url.searchParams.set('theme', next);
    history.replaceState(null, '', url);
  }
  setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 350);
}

// ─── Section detection (for back navigation + active sidebar item) ─────────

const file = location.pathname.split('/').pop().replace('.html', '');
const currentModule = MODULES.find(m => {
  if (!m.exercise) return false;
  const exerciseFile = m.exercise.split('/').pop().split('#')[0].replace('.html', '');
  return exerciseFile === file;
});
const section = currentModule?.category || 'vocab';

// ─── Header restructure ────────────────────────────────────────────────────────
// LyricFlow player pattern: [← back] · [title centered] · [☰ menu]
// (counter stays in the right cluster on desktop; hidden in header on mobile)

const topBar = document.querySelector('.top-bar');
const originalBackLink = topBar?.querySelector('a[href*="../index.html"]');

let hamburgerBtn;
if (topBar && originalBackLink) {
  originalBackLink.innerHTML = navIcon('arrow-left') || '<span aria-hidden="true">←</span>';
  if (!originalBackLink.getAttribute('aria-label')) {
    originalBackLink.setAttribute('aria-label', 'Volver');
  }

  hamburgerBtn = document.createElement('button');
  hamburgerBtn.type = 'button';
  hamburgerBtn.className = originalBackLink.className; // keeps lp-icon-btn
  hamburgerBtn.innerHTML = navIcon('menu') || '<span aria-hidden="true">☰</span>';
  hamburgerBtn.setAttribute('aria-label', 'Abrir navegación');
  hamburgerBtn.setAttribute('aria-controls', 'exerciseSidebar');
}

// Move top-bar out of .wrap so it spans full body width (like LyricFlow header)
if (topBar) {
  const wrap = topBar.closest('.wrap');
  if (wrap) document.body.insertBefore(topBar, wrap);
}

const TB_ICON_TARGET = '<svg class="lp-header-stats__icon lp-header-stats__icon--target" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>';

if (topBar) {
  // Insert branding after hamburger — usa el título del ejercicio (mismo texto/ícono
  // del <h1> del área de juego) en vez del genérico "HubFlow", y saca ese <h1>
  // original para no duplicar el título.
  if (!topBar.querySelector('.learnflow-signature')) {
    const sig = document.createElement('span');
    sig.className = 'learnflow-signature';
    const gameHeading = document.querySelector('.header h1');
    if (gameHeading) {
      sig.innerHTML = gameHeading.innerHTML;
      gameHeading.remove();
    } else {
      sig.textContent = 'HubFlow';
    }
    topBar.appendChild(sig);
  }

  // Central counter slot — mirrors whichever counter is active
  const counterSlot = document.createElement('span');
  counterSlot.className = 'tb-counter';
  counterSlot.id = 'tbCounter';
  counterSlot.innerHTML = `${TB_ICON_TARGET}<span class="tb-counter__text"></span>`;
  topBar.appendChild(counterSlot);
  const counterText = counterSlot.querySelector('.tb-counter__text');

  // Sync counter: read from whichever engine's counter has content —
  // cada shell de ejercicio usa su propio id (flashcards, sentence-quiz,
  // typed-answer, word-hunt, etc.)
  const COUNTER_IDS = ['fcCounter', 'scCounter', 'itemCounter', 'qCounter', 'dCounter', 'pcCounter', 'huntCounter'];
  function syncCounter() {
    const text = COUNTER_IDS.map(id => document.getElementById(id)).find(el => el && el.textContent.trim())?.textContent.trim() || '';
    counterSlot.style.display = text ? '' : 'none';
    counterText.textContent = text;
  }

  // Observe scroll-body for text changes from engines
  const scrollBody = document.querySelector('.scroll-body');
  if (scrollBody) {
    new MutationObserver(syncCounter).observe(scrollBody, { childList: true, subtree: true, characterData: true });
  }
  // Sync on mode pill clicks
  document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => setTimeout(syncCounter, 50));
  });
  // Initial sync (engines may have already set the counter)
  setTimeout(syncCounter, 0);
  setTimeout(syncCounter, 200);

  // Layout: [←] title … [counter centered] … [☰] — homologado a LyricFlow/FluentFlow player
  const backEl = topBar.querySelector('a[href*="../index.html"]');
  const menuEl = hamburgerBtn || topBar.querySelector('[aria-controls="exerciseSidebar"]');
  const sigEl = topBar.querySelector('.learnflow-signature');
  const counterEl = topBar.querySelector('.tb-counter');
  if (backEl && sigEl) {
    preserveTopBarTimer();
    const end = document.createElement('div');
    end.className = 'top-bar__end';
    if (menuEl) end.appendChild(menuEl);
    const layout = [backEl, sigEl];
    if (counterEl) layout.push(counterEl);
    layout.push(end);
    topBar.replaceChildren(...layout);
  }

  // Hide the original counters visually (they're mirrored in top-bar)
  const style = document.createElement('style');
  style.textContent = '.fc-count, .sc-counter, .item-counter, .ooo-card__counter, .dict-card__counter, .pc-counter, .hunt-card__counter { position: absolute; opacity: 0; pointer-events: none; }';
  document.head.appendChild(style);

  // Theme sync — observe data-theme for sidebar icon updates
  const observer = new MutationObserver(() => {
    const headerToggle = document.getElementById('themeToggle');
    if (headerToggle) headerToggle.innerHTML = currentThemeIcon();
    const sidebarThemeLabel = document.getElementById('sbThemeLabel');
    const sidebarThemeIcon = document.getElementById('sbThemeIcon');
    if (sidebarThemeLabel) sidebarThemeLabel.textContent = currentTheme() === 'dark' ? 'Modo claro' : 'Modo oscuro';
    if (sidebarThemeIcon) sidebarThemeIcon.innerHTML = currentThemeIcon();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}

// ─── Sidebar drawer ────────────────────────────────────────────────────────────

const NAVIGATION_MODE_KEY = 'lp-navigation-mode';
function navigationMode() {
  return localStorage.getItem(NAVIGATION_MODE_KEY) === 'floating' ? 'floating' : 'sidebar';
}

// On desktop (>=861px), sidebar mode = persistent. Otherwise always off-canvas.
function isPersistent() {
  return window.innerWidth >= 861 && navigationMode() === 'sidebar';
}

const SECTIONS = [
  { key: 'resumen', icon: 'home', label: 'Inicio', cls: '' },
  { key: 'mi-progreso', icon: 'progress', label: 'Mi Progreso', cls: 'path' },
  { key: 'vocab', icon: 'diamond', label: 'Vocabulary & Words', cls: 'v' },
  { key: 'grammar', icon: 'diamond', label: 'Grammar & Spelling', cls: 'g' },
  { key: 'pronunciation', icon: 'diamond', label: 'Pronunciation', cls: 'p' },
  { key: 'analysis', icon: 'diamond', label: 'Analysis & Production', cls: 'a' },
  { key: 'guides', icon: 'diamond', label: 'Guías de referencia', cls: 'r' },
];

const SIDEBAR_PRIMARY_KEYS = new Set(['resumen', 'mi-progreso']);

function renderSidebarItem(s) {
  const active = s.key === section ? ' active' : '';
  const iconMarkup = s.icon === 'diamond' ? '◆' : navIcon(s.icon);
  return `<a class="sb-item ${s.cls}${active}" href="../?section=${s.key}" data-target="${s.key}"><span class="sb-icon">${iconMarkup}</span><span class="sb-label">${s.label}</span></a>`;
}

function setupSidebarMobileNav(sidebar) {
  const group = sidebar.querySelector('#sbNavTopics');
  const toggle = sidebar.querySelector('#sbNavTopicsToggle');
  const nav = sidebar.querySelector('.sb-nav');
  if (!group || !toggle || !nav) return null;

  function syncTopicGroupState() {
    const open = group.classList.contains('is-open') || !!group.querySelector('.sb-item.active');
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.addEventListener('click', () => {
    group.classList.toggle('is-open');
    syncTopicGroupState();
  });

  function syncNavScrollHint() {
    const atEnd = nav.scrollHeight - nav.scrollTop <= nav.clientHeight + 2;
    nav.classList.toggle('is-scroll-end', atEnd);
  }

  nav.addEventListener('scroll', syncNavScrollHint, { passive: true });
  window.addEventListener('resize', syncNavScrollHint);
  syncNavScrollHint();
  syncTopicGroupState();
  return syncTopicGroupState;
}

function buildSidebar() {
  const scrim = document.createElement('div');
  scrim.className = 'sidebar-scrim';
  scrim.id = 'exerciseSidebarScrim';
  scrim.setAttribute('aria-hidden', 'true');

  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.id = 'exerciseSidebar';
  sidebar.setAttribute('aria-label', 'Navegación HubFlow');

  const primaryItems = SECTIONS.filter(s => SIDEBAR_PRIMARY_KEYS.has(s.key)).map(renderSidebarItem).join('');
  const topicItems = SECTIONS.filter(s => !SIDEBAR_PRIMARY_KEYS.has(s.key)).map(renderSidebarItem).join('');

  sidebar.innerHTML = `
    <div class="sb-brand">
      <span class="sb-mark" aria-hidden="true">H</span>
      <div>
        <h1>HubFlow</h1>
        <span class="sb-tag">LearnFlow</span>
      </div>
      <button class="lp-icon-btn nav-mode-toggle" id="sbNavModeToggle" type="button" aria-label="${navigationMode() === 'sidebar' ? 'Usar navegación flotante' : 'Usar barra lateral fija'}" title="${navigationMode() === 'sidebar' ? 'Oculta la barra lateral' : 'Fijar barra lateral'}"><span aria-hidden="true">◫</span></button>
    </div>
    <nav class="sb-nav" id="sbNav">
      ${primaryItems}
      <div class="sb-nav-group" id="sbNavTopics">
        <button type="button" class="sb-nav-group__toggle" id="sbNavTopicsToggle" aria-expanded="false" aria-controls="sbNavTopicsList">
          <span class="sb-icon">${navIcon('book')}</span>
          <span class="sb-label">Explorar temas</span>
          <span class="sb-nav-group__chev" aria-hidden="true">›</span>
        </button>
        <div class="sb-nav-group__items" id="sbNavTopicsList">${topicItems}</div>
      </div>
    </nav>
    <div class="sidebar-footer">
      <button class="sb-item" id="sbAboutBtn" type="button"><span class="sb-icon">${navIcon('info')}</span><span class="sb-label">About LearnFlow</span></button>
      <button class="sb-item" id="sbThemeBtn" type="button"><span class="sb-icon" id="sbThemeIcon">${currentThemeIcon()}</span><span class="sb-label" id="sbThemeLabel">${currentTheme() === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span></button>
      <button class="sb-item" id="sbLoginBtn" type="button" aria-label="Iniciar sesión"><span class="sb-icon">${navIcon('user')}</span><span class="sb-label" id="sbLoginLabel">${(typeof lpLogin !== 'undefined' && lpLogin.getUser()) ? lpLogin.getUser().name : 'Iniciar Sesión'}</span></button>
      <a class="sb-item" href="${themedAppHref('deskflow')}" aria-label="Volver a LearnFlow"><span class="sb-icon">${navIcon('home')}</span><span class="sb-label">Portal</span></a>
    </div>
  `;

  document.body.prepend(scrim, sidebar);
  setupSidebarMobileNav(sidebar);

  function openSidebar() {
    sidebar.classList.add('is-open');
    scrim.classList.add('is-visible');
    scrim.setAttribute('aria-hidden', 'false');
  }
  function closeSidebar() {
    // In persistent mode, don't close
    if (isPersistent()) return;
    sidebar.classList.remove('is-open');
    scrim.classList.remove('is-visible');
    scrim.setAttribute('aria-hidden', 'true');
  }

  function applyMode() {
    if (isPersistent()) {
      // Persistent: sidebar always visible, body shifted right
      sidebar.classList.add('is-open');
      sidebar.classList.add('is-persistent');
      scrim.classList.remove('is-visible');
      scrim.setAttribute('aria-hidden', 'true');
      document.body.classList.add('has-sidebar');
      if (hamburgerBtn) hamburgerBtn.style.display = 'none';
    } else {
      // Off-canvas: sidebar hidden until hamburger clicked
      sidebar.classList.remove('is-open');
      sidebar.classList.remove('is-persistent');
      document.body.classList.remove('has-sidebar');
      scrim.classList.remove('is-visible');
      scrim.setAttribute('aria-hidden', 'true');
      if (hamburgerBtn) hamburgerBtn.style.display = '';
    }
  }

  applyMode();
  window.addEventListener('resize', applyMode);
  window.addEventListener('storage', e => {
    if (e.key === NAVIGATION_MODE_KEY) applyMode();
  });

  // Hamburger opens sidebar
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', openSidebar);
  }

  scrim.addEventListener('click', closeSidebar);

  // Nav mode toggle — switches between persistent/floating
  document.getElementById('sbNavModeToggle').addEventListener('click', () => {
    const nextMode = navigationMode() === 'sidebar' ? 'floating' : 'sidebar';
    localStorage.setItem(NAVIGATION_MODE_KEY, nextMode);
    document.documentElement.dataset.navigationMode = nextMode;
    applyMode();
    if (nextMode === 'floating') {
      // When switching to floating, close the sidebar
      sidebar.classList.remove('is-open');
      scrim.classList.remove('is-visible');
      scrim.setAttribute('aria-hidden', 'true');
    }
  });

  // Theme toggle in sidebar
  document.getElementById('sbThemeBtn').addEventListener('click', () => {
    toggleTheme();
    document.getElementById('sbThemeIcon').innerHTML = currentThemeIcon();
    document.getElementById('sbThemeLabel').textContent = currentTheme() === 'dark' ? 'Modo claro' : 'Modo oscuro';
    const headerToggle = document.getElementById('themeToggle');
    if (headerToggle) headerToggle.innerHTML = currentThemeIcon();
  });

  // About LearnFlow modal
  document.getElementById('sbAboutBtn').addEventListener('click', (event) => {
    showAboutModal(event);
    closeSidebar();
  });

  // Login trigger
  document.getElementById('sbLoginBtn').addEventListener('click', () => {
    if (typeof lpLogin !== 'undefined') {
      lpLogin.open();
      closeSidebar();
    }
  });

  // Sync login label when user changes
  if (typeof lpLogin !== 'undefined') {
    lpLogin.onUpdate(function(user) {
      const label = document.getElementById('sbLoginLabel');
      if (!label) return;
      label.textContent = user ? user.name : 'Iniciar Sesión';
    });
  }

  // Nav items — store section for back-navigation, then follow href
  sidebar.querySelectorAll('.sb-nav .sb-item').forEach(item => {
    item.addEventListener('click', () => {
      sessionStorage.setItem('hf-back-section', item.getAttribute('href').split('section=')[1]);
    });
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && sidebar.classList.contains('is-open')) closeSidebar();
  });
}

// ─── About LearnFlow modal (exercise-page version) ─────────────────────────────

function injectAboutStyles() {
  if (document.getElementById('aboutModalCSS')) return;
  const s = document.createElement('style');
  s.id = 'aboutModalCSS';
  s.textContent = `
    .about-overlay {
      position: fixed; inset: 0; z-index: 10000; display: flex; align-items: center; justify-content: center;
      padding: 20px; background: color-mix(in srgb, var(--lp-ink) 45%, transparent);
      backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
      animation: aboutFadeIn 0.2s ease-out both;
    }
    [data-theme="dark"] .about-overlay { background: color-mix(in srgb, #14171c 55%, transparent); }
    .about-modal {
      position: relative; width: min(100%, 420px); max-height: min(680px, calc(100svh - 40px));
      display: flex; flex-direction: column; overflow: hidden;
      border: 1px solid var(--lp-border); border-radius: var(--lp-radius-lg);
      background: var(--lp-bg-paper, var(--lp-surface));
      box-shadow: 0 24px 48px color-mix(in srgb, var(--lp-ink) 18%, transparent), 0 4px 12px color-mix(in srgb, var(--lp-ink) 8%, transparent);
      color: var(--lp-ink-soft); animation: aboutSlideUp 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
    .about-header { display: flex; align-items: center; gap: 12px; padding: 14px 14px 12px; border-bottom: 1px solid var(--lp-border); flex-shrink: 0; }
    .about-header__text { flex: 1; min-width: 0; }
    .about-identity {
      width: 40px; height: 40px; flex: 0 0 40px; display: grid; place-items: center; border-radius: 50%;
      background: var(--lp-accent); color: var(--lp-ink-inverse); font-size: 1.05rem; font-weight: 700;
      letter-spacing: -0.03em; box-shadow: 0 4px 14px color-mix(in srgb, var(--lp-accent) 22%, transparent);
    }
    .about-header .about-eyebrow { margin: 0 0 2px; }
    .about-header h2 { margin: 0; font-family: var(--lp-font-display); font-size: 18px; font-weight: 500; line-height: 1.1; color: var(--lp-ink); }
    .about-eyebrow { color: var(--lp-muted); font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; }
    .about-close {
      flex: 0 0 44px; width: 44px; height: 44px; margin: -4px -6px -4px 0; padding: 0;
      display: grid; place-items: center; border: none; border-radius: var(--lp-radius-full);
      background: transparent; color: var(--lp-muted); cursor: pointer;
      transition: background-color 0.15s ease, color 0.15s ease, transform 0.15s ease;
    }
    .about-close:hover { background: color-mix(in srgb, var(--lp-ink) 6%, transparent); color: var(--lp-ink); }
    .about-close:active { transform: scale(0.97); }
    .about-close:focus-visible, .about-modules a:focus-visible { outline: 2px solid var(--lp-accent); outline-offset: 2px; }
    .about-body { padding: 12px 10px 14px; overflow-y: auto; flex: 1; min-height: 0; }
    .about-description { margin: 0 0 10px; padding: 0 4px; color: var(--lp-muted); font-size: .82rem; line-height: 1.6; }
    .about-modules { display: grid; gap: 2px; margin: 0; }
    .about-modules a {
      display: flex; align-items: center; gap: 10px; min-height: 44px; padding: 8px 10px;
      border: none; border-radius: var(--lp-radius-md); background: transparent; color: var(--lp-ink); text-decoration: none;
      transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
    }
    .about-modules a:hover { background: var(--lp-surface); box-shadow: 0 1px 3px color-mix(in srgb, var(--lp-ink) 8%, transparent); }
    .about-modules a:active { transform: scale(0.98); }
    [data-theme="dark"] .about-modules a:hover { background: var(--lp-surface); }
    .about-module__mark {
      width: 32px; height: 32px; flex: 0 0 32px; display: grid; place-items: center; border-radius: 50%;
      background: var(--lp-accent); color: var(--lp-ink-inverse); font-size: .68rem; font-weight: 700; letter-spacing: -0.02em;
      box-shadow: 0 2px 8px color-mix(in srgb, var(--lp-accent) 20%, transparent);
    }
    .about-module__mark--portal { background: var(--lp-accent); box-shadow: 0 2px 8px color-mix(in srgb, var(--lp-accent) 20%, transparent); }
    .about-module__mark--fluent { background: var(--lp-cat-purple, var(--lp-accent)); box-shadow: 0 2px 8px color-mix(in srgb, var(--lp-cat-purple, var(--lp-accent)) 20%, transparent); }
    .about-module__mark--hub { background: var(--lp-cat-amber, var(--lp-accent)); box-shadow: 0 2px 8px color-mix(in srgb, var(--lp-cat-amber, var(--lp-accent)) 20%, transparent); }
    .about-module__mark--lyric { background: var(--lp-cat-teal, var(--lp-accent)); box-shadow: 0 2px 8px color-mix(in srgb, var(--lp-cat-teal, var(--lp-accent)) 20%, transparent); }
    .about-module__text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
    .about-modules strong { font-size: .82rem; font-weight: 500; color: var(--lp-ink); }
    .about-modules .about-module__text > span { color: var(--lp-muted); font-size: .68rem; line-height: 1.35; }
    .about-footer { display: grid; gap: 8px; padding: 12px 16px 16px; border-top: 1px solid var(--lp-border); flex-shrink: 0; }
    .about-author { display: flex; align-items: center; gap: 12px; }
    .about-author__avatar {
      width: 36px; height: 36px; border-radius: 50%; background: var(--lp-accent); color: var(--lp-ink-inverse);
      display: flex; align-items: center; justify-content: center; font-size: .72rem; font-weight: 700;
      letter-spacing: .03em; flex-shrink: 0; box-shadow: 0 4px 14px color-mix(in srgb, var(--lp-accent) 22%, transparent);
    }
    .about-author__info { display: flex; flex-direction: column; gap: 2px; }
    .about-author__info strong { font-size: .78rem; color: var(--lp-ink); font-weight: 600; }
    .about-author__info span { font-size: .68rem; color: var(--lp-muted); }
    @keyframes aboutFadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes aboutSlideUp { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
    @media (prefers-reduced-motion: reduce) { .about-overlay, .about-modal { animation: none; } }
  `;
  document.head.appendChild(s);
}

function showAboutModal(event) {
  injectAboutStyles();
  document.getElementById('aboutLearnFlow')?.remove();
  const opener = event?.currentTarget instanceof HTMLElement ? event.currentTarget : document.activeElement;
  const overlay = document.createElement('div');
  overlay.id = 'aboutLearnFlow';
  overlay.className = 'about-overlay';
  overlay.innerHTML = `
    <section class="about-modal" role="dialog" aria-modal="true" aria-labelledby="aboutLearnFlowTitle" aria-describedby="aboutLearnFlowDescription">
      <header class="about-header">
        <div class="about-identity" aria-hidden="true">L</div>
        <div class="about-header__text">
          <p class="about-eyebrow">LearnFlow · Plataforma</p>
          <h2 id="aboutLearnFlowTitle">About LearnFlow</h2>
        </div>
        <button class="about-close" id="aboutCloseBtn" type="button" aria-label="Cerrar About LearnFlow">✕</button>
      </header>
      <div class="about-body">
        <p id="aboutLearnFlowDescription" class="about-description">Una plataforma para aprender idiomas con estructura, práctica y música.</p>
        <nav class="about-modules" aria-label="Aplicaciones de LearnFlow">
          <a href="${themedAppHref('deskflow')}" data-learnflow-app="deskflow">
            <span class="about-module__mark about-module__mark--portal" aria-hidden="true">L</span>
            <span class="about-module__text"><strong>LearnFlow</strong><span>Portal</span></span>
          </a>
          <a href="${themedAppHref('fluentflow')}" data-learnflow-app="fluentflow">
            <span class="about-module__mark about-module__mark--fluent" aria-hidden="true">F</span>
            <span class="about-module__text"><strong>FluentFlow</strong><span>Ruta de inglés por niveles CEFR</span></span>
          </a>
          <a href="${themedAppHref('hubflow')}" data-learnflow-app="hubflow">
            <span class="about-module__mark about-module__mark--hub" aria-hidden="true">H</span>
            <span class="about-module__text"><strong>HubFlow</strong><span>Práctica flexible de gramática</span></span>
          </a>
          <a href="${themedAppHref('lyricflow')}" data-learnflow-app="lyricflow">
            <span class="about-module__mark about-module__mark--lyric" aria-hidden="true">LF</span>
            <span class="about-module__text"><strong>LyricFlow</strong><span>Aprender con música</span></span>
          </a>
        </nav>
      </div>
      <footer class="about-footer">
        <div class="about-author">
          <div class="about-author__avatar" aria-hidden="true">GS</div>
          <div class="about-author__info">
            <strong>Genil Suárez</strong>
            <span>Diseñado y desarrollado como proyecto personal</span>
          </div>
        </div>
      </footer>
    </section>
  `;
  document.body.appendChild(overlay);

  const focusable = [...overlay.querySelectorAll('button, a[href]')];
  const close = () => {
    overlay.remove();
    document.removeEventListener('keydown', onAboutKeydown);
    if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
  };
  const onAboutKeydown = (keyEvent) => {
    if (keyEvent.key === 'Escape') { keyEvent.preventDefault(); close(); return; }
    if (keyEvent.key !== 'Tab' || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (keyEvent.shiftKey && document.activeElement === first) { keyEvent.preventDefault(); last.focus(); }
    else if (!keyEvent.shiftKey && document.activeElement === last) { keyEvent.preventDefault(); first.focus(); }
  };

  overlay.querySelector('#aboutCloseBtn').addEventListener('click', close);
  overlay.addEventListener('click', (clickEvent) => { if (clickEvent.target === overlay) close(); });
  document.addEventListener('keydown', onAboutKeydown);
  overlay.querySelector('#aboutCloseBtn').focus();
}

buildSidebar();

// ─── Exercise header homologation (all 44 exercise templates) ─────────────────
// Legacy .header stacked cat-bar + modes + dual progress bars without hierarchy.
// Restructure once in the shell — no per-HTML edits.

const HEADER_ORPHAN_SEL = [
  '.progress', '#progressWrap', '.timer-bar', '#timerBar',
  '#catBar', '.cat-bar', '.cat-bar-wrap', '.cat-scroll-wrapper', '#catWrapper', '.level-bar',
].join(', ');

function hoistHeaderOrphans(header) {
  const wrap = header.closest('.wrap');
  if (!wrap) return;

  const scrollBody = wrap.querySelector('.scroll-body');
  let node = header.nextElementSibling;
  while (node && node !== scrollBody) {
    const next = node.nextElementSibling;
    if (node.matches(HEADER_ORPHAN_SEL)) header.appendChild(node);
    node = next;
  }
}

/** Move timer out of top-bar before replaceChildren strips it. */
function preserveTopBarTimer(header = document.querySelector('.header')) {
  if (!header) return;
  const topBarTimer = document.querySelector('.top-bar .timer-bar, .top-bar #timerBar');
  if (topBarTimer && !header.contains(topBarTimer)) header.appendChild(topBarTimer);
}

function restructureExerciseHeader() {
  const header = document.querySelector('.header');
  if (!header || header.dataset.exHomologated) return;

  hoistHeaderOrphans(header);
  preserveTopBarTimer(header);
  header.dataset.exHomologated = '1';

  const scopeEl = header.querySelector('.cat-bar-wrap, .cat-scroll-wrapper, #catWrapper, .level-bar')
    || header.querySelector('#catBar, .cat-bar');
  const pillBar = header.querySelector('.pill-bar, .pill-bar--scroll');
  const timerBar = header.querySelector('.timer-bar, #timerBar');
  const sessionProg = header.querySelector('.progress, #progressWrap');
  const pairScore = document.getElementById('pairScore');

  const parts = [];

  if (scopeEl) {
    const scope = document.createElement('div');
    scope.className = 'ex-header__scope';
    scope.appendChild(scopeEl);
    parts.push(scope);
  }

  if (pillBar) {
    const modes = document.createElement('div');
    modes.className = 'ex-header__modes';
    modes.appendChild(pillBar);
    parts.push(modes);
  }

  if (sessionProg || timerBar || pairScore) {
    const progress = document.createElement('div');
    progress.className = 'ex-header__progress';
    const row = document.createElement('div');
    row.className = 'ex-progress-row ex-progress-row--session';
    if (timerBar) row.appendChild(timerBar);
    if (pairScore) row.appendChild(pairScore);
    if (sessionProg) row.appendChild(sessionProg);
    progress.appendChild(row);
    parts.push(progress);
  }

  header.querySelector('h1')?.remove();
  header.classList.add('ex-control-panel');
  header.replaceChildren(...parts);
}

const STUDY_NAV_IDS = ['shuffleBtn', 'prevBtn', 'nextBtn', 'speakBtn', 'listenBtn', 'studySpeakBtn'];
const BATTLE_ACTION_IDS = ['battleClaim', 'battleJudge', 'battleNext'];

function getActiveExerciseMode() {
  return document.querySelector('.ex-header__modes [data-mode].active')?.dataset.mode
    || document.querySelector('.pill-btn.active[data-mode]')?.dataset.mode
    || document.querySelector('[data-mode].active')?.dataset.mode
    || 'study';
}

function syncBottomNavMode() {
  const mode = getActiveExerciseMode();
  const nav = document.getElementById('exBottomNav');
  if (nav) {
    nav.hidden = false;
    nav.classList.remove('is-battle-hidden');
    nav.classList.toggle('ex-bottom-nav--battle', mode === 'battle');
  }

  const hideStudyNav = mode === 'battle';

  STUDY_NAV_IDS.forEach((id) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.hidden = hideStudyNav;
    if (hideStudyNav) {
      btn.style.display = 'none';
    } else {
      btn.style.removeProperty('display');
    }
  });

  BATTLE_ACTION_IDS.forEach((id) => {
    const group = document.getElementById(id);
    if (!group) return;
    if (mode !== 'battle') {
      group.style.display = 'none';
    }
  });
}

function relocateBattleActionsToBottomNav() {
  const nav = setupPersistentBottomNav({ force: true }) || document.getElementById('exBottomNav');
  if (!nav) return;

  let insertAfter = document.getElementById('lessonProgressBtn');
  BATTLE_ACTION_IDS.forEach((id) => {
    const group = document.getElementById(id);
    if (!group) return;
    group.classList.add('battle-actions--nav');
    if (group.parentElement === nav) return;
    if (insertAfter?.parentElement === nav) {
      insertAfter.insertAdjacentElement('afterend', group);
    } else {
      nav.appendChild(group);
    }
    insertAfter = group;
  });
}

/** Hoist .fc-nav out of mode-specific areas so the bar stays visible in practice/timed. */
function setupPersistentBottomNav({ force = false } = {}) {
  const anchor = document.querySelector('.scroll-body') || document.querySelector('.wrap');
  if (!anchor) return null;

  const legacyNav = document.querySelector('.fc-nav:not(#exBottomNav)');
  let bottomNav = document.getElementById('exBottomNav');
  if (!bottomNav && !legacyNav && !force) return null;

  if (!bottomNav) {
    bottomNav = document.createElement('div');
    bottomNav.id = 'exBottomNav';
    bottomNav.className = 'ex-bottom-nav fc-nav';
    anchor.appendChild(bottomNav);
  }

  if (legacyNav) {
    while (legacyNav.firstChild) bottomNav.appendChild(legacyNav.firstChild);
    legacyNav.remove();
  }

  // Normalize legacy listen/speak buttons hoisted from .fc-nav
  bottomNav.querySelectorAll('#speakBtn, #listenBtn, .listen-btn').forEach((btn) => {
    btn.classList.add('lp-btn', 'lp-btn--ghost');
    btn.classList.remove('listen-btn');
    btn.style.cssText = '';
  });

  return bottomNav;
}

function relocateLessonProgressButton() {
  const btn = document.getElementById('lessonProgressBtn');
  if (!btn) return;

  let nav = setupPersistentBottomNav();
  if (!nav) nav = setupPersistentBottomNav({ force: true });
  if (!nav) return;

  btn.classList.add('lp-btn', 'lp-btn--ghost', 'lesson-progress__detail');
  if (btn.parentElement !== nav || btn !== nav.firstElementChild) {
    nav.insertBefore(btn, nav.firstChild);
  }
  syncBottomNavMode();
  relocateBattleActionsToBottomNav();
  setupPracticeBottomNav();
  reorderStudySpeakButton();
}

function reorderStudySpeakButton() {
  const speakBtn = document.getElementById('studySpeakBtn');
  const progressBtn = document.getElementById('lessonProgressBtn');
  const nav = document.getElementById('exBottomNav');
  if (!speakBtn || speakBtn.hidden || !nav || speakBtn.parentElement !== nav) return;
  if (progressBtn?.parentElement === nav) {
    progressBtn.insertAdjacentElement('afterend', speakBtn);
  }
}

function wrapModeStage() {
  const scrollBody = document.querySelector('.scroll-body');
  if (!scrollBody || scrollBody.querySelector('.ex-mode-stage')) return;

  const areas = [...scrollBody.querySelectorAll(':scope > [data-area]')];
  if (areas.length < 2) return;

  const stage = document.createElement('div');
  stage.className = 'ex-mode-stage';
  const bottomNav = scrollBody.querySelector('.ex-bottom-nav');
  areas.forEach((area) => stage.appendChild(area));
  scrollBody.insertBefore(stage, bottomNav);
}

function resetModeStageScroll() {
  const stage = document.querySelector('.ex-mode-stage');
  const scrollBody = document.querySelector('.scroll-body');
  if (stage) stage.scrollTop = 0;
  if (scrollBody) scrollBody.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

function getSessionProgressEl() {
  return document.getElementById('progressWrap')
    || document.querySelector('.ex-progress-row--session > .progress');
}

/** Keep session progress in `.ex-header__progress` for all modes (including Battle). */
function syncBattleProgressPlacement() {
  const prog = getSessionProgressEl();
  const sessionRow = document.querySelector('.ex-progress-row--session');
  if (!prog || !sessionRow) return;

  if (prog.parentElement !== sessionRow) {
    sessionRow.appendChild(prog);
  }
  sessionRow.classList.remove('is-progress-relocated');
}

/** Sliding chip behind the active mode pill (Study / Quiz / Timed / …). */
function setupModeTabIndicator() {
  const pillBar = document.querySelector('.ex-header__modes .pill-bar, .ex-header__modes .pill-bar--scroll');
  if (!pillBar || pillBar.querySelector('.ex-mode-indicator')) return;

  const indicator = document.createElement('span');
  indicator.className = 'ex-mode-indicator';
  indicator.setAttribute('aria-hidden', 'true');
  pillBar.prepend(indicator);

  let rafId = 0;
  let scrollSyncTimer = 0;
  function syncModeTabIndicator({ scrollActive = false } = {}) {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const active = pillBar.querySelector('[data-mode].active, .pill-btn.active[data-mode]');
      if (!active) {
        indicator.classList.remove('is-ready');
        return;
      }

      const positionIndicator = () => {
        const barRect = pillBar.getBoundingClientRect();
        const btnRect = active.getBoundingClientRect();
        indicator.style.width = `${btnRect.width}px`;
        indicator.style.height = `${btnRect.height}px`;
        indicator.style.transform = `translate(${btnRect.left - barRect.left}px, ${btnRect.top - barRect.top}px)`;
        indicator.classList.add('is-ready');
      };

      if (scrollActive) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        active.scrollIntoView({
          inline: 'nearest',
          block: 'nearest',
          behavior: reducedMotion ? 'auto' : 'smooth',
        });
        positionIndicator();
        clearTimeout(scrollSyncTimer);
        scrollSyncTimer = window.setTimeout(positionIndicator, reducedMotion ? 0 : 320);
      } else {
        positionIndicator();
      }
    });
  }

  window.__syncModeTabIndicator = syncModeTabIndicator;
  syncModeTabIndicator();
  document.fonts?.ready?.then(() => syncModeTabIndicator());

  window.addEventListener('resize', () => syncModeTabIndicator(), { passive: true });
  pillBar.addEventListener('scroll', () => syncModeTabIndicator(), { passive: true });

  new MutationObserver(() => syncModeTabIndicator()).observe(pillBar, {
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  });
}

window.__relocateLessonProgressBtn = relocateLessonProgressButton;
window.__syncBattleProgressPlacement = syncBattleProgressPlacement;
window.__syncBottomNavMode = syncBottomNavMode;
window.__resetModeStageScroll = resetModeStageScroll;

document.addEventListener('click', (e) => {
  if (e.target.closest('[data-mode]')) {
    setTimeout(() => {
      window.__syncBottomNavMode?.();
      syncBattleProgressPlacement();
      resetModeStageScroll();
      window.__syncModeTabIndicator?.({ scrollActive: true });
    }, 0);
  }
});

// ─── Lesson progress button (detail modal — lives in bottom nav) ────────────────
restructureExerciseHeader();
setupModeTabIndicator();
wrapModeStage();
setupPersistentBottomNav();

if (currentModule) {
  renderLessonProgress(currentModule.id);
}
relocateLessonProgressButton();
relocateBattleActionsToBottomNav();
syncBottomNavMode();
syncBattleProgressPlacement();

// ─── Depth banner (shows module scale on entry) ────────────────────────────────

function buildDepthBanner() {
  if (!currentModule) return;
  const depth = getModuleDepth(currentModule.id);
  if (!depth) return;

  const parts = [`<strong>${depth.items}</strong> items`];
  if (depth.categories > 1) parts.push(`<strong>${depth.categories}</strong> categorías`);
  parts.push(`<strong>${depth.modes}</strong> modos`);
  if (depth.hasBattle) parts.push(`<span class="depth-banner__battle">⚔️ Battle 2P</span>`);

  const bannerHTML = parts.join('<span class="depth-banner__sep">·</span>');

  const banner = document.createElement('div');
  banner.className = 'depth-banner';
  banner.innerHTML = bannerHTML +
    '<button class="depth-banner__close" aria-label="Cerrar">&times;</button>';
  banner.setAttribute('role', 'status');

  document.body.appendChild(banner);

  banner.querySelector('.depth-banner__close').addEventListener('click', () => {
    banner.classList.add('depth-banner--fade');
    setTimeout(() => { banner.remove(); showDepthBell(bannerHTML); }, 600);
  });

  function showDepthBell(html) {
    const footer = document.querySelector('.exercise-foot');
    if (!footer) return;
    const meta = footer.querySelector('.foot-meta');
    const bell = document.createElement('button');
    bell.className = 'depth-bell';
    bell.setAttribute('aria-label', 'Mostrar información del módulo');
    bell.textContent = '🔔';
    if (meta) meta.parentNode.insertBefore(bell, meta);
    else footer.appendChild(bell);

    bell.addEventListener('click', () => {
      bell.remove();
      const b = document.createElement('div');
      b.className = 'depth-banner';
      b.innerHTML = html +
        '<button class="depth-banner__close" aria-label="Cerrar">&times;</button>';
      b.setAttribute('role', 'status');
      document.body.appendChild(b);
      b.querySelector('.depth-banner__close').addEventListener('click', () => {
        b.classList.add('depth-banner--fade');
        setTimeout(() => { b.remove(); showDepthBell(html); }, 600);
      });
    });
  }
}

buildDepthBanner();

// ─── Footer ────────────────────────────────────────────────────────────────────

function buildFooter() {
  const footer = document.createElement('footer');
  footer.className = 'exercise-foot';
  footer.innerHTML = `
    <span class="foot-meta">HubFlow → LearnFlow</span>
  `;
  document.body.appendChild(footer);
}

buildFooter();

// Cat-bar: wrap + expand badge before first paint (no load-time scroll hint).
initCatBarExpander({ hintOnLoad: false });

// Reveal the page now that DOM restructuring is done
document.body.classList.add('shell-ready');
