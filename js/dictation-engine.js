/* ═══════════════════════════════════════════════════════
   HubFlow — Dictation Practice Engine
   TTS dictation with word-diff scoring (dictation-sprint, etc.)
   ═══════════════════════════════════════════════════════ */

import {
  shuffle,
  initTheme,
  toggleTheme,
  isSpeechAvailable,
  Timer,
  formatTime,
  showResult,
  recordScore,
  renderCatBar as sharedRenderCatBar,
  renderLessonProgress,
  setupPracticeBottomNav,
  setPracticeBottomNav,
} from './utils.js';

function normalize(text) {
  return text.toLowerCase()
    .replace(/['']/g, "'")
    .replace(/[^a-z0-9'\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function initDictationPractice({
  categories,
  scoreKeyPrefix = 'dict',
  contentId = 'dictation-sprint',
}) {
  initTheme();
  document.getElementById('themeToggle')?.addEventListener('click', () => toggleTheme());
  renderLessonProgress(contentId);

  if (!isSpeechAvailable()) {
    document.getElementById('noTtsWarning')?.classList.add('show');
  }

  const catKeys = Object.keys(categories);
  let currentCat = catKeys[0];
  let mode = 'practice';
  let deck = [];
  let idx = 0;
  let totalScore = 0;
  let totalWords = 0;
  let plays = 0;
  let maxPlays = 3;
  let checked = false;
  let timer = null;
  let autoPlaySession = 0;

  sharedRenderCatBar({
    categories,
    getCurrentCat: () => currentCat,
    setCurrentCat: (k) => { currentCat = k; },
    onChange: startMode,
    formatLabel: (k, cat) => `${cat.icon} ${cat.label} <span style="font-size:.6rem;opacity:.7">${cat.level || ''}</span>`,
  });

  document.querySelectorAll('[data-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      mode = btn.dataset.mode;
      document.querySelectorAll('[data-mode]').forEach((b) => {
        b.classList.toggle('active', b.dataset.mode === mode);
      });
      startMode();
    });
  });

  function stopTimer() {
    if (timer) { timer.stop(); timer = null; }
  }

  function startMode() {
    stopTimer();
    const cat = categories[currentCat];
    deck = shuffle(cat.items);
    idx = 0;
    totalScore = 0;
    totalWords = 0;
    document.getElementById('timerBar')?.classList.toggle('show', mode === 'timed');
    document.querySelector('[data-area="dictation"]')?.classList.add('show');

    if (mode === 'timed') {
      maxPlays = 2;
      timer = new Timer(180,
        (r) => {
          const el = document.getElementById('timerDisplay');
          if (!el) return;
          el.textContent = formatTime(r);
          el.classList.toggle('warn', r <= 15);
        },
        () => finish(),
      );
      timer.start();
    } else {
      maxPlays = 3;
    }
    loadSentence();
  }

  function updateProgress() {
    const pct = deck.length > 0 ? Math.round((idx / deck.length) * 100) : 0;
    document.getElementById('progFill').style.width = `${pct}%`;
    document.getElementById('progTxt').textContent = `${idx} / ${deck.length}`;
    document.getElementById('progPct').textContent = `${pct}%`;
  }

  function loadSentence() {
    if (idx >= deck.length) { finish(); return; }
    const item = deck[idx];
    plays = 0;
    checked = false;

    document.getElementById('dCounter').textContent = `${idx + 1} / ${deck.length}`;
    document.getElementById('dHint').textContent = item.hint || '';
    document.getElementById('dPlays').textContent = `Plays: 0 / ${maxPlays}`;
    document.getElementById('dInput').value = '';
    document.getElementById('dInput').disabled = false;
    document.getElementById('dFeedback').classList.remove('show');
    document.getElementById('dUserRow').hidden = false;
    document.getElementById('dCorrectRow').hidden = false;
    document.getElementById('dPlayback').innerHTML = '';
    document.getElementById('playBtn').style.opacity = '';
    document.getElementById('playBtn').style.cursor = '';
    setPracticeBottomNav({ check: true, next: false, skip: true });
    document.getElementById('dInput').focus();
    updateProgress();
  }

  function playSentence(rate) {
    if (plays >= maxPlays && rate !== 'slow') return Promise.resolve();
    const item = deck[idx];
    const cat = categories[currentCat];
    const baseRate = cat.rate || 0.85;
    const finalRate = rate === 'slow' ? baseRate * 0.65 : baseRate;

    if (!isSpeechAvailable() || !item.sentence) return Promise.resolve();
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(item.sentence);
    u.lang = 'en-GB';
    u.rate = finalRate;
    u.pitch = 1;

    const done = new Promise((resolve) => {
      u.onend = resolve;
      u.onerror = resolve;
      setTimeout(resolve, item.sentence.length * 120 + 3000);
    });
    window.speechSynthesis.speak(u);

    if (rate !== 'slow') {
      plays++;
      document.getElementById('dPlays').textContent = `Plays: ${plays} / ${maxPlays}`;
    }

    if (plays >= maxPlays) {
      document.getElementById('playBtn').style.opacity = '0.4';
      document.getElementById('playBtn').style.cursor = 'not-allowed';
    }

    return done;
  }

  async function autoPlayTwice() {
    const session = ++autoPlaySession;
    const item = deck[idx];
    if (!item) return;
    const pbEl = document.getElementById('dPlayback');

    pbEl.innerHTML = '▶ Playing… <span class="dict-card__playback-dots"><span class="done"></span><span></span></span>';
    await playSentence('normal');
    if (session !== autoPlaySession) return;

    await new Promise((r) => setTimeout(r, 1000));
    if (session !== autoPlaySession) return;

    pbEl.innerHTML = '▶ Playing… <span class="dict-card__playback-dots"><span class="done"></span><span class="done"></span></span>';
    await playSentence('normal');
    if (session !== autoPlaySession) return;

    pbEl.innerHTML = '';
  }

  function checkAnswer() {
    if (checked) return;
    checked = true;

    const item = deck[idx];
    const userText = document.getElementById('dInput').value.trim();
    document.getElementById('dInput').disabled = true;

    const correctWords = normalize(item.sentence).split(/\s+/);
    const userWords = normalize(userText).split(/\s+/).filter((w) => w);

    let matched = 0;
    const correctUsed = new Array(correctWords.length).fill(false);
    const userMatched = new Array(userWords.length).fill(false);

    for (let i = 0; i < Math.min(correctWords.length, userWords.length); i++) {
      if (correctWords[i] === userWords[i]) {
        correctUsed[i] = true;
        userMatched[i] = true;
        matched++;
      }
    }

    for (let i = 0; i < userWords.length; i++) {
      if (userMatched[i]) continue;
      for (let j = 0; j < correctWords.length; j++) {
        if (correctUsed[j]) continue;
        if (userWords[i] === correctWords[j]) {
          correctUsed[j] = true;
          userMatched[i] = true;
          matched++;
          break;
        }
      }
    }

    const wordCount = correctWords.length;
    const pct = Math.round((matched / wordCount) * 100);
    totalScore += matched;
    totalWords += wordCount;

    const scoreEl = document.getElementById('dScore');
    scoreEl.textContent = pct === 100
      ? `${matched}/${wordCount} words — Perfect`
      : `${matched}/${wordCount} words (${pct}%)`;
    scoreEl.className = `dict-feedback__score ${pct === 100 ? 'perfect' : pct >= 60 ? 'good' : 'low'}`;

    document.getElementById('dDiff').textContent = userText || '—';
    document.getElementById('dCorrect').textContent = item.sentence;
    document.getElementById('dUserRow').hidden = pct === 100;
    document.getElementById('dCorrectRow').hidden = pct === 100;
    document.getElementById('dFeedback').classList.add('show');
    setPracticeBottomNav({ check: false, next: true, skip: false });
    document.getElementById('playBtn').style.opacity = '';
    document.getElementById('playBtn').style.cursor = '';
  }

  function finish() {
    stopTimer();
    const pct = totalWords > 0 ? Math.round((totalScore / totalWords) * 100) : 0;
    showResult({
      correct: totalScore,
      total: totalWords,
      containerEl: document.getElementById('resultOverlay'),
      onRestart: () => startMode(),
      onStudy: null,
    });
    recordScore(`${scoreKeyPrefix}-${currentCat}`, pct);
    renderLessonProgress(contentId);
    document.getElementById('progFill').style.width = '100%';
    document.getElementById('progTxt').textContent = `${deck.length} / ${deck.length}`;
    document.getElementById('progPct').textContent = '100%';
  }

  document.getElementById('playBtn')?.addEventListener('click', () => {
    autoPlaySession++;
    document.getElementById('dPlayback').innerHTML = '';
    playSentence('normal');
  });
  document.getElementById('playSlow')?.addEventListener('click', () => {
    autoPlaySession++;
    document.getElementById('dPlayback').innerHTML = '';
    playSentence('slow');
  });
  document.getElementById('checkBtn')?.addEventListener('click', checkAnswer);
  document.getElementById('nextBtn')?.addEventListener('click', () => {
    autoPlaySession++;
    idx++;
    loadSentence();
    autoPlayTwice();
  });
  document.getElementById('skipBtn')?.addEventListener('click', () => {
    autoPlaySession++;
    const item = deck[idx];
    const wordCount = normalize(item.sentence).split(/\s+/).length;
    totalWords += wordCount;
    idx++;
    loadSentence();
    autoPlayTwice();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey && !checked) {
      e.preventDefault();
      checkAnswer();
    }
    if (e.key === 'p' && e.ctrlKey) {
      e.preventDefault();
      playSentence('normal');
    }
  });

  startMode();
  setupPracticeBottomNav();
  autoPlayTwice();
}
