export const CATEGORIES = {
  'less-fewer': {
    label: "Less / Fewer",
    icon: "📉",
    pairs: ["less","fewer"],
    items: [
      { sentence: "There are ___ people here today than yesterday.", correct: "fewer", explain: "'Fewer' con sustantivos contables: fewer people, fewer cars." },
      { sentence: "I have ___ money than I thought.", correct: "less", explain: "'Less' con sustantivos incontables: less money, less time." },
      { sentence: "She eats ___ sugar now.", correct: "less", explain: "'Sugar' es incontable → less." },
      { sentence: "We need ___ cars on the road.", correct: "fewer", explain: "'Cars' es contable → fewer." },
      { sentence: "He has ___ patience than his brother.", correct: "less", explain: "'Patience' es incontable → less." },
      { sentence: "There were ___ mistakes in this essay.", correct: "fewer", explain: "'Mistakes' es contable → fewer." },
      { sentence: "I drink ___ coffee these days.", correct: "less", explain: "'Coffee' es incontable → less." },
      { sentence: "There's ___ traffic on Sundays.", correct: "less", explain: "'Traffic' es incontable → less." },
      { sentence: "___ tourists visit in winter.", correct: "Fewer", explain: "'Tourists' es contable → fewer." },
      { sentence: "I make ___ mistakes than before.", correct: "fewer", explain: "'Mistakes' es contable → fewer." },
    ]
  },
  'me-i': {
    label: "Me / I",
    icon: "🙋",
    pairs: ["me","I"],
    items: [
      { sentence: "My friend and ___ went to the cinema.", correct: "I", explain: "Sujeto de la oración → 'I' (nunca 'me and my friend' como sujeto formal)." },
      { sentence: "She gave the book to my friend and ___.", correct: "me", explain: "Objeto (después de 'to') → 'me'." },
      { sentence: "He and ___ are best friends.", correct: "I", explain: "Sujeto de la oración → 'I'." },
      { sentence: "Between you and ___, I think she's right.", correct: "me", explain: "Después de preposición ('between') → 'me'." },
      { sentence: "My sister and ___ love to travel.", correct: "I", explain: "Sujeto de la oración → 'I'." },
      { sentence: "Can you help my brother and ___?", correct: "me", explain: "Objeto del verbo 'help' → 'me'." },
      { sentence: "It was my colleague and ___ who finished the project.", correct: "I", explain: "Sujeto → 'I'." },
      { sentence: "The manager spoke to my colleague and ___.", correct: "me", explain: "Objeto (después de 'to') → 'me'." },
      { sentence: "My parents and ___ are going on holiday.", correct: "I", explain: "Sujeto de la oración → 'I'." },
      { sentence: "___ love spending time with my family.", correct: "I", explain: "Sujeto de la oración → 'I'." },
    ]
  },
  'who-whom': {
    label: "Who / Whom",
    icon: "❓",
    pairs: ["who","whom"],
    items: [
      { sentence: "Do you know ___ is coming to the party?", correct: "who", explain: "'Who' = sujeto del verbo 'is coming'." },
      { sentence: "To ___ should I address this letter?", correct: "whom", explain: "'Whom' = objeto de preposición ('to')." },
      { sentence: "Tell me ___ you invited.", correct: "whom", explain: "'Whom' = objeto del verbo 'invited'." },
      { sentence: "The man ___ called earlier left a message.", correct: "who", explain: "'Who' = sujeto de 'called'." },
      { sentence: "For ___ are these flowers?", correct: "whom", explain: "'Whom' = objeto de preposición ('for')." },
      { sentence: "I wonder ___ won the race.", correct: "who", explain: "'Who' = sujeto de 'won'." },
      { sentence: "With ___ are you going?", correct: "whom", explain: "'Whom' = objeto de preposición ('with')." },
      { sentence: "___ did you invite to the wedding?", correct: "Whom", explain: "'Whom' = objeto del verbo 'invite'." },
      { sentence: "___ is responsible for this mess?", correct: "Who", explain: "'Who' = sujeto del verbo 'is'." },
      { sentence: "The woman ___ I met yesterday is a doctor.", correct: "whom", explain: "'Whom' = objeto de 'met' en la cláusula relativa." },
    ]
  },
  'affect-effect': {
    label: "Affect / Effect",
    icon: "🔄",
    pairs: ["affect","effect"],
    items: [
      { sentence: "The weather can ___ your mood.", correct: "affect", explain: "'Affect' es normalmente verbo: influir en algo." },
      { sentence: "The new policy had a big ___ on sales.", correct: "effect", explain: "'Effect' es normalmente sustantivo: el resultado." },
      { sentence: "Loud noise can ___ your hearing.", correct: "affect", explain: "'Affect' (verbo) = afectar/influir." },
      { sentence: "The medicine had no ___ at all.", correct: "effect", explain: "'Effect' (sustantivo) = efecto/resultado." },
      { sentence: "Stress can ___ your health.", correct: "affect", explain: "'Affect' (verbo) = afectar." },
      { sentence: "What ___ did the storm have on the city?", correct: "effect", explain: "'Effect' (sustantivo) = efecto." },
      { sentence: "Her kind words had a positive ___ on him.", correct: "effect", explain: "'Effect' (sustantivo) = el resultado." },
      { sentence: "Smoking can seriously ___ your lungs.", correct: "affect", explain: "'Affect' (verbo) = afectar." },
      { sentence: "The drug's side ___ include dizziness.", correct: "effects", explain: "'Effects' (sustantivo, plural) = efectos secundarios." },
      { sentence: "Lack of sleep can ___ your concentration.", correct: "affect", explain: "'Affect' (verbo) = afectar/influir." },
    ]
  },
  'still-already-just-yet': {
    label: "Still / Already / Just / Yet",
    icon: "⏱️",
    pairs: ["still","already","just","yet"],
    items: [
      { sentence: "Have you finished ___?", correct: "yet", explain: "'Yet' en preguntas y negativas = todavía/ya (¿ya terminaste?)." },
      { sentence: "I've ___ eaten, thanks.", correct: "already", explain: "'Already' = ya, antes de lo esperado." },
      { sentence: "Is she ___ working here?", correct: "still", explain: "'Still' = todavía, una situación que continúa." },
      { sentence: "I've ___ arrived — give me a minute.", correct: "just", explain: "'Just' = hace muy poco tiempo." },
      { sentence: "We haven't decided ___.", correct: "yet", explain: "'Yet' en negativas = todavía no." },
      { sentence: "He's ___ asleep — don't wake him.", correct: "still", explain: "'Still' = una situación que continúa sin cambios." },
      { sentence: "I can't believe you've ___ finished the whole book!", correct: "already", explain: "'Already' = sorpresa, antes de lo esperado." },
      { sentence: "She's ___ left the office.", correct: "just", explain: "'Just' = hace un momento." },
      { sentence: "Don't leave ___ — I need to talk to you.", correct: "yet", explain: "'Yet' = todavía no (ahora mismo)." },
      { sentence: "I haven't called her ___.", correct: "yet", explain: "'Yet' en negativas = todavía no." },
    ]
  },
  'is-are': {
    label: "Is / Are",
    icon: "🔢",
    pairs: ["is","are"],
    items: [
      { sentence: "There ___ a lot of traffic today.", correct: "is", explain: "'Traffic' es incontable/singular → is." },
      { sentence: "My glasses ___ on the table.", correct: "are", explain: "'Glasses' se trata como plural → are." },
      { sentence: "The news ___ very worrying.", correct: "is", explain: "'News' parece plural pero es singular → is." },
      { sentence: "Everybody ___ welcome to join.", correct: "is", explain: "'Everybody/everyone' es singular → is." },
      { sentence: "The team ___ playing really well this season.", correct: "is", explain: "'Team' como grupo unido → is (inglés británico también acepta 'are')." },
      { sentence: "Ten dollars ___ too much for this.", correct: "is", explain: "Cantidades de dinero como suma total → is." },
      { sentence: "The police ___ investigating the case.", correct: "are", explain: "'Police' siempre se trata como plural → are." },
      { sentence: "Mathematics ___ my favourite subject.", correct: "is", explain: "'Mathematics' termina en -s pero es singular → is." },
      { sentence: "Your scissors ___ on the desk.", correct: "are", explain: "'Scissors' se trata como plural → are." },
      { sentence: "Physics ___ a fascinating subject.", correct: "is", explain: "Materias que terminan en -ics son singulares → is." },
    ]
  },
};
