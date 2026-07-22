/* ═══════════════════════════════════════════════════════
   HubFlow — Typed Answer Practice Engine
   Shared study/timed logic for exercises where the user types a free-form
   answer that's checked against one or more accepted strings (paraphrasing,
   word-order, register-switch, sentence-combining). Extracted 2026-07-10 —
   the two original pages this covers were byte-identical except for the
   prompt-specific rendering (a static sentence+keyword vs. a shuffled row
   of word pills), a timer duration, and a scoreKey prefix. Extended
   2026-07-11 to also cover register-switch/sentence-combining, which
   additionally differed in the timer "warning" threshold and needed the
   current category passed to renderPrompt (for a category badge).
   ═══════════════════════════════════════════════════════ */

import { shuffle, initTheme, toggleTheme, recordScore, Timer, formatTime, showResult, renderCatBar as sharedRenderCatBar, makeTimerState, renderLessonProgress } from './utils.js';

function normalize(s) {
  return (s || '').toLowerCase().trim().replace(/[.,!?;:]+$/, '').replace(/\s+/g, ' ');
}

function stripApostrophes(s) {
  return s.replace(/[''ʼ]/g, '');
}

/**
 * Returns: { exact: bool, fuzzy: bool, corrected: string|null }
 * - exact: user answer matches one of correctArray exactly (after normalize)
 * - fuzzy: matches if we also strip apostrophes (user forgot them)
 * - corrected: the canonical correct string that matched (for tip display)
 */
function matchAnswer(userAnswer, correctArray) {
  const n = normalize(userAnswer);
  if (!n.length) return { exact: false, fuzzy: false, corrected: null };

  if (correctArray.some(c => normalize(c) === n)) {
    return { exact: true, fuzzy: false, corrected: null };
  }

  const nStripped = stripApostrophes(n);
  const fuzzyMatch = correctArray.find(c => stripApostrophes(normalize(c)) === nStripped);
  if (fuzzyMatch) {
    return { exact: false, fuzzy: true, corrected: fuzzyMatch };
  }

  return { exact: false, fuzzy: false, corrected: null };
}

function isMatch(userAnswer, correctArray) {
  const { exact, fuzzy } = matchAnswer(userAnswer, correctArray);
  return exact || fuzzy;
}

function setupPracticeActionNav(attempt = 0) {
  const checkBtn = document.getElementById('checkBtn');
  const nextBtn = document.getElementById('nextBtn');
  const hintBtn = document.getElementById('hintBtn');
  if (!checkBtn || !nextBtn) return;

  const nav = document.getElementById('exBottomNav');
  if (!nav) {
    if (attempt < 40) setTimeout(() => setupPracticeActionNav(attempt + 1), 50);
    return;
  }

  if (hintBtn) {
    hintBtn.className = 'lp-btn lp-btn--ghost typed-hint-btn';
    hintBtn.textContent = '💡';
    hintBtn.setAttribute('aria-label', 'Mostrar pista');
    hintBtn.setAttribute('aria-pressed', 'false');
    hintBtn.title = 'Pista';
  }

  checkBtn.className = 'lp-btn lp-btn--primary typed-action-btn typed-action-btn--check';
  checkBtn.textContent = '✓';
  checkBtn.setAttribute('aria-label', 'Comprobar respuesta');
  checkBtn.title = 'Comprobar';

  nextBtn.className = 'lp-btn lp-btn--primary typed-action-btn typed-action-btn--next';
  nextBtn.textContent = '→';
  nextBtn.setAttribute('aria-label', 'Siguiente');
  nextBtn.title = 'Siguiente';
  nextBtn.hidden = true;

  const wrapper = checkBtn.parentElement;
  const progressBtn = document.getElementById('lessonProgressBtn');

  if (hintBtn && hintBtn.parentElement !== nav) {
    if (progressBtn?.parentElement === nav) progressBtn.insertAdjacentElement('afterend', hintBtn);
    else nav.insertBefore(hintBtn, nav.firstChild);
  }

  const actionAnchor = hintBtn?.parentElement === nav ? hintBtn : progressBtn;
  if (checkBtn.parentElement !== nav) {
    if (actionAnchor?.parentElement === nav) actionAnchor.insertAdjacentElement('afterend', checkBtn);
    else nav.appendChild(checkBtn);
  }
  if (nextBtn.parentElement !== nav) checkBtn.insertAdjacentElement('afterend', nextBtn);

  const meta = document.querySelector('.typed-answer-meta');
  if (meta && hintBtn && !meta.contains(hintBtn)) {
    const counter = meta.querySelector('.item-counter');
    if (counter) meta.parentElement?.insertBefore(counter, meta);
    meta.remove();
  }

  if (wrapper && wrapper !== nav && wrapper.tagName === 'DIV' && !wrapper.id && !wrapper.classList.length) {
    wrapper.remove();
  }

  nav.classList.add('ex-bottom-nav--practice');
}

function setPracticeActionNav({ check = true, next = false } = {}) {
  const checkBtn = document.getElementById('checkBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (checkBtn) checkBtn.hidden = !check;
  if (nextBtn) nextBtn.hidden = !next;
}

export function initTypedAnswerPractice({ categories, scoreKeyPrefix, contentId = null, secondsPerQuestion, warnThreshold = 20, renderPrompt }) {
  initTheme();
  const themeToggleEl = document.getElementById('themeToggle');
  if (themeToggleEl) themeToggleEl.addEventListener('click', () => toggleTheme());
  renderLessonProgress(contentId);

  const catKeys = Object.keys(categories);
  let currentCat = catKeys[0];
  let mode = 'practice';
  let deck = [], idx = 0, score = 0, total = 0;
  let answered = false;
  const timerState = makeTimerState();

  sharedRenderCatBar({
    categories,
    getCurrentCat: () => currentCat,
    setCurrentCat: (k) => { currentCat = k; },
    onChange: startMode,
  });

  document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      mode = btn.dataset.mode;
      document.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
      startMode();
    });
  });

  function startMode() {
    timerState.stop();
    deck = shuffle(categories[currentCat].items);
    idx = 0; score = 0;
    total = mode === 'timed' ? Math.min(10, deck.length) : deck.length;
    document.getElementById('timerBar').classList.toggle('show', mode === 'timed');

    if (mode === 'timed') {
      timerState.timedSeconds = total * secondsPerQuestion;

      timerState.timer = new Timer(timerState.timedSeconds,
        r => { const el = document.getElementById('timerDisplay'); el.textContent = formatTime(r); el.classList.toggle('warn', r <= warnThreshold); },
        () => finish()
      );
      timerState.timer.start();
    }
    renderItem();
  }

  function updProgress() {
    const pct = total > 0 ? Math.round((idx / total) * 100) : 0;
    document.getElementById('progFill').style.width = pct + '%';
    document.getElementById('progTxt').textContent = `${idx} / ${total}`;
    document.getElementById('progPct').textContent = pct + '%';
  }

  function renderItem() {
    if (idx >= total) { timerState.stop(); finish(); return; }
    answered = false;
    const item = deck[idx];

    renderPrompt(item, currentCat);
    document.getElementById('itemCounter').textContent = `${idx + 1} / ${total}`;
    document.getElementById('hintBox').classList.remove('show');
    document.getElementById('hintBox').textContent = item.hint || '';
    const hintBtn = document.getElementById('hintBtn');
    if (hintBtn) {
      hintBtn.classList.remove('active');
      hintBtn.setAttribute('aria-pressed', 'false');
    }
    document.getElementById('explainBox').textContent = '';
    document.getElementById('answersList').classList.remove('show');
    document.getElementById('answersList').innerHTML = '';
    const tipEl = document.getElementById('apostropheTip');
    if (tipEl) { tipEl.textContent = ''; tipEl.classList.remove('show'); }

    const input = document.getElementById('answerInput');
    input.value = '';
    input.className = 'answer-input';
    input.disabled = false;
    input.focus();

    setPracticeActionNav({ check: true, next: false });

    updProgress();
  }

  document.getElementById('hintBtn').addEventListener('click', () => {
    const box = document.getElementById('hintBox');
    const btn = document.getElementById('hintBtn');
    const show = !box.classList.contains('show');
    box.classList.toggle('show', show);
    btn.classList.toggle('active', show);
    btn.setAttribute('aria-pressed', String(show));
  });

  function checkAnswer() {
    if (answered) return;
    const input = document.getElementById('answerInput');
    const val = input.value.trim();
    if (!val) return;
    answered = true;
    input.disabled = true;

    const item = deck[idx];
    const result = matchAnswer(val, item.correct);
    const correct = result.exact || result.fuzzy;
    input.classList.add(correct ? 'correct' : 'wrong');
    if (correct) score++;

    // Apostrophe tip — accepted but nudge the user
    const tipEl = document.getElementById('apostropheTip');
    if (tipEl) {
      if (result.fuzzy && result.corrected) {
        tipEl.innerHTML = `<span class="apostrophe-tip-icon">💡</span> Casi perfecto — recuerda el apóstrofe: <strong>${result.corrected}</strong>`;
        tipEl.classList.add('show');
      } else {
        tipEl.textContent = '';
        tipEl.classList.remove('show');
      }
    }

    document.getElementById('explainBox').textContent = item.explain;
    const answersEl = document.getElementById('answersList');
    answersEl.innerHTML = item.correct.map(a => `<div class="answer-item">${a}</div>`).join('');
    answersEl.classList.add('show');

    setPracticeActionNav({ check: false, next: true });
  }

  document.getElementById('checkBtn').addEventListener('click', checkAnswer);
  document.getElementById('answerInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); checkAnswer(); e.stopPropagation(); }
  });
  document.getElementById('nextBtn').addEventListener('click', () => { idx++; renderItem(); });

  function finish() {
    timerState.stop();
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    showResult({
      correct: score, total,
      containerEl: document.getElementById('resultOverlay'),
      onRestart: () => startMode(),
      onStudy: null,
    });
    recordScore(`${scoreKeyPrefix}-${currentCat}`, pct);
    renderLessonProgress(contentId);
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && answered) { e.preventDefault(); document.getElementById('nextBtn').click(); }
  });

  startMode();
  setupPracticeActionNav();
}
