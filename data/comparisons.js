/**
 * Comparisons Data — comparative & superlative adjectives
 * Categories: Structure words (than/as/the), Irregular forms
 */

export const CATEGORIES = {
  structure: {
    label: 'Structure',
    icon: '⚖️',
    options: ['than', 'as', 'the'],
    items: [
      { sentence: 'This book is more interesting ___ the last one.', correct: 'than', explain: 'Comparatives are followed by "than".' },
      { sentence: 'She\'s as smart ___ her brother.', correct: 'as', explain: '"As + adjective + as" expresses equality.' },
      { sentence: 'It was ___ best decision I ever made.', correct: 'the', explain: 'Superlatives take "the".' },
      { sentence: 'Nothing is worse ___ losing your keys.', correct: 'than', explain: 'Comparatives are followed by "than".' },
      { sentence: "He's not as tall ___ his older brother.", correct: 'as', explain: '"As...as" for comparing equal (or unequal, when negated) degrees.' },
      { sentence: "This is ___ most beautiful place I've ever visited.", correct: 'the', explain: 'Superlatives take "the".' },
      { sentence: 'Life gets busier ___ we get older.', correct: 'as', explain: 'Here "as" means "while" — a different, common use of the word.' },
      { sentence: 'Nothing tastes better ___ homemade bread.', correct: 'than', explain: 'Comparatives are followed by "than".' }
    ]
  },
  irregular: {
    label: 'Irregular Forms',
    icon: '🔁',
    options: ['better', 'worse', 'further', 'best', 'worst', 'furthest'],
    items: [
      { sentence: 'This restaurant is much ___ than the one we tried last week.', correct: 'better', explain: '"Good" → comparative "better" (irregular).' },
      { sentence: 'My cold got ___ overnight.', correct: 'worse', explain: '"Bad" → comparative "worse" (irregular).' },
      { sentence: 'I need ___ information before I can decide.', correct: 'further', explain: '"Far" → "further" for additional/extra (not physical distance).' },
      { sentence: "That was the ___ meal I've ever had — incredible!", correct: 'best', explain: '"Good" → superlative "best" (irregular).' },
      { sentence: "This is the ___ film I've seen all year — a total waste of time.", correct: 'worst', explain: '"Bad" → superlative "worst" (irregular).' },
      { sentence: 'How much ___ is the station from here?', correct: 'further', explain: '"Far" → "further"/"farther" for physical distance.' }
    ]
  }
};
