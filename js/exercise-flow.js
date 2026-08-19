/* ═══════════════════════════════════════════════════════
   HubFlow — Exercise Flow
   Session-level helpers: result screen, Study-mode flashcard
   advance, and the shared pair-matching (Match) mode.
   ═══════════════════════════════════════════════════════ */

import { shuffle } from './array-utils.js';
import { recordScore, getStars } from './progress-store.js';
import { syncModeTabsActive, formatTime } from './exercise-ui.js';
import { RESULT_TITLES } from './result-copy.js';

/** Show result overlay.
 *  `suggestion` — optional { cat, mode, isNewCategory, label?, onContinue } from
 *  the engine's findStudyFollowUp(). When present, adds "Siguiente: …" subtitle
 *  and changes the primary button to "Continuar →" which calls suggestion.onContinue(). */
function showResult({ correct, total, containerEl, onRestart, onStudy, elapsedSeconds, suggestion }) {
  const pct = Math.round((correct / total) * 100);
  const stars = getStars(pct);
  const titles = RESULT_TITLES;

  const timeHtml = elapsedSeconds != null
    ? `<div class="result-time">⏱ ${formatTime(elapsedSeconds)}</div>`
    : '';

  const nextHtml = suggestion
    ? `<div class="result-sub result-next">Siguiente: ${suggestion.label}</div>`
    : '';

  // When there's a suggestion the primary is "Continuar →"; otherwise keep the
  // previous behaviour: "Reintentar" primary + optional "Study" ghost.
  const btnsHtml = suggestion
    ? `<button class="lp-btn lp-btn--ghost" id="resultRestart">🔄 Reintentar</button>
       <button class="lp-btn lp-btn--purple" id="resultContinue">Continuar →</button>`
    : `<button class="lp-btn lp-btn--primary" id="resultRestart">🔄 Reintentar</button>
       ${onStudy ? '<button class="lp-btn lp-btn--ghost" id="resultStudy">📖 Study</button>' : ''}`;

  containerEl.innerHTML = `
    <div class="result-box">
      <button class="result-close" id="resultClose" aria-label="Cerrar">✕</button>
      <div class="result-stars">
        <span class="result-star ${stars >= 1 ? 'lit' : ''}">⭐</span>
        <span class="result-star ${stars >= 2 ? 'lit' : ''}">⭐</span>
        <span class="result-star ${stars >= 3 ? 'lit' : ''}">⭐</span>
      </div>
      <div class="result-title">${titles[stars]}</div>
      <div class="result-sub">${correct}/${total} correctas — ${pct}%</div>
      ${timeHtml}
      ${nextHtml}
      <div class="result-btns">${btnsHtml}</div>
    </div>
  `;
  // Move overlay to body to escape .wrap stacking context (z-index: 1)
  if (containerEl.parentElement !== document.body) {
    document.body.appendChild(containerEl);
  }
  containerEl.classList.add('show');

  // The quiz's own "Siguiente/Ver resultado →" button (#quizNextBtn) lives
  // outside this overlay and stays visible underneath it once the last
  // question finishes. Every engine's keydown handler gates Enter on
  // `!quizNextBtn.hidden`, so without hiding it, Enter here would re-fire
  // that stale button's onclick (re-render the last question) — hiding it
  // makes each engine's own handler return as a no-op on Enter, so it never
  // calls preventDefault() and the listener below still gets to run.
  const staleNextBtn = document.getElementById('quizNextBtn');
  if (staleNextBtn) staleNextBtn.hidden = true;

  // Enter/Space activates the primary action while the overlay is open. Not
  // relying on native "Enter activates the focused button" here — DOM focus
  // right after this innerHTML swap proved unreliable to key straight into a
  // click across browsers/engines, so this listens explicitly instead. It's
  // registered on document AFTER each engine's own keydown handler (added at
  // page init), so it runs later in the same dispatch and can still act even
  // though it doesn't call stopPropagation on the earlier one.
  const onOverlayKeydown = (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    const primaryBtn = containerEl.querySelector('#resultContinue') || containerEl.querySelector('#resultRestart');
    primaryBtn?.click();
  };
  document.addEventListener('keydown', onOverlayKeydown);
  const closeOverlay = () => {
    containerEl.classList.remove('show');
    document.removeEventListener('keydown', onOverlayKeydown);
  };

  requestAnimationFrame(() => {
    containerEl.querySelector('#resultClose')?.addEventListener('click', closeOverlay);
    containerEl.querySelector('#resultRestart')?.addEventListener('click', () => {
      closeOverlay();
      onRestart();
    });
    containerEl.querySelector('#resultStudy')?.addEventListener('click', () => {
      closeOverlay();
      onStudy();
    });
    containerEl.querySelector('#resultContinue')?.addEventListener('click', () => {
      closeOverlay();
      suggestion.onContinue();
    });
  });

  return pct;
}

/** Wraps showResult() with the containerEl/onRestart/onStudy boilerplate every standalone
 *  exercise repeats at its finish*() call sites. Pass `setMode` only for exercises that have
 *  a Study mode to jump back to — omit it (or pass nothing) to get onStudy: null.
 *  Pass `suggestion` (from the engine's findStudyFollowUp()) to show the "Siguiente:" hint
 *  and "Continuar →" button. recordScore() stays the caller's responsibility. */
export function finishExercise({ correct, total, startMode, setMode, elapsedSeconds, suggestion }) {
  return showResult({
    correct, total,
    containerEl: document.getElementById('resultOverlay'),
    onRestart: () => startMode(),
    onStudy: setMode ? () => { setMode('study'); syncModeTabsActive('study'); startMode(); } : null,
    elapsedSeconds,
    suggestion,
  });
}

/** Walks the categories after `currentCat`, wrapping around, and returns the first
 *  one `isPending` accepts (or null). Only the traversal is shared: which keys
 *  count as pending, and what to do with the result, stay in each engine because
 *  those are its own progress rules. Eight engines had this same wrap-around loop
 *  hand-written before 2026-08-19. */
export function findNextPendingCategory({ categories, currentCat, isPending }) {
  const catKeys = Object.keys(categories);
  const startIdx = catKeys.indexOf(currentCat);
  for (let i = 1; i <= catKeys.length; i++) {
    const cat = catKeys[(startIdx + i) % catKeys.length];
    if (cat === currentCat) continue;
    if (isPending(cat)) return cat;
  }
  return null;
}

/** Enter confirms the visible "Siguiente →" in Quiz/Timed. Call it from the
 *  engine's own keydown listener while in a question mode. */
export function handleQuizNextKeydown(e) {
  if (e.key !== 'Enter') return;
  const nextBtn = document.getElementById('quizNextBtn');
  if (nextBtn && !nextBtn.hidden) { e.preventDefault(); nextBtn.click(); }
}

/** Study-mode keyboard: Enter/Space flips the card, or advances when it's already
 *  flipped; arrows step through the deck. While the end-of-deck overlay is open it
 *  confirms that overlay's primary action instead, so the shortcut never reaches
 *  the hidden card underneath.
 *
 *  Blurring a focused BUTTON first is what stops a mouse-clicked "→" from eating
 *  the next Space/Enter and re-firing itself. That guard existed in only three of
 *  the nine copies of this handler before they were merged here on 2026-08-19 —
 *  the other six silently lacked it. */
export function handleStudyKeydown(e, { advanceCard, cardId = 'fcCard' }) {
  if (handleOverlayKeydown(e)) return;

  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    flipOrAdvanceCard(advanceCard, cardId);
  } else if (e.key === 'ArrowRight') { e.preventDefault(); advanceCard(1); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); advanceCard(-1); }
}

/** Enter/Space confirm the result overlay's primary action, Escape dismisses it.
 *  Returns true when the overlay was open, so callers stop before acting on the
 *  card underneath.
 *
 *  The selector chains cover both overlay markups — showStudyFollowUpOverlay's
 *  (#resultContinue / #resultRestudy / #resultDismiss) and showResult's
 *  (#resultContinue / #resultRestart / #resultClose). Note the primary chain
 *  deliberately never targets `.lp-btn--purple`: in the lesson-complete variant
 *  that button is the "Salir" link, and Enter must not navigate out of the
 *  lesson. Before 2026-08-19 flashcard-engine did target it, and aimed Escape at
 *  an id the result overlay does not have. */
export function handleOverlayKeydown(e) {
  const overlay = document.getElementById('resultOverlay');
  if (!overlay || !overlay.classList.contains('show')) return false;

  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    const primary = overlay.querySelector('#resultContinue')
      || overlay.querySelector('#resultRestudy')
      || overlay.querySelector('#resultRestart');
    primary?.click();
  } else if (e.key === 'Escape') {
    e.preventDefault();
    (overlay.querySelector('#resultDismiss') || overlay.querySelector('#resultClose'))?.click();
  }
  return true;
}

/** Space/Enter on a Study card: reveal the answer, or move on if it's already
 *  revealed. Blurring a focused BUTTON first is what stops a mouse-clicked "→"
 *  from eating the next keypress and re-firing itself instead. */
export function flipOrAdvanceCard(advanceCard, cardId = 'fcCard') {
  if (document.activeElement && document.activeElement.tagName === 'BUTTON') {
    document.activeElement.blur();
  }
  const card = document.getElementById(cardId);
  if (!card) return;
  if (card.classList.contains('flip')) advanceCard(1);
  else squeezeToggle(card, 'flip');
}

/** The end-of-deck overlay every Study mode shows once the last card is reached:
 *  "Continuar →" to the suggested next step, or a lesson-complete state when
 *  there's nothing left. Markup and wiring were byte-identical in all ten engines
 *  until 2026-08-19 — only the four hooks below ever differed, so a copy that
 *  drifted was a bug waiting to happen.
 *
 *  `suggestion` — falsy renders the lesson-complete variant.
 *  `subtitle`   — the "Siguiente: …" line (callers build their own label).
 *  `onContinue` — runs after the overlay closes; omitted for the complete variant.
 *  `onRestudy`  — resets the deck; the overlay closes before it runs. */
export function showStudyFollowUpOverlay({
  suggestion, subtitle, onContinue, onRestudy,
  allDoneSub = 'Aprobaste todas las categorías de esta lección.',
}) {
  const overlay = document.getElementById('resultOverlay');
  if (!overlay) return;

  const restudy = () => { overlay.classList.remove('show'); onRestudy(); };

  overlay.innerHTML = suggestion
    ? `
        <div class="result-box">
          <button class="result-close" id="resultDismiss" aria-label="Cerrar">✕</button>
          <div style="font-size:3rem;margin-bottom:8px;">📖</div>
          <div class="result-title">¡Tarjetas repasadas! 🎉</div>
          <div class="result-sub">${subtitle}</div>
          <div class="result-btns">
            <button class="lp-btn lp-btn--ghost" id="resultRestudy">🔄 Repasar de nuevo</button>
            <button class="lp-btn lp-btn--purple" id="resultContinue">Continuar →</button>
          </div>
        </div>
      `
    : `
        <div class="result-box">
          <button class="result-close" id="resultDismiss" aria-label="Cerrar">✕</button>
          <div style="font-size:3rem;margin-bottom:8px;">🏆</div>
          <div class="result-title">¡Lección completa! 🎉</div>
          <div class="result-sub">${allDoneSub}</div>
          <div class="result-btns">
            <button class="lp-btn lp-btn--ghost" id="resultRestudy">🔄 Repasar de nuevo</button>
            <a class="lp-btn lp-btn--purple" href="../index.html">Salir</a>
          </div>
        </div>
      `;
  overlay.classList.add('show');

  if (suggestion) {
    overlay.querySelector('#resultContinue')?.addEventListener('click', () => {
      overlay.classList.remove('show');
      onContinue();
    });
  }
  overlay.querySelector('#resultRestudy')?.addEventListener('click', restudy);
  overlay.querySelector('#resultDismiss')?.addEventListener('click', restudy);
}

/** Wires a Study deck's navigation: returns the `advanceCard(dir)` every engine
 *  binds to its →/← buttons, swipe and keyboard, plus the `showFollowUp()` that
 *  runs when the deck ends.
 *
 *  Owning both together is the point: the "last card going forward opens the
 *  follow-up instead of wrapping to card 1" rule lived hand-written in eight
 *  engines until 2026-08-19, so changing how a deck ends meant eight edits.
 *
 *  `findFollowUp` returns the engine's own suggestion (its progress rules stay
 *  its own); `onContinue` receives that suggestion. */
export function createStudyNav({
  getIdx, setIdx, getDeckLength, renderCard, findFollowUp,
  onContinue, onRestudy, allDoneSub, cardId = 'fcCard',
  subtitleFor = s => `Siguiente: ${s.label}`,
}) {
  function showFollowUp() {
    const suggestion = findFollowUp();
    showStudyFollowUpOverlay({
      suggestion,
      subtitle: suggestion ? subtitleFor(suggestion) : '',
      onContinue: () => onContinue(suggestion),
      onRestudy,
      ...(allDoneSub ? { allDoneSub } : {}),
    });
  }

  function advanceCard(dir) {
    const deckLength = getDeckLength();
    if (dir > 0 && getIdx() === deckLength - 1) { showFollowUp(); return; }
    advanceStudyCard(dir, { getIdx, setIdx, deckLength, renderCard, cardId });
  }

  return { advanceCard, showFollowUp };
}

/** Squeezes the card to zero width, swaps which face is visible while it's
 *  invisible, then lets it un-squeeze — see components.css .fc-card comment.
 *  Shared by every engine's Study-mode flip so they all match FlashcardEngine's
 *  motion instead of snapping the flip instantly. */
export function squeezeToggle(el, cls) {
  if (!el || el.classList.contains('squeeze')) return;
  el.classList.add('squeeze');
  setTimeout(() => {
    el.classList.toggle(cls);
    el.classList.remove('squeeze');
  }, 150);
}

/** Advances the Study-mode flashcard: slides+fades out (keeping the flipped face
 *  visible via transform so it never flashes back to the question mid-fade — same
 *  motion as FlashcardEngine.navCard()), then renders the next/prev card while
 *  hidden and slides+fades it in from the opposite side. */
export function advanceStudyCard(dir, { getIdx, setIdx, deckLength, renderCard, cardId = 'fcCard' }) {
  const card = document.getElementById(cardId);
  const inner = card?.querySelector('.fc-inner');
  if (!card || !inner) return;

  const isFlipped = card.classList.contains('flip');
  const slideX = dir > 0 ? '-12px' : '12px';

  inner.style.transition = 'opacity .12s ease, transform .12s ease';
  inner.style.opacity = '0';
  inner.style.transform = isFlipped
    ? `rotateY(180deg) translateX(${dir > 0 ? '12px' : '-12px'})`
    : `translateX(${slideX})`;

  setTimeout(() => {
    inner.style.transition = 'none';
    card.classList.remove('flip');
    inner.style.transform = `translateX(${dir > 0 ? '12px' : '-12px'})`;
    inner.style.opacity = '0';

    setIdx((getIdx() + dir + deckLength) % deckLength);
    renderCard();
    void inner.offsetHeight;

    inner.style.transition = 'opacity .15s ease, transform .15s ease';
    inner.style.opacity = '1';
    inner.style.transform = '';
    setTimeout(() => { inner.style.transition = ''; }, 170);
  }, 130);
}

/** Shared "pair matching" mode: left/right columns of shuffled pills, click one
 *  from each side to try a match, wrong pairs flash and reset, right pairs lock
 *  in — used identically by irregular-verbs, phrasal-verbs and phonics (only the
 *  data source, labels and rendering of each pill differ between them). Expects
 *  markup `[data-area="match"]` containing `#pairGrid`. */
export function createMatchMode({
  getData, pairCount = 6, matchScoreKey, getCurrentCat, startMode, setMode, updProgress,
  leftLabel, rightLabel, matchKey, renderLeft, renderRight, canRun, unavailableMessage,
}) {
  let state = { leftSel: null, rightSel: null, matched: 0, total: 0, errors: 0, pairs: [] };

  function init() {
    const area = document.querySelector('[data-area="match"]');
    const grid = document.getElementById('pairGrid');
    if (canRun && !canRun()) {
      area.classList.add('show');
      grid.innerHTML = unavailableMessage;
      updProgress(0, 1);
      return;
    }
    const items = shuffle(getData());
    const count = Math.min(pairCount, items.length);
    state = { leftSel: null, rightSel: null, matched: 0, total: count, errors: 0, pairs: items.slice(0, count) };
    area.classList.add('show');
    updProgress(0, count);
    render();
  }

  function render() {
    const grid = document.getElementById('pairGrid');
    const leftItems = shuffle([...state.pairs]);
    const rightItems = shuffle([...state.pairs]);
    grid.innerHTML = `
      <div class="pair-col-label">${leftLabel}</div>
      <div class="pair-col-label">${rightLabel}</div>
      ${leftItems.map((item, i) => {
        const right = rightItems[i];
        return `
          <div class="pair-item pair-left" data-term="${matchKey(item)}">${renderLeft(item)}</div>
          <div class="pair-item pair-right" data-term="${matchKey(right)}">${renderRight(right)}</div>
        `;
      }).join('')}
    `;
    grid.querySelectorAll('.pair-left').forEach(el => el.addEventListener('click', () => select(el, 'left')));
    grid.querySelectorAll('.pair-right').forEach(el => el.addEventListener('click', () => select(el, 'right')));
  }

  function select(el, side) {
    if (el.classList.contains('matched')) return;
    if (side === 'left') {
      if (state.leftSel) state.leftSel.classList.remove('selected');
      state.leftSel = el;
    } else {
      if (state.rightSel) state.rightSel.classList.remove('selected');
      state.rightSel = el;
    }
    el.classList.add('selected');
    if (state.leftSel && state.rightSel) check();
  }

  function check() {
    const left = state.leftSel, right = state.rightSel;
    if (left.dataset.term === right.dataset.term) {
      left.classList.remove('selected'); right.classList.remove('selected');
      left.classList.add('matched'); right.classList.add('matched');
      state.matched++;
      updProgress(state.matched, state.total);
      if (state.matched === state.total) {
        const pct = Math.round((state.total - state.errors) / state.total * 100);
        recordScore(`${matchScoreKey}-${getCurrentCat()}-match`, Math.max(0, pct));
        setTimeout(() => finishExercise({
          correct: Math.max(0, state.total - state.errors), total: state.total, startMode, setMode,
        }), 500);
      }
    } else {
      state.errors++;
      left.classList.add('wrong-flash'); right.classList.add('wrong-flash');
      setTimeout(() => { left.classList.remove('wrong-flash', 'selected'); right.classList.remove('wrong-flash', 'selected'); }, 500);
    }
    state.leftSel = null; state.rightSel = null;
  }

  return { init };
}
