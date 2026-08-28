/**
 * HubFlow — Prepositions Data
 * Categories: Time (in/on/at), Place (in/on/at), Movement (to/into/onto), Dependent (adj+prep, verb+prep)
 * Each entry: sentence with blank, correct answer, options, explanation ES
 */

export const CATEGORIES = {
  time: {
    label: 'Time',
    icon: '🕐',
    options: ['in', 'on', 'at'],
    studyCards: [
      { front: 'in', back: 'periodos largos — meses, años, estaciones, partes del día', detail: 'in 1995 · in summer · in the morning. La trampa: "in the morning" pero "at night" (excepción fija).' },
      { front: 'on', back: 'días y fechas concretas', detail: 'on Monday · on March 15th · on my birthday. Si se puede señalar un día en el calendario, es "on".' },
      { front: 'at', back: 'horas exactas y momentos puntuales', detail: 'at 3 o\'clock · at noon · at Christmas (el periodo festivo completo, no el día). En español "en" cubre los tres — el inglés obliga a elegir según qué tan preciso es el momento.' },
    ],
    items: [
      { sentence: "I was born ___ 1995.", correct: "in", explain: "'In' for years: in 1995, in 2020." },
      { sentence: "The meeting is ___ Monday.", correct: "on", explain: "'On' for days of the week: on Monday, on Friday." },
      { sentence: "She arrives ___ 3 o'clock.", correct: "at", explain: "'At' for clock times: at 3 o'clock, at noon." },
      { sentence: "We go on holiday ___ summer.", correct: "in", explain: "'In' for seasons: in summer, in winter." },
      { sentence: "The exam is ___ March 15th.", correct: "on", explain: "'On' for specific dates: on March 15th." },
      { sentence: "I wake up ___ 7 a.m. every day.", correct: "at", explain: "'At' for times: at 7 a.m., at midnight." },
      { sentence: "We met ___ a rainy afternoon.", correct: "on", explain: "'On' for parts of the day with an adjective: on a rainy afternoon." },
      { sentence: "I'll see you ___ the morning.", correct: "in", explain: "'In' for parts of the day: in the morning, in the evening." },
      { sentence: "My birthday is ___ the 5th of July.", correct: "on", explain: "'On' for dates: on the 5th of July." },
      { sentence: "She called me ___ lunchtime.", correct: "at", explain: "'At' for short periods: at lunchtime, at Christmas." },
    ]
  },
  place: {
    label: 'Place',
    icon: '📍',
    options: ['in', 'on', 'at'],
    studyCards: [
      { front: 'in', back: 'dentro de un espacio cerrado — ciudades, países, habitaciones, coches', detail: 'in London · in the car · in a hospital (el edificio, por dentro).' },
      { front: 'on', back: 'sobre una superficie o en transporte público', detail: 'on the table · on the train · on the second floor. La trampa: "on the bus/train/plane" aunque en español digas "en el autobús".' },
      { front: 'at', back: 'un punto específico, sin pensar en el interior', detail: 'at the airport · at the door · at university (la institución como punto de referencia, no el edificio).' },
    ],
    items: [
      { sentence: "She lives ___ London.", correct: "in", explain: "'In' for cities: in London, in Madrid." },
      { sentence: "The book is ___ the table.", correct: "on", explain: "'On' for surfaces: on the table, on the wall." },
      { sentence: "I'll meet you ___ the airport.", correct: "at", explain: "'At' for specific points or places: at the airport." },
      { sentence: "I left my keys ___ the car.", correct: "in", explain: "'In' for enclosed spaces: in the car, in the room." },
      { sentence: "She works ___ a hospital.", correct: "in", explain: "'In' for buildings (inside): in a hospital, in an office." },
      { sentence: "I saw her ___ the train.", correct: "on", explain: "'On' for public transport: on the train, on the bus." },
      { sentence: "He's standing ___ the door.", correct: "at", explain: "'At' for points and thresholds: at the door, at the gate." },
      { sentence: "They live ___ the second floor.", correct: "on", explain: "'On' for floors: on the second floor." },
      { sentence: "She's studying ___ university.", correct: "at", explain: "'At' for institutions: at university, at school." },
      { sentence: "The cat is sleeping ___ the bed.", correct: "on", explain: "'On' for a surface: on the bed (on top of it)." },
    ]
  },
  movement: {
    label: 'Movement',
    icon: '🚶',
    options: ['to', 'into', 'onto', 'towards', 'through'],
    studyCards: [
      { front: 'to / into / onto', back: 'destino final · adentro de algo · encima de una superficie', detail: 'go to Paris (destino) · jump into the pool (adentro) · jump onto the table (encima). Todas implican llegar, no solo dirección.' },
      { front: 'towards', back: 'en dirección a, sin garantía de llegar', detail: 'She ran towards him — se acerca, pero la frase no dice si llegó. Es la única de las cinco que no implica llegada.' },
      { front: 'through', back: 'atravesar de un lado al otro', detail: 'walk through the park — entra por un lado y sale por el otro. La trampa: "through" cruza, "into" solo entra.' },
    ],
    items: [
      { sentence: "She walked ___ the door and left.", correct: "through", explain: "'Through' = passing from one side of a space to the other." },
      { sentence: "He jumped ___ the pool.", correct: "into", explain: "'Into' = movement to the inside of something." },
      { sentence: "We're going ___ Paris next week.", correct: "to", explain: "'To' for a destination: go to Paris, go to school." },
      { sentence: "The cat jumped ___ the table.", correct: "onto", explain: "'Onto' = movement up and onto a surface." },
      { sentence: "She ran ___ him and said hello.", correct: "towards", explain: "'Towards' = in the direction of (without necessarily arriving)." },
      { sentence: "Please take this letter ___ the post office.", correct: "to", explain: "'To' = to a destination." },
      { sentence: "She climbed ___ the roof.", correct: "onto", explain: "'Onto' = up and onto a surface." },
      { sentence: "The dog walked ___ me slowly.", correct: "towards", explain: "'Towards' = in the direction of, getting closer." },
      { sentence: "We walked ___ the park to get home.", correct: "through", explain: "'Through' = crossing an open space." },
      { sentence: "She got ___ the car quickly.", correct: "into", explain: "'Get into' = to enter (a car, a room)." },
    ]
  },
  dependent: {
    label: 'Dependent',
    icon: '🔗',
    options: ['of', 'for', 'about', 'with', 'to', 'in', 'at', 'on'],
    studyCards: [
      { front: 'Adjetivo/verbo + preposición fija', back: 'la preposición va pegada a la palabra, no se traduce del español', detail: 'afraid OF · good AT · interested IN · married TO · angry WITH (someone). No hay regla lógica — se memoriza por pares.' },
      { front: 'La trampa más común', back: 'traducir la preposición española literal', detail: '"interesado EN" → "interested IN" (coincide), pero "responsable DE" → "responsible FOR" (no coincide). Cada par hay que aprenderlo suelto.' },
    ],
    items: [
      { sentence: "She's afraid ___ spiders.", correct: "of", explain: "'Afraid of' = fixed adjective + preposition." },
      { sentence: "He's responsible ___ the project.", correct: "for", explain: "'Responsible for' = responsable de. Adj + prep fija." },
      { sentence: "I'm worried ___ the exam.", correct: "about", explain: "'Worried about' = fixed adjective + preposition." },
      { sentence: "She's good ___ maths.", correct: "at", explain: "'Good at' = bueno en. Adj + prep fija." },
      { sentence: "He's interested ___ history.", correct: "in", explain: "'Interested in' = interesado en. Adj + prep fija." },
      { sentence: "She's married ___ a doctor.", correct: "to", explain: "'Married to' = fixed adjective + preposition." },
      { sentence: "He's angry ___ his brother.", correct: "with", explain: "'Angry with (someone)' = fixed adjective + preposition." },
      { sentence: "I depend ___ my parents.", correct: "on", explain: "'Depend on' = fixed verb + preposition." },
      { sentence: "She apologized ___ being late.", correct: "for", explain: "'Apologize for' = fixed verb + preposition." },
      { sentence: "She dreams ___ traveling the world.", correct: "of", explain: "'Dream of/about' = fixed verb + preposition." },
    ]
  },
  duration: {
    label: 'Duration',
    icon: '⏳',
    options: ['for', 'since', 'during', 'by', 'until'],
    studyCards: [
      { front: 'for / since', back: 'duración (cuánto tiempo) vs. punto de partida (desde cuándo)', detail: 'for five years (duración) · since 2020 (desde qué momento). La trampa: en español ambos suenan a "desde/por hace", pero "for" nunca va con una fecha ("for 2020" es incorrecto).' },
      { front: 'during', back: 'durante un evento o periodo nombrado, no un número', detail: 'during the movie · during the meeting. Va con un sustantivo que nombra el periodo, no con una cantidad ("during three hours" es incorrecto — eso es "for three hours").' },
      { front: 'by / until', back: 'plazo límite vs. duración continua', detail: 'by Friday = a más tardar el viernes (un solo momento). until Friday = continúa hasta el viernes (toda la duración). "Finish by Friday" ≠ "Wait until Friday".' },
    ],
    items: [
      { sentence: "I've lived here ___ five years.", correct: "for", explain: "'For' + a length of time: for five years, for two hours." },
      { sentence: "She's been studying ___ 9am.", correct: "since", explain: "'Since' + a starting point in time: since 9am, since Monday." },
      { sentence: "He fell asleep ___ the movie.", correct: "during", explain: "'During' + a noun/event that names a period: during the movie." },
      { sentence: "Please finish the report ___ Friday.", correct: "by", explain: "'By' = no later than a deadline." },
      { sentence: "We'll wait ___ you get back.", correct: "until", explain: "'Until' = up to the point when something happens." },
      { sentence: "I haven't seen him ___ last Christmas.", correct: "since", explain: "'Since' + a starting point in time." },
      { sentence: "They travelled ___ two weeks.", correct: "for", explain: "'For' + a length of time." },
      { sentence: "The shop is closed ___ renovations.", correct: "during", explain: "'During' + a noun naming the period/event." },
      { sentence: "The essay must be submitted ___ midnight.", correct: "by", explain: "'By' = a deadline: no later than." },
      { sentence: "I'll be at the office ___ 6pm, then I'm leaving.", correct: "until", explain: "'Until' = how long a situation continues." },
    ]
  }
};
