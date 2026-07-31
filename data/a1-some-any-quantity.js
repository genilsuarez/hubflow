export const CATEGORIES = {
  someAffirmative: {
    label: 'Some (affirmative)',
    icon: '➕',
    options: ['some', 'any'],
    items: [
      { sentence: 'I have ___ apples.', correct: 'some', explain: "'Some' is used in affirmative sentences." },
      { sentence: 'There is ___ milk in the fridge.', correct: 'some', explain: "'Some' is used in affirmative sentences." },
      { sentence: 'She bought ___ new books.', correct: 'some', explain: "'Some' is used in affirmative sentences." },
      { sentence: 'We need ___ help with this.', correct: 'some', explain: "'Some' is used in affirmative sentences." },
      { sentence: 'He has ___ money in his pocket.', correct: 'some', explain: "'Some' is used in affirmative sentences." },
      { sentence: 'There are ___ people waiting outside.', correct: 'some', explain: "'Some' is used in affirmative sentences." },
      { sentence: 'I found ___ information about it.', correct: 'some', explain: "'Some' is used in affirmative sentences." },
      { sentence: 'She gave me ___ good advice.', correct: 'some', explain: "'Some' is used in affirmative sentences." },
      { sentence: 'We have ___ time before the bus arrives.', correct: 'some', explain: "'Some' is used in affirmative sentences." },
      { sentence: 'They bought ___ furniture for the house.', correct: 'some', explain: "'Some' is used in affirmative sentences." },
    ]
  },
  anyNegativeQuestion: {
    label: 'Any (negative & questions)',
    icon: '❓',
    options: ['any', 'some'],
    items: [
      { sentence: 'I don\'t have ___ apples.', correct: 'any', explain: "'Any' is used in negative sentences." },
      { sentence: 'Is there ___ milk left?', correct: 'any', explain: "'Any' is used in questions." },
      { sentence: 'She didn\'t buy ___ books.', correct: 'any', explain: "'Any' is used in negative sentences." },
      { sentence: 'Do you have ___ money?', correct: 'any', explain: "'Any' is used in questions." },
      { sentence: 'We don\'t need ___ help.', correct: 'any', explain: "'Any' is used in negative sentences." },
      { sentence: 'Are there ___ seats available?', correct: 'any', explain: "'Any' is used in questions." },
      { sentence: 'He hasn\'t got ___ friends here.', correct: 'any', explain: "'Any' is used in negative sentences." },
      { sentence: 'Did you find ___ information?', correct: 'any', explain: "'Any' is used in questions." },
      { sentence: 'There isn\'t ___ sugar in the kitchen.', correct: 'any', explain: "'Any' is used in negative sentences." },
      { sentence: 'Do they have ___ questions?', correct: 'any', explain: "'Any' is used in questions." },
    ]
  },
  muchVsMany: {
    label: 'Much vs Many',
    icon: '📊',
    options: ['much', 'many'],
    items: [
      { sentence: 'How ___ books do you have?', correct: 'many', explain: "'Many' is used with countable plural nouns like 'books'." },
      { sentence: 'How ___ water do you drink?', correct: 'much', explain: "'Much' is used with uncountable nouns like 'water'." },
      { sentence: 'There aren\'t ___ students in class today.', correct: 'many', explain: "'Many' is used with countable plural nouns." },
      { sentence: 'There isn\'t ___ time left.', correct: 'much', explain: "'Much' is used with uncountable nouns like 'time'." },
      { sentence: 'How ___ friends do you have?', correct: 'many', explain: "'Many' is used with countable plural nouns." },
      { sentence: 'I don\'t have ___ money.', correct: 'much', explain: "'Much' is used with uncountable nouns like 'money'." },
      { sentence: 'How ___ chairs do we need?', correct: 'many', explain: "'Many' is used with countable plural nouns." },
      { sentence: 'She doesn\'t eat ___ sugar.', correct: 'much', explain: "'Much' is used with uncountable nouns like 'sugar'." },
      { sentence: 'How ___ cars are in the parking lot?', correct: 'many', explain: "'Many' is used with countable plural nouns." },
      { sentence: 'We don\'t have ___ information about it.', correct: 'much', explain: "'Much' is used with uncountable nouns like 'information'." },
    ]
  },
  noVsNotAny: {
    label: 'No vs Not Any',
    icon: '🚫',
    options: ['no', "don't have any"],
    items: [
      { sentence: 'I have ___ money.', correct: 'no', explain: "'No' + noun replaces 'not any' + noun in an affirmative-form sentence." },
      { sentence: 'I ___ money.', correct: "don't have any", explain: "'Not any' is used with a negative verb form.", options: ["don't have any", "have no any", "not have"] },
      { sentence: 'There is ___ milk left.', correct: 'no', explain: "'No' + noun replaces 'not any' + noun." },
      { sentence: 'There ___ milk left.', correct: "isn't any", explain: "'Not any' is used with a negative verb form.", options: ["isn't any", "is no any", "not is any"] },
      { sentence: 'We have ___ questions.', correct: 'no', explain: "'No' + noun replaces 'not any' + noun." },
      { sentence: 'She has ___ time to help you.', correct: 'no', explain: "'No' + noun replaces 'not any' + noun." },
      { sentence: 'There are ___ seats available.', correct: 'no', explain: "'No' + noun replaces 'not any' + noun." },
      { sentence: 'I ___ friends in this city.', correct: "don't have any", explain: "'Not any' is used with a negative verb form.", options: ["don't have any", "have no any", "haven't no"] },
      { sentence: 'He has ___ interest in sports.', correct: 'no', explain: "'No' + noun replaces 'not any' + noun." },
      { sentence: 'There ___ chairs in the room.', correct: "aren't any", explain: "'Not any' is used with a negative verb form.", options: ["aren't any", "are no any", "not are any"] },
    ]
  }
};
