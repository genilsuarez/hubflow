/* ═══════════════════════════════════════════════════════
   HubFlow — Spelling By Ear Engine
   Quiz / Timed: se escucha la palabra (TTS) y se escribe.

   Extraído 2026-08-17 del <script type="module"> inline de
   exercises/spelling-by-ear.html. Las claves de progreso emitidas no
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
export function initSpellingByEar({ categories, scoreKeyPrefix }) {
  if (!isSpeechAvailable()) document.getElementById('noTts').classList.add('show');
  let currentCat = Object.keys(categories)[0], mode = 'quiz', deck = [], idx = 0, score = 0, total = 0, timer = null, answered = false;
  sharedRenderCatBar({
    containerId: 'catBar', categories: categories,
    getCurrentCat: () => currentCat, setCurrentCat: v => currentCat = v,
    onChange: startMode,
  });
  wireModeTabs({ getMode: () => mode, setMode: v => mode = v, onChange: startMode });
  document.getElementById('quizSkipBtn')?.addEventListener('click', () => skipQuiz());
  function setQuizAnswered(isAnswered) { const nextBtn = document.getElementById('quizNextBtn'); const skipBtn = document.getElementById('quizSkipBtn'); if (nextBtn) nextBtn.hidden = !isAnswered; if (skipBtn) skipBtn.hidden = isAnswered; }
  function skipQuiz() { if (answered || idx >= total) return; idx++; updProgress(idx, total); renderItem(); }
  function startMode() { stopTimer(); document.querySelectorAll('[data-area]').forEach(a => a.classList.remove('show')); document.getElementById('timerBar').classList.remove('show'); setQuizAnswered(false); initQuiz(mode === 'timed'); }
  function stopTimer() { if (timer) { timer.stop(); timer = null; } }
  function getData() { return categories[currentCat].items; }
  const updProgress = (c, t) => updateProgress(c, t, document.getElementById('progFill'), document.getElementById('progTxt'), document.getElementById('progPct'));
  function playBase() { const item = deck[idx]; if (item) speak(item.base, { rate: 0.8 }); }
  document.getElementById("playAudioBtn").addEventListener('click', playBase);
  function initQuiz(timed) { deck = shuffle(getData()); idx = 0; score = 0; answered = false; total = Math.min(timed ? 10 : deck.length, deck.length); document.querySelector('[data-area="quiz"]').classList.add('show'); if (timed) { document.getElementById('timerBar').classList.add('show'); timer = new Timer(total*8, r => { const el = document.getElementById('timerDisplay'); el.textContent = formatTime(r); el.classList.toggle('warn', r<=10); }, () => finishQuiz()); timer.start(); } renderItem(); }
  function renderItem() { if (idx >= total) { stopTimer(); finishQuiz(); return; } answered = false; setQuizAnswered(false); const item = deck[idx]; document.getElementById('formLabel').textContent = `Write the ${item.form} form`; document.getElementById('scCounter').textContent = `${idx+1} / ${total}`; document.getElementById('explainBox').textContent = ''; const input = document.getElementById('answerInput'); input.value = ''; input.className = 'answer-input'; input.disabled = false; input.focus(); updProgress(idx, total); setTimeout(playBase, 300); }
  function checkAnswer() { if (answered) return; const input = document.getElementById('answerInput'); const val = input.value.trim().toLowerCase(); const item = deck[idx]; if (!val) return; answered = true; input.disabled = true; const correct = val === item.correct.toLowerCase(); if (correct) { input.classList.add('correct'); score++; } else { input.classList.add('wrong'); input.value = `${val} → ${item.correct}`; } document.getElementById('explainBox').textContent = item.explain; idx++; updProgress(idx, total); const nextBtn = document.getElementById('quizNextBtn'); if (nextBtn) { nextBtn.textContent = idx >= total ? 'Ver resultado →' : 'Siguiente →'; setQuizAnswered(true); nextBtn.onclick = () => renderItem(); nextBtn.focus({ preventScroll: true }); } else { setTimeout(renderItem, 1600); } }
  document.getElementById('answerInput').addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });
  document.getElementById('checkBtn').addEventListener('click', checkAnswer);
  function finishQuiz() { const pct = finishExercise({ correct: score, total, startMode }); const _timedSuffix = mode === 'timed' ? '-timed' : ''; recordScore(`${scoreKeyPrefix}-${currentCat}${_timedSuffix}`, pct); }
  startMode();
}
