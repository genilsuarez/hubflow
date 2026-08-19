/**
 * Collocations Data — common verb + noun collocations
 * Categories: Make/Do, Have/Take, Get/Give, Pay/Keep
 */

// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
export const CATEGORIES = {
  makedo: {
    label: 'Make / Do',
    icon: '🔨',
    options: ['make', 'do'],
    studyCards: [
      { front: 'make', back: 'crear, producir, lograr', detail: 'make a decision · make a mistake · make progress · make a plan · make an effort' },
      { front: 'do', back: 'realizar actividades, tareas, trabajo', detail: 'do homework · do a favour · do housework · do exercise · do your best' },
      { front: 'Truco', back: '¿Produces algo nuevo? → make. ¿Realizas una tarea? → do.', detail: 'make a cake (produces a cake) · do the dishes (realizes a task). Hay excepciones fijas: memoriza las más comunes.' },
    ],
    items: [
      { sentence: 'I need to ___ a decision soon.', correct: 'make', explain: '"Make a decision" — fixed collocation.' },
      { sentence: 'Please ___ your homework before dinner.', correct: 'do', explain: '"Do homework" — fixed collocation.' },
      { sentence: 'Don\'t ___ a mistake on the test.', correct: 'make', explain: '"Make a mistake" — fixed collocation.' },
      { sentence: 'Can you ___ me a favour?', correct: 'do', explain: '"Do someone a favour" — fixed collocation.' },
      { sentence: 'She wants to ___ progress in her career.', correct: 'make', explain: '"Make progress" — fixed collocation.' },
      { sentence: 'I have to ___ the housework today.', correct: 'do', explain: '"Do the housework" — fixed collocation.' },
      { sentence: 'Let\'s ___ a plan for the weekend.', correct: 'make', explain: '"Make a plan" — fixed collocation.' },
      { sentence: 'He needs to ___ some exercise.', correct: 'do', explain: '"Do exercise" — fixed collocation.' },
      { sentence: 'They will ___ an effort to arrive early.', correct: 'make', explain: '"Make an effort" — fixed collocation.' },
      { sentence: 'I always ___ my best at work.', correct: 'do', explain: '"Do your best" — fixed collocation.' }
    ]
  },
  havetake: {
    label: 'Have / Take',
    icon: '🤝',
    options: ['have', 'take'],
    studyCards: [
      { front: 'have', back: 'have breakfast/lunch/dinner · have a rest · have a conversation', detail: 'Comidas, descanso y comunicación → have. Estas colocaciones no funcionan con "take".' },
      { front: 'take', back: 'take a break · take a photo · take a seat · take a risk · take care of', detail: 'Acciones que requieren iniciativa o desplazamiento → take.' },
    ],
    items: [
      { sentence: 'Let\'s ___ a break for ten minutes.', correct: 'take', explain: '"Take a break" — fixed collocation.' },
      { sentence: 'I want to ___ breakfast at 8.', correct: 'have', explain: '"Have breakfast" — fixed collocation.' },
      { sentence: 'Did you ___ a good time at the party?', correct: 'have', explain: '"Have a good time" — fixed collocation.' },
      { sentence: 'Please ___ a seat and wait.', correct: 'take', explain: '"Take a seat" — fixed collocation.' },
      { sentence: 'I need to ___ a rest after work.', correct: 'have', explain: '"Have a rest" — fixed collocation.' },
      { sentence: 'Can you ___ a photo of us?', correct: 'take', explain: '"Take a photo" — fixed collocation.' },
      { sentence: 'We should ___ a conversation about this.', correct: 'have', explain: '"Have a conversation" — fixed collocation.' },
      { sentence: 'He decided to ___ a risk and invest.', correct: 'take', explain: '"Take a risk" — fixed collocation.' },
      { sentence: 'Let\'s ___ lunch together tomorrow.', correct: 'have', explain: '"Have lunch" — fixed collocation.' },
      { sentence: 'She will ___ care of the children.', correct: 'take', explain: '"Take care of" — fixed collocation.' }
    ]
  },
  getgive: {
    label: 'Get / Give',
    icon: '🎁',
    options: ['get', 'give'],
    studyCards: [
      { front: 'give', back: 'give a lift · give advice · give a call · give a presentation · give a hand', detail: '"Give a hand" = ayudar. Dar algo a alguien (físico o abstracto) → give.' },
      { front: 'get', back: 'get ready · get a job · get a haircut · get a mark · get in touch', detail: 'Obtener o alcanzar un estado → get.' },
    ],
    items: [
      { sentence: 'Can you ___ me a lift to the station?', correct: 'give', explain: '"Give someone a lift" — fixed collocation.' },
      { sentence: 'I need to ___ ready for work.', correct: 'get', explain: '"Get ready" — fixed collocation.' },
      { sentence: 'Let me ___ you a hand with that.', correct: 'give', explain: '"Give a hand" (help) — fixed collocation.' },
      { sentence: 'Did you ___ a good mark on the exam?', correct: 'get', explain: '"Get a mark/grade" — fixed collocation.' },
      { sentence: 'The teacher will ___ us some advice.', correct: 'give', explain: '"Give advice" — fixed collocation.' },
      { sentence: 'I hope to ___ a job soon.', correct: 'get', explain: '"Get a job" — fixed collocation.' },
      { sentence: 'Please ___ me a call tonight.', correct: 'give', explain: '"Give someone a call" — fixed collocation.' },
      { sentence: 'She wants to ___ a haircut.', correct: 'get', explain: '"Get a haircut" — fixed collocation.' },
      { sentence: 'We need to ___ in touch with them.', correct: 'get', explain: '"Get in touch" — fixed collocation.' },
      { sentence: 'The manager will ___ a presentation tomorrow.', correct: 'give', explain: '"Give a presentation" — fixed collocation.' }
    ]
  },
  paykeep: {
    label: 'Pay / Keep / Save',
    icon: '💰',
    options: ['pay', 'keep', 'save'],
    studyCards: [
      { front: 'pay', back: 'pay attention · pay a visit · pay the bill · pay a fine', detail: '"Pay attention" y "pay a visit" son fijas — no funcionan con "give" ni "do".' },
      { front: 'keep', back: 'keep calm · keep a secret · keep a promise', detail: 'Mantener un estado o cumplir un compromiso → keep.' },
      { front: 'save', back: 'save money · save time · save lives', detail: 'Preservar o acumular algo valioso → save.' },
    ],
    items: [
      { sentence: 'You should ___ attention in class.', correct: 'pay', explain: '"Pay attention" — fixed collocation.' },
      { sentence: 'Try to ___ calm during the exam.', correct: 'keep', explain: '"Keep calm" — fixed collocation.' },
      { sentence: 'I want to ___ money for a holiday.', correct: 'save', explain: '"Save money" — fixed collocation.' },
      { sentence: 'Please ___ me a visit next week.', correct: 'pay', explain: '"Pay a visit" — fixed collocation.' },
      { sentence: 'Can you ___ a secret?', correct: 'keep', explain: '"Keep a secret" — fixed collocation.' },
      { sentence: 'This app helps you ___ time.', correct: 'save', explain: '"Save time" — fixed collocation.' },
      { sentence: 'He forgot to ___ the bill.', correct: 'pay', explain: '"Pay the bill" — fixed collocation.' },
      { sentence: 'Firefighters ___ lives every day.', correct: 'save', explain: '"Save lives" — fixed collocation.' },
      { sentence: 'She had to ___ a fine for speeding.', correct: 'pay', explain: '"Pay a fine" — fixed collocation.' },
      { sentence: 'She managed to ___ her promise.', correct: 'keep', explain: '"Keep a promise" — fixed collocation.' }
    ]
  }
};
