/* ═══════════════════════════════════════════════════════
   HubFlow — Exercise UI
   Category bar, mode tabs, and timer/progress-bar widgets shared
   across exercises and engines.
   ═══════════════════════════════════════════════════════ */

import { refreshModuleCompletionMarks } from './progress-store.js';

const CAT_EXPANDER_INIT = 'data-cat-expander-init';
const CAT_PILL_SELECTOR = '.cat-btn, .pill-btn';

function ensureCatScrollWrapper(bar, wrapperId = 'catWrapper') {
  let parent = bar.parentElement;

  if (parent?.classList.contains('cat-bar-wrap')) {
    const host = parent.parentElement;
    const wrap = document.createElement('div');
    wrap.className = 'cat-scroll-wrapper';
    if (wrapperId) wrap.id = wrapperId;
    host.insertBefore(wrap, parent);
    wrap.appendChild(bar);
    parent.remove();
    return wrap;
  }

  if (parent?.classList.contains('cat-scroll-wrapper')) {
    if (wrapperId && !parent.id) parent.id = wrapperId;
    return parent;
  }

  const wrap = document.createElement('div');
  wrap.className = 'cat-scroll-wrapper';
  if (wrapperId) wrap.id = wrapperId;
  parent.insertBefore(wrap, bar);
  wrap.appendChild(bar);
  return wrap;
}

function ensureCatExpandButton(bar) {
  let expandBtn = bar.querySelector('.cat-expand-btn');
  if (!expandBtn) {
    expandBtn = document.createElement('button');
    expandBtn.className = 'cat-expand-btn';
    expandBtn.type = 'button';
    expandBtn.setAttribute('aria-label', 'Expandir categorías');
    expandBtn.setAttribute('aria-expanded', 'false');
    expandBtn.title = 'Ver todas';
    expandBtn.innerHTML = '<span class="expand-count"></span><span class="expand-icon">▼</span>';
    bar.prepend(expandBtn);
    return expandBtn;
  }

  if (!expandBtn.querySelector('.expand-count')) {
    expandBtn.insertAdjacentHTML('afterbegin', '<span class="expand-count"></span>');
  }
  if (!expandBtn.querySelector('.expand-icon')) {
    const icon = document.createElement('span');
    icon.className = 'expand-icon';
    icon.textContent = '▼';
    expandBtn.appendChild(icon);
  }
  // Kept as first child (not last) so the expanded view can float it top-right
  // and wrap pills around it instead of stranding it alone on a trailing line.
  if (expandBtn.parentElement === bar && expandBtn !== bar.firstElementChild) {
    bar.prepend(expandBtn);
  }
  return expandBtn;
}

function runCatBarScrollHint(bar, wrapper, expandBtn) {
  const { scrollWidth, clientWidth } = bar;
  if (scrollWidth <= clientWidth + 20) return;

  expandBtn.classList.add('nudge');
  expandBtn.addEventListener('animationend', () => expandBtn.classList.remove('nudge'), { once: true });

  const peekDist = Math.min(60, scrollWidth - clientWidth);
  bar.style.scrollBehavior = 'smooth';
  bar.scrollLeft = peekDist;
  setTimeout(() => { bar.scrollLeft = 0; }, 500);

  let hintBar = wrapper.querySelector('.scroll-hint-bar');
  if (!hintBar) {
    hintBar = document.createElement('div');
    hintBar.className = 'scroll-hint-bar';
    wrapper.appendChild(hintBar);
  }
  setTimeout(() => hintBar.classList.add('flash'), 100);
  setTimeout(() => hintBar.classList.remove('flash'), 1200);
}

/**
 * Unified category bar: horizontal scroll, edge fades, and expand/collapse.
 * Upgrades legacy .cat-bar-wrap (arrow navigation) automatically.
 */
export function initCatBarExpander({
  barId = 'catBar',
  wrapperId = 'catWrapper',
  hintOnLoad = false,
} = {}) {
  const bar = document.getElementById(barId);
  if (!bar) return;

  const wrapper = ensureCatScrollWrapper(bar, wrapperId);
  ensureCatExpandButton(bar);

  const expandBtn = bar.querySelector('.cat-expand-btn');
  const expandCount = expandBtn?.querySelector('.expand-count');

  function getPills() {
    return bar.querySelectorAll(CAT_PILL_SELECTOR);
  }

  function countHiddenPills() {
    if (!expandBtn || !expandCount) return;
    if (wrapper.classList.contains('expanded')) {
      expandBtn.disabled = false;
      expandCount.textContent = '';
      expandBtn.title = 'Colapsar';
      return;
    }

    const barRect = bar.getBoundingClientRect();
    const expandReserve = (expandBtn?.offsetWidth || 36) + 8;
    const visibleLeft = barRect.left + 4;
    const visibleRight = barRect.right - expandReserve;
    let hidden = 0;
    getPills().forEach((pill) => {
      const rect = pill.getBoundingClientRect();
      const fullyVisible = rect.left >= visibleLeft - 1 && rect.right <= visibleRight + 1;
      if (!fullyVisible) hidden++;
    });

    const hasOverflow = bar.scrollWidth > bar.clientWidth + 20;
    expandCount.textContent = hidden > 0 ? `+${hidden}` : '';
    expandBtn.title = hidden > 0 ? `${hidden} más` : 'Ver todas';
    expandBtn.disabled = !hasOverflow && hidden === 0;
  }

  function updateFades() {
    if (wrapper.classList.contains('expanded')) return;
    const { scrollLeft, scrollWidth, clientWidth } = bar;
    wrapper.classList.toggle('fade-left', scrollLeft > 8);
    wrapper.classList.toggle('fade-right', scrollLeft + clientWidth < scrollWidth - 8);
    countHiddenPills();
  }

  if (expandBtn) {
    expandBtn.onclick = () => {
      const expanded = wrapper.classList.toggle('expanded');
      expandBtn.setAttribute('aria-expanded', expanded);
      if (expanded) {
        if (expandCount) expandCount.textContent = '';
        expandBtn.title = 'Colapsar';
        return;
      }

      const active = bar.querySelector(`${CAT_PILL_SELECTOR}.active`);
      if (active) {
        bar.style.scrollBehavior = 'auto';
        requestAnimationFrame(() => {
          active.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'instant' });
          bar.style.scrollBehavior = '';
        });
      }
      requestAnimationFrame(updateFades);
    };
  }

  if (!wrapper.getAttribute(CAT_EXPANDER_INIT)) {
    wrapper.setAttribute(CAT_EXPANDER_INIT, '1');

    bar.addEventListener('scroll', updateFades, { passive: true });
    new MutationObserver(updateFades).observe(bar, { childList: true });
    new MutationObserver(() => {
      if (!wrapper.classList.contains('expanded')) updateFades();
    }).observe(wrapper, { attributes: true, attributeFilter: ['class'] });
    new ResizeObserver(updateFades).observe(bar);

    // El "+N" salía vacío en algunos celulares hasta que el usuario tocaba
    // la barra: el primer cálculo (rAF de abajo) corre antes de que
    // 'Newsreader'/mono terminen de cargar, mide los pills con la fuente de
    // reemplazo (más angosta) y los da por "visibles" — el ResizeObserver de
    // arriba no lo detecta porque el ancho del propio `bar` no cambia, solo
    // el de sus hijos. Recalcular cuando las fuentes ya cargaron (y con un
    // setTimeout de respaldo para navegadores sin document.fonts) corrige el
    // conteo sin esperar a que el usuario haga scroll.
    document.fonts?.ready?.then(updateFades).catch(() => {});
    setTimeout(updateFades, 500);

    if (hintOnLoad) {
      setTimeout(() => runCatBarScrollHint(bar, wrapper, expandBtn), 400);
    }
  }

  requestAnimationFrame(updateFades);
}

/**
 * Renders a category picker bar (used by sentence-quiz-engine and
 * typed-answer-engine — identical markup/behavior in both, only the current
 * category is engine-local state, so it's read/written via getter/setter).
 */
export function renderCatBar({ containerId = 'catBar', categories, getCurrentCat, setCurrentCat, onChange, formatLabel }) {
  const bar = document.getElementById(containerId);
  const expandBtn = bar.querySelector('.cat-expand-btn');
  const catKeys = Object.keys(categories);
  const pills = catKeys.map((k) => {
    const cat = categories[k];
    const label = formatLabel ? formatLabel(k, cat) : `${cat.icon} ${cat.label}`;
    const pillTitle = cat.label || k;
    return `<button class="cat-btn ${k === getCurrentCat() ? 'active' : ''}" data-cat="${k}" title="${pillTitle}" aria-label="${pillTitle}">${label}</button>`;
  }).join('');
  bar.querySelectorAll('.cat-btn').forEach(el => el.remove());
  if (expandBtn) expandBtn.insertAdjacentHTML('afterend', pills);
  else bar.innerHTML = pills;
  // Double-click detection: persist the tracker on the bar element itself so it
  // survives rebuilds (renderCatBar is called on every category switch).
  if (!bar._lastCatClick) bar._lastCatClick = { key: null, time: 0 };
  bar.querySelectorAll('[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.cat;
      const now = Date.now();
      const isDoubleClick = bar._lastCatClick.key === key && (now - bar._lastCatClick.time) < 400;
      bar._lastCatClick = { key, time: now };
      setCurrentCat(key);
      bar.querySelectorAll('[data-cat]').forEach(b => b.classList.toggle('active', b.dataset.cat === getCurrentCat()));
      // Double-click: collapse the expanded panel
      if (isDoubleClick) {
        const wrapper = document.getElementById('catWrapper');
        if (wrapper?.classList.contains('expanded')) {
          wrapper.classList.remove('expanded');
          bar.querySelector('.cat-expand-btn')?.setAttribute('aria-expanded', 'false');
        }
      }
      onChange();
    });
  });

  initCatBarExpander({ barId: containerId });

  // Los pills se reconstruyen en cada cambio de categoría: hay que repintar los ✓.
  refreshModuleCompletionMarks();
}

/** Toggles `.active` on the `[data-mode]` pill matching `mode` — shared by
 *  wireModeTabs() and by exercises that switch mode programmatically (e.g.
 *  an onStudy callback jumping back to Study). */
export function syncModeTabsActive(mode) {
  document.querySelectorAll('[data-mode]').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
}

/** Wires click handlers on every `[data-mode]` pill: sets the mode, syncs the
 *  active state, and calls onChange() to (re)start the exercise. */
export function wireModeTabs({ getMode, setMode, onChange }) {
  document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      setMode(btn.dataset.mode);
      syncModeTabsActive(getMode());
      onChange();
    });
  });
}

/** Groups a Timer instance with its total duration so both can be reset in
 *  one call (used by sentence-quiz-engine and typed-answer-engine). */
export function makeTimerState() {
  return {
    timer: null,
    timedSeconds: 0,
    stop() {
      if (this.timer) { this.timer.stop(); this.timer = null; }
      this.timedSeconds = 0;
    },
  };
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
