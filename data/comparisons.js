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
      { sentence: 'Nothing tastes better ___ homemade bread.', correct: 'than', explain: 'Comparatives are followed by "than".' },
      { sentence: 'This exercise is easier ___ I expected.', correct: 'than', explain: 'Comparatives are followed by "than".' },
      { sentence: "The weather isn't as warm ___ it was yesterday.", correct: 'as', explain: '"As...as" for comparing degrees (here negated).' }
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
      { sentence: 'How much ___ is the station from here?', correct: 'further', explain: '"Far" → "further"/"farther" for physical distance.' },
      { sentence: "That's the ___ I've ever run — a full marathon!", correct: 'furthest', explain: '"Far" → superlative "furthest" for maximum distance or degree.' },
      { sentence: 'The ___ point from the entrance is the emergency exit at the back.', correct: 'furthest', explain: '"Far" → superlative "furthest" for the greatest physical distance.' },
      { sentence: 'My results were ___ than I expected — I\'m thrilled.', correct: 'better', explain: '"Good" → comparative "better" (irregular).' },
      { sentence: 'Of all the candidates, she performed ___.', correct: 'best', explain: '"Good" → superlative "best" (irregular).' }
    ]
  },
  doubleComparatives: {
    label: 'Double Comparatives',
    icon: '📈',
    options: ['the more', 'the less', 'the better', 'the harder', 'the longer', 'the sooner'],
    items: [
      { sentence: '___ you practise, the better you get.', correct: 'the more', explain: 'Double comparative: "the more... the more/better" — both clauses use "the + comparative".' },
      { sentence: 'The harder you work, ___ the results.', correct: 'the better', explain: '"The harder... the better" — a parallel double comparative.' },
      { sentence: '___ I think about it, the more confused I get.', correct: 'the more', explain: '"The more... the more" — increasing one thing increases the other.' },
      { sentence: '___ you eat junk food, the healthier you will be.', correct: 'the less', explain: '"The less... the healthier" — decreasing one improves another.' },
      { sentence: 'The sooner we leave, ___ we will arrive.', correct: 'the sooner', explain: '"The sooner... the sooner" — both clauses mirror the same comparative to show parallel speed.' },
      { sentence: '___ he waited, the more impatient he became.', correct: 'the longer', explain: '"The longer... the more" — duration increases frustration.' },
      { sentence: 'The more money you save now, ___ stress you will have later.', correct: 'the less', explain: '"The more... the less" — one increase leads to a decrease in another.' },
      { sentence: '___ you delay, the harder it becomes.', correct: 'the longer', explain: '"The longer you delay" — duration of inaction worsens the outcome.' },
      { sentence: 'The more she read, ___ she knew.', correct: 'the more', explain: '"The more... the more" — a self-reinforcing increase.' },
      { sentence: '___ the better — I\'d rather start right away.', correct: 'the sooner', explain: '"The sooner the better" — a fixed idiomatic double comparative.' },
    ]
  }
};
