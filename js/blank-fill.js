/* ═══════════════════════════════════════════════════════
   HubFlow — Blank Filling
   Sustituye `___` por el span de hueco en las frases de quiz/study,
   compartido por los engines de tipo "sentence + opciones/typed answer".
   ═══════════════════════════════════════════════════════ */

/**
 * Rellena todos los huecos de la frase, no solo el primero: hay items con dos
 * `___` cuya respuesta viene como par ("was cooking, arrived"). Con un
 * `.replace('___', ...)` la respuesta entera caía en el primer hueco y el
 * segundo se quedaba literal. Si el número de partes coincide con el de
 * huecos se reparten en orden; si no, la respuesta va al primer hueco y el
 * resto queda marcado con "?".
 *
 * A diferencia de un intento anterior, esto NO se come el espacio literal
 * alrededor de "___": ese espacio es el único punto donde el navegador puede
 * cortar de línea. Quitarlo pegaba la palabra anterior y la siguiente al
 * span (sin espacio de por medio no hay dónde partir), y el texto terminaba
 * reordenado de forma rara al ajustar línea (bug reportado 2026-08-22). El
 * span en sí no lleva padding (ver `.blank` en sentence-quiz.css) — el
 * espacio real de la frase ya es el separador, así que no hay doble hueco.
 */
export function fillBlanks(sentence, filler, wrap = t => t) {
  const holes = (sentence.match(/___/g) || []).length;
  const parts = (holes > 1 && typeof filler === 'string' && filler.split(',').length === holes)
    ? filler.split(',').map(s => s.trim())
    : null;
  let i = -1;
  return sentence.replace(/___/g, () => {
    i++;
    return wrap(parts ? parts[i] : (i === 0 ? filler : '?'));
  });
}

const defaultWrap = t => `<span class="blank">${t}</span>`;

/** Atajo para el caso común de un solo hueco envuelto en el span estándar. */
export function blankHTML(sentence, filler) {
  return fillBlanks(sentence, filler, defaultWrap);
}
