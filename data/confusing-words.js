/**
 * HubFlow — Confusing Words Data
 * Categories: make/do, say/tell, bring/take, come/go, borrow/lend, watch/look/see
 * Each entry: sentence with blank, correct answer, options, explanation ES
 */

export const CATEGORIES = {
  'make-do': {
    label: 'Make / Do',
    icon: '🔨',
    pairs: ['make', 'do'],
    items: [
      { sentence: "I need to ___ my homework before dinner.", correct: "do", explain: "'Do' se usa con tareas y trabajos: do homework, do the dishes." },
      { sentence: "She wants to ___ a cake for her birthday.", correct: "make", explain: "'Make' se usa para crear/producir algo: make a cake, make dinner." },
      { sentence: "Can you ___ me a favor?", correct: "do", explain: "Expresión fija: do a favor (hacer un favor)." },
      { sentence: "He always ___ his bed in the morning.", correct: "makes", explain: "'Make the bed' = tender la cama. Expresión fija con make." },
      { sentence: "They ___ a lot of money last year.", correct: "made", explain: "'Make money' = ganar dinero. Siempre con make." },
      { sentence: "I ___ the laundry every Saturday.", correct: "do", explain: "'Do the laundry' = lavar la ropa. Tareas domésticas → do." },
      { sentence: "Let me ___ a phone call first.", correct: "make", explain: "'Make a phone call' = hacer una llamada. Expresión fija." },
      { sentence: "She ___ her best to pass the exam.", correct: "did", explain: "'Do your best' = hacer lo mejor posible." },
      { sentence: "We need to ___ a decision soon.", correct: "make", explain: "'Make a decision' = tomar una decisión. Expresión fija." },
      { sentence: "He ___ the shopping on Fridays.", correct: "does", explain: "'Do the shopping' = hacer las compras. Actividad → do." },
    ]
  },
  'say-tell': {
    label: 'Say / Tell',
    icon: '🗣️',
    pairs: ['say', 'tell'],
    items: [
      { sentence: "She ___ me the truth.", correct: "told", explain: "'Tell' siempre lleva objeto indirecto (me, him, her, us, them)." },
      { sentence: "What did he ___?", correct: "say", explain: "'Say' se usa sin objeto indirecto obligatorio." },
      { sentence: "Can you ___ me the time, please?", correct: "tell", explain: "'Tell me' = decirme. Tell + persona." },
      { sentence: "___ hello to your mother for me.", correct: "Say", explain: "'Say hello/goodbye/sorry' — expresiones fijas con say." },
      { sentence: "He ___ a lie to his teacher.", correct: "told", explain: "'Tell a lie' = decir una mentira. Expresión fija con tell." },
      { sentence: "They ___ that the weather will improve.", correct: "say", explain: "'Say that...' para reportar información general." },
      { sentence: "Don't ___ anyone about this.", correct: "tell", explain: "'Tell someone' = decirle a alguien. Tell + persona." },
      { sentence: "He ___ 'I'm sorry' and left.", correct: "said", explain: "'Say' para citas directas: He said '...'." },
      { sentence: "Can you ___ the difference?", correct: "tell", explain: "'Tell the difference' = notar la diferencia. Expresión fija." },
      { sentence: "She ___ goodbye and walked away.", correct: "said", explain: "'Say goodbye' — expresiones sociales siempre con say." },
    ]
  },
  'bring-take': {
    label: 'Bring / Take',
    icon: '📦',
    pairs: ['bring', 'take'],
    items: [
      { sentence: "Can you ___ me a glass of water?", correct: "bring", explain: "'Bring' = traer hacia el hablante." },
      { sentence: "Don't forget to ___ your umbrella.", correct: "take", explain: "'Take' = llevar lejos del hablante." },
      { sentence: "She ___ her laptop to work every day.", correct: "takes", explain: "Llevar algo a un lugar alejado → take." },
      { sentence: "He ___ flowers when he visits.", correct: "brings", explain: "Traer algo al lugar donde estás → bring." },
      { sentence: "I'll ___ the kids to school tomorrow.", correct: "take", explain: "Llevar personas a otro lugar → take." },
      { sentence: "Please ___ your books to class.", correct: "bring", explain: "El hablante está en la clase → bring (hacia mí)." },
      { sentence: "She always ___ homemade cookies to the party.", correct: "brings", explain: "Si el hablante está en la fiesta → bring." },
      { sentence: "I need to ___ the car to the mechanic.", correct: "take", explain: "Llevar lejos → take." },
      { sentence: "Can you ___ some snacks when you come?", correct: "bring", explain: "'When you come' implica hacia mí → bring." },
      { sentence: "He ___ his dog for a walk every evening.", correct: "takes", explain: "'Take for a walk' = sacar a pasear. Expresión con take." },
    ]
  },
  'borrow-lend': {
    label: 'Borrow / Lend',
    icon: '🤝',
    pairs: ['borrow', 'lend'],
    items: [
      { sentence: "Can I ___ your pen for a moment?", correct: "borrow", explain: "'Borrow' = pedir prestado (yo recibo)." },
      { sentence: "Could you ___ me ten dollars?", correct: "lend", explain: "'Lend' = prestar (tú das). Lend me = préstame." },
      { sentence: "I ___ the book from the library.", correct: "borrowed", explain: "Pedir prestado de una fuente → borrow from." },
      { sentence: "She ___ me her notes for the exam.", correct: "lent", explain: "Ella me dio temporalmente → lent (past de lend)." },
      { sentence: "He never ___ money to friends.", correct: "lends", explain: "Dar prestado → lend. Él da a otros." },
      { sentence: "Can I ___ your car this weekend?", correct: "borrow", explain: "Yo quiero usar algo tuyo → borrow." },
      { sentence: "The bank ___ them money to buy a house.", correct: "lent", explain: "El banco da prestado → lend. El banco es quien da." },
      { sentence: "I ___ a ladder from my neighbor.", correct: "borrowed", explain: "Pedí prestada (yo recibo de mi vecino) → borrow." },
      { sentence: "She doesn't like to ___ her things.", correct: "lend", explain: "No le gusta prestar (dar) sus cosas → lend." },
      { sentence: "May I ___ your charger?", correct: "borrow", explain: "Yo quiero usar algo temporalmente → borrow." },
    ]
  },
  'watch-look-see': {
    label: 'Watch / Look / See',
    icon: '👁️',
    pairs: ['watch', 'look', 'see'],
    items: [
      { sentence: "I ___ a movie last night.", correct: "watched", explain: "'Watch' = observar con atención algo que se mueve/cambia." },
      { sentence: "___ at that beautiful sunset!", correct: "Look", explain: "'Look at' = dirigir la mirada (esfuerzo consciente, momento puntual)." },
      { sentence: "Did you ___ the accident?", correct: "see", explain: "'See' = percibir con los ojos (sin esfuerzo, espontáneo)." },
      { sentence: "She ___ TV for three hours every day.", correct: "watches", explain: "'Watch TV' — observar algo en movimiento por un periodo." },
      { sentence: "I can ___ the mountains from my window.", correct: "see", explain: "'See' = capacidad visual / percepción pasiva." },
      { sentence: "He ___ both ways before crossing the street.", correct: "looked", explain: "'Look' = girar/dirigir la mirada intencionalmente." },
      { sentence: "Let me ___ if there are seats available.", correct: "see", explain: "'Let me see' / 'I'll see' = verificar/comprobar." },
      { sentence: "___ out! There's a car coming!", correct: "Watch", explain: "'Watch out!' = ¡cuidado! Expresión fija." },
      { sentence: "I haven't ___ her since last week.", correct: "seen", explain: "'See someone' = encontrarse con alguien / percibir." },
      { sentence: "Can you ___ after my bag?", correct: "look", explain: "'Look after' = cuidar de. Phrasal verb con look." },
    ]
  },
  'less-fewer': {
    label: 'Less / Fewer',
    icon: '📉',
    pairs: ['less', 'fewer'],
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
      { sentence: "I make ___ mistakes than before.", correct: "fewer", explain: "'Mistakes' es contable → fewer." }
    ]
  },
  'me-i': {
    label: 'Me / I',
    icon: '🙋',
    pairs: ['me', 'I'],
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
      { sentence: "___ love spending time with my family.", correct: "I", explain: "Sujeto de la oración → 'I'." }
    ]
  },
  'who-whom': {
    label: 'Who / Whom',
    icon: '❓',
    pairs: ['who', 'whom'],
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
      { sentence: "The woman ___ I met yesterday is a doctor.", correct: "whom", explain: "'Whom' = objeto de 'met' en la cláusula relativa." }
    ]
  },
  'affect-effect': {
    label: 'Affect / Effect',
    icon: '🔄',
    pairs: ['affect', 'effect'],
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
      { sentence: "Lack of sleep can ___ your concentration.", correct: "affect", explain: "'Affect' (verbo) = afectar/influir." }
    ]
  },
  'still-already-just-yet': {
    label: 'Still / Already / Just / Yet',
    icon: '⏱️',
    pairs: ['still', 'already', 'just', 'yet'],
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
      { sentence: "I haven't called her ___.", correct: "yet", explain: "'Yet' en negativas = todavía no." }
    ]
  },
  'is-are': {
    label: 'Is / Are',
    icon: '🔢',
    pairs: ['is', 'are'],
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
      { sentence: "Physics ___ a fascinating subject.", correct: "is", explain: "Materias que terminan en -ics son singulares → is." }
    ]
  },
  'there-their-theyre': {
    label: "There / Their / They're",
    icon: '🏠',
    pairs: ['there', 'their', "they're"],
    items: [
      { sentence: "Put the box over ___.", correct: "there", explain: "'There' = lugar (adverbio de lugar)." },
      { sentence: "___ house is on the corner.", correct: "their", explain: "'Their' = posesivo (de ellos)." },
      { sentence: "___ coming to the party tonight.", correct: "they're", explain: "'They're' = contracción de 'they are'." },
      { sentence: "___ isn't much time left.", correct: "there", explain: "'There' + is/are/isn't = existencia." },
      { sentence: "I saw ___ new car yesterday.", correct: "their", explain: "'Their' = posesivo antes de un sustantivo." },
      { sentence: "___ always late to meetings.", correct: "they're", explain: "'They're' = 'they are' + adjetivo." },
      { sentence: "We left the keys over ___.", correct: "there", explain: "'There' = lugar." },
      { sentence: "Look over ___, near the door.", correct: "there", explain: "'There' = lugar (adverbio de lugar)." },
      { sentence: "___ car broke down on the motorway.", correct: "Their", explain: "'Their' = posesivo." },
      { sentence: "___ not sure if they can come.", correct: "They're", explain: "'They're' = contracción de 'they are'." }
    ]
  },
  'your-youre': {
    label: "Your / You're",
    icon: '👤',
    pairs: ['your', "you're"],
    items: [
      { sentence: "Is this ___ bag?", correct: "your", explain: "'Your' = posesivo (de ti)." },
      { sentence: "___ going to love this movie.", correct: "you're", explain: "'You're' = contracción de 'you are'." },
      { sentence: "Don't forget ___ passport.", correct: "your", explain: "'Your' + sustantivo = posesivo." },
      { sentence: "___ right, I made a mistake.", correct: "you're", explain: "'You're' = 'you are' + adjetivo." },
      { sentence: "What's ___ favourite colour?", correct: "your", explain: "'Your' = posesivo." },
      { sentence: "___ doing a great job.", correct: "you're", explain: "'You're' = 'you are' + gerundio." },
      { sentence: "I love ___ new haircut.", correct: "your", explain: "'Your' = posesivo." },
      { sentence: "___ welcome to join us anytime.", correct: "You're", explain: "'You're' = contracción de 'you are'." },
      { sentence: "Where did you leave ___ keys?", correct: "your", explain: "'Your' + sustantivo = posesivo." },
      { sentence: "___ not going to believe this.", correct: "You're", explain: "'You're' = 'you are' + going to." }
    ]
  },
  'its-its': {
    label: "Its / It's",
    icon: '🐾',
    pairs: ['its', "it's"],
    items: [
      { sentence: "The dog wagged ___ tail.", correct: "its", explain: "'Its' (sin apóstrofe) = posesivo." },
      { sentence: "___ raining again.", correct: "it's", explain: "'It's' = contracción de 'it is'." },
      { sentence: "The company changed ___ policy.", correct: "its", explain: "'Its' = posesivo." },
      { sentence: "___ been a long day.", correct: "it's", explain: "'It's' = 'it has' (contracción)." },
      { sentence: "Every dog has ___ day.", correct: "its", explain: "'Its' = posesivo (refrán)." },
      { sentence: "___ too late to cancel now.", correct: "it's", explain: "'It's' = 'it is'." },
      { sentence: "The cat licked ___ paw.", correct: "its", explain: "'Its' (sin apóstrofe) = posesivo." },
      { sentence: "___ nice to finally meet you.", correct: "It's", explain: "'It's' = contracción de 'it is'." },
      { sentence: "The company updated ___ website.", correct: "its", explain: "'Its' = posesivo." },
      { sentence: "___ getting late, we should go.", correct: "It's", explain: "'It's' = 'it is'." }
    ]
  },
  'principal-principle': {
    label: 'Principal / Principle',
    icon: '🏫',
    pairs: ['principal', 'principle'],
    items: [
      { sentence: "The school ___ gave a speech.", correct: "principal", explain: "'Principal' (sustantivo) = director de un colegio." },
      { sentence: "Honesty is her guiding ___.", correct: "principle", explain: "'Principle' = un valor o regla fundamental." },
      { sentence: "That's my ___ concern about the plan.", correct: "principal", explain: "'Principal' (adjetivo) = principal, más importante." },
      { sentence: "He refused on ___ .", correct: "principle", explain: "'On principle' = por una cuestión de valores." },
      { sentence: "She was called to the ___'s office.", correct: "principal", explain: "'Principal' = director/a de la escuela." },
      { sentence: "The basic ___ of physics is simple.", correct: "principle", explain: "'Principle' = una regla o ley fundamental." },
      { sentence: "The company's main ___ is customer satisfaction.", correct: "principle", explain: "'Principle' = un valor fundamental." },
      { sentence: "He met with the ___ to discuss the incident.", correct: "principal", explain: "'Principal' = director/a de la escuela." },
      { sentence: "Democracy is based on the ___ of equality.", correct: "principle", explain: "'Principle' = una regla o ley fundamental." },
      { sentence: "The ___ reason for the delay was the weather.", correct: "principal", explain: "'Principal' (adjetivo) = principal, más importante." }
    ]
  },
  'complement-compliment': {
    label: 'Complement / Compliment',
    icon: '💬',
    pairs: ['complement', 'compliment'],
    items: [
      { sentence: "She gave me a nice ___ on my work.", correct: "compliment", explain: "'Compliment' = un elogio, algo bonito que se dice." },
      { sentence: "This wine will ___ the meal perfectly.", correct: "complement", explain: "'Complement' (verbo) = complementar, combinar bien con algo." },
      { sentence: "Thank you for the ___, that's very kind.", correct: "compliment", explain: "'Compliment' = un cumplido." },
      { sentence: "The two colours ___ each other beautifully.", correct: "complement", explain: "'Complement' = complementarse mutuamente." },
      { sentence: "He paid her a genuine ___.", correct: "compliment", explain: "'Compliment' = un halago." },
      { sentence: "These skills ___ the rest of the team.", correct: "complement", explain: "'Complement' = añadir algo que hace mejor el conjunto." },
      { sentence: "Her scarf ___ her outfit nicely.", correct: "complements", explain: "'Complement' (verbo) = combina bien con algo." },
      { sentence: "He blushed at the unexpected ___.", correct: "compliment", explain: "'Compliment' = un elogio inesperado." },
      { sentence: "The wine and cheese ___ each other well.", correct: "complement", explain: "'Complement' = complementarse mutuamente." },
      { sentence: "I want to pay you a ___.", correct: "compliment", explain: "'Compliment' = un cumplido." }
    ]
  },
  'desert-dessert': {
    label: 'Desert / Dessert',
    icon: '🍰',
    pairs: ['desert', 'dessert'],
    items: [
      { sentence: "The Sahara is a huge ___.", correct: "desert", explain: "'Desert' (una 'S') = desierto." },
      { sentence: "What's for ___ tonight?", correct: "dessert", explain: "'Dessert' (dos 'S') = postre." },
      { sentence: "Camels are well adapted to the ___.", correct: "desert", explain: "'Desert' = zona árida y seca." },
      { sentence: "She ordered chocolate cake for ___.", correct: "dessert", explain: "'Dessert' = el postre después de comer." },
      { sentence: "Don't ___ your friends when they need you.", correct: "desert", explain: "'Desert' (verbo) = abandonar." },
      { sentence: "This restaurant has an amazing ___ menu.", correct: "dessert", explain: "'Dessert' = postre." },
      { sentence: "The Gobi is a cold ___ in Asia.", correct: "desert", explain: "'Desert' = región árida, puede ser fría o cálida." },
      { sentence: "We shared a delicious ___ after dinner.", correct: "dessert", explain: "'Dessert' = postre compartido al final de la comida." },
      { sentence: "Soldiers must never ___ their post.", correct: "desert", explain: "'Desert' (verbo) = abandonar un deber o puesto." },
      { sentence: "Ice cream is my favourite ___.", correct: "dessert", explain: "'Dessert' = postre favorito." }
    ]
  },
  'weather-whether': {
    label: 'Weather / Whether',
    icon: '🌦️',
    pairs: ['weather', 'whether'],
    items: [
      { sentence: "The ___ is lovely today.", correct: "weather", explain: "'Weather' = el clima." },
      { sentence: "I don't know ___ to go or stay.", correct: "whether", explain: "'Whether' = si (para expresar una alternativa)." },
      { sentence: "We'll go for a walk if the ___ is nice.", correct: "weather", explain: "'Weather' = el estado del tiempo." },
      { sentence: "She asked ___ I was coming to the party.", correct: "whether", explain: "'Whether' = si (introduce una duda)." },
      { sentence: "Check the ___ forecast before you leave.", correct: "weather", explain: "'Weather' = el clima." },
      { sentence: "It doesn't matter ___ we win or lose.", correct: "whether", explain: "'Whether...or' = ya sea que...o." },
      { sentence: "I'm not sure ___ she'll come or not.", correct: "whether", explain: "'Whether...or not' = si...o no." },
      { sentence: "The ___ has been terrible this week.", correct: "weather", explain: "'Weather' = el tiempo/clima." },
      { sentence: "___ or not it rains, we're going hiking.", correct: "Whether", explain: "'Whether' al inicio de frase, con mayúscula." },
      { sentence: "Cold ___ makes me want to stay inside.", correct: "weather", explain: "'Weather' = clima frío." }
    ]
  }
};
