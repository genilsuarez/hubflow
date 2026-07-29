/**
 * HubFlow — Learning Paths
 * Curated module groupings shown on the dashboard's "Rutas" card and the
 * "Mi Progreso" accordion. Order within `modules` is the suggested sequence.
 */

export const LEARNING_PATHS = [
  {
    id: 'spell-it-right', title: 'Spell It Right', icon: '✏️', color: 'spell', cefr: 'A1 → B1',
    description: 'De la regla al oído al texto: domina la ortografía del inglés cruzando gramática, pronunciación y producción escrita.',
    modules: ['plural-endings', 'ing-spelling', 'ed-spelling', 'spelling-by-ear', 'confusing-words', 'paragraph-cloze', 'word-formation'],
  },
  {
    id: 'build-sentences', title: 'Build Sentences', icon: '🧱', color: 'build', cefr: 'A1 → B1',
    description: 'De piezas sueltas a oraciones completas: aprende las partes, combínalas, y verifica que el orden sea correcto.',
    modules: ['parts-of-speech', 'articles', 'tenses', 'prepositions', 'vocabulary', 'word-order', 'collocations', 'sentence-combining'],
  },
  {
    id: 'decode-speech', title: 'Decode Speech', icon: '👂', color: 'decode', cefr: 'A2 → B1',
    description: 'Del fonema al párrafo completo: entrena a decodificar el inglés hablado combinando sonido, vocabulario y transcripción.',
    modules: ['phonics', 'pron-vowels', 'confusing-words', 'listening', 'dictation-sprint', 'word-stress-quiz', 'pron-connected', 'phrasal-verbs'],
  },
  {
    id: 'sound-natural', title: 'Sound Natural', icon: '🗣️', color: 'natural', cefr: 'A2 → B1',
    description: 'De correcto a fluido: colocaciones naturales, connected speech, registro y las estructuras que usan los nativos.',
    modules: ['confusing-words', 'phrasal-verbs', 'collocations', 'pron-intonation', 'pron-connected', 'causative-verbs', 'preferences', 'register-switch'],
  },
  {
    id: 'transform-produce', title: 'Transform & Produce', icon: '🔄', color: 'transform', cefr: 'A2 → B1',
    description: 'Expresar lo mismo de formas distintas: transformaciones gramaticales, paráfrasis y producción activa.',
    modules: ['comparisons', 'opposites', 'odd-one-out', 'gerunds-infinitives', 'reported-speech', 'noun-adjuncts', 'paraphrasing', 'register-switch'],
  },
  {
    id: 'advanced-mastery', title: 'Advanced Mastery', icon: '🏆', color: 'advanced', cefr: 'B2 → C1',
    description: 'Domina las estructuras avanzadas del inglés: inversiones, colocaciones académicas, cleft sentences y vocabulario C1.',
    modules: ['advanced-collocations', 'inversions', 'vocab-pack-sound-natural', 'paraphrasing', 'register-switch', 'vocab-pack-c1', 'cleft-emphasis'],
  },
];
