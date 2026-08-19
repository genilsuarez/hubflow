// `studyCards` enseña la REGLA del par antes de examinarla en Quiz. Antes
// Study mostraba las mismas 10 frases del Quiz con la respuesta detrás — el
// examen disfrazado de flashcard, sin la regla enunciada en ningún lado.
// Mismo patrón que sentence-quiz-engine.js / a1-plurals-possessives.js.
export const CATEGORIES = {
  'make-do': {
    label: "Make / Do",
    icon: "🔨",
    pairs: ["make","do"],
    studyCards: [
      { front: "'Do' = tasks, chores, activities", back: 'do homework, do the dishes, do the shopping', detail: "No creas algo nuevo, solo realizas una actividad." },
      { front: "'Make' = create or produce", back: 'make a cake, make dinner, make a decision', detail: "Traes algo a la existencia que no existía antes." },
      { front: 'Fixed expressions with do', back: 'do a favor · do your best', detail: "Estas van siempre con 'do', sin excepción." },
      { front: 'Fixed expressions with make', back: 'make the bed · make money · make a phone call', detail: "Estas van siempre con 'make', aunque no 'crees' nada físico." },
    ],
    items: [
      { sentence: "I need to ___ my homework before dinner.", correct: "do", explain: "'Do' is used for tasks and chores: do homework, do the dishes." },
      { sentence: "She wants to ___ a cake for her birthday.", correct: "make", explain: "'Make' is used for creating or producing something: make a cake, make dinner." },
      { sentence: "Can you ___ me a favor?", correct: "do", explain: "Fixed expression: do a favour." },
      { sentence: "He always ___ his bed in the morning.", correct: "makes", explain: "'Make the bed' — fixed expression with 'make'." },
      { sentence: "They ___ a lot of money last year.", correct: "made", explain: "'Make money' = to earn money. Always with 'make'." },
      { sentence: "I ___ the laundry every Saturday.", correct: "do", explain: "'Do the laundry' — household chores take 'do'." },
      { sentence: "Let me ___ a phone call first.", correct: "make", explain: "'Make a phone call' — fixed expression." },
      { sentence: "She ___ her best to pass the exam.", correct: "did", explain: "'Do your best' = to try as hard as you can." },
      { sentence: "We need to ___ a decision soon.", correct: "make", explain: "'Make a decision' — fixed expression." },
      { sentence: "He ___ the shopping on Fridays.", correct: "does", explain: "'Do the shopping' — activities take 'do'." },
    ]
  },
  'say-tell': {
    label: "Say / Tell",
    icon: "🗣️",
    pairs: ["say","tell"],
    studyCards: [
      { front: "'Tell' needs a person (indirect object)", back: 'tell + me/him/her/us/them', detail: 'Tell me the truth. · Tell her the news. Never just "tell the truth" without a listener stated when there is one.' },
      { front: "'Say' doesn't need a person", back: 'say + (that)...', detail: 'She said hello. · He said that he was tired. If a person follows, it needs "to": say something to someone.' },
      { front: 'Fixed expressions with say', back: 'say hello/goodbye/sorry', detail: 'Social expressions always take "say".' },
      { front: 'Fixed expressions with tell', back: 'tell a lie · tell the difference', detail: 'Estas van siempre con "tell", aunque no haya un oyente explícito en la frase.' },
    ],
    items: [
      { sentence: "She ___ me the truth.", correct: "told", explain: "'Tell' always takes an indirect object (me, him, her, us, them)." },
      { sentence: "What did he ___?", correct: "say", explain: "'Say' does not require an indirect object." },
      { sentence: "Can you ___ me the time, please?", correct: "tell", explain: "'Tell me' = decirme. Tell + persona." },
      { sentence: "___ hello to your mother for me.", correct: "Say", explain: "'Say hello/goodbye/sorry' — fixed expressions with 'say'." },
      { sentence: "He ___ a lie to his teacher.", correct: "told", explain: "'Tell a lie' — fixed expression with 'tell'." },
      { sentence: "They ___ that the weather will improve.", correct: "say", explain: "'Say that...' reports general information." },
      { sentence: "Don't ___ anyone about this.", correct: "tell", explain: "'Tell someone' = decirle a alguien. Tell + persona." },
      { sentence: "He ___ 'I'm sorry' and left.", correct: "said", explain: "'Say' for direct quotes: He said '...'." },
      { sentence: "Can you ___ the difference?", correct: "tell", explain: "'Tell the difference' = to notice the difference. Fixed expression." },
      { sentence: "She ___ goodbye and walked away.", correct: "said", explain: "'Say goodbye' — social expressions always take 'say'." },
    ]
  },
  'bring-take': {
    label: "Bring / Take",
    icon: "📦",
    pairs: ["bring","take"],
    studyCards: [
      { front: "'Bring' = towards the speaker", back: 'movement TO here', detail: 'Bring me a glass of water. (I am here, it comes to me)' },
      { front: "'Take' = away from the speaker", back: 'movement AWAY from here', detail: "Take your umbrella. (it goes with you, away from here)" },
      { front: 'How to choose', back: 'Where is the speaker when it arrives?', detail: 'If you\'ll be there when it arrives → bring. If you\'re leaving it behind → take.' },
      { front: 'Fixed expression', back: 'take someone for a walk', detail: '"Take" fijo, aunque el paseo empiece justo donde estás.' },
    ],
    items: [
      { sentence: "Can you ___ me a glass of water?", correct: "bring", explain: "'Bring' = movement towards the speaker." },
      { sentence: "Don't forget to ___ your umbrella.", correct: "take", explain: "'Take' = movement away from the speaker." },
      { sentence: "She ___ her laptop to work every day.", correct: "takes", explain: "Carrying something to a place away from here → 'take'." },
      { sentence: "He ___ flowers when he visits.", correct: "brings", explain: "Bringing something to where you are → 'bring'." },
      { sentence: "I'll ___ the kids to school tomorrow.", correct: "take", explain: "Llevar personas a otro lugar → take." },
      { sentence: "Please ___ your books to class.", correct: "bring", explain: "The speaker is in the class → 'bring' (towards me)." },
      { sentence: "She always ___ homemade cookies to the party.", correct: "brings", explain: "If the speaker is at the party → 'bring'." },
      { sentence: "I need to ___ the car to the mechanic.", correct: "take", explain: "Llevar lejos → take." },
      { sentence: "Can you ___ some snacks when you come?", correct: "bring", explain: "'When you come' implies movement towards me → 'bring'." },
      { sentence: "He ___ his dog for a walk every evening.", correct: "takes", explain: "'Take for a walk' — fixed expression with 'take'." },
    ]
  },
  'borrow-lend': {
    label: "Borrow / Lend",
    icon: "🤝",
    pairs: ["borrow","lend"],
    studyCards: [
      { front: "'Borrow' = I receive (temporarily)", back: 'borrow FROM someone', detail: 'Can I borrow your pen? (yo lo recibo, lo uso, lo devuelvo)' },
      { front: "'Lend' = I give (temporarily)", back: 'lend something TO someone / lend someone something', detail: 'Can you lend me ten dollars? (yo lo doy, tú lo usas, me lo devuelves)' },
      { front: 'Same action, opposite direction', back: 'borrow ≠ lend', detail: 'A pide prestado (borrows) a B; B presta (lends) a A. Es la misma transacción vista desde los dos lados.' },
    ],
    items: [
      { sentence: "Can I ___ your pen for a moment?", correct: "borrow", explain: "'Borrow' = pedir prestado (yo recibo)." },
      { sentence: "Could you ___ me ten dollars?", correct: "lend", explain: "'Lend' = to give something temporarily. Lend me = give it to me for a while." },
      { sentence: "I ___ the book from the library.", correct: "borrowed", explain: "Receiving something temporarily → 'borrow from'." },
      { sentence: "She ___ me her notes for the exam.", correct: "lent", explain: "Ella me dio temporalmente → lent (past de lend)." },
      { sentence: "He never ___ money to friends.", correct: "lends", explain: "Dar prestado → lend. Él da a otros." },
      { sentence: "Can I ___ your car this weekend?", correct: "borrow", explain: "Yo quiero usar algo tuyo → borrow." },
      { sentence: "The bank ___ them money to buy a house.", correct: "lent", explain: "The bank is the giver → 'lend'." },
      { sentence: "I ___ a ladder from my neighbor.", correct: "borrowed", explain: "I am the one receiving, from my neighbour → 'borrow'." },
      { sentence: "She doesn't like to ___ her things.", correct: "lend", explain: "She is the one giving her things → 'lend'." },
      { sentence: "May I ___ your charger?", correct: "borrow", explain: "Yo quiero usar algo temporalmente → borrow." },
    ]
  },
  'watch-look-see': {
    label: "Watch / Look / See",
    icon: "👁️",
    pairs: ["watch","look","see"],
    studyCards: [
      { front: "'See' = passive perception", back: "you don't try, it just happens", detail: 'I can see the mountains from my window. · Did you see the accident?' },
      { front: "'Look (at)' = deliberate, one moment", back: "you choose to direct your eyes", detail: 'Look at that sunset! · He looked both ways before crossing.' },
      { front: "'Watch' = deliberate, over time", back: 'something that moves or changes', detail: 'Watch TV · Watch a movie · Watch out! (be careful)' },
      { front: 'How to choose', back: 'Effort? Duration? Movement?', detail: 'Sin esfuerzo → see. Un vistazo puntual → look. Atención sostenida a algo que cambia → watch.' },
    ],
    items: [
      { sentence: "I ___ a movie last night.", correct: "watched", explain: "'Watch' = to look attentively at something that moves or changes." },
      { sentence: "___ at that beautiful sunset!", correct: "Look", explain: "'Look at' = to direct your eyes deliberately, at one moment." },
      { sentence: "Did you ___ the accident?", correct: "see", explain: "'See' = to perceive with your eyes, without effort." },
      { sentence: "She ___ TV for three hours every day.", correct: "watches", explain: "'Watch TV' — following something moving over a period of time." },
      { sentence: "I can ___ the mountains from my window.", correct: "see", explain: "'See' = visual ability / passive perception." },
      { sentence: "He ___ both ways before crossing the street.", correct: "looked", explain: "'Look' = to turn your eyes deliberately." },
      { sentence: "Let me ___ if there are seats available.", correct: "see", explain: "'Let me see' / 'I'll see' = verificar/comprobar." },
      { sentence: "___ out! There's a car coming!", correct: "Watch", explain: "'Watch out!' = be careful. Fixed expression." },
      { sentence: "I haven't ___ her since last week.", correct: "seen", explain: "'See someone' = to meet or catch sight of someone." },
      { sentence: "Can you ___ after my bag?", correct: "look", explain: "'Look after' = to take care of. Phrasal verb with 'look'." },
    ]
  },
};
