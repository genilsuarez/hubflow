/**
 * Modal Verbs Data
 * Categories: Meaning (ability/possibility/deduction/advice), Obligation, Be supposed to
 */

export const CATEGORIES = {
  meaning: {
    label: 'Meaning in Context',
    icon: '🧭',
    options: ['can', 'could', 'must', 'might', 'should', 'shall', 'will'],
    items: [
      { sentence: '___ you swim when you were five?', correct: 'could', explain: '"Could" expresses past ability.' },
      { sentence: "It's cloudy — it ___ rain later.", correct: 'might', explain: '"Might" expresses a weaker possibility.' },
      { sentence: 'You ___ wear a seatbelt in this country — it\'s the law.', correct: 'must', explain: '"Must" expresses a strong obligation or rule.' },
      { sentence: 'You ___ be tired after that flight.', correct: 'must', explain: '"Must" also expresses a confident deduction.' },
      { sentence: "You really ___ see a doctor about that cough.", correct: 'should', explain: '"Should" gives advice or a recommendation.' },
      { sentence: '___ we order dessert?', correct: 'shall', explain: '"Shall" (with I/we) makes a suggestion or offer.' },
      { sentence: 'I ___ speak French fluently by the time I graduate.', correct: 'will', explain: '"Will" expresses future certainty or a promise.' },
      { sentence: "He ___ not be at home — his car isn't there.", correct: 'might', explain: '"Might not" expresses uncertain possibility.' },
      { sentence: '___ I borrow your pen for a second?', correct: 'can', explain: '"Can" makes an informal request for permission.' }
    ]
  },
  obligation: {
    label: 'Obligation & Rules',
    icon: '⚖️',
    options: ['must', "mustn't", 'have to', "don't have to", 'should'],
    items: [
      { sentence: 'I ___ finish this report by 5pm — my boss said so.', correct: 'have to', explain: '"Have to" expresses an obligation imposed from outside (the boss).' },
      { sentence: "I ___ be strict with myself about deadlines — it's my own rule.", correct: 'must', explain: '"Must" expresses an obligation the speaker imposes on themselves.' },
      { sentence: "You ___ smoke in here — it's strictly forbidden.", correct: "mustn't", explain: '"Mustn\'t" expresses prohibition — it is not allowed.' },
      { sentence: "You ___ come if you don't want to — it's optional.", correct: "don't have to", explain: '"Don\'t have to" means there is no obligation, unlike "mustn\'t" (forbidden).' },
      { sentence: 'You ___ see a dentist twice a year for check-ups.', correct: 'should', explain: '"Should" gives advice — weaker than an obligation.' },
      { sentence: 'Passengers ___ fasten their seatbelts before takeoff.', correct: 'must', explain: '"Must" states a firm rule.' },
      { sentence: "You ___ pay to enter the museum on Sundays — it's free.", correct: "don't have to", explain: '"Don\'t have to" = no obligation to pay.' }
    ]
  },
  supposedTo: {
    label: '"Be supposed to"',
    icon: '📋',
    options: ['is supposed to', 'was supposed to', "isn't supposed to"],
    items: [
      { sentence: "The meeting ___ start at 9, but it's already 9:15.", correct: 'was supposed to', explain: 'An expectation or plan that was NOT met, in the past.' },
      { sentence: "You ___ eat in the library — it's against the rules.", correct: "isn't supposed to", explain: '"Isn\'t supposed to" = not allowed / against the rules.' },
      { sentence: 'The train ___ arrive at platform 4 today.', correct: 'is supposed to', explain: '"Is supposed to" describes what is expected or scheduled to happen.' },
      { sentence: "We ___ hand in the assignment by Friday, according to the syllabus.", correct: 'is supposed to', explain: 'States the expected/official plan.' }
    ]
  }
};
