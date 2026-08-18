/* ═══════════════════════════════════════════════════════
   HubFlow — Word Choice Engine
   Study / Practice / Timed para los ejercicios de "elegir la
   palabra correcta del par": apostrophe-traps, confusing-verbs,
   grammar-confusions, lookalike-words.

   Extraído 2026-08-17 de 4 copias byte-idénticas inline en
   exercises/*.html — solo diferían en el data file, el prefijo de
   scoreKey y el `baseMap` de formas conjugadas.

   Claves de progreso emitidas (sin cambio respecto a las copias
   inline, para no huerfanizar el progreso ya guardado):
     `${scoreKeyPrefix}-${cat}`         → Practice
     `${scoreKeyPrefix}-${cat}-timed`   → Timed
     `${scoreKeyPrefix}-${cat}-study`   → Study (recordStudyItemSeen)
   Declaradas en js/engines/manifest.mjs.
   ═══════════════════════════════════════════════════════ */

import { shuffle } from '../array-utils.js';
import { recordScore, recordStudyItemSeen } from '../progress-store.js';
import { Timer, formatTime, renderCatBar as sharedRenderCatBar, updateProgress, wireModeTabs } from '../exercise-ui.js';
import { finishExercise, advanceStudyCard } from '../exercise-flow.js';
import { initSwipe } from '../swipe.js';

/**
 * @param {object}  cfg
 * @param {object}  cfg.categories        CATEGORIES del data file ({ items, pairs, icon, label }).
 * @param {string}  cfg.scoreKeyPrefix    Prefijo de las claves de progreso.
 * @param {object}  [cfg.baseMap]         base → RegExp de sus formas conjugadas, para aceptar
 *                                        "do" cuando la respuesta guardada es "did". `{}` si el
 *                                        ejercicio no tiene flexión (apostrophe-traps).
 * @param {number}  [cfg.timedQuestionCount=10]
 * @param {number}  [cfg.secondsPerQuestion=8]
 */
export function initWordChoice({
  categories,
  scoreKeyPrefix,
  baseMap = {},
  timedQuestionCount = 10,
  secondsPerQuestion = 8,
}) {
  let currentCat = Object.keys(categories)[0];
  let mode = 'study';
  let deck = [], idx = 0, score = 0, total = 0;
  let timer = null;
  let timedSeconds = 0;

  // ─── Category bar ───
  sharedRenderCatBar({
    containerId: 'catBar', categories,
    getCurrentCat: () => currentCat, setCurrentCat: v => currentCat = v,
    onChange: startMode,
  });

  // ─── Mode switching ───
  wireModeTabs({ getMode: () => mode, setMode: v => mode = v, onChange: startMode });

  document.getElementById('quizSkipBtn')?.addEventListener('click', () => skipPractice());
  function setQuizAnswered(answered) { const nextBtn = document.getElementById('quizNextBtn'); const skipBtn = document.getElementById('quizSkipBtn'); if (nextBtn) nextBtn.hidden = !answered; if (skipBtn) skipBtn.hidden = answered; }
  function skipPractice() { if (idx >= total) return; idx++; updProgress(idx, total); renderPractice(); }

  function startMode() {
    stopTimer();
    document.querySelectorAll('[data-area]').forEach(a => a.classList.remove('show'));
    document.getElementById('timerBar').classList.remove('show');
    setQuizAnswered(false);
    if (mode === 'practice') initPractice(false);
    else if (mode === 'timed') initPractice(true);
    else if (mode === 'study') initStudy();
  }

  function stopTimer() { if (timer) { timer.stop(); timer = null; } timedSeconds = 0; }

  function getData() { return categories[currentCat].items; }

  const updProgress = (current, t) => updateProgress(current, t,
    document.getElementById('progFill'), document.getElementById('progTxt'), document.getElementById('progPct'));

  // ═══ PRACTICE / TIMED ═══
  function initPractice(timed) {
    deck = shuffle(getData());
    idx = 0; score = 0;
    total = Math.min(timed ? timedQuestionCount : deck.length, deck.length);
    document.querySelector('[data-area="practice"]').classList.add('show');

    if (timed) {
      document.getElementById('timerBar').classList.add('show');
      timedSeconds = total * secondsPerQuestion;

      timer = new Timer(timedSeconds,
        r => { const el = document.getElementById('timerDisplay'); el.textContent = formatTime(r); el.classList.toggle('warn', r <= 10); },
        () => finishPractice()
      );
      timer.start();
    }
    renderPractice();
  }

  /** ¿Cuenta `chosen` como la respuesta de `item`? Acepta la forma base cuando
   *  el item guarda una conjugada (baseMap). */
  function matchesAnswer(chosen, item) {
    const correct = item.correct.toLowerCase();
    return chosen === correct || chosen === item.correct || (baseMap[chosen] && baseMap[chosen].test(correct));
  }

  function renderPractice() {
    if (idx >= total) { finishPractice(); return; }
    const item = deck[idx];
    const cat = categories[currentCat];

    document.getElementById('scIcon').textContent = cat.icon;
    document.getElementById('scText').innerHTML = item.sentence.replace('___', '<span class="blank">?</span>');
    document.getElementById('scCounter').textContent = `${idx + 1} / ${total}`;
    document.getElementById('explainBox').textContent = '';
    setQuizAnswered(false);

    // Build options from the category pairs
    const opts = shuffle([...cat.pairs]);
    const optsEl = document.getElementById('wordChoices');
    optsEl.innerHTML = opts.map(o => `<button class="word-opt" data-val="${o}">${o}</button>`).join('');
    optsEl.querySelectorAll('.word-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        optsEl.querySelectorAll('.word-opt').forEach(b => { b.classList.add('disabled'); b.style.pointerEvents = 'none'; });

        if (matchesAnswer(btn.dataset.val, item)) { btn.classList.add('correct'); score++; }
        else {
          btn.classList.add('wrong');
          // Highlight the correct base-form option
          optsEl.querySelectorAll('.word-opt').forEach(b => {
            if (matchesAnswer(b.dataset.val, item)) b.classList.add('correct');
          });
        }

        // Show sentence with answer filled
        document.getElementById('scText').innerHTML = item.sentence.replace('___', `<span class="blank">${item.correct}</span>`);
        document.getElementById('explainBox').textContent = item.explain;

        idx++;
        updProgress(idx, total);

        const nextBtn = document.getElementById('quizNextBtn');
        if (nextBtn) {
          nextBtn.textContent = idx >= total ? 'Ver resultado →' : 'Siguiente →';
          setQuizAnswered(true);
          nextBtn.onclick = () => renderPractice();
          nextBtn.focus({ preventScroll: true });
        } else {
          setTimeout(renderPractice, 1400);
        }
      });
    });
    updProgress(idx, total);
  }

  function finishPractice() {
    const elapsed = timedSeconds ? timedSeconds - (timer && timer.remaining != null ? timer.remaining : 0) : null;
    stopTimer();
    const pct = finishExercise({
      correct: score, total, startMode, setMode: v => mode = v,
      elapsedSeconds: elapsed,
    });
    const modeSuffix = mode === 'timed' ? '-timed' : '';
    recordScore(`${scoreKeyPrefix}-${currentCat}${modeSuffix}`, pct);
  }

  // ═══ STUDY ═══
  function initStudy() {
    deck = shuffle(getData());
    idx = 0;
    document.querySelector('[data-area="study"]').classList.add('show');
    renderStudyCard();
  }

  function renderStudyCard() {
    const item = deck[idx];
    recordStudyItemSeen({ storagePrefix: scoreKeyPrefix, category: currentCat, term: item.sentence, totalItems: getData().length });
    const card = document.getElementById('fcCard');
    card.classList.remove('flip');
    document.getElementById('fcEmoji').textContent = categories[currentCat].icon;
    document.getElementById('fcSentence').innerHTML = item.sentence.replace('___', '___');
    document.getElementById('fcHint').textContent = `${categories[currentCat].label}`;
    document.getElementById('fcAnswer').textContent = item.correct;
    document.getElementById('fcExplain').textContent = item.explain;
    document.getElementById('fcCounter').textContent = `${idx + 1} / ${deck.length}`;
    updProgress(idx + 1, deck.length);
  }

  document.getElementById('fcCard').addEventListener('click', () => document.getElementById('fcCard').classList.toggle('flip'));
  document.getElementById('nextBtn').addEventListener('click', () => advanceCard(1));
  document.getElementById('prevBtn').addEventListener('click', () => advanceCard(-1));
  document.getElementById('shuffleBtn').addEventListener('click', () => { deck = shuffle(deck); idx = 0; renderStudyCard(); });
  initSwipe(document.querySelector('[data-area="study"]'), { onNext: () => advanceCard(1), onPrev: () => advanceCard(-1) });

  function advanceCard(dir) {
    advanceStudyCard(dir, { getIdx: () => idx, setIdx: v => idx = v, deckLength: deck.length, renderCard: renderStudyCard });
  }

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
      const card = document.getElementById('fcCard');
      if (card.classList.contains('flip')) advanceCard(1);
      else card.classList.add('flip');
    } else if (e.key === 'ArrowRight') { e.preventDefault(); advanceCard(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); advanceCard(-1); }
  });

  // ─── Init ───
  startMode();
}
