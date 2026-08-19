// `studyCards` enseña la REGLA del par antes de examinarla en Quiz. Antes
// Study mostraba las mismas 10 frases del Quiz con la respuesta detrás — el
// examen disfrazado de flashcard, sin la regla enunciada en ningún lado.
// Mismo patrón que sentence-quiz-engine.js / a1-plurals-possessives.js.
export const CATEGORIES = {
  'principal-principle': {
    label: "Principal / Principle",
    icon: "🏫",
    pairs: ["principal","principle"],
    studyCards: [
      { front: 'principal', back: 'noun: head of a school · adjective: main', detail: 'The school principal · the principal reason (la más importante)' },
      { front: 'principle', back: 'noun: a fundamental rule or value', detail: 'Honesty is a principle. · on principle (por convicción)' },
      { front: 'Cómo recordar', back: "'-PLE' como en 'ruLE'", detail: "'principLE' termina como 'ruLE' (una regla). 'principAL' termina como 'A person' (una persona: el director)." },
    ],
    items: [
      { sentence: "The school ___ gave a speech.", correct: "principal", explain: "'Principal' (noun) = the head of a school." },
      { sentence: "Honesty is her guiding ___.", correct: "principle", explain: "'Principle' = a fundamental value or rule." },
      { sentence: "That's my ___ concern about the plan.", correct: "principal", explain: "'Principal' (adjective) = main, most important." },
      { sentence: "He refused on ___.", correct: "principle", explain: "'On principle' = as a matter of values." },
      { sentence: "She was called to the ___'s office.", correct: "principal", explain: "'Principal' = the head of the school." },
      { sentence: "The basic ___ of physics is simple.", correct: "principle", explain: "'Principle' = a fundamental rule or law." },
      { sentence: "The company's main ___ is customer satisfaction.", correct: "principle", explain: "'Principle' = a fundamental value." },
      { sentence: "He met with the ___ to discuss the incident.", correct: "principal", explain: "'Principal' = the head of the school." },
      { sentence: "Democracy is based on the ___ of equality.", correct: "principle", explain: "'Principle' = a fundamental rule or law." },
      { sentence: "The ___ reason for the delay was the weather.", correct: "principal", explain: "'Principal' (adjective) = main, most important." },
    ]
  },
  'complement-compliment': {
    label: "Complement / Compliment",
    icon: "💬",
    pairs: ["complement","compliment"],
    studyCards: [
      { front: 'complement (E)', back: 'to go well with / complete', detail: 'This wine will complement the meal. · The two colours complement each other.' },
      { front: 'compliment (I)', back: 'praise, a kind remark', detail: 'She gave me a nice compliment. · He paid her a compliment.' },
      { front: 'Cómo recordar', back: "'complIment' = 'I' like it", detail: "Un cumplido (compliment) es algo que a 'I' (yo) me gusta oír. Complement con E va con 'complEte'." },
    ],
    items: [
      { sentence: "She gave me a nice ___ on my work.", correct: "compliment", explain: "'Compliment' = a piece of praise." },
      { sentence: "This wine will ___ the meal perfectly.", correct: "complement", explain: "'Complement' (verb) = to go well with something." },
      { sentence: "Thank you for the ___, that's very kind.", correct: "compliment", explain: "'Compliment' = a kind remark." },
      { sentence: "The two colours ___ each other beautifully.", correct: "complement", explain: "'Complement' = complementarse mutuamente." },
      { sentence: "He paid her a genuine ___.", correct: "compliment", explain: "'Compliment' = a flattering remark." },
      { sentence: "These skills ___ the rest of the team.", correct: "complement", explain: "'Complement' = to add something that improves the whole." },
      { sentence: "Her scarf ___ her outfit nicely.", correct: "complements", explain: "'Complement' (verb) = goes well with something." },
      { sentence: "He blushed at the unexpected ___.", correct: "compliment", explain: "'Compliment' = an unexpected piece of praise." },
      { sentence: "The wine and cheese ___ each other well.", correct: "complement", explain: "'Complement' = complementarse mutuamente." },
      { sentence: "I want to pay you a ___.", correct: "compliment", explain: "'Compliment' = a kind remark." },
    ]
  },
  'desert-dessert': {
    label: "Desert / Dessert",
    icon: "🍰",
    pairs: ["desert","dessert"],
    studyCards: [
      { front: 'desert (1 "s")', back: 'noun: dry region · verb: to abandon', detail: 'The Sahara is a desert. · Don\'t desert your friends.' },
      { front: 'dessert (2 "s")', back: 'noun: postre', detail: "What's for dessert? · Ice cream is my favourite dessert." },
      { front: 'Cómo recordar', back: 'Dessert tiene doble "S" porque quieres doble ración', detail: "Postre (dessert) es lo que quieres 'more of' — doble S de 'sweet, sweet'. Desert (desierto) tiene una sola S, como su escasa vegetación." },
    ],
    items: [
      { sentence: "The Sahara is a huge ___.", correct: "desert", explain: "'Desert' (one 'S') = a dry, sandy region." },
      { sentence: "What's for ___ tonight?", correct: "dessert", explain: "'Dessert' (dos 'S') = postre." },
      { sentence: "Camels are well adapted to the ___.", correct: "desert", explain: "'Desert' = a dry, arid area." },
      { sentence: "She ordered chocolate cake for ___.", correct: "dessert", explain: "'Dessert' = the sweet course after a meal." },
      { sentence: "Don't ___ your friends when they need you.", correct: "desert", explain: "'Desert' (verb) = to abandon." },
      { sentence: "This restaurant has an amazing ___ menu.", correct: "dessert", explain: "'Dessert' = postre." },
      { sentence: "The Gobi is a cold ___ in Asia.", correct: "desert", explain: "'Desert' = an arid region, which can be hot or cold." },
      { sentence: "We shared a delicious ___ after dinner.", correct: "dessert", explain: "'Dessert' = the sweet course shared at the end of a meal." },
      { sentence: "Soldiers must never ___ their post.", correct: "desert", explain: "'Desert' (verb) = to abandon a duty or post." },
      { sentence: "Ice cream is my favourite ___.", correct: "dessert", explain: "'Dessert' = postre favorito." },
    ]
  },
  'weather-whether': {
    label: "Weather / Whether",
    icon: "🌦️",
    pairs: ["weather","whether"],
    studyCards: [
      { front: 'weather', back: 'el clima/tiempo atmosférico', detail: "The weather is lovely today. · Check the weather forecast." },
      { front: 'whether', back: 'introduce una alternativa/duda', detail: "I don't know whether to go or stay. · She asked whether I was coming." },
      { front: 'Cómo recordar', back: "'whETHer' se parece a 'ETHer' (u opción A o B)", detail: "'Whether' siempre presenta una elección o duda entre opciones, casi como 'if'. 'Weather' nunca introduce una cláusula." },
    ],
    items: [
      { sentence: "The ___ is lovely today.", correct: "weather", explain: "'Weather' = the state of the atmosphere." },
      { sentence: "I don't know ___ to go or stay.", correct: "whether", explain: "'Whether' = introduces an alternative." },
      { sentence: "We'll go for a walk if the ___ is nice.", correct: "weather", explain: "'Weather' = the weather conditions." },
      { sentence: "She asked ___ I was coming to the party.", correct: "whether", explain: "'Whether' = introduces a doubt." },
      { sentence: "Check the ___ forecast before you leave.", correct: "weather", explain: "'Weather' = the state of the atmosphere." },
      { sentence: "It doesn't matter ___ we win or lose.", correct: "whether", explain: "'Whether...or' presents two alternatives." },
      { sentence: "I'm not sure ___ she'll come or not.", correct: "whether", explain: "'Whether...or not' = si...o no." },
      { sentence: "The ___ has been terrible this week.", correct: "weather", explain: "'Weather' = the weather." },
      { sentence: "___ or not it rains, we're going hiking.", correct: "Whether", explain: "'Whether' at the start of a sentence, capitalised." },
      { sentence: "Cold ___ makes me want to stay inside.", correct: "weather", explain: "'Weather' = the (cold) weather conditions." },
    ]
  },
};
