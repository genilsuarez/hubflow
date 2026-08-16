/* ═══════════════════════════════════════════════════════
   HubFlow — Sentence Quiz Engine
   Shared study/practice/timed logic for the multiple-choice
   sentence-completion exercises (modals, conditionals, clauses,
   comparisons, gerunds-infinitives, made-of, parts-of-speech,
   plural-endings, preferences, reported-speech, used-to,
   word-stress-quiz, causative-verbs). Extracted 2026-07-10 from
   13 near-identical copies inline in each exercises/*.html file.
   ═══════════════════════════════════════════════════════ */

import { shuffle } from './array-utils.js';
import { recordScore, renderLessonProgress, recordStudyItemSeen, getScoreStatus } from './progress-store.js';
import { Timer, formatTime, renderCatBar as sharedRenderCatBar, makeTimerState, wireModeTabs, syncModeTabsActive } from './exercise-ui.js';
import { finishExercise } from './exercise-flow.js';
import { speak } from './speech.js';
import { createStudySpeakButton, insertInBottomNav } from './ex-bottom-nav.js';

const SPEAK_ICON = '🔊';

export function initSentenceQuiz({ categories, scoreKeyPrefix, contentId = null, shuffleOptions = false, studyBlankPlaceholder = null, timedQuestionCount = 10 }) {
  renderLessonProgress(contentId);

  let currentCat = Object.keys(categories)[0];
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

  wireModeTabs({ getMode: () => mode, setMode: v => mode = v, onChange: startMode });

  // Quiz/Timed: "Siguiente" en vez de auto-avanzar tras responder, y "Saltar"
  // para pasar sin puntuar — mismo patrón que el quiz de FlashcardEngine
  // (js/flashcard-engine.js handleQuizAnswer/skipQuiz). Los botones solo
  // existen en el markup de los ejercicios que los declaran; si no están,
  // renderPractice() sigue avanzando solo tras una pausa (comportamiento previo).
  document.getElementById('quizSkipBtn')?.addEventListener('click', () => skipPractice());

  function setQuizAnswered(answered) {
    const nextBtn = document.getElementById('quizNextBtn');
    const skipBtn = document.getElementById('quizSkipBtn');
    if (nextBtn) nextBtn.hidden = !answered;
    if (skipBtn) skipBtn.hidden = answered;
  }

  function skipPractice() {
    if (idx >= total) return;
    idx++;
    updProgress(idx, total);
    renderPractice();
  }

  function startMode() {
    timerState.stop();
    document.querySelectorAll('[data-area]').forEach(a => a.classList.remove('show'));
    document.getElementById('timerBar').classList.remove('show');
    // Reset unconditionally on every mode switch (not just at the top of
    // renderPractice) so #quizNextBtn never bleeds into Study/other areas —
    // mirrors flashcard-engine.js hideAllAreas().
    setQuizAnswered(false);
    if (mode === 'practice') initPractice(false);
    else if (mode === 'timed') initPractice(true);
    else if (mode === 'study') initStudy();
    syncSpeakNavUI();
    window.__syncBottomNavMode?.();
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

  function ensureSpeakButton() {
    let btn = document.getElementById('studySpeakBtn');
    if (!btn) {
      btn = createStudySpeakButton({
        onClick: (e) => {
          e.stopPropagation();
          setAutoSpeak(!autoSpeak);
        },
      });
      insertInBottomNav(btn);
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
    setQuizAnswered(false);

    const baseOpts = item.options || cat.options;
    const opts = shuffleOptions ? shuffle([...baseOpts]) : [...baseOpts];
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
    maybeAutoSpeak();
  }

  function finishPractice() {
    const elapsed = timerState.timedSeconds ? timerState.timedSeconds - (timerState.timer && timerState.timer.remaining != null ? timerState.timer.remaining : 0) : null;
    timerState.stop();
    const pct = finishExercise({
      correct: score, total, startMode, setMode: v => mode = v,
      elapsedSeconds: elapsed,
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

    recordStudyItemSeen({
      contentId,
      storagePrefix: scoreKeyPrefix,
      category: currentCat,
      term: item.sentence,
      totalItems: getData().length,
    });

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
    // Reaching the end of the deck going forward suggests what to do next
    // instead of silently wrapping back to card 1 — same UX as FlashcardEngine.
    if (dir > 0 && idx === deck.length - 1) {
      showStudyFollowUp();
      return;
    }

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

  function scoreKeyFor(cat) { return `${scoreKeyPrefix}-${cat}`; }

  /**
   * What to suggest once the Study deck is finished: Practice for the current
   * category if not yet passed, else the first other category still pending —
   * mirrors FlashcardEngine.findStudyFollowUp() (practice/timed share one score
   * key here, so there's a single next mode instead of a ranked list).
   */
  function findStudyFollowUp() {
    if (!getScoreStatus(scoreKeyFor(currentCat)).passed) {
      return { cat: currentCat, mode: 'practice', isNewCategory: false };
    }
    const catKeys = Object.keys(categories);
    const startIdx = catKeys.indexOf(currentCat);
    for (let i = 1; i <= catKeys.length; i++) {
      const cat = catKeys[(startIdx + i) % catKeys.length];
      if (cat === currentCat) continue;
      if (!getScoreStatus(scoreKeyFor(cat)).passed) return { cat, mode: 'study', isNewCategory: true };
    }
    return null;
  }

  function switchToCategory(cat) {
    currentCat = cat;
    document.querySelectorAll('#catBar [data-cat]').forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
  }

  function showStudyFollowUp() {
    const overlay = document.getElementById('resultOverlay');
    if (!overlay) return;
    const suggestion = findStudyFollowUp();

    const restudy = () => {
      overlay.classList.remove('show');
      idx = 0;
      renderStudyCard();
    };

    if (suggestion) {
      const subtitle = suggestion.isNewCategory
        ? `Siguiente: ${categories[suggestion.cat]?.label || suggestion.cat} — 📖 Study`
        : 'Siguiente: 🎯 Quiz';

      overlay.innerHTML = `
        <div class="result-box">
          <button class="result-close" id="resultDismiss" aria-label="Cerrar">✕</button>
          <div style="font-size:3rem;margin-bottom:8px;">📖</div>
          <div class="result-title">¡Tarjetas repasadas! 🎉</div>
          <div class="result-sub">${subtitle}</div>
          <div class="result-btns">
            <button class="lp-btn lp-btn--ghost" id="resultRestudy">🔄 Repasar de nuevo</button>
            <button class="lp-btn lp-btn--purple" id="resultContinue">Continuar →</button>
          </div>
        </div>
      `;
      overlay.classList.add('show');
      overlay.querySelector('#resultContinue')?.addEventListener('click', () => {
        overlay.classList.remove('show');
        if (suggestion.isNewCategory) switchToCategory(suggestion.cat);
        mode = suggestion.mode;
        syncModeTabsActive(mode);
        startMode();
      });
      overlay.querySelector('#resultRestudy')?.addEventListener('click', restudy);
      overlay.querySelector('#resultDismiss')?.addEventListener('click', restudy);
    } else {
      overlay.innerHTML = `
        <div class="result-box">
          <button class="result-close" id="resultDismiss" aria-label="Cerrar">✕</button>
          <div style="font-size:3rem;margin-bottom:8px;">🏆</div>
          <div class="result-title">¡Lección completa! 🎉</div>
          <div class="result-sub">Aprobaste todas las categorías de esta lección.</div>
          <div class="result-btns">
            <button class="lp-btn lp-btn--ghost" id="resultRestudy">🔄 Repasar de nuevo</button>
            <a class="lp-btn lp-btn--purple" href="../index.html">Salir</a>
          </div>
        </div>
      `;
      overlay.classList.add('show');
      overlay.querySelector('#resultRestudy')?.addEventListener('click', restudy);
      overlay.querySelector('#resultDismiss')?.addEventListener('click', restudy);
    }
  }

  // Keyboard: Enter/Space = flip or advance, Arrows = navigate
  document.addEventListener('keydown', e => {
    if (mode !== 'study') return;

    // While the end-of-deck follow-up overlay is open, Enter/Space confirms
    // its primary action instead of flipping the (hidden) card underneath.
    const overlay = document.getElementById('resultOverlay');
    if (overlay && overlay.classList.contains('show')) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const primaryBtn = overlay.querySelector('#resultContinue') || overlay.querySelector('#resultRestudy');
        primaryBtn?.click();
      }
      return;
    }

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
