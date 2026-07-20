// HubFlow — Exercise Shell
// Builds the sidebar drawer, restructures the header (☰ + branding),
// and appends a footer — matching the LyricFlow player layout.
// Replaces portal-link.js for exercise pages.

import { MODULES, getModuleDepth } from '../data/catalog.js';
import { renderLessonProgress } from './utils.js';

// ─── Helpers ───────────────────────────────────────────────────────────────────

function themedAppHref(path, port) {
  const h = location.hostname;
  const isLocal = h === 'localhost' || h === '127.0.0.1' || h.startsWith('192.168.');
  const isUnified = isLocal && location.port === '3000';
  if (isUnified) return path;
  if (isLocal) return `http://${h}:${port}/`;
  return path;
}

function currentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function currentThemeIcon() {
  return currentTheme() === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const isDark = currentTheme() === 'dark';
  const next = isDark ? 'light' : 'dark';
  document.documentElement.classList.add('theme-transitioning');
  document.documentElement.setAttribute('data-theme', next);
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
// Keep the original ← back link (always visible, matches LyricFlow's player header
// and FluentFlow's in-game header, both of which keep a dedicated back arrow even
// when a hamburger is also present) and add a ☰ next to it to open the sidebar.

const topBar = document.querySelector('.top-bar');
const originalBackLink = topBar?.querySelector('a[href*="../index.html"]');

let hamburgerBtn;
if (topBar && originalBackLink) {
  hamburgerBtn = document.createElement('button');
  hamburgerBtn.type = 'button';
  hamburgerBtn.className = originalBackLink.className; // keeps lp-icon-btn
  hamburgerBtn.textContent = '☰';
  hamburgerBtn.setAttribute('aria-label', 'Abrir navegación');
  hamburgerBtn.setAttribute('aria-controls', 'exerciseSidebar');
  originalBackLink.insertAdjacentElement('afterend', hamburgerBtn);
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

  // Hide the original counters visually (they're mirrored in top-bar)
  const style = document.createElement('style');
  style.textContent = '.fc-count, .sc-counter, .item-counter, .ooo-card__counter, .dict-card__counter, .pc-counter, .hunt-card__counter { position: absolute; opacity: 0; pointer-events: none; }';
  document.head.appendChild(style);

  // Theme sync — observe data-theme for sidebar icon updates
  const observer = new MutationObserver(() => {
    const headerToggle = document.getElementById('themeToggle');
    if (headerToggle) headerToggle.textContent = currentThemeIcon();
    const sidebarThemeLabel = document.getElementById('sbThemeLabel');
    const sidebarThemeIcon = document.getElementById('sbThemeIcon');
    if (sidebarThemeLabel) sidebarThemeLabel.textContent = currentTheme() === 'dark' ? 'Modo claro' : 'Modo oscuro';
    if (sidebarThemeIcon) sidebarThemeIcon.textContent = currentThemeIcon();
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
  { key: 'resumen', icon: '⌂', label: 'Inicio', cls: '' },
  { key: 'mi-progreso', icon: '↗', label: 'Mi Progreso', cls: 'path' },
  { key: 'vocab', icon: '◆', label: 'Vocabulary & Words', cls: 'v' },
  { key: 'grammar', icon: '◆', label: 'Grammar & Spelling', cls: 'g' },
  { key: 'pronunciation', icon: '◆', label: 'Pronunciation', cls: 'p' },
  { key: 'analysis', icon: '◆', label: 'Analysis & Production', cls: 'a' },
  { key: 'guides', icon: '◆', label: 'Guías de referencia', cls: 'r' },
];

function buildSidebar() {
  const scrim = document.createElement('div');
  scrim.className = 'sidebar-scrim';
  scrim.id = 'exerciseSidebarScrim';
  scrim.hidden = true;

  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.id = 'exerciseSidebar';
  sidebar.setAttribute('aria-label', 'Navegación HubFlow');

  const navItems = SECTIONS.map(s => {
    const active = s.key === section ? ' active' : '';
    return `<a class="sb-item ${s.cls}${active}" href="../?section=${s.key}"><span class="sb-icon">${s.icon}</span><span class="sb-label">${s.label}</span></a>`;
  }).join('');

  sidebar.innerHTML = `
    <div class="sb-brand">
      <span class="sb-mark" aria-hidden="true">H</span>
      <div>
        <h1>HubFlow</h1>
        <span class="sb-tag">LearnFlow</span>
      </div>
      <button class="lp-icon-btn nav-mode-toggle" id="sbNavModeToggle" type="button" aria-label="${navigationMode() === 'sidebar' ? 'Usar navegación flotante' : 'Usar barra lateral fija'}" title="${navigationMode() === 'sidebar' ? 'Oculta la barra lateral' : 'Fijar barra lateral'}"><span aria-hidden="true">◫</span></button>
    </div>
    <nav class="sb-nav">${navItems}</nav>
    <div class="sidebar-footer">
      <button class="sb-item" id="sbAboutBtn" type="button"><span class="sb-icon">ⓘ</span><span class="sb-label">About LearnFlow</span></button>
      <button class="sb-item" id="sbThemeBtn" type="button"><span class="sb-icon" id="sbThemeIcon">${currentThemeIcon()}</span><span class="sb-label" id="sbThemeLabel">${currentTheme() === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span></button>
      <button class="sb-item" id="sbLoginBtn" type="button" aria-label="Iniciar sesión"><span class="sb-icon">👤</span><span class="sb-label" id="sbLoginLabel">${(typeof lpLogin !== 'undefined' && lpLogin.getUser()) ? lpLogin.getUser().name : 'Iniciar Sesión'}</span></button>
      <a class="sb-item" href="${themedAppHref('/deskflow/', 3000)}" aria-label="Volver a LearnFlow"><span class="sb-icon">⌂</span><span class="sb-label">Portal</span></a>
    </div>
  `;

  document.body.prepend(scrim, sidebar);

  function openSidebar() {
    sidebar.classList.add('is-open');
    scrim.hidden = false;
  }
  function closeSidebar() {
    // In persistent mode, don't close
    if (isPersistent()) return;
    sidebar.classList.remove('is-open');
    scrim.hidden = true;
  }

  function applyMode() {
    if (isPersistent()) {
      // Persistent: sidebar always visible, body shifted right
      sidebar.classList.add('is-open');
      sidebar.classList.add('is-persistent');
      scrim.hidden = true;
      document.body.classList.add('has-sidebar');
      if (hamburgerBtn) hamburgerBtn.style.display = 'none';
    } else {
      // Off-canvas: sidebar hidden until hamburger clicked
      sidebar.classList.remove('is-open');
      sidebar.classList.remove('is-persistent');
      document.body.classList.remove('has-sidebar');
      scrim.hidden = true;
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
      scrim.hidden = true;
    }
  });

  // Theme toggle in sidebar
  document.getElementById('sbThemeBtn').addEventListener('click', () => {
    toggleTheme();
    document.getElementById('sbThemeIcon').textContent = currentThemeIcon();
    document.getElementById('sbThemeLabel').textContent = currentTheme() === 'dark' ? 'Modo claro' : 'Modo oscuro';
    const headerToggle = document.getElementById('themeToggle');
    if (headerToggle) headerToggle.textContent = currentThemeIcon();
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
      padding: 20px; background: color-mix(in srgb, var(--lp-bg) 82%, transparent);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      animation: aboutFadeIn 0.25s var(--lp-ease) both;
    }
    .about-modal {
      position: relative; width: min(100%, 480px); max-height: min(720px, calc(100svh - 40px));
      overflow-y: auto; padding: 24px; border: 1px solid var(--lp-border); border-radius: var(--lp-radius-xl);
      background: var(--lp-surface); box-shadow: var(--lp-shadow-lg); color: var(--lp-ink-soft);
    }
    .about-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
    .about-identity {
      width: 40px; height: 40px; flex: 0 0 40px; display: grid; place-items: center; border-radius: 50%;
      background: var(--lp-accent); color: var(--lp-ink-inverse); font-size: 1.05rem; font-weight: 700;
      letter-spacing: -0.03em; box-shadow: 0 4px 14px color-mix(in srgb, var(--lp-accent) 22%, transparent);
    }
    .about-header .about-eyebrow { margin-bottom: 2px; }
    .about-header h2 { margin: 0; font-size: 1.5rem; line-height: 1; font-family: var(--lp-font-display); font-weight: var(--lp-weight-normal); color: var(--lp-ink); }
    .about-eyebrow { color: var(--lp-accent); font-size: .62rem; font-weight: var(--lp-weight-extrabold); letter-spacing: .14em; text-transform: uppercase; }
    .about-close {
      position: static; flex: 0 0 44px; width: 44px; height: 44px; display: grid; place-items: center;
      margin-left: auto; border: 1px solid var(--lp-border); border-radius: 50%; background: var(--lp-surface-sunken);
      color: var(--lp-muted); cursor: pointer; transition: border-color 160ms, color 160ms, transform 160ms;
    }
    .about-close:hover { border-color: var(--lp-accent); color: var(--lp-accent); transform: scale(1.05); }
    .about-close:active { transform: scale(0.97); }
    .about-close:focus-visible { outline: 3px solid var(--lp-accent); outline-offset: 2px; }
    .about-description { color: var(--lp-ink-soft); font-size: .82rem; line-height: 1.65; }
    .about-modules { display: grid; gap: 6px; margin: 14px 0; }
    .about-modules a {
      min-height: 52px; padding: 10px 14px; display: flex; flex-direction: column; justify-content: center; gap: 2px;
      border: 1px solid var(--lp-border); border-radius: var(--lp-radius-md); background: var(--lp-surface-sunken);
      color: var(--lp-ink); text-decoration: none; transition: border-color .2s var(--lp-ease), transform .2s var(--lp-ease);
    }
    .about-modules a:hover { border-color: var(--lp-accent); transform: translateY(-2px); }
    .about-modules a:focus-visible { outline: 3px solid var(--lp-accent); outline-offset: 2px; }
    .about-modules strong { font-size: .78rem; }
    .about-modules span { color: var(--lp-muted); font-size: .68rem; }
    .about-footer { display: grid; gap: 8px; padding-top: 12px; border-top: 1px solid var(--lp-border); }
    .about-author { display: flex; align-items: center; gap: 12px; }
    .about-author__avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--lp-accent); color: #fff; display: flex; align-items: center; justify-content: center; font-size: .72rem; font-weight: 700; letter-spacing: .03em; flex-shrink: 0; }
    .about-author__info { display: flex; flex-direction: column; gap: 2px; }
    .about-author__info strong { font-size: .78rem; color: var(--lp-ink); font-weight: 600; }
    .about-author__info span { font-size: .68rem; color: var(--lp-muted); }
    @keyframes aboutFadeIn { from { opacity: 0; } to { opacity: 1; } }
    @media (max-width: 580px) { .about-modal { padding: 22px; } .about-header h2 { font-size: 1.35rem; } }
    @media (prefers-reduced-motion: reduce) { .about-overlay { animation: none; } }
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
        <div>
          <p class="about-eyebrow">LearnFlow · Plataforma</p>
          <h2 id="aboutLearnFlowTitle">About LearnFlow</h2>
        </div>
        <button class="about-close" id="aboutCloseBtn" type="button" aria-label="Cerrar About LearnFlow">✕</button>
      </header>
      <p id="aboutLearnFlowDescription" class="about-description">Una plataforma para aprender idiomas con estructura, práctica y música.</p>
      <nav class="about-modules" aria-label="Aplicaciones de LearnFlow">
        <a href="${themedAppHref('/deskflow/', 3000)}" data-learnflow-app="deskflow"><strong>LearnFlow</strong><span>Portal</span></a>
        <a href="${themedAppHref('/fluentflow/', 3001)}" data-learnflow-app="fluentflow"><strong>FluentFlow</strong><span>Ruta de inglés por niveles CEFR</span></a>
        <a href="${themedAppHref('/hubflow/', 3002)}" data-learnflow-app="hubflow"><strong>HubFlow</strong><span>Práctica flexible de gramática</span></a>
        <a href="${themedAppHref('/lyricflow/', 3003)}" data-learnflow-app="lyricflow"><strong>LyricFlow</strong><span>Aprender con música</span></a>
      </nav>
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

// ─── Lesson progress bar (completion indicator for all exercises) ───────────────
if (currentModule) {
  // Try common anchor points across all exercise templates
  renderLessonProgress(currentModule.id, {
    insertAfter: '.pill-bar, .mode-bar, #catBar, .cat-bar-wrap, .cat-scroll-wrapper, .header',
  });
}

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

// Reveal the page now that DOM restructuring is done
document.body.classList.add('shell-ready');

// ─── Cat-bar auto-wrap: add scroll arrows to bare #catBar ──────────────────────
// Exercises with inline renderCatBar (prepositions, tenses, phrasal-verbs, etc.)
// don't use the shared utils.renderCatBar, so they miss the arrow navigation.
// This catches any #catBar that wasn't already wrapped.
(function initCatBarArrows() {
  const bar = document.getElementById('catBar');
  if (!bar) return;
  const parent = bar.parentElement;
  if (parent.classList.contains('cat-bar-wrap') || parent.classList.contains('cat-scroll-wrapper')) return;

  const wrap = document.createElement('div');
  wrap.className = 'cat-bar-wrap';
  const arrowL = document.createElement('button');
  arrowL.className = 'cat-bar-arrow cat-bar-arrow--left';
  arrowL.setAttribute('aria-label', 'Scroll left');
  arrowL.textContent = '\u2039';
  const arrowR = document.createElement('button');
  arrowR.className = 'cat-bar-arrow cat-bar-arrow--right';
  arrowR.setAttribute('aria-label', 'Scroll right');
  arrowR.textContent = '\u203A';

  parent.insertBefore(wrap, bar);
  wrap.appendChild(arrowL);
  wrap.appendChild(bar);
  wrap.appendChild(arrowR);

  const SCROLL_STEP = 140;
  function updateArrows() {
    const canLeft = bar.scrollLeft > 4;
    const canRight = bar.scrollLeft < bar.scrollWidth - bar.clientWidth - 4;
    arrowL.classList.toggle('visible', canLeft);
    arrowR.classList.toggle('visible', canRight);
    wrap.classList.toggle('cat-bar-wrap--fade-left', canLeft && !canRight);
    wrap.classList.toggle('cat-bar-wrap--fade-right', !canLeft && canRight);
    wrap.classList.toggle('cat-bar-wrap--fade-both', canLeft && canRight);
  }
  arrowL.addEventListener('click', () => { bar.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' }); });
  arrowR.addEventListener('click', () => { bar.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' }); });
  bar.addEventListener('scroll', updateArrows, { passive: true });
  new ResizeObserver(updateArrows).observe(bar);
  setTimeout(updateArrows, 50);
})();
