/**
 * Clauses Data — relative clauses (who/which/that/whose/where/when)
 */

export const CATEGORIES = {
  people: {
    label: 'People',
    icon: '🧑',
    options: ['who', 'whose'],
    items: [
      { sentence: 'The man ___ called yesterday is my uncle.', correct: 'who', explain: '"Who" introduces a clause about a person (subject).' },
      { sentence: "She's the woman ___ car was stolen.", correct: 'whose', explain: '"Whose" shows possession.' },
      { sentence: 'The children ___ parents work here get a discount.', correct: 'whose', explain: '"Whose" shows possession, even for things linked to people.' },
      { sentence: 'People ___ exercise regularly tend to live longer.', correct: 'who', explain: '"Who" introduces a clause about people (subject).' },
      { sentence: 'The teacher ___ helped me pass the exam retired last year.', correct: 'who', explain: '"Who" introduces a clause about a person (subject).' },
      { sentence: 'The neighbour ___ dog barks all night moved away.', correct: 'whose', explain: '"Whose" shows possession (the neighbour\'s dog).' },
      { sentence: 'She married a man ___ she met on holiday.', correct: 'who', explain: '"Who" introduces a clause about a person (object).' },
      { sentence: 'I need a phone ___ battery lasts all day.', correct: 'whose', explain: '"Whose" shows possession for things.' },
      { sentence: 'The doctor ___ treated me was very kind.', correct: 'who', explain: '"Who" introduces a clause about a person (subject).' },
      { sentence: "That's the author ___ books became bestsellers.", correct: 'whose', explain: '"Whose" shows possession (the author\'s books).' }
    ]
  },
  things: {
    label: 'Things',
    icon: '🧩',
    options: ['which', 'who'],
    items: [
      { sentence: 'The company ___ makes this product is French.', correct: 'which', explain: '"Which" introduces a clause about a thing, not "who" (that\'s only for people).' },
      { sentence: 'The laptop ___ I bought last year still works perfectly.', correct: 'which', explain: '"Which" introduces a clause about a thing.' },
      { sentence: 'The film ___ won the award was directed by a newcomer.', correct: 'which', explain: '"Which" introduces a clause about a thing (subject).' },
      { sentence: 'The bus ___ goes to the airport leaves every hour.', correct: 'which', explain: '"Which" introduces a clause about a thing (subject), never "who".' },
      { sentence: 'The recipe ___ she used was her grandmother\'s.', correct: 'which', explain: '"Which" introduces a clause about a thing, not "who".' },
      { sentence: 'The painting ___ hangs in the hall is very old.', correct: 'which', explain: '"Which" introduces a clause about a thing (subject).' },
      { sentence: 'The phone ___ I dropped still works fine.', correct: 'which', explain: '"Which" introduces a clause about a thing.' },
      { sentence: 'The book ___ everyone is talking about just came out.', correct: 'which', explain: '"Which" introduces a clause about a thing.' },
      { sentence: 'The car ___ broke down yesterday is finally fixed.', correct: 'which', explain: '"Which" introduces a clause about a thing (subject), never "who".' },
      { sentence: 'The song ___ played at the wedding was beautiful.', correct: 'which', explain: '"Which" introduces a clause about a thing (subject).' }
    ]
  },
  placeTime: {
    label: 'Place & Time',
    icon: '🕒',
    options: ['where', 'when'],
    items: [
      { sentence: 'This is the house ___ I grew up.', correct: 'where', explain: '"Where" introduces a clause about a place.' },
      { sentence: 'I remember the day ___ we first met.', correct: 'when', explain: '"When" introduces a clause about a time.' },
      { sentence: 'This is the restaurant ___ we had our first date.', correct: 'where', explain: '"Where" introduces a clause about a place.' },
      { sentence: "That's the moment ___ everything changed.", correct: 'when', explain: '"When" introduces a clause about a time.' },
      { sentence: 'Is this the park ___ you go jogging every morning?', correct: 'where', explain: '"Where" introduces a clause about a place.' },
      { sentence: 'Do you remember the summer ___ we went camping?', correct: 'when', explain: '"When" introduces a clause about a time.' },
      { sentence: 'The hotel ___ we stayed had a beautiful garden.', correct: 'where', explain: '"Where" introduces a clause about a place.' },
      { sentence: 'Friday is the day ___ most people feel happiest.', correct: 'when', explain: '"When" introduces a clause about a time.' },
      { sentence: "That's the café ___ we always meet.", correct: 'where', explain: '"Where" introduces a clause about a place.' },
      { sentence: "I'll never forget the night ___ we got lost.", correct: 'when', explain: '"When" introduces a clause about a time.' }
    ]
  },
  thatOrWhich: {
    label: 'That or Which',
    icon: '✂️',
    options: ['that', 'which'],
    items: [
      { sentence: 'The book ___ I bought yesterday was expensive.', correct: 'that', explain: 'Defining clause (no commas) — "that" is the natural choice.' },
      { sentence: 'My car, ___ I bought last year, keeps breaking down.', correct: 'which', explain: 'Non-defining clause (commas) — "that" is never possible here.' },
      { sentence: 'This is the only restaurant ___ opens on Sundays.', correct: 'that', explain: 'After "the only", English strongly prefers "that".' },
      { sentence: 'The Eiffel Tower, ___ attracts millions of visitors, was built in 1889.', correct: 'which', explain: 'The commas mark extra information → only "which" works.' },
      { sentence: 'Everything ___ he said turned out to be true.', correct: 'that', explain: 'After "everything", "something", "all" → "that", not "which".' },
      { sentence: 'Her latest novel, ___ won several awards, sold out in days.', correct: 'which', explain: 'Non-defining clause between commas → "which".' },
      { sentence: 'The first thing ___ I noticed was the silence.', correct: 'that', explain: 'After a superlative or "the first" → "that".' },
      { sentence: 'The meeting was postponed, ___ annoyed everyone.', correct: 'which', explain: '"Which" can refer back to the whole previous idea; "that" cannot.' },
      { sentence: "There's something ___ I need to tell you.", correct: 'that', explain: 'After "something" → "that" (defining, no commas).' },
      { sentence: 'This laptop, ___ cost me a fortune, is already outdated.', correct: 'which', explain: 'Extra information between commas → "which".' }
    ]
  }
};
