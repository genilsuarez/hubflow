/* ═══════════════════════════════════════════════════════
   HubFlow — Text-to-Speech (Web Speech API) shared helper
   ═══════════════════════════════════════════════════════ */

/** Returns true if the browser supports speech synthesis. */
export function isSpeechAvailable() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/**
 * Speak text aloud using the Web Speech API.
 * @param {string} text - The text to speak.
 * @param {object} [opts] - { lang='en-GB', rate=0.85, pitch=1 }
 */
export function speak(text, { lang = 'en-GB', rate = 0.85, pitch = 1 } = {}) {
  if (!isSpeechAvailable() || !text) return;
  // Síncrono dentro del gesto de usuario (click) a propósito: Safari/iOS
  // bloquea silenciosamente speechSynthesis.speak() si se difiere con
  // setTimeout/promise fuera de esa pila síncrona, aunque sea 0ms.
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = rate;
  u.pitch = pitch;
  window.speechSynthesis.speak(u);
}

/**
 * ¿Hay alguna voz instalada para este idioma? Antes de forzar `lang` a algo
 * como "es-ES" conviene comprobarlo: en algunos navegadores/dispositivos, si
 * no existe ninguna voz que matchee el lang pedido, el utterance se descarta
 * en silencio (no hay fallback a la voz por defecto) en vez de sonar en otro
 * idioma. `getVoices()` puede devolver `[]` antes de que cargue la lista
 * async (evento `voiceschanged`) — en ese caso se asume que sí hay voz para
 * no bloquear el idioma por una carrera de timing.
 */
export function hasVoiceForLang(lang) {
  if (!isSpeechAvailable() || !lang) return true;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return true;
  const prefix = lang.split('-')[0].toLowerCase();
  return voices.some((v) => v.lang.toLowerCase().startsWith(prefix));
}
