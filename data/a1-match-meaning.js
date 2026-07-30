export const CATEGORIES = {
  politeExpressions: {
    label: 'Polite Expressions',
    icon: '🙏',
    options: ['Hello', 'Goodbye', 'Please', 'Thank you', 'Sorry', 'Excuse me'],
    items: [
      { sentence: 'You meet a friend in the morning. You say:', correct: 'Hello', explain: '"Hello" is used when you first see someone.' },
      { sentence: 'You are leaving a party. You say:', correct: 'Goodbye', explain: '"Goodbye" is used when you leave.' },
      { sentence: "You want someone to pass the salt politely: '___ pass the salt.'", correct: 'Please', explain: '"Please" makes a request more polite.' },
      { sentence: 'Someone helps you carry your bags. You say:', correct: 'Thank you', explain: '"Thank you" shows gratitude.' },
      { sentence: "You step on someone's foot by accident. You say:", correct: 'Sorry', explain: '"Sorry" is used to apologize.' },
      { sentence: 'You want to walk past someone on a crowded bus. You say:', correct: 'Excuse me', explain: '"Excuse me" is used to politely get past or interrupt.' },
      { sentence: 'You receive a nice gift. You say:', correct: 'Thank you', explain: '"Thank you" shows gratitude.' },
      { sentence: "You are late for a meeting: '___, I'm late.'", correct: 'Sorry', explain: '"Sorry" is used to apologize.' },
      { sentence: 'You see your teacher for the first time today. You say:', correct: 'Hello', explain: '"Hello" is used when you first see someone.' },
      { sentence: 'The class is finished and everyone is leaving. You say:', correct: 'Goodbye', explain: '"Goodbye" is used when you leave.' },
    ]
  },
  feelings: {
    label: 'Feelings',
    icon: '😊',
    options: ['happy', 'sad', 'tired', 'hungry', 'thirsty', 'scared'],
    items: [
      { sentence: 'You want to eat something. You feel ___.', correct: 'hungry', explain: '"Hungry" means you need food.' },
      { sentence: 'You want to drink something. You feel ___.', correct: 'thirsty', explain: '"Thirsty" means you need water.' },
      { sentence: 'You slept only 2 hours. You feel ___.', correct: 'tired', explain: '"Tired" means you need rest.' },
      { sentence: 'You got a great birthday present. You feel ___.', correct: 'happy', explain: '"Happy" describes a good feeling.' },
      { sentence: 'Your pet died. You feel ___.', correct: 'sad', explain: '"Sad" describes an unhappy feeling.' },
      { sentence: 'You see a big spider. You feel ___.', correct: 'scared', explain: '"Scared" means afraid.' },
      { sentence: 'You are smiling and laughing. You feel ___.', correct: 'happy', explain: '"Happy" describes a good feeling.' },
      { sentence: 'You are crying. You feel ___.', correct: 'sad', explain: '"Sad" describes an unhappy feeling.' },
      { sentence: 'You need coffee to wake up. You feel ___.', correct: 'tired', explain: '"Tired" means you need rest.' },
      { sentence: "It's a dark movie and something jumps out. You feel ___.", correct: 'scared', explain: '"Scared" means afraid.' },
    ]
  },
  timeExpressions: {
    label: 'Time of Day',
    icon: '🕐',
    options: ['morning', 'afternoon', 'evening', 'night', 'today', 'tomorrow'],
    items: [
      { sentence: 'The sun just came up. It is ___.', correct: 'morning', explain: '"Morning" is the early part of the day.' },
      { sentence: "It's 3 PM. It is ___.", correct: 'afternoon', explain: '"Afternoon" is between noon and evening.' },
      { sentence: "The sun is setting and it's 7 PM. It is ___.", correct: 'evening', explain: '"Evening" is the time before night.' },
      { sentence: 'Everyone is sleeping. It is ___.', correct: 'night', explain: '"Night" is the darkest part of the day.' },
      { sentence: 'The day happening right now is ___.', correct: 'today', explain: '"Today" means the current day.' },
      { sentence: 'The day after today is ___.', correct: 'tomorrow', explain: '"Tomorrow" means the next day.' },
      { sentence: 'We eat breakfast in the ___.', correct: 'morning', explain: '"Morning" is the early part of the day.' },
      { sentence: 'We eat dinner in the ___.', correct: 'evening', explain: '"Evening" is the time before night.' },
      { sentence: 'Owls are awake at ___.', correct: 'night', explain: '"Night" is the darkest part of the day.' },
      { sentence: 'School classes usually finish in the ___.', correct: 'afternoon', explain: '"Afternoon" is between noon and evening.' },
    ]
  },
};
