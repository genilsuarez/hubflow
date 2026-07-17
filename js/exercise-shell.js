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
// Replace the back-link <a> with a ☰ button that opens the sidebar.

const topBar = document.querySelector('.top-bar');
const originalBackLink = topBar?.querySelector('a[href*="../index.html"]');

let hamburgerBtn;
if (topBar && originalBackLink) {
  // Create a proper button to replace the old <a>
  hamburgerBtn = document.createElement('button');
  hamburgerBtn.type = 'button';
  hamburgerBtn.className = originalBackLink.className; // keeps lp-icon-btn
  hamburgerBtn.textContent = '☰';
  hamburgerBtn.setAttribute('aria-label', 'Abrir navegación');
  hamburgerBtn.setAttribute('aria-controls', 'exerciseSidebar');
  originalBackLink.replaceWith(hamburgerBtn);
}

// Move top-bar out of .wrap so it spans full body width (like LyricFlow header)
if (topBar) {
  const wrap = topBar.closest('.wrap');
  if (wrap) document.body.insertBefore(topBar, wrap);
}

if (topBar) {
  // Insert branding after hamburger
  if (!topBar.querySelector('.learnflow-signature')) {
    const sig = document.createElement('span');
    sig.className = 'learnflow-signature';
    sig.textContent = 'HubFlow';
    topBar.appendChild(sig);
  }

  // Central counter slot — mirrors whichever counter is active
  const counterSlot = document.createElement('span');
  counterSlot.className = 'tb-counter';
  counterSlot.id = 'tbCounter';
  topBar.appendChild(counterSlot);

  // Sync counter: read from fcCounter or scCounter (whichever has content)
  function syncCounter() {
    const fc = document.getElementById('fcCounter');
    const sc = document.getElementById('scCounter');
    const text = (fc && fc.textContent.trim()) || (sc && sc.textContent.trim()) || '';
    counterSlot.textContent = text;
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
  style.textContent = '.fc-count, .sc-counter { position: absolute; opacity: 0; pointer-events: none; }';
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
    <span class="foot-sig">Genil Suárez</span>
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
