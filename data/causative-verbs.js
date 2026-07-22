/**
 * Causative Verbs Data — have / get / make / let / help
 * Categories: Choose the verb (active causative), Passive causative (have/get + object + past participle)
 */

export const CATEGORIES = {
  chooseVerb: {
    label: 'Which causative verb?',
    icon: '🛠️',
    options: ['have', 'get', 'make', 'let', 'help'],
    items: [
      { sentence: 'I always ___ the mechanic check my brakes before a long trip.', correct: 'have', explain: '"Have" + person + base verb: you arrange for someone to do something (a service).' },
      { sentence: 'Did she ___ her brother help her move house?', correct: 'get', explain: '"Get" + person + to-infinitive: you persuade someone to do something.' },
      { sentence: 'Did the teacher ___ the students rewrite their essays?', correct: 'make', explain: '"Make" + person + base verb: you force someone, no choice involved.' },
      { sentence: 'Will your parents ___ you stay out late for the party?', correct: 'let', explain: '"Let" + person + base verb: you give someone permission.' },
      { sentence: 'Could you ___ me carry these bags?', correct: 'help', explain: '"Help" + person + base verb (or to + base): you assist someone.' },
      { sentence: "I won't ___ you leave without saying goodbye.", correct: 'let', explain: '"Let" + person + base verb: giving/refusing permission.' },
      { sentence: 'The manager always tries to ___ everyone work overtime.', correct: 'make', explain: '"Make" + person + base verb: forcing an action.' },
      { sentence: 'Would you ___ me finish this project?', correct: 'help', explain: '"Help" + person + base verb: assisting with a task.' },
      { sentence: 'We always ___ the plumber fix any leaks quickly.', correct: 'have', explain: '"Have" + person + base verb: arranging a service.' },
      { sentence: 'She finally ___ her landlord to fix the heating.', correct: 'get', explain: '"Get" + person + to-infinitive: persuading after effort.' }
    ]
  },
  passive: {
    label: 'Passive Causative',
    icon: '🧾',
    options: ['painted', 'washed', 'delivered', 'cleaned', 'cut', 'fixed'],
    items: [
      { sentence: 'I had my car ___ last weekend.', correct: 'washed', explain: 'Passive causative: "have" + object + past participle — someone else did it for you.' },
      { sentence: 'She got her hair ___ at the new salon.', correct: 'cut', explain: '"Get" + object + past participle also works, slightly more informal than "have".' },
      { sentence: 'We had the house ___ before moving in.', correct: 'painted', explain: 'Passive causative: you paid/arranged for someone to paint it.' },
      { sentence: 'They got the groceries ___ to their door.', correct: 'delivered', explain: 'Passive causative describing a service done for you.' },
      { sentence: 'He had his suit ___ for the wedding.', correct: 'cleaned', explain: 'Passive causative: the suit was cleaned by someone else, for him.' },
      { sentence: 'I got my laptop ___ after it broke.', correct: 'fixed', explain: 'Passive causative: someone else fixed it, arranged by "I".' },
      { sentence: 'She had her nails ___ before the event.', correct: 'painted', explain: 'Passive causative: someone did her nails for her.' },
      { sentence: 'We got the carpets ___ professionally.', correct: 'cleaned', explain: '"Get" + object + past participle: a service you arranged.' },
      { sentence: 'He had the furniture ___ to his new apartment.', correct: 'delivered', explain: 'Passive causative: delivery arranged by him.' },
      { sentence: 'I had my bike ___ at the shop yesterday.', correct: 'fixed', explain: 'Passive causative: the shop fixed it for you.' }
    ]
  }
};
