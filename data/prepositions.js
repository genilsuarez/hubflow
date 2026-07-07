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
    items: [
      { sentence: "I was born ___ 1995.", correct: "in", explain: "'In' para años: in 1995, in 2020." },
      { sentence: "The meeting is ___ Monday.", correct: "on", explain: "'On' para días de la semana: on Monday, on Friday." },
      { sentence: "She arrives ___ 3 o'clock.", correct: "at", explain: "'At' para horas exactas: at 3 o'clock, at noon." },
      { sentence: "We go on holiday ___ summer.", correct: "in", explain: "'In' para estaciones: in summer, in winter." },
      { sentence: "The exam is ___ March 15th.", correct: "on", explain: "'On' para fechas específicas: on March 15th." },
      { sentence: "I wake up ___ 7 a.m. every day.", correct: "at", explain: "'At' para horas: at 7 a.m., at midnight." },
      { sentence: "He started working here ___ January.", correct: "in", explain: "'In' para meses: in January, in December." },
      { sentence: "We met ___ a rainy afternoon.", correct: "on", explain: "'On' para partes del día con adjetivo: on a rainy afternoon." },
      { sentence: "The shop closes ___ midnight.", correct: "at", explain: "'At' para momentos del día: at midnight, at dawn." },
      { sentence: "I'll see you ___ the morning.", correct: "in", explain: "'In' para partes del día: in the morning, in the evening." },
      { sentence: "My birthday is ___ the 5th of July.", correct: "on", explain: "'On' para fechas: on the 5th of July." },
      { sentence: "She called me ___ lunchtime.", correct: "at", explain: "'At' para periodos breves: at lunchtime, at Christmas." },
      { sentence: "It happened ___ the 21st century.", correct: "in", explain: "'In' para siglos y periodos largos." },
      { sentence: "We always eat out ___ Friday evenings.", correct: "on", explain: "'On' para días + partes del día: on Friday evenings." },
      { sentence: "I'll be ready ___ half past six.", correct: "at", explain: "'At' para horas exactas: at half past six." },
      { sentence: "She got married ___ spring.", correct: "in", explain: "'In' para estaciones: in spring." },
      { sentence: "The concert is ___ Saturday night.", correct: "on", explain: "'On' para día + parte del día: on Saturday night." },
      { sentence: "We arrived ___ the same time.", correct: "at", explain: "'At the same time' = al mismo tiempo. Expresión fija." },
    ]
  },
  place: {
    label: 'Place',
    icon: '📍',
    options: ['in', 'on', 'at'],
    items: [
      { sentence: "She lives ___ London.", correct: "in", explain: "'In' para ciudades: in London, in Madrid." },
      { sentence: "The book is ___ the table.", correct: "on", explain: "'On' para superficies: on the table, on the wall." },
      { sentence: "I'll meet you ___ the airport.", correct: "at", explain: "'At' para puntos/lugares específicos: at the airport." },
      { sentence: "He grew up ___ a small village.", correct: "in", explain: "'In' para pueblos, ciudades, países: in a village." },
      { sentence: "There's a picture ___ the wall.", correct: "on", explain: "'On' para superficies verticales: on the wall." },
      { sentence: "She's waiting ___ the bus stop.", correct: "at", explain: "'At' para puntos de encuentro: at the bus stop." },
      { sentence: "I left my keys ___ the car.", correct: "in", explain: "'In' para espacios cerrados: in the car, in the room." },
      { sentence: "He sat ___ the floor.", correct: "on", explain: "'On' para superficies: on the floor, on the ground." },
      { sentence: "Turn left ___ the traffic lights.", correct: "at", explain: "'At' para puntos en un camino: at the traffic lights." },
      { sentence: "She works ___ a hospital.", correct: "in", explain: "'In' para edificios (dentro): in a hospital, in an office." },
      { sentence: "I saw her ___ the train.", correct: "on", explain: "'On' para transporte público: on the train, on the bus." },
      { sentence: "He's standing ___ the door.", correct: "at", explain: "'At' para puntos/umbrales: at the door, at the gate." },
      { sentence: "They live ___ the second floor.", correct: "on", explain: "'On' para pisos: on the second floor." },
      { sentence: "Is there a bank ___ this street?", correct: "in", explain: "'In' para calles (dentro del espacio): in this street." },
      { sentence: "She's studying ___ university.", correct: "at", explain: "'At' para instituciones: at university, at school." },
      { sentence: "The cat is sleeping ___ the bed.", correct: "on", explain: "'On' para superficie: on the bed (encima)." },
      { sentence: "I'll be ___ home all day.", correct: "at", explain: "'At home' = en casa. Expresión fija con at." },
      { sentence: "We swam ___ the sea.", correct: "in", explain: "'In' para cuerpos de agua: in the sea, in the pool." },
    ]
  },
  movement: {
    label: 'Movement',
    icon: '🚶',
    options: ['to', 'into', 'onto', 'towards', 'through'],
    items: [
      { sentence: "She walked ___ the door and left.", correct: "through", explain: "'Through' = a través de (pasar por un espacio)." },
      { sentence: "He jumped ___ the pool.", correct: "into", explain: "'Into' = hacia adentro de. Movimiento al interior." },
      { sentence: "We're going ___ Paris next week.", correct: "to", explain: "'To' para destino: go to Paris, go to school." },
      { sentence: "The cat jumped ___ the table.", correct: "onto", explain: "'Onto' = sobre (con movimiento hacia arriba)." },
      { sentence: "She ran ___ him and said hello.", correct: "towards", explain: "'Towards' = en dirección a (sin llegar necesariamente)." },
      { sentence: "They drove ___ the tunnel.", correct: "through", explain: "'Through' = a través de un espacio cerrado." },
      { sentence: "He fell ___ the water.", correct: "into", explain: "'Into' = caer dentro de. Movimiento + interior." },
      { sentence: "Please take this letter ___ the post office.", correct: "to", explain: "'To' = hacia un destino. Llevar a un lugar." },
      { sentence: "She climbed ___ the roof.", correct: "onto", explain: "'Onto' = hacia arriba y sobre una superficie." },
      { sentence: "The dog walked ___ me slowly.", correct: "towards", explain: "'Towards' = en dirección a, acercándose." },
      { sentence: "We walked ___ the park to get home.", correct: "through", explain: "'Through' = atravesar un espacio abierto." },
      { sentence: "She got ___ the car quickly.", correct: "into", explain: "'Get into' = entrar (en un coche, una habitación)." },
      { sentence: "I'm going ___ work now.", correct: "to", explain: "'To' + destino habitual: to work, to school." },
      { sentence: "He threw the ball ___ the roof.", correct: "onto", explain: "'Onto' = lanzar sobre una superficie elevada." },
      { sentence: "We walked ___ the forest for hours.", correct: "through", explain: "'Through' = recorrer el interior de un espacio grande." },
    ]
  },
  dependent: {
    label: 'Dependent',
    icon: '🔗',
    options: ['of', 'for', 'about', 'with', 'to', 'in', 'at', 'on'],
    items: [
      { sentence: "She's afraid ___ spiders.", correct: "of", explain: "'Afraid of' = tener miedo de. Adjetivo + preposición fija." },
      { sentence: "He's responsible ___ the project.", correct: "for", explain: "'Responsible for' = responsable de. Adj + prep fija." },
      { sentence: "I'm worried ___ the exam.", correct: "about", explain: "'Worried about' = preocupado por. Adj + prep fija." },
      { sentence: "She's good ___ maths.", correct: "at", explain: "'Good at' = bueno en. Adj + prep fija." },
      { sentence: "He's interested ___ history.", correct: "in", explain: "'Interested in' = interesado en. Adj + prep fija." },
      { sentence: "I'm tired ___ waiting.", correct: "of", explain: "'Tired of' = cansado de. Adj + prep fija." },
      { sentence: "She's married ___ a doctor.", correct: "to", explain: "'Married to' = casado con. Adj + prep fija." },
      { sentence: "He's angry ___ his brother.", correct: "with", explain: "'Angry with (someone)' = enojado con. Adj + prep." },
      { sentence: "I depend ___ my parents.", correct: "on", explain: "'Depend on' = depender de. Verbo + prep fija." },
      { sentence: "She apologized ___ being late.", correct: "for", explain: "'Apologize for' = disculparse por. Verbo + prep." },
      { sentence: "He congratulated me ___ passing.", correct: "on", explain: "'Congratulate on' = felicitar por. Verbo + prep." },
      { sentence: "She dreams ___ traveling the world.", correct: "of", explain: "'Dream of/about' = soñar con. Verbo + prep." },
      { sentence: "He insisted ___ paying the bill.", correct: "on", explain: "'Insist on' = insistir en. Verbo + prep fija." },
      { sentence: "I believe ___ hard work.", correct: "in", explain: "'Believe in' = creer en. Verbo + prep fija." },
      { sentence: "She complained ___ the noise.", correct: "about", explain: "'Complain about' = quejarse de. Verbo + prep." },
      { sentence: "He's keen ___ football.", correct: "on", explain: "'Keen on' = entusiasta de / le gusta. Adj + prep." },
      { sentence: "I'm satisfied ___ the results.", correct: "with", explain: "'Satisfied with' = satisfecho con. Adj + prep." },
      { sentence: "She belongs ___ this club.", correct: "to", explain: "'Belong to' = pertenecer a. Verbo + prep fija." },
    ]
  }
};
