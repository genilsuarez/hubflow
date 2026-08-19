/* ═══════════════════════════════════════════════════════
   HubFlow — Exercise Bottom Nav (canonical)
   Mirrors FluentFlow `game-controls` — single source of truth for
   desktop/mobile visibility, button roles, and bar layout.
   ═══════════════════════════════════════════════════════ */

/** @typedef {'study' | 'answer' | 'battle' | 'minimal' | 'hidden'} BottomNavProfile */

/**
 * Edit visibility and order here. CSS reads `.ex-bottom-nav__desktop-only`
 * for mobile (≤ MOBILE_BREAKPOINT_PX) — same pattern as FluentFlow.
 */
export const BOTTOM_NAV = {
  MOBILE_BREAKPOINT_PX: 768,
  NAV_ID: 'exBottomNav',
  LEGACY_NAV_SELECTOR: '.fc-nav:not(#exBottomNav)',

  BATTLE_ACTION_IDS: ['battleClaim', 'battleJudge', 'battleNext'],
  BATTLE_PHASE_BY_ID: {
    battleClaim: 'claim',
    battleJudge: 'judge',
    battleNext: 'next',
  },

  /**
   * Study-mode nav hidden entirely in battle.
   * `studySpeakBtn` NO está aquí: su visibilidad la decide el propio
   * sentence-quiz-engine (solo en ejercicios con `speech`), y debe seguir
   * disponible en Quiz/Timed — esos modos también pronuncian el item, así
   * que ocultar el toggle dejaba al usuario sin forma de silenciarlo.
   */
  STUDY_NAV_IDS: ['shuffleBtn', 'prevBtn', 'nextBtn', 'speakBtn', 'listenBtn'],

  /**
   * Simétrico de STUDY_NAV_IDS: botones de práctica que se ocultan fuera del
   * perfil `answer`. Necesario en páginas multi-modo (phrasal-verbs,
   * verb-chunks, irregular-verbs), donde Write comparte barra con Study.
   */
  ANSWER_NAV_IDS: ['checkBtn', 'skipBtn', 'hintBtn'],

  /** Quiz/Timed: barra reducida (progreso + skip). Ver perfil `quiz`. */
  QUIZ_NAV_IDS: ['quizSkipBtn'],

  /** Match: barra reducida (progreso + sonido). Ver perfil `match`. */
  MATCH_NAV_IDS: ['matchSoundBtn'],

  /**
   * Button roles — id, desktopOnly, and BEM role class applied by applyRoleClasses().
   * Order within each mode is defined in ORDER.
   */
  ROLES: {
    progress: { id: 'lessonProgressBtn', desktopOnly: false, roleClass: 'ex-bottom-nav__progress' },
    speak: { id: 'speakBtn', desktopOnly: false, roleClass: 'ex-bottom-nav__icon-btn' },
    listen: { id: 'listenBtn', desktopOnly: true, roleClass: 'ex-bottom-nav__icon-btn' },
    // No `desktopOnly`: es el mismo toggle de audio que `speak` en
    // flashcard-engine, y en móvil escuchar la pronunciación es tan útil (o
    // más) que en escritorio. Antes desaparecía por debajo de 768px.
    studySpeak: { id: 'studySpeakBtn', desktopOnly: false, roleClass: 'ex-bottom-nav__icon-btn' },
    shuffle: { id: 'shuffleBtn', desktopOnly: false, roleClass: 'ex-bottom-nav__icon-btn' },
    hint: { id: 'hintBtn', desktopOnly: true, roleClass: 'ex-bottom-nav__icon-btn ex-bottom-nav__hint' },
    prev: { id: 'prevBtn', desktopOnly: false, roleClass: 'ex-bottom-nav__nav-btn' },
    check: { id: 'checkBtn', desktopOnly: false, roleClass: 'ex-bottom-nav__primary-btn' },
    next: { id: 'nextBtn', desktopOnly: false, roleClass: 'ex-bottom-nav__nav-btn' },
    skip: { id: 'skipBtn', desktopOnly: true, roleClass: 'ex-bottom-nav__icon-btn ex-bottom-nav__skip' },
    quizSkip: { id: 'quizSkipBtn', desktopOnly: false, roleClass: 'ex-bottom-nav__quiz-skip' },
    quizNext: { id: 'quizNextBtn', desktopOnly: false, roleClass: 'ex-bottom-nav__quiz-next' },
    matchSound: { id: 'matchSoundBtn', desktopOnly: false, roleClass: 'ex-bottom-nav__icon-btn' },
  },

  /** Canonical left → right order per profile (FluentFlow game-controls parity). */
  ORDER: {
    study: ['lessonProgressBtn', 'speakBtn', 'listenBtn', 'studySpeakBtn', 'shuffleBtn', 'prevBtn', 'nextBtn'],
    answer: ['lessonProgressBtn', 'hintBtn', 'checkBtn', 'nextBtn', 'skipBtn'],
    battle: ['lessonProgressBtn'],
    /** Tap-to-answer modes (sentence-quiz quiz, listening, etc.) — progress only */
    minimal: ['lessonProgressBtn'],
    /** Quiz/Timed — barra reducida: progreso + skip (sin nav de tarjetas/sonido). */
    quiz: ['lessonProgressBtn', 'studySpeakBtn', 'quizSkipBtn', 'quizNextBtn'],
    /** Match — barra reducida: progreso + sonido de feedback (aciertos/errores). */
    match: ['lessonProgressBtn', 'matchSoundBtn'],
  },
};

const DESKTOP_ONLY_CLASS = 'ex-bottom-nav__desktop-only';

/** Active battle button group — owned by flashcard-engine phase transitions. */
let battleActionPhase = null;

function applyBattleActionVisibility() {
  BOTTOM_NAV.BATTLE_ACTION_IDS.forEach((id) => {
    const group = document.getElementById(id);
    if (!group) return;
    const visible = battleActionPhase === BOTTOM_NAV.BATTLE_PHASE_BY_ID[id];
    group.hidden = !visible;
    group.style.setProperty('display', visible ? 'flex' : 'none');
  });
}

/** Show one battle action group (claim | judge | next). */
export function syncBattleActionVisibility(phase) {
  battleActionPhase = phase;
  applyBattleActionVisibility();
}

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
 * ¿El botón de comprobar pertenece al área que se está viendo?
 *
 * En páginas de un solo modo (spelling, dictation) #checkBtn siempre está
 * activo. En las multi-modo (phrasal-verbs, verb-chunks, irregular-verbs) vive
 * dentro de `[data-area="write"]`: si se mirara solo su existencia, el perfil
 * sería `answer` también en Study y se ocultaría la navegación de tarjetas.
 */
function isCheckBtnActive() {
  const checkBtn = document.getElementById('checkBtn');
  if (!checkBtn) return false;
  // Se iza a la barra (fuera de [data-area]), así que el área de origen se
  // memoriza la primera vez, mientras el botón sigue en su sitio.
  const owner = checkBtn.dataset.ownerArea ?? rememberCheckBtnArea(checkBtn);
  if (!owner) return true;
  return document.querySelector(`[data-area="${owner}"]`)?.classList.contains('show') ?? true;
}

/** Guarda en el botón el `data-area` en el que nació, si lo hay. */
function rememberCheckBtnArea(checkBtn) {
  const area = checkBtn.closest('[data-area]')?.dataset.area;
  if (area) checkBtn.dataset.ownerArea = area;
  return area ?? '';
}

/**
 * Map engine + mode + visible area → bottom-nav profile.
 * See AGENTS.md "Exercise bottom nav" for the per-engine matrix.
 */
export function resolveBottomNavProfile() {
  const mode = getActiveExerciseMode();
  const area = getVisibleExerciseArea();

  if (mode === 'battle') return 'battle';
  if (area === 'match' && BOTTOM_NAV.ORDER.match) return 'match';

  // Antes del área: 12 páginas de respuesta escrita tienen su #checkBtn dentro
  // del área Quiz, y necesitan la barra de escritura (comprobar/pista/saltar),
  // no la reducida. Cuando ese área se llamaba `practice` el orden daba igual
  // porque el atajo de abajo solo miraba `quiz`; al unificar ambos nombres en
  // `quiz` (2026-08-19) este check tiene que ir primero o esas páginas se
  // quedan sin botón Comprobar.
  if (isCheckBtnActive()) return 'answer';

  // 'quiz' es el área compartida por los modos Quiz y Timed (mismo markup, ver
  // flashcard-engine.js initQuiz/initTimed) y también por el sentence-quiz
  // engine — todos usan la barra reducida (progreso + saltar/siguiente).
  if (area === 'quiz' && BOTTOM_NAV.ORDER.quiz) return 'quiz';
  if (mode === 'quiz' || mode === 'timed') return 'quiz';

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
    nav.classList.toggle('ex-bottom-nav--answer', profile === 'answer');
    nav.classList.toggle('ex-bottom-nav--study', profile === 'study');
    nav.classList.toggle('ex-bottom-nav--minimal', profile === 'minimal');
    nav.classList.toggle('ex-bottom-nav--quiz', profile === 'quiz');
    nav.classList.toggle('ex-bottom-nav--match', profile === 'match');
  }

  const toggleGroup = (ids, hide) => ids.forEach((id) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.hidden = hide;
    if (hide) btn.style.display = 'none';
    else btn.style.removeProperty('display');
  });

  toggleGroup(BOTTOM_NAV.STUDY_NAV_IDS, profile !== 'study');
  toggleGroup(BOTTOM_NAV.ANSWER_NAV_IDS, profile !== 'answer');
  // quizSkipBtn y quizNextBtn son mutuamente excluyentes según si la pregunta
  // actual ya fue respondida — eso lo decide el motor del ejercicio con
  // setQuizAnswered(), no este perfil. Si se fuerza quizSkipBtn a visible solo
  // por estar en modo Quiz (sin mirar si quizNextBtn ya está mostrándose),
  // cualquier re-sync (resize, rotación, cambio de mode-tab) lo reaparece
  // encima de "Siguiente →" — los dos visibles a la vez.
  const quizNextBtn = document.getElementById('quizNextBtn');
  const questionAnswered = profile === 'quiz' && quizNextBtn && !quizNextBtn.hidden;
  toggleGroup(BOTTOM_NAV.QUIZ_NAV_IDS, profile !== 'quiz' || questionAnswered);
  toggleGroup(BOTTOM_NAV.MATCH_NAV_IDS, profile !== 'match');

  if (profile !== 'battle') {
    battleActionPhase = null;
    BOTTOM_NAV.BATTLE_ACTION_IDS.forEach((id) => {
      const group = document.getElementById(id);
      if (!group) return;
      group.hidden = true;
      group.style.display = 'none';
    });
  } else if (battleActionPhase) {
    applyBattleActionVisibility();
  }

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
  setupAnswerBottomNav(attempt);
}

/**
 * Hoist #checkBtn (and optional #nextBtn, #hintBtn, #skipBtn) into #exBottomNav.
 * Spelling exercises only have checkBtn; typed-answer/dictation add next/hint/skip.
 */
export function setupAnswerBottomNav(attempt = 0) {
  const checkBtn = document.getElementById('checkBtn');
  if (!checkBtn) return;

  const nav = ensureBottomNav({ force: true }) || getBottomNav();
  if (!nav) {
    if (attempt < 40) setTimeout(() => setupAnswerBottomNav(attempt + 1), 50);
    return;
  }

  // El área de origen decide qué botones son "de esta práctica": en páginas
  // multi-modo, #nextBtn puede ser el de Study y no debe reestilizarse.
  const ownerArea = rememberCheckBtnArea(checkBtn) || checkBtn.dataset.ownerArea || '';
  const sameArea = (btn) => {
    if (!btn) return null;
    // se memoriza igual que en checkBtn, porque el hoist los saca del área
    if (btn.dataset.ownerArea === undefined) {
      btn.dataset.ownerArea = btn.closest('[data-area]')?.dataset.area ?? '';
    }
    return btn.dataset.ownerArea === ownerArea ? btn : null;
  };

  const nextBtn = sameArea(document.getElementById('nextBtn'));
  const hintBtn = sameArea(document.getElementById('hintBtn'));
  const skipBtn = sameArea(document.getElementById('skipBtn'));
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

  nav.classList.add('ex-bottom-nav--answer');
  applyRoleClasses();
  reorderBottomNav('answer');
  syncBottomNavMode();
}

export function setAnswerBottomNav({ check = true, next = false, skip = true } = {}) {
  // No basta con `hidden`: en el perfil `answer`, toggleGroup() ya ha dejado
  // un `style.display = 'none'` inline sobre #nextBtn (está en STUDY_NAV_IDS),
  // y ese inline gana. Sin limpiarlo, typed-answer-engine se quedaba sin
  // ningún control visible tras responder — solo se podía avanzar con Enter.
  const setVisible = (btn, show) => {
    if (!btn) return;
    btn.hidden = !show;
    if (show) btn.style.removeProperty('display');
    else btn.style.display = 'none';
  };
  setVisible(document.getElementById('checkBtn'), check);
  setVisible(document.getElementById('nextBtn'), next);
  setVisible(document.getElementById('skipBtn'), skip);
}

/** Create studySpeak button with canonical classes (sentence-quiz-engine). */
export function createStudySpeakButton({ onClick, active = false } = {}) {
  const btn = document.createElement('button');
  btn.id = 'studySpeakBtn';
  btn.type = 'button';
  btn.className = 'lp-btn lp-btn--ghost ex-bottom-nav__icon-btn';
  btn.classList.toggle('is-on', active);
  btn.textContent = active ? '🔊' : '🔇';
  const label = active ? 'Pronunciación automática: ON' : 'Pronunciación automática: OFF';
  btn.setAttribute('aria-label', label);
  btn.setAttribute('aria-pressed', String(active));
  btn.title = label;
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
  window.__syncBattleActionVisibility = syncBattleActionVisibility;
  window.__setupAnswerBottomNav = setupAnswerBottomNav;
  window.__insertInBottomNav = insertInBottomNav;
  window.__finalizeBottomNavLayout = finalizeBottomNavLayout;
}
