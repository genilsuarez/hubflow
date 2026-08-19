/* ═══════════════════════════════════════════════════════
   HubFlow — Verb Chunks Engine
   Study / Practice / Timed / Write / Sort de patrones verbales.

   Extraído 2026-08-17 del <script type="module"> inline de
   exercises/verb-chunks.html. Las claves de progreso emitidas no
   cambian; están declaradas en js/engines/manifest.mjs.
   ═══════════════════════════════════════════════════════ */

import { shuffle } from '../array-utils.js';
import { recordScore, recordStudyItemSeen, getScoreStatus } from '../progress-store.js';
import { Timer, formatTime, renderCatBar as sharedRenderCatBar, updateProgress, wireModeTabs, syncModeTabsActive } from '../exercise-ui.js';
import { finishExercise, advanceStudyCard } from '../exercise-flow.js';
import { initSwipe } from '../swipe.js';

/**
 * @param {object} cfg
 * @param {object} cfg.categories     Datos del ejercicio (data/verb-chunks.js).
 * @param {string} cfg.scoreKeyPrefix Prefijo de las claves de progreso.
 */
export function initVerbChunks({ categories, scoreKeyPrefix }) {
  const ALL_PREPS = ['to', 'at', 'for', 'from', 'with', 'about', 'on', 'of', 'in', 'after'];
  let currentCat = Object.keys(categories)[0];
  let mode = 'study';
  let deck = [], idx = 0, score = 0, total = 0;
  let timer = null;
  let timedSeconds = 0;

  // Returns the next pending activity.
  // Keys: practice=${prefix}-${cat}, timed=${prefix}-${cat}-timed, write=${prefix}-${cat}-write.
  function findStudyFollowUp() {
    const catKeys = Object.keys(categories);
    const FOLLOW_MODES = [
      { key: cat => `${scoreKeyPrefix}-${cat}-timed`, label: '⏱️ Timed', mode: 'timed' },
      { key: cat => `${scoreKeyPrefix}-${cat}-write`, label: '✍️ Write', mode: 'write' },
    ];
    for (const m of FOLLOW_MODES) {
      if (!getScoreStatus(m.key(currentCat)).passed) {
        return { label: m.label, isNewCategory: false, onContinue: () => { mode = m.mode; syncModeTabsActive(mode); startMode(); } };
      }
    }
    const startIdx = catKeys.indexOf(currentCat);
    for (let i = 1; i <= catKeys.length; i++) {
      const cat = catKeys[(startIdx + i) % catKeys.length];
      if (cat === currentCat) continue;
      if (!getScoreStatus(`${scoreKeyPrefix}-${cat}`).passed || !getScoreStatus(`${scoreKeyPrefix}-${cat}-timed`).passed) {
        return { label: `${categories[cat]?.label || cat} — 📖 Study`, isNewCategory: true, onContinue: () => { currentCat = cat; mode = 'study'; startMode(); } };
      }
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

  document.getElementById('quizSkipBtn')?.addEventListener('click', () => skipPractice());
  function setQuizAnswered(answered) { const nextBtn = document.getElementById('quizNextBtn'); const skipBtn = document.getElementById('quizSkipBtn'); if (nextBtn) nextBtn.hidden = !answered; if (skipBtn) skipBtn.hidden = answered; }
  function skipPractice() { if (idx >= total) return; idx++; updProgress(idx, total); renderPractice(); }

  function startMode() {
    stopTimer();
    document.querySelectorAll('[data-area]').forEach(a => a.classList.remove('show'));
    document.getElementById('timerBar').classList.remove('show');
    const sortBtn = document.getElementById('sortCheck');
    if (sortBtn && mode !== 'sort') sortBtn.style.display = 'none';
    setQuizAnswered(false);
    if (mode === 'practice') initPractice(false);
    else if (mode === 'timed') initPractice(true);
    else if (mode === 'study') initStudy();
    else if (mode === 'write') initWrite();
    else if (mode === 'sort') initSort();
    window.__syncBottomNavMode?.();
  }

  function stopTimer() { if (timer) { timer.stop(); timer = null; } timedSeconds = 0; }

  function getData() { return categories[currentCat].items; }

  function getPrep(item) { return item.prep; }

  function getLabel(item) {
    return currentCat === 'prepositional'
      ? `${item.verb} ___`
      : item.pattern;
  }

  function getHint(item) {
    return currentCat === 'prepositional'
      ? item.es
      : item.es;
  }

  const updProgress = (current, t) => updateProgress(current, t,
    document.getElementById('progFill'), document.getElementById('progTxt'), document.getElementById('progPct'));

  function buildOptions(correct) {
    const distractors = ALL_PREPS.filter(p => p !== correct);
    const picked = shuffle(distractors).slice(0, 4);
    if (!picked.includes(correct)) picked[Math.floor(Math.random() * picked.length)] = correct;
    else picked.push(correct);
    return shuffle([...new Set([correct, ...picked])]).slice(0, 5);
  }

  // ═══ PRACTICE / TIMED ═══
  function initPractice(timed) {
    deck = shuffle(getData());
    idx = 0; score = 0;
    total = Math.min(timed ? 12 : deck.length, deck.length);
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
    document.getElementById('scText').innerHTML = item.gap.replace('___', '<span class="blank">?</span>');
    document.getElementById('scHint').textContent = item.es;
    document.getElementById('scCounter').textContent = `${idx + 1} / ${total}`;
    document.getElementById('explainBox').textContent = '';
    setQuizAnswered(false);

    const opts = buildOptions(item.prep);
    const optsEl = document.getElementById('wordOptions');
    optsEl.innerHTML = opts.map(o => `<button class="word-opt" data-val="${o}">${o}</button>`).join('');
    optsEl.querySelectorAll('.word-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        optsEl.querySelectorAll('.word-opt').forEach(b => { b.classList.add('disabled'); b.style.pointerEvents = 'none'; });

        const chosen = btn.dataset.val;
        if (chosen === item.prep) { btn.classList.add('correct'); score++; }
        else {
          btn.classList.add('wrong');
          optsEl.querySelectorAll('.word-opt').forEach(b => { if (b.dataset.val === item.prep) b.classList.add('correct'); });
        }

        document.getElementById('scText').innerHTML = item.gap.replace('___', `<span class="blank">${item.prep}</span>`);
        document.getElementById('explainBox').textContent = item.example;

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
    recordStudyItemSeen({ storagePrefix: scoreKeyPrefix, category: currentCat, term: item.verb || item.pattern, totalItems: getData().length });
    const card = document.getElementById('fcCard');
    card.classList.remove('flip');

    document.getElementById('fcEmoji').textContent = categories[currentCat].icon;

    if (currentCat === 'prepositional') {
      document.getElementById('fcTerm').textContent = `${item.verb} ${item.prep}`;
    } else {
      document.getElementById('fcTerm').textContent = item.pattern;
    }
    document.getElementById('fcIpa').textContent = item.ipa || '';
    document.getElementById('fcEs').textContent = item.es;
    document.getElementById('fcMeaning').textContent = item.prep;
    document.getElementById('fcExample').textContent = item.example;
    document.getElementById('fcCounter').textContent = `${idx + 1} / ${deck.length}`;
    updProgress(idx + 1, deck.length);
  }

  document.getElementById('fcCard').addEventListener('click', () => document.getElementById('fcCard').classList.toggle('flip'));
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

  function showStudyFollowUp() {
    const overlay = document.getElementById('resultOverlay');
    if (!overlay) return;
    const suggestion = findStudyFollowUp();

    const restudy = () => { overlay.classList.remove('show'); idx = 0; renderStudyCard(); };

    if (suggestion) {
      overlay.innerHTML = `
        <div class="result-box">
          <button class="result-close" id="resultDismiss" aria-label="Cerrar">✕</button>
          <div style="font-size:3rem;margin-bottom:8px;">📖</div>
          <div class="result-title">¡Tarjetas repasadas! 🎉</div>
          <div class="result-sub">Siguiente: ${suggestion.label}</div>
          <div class="result-btns">
            <button class="lp-btn lp-btn--ghost" id="resultRestudy">🔄 Repasar de nuevo</button>
            <button class="lp-btn lp-btn--purple" id="resultContinue">Continuar →</button>
          </div>
        </div>
      `;
      overlay.classList.add('show');
      overlay.querySelector('#resultContinue')?.addEventListener('click', () => {
        overlay.classList.remove('show');
        suggestion.onContinue();
        syncModeTabsActive(mode);
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

  // ═══ WRITE ═══
  function initWrite() {
    deck = shuffle(getData());
    idx = 0; score = 0; total = deck.length;
    document.querySelector('[data-area="write"]').classList.add('show');
    window.__setupPracticeBottomNav?.();
    renderWrite();
  }

  function renderWrite() {
    if (idx >= total) { finishWrite(); return; }
    writeAnswered = false;
    const checkBtn = document.getElementById('checkBtn');
    if (checkBtn) checkBtn.textContent = 'Check ✓';
    const item = deck[idx];

    if (currentCat === 'prepositional') {
      document.getElementById('writeVerb').textContent = `${item.verb} ___`;
    } else {
      document.getElementById('writeVerb').textContent = item.pattern;
    }
    document.getElementById('writeHint').textContent = item.es;
    document.getElementById('writeGap').innerHTML = item.gap.replace('___', '<span class="blank"></span>');

    const input = document.getElementById('writeInput');
    input.value = '';
    input.className = 'write-input';
    input.focus();
    document.getElementById('writeFeedback').textContent = '';
    document.getElementById('writeFeedback').className = 'write-feedback';
    updProgress(idx, total);
  }

  let writeAnswered = false;

  function checkWrite() {
    // Segundo clic (el botón ya dice "Siguiente"): avanza en vez de re-corregir.
    if (writeAnswered) { writeAnswered = false; renderWrite(); return; }
    writeAnswered = true;
    const item = deck[idx];
    const input = document.getElementById('writeInput');
    const fb = document.getElementById('writeFeedback');
    const answer = input.value.trim().toLowerCase();

    if (!answer) { input.focus(); return; }

    if (answer === item.prep) {
      input.classList.add('correct');
      fb.textContent = '✓ Correct!';
      fb.className = 'write-feedback ok';
      score++;
    } else {
      input.classList.add('wrong');
      fb.textContent = `✗ "${item.prep}" — ${item.example}`;
      fb.className = 'write-feedback err';
    }

    idx++;
    updProgress(idx, total);

    // Mismo criterio que el resto de la app: la corrección se queda a la vista
    // hasta que el usuario decide seguir.
    const checkBtn = document.getElementById('checkBtn');
    if (checkBtn) {
      checkBtn.textContent = idx >= total ? 'Ver resultado →' : 'Siguiente →';
      checkBtn.focus({ preventScroll: true });
    } else {
      writeAnswered = false;
      setTimeout(renderWrite, 1600);
    }
  }

  function skipWrite() {
    idx++;
    updProgress(idx, total);
    renderWrite();
  }

  function finishWrite() {
    const pct = finishExercise({ correct: score, total, startMode, setMode: v => mode = v, suggestion: findStudyFollowUp() });
    recordScore(`${scoreKeyPrefix}-${currentCat}-write`, pct);
  }

  document.getElementById('checkBtn').addEventListener('click', checkWrite);
  document.getElementById('skipBtn').addEventListener('click', skipWrite);
  document.getElementById('writeInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); checkWrite(); }
  });

  // ═══ SORT ═══
  const SORT_THEMES = [
    { label: 'Senses & Reactions', verbs: ['look at', 'listen to', 'laugh at', 'believe in'] },
    { label: 'Care & Connection', verbs: ['look after', 'take care of', 'depend on', 'belong to', 'agree with'] },
    { label: 'Communication & Thought', verbs: ['talk to', 'think about', 'dream about', 'insist on'] },
    { label: 'Searching & Requesting', verbs: ['look for', 'wait for', 'ask for'] },
    { label: 'Problems & Composition', verbs: ['work on', 'suffer from', 'consist of', 'complain about'] },
  ];

  let sortState = { selected: null, placements: {}, correctMap: {}, total: 0, score: 0, checked: false };

  function initSort() {
    document.querySelector('[data-area="sort"]').classList.add('show');
    ensureSortCheckInNav();
    sortState = { selected: null, placements: {}, correctMap: {}, total: 0, score: 0, checked: false };

    // Pick 4 random themes
    const themes = shuffle([...SORT_THEMES]).slice(0, 4);
    // From each theme, pick 2 chunks that exist in our data
    const verbMap = new Map(categories.prepositional.items.map(item => [`${item.verb} ${item.prep}`, item]));

    const roundData = [];
    themes.forEach(theme => {
      const available = theme.verbs.filter(v => verbMap.has(v));
      const picked = shuffle(available).slice(0, 2);
      picked.forEach(v => roundData.push({ verb: v, category: theme.label, data: verbMap.get(v) }));
    });

    sortState.total = roundData.length;
    sortState.correctMap = {};
    roundData.forEach(r => { sortState.correctMap[r.verb] = r.category; });

    // Render pool
    const poolEl = document.getElementById('sortPool');
    const shuffledVerbs = shuffle(roundData.map(r => r.verb));
    poolEl.innerHTML = shuffledVerbs.map(v =>
      `<button class="sort-word" data-verb="${v}">${v}</button>`
    ).join('');

    // Render categories
    const catsEl = document.getElementById('sortCategories');
    catsEl.innerHTML = themes.map(t =>
      `<div class="sort-cat" data-cat="${t.label}"><div class="sort-cat-label">${t.label}</div><div class="sort-cat-items"></div></div>`
    ).join('');

    // Event: select chunk from pool
    poolEl.querySelectorAll('.sort-word').forEach(btn => {
      btn.addEventListener('click', () => {
        if (sortState.checked) return;
        poolEl.querySelectorAll('.sort-word').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        sortState.selected = btn.dataset.verb;
      });
    });

    // Event: click category to place
    catsEl.querySelectorAll('.sort-cat').forEach(cat => {
      cat.addEventListener('click', () => {
        if (sortState.checked || !sortState.selected) return;
        const verb = sortState.selected;
        const catLabel = cat.dataset.cat;

        // Remove from previous category if already placed
        if (sortState.placements[verb]) {
          const prevCat = catsEl.querySelector(`[data-cat="${sortState.placements[verb]}"] .sort-cat-items`);
          const prevChip = prevCat?.querySelector(`[data-verb="${verb}"]`);
          if (prevChip) prevChip.remove();
        }

        // Place in new category
        sortState.placements[verb] = catLabel;
        const itemsEl = cat.querySelector('.sort-cat-items');
        // Remove existing chip if re-placing
        const existing = itemsEl.querySelector(`[data-verb="${verb}"]`);
        if (existing) existing.remove();

        const chip = document.createElement('button');
        chip.className = 'sort-word';
        chip.dataset.verb = verb;
        chip.textContent = verb;
        chip.addEventListener('click', (e) => {
          e.stopPropagation();
          if (sortState.checked) return;
          // Return to pool
          delete sortState.placements[verb];
          chip.remove();
          const poolBtn = poolEl.querySelector(`[data-verb="${verb}"]`);
          if (poolBtn) poolBtn.classList.remove('placed');
          updateSortProgress();
          toggleSortCheck();
        });
        itemsEl.appendChild(chip);

        // Mark pool chunk as placed
        const poolBtn = poolEl.querySelector(`[data-verb="${verb}"]`);
        if (poolBtn) { poolBtn.classList.remove('selected'); poolBtn.classList.add('placed'); }
        sortState.selected = null;

        updateSortProgress();
        toggleSortCheck();
      });
    });

    const sc = document.getElementById('sortCheck'); if (sc) sc.style.display = 'none';
    updateSortProgress();
  }

  function updateSortProgress() {
    const placed = Object.keys(sortState.placements).length;
    document.getElementById('sortScore').textContent = `${placed} / ${sortState.total}`;
    updProgress(placed, sortState.total);
  }

  function toggleSortCheck() {
    const placed = Object.keys(sortState.placements).length;
    const sc = document.getElementById('sortCheck');
    if (sc) sc.style.display = placed === sortState.total ? '' : 'none';
  }

  function checkSort() {
    sortState.checked = true;
    let correct = 0;

    // Check each placed chunk
    document.querySelectorAll('.sort-cat-items .sort-word').forEach(chip => {
      const verb = chip.dataset.verb;
      const placedIn = sortState.placements[verb];
      const correctCat = sortState.correctMap[verb];
      if (placedIn === correctCat) {
        chip.classList.add('correct');
        correct++;
      } else {
        chip.classList.add('wrong');
      }
    });

    // Also mark pool chunks that weren't placed
    document.querySelectorAll('#sortPool .sort-word.placed').forEach(btn => {
      const verb = btn.dataset.verb;
      const placedIn = sortState.placements[verb];
      const correctCat = sortState.correctMap[verb];
      if (placedIn === correctCat) btn.classList.add('correct');
      else btn.classList.add('wrong');
    });

    sortState.score = correct;

    const pct = finishExercise({ correct, total: sortState.total, startMode, setMode: v => mode = v, suggestion: findStudyFollowUp() });
    recordScore(`${scoreKeyPrefix}-${currentCat}-sort`, pct);
  }

  function ensureSortCheckInNav() {
    let btn = document.getElementById('sortCheck');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'sortCheck';
      btn.type = 'button';
      btn.className = 'lp-btn lp-btn--primary ex-bottom-nav__primary-btn';
      btn.textContent = '✓';
      btn.setAttribute('aria-label', 'Verificar clasificación');
      btn.title = 'Verificar';
      btn.style.display = 'none';
      btn.addEventListener('click', checkSort);
      document.body.appendChild(btn);
    }
    window.__insertInBottomNav?.(btn);
  }

  // ─── Keyboard shortcuts ───
  document.addEventListener('keydown', e => {
    if (mode === 'practice' || mode === 'timed') {
      if (e.key === 'Enter') {
        const nextBtn = document.getElementById('quizNextBtn');
        if (nextBtn && !nextBtn.hidden) { e.preventDefault(); nextBtn.click(); }
      }
      return;
    }
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
      const card = document.getElementById('fcCard');
      if (card.classList.contains('flip')) advanceCard(1);
      else card.classList.add('flip');
    } else if (e.key === 'ArrowRight') { e.preventDefault(); advanceCard(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); advanceCard(-1); }
  });

  // ─── Init ───
  startMode();
}
