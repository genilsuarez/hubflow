/**
 * Modal Verbs Data
 * Categories: Meaning (ability/possibility/deduction/advice), Obligation, Be supposed to
 */

// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
export const CATEGORIES = {
  meaning: {
    label: 'Meaning in Context',
    icon: '🧭',
    options: ['can', 'could', 'must', 'might', 'should', 'shall', 'will'],
    studyCards: [
      { front: 'can (presente) / could (pasado)', back: 'habilidad y permiso informal', detail: '"She can speak four languages." · "Could you swim at age five?" · "Can/Could I borrow your pen?" (permiso, could es más formal)' },
      { front: 'must / should', back: 'obligación fuerte / consejo o recomendación', detail: '"You must wear a seatbelt — it\'s the law." (obligación) · "You should see a doctor." (recomendación)' },
      { front: 'might / will / shall', back: 'posibilidad débil / promesa-predicción / sugerencia (I/we)', detail: '"It might rain later." · "I will take care of it." (promesa) · "Shall we order dessert?" (sugerencia)' },
    ],
    items: [
      { sentence: '___ you swim when you were five?', correct: 'could', explain: '"Could" expresses past ability.' },
      { sentence: "It's cloudy — it ___ rain later.", correct: ['might', 'could'], explain: '"Might" expresses a weaker possibility — "could" works equally well here for the same weak possibility.' },
      { sentence: 'You ___ wear a seatbelt in this country — it\'s the law.', correct: 'must', explain: '"Must" expresses a strong obligation or rule.' },
      { sentence: "You ___ be exhausted after that flight — you look shattered.", correct: 'must', explain: '"Must" expresses a confident deduction, backed here by visible evidence ("you look shattered").' },
      { sentence: "You really ___ see a doctor about that cough.", correct: 'should', explain: '"Should" gives advice or a recommendation.' },
      { sentence: '___ we order dessert?', correct: 'shall', explain: '"Shall" (with I/we) makes a suggestion or offer.' },
      { sentence: '___ I borrow your pen for a second?', correct: ['can', 'could'], explain: '"Can" makes an informal request for permission — "could" is equally valid, just more polite.' },
      { sentence: '___ you help me lift this box, please?', correct: ['could', 'can'], explain: '"Could" for polite requests (more formal than "can") — "can" works too, just less formal.' },
      { sentence: 'Don\'t worry — I ___ take care of it.', correct: 'will', explain: '"Will" for a promise or a spontaneous decision.' },
      { sentence: 'She ___ speak four languages fluently.', correct: 'can', explain: '"Can" for present ability.' }
    ]
  },
  obligation: {
    label: 'Obligation & Rules',
    icon: '⚖️',
    options: ['must', "mustn't", 'have to', "don't have to", 'should'],
    studyCards: [
      { front: 'must vs have to', back: 'must = obligación interna / have to = obligación externa', detail: '"I must finish this report." (yo me lo impongo) · "I have to finish it — my boss said so." (viene de fuera)' },
      { front: 'mustn\'t vs don\'t have to', back: 'mustn\'t = PROHIBIDO / don\'t have to = NO es obligatorio', detail: '"You mustn\'t smoke here." (prohibido) ≠ "You don\'t have to come." (opcional, sin obligación)' },
      { front: 'should', back: 'consejo, recomendación (más débil que must)', detail: '"You should see a dentist twice a year." No es obligación — es lo que se recomienda.' },
    ],
    items: [
      { sentence: 'I ___ finish this report by 5pm — my boss said so.', correct: 'have to', explain: '"Have to" expresses an obligation imposed from outside (the boss).' },
      { sentence: "I ___ be strict with myself about deadlines — it's my own rule.", correct: 'must', explain: '"Must" expresses an obligation the speaker imposes on themselves.' },
      { sentence: "You ___ smoke in here — it's strictly forbidden.", correct: "mustn't", explain: '"Mustn\'t" expresses prohibition — it is not allowed.' },
      { sentence: "You ___ come if you don't want to — it's optional.", correct: "don't have to", explain: '"Don\'t have to" means there is no obligation, unlike "mustn\'t" (forbidden).' },
      { sentence: 'You ___ see a dentist twice a year for check-ups.', correct: 'should', explain: '"Should" gives advice — weaker than an obligation.' },
      { sentence: 'Passengers ___ fasten their seatbelts before takeoff.', correct: 'must', explain: '"Must" states a firm rule.' },
      { sentence: "You ___ pay to enter the museum on Sundays — it's free.", correct: "don't have to", explain: '"Don\'t have to" = no obligation to pay.' },
      { sentence: 'You ___ touch that — it\'s still hot.', correct: 'mustn\'t', explain: '"Mustn\'t" = absolute prohibition.' },
      { sentence: 'In Spain you ___ carry ID at all times.', correct: 'have to', explain: '"Have to" = external obligation (a law or rule).' },
      { sentence: 'You ___ try the new bakery — it\'s excellent.', correct: 'should', explain: '"Should" = a recommendation, not an obligation.' }
    ]
  },
  supposedTo: {
    label: '"Be supposed to"',
    icon: '📋',
    options: ['is supposed to', 'was supposed to', "isn't supposed to"],
    studyCards: [
      { front: 'is supposed to', back: 'lo que se espera o está programado (presente)', detail: '"The train is supposed to arrive at platform 4." = lo que dice el horario / lo que se espera.' },
      { front: 'was supposed to', back: 'expectativa que NO se cumplió (pasado)', detail: '"The meeting was supposed to start at 9, but it\'s already 9:15." Se esperaba pero no ocurrió.' },
      { front: 'isn\'t supposed to', back: 'no está permitido / no es el comportamiento esperado', detail: '"A student isn\'t supposed to eat in the library." = contra las reglas. "The machine isn\'t supposed to make that noise." = algo falla.' },
    ],
    items: [
      { sentence: "The meeting ___ start at 9, but it's already 9:15.", correct: 'was supposed to', explain: 'An expectation or plan that was NOT met, in the past.' },
      { sentence: "A student ___ eat in the library — it's against the rules.", correct: "isn't supposed to", explain: '"Isn\'t supposed to" = not allowed / against the rules.' },
      { sentence: 'The train ___ arrive at platform 4 today.', correct: 'is supposed to', explain: '"Is supposed to" describes what is expected or scheduled to happen.' },
      { sentence: "Everyone ___ hand in the assignment by Friday, according to the syllabus.", correct: 'is supposed to', explain: 'States the expected/official plan.' },
      { sentence: "The delivery ___ arrive yesterday, but nothing came.", correct: 'was supposed to', explain: '"Was supposed to" = what was expected but did not happen.' },
      { sentence: "The machine ___ make that noise — something is wrong.", correct: "isn't supposed to", explain: '"Isn\'t supposed to" = not what is normal or expected.' },
      { sentence: 'The package ___ arrive on Tuesday, according to the tracking.', correct: 'is supposed to', explain: '"Is supposed to" = what is expected or scheduled.' },
      { sentence: 'He ___ call his mother yesterday, but he forgot.', correct: 'was supposed to', explain: '"Was supposed to" = what was planned but did not happen.' },
      { sentence: 'This door ___ be locked during opening hours.', correct: 'isn\'t supposed to', explain: '"Isn\'t supposed to" = against the rule.' },
      { sentence: 'The software ___ crash every time you save.', correct: 'isn\'t supposed to', explain: '"Isn\'t supposed to" = not the expected behaviour.' }
    ]
  },
  pastDeduction: {
    label: 'Past Deduction',
    icon: '🔍',
    options: ['must have', 'can\'t have', 'might have', 'should have'],
    studyCards: [
      { front: 'must have + participio', back: 'deducción segura sobre el pasado', detail: '"She\'s not answering — she must have gone to bed." (la única explicación lógica)' },
      { front: 'can\'t have + participio', back: 'certeza de que NO pudo haber pasado', detail: '"He can\'t have forgotten — he never misses a birthday." (imposible según la evidencia)' },
      { front: 'might have / should have + participio', back: 'posibilidad incierta / arrepentimiento o reproche', detail: '"She might have taken the wrong bus." (una posibilidad) · "I should have studied harder." (me arrepiento)' },
    ],
    items: [
      { sentence: 'She\'s not answering — she ___ gone to bed already.', correct: 'must have', explain: '"Must have" = strong certainty about the past based on evidence.' },
      { sentence: 'He ___ forgotten — he never misses a birthday.', correct: 'can\'t have', explain: '"Can\'t have" = certainty that something was NOT possible.' },
      { sentence: 'They ___ left already; their car isn\'t outside.', correct: 'must have', explain: '"Must have" = the only logical conclusion given the evidence.' },
      { sentence: 'I ___ studied harder — I only just scraped a pass.', correct: 'should have', explain: '"Should have" + past participle = regret about a past action (or inaction).' },
      { sentence: 'She ___ taken the wrong bus; that would explain the delay.', correct: 'might have', explain: '"Might have" = a possible, uncertain explanation.' },
      { sentence: 'He ___ heard the news already — look how shocked he is.', correct: 'must have', explain: '"Must have" = near-certain deduction from visible evidence.' },
      { sentence: 'You ___ told me sooner! I could have helped.', correct: 'should have', explain: '"Should have" expresses a reproach about something that didn\'t happen.' },
      { sentence: 'It ___ rained last night — the ground is soaking wet.', correct: 'must have', explain: '"Must have" = confident deduction from clear evidence.' },
      { sentence: 'She ___ seen you — she was looking the other way the whole time.', correct: 'can\'t have', explain: '"Can\'t have" = the speaker is sure this was impossible.' },
      { sentence: 'We ___ booked earlier — the tickets are sold out now.', correct: 'should have', explain: '"Should have" here criticises a missed opportunity.' }
    ]
  }
};
