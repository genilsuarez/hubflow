/* ═══════════════════════════════════════════════════════
   HubFlow — Phrasal Verbs Engine
   Study / Quiz / Timed / Match / Write / Sort de phrasal verbs, con TTS y autospeak.

   Extraído 2026-08-17 del <script type="module"> inline de
   exercises/phrasal-verbs.html. Las claves de progreso emitidas no
   cambian; están declaradas en js/engines/manifest.mjs.
   ═══════════════════════════════════════════════════════ */

import { shuffle } from '../array-utils.js';
import { recordScore, recordStudyItemSeen } from '../progress-store.js';
import { Timer, formatTime, renderCatBar as sharedRenderCatBar, updateProgress, wireModeTabs, syncModeTabsActive } from '../exercise-ui.js';
import { finishExercise, advanceStudyCard, createMatchMode } from '../exercise-flow.js';
import { initSwipe } from '../swipe.js';
import { speak, isSpeechAvailable, readAutoSpeak, writeAutoSpeak } from '../speech.js';

/**
 * @param {object} cfg
 * @param {object} cfg.categories     Datos del ejercicio (data/phrasal-verbs.js).
 * @param {string} cfg.scoreKeyPrefix Prefijo de las claves de progreso.
 */
export function initPhrasalVerbs({ categories, scoreKeyPrefix }) {
  let currentCat = Object.keys(categories)[0];
  let mode = 'study';
  let deck = [], idx = 0, score = 0, total = 0;
  let timer = null;
  let timedSeconds = 0;
  let autoSpeak = readAutoSpeak();

  // ─── TTS toggle ───
  function syncSpeakBtn() {
    const btn = document.getElementById('speakBtn');
    if (!btn) return;
    btn.setAttribute('aria-pressed', String(autoSpeak));
    btn.classList.toggle('is-on', autoSpeak);
    btn.textContent = autoSpeak ? '🔊' : '🔇';
    const label = autoSpeak ? 'Pronunciación automática: ON' : 'Pronunciación automática: OFF';
    btn.title = label;
    btn.setAttribute('aria-label', label);
  }

  if (isSpeechAvailable()) {
    const speakBtn = document.getElementById('speakBtn');
    if (speakBtn) {
      speakBtn.style.display = '';
      speakBtn.addEventListener('click', () => {
        autoSpeak = !autoSpeak;
        writeAutoSpeak(autoSpeak);
        syncSpeakBtn();
      });
      syncSpeakBtn();
    }
  } else {
    const speakBtn = document.getElementById('speakBtn');
    if (speakBtn) speakBtn.style.display = 'none';
  }

  // ─── Category bar ───
  sharedRenderCatBar({
    containerId: 'catBar', categories: categories,
    getCurrentCat: () => currentCat, setCurrentCat: v => currentCat = v,
    onChange: startMode,
  });

  // ─── Mode switching ───
  wireModeTabs({ getMode: () => mode, setMode: v => mode = v, onChange: startMode });

  document.getElementById('quizSkipBtn')?.addEventListener('click', () => skipQuiz());
  function setQuizAnswered(answered) { const nextBtn = document.getElementById('quizNextBtn'); const skipBtn = document.getElementById('quizSkipBtn'); if (nextBtn) nextBtn.hidden = !answered; if (skipBtn) skipBtn.hidden = answered; }
  function skipQuiz() { if (idx >= total) return; idx++; updProgress(idx, total); renderQuiz(); }

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
    syncSpeakBtn();
  }

  function stopTimer() { if (timer) { timer.stop(); timer = null; } timedSeconds = 0; }
  function getData() { return categories[currentCat].items; }

  const updProgress = (current, t) => updateProgress(current, t,
    document.getElementById('progFill'), document.getElementById('progTxt'), document.getElementById('progPct'));

  // ═══ STUDY ═══
  function initStudy() {
    deck = shuffle(getData());
    idx = 0;
    document.querySelector('[data-area="study"]').classList.add('show');
    renderStudyCard();
  }

  function renderStudyCard() {
    const item = deck[idx];
    recordStudyItemSeen({ storagePrefix: scoreKeyPrefix, category: currentCat, term: item.verb, totalItems: getData().length });
    const card = document.getElementById('fcCard');
    card.classList.remove('flip');
    document.getElementById('fcEmoji').textContent = categories[currentCat].icon;
    document.getElementById('fcVerb').textContent = item.verb;
    document.getElementById('fcIpa').textContent = item.ipa || '';
    document.getElementById('fcEs').textContent = item.es;
    document.getElementById('fcMeaning').textContent = `${item.verb} = ${item.es}`;
    document.getElementById('fcExample').textContent = item.example;
    document.getElementById('fcCounter').textContent = `${idx + 1} / ${deck.length}`;
    updProgress(idx + 1, deck.length);
    if (autoSpeak) speak(item.verb);
  }

  document.getElementById('fcCard').addEventListener('click', () => document.getElementById('fcCard').classList.toggle('flip'));
  document.getElementById('nextBtn').addEventListener('click', () => advanceCard(1));
  document.getElementById('prevBtn').addEventListener('click', () => advanceCard(-1));
  document.getElementById('shuffleBtn').addEventListener('click', () => { deck = shuffle(deck); idx = 0; renderStudyCard(); });
  initSwipe(document.querySelector('[data-area="study"]'), { onNext: () => advanceCard(1), onPrev: () => advanceCard(-1) });

  function advanceCard(dir) {
    advanceStudyCard(dir, { getIdx: () => idx, setIdx: v => idx = v, deckLength: deck.length, renderCard: renderStudyCard });
  }

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
    if (mode !== 'study') return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const card = document.getElementById('fcCard');
      if (card.classList.contains('flip')) advanceCard(1);
      else card.classList.add('flip');
    } else if (e.key === 'ArrowRight') { e.preventDefault(); advanceCard(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); advanceCard(-1); }
  });

  // ═══ QUIZ (match particle) / TIMED ═══
  function initQuiz(timed) {
    deck = shuffle(getData());
    idx = 0; score = 0;
    total = Math.min(timed ? 12 : 15, deck.length);
    document.querySelector('[data-area="quiz"]').classList.add('show');

    if (timed) {
      document.getElementById('timerBar').classList.add('show');
      timedSeconds = total * 6;
      timer = new Timer(timedSeconds,
        r => { const el = document.getElementById('timerDisplay'); el.textContent = formatTime(r); el.classList.toggle('warn', r <= 10); },
        () => finishQuiz()
      );
      timer.start();
    } else {
      timedSeconds = 0;
    }
    renderQuiz();
  }

  function renderQuiz() {
    if (idx >= total) { finishQuiz(); return; }
    const item = deck[idx];

    document.getElementById('quizVerb').innerHTML = `${item.base} <span class="q-blank">___</span>`;
    document.getElementById('quizMeaning').textContent = item.es;
    setQuizAnswered(false);

    // Get unique particles from current category for distractors
    const allParticles = [...new Set(getData().map(i => i.particle))];
    const distractors = shuffle(allParticles.filter(p => p !== item.particle)).slice(0, 3);
    const options = shuffle([item.particle, ...distractors]);

    const optsEl = document.getElementById('quizOptions');
    optsEl.innerHTML = options.map(o => `<button class="quiz-opt" data-val="${o}">${o}</button>`).join('');
    optsEl.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        optsEl.querySelectorAll('.quiz-opt').forEach(b => { b.classList.add('disabled'); b.style.pointerEvents = 'none'; });
        if (btn.dataset.val === item.particle) { btn.classList.add('correct'); score++; }
        else {
          btn.classList.add('wrong');
          optsEl.querySelectorAll('.quiz-opt').forEach(b => { if (b.dataset.val === item.particle) b.classList.add('correct'); });
        }
        document.getElementById('quizVerb').innerHTML = `${item.base} <span style="color:var(--lp-success);font-weight:700">${item.particle}</span>`;
        idx++;
        updProgress(idx, total);

        const nextBtn = document.getElementById('quizNextBtn');
        if (nextBtn) {
          nextBtn.textContent = idx >= total ? 'Ver resultado →' : 'Siguiente →';
          setQuizAnswered(true);
          nextBtn.onclick = () => renderQuiz();
          nextBtn.focus({ preventScroll: true });
        } else {
          setTimeout(renderQuiz, 800);
        }
      });
    });
    updProgress(idx, total);
  }

  function finishQuiz() {
    const elapsed = timedSeconds ? timedSeconds - (timer?.remaining ?? 0) : null;
    stopTimer();
    const pct = finishExercise({
      correct: score, total, startMode, setMode: v => mode = v,
      elapsedSeconds: elapsed,
    });
    const _phMode = mode === 'timed' ? 'timed' : 'quiz'; recordScore(`${scoreKeyPrefix}-${currentCat}-${_phMode}`, pct);
  }

  // ═══ WRITE ═══
  let writeDeck = [], writeIdx = 0, writeScore = 0, writeTotal = 10, writeAnswered = false;

  function initWrite() {
    writeDeck = shuffle(getData());
    writeIdx = 0; writeScore = 0;
    writeTotal = Math.min(10, writeDeck.length);
    document.querySelector('[data-area="write"]').classList.add('show');
    window.__setupPracticeBottomNav?.();
    renderWrite();
  }

  function renderWrite() {
    if (writeIdx >= writeTotal) { finishWrite(); return; }
    const checkBtn = document.getElementById('checkBtn');
    if (checkBtn) checkBtn.textContent = 'Comprobar ✓';
    const item = writeDeck[writeIdx];

    document.getElementById('writeMeaning').textContent = item.es;
    writeAnswered = false;
    const fb = document.getElementById('writeFeedback');
    fb.textContent = '';
    fb.className = 'write-feedback';

    // Blanks in `gap` don't always match verb.split(' ').length: some entries
    // already show the conjugated verb in the sentence ("She hung ___ before…")
    // and only blank the particle. Deriving inputs from the actual blanks (and
    // aligning them to the trailing words of `verb`, since phrasal verbs are
    // always "base + particle(s)" in order) keeps the check in sync with what's
    // really being asked instead of always assuming 2 disconnected inputs.
    const segments = item.gap.split('___');
    const blankCount = segments.length - 1;
    const expectedWords = item.verb.split(' ').slice(-blankCount);

    const sentenceEl = document.getElementById('writeSentence');
    sentenceEl.innerHTML = '';
    segments.forEach((seg, i) => {
      sentenceEl.appendChild(document.createTextNode(seg));
      if (i >= blankCount) return;
      const inp = document.createElement('input');
      inp.type = 'text';
      inp.className = 'w-input';
      inp.dataset.idx = i;
      inp.autocomplete = 'off';
      inp.autocapitalize = 'off';
      inp.spellcheck = false;
      inp.setAttribute('aria-label', `palabra ${i + 1} de ${blankCount}`);
      inp.style.width = `${Math.max(3, expectedWords[i].length + 1.5)}ch`;
      sentenceEl.appendChild(inp);
    });

    const inputs = sentenceEl.querySelectorAll('.w-input');
    inputs[0]?.focus();
    // Tab through inputs, submit on Enter in last
    inputs.forEach((inp, i) => {
      inp.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          if (i < inputs.length - 1) inputs[i + 1].focus();
          else doWriteCheck();
        }
      });
    });

    updProgress(writeIdx, writeTotal);
  }

  function doWriteCheck() {
    // Segundo clic (el botón ya dice "Siguiente"): avanza en vez de re-corregir.
    if (writeAnswered) { writeAnswered = false; renderWrite(); return; }
    writeAnswered = true;
    const item = writeDeck[writeIdx];
    const inputs = document.querySelectorAll('#writeSentence .w-input');
    const expectedWords = item.verb.split(' ').slice(-inputs.length);
    let allCorrect = true;

    inputs.forEach((inp, i) => {
      const val = inp.value.trim().toLowerCase();
      const expected = expectedWords[i].toLowerCase();
      if (val === expected) { inp.classList.add('correct'); }
      else { inp.classList.add('wrong'); allCorrect = false; }
      inp.disabled = true;
    });

    const fb = document.getElementById('writeFeedback');
    if (allCorrect) {
      writeScore++;
      fb.textContent = '✓ Correct!';
      fb.className = 'write-feedback ok';
    } else {
      fb.textContent = `✗ ${item.verb}`;
      fb.className = 'write-feedback err';
    }

    writeIdx++;
    updProgress(writeIdx, writeTotal);
    // Mismo criterio que el resto de la app: la corrección se queda a la vista
    // hasta que el usuario decide seguir.
    const checkBtn = document.getElementById('checkBtn');
    if (checkBtn) {
      checkBtn.textContent = writeIdx >= writeTotal ? 'Ver resultado →' : 'Siguiente →';
      checkBtn.focus({ preventScroll: true });
    } else {
      writeAnswered = false;
      setTimeout(renderWrite, 1200);
    }
  }

  document.getElementById('checkBtn').addEventListener('click', doWriteCheck);
  document.getElementById('skipBtn').addEventListener('click', () => { writeIdx++; renderWrite(); });

  function finishWrite() {
    const pct = finishExercise({ correct: writeScore, total: writeTotal, startMode, setMode: v => mode = v });
    recordScore(`${scoreKeyPrefix}-${currentCat}-write`, pct);
  }

  // ═══ MATCH (verb ↔ translation) ═══
  const matchMode = createMatchMode({
    getData, pairCount: 6, matchScoreKey: scoreKeyPrefix,
    getCurrentCat: () => currentCat, startMode, setMode: v => mode = v, updProgress,
    leftLabel: '🇬🇧 Phrasal Verb', rightLabel: '🇪🇸 Significado',
    matchKey: item => item.verb, renderLeft: item => item.verb, renderRight: item => item.es,
  });
  function initMatch() { matchMode.init(); }

  // ═══ SORT (classify by meaning) ═══
  const SORT_THEMES = [
    { label: 'Starting / Continuing', verbs: ['carry on', 'keep up with', 'set up', 'set off', 'get on', 'take on'] },
    { label: 'Stopping / Ending', verbs: ['give up', 'break up', 'call off', 'put off', 'turn down', 'hold off'] },
    { label: 'Discovering / Understanding', verbs: ['find out', 'figure out', 'work out', 'look into', 'go over', 'point out'] },
    { label: 'Movement / Travel', verbs: ['set off', 'take off', 'get on', 'get off', 'drop off', 'pick up', 'slow down', 'speed up', 'check in', 'head off', 'pull over'] },
    { label: 'Socializing / Relationships', verbs: ['hang out', 'get along', 'ask out', 'make up', 'fall out', 'show off', 'look up to', 'cheer up'] },
    { label: 'Communication', verbs: ['bring up', 'point out', 'come up with', 'get across', 'hang up', 'turn to'] },
    { label: 'Household / Daily', verbs: ['clean up', 'turn on', 'turn off', 'throw away', 'pick up', 'put on', 'take off', 'wake up', 'sit down', 'stand up'] },
    { label: 'Food / Eating', verbs: ['eat out', 'warm up', 'wolf down', 'fill up', 'whip up', 'polish off', 'dish up', 'live on', 'cut down on'] },
    { label: 'Emotions / Attitude', verbs: ['cheer up', 'let down', 'show off', 'give up', 'put up with', 'turn against', 'hold back'] },
    { label: 'Work / Tasks', verbs: ['carry out', 'set up', 'take on', 'hand in', 'write down', 'figure out', 'work out', 'call off'] },
  ];

  let sortState = { selected: null, placements: {}, correctMap: {}, total: 0, score: 0, checked: false };

  function initSort() {
    document.querySelector('[data-area="sort"]').classList.add('show');
    ensureSortCheckInNav();
    sortState = { selected: null, placements: {}, correctMap: {}, total: 0, score: 0, checked: false };

    // Pick 4 random themes
    const themes = shuffle([...SORT_THEMES]).slice(0, 4);
    // From each theme, pick 2 verbs that exist in our data
    const allVerbs = Object.values(categories).flatMap(c => c.items);
    const verbMap = new Map(allVerbs.map(v => [v.verb, v]));

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

    // Event: select word from pool
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

        // Mark pool word as placed
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

    // Check each placed word
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

    // Also mark pool words that weren't placed
    document.querySelectorAll('#sortPool .sort-word.placed').forEach(btn => {
      const verb = btn.dataset.verb;
      const placedIn = sortState.placements[verb];
      const correctCat = sortState.correctMap[verb];
      if (placedIn === correctCat) btn.classList.add('correct');
      else btn.classList.add('wrong');
    });

    sortState.score = correct;

    const pct = finishExercise({ correct, total: sortState.total, startMode, setMode: v => mode = v });
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

  // ═══ BATTLE ═══
  let battle = { p1: 0, p2: 0, round: 0, total: 10, claimer: null, deck: [], phase: 'claim' };

  function initBattle() {
    const items = shuffle(getData());
    battle = { p1: 0, p2: 0, round: 0, total: Math.min(10, items.length), claimer: null, deck: items, phase: 'claim' };
    document.querySelector('[data-area="battle"]').classList.add('show');
    updateBattleScores();
    showBattleCard();
  }

  function showBattleCard() {
    if (battle.round >= battle.total) { showBattleResult(); return; }
    const item = battle.deck[battle.round];

    const card = document.getElementById('battleCard');
    card.classList.remove('flipped');
    document.getElementById('battleEmoji').textContent = categories[currentCat].icon;
    document.getElementById('battleTerm').textContent = item.verb;
    document.getElementById('battleMeaning').textContent = item.es;
    document.getElementById('battleExample').textContent = item.example;

    updProgress(battle.round + 1, battle.total);
    setBattlePhase('claim');
  }

  function setBattlePhase(phase) {
    battle.phase = phase;
    // Canónico: ex-bottom-nav.js muestra el grupo de la fase y oculta los otros
    window.__syncBattleActionVisibility?.(phase);

    const instructions = { claim: 'Press 1 or 2 to claim · S to skip', judge: `Player ${battle.claimer} answers — was it correct?`, next: 'Press Space or → to continue' };
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
    // Show correct answer after judging
    const item = battle.deck[battle.round];
    const answerText = correct
      ? `✓ Correct! — ${item.es}`
      : `✗ Wrong — Answer: ${item.es}`;
    document.getElementById('battleInstruction').textContent = answerText;
    setBattlePhase('next');
    // Override instruction set by setBattlePhase
    document.getElementById('battleInstruction').textContent = answerText;
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
