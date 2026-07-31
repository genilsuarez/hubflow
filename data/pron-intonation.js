export const CATEGORIES = {
  intonation: {
    label: "📈 Intonation Patterns",
    items: [
      { term: "Falling (statement)", es: "Descendente (afirmación)", meaning: "Pitch goes DOWN at the end — statements, wh-questions", emoji: "⬇️", example: "I'm going HOME. ↘ / WHERE do you live? ↘" },
      { term: "Rising (yes/no)", es: "Ascendente (sí/no)", meaning: "Pitch goes UP at the end — yes/no questions", emoji: "⬆️", example: "Are you COMING? ↗ / Is this YOURS? ↗" },
      { term: "Fall-rise (but...)", es: "Descendente-ascendente", meaning: "Pitch falls then rises — uncertainty, 'but' implied", emoji: "↩️", example: "I LIKE it... ↘↗ (but I'm not sure)" },
      { term: "Rise-fall (surprise)", es: "Ascendente-descendente", meaning: "Pitch rises then drops — surprise or strong feeling", emoji: "😮", example: "Really?! ↗↘ / That's AMAZING! ↗↘" },
      { term: "Tag questions (sure)", es: "Tag confirmando", meaning: "Falling tag = you expect agreement", emoji: "✅", example: "Nice day, ISN'T it? ↘ (I'm sure)" },
      { term: "Echo question", es: "Pregunta eco", meaning: "Repeating with rising pitch = surprise/disbelief", emoji: "🔁", example: "He did WHAT? ↗ / She's HOW old? ↗" },
      { term: "Tag questions (checking)", es: "Tag preguntando (dudando)", meaning: "Rising tag = you're not sure, genuinely asking", emoji: "❓", example: "You're coming, AREN'T you? ↗ (I'm not sure)" },
      { term: "Listing intonation", es: "Entonación de listas", meaning: "Rise on each item except the last, which falls", emoji: "📋", example: "I need eggs↗, milk↗, bread↗ and butter↘." },
      { term: "Alternative questions", es: "Preguntas alternativas", meaning: "Rise on the first option, fall on the last", emoji: "🍵", example: "Would you like tea↗ or coffee↘?" },
      { term: "Wh-question softened", es: "Wh-question suavizada", meaning: "Rising pitch on a wh-question sounds gentler, more polite", emoji: "🙂", example: "What's your NAME? ↗ (friendly, softer)" },
      { term: "Statement as question", es: "Afirmación como pregunta", meaning: "A rising pitch on a statement turns it into a question, without changing word order", emoji: "❓", example: "You're leaving? ↗ (surprised, checking)" },
      { term: "Polite request rise-fall", es: "Petición cortés", meaning: "A gentle rise-fall softens a request and sounds more polite", emoji: "🙏", example: "Could you help me? ↗↘ (warm, not demanding)" },
      { term: "Neutral wh-question", es: "Wh-question neutra", meaning: "Falling pitch on a wh-question is the default, neutral tone", emoji: "➡️", example: "WHERE are you going? ↘ (simple information request)" },
      { term: "Contradiction fall-rise", es: "Contradicción", meaning: "A fall-rise signals a polite disagreement or correction", emoji: "🤨", example: "Well, I don't think so... ↘↗" },
    ]
  },
  sentenceStress: {
    label: "💪 Sentence Stress",
    items: [
      { term: "Content words stressed", es: "Palabras de contenido = fuertes", meaning: "Nouns, main verbs, adjectives, adverbs get stress", emoji: "🔊", example: "I BOUGHT a NEW CAR yesToday." },
      { term: "Function words weak", es: "Palabras función = débiles", meaning: "Articles, prepositions, pronouns are weak/fast", emoji: "🔈", example: "I went to the SHOP for some BREAD." },
      { term: "Stress for contrast", es: "Estrés contrastivo", meaning: "Move stress to show what's new/important info", emoji: "⚡", example: "I said BLUE, not GREEN." },
      { term: "De-stress 'the'", es: "Debilitar 'the'", meaning: "'The' is /ðə/ before consonants, /ði/ before vowels", emoji: "📰", example: "the /ðə/ book vs the /ði/ apple" },
      { term: "Weak 'to'", es: "Debilitar 'to'", meaning: "'To' reduces to /tə/ in connected speech", emoji: "➡️", example: "I want to go = I want /tə/ go" },
      { term: "Stress-timed rhythm", es: "Ritmo acentual", meaning: "English squeezes unstressed syllables between stresses", emoji: "🥁", example: "DOGS chase CATS (2 beats) = The DOGS will be CHASing the CATS (still 2 beats)" },
      { term: "Compound noun stress", es: "Estrés en sustantivos compuestos", meaning: "First word stressed: BLACKboard, not black BOARD", emoji: "📦", example: "WHITE house (a house) vs WHITEhouse (the building)" },
      { term: "Auxiliary stressed for emphasis", es: "Auxiliar acentuado para énfasis", meaning: "Normally-weak auxiliaries (do/is/have) get stressed to emphasize truth or contradict", emoji: "💥", example: "I DO like it! (contradicting 'you don't like it')" },
      { term: "New information stressed", es: "Información nueva = acentuada", meaning: "First mention of information gets stress; once known, it's said weakly", emoji: "🆕", example: "I saw a CAT. The cat was black." },
      { term: "Numbers and negatives stressed", es: "Números y negativos acentuados", meaning: "Numbers and negative words (not, never, no) almost always carry stress", emoji: "🔢", example: "I have THREE cats. I do NOT agree." },
      { term: "Question word stressed", es: "Palabra interrogativa acentuada", meaning: "The wh-word usually carries the main stress in a question", emoji: "❓", example: "WHERE did you put it?" },
      { term: "Adverb of manner stressed", es: "Adverbio de modo acentuado", meaning: "Adverbs like 'quickly', 'carefully' carry stress as content words", emoji: "🏃", example: "She spoke very QUICKly." },
      { term: "Modal verbs weak in mid-sentence", es: "Modales débiles en medio de la oración", meaning: "Modals like 'can', 'will' are usually weak unless emphasized", emoji: "🔈", example: "I can /kən/ swim. (weak, normal)" },
    ]
  },
  rhythm: {
    label: "🥁 English Rhythm",
    items: [
      { term: "Stress-timed", es: "Ritmo acentual (inglés)", meaning: "Time between stresses is roughly equal — unstressed syllables compressed", emoji: "🇬🇧", example: "CATS CHASE MICE = caTERpillars are EATing the LEAVES (same rhythm)" },
      { term: "Syllable-timed", es: "Ritmo silábico (español)", meaning: "Each syllable gets equal time — Spanish rhythm, NOT English", emoji: "🇪🇸", example: "Spanish: ca-da-sí-la-ba-i-gual. English: NOT like this." },
      { term: "Weak forms", es: "Formas débiles", meaning: "Common words have a 'weak' version in natural speech", emoji: "🔉", example: "was→/wəz/, can→/kən/, are→/ə/, have→/əv/" },
      { term: "Strong forms", es: "Formas fuertes", meaning: "Used at sentence end, in contrast, or emphasis", emoji: "🔊", example: "Yes I CAN /kæn/. I WAS /wɒz/ there." },
      { term: "Thought groups", es: "Grupos de significado", meaning: "We pause between meaningful chunks, not random words", emoji: "💬", example: "The man / who called yesterday / is my boss." },
      { term: "Linking R", es: "R de enlace", meaning: "A silent R is pronounced when next word starts with a vowel", emoji: "🔗", example: "far away → /fɑːr əˈweɪ/, water and → /wɔːtər ænd/" },
      { term: "Glottal stop", es: "Parada glotal /ʔ/", meaning: "A catch in the throat replacing /t/ in casual speech", emoji: "⛔", example: "butter → /bʌʔə/, bottle → /bɒʔl/" },
      { term: "Linking consonant-vowel", es: "Enlace consonante-vocal", meaning: "A final consonant links smoothly to the vowel that starts the next word", emoji: "🔗", example: "turn it off → /tɜːr nɪ tɒf/ (sounds joined)" },
      { term: "Elision", es: "Elisión", meaning: "A sound is dropped entirely in fast, connected speech", emoji: "✂️", example: "next day → /neks deɪ/ (the /t/ disappears)" },
      { term: "Assimilation", es: "Asimilación", meaning: "A sound changes to become more like the sound next to it", emoji: "🔄", example: "handbag → /hæmbæg/ (n becomes m before b)" },
      { term: "Contracted forms", es: "Formas contraídas", meaning: "Contractions like 'I'll', 'we're' keep the rhythm compact and natural", emoji: "✂️", example: "I'll /aɪl/ call you. = quicker than 'I will'." },
      { term: "Pause for emphasis", es: "Pausa para énfasis", meaning: "A short pause before a key word draws attention to it", emoji: "⏸️", example: "The answer is... NO." },
      { term: "Reduced auxiliary 'have'", es: "Auxiliar 'have' reducido", meaning: "'Have' reduces to /əv/ or /v/ after pronouns in fast speech", emoji: "🔉", example: "I should've /ʃʊdəv/ called." },
    ]
  },
};
