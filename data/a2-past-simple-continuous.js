export const CATEGORIES = {
  pastSimpleRegular: {
    label: 'Past Simple — Regular',
    icon: '⏮️',
    options: ['walked', 'walk', 'walking'],
    items: [
      { sentence: 'I ___ to school yesterday.', correct: 'walked', explain: "Regular verbs add -ed in the past simple." },
      { sentence: 'She ___ the door before she left.', correct: 'closed', explain: "Regular verbs add -ed in the past simple.", options: ['closed', 'close', 'closing'] },
      { sentence: 'We ___ dinner at seven last night.', correct: 'cooked', explain: "Regular verbs add -ed in the past simple.", options: ['cooked', 'cook', 'cooking'] },
      { sentence: 'They ___ a new car last month.', correct: 'wanted', explain: "Regular verbs add -ed in the past simple.", options: ['wanted', 'want', 'wanting'] },
      { sentence: 'He ___ his homework early.', correct: 'finished', explain: "Regular verbs add -ed in the past simple.", options: ['finished', 'finish', 'finishing'] },
      { sentence: 'I ___ my friend at the party.', correct: 'called', explain: "Regular verbs add -ed in the past simple.", options: ['called', 'call', 'calling'] },
      { sentence: 'She ___ very hard for the exam.', correct: 'studied', explain: "Verbs ending in consonant + y change y to i and add -ed.", options: ['studied', 'study', 'studyed'] },
      { sentence: 'We ___ the movie last weekend.', correct: 'watched', explain: "Regular verbs add -ed in the past simple.", options: ['watched', 'watch', 'watching'] },
      { sentence: 'He ___ the ball across the field.', correct: 'kicked', explain: "Regular verbs add -ed in the past simple.", options: ['kicked', 'kick', 'kicking'] },
      { sentence: 'They ___ the house last year.', correct: 'painted', explain: "Regular verbs add -ed in the past simple.", options: ['painted', 'paint', 'painting'] },
    ]
  },
  pastSimpleIrregular: {
    label: 'Past Simple — Irregular',
    icon: '🌀',
    options: ['went', 'goed', 'go'],
    items: [
      { sentence: 'I ___ to the beach last summer.', correct: 'went', explain: "'Go' is irregular: go → went." },
      { sentence: 'She ___ a beautiful dress.', correct: 'bought', explain: "'Buy' is irregular: buy → bought.", options: ['bought', 'buyed', 'buy'] },
      { sentence: 'We ___ pizza for dinner.', correct: 'ate', explain: "'Eat' is irregular: eat → ate.", options: ['ate', 'eated', 'eat'] },
      { sentence: 'He ___ his keys yesterday.', correct: 'lost', explain: "'Lose' is irregular: lose → lost.", options: ['lost', 'losed', 'lose'] },
      { sentence: 'They ___ a great time at the party.', correct: 'had', explain: "'Have' is irregular: have → had.", options: ['had', 'haved', 'have'] },
      { sentence: 'I ___ a strange dream last night.', correct: 'had', explain: "'Have' is irregular: have → had.", options: ['had', 'haved', 'have'] },
      { sentence: 'She ___ her phone on the table.', correct: 'left', explain: "'Leave' is irregular: leave → left.", options: ['left', 'leaved', 'leave'] },
      { sentence: 'We ___ that song on the radio.', correct: 'heard', explain: "'Hear' is irregular: hear → heard.", options: ['heard', 'heared', 'hear'] },
      { sentence: 'He ___ to the store early.', correct: 'went', explain: "'Go' is irregular: go → went.", options: ['went', 'goed', 'go'] },
      { sentence: 'They ___ the news on TV.', correct: 'saw', explain: "'See' is irregular: see → saw.", options: ['saw', 'seed', 'see'] },
    ]
  },
  pastContinuousForm: {
    label: 'Past Continuous — Form',
    icon: '⏳',
    options: ['was reading', 'reading', 'read'],
    items: [
      { sentence: 'I ___ a book when you called.', correct: 'was reading', explain: "Past continuous: was/were + verb-ing." },
      { sentence: 'They ___ football when it started to rain.', correct: 'were playing', explain: "Past continuous: was/were + verb-ing.", options: ['were playing', 'was playing', 'played'] },
      { sentence: 'She ___ dinner when the phone rang.', correct: 'was cooking', explain: "Past continuous: was/were + verb-ing.", options: ['was cooking', 'were cooking', 'cooked'] },
      { sentence: 'We ___ TV all evening.', correct: 'were watching', explain: "Past continuous: was/were + verb-ing.", options: ['were watching', 'was watching', 'watched'] },
      { sentence: 'He ___ his homework at 8pm.', correct: 'was doing', explain: "Past continuous: was/were + verb-ing.", options: ['was doing', 'were doing', 'did'] },
      { sentence: 'I ___ to music on the bus.', correct: 'was listening', explain: "Past continuous: was/were + verb-ing.", options: ['was listening', 'were listening', 'listened'] },
      { sentence: 'They ___ in the park at noon.', correct: 'were walking', explain: "Past continuous: was/were + verb-ing.", options: ['were walking', 'was walking', 'walked'] },
      { sentence: 'She ___ a letter when I arrived.', correct: 'was writing', explain: "Past continuous: was/were + verb-ing.", options: ['was writing', 'were writing', 'wrote'] },
      { sentence: 'We ___ for the bus at 7am.', correct: 'were waiting', explain: "Past continuous: was/were + verb-ing.", options: ['were waiting', 'was waiting', 'waited'] },
      { sentence: 'He ___ when the accident happened.', correct: 'was driving', explain: "Past continuous: was/were + verb-ing.", options: ['was driving', 'were driving', 'drove'] },
    ]
  },
  pastSimpleVsContinuousWhen: {
    label: 'Simple vs Continuous (When)',
    icon: '⚖️',
    options: ['was cooking, arrived', 'cooked, was arriving'],
    items: [
      { sentence: 'I ___ dinner when she ___.', correct: 'was cooking, arrived', explain: "Longer background action (was cooking) is interrupted by a shorter action (arrived)." },
      { sentence: 'She ___ TV when the phone ___.', correct: 'was watching, rang', explain: "Longer background action interrupted by a shorter one.", options: ['was watching, rang', 'watched, was ringing'] },
      { sentence: 'We ___ when it started to rain.', correct: 'were walking', explain: "Past continuous describes the ongoing action interrupted by the rain.", options: ['were walking', 'walked'] },
      { sentence: 'He ___ his keys while he ___ for the bus.', correct: 'lost, was waiting', explain: "The short action (lost) happened during the longer one (was waiting).", options: ['lost, was waiting', 'was losing, waited'] },
      { sentence: 'They ___ chess when I ___ home.', correct: 'were playing, got', explain: "Longer background action interrupted by a shorter one.", options: ['were playing, got', 'played, was getting'] },
      { sentence: 'I ___ a shower when the doorbell ___.', correct: 'was taking, rang', explain: "Longer background action interrupted by a shorter one.", options: ['was taking, rang', 'took, was ringing'] },
      { sentence: 'She ___ when I saw her at the cafe.', correct: 'was studying', explain: "Past continuous describes what was happening at a specific past moment.", options: ['was studying', 'studied'] },
      { sentence: 'We ___ dinner when the lights ___ off.', correct: 'were eating, went', explain: "Longer background action interrupted by a shorter one.", options: ['were eating, went', 'ate, were going'] },
      { sentence: 'He ___ his bike when he ___ the accident.', correct: 'was riding, had', explain: "Longer background action interrupted by a shorter one.", options: ['was riding, had', 'rode, was having'] },
      { sentence: 'I ___ my sister when you called.', correct: 'was calling', explain: "Past continuous describes what was in progress at that moment.", options: ['was calling', 'called'] },
    ]
  }
};
