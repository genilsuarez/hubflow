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
      { sentence: '___ I borrow your pen for a second?', correct: 'can', explain: '"Can" makes an informal request for permission.' },
      { sentence: '___ you help me lift this box, please?', correct: 'could', explain: '"Could" para peticiones educadas (más formal que "can").' },
      { sentence: 'Don\'t worry — I ___ take care of it.', correct: 'will', explain: '"Will" para una promesa o decisión espontánea.' },
      { sentence: 'She ___ speak four languages fluently.', correct: 'can', explain: '"Can" para habilidad presente.' }
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
      { sentence: "You ___ pay to enter the museum on Sundays — it's free.", correct: "don't have to", explain: '"Don\'t have to" = no obligation to pay.' },
      { sentence: 'You ___ touch that — it\'s still hot.', correct: 'mustn\'t', explain: '"Mustn\'t" = prohibición absoluta.' },
      { sentence: 'In Spain you ___ carry ID at all times.', correct: 'have to', explain: '"Have to" = obligación externa (una ley o norma).' },
      { sentence: 'You ___ try the new bakery — it\'s excellent.', correct: 'should', explain: '"Should" = recomendación, no obligación.' }
    ]
  },
  supposedTo: {
    label: '"Be supposed to"',
    icon: '📋',
    options: ['is supposed to', 'was supposed to', "isn't supposed to"],
    items: [
      { sentence: "The meeting ___ start at 9, but it's already 9:15.", correct: 'was supposed to', explain: 'An expectation or plan that was NOT met, in the past.' },
      { sentence: "A student ___ eat in the library — it's against the rules.", correct: "isn't supposed to", explain: '"Isn\'t supposed to" = not allowed / against the rules.' },
      { sentence: 'The train ___ arrive at platform 4 today.', correct: 'is supposed to', explain: '"Is supposed to" describes what is expected or scheduled to happen.' },
      { sentence: "Everyone ___ hand in the assignment by Friday, according to the syllabus.", correct: 'is supposed to', explain: 'States the expected/official plan.' },
      { sentence: "The delivery ___ arrive yesterday, but nothing came.", correct: 'was supposed to', explain: '"Was supposed to" = lo esperado que no ocurrió.' },
      { sentence: "The machine ___ make that noise — something is wrong.", correct: "isn't supposed to", explain: '"Isn\'t supposed to" = no es lo normal ni lo previsto.' },
      { sentence: 'The package ___ arrive on Tuesday, according to the tracking.', correct: 'is supposed to', explain: '"Is supposed to" = lo previsto o programado.' },
      { sentence: 'He ___ call his mother yesterday, but he forgot.', correct: 'was supposed to', explain: '"Was supposed to" = lo previsto que no ocurrió.' },
      { sentence: 'This door ___ be locked during opening hours.', correct: 'isn\'t supposed to', explain: '"Isn\'t supposed to" = contrario a la norma.' },
      { sentence: 'The software ___ crash every time you save.', correct: 'isn\'t supposed to', explain: '"Isn\'t supposed to" = no es el comportamiento esperado.' }
    ]
  }
};
