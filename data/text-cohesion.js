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
      { sentence: 'She bought a used car. ___ broke down within a week.', correct: 'it', explain: '"It" refers back to the single thing just mentioned (the car).' },
      { sentence: 'He forgot his passport at home. ___ meant he almost missed the flight.', correct: 'this', explain: '"This" refers back to the whole situation just described.' },
      { sentence: 'We tried the pasta and the pizza. ___ were both delicious.', correct: 'these', explain: '"These" refers back to the two things just mentioned.' },
      { sentence: 'The company offered a bonus or extra holiday days. ___ was more popular among staff.', correct: 'the latter', explain: '"The latter" refers back to the second of two options mentioned.' },
      { sentence: 'She could study medicine or law. ___ required much longer training.', correct: 'the former', explain: '"The former" refers back to the first of two options mentioned.' },
      { sentence: 'I found my old diary yesterday. ___ brought back a lot of memories.', correct: 'it', explain: '"It" refers back to the single thing just mentioned (the diary).' },
      { sentence: 'He missed the deadline again. ___ frustrated his manager.', correct: 'this', explain: '"This" refers back to the whole situation just described.' },
      { sentence: 'We adopted two kittens last month. ___ are already best friends.', correct: 'these', explain: '"These" refers back to the two things just mentioned.' },
      { sentence: 'The museum has a Roman exhibit and an Egyptian exhibit. ___ is more popular with children.', correct: 'the latter', explain: '"The latter" refers back to the second option mentioned.' },
      { sentence: 'There were two flights available: an early one and a late one. ___ was cheaper.', correct: 'the former', explain: '"The former" refers back to the first option mentioned.' },
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
      { sentence: 'Are they moving to a new house? I think ___.', correct: 'so', explain: '"I think so" substitutes for the whole clause just mentioned.' },
      { sentence: "I can't drive, and my sister can't ___.", correct: 'either', explain: '"Either" agrees with a negative statement.' },
      { sentence: 'Neither the manager nor the assistant showed up; ___ explained why.', correct: 'neither', explain: '"Neither" refers back to both people, meaning "not one nor the other".' },
      { sentence: 'It was ___ a boring lecture that half the class fell asleep.', correct: 'such', explain: '"Such" + a/an + adjective + noun emphasizes the degree.' },
      { sentence: "My umbrella broke, so I need to buy a new ___.", correct: 'one', explain: '"One" substitutes for the countable noun "umbrella".' },
      { sentence: 'Will it rain tomorrow? The forecast says ___.', correct: 'so', explain: '"The forecast says so" substitutes for the whole idea just stated.' },
      { sentence: "I haven't finished the book, and he hasn't ___.", correct: 'either', explain: '"Either" agrees with a negative statement.' },
      { sentence: 'It was ___ a long journey that everyone fell asleep on the bus.', correct: 'such', explain: '"Such" + a/an + adjective + noun emphasizes the degree.' },
      { sentence: "I don't own a bicycle, but I'd like ___.", correct: 'one', explain: '"One" substitutes for the countable noun "bicycle".' },
      { sentence: '___ of the applicants had enough experience for the role.', correct: 'neither', explain: '"Neither" means "not one of the two candidates".' },
    ]
  }
};
