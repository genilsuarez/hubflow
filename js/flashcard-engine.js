/**
 * HubFlow — Flashcard/Vocabulary Engine
 * Shared logic for vocabulary exercises: Study, Quiz, Match, Battle, Timed.
 */
import { shuffle } from './array-utils.js';
import { recordScore, getStars, getScoreStatus, renderLessonProgress, recordStudyItemSeen, refreshModuleCompletionMarks } from './progress-store.js';
import { Timer, formatTime } from './exercise-ui.js';
import { speak, isSpeechAvailable } from './speech.js';
import { initSwipe } from './swipe.js';

// Preferencia persistente del toggle de pronunciación automática (on/off).
// Convención `lp-*` como el resto de preferencias de usuario de la plataforma.
const AUTOSPEAK_KEY = 'lp-autospeak';

function readAutoSpeak() {
  if (!isSpeechAvailable()) return false;
  try { return localStorage.getItem(AUTOSPEAK_KEY) === '1'; } catch { return false; }
}

const MODE_META = {
  study: '📖 Study',
  quiz: '⚡ Quiz',
  timed: '⏱️ Timed',
  match: '🔀 Match',
  battle: '⚔️ Battle',
};

// Order in which Study suggests a follow-up mode once the deck is finished.
// 'battle' is excluded on purpose — it's 2-player and never records a score,
// so it can't be checked for "pending/passed" the way quiz/timed/match can.
const STUDY_FOLLOWUP_MODES = ['quiz', 'timed', 'match'];

// Solo 'purple' tiene modificadores CSS de primera clase (.lp-btn--purple,
// .progress__fill--purple). 'blue' replica exactamente el patrón que ya usaba
// pronunciation-study.html a mano: clase genérica + var(--lp-cat-blue) inline.
const COLOR_VARIANTS = {
  purple: {
    pillActiveClass: 'active purple',
    progressFillClass: 'progress__fill progress__fill--purple',
    progressFillStyle: '',
    accentBtnClass: 'lp-btn lp-btn--purple',
    speakBtnStyle: 'border:2px solid var(--purple);background:rgba(147,51,234,.08);',
    battleBackTermStyle: 'color:var(--purple);',
  },
  blue: {
    pillActiveClass: 'active',
    progressFillClass: 'progress__fill',
    progressFillStyle: 'background:var(--lp-cat-blue);',
    accentBtnClass: 'lp-btn lp-btn--primary',
    speakBtnStyle: 'border:2px solid var(--lp-cat-blue);background:rgba(59,130,246,.08);',
    battleBackTermStyle: 'color:var(--lp-cat-blue);',
  },
};

export class FlashcardEngine {
  /**
   * Inyecta el markup canónico (fcCard, pill-bar, áreas study/quiz/match/battle)
   * que hoy cada página de FlashcardEngine copiaba a mano. `modes` se declara
   * explícito (no default) para que derive-catalog.mjs pueda seguir contando
   * modos desde el HTML/config de la página, no desde el engine — ver countModes()
   * en scripts/lib/derive-catalog.mjs.
   */
  static renderShell({ color = 'purple', titleHtml, modes }) {
    const v = COLOR_VARIANTS[color] || COLOR_VARIANTS.purple;
    const pillsHtml = modes
      .map((m, i) => `<button class="pill-btn ${i === 0 ? v.pillActiveClass : ''}" data-mode="${m}">${MODE_META[m]}</button>`)
      .join('');

    document.body.insertAdjacentHTML('afterbegin', `
<div class="wrap" data-color="${color}">
  <div class="top-bar">
    <a href="../index.html" class="lp-icon-btn" aria-label="Volver a HubFlow" title="Volver a HubFlow">←</a>
  </div>
  <div class="header">
    <h1>${titleHtml}</h1>
    <div class="cat-scroll-wrapper" id="catWrapper">
      <div id="catBar">
        <button class="cat-expand-btn" id="catExpandBtn" aria-label="Expandir categorías" aria-expanded="false" title="Ver todas"><span class="expand-count"></span><span class="expand-icon">▼</span></button>
      </div>
    </div>
    <div class="pill-bar">${pillsHtml}</div>
    <div class="timer-bar" id="timerBar">
      <span class="timer-display" id="timerDisplay">1:00</span>
    </div>
    <div class="progress" id="progressWrap">
      <div class="progress__labels"><span id="progTxt">0 / 10</span><span id="progPct">0%</span></div>
      <div class="progress__track"><div class="${v.progressFillClass}" id="progFill" style="${v.progressFillStyle}"></div></div>
    </div>
  </div>
  <div class="scroll-body">
    <div data-area="study">
      <div class="fc-count" id="fcCounter">1 / 25</div>
      <div class="fc-card" id="fcCard">
        <div class="fc-inner">
          <div class="fc-face">
            <div class="fc-emoji" id="fcEmoji"></div>
            <div class="fc-term" id="fcWord"></div>
            <div class="fc-ipa" id="fcIpa"></div>
            <div class="fc-hint">tap to flip</div>
          </div>
          <div class="fc-face fc-back">
            <div class="fc-emoji" id="fcBackEmoji" style="font-size:2rem;"></div>
            <div class="fc-term" id="fcBackWord"></div>
            <div class="fc-ipa" id="fcBackIpa"></div>
            <div class="fc-detail" id="fcBackMeaning"></div>
            <div class="fc-detail" id="fcBackExtra" style="font-size:.72rem;margin-top:4px;"></div>
          </div>
        </div>
      </div>
      <div class="fc-nav">
        <button class="listen-btn" id="speakBtn" aria-pressed="false" aria-label="Pronunciación automática: OFF" style="width:44px;height:44px;border-radius:50%;${v.speakBtnStyle}font-size:1.1rem;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;">🔇</button>
        <button class="lp-btn lp-btn--ghost" id="shuffleBtn">🔀</button>
        <button class="lp-btn lp-btn--ghost" id="prevBtn">←</button>
        <button class="${v.accentBtnClass}" id="nextBtn">→</button>
      </div>
    </div>
    <div data-area="quiz">
      <div class="quiz-prompt">
        <div class="quiz-prompt__emoji" id="quizEmoji"></div>
        <div class="quiz-prompt__label" id="quizLabel"></div>
        <div class="quiz-prompt__text" id="quizText"></div>
      </div>
      <div class="quiz-options" id="quizOptions"></div>
    </div>
    <div data-area="match">
      <div class="pair-grid" id="pairGrid"></div>
      <div id="pairScore"></div>
    </div>
    <div data-area="battle">
      <div class="battle-instruction" id="battleInstruction">Who knows? Tap your button!</div>
      <div class="battle-scores">
        <div class="player-score p1"><span class="p-label">P1</span><span class="p-points" id="p1Score">0</span></div>
        <span class="vs-badge">vs</span>
        <div class="player-score p2"><span class="p-label">P2</span><span class="p-points" id="p2Score">0</span></div>
      </div>
      <div class="battle-card" id="battleCard">
        <div class="fc-inner">
          <div class="fc-face">
            <div class="fc-emoji" id="battleEmoji"></div>
            <div class="fc-detail" id="battleHint" style="font-size:.78rem;font-family:'Manrope',sans-serif;text-align:center;color:var(--text);margin-top:4px;"></div>
          </div>
          <div class="fc-face fc-back">
            <div class="fc-term" id="battleBackTerm" style="font-size:1.3rem;font-weight:700;${v.battleBackTermStyle}"></div>
            <div class="fc-detail" id="battleBackSpanish" style="font-size:.7rem;margin-top:4px;"></div>
          </div>
        </div>
      </div>
      <div class="battle-actions" id="battleClaim">
        <button class="lp-btn lp-btn--ghost" id="battleClaimP1">🙋 P1</button>
        <button class="lp-btn lp-btn--ghost" id="battleSkipBtn">⏭ Skip</button>
        <button class="lp-btn lp-btn--ghost" id="battleClaimP2">🙋 P2</button>
      </div>
      <div class="battle-actions" id="battleJudge" style="display:none;">
        <button class="lp-btn lp-btn--primary" id="battleJudgeCorrect">✓ Correct</button>
        <button class="lp-btn lp-btn--danger" id="battleJudgeWrong">✗ Wrong</button>
      </div>
      <div class="battle-actions" id="battleNext" style="display:none;">
        <button class="${v.accentBtnClass}" id="battleNextBtn">Next →</button>
      </div>
    </div>
  </div>
  <div class="result-overlay" id="resultOverlay"></div>
</div>`);
  }

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
    this.matchPairCount = 5;

    // Match state
    this.pairState = { left: null, right: null, matched: 0, total: 0, errors: 0, pairs: [] };

    // Battle state
    this.battle = { p1: 0, p2: 0, round: 0, total: 10, claimer: null, deck: [], phase: 'claim' };

    // Timer
    this.timer = null;

    // Pronunciación automática (botón de estado, no pulsador)
    this.autoSpeak = readAutoSpeak();

    this.init();
  }

  init() {
    // Modes are declared in the DOM (pill-bar) rather than passed to the
    // constructor — every lesson page renders its own subset of pills.
    this.modes = Array.from(document.querySelectorAll('[data-mode]')).map(btn => btn.dataset.mode);
    this.bindGlobal();
    this.renderCatBar();
    this.updateLessonProgress();
    this.setMode('study');
  }

  bindGlobal() {
    // TTS: toggle de pronunciación automática (estado on/off, persistido)
    const speakBtn = document.getElementById('speakBtn');
    if (speakBtn && isSpeechAvailable()) {
      speakBtn.style.display = '';
      speakBtn.addEventListener('click', () => this.toggleAutoSpeak());
      this.syncSpeakBtn();
    } else if (speakBtn) {
      speakBtn.style.display = 'none';
    }

    document.querySelectorAll('[data-mode]').forEach(btn => {
      btn.addEventListener('click', () => this.setMode(btn.dataset.mode));
    });

    // Flashcard flip on click/tap
    document.getElementById('fcCard')?.addEventListener('click', () => this.flipCard());

    // Study nav + battle actions — same canonical ids across every FlashcardEngine consumer
    document.getElementById('shuffleBtn')?.addEventListener('click', () => this.shuffleDeck());
    document.getElementById('prevBtn')?.addEventListener('click', () => this.navCard(-1));
    document.getElementById('nextBtn')?.addEventListener('click', () => this.navCard(1));
    document.getElementById('battleClaimP1')?.addEventListener('click', () => this.battleClaim(1));
    document.getElementById('battleSkipBtn')?.addEventListener('click', () => this.battleSkip());
    document.getElementById('battleClaimP2')?.addEventListener('click', () => this.battleClaim(2));
    document.getElementById('battleJudgeCorrect')?.addEventListener('click', () => this.battleJudge(true));
    document.getElementById('battleJudgeWrong')?.addEventListener('click', () => this.battleJudge(false));
    document.getElementById('battleNextBtn')?.addEventListener('click', () => this.battleNext());

    // Battle card tap-to-flip (mobile) — mirrors the Space/Enter peek shortcut above
    document.getElementById('battleCard')?.addEventListener('click', () => {
      this.squeezeToggle(document.getElementById('battleCard'), 'flipped');
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', e => {
      const overlay = document.getElementById('resultOverlay');
      if (overlay?.classList.contains('show')) {
        if (e.key === 'Enter') {
          e.preventDefault();
          overlay.querySelector('.result-btns .lp-btn--purple')?.click();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          overlay.querySelector('#resultDismiss')?.click();
        }
        return;
      }
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
              this.squeezeToggle(document.getElementById('battleCard'), 'flipped');
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
      } else if ((this.currentMode === 'quiz' || this.currentMode === 'timed') && /^[1-4]$/.test(e.key)) {
        e.preventDefault();
        const opt = document.querySelectorAll('#quizOptions .quiz-opt')[Number(e.key) - 1];
        if (opt && !opt.classList.contains('disabled')) opt.click();
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

  // ═══ LESSON PROGRESS (completion indicator) ═══
  updateLessonProgress() {
    renderLessonProgress(this.config.contentId);
  }

  // ═══ CATEGORY BAR ═══
  renderCatBar() {
    const bar = document.getElementById('catBar');
    if (!bar) return;
    // Preserve the expand button (first child — lets the expanded view float
    // it top-right and wrap pills around it instead of stranding it below)
    const expandBtn = bar.querySelector('.cat-expand-btn');
    const pills = Object.entries(this.categories).map(([key, cat]) =>
      `<button class="pill-btn ${key === this.currentCat ? 'active purple' : ''}" data-cat="${key}">${cat.label}</button>`
    ).join('');
    // Remove old pills, keep expand btn
    bar.querySelectorAll('.pill-btn').forEach(el => el.remove());
    if (expandBtn) expandBtn.insertAdjacentHTML('afterend', pills);
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
    // Scroll active pill into view without animating the bar on load/switch
    const active = bar.querySelector('.pill-btn.active');
    if (active) active.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'instant' });

    // Los pills se destruyen y reconstruyen en cada click (ver arriba), lo que
    // borra el ✓ inyectado por stampDoneMark — hay que repintarlo cada vez.
    refreshModuleCompletionMarks();
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
    window.__syncBattleProgressPlacement?.();
    window.__syncBottomNavMode?.();
    this.syncSpeakBtn();
    window.__resetModeStageScroll?.();
    window.__syncModeTabIndicator?.({ scrollActive: true });
  }

  hideAllAreas() {
    document.querySelectorAll('[data-area]').forEach(el => el.classList.remove('show'));
    document.getElementById('timerBar')?.classList.remove('show');
    document.getElementById('pairScore')?.classList.remove('show');
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

    recordStudyItemSeen({
      contentId: this.config.contentId,
      storagePrefix: this.config.storagePrefix,
      category: this.currentCat,
      term: item.term,
      totalItems: this.getItems().length,
    });

    const card = document.getElementById('fcCard');
    if (card) card.classList.remove('flip');

    // Dual-word layout (Word Relations: each item has pairTerm + pairEmoji)
    if (item.pairTerm) {
      const emoji = document.getElementById('fcEmoji');
      const word = document.getElementById('fcWord');
      const pairEmoji = document.getElementById('fcPairEmoji');
      const pairWord = document.getElementById('fcPairWord');
      const relation = document.getElementById('fcRelation');

      if (emoji) emoji.textContent = item.emoji;
      if (word) word.textContent = item.term;
      if (pairEmoji) pairEmoji.textContent = item.pairEmoji;
      if (pairWord) pairWord.textContent = item.pairTerm;
      if (relation) relation.textContent = item.relation || '↔';

      // Back
      const backEmoji = document.getElementById('fcBackEmoji');
      const backWord = document.getElementById('fcBackWord');
      const backPairEmoji = document.getElementById('fcBackPairEmoji');
      const backPairWord = document.getElementById('fcBackPairWord');
      const backRelation = document.getElementById('fcBackRelation');
      const backMeaning = document.getElementById('fcBackMeaning');
      const backExtra = document.getElementById('fcBackExtra');

      if (backEmoji) backEmoji.textContent = item.emoji;
      if (backWord) backWord.textContent = item.term;
      if (backPairEmoji) backPairEmoji.textContent = item.pairEmoji;
      if (backPairWord) backPairWord.textContent = item.pairTerm;
      if (backRelation) backRelation.textContent = item.relation || '↔';
      if (backMeaning) backMeaning.textContent = item.es || '';
      if (backExtra) backExtra.textContent = item.extra || '';
    } else {
      // Standard single-word layout (Vocabulary, Pronunciation)
      const emoji = document.getElementById('fcEmoji');
      const word = document.getElementById('fcWord');
      const ipa = document.getElementById('fcIpa');
      if (emoji) emoji.textContent = item.emoji;
      if (word) word.textContent = item.term;
      if (ipa) ipa.textContent = item.ipa || '';

      const backEmoji = document.getElementById('fcBackEmoji');
      const backWord = document.getElementById('fcBackWord');
      const backIpa = document.getElementById('fcBackIpa');
      const backMeaning = document.getElementById('fcBackMeaning');
      const backExtra = document.getElementById('fcBackExtra');

      if (backEmoji) backEmoji.textContent = item.emoji;
      if (backIpa) backIpa.textContent = item.ipa || '';
      if (backWord) backWord.textContent = item.term;
      if (backMeaning) backMeaning.textContent = item.meaning || item.description || '';

      let extra = '';
      if (item.es) extra += `🇪🇸 ${item.es}`;
      if (item.time) extra += `${extra ? '\n' : ''}🕐 ${item.time}`;
      if (item.example) extra += `${extra ? '\n' : ''}💬 ${item.example}`;
      if (item.extra) extra += `${extra ? '\n' : ''}📅 ${item.extra}`;
      if (backExtra) backExtra.textContent = extra;
    }

    // Counter
    const counter = document.getElementById('fcCounter');
    if (counter) counter.textContent = `${this.cardIdx + 1} / ${this.deck.length}`;

    // TTS: update current term for speak button
    this._currentTerm = item.term;
    if (this.autoSpeak) speak(this._currentTerm);
  }

  /** Alterna el modo "leer todas las tarjetas" y lo persiste. */
  toggleAutoSpeak() {
    this.autoSpeak = !this.autoSpeak;
    try { localStorage.setItem(AUTOSPEAK_KEY, this.autoSpeak ? '1' : '0'); } catch { /* storage bloqueado */ }
    this.syncSpeakBtn();
    if (this.autoSpeak) {
      if (this._currentTerm) speak(this._currentTerm);
    } else if (isSpeechAvailable()) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * Refleja el estado del toggle en el botón. Se re-aplica tras cada cambio de
   * modo porque ex-bottom-nav.js limpia el `style` inline al re-normalizar la
   * barra inferior.
   */
  syncSpeakBtn() {
    const btn = document.getElementById('speakBtn');
    if (!btn) return;
    const on = this.autoSpeak;
    const label = on ? 'Pronunciación automática: ON' : 'Pronunciación automática: OFF';
    btn.setAttribute('aria-pressed', String(on));
    btn.classList.toggle('is-on', on);
    btn.textContent = on ? '🔊' : '🔇';
    btn.title = label;
    btn.setAttribute('aria-label', label);
  }

  // Squeezes the card to zero width, swaps which face is visible while it's
  // invisible, then lets it un-squeeze — see components.css .fc-card comment.
  squeezeToggle(el, cls) {
    if (!el || el.classList.contains('squeeze')) return;
    el.classList.add('squeeze');
    setTimeout(() => {
      el.classList.toggle(cls);
      el.classList.remove('squeeze');
    }, 150);
  }

  flipCard() {
    this.squeezeToggle(document.getElementById('fcCard'), 'flip');
  }

  navCard(delta) {
    // Reaching the end of the deck going forward suggests what to do next
    // instead of silently wrapping back to card 1.
    if (delta > 0 && this.cardIdx === this.deck.length - 1) {
      this.showStudyFollowUp();
      return;
    }

    const card = document.getElementById('fcCard');
    const inner = card?.querySelector('.fc-inner');
    if (!card || !inner) return;

    const isFlipped = card.classList.contains('flip');
    const slideX = delta > 0 ? '-12px' : '12px';

    // Slide out
    inner.style.transition = 'opacity .12s ease, transform .12s ease';
    inner.style.opacity = '0';
    inner.style.transform = isFlipped
      ? `rotateY(180deg) translateX(${delta > 0 ? '12px' : '-12px'})`
      : `translateX(${slideX})`;

    setTimeout(() => {
      // Instant reset — no animation, no flip
      inner.style.transition = 'none';
      card.classList.remove('flip');
      inner.style.transform = `translateX(${delta > 0 ? '12px' : '-12px'})`;
      inner.style.opacity = '0';

      // Update content while hidden
      this.cardIdx = (this.cardIdx + delta + this.deck.length) % this.deck.length;
      this.renderStudyCard();
      this.updateStudyProgress();
      void inner.offsetHeight;

      // Slide in from opposite side
      inner.style.transition = 'opacity .15s ease, transform .15s ease';
      inner.style.opacity = '1';
      inner.style.transform = '';
      setTimeout(() => { inner.style.transition = ''; }, 170);
    }, 130);
  }

  shuffleDeck() {
    this.deck = shuffle(this.deck);
    this.cardIdx = 0;
    this.renderStudyCard();
    this.updateStudyProgress();
  }

  _scoreKeyFor(cat, mode) {
    return `${this.config.storagePrefix}-${cat}-${mode}`;
  }

  /**
   * What to suggest once the Study deck is finished: the first not-yet-passed
   * mode in the current category (quiz → timed → match), then the first
   * category with a pending mode, or null once everything is passed.
   */
  findStudyFollowUp() {
    const followModes = STUDY_FOLLOWUP_MODES.filter(m => this.modes.includes(m));
    if (!followModes.length) return null;

    for (const mode of followModes) {
      if (!getScoreStatus(this._scoreKeyFor(this.currentCat, mode)).passed) {
        return { cat: this.currentCat, mode, isNewCategory: false };
      }
    }

    const catKeys = Object.keys(this.categories);
    const startIdx = catKeys.indexOf(this.currentCat);
    for (let i = 1; i <= catKeys.length; i++) {
      const cat = catKeys[(startIdx + i) % catKeys.length];
      if (cat === this.currentCat) continue;
      const hasPending = followModes.some(mode => !getScoreStatus(this._scoreKeyFor(cat, mode)).passed);
      // A new category always starts with Study — jumping straight to Quiz/Timed/
      // Match would test material the learner hasn't seen in this category yet.
      if (hasPending) return { cat, mode: 'study', isNewCategory: true };
    }

    return null;
  }

  showStudyFollowUp() {
    const overlay = document.getElementById('resultOverlay');
    if (!overlay) return;
    const suggestion = this.findStudyFollowUp();

    const restudy = () => {
      overlay.classList.remove('show');
      this.cardIdx = 0;
      this.renderStudyCard();
      this.updateStudyProgress();
    };

    if (suggestion) {
      const modeLabel = MODE_META[suggestion.mode] || suggestion.mode;
      const subtitle = suggestion.isNewCategory
        ? `Siguiente: ${this.categories[suggestion.cat]?.label || suggestion.cat} — ${modeLabel}`
        : `Siguiente: ${modeLabel}`;

      overlay.innerHTML = `
        <div class="result-box">
          <button class="result-close" id="resultDismiss" aria-label="Close">✕</button>
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
        if (suggestion.isNewCategory) {
          this.currentCat = suggestion.cat;
          this.renderCatBar();
        }
        this.setMode(suggestion.mode);
      });
      overlay.querySelector('#resultRestudy')?.addEventListener('click', restudy);
      overlay.querySelector('#resultDismiss')?.addEventListener('click', restudy);
    } else {
      overlay.innerHTML = `
        <div class="result-box">
          <button class="result-close" id="resultDismiss" aria-label="Close">✕</button>
          <div style="font-size:3rem;margin-bottom:8px;">🏆</div>
          <div class="result-title">¡Lección completa! 🎉</div>
          <div class="result-sub">Aprobaste todos los modos de esta lección.</div>
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
      optsEl.innerHTML = options.map((opt, i) =>
        `<button class="quiz-opt"><span class="quiz-opt__num">${i + 1}</span>${opt.text}</button>`
      ).join('');

      optsEl.querySelectorAll('.quiz-opt').forEach((btn, idx) => {
        btn.addEventListener('click', () => this.handleQuizAnswer(btn, idx, options, optsEl));
      });

      // Prevent ghost clicks from previous touch on mobile
      setTimeout(() => { optsEl.style.pointerEvents = ''; }, 50);
    }
  }

  handleQuizAnswer(btn, idx, options, container) {
    const allBtns = container.querySelectorAll('.quiz-opt');
    allBtns.forEach(b => { b.classList.add('disabled'); b.style.pointerEvents = 'none'; });

    if (options[idx].correct) {
      btn.classList.add('correct');
      this.quizScore++;
    } else {
      btn.classList.add('wrong');
      const correctIdx = options.findIndex(o => o.correct);
      allBtns[correctIdx]?.classList.add('correct');
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
    const modeSuffix = this.currentMode === 'timed' ? 'timed' : 'quiz';
    recordScore(`${this.config.storagePrefix}-${this.currentCat}-${modeSuffix}`, pct, {
      contentId: this.config.contentId,
      activity,
    });
    this.updateLessonProgress();
    this.showResultOverlay(this.quizScore, this.quizTotal);
    this.stopTimer();
  }

  // ═══ MATCH (PAIR COLUMNS) ═══
  initMatch() {
    const items = this.getItems();
    const cat = this.categories[this.currentCat];

    // If category has order, use drag-sort mode (not implemented in engine, fallback to pair)
    const selected = shuffle(items).slice(0, this.matchPairCount);
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

    this.updateMatchProgress();
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
      this.updateMatchProgress();

      if (this.pairState.matched === this.pairState.total) {
        const score = Math.max(0, this.pairState.total - this.pairState.errors);
        const pct = Math.round((score / this.pairState.total) * 100);
        recordScore(`${this.config.storagePrefix}-${this.currentCat}-match`, pct, {
          contentId: this.config.contentId,
        });
        this.updateLessonProgress();
        setTimeout(() => this.showResultOverlay(score, this.pairState.total), 600);
      }
    } else {
      this.pairState.errors++;
      this.updateMatchProgress();
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

  updateMatchProgress() {
    const { matched, total, errors } = this.pairState;
    const pct = total > 0 ? Math.round((matched / total) * 100) : 0;

    const scoreEl = document.getElementById('pairScore');
    if (scoreEl) {
      if (errors > 0) {
        scoreEl.textContent = `✗ ${errors} error${errors === 1 ? '' : 's'}`;
        scoreEl.classList.add('show');
      } else {
        scoreEl.textContent = '';
        scoreEl.classList.remove('show');
      }
    }

    const fillEl = document.getElementById('progFill');
    const txtEl = document.getElementById('progTxt');
    const pctEl = document.getElementById('progPct');
    if (fillEl) fillEl.style.width = `${pct}%`;
    if (txtEl) txtEl.textContent = `${matched} / ${total}`;
    if (pctEl) pctEl.textContent = `${pct}%`;
  }

  // ═══ BATTLE ═══
  _setBattleInstruction(text, { fadeAfter = 0 } = {}) {
    const el = document.getElementById('battleInstruction');
    if (!el) return;
    clearTimeout(this._battleHintTimer);
    el.textContent = text;
    el.classList.remove('is-fading');
    if (fadeAfter > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this._battleHintTimer = setTimeout(() => el.classList.add('is-fading'), fadeAfter);
    }
  }

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

    this._setBattleInstruction('Who knows? Tap your button!', { fadeAfter: 2500 });

    this.showBattleActions('claim');
    this.battle.claimer = null;
    this.battle.phase = 'claim';
  }

  battleClaim(player) {
    this.battle.claimer = player;
    this.battle.phase = 'judge';
    this.squeezeToggle(document.getElementById('battleCard'), 'flipped');
    this._setBattleInstruction(`Player ${player} claimed! Correct?`);
    this.showBattleActions('judge');
  }

  battleSkip() {
    this.battle.phase = 'next';
    this.squeezeToggle(document.getElementById('battleCard'), 'flipped');
    this._setBattleInstruction('Skipped — no points');
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
    this._setBattleInstruction(correct
      ? `✓ Correct! — ${answer}`
      : `✗ Wrong — Answer: ${answer}`);
    this.showBattleActions('next');
  }

  battleNext() {
    this.battle.round++;
    this.showBattleCard();
  }

  showBattleActions(phase) {
    window.__syncBattleActionVisibility?.(phase);
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
        <button class="result-close" id="resultDismiss" aria-label="Close">✕</button>
        <div style="font-size:3rem;margin-bottom:8px;">${trophy}</div>
        <div class="result-title">${title}</div>
        <div class="result-sub">${this.battle.p1} — ${this.battle.p2}</div>
        <div class="result-btns">
          <button class="lp-btn lp-btn--purple" id="resultRestart">🔄 Play Again</button>
        </div>
      </div>
    `;
    overlay.classList.add('show');
    overlay.querySelector('#resultDismiss')?.addEventListener('click', () => { overlay.classList.remove('show'); });
    overlay.querySelector('#resultRestart')?.addEventListener('click', () => { overlay.classList.remove('show'); this.initBattle(); });
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

    // Igual que al terminar Study: sugerir la siguiente actividad pendiente
    // del módulo (quiz → timed → match, luego siguiente categoría) en vez de
    // dejar al usuario sin rumbo tras ver su puntaje.
    const suggestion = this.findStudyFollowUp();
    const nextHtml = suggestion
      ? `<div class="result-sub">Siguiente: ${suggestion.isNewCategory
          ? `${this.categories[suggestion.cat]?.label || suggestion.cat} — ${MODE_META[suggestion.mode] || suggestion.mode}`
          : MODE_META[suggestion.mode] || suggestion.mode}</div>`
      : '';
    const primaryLabel = suggestion ? 'Continuar →' : '📖 Study';

    overlay.innerHTML = `
      <div class="result-box">
        <button class="result-close" id="resultDismiss" aria-label="Close">✕</button>
        <div class="result-stars">
          <span class="result-star ${stars >= 1 ? 'lit' : ''}">⭐</span>
          <span class="result-star ${stars >= 2 ? 'lit' : ''}">⭐</span>
          <span class="result-star ${stars >= 3 ? 'lit' : ''}">⭐</span>
        </div>
        <div class="result-title">${titles[stars]}</div>
        <div class="result-sub">${correct}/${total} correct — ${pct}%</div>
        ${timeHtml}
        ${nextHtml}
        <div class="result-btns">
          <button class="lp-btn lp-btn--ghost" id="resultRestart">🔄 Try Again</button>
          <button class="lp-btn lp-btn--purple" id="resultPrimary">${primaryLabel}</button>
        </div>
      </div>
    `;
    overlay.classList.add('show');

    overlay.querySelector('#resultDismiss')?.addEventListener('click', () => {
      overlay.classList.remove('show');
    });
    overlay.querySelector('#resultRestart')?.addEventListener('click', () => {
      overlay.classList.remove('show');
      this.setMode(this.currentMode);
    });
    overlay.querySelector('#resultPrimary')?.addEventListener('click', () => {
      overlay.classList.remove('show');
      if (!suggestion) {
        this.setMode('study');
        return;
      }
      if (suggestion.isNewCategory) {
        this.currentCat = suggestion.cat;
        this.renderCatBar();
      }
      this.setMode(suggestion.mode);
    });
  }
}
