/* ═══════════════════════════════════════════════════════
   HubFlow — Exercise Bottom Nav (canonical)
   Mirrors FluentFlow `game-controls` — single source of truth for
   desktop/mobile visibility, button roles, and bar layout.
   ═══════════════════════════════════════════════════════ */

/** @typedef {'study' | 'practice' | 'battle' | 'minimal' | 'hidden'} BottomNavProfile */

/**
 * Edit visibility and order here. CSS reads `.ex-bottom-nav__desktop-only`
 * for mobile (≤ MOBILE_BREAKPOINT_PX) — same pattern as FluentFlow.
 */
export const BOTTOM_NAV = {
  MOBILE_BREAKPOINT_PX: 768,
  NAV_ID: 'exBottomNav',
  LEGACY_NAV_SELECTOR: '.fc-nav:not(#exBottomNav)',

  BATTLE_ACTION_IDS: ['battleClaim', 'battleJudge', 'battleNext'],

  /** Study-mode nav hidden entirely in battle. */
  STUDY_NAV_IDS: ['shuffleBtn', 'prevBtn', 'nextBtn', 'speakBtn', 'listenBtn', 'studySpeakBtn'],

  /**
   * Button roles — id, desktopOnly, and BEM role class applied by applyRoleClasses().
   * Order within each mode is defined in ORDER.
   */
  ROLES: {
    progress: { id: 'lessonProgressBtn', desktopOnly: false, roleClass: 'ex-bottom-nav__progress' },
    speak: { id: 'speakBtn', desktopOnly: false, roleClass: 'ex-bottom-nav__icon-btn' },
    listen: { id: 'listenBtn', desktopOnly: true, roleClass: 'ex-bottom-nav__icon-btn' },
    studySpeak: { id: 'studySpeakBtn', desktopOnly: true, roleClass: 'ex-bottom-nav__icon-btn' },
    shuffle: { id: 'shuffleBtn', desktopOnly: false, roleClass: 'ex-bottom-nav__icon-btn' },
    hint: { id: 'hintBtn', desktopOnly: true, roleClass: 'ex-bottom-nav__icon-btn ex-bottom-nav__hint' },
    prev: { id: 'prevBtn', desktopOnly: false, roleClass: 'ex-bottom-nav__nav-btn' },
    check: { id: 'checkBtn', desktopOnly: false, roleClass: 'ex-bottom-nav__primary-btn' },
    next: { id: 'nextBtn', desktopOnly: false, roleClass: 'ex-bottom-nav__nav-btn' },
    skip: { id: 'skipBtn', desktopOnly: true, roleClass: 'ex-bottom-nav__icon-btn ex-bottom-nav__skip' },
  },

  /** Canonical left → right order per profile (FluentFlow game-controls parity). */
  ORDER: {
    study: ['lessonProgressBtn', 'speakBtn', 'listenBtn', 'studySpeakBtn', 'shuffleBtn', 'prevBtn', 'nextBtn'],
    practice: ['lessonProgressBtn', 'hintBtn', 'checkBtn', 'nextBtn', 'skipBtn'],
    battle: ['lessonProgressBtn'],
    /** Tap-to-answer modes (sentence-quiz practice, listening, etc.) — progress only */
    minimal: ['lessonProgressBtn'],
  },

  /** Flashcard areas with no bottom controls (options/pairs in content). */
  HIDDEN_AREAS: ['quiz', 'match'],
};

const DESKTOP_ONLY_CLASS = 'ex-bottom-nav__desktop-only';

export function getBottomNav() {
  return document.getElementById(BOTTOM_NAV.NAV_ID);
}

/** Pin #exBottomNav at the bottom of .wrap (flex column — reliable on mobile). */
function relocateBottomNavForLayout(nav) {
  const wrap = document.querySelector('.wrap');
  if (!nav || !wrap) return;

  const overlay = wrap.querySelector('.result-overlay');
  if (overlay?.parentElement === wrap) {
    if (nav.parentElement !== wrap || nav.nextElementSibling !== overlay) {
      wrap.insertBefore(nav, overlay);
    }
    return;
  }

  if (nav.parentElement !== wrap) wrap.appendChild(nav);
}

export function getActiveExerciseMode() {
  return (
    document.querySelector('.ex-header__modes [data-mode].active')?.dataset.mode
    || document.querySelector('.pill-btn.active[data-mode]')?.dataset.mode
    || document.querySelector('[data-mode].active')?.dataset.mode
    || 'study'
  );
}

export function getVisibleExerciseArea() {
  return document.querySelector('[data-area].show')?.dataset.area ?? null;
}

/**
 * Map engine + mode + visible area → bottom-nav profile.
 * See AGENTS.md "Exercise bottom nav" for the per-engine matrix.
 */
export function resolveBottomNavProfile() {
  const mode = getActiveExerciseMode();
  const area = getVisibleExerciseArea();

  if (mode === 'battle') return 'battle';
  if (area && BOTTOM_NAV.HIDDEN_AREAS.includes(area)) return 'hidden';

  if (document.getElementById('checkBtn')) return 'practice';

  if (area === 'practice' || mode === 'practice' || mode === 'timed') return 'minimal';

  return 'study';
}

/** Tag role + desktop-only classes on every known control. */
export function applyRoleClasses() {
  Object.values(BOTTOM_NAV.ROLES).forEach(({ id, desktopOnly, roleClass }) => {
    const el = document.getElementById(id);
    if (!el) return;
    roleClass.split(/\s+/).forEach((cls) => el.classList.add(cls));
    if (desktopOnly) el.classList.add(DESKTOP_ONLY_CLASS);
  });
}

/** Reorder visible children to match BOTTOM_NAV.ORDER for the active profile. */
export function reorderBottomNav(profile = resolveBottomNavProfile()) {
  const nav = getBottomNav();
  if (!nav) return;

  const orderKey = BOTTOM_NAV.ORDER[profile] ? profile : 'study';
  const ids = [...BOTTOM_NAV.ORDER[orderKey]];

  if (orderKey === 'battle') {
    BOTTOM_NAV.BATTLE_ACTION_IDS.forEach((id) => ids.push(id));
  }

  let insertAfter = null;
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (!el || el.parentElement !== nav) return;
    if (!insertAfter) {
      nav.insertBefore(el, nav.firstChild);
    } else {
      insertAfter.insertAdjacentElement('afterend', el);
    }
    insertAfter = el;
  });
}

function normalizeSpeakButtons(nav) {
  nav.querySelectorAll('#speakBtn, #listenBtn, .listen-btn').forEach((btn) => {
    btn.classList.add('lp-btn', 'lp-btn--ghost', 'ex-bottom-nav__icon-btn');
    btn.classList.remove('listen-btn');
    btn.style.cssText = '';
  });
}

/** Hoist legacy `.fc-nav` into persistent `#exBottomNav`. */
export function ensureBottomNav({ force = false } = {}) {
  const wrap = document.querySelector('.wrap');
  const scrollBody = document.querySelector('.scroll-body');
  const anchor = wrap || scrollBody;
  if (!anchor) return null;

  const legacyNav = document.querySelector(BOTTOM_NAV.LEGACY_NAV_SELECTOR);
  const hasCheckControls = Boolean(document.getElementById('checkBtn'));
  let nav = getBottomNav();
  if (!nav && !legacyNav && !force && !hasCheckControls) return null;

  if (!nav) {
    nav = document.createElement('div');
    nav.id = BOTTOM_NAV.NAV_ID;
    nav.className = 'ex-bottom-nav fc-nav';
    if (wrap && scrollBody) relocateBottomNavForLayout(nav);
    else (scrollBody || wrap).appendChild(nav);
  } else {
    relocateBottomNavForLayout(nav);
  }

  if (legacyNav) {
    while (legacyNav.firstChild) nav.appendChild(legacyNav.firstChild);
    legacyNav.remove();
  }

  normalizeSpeakButtons(nav);
  return nav;
}

export function relocateBattleActions() {
  const nav = ensureBottomNav({ force: true }) || getBottomNav();
  if (!nav) return;

  let insertAfter = document.getElementById('lessonProgressBtn');
  BOTTOM_NAV.BATTLE_ACTION_IDS.forEach((id) => {
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

export function syncBottomNavMode() {
  const profile = resolveBottomNavProfile();
  const nav = getBottomNav();
  if (nav) {
    const hideNav = profile === 'hidden';
    nav.hidden = hideNav;
    nav.classList.toggle('ex-bottom-nav--hidden', hideNav);
    nav.classList.remove('is-battle-hidden');
    nav.classList.toggle('ex-bottom-nav--battle', profile === 'battle');
    nav.classList.toggle('ex-bottom-nav--practice', profile === 'practice');
    nav.classList.toggle('ex-bottom-nav--study', profile === 'study');
    nav.classList.toggle('ex-bottom-nav--minimal', profile === 'minimal');
  }

  const hideStudyNav = profile !== 'study';
  BOTTOM_NAV.STUDY_NAV_IDS.forEach((id) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.hidden = hideStudyNav;
    if (hideStudyNav) btn.style.display = 'none';
    else btn.style.removeProperty('display');
  });

  BOTTOM_NAV.BATTLE_ACTION_IDS.forEach((id) => {
    const group = document.getElementById(id);
    if (!group) return;
    if (profile !== 'battle') group.style.display = 'none';
    else group.style.removeProperty('display');
  });

  applyRoleClasses();
  reorderBottomNav(profile);
}

export function relocateProgressButton() {
  const btn = document.getElementById('lessonProgressBtn');
  if (!btn) return;

  const nav = ensureBottomNav({ force: true }) || getBottomNav();
  if (!nav) return;

  btn.classList.add('lp-btn', 'lp-btn--ghost', 'lesson-progress__detail', 'ex-bottom-nav__progress');
  if (btn.parentElement !== nav || btn !== nav.firstElementChild) {
    nav.insertBefore(btn, nav.firstChild);
  }

  syncBottomNavMode();
  relocateBattleActions();
  setupContentBottomNav();
  reorderStudySpeakButton();
  applyRoleClasses();
}

function reorderStudySpeakButton() {
  const speakBtn = document.getElementById('studySpeakBtn');
  const progressBtn = document.getElementById('lessonProgressBtn');
  const nav = getBottomNav();
  if (!speakBtn || speakBtn.hidden || !nav || speakBtn.parentElement !== nav) return;
  if (progressBtn?.parentElement === nav) {
    progressBtn.insertAdjacentElement('afterend', speakBtn);
  }
}

function removeHoistedControlWrapper(wrapper) {
  if (!wrapper || wrapper.id === BOTTOM_NAV.NAV_ID || wrapper.classList.contains('ex-bottom-nav')) return;
  if (wrapper.childElementCount > 0) return;
  if (wrapper.classList.contains('check-area')) {
    wrapper.remove();
    return;
  }
  if (!wrapper.id && wrapper.tagName === 'DIV') wrapper.remove();
}

/** Auto-hoist check (+ optional next/hint/skip) into #exBottomNav. */
export function setupContentBottomNav(attempt = 0) {
  setupPracticeBottomNav(attempt);
}

/** @deprecated Use setupPracticeBottomNav — kept for imports. */
export function setupSpellingBottomNav(attempt = 0) {
  setupPracticeBottomNav(attempt);
}

/**
 * Hoist #checkBtn (and optional #nextBtn, #hintBtn, #skipBtn) into #exBottomNav.
 * Spelling exercises only have checkBtn; typed-answer/dictation add next/hint/skip.
 */
export function setupPracticeBottomNav(attempt = 0) {
  const checkBtn = document.getElementById('checkBtn');
  if (!checkBtn) return;

  const nav = ensureBottomNav({ force: true }) || getBottomNav();
  if (!nav) {
    if (attempt < 40) setTimeout(() => setupPracticeBottomNav(attempt + 1), 50);
    return;
  }

  const nextBtn = document.getElementById('nextBtn');
  const hintBtn = document.getElementById('hintBtn');
  const skipBtn = document.getElementById('skipBtn');
  const progressBtn = document.getElementById('lessonProgressBtn');
  const checkOnly = !nextBtn;

  checkBtn.className = 'lp-btn lp-btn--primary typed-action-btn typed-action-btn--check ex-bottom-nav__primary-btn';
  checkBtn.textContent = '✓';
  checkBtn.setAttribute('aria-label', checkOnly ? 'Comprobar todo' : 'Comprobar respuesta');
  checkBtn.title = checkOnly ? 'Comprobar' : 'Comprobar';
  checkBtn.hidden = false;

  if (nextBtn) {
    nextBtn.className = 'lp-btn lp-btn--primary typed-action-btn typed-action-btn--next ex-bottom-nav__nav-btn';
    nextBtn.textContent = '→';
    nextBtn.setAttribute('aria-label', 'Siguiente');
    nextBtn.title = 'Siguiente';
    nextBtn.hidden = nextBtn.style.display === 'none' || nextBtn.hidden;
    nextBtn.style.removeProperty('display');
  }

  if (hintBtn) {
    hintBtn.className = 'lp-btn lp-btn--ghost typed-hint-btn ex-bottom-nav__icon-btn ex-bottom-nav__hint ex-bottom-nav__desktop-only';
    hintBtn.textContent = '💡';
    hintBtn.setAttribute('aria-label', 'Mostrar pista');
    hintBtn.setAttribute('aria-pressed', 'false');
    hintBtn.title = 'Pista';
  }

  if (skipBtn) {
    skipBtn.className = 'lp-btn lp-btn--ghost typed-action-btn typed-action-btn--skip ex-bottom-nav__icon-btn ex-bottom-nav__skip ex-bottom-nav__desktop-only';
    skipBtn.textContent = '⏭';
    skipBtn.setAttribute('aria-label', 'Saltar');
    skipBtn.title = 'Saltar';
  }

  const wrapper = checkBtn.parentElement;
  let insertAfter = progressBtn?.parentElement === nav ? progressBtn : null;

  [hintBtn, checkBtn, nextBtn, skipBtn].filter(Boolean).forEach((btn) => {
    if (btn.parentElement === nav) return;
    if (insertAfter?.parentElement === nav) insertAfter.insertAdjacentElement('afterend', btn);
    else nav.appendChild(btn);
    insertAfter = btn;
  });

  const meta = document.querySelector('.typed-answer-meta');
  if (meta && hintBtn && !meta.contains(hintBtn)) {
    const counter = meta.querySelector('.item-counter');
    if (counter) meta.parentElement?.insertBefore(counter, meta);
    meta.remove();
  }

  removeHoistedControlWrapper(wrapper);

  nav.classList.add('ex-bottom-nav--practice');
  applyRoleClasses();
  reorderBottomNav('practice');
  syncBottomNavMode();
}

export function setPracticeBottomNav({ check = true, next = false, skip = true } = {}) {
  const checkBtn = document.getElementById('checkBtn');
  const nextBtn = document.getElementById('nextBtn');
  const skipBtn = document.getElementById('skipBtn');
  if (checkBtn) checkBtn.hidden = !check;
  if (nextBtn) nextBtn.hidden = !next;
  if (skipBtn) skipBtn.hidden = !skip;
}

/** Create studySpeak button with canonical classes (sentence-quiz-engine). */
export function createStudySpeakButton({ onClick, active = false } = {}) {
  const btn = document.createElement('button');
  btn.id = 'studySpeakBtn';
  btn.type = 'button';
  btn.className = 'lp-btn lp-btn--ghost ex-bottom-nav__icon-btn ex-bottom-nav__desktop-only';
  btn.textContent = '🔊';
  btn.setAttribute('aria-label', 'Activar auto-pronunciación');
  btn.setAttribute('aria-pressed', String(active));
  btn.title = 'Activar auto-pronunciación';
  if (onClick) btn.addEventListener('click', onClick);
  return btn;
}

/** Insert a control into the bottom nav after progress (or before shuffle). */
export function insertInBottomNav(btn, attempt = 0) {
  const nav = getBottomNav() || document.querySelector('.fc-nav');
  if (!nav) {
    if (attempt < 24) setTimeout(() => insertInBottomNav(btn, attempt + 1), 50);
    return;
  }
  const progressBtn = document.getElementById('lessonProgressBtn');
  const shuffleBtn = document.getElementById('shuffleBtn');
  if (btn.parentElement === nav) return;
  if (progressBtn?.parentElement === nav) progressBtn.insertAdjacentElement('afterend', btn);
  else if (shuffleBtn?.parentElement === nav) nav.insertBefore(btn, shuffleBtn);
  else nav.insertBefore(btn, nav.firstChild);
  applyRoleClasses();
}

/** One-shot init — called from exercise-shell.js after DOM is ready. */
export function initBottomNav() {
  if (document.getElementById('checkBtn') || document.querySelector(BOTTOM_NAV.LEGACY_NAV_SELECTOR)) {
    ensureBottomNav({ force: true });
  } else {
    ensureBottomNav();
  }
  relocateProgressButton();
  relocateBattleActions();
  setupContentBottomNav();
  syncBottomNavMode();
  applyRoleClasses();
}

/** Re-pin nav after exercise-shell adds shell-ready + footer. */
export function finalizeBottomNavLayout() {
  const nav = getBottomNav();
  if (!nav) return;
  relocateBottomNavForLayout(nav);
  syncBottomNavMode();
  applyRoleClasses();
}

if (typeof window !== 'undefined') {
  window.__relocateLessonProgressBtn = relocateProgressButton;
  window.__syncBottomNavMode = syncBottomNavMode;
  window.__setupPracticeBottomNav = setupPracticeBottomNav;
  window.__finalizeBottomNavLayout = finalizeBottomNavLayout;
}
