// Migrado de LEVELS (spelling-engine.js, tipear + selector) a CATEGORIES
// (sentence-quiz-engine.js, tap-to-choose) — mismo patrón que
// a1-plurals-possessives.js: Study enseña la regla con ejemplos, Quiz la
// aplica con opciones, en vez de un <select> que ya mostraba las 3 opciones
// sin explicar nada primero. 2026-08-22.
//
// Los 4 niveles se mantienen como categorías (antes eran pestañas de nivel).
// Cada item conserva su `rule` (🔵 Noun+Noun · 🟢 -ing nominal · 🔴 's/of)
// como emoji al inicio de `explain`, igual que antes.
export const CATEGORIES = {
  beginner: {
    label: 'Beginner',
    icon: '🌱',
    studyCards: [
      { front: 'Noun + Noun 🔵', back: 'modifier stays SINGULAR', detail: "bus stop · car key · fire station (never 'buses stop')" },
      { front: '-ing nominal 🟢', back: 'activity/purpose + noun', detail: 'swimming pool · washing machine · sleeping bag' },
      { front: "Genitive 's / of 🔴", back: "living owner → 's · portion → of", detail: "dog's bone (owner) · cup of tea · piece of cake (portion)" },
    ],
    items: [
      { sentence: '___ stop', correct: 'bus', options: ['bus', "bus's", 'buses'], explain: "🔵 Noun+Noun: 'bus' stays singular as a modifier — never 'buses stop' or 'bus's stop'." },
      { sentence: '___ key', correct: 'car', options: ['car', "car's", 'cars'], explain: "🔵 Noun+Noun: 'car' modifies 'key' — no apostrophe, no plural." },
      { sentence: '___ station', correct: 'fire', options: ['fire', "fire's", 'fires'], explain: '🔵 Noun+Noun: type of station — the modifier stays singular.' },
      { sentence: '___ shift', correct: 'night', options: ['night', "night's", 'nights'], explain: '🔵 Noun+Noun: when the shift happens — modifier stays singular.' },
      { sentence: '___ pool', correct: 'swimming', options: ['swimming', 'swim', 'swum'], explain: "🟢 -ing nominal: the activity (swimming) defines the pool's purpose." },
      { sentence: '___ machine', correct: 'washing', options: ['washing', 'wash', 'washed'], explain: "🟢 -ing nominal: the machine's main function." },
      { sentence: '___ bag', correct: 'sleeping', options: ['sleeping', 'sleep', 'slept'], explain: '🟢 -ing nominal: what the bag is used for.' },
      { sentence: "dog's ___", correct: 'bone', options: ['bone', 'bones', 'toy'], explain: "🔴 Genitive 's: the bone belongs to the dog." },
      { sentence: 'cup of ___', correct: 'tea', options: ['tea', 'teas', 'coffee'], explain: "🔴 Partitive 'of': a portion of something uncountable." },
      { sentence: 'piece of ___', correct: 'cake', options: ['cake', 'cakes', 'bread'], explain: "🔴 Partitive 'of': a portion of something." },
    ],
  },
  intermediate: {
    label: 'Intermediate',
    icon: '📗',
    studyCards: [
      { front: 'Noun + Noun 🔵', back: 'still SINGULAR, even for roles', detail: 'car park · cook book · note pad · board room' },
      { front: '-ing nominal 🟢', back: 'the activity names the thing', detail: 'parking space · driving license · meeting room' },
      { front: "Genitive 's / of 🔴", back: "owner → 's · measurable content → of", detail: "team's decision (owner) · bottle of water · slice of pizza (content)" },
    ],
    items: [
      { sentence: '___ park', correct: 'car', options: ['car', "car's", 'cars'], explain: '🔵 Noun+Noun: type of parking.' },
      { sentence: '___ book', correct: 'cook', options: ['cook', "cook's", 'cooks'], explain: "🔵 Noun+Noun: 'cook' (the role) + book — modifier singular." },
      { sentence: '___ pad', correct: 'note', options: ['note', "note's", 'notes'], explain: '🔵 Noun+Noun: purpose of the pad — modifier singular.' },
      { sentence: '___ room', correct: 'board', options: ['board', "board's", 'boards'], explain: "🔵 Noun+Noun: 'board' (governing body) defines the room." },
      { sentence: '___ space', correct: 'parking', options: ['parking', 'park', 'parked'], explain: '🟢 -ing nominal: the activity defines the space.' },
      { sentence: '___ license', correct: 'driving', options: ['driving', 'drive', 'drove'], explain: '🟢 -ing nominal: the activity the license authorizes.' },
      { sentence: '___ room', correct: 'meeting', options: ['meeting', 'meet', 'met'], explain: '🟢 -ing nominal: the activity that happens there.' },
      { sentence: "team's ___", correct: 'decision', options: ['decision', 'decisions', 'choice'], explain: "🔴 Genitive 's: the decision belongs to the team." },
      { sentence: 'bottle of ___', correct: 'water', options: ['water', 'waters', 'juice'], explain: "🔴 Partitive 'of': container + measurable content." },
      { sentence: 'slice of ___', correct: 'pizza', options: ['pizza', 'pizzas', 'bread'], explain: "🔴 Partitive 'of': a countable portion." },
    ],
  },
  exceptions: {
    label: 'Exceptions',
    icon: '⚡',
    studyCards: [
      { front: 'Same word, different structure', back: 'structure changes the tone', detail: 'stone wall (plain) vs wall of stone (literary/emphatic)' },
      { front: '-ing can be the NUCLEUS too', back: 'not just the modifier', detail: 'software engineering — here "-ing" is the head noun, not the modifier' },
      { front: 'The SINGULAR rule has exceptions', back: 'a few modifiers stay plural', detail: 'shoe shop (singular) but some fixed compounds keep -s (see God Mode)' },
    ],
    items: [
      { sentence: '___ wall', correct: 'stone', options: ['stone', "stone's", 'stones'], explain: '🔵 Noun+Noun: plain material modifier — neutral tone.' },
      { sentence: 'wall of ___', correct: 'stone', options: ['stone', 'stones', 'rock'], explain: "🔴 'of' gives a more literary/emphatic tone — same meaning, different register." },
      { sentence: '___ engineer', correct: 'software', options: ['software', 'softwares', 'softly'], explain: "🔵 Noun+Noun: 'software' defines the engineer's domain." },
      { sentence: '___ engineering', correct: 'software', options: ['software', 'softwares', 'softly'], explain: "🟢 -ing nominal inverted: here '-ing' (engineering) is the NUCLEUS, not the modifier." },
      { sentence: 'manager of ___', correct: 'engineering', options: ['engineering', 'engineer', 'engineers'], explain: "🔴 'of' for roles + abstract disciplines (formal register)." },
      { sentence: '___ policy', correct: 'company', options: ['company', "company's", 'companies'], explain: '🔵 Noun+Noun: general domain — modifier singular.' },
      { sentence: "company's ___", correct: 'profit', options: ['profit', 'profits', 'policy'], explain: "🔴 Genitive 's: the profit belongs to the company." },
      { sentence: '___ room', correct: 'dining', options: ['dining', 'dine', 'dined'], explain: "🟢 -ing nominal: the room's habitual activity." },
      { sentence: '___ shop', correct: 'shoe', options: ['shoe', "shoe's", 'shoes'], explain: '🔵 SINGULAR RULE: the modifier is always singular, even though the shop sells many shoes.' },
      { sentence: '___ glass', correct: 'wine', options: ['wine', "wine's", 'wines'], explain: '🔵 Noun+Noun: type of glass, by what it usually holds.' },
    ],
  },
  god: {
    label: 'God Mode',
    icon: '💀',
    studyCards: [
      { front: 'Stacked modifiers', back: 'several nouns can chain before the head', detail: 'senior software engineer · chief technology officer' },
      { front: 'Fixed plural exceptions', back: 'a few modifiers stay plural', detail: 'sports car · savings account (also: clothes shop, arms race)' },
      { front: "Formal 'of' for abstract roles", back: 'hierarchy/discipline + person', detail: 'head of engineering · VP of product · board of directors' },
    ],
    items: [
      { sentence: 'senior ___ engineer', correct: 'software', options: ['software', 'softwares', 'soft'], explain: "🔵 Noun+Noun stack: 'software' modifies 'engineer', 'senior' modifies the whole thing." },
      { sentence: 'chief ___ officer', correct: 'technology', options: ['technology', 'technologies', 'technical'], explain: "🔵 Noun+Noun: 'technology' defines the executive's domain." },
      { sentence: '___ car', correct: 'sports', options: ['sports', 'sport', 'sporty'], explain: "🔵 EXCEPTION: 'sports' is a fixed plural modifier — 'sport car' is wrong here." },
      { sentence: '___ account', correct: 'savings', options: ['savings', 'saving', 'saved'], explain: "🔵 EXCEPTION: 'savings' stays plural in this fixed compound." },
      { sentence: '___ director', correct: 'engineering', options: ['engineering', 'engineer', 'engineers'], explain: '🟢 -ing nominal: the discipline leads the role.' },
      { sentence: '___ list', correct: 'waiting', options: ['waiting', 'wait', 'waited'], explain: '🟢 -ing nominal: the activity defines the list.' },
      { sentence: 'head of ___', correct: 'engineering', options: ['engineering', 'engineer', 'engineers'], explain: "🔴 'of' for leadership + abstract discipline (formal)." },
      { sentence: 'VP of ___', correct: 'product', options: ['product', 'products', 'production'], explain: "🔴 'of' in executive titles with an abstract domain." },
      { sentence: 'board of ___', correct: 'directors', options: ['directors', 'director', 'direction'], explain: "🔴 Fixed 'of': a body made up of people." },
      { sentence: "master's ___", correct: 'degree', options: ['degree', 'degrees', 'diploma'], explain: "🔴 Genitive 's fossilized in academic titles." },
    ],
  },
};
