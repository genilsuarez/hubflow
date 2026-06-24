/* ═══════════════════════════════════════════════════════
   LearnHub — Shared Utilities
   ═══════════════════════════════════════════════════════ */

/** Fisher-Yates shuffle (returns new array) */
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Theme toggle */
export function initTheme(storageKey = 'lh-theme') {
  const saved = localStorage.getItem(storageKey);
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  updateThemeButton();
}

export function toggleTheme(storageKey = 'lh-theme') {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? '' : 'dark');
  localStorage.setItem(storageKey, isDark ? '' : 'dark');
  updateThemeButton();
}

function updateThemeButton() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.textContent = isDark ? '☀️' : '🌙';
}

/** localStorage score recording */
export function recordScore(key, pct) {
  const history = JSON.parse(localStorage.getItem(key) || '[]');
  history.unshift({ pct, date: new Date().toLocaleDateString() });
  if (history.length > 20) history.pop();
  localStorage.setItem(key, JSON.stringify(history));
}

export function getBestScore(key) {
  const history = JSON.parse(localStorage.getItem(key) || '[]');
  if (!history.length) return null;
  return Math.max(...history.map(h => h.pct));
}

/** Stars calculation */
export function getStars(pct) {
  if (pct === 100) return 3;
  if (pct >= 60) return 2;
  return 1;
}

/** Progress bar update */
export function updateProgress(current, total, fillEl, txtEl, pctEl) {
  const pct = Math.round((current / total) * 100);
  if (fillEl) fillEl.style.width = `${pct}%`;
  if (txtEl) txtEl.textContent = `${current} / ${total}`;
  if (pctEl) pctEl.textContent = `${pct}%`;
}

/** Timer utility */
export class Timer {
  constructor(seconds, onTick, onEnd) {
    this.seconds = seconds;
    this.remaining = seconds;
    this.onTick = onTick;
    this.onEnd = onEnd;
    this.interval = null;
  }
  start() {
    this.remaining = this.seconds;
    this.onTick(this.remaining);
    this.interval = setInterval(() => {
      this.remaining--;
      this.onTick(this.remaining);
      if (this.remaining <= 0) { this.stop(); this.onEnd(); }
    }, 1000);
  }
  stop() {
    if (this.interval) { clearInterval(this.interval); this.interval = null; }
  }
  reset(seconds) {
    this.stop();
    if (seconds !== undefined) this.seconds = seconds;
    this.remaining = this.seconds;
  }
}

/** Format timer display */
export function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/** Show result overlay */
export function showResult({ correct, total, containerEl, onRestart, onStudy }) {
  const pct = Math.round((correct / total) * 100);
  const stars = getStars(pct);
  const titles = { 3: 'Perfect! 🎉', 2: 'Well done!', 1: 'Keep practicing!' };

  containerEl.innerHTML = `
    <div class="result-box">
      <div class="result-stars">
        <span class="result-star ${stars >= 1 ? 'lit' : ''}">⭐</span>
        <span class="result-star ${stars >= 2 ? 'lit' : ''}">⭐</span>
        <span class="result-star ${stars >= 3 ? 'lit' : ''}">⭐</span>
      </div>
      <div class="result-title">${titles[stars]}</div>
      <div class="result-sub">${correct}/${total} correct — ${pct}%</div>
      <div class="result-btns">
        <button class="btn btn--primary" id="resultRestart">🔄 Try Again</button>
        ${onStudy ? '<button class="btn btn--ghost" id="resultStudy">📖 Study</button>' : ''}
      </div>
    </div>
  `;
  containerEl.classList.add('show');

  containerEl.querySelector('#resultRestart')?.addEventListener('click', () => {
    containerEl.classList.remove('show');
    onRestart();
  });
  containerEl.querySelector('#resultStudy')?.addEventListener('click', () => {
    containerEl.classList.remove('show');
    onStudy();
  });

  return pct;
}
