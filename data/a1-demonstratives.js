export const CATEGORIES = {
  thisSingularNear: {
    label: 'This (singular, near)',
    icon: '👉',
    options: ['this', 'that', 'these'],
    items: [
      { sentence: '___ is my book. (in my hand)', correct: 'this', explain: "'This' is for one thing near you." },
      { sentence: '___ pen is mine. (on my desk)', correct: 'this', explain: "'This' is for one thing near you." },
      { sentence: 'I like ___ shirt. (that I am wearing)', correct: 'this', explain: "'This' is for one thing near you." },
      { sentence: '___ is my dog. (next to me)', correct: 'this', explain: "'This' is for one thing near you." },
      { sentence: '___ apple is delicious. (in my hand)', correct: 'this', explain: "'This' is for one thing near you." },
      { sentence: '___ is my classroom. (I am standing in it)', correct: 'this', explain: "'This' is for one thing near you." },
      { sentence: '___ chair is comfortable. (I am sitting on it)', correct: 'this', explain: "'This' is for one thing near you." },
      { sentence: '___ is my phone. (on the table next to me)', correct: 'this', explain: "'This' is for one thing near you." },
      { sentence: '___ song is beautiful. (playing right now)', correct: 'this', explain: "'This' is for one thing near you." },
      { sentence: '___ is my house. (I am standing outside it)', correct: 'this', explain: "'This' is for one thing near you." },
    ]
  },
  thatSingularFar: {
    label: 'That (singular, far)',
    icon: '👈',
    options: ['that', 'this', 'those'],
    items: [
      { sentence: '___ is my car. (across the street)', correct: 'that', explain: "'That' is for one thing far from you." },
      { sentence: '___ building is very tall. (in the distance)', correct: 'that', explain: "'That' is for one thing far from you." },
      { sentence: 'Who is ___ man over there?', correct: 'that', explain: "'That' is for one person far from you." },
      { sentence: '___ mountain is beautiful. (far away)', correct: 'that', explain: "'That' is for one thing far from you." },
      { sentence: 'Can you see ___ bird on the tree?', correct: 'that', explain: "'That' is for one thing far from you." },
      { sentence: '___ is my old school. (across town)', correct: 'that', explain: "'That' is for one thing far from you." },
      { sentence: '___ house belongs to my uncle. (down the street)', correct: 'that', explain: "'That' is for one thing far from you." },
      { sentence: 'I like ___ painting on the far wall.', correct: 'that', explain: "'That' is for one thing far from you." },
      { sentence: '___ was a great movie. (we watched last month)', correct: 'that', explain: "'That' can also refer to something in the past." },
      { sentence: 'Is ___ your bag over there?', correct: 'that', explain: "'That' is for one thing far from you." },
    ]
  },
  thesePluralNear: {
    label: 'These (plural, near)',
    icon: '👉👉',
    options: ['these', 'those', 'this'],
    items: [
      { sentence: '___ are my books. (in my hands)', correct: 'these', explain: "'These' is for more than one thing near you." },
      { sentence: '___ shoes are new. (on my feet)', correct: 'these', explain: "'These' is for more than one thing near you." },
      { sentence: 'I like ___ flowers. (on my desk)', correct: 'these', explain: "'These' is for more than one thing near you." },
      { sentence: '___ are my friends. (standing next to me)', correct: 'these', explain: "'These' is for more than one thing near you." },
      { sentence: '___ apples are fresh. (in my basket)', correct: 'these', explain: "'These' is for more than one thing near you." },
      { sentence: '___ are my classmates. (sitting near me)', correct: 'these', explain: "'These' is for more than one thing near you." },
      { sentence: '___ pictures are beautiful. (I am holding them)', correct: 'these', explain: "'These' is for more than one thing near you." },
      { sentence: '___ are my keys. (in my hand)', correct: 'these', explain: "'These' is for more than one thing near you." },
      { sentence: '___ cookies taste great. (on my plate)', correct: 'these', explain: "'These' is for more than one thing near you." },
      { sentence: '___ are my new clothes. (I am wearing them)', correct: 'these', explain: "'These' is for more than one thing near you." },
    ]
  },
  thosePluralFar: {
    label: 'Those (plural, far)',
    icon: '👈👈',
    options: ['those', 'these', 'that'],
    items: [
      { sentence: '___ are my cousins. (standing across the room)', correct: 'those', explain: "'Those' is for more than one thing far from you." },
      { sentence: '___ mountains are beautiful. (in the distance)', correct: 'those', explain: "'Those' is for more than one thing far from you." },
      { sentence: 'Who are ___ people over there?', correct: 'those', explain: "'Those' is for more than one thing far from you." },
      { sentence: '___ birds are flying south. (far away)', correct: 'those', explain: "'Those' is for more than one thing far from you." },
      { sentence: 'Can you see ___ stars tonight?', correct: 'those', explain: "'Those' is for more than one thing far from you." },
      { sentence: '___ are my old toys. (in the box across the room)', correct: 'those', explain: "'Those' is for more than one thing far from you." },
      { sentence: '___ houses belong to my neighbors. (down the street)', correct: 'those', explain: "'Those' is for more than one thing far from you." },
      { sentence: 'I like ___ paintings on the far wall.', correct: 'those', explain: "'Those' is for more than one thing far from you." },
      { sentence: '___ were great years. (in the past)', correct: 'those', explain: "'Those' can also refer to things in the past." },
      { sentence: 'Are ___ your bags over there?', correct: 'those', explain: "'Those' is for more than one thing far from you." },
    ]
  }
};
