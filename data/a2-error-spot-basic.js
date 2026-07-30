export const CATEGORIES = {
  doesntVsDont: {
    label: "Don't / Doesn't",
    icon: '🚫',
    options: ["doesn't", "don't"],
    items: [
      { sentence: 'She ___ like vegetables.', correct: "doesn't", explain: 'He/she/it use "doesn\'t" in negative present simple.' },
      { sentence: 'They ___ have a car.', correct: "don't", explain: 'I/you/we/they use "don\'t" in negative present simple.' },
      { sentence: 'He ___ work on Sundays.', correct: "doesn't", explain: 'He/she/it use "doesn\'t" in negative present simple.' },
      { sentence: 'We ___ need help.', correct: "don't", explain: 'I/you/we/they use "don\'t" in negative present simple.' },
      { sentence: 'It ___ matter.', correct: "doesn't", explain: '"It" uses "doesn\'t" in negative present simple.' },
      { sentence: 'My parents ___ smoke.', correct: "don't", explain: 'Plural subjects use "don\'t".' },
      { sentence: 'The dog ___ bark much.', correct: "doesn't", explain: 'Singular subjects use "doesn\'t".' },
      { sentence: 'I ___ understand this.', correct: "don't", explain: '"I" uses "don\'t".' },
      { sentence: 'My sister ___ eat meat.', correct: "doesn't", explain: 'Singular subjects use "doesn\'t".' },
    ]
  },
  wasVsWere: {
    label: 'Was / Were',
    icon: '⏪',
    options: ['was', 'were'],
    items: [
      { sentence: 'I ___ at home yesterday.', correct: 'was', explain: '"I" takes "was" in the past simple of "be".' },
      { sentence: 'They ___ at the party.', correct: 'were', explain: '"They" takes "were".' },
      { sentence: 'She ___ very tired.', correct: 'was', explain: '"She" takes "was".' },
      { sentence: 'We ___ late for the bus.', correct: 'were', explain: '"We" takes "were".' },
      { sentence: 'He ___ born in 1990.', correct: 'was', explain: '"He" takes "was".' },
      { sentence: 'You ___ right about that.', correct: 'were', explain: '"You" always takes "were".' },
      { sentence: 'It ___ a good movie.', correct: 'was', explain: '"It" takes "was".' },
      { sentence: 'The children ___ happy.', correct: 'were', explain: 'Plural subjects take "were".' },
    ]
  },
  goVsGoes: {
    label: 'Go / Goes',
    icon: '🚶',
    options: ['go', 'goes'],
    items: [
      { sentence: 'She ___ to work by train.', correct: 'goes', explain: 'He/she/it add -es to "go" in the present simple.' },
      { sentence: 'I ___ to the gym every day.', correct: 'go', explain: 'I/you/we/they use the base form "go".' },
      { sentence: 'He ___ to bed early.', correct: 'goes', explain: 'He/she/it add -es to "go" in the present simple.' },
      { sentence: 'We ___ shopping on Saturdays.', correct: 'go', explain: 'I/you/we/they use the base form "go".' },
      { sentence: 'My brother ___ to school by bus.', correct: 'goes', explain: 'Singular subjects add -es: "goes".' },
      { sentence: 'They ___ on vacation every summer.', correct: 'go', explain: 'Plural subjects use the base form "go".' },
      { sentence: 'The bus ___ downtown.', correct: 'goes', explain: 'Singular subjects add -es: "goes".' },
      { sentence: 'You ___ too fast.', correct: 'go', explain: '"You" uses the base form "go".' },
    ]
  },
};
