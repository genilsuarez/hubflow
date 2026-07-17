/**
 * Clauses Data — relative clauses (who/which/that/whose/where/when)
 */

export const CATEGORIES = {
  relativePronoun: {
    label: 'Relative Pronoun',
    icon: '🧩',
    options: ['who', 'which', 'whose', 'where', 'when'],
    items: [
      { sentence: 'The man ___ called yesterday is my uncle.', correct: 'who', explain: '"Who" introduces a clause about a person (subject).' },
      { sentence: 'This is the house ___ I grew up.', correct: 'where', explain: '"Where" introduces a clause about a place.' },
      { sentence: "She's the woman ___ car was stolen.", correct: 'whose', explain: '"Whose" shows possession.' },
      { sentence: 'I remember the day ___ we first met.', correct: 'when', explain: '"When" introduces a clause about a time.' },
      { sentence: 'The company ___ makes this product is French.', correct: 'which', explain: '"Which" introduces a clause about a thing.' },
      { sentence: 'The children ___ parents work here get a discount.', correct: 'whose', explain: '"Whose" shows possession, even for things linked to people.' },
      { sentence: 'This is the restaurant ___ we had our first date.', correct: 'where', explain: '"Where" introduces a clause about a place.' },
      { sentence: 'People ___ exercise regularly tend to live longer.', correct: 'who', explain: '"Who" introduces a clause about people (subject).' },
      { sentence: "That's the moment ___ everything changed.", correct: 'when', explain: '"When" introduces a clause about a time.' },
      { sentence: 'The laptop ___ I bought last year still works perfectly.', correct: 'which', explain: '"Which" introduces a clause about a thing.' },
      { sentence: 'The teacher ___ helped me pass the exam retired last year.', correct: 'who', explain: '"Who" introduces a clause about a person (subject).' },
      { sentence: 'Is this the park ___ you go jogging every morning?', correct: 'where', explain: '"Where" introduces a clause about a place.' },
      { sentence: 'The film ___ won the award was directed by a newcomer.', correct: 'which', explain: '"Which" introduces a clause about a thing (subject).' },
      { sentence: 'Do you remember the summer ___ we went camping?', correct: 'when', explain: '"When" introduces a clause about a time.' },
      { sentence: 'The neighbour ___ dog barks all night moved away.', correct: 'whose', explain: '"Whose" shows possession (the neighbour\'s dog).' },
      { sentence: 'She married a man ___ she met on holiday.', correct: 'who', explain: '"Who" introduces a clause about a person (object).' },
      { sentence: 'The hotel ___ we stayed had a beautiful garden.', correct: 'where', explain: '"Where" introduces a clause about a place.' },
      { sentence: 'I need a phone ___ battery lasts all day.', correct: 'whose', explain: '"Whose" shows possession for things.' },
      { sentence: 'The bus ___ goes to the airport leaves every hour.', correct: 'which', explain: '"Which" introduces a clause about a thing (subject).' },
      { sentence: 'Friday is the day ___ most people feel happiest.', correct: 'when', explain: '"When" introduces a clause about a time.' }
    ]
  }
};
