/* ═══════════════════════════════════════════════════════
   HubFlow — Listening Engine
   Quiz / Timed de comprensión auditiva con TTS.

   Extraído 2026-08-17 del <script type="module"> inline de
   exercises/listening.html. Las claves de progreso emitidas no
   cambian; están declaradas en js/engines/manifest.mjs.
   ═══════════════════════════════════════════════════════ */

import { shuffle } from '../array-utils.js';
import { recordScore } from '../progress-store.js';
import { Timer, formatTime, renderCatBar as sharedRenderCatBar, updateProgress, wireModeTabs } from '../exercise-ui.js';
import { finishExercise } from '../exercise-flow.js';
import { speak, isSpeechAvailable } from '../speech.js';

/**
 * @param {object} cfg
 * @param {object} cfg.categories     CATEGORIES del data file.
 * @param {string} cfg.scoreKeyPrefix Prefijo de las claves de progreso.
 */
export function initListening({ categories, scoreKeyPrefix }) {
  if (!isSpeechAvailable()) document.getElementById('noTts').classList.add('show');

  let currentCat = Object.keys(categories)[0];
  let mode = 'quiz';
  let deck = [], idx = 0, score = 0, total = 0;
  let timer = null;
  let timedSeconds = 0;
  let answered = false;

  const listenBtn = document.getElementById("playAudioBtn");

  sharedRenderCatBar({
    containerId: 'catBar', categories: categories,
    getCurrentCat: () => currentCat, setCurrentCat: v => currentCat = v,
    onChange: startMode,
  });

  wireModeTabs({ getMode: () => mode, setMode: v => mode = v, onChange: startMode });

  document.getElementById('quizSkipBtn')?.addEventListener('click', () => skipQuiz());
  function setQuizAnswered(isAnswered) { const nextBtn = document.getElementById('quizNextBtn'); const skipBtn = document.getElementById('quizSkipBtn'); if (nextBtn) nextBtn.hidden = !isAnswered; if (skipBtn) skipBtn.hidden = isAnswered; }
  function skipQuiz() { if (answered || idx >= total) return; idx++; updProgress(idx, total); renderQuestion(); }

  function startMode() {
    stopTimer();
    document.querySelectorAll('[data-area]').forEach(a => a.classList.remove('show'));
    document.getElementById('timerBar').classList.remove('show');
    setQuizAnswered(false);
    initQuiz(mode === 'timed');
  }

  function stopTimer() { if (timer) { timer.stop(); timer = null; } timedSeconds = 0; }
  function getData() { return categories[currentCat].items; }

  const updProgress = (current, t) => updateProgress(current, t,
    document.getElementById('progFill'), document.getElementById('progTxt'), document.getElementById('progPct'));

  function playCurrent(rate = 0.85) {
    const item = deck[idx];
    if (!item) return;
    listenBtn.classList.add('playing');
    speak(item.text, { rate });
    setTimeout(() => listenBtn.classList.remove('playing'), Math.min(item.text.length * 90, 4000));
  }

  listenBtn.addEventListener('click', () => playCurrent());

  function initQuiz(timed) {
    deck = shuffle(getData());
    idx = 0; score = 0;
    total = Math.min(timed ? 8 : deck.length, deck.length);
    document.querySelector('[data-area="quiz"]').classList.add('show');

    if (timed) {
      document.getElementById('timerBar').classList.add('show');
      timedSeconds = total * 9;

      timer = new Timer(timedSeconds,
        r => { const el = document.getElementById('timerDisplay'); el.textContent = formatTime(r); el.classList.toggle('warn', r <= 10); },
        () => finishQuiz()
      );
      timer.start();
    }
    renderQuestion();
  }

  function renderQuestion() {
    if (idx >= total) { finishQuiz(); return; }
    const item = deck[idx];
    answered = false;

    document.getElementById('scCounter').textContent = `${idx + 1} / ${total}`;
    document.getElementById('revealBox').innerHTML = 'Listen and choose the word you hear.';
    setQuizAnswered(false);

    const opts = shuffle([...item.options]);
    const optsEl = document.getElementById('wordOptions');
    optsEl.innerHTML = opts.map(o => `<button class="word-opt" data-val="${o}">${o}</button>`).join('');
    optsEl.querySelectorAll('.word-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        optsEl.querySelectorAll('.word-opt').forEach(b => { b.classList.add('disabled'); b.style.pointerEvents = 'none'; });
        const chosen = btn.dataset.val;
        if (chosen === item.blank) { btn.classList.add('correct'); score++; }
        else {
          btn.classList.add('wrong');
          optsEl.querySelectorAll('.word-opt').forEach(b => { if (b.dataset.val === item.blank) b.classList.add('correct'); });
        }
        // Reveal the full sentence with the target highlighted
        const highlighted = item.text.replace(item.blank, `<span class="hl">${item.blank}</span>`);
        document.getElementById('revealBox').innerHTML = highlighted;
        idx++;
        updProgress(idx, total);

        const nextBtn = document.getElementById('quizNextBtn');
        if (nextBtn) {
          nextBtn.textContent = idx >= total ? 'Ver resultado →' : 'Siguiente →';
          setQuizAnswered(true);
          nextBtn.onclick = () => renderQuestion();
          nextBtn.focus({ preventScroll: true });
        } else {
          setTimeout(renderQuestion, 1800);
        }
      });
    });
    updProgress(idx, total);

    // Auto-play the audio when the question appears
    setTimeout(() => playCurrent(), 250);
  }

  function finishQuiz() {
    const elapsed = timedSeconds ? timedSeconds - (timer && timer.remaining != null ? timer.remaining : 0) : null;
    stopTimer();
    const pct = finishExercise({ correct: score, total, startMode, elapsedSeconds: elapsed });
    const _timedSuffix = mode === 'timed' ? '-timed' : ''; recordScore(`${scoreKeyPrefix}-${currentCat}${_timedSuffix}`, pct);
  }

  startMode();
}
