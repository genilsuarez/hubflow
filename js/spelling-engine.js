/**
 * HubFlow — Spelling Exercise Engine
 * Shared logic for -ing, -ed, and noun-adjuncts exercises.
 * Each exercise imports this and passes its config + data.
 */
import { shuffle, recordScore, getStars, updateProgress, Timer, formatTime, renderLessonProgress } from './utils.js';

export class SpellingEngine {
  constructor(config) {
    // Config: { title, suffix, levels, storagePrefix, accentColor, rules, inputField, getPrompt, getAnswer, checkAnswer }
    this.config = config;
    this.levels = config.levels;
    this.mode = 'study';
    this.level = 'beginner';
    this.words = [];
    this.state = {}; // { [index]: { spelling, color } }
    this.streak = 0;
    this.lives = 3;
    this.livesEnabled = false;
    this.gameOver = false;
    this.timer = null;
    this.timeLeft = 0;
    this.checked = false;

    this.init();
  }

  init() {
    this.bindEvents();
    this.loadLevel();
    this.render();
    renderLessonProgress(this.config.contentId);
  }

  bindEvents() {
    // Mode buttons
    document.querySelectorAll('[data-mode]').forEach(btn => {
      btn.addEventListener('click', () => this.setMode(btn.dataset.mode));
    });

    // Level buttons
    document.querySelectorAll('[data-level]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('locked')) return;
        this.setLevel(btn.dataset.level);
      });
    });

    // Check button
    document.getElementById('checkBtn')?.addEventListener('click', () => this.checkAll());

    // Keyboard: Enter moves to next input; only checks when on last input or outside grid
    document.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (this.checked) return;
        const active = document.activeElement;
        const grid = document.getElementById('cardGrid');
        if (active && grid && grid.contains(active) && active.dataset.idx !== undefined) {
          const nextIdx = +active.dataset.idx + 1;
          const next = grid.querySelector(`.word-card__input[data-idx="${nextIdx}"], .word-card__select[data-idx="${nextIdx}"]`);
          if (next) { next.focus(); return; }
        }
        this.checkAll();
      }
    });
  }

  setMode(mode) {
    this.mode = mode;
    document.querySelectorAll('[data-mode]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    this.livesEnabled = (this.level === 'god' && mode === 'challenge');
    this.resetExercise();
  }

  setLevel(level) {
    this.level = level;
    document.querySelectorAll('[data-level]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.level === level);
    });
    this.livesEnabled = (level === 'god' && this.mode === 'challenge');
    this.resetExercise();
  }

  loadLevel() {
    const data = this.levels[this.level] || [];
    this.words = shuffle(data);
    if (this.mode === 'timed') {
      this.words = this.words.slice(0, Math.min(this.words.length, 16));
    }
    this.state = {};
    this.streak = 0;
    this.lives = 3;
    this.gameOver = false;
    this.checked = false;
  }

  resetExercise() {
    this.loadLevel();
    this.stopTimer();
    this.render();
    if (this.mode === 'timed') this.startTimer();
  }

  render() {
    this.renderCards();
    this.renderModeUI();
    this.updateProgressBar();
  }

  renderCards() {
    const grid = document.getElementById('cardGrid');
    if (!grid) return;

    const useSelect = this.config.inputType === 'select';

    grid.innerHTML = this.words.map((item, i) => {
      const prompt = this.config.getPrompt(item);
      const stateItem = this.state[i] || {};
      const inputHtml = useSelect
        ? this.renderSelectInput(item, i, stateItem)
        : `<input
            class="word-card__input"
            type="text"
            data-idx="${i}"
            placeholder="${this.config.inputPlaceholder || '...'}"
            value="${stateItem.spelling || ''}"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
          >`;
      return `
        <div class="word-card" data-idx="${i}" id="card-${i}">
          <div class="word-card__verb">${prompt}</div>
          ${inputHtml}
          ${this.config.hasColorPicker ? this.renderColorPicker(i) : ''}
        </div>
      `;
    }).join('');

    // Bind input/select events
    if (useSelect) {
      grid.querySelectorAll('.word-card__select').forEach(sel => {
        sel.addEventListener('change', e => {
          const idx = +e.target.dataset.idx;
          if (!this.state[idx]) this.state[idx] = {};
          this.state[idx].spelling = e.target.value;
          this.updateProgressBar();
        });
      });
    } else {
      grid.querySelectorAll('.word-card__input').forEach(input => {
        input.addEventListener('input', e => {
          const idx = +e.target.dataset.idx;
          if (!this.state[idx]) this.state[idx] = {};
          this.state[idx].spelling = e.target.value.trim().toLowerCase();
        });
        input.addEventListener('keydown', e => {
          if (e.key === 'Tab') {
            e.preventDefault();
            const nextIdx = +e.target.dataset.idx + (e.shiftKey ? -1 : 1);
            const next = grid.querySelector(`.word-card__input[data-idx="${nextIdx}"]`);
            if (next) next.focus();
          }
        });
      });
    }

    // Bind color picker events
    if (this.config.hasColorPicker) {
      grid.querySelectorAll('.color-dot').forEach(dot => {
        dot.addEventListener('click', () => {
          const idx = +dot.dataset.idx;
          const color = dot.dataset.color;
          if (!this.state[idx]) this.state[idx] = {};
          this.state[idx].color = color;
          // Update selected state
          const card = document.getElementById(`card-${idx}`);
          card.querySelectorAll('.color-dot').forEach(d => d.classList.toggle('selected', d.dataset.color === color));
        });
      });
    }
  }

  renderSelectInput(item, idx, stateItem) {
    const correct = this.config.getAnswer(item).toLowerCase();
    // Gather distractors from other words in this level
    const allModifiers = [...new Set(
      this.words
        .map(w => this.config.getAnswer(w).toLowerCase())
        .filter(m => m !== correct)
    )];
    // Pick 3-4 random distractors
    const numDistractors = Math.min(allModifiers.length, this.words.length <= 8 ? 3 : 4);
    const distractors = shuffle([...allModifiers]).slice(0, numDistractors);
    // Combine and shuffle options
    const options = shuffle([correct, ...distractors]);
    const selected = stateItem.spelling || '';

    return `<select class="word-card__select" data-idx="${idx}">
      <option value="" ${!selected ? 'selected' : ''} disabled>· · ·</option>
      ${options.map(opt => `<option value="${opt}" ${selected === opt ? 'selected' : ''}>${opt}</option>`).join('')}
    </select>`;
  }

  renderColorPicker(idx) {
    const colors = this.config.rules || ['red', 'blue', 'green'];
    const selected = this.state[idx]?.color || '';
    return `<div class="color-picker">
      ${colors.map(c => `<div class="color-dot ${c} ${selected === c ? 'selected' : ''}" data-idx="${idx}" data-color="${c}"></div>`).join('')}
    </div>`;
  }

  renderModeUI() {
    // Timer bar
    const timerBar = document.getElementById('timerBar');
    if (timerBar) timerBar.classList.toggle('show', this.mode === 'timed');

    // Lives bar
    const livesBar = document.getElementById('livesBar');
    if (livesBar) {
      livesBar.classList.toggle('show', this.livesEnabled);
      if (this.livesEnabled) livesBar.textContent = '❤️'.repeat(this.lives);
    }

    // Streak bar
    const streakBar = document.getElementById('streakBar');
    if (streakBar) streakBar.classList.toggle('show', this.streak > 0);
    if (streakBar && this.streak > 0) streakBar.textContent = `🔥 ${this.streak} streak`;

    // Check button
    const checkBtn = document.getElementById('checkBtn');
    if (checkBtn) checkBtn.disabled = this.checked;
  }

  updateProgressBar() {
    const filled = Object.keys(this.state).filter(k => this.state[k].spelling).length;
    const total = this.words.length;
    const fillEl = document.getElementById('progFill');
    const txtEl = document.getElementById('progTxt');
    const pctEl = document.getElementById('progPct');
    updateProgress(filled, total, fillEl, txtEl, pctEl);
  }

  startTimer() {
    const seconds = this.words.length * 5; // 5 seconds per word
    this.timeLeft = seconds;
    this.timedTotal = seconds;
    const display = document.getElementById('timerDisplay');
    if (display) display.textContent = formatTime(this.timeLeft);

    this.timer = new Timer(seconds,
      (remaining) => {
        this.timeLeft = remaining;
        if (display) {
          display.textContent = formatTime(remaining);
          display.classList.toggle('warn', remaining <= 10);
        }
      },
      () => this.checkAll()
    );
    this.timer.start();
  }

  stopTimer() {
    if (this.timer) { this.timer.stop(); this.timer = null; }
  }

  checkAll() {
    if (this.checked) return;
    this.checked = true;
    this.stopTimer();

    let spellingOk = 0;
    let colorOk = 0;
    const total = this.words.length;
    const failed = [];

    this.words.forEach((item, i) => {
      const card = document.getElementById(`card-${i}`);
      if (!card) return;

      const userSpelling = (this.state[i]?.spelling || '').toLowerCase();
      const userColor = this.state[i]?.color || '';
      const correctAnswer = this.config.getAnswer(item).toLowerCase();
      const correctColor = item.rule;

      const spellingCorrect = this.config.checkAnswer
        ? this.config.checkAnswer(userSpelling, item)
        : userSpelling === correctAnswer;
      const colorCorrect = !this.config.hasColorPicker || userColor === correctColor;

      if (spellingCorrect) spellingOk++;
      if (colorCorrect) colorOk++;

      // Visual feedback
      if (spellingCorrect && colorCorrect) {
        card.classList.add('correct');
      } else {
        card.classList.add('wrong');
        failed.push(item);
      }

      // Show correct answer
      const input = card.querySelector('.word-card__input');
      const select = card.querySelector('.word-card__select');
      if (input && !spellingCorrect) {
        input.value = correctAnswer;
        input.style.color = 'var(--red-dark)';
      }
      if (select && !spellingCorrect) {
        // Add correct option if not present, then select it
        const hasOption = [...select.options].some(o => o.value === correctAnswer);
        if (!hasOption) {
          const opt = document.createElement('option');
          opt.value = correctAnswer;
          opt.textContent = correctAnswer;
          select.appendChild(opt);
        }
        select.value = correctAnswer;
        select.style.color = 'var(--red-dark)';
      }
    });

    // Calculate score
    const scoreFactors = this.config.hasColorPicker ? 2 : 1;
    const pct = Math.round(((spellingOk + (this.config.hasColorPicker ? colorOk : 0)) / (total * scoreFactors)) * 100);

    // Record score
    const key = `${this.config.storagePrefix}-${this.level}-${this.mode}`;
    recordScore(key, pct);
    renderLessonProgress(this.config.contentId);

    // Save failed words
    this.saveFailedWords(failed);

    // Show results after delay
    setTimeout(() => this.showResults(pct, spellingOk, colorOk, total), 800);
  }

  saveFailedWords(failed) {
    if (!failed.length) return;
    const key = `${this.config.storagePrefix}-failed`;
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    const failedIds = failed.map(w => this.config.getAnswer(w));
    const merged = [...new Set([...existing, ...failedIds])];
    localStorage.setItem(key, JSON.stringify(merged.slice(0, 50)));
  }

  showResults(pct, spellingOk, colorOk, total) {
    const stars = getStars(pct);
    const overlay = document.getElementById('resultOverlay');
    if (!overlay) return;

    const titles = { 3: 'Perfect! 🎉', 2: 'Well done!', 1: 'Keep practicing!' };

    // Calculate elapsed time for timed mode
    let timeHtml = '';
    if (this.mode === 'timed' && this.timedTotal) {
      const elapsed = this.timedTotal - (this.timeLeft || 0);
      timeHtml = `<div class="result-time">⏱ ${formatTime(elapsed)}</div>`;
    }

    overlay.innerHTML = `
      <div class="result-box">
        <div class="result-stars">
          <span class="result-star ${stars >= 1 ? 'lit' : ''}">⭐</span>
          <span class="result-star ${stars >= 2 ? 'lit' : ''}">⭐</span>
          <span class="result-star ${stars >= 3 ? 'lit' : ''}">⭐</span>
        </div>
        <div class="result-title">${titles[stars]}</div>
        <div class="result-sub">
          Spelling: ${spellingOk}/${total}
          ${this.config.hasColorPicker ? `· Colors: ${colorOk}/${total}` : ''}
          · Score: ${pct}%
        </div>
        ${timeHtml}
        <div class="result-btns">
          <button class="lp-btn lp-btn--primary" id="resultRestart">🔄 Try Again</button>
          <button class="lp-btn lp-btn--ghost" id="resultClose">✕ Close</button>
        </div>
      </div>
    `;
    overlay.classList.add('show');

    overlay.querySelector('#resultRestart')?.addEventListener('click', () => {
      overlay.classList.remove('show');
      this.resetExercise();
    });
    overlay.querySelector('#resultClose')?.addEventListener('click', () => {
      overlay.classList.remove('show');
    });
  }
}
