/**
 * Parts of Speech Data — identify the word in CAPS
 */

export const CATEGORIES = {
  contentWords: {
    label: 'Content Words',
    icon: '🔤',
    options: ['Noun', 'Verb', 'Adjective', 'Adverb'],
    items: [
      { sentence: 'She sings BEAUTIFULLY every morning.', correct: 'Adverb', explain: 'Describes how she sings → adverb.' },
      { sentence: 'The DOG barked loudly.', correct: 'Noun', explain: 'Names a person, place, or thing → noun.' },
      { sentence: 'The QUICK fox jumped over the fence.', correct: 'Adjective', explain: 'Describes the noun "fox" → adjective.' },
      { sentence: 'He RUNS every day.', correct: 'Verb', explain: 'Expresses the action → verb.' },
      { sentence: 'HAPPINESS is important in life.', correct: 'Noun', explain: 'Names an abstract thing/idea → noun.' },
      { sentence: 'We WAITED for hours.', correct: 'Verb', explain: 'Expresses the action → verb.' },
      { sentence: 'He speaks SLOWLY so everyone understands.', correct: 'Adverb', explain: 'Describes how he speaks → adverb.' },
      { sentence: 'FREEDOM is a fundamental human right.', correct: 'Noun', explain: 'Names an abstract idea → noun.' },
      { sentence: 'That was a TERRIBLE mistake.', correct: 'Adjective', explain: 'Describes the noun "mistake" → adjective.' },
      { sentence: 'They DANCED all night at the party.', correct: 'Verb', explain: 'Expresses the action → verb.' }
    ]
  },
  functionWords: {
    label: 'Function Words',
    icon: '🔗',
    options: ['Pronoun', 'Preposition', 'Conjunction', 'Interjection'],
    items: [
      { sentence: "WOW, that's an amazing view!", correct: 'Interjection', explain: 'A short word expressing emotion, standing apart from the sentence → interjection.' },
      { sentence: 'I put the book ON the table.', correct: 'Preposition', explain: 'Shows the relationship (position) between "book" and "table" → preposition.' },
      { sentence: 'SHE is my best friend.', correct: 'Pronoun', explain: 'Replaces a noun (a person\'s name) → pronoun.' },
      { sentence: 'They left early BECAUSE it started raining.', correct: 'Conjunction', explain: 'Connects two clauses and shows reason → conjunction.' },
      { sentence: 'OUCH, that hurt!', correct: 'Interjection', explain: 'Expresses sudden emotion/pain → interjection.' },
      { sentence: 'This is HER book, not mine.', correct: 'Pronoun', explain: 'A possessive pronoun replacing a name → pronoun.' },
      { sentence: 'The cat sat UNDER the table.', correct: 'Preposition', explain: 'Shows the relationship (position) between "cat" and "table" → preposition.' },
      { sentence: 'He arrived late, AND everyone was upset.', correct: 'Conjunction', explain: 'Connects two independent clauses → conjunction.' },
      { sentence: 'I gave THEM the tickets.', correct: 'Pronoun', explain: 'Replaces a noun (the people receiving the tickets) → pronoun.' },
      { sentence: 'I wanted to go, BUT it was raining.', correct: 'Conjunction', explain: 'Connects two contrasting clauses → conjunction.' }
    ]
  }
};
