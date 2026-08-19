// `studyCards` enseña la REGLA del par antes de examinarla en Quiz. Antes
// Study mostraba las mismas 10 frases del Quiz con la respuesta detrás — el
// examen disfrazado de flashcard, sin la regla enunciada en ningún lado.
// Mismo patrón que sentence-quiz-engine.js / a1-plurals-possessives.js.
export const CATEGORIES = {
  'less-fewer': {
    label: "Less / Fewer",
    icon: "📉",
    pairs: ["less","fewer"],
    studyCards: [
      { front: 'fewer + countable plural', back: 'fewer people, fewer cars, fewer mistakes', detail: 'Cuentas uno por uno: 1 car, 2 cars... → fewer.' },
      { front: 'less + uncountable', back: 'less money, less time, less traffic', detail: 'No cuentas uno por uno: money, time, traffic → less.' },
      { front: 'Trampa: -ics y colectivos', back: 'money, traffic, news, patience → uncountable', detail: 'Suenan a "cosas" pero son masas o conceptos sin plural real → less.' },
    ],
    items: [
      { sentence: "There are ___ people here today than yesterday.", correct: "fewer", explain: "'Fewer' with countable nouns: fewer people, fewer cars." },
      { sentence: "I have ___ money than I thought.", correct: "less", explain: "'Less' with uncountable nouns: less money, less time." },
      { sentence: "She eats ___ sugar now.", correct: "less", explain: "'Sugar' is uncountable → less." },
      { sentence: "We need ___ cars on the road.", correct: "fewer", explain: "'Cars' is countable → fewer." },
      { sentence: "He has ___ patience than his brother.", correct: "less", explain: "'Patience' is uncountable → less." },
      { sentence: "There were ___ mistakes in this essay.", correct: "fewer", explain: "'Mistakes' is countable → fewer." },
      { sentence: "I drink ___ coffee these days.", correct: "less", explain: "'Coffee' is uncountable → less." },
      { sentence: "There's ___ traffic on Sundays.", correct: "less", explain: "'Traffic' is uncountable → less." },
      { sentence: "___ tourists visit in winter.", correct: "Fewer", explain: "'Tourists' is countable → fewer." },
      { sentence: "I make ___ mistakes than before.", correct: "fewer", explain: "'Mistakes' is countable → fewer." },
    ]
  },
  'me-i': {
    label: "Me / I",
    icon: "🙋",
    pairs: ["me","I"],
    studyCards: [
      { front: "'I' = subject", back: 'does the action', detail: 'My friend and I went to the cinema. (yo fui, sujeto)' },
      { front: "'Me' = object", back: 'receives the action, or after a preposition', detail: "She gave the book to my friend and me. · Between you and me." },
      { front: 'Truco rápido', back: 'Quita la otra persona y prueba la frase sola', detail: '"Me went to the cinema" suena mal → es "I". "Give the book to I" suena mal → es "me".' },
    ],
    items: [
      { sentence: "My friend and ___ went to the cinema.", correct: "I", explain: "Subject of the sentence → 'I' (never 'me and my friend' as a formal subject)." },
      { sentence: "She gave the book to my friend and ___.", correct: "me", explain: "Object (after 'to') → 'me'." },
      { sentence: "He and ___ are best friends.", correct: "I", explain: "Subject of the sentence → 'I'." },
      { sentence: "Between you and ___, I think she's right.", correct: "me", explain: "After a preposition ('between') → 'me'." },
      { sentence: "My sister and ___ love to travel.", correct: "I", explain: "Subject of the sentence → 'I'." },
      { sentence: "Can you help my brother and ___?", correct: "me", explain: "Object of the verb 'help' → 'me'." },
      { sentence: "It was my colleague and ___ who finished the project.", correct: "I", explain: "Subject → 'I'." },
      { sentence: "The manager spoke to my colleague and ___.", correct: "me", explain: "Object (after 'to') → 'me'." },
      { sentence: "My parents and ___ are going on holiday.", correct: "I", explain: "Subject of the sentence → 'I'." },
      { sentence: "___ love spending time with my family.", correct: "I", explain: "Subject of the sentence → 'I'." },
    ]
  },
  'who-whom': {
    label: "Who / Whom",
    icon: "❓",
    pairs: ["who","whom"],
    studyCards: [
      { front: "'Who' = subject", back: 'does the action', detail: 'Who is coming? · The man who called...' },
      { front: "'Whom' = object", back: 'receives the action, or after a preposition', detail: 'To whom should I address this? · Tell me whom you invited.' },
      { front: 'Truco rápido', back: 'Responde con he/him', detail: 'Si respondes "he" → who. Si respondes "him" → whom. ("Whom" y "him" terminan en M.)' },
    ],
    items: [
      { sentence: "Do you know ___ is coming to the party?", correct: "who", explain: "'Who' = subject of the verb 'is coming'." },
      { sentence: "To ___ should I address this letter?", correct: "whom", explain: "'Whom' = object of the preposition ('to')." },
      { sentence: "Tell me ___ you invited.", correct: "whom", explain: "'Whom' = object of the verb 'invited'." },
      { sentence: "The man ___ called earlier left a message.", correct: "who", explain: "'Who' = subject of 'called'." },
      { sentence: "For ___ are these flowers?", correct: "whom", explain: "'Whom' = object of the preposition ('for')." },
      { sentence: "I wonder ___ won the race.", correct: "who", explain: "'Who' = subject of 'won'." },
      { sentence: "With ___ are you going?", correct: "whom", explain: "'Whom' = object of the preposition ('with')." },
      { sentence: "___ did you invite to the wedding?", correct: "Whom", explain: "'Whom' = object of the verb 'invite'." },
      { sentence: "___ is responsible for this mess?", correct: "Who", explain: "'Who' = subject of the verb 'is'." },
      { sentence: "The woman ___ I met yesterday is a doctor.", correct: "whom", explain: "'Whom' = object of 'met' in the relative clause." },
    ]
  },
  'affect-effect': {
    label: "Affect / Effect",
    icon: "🔄",
    pairs: ["affect","effect"],
    studyCards: [
      { front: "'Affect' = verb", back: 'to influence', detail: 'The weather can affect your mood.' },
      { front: "'Effect' = noun", back: 'the result', detail: 'The medicine had no effect. · side effects' },
      { front: 'Truco rápido', back: "'A'ffect = 'A'cción (verbo). 'E'ffect = 'E'vento/resultado (nombre)", detail: 'Casi siempre funciona: si necesitas un verbo, affect; si necesitas un nombre, effect.' },
    ],
    items: [
      { sentence: "The weather can ___ your mood.", correct: "affect", explain: "'Affect' is normally a verb: to influence something." },
      { sentence: "The new policy had a big ___ on sales.", correct: "effect", explain: "'Effect' is normally a noun: the result." },
      { sentence: "Loud noise can ___ your hearing.", correct: "affect", explain: "'Affect' (verb) = to affect / influence." },
      { sentence: "The medicine had no ___ at all.", correct: "effect", explain: "'Effect' (noun) = effect / result." },
      { sentence: "Stress can ___ your health.", correct: "affect", explain: "'Affect' (verb) = to affect." },
      { sentence: "What ___ did the storm have on the city?", correct: "effect", explain: "'Effect' (noun) = effect." },
      { sentence: "Her kind words had a positive ___ on him.", correct: "effect", explain: "'Effect' (noun) = the result." },
      { sentence: "Smoking can seriously ___ your lungs.", correct: "affect", explain: "'Affect' (verb) = to affect." },
      { sentence: "The drug's side ___ include dizziness.", correct: "effects", explain: "'Effects' (noun, plural) = side effects." },
      { sentence: "Lack of sleep can ___ your concentration.", correct: "affect", explain: "'Affect' (verb) = to affect / influence." },
    ]
  },
  'still-already-just-yet': {
    label: "Still / Already / Just / Yet",
    icon: "⏱️",
    pairs: ["still","already","just","yet"],
    studyCards: [
      { front: "'Still'", back: 'a situation continuing (unchanged)', detail: 'Is she still working here? · He is still asleep.' },
      { front: "'Already'", back: 'sooner than expected (surprise)', detail: "I've already eaten. · You've already finished?!" },
      { front: "'Just'", back: 'a very short time ago', detail: "I've just arrived. · She's just left." },
      { front: "'Yet'", back: 'so far, in questions/negatives', detail: "Have you finished yet? · We haven't decided yet." },
    ],
    items: [
      { sentence: "Have you finished ___?", correct: "yet", explain: "'Yet' in questions and negatives = so far (have you finished yet?)." },
      { sentence: "I've ___ eaten, thanks.", correct: "already", explain: "'Already' = sooner than expected." },
      { sentence: "Is she ___ working here?", correct: "still", explain: "'Still' = a situation that is continuing." },
      { sentence: "I've ___ arrived — give me a minute.", correct: "just", explain: "'Just' = a very short time ago." },
      { sentence: "We haven't decided ___.", correct: "yet", explain: "'Yet' in negatives = not so far." },
      { sentence: "He's ___ asleep — don't wake him.", correct: "still", explain: "'Still' = a situation continuing unchanged." },
      { sentence: "I can't believe you've ___ finished the whole book!", correct: "already", explain: "'Already' = surprise, sooner than expected." },
      { sentence: "She's ___ left the office.", correct: "just", explain: "'Just' = a moment ago." },
      { sentence: "Don't leave ___ — I need to talk to you.", correct: "yet", explain: "'Yet' = not up to now." },
      { sentence: "I haven't called her ___.", correct: "yet", explain: "'Yet' in negatives = not so far." },
    ]
  },
  'is-are': {
    label: "Is / Are",
    icon: "🔢",
    pairs: ["is","are"],
    studyCards: [
      { front: 'Singulares con truco: -ics, news, mathematics', back: 'is', detail: 'Mathematics is... · Physics is... · The news is... (parecen plurales, no lo son)' },
      { front: 'Plurales sin -s: police, scissors, glasses', back: 'are', detail: 'The police are... · My glasses are... · Your scissors are...' },
      { front: 'Cantidades y grupos como unidad', back: 'is', detail: 'Ten dollars is too much. · The team is playing well. (se trata como un total/unidad, no personas sueltas)' },
    ],
    items: [
      { sentence: "There ___ a lot of traffic today.", correct: "is", explain: "'Traffic' is uncountable and singular → is." },
      { sentence: "My glasses ___ on the table.", correct: "are", explain: "'Glasses' is treated as plural → are." },
      { sentence: "The news ___ very worrying.", correct: "is", explain: "'News' looks plural but is singular → is." },
      { sentence: "Everybody ___ welcome to join.", correct: "is", explain: "'Everybody/everyone' is singular → is." },
      { sentence: "The team ___ playing really well this season.", correct: "is", explain: "'Team' as a single unit → is (British English also accepts 'are')." },
      { sentence: "Ten dollars ___ too much for this.", correct: "is", explain: "Amounts of money as a single total → is." },
      { sentence: "The police ___ investigating the case.", correct: "are", explain: "'Police' is always treated as plural → are." },
      { sentence: "Mathematics ___ my favourite subject.", correct: "is", explain: "'Mathematics' ends in -s but is singular → is." },
      { sentence: "Your scissors ___ on the desk.", correct: "are", explain: "'Scissors' is treated as plural → are." },
      { sentence: "Physics ___ a fascinating subject.", correct: "is", explain: "Subjects ending in -ics are singular → is." },
    ]
  },
};
