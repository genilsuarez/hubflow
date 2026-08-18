/* ═══════════════════════════════════════════════════════
   HubFlow — Tenses Engine
   Study / Practice / Timed de tiempos verbales (opciones por item o por categoría).

   Extraído 2026-08-17 del <script type="module"> inline de
   exercises/tenses.html. Las claves de progreso emitidas no
   cambian; están declaradas en js/engines/manifest.mjs.
   ═══════════════════════════════════════════════════════ */

import { shuffle } from '../array-utils.js';
import { recordScore, recordStudyItemSeen } from '../progress-store.js';
import { Timer, formatTime, renderCatBar as sharedRenderCatBar, updateProgress, wireModeTabs } from '../exercise-ui.js';
import { finishExercise, advanceStudyCard } from '../exercise-flow.js';
import { initSwipe } from '../swipe.js';

/**
 * @param {object} cfg
 * @param {object} cfg.categories     CATEGORIES del data file.
 * @param {string} cfg.scoreKeyPrefix Prefijo de las claves de progreso.
 */
export function initTenses({ categories, scoreKeyPrefix }) {
  let currentCat = Object.keys(categories)[0], mode = 'study', deck = [], idx = 0, score = 0, total = 0, timer = null;
  sharedRenderCatBar({
    containerId: 'catBar', categories: categories,
    getCurrentCat: () => currentCat, setCurrentCat: v => currentCat = v,
    onChange: startMode,
  });
  wireModeTabs({ getMode: () => mode, setMode: v => mode = v, onChange: startMode });
  document.getElementById('quizSkipBtn')?.addEventListener('click', () => skipPractice());
  function setQuizAnswered(answered) { const nextBtn = document.getElementById('quizNextBtn'); const skipBtn = document.getElementById('quizSkipBtn'); if (nextBtn) nextBtn.hidden = !answered; if (skipBtn) skipBtn.hidden = answered; }
  function skipPractice() { if (idx >= total) return; idx++; updProgress(idx, total); renderPractice(); }
  function startMode() { stopTimer(); document.querySelectorAll('[data-area]').forEach(a => a.classList.remove('show')); document.getElementById('timerBar').classList.remove('show'); setQuizAnswered(false); if (mode === 'practice') initPractice(false); else if (mode === 'timed') initPractice(true); else initStudy(); }
  function stopTimer() { if (timer) { timer.stop(); timer = null; } }
  function getData() { return categories[currentCat].items; }
  const updProgress = (c, t) => updateProgress(c, t, document.getElementById('progFill'), document.getElementById('progTxt'), document.getElementById('progPct'));
  function initPractice(timed) { deck = shuffle(getData()); idx = 0; score = 0; total = Math.min(timed ? 10 : deck.length, deck.length); document.querySelector('[data-area="practice"]').classList.add('show'); if (timed) { document.getElementById('timerBar').classList.add('show'); timer = new Timer(total*7, r => { const el = document.getElementById('timerDisplay'); el.textContent = formatTime(r); el.classList.toggle('warn', r<=10); }, () => finishPractice()); timer.start(); } renderPractice(); }
  function renderPractice() { if (idx >= total) { stopTimer(); finishPractice(); return; } const item = deck[idx]; document.getElementById('scIcon').textContent = categories[currentCat].icon; document.getElementById('scText').innerHTML = item.sentence.replace('___', '<span class="blank">?</span>'); document.getElementById('scCounter').textContent = `${idx+1} / ${total}`; document.getElementById('explainBox').textContent = ''; setQuizAnswered(false); const opts = shuffle([...(item.options || categories[currentCat].options)]); const optsEl = document.getElementById('wordOptions'); optsEl.innerHTML = opts.map(o => `<button class="word-opt" data-val="${o}">${o}</button>`).join(''); optsEl.querySelectorAll('.word-opt').forEach(btn => btn.addEventListener('click', () => { optsEl.querySelectorAll('.word-opt').forEach(b => { b.classList.add('disabled'); b.style.pointerEvents = 'none'; }); if (btn.dataset.val === item.correct) { btn.classList.add('correct'); score++; } else { btn.classList.add('wrong'); optsEl.querySelectorAll('.word-opt').forEach(b => { if (b.dataset.val === item.correct) b.classList.add('correct'); }); } document.getElementById('scText').innerHTML = item.sentence.replace('___', `<span class="blank">${item.correct}</span>`); document.getElementById('explainBox').textContent = item.explain; idx++; updProgress(idx, total); const nextBtn = document.getElementById('quizNextBtn'); if (nextBtn) { nextBtn.textContent = idx >= total ? 'Ver resultado →' : 'Siguiente →'; setQuizAnswered(true); nextBtn.onclick = () => renderPractice(); nextBtn.focus({ preventScroll: true }); } else { setTimeout(renderPractice, 1400); } })); updProgress(idx, total); }
  function finishPractice() { const pct = finishExercise({ correct: score, total, startMode, setMode: v => mode = v }); const _timedSuffix = mode === 'timed' ? '-timed' : ''; recordScore(`${scoreKeyPrefix}-${currentCat}${_timedSuffix}`, pct); }
  function initStudy() { deck = shuffle(getData()); idx = 0; document.querySelector('[data-area="study"]').classList.add('show'); renderStudyCard(); }
  function renderStudyCard() { const item = deck[idx]; recordStudyItemSeen({ storagePrefix: scoreKeyPrefix, category: currentCat, term: item.sentence, totalItems: getData().length }); document.getElementById('fcCard').classList.remove('flip'); document.getElementById('fcEmoji').textContent = categories[currentCat].icon; document.getElementById('fcSentence').textContent = item.sentence.replace('___', '_____'); document.getElementById('fcAnswer').textContent = item.correct; document.getElementById('fcExplain').textContent = item.explain; document.getElementById('fcCounter').textContent = `${idx+1} / ${deck.length}`; updProgress(idx+1, deck.length); }
  document.getElementById('fcCard').addEventListener('click', () => document.getElementById('fcCard').classList.toggle('flip'));
  document.getElementById('nextBtn').addEventListener('click', () => advanceCard(1));
  document.getElementById('prevBtn').addEventListener('click', () => advanceCard(-1));
  document.getElementById('shuffleBtn').addEventListener('click', () => { deck = shuffle(deck); idx = 0; renderStudyCard(); });
  initSwipe(document.querySelector('[data-area="study"]'), { onNext: () => advanceCard(1), onPrev: () => advanceCard(-1) });

  function advanceCard(dir) {
    advanceStudyCard(dir, { getIdx: () => idx, setIdx: v => idx = v, deckLength: deck.length, renderCard: renderStudyCard });
  }

  // Keyboard: Enter/Space = flip or advance (study) / next (quiz+timed), Arrows = navigate
  document.addEventListener('keydown', e => {
    if (mode === 'practice' || mode === 'timed') {
      if (e.key === 'Enter') {
        const nextBtn = document.getElementById('quizNextBtn');
        if (nextBtn && !nextBtn.hidden) { e.preventDefault(); nextBtn.click(); }
      }
      return;
    }
    if (mode !== 'study') return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (document.activeElement && document.activeElement.tagName === 'BUTTON') {
        document.activeElement.blur();
      }
      const card = document.getElementById('fcCard');
      if (card.classList.contains('flip')) advanceCard(1);
      else card.classList.add('flip');
    } else if (e.key === 'ArrowRight') { e.preventDefault(); advanceCard(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); advanceCard(-1); }
  });

  startMode();
}
