export const CATEGORIES = {
  toBeAffirmative: {
    label: 'To Be — Affirmative',
    icon: '😊',
    options: ['am', 'is', 'are'],
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
