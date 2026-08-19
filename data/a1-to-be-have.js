// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
export const CATEGORIES = {
  toBeAffirmative: {
    label: 'To Be — Affirmative',
    icon: '😊',
    options: ['am', 'is', 'are'],
    studyCards: [
      { front: 'I → am', back: 'solo para "I", siempre', detail: 'I am a student. · I am from Mexico. (nunca "I is" o "I are")' },
      { front: 'he / she / it → is', back: '3ª persona singular', detail: 'She is a doctor. · It is a nice day. · My brother is tall.' },
      { front: 'you / we / they → are', back: '2ª persona y plural', detail: 'You are very kind. · We are at home. · They are my friends. · My parents are happy.' },
    ],
    items: [
      { sentence: 'I ___ a student.', correct: 'am', explain: '"I" always goes with "am".' },
      { sentence: 'She ___ a doctor.', correct: 'is', explain: '"She/he/it" go with "is".' },
      { sentence: 'They ___ my friends.', correct: 'are', explain: '"They/we/you" go with "are".' },
      { sentence: 'He ___ tired today.', correct: 'is', explain: '"He" goes with "is".' },
      { sentence: 'We ___ at home.', correct: 'are', explain: '"We" goes with "are".' },
      { sentence: 'You ___ very kind.', correct: 'are', explain: '"You" goes with "are", singular or plural.' },
      { sentence: 'It ___ a nice day.', correct: 'is', explain: '"It" goes with "is".' },
      { sentence: 'My brother ___ tall.', correct: 'is', explain: 'Singular noun subjects use "is".' },
      { sentence: 'My parents ___ happy.', correct: 'are', explain: 'Plural noun subjects use "are".' },
      { sentence: 'I ___ from Mexico.', correct: 'am', explain: '"I" always goes with "am".' },
    ]
  },
  toBeNegative: {
    label: 'To Be — Negative',
    icon: '🙅',
    options: ["am not", "isn't", "aren't"],
    studyCards: [
      { front: 'I am not', back: 'no tiene forma contraída con "am"', detail: '"I\'m not" es correcto, pero nunca "I amn\'t". Única excepción en todo el sistema.' },
      { front: 'he/she/it → isn\'t', back: 'is not → isn\'t', detail: 'She isn\'t at school. · It isn\'t cold today.' },
      { front: 'you/we/they → aren\'t', back: 'are not → aren\'t', detail: 'They aren\'t ready. · We aren\'t late.' },
    ],
    items: [
      { sentence: 'I ___ hungry right now.', correct: 'am not', explain: '"I am not" has no short form for "am".' },
      { sentence: "She ___ at school today.", correct: "isn't", explain: '"is not" contracts to "isn\'t" with she/he/it.' },
      { sentence: 'They ___ ready yet.', correct: "aren't", explain: '"are not" contracts to "aren\'t" with they/we/you.' },
      { sentence: 'He ___ my brother.', correct: "isn't", explain: '"is not" contracts to "isn\'t" with she/he/it.' },
      { sentence: 'We ___ late.', correct: "aren't", explain: '"are not" contracts to "aren\'t" with they/we/you.' },
      { sentence: 'It ___ cold today.', correct: "isn't", explain: '"it" is singular, so it takes "isn\'t".' },
      { sentence: 'You ___ wrong.', correct: "aren't", explain: '"you" takes "aren\'t".' },
      { sentence: 'My dog ___ big.', correct: "isn't", explain: 'Singular subjects take "isn\'t".' },
      { sentence: 'My friends ___ here.', correct: "aren't", explain: 'Plural subjects take "aren\'t".' },
      { sentence: 'I ___ sure about that.', correct: 'am not', explain: '"I am not" has no short form for "am".' },
    ]
  },
  haveGot: {
    label: 'Have / Has',
    icon: '🎒',
    options: ['have', 'has'],
    studyCards: [
      { front: 'I / you / we / they → have', back: 'todos excepto 3ª persona singular', detail: 'I have a new phone. · They have a big house.' },
      { front: 'he / she / it → has', back: '3ª persona singular', detail: 'She has two brothers. · My cat has blue eyes.' },
      { front: 'Regla rápida', back: 'Si usas "is/does" con ese sujeto → "has". Si usas "are/do" → "have"', detail: '"She is/does/has" forman un grupo. "They are/do/have" forman otro.' },
    ],
    items: [
      { sentence: 'I ___ a new phone.', correct: 'have', explain: 'I/you/we/they use "have".' },
      { sentence: 'She ___ two brothers.', correct: 'has', explain: 'She/he/it use "has".' },
      { sentence: 'They ___ a big house.', correct: 'have', explain: 'I/you/we/they use "have".' },
      { sentence: 'He ___ a red car.', correct: 'has', explain: 'She/he/it use "has".' },
      { sentence: 'We ___ a lot of homework.', correct: 'have', explain: 'I/you/we/they use "have".' },
      { sentence: 'My cat ___ blue eyes.', correct: 'has', explain: 'A single cat is "it", so "has".' },
      { sentence: 'You ___ a great idea.', correct: 'have', explain: 'I/you/we/they use "have".' },
      { sentence: 'My sister ___ a good job.', correct: 'has', explain: 'Singular subjects use "has".' },
      { sentence: 'I ___ three cousins.', correct: 'have', explain: 'I/you/we/they use "have".' },
      { sentence: 'The teacher ___ many students.', correct: 'has', explain: 'Singular subjects use "has".' },
    ]
  },
  toBeQuestions: {
    label: 'To Be — Questions',
    icon: '❓',
    options: ['Am', 'Is', 'Are'],
    studyCards: [
      { front: 'Inversión: be + sujeto + complemento?', back: 'el verbo se pone antes del sujeto', detail: '"She is tired." → "Is she tired?" (is pasa al principio)' },
      { front: 'Am I...? / Is he/she/it...? / Are you/we/they...?', back: 'mismas reglas que afirmativo, solo invierte', detail: 'Am I late? · Is she a teacher? · Are they at home?' },
    ],
    items: [
      { sentence: '___ you ready?', correct: 'Are', explain: 'Questions start with the "be" form that matches the subject.' },
      { sentence: '___ she a teacher?', correct: 'Is', explain: '"She" takes "is".' },
      { sentence: '___ they at home?', correct: 'Are', explain: '"They" takes "are".' },
      { sentence: '___ I late?', correct: 'Am', explain: '"I" takes "am".' },
      { sentence: '___ he your friend?', correct: 'Is', explain: '"He" takes "is".' },
      { sentence: '___ we early?', correct: 'Are', explain: '"We" takes "are".' },
      { sentence: '___ it your book?', correct: 'Is', explain: '"It" takes "is".' },
      { sentence: '___ you hungry?', correct: 'Are', explain: '"You" takes "are".' },
      { sentence: '___ your parents here?', correct: 'Are', explain: 'Plural subjects take "are".' },
      { sentence: '___ this seat free?', correct: 'Is', explain: 'Singular subjects take "is".' },
    ]
  },
};
