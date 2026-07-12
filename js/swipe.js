/**
 * HubFlow — Swipe Navigation Utility
 * Detects horizontal swipe gestures on a target element.
 * Calls onNext (swipe left) or onPrev (swipe right).
 *
 * @param {HTMLElement} el - Element to attach touch listeners
 * @param {{ onNext: Function, onPrev: Function }} callbacks
 * @returns {Function} cleanup — call to remove listeners
 */
export function initSwipe(el, { onNext, onPrev }) {
  const THRESHOLD = 50;
  const MAX_VERTICAL = 80;
  let startX = 0;
  let startY = 0;

  function onTouchStart(e) {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
  }

  function onTouchEnd(e) {
    const touch = e.changedTouches[0];
    const dx = touch.clientX - startX;
    const dy = Math.abs(touch.clientY - startY);
    if (dy > MAX_VERTICAL) return; // vertical scroll, ignore
    if (dx < -THRESHOLD) onNext();
    else if (dx > THRESHOLD) onPrev();
  }

  el.addEventListener('touchstart', onTouchStart, { passive: true });
  el.addEventListener('touchend', onTouchEnd, { passive: true });

  return () => {
    el.removeEventListener('touchstart', onTouchStart);
    el.removeEventListener('touchend', onTouchEnd);
  };
}
