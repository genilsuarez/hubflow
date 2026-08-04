/**
 * HubFlow — Learning Paths
 * Curated module groupings shown on the dashboard's "Rutas" card and the
 * "Mi Progreso" accordion. Order within `modules` is the suggested sequence.
 *
 * INVARIANTES (validadas en CI por scripts/validate-content.js):
 *   - PATH-ID        todo id existe en catalog.js
 *   - PATH-ORDER     los módulos van de menor a mayor CEFR (principio 5)
 *   - PATH-DUP       un id no se repite dentro de la misma ruta
 *   - PATH-SECTIONS  la ruta cruza ≥3 de las 4 secciones (principio 2), salvo
 *                    las marcadas `deepDive` — ver más abajo
 * El rango CEFR NO se declara aquí: se deriva de los módulos con
 * `pathCefrRange()`. Un string en duro ya mintió antes — cuando el catálogo
 * re-niveló pron-connected, causative-verbs y register-switch de B1 a B2, tres
 * rutas siguieron anunciando "A2 → B1" durante todo el rebalanceo de julio 2026.
 *
 * `deepDive: true` — excepción explícita al principio 2, solo para las dos
 * rutas de pronunciación. Los 11 módulos de pron por encima de A2 no tienen
 * pareja temática en otras secciones: o son una ruta de una sola categoría, o
 * quedan fuera del sistema guiado (Pronunciation C1 estaba en 0/5). El resto de
 * las rutas sigue cruzando 3 o 4 secciones.
 */

import { moduleMap, TAGS } from './catalog.js';

export const LEARNING_PATHS = [
  // ─── Fundamentos ─────────────────────────────────────────────────────────
  {
    id: 'first-words', title: 'First Words', icon: '🌱',
    description: 'El arranque absoluto: las letras, las primeras palabras y el verbo to be, hasta armar tu primera oración y tu primera pregunta.',
    modules: ['a1-alphabet-sounds', 'colors-shapes', 'family-relationships', 'a1-to-be-have', 'a1-pronouns-possessives', 'a1-demonstratives', 'a1-questions', 'a1-sentence-build'],
  },
  {
    id: 'everyday-life', title: 'Everyday Life', icon: '🏡',
    description: 'El inglés de la casa, la comida y la tienda: el vocabulario que usas todos los días, con los números y las cantidades que lo acompañan.',
    modules: ['house-rooms', 'food-drink', 'a1-some-any-quantity', 'clothing-shopping', 'places-directions', 'pron-numbers', 'kitchen-cooking', 'shopping-retail'],
  },
  {
    id: 'describe-narrate', title: 'Describe & Narrate', icon: '🖼️',
    description: 'Describir lo que ves y lo que pasa: personas, animales, clima y rutina, con el acento en el lugar correcto.',
    modules: ['body-appearance', 'animals-nature-basic', 'time-weather-seasons', 'school-classroom', 'a1-imperatives', 'a1-word-stress-basic', 'a1-match-meaning', 'a2-adverbs-frequency-manner'],
  },
  {
    id: 'write-it-right', title: 'Write It Right', icon: '📝',
    description: 'Precisión al escribir desde el primer día: apóstrofos, plurales, puntuación y el ojo para cazar tus propios errores.',
    modules: ['a1-contractions', 'a1-plurals-possessives', 'sentence-reordering', 'pron-homophones', 'punctuation-fix', 'a2-sentence-order', 'a2-error-spot-basic', 'quantifiers'],
  },

  // ─── Intermedio ──────────────────────────────────────────────────────────
  {
    id: 'spell-it-right', title: 'Spell It Right', icon: '✏️',
    description: 'De la regla al oído al texto: domina la ortografía del inglés cruzando gramática, pronunciación y producción escrita.',
    modules: ['plural-endings', 'ing-spelling', 'ed-spelling', 'spelling-by-ear', 'apostrophe-traps', 'paragraph-cloze', 'word-formation'],
  },
  {
    id: 'build-sentences', title: 'Build Sentences', icon: '🧱',
    description: 'De piezas sueltas a oraciones completas: aprende las partes, combínalas, y verifica que el orden sea correcto.',
    modules: ['parts-of-speech', 'articles', 'tenses', 'prepositions', 'people-social-life', 'word-order', 'collocations', 'sentence-combining'],
  },
  {
    id: 'past-and-habit', title: 'Past & Habit', icon: '⏳',
    description: 'Contar lo que pasó y lo que solías hacer: verbos irregulares, pasados, condicionales y voz pasiva, terminando por cazar errores.',
    modules: ['a1-text-gap-fill', 'irregular-verbs', 'a2-past-simple-continuous', 'used-to', 'pron-diphthongs', 'conditionals', 'passive-voice', 'error-hunt'],
  },
  {
    id: 'everyday-fluency', title: 'Everyday Fluency', icon: '☕',
    description: 'Soltura en lo cotidiano: casa, salud, viajes y tecnología, más las expresiones e idioms que hacen que suene a conversación real.',
    modules: ['home-furniture', 'health-fitness', 'travel-airport', 'technology-internet', 'made-of', 'social-expressions', 'idioms', 'idiom-in-context'],
  },
  {
    id: 'decode-speech', title: 'Decode Speech', icon: '👂',
    description: 'Del fonema al párrafo completo: entrena a decodificar el inglés hablado combinando sonido, vocabulario y transcripción.',
    modules: ['pron-vowels', 'phonics', 'confusing-verbs', 'listening', 'dictation-sprint', 'word-stress-quiz', 'phrasal-verbs', 'pron-connected'],
  },
  {
    id: 'sound-natural', title: 'Sound Natural', icon: '🗣️',
    description: 'De correcto a fluido: colocaciones naturales, connected speech, registro y los matices de connotación que usan los nativos.',
    modules: ['confusing-verbs', 'phrasal-verbs', 'collocations', 'preferences', 'pron-intonation', 'pron-connected', 'causative-verbs', 'register-switch', 'word-quirks', 'b2-connotation-nuance'],
  },
  {
    id: 'transform-produce', title: 'Transform & Produce', icon: '🔄',
    description: 'Expresar lo mismo de formas distintas: transformaciones gramaticales, paráfrasis, sinónimos con matiz y producción activa.',
    modules: ['comparisons', 'opposites', 'odd-one-out', 'gerunds-infinitives', 'reported-speech', 'noun-adjuncts', 'paraphrasing', 'register-switch', 'b2-nuanced-synonyms'],
  },
  {
    id: 'grammar-backbone', title: 'Grammar Backbone', icon: '🦴',
    description: 'Las estructuras que sostienen el inglés intermedio: relativas, condicionales mixtas, futuros y cláusulas de participio.',
    modules: ['lookalike-words', 'grammar-confusions', 'clauses', 'b2-future-forms', 'b2-mixed-conditionals', 'b2-relative-advanced', 'b2-participle-clauses', 'b2-modals-deduction', 'b2-negative-affixes', 'key-word-transformation'],
  },
  {
    id: 'professional-english', title: 'Professional English', icon: '💼',
    description: 'El inglés del trabajo y el estudio: léxico de negocios, registro formal y los conectores que dan cohesión a un texto profesional.',
    modules: ['work-office', 'money-finance', 'education-study', 'verb-chunks', 'modals', 'b2-business-lexis', 'b2-formal-register', 'b2-media-technology', 'linking-words', 'text-cohesion'],
  },
  {
    id: 'world-society', title: 'World & Society', icon: '🌍',
    description: 'Hablar de lo que pasa en el mundo: medio ambiente, ciencia, cultura y sociedad, con el vocabulario y la argumentación para sostener la conversación.',
    modules: ['emotions-feelings', 'nature-environment', 'b2-travel-culture', 'b2-environment-sustainability', 'b2-modals-deduction', 'c1-professional-world', 'c1-science-technology', 'c1-law-politics-society', 'c1-argumentation'],
  },
  {
    id: 'clear-speech', title: 'Clear Speech', icon: '🎚️',
    deepDive: true,
    description: 'Que se te entienda sin esfuerzo: clusters, linking, formas débiles y el ritmo real de la oración en inglés.',
    modules: ['pron-consonants', 'pron-mispronunciations', 'pron-british-american', 'pron-linking-basic', 'pron-weak-forms', 'pron-sentence-stress', 'b2-thought-groups'],
  },

  // ─── Avanzado ────────────────────────────────────────────────────────────
  {
    id: 'advanced-mastery', title: 'Advanced Mastery', icon: '🏆',
    description: 'Domina las estructuras avanzadas del inglés: inversiones, cleft sentences, subjuntivo, aspecto y vocabulario C1.',
    modules: ['advanced-collocations', 'paraphrasing', 'register-switch', 'inversions', 'sound-natural', 'vocab-c1', 'cleft-emphasis', 'c1-subjunctive-unreal', 'c1-future-in-past', 'c1-aspect-time-nuance'],
  },
  {
    id: 'academic-argument', title: 'Academic & Argument', icon: '🎓',
    description: 'Escribir y argumentar como en la universidad: léxico académico, nominalización, raíces de las palabras, resumen y análisis del discurso.',
    modules: ['b2-academic-vocabulary', 'b2-abstract-nouns', 'b2-compound-words', 'c1-academic-lexis', 'c1-nominalisation', 'c1-advanced-word-formation', 'c1-etymology-roots', 'c1-argumentation', 'c1-summarising', 'c1-discourse-analysis'],
  },
  {
    id: 'c1-precision', title: 'C1 Precision', icon: '🎯',
    description: 'La última capa de precisión: colocaciones exactas, gradientes de connotación, atenuación, elipsis y control fino del registro.',
    modules: ['c1-collocation-mastery', 'c1-idiomatic-precision', 'c1-connotation-shades', 'c1-compounding-blends', 'c1-hedging-softening', 'c1-ellipsis-substitution', 'c1-fronting-emphasis', 'c1-register-precision'],
  },
  {
    id: 'native-prosody', title: 'Native Prosody', icon: '🎼',
    deepDive: true,
    description: 'La música del inglés a nivel nativo: énfasis contrastivo, prosodia de los marcadores del discurso y variación de acento.',
    modules: ['pron-contrastive-stress', 'c1-discourse-marker-prosody', 'pron-prosody-advanced', 'pron-connected-advanced', 'pron-accent-variation'],
  },
];

/**
 * Pasos de una ruta que sí resuelven contra el catálogo, con su nivel CEFR como
 * índice. Se conserva el `id` porque los ids huérfanos se saltan y las
 * posiciones dejarían de corresponder con `path.modules`.
 */
function cefrSteps(path) {
  return path.modules
    .map((id) => ({ id, level: TAGS.cefr.indexOf(moduleMap.get(id)?.cefr) }))
    .filter((step) => step.level >= 0);
}

/**
 * Rango CEFR real de una ruta, derivado del catálogo: `"A1 → B1"`, o `"B2"` si
 * todos sus módulos están en el mismo nivel. Cadena vacía si no resuelve nada.
 */
export function pathCefrRange(path) {
  const levels = cefrSteps(path).map((step) => step.level);
  if (!levels.length) return '';
  const min = TAGS.cefr[Math.min(...levels)].toUpperCase();
  const max = TAGS.cefr[Math.max(...levels)].toUpperCase();
  return min === max ? min : `${min} → ${max}`;
}

/**
 * Pares consecutivos que bajan de nivel CEFR. Vacío = la ruta cumple PATH-ORDER.
 * Lo consume validate-content.js; se exporta desde aquí para que la regla viva
 * junto a los datos que describe.
 */
export function pathCefrRegressions(path) {
  const steps = cefrSteps(path);
  const out = [];
  for (let i = 1; i < steps.length; i++) {
    if (steps[i].level < steps[i - 1].level) {
      out.push({ from: steps[i - 1].id, to: steps[i].id });
    }
  }
  return out;
}

/** Secciones del catálogo que toca una ruta — el principio 2 pide ≥3. */
export function pathSections(path) {
  return new Set(path.modules.map((id) => moduleMap.get(id)?.category).filter(Boolean));
}

/**
 * Etapas del grid. Se derivan del nivel al que la ruta te lleva ("si la
 * terminas, quedas en X"), no del nivel de entrada: una ruta que arranca en A1
 * y termina en B2 no es material de Fundamentos.
 */
export const PATH_STAGES = [
  { id: 'foundations', label: 'Fundamentos', hint: 'Primeros pasos, hasta A2' },
  { id: 'intermediate', label: 'Intermedio', hint: 'De A2 a B2' },
  { id: 'advanced', label: 'Avanzado', hint: 'Camino a C1' },
];

export function pathStage(path) {
  const levels = cefrSteps(path).map((step) => step.level);
  if (!levels.length) return 'intermediate';
  const target = TAGS.cefr[Math.max(...levels)];
  if (target === 'a1' || target === 'a2') return 'foundations';
  if (target === 'c1') return 'advanced';
  return 'intermediate';
}

/** Rutas agrupadas por etapa, en el orden de PATH_STAGES. Sin etapas vacías. */
export function pathsByStage() {
  return PATH_STAGES
    .map((stage) => ({ stage, paths: LEARNING_PATHS.filter((p) => pathStage(p) === stage.id) }))
    .filter((group) => group.paths.length > 0);
}
