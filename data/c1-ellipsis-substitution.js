// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
export const CATEGORIES = {
  soNotSubstitution: {
    label: 'So / Not',
    icon: '🔁',
    options: ['so', 'not'],
    studyCards: [
      { front: '"I think so / I hope so / I believe so"', back: 'sustituye una cláusula afirmativa', detail: '"Is she coming? I think so." = I think she is coming. "So" reemplaza la cláusula completa.' },
      { front: '"I hope not / I\'m afraid not"', back: 'sustituye una cláusula negativa', detail: '"Will it rain? I hope not." = I hope it will not rain. "Not" reemplaza la cláusula negativa completa.' },
      { front: 'Trampa: "I don\'t think so" (no "I think not")', back: 'en inglés moderno, la negación va en el verbo, no en "so"', detail: '"I don\'t think so" (correcto) vs "I think not" (muy formal/arcaico). El negativo idiomático es con el auxiliar negado.' },
    ],
    items: [
      { sentence: "Will it rain tomorrow? I hope ___ — we've planned a picnic.", correct: 'not', explain: '"I hope not" substitutes for "I hope it will not rain" — the picnic gives away which answer is hoped for.' },
      { sentence: 'Is she coming? I think ___ — I saw her name on the guest list.', correct: 'so', explain: '"I think so" substitutes for "I think she is coming" — the guest list is the evidence for "so".' },
      { sentence: 'Did he pass the exam? I believe ___ — he looked so relieved afterwards.', correct: 'so', explain: '"I believe so" substitutes for the full clause — his relief points to a pass.' },
      { sentence: 'Will they be late? I hope ___ — the show starts right on time.', correct: 'not', explain: '"I hope not" substitutes for the negative full clause — a show that starts on time is why lateness is unwanted.' },
      { sentence: "Is it true? I'm afraid ___ — I saw it happen with my own eyes.", correct: 'so', explain: '"I\'m afraid so" substitutes for the full clause — having seen it confirms it.' },
      { sentence: "Can we still go? I suppose ___ — nothing's stopping us now.", correct: 'so', explain: '"I suppose so" substitutes for the full clause — nothing stopping them means yes.' },
      { sentence: "Is there enough time? I'm afraid ___ — the train leaves in five minutes.", correct: 'not', explain: '"I\'m afraid not" substitutes for the negative full clause — five minutes isn\'t enough.' },
      { sentence: "Did she call? I don't think ___.", correct: 'so', explain: '"I don\'t think so" substitutes for the full clause — "I don\'t think not" isn\'t idiomatic English, so "so" is the only option that works here regardless of context.' },
      { sentence: 'Will he agree? I guess ___ — he usually says yes to things like this.', correct: 'so', explain: '"I guess so" substitutes for the full clause — his usual pattern points to "so".' },
      { sentence: 'Is the store open? I hope ___ — we still need to buy milk.', correct: 'so', explain: '"I hope so" substitutes for the full clause — needing milk is why they hope it\'s open.' },
    ]
  },
  auxiliaryEllipsis: {
    label: 'Auxiliary Ellipsis',
    icon: '✂️',
    options: ['does', 'did', 'has', 'can'],
    studyCards: [
      { front: 'Ellipsis con auxiliar', back: 'el auxiliar solo reemplaza el verbo + complemento completo', detail: '"She works harder than he does." (does = works). El auxiliar debe concordar en tiempo y persona con el sujeto nuevo.' },
    ],
    items: [
      { sentence: 'She works harder than he ___.', correct: 'does', explain: 'The auxiliary "does" replaces the repeated verb "works".' },
      { sentence: 'They finished before we ___.', correct: 'did', explain: 'The auxiliary "did" replaces the repeated verb "finished".' },
      { sentence: 'He has traveled more than she ___.', correct: 'has', explain: 'The auxiliary "has" replaces the repeated verb phrase "has traveled".' },
      { sentence: 'I can cook better than she ___.', correct: 'can', explain: 'The modal "can" replaces the repeated verb phrase "can cook".' },
      { sentence: 'My mother cooks better than my father ___.', correct: 'does', explain: 'The auxiliary "does" replaces the repeated verb "cooks".' },
      { sentence: 'We arrived earlier than they ___.', correct: 'did', explain: 'The auxiliary "did" replaces the repeated verb "arrived".' },
      { sentence: 'She has read more books than he ___.', correct: 'has', explain: 'The auxiliary "has" replaces the repeated verb phrase.' },
      { sentence: 'He can run faster than I ___.', correct: 'can', explain: 'The modal "can" replaces the repeated verb phrase "can run".' },
      { sentence: 'The new model performs better than the old one ___.', correct: 'does', explain: 'The auxiliary "does" replaces the repeated verb "performs".' },
      { sentence: 'I studied longer than he ___.', correct: 'did', explain: 'The auxiliary "did" replaces the repeated verb "studied".' },
    ]
  },
  oneSubstitution: {
    label: 'One / Ones',
    icon: '1️⃣',
    options: ['one', 'ones'],
    studyCards: [
      { front: 'one / ones', back: 'sustituye un sustantivo contable (singular / plural)', detail: '"I don\'t like this shirt; I prefer the blue one." (one = shirt) · "These shoes are nice, but I like the black ones." (ones = shoes)' },
    ],
    items: [
      { sentence: "I don't like this shirt; I prefer the blue ___.", correct: 'one', explain: '"One" replaces a singular noun (shirt).' },
      { sentence: 'These shoes are nice, but I like the black ___.', correct: 'ones', explain: '"Ones" replaces a plural noun (shoes).' },
      { sentence: 'This car is expensive; do you have a cheaper ___?', correct: 'one', explain: '"One" replaces a singular noun (car).' },
      { sentence: 'I need new pens; these ___ are broken.', correct: 'ones', explain: '"Ones" replaces a plural noun (pens).' },
      { sentence: 'That house is too small; we want a bigger ___.', correct: 'one', explain: '"One" replaces a singular noun (house).' },
      { sentence: "These cookies are stale; let's buy fresh ___.", correct: 'ones', explain: '"Ones" replaces a plural noun (cookies).' },
      { sentence: 'This phone is old; I need a newer ___.', correct: 'one', explain: '"One" replaces a singular noun (phone).' },
      { sentence: 'Those photos are blurry; do you have clearer ___?', correct: 'ones', explain: '"Ones" replaces a plural noun (photos).' },
      { sentence: 'This chair is broken; can I use another ___?', correct: 'one', explain: '"One" replaces a singular noun (chair).' },
      { sentence: 'These questions are hard; the easy ___ come later.', correct: 'ones', explain: '"Ones" replaces a plural noun (questions).' },
    ]
  },
  doSoSubstitution: {
    label: 'Do So / Did So',
    icon: '➡️',
    options: ['do so', 'did so'],
    studyCards: [
      { front: 'do so / did so', back: 'sustituye un verbo + complemento completo (más formal que "do it")', detail: '"If you want to leave early, you may do so." · "He promised to help, and he did so willingly." Más formal que "do it"; no funciona con verbos intransitivos.' },
    ],
    items: [
      { sentence: 'If you want to leave early, you may ___.', correct: 'do so', explain: '"Do so" replaces "leave early" in the present/future.' },
      { sentence: 'He promised to help, and he ___ willingly.', correct: 'did so', explain: '"Did so" replaces "helped" in the past.' },
      { sentence: 'She asked me to wait, so I ___.', correct: 'did so', explain: '"Did so" replaces "waited" in the past.' },
      { sentence: 'You can submit the form online if you wish to ___.', correct: 'do so', explain: '"Do so" replaces "submit the form" in the present/future.' },
      { sentence: 'They were told to leave, and they ___ immediately.', correct: 'did so', explain: '"Did so" replaces "left" in the past.' },
      { sentence: "If you'd like to comment, please feel free to ___.", correct: 'do so', explain: '"Do so" replaces "comment" in the present/future.' },
      { sentence: 'He was asked to apologize, and he ___ sincerely.', correct: 'did so', explain: '"Did so" replaces "apologized" in the past.' },
      { sentence: 'Employees may request time off if they need to ___.', correct: 'do so', explain: '"Do so" replaces "request time off" in the present/future.' },
      { sentence: 'She decided to resign, and she ___ quietly.', correct: 'did so', explain: '"Did so" replaces "resigned" in the past.' },
      { sentence: "You may proceed if you're ready to ___.", correct: 'do so', explain: '"Do so" replaces "proceed" in the present/future.' },
    ]
  },
};
