/**
 * Text Cohesion Data — choose the correct reference word (it/this/these/the former.../so...)
 */

export const CATEGORIES = {
  referenceWords: {
    label: 'Reference Words',
    icon: '🧵',
    options: ['it', 'this', 'these', 'the former', 'the latter'],
    items: [
      { sentence: 'I bought a new phone. ___ is very fast.', correct: 'it', explain: '"It" refers back to the single thing just mentioned (the phone).' },
      { sentence: 'The team lost the match, but they played well. ___ surprised the fans.', correct: 'this', explain: '"This" can refer back to a whole previous idea or situation.' },
      { sentence: 'We visited Paris and Rome last year. ___ are both amazing cities.', correct: 'these', explain: '"These" refers back to two or more things just mentioned.' },
      { sentence: 'He was offered two jobs: a manager role and an assistant role. ___ paid more money.', correct: 'the former', explain: '"The former" refers back to the first of two options mentioned.' },
      { sentence: 'Of the two candidates, one was experienced and one was a recent graduate. ___ lacked experience.', correct: 'the latter', explain: '"The latter" refers back to the second of two options mentioned.' },
      { sentence: 'My sister lost her keys again. ___ happens every week.', correct: 'this', explain: '"This" refers back to the whole situation just described.' },
      { sentence: 'I read three books this month. ___ were all non-fiction.', correct: 'these', explain: '"These" refers back to the multiple items just mentioned.' },
      { sentence: 'The company launched a new app. ___ became popular within days.', correct: 'it', explain: '"It" refers back to the single thing just mentioned (the app).' },
      { sentence: 'There were two routes: the highway and the coastal road. ___ was longer but more scenic.', correct: 'the latter', explain: '"The latter" refers back to the second option (the coastal road).' },
      { sentence: 'He apologized for being late. ___ was appreciated by everyone.', correct: 'this', explain: '"This" refers back to the act of apologizing.' },
    ]
  },
  advancedCohesion: {
    label: 'Advanced Cohesion',
    icon: '🔍',
    options: ['so', 'such', 'one', 'neither', 'either'],
    items: [
      { sentence: 'Is he coming to the party? I hope ___.', correct: 'so', explain: '"I hope so" substitutes for the whole clause "he is coming".' },
      { sentence: "I don't like coffee, and my brother doesn't ___.", correct: 'either', explain: '"Either" agrees with a negative statement.' },
      { sentence: 'Neither Tom nor Ana called; ___ of them remembered.', correct: 'neither', explain: '"Neither" refers back to both people, meaning "not one nor the other".' },
      { sentence: 'It was ___ a difficult exam that many students cried.', correct: 'such', explain: '"Such" + a/an + adjective + noun emphasizes the degree.' },
      { sentence: "I need a new phone — mine is ___ that's cheap and reliable.", correct: 'one', explain: '"One" substitutes for a countable noun already mentioned ("a phone").' },
      { sentence: "She said she'd help, and I believe ___.", correct: 'so', explain: '"I believe so" substitutes for the whole idea just stated.' },
      { sentence: "He can't swim, and she can't ___.", correct: 'either', explain: '"Either" agrees with a negative statement.' },
      { sentence: 'It was ___ an amazing concert that we stayed for the encore.', correct: 'such', explain: '"Such" + a/an + adjective + noun emphasizes the degree.' },
      { sentence: "I don't have a car, but I'd like ___.", correct: 'one', explain: '"One" substitutes for the countable noun "a car".' },
      { sentence: '___ of us wanted to go first, so we drew straws.', correct: 'neither', explain: '"Neither" means "not one of the two of us".' },
    ]
  }
};
