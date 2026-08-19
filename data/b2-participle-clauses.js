// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
export const CATEGORIES = {
  presentParticipleClauses: {
    label: 'Present Participle Clauses',
    icon: '🏃',
    options: ['Walking', 'Walked', 'To walk'],
    studyCards: [
      { front: 'Verb-ing clause: acción simultánea o razón', back: 'mismo sujeto que la cláusula principal', detail: '"Walking down the street, I saw an old friend." (caminaba mientras veía al amigo) · "Feeling tired, she went to bed." (razón)' },
      { front: 'Trampa: ambos sujetos deben ser el mismo', back: 'dangling participle si no lo son', detail: '"Arriving at the station, the train left." (✗) → ¿Quién llegó? Debe ser el mismo que en la cláusula principal.' },
    ],
    items: [
      { sentence: "___ down the street, I saw an old friend.", correct: 'Walking', explain: "Present participle clauses (verb-ing) describe an action happening at the same time as the main clause." },
      { sentence: "___ tired, she decided to go to bed early.", correct: 'Feeling', explain: "Present participle clauses describe a simultaneous state or action.", options: ['Feeling', 'Felt', 'To feel'] },
      { sentence: "___ the door, he noticed it was locked.", correct: 'Opening', explain: "Present participle clauses describe a simultaneous action.", options: ['Opening', 'Opened', 'To open'] },
      { sentence: "___ the news, everyone was shocked.", correct: 'Hearing', explain: "Present participle clauses describe a simultaneous action.", options: ['Hearing', 'Heard', 'To hear'] },
      { sentence: "___ quickly, she managed to catch the train.", correct: 'Running', explain: "Present participle clauses describe a simultaneous action.", options: ['Running', 'Ran', 'To run'] },
      { sentence: "___ the report, he found several mistakes.", correct: 'Reading', explain: "Present participle clauses describe a simultaneous action.", options: ['Reading', 'Read', 'To read'] },
      { sentence: "___ nothing to say, she remained silent.", correct: 'Having', explain: "Present participle clauses can express reason as well as time.", options: ['Having', 'Had', 'To have'] },
      { sentence: "___ that he was late, he called the office.", correct: 'Realizing', explain: "Present participle clauses can express reason.", options: ['Realizing', 'Realized', 'To realize'] },
      { sentence: "___ in the garden, they didn't hear the phone.", correct: 'Working', explain: "Present participle clauses describe a simultaneous action.", options: ['Working', 'Worked', 'To work'] },
      { sentence: "___ the situation, the manager decided to act fast.", correct: 'Understanding', explain: "Present participle clauses can express reason.", options: ['Understanding', 'Understood', 'To understand'] },
    ]
  },
  pastParticipleClauses: {
    label: 'Past Participle Clauses',
    icon: '📦',
    options: ['Written', 'Writing', 'Wrote'],
    studyCards: [
      { front: 'Past participle clause: significado pasivo', back: '(having been) + participio, sin decirlo', detail: '"Written in 1990, the book is still popular." = "(Having been) written in 1990…" El sujeto recibe la acción.' },
    ],
    items: [
      { sentence: "___ in 1990, the book is still popular today.", correct: 'Written', explain: "Past participle clauses have a passive meaning: (having been) written." },
      { sentence: "___ by the storm, the roof needed repairs.", correct: 'Damaged', explain: "Past participle clauses have a passive meaning.", options: ['Damaged', 'Damaging', 'Damage'] },
      { sentence: "___ from local ingredients, the dish tasted amazing.", correct: 'Made', explain: "Past participle clauses have a passive meaning.", options: ['Made', 'Making', 'Make'] },
      { sentence: "___ by the news, she called her family.", correct: 'Shocked', explain: "Past participle clauses have a passive meaning.", options: ['Shocked', 'Shocking', 'Shock'] },
      { sentence: "___ in a hurry, the report contained several errors.", correct: 'Written', explain: "Past participle clauses have a passive meaning.", options: ['Written', 'Writing', 'Wrote'] },
      { sentence: "___ by experts, the bridge is considered very safe.", correct: 'Built', explain: "Past participle clauses have a passive meaning.", options: ['Built', 'Building', 'Build'] },
      { sentence: "___ with excitement, the children ran to open their gifts.", correct: 'Filled', explain: "Past participle clauses have a passive meaning.", options: ['Filled', 'Filling', 'Fill'] },
      { sentence: "___ many times, the movie is still a classic.", correct: 'Watched', explain: "Past participle clauses have a passive meaning.", options: ['Watched', 'Watching', 'Watch'] },
      { sentence: "___ carefully, the letter revealed the truth.", correct: 'Read', explain: "Past participle clauses have a passive meaning.", options: ['Read', 'Reading', 'To read'] },
      { sentence: "___ by the loud noise, the dog started barking.", correct: 'Startled', explain: "Past participle clauses have a passive meaning.", options: ['Startled', 'Startling', 'Startle'] },
    ]
  },
  perfectParticipleClauses: {
    label: 'Perfect Participle Clauses',
    icon: '⏱️',
    options: ['Having finished', 'Finishing', 'Finished'],
    studyCards: [
      { front: 'Having + participio pasado: acción anterior', back: 'la acción del participio ocurre ANTES que la principal', detail: '"Having finished his homework, he went out to play." (primero terminó, luego salió). Más formal que "after finishing".' },
    ],
    items: [
      { sentence: "___ his homework, he went out to play.", correct: 'Having finished', explain: "The perfect participle (having + past participle) shows an action completed before the main clause." },
      { sentence: "___ the letter, she sealed the envelope.", correct: 'Having written', explain: "The perfect participle shows a completed prior action.", options: ['Having written', 'Writing', 'Written'] },
      { sentence: "___ all the tickets, they couldn't attend the concert.", correct: 'Having sold', explain: "The perfect participle shows a completed prior action.", options: ['Having sold', 'Selling', 'Sold'] },
      { sentence: "___ the movie before, she knew the ending.", correct: 'Having seen', explain: "The perfect participle shows a completed prior action.", options: ['Having seen', 'Seeing', 'Seen'] },
      { sentence: "___ many years abroad, he spoke three languages.", correct: 'Having lived', explain: "The perfect participle shows a completed prior action.", options: ['Having lived', 'Living', 'Lived'] },
      { sentence: "___ his savings, he had to borrow money.", correct: 'Having lost', explain: "The perfect participle shows a completed prior action.", options: ['Having lost', 'Losing', 'Lost'] },
      { sentence: "___ the exam, she felt relieved.", correct: 'Having passed', explain: "The perfect participle shows a completed prior action.", options: ['Having passed', 'Passing', 'Passed'] },
      { sentence: "___ the mistake, he apologized immediately.", correct: 'Having realized', explain: "The perfect participle shows a completed prior action.", options: ['Having realized', 'Realizing', 'Realized'] },
      { sentence: "___ the whole book, she could finally discuss it.", correct: 'Having read', explain: "The perfect participle shows a completed prior action.", options: ['Having read', 'Reading', 'Read'] },
      { sentence: "___ the house, they decided to sell it.", correct: 'Having renovated', explain: "The perfect participle shows a completed prior action.", options: ['Having renovated', 'Renovating', 'Renovated'] },
    ]
  },
  participleClauseReduction: {
    label: 'Reducing Relative Clauses',
    icon: '✂️',
    options: ['sitting', 'who is sitting', 'sits'],
    studyCards: [
      { front: 'Cláusula activa → participio presente (-ing)', back: '"who is sitting" → "sitting"', detail: '"The man sitting next to me..." (= who is sitting). Activo, en curso.' },
      { front: 'Cláusula pasiva → participio pasado (-ed)', back: '"that was sent" → "sent"', detail: '"The letter sent to me last week..." (= that was sent). Pasivo.' },
      { front: 'Cláusula perfecta → having + participio', back: '"who have finished" → "having finished"', detail: '"Students having finished the exam should leave." (acción completada antes)' },
    ],
    items: [
      { sentence: "The man ___ next to me is my uncle. (= who is sitting)", correct: 'sitting', explain: "An active relative clause 'who is sitting' can be reduced to the present participle 'sitting'." },
      { sentence: "The letter ___ to me last week finally arrived. (= that was sent)", correct: 'sent', explain: "A passive relative clause 'that was sent' can be reduced to the past participle 'sent'.", options: ['sent', 'sending', 'who was sent'] },
      { sentence: "The people ___ in the queue seemed impatient. (= who were waiting)", correct: 'waiting', explain: "An active relative clause can be reduced to the present participle.", options: ['waiting', 'wait', 'waited'] },
      { sentence: "The car ___ outside belongs to my neighbor. (= that is parked)", correct: 'parked', explain: "A passive relative clause can be reduced to the past participle.", options: ['parked', 'parking', 'parks'] },
      { sentence: "Students ___ the exam should leave the room quietly. (= who have finished)", correct: 'having finished', explain: "A relative clause with a completed action can be reduced to a perfect participle.", options: ['having finished', 'finishing', 'finished'] },
      { sentence: "The book ___ on the table is mine. (= that is lying)", correct: 'lying', explain: "An active relative clause can be reduced to the present participle.", options: ['lying', 'lie', 'lain'] },
      { sentence: "The building ___ last year is already famous. (= that was completed)", correct: 'completed', explain: "A passive relative clause can be reduced to the past participle.", options: ['completed', 'completing', 'completes'] },
      { sentence: "Anyone ___ questions should raise their hand. (= who has)", correct: 'having', explain: "A relative clause can sometimes be reduced to the present participle 'having'.", options: ['having', 'has', 'had'] },
      { sentence: "The report ___ by the committee was very detailed. (= that was written)", correct: 'written', explain: "A passive relative clause can be reduced to the past participle.", options: ['written', 'writing', 'writes'] },
      { sentence: "The dog ___ loudly woke up the whole street. (= that was barking)", correct: 'barking', explain: "An active relative clause can be reduced to the present participle.", options: ['barking', 'bark', 'barked'] },
    ]
  }
};
