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
      { sentence: 'The laptop ___ I bought last year still works perfectly.', correct: 'which', explain: '"Which" introduces a clause about a thing.' }
    ]
  }
};
