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

/** Advances the Study-mode flashcard: crossfades out while flipped (so the answer
 *  face doesn't visibly snap back to the question), then renders the next/prev
 *  card and fades in. Falls straight through to renderCard() when not flipped. */
export function advanceStudyCard(dir, { getIdx, setIdx, deckLength, renderCard, cardId = 'fcCard' }) {
  const card = document.getElementById(cardId);
  const inner = card.querySelector('.fc-inner');
  if (card.classList.contains('flip') && inner) {
    inner.style.transition = 'opacity .15s ease, transform .2s ease';
    inner.style.opacity = '0';
    card.classList.remove('flip');
    let done = false;
    const onDone = () => {
      if (done) return; done = true;
      inner.removeEventListener('transitionend', onDone);
      inner.style.transition = 'none';
      setIdx((getIdx() + dir + deckLength) % deckLength);
      renderCard();
      void inner.offsetHeight;
      inner.style.transition = 'opacity .15s ease';
      inner.style.opacity = '1';
      setTimeout(() => { inner.style.transition = ''; }, 170);
    };
    inner.addEventListener('transitionend', onDone, { once: true });
    setTimeout(onDone, 250);
    return;
  }
  setIdx((getIdx() + dir + deckLength) % deckLength);
  renderCard();
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
