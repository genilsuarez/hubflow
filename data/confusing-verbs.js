export const CATEGORIES = {
  'make-do': {
    label: "Make / Do",
    icon: "🔨",
    pairs: ["make","do"],
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
    label: "Say / Tell",
    icon: "🗣️",
    pairs: ["say","tell"],
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
    label: "Bring / Take",
    icon: "📦",
    pairs: ["bring","take"],
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
    label: "Borrow / Lend",
    icon: "🤝",
    pairs: ["borrow","lend"],
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
    label: "Watch / Look / See",
    icon: "👁️",
    pairs: ["watch","look","see"],
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
};
