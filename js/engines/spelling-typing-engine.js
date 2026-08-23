/* ═══════════════════════════════════════════════════════
   HubFlow — Spelling Typing Engine
   Study (flashcard) / Challenge / Timed (quiz): aprender y escribir la forma
   derivada de una palabra, una a la vez — mismo patrón que
   word-formation-engine / spelling-by-ear-engine.

   Reemplaza el grid paginado de tarjetas + "Check All" de spelling-engine.js
   (usado antes por ed-spelling/ing-spelling): saltar entre inputs chicos y
   lejanos en mobile era la queja del usuario, y el botón de check global
   vivía escondido como ícono en el bottom-nav sin dejar claro qué corregía.

   Study mostraba el mismo input+check que Challenge/Timed — un modo
   "aprender" no debería calificar cada respuesta como correcta/incorrecta.
   Ahora Study es un flashcard real (palabra → tap para revelar forma +
   regla), y el tipeo con corrección queda solo para Challenge/Timed.
   2026-08-22.

   `lives`/`streak` de spelling-engine.js no se migran: nunca estuvieron
   conectados a nada (ni bajaban vidas ni cortaban la sesión), quedaban
   siempre en 3 corazones fijos — se descartan en vez de arrastrar código
   muerto a la reescritura. */

import { shuffle } from '../array-utils.js';
import { recordScore, recordStudyItemSeen } from '../progress-store.js';
import { Timer, formatTime, updateProgress, wireModeTabs } from '../exercise-ui.js';
import { finishExercise, squeezeToggle, advanceStudyCard, createStudyNav, handleStudyKeydown } from '../exercise-flow.js';
import { initSwipe } from '../swipe.js';

const ITEMS_PER_SESSION = 12;

/**
 * @param {object} cfg
 * @param {object} cfg.levels            { levelKey: item[] } — mismo shape que antes (data/ed-words.js).
 * @param {object} cfg.levelIcons        { levelKey: emoji } — ícono de la tarjeta por nivel.
 * @param {string} cfg.storagePrefix     Prefijo de las claves de progreso (scoreKeys en catalog.js las espera
 *                                       como `${prefix}-${level}-${mode}` — mismo formato que spelling-engine.js).
 * @param {(item) => string} cfg.getPrompt   Texto grande de la tarjeta (el verbo base).
 * @param {(item) => string} cfg.getAnswer   Respuesta correcta.
 * @param {(item) => string} [cfg.getExplain] Texto de la caja de explicación / dorso del flashcard.
 * @param {(userInput, item) => boolean} [cfg.checkAnswer] Validación custom; por defecto compara con getAnswer().
 */
export function initSpellingTyping({
  levels, levelIcons = {}, storagePrefix,
  getPrompt, getAnswer, getExplain, checkAnswer,
  itemsPerSession = ITEMS_PER_SESSION,
}) {
  let level = Object.keys(levels)[0];
  let mode = 'study';
  let deck = [], idx = 0, score = 0, total = 0, timer = null, answered = false;

  const input = document.getElementById('answerInput');

  document.querySelectorAll('[data-level]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('locked')) return;
      level = btn.dataset.level;
      document.querySelectorAll('[data-level]').forEach(b => b.classList.toggle('active', b === btn));
      startMode();
    });
  });

  wireModeTabs({ getMode: () => mode, setMode: v => mode = v, onChange: startMode });

  function stopTimer() { if (timer) { timer.stop(); timer = null; } }
  function getData() { return levels[level] || []; }
  const updProgress = (c, t) => updateProgress(c, t, document.getElementById('progFill'), document.getElementById('progTxt'), document.getElementById('progPct'));

  function showArea(name) {
    document.querySelectorAll('[data-area]').forEach(a => a.classList.toggle('show', a.dataset.area === name));
  }

  /* ─── Challenge / Timed: tipear + corregir ─── */

  function setQuizAnswered(isAnswered) {
    const nextBtn = document.getElementById('quizNextBtn');
    const skipBtn = document.getElementById('quizSkipBtn');
    if (nextBtn) nextBtn.hidden = !isAnswered;
    if (skipBtn) skipBtn.hidden = isAnswered;
  }

  function skipItem() {
    if (answered || idx >= total) return;
    idx++;
    updProgress(idx, total);
    renderItem();
  }
  document.getElementById('quizSkipBtn')?.addEventListener('click', skipItem);

  function initQuiz() {
    showArea('quiz');
    const pool = getData();
    deck = shuffle(pool).slice(0, Math.min(pool.length, itemsPerSession));
    idx = 0; score = 0; answered = false;
    total = deck.length;
    if (mode === 'timed') {
      document.getElementById('timerBar')?.classList.add('show');
      timer = new Timer(total * 8, r => {
        const el = document.getElementById('timerDisplay');
        if (el) { el.textContent = formatTime(r); el.classList.toggle('warn', r <= 10); }
      }, () => finishSession());
      timer.start();
    }
    renderItem();
  }

  function renderItem() {
    if (idx >= total) { stopTimer(); finishSession(); return; }
    answered = false;
    setQuizAnswered(false);
    const item = deck[idx];
    document.getElementById('scIcon').textContent = levelIcons[level] || '';
    document.getElementById('scText').textContent = getPrompt(item);
    document.getElementById('scCounter').textContent = `${idx + 1} / ${total}`;
    document.getElementById('explainBox').textContent = '';
    input.value = '';
    input.className = 'answer-input';
    input.disabled = false;
    input.focus();
    updProgress(idx, total);
  }

  function checkItem() {
    if (answered) return;
    const val = input.value.trim().toLowerCase();
    if (!val) return;
    const item = deck[idx];
    answered = true;
    input.disabled = true;
    const correctAnswer = getAnswer(item);
    const isCorrect = checkAnswer ? checkAnswer(val, item) : val === correctAnswer.toLowerCase();
    if (isCorrect) {
      input.classList.add('correct');
      score++;
    } else {
      input.classList.add('wrong');
      input.value = `${val} → ${correctAnswer}`;
    }
    document.getElementById('explainBox').textContent = getExplain ? getExplain(item) : '';
    idx++;
    updProgress(idx, total);
    const nextBtn = document.getElementById('quizNextBtn');
    if (nextBtn) {
      nextBtn.textContent = idx >= total ? 'Ver resultado →' : 'Siguiente →';
      setQuizAnswered(true);
      nextBtn.onclick = () => renderItem();
      nextBtn.focus({ preventScroll: true });
    } else {
      setTimeout(renderItem, 1600);
    }
  }
  // El submit del <form> (no un keydown="Enter" en el input) es lo que
  // dispara el check — cubre tanto el clic del botón como el "Enter"/"Ir"
  // del teclado del celular con el mismo código: varios teclados virtuales
  // nunca emiten un keydown con key:"Enter", pero SÍ activan el botón
  // submit del form, que es su propósito nativo.
  document.getElementById('answerForm').addEventListener('submit', e => {
    e.preventDefault();
    checkItem();
  });

  function finishSession() {
    const pct = finishExercise({ correct: score, total, startMode, setMode: v => mode = v });
    recordScore(`${storagePrefix}-${level}-${mode}`, pct);
  }

  /* ─── Study: flashcard (palabra → tap para revelar forma + regla) ─── */

  function renderStudyCard() {
    const item = deck[idx];
    recordStudyItemSeen({ storagePrefix, category: level, term: getPrompt(item), totalItems: getData().length });
    document.getElementById('fcCard').classList.remove('flip');
    document.getElementById('fcEmoji').textContent = levelIcons[level] || '';
    document.getElementById('fcTerm').textContent = getPrompt(item);
    document.getElementById('fcAnswer').textContent = getAnswer(item);
    document.getElementById('fcExplain').textContent = getExplain ? getExplain(item) : '';
    document.getElementById('fcCounter').textContent = `${idx + 1} / ${deck.length}`;
    updProgress(idx + 1, deck.length);
  }

  document.getElementById('fcCard')?.addEventListener('click', () => squeezeToggle(document.getElementById('fcCard'), 'flip'));
  document.getElementById('nextBtn')?.addEventListener('click', () => advanceCard(1));
  document.getElementById('prevBtn')?.addEventListener('click', () => advanceCard(-1));
  document.getElementById('shuffleBtn')?.addEventListener('click', () => { deck = shuffle(deck); idx = 0; renderStudyCard(); });
  initSwipe(document.querySelector('[data-area="study"]'), { onNext: () => advanceCard(1), onPrev: () => advanceCard(-1) });

  // Sin sugerencia de "siguiente nivel": a diferencia de las categorías de
  // otros engines, acá el nivel lo elige el usuario a mano en el cat-bar —
  // al terminar el mazo simplemente ofrece repasar de nuevo.
  const { advanceCard } = createStudyNav({
    getIdx: () => idx, setIdx: v => idx = v,
    getDeckLength: () => deck.length,
    renderCard: renderStudyCard,
    findFollowUp: () => null,
    onContinue: () => {},
    onRestudy: () => { idx = 0; renderStudyCard(); },
  });

  document.addEventListener('keydown', e => {
    if (mode !== 'study') return;
    handleStudyKeydown(e, { advanceCard });
  });

  function initStudy() {
    showArea('study');
    deck = shuffle(getData());
    idx = 0;
    renderStudyCard();
  }

  function startMode() {
    stopTimer();
    document.getElementById('timerBar')?.classList.remove('show');
    setQuizAnswered(false);
    if (mode === 'study') initStudy();
    else initQuiz();
  }

  startMode();
}
