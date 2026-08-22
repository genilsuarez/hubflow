// HubFlow — Exercise Shell
// Builds the sidebar drawer, restructures the header (☰ + branding),
// and appends a footer — matching the LyricFlow player layout.
// Replaces portal-link.js for exercise pages.

import { MODULES, getModuleDepth } from '../data/catalog.js';
import { NAV_SECTIONS, NAV_SECTION_KEYS } from './nav-sections.js';
import { initCatBarExpander } from './exercise-ui.js';
import { hydrateHubFlowFromCloud, renderLessonProgress } from './progress-store.js';
import {
  ensureBottomNav,
  finalizeBottomNavLayout,
  initBottomNav,
  relocateProgressButton,
  syncBottomNavMode,
} from './ex-bottom-nav.js';
import { setupSupabaseAuth } from './lp-auth-setup.js';

setupSupabaseAuth({
  onAfterLogin: () => hydrateHubFlowFromCloud(),
  onAfterLogout: () => {
    hydrateHubFlowFromCloud();
    renderLessonProgress();
  },
});

if (typeof window !== 'undefined') {
  window.addEventListener('hubflow-progress-updated', () => {
    const contentId =
      document.getElementById('lessonProgress')?.dataset?.contentId
      || document.getElementById('lessonProgressBtn')?.dataset?.contentId;
    if (contentId) renderLessonProgress(contentId);
  });
}

// ─── Shared nav helpers (lp-nav-helpers.js) ───────────────────────────────────
const themedAppHref = (app) => window.LpNavHelpers.themedAppHref(app);
const currentTheme = () => window.LpNavHelpers.currentTheme();
const currentThemeIcon = () => window.LpNavHelpers.currentThemeIcon();
const navIcon = (name) => window.LpNavHelpers.navIcon(name);
const toggleTheme = () => {
  window.LpNavHelpers.toggleTheme(document.getElementById('sbThemeBtn')?.querySelector('.sb-icon'));
};

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

const VALID_BACK_SECTIONS = new Set(NAV_SECTION_KEYS);

function getExerciseBackUrl() {
  const stored = sessionStorage.getItem('hf-back-section');
  const target = (stored && VALID_BACK_SECTIONS.has(stored))
    ? stored
    : (section && VALID_BACK_SECTIONS.has(section) ? section : 'resumen');
  return `../index.html?section=${target}`;
}

/**
 * Prefer history.back() when we arrived from the HubFlow index in this tab.
 * That restores bfcache (instant) and keeps the history stack sane — location.assign
 * used to push a third entry (index → exercise → index), so the browser Back
 * button returned to the exercise instead of leaving HubFlow.
 * Fallback to assign for deep links, refreshed exercises, or when back is a no-op.
 */
function navigateBackFromExercise() {
  const fallbackUrl = getExerciseBackUrl();
  const canUseHistory = sessionStorage.getItem('hf-history-back') === '1';
  if (canUseHistory && window.history.length > 1) {
    sessionStorage.removeItem('hf-history-back');
    let left = false;
    const markLeft = () => { left = true; };
    window.addEventListener('pagehide', markLeft, { once: true });
    history.back();
    window.setTimeout(() => {
      window.removeEventListener('pagehide', markLeft);
      if (!left && /\/exercises\//.test(location.pathname)) {
        location.assign(fallbackUrl);
      }
    }, 400);
    return;
  }
  location.assign(fallbackUrl);
}

function setupExerciseBackLink(link) {
  if (!link || link.dataset.backBound) return;
  link.dataset.backBound = '1';
  const url = getExerciseBackUrl();
  link.href = url;
  link.setAttribute('aria-label', 'Volver');
  link.setAttribute('title', 'Volver');
  link.addEventListener('click', (e) => {
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigateBackFromExercise();
  });
}

const topBar = document.querySelector('.top-bar');

let hamburgerBtn;
if (topBar) {
  const backLink = topBar.querySelector('a[href*="../index.html"]');
  if (backLink) {
    backLink.innerHTML = navIcon('arrow-left') || '<span aria-hidden="true">←</span>';
    setupExerciseBackLink(backLink);
  }

  hamburgerBtn = document.createElement('button');
  hamburgerBtn.type = 'button';
  hamburgerBtn.className = backLink?.className || 'lp-icon-btn';
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
  // original para no duplicar el título. Es <h2> (no <span>): el <h1> de marca vive
  // en el sidebar (buildSidebar(), prepended antes que este topBar en el DOM final),
  // así que esto es la única forma de que el ejercicio tenga estructura de encabezados
  // más allá del H1 de marca (H9/1.12) — antes no había ningún heading para el título
  // del ejercicio en sí.
  if (!topBar.querySelector('.learnflow-signature')) {
    const sig = document.createElement('h2');
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
  // Priority: prefer counters whose [data-area] parent is currently active (.show),
  // so Quiz mode's scCounter wins over Study mode's fcCounter (which always has
  // text but lives in a hidden area when Quiz/Timed is active).
  const COUNTER_IDS = ['fcCounter', 'scCounter', 'itemCounter', 'qCounter', 'dCounter', 'pcCounter', 'huntCounter'];
  function syncCounter() {
    const allEls = COUNTER_IDS.map(id => document.getElementById(id)).filter(el => el && el.textContent.trim());
    // Prefer elements inside an active [data-area] (.show)
    let activeEl = allEls.find(el => el.closest('[data-area]')?.classList.contains('show'));
    if (!activeEl) {
      // Modes without their own counter (Match, Battle) must NOT inherit the
      // hidden Study/Quiz counter — it freezes at a stale "1 / 10". Use the
      // session progress label, which every mode keeps updated.
      const hasActiveArea = !!document.querySelector('[data-area].show');
      const progTxt = document.getElementById('progTxt');
      activeEl = hasActiveArea
        ? (progTxt?.textContent.trim() ? progTxt : null)
        : allEls[0];
    }
    const text = activeEl?.textContent.trim() || '';
    counterSlot.style.display = text ? '' : 'none';
    counterText.textContent = text;
  }

  // Observe scroll-body for text changes from engines
  const scrollBody = document.querySelector('.scroll-body');
  if (scrollBody) {
    new MutationObserver(syncCounter).observe(scrollBody, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class'] });
  }
  // Session progress lives in .header (outside .scroll-body) — observe it too so
  // counterless modes keep ticking.
  const headerEl = document.querySelector('.header');
  if (headerEl) {
    new MutationObserver(syncCounter).observe(headerEl, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class'] });
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
  if (sigEl) {
    preserveTopBarTimer();
    const start = document.createElement('div');
    start.className = 'top-bar__start';
    if (backEl) start.appendChild(backEl);
    const end = document.createElement('div');
    end.className = 'top-bar__end';
    if (menuEl) end.appendChild(menuEl);
    const layout = [start, sigEl];
    if (counterEl) layout.push(counterEl);
    layout.push(end);
    topBar.replaceChildren(...layout);
    topBar.classList.add('top-bar--secondary');
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

const SIDEBAR_PRIMARY_KEYS = new Set(
  NAV_SECTIONS.filter((s) => s.primary).map((s) => s.key),
);

function renderSidebarItem(s) {
  const active = s.key === section ? ' active' : '';
  const iconMarkup = s.icon === 'diamond' ? '◆' : navIcon(s.icon);
  return `<a class="sb-item ${s.cls}${active}" href="../?section=${s.key}" data-target="${s.key}"><span class="sb-icon">${iconMarkup}</span><span class="sb-label">${s.label}</span></a>`;
}

function setupSidebarScrollHint(sidebar) {
  const nav = sidebar.querySelector('.sb-nav');
  if (!nav) return;

  function syncNavScrollHint() {
    const atEnd = nav.scrollHeight - nav.scrollTop <= nav.clientHeight + 2;
    nav.classList.toggle('is-scroll-end', atEnd);
  }

  nav.addEventListener('scroll', syncNavScrollHint, { passive: true });
  window.addEventListener('resize', syncNavScrollHint);
  syncNavScrollHint();
}

function buildSidebar() {
  const scrim = document.createElement('div');
  scrim.className = 'lp-drawer-scrim';
  scrim.id = 'exerciseSidebarScrim';
  scrim.setAttribute('aria-hidden', 'true');

  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar lp-drawer';
  sidebar.id = 'exerciseSidebar';
  sidebar.setAttribute('aria-label', 'Navegación HubFlow');

  const primaryItems = NAV_SECTIONS.filter(s => SIDEBAR_PRIMARY_KEYS.has(s.key)).map(renderSidebarItem).join('');

  sidebar.innerHTML = `
    <div class="sb-brand">
      <span class="sb-mark" aria-hidden="true">H</span>
      <div>
        <h1>HubFlow</h1>
        <span class="sb-tag">LearnFlow</span>
      </div>
      <button class="lp-icon-btn lp-icon-btn--sm nav-mode-toggle" id="sbNavModeToggle" type="button" aria-label="${navigationMode() === 'sidebar' ? 'Usar navegación flotante' : 'Usar barra lateral fija'}" title="${navigationMode() === 'sidebar' ? 'Oculta la barra lateral' : 'Fijar barra lateral'}"><span aria-hidden="true">◫</span></button>
    </div>
    <nav class="sb-nav" id="sbNav">
      ${primaryItems}
    </nav>
    <div class="sidebar-footer">
      <button class="sb-item" id="sbAboutBtn" type="button"><span class="sb-icon">${navIcon('info')}</span><span class="sb-label">About LearnFlow</span></button>
      <button class="sb-item" id="sbThemeBtn" type="button"><span class="sb-icon" id="sbThemeIcon">${currentThemeIcon()}</span><span class="sb-label" id="sbThemeLabel">${currentTheme() === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span></button>
      <button class="sb-item" id="sbLoginBtn" type="button" aria-label="Iniciar sesión"><span class="sb-icon">${navIcon('user')}</span><span class="sb-label" id="sbLoginLabel">${(typeof lpLogin !== 'undefined' && lpLogin.getUser()) ? lpLogin.getUser().name : 'Iniciar Sesión'}</span></button>
      <a class="sb-item" href="${themedAppHref('deskflow')}" aria-label="Volver a LearnFlow"><span class="sb-icon">${navIcon('home')}</span><span class="sb-label">Portal</span></a>
    </div>
  `;

  document.body.prepend(scrim, sidebar);
  setupSidebarScrollHint(sidebar);

  function openSidebar() {
    sidebar.classList.add('is-open');
    scrim.classList.add('is-open');
    scrim.setAttribute('aria-hidden', 'false');
    if (typeof lpLogin !== 'undefined' && lpLogin.refreshNavLabels) {
      lpLogin.refreshNavLabels();
    }
  }
  function closeSidebar() {
    // In persistent mode, don't close
    if (isPersistent()) return;
    sidebar.classList.remove('is-open');
    scrim.classList.remove('is-open');
    scrim.setAttribute('aria-hidden', 'true');
  }

  function applyMode() {
    if (isPersistent()) {
      // Persistent: sidebar always visible, body shifted right
      sidebar.classList.add('is-open');
      sidebar.classList.add('is-persistent');
      scrim.classList.remove('is-open');
      scrim.setAttribute('aria-hidden', 'true');
      document.body.classList.add('has-sidebar');
      if (hamburgerBtn) hamburgerBtn.style.display = 'none';
    } else {
      // Off-canvas: sidebar hidden until hamburger clicked
      sidebar.classList.remove('is-open');
      sidebar.classList.remove('is-persistent');
      document.body.classList.remove('has-sidebar');
      scrim.classList.remove('is-open');
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
      scrim.classList.remove('is-open');
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
    lpAbout.open(event);
    closeSidebar();
  });

  // Login trigger
  lpLogin.bindNavButton('#sbLoginBtn', { beforeOpen: closeSidebar, labelSelector: '#sbLoginLabel' });

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
      // Leaving via sidebar (not ←): don't let a later exercise misuse history.back
      sessionStorage.removeItem('hf-history-back');
    });
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && sidebar.classList.contains('is-open')) closeSidebar();
  });
}

buildSidebar();

// ─── Exercise header homologation (all 44 exercise templates) ─────────────────
// Legacy .header stacked cat-bar + modes + dual progress bars without hierarchy.
// Restructure once in the shell — no per-HTML edits.

const HEADER_ORPHAN_SEL = [
  '.progress', '#progressWrap', '.timer-bar', '#timerBar',
  '#catBar', '.cat-bar', '#levelBar', '.cat-bar-wrap', '.cat-scroll-wrapper', '#catWrapper', '.level-bar',
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

  const scopeEl = header.querySelector('.cat-bar-wrap, .cat-scroll-wrapper, #catWrapper, #levelBar, .level-bar')
    || header.querySelector('#catBar, .cat-bar');
  const pillBar = header.querySelector('.pill-bar, .pill-bar--scroll');
  const timerBar = header.querySelector('.timer-bar, #timerBar');
  const sessionProg = header.querySelector('.progress, #progressWrap');
  const pairScore = document.getElementById('pairScore');
  const livesBar = header.querySelector('#livesBar');
  const streakBar = header.querySelector('#streakBar');

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

  if (sessionProg || timerBar || pairScore || livesBar || streakBar) {
    const progress = document.createElement('div');
    progress.className = 'ex-header__progress';
    const row = document.createElement('div');
    row.className = 'ex-progress-row ex-progress-row--session';
    if (timerBar) row.appendChild(timerBar);
    if (pairScore) row.appendChild(pairScore);
    if (livesBar) row.appendChild(livesBar);
    if (streakBar) row.appendChild(streakBar);
    if (sessionProg) row.appendChild(sessionProg);
    progress.appendChild(row);
    parts.push(progress);
  }

  header.querySelector('h1')?.remove();
  header.classList.add('ex-control-panel');
  header.replaceChildren(...parts);
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

/** Place sibling #explainBox between prompt and options (DOM + a11y order). */
function normalizeQuizExplainSlot() {
  document.querySelectorAll('[data-area="quiz"]').forEach((quiz) => {
    const explain = quiz.querySelector(':scope > #explainBox, :scope > .explain-box');
    const opts = quiz.querySelector(':scope > .word-options, :scope > #wordOptions');
    if (!explain || !opts || explain.parentElement !== quiz) return;
    quiz.insertBefore(explain, opts);
  });
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

window.__relocateLessonProgressBtn = relocateProgressButton;
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
normalizeQuizExplainSlot();
ensureBottomNav();
if (currentModule) {
  renderLessonProgress(currentModule.id);
}
initBottomNav();
syncBattleProgressPlacement();

function buildDepthBanner() {
  if (!currentModule) return;
  const depth = getModuleDepth(currentModule.id);
  const guideHref = currentModule.guide ? `../${currentModule.guide}` : null;
  if (!depth && !guideHref) return;

  const chips = [];
  if (depth) {
    chips.push(`<span class="depth-banner__chip"><strong>${depth.items}</strong> items</span>`);
    if (depth.categories > 1) {
      chips.push(`<span class="depth-banner__chip"><strong>${depth.categories}</strong> categorías</span>`);
    }
    chips.push(`<span class="depth-banner__chip"><strong>${depth.modes}</strong> modos</span>`);
    if (depth.hasBattle) {
      chips.push('<span class="depth-banner__chip depth-banner__chip--battle">⚔️ Battle 2P</span>');
    }
  }

  const statsHTML = chips.length
    ? `<div class="depth-banner__stats">${chips.join('')}</div>`
    : '';
  const guideHTML = guideHref
    ? `<a class="depth-banner__guide" href="${guideHref}"><span aria-hidden="true">📘</span> Ver guía de estudio</a>`
    : '';
  const eyebrowHTML = depth
    ? '<p class="depth-banner__eyebrow">Contenido del módulo</p>'
    : (guideHref ? '<p class="depth-banner__eyebrow">Guía de estudio</p>' : '');

  const bannerHTML =
    '<button type="button" class="depth-banner__close lp-icon-btn lp-icon-btn--sm" aria-label="Cerrar">&times;</button>' +
    `<div class="depth-banner__inner">${eyebrowHTML}${statsHTML}${guideHTML}</div>`;

  let activeBanner = null;
  let autoDismiss = null;
  let fadeTimer = null;
  let headerBell = null;

  function setBellExpanded(open) {
    headerBell?.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function hideBanner({ immediate = false } = {}) {
    if (!activeBanner) return;
    clearTimeout(autoDismiss);
    clearTimeout(fadeTimer);
    autoDismiss = null;
    const banner = activeBanner;
    activeBanner = null;
    setBellExpanded(false);
    if (immediate) {
      banner.remove();
      return;
    }
    banner.classList.add('depth-banner--fade');
    fadeTimer = setTimeout(() => banner.remove(), 600);
  }

  function showBanner() {
    hideBanner({ immediate: true });
    // Limpia un banner en fade-out (activeBanner ya es null) antes de abrir otro
    document.querySelectorAll('.depth-banner').forEach((el) => el.remove());
    const banner = document.createElement('div');
    banner.className = 'depth-banner';
    banner.innerHTML = bannerHTML;
    banner.setAttribute('role', 'status');
    document.body.appendChild(banner);
    activeBanner = banner;
    setBellExpanded(true);

    autoDismiss = setTimeout(() => hideBanner(), 5000);
    banner.querySelector('.depth-banner__close').addEventListener('click', () => hideBanner());
  }

  function toggleBanner() {
    if (activeBanner) {
      hideBanner();
      return;
    }
    showBanner();
  }

  addHeaderBell();
  // Desktop: toast automático solo si hay profundidad de módulo (guía sola =
  // campana sin toast). Mobile: nunca auto-abrir — la campana del header
  // sigue disponible; el toast compite con bottom nav y pantallas chicas.
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  if (depth && !isMobile) showBanner();

  function addHeaderBell() {
    const end = document.querySelector('.top-bar__end');
    if (!end) return;
    const bell = document.createElement('button');
    bell.type = 'button';
    bell.className = 'lp-icon-btn depth-bell';
    bell.setAttribute('aria-label', 'Información del módulo');
    bell.setAttribute('aria-expanded', 'false');
    bell.innerHTML = '<span aria-hidden="true">🔔</span>';
    end.insertBefore(bell, end.firstChild);
    headerBell = bell;

    bell.addEventListener('click', toggleBanner);
  }
}

// Reveal as soon as chrome + bottom nav are in place — depth banner / footer
// are non-blocking and used to keep body opacity:0 longer than necessary.
document.body.classList.add('shell-ready');
finalizeBottomNavLayout();

buildDepthBanner();

// ─── Footer ────────────────────────────────────────────────────────────────────

function buildFooter() {
  const footer = document.createElement('footer');
  footer.className = 'lp-footer';
  footer.innerHTML = `
    <span class="lp-footer__meta">HubFlow → LearnFlow</span>
  `;
  document.body.appendChild(footer);
}

buildFooter();

// Cat-bar: wrap + expand badge before first paint (no load-time scroll hint).
initCatBarExpander({ hintOnLoad: false });
