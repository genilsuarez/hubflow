/* ═══════════════════════════════════════════════════════
   HubFlow — Sentence Quiz Engine
   Shared study/quiz/timed logic for the multiple-choice
   sentence-completion exercises (modals, conditionals, clauses,
   comparisons, gerunds-infinitives, made-of, parts-of-speech,
   plural-endings, preferences, reported-speech, used-to,
   word-stress-quiz, causative-verbs). Extracted 2026-07-10 from
   13 near-identical copies inline in each exercises/*.html file.
   ═══════════════════════════════════════════════════════ */

import { shuffle } from '../array-utils.js';
import { recordScore, renderLessonProgress, recordStudyItemSeen, getScoreStatus, getStars } from '../progress-store.js';
import { Timer, formatTime, renderCatBar as sharedRenderCatBar, makeTimerState, wireModeTabs, syncModeTabsActive } from '../exercise-ui.js';
import { finishExercise, squeezeToggle, advanceStudyCard, showStudyFollowUpOverlay, handleStudyKeydown, handleQuizNextKeydown, handleOverlayKeydown } from '../exercise-flow.js';
import { RESULT_TITLES } from '../result-copy.js';
import { speak, isSpeechAvailable, readAutoSpeak, writeAutoSpeak } from '../speech.js';
import { createStudySpeakButton, insertInBottomNav } from '../ex-bottom-nav.js';
import { initSwipe } from '../swipe.js';

const SPEAK_ICON = '🔊';

/**
 * Rellena todos los huecos de la frase, no solo el primero: hay items con dos
 * `___` cuya respuesta viene como par ("was cooking, arrived"). Con un
 * `.replace('___', ...)` la respuesta entera caía en el primer hueco y el
 * segundo se quedaba literal ("We were eating, went dinner when the lights ___
 * off."). Si el número de partes coincide con el de huecos se reparten en
 * orden; si no, la respuesta va al primer hueco y el resto queda marcado.
 */
// Casi todo item.correct es un string único. Algunos puntos gramaticales
// (used-to vs would para acciones repetidas: "would" siempre es correcto ahí,
// pero "used to" TAMBIÉN lo es — es la forma general) tienen más de una
// respuesta válida y solo el clic sobre la que quedó fijada como `correct`
// contaba como acierto. Con un array se aceptan todas; sigue siendo un string
// en el resto de items, sin cambiar su comportamiento.
const acceptedAnswers = item => Array.isArray(item.correct) ? item.correct : [item.correct];
const primaryAnswer = item => Array.isArray(item.correct) ? item.correct[0] : item.correct;
// Casi siempre la opción elegida es literalmente lo que va en el hueco. En los
// items de análisis (¿este 's es "is" o posesión?) la opción es una etiqueta
// ("'s = is") y volcarla al hueco produce "John 's = possession car is new".
// `item.fill` separa las dos cosas: la etiqueta se queda en el botón y en el
// hueco entra el texto real de la frase.
const blankFiller = item => item.fill != null ? item.fill : primaryAnswer(item);

function fillBlanks(sentence, filler, wrap = t => t) {
  const holes = (sentence.match(/___/g) || []).length;
  const parts = (holes > 1 && typeof filler === 'string' && filler.split(',').length === holes)
    ? filler.split(',').map(s => s.trim())
    : null;
  let i = -1;
  // 334 frases tienen el hueco pegado a un signo ("___,", "___."). El span
  // relleno tiene padding a ambos lados para separarse del texto; contra
  // puntuación ese padding se leía como un espacio espurio ("remain , the").
  // El próximo carácter tras el hueco decide si se suprime ese lado.
  return sentence.replace(/___/g, (match, offset) => {
    i++;
    const next = sentence[offset + match.length];
    const tight = next && /[,.;:!?)]/.test(next);
    return wrap(parts ? parts[i] : (i === 0 ? filler : '?'), tight);
  });
}

export function initSentenceQuiz({ categories, scoreKeyPrefix, contentId = null, shuffleOptions = true, studyBlankPlaceholder = null, timedQuestionCount = 10, speech = false }) {
  renderLessonProgress(contentId);

  let currentCat = Object.keys(categories)[0];
  let mode = 'study';
  let deck = [], idx = 0, score = 0, total = 0;
  // Se hereda la preferencia de plataforma (`lp-autospeak`), la misma que usa
  // flashcard-engine: si el usuario dejó el sonido activo en otro ejercicio,
  // aquí también suena. Antes arrancaba siempre apagado y sin persistir, así
  // que el ejercicio parecía mudo aunque el toggle estuviera "encendido".
  let autoSpeak = readAutoSpeak();
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
  // renderQuiz() sigue avanzando solo tras una pausa (comportamiento previo).
  document.getElementById('quizSkipBtn')?.addEventListener('click', () => skipQuiz());

  function setQuizAnswered(answered) {
    const nextBtn = document.getElementById('quizNextBtn');
    const skipBtn = document.getElementById('quizSkipBtn');
    if (nextBtn) nextBtn.hidden = !answered;
    if (skipBtn) skipBtn.hidden = answered;
  }

  function skipQuiz() {
    if (idx >= total) return;
    idx++;
    updProgress(idx, total);
    renderQuiz();
  }

  function startMode() {
    timerState.stop();
    document.querySelectorAll('[data-area]').forEach(a => a.classList.remove('show'));
    document.getElementById('timerBar').classList.remove('show');
    // Reset unconditionally on every mode switch (not just at the top of
    // renderQuiz) so #quizNextBtn never bleeds into Study/other areas —
    // mirrors flashcard-engine.js hideAllAreas().
    setQuizAnswered(false);
    if (mode === 'quiz') initQuiz(false);
    else if (mode === 'timed') initQuiz(true);
    else if (mode === 'study') initStudy();
    syncSpeakNavUI();
    window.__syncBottomNavMode?.();
  }

  function getData() { return categories[currentCat].items; }

  /**
   * Study puede tener su propio mazo. Por defecto son los mismos items del
   * quiz (frase con hueco al frente, respuesta detrás), que es lo que hacen
   * los 40+ ejercicios existentes. Una categoría que declare `studyCards`
   * enseña la regla antes de examinarla: `{ front, back, detail }`.
   */
  function getStudyDeck() {
    const cat = categories[currentCat];
    return cat.studyCards?.length ? cat.studyCards : cat.items;
  }

  /** Cara visible de una tarjeta, venga de `studyCards` o de un item de quiz. */
  function studyFace(card) {
    if (!card) return { front: '', back: '', detail: '' };
    if (card.front != null) {
      return { front: card.front, back: card.back || '', detail: card.detail || '' };
    }
    return {
      front: studyBlankPlaceholder ? fillBlanks(card.sentence, studyBlankPlaceholder) : card.sentence,
      back: Array.isArray(card.correct) ? card.correct.join(' / ') : card.correct,
      detail: card.explain || '',
    };
  }

  /**
   * ¿Este ejercicio ofrece pronunciación? Antes se deducía de que el icono de
   * la categoría fuera literalmente '🔊', lo que dejaba sin audio a las otras
   * categorías del MISMO ejercicio de pronunciación (plural-endings: solo
   * "Plural Nouns" lo tenía; "Third-Person Verbs" 🏃 y "Possessive 's" 🔑 no)
   * y a ejercicios enteros como word-stress-quiz. Ahora se declara con
   * `speech: true` al inicializar, o por categoría con `speech: true`.
   */
  function usesSpeakNav() {
    if (!isSpeechAvailable()) return false;
    const cat = categories[currentCat];
    if (cat?.speech !== undefined) return Boolean(cat.speech);
    return speech || cat?.icon === SPEAK_ICON;
  }

  /** El icono de la tarjeta solo se cede al botón de audio si ERA el altavoz. */
  function hidesCardIcon() {
    return categories[currentCat]?.icon === SPEAK_ICON;
  }

  function getSpeakableText(item) {
    // Una `studyCard` no tiene frase: lo pronunciable es su cara frontal.
    if (item?.front != null) return String(item.front);
    if (!item?.sentence) return '';
    const text = studyBlankPlaceholder
      ? fillBlanks(item.sentence, studyBlankPlaceholder)
      : fillBlanks(item.sentence, primaryAnswer(item) || '');
    return text.replace(/<[^>]*>/g, '').trim();
  }

  function speakCurrentItem() {
    const item = deck[idx];
    const text = getSpeakableText(item);
    if (text) speak(text);
  }

  /**
   * Refleja el estado on/off en el botón. Mismo lenguaje visual que #speakBtn
   * de flashcard-engine (🔊/🔇 + `.is-on`): antes solo se ponía la clase
   * `active`, que no tiene ningún estilo, así que el único indicio de "activo"
   * era el anillo de foco del navegador — indistinguible de apagado.
   */
  function syncSpeakBtnState() {
    const btn = document.getElementById('studySpeakBtn');
    if (!btn) return;
    const on = autoSpeak && usesSpeakNav();
    const label = on ? 'Pronunciación automática: ON' : 'Pronunciación automática: OFF';
    btn.classList.toggle('is-on', on);
    btn.textContent = on ? '🔊' : '🔇';
    btn.setAttribute('aria-pressed', String(on));
    btn.setAttribute('aria-label', label);
    btn.title = label;
  }

  function setAutoSpeak(on) {
    autoSpeak = on;
    writeAutoSpeak(on);
    syncSpeakBtnState();
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
        active: autoSpeak,
      });
      insertInBottomNav(btn);
    }
    btn.hidden = !usesSpeakNav();
    syncSpeakBtnState();
    return btn;
  }

  function syncSpeakNavUI() {
    const active = usesSpeakNav();
    const hideIcon = hidesCardIcon();
    const fcCard = document.getElementById('fcCard');
    const sentenceCard = document.querySelector('.sentence-card');
    const fcEmoji = document.getElementById('fcEmoji');
    const scIcon = document.getElementById('scIcon');

    fcCard?.classList.toggle('fc-card--speak-in-nav', hideIcon);
    sentenceCard?.classList.toggle('sentence-card--speak-in-nav', hideIcon);

    if (fcEmoji) fcEmoji.textContent = hideIcon ? '' : categories[currentCat].icon;
    if (scIcon) scIcon.textContent = hideIcon ? '' : categories[currentCat].icon;

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

  function initQuiz(timed) {
    // Clean up any pending keyboard listener from the previous question
    document.getElementById('wordOptions')?._cleanKeyOpt?.();
    deck = shuffle(getData());
    idx = 0; score = 0;
    total = Math.min(timed ? timedQuestionCount : deck.length, deck.length);
    document.querySelector('[data-area="quiz"]').classList.add('show');

    if (timed) {
      document.getElementById('timerBar').classList.add('show');
      timerState.timedSeconds = total * 7;

      timerState.timer = new Timer(timerState.timedSeconds,
        r => { const el = document.getElementById('timerDisplay'); el.textContent = formatTime(r); el.classList.toggle('warn', r <= 10); },
        () => finishQuiz()
      );
      timerState.timer.start();
    }
    renderQuiz();
  }

  function renderQuiz() {
    if (idx >= total) { finishQuiz(); return; }
    const item = deck[idx];
    const cat = categories[currentCat];

    const scIcon = document.getElementById('scIcon');
    if (scIcon && !hidesCardIcon()) scIcon.textContent = cat.icon;
    document.getElementById('scText').innerHTML = fillBlanks(item.sentence, '?', (t, tight) => `<span class="blank${tight ? ' blank--tight' : ''}">${t}</span>`);
    document.getElementById('scCounter').textContent = `${idx + 1} / ${total}`;
    document.getElementById('explainBox').textContent = '';
    setQuizAnswered(false);

    const baseOpts = item.options || cat.options;
    const opts = shuffleOptions ? shuffle([...baseOpts]) : [...baseOpts];
    const optsEl = document.getElementById('wordOptions');
    optsEl.innerHTML = opts.map((o, i) => `<button class="word-opt" data-val="${o}"><span class="word-opt__num">${i + 1}</span>${o}</button>`).join('');

    function handleOptClick(btn) {
      if (btn.classList.contains('disabled')) return;
      optsEl.querySelectorAll('.word-opt').forEach(b => { b.classList.add('disabled'); b.style.pointerEvents = 'none'; });

      const chosen = btn.dataset.val;
      const accepted = acceptedAnswers(item);
      if (accepted.includes(chosen)) { btn.classList.add('correct'); score++; }
      else {
        btn.classList.add('wrong');
        optsEl.querySelectorAll('.word-opt').forEach(b => { if (accepted.includes(b.dataset.val)) b.classList.add('correct'); });
      }

      document.getElementById('scText').innerHTML = fillBlanks(item.sentence, blankFiller(item), (t, tight) => `<span class="blank${tight ? ' blank--tight' : ''}">${t}</span>`);
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
        setTimeout(renderQuiz, 1400);
      }
    }

    optsEl.querySelectorAll('.word-opt').forEach(btn => {
      btn.addEventListener('click', () => handleOptClick(btn));
    });

    // Keyboard shortcut: press 1/2/3 to select the corresponding option
    function onKeyOpt(e) {
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= opts.length) {
        const btn = optsEl.querySelectorAll('.word-opt')[n - 1];
        if (btn && !btn.classList.contains('disabled')) {
          document.removeEventListener('keydown', onKeyOpt);
          handleOptClick(btn);
        }
      }
    }
    document.addEventListener('keydown', onKeyOpt);
    // Clean up listener when moving to next question or changing mode
    optsEl._cleanKeyOpt = () => document.removeEventListener('keydown', onKeyOpt);

    updProgress(idx, total);
    maybeAutoSpeak();
  }

  function finishQuiz() {
    const elapsed = timerState.timedSeconds ? timerState.timedSeconds - (timerState.timer && timerState.timer.remaining != null ? timerState.timer.remaining : 0) : null;
    timerState.stop();

    const pct = Math.round((score / total) * 100);
    const stars = getStars(pct);
    const modeSuffix = mode === 'timed' ? '-timed' : '-quiz';
    recordScore(`${scoreKeyPrefix}-${currentCat}${modeSuffix}`, pct);
    renderLessonProgress(contentId);

    const overlay = document.getElementById('resultOverlay');
    if (!overlay) return;

    const timeHtml = elapsed != null
      ? `<div class="result-time">⏱ ${formatTime(elapsed)}</div>`
      : '';

    // Igual que showResultOverlay en FlashcardEngine: sugerir la siguiente
    // actividad pendiente del módulo en vez de dejar al usuario sin rumbo.
    const suggestion = findStudyFollowUp();
    const nextHtml = suggestion
      ? `<div class="result-sub">Siguiente: ${suggestion.isNewCategory
          ? `${categories[suggestion.cat]?.label || suggestion.cat} — 📖 Study`
          : '🎯 Quiz'}</div>`
      : '';
    const primaryLabel = suggestion ? 'Continuar →' : '📖 Study';

    overlay.innerHTML = `
      <div class="result-box">
        <button class="result-close" id="resultDismiss" aria-label="Cerrar">✕</button>
        <div class="result-stars">
          <span class="result-star ${stars >= 1 ? 'lit' : ''}">⭐</span>
          <span class="result-star ${stars >= 2 ? 'lit' : ''}">⭐</span>
          <span class="result-star ${stars >= 3 ? 'lit' : ''}">⭐</span>
        </div>
        <div class="result-title">${RESULT_TITLES[stars]}</div>
        <div class="result-sub">${score}/${total} correctas — ${pct}%</div>
        ${timeHtml}
        ${nextHtml}
        <div class="result-btns">
          <button class="lp-btn lp-btn--ghost" id="resultRestart">🔄 Reintentar</button>
          <button class="lp-btn lp-btn--purple" id="resultContinue">${primaryLabel}</button>
        </div>
      </div>
    `;
    overlay.classList.add('show');

    overlay.querySelector('#resultDismiss')?.addEventListener('click', () => {
      overlay.classList.remove('show');
    });
    overlay.querySelector('#resultRestart')?.addEventListener('click', () => {
      overlay.classList.remove('show');
      startMode();
    });
    overlay.querySelector('#resultContinue')?.addEventListener('click', () => {
      overlay.classList.remove('show');
      if (!suggestion) {
        mode = 'study';
        syncModeTabsActive('study');
        startMode();
        return;
      }
      if (suggestion.isNewCategory) switchToCategory(suggestion.cat);
      mode = suggestion.mode;
      syncModeTabsActive(mode);
      startMode();
    });
  }

  function initStudy() {
    // Los items del quiz se barajan (son ejemplos intercambiables); las
    // `studyCards` no, porque van de la regla general a los casos especiales
    // y ese orden es el contenido. El botón 🔀 sigue disponible.
    const studyDeck = getStudyDeck();
    deck = categories[currentCat].studyCards?.length ? [...studyDeck] : shuffle(studyDeck);
    idx = 0;
    document.querySelector('[data-area="study"]').classList.add('show');
    renderStudyCard();
  }

  function renderStudyCard() {
    const item = deck[idx];
    const face = studyFace(item);

    recordStudyItemSeen({
      contentId,
      storagePrefix: scoreKeyPrefix,
      category: currentCat,
      term: face.front,
      totalItems: getStudyDeck().length,
    });

    const card = document.getElementById('fcCard');
    card.classList.remove('flip');
    const fcEmoji = document.getElementById('fcEmoji');
    if (fcEmoji && !hidesCardIcon()) fcEmoji.textContent = categories[currentCat].icon;
    const verbHintHtml = item.verb ? ` <span class="fc-verb-hint">(${item.verb})</span>` : '';
    const fcSentenceEl = document.getElementById('fcSentence');
    if (verbHintHtml) {
      fcSentenceEl.innerHTML = face.front + verbHintHtml;
    } else {
      fcSentenceEl.textContent = face.front;
    }
    document.getElementById('fcAnswer').textContent = face.back;
    document.getElementById('fcExplain').textContent = face.detail;
    document.getElementById('fcCounter').textContent = `${idx + 1} / ${deck.length}`;
    updProgress(idx + 1, deck.length);
    maybeAutoSpeak();
  }

  document.getElementById('fcCard').addEventListener('click', () => squeezeToggle(document.getElementById('fcCard'), 'flip'));
  document.getElementById('nextBtn').addEventListener('click', () => advanceCard(1));
  document.getElementById('prevBtn').addEventListener('click', () => advanceCard(-1));
  document.getElementById('shuffleBtn').addEventListener('click', () => { deck = shuffle(deck); idx = 0; renderStudyCard(); });
  initSwipe(document.querySelector('[data-area="study"]'), { onNext: () => advanceCard(1), onPrev: () => advanceCard(-1) });

  function advanceCard(dir) {
    // Reaching the end of the deck going forward suggests what to do next
    // instead of silently wrapping back to card 1 — same UX as FlashcardEngine.
    if (dir > 0 && idx === deck.length - 1) {
      showStudyFollowUp();
      return;
    }

    advanceStudyCard(dir, { getIdx: () => idx, setIdx: v => idx = v, deckLength: deck.length, renderCard: renderStudyCard });
  }

  function scoreKeyFor(cat, mode = 'quiz') {
    return mode === 'study'
      ? `${scoreKeyPrefix}-${cat}`
      : `${scoreKeyPrefix}-${cat}-${mode}`;
  }

  /**
   * What to suggest once the Study deck is finished: Quiz for the current
   * category if not yet passed, else the first other category still pending —
   * mirrors FlashcardEngine.findStudyFollowUp() (quiz/timed share one score
   * key here, so there's a single next mode instead of a ranked list).
   */
  function findStudyFollowUp() {
    if (!getScoreStatus(scoreKeyFor(currentCat, 'quiz')).passed) {
      return { cat: currentCat, mode: 'quiz', isNewCategory: false };
    }
    const catKeys = Object.keys(categories);
    const startIdx = catKeys.indexOf(currentCat);
    for (let i = 1; i <= catKeys.length; i++) {
      const cat = catKeys[(startIdx + i) % catKeys.length];
      if (cat === currentCat) continue;
      if (!getScoreStatus(scoreKeyFor(cat, 'quiz')).passed) return { cat, mode: 'study', isNewCategory: true };
    }
    return null;
  }

  function switchToCategory(cat) {
    currentCat = cat;
    document.querySelectorAll('#catBar [data-cat]').forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
  }

  function showStudyFollowUp() {
    const suggestion = findStudyFollowUp();
    showStudyFollowUpOverlay({
      suggestion,
      subtitle: !suggestion ? '' : suggestion.isNewCategory
        ? `Siguiente: ${categories[suggestion.cat]?.label || suggestion.cat} — 📖 Study`
        : 'Siguiente: 🎯 Quiz',
      onContinue: () => {
        if (suggestion.isNewCategory) switchToCategory(suggestion.cat);
        mode = suggestion.mode;
        syncModeTabsActive(mode);
        startMode();
      },
      onRestudy: () => { idx = 0; renderStudyCard(); },
    });
  }

  // Keyboard: Enter/Space = flip or advance, Arrows = navigate
  document.addEventListener('keydown', e => {
    if (handleOverlayKeydown(e)) return;
    if (mode === 'quiz' || mode === 'timed') { handleQuizNextKeydown(e); return; }
    if (mode !== 'study') return;

    handleStudyKeydown(e, { advanceCard });
  });

  startMode();
}
