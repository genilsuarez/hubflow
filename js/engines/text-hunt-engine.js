/* ═══════════════════════════════════════════════════════
   HubFlow — Text Hunt Engine
   Modo Hunt / Timed para los ejercicios de "encontrar y corregir
   errores en un texto": error-hunt, punctuation-fix.

   Extraído 2026-08-17 de 2 copias idénticas inline en
   exercises/*.html — solo diferían en el data file y el prefijo de
   scoreKey.

   Claves de progreso emitidas (sin cambio respecto a las copias
   inline): `${scoreKeyPrefix}-${cat}` y `${scoreKeyPrefix}-${cat}-timed`.
   Declaradas en js/engines/manifest.mjs.
   ═══════════════════════════════════════════════════════ */

import { shuffle } from '../array-utils.js';
import { recordScore } from '../progress-store.js';
import { Timer, formatTime, renderCatBar as sharedRenderCatBar, updateProgress as sharedUpdateProgress, wireModeTabs } from '../exercise-ui.js';
import { finishExercise } from '../exercise-flow.js';
import { setAnswerBottomNav } from '../ex-bottom-nav.js';

/**
 * @param {object} cfg
 * @param {object} cfg.categories               CATEGORIES del data file ({ items: [{ text, errors }], icon, label, level }).
 * @param {string} cfg.scoreKeyPrefix           Prefijo de las claves de progreso.
 * @param {number} [cfg.timedDurationSeconds=120] Duración total del modo Timed.
 */
export function initTextHunt({ categories, scoreKeyPrefix, timedDurationSeconds = 120 }) {


  let currentCat = Object.keys(categories)[0];
  let mode = 'hunt';
  let deck = [], idx = 0, score = 0, totalErrors = 0;
  let selectedWords = new Set();
  let corrections = {};
  let currentSelectedIdx = null;
  let checked = false;
  let timer = null;
  let timedSeconds = 0;

  // ─── Category bar ───
  sharedRenderCatBar({
    containerId: 'catBar', categories: categories,
    getCurrentCat: () => currentCat, setCurrentCat: v => currentCat = v,
    onChange: startMode,
    formatLabel: (k, cat) => `${cat.icon} ${cat.label} <span style="font-size:.6rem;opacity:.7">${cat.level}</span>`,
  });

  // ─── Mode switching ───
  wireModeTabs({ getMode: () => mode, setMode: v => mode = v, onChange: startMode });

  function startMode() {
    stopTimer();
    deck = shuffle(categories[currentCat].items);
    idx = 0; score = 0; totalErrors = 0;
    document.getElementById('timerBar').classList.toggle('show', mode === 'timed');
    document.getElementById('modeDesc').textContent = mode === 'timed'
      ? 'Find errors before time runs out!'
      : 'Tap the incorrect words, then type the correction';

    if (mode === 'timed') {
      timedSeconds = timedDurationSeconds;

      timer = new Timer(timedSeconds,
        r => { const el = document.getElementById('timerDisplay'); el.textContent = formatTime(r); el.classList.toggle('warn', r <= 15); },
        () => finishAll()
      );
      timer.start();
    }
    loadText();
  }

  function stopTimer() { if (timer) { timer.stop(); timer = null; } timedSeconds = 0; }

  function loadText() {
    if (idx >= deck.length) { finishAll(); return; }
    const item = deck[idx];
    selectedWords = new Set();
    corrections = {};
    currentSelectedIdx = null;
    checked = false;

    document.getElementById('huntCounter').textContent = `Text ${idx + 1} / ${deck.length}`;
    setAnswerBottomNav({ check: true, next: false });
    document.getElementById('huntExplanations').classList.remove('show');
    document.getElementById('correctionPanel').classList.remove('show');

    renderText(item);
    updateStatus(item);
    updateProgress();
  }

  function renderText(item) {
    const words = item.text.split(' ');
    const container = document.getElementById('huntText');
    container.innerHTML = words.map((w, i) =>
      `<span class="hunt-word" data-idx="${i}">${w}</span> `
    ).join('');

    container.querySelectorAll('.hunt-word').forEach(el => {
      el.addEventListener('click', () => {
        if (checked) return;
        const wi = parseInt(el.dataset.idx);
        if (selectedWords.has(wi)) {
          selectedWords.delete(wi);
          delete corrections[wi];
          el.classList.remove('selected');
          if (currentSelectedIdx === wi) hideCorrection();
        } else {
          selectedWords.add(wi);
          el.classList.add('selected');
          showCorrection(wi, words[wi]);
        }
        updateStatus(item);
      });
    });
  }

  function showCorrection(wordIdx, word) {
    currentSelectedIdx = wordIdx;
    const panel = document.getElementById('correctionPanel');
    panel.classList.add('show');
    document.getElementById('corrWord').textContent = `"${word}"`;
    const input = document.getElementById('corrInput');
    input.value = corrections[wordIdx] || '';
    input.focus();
  }

  function hideCorrection() {
    currentSelectedIdx = null;
    document.getElementById('correctionPanel').classList.remove('show');
  }

  // Correction submit
  document.getElementById('corrSubmit').addEventListener('click', submitCorrection);
  document.getElementById('corrInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') submitCorrection();
  });

  function submitCorrection() {
    if (currentSelectedIdx === null) return;
    const val = document.getElementById('corrInput').value.trim();
    if (val) corrections[currentSelectedIdx] = val;
    hideCorrection();
  }

  function updateStatus(item) {
    const found = selectedWords.size;
    const total = item.errors.length;
    document.getElementById('huntStatus').innerHTML = `Found: <em>${found}</em> / ${total} errors`;
  }

  const updateProgress = () => sharedUpdateProgress(idx, deck.length,
    document.getElementById('progFill'), document.getElementById('progTxt'), document.getElementById('progPct'));

  // ─── Check ───
  document.getElementById('checkBtn').addEventListener('click', checkText);

  function checkText() {
    if (checked) return;
    checked = true;
    hideCorrection();

    const item = deck[idx];
    const errorIndices = new Set(item.errors.map(e => e.index));
    let correct = 0;

    // Mark words
    document.querySelectorAll('.hunt-word').forEach(el => {
      const wi = parseInt(el.dataset.idx);
      const isError = errorIndices.has(wi);
      const wasSelected = selectedWords.has(wi);

      if (isError && wasSelected) {
        // Check correction
        const err = item.errors.find(e => e.index === wi);
        const userCorr = (corrections[wi] || '').toLowerCase().trim();
        const expected = err.correction.toLowerCase().trim();
        if (expected === '' || userCorr === expected || expected.includes(userCorr) || userCorr.includes(expected)) {
          el.classList.add('correct');
          correct++;
        } else {
          el.classList.add('correct'); // still found it
          correct += 0.5; // partial credit
        }
      } else if (isError && !wasSelected) {
        el.classList.add('missed');
      } else if (!isError && wasSelected) {
        el.classList.add('false-positive');
      }
      el.style.cursor = 'default';
    });

    score += correct;
    totalErrors += item.errors.length;

    // Show explanations
    const expContainer = document.getElementById('huntExplanations');
    expContainer.innerHTML = item.errors.map(err => {
      const words = item.text.split(' ');
      return `<div class="hunt-exp-item">
        <strong>${words[err.index]}</strong> → <em>${err.correction || '(remove)'}</em> — ${err.rule}
      </div>`;
    }).join('');
    expContainer.classList.add('show');

    setAnswerBottomNav({ check: false, next: true });
  }

  // ─── Next ───
  document.getElementById('nextBtn').addEventListener('click', () => {
    idx++;
    loadText();
  });

  // ─── Finish ───
  function finishAll() {
    const elapsed = timedSeconds ? timedSeconds - (timer && timer.remaining != null ? timer.remaining : 0) : null;
    stopTimer();
    const pct = totalErrors > 0 ? Math.round((score / totalErrors) * 100) : 0;
    finishExercise({
      correct: Math.round(score), total: totalErrors, startMode,
      elapsedSeconds: elapsed,
    });
    const modeSuffix = mode === 'timed' ? '-timed' : '';
    recordScore(`${scoreKeyPrefix}-${currentCat}${modeSuffix}`, pct);
    // Update progress to 100
    document.getElementById('progFill').style.width = '100%';
    document.getElementById('progTxt').textContent = `${deck.length} / ${deck.length}`;
    document.getElementById('progPct').textContent = '100%';
  }

  // ─── Keyboard: Enter to check ───
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey && !checked && currentSelectedIdx === null) {
      e.preventDefault();
      checkText();
    }
  });

  // Start
  startMode();
}
