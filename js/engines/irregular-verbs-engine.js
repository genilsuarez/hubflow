/* ═══════════════════════════════════════════════════════
   HubFlow — Irregular Verbs Engine
   Study / Quiz / Timed / Match / Sort / Write de verbos irregulares.

   Extraído 2026-08-17 del <script type="module"> inline de
   exercises/irregular-verbs.html. Las claves de progreso emitidas no
   cambian; están declaradas en js/engines/manifest.mjs.
   ═══════════════════════════════════════════════════════ */

import { shuffle } from '../array-utils.js';
import { recordScore, recordStudyItemSeen, getScoreStatus } from '../progress-store.js';
import { Timer, formatTime, wireModeTabs, syncModeTabsActive } from '../exercise-ui.js';
import { finishExercise, createMatchMode, squeezeToggle, showStudyFollowUpOverlay, handleStudyKeydown, handleQuizNextKeydown, createStudyNav } from '../exercise-flow.js';
import { initSwipe } from '../swipe.js';

/**
 * @param {object} cfg
 * @param {object} cfg.verbs     Datos del ejercicio (data/irregular-verbs.js).
 * @param {string} cfg.scoreKeyPrefix Prefijo de las claves de progreso.
 */
export function initIrregularVerbs({ verbs, scoreKeyPrefix }) {
  let currentCat = 'all';
  let mode = 'study';
  let deck = [], cardIdx = 0;
  let quizDeck = [], quizIdx = 0, quizScore = 0, quizTotal = 15;
  let writeDeck = [], writeIdx = 0, writeScore = 0, writeTotal = 10;
  let writeAnswered = false;
  let timer = null;
  let timedSeconds = 0;

  function filteredData() {
    return currentCat === 'all' ? verbs : verbs.filter(v => v.cat === currentCat);
  }

  // Returns the next pending activity. No multi-category navigation here — all cats
  // are part of the same exercise, so we only suggest pending modes within current cat.
  function findStudyFollowUp() {
    const FOLLOW_MODES = [
      { key: `${scoreKeyPrefix}-${currentCat}-timed`, label: '⏱️ Timed', mode: 'timed' },
      { key: `${scoreKeyPrefix}-${currentCat}-match`, label: '🔗 Match', mode: 'match' },
      { key: `${scoreKeyPrefix}-${currentCat}-write`, label: '✍️ Write', mode: 'write' },
    ];
    for (const m of FOLLOW_MODES) {
      if (!getScoreStatus(m.key).passed) {
        return { label: m.label, isNewCategory: false, onContinue: () => { mode = m.mode; syncModeTabsActive(mode); startMode(); } };
      }
    }
    return null;
  }

  // ─── Category ───
  document.querySelectorAll('[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCat = btn.dataset.cat;
      document.querySelectorAll('[data-cat]').forEach(b => b.classList.toggle('active', b.dataset.cat === currentCat));
      startMode();
    });
  });

  // ─── Mode ───
  wireModeTabs({ getMode: () => mode, setMode: v => mode = v, onChange: startMode });

  document.getElementById('quizSkipBtn')?.addEventListener('click', () => skipQuiz());
  function setQuizAnswered(answered) { const nextBtn = document.getElementById('quizNextBtn'); const skipBtn = document.getElementById('quizSkipBtn'); if (nextBtn) nextBtn.hidden = !answered; if (skipBtn) skipBtn.hidden = answered; }
  function skipQuiz() { if (quizIdx >= quizTotal) return; quizIdx++; updProgress(quizIdx, quizTotal); renderQuiz(); }

  function startMode() {
    stopTimer();
    document.querySelectorAll('[data-area]').forEach(a => a.classList.remove('show'));
    document.getElementById('timerBar').classList.remove('show');
    const sortBtn = document.getElementById('sortCheck');
    if (sortBtn && mode !== 'sort') sortBtn.style.display = 'none';
    setQuizAnswered(false);
    if (mode === 'study') initStudy();
    else if (mode === 'quiz') initQuiz(false);
    else if (mode === 'match') initMatch();
    else if (mode === 'write') initWrite();
    else if (mode === 'sort') initSort();
    else if (mode === 'battle') initBattle();
    else if (mode === 'timed') initQuiz(true);
    window.__syncBottomNavMode?.();
  }

  function stopTimer() { if (timer) { timer.stop(); timer = null; } timedSeconds = 0; }

  function updProgress(current, total) {
    const pct = Math.round((current / total) * 100);
    document.getElementById('progFill').style.width = pct + '%';
    document.getElementById('progTxt').textContent = `${current} / ${total}`;
    document.getElementById('progPct').textContent = pct + '%';
  }

  // ═══ STUDY ═══
  function initStudy() {
    deck = shuffle(filteredData());
    cardIdx = 0;
    document.querySelector('[data-area="study"]').classList.add('show');
    renderCard();
  }

  function renderCard() {
    const v = deck[cardIdx];
    recordStudyItemSeen({ storagePrefix: scoreKeyPrefix, category: currentCat, term: v.base, totalItems: filteredData().length });
    const card = document.getElementById('fcCard');
    card.classList.remove('flip');
    document.getElementById('fcBase').textContent = v.base;
    document.getElementById('fcIpa').textContent = v.ipa || '';
    document.getElementById('fcBackBase').textContent = v.base;
    document.getElementById('fcBackPast').textContent = v.past;
    document.getElementById('fcBackPP').textContent = v.pp;
    document.getElementById('fcBackEs').textContent = v.es;
    document.getElementById('fcCounter').textContent = `${cardIdx + 1} / ${deck.length}`;
    updProgress(cardIdx + 1, deck.length);
  }

  document.getElementById('fcCard').addEventListener('click', () => squeezeToggle(document.getElementById('fcCard'), 'flip'));
  document.getElementById('nextBtn').addEventListener('click', () => advanceCard(1));
  document.getElementById('prevBtn').addEventListener('click', () => advanceCard(-1));
  document.getElementById('shuffleBtn').addEventListener('click', () => { deck = shuffle(deck); cardIdx = 0; renderCard(); });
  initSwipe(document.querySelector('[data-area="study"]'), { onNext: () => advanceCard(1), onPrev: () => advanceCard(-1) });

  const { advanceCard, showFollowUp: showStudyFollowUp } = createStudyNav({
    getIdx: () => cardIdx, setIdx: v => cardIdx = v,
    getDeckLength: () => deck.length,
    renderCard: renderCard,
    findFollowUp: findStudyFollowUp,
    onContinue: s => { s.onContinue(); syncModeTabsActive(mode); },
    onRestudy: () => { cardIdx = 0; renderCard(); },
  });

  document.addEventListener('keydown', e => {
    if (mode === 'battle') {
      if (battle.phase === 'claim') {
        if (e.key === '1') { e.preventDefault(); battleClaim(1); }
        else if (e.key === '2') { e.preventDefault(); battleClaim(2); }
        else if (e.key === 's' || e.key === 'S') { e.preventDefault(); battleSkip(); }
      } else if (battle.phase === 'judge') {
        if (e.key === 'y' || e.key === 'Y' || e.key === 'Enter') { e.preventDefault(); battleJudge(true); }
        else if (e.key === 'n' || e.key === 'N') { e.preventDefault(); battleJudge(false); }
      } else if (battle.phase === 'next') {
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') { e.preventDefault(); battleNext(); }
      }
      return;
    }
    if (mode === 'quiz' || mode === 'timed') { handleQuizNextKeydown(e); return; }
    if (mode !== 'study') return;

    handleStudyKeydown(e, { advanceCard });
  });

  // ═══ QUIZ / TIMED ═══
  function initQuiz(timed) {
    quizDeck = shuffle(filteredData());
    quizIdx = 0; quizScore = 0;
    quizTotal = Math.min(timed ? 12 : 15, quizDeck.length);
    document.querySelector('[data-area="quiz"]').classList.add('show');

    if (timed) {
      document.getElementById('timerBar').classList.add('show');
      timedSeconds = quizTotal * 6;

      timer = new Timer(timedSeconds,
        r => { const el = document.getElementById('timerDisplay'); el.textContent = formatTime(r); el.classList.toggle('warn', r <= 10); },
        () => finishQuiz()
      );
      timer.start();
    }
    renderQuiz();
  }

  function renderQuiz() {
    if (quizIdx >= quizTotal) { finishQuiz(); return; }
    const verb = quizDeck[quizIdx];
    // Randomly ask for past or pp
    const askPast = Math.random() < 0.5;
    const question = askPast ? 'Past Simple' : 'Past Participle';
    const correct = askPast ? verb.past : verb.pp;

    document.getElementById('quizBase').textContent = verb.base;
    document.getElementById('quizLabel').textContent = `What is the ${question}?`;
    setQuizAnswered(false);

    // Build distractors from same category preferring
    const pool = filteredData().filter(v => v !== verb);
    const distractors = shuffle(pool).slice(0, 3).map(v => askPast ? v.past : v.pp);
    const options = shuffle([correct, ...distractors]);

    const optsEl = document.getElementById('quizOptions');
    optsEl.innerHTML = options.map(o => `<button class="quiz-opt">${o}</button>`).join('');
    optsEl.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        optsEl.querySelectorAll('.quiz-opt').forEach(b => { b.classList.add('disabled'); b.style.pointerEvents = 'none'; });
        if (btn.textContent === correct) { btn.classList.add('correct'); quizScore++; }
        else { btn.classList.add('wrong'); optsEl.querySelectorAll('.quiz-opt').forEach(b => { if (b.textContent === correct) b.classList.add('correct'); }); }
        quizIdx++;
        updProgress(quizIdx, quizTotal);

        const nextBtn = document.getElementById('quizNextBtn');
        if (nextBtn) {
          nextBtn.textContent = quizIdx >= quizTotal ? 'Ver resultado →' : 'Siguiente →';
          setQuizAnswered(true);
          nextBtn.onclick = () => renderQuiz();
          nextBtn.focus({ preventScroll: true });
        } else {
          setTimeout(renderQuiz, 700);
        }
      });
    });
    updProgress(quizIdx, quizTotal);
  }

  function finishQuiz() {
    const elapsed = timedSeconds ? timedSeconds - (timer && timer.remaining != null ? timer.remaining : 0) : null;
    stopTimer();
    const pct = finishExercise({
      correct: quizScore, total: quizTotal, startMode, setMode: v => mode = v,
      elapsedSeconds: elapsed,
      suggestion: findStudyFollowUp(),
    });
    const _irrMode = mode === 'timed' ? 'timed' : 'quiz'; recordScore(`${scoreKeyPrefix}-${currentCat}-${_irrMode}`, pct);
  }

  // ═══ MATCH (base ↔ past → pp) ═══
  const matchMode = createMatchMode({
    getData: filteredData, pairCount: 6, matchScoreKey: scoreKeyPrefix,
    getCurrentCat: () => currentCat, startMode, setMode: v => mode = v, updProgress,
    leftLabel: 'Base form', rightLabel: 'Past → P. Part.',
    matchKey: item => item.base, renderLeft: item => item.base,
    renderRight: item => `${item.past} → ${item.pp}`,
  });
  function initMatch() { matchMode.init(); }

  // ═══ SORT ═══
  const SORT_THEMES = [
    { label: 'Movement & Travel', verbs: ['go', 'come', 'run', 'fly', 'fall', 'drive', 'leap', 'flee', 'creep', 'arise'] },
    { label: 'Perception & Thought', verbs: ['see', 'hear', 'feel', 'think', 'know', 'learn', 'forget', 'seek'] },
    { label: 'Communication & Rules', verbs: ['say', 'tell', 'forbid', 'choose', 'lead'] },
    { label: 'Possession & Exchange', verbs: ['have', 'get', 'take', 'give', 'find', 'keep', 'hold', 'lend', 'bear', 'bind'] },
    { label: 'Making & Breaking', verbs: ['make', 'build', 'break', 'cut', 'draw', 'grind', 'dig', 'cast', 'breed', 'blow'] },
    { label: 'Everyday Actions', verbs: ['put', 'catch', 'hide', 'shake', 'cling', 'dwell', 'overcome', 'shrink', 'eat', 'do'] },
  ];

  let sortState = { selected: null, placements: {}, correctMap: {}, total: 0, score: 0, checked: false };

  function initSort() {
    document.querySelector('[data-area="sort"]').classList.add('show');
    ensureSortCheckInNav();
    sortState = { selected: null, placements: {}, correctMap: {}, total: 0, score: 0, checked: false };

    // Pick 4 random themes
    const themes = shuffle([...SORT_THEMES]).slice(0, 4);
    // From each theme, pick 2 verbs that exist in our data
    const verbMap = new Map(verbs.map(v => [v.base, v]));

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
      `<div class="sort-cat" data-sortcat="${t.label}"><div class="sort-cat-label">${t.label}</div><div class="sort-cat-items"></div></div>`
    ).join('');

    // Event: select verb from pool
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
        const catLabel = cat.dataset.sortcat;

        // Remove from previous category if already placed
        if (sortState.placements[verb]) {
          const prevCat = catsEl.querySelector(`[data-sortcat="${sortState.placements[verb]}"] .sort-cat-items`);
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

        // Mark pool verb as placed
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

    // Check each placed verb
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

    // Also mark pool verbs that weren't placed
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

  // ═══ WRITE ═══
  function initWrite() {
    writeDeck = shuffle(filteredData());
    writeIdx = 0; writeScore = 0;
    writeTotal = Math.min(10, writeDeck.length);
    document.querySelector('[data-area="write"]').classList.add('show');
    window.__setupPracticeBottomNav?.();
    renderWrite();
  }

  function renderWrite() {
    if (writeIdx >= writeTotal) { finishWrite(); return; }
    writeAnswered = false;
    const checkBtn = document.getElementById('checkBtn');
    if (checkBtn) checkBtn.textContent = 'Check ✓';
    const verb = writeDeck[writeIdx];
    document.getElementById('writeBase').textContent = verb.base;
    document.getElementById('writePast').value = '';
    document.getElementById('writePP').value = '';
    document.getElementById('writePast').className = '';
    document.getElementById('writePP').className = '';
    document.getElementById('writeFeedback').textContent = '';
    document.getElementById('writeFeedback').className = 'write-feedback';
    document.getElementById('writePast').focus();
    updProgress(writeIdx, writeTotal);
  }

  function normalize(s) { return s.trim().toLowerCase().replace(/\s+/g, ' '); }

  function checkAnswer(input, correct) {
    const norm = normalize(input);
    // Handle slash-separated acceptable answers (e.g. "was/were", "got/gotten")
    const acceptables = correct.split('/').map(s => s.trim().toLowerCase());
    return acceptables.includes(norm) || norm === normalize(correct);
  }

  document.getElementById('checkBtn').addEventListener('click', doWriteCheck);
  document.getElementById('skipBtn').addEventListener('click', () => { writeIdx++; renderWrite(); });

  // Submit on Enter in last field
  document.getElementById('writePP').addEventListener('keydown', e => { if (e.key === 'Enter') doWriteCheck(); });
  document.getElementById('writePast').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('writePP').focus(); });

  function doWriteCheck() {
    // Segundo clic (el botón ya dice "Siguiente"): avanza en vez de re-corregir.
    if (writeAnswered) { writeAnswered = false; renderWrite(); return; }
    writeAnswered = true;
    const verb = writeDeck[writeIdx];
    const pastInput = document.getElementById('writePast');
    const ppInput = document.getElementById('writePP');
    const fb = document.getElementById('writeFeedback');

    const pastOk = checkAnswer(pastInput.value, verb.past);
    const ppOk = checkAnswer(ppInput.value, verb.pp);

    pastInput.classList.add(pastOk ? 'correct' : 'wrong');
    ppInput.classList.add(ppOk ? 'correct' : 'wrong');

    if (pastOk && ppOk) {
      writeScore++;
      fb.textContent = '✓ Correct!';
      fb.className = 'write-feedback ok';
    } else {
      fb.textContent = `✗ ${verb.base} → ${verb.past} → ${verb.pp}`;
      fb.className = 'write-feedback err';
    }

    writeIdx++;
    updProgress(writeIdx, writeTotal);

    // Mismo criterio que el resto de la app: la corrección se queda a la vista
    // hasta que el usuario decide seguir, en vez de desaparecer a los 1,2 s.
    const checkBtn = document.getElementById('checkBtn');
    if (checkBtn) {
      checkBtn.textContent = writeIdx >= writeTotal ? 'Ver resultado →' : 'Siguiente →';
      checkBtn.focus({ preventScroll: true });
    } else {
      writeAnswered = false;
      setTimeout(renderWrite, 1200);
    }
  }

  function finishWrite() {
    const pct = finishExercise({ correct: writeScore, total: writeTotal, startMode, setMode: v => mode = v, suggestion: findStudyFollowUp() });
    recordScore(`${scoreKeyPrefix}-${currentCat}-write`, pct);
  }

  // ═══ BATTLE ═══
  let battle = { p1: 0, p2: 0, round: 0, total: 10, claimer: null, deck: [], phase: 'claim' };

  function initBattle() {
    const items = shuffle(filteredData());
    battle = { p1: 0, p2: 0, round: 0, total: Math.min(10, items.length), claimer: null, deck: items, phase: 'claim' };
    document.querySelector('[data-area="battle"]').classList.add('show');
    updateBattleScores();
    showBattleCard();
  }

  function showBattleCard() {
    if (battle.round >= battle.total) { showBattleResult(); return; }
    const verb = battle.deck[battle.round];

    const card = document.getElementById('battleCard');
    card.classList.remove('flipped');
    document.getElementById('battleBase').textContent = verb.base;
    document.getElementById('bBackBase').textContent = verb.base;
    document.getElementById('bBackPast').textContent = verb.past;
    document.getElementById('bBackPP').textContent = verb.pp;

    updProgress(battle.round + 1, battle.total);
    setBattlePhase('claim');
  }

  function setBattlePhase(phase) {
    battle.phase = phase;
    // Canónico: ex-bottom-nav.js muestra el grupo de la fase y oculta los otros
    window.__syncBattleActionVisibility?.(phase);

    const instructions = { claim: 'Press 1 or 2 to claim · S to skip', judge: `Player ${battle.claimer} says past & participle — correct?`, next: 'Press Space or → to continue' };
    document.getElementById('battleInstruction').textContent = instructions[phase] || '';
  }

  function battleClaim(player) {
    battle.claimer = player;
    document.getElementById('battleCard').classList.add('flipped');
    setBattlePhase('judge');
  }

  function battleSkip() { battle.round++; showBattleCard(); }

  function battleJudge(correct) {
    if (correct) battle[`p${battle.claimer}`]++;
    else battle[`p${battle.claimer === 1 ? 2 : 1}`]++;
    updateBattleScores();
    setBattlePhase('next');
  }

  function battleNext() { battle.round++; showBattleCard(); }

  function updateBattleScores() {
    document.getElementById('bp1').textContent = battle.p1;
    document.getElementById('bp2').textContent = battle.p2;
  }

  function showBattleResult() {
    const winner = battle.p1 > battle.p2 ? 'Player 1 wins! 🎉' : battle.p2 > battle.p1 ? 'Player 2 wins! 🎉' : "It's a tie! 🤝";
    const overlay = document.getElementById('resultOverlay');
    overlay.innerHTML = `<div class="result-box">
      <div class="result-title">${winner}</div>
      <div class="result-sub" style="font-size:1.2rem;margin:8px 0;">🔵 ${battle.p1} — ${battle.p2} 🔴</div>
      <div class="result-sub">${battle.total} rounds</div>
      <div class="result-btns"><button class="lp-btn lp-btn--primary" id="rr">🔄 Rematch</button><button class="lp-btn lp-btn--ghost" id="rs">📖 Study</button></div>
    </div>`;
    overlay.classList.add('show');
    overlay.querySelector('#rr').addEventListener('click', () => { overlay.classList.remove('show'); initBattle(); });
    overlay.querySelector('#rs').addEventListener('click', () => { overlay.classList.remove('show'); mode='study'; syncModeTabsActive('study'); startMode(); });
  }

  // Battle button handlers
  document.getElementById('bClaim1').addEventListener('click', () => battleClaim(1));
  document.getElementById('bClaim2').addEventListener('click', () => battleClaim(2));
  document.getElementById('bSkip').addEventListener('click', () => battleSkip());
  document.getElementById('bCorrect').addEventListener('click', () => battleJudge(true));
  document.getElementById('bWrong').addEventListener('click', () => battleJudge(false));
  document.getElementById('bNext').addEventListener('click', () => battleNext());

  // ─── Init ───
  startMode();
}
