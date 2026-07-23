/* ═══════════════════════════════════════════════════════
   HubFlow — Sentence Quiz Engine
   Shared study/practice/timed logic for the multiple-choice
   sentence-completion exercises (modals, conditionals, clauses,
   comparisons, gerunds-infinitives, made-of, parts-of-speech,
   plural-endings, preferences, reported-speech, used-to,
   word-stress-quiz, causative-verbs). Extracted 2026-07-10 from
   13 near-identical copies inline in each exercises/*.html file.
   ═══════════════════════════════════════════════════════ */

import { shuffle, recordScore, Timer, formatTime, showResult, renderCatBar as sharedRenderCatBar, makeTimerState, renderLessonProgress, speak } from './utils.js';

const SPEAK_ICON = '🔊';

export function initSentenceQuiz({ categories, scoreKeyPrefix, contentId = null, shuffleOptions = false, studyBlankPlaceholder = null, timedQuestionCount = 10 }) {
  renderLessonProgress(contentId);

  const catKeys = Object.keys(categories);
  let currentCat = catKeys[0];
  let mode = 'study';
  let deck = [], idx = 0, score = 0, total = 0;
  let autoSpeak = false;
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
    document.querySelectorAll('[data-area]').forEach(a => a.classList.remove('show'));
    document.getElementById('timerBar').classList.remove('show');
    if (mode === 'practice') initPractice(false);
    else if (mode === 'timed') initPractice(true);
    else if (mode === 'study') initStudy();
    syncSpeakNavUI();
  }

  function getData() { return categories[currentCat].items; }

  function usesSpeakNav() {
    return categories[currentCat]?.icon === SPEAK_ICON;
  }

  function getSpeakableText(item) {
    if (!item?.sentence) return '';
    const text = studyBlankPlaceholder
      ? item.sentence.replace('___', studyBlankPlaceholder)
      : item.sentence.replace('___', item.correct || '');
    return text.replace(/<[^>]*>/g, '').trim();
  }

  function speakCurrentItem() {
    const item = deck[idx];
    const text = getSpeakableText(item);
    if (text) speak(text);
  }

  function setAutoSpeak(on) {
    autoSpeak = on;
    const btn = document.getElementById('studySpeakBtn');
    if (!btn) return;
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-pressed', String(on));
    const label = on ? 'Desactivar auto-pronunciación' : 'Activar auto-pronunciación';
    btn.setAttribute('aria-label', label);
    btn.title = on ? 'Auto-pronunciación activa' : 'Activar auto-pronunciación';
    if (on) speakCurrentItem();
    else if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  function maybeAutoSpeak() {
    if (autoSpeak && usesSpeakNav()) speakCurrentItem();
  }

  function insertSpeakInNav(btn, attempt = 0) {
    const nav = document.getElementById('exBottomNav') || document.querySelector('.fc-nav');
    if (!nav) {
      if (attempt < 24) setTimeout(() => insertSpeakInNav(btn, attempt + 1), 50);
      return;
    }
    const progressBtn = document.getElementById('lessonProgressBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    if (btn.parentElement !== nav) {
      if (progressBtn?.parentElement === nav) progressBtn.insertAdjacentElement('afterend', btn);
      else if (shuffleBtn?.parentElement === nav) nav.insertBefore(btn, shuffleBtn);
      else nav.insertBefore(btn, nav.firstChild);
    }
  }

  function ensureSpeakButton() {
    let btn = document.getElementById('studySpeakBtn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'studySpeakBtn';
      btn.type = 'button';
      btn.className = 'lp-btn lp-btn--ghost';
      btn.textContent = SPEAK_ICON;
      btn.setAttribute('aria-label', 'Activar auto-pronunciación');
      btn.setAttribute('aria-pressed', 'false');
      btn.title = 'Activar auto-pronunciación';
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        setAutoSpeak(!autoSpeak);
      });
      insertSpeakInNav(btn);
    }
    btn.hidden = !usesSpeakNav();
    btn.classList.toggle('active', autoSpeak && usesSpeakNav());
    btn.setAttribute('aria-pressed', String(autoSpeak && usesSpeakNav()));
    return btn;
  }

  function syncSpeakNavUI() {
    const active = usesSpeakNav();
    const fcCard = document.getElementById('fcCard');
    const sentenceCard = document.querySelector('.sentence-card');
    const fcEmoji = document.getElementById('fcEmoji');
    const scIcon = document.getElementById('scIcon');

    fcCard?.classList.toggle('fc-card--speak-in-nav', active);
    sentenceCard?.classList.toggle('sentence-card--speak-in-nav', active);

    if (fcEmoji) {
      if (active) fcEmoji.textContent = '';
      else fcEmoji.textContent = categories[currentCat].icon;
    }
    if (scIcon) {
      if (active) scIcon.textContent = '';
      else scIcon.textContent = categories[currentCat].icon;
    }

    const speakBtn = document.getElementById('studySpeakBtn');
    if (active) ensureSpeakButton();
    else if (speakBtn) speakBtn.hidden = true;
  }

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
      timerState.timedSeconds = total * 7;

      timerState.timer = new Timer(timerState.timedSeconds,
        r => { const el = document.getElementById('timerDisplay'); el.textContent = formatTime(r); el.classList.toggle('warn', r <= 10); },
        () => finishPractice()
      );
      timerState.timer.start();
    }
    renderPractice();
  }

  function renderPractice() {
    if (idx >= total) { finishPractice(); return; }
    const item = deck[idx];
    const cat = categories[currentCat];

    const scIcon = document.getElementById('scIcon');
    if (scIcon && !usesSpeakNav()) scIcon.textContent = cat.icon;
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
    maybeAutoSpeak();
  }

  function finishPractice() {
    const elapsed = timerState.timedSeconds ? timerState.timedSeconds - (timerState.timer && timerState.timer.remaining != null ? timerState.timer.remaining : 0) : null;
    timerState.stop();
    const pct = showResult({
      correct: score, total,
      containerEl: document.getElementById('resultOverlay'),
      onRestart: () => startMode(),
      onStudy: () => { mode = 'study'; document.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('active', b.dataset.mode === 'study')); startMode(); },
      elapsedSeconds: elapsed
    });
    recordScore(`${scoreKeyPrefix}-${currentCat}`, pct);
    renderLessonProgress(contentId);
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
    const fcEmoji = document.getElementById('fcEmoji');
    if (fcEmoji && !usesSpeakNav()) fcEmoji.textContent = categories[currentCat].icon;
    document.getElementById('fcSentence').textContent = studyBlankPlaceholder
      ? item.sentence.replace('___', studyBlankPlaceholder)
      : item.sentence;
    document.getElementById('fcAnswer').textContent = item.correct;
    document.getElementById('fcExplain').textContent = item.explain;
    document.getElementById('fcCounter').textContent = `${idx + 1} / ${deck.length}`;
    updProgress(idx + 1, deck.length);
    maybeAutoSpeak();
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
