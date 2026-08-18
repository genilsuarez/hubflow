/* ═══════════════════════════════════════════════════════
   HubFlow — Paragraph Cloze Engine
   Practice / Timed: rellenar varios huecos de un párrafo.

   Extraído 2026-08-17 del <script type="module"> inline de
   exercises/paragraph-cloze.html. Las claves de progreso emitidas no
   cambian; están declaradas en js/engines/manifest.mjs.
   ═══════════════════════════════════════════════════════ */

import { shuffle } from '../array-utils.js';
import { recordScore } from '../progress-store.js';
import { Timer, formatTime, renderCatBar as sharedRenderCatBar, updateProgress, wireModeTabs } from '../exercise-ui.js';
import { finishExercise } from '../exercise-flow.js';
import { setPracticeBottomNav } from '../ex-bottom-nav.js';

/**
 * @param {object} cfg
 * @param {object} cfg.categories     CATEGORIES del data file.
 * @param {string} cfg.scoreKeyPrefix Prefijo de las claves de progreso.
 */
export function initParagraphCloze({ categories, scoreKeyPrefix }) {
  function normalize(s) {
    return (s || '').toLowerCase().trim().replace(/[.,!?;:]+$/, '').replace(/\s+/g, ' ');
  }
  function isMatch(userAnswer, correctArray) {
    const n = normalize(userAnswer);
    return n.length > 0 && correctArray.some(c => normalize(c) === n);
  }

  let currentCat = Object.keys(categories)[0];
  let mode = 'practice';
  let deck = [], idx = 0, blanksCorrect = 0, blanksTotal = 0, total = 0;
  let checked = false;
  let timer = null;
  let timedSeconds = 0;

  sharedRenderCatBar({
    containerId: 'catBar', categories: categories,
    getCurrentCat: () => currentCat, setCurrentCat: v => currentCat = v,
    onChange: startMode,
  });

  wireModeTabs({ getMode: () => mode, setMode: v => mode = v, onChange: startMode });

  function stopTimer() { if (timer) { timer.stop(); timer = null; } timedSeconds = 0; }

  function startMode() {
    stopTimer();
    deck = shuffle(categories[currentCat].items);
    idx = 0; blanksCorrect = 0; blanksTotal = 0;
    total = deck.length;
    document.getElementById('timerBar').classList.toggle('show', mode === 'timed');

    if (mode === 'timed') {
      timedSeconds = total * 45;

      timer = new Timer(timedSeconds,
        r => { const el = document.getElementById('timerDisplay'); el.textContent = formatTime(r); el.classList.toggle('warn', r <= 20); },
        () => finish()
      );
      timer.start();
    }
    renderPassage();
  }

  const updProgress = () => updateProgress(idx, total,
    document.getElementById('progFill'), document.getElementById('progTxt'), document.getElementById('progPct'));

  function renderPassage() {
    if (idx >= total) { stopTimer(); finish(); return; }
    checked = false;
    const item = deck[idx];

    document.getElementById('pcTitleText').textContent = item.title;
    document.getElementById('pcCounter').textContent = `${idx + 1} / ${total}`;

    const html = item.text.replace(/___(\d+)___/g, (m, n) =>
      `<input class="pc-blank" data-n="${n}" autocomplete="off" autocapitalize="off" spellcheck="false">`
    );
    document.getElementById('pcText').innerHTML = html;
    document.getElementById('pcExplanations').classList.remove('show');
    document.getElementById('pcExplanations').innerHTML = '';
    document.getElementById('pcExplainFinal').style.display = 'none';

    updateStatus(item);

    setPracticeBottomNav({ check: true, next: false });

    const firstBlank = document.querySelector('.pc-blank[data-n="1"]');
    if (firstBlank) firstBlank.focus();

    document.querySelectorAll('.pc-blank').forEach((el, i, all) => {
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          const next = all[i + 1];
          if (next) next.focus(); else checkAll();
        }
      });
    });

    updProgress();
  }

  function updateStatus(item) {
    document.getElementById('pcStatus').innerHTML = `<em>${item.blanks.length}</em> blanks in this passage`;
  }

  function checkAll() {
    if (checked) return;
    checked = true;
    const item = deck[idx];
    let correctCount = 0;

    item.blanks.forEach(b => {
      const el = document.querySelector(`.pc-blank[data-n="${b.n}"]`);
      if (!el) return;
      el.disabled = true;
      const ok = isMatch(el.value, b.correct);
      el.classList.add(ok ? 'correct' : 'wrong');
      if (ok) correctCount++;
    });

    blanksCorrect += correctCount;
    blanksTotal += item.blanks.length;

    document.getElementById('pcStatus').innerHTML = `<em>${correctCount}</em> / ${item.blanks.length} correct`;

    const expEl = document.getElementById('pcExplanations');
    expEl.innerHTML = item.blanks.map(b =>
      `<div class="pc-exp-item"><strong>#${b.n}</strong> → <em>${b.correct[0]}</em> — ${b.hint}</div>`
    ).join('');
    expEl.classList.add('show');

    const finalEl = document.getElementById('pcExplainFinal');
    finalEl.textContent = item.explain;
    finalEl.style.display = 'block';

    setPracticeBottomNav({ check: false, next: true });
  }

  document.getElementById('checkBtn').addEventListener('click', checkAll);
  document.getElementById('nextBtn').addEventListener('click', () => { idx++; renderPassage(); });

  function finish() {
    stopTimer();
    const pct = blanksTotal > 0 ? Math.round((blanksCorrect / blanksTotal) * 100) : 0;
    finishExercise({ correct: blanksCorrect, total: blanksTotal, startMode });
    const _timedSuffix = mode === 'timed' ? '-timed' : ''; recordScore(`${scoreKeyPrefix}-${currentCat}${_timedSuffix}`, pct);
    document.getElementById('progFill').style.width = '100%';
    document.getElementById('progTxt').textContent = `${total} / ${total}`;
    document.getElementById('progPct').textContent = '100%';
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && checked) { e.preventDefault(); document.getElementById('nextBtn').click(); }
  });

  startMode();
}
