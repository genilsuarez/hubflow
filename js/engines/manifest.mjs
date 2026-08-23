/**
 * manifest.mjs — Contrato de claves de progreso de cada engine.
 *
 * Por qué existe: scripts/lib/derive-catalog.mjs necesita saber qué escribe
 * cada ejercicio en localStorage para validar PROGRESS_RULES. Antes lo deducía
 * con regex sobre el HTML de cada página (`recordScore(\`…${currentCat}…\`)`),
 * así que cualquier cambio dentro de un engine —añadir el sufijo `-timed`, por
 * ejemplo— quedaba invisible para el validador y el gate de build se caía sin
 * que nada apuntara a la causa. Aquí la convención se declara una sola vez,
 * junto a los engines.
 *
 * Regla al tocar un engine: si cambia la clave que pasa a `recordScore()`,
 * `recordStudyItemSeen()` o `matchScoreKey`, se actualiza su entrada aquí.
 * `node scripts/validate-content.js` falla si las dos cosas se separan.
 *
 * Sin dependencias de DOM ni de navegador — lo importa Node.
 *
 * Campos:
 *   init         Símbolo que la página importa. Es lo que identifica al engine
 *                dentro del HTML.
 *   prefixField  Nombre de la propiedad del config donde va el prefijo.
 *   suffixes     Sufijos que el engine añade a `${prefix}-${categoría}`.
 *                `''` = la clave va sin sufijo.
 *   match        true si el engine usa createMatchMode() (clave `-match`).
 *   derive       Casos que no salen de `suffixes`: los modos/niveles vienen del
 *                markup de la página. Ver derive-catalog.mjs.
 */

export const ENGINES = {
  'sentence-quiz-engine.js': {
    init: 'initSentenceQuiz',
    prefixField: 'scoreKeyPrefix',
    suffixes: ['quiz', 'timed', 'study'],
  },
  'typed-answer-engine.js': {
    init: 'initTypedAnswerQuiz',
    prefixField: 'scoreKeyPrefix',
    suffixes: ['', 'timed'],
  },
  'dictation-engine.js': {
    init: 'initDictation',
    prefixField: 'scoreKeyPrefix',
    suffixes: ['', 'timed'],
  },
  'word-choice-engine.js': {
    init: 'initWordChoice',
    prefixField: 'scoreKeyPrefix',
    suffixes: ['', 'timed', 'study'],
  },
  'text-hunt-engine.js': {
    init: 'initTextHunt',
    prefixField: 'scoreKeyPrefix',
    suffixes: ['', 'timed'],
  },
  'listening-engine.js': {
    init: 'initListening',
    prefixField: 'scoreKeyPrefix',
    suffixes: ['', 'timed'],
  },
  'odd-one-out-engine.js': {
    init: 'initOddOneOut',
    prefixField: 'scoreKeyPrefix',
    suffixes: ['', 'timed'],
  },
  'paragraph-cloze-engine.js': {
    init: 'initParagraphCloze',
    prefixField: 'scoreKeyPrefix',
    suffixes: ['', 'timed'],
  },
  'spelling-by-ear-engine.js': {
    init: 'initSpellingByEar',
    prefixField: 'scoreKeyPrefix',
    suffixes: ['', 'timed'],
  },
  'prepositions-engine.js': {
    init: 'initPrepositions',
    prefixField: 'scoreKeyPrefix',
    suffixes: ['', 'timed', 'study'],
  },
  'tenses-engine.js': {
    init: 'initTenses',
    prefixField: 'scoreKeyPrefix',
    suffixes: ['', 'timed', 'study'],
  },
  'word-formation-engine.js': {
    init: 'initWordFormation',
    prefixField: 'scoreKeyPrefix',
    suffixes: ['', 'timed', 'study'],
  },
  'phonics-engine.js': {
    init: 'initPhonics',
    prefixField: 'scoreKeyPrefix',
    suffixes: ['', 'timed', 'study'],
    match: true,
  },
  'verb-chunks-engine.js': {
    init: 'initVerbChunks',
    prefixField: 'scoreKeyPrefix',
    suffixes: ['', 'timed', 'study', 'write', 'sort'],
  },
  'phrasal-verbs-engine.js': {
    init: 'initPhrasalVerbs',
    prefixField: 'scoreKeyPrefix',
    suffixes: ['quiz', 'timed', 'study', 'write', 'sort'],
    match: true,
  },
  'irregular-verbs-engine.js': {
    init: 'initIrregularVerbs',
    prefixField: 'scoreKeyPrefix',
    suffixes: ['quiz', 'timed', 'study', 'sort', 'write'],
    match: true,
  },
  'flashcard-engine.js': {
    init: 'FlashcardEngine',
    prefixField: 'storagePrefix',
    // Los modos jugables los declara cada página (`modes: [...]`), no el engine.
    derive: 'flashcard',
  },
  'spelling-typing-engine.js': {
    init: 'initSpellingTyping',
    prefixField: 'storagePrefix',
    // La clave es `${prefix}-${nivel}-${modo}`: los niveles son [data-level] y
    // los modos [data-mode] de la página.
    derive: 'spelling',
  },
};

/** Entrada del manifiesto correspondiente al HTML de un ejercicio, o null. */
export function engineOf(html) {
  for (const [file, spec] of Object.entries(ENGINES)) {
    if (html.includes(`engines/${file}`) && html.includes(spec.init)) {
      return { file, ...spec };
    }
  }
  return null;
}
