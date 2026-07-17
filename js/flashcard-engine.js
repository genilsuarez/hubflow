/**
 * HubFlow — Flashcard/Vocabulary Engine
 * Shared logic for vocabulary exercises: Study, Quiz, Match, Battle, Timed.
 */
import { shuffle, initTheme, toggleTheme, recordScore, getStars, Timer, formatTime, speak, isSpeechAvailable } from './utils.js';
import { initSwipe } from './swipe.js';

export class FlashcardEngine {
  constructor(config) {
    // config: { categories, storagePrefix, defaultCategory, el (root element) }
    this.config = config;
    this.categories = config.categories;
    this.currentCat = config.defaultCategory || Object.keys(config.categories)[0];
    this._lastCatClick = { key: null, time: 0 };
    this.currentMode = 'study';
    this.deck = [];
    this.cardIdx = 0;

    // Quiz state
    this.quizIdx = 0;
    this.quizScore = 0;
    this.quizTotal = 10;

    // Match state
    this.pairState = { left: null, right: null, matched: 0, total: 0, errors: 0, pairs: [] };

    // Battle state
    this.battle = { p1: 0, p2: 0, round: 0, total: 10, claimer: null, deck: [], phase: 'claim' };

    // Timer
    this.timer = null;

    this.init();
  }

  init() {
    initTheme();
    this.bindGlobal();
    this.renderCatBar();
    this.setMode('study');
  }

  bindGlobal() {
    document.getElementById('themeToggle')?.addEventListener('click', () => toggleTheme());

    // TTS speak button
    const speakBtn = document.getElementById('speakBtn');
    if (speakBtn && isSpeechAvailable()) {
      speakBtn.style.display = '';
      speakBtn.addEventListener('click', () => {
        if (this._currentTerm) speak(this._currentTerm);
      });
    } else if (speakBtn) {
      speakBtn.style.display = 'none';
    }

    document.querySelectorAll('[data-mode]').forEach(btn => {
      btn.addEventListener('click', () => this.setMode(btn.dataset.mode));
    });

    // Flashcard flip on click/tap
    document.getElementById('fcCard')?.addEventListener('click', () => this.flipCard());

    // Keyboard shortcuts
    document.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        switch (this.currentMode) {
          case 'study': {
            const flipped = document.getElementById('fcCard')?.classList.contains('flip');
            if (flipped) this.navCard(1);
            else this.flipCard();
            break;
          }
          case 'battle': {
            const phase = this.battle.phase;
            const cardFlipped = document.getElementById('battleCard')?.classList.contains('flipped');

            if (phase === 'next') {
              this.battleNext();
            } else if (phase === 'judge') {
              this.battleJudge(true);
            } else if (cardFlipped) {
              this.battleNext(); // peeked → skip & advance
            } else {
              document.getElementById('battleCard')?.classList.add('flipped');
            }
            break;
          }
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (this.currentMode === 'study') this.navCard(1);
        else if (this.currentMode === 'battle' && this.battle.phase === 'next') this.battleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (this.currentMode === 'study') this.navCard(-1);
      } else if (this.currentMode === 'battle' && this.battle.phase === 'claim') {
        if (e.key === '1') { e.preventDefault(); this.battleClaim(1); }
        else if (e.key === '2') { e.preventDefault(); this.battleClaim(2); }
        else if (e.key === 's' || e.key === 'S') { e.preventDefault(); this.battleSkip(); }
      } else if (this.currentMode === 'battle' && this.battle.phase === 'judge') {
        if (e.key === 'y' || e.key === 'Y') { e.preventDefault(); this.battleJudge(true); }
        else if (e.key === 'n' || e.key === 'N') { e.preventDefault(); this.battleJudge(false); }
      }
    });
  }

  // ═══ CATEGORY BAR ═══
  renderCatBar() {
    const bar = document.getElementById('catBar');
    if (!bar) return;
    // Preserve the expand button (last child)
    const expandBtn = bar.querySelector('.cat-expand-btn');
    const pills = Object.entries(this.categories).map(([key, cat]) =>
      `<button class="pill-btn ${key === this.currentCat ? 'active purple' : ''}" data-cat="${key}">${cat.label}</button>`
    ).join('');
    // Remove old pills, keep expand btn
    bar.querySelectorAll('.pill-btn').forEach(el => el.remove());
    if (expandBtn) expandBtn.insertAdjacentHTML('beforebegin', pills);
    else bar.innerHTML = pills;
    bar.querySelectorAll('[data-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        // Pills are torn down and rebuilt on every click (see above), so the
        // native dblclick event can't be trusted — it requires the *same*
        // element to receive both clicks. Detect a double-click by hand instead.
        const key = btn.dataset.cat;
        const now = Date.now();
        const isDoubleClick = this._lastCatClick.key === key && (now - this._lastCatClick.time) < 400;
        this._lastCatClick = { key, time: now };

        this.currentCat = key;

        // Double-click a category in the expanded panel: select it AND collapse
        // the panel, so picking a category is a single gesture instead of two.
        if (isDoubleClick) {
          const wrapper = document.getElementById('catWrapper');
          if (wrapper?.classList.contains('expanded')) {
            wrapper.classList.remove('expanded');
            document.getElementById('catExpandBtn')?.setAttribute('aria-expanded', 'false');
          }
        }

        this.renderCatBar();
        this.setMode(this.currentMode);
      });
    });
    // Scroll active pill into view
    const active = bar.querySelector('.pill-btn.active');
    if (active) active.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }

  // ═══ MODE MANAGEMENT ═══
  setMode(mode) {
    this.currentMode = mode;
    document.querySelectorAll('[data-mode]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    this.stopTimer();
    this.hideAllAreas();

    switch (mode) {
      case 'study': this.initStudy(); break;
      case 'quiz': this.initQuiz(); break;
      case 'match': this.initMatch(); break;
      case 'battle': this.initBattle(); break;
      case 'timed': this.initTimed(); break;
    }
  }

  hideAllAreas() {
    document.querySelectorAll('[data-area]').forEach(el => el.classList.remove('show'));
    document.getElementById('timerBar')?.classList.remove('show');
  }

  showArea(name) {
    document.querySelector(`[data-area="${name}"]`)?.classList.add('show');
  }

  getItems() {
    return this.categories[this.currentCat]?.items || [];
  }

  // ═══ STUDY (FLASHCARDS) ═══
  initStudy() {
    this.deck = shuffle(this.getItems());
    this.cardIdx = 0;
    this.showArea('study');
    this.initSwipe();
    this.updateStudyProgress();
    this.renderStudyCard();
  }

  initSwipe() {
    if (this._swipeCleanup) this._swipeCleanup();
    const el = document.querySelector('[data-area="study"]');
    if (!el) return;
    this._swipeCleanup = initSwipe(el, {
      onNext: () => this.navCard(1),
      onPrev: () => this.navCard(-1),
    });
  }

  updateStudyProgress() {
    const total = this.deck.length;
    const current = this.cardIdx + 1;
    const pct = total > 0 ? Math.round((current / total) * 100) : 0;
    const fillEl = document.getElementById('progFill');
    const txtEl = document.getElementById('progTxt');
    const pctEl = document.getElementById('progPct');
    if (fillEl) fillEl.style.width = `${pct}%`;
    if (txtEl) txtEl.textContent = `${current} / ${total}`;
    if (pctEl) pctEl.textContent = `${pct}%`;
  }

  renderStudyCard() {
    const item = this.deck[this.cardIdx];
    if (!item) return;

    const card = document.getElementById('fcCard');
    if (card) card.classList.remove('flip');

    // Front
    const emoji = document.getElementById('fcEmoji');
    const word = document.getElementById('fcWord');
    if (emoji) emoji.textContent = item.emoji;
    if (word) word.textContent = item.term;

    // Back
    const backEmoji = document.getElementById('fcBackEmoji');
    const backWord = document.getElementById('fcBackWord');
    const backMeaning = document.getElementById('fcBackMeaning');
    const backExtra = document.getElementById('fcBackExtra');

    if (backEmoji) backEmoji.textContent = item.emoji;
    if (backWord) backWord.textContent = item.term;
    if (backMeaning) backMeaning.textContent = item.meaning || item.description || '';

    let extra = '';
    if (item.es) extra += `🇪🇸 ${item.es}`;
    if (item.time) extra += `${extra ? '\n' : ''}🕐 ${item.time}`;
    if (item.example) extra += `${extra ? '\n' : ''}💬 ${item.example}`;
    if (item.extra) extra += `${extra ? '\n' : ''}📅 ${item.extra}`;
    if (backExtra) backExtra.textContent = extra;

    // Counter
    const counter = document.getElementById('fcCounter');
    if (counter) counter.textContent = `${this.cardIdx + 1} / ${this.deck.length}`;

    // TTS: update current term for speak button
    this._currentTerm = item.term;
  }

  flipCard() {
    document.getElementById('fcCard')?.classList.toggle('flip');
  }

  navCard(delta) {
    const card = document.getElementById('fcCard');
    if (card && card.classList.contains('flip')) {
      const inner = card.querySelector('.fc-inner');
      if (inner) {
        inner.style.transition = 'none';
        card.classList.remove('flip');
        void inner.offsetHeight; // reflow: instant unflip without animation
        inner.style.transition = '';
      }
    }
    this.cardIdx = (this.cardIdx + delta + this.deck.length) % this.deck.length;
    this.renderStudyCard();
    this.updateStudyProgress();
  }

  shuffleDeck() {
    this.deck = shuffle(this.deck);
    this.cardIdx = 0;
    this.renderStudyCard();
    this.updateStudyProgress();
  }

  // ═══ QUIZ ═══
  initQuiz() {
    this.deck = shuffle(this.getItems());
    this.quizIdx = 0;
    this.quizScore = 0;
    this.quizResultRecorded = false;
    this.quizTotal = Math.min(this.deck.length, 10);
    this.showArea('quiz');
    this.updateQuizProgress();
    this.renderQuiz();
  }

  renderQuiz() {
    if (this.quizIdx >= this.quizTotal) {
      this.showQuizResult();
      return;
    }
    const item = this.deck[this.quizIdx];
    const meaning = item.meaning || item.description || '';
    const qType = Math.random() < 0.5 ? 'termFromDesc' : 'descFromTerm';

    const emojiEl = document.getElementById('quizEmoji');
    const labelEl = document.getElementById('quizLabel');
    const textEl = document.getElementById('quizText');
    const optsEl = document.getElementById('quizOptions');

    if (qType === 'termFromDesc') {
      if (emojiEl) emojiEl.textContent = item.emoji;
      if (labelEl) labelEl.textContent = 'What term matches this?';
      if (textEl) textEl.textContent = meaning + (item.time ? ` (${item.time})` : '');
    } else {
      if (emojiEl) emojiEl.textContent = '❓';
      if (labelEl) labelEl.textContent = `What does "${item.term}" mean?`;
      if (textEl) textEl.textContent = `${item.emoji} ${item.term}`;
    }

    // Generate options
    const allItems = this.getItems();
    const others = allItems.filter(x => x.term !== item.term);
    const distractors = shuffle(others).slice(0, 3);
    let options;

    if (qType === 'termFromDesc') {
      options = shuffle([item, ...distractors]).map(o => ({ text: o.term, correct: o.term === item.term }));
    } else {
      options = shuffle([item, ...distractors]).map(o => ({
        text: (o.meaning || o.description || '').slice(0, 55),
        correct: o.term === item.term
      }));
    }

    if (optsEl) {
      optsEl.style.pointerEvents = 'none';
      optsEl.innerHTML = options.map(opt =>
        `<button class="quiz-opt">${opt.text}</button>`
      ).join('');

      optsEl.querySelectorAll('.quiz-opt').forEach((btn, idx) => {
        btn.addEventListener('click', () => this.handleQuizAnswer(btn, options[idx].correct, optsEl));
      });

      // Prevent ghost clicks from previous touch on mobile
      setTimeout(() => { optsEl.style.pointerEvents = ''; }, 50);
    }
  }

  handleQuizAnswer(btn, correct, container) {
    const allBtns = container.querySelectorAll('.quiz-opt');
    allBtns.forEach(b => { b.classList.add('disabled'); b.style.pointerEvents = 'none'; });

    if (correct) {
      btn.classList.add('correct');
      this.quizScore++;
    } else {
      btn.classList.add('wrong');
      // Highlight correct
      const correctItem = this.deck[this.quizIdx];
      const correctText = correctItem.term;
      const correctMeaning = (correctItem.meaning || correctItem.description || '').slice(0, 55);
      allBtns.forEach(b => {
        if (b.textContent === correctText || b.textContent === correctMeaning) b.classList.add('correct');
      });
    }

    this.quizIdx++;
    this.updateQuizProgress();
    setTimeout(() => this.renderQuiz(), 900);
  }

  updateQuizProgress() {
    const fillEl = document.getElementById('progFill');
    const txtEl = document.getElementById('progTxt');
    const pctEl = document.getElementById('progPct');
    if (fillEl) fillEl.style.width = `${Math.round((this.quizIdx / this.quizTotal) * 100)}%`;
    if (txtEl) txtEl.textContent = `${this.quizIdx} / ${this.quizTotal}`;
    if (pctEl) pctEl.textContent = `${Math.round((this.quizIdx / this.quizTotal) * 100)}%`;
  }

  showQuizResult() {
    if (this.quizResultRecorded) return;
    this.quizResultRecorded = true;
    const pct = Math.round((this.quizScore / this.quizTotal) * 100);
    const activity = typeof this.config.getActivityId === 'function'
      ? this.config.getActivityId(this.currentCat)
      : this.config.activityId || 'practice';
    recordScore(`${this.config.storagePrefix}-${this.currentCat}-quiz`, pct, {
      contentId: this.config.contentId,
      activity,
    });
    this.showResultOverlay(this.quizScore, this.quizTotal);
    this.stopTimer();
  }

  // ═══ MATCH (PAIR COLUMNS) ═══
  initMatch() {
    const items = this.getItems();
    const cat = this.categories[this.currentCat];

    // If category has order, use drag-sort mode (not implemented in engine, fallback to pair)
    const selected = shuffle(items).slice(0, 8);
    this.pairState = { left: null, right: null, matched: 0, total: selected.length, errors: 0, pairs: selected };

    this.showArea('match');
    this.renderPairGrid();
  }

  renderPairGrid() {
    const grid = document.getElementById('pairGrid');
    if (!grid) return;

    const isIdiom = this.currentCat === 'idioms';
    const leftLabel = isIdiom ? '💬 Idiom' : '🇬🇧 English';
    const rightLabel = isIdiom ? '📖 Meaning' : '🇪🇸 Español';

    const leftItems = shuffle([...this.pairState.pairs]);
    const rightItems = shuffle([...this.pairState.pairs]);

    grid.innerHTML = `
      <div class="pair-col-label">${leftLabel}</div>
      <div class="pair-col-label">${rightLabel}</div>
      ${leftItems.map((item, i) => {
        const rightItem = rightItems[i];
        return `
          <div class="pair-item pair-left" data-term="${item.term}"><span>${item.emoji}</span> ${item.term}</div>
          <div class="pair-item pair-right" data-term="${rightItem.term}">${isIdiom ? rightItem.meaning : (rightItem.es || rightItem.meaning || '')}</div>
        `;
      }).join('')}
    `;

    grid.querySelectorAll('.pair-left').forEach(el => {
      el.addEventListener('click', () => this.selectPair(el, 'left'));
    });
    grid.querySelectorAll('.pair-right').forEach(el => {
      el.addEventListener('click', () => this.selectPair(el, 'right'));
    });

    this.updatePairScore();
  }

  selectPair(el, side) {
    if (el.classList.contains('matched')) return;

    if (side === 'left') {
      if (this.pairState.left) this.pairState.left.classList.remove('selected');
      this.pairState.left = el;
    } else {
      if (this.pairState.right) this.pairState.right.classList.remove('selected');
      this.pairState.right = el;
    }
    el.classList.add('selected');

    if (this.pairState.left && this.pairState.right) this.checkPair();
  }

  checkPair() {
    const leftTerm = this.pairState.left.dataset.term;
    const rightTerm = this.pairState.right.dataset.term;

    if (leftTerm === rightTerm) {
      this.pairState.left.classList.remove('selected');
      this.pairState.right.classList.remove('selected');
      this.pairState.left.classList.add('matched');
      this.pairState.right.classList.add('matched');
      this.pairState.matched++;
      this.updatePairScore();

      if (this.pairState.matched === this.pairState.total) {
        const score = Math.max(0, this.pairState.total - this.pairState.errors);
        setTimeout(() => this.showResultOverlay(score, this.pairState.total), 600);
      }
    } else {
      this.pairState.errors++;
      this.updatePairScore();
      const l = this.pairState.left;
      const r = this.pairState.right;
      l.classList.remove('selected');
      r.classList.remove('selected');
      l.classList.add('wrong-flash');
      r.classList.add('wrong-flash');
      setTimeout(() => { l.classList.remove('wrong-flash'); r.classList.remove('wrong-flash'); }, 400);
    }

    this.pairState.left = null;
    this.pairState.right = null;
  }

  updatePairScore() {
    const el = document.getElementById('pairScore');
    if (el) el.textContent = `✓ ${this.pairState.matched}/${this.pairState.total}${this.pairState.errors ? '  ✗ ' + this.pairState.errors + ' errors' : ''}`;
  }

  // ═══ BATTLE ═══
  initBattle() {
    const items = shuffle(this.getItems());
    this.battle = { p1: 0, p2: 0, round: 0, total: Math.min(10, items.length), claimer: null, deck: items, phase: 'claim' };
    this.showArea('battle');
    this.updateBattleUI();
    this.showBattleCard();
  }

  showBattleCard() {
    if (this.battle.round >= this.battle.total) {
      this.showBattleResult();
      return;
    }
    const item = this.battle.deck[this.battle.round];
    const card = document.getElementById('battleCard');
    if (card) card.classList.remove('flipped');

    // Update progress bar
    this.updateBattleProgress();

    const emoji = document.getElementById('battleEmoji');
    const hint = document.getElementById('battleHint');
    const backTerm = document.getElementById('battleBackTerm');
    const backSpanish = document.getElementById('battleBackSpanish');

    if (emoji) emoji.textContent = item.emoji;
    if (hint) hint.textContent = item.meaning || item.description || '';
    if (backTerm) backTerm.textContent = item.term;
    if (backSpanish) backSpanish.textContent = item.es ? `🇪🇸 ${item.es}` : '';

    const roundEl = document.getElementById('battleRound');
    if (roundEl) roundEl.textContent = `Round ${this.battle.round + 1} / ${this.battle.total}`;

    const instruction = document.getElementById('battleInstruction');
    if (instruction) instruction.textContent = 'Who knows? Tap your button!';

    this.showBattleActions('claim');
    this.battle.claimer = null;
    this.battle.phase = 'claim';
  }

  battleClaim(player) {
    this.battle.claimer = player;
    this.battle.phase = 'judge';
    document.getElementById('battleCard')?.classList.add('flipped');
    const instruction = document.getElementById('battleInstruction');
    if (instruction) instruction.textContent = `Player ${player} claimed! Correct?`;
    this.showBattleActions('judge');
  }

  battleSkip() {
    this.battle.phase = 'next';
    document.getElementById('battleCard')?.classList.add('flipped');
    const instruction = document.getElementById('battleInstruction');
    if (instruction) instruction.textContent = 'Skipped — no points';
    this.showBattleActions('next');
  }

  battleJudge(correct) {
    if (correct) {
      if (this.battle.claimer === 1) this.battle.p1++;
      else this.battle.p2++;
    } else {
      if (this.battle.claimer === 1) this.battle.p2++;
      else this.battle.p1++;
    }
    this.battle.phase = 'next';
    this.updateBattleUI();
    // Show correct answer
    const item = this.battle.deck[this.battle.round];
    const answer = item ? (item.meaning || item.es || item.description || '') : '';
    const instruction = document.getElementById('battleInstruction');
    if (instruction) {
      instruction.textContent = correct
        ? `✓ Correct! — ${answer}`
        : `✗ Wrong — Answer: ${answer}`;
    }
    this.showBattleActions('next');
  }

  battleNext() {
    this.battle.round++;
    this.showBattleCard();
  }

  showBattleActions(phase) {
    document.getElementById('battleClaim')?.style.setProperty('display', phase === 'claim' ? 'flex' : 'none');
    document.getElementById('battleJudge')?.style.setProperty('display', phase === 'judge' ? 'flex' : 'none');
    document.getElementById('battleNext')?.style.setProperty('display', phase === 'next' ? 'flex' : 'none');
  }

  updateBattleUI() {
    const p1 = document.getElementById('p1Score');
    const p2 = document.getElementById('p2Score');
    if (p1) p1.textContent = this.battle.p1;
    if (p2) p2.textContent = this.battle.p2;
  }

  updateBattleProgress() {
    const current = this.battle.round + 1;
    const total = this.battle.total;
    const pct = total > 0 ? Math.round((current / total) * 100) : 0;
    const fillEl = document.getElementById('progFill');
    const txtEl = document.getElementById('progTxt');
    const pctEl = document.getElementById('progPct');
    if (fillEl) fillEl.style.width = `${pct}%`;
    if (txtEl) txtEl.textContent = `${current} / ${total}`;
    if (pctEl) pctEl.textContent = `${pct}%`;
  }

  showBattleResult() {
    let title, trophy;
    if (this.battle.p1 > this.battle.p2) { trophy = '🏆'; title = 'Player 1 wins!'; }
    else if (this.battle.p2 > this.battle.p1) { trophy = '🏆'; title = 'Player 2 wins!'; }
    else { trophy = '🤝'; title = "It's a tie!"; }

    const overlay = document.getElementById('resultOverlay');
    if (!overlay) return;
    overlay.innerHTML = `
      <div class="result-box">
        <div style="font-size:3rem;margin-bottom:8px;">${trophy}</div>
        <div class="result-title">${title}</div>
        <div class="result-sub">${this.battle.p1} — ${this.battle.p2}</div>
        <div class="result-btns">
          <button class="lp-btn lp-btn--purple" id="resultRestart">🔄 Play Again</button>
          <button class="lp-btn lp-btn--ghost" id="resultClose">Done</button>
        </div>
      </div>
    `;
    overlay.classList.add('show');
    overlay.querySelector('#resultRestart')?.addEventListener('click', () => { overlay.classList.remove('show'); this.initBattle(); });
    overlay.querySelector('#resultClose')?.addEventListener('click', () => { overlay.classList.remove('show'); });
  }

  // ═══ TIMED ═══
  initTimed() {
    this.deck = shuffle(this.getItems());
    this.quizIdx = 0;
    this.quizScore = 0;
    this.quizResultRecorded = false;
    this.quizTotal = Math.min(this.deck.length, 10);
    this.showArea('quiz');
    document.getElementById('timerBar')?.classList.add('show');
    this.updateQuizProgress();

    const seconds = this.quizTotal * 8;
    this.timedTotal = seconds;
    this.timer = new Timer(seconds,
      (remaining) => {
        const display = document.getElementById('timerDisplay');
        if (display) {
          display.textContent = formatTime(remaining);
          display.classList.toggle('warn', remaining <= 10);
        }
      },
      () => this.showQuizResult()
    );
    this.timer.start();
    this.renderQuiz();
  }

  stopTimer() {
    if (this.timer) { this.timer.stop(); this.timer = null; }
    document.getElementById('timerBar')?.classList.remove('show');
  }

  // ═══ RESULT OVERLAY ═══
  showResultOverlay(correct, total) {
    const pct = Math.round((correct / total) * 100);
    const stars = getStars(pct);
    const titles = { 3: 'Perfect! 🎉', 2: 'Well done!', 1: 'Keep practicing!' };

    // Calculate elapsed time for timed mode
    let timeHtml = '';
    if (this.currentMode === 'timed' && this.timedTotal) {
      const remaining = this.timer ? this.timer.remaining : 0;
      const elapsed = this.timedTotal - remaining;
      timeHtml = `<div class="result-time">⏱ ${formatTime(elapsed)}</div>`;
    }

    const overlay = document.getElementById('resultOverlay');
    if (!overlay) return;

    overlay.innerHTML = `
      <div class="result-box">
        <div class="result-stars">
          <span class="result-star ${stars >= 1 ? 'lit' : ''}">⭐</span>
          <span class="result-star ${stars >= 2 ? 'lit' : ''}">⭐</span>
          <span class="result-star ${stars >= 3 ? 'lit' : ''}">⭐</span>
        </div>
        <div class="result-title">${titles[stars]}</div>
        <div class="result-sub">${correct}/${total} correct — ${pct}%</div>
        ${timeHtml}
        <div class="result-btns">
          <button class="lp-btn lp-btn--purple" id="resultRestart">🔄 Try Again</button>
          <button class="lp-btn lp-btn--ghost" id="resultStudy">📖 Study</button>
        </div>
      </div>
    `;
    overlay.classList.add('show');

    overlay.querySelector('#resultRestart')?.addEventListener('click', () => {
      overlay.classList.remove('show');
      this.setMode(this.currentMode);
    });
    overlay.querySelector('#resultStudy')?.addEventListener('click', () => {
      overlay.classList.remove('show');
      this.setMode('study');
    });
  }
}
