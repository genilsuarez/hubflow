/* ═══════════════════════════════════════════════════════
   HubFlow — Phonics Engine
   Study / Quiz / Timed / Match de sonidos y grafías, con TTS.

   Extraído 2026-08-17 del <script type="module"> inline de
   exercises/phonics.html. Las claves de progreso emitidas no
   cambian; están declaradas en js/engines/manifest.mjs.
   ═══════════════════════════════════════════════════════ */

import { shuffle } from '../array-utils.js';
import { recordScore, recordStudyItemSeen, getScoreStatus } from '../progress-store.js';
import { Timer, formatTime, renderCatBar as sharedRenderCatBar, wireModeTabs, syncModeTabsActive } from '../exercise-ui.js';
import { finishExercise, createMatchMode, squeezeToggle, showStudyFollowUpOverlay, handleStudyKeydown, handleQuizNextKeydown, findNextPendingCategory, createStudyNav } from '../exercise-flow.js';
import { speak } from '../speech.js';
import { initSwipe } from '../swipe.js';

/**
 * @param {object} cfg
 * @param {object} cfg.categories     Datos del ejercicio (data/phonics.js).
 * @param {string} cfg.scoreKeyPrefix Prefijo de las claves de progreso.
 */
export function initPhonics({ categories, scoreKeyPrefix }) {
  let currentCat = Object.keys(categories)[0];
  let mode = 'study';
  let deck = [], idx = 0, score = 0, total = 0;
  let timer = null;
  let timedSeconds = 0;
  let currentWord = null;

  // Returns the next pending activity.
  // Keys: quiz=${prefix}-${cat}, timed=${prefix}-${cat}-timed, match=${prefix}-${cat}-match.
  function findStudyFollowUp() {
    const FOLLOW_MODES = [
      { key: cat => `${scoreKeyPrefix}-${cat}-timed`, label: '⏱️ Timed', mode: 'timed' },
      { key: cat => `${scoreKeyPrefix}-${cat}-match`, label: '🔗 Match', mode: 'match' },
    ];
    for (const m of FOLLOW_MODES) {
      if (!getScoreStatus(m.key(currentCat)).passed) {
        return { label: m.label, isNewCategory: false, onContinue: () => { mode = m.mode; syncModeTabsActive(mode); startMode(); } };
      }
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

  // TTS — uses shared speak() from speech.js (object opts signature)
  function speakWord(text, rate = 0.85) {
    speak(text, { rate, lang: 'en-GB' });
  }

  // Category bar — uses shared renderCatBar from exercise-ui.js
  sharedRenderCatBar({
    categories: categories,
    getCurrentCat: () => currentCat,
    setCurrentCat: (k) => { currentCat = k; },
    onChange: startMode,
    formatLabel: (k, cat) => cat.icon,
  });

  // Mode switching
  wireModeTabs({ getMode: () => mode, setMode: v => mode = v, onChange: startMode });

  function startMode() {
    stopTimer();
    document.querySelectorAll('[data-area]').forEach(a => a.classList.remove('show'));
    document.getElementById('timerBar').classList.remove('show');
    if (mode === 'study') initStudy();
    else if (mode === 'quiz') initQuiz(false);
    else if (mode === 'match') initMatch();
    else if (mode === 'timed') initQuiz(true);
  }

  function stopTimer() { if (timer) { timer.stop(); timer = null; } timedSeconds = 0; }
  function getData() { return categories[currentCat].items; }

  function updProgress(current, t) {
    const pct = Math.round((current / t) * 100);
    document.getElementById('progFill').style.width = pct + '%';
    document.getElementById('progTxt').textContent = `${current} / ${t}`;
    document.getElementById('progPct').textContent = pct + '%';
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
    const card = document.getElementById('fcCard');
    card.classList.remove('flip');

    const cat = currentCat;
    if (cat === 'vowel-pairs' || cat === 'consonant-pairs') {
      document.getElementById('fcWord').textContent = `${item.word_a}  vs  ${item.word_b}`;
      document.getElementById('fcWordB').textContent = item.es;
      document.getElementById('fcIpa').textContent = `${item.ipa_a}  vs  ${item.ipa_b}`;
      document.getElementById('fcSound').textContent = item.sound;
      document.getElementById('fcTip').textContent = item.tip;
      currentWord = item.word_a;
    } else if (cat === 'word-stress') {
      document.getElementById('fcWord').textContent = item.word;
      document.getElementById('fcWordB').textContent = item.es;
      document.getElementById('fcIpa').textContent = `${item.stress_a} (noun)  |  ${item.stress_b} (verb)`;
      document.getElementById('fcSound').textContent = `${item.meaning_a} / ${item.meaning_b}`;
      document.getElementById('fcTip').textContent = item.tip;
      currentWord = item.word;
    } else {
      document.getElementById('fcWord').textContent = item.word;
      document.getElementById('fcWordB').textContent = `${item.es} — silent "${item.silent}"`;
      document.getElementById('fcIpa').textContent = item.ipa;
      document.getElementById('fcSound').textContent = item.rule;
      document.getElementById('fcTip').textContent = item.tip;
      currentWord = item.word;
    }
    recordStudyItemSeen({ storagePrefix: scoreKeyPrefix, category: currentCat, term: currentWord, totalItems: getData().length });
    document.getElementById('fcCounter').textContent = `${idx + 1} / ${deck.length}`;
    updProgress(idx + 1, deck.length);
  }

  document.getElementById('listenBtn').addEventListener('click', () => {
    const item = deck[idx];
    if (currentCat === 'vowel-pairs' || currentCat === 'consonant-pairs') {
      speakWord(item.word_a, 0.7);
      setTimeout(() => speakWord(item.word_b, 0.7), 1200);
    } else {
      speakWord(item.word, 0.7);
    }
  });

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

  // ═══ QUIZ / TIMED ═══
  let quizTarget = null;

  function initQuiz(timed) {
    deck = shuffle(getData());
    idx = 0; score = 0;
    total = Math.min(timed ? 10 : 12, deck.length);
    document.querySelector('[data-area="quiz"]').classList.add('show');

    if (timed) {
      document.getElementById('timerBar').classList.add('show');
      timedSeconds = total * 8;

      timer = new Timer(timedSeconds,
        r => { const el = document.getElementById('timerDisplay'); el.textContent = formatTime(r); el.classList.toggle('warn', r <= 10); },
        () => finishQuiz()
      );
      timer.start();
    }
    renderQuiz();
  }

  function setQuizAnswered(isAnswered) {
    const nextBtn = document.getElementById('quizNextBtn');
    const skipBtn = document.getElementById('quizSkipBtn');
    if (nextBtn) nextBtn.hidden = !isAnswered;
    if (skipBtn) skipBtn.hidden = isAnswered;
  }

  document.getElementById('quizSkipBtn')?.addEventListener('click', () => {
    if (idx >= total) return;
    idx++;
    updProgress(idx, total);
    renderQuiz();
  });

  function renderQuiz() {
    if (idx >= total) { finishQuiz(); return; }
    setQuizAnswered(false);
    const item = deck[idx];
    document.getElementById('explainBox').textContent = '';

    if (currentCat === 'vowel-pairs' || currentCat === 'consonant-pairs') {
      // Pick one of the pair randomly as "target"
      const pickA = Math.random() < 0.5;
      quizTarget = pickA ? item.word_a : item.word_b;
      const correctIpa = pickA ? item.ipa_a : item.ipa_b;

      document.getElementById('quizSound').textContent = item.sound;
      document.getElementById('quizLabel').textContent = 'Listen — which word do you hear?';
      document.getElementById('quizEs').textContent = item.es;

      speakWord(quizTarget, 0.7);

      const opts = shuffle([item.word_a, item.word_b]);
      const optsEl = document.getElementById('quizOptions');
      optsEl.innerHTML = opts.map(o => `<button class="quiz-opt" data-val="${o}">${o}</button>`).join('');
      optsEl.querySelectorAll('.quiz-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          optsEl.querySelectorAll('.quiz-opt').forEach(b => { b.classList.add('disabled'); b.style.pointerEvents = 'none'; });
          if (btn.dataset.val === quizTarget) { btn.classList.add('correct'); score++; }
          else { btn.classList.add('wrong'); optsEl.querySelectorAll('.quiz-opt').forEach(b => { if (b.dataset.val === quizTarget) b.classList.add('correct'); }); }
          document.getElementById('explainBox').textContent = item.tip;
          idx++;
          updProgress(idx, total);
          const nextBtn = document.getElementById('quizNextBtn');
          if (nextBtn) {
            nextBtn.textContent = idx >= total ? 'Ver resultado →' : 'Siguiente →';
            setQuizAnswered(true);
            nextBtn.onclick = () => renderQuiz();
            nextBtn.focus({ preventScroll: true });
          } else {
            setTimeout(renderQuiz, 1300);
          }
        });
      });
    } else if (currentCat === 'word-stress') {
      // Ask: is this word a noun or verb?
      const askNoun = Math.random() < 0.5;
      quizTarget = askNoun ? 'noun' : 'verb';
      const stressPattern = askNoun ? item.stress_a : item.stress_b;

      document.getElementById('quizSound').textContent = item.word;
      document.getElementById('quizLabel').textContent = `Stress pattern: ${stressPattern}`;
      document.getElementById('quizEs').textContent = `Is this the noun or the verb?`;

      const opts = shuffle(['noun', 'verb']);
      const optsEl = document.getElementById('quizOptions');
      optsEl.innerHTML = opts.map(o => `<button class="quiz-opt" data-val="${o}">${o} (${o === 'noun' ? item.meaning_a : item.meaning_b})</button>`).join('');
      optsEl.querySelectorAll('.quiz-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          optsEl.querySelectorAll('.quiz-opt').forEach(b => { b.classList.add('disabled'); b.style.pointerEvents = 'none'; });
          if (btn.dataset.val === quizTarget) { btn.classList.add('correct'); score++; }
          else { btn.classList.add('wrong'); optsEl.querySelectorAll('.quiz-opt').forEach(b => { if (b.dataset.val === quizTarget) b.classList.add('correct'); }); }
          document.getElementById('explainBox').textContent = item.tip;
          idx++;
          updProgress(idx, total);
          const nextBtn = document.getElementById('quizNextBtn');
          if (nextBtn) {
            nextBtn.textContent = idx >= total ? 'Ver resultado →' : 'Siguiente →';
            setQuizAnswered(true);
            nextBtn.onclick = () => renderQuiz();
            nextBtn.focus({ preventScroll: true });
          } else {
            setTimeout(renderQuiz, 1300);
          }
        });
      });
    } else {
      // Silent letters — which letter is silent?
      document.getElementById('quizSound').textContent = item.word;
      document.getElementById('quizLabel').textContent = `IPA: ${item.ipa} — Which letter is silent?`;
      document.getElementById('quizEs').textContent = item.es;

      speakWord(item.word, 0.7);

      // Generate options from letters of the word (unique)
      const letters = [...new Set(item.word.toLowerCase().split(''))].filter(l => l !== ' ');
      const distractors = shuffle(letters.filter(l => l !== item.silent)).slice(0, 3);
      const opts = shuffle([item.silent, ...distractors]);

      const optsEl = document.getElementById('quizOptions');
      optsEl.innerHTML = opts.map(o => `<button class="quiz-opt" data-val="${o}">${o}</button>`).join('');
      optsEl.querySelectorAll('.quiz-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          optsEl.querySelectorAll('.quiz-opt').forEach(b => { b.classList.add('disabled'); b.style.pointerEvents = 'none'; });
          if (btn.dataset.val === item.silent) { btn.classList.add('correct'); score++; }
          else { btn.classList.add('wrong'); optsEl.querySelectorAll('.quiz-opt').forEach(b => { if (b.dataset.val === item.silent) b.classList.add('correct'); }); }
          document.getElementById('explainBox').textContent = item.tip;
          idx++;
          updProgress(idx, total);
          const nextBtn = document.getElementById('quizNextBtn');
          if (nextBtn) {
            nextBtn.textContent = idx >= total ? 'Ver resultado →' : 'Siguiente →';
            setQuizAnswered(true);
            nextBtn.onclick = () => renderQuiz();
            nextBtn.focus({ preventScroll: true });
          } else {
            setTimeout(renderQuiz, 1300);
          }
        });
      });
    }
    updProgress(idx, total);
  }

  document.getElementById('quizListenBtn').addEventListener('click', () => {
    if (quizTarget && (currentCat === 'vowel-pairs' || currentCat === 'consonant-pairs')) {
      speakWord(quizTarget, 0.7);
    } else if (currentCat === 'silent-letters' && deck[idx]) {
      speakWord(deck[idx].word, 0.7);
    }
  });

  // ═══ MATCH (word_a ↔ word_b — only for minimal pairs) ═══
  const matchMode = createMatchMode({
    getData, pairCount: 5, matchScoreKey: scoreKeyPrefix,
    getCurrentCat: () => currentCat, startMode, setMode: v => mode = v, updProgress,
    leftLabel: 'Word A', rightLabel: 'Word B (pair)',
    matchKey: item => item.word_a,
    renderLeft: item => `${item.word_a}<br><small style="font-family:var(--lp-font-mono);font-size:.65rem;opacity:.7">${item.ipa_a}</small>`,
    renderRight: item => `${item.word_b}<br><small style="font-family:var(--lp-font-mono);font-size:.65rem;opacity:.7">${item.ipa_b}</small>`,
    canRun: () => currentCat === 'vowel-pairs' || currentCat === 'consonant-pairs',
    unavailableMessage: `<div class="match-unavail" style="grid-column:1/-1">🔗 Match mode is only available for Minimal Pairs categories.<br>Switch to Vowels or Consonants.</div>`,
  });
  function initMatch() { matchMode.init(); }

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

  // Init
  startMode();
}
