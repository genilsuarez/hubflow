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

function isMatch(userAnswer, correctArray) {
  const n = normalize(userAnswer);
  return n.length > 0 && correctArray.some(c => normalize(c) === n);
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
    document.getElementById('explainBox').textContent = '';
    document.getElementById('answersList').classList.remove('show');
    document.getElementById('answersList').innerHTML = '';

    const input = document.getElementById('answerInput');
    input.value = '';
    input.className = 'answer-input';
    input.disabled = false;
    input.focus();

    document.getElementById('checkBtn').style.display = '';
    document.getElementById('nextBtn').style.display = 'none';

    updProgress();
  }

  document.getElementById('hintBtn').addEventListener('click', () => {
    document.getElementById('hintBox').classList.toggle('show');
  });

  function checkAnswer() {
    if (answered) return;
    const input = document.getElementById('answerInput');
    const val = input.value.trim();
    if (!val) return;
    answered = true;
    input.disabled = true;

    const item = deck[idx];
    const correct = isMatch(val, item.correct);
    input.classList.add(correct ? 'correct' : 'wrong');
    if (correct) score++;

    document.getElementById('explainBox').textContent = item.explain;
    const answersEl = document.getElementById('answersList');
    answersEl.innerHTML = item.correct.map(a => `<div class="answer-item">${a}</div>`).join('');
    answersEl.classList.add('show');

    document.getElementById('checkBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = '';
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
}
