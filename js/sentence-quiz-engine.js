/* ═══════════════════════════════════════════════════════
   HubFlow — Sentence Quiz Engine
   Shared study/practice/timed logic for the multiple-choice
   sentence-completion exercises (modals, conditionals, clauses,
   comparisons, gerunds-infinitives, made-of, parts-of-speech,
   plural-endings, preferences, reported-speech, used-to,
   word-stress-quiz, causative-verbs). Extracted 2026-07-10 from
   13 near-identical copies inline in each exercises/*.html file.
   ═══════════════════════════════════════════════════════ */

import { shuffle, initTheme, toggleTheme, recordScore, Timer, formatTime, showResult } from './utils.js';

export function initSentenceQuiz({ categories, scoreKeyPrefix, shuffleOptions = false, studyBlankPlaceholder = null, timedQuestionCount = 10 }) {
  initTheme();
  document.getElementById('themeToggle').addEventListener('click', () => toggleTheme());

  const catKeys = Object.keys(categories);
  let currentCat = catKeys[0];
  let mode = 'study';
  let deck = [], idx = 0, score = 0, total = 0;
  let timer = null;
  let timedSeconds = 0;

  function renderCatBar() {
    const bar = document.getElementById('catBar');
    bar.innerHTML = catKeys.map(k =>
      `<button class="cat-btn ${k === currentCat ? 'active' : ''}" data-cat="${k}">${categories[k].icon} ${categories[k].label}</button>`
    ).join('');
    bar.querySelectorAll('[data-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCat = btn.dataset.cat;
        bar.querySelectorAll('[data-cat]').forEach(b => b.classList.toggle('active', b.dataset.cat === currentCat));
        startMode();
      });
    });
  }
  renderCatBar();

  document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      mode = btn.dataset.mode;
      document.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
      startMode();
    });
  });

  function startMode() {
    stopTimer();
    document.querySelectorAll('[data-area]').forEach(a => a.classList.remove('show'));
    document.getElementById('timerBar').classList.remove('show');
    if (mode === 'practice') initPractice(false);
    else if (mode === 'timed') initPractice(true);
    else if (mode === 'study') initStudy();
  }

  function stopTimer() { if (timer) { timer.stop(); timer = null; } timedSeconds = 0; }

  function getData() { return categories[currentCat].items; }

  function updProgress(current, t) {
    const pct = Math.round((current / t) * 100);
    document.getElementById('progFill').style.width = pct + '%';
    document.getElementById('progTxt').textContent = `${current} / ${t}`;
    document.getElementById('progPct').textContent = pct + '%';
  }

  function initPractice(timed) {
    deck = shuffle(getData());
    idx = 0; score = 0;
    total = Math.min(timed ? timedQuestionCount : deck.length, deck.length);
    document.querySelector('[data-area="practice"]').classList.add('show');

    if (timed) {
      document.getElementById('timerBar').classList.add('show');
      timedSeconds = total * 7;

      timer = new Timer(timedSeconds,
        r => { const el = document.getElementById('timerDisplay'); el.textContent = formatTime(r); el.classList.toggle('warn', r <= 10); },
        () => finishPractice()
      );
      timer.start();
    }
    renderPractice();
  }

  function renderPractice() {
    if (idx >= total) { finishPractice(); return; }
    const item = deck[idx];
    const cat = categories[currentCat];

    document.getElementById('scIcon').textContent = cat.icon;
    document.getElementById('scText').innerHTML = item.sentence.replace('___', '<span class="blank">?</span>');
    document.getElementById('scCounter').textContent = `${idx + 1} / ${total}`;
    document.getElementById('explainBox').textContent = '';

    const opts = shuffleOptions ? shuffle([...cat.options]) : [...cat.options];
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

        document.getElementById('scText').innerHTML = item.sentence.replace('___', `<span class="blank">${item.correct}</span>`);
        document.getElementById('explainBox').textContent = item.explain;

        idx++;
        updProgress(idx, total);
        setTimeout(renderPractice, 1400);
      });
    });
    updProgress(idx, total);
  }

  function finishPractice() {
    const elapsed = timedSeconds ? timedSeconds - (timer && timer.remaining != null ? timer.remaining : 0) : null;
    stopTimer();
    const pct = showResult({
      correct: score, total,
      containerEl: document.getElementById('resultOverlay'),
      onRestart: () => startMode(),
      onStudy: () => { mode = 'study'; document.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('active', b.dataset.mode === 'study')); startMode(); },
      elapsedSeconds: elapsed
    });
    recordScore(`${scoreKeyPrefix}-${currentCat}`, pct);
  }

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
    document.getElementById('fcEmoji').textContent = categories[currentCat].icon;
    document.getElementById('fcSentence').textContent = studyBlankPlaceholder
      ? item.sentence.replace('___', studyBlankPlaceholder)
      : item.sentence;
    document.getElementById('fcAnswer').textContent = item.correct;
    document.getElementById('fcExplain').textContent = item.explain;
    document.getElementById('fcCounter').textContent = `${idx + 1} / ${deck.length}`;
    updProgress(idx + 1, deck.length);
  }

  document.getElementById('fcCard').addEventListener('click', () => document.getElementById('fcCard').classList.toggle('flip'));
  document.getElementById('nextBtn').addEventListener('click', () => advanceCard(1));
  document.getElementById('prevBtn').addEventListener('click', () => advanceCard(-1));
  document.getElementById('shuffleBtn').addEventListener('click', () => { deck = shuffle(deck); idx = 0; renderStudyCard(); });

  function advanceCard(dir) {
    const card = document.getElementById('fcCard');
    const inner = card.querySelector('.fc-inner');
    if (card.classList.contains('flip')) {
      inner.style.transition = 'none';
      card.classList.remove('flip');
      void inner.offsetHeight;
      inner.style.transition = '';
    }
    idx = (idx + dir + deck.length) % deck.length;
    renderStudyCard();
  }

  // Keyboard: Enter/Space = flip or advance, Arrows = navigate
  document.addEventListener('keydown', e => {
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
