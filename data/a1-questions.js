// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
export const CATEGORIES = {
  whWords: {
    label: 'Wh- Question Words',
    icon: '❓',
    options: ['What', 'Where', 'When', 'Who', 'Why', 'How'],
    studyCards: [
      { front: 'What / Who / Where', back: 'qué · quién · dónde', detail: 'What is your name? · Who is that man? · Where do you live?' },
      { front: 'When / Why / How', back: 'cuándo · por qué · cómo', detail: 'When is your birthday? · Why are you late? · How are you feeling?' },
      { front: 'How: no empieza con "wh-" pero funciona igual', back: 'pregunta sobre manera, estado o cantidad', detail: 'How are you? · How much? · How many? · How old are you?' },
    ],
    items: [
      { sentence: '___ is your name?', correct: 'What', explain: '"What" asks for information about a thing or idea.' },
      { sentence: '___ do you live?', correct: 'Where', explain: '"Where" asks about a place.' },
      { sentence: '___ is your birthday?', correct: 'When', explain: '"When" asks about a time or date.' },
      { sentence: '___ is that man?', correct: 'Who', explain: '"Who" asks about a person.' },
      { sentence: '___ are you late?', correct: 'Why', explain: '"Why" asks for a reason.' },
      { sentence: '___ are you feeling today?', correct: 'How', explain: '"How" asks about a condition or manner.' },
      { sentence: '___ does the movie start?', correct: 'When', explain: '"When" asks about a time or date.' },
      { sentence: '___ is the bathroom?', correct: 'Where', explain: '"Where" asks about a place.' },
      { sentence: '___ is your teacher?', correct: 'Who', explain: '"Who" asks about a person.' },
      { sentence: '___ do you like pizza so much?', correct: 'Why', explain: '"Why" asks for a reason.' },
      { sentence: '___ is your favourite colour?', correct: 'What', explain: '"What" asks for information about a thing or idea.' },
      { sentence: '___ are you from?', correct: 'Where', explain: '"Where" asks about a place.' },
      { sentence: '___ does the train leave?', correct: 'When', explain: '"When" asks about a time or date.' },
      { sentence: '___ is your best friend?', correct: 'Who', explain: '"Who" asks about a person.' },
    ]
  },
  doDoesQuestions: {
    label: 'Do / Does',
    icon: '🤔',
    options: ['Do', 'Does'],
    studyCards: [
      { front: 'Do', back: 'I / you / we / they', detail: 'Do you like coffee? · Do they have a car?' },
      { front: 'Does', back: 'he / she / it', detail: 'Does she work here? · Does it rain a lot? (3ª persona singular)' },
      { front: 'Trampa: Does + base verb (sin -s)', back: '"Does she work?" nunca "Does she works?"', detail: 'La -s del presente ya está en Does. El verbo siguiente vuelve a su forma base.' },
    ],
    items: [
      { sentence: '___ you like coffee?', correct: 'Do', explain: 'I/you/we/they use "Do" to form questions.' },
      { sentence: '___ she work here?', correct: 'Does', explain: 'He/she/it use "Does" to form questions.' },
      { sentence: '___ they have a car?', correct: 'Do', explain: 'I/you/we/they use "Do" to form questions.' },
      { sentence: '___ he speak English?', correct: 'Does', explain: 'He/she/it use "Does" to form questions.' },
      { sentence: '___ we need a ticket?', correct: 'Do', explain: 'I/you/we/they use "Do" to form questions.' },
      { sentence: '___ it rain a lot here?', correct: 'Does', explain: '"It" uses "Does" to form questions.' },
      { sentence: '___ your parents live nearby?', correct: 'Do', explain: 'Plural subjects use "Do" to form questions.' },
      { sentence: '___ your brother play soccer?', correct: 'Does', explain: 'Singular subjects use "Does" to form questions.' },
      { sentence: '___ I need to sign here?', correct: 'Do', explain: '"I" uses "Do" to form questions.' },
      { sentence: '___ the store open at 9?', correct: 'Does', explain: 'Singular subjects use "Does" to form questions.' },
      { sentence: '___ you speak French?', correct: 'Do', explain: 'I/you/we/they use "Do" to form questions.' },
      { sentence: '___ your sister like tea?', correct: 'Does', explain: 'Singular subjects use "Does" to form questions.' },
      { sentence: '___ we have homework today?', correct: 'Do', explain: 'I/you/we/they use "Do" to form questions.' },
    ]
  },
  isAreQuestions: {
    label: 'Is / Are',
    icon: '❔',
    options: ['Is', 'Are'],
    studyCards: [
      { front: 'Is', back: 'he / she / it + sustantivo singular', detail: 'Is she at home? · Is the store open? · Is this your book?' },
      { front: 'Are', back: 'you / we / they + sustantivo plural', detail: 'Are you a teacher? · Are they ready? · Are your shoes new?' },
      { front: 'Orden en preguntas', back: 'Is/Are + sujeto + complemento?', detail: '"Is she a teacher?" (Is + she + complement). En afirmativo es al revés: "She is a teacher."' },
    ],
    items: [
      { sentence: '___ you a teacher?', correct: 'Are', explain: '"You" takes "Are".' },
      { sentence: '___ she at home?', correct: 'Is', explain: '"She" takes "Is".' },
      { sentence: '___ they ready?', correct: 'Are', explain: '"They" takes "Are".' },
      { sentence: '___ it Monday today?', correct: 'Is', explain: '"It" takes "Is".' },
      { sentence: '___ your parents here?', correct: 'Are', explain: 'Plural subjects take "Are".' },
      { sentence: '___ this your book?', correct: 'Is', explain: 'Singular subjects take "Is".' },
      { sentence: '___ we late?', correct: 'Are', explain: '"We" takes "Are".' },
      { sentence: '___ he your friend?', correct: 'Is', explain: '"He" takes "Is".' },
      { sentence: '___ you hungry?', correct: 'Are', explain: '"You" takes "Are".' },
      { sentence: '___ the store open?', correct: 'Is', explain: 'Singular subjects take "Is".' },
      { sentence: '___ your shoes new?', correct: 'Are', explain: 'Plural subjects take "Are".' },
      { sentence: '___ this seat free?', correct: 'Is', explain: 'Singular subjects take "Is".' },
      { sentence: '___ they at school?', correct: 'Are', explain: '"They" takes "Are".' },
    ]
  },
};
