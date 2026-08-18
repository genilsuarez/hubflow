/* ═══════════════════════════════════════════════════════
   HubFlow — Odd One Out Engine
   Practice / Timed: elegir la palabra que no pertenece al grupo.

   Extraído 2026-08-17 del <script type="module"> inline de
   exercises/odd-one-out.html. Las claves de progreso emitidas no
   cambian; están declaradas en js/engines/manifest.mjs.
   ═══════════════════════════════════════════════════════ */

import { shuffle } from '../array-utils.js';
import { recordScore, getScoreStatus } from '../progress-store.js';
import { Timer, formatTime, renderCatBar as sharedRenderCatBar, updateProgress as sharedUpdateProgress, wireModeTabs } from '../exercise-ui.js';
import { finishExercise } from '../exercise-flow.js';

/**
 * @param {object} cfg
 * @param {object} cfg.categories     CATEGORIES del data file.
 * @param {string} cfg.scoreKeyPrefix Prefijo de las claves de progreso.
 */
export function initOddOneOut({ categories, scoreKeyPrefix }) {
  let currentCat = Object.keys(categories)[0];
  let mode = 'quiz';
  let deck = [], idx = 0, score = 0;
  let answered = false;
  let timer = null;
  let timedSeconds = 0;

  // Returns pending timed mode if quiz passed but timed hasn't, then next category.
  function findStudyFollowUp() {
    const catKeys = Object.keys(categories);
    if (!getScoreStatus(`${scoreKeyPrefix}-${currentCat}-timed`).passed) {
      return { label: '⏱️ Timed', isNewCategory: false, onContinue: () => { mode = 'timed'; startMode(); } };
    }
    const startIdx = catKeys.indexOf(currentCat);
    for (let i = 1; i <= catKeys.length; i++) {
      const cat = catKeys[(startIdx + i) % catKeys.length];
      if (cat === currentCat) continue;
      if (!getScoreStatus(`${scoreKeyPrefix}-${cat}`).passed || !getScoreStatus(`${scoreKeyPrefix}-${cat}-timed`).passed) {
        return { label: `${categories[cat]?.label || cat} — 🎯 Quiz`, isNewCategory: true, onContinue: () => { currentCat = cat; mode = 'quiz'; startMode(); } };
      }
    }
    return null;
  }

  // ─── Category bar ───
  sharedRenderCatBar({
    containerId: 'catBar', categories: categories,
    getCurrentCat: () => currentCat, setCurrentCat: v => currentCat = v,
    onChange: startMode,
    formatLabel: (k, cat) => `${cat.icon} ${cat.label} <span style="font-size:.6rem;opacity:.7">${cat.level}</span>`,
  });

  // ─── Mode switching ───
  wireModeTabs({ getMode: () => mode, setMode: v => mode = v, onChange: startMode });

  // Saltar sin puntuar, igual que en los demás ejercicios.
  document.getElementById('quizSkipBtn')?.addEventListener('click', () => {
    if (answered || idx >= deck.length) return;
    idx++;
    renderQuestion();
  });

  function startMode() {
    stopTimer();
    deck = shuffle(categories[currentCat].items);
    idx = 0; score = 0;
    document.getElementById('timerBar').classList.toggle('show', mode === 'timed');
    document.querySelector('[data-area="quiz"]').classList.add('show');

    if (mode === 'timed') {
      timedSeconds = 90;

      timer = new Timer(timedSeconds,
        r => { const el = document.getElementById('timerDisplay'); el.textContent = formatTime(r); el.classList.toggle('warn', r <= 10); },
        () => finish()
      );
      timer.start();
    }
    renderQuestion();
  }

  function stopTimer() { if (timer) { timer.stop(); timer = null; } timedSeconds = 0; }

  function renderQuestion() {
    if (idx >= deck.length) { finish(); return; }
    answered = false;
    setQuizAnswered(false);
    const item = deck[idx];

    document.getElementById('qCounter').textContent = `${idx + 1} / ${deck.length}`;
    document.getElementById('qExplanation').classList.remove('show');

    const optsEl = document.getElementById('qOptions');
    // Baraja solo la presentación: data-idx conserva el índice original, que es
    // contra el que handleAnswer compara item.odd. Sin esto la respuesta caía en
    // la última posición en 24 de los 40 items y el ejercicio se podía "ganar"
    // eligiendo siempre la cuarta.
    const order = shuffle(item.words.map((_, i) => i));
    optsEl.innerHTML = order.map(i =>
      `<button class="ooo-opt" data-idx="${i}">${item.words[i]}</button>`
    ).join('');

    optsEl.querySelectorAll('.ooo-opt').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.idx), item));
    });

    updateProgress();
  }

  function handleAnswer(chosen, item) {
    if (answered) return;
    answered = true;

    const optsEl = document.getElementById('qOptions');
    optsEl.querySelectorAll('.ooo-opt').forEach(btn => {
      btn.classList.add('disabled');
      const i = parseInt(btn.dataset.idx);
      if (i === item.odd) btn.classList.add('correct');
      if (i === chosen && chosen !== item.odd) btn.classList.add('wrong');
    });

    if (chosen === item.odd) score++;

    // Show explanation
    const expEl = document.getElementById('qExplanation');
    expEl.innerHTML = `<strong>${item.words[item.odd]}</strong> — ${item.reason}<div class="ooo-group">The others: ${item.group}</div>`;
    expEl.classList.add('show');

    const nextBtn = document.getElementById('quizNextBtn');
    if (nextBtn) {
      nextBtn.textContent = idx + 1 >= deck.length ? 'Ver resultado →' : 'Siguiente →';
      setQuizAnswered(true);
      nextBtn.onclick = () => { idx++; renderQuestion(); };
      nextBtn.focus({ preventScroll: true });
    } else {
      setTimeout(() => { idx++; renderQuestion(); }, mode === 'timed' ? 1800 : 2200);
    }
  }

  function setQuizAnswered(isAnswered) {
    const nextBtn = document.getElementById('quizNextBtn');
    const skipBtn = document.getElementById('quizSkipBtn');
    if (nextBtn) nextBtn.hidden = !isAnswered;
    if (skipBtn) skipBtn.hidden = isAnswered;
  }

  function updateProgress() {
    sharedUpdateProgress(idx, deck.length,
      document.getElementById('progFill'), document.getElementById('progTxt'), document.getElementById('progPct'));
  }

  function finish() {
    stopTimer();
    const pct = Math.round((score / deck.length) * 100);
    finishExercise({ correct: score, total: deck.length, startMode, suggestion: findStudyFollowUp() });
    const _timedSuffix = mode === 'timed' ? '-timed' : ''; recordScore(`${scoreKeyPrefix}-${currentCat}${_timedSuffix}`, pct);
    document.getElementById('progFill').style.width = '100%';
    document.getElementById('progTxt').textContent = `${deck.length} / ${deck.length}`;
    document.getElementById('progPct').textContent = '100%';
  }

  // ─── Keyboard: 1-4 to select, Enter to advance after answering ───
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && answered) {
      const nextBtn = document.getElementById('quizNextBtn');
      if (nextBtn && !nextBtn.hidden) { e.preventDefault(); nextBtn.click(); }
      return;
    }
    if (answered) return;
    const num = parseInt(e.key);
    if (num >= 1 && num <= 4) {
      e.preventDefault();
      const btn = document.querySelector(`.ooo-opt[data-idx="${num - 1}"]`);
      if (btn) btn.click();
    }
  });

  startMode();
}
