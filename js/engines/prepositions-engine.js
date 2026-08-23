/* ═══════════════════════════════════════════════════════
   HubFlow — Prepositions Engine
   Study / Quiz / Timed de preposiciones en contexto.

   Extraído 2026-08-17 del <script type="module"> inline de
   exercises/prepositions.html. Las claves de progreso emitidas no
   cambian; están declaradas en js/engines/manifest.mjs.
   ═══════════════════════════════════════════════════════ */

import { shuffle } from '../array-utils.js';
import { recordScore, recordStudyItemSeen, getScoreStatus } from '../progress-store.js';
import { Timer, formatTime, renderCatBar as sharedRenderCatBar, updateProgress, wireModeTabs, syncModeTabsActive } from '../exercise-ui.js';
import { finishExercise, squeezeToggle, showStudyFollowUpOverlay, handleStudyKeydown, handleQuizNextKeydown, findNextPendingCategory, createStudyNav } from '../exercise-flow.js';
import { initSwipe } from '../swipe.js';
import { blankHTML } from '../blank-fill.js';

/**
 * @param {object} cfg
 * @param {object} cfg.categories     CATEGORIES del data file.
 * @param {string} cfg.scoreKeyPrefix Prefijo de las claves de progreso.
 */
export function initPrepositions({ categories, scoreKeyPrefix }) {
  let currentCat = Object.keys(categories)[0];
  let mode = 'study';
  let deck = [], idx = 0, score = 0, total = 0;
  let timer = null;
  let timedSeconds = 0;

  // Returns the next pending activity: pending timed in current cat → next cat study.
  // Quiz key = ${prefix}-${cat}, timed = ${prefix}-${cat}-timed.
  function findStudyFollowUp() {
    if (!getScoreStatus(`${scoreKeyPrefix}-${currentCat}-timed`).passed) {
      return { label: '⏱️ Timed', isNewCategory: false, onContinue: () => { mode = 'timed'; syncModeTabsActive(mode); startMode(); } };
    }
    const cat = findNextPendingCategory({
      categories, currentCat,
      isPending: c => !getScoreStatus(`${scoreKeyPrefix}-${c}`).passed || !getScoreStatus(`${scoreKeyPrefix}-${c}-timed`).passed,
    });
    if (cat) {
      return { label: `${categories[cat]?.label || cat} — 📖 Study`, isNewCategory: true, onContinue: () => { currentCat = cat; mode = 'study'; startMode(); } };
    }
    return null;
  }

  // ─── Category bar ───
  sharedRenderCatBar({
    containerId: 'catBar', categories: categories,
    getCurrentCat: () => currentCat, setCurrentCat: v => currentCat = v,
    onChange: startMode,
  });

  // ─── Mode switching ───
  wireModeTabs({ getMode: () => mode, setMode: v => mode = v, onChange: startMode });

  document.getElementById('quizSkipBtn')?.addEventListener('click', () => skipQuiz());
  function setQuizAnswered(answered) { const nextBtn = document.getElementById('quizNextBtn'); const skipBtn = document.getElementById('quizSkipBtn'); if (nextBtn) nextBtn.hidden = !answered; if (skipBtn) skipBtn.hidden = answered; }
  function skipQuiz() { if (idx >= total) return; idx++; updProgress(idx, total); renderQuiz(); }

  function startMode() {
    stopTimer();
    document.querySelectorAll('[data-area]').forEach(a => a.classList.remove('show'));
    document.getElementById('timerBar').classList.remove('show');
    setQuizAnswered(false);
    if (mode === 'quiz') initQuiz(false);
    else if (mode === 'timed') initQuiz(true);
    else if (mode === 'study') initStudy();
    window.__syncBottomNavMode?.();
  }

  function stopTimer() { if (timer) { timer.stop(); timer = null; } timedSeconds = 0; }

  function getData() { return categories[currentCat].items; }
  function getOptions() { return categories[currentCat].options; }

  const updProgress = (current, t) => updateProgress(current, t,
    document.getElementById('progFill'), document.getElementById('progTxt'), document.getElementById('progPct'));

  // ═══ QUIZ / TIMED ═══
  function initQuiz(timed) {
    deck = shuffle(getData());
    idx = 0; score = 0;
    total = Math.min(timed ? 12 : deck.length, deck.length);
    document.querySelector('[data-area="quiz"]').classList.add('show');

    if (timed) {
      document.getElementById('timerBar').classList.add('show');
      timedSeconds = total * 7;

      timer = new Timer(timedSeconds,
        r => { const el = document.getElementById('timerDisplay'); el.textContent = formatTime(r); el.classList.toggle('warn', r <= 10); },
        () => finishQuiz()
      );
      timer.start();
    }
    renderQuiz();
  }

  function renderQuiz() {
    if (idx >= total) { finishQuiz(); return; }
    const item = deck[idx];
    const cat = categories[currentCat];

    document.getElementById('scIcon').textContent = cat.icon;
    document.getElementById('scText').innerHTML = blankHTML(item.sentence, '?');
    document.getElementById('scCounter').textContent = `${idx + 1} / ${total}`;
    document.getElementById('explainBox').textContent = '';
    setQuizAnswered(false);

    const opts = shuffle([...cat.options]);
    const optsEl = document.getElementById('wordOptions');
    optsEl.innerHTML = opts.map(o => `<button class="word-opt" data-val="${o}">${o}</button>`).join('');
    optsEl.querySelectorAll('.word-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        optsEl.querySelectorAll('.word-opt').forEach(b => { b.classList.add('disabled'); b.style.pointerEvents = 'none'; });

        const chosen = btn.dataset.val;
        if (chosen === item.correct) { btn.classList.add('correct'); score++; }
        else {
          btn.classList.add('wrong');
          optsEl.querySelectorAll('.word-opt').forEach(b => { if (b.dataset.val === item.correct) b.classList.add('correct'); });
        }

        document.getElementById('scText').innerHTML = blankHTML(item.sentence, item.correct);
        document.getElementById('explainBox').textContent = item.explain;

        idx++;
        updProgress(idx, total);

        const nextBtn = document.getElementById('quizNextBtn');
        if (nextBtn) {
          nextBtn.textContent = idx >= total ? 'Ver resultado →' : 'Siguiente →';
          setQuizAnswered(true);
          nextBtn.onclick = () => renderQuiz();
          nextBtn.focus({ preventScroll: true });
        } else {
          setTimeout(renderQuiz, 1200);
        }
      });
    });
    updProgress(idx, total);
  }

  function finishQuiz() {
    const elapsed = timedSeconds ? timedSeconds - (timer && timer.remaining != null ? timer.remaining : 0) : null;
    stopTimer();
    const pct = finishExercise({
      correct: score, total, startMode, setMode: v => mode = v,
      elapsedSeconds: elapsed,
      suggestion: findStudyFollowUp(),
    });
    const _timedSuffix = mode === 'timed' ? '-timed' : ''; recordScore(`${scoreKeyPrefix}-${currentCat}${_timedSuffix}`, pct);
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
    document.getElementById('fcSentence').textContent = item.sentence;
    document.getElementById('fcAnswer').textContent = item.correct;
    document.getElementById('fcExplain').textContent = item.explain;
    document.getElementById('fcCounter').textContent = `${idx + 1} / ${deck.length}`;
    updProgress(idx + 1, deck.length);
  }

  document.getElementById('fcCard').addEventListener('click', () => squeezeToggle(document.getElementById('fcCard'), 'flip'));
  document.getElementById('nextBtn').addEventListener('click', () => advanceCard(1));
  document.getElementById('prevBtn').addEventListener('click', () => advanceCard(-1));
  document.getElementById('shuffleBtn').addEventListener('click', () => { deck = shuffle(deck); idx = 0; renderStudyCard(); });
  initSwipe(document.querySelector('[data-area="study"]'), { onNext: () => advanceCard(1), onPrev: () => advanceCard(-1) });

  const { advanceCard, showFollowUp: showStudyFollowUp } = createStudyNav({
    getIdx: () => idx, setIdx: v => idx = v,
    getDeckLength: () => deck.length,
    renderCard: renderStudyCard,
    findFollowUp: findStudyFollowUp,
    onContinue: s => { s.onContinue(); syncModeTabsActive(mode); },
    onRestudy: () => { idx = 0; renderStudyCard(); },
  });

  document.addEventListener('keydown', e => {
    if (mode === 'quiz' || mode === 'timed') { handleQuizNextKeydown(e); return; }
    if (mode !== 'study') return;

    handleStudyKeydown(e, { advanceCard });
  });

  // ─── Init ───
  startMode();
}
