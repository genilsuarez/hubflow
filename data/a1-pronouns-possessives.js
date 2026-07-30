export const CATEGORIES = {
  subjectPronouns: {
    label: 'Subject Pronouns',
    icon: '🙋',
    options: ['I', 'You', 'He', 'She', 'It', 'We', 'They'],
    items: [
      { sentence: 'Maria is my sister. ___ is 20 years old.', correct: 'She', explain: 'Maria is a girl, so we replace her name with "She".' },
      { sentence: 'Tom is my brother. ___ is a student.', correct: 'He', explain: 'Tom is a boy, so we replace his name with "He".' },
      { sentence: 'I have a red car. ___ is very fast.', correct: 'It', explain: 'A car is a thing, so we use "It".' },
      { sentence: 'My parents are doctors. ___ work at the hospital.', correct: 'They', explain: 'More than one person becomes "They".' },
      { sentence: 'Peter and I are classmates. ___ study together every day.', correct: 'We', explain: '"Peter and I" includes the speaker, so it becomes "We".' },
      { sentence: 'Excuse me, ___ are in my seat.', correct: 'You', explain: 'Talking directly to someone uses "You".' },
      { sentence: '___ am from Colombia.', correct: 'I', explain: 'Talking about yourself uses "I".' },
      { sentence: 'My cat is small. ___ likes to sleep all day.', correct: 'It', explain: 'Animals (without a name given) are usually "It".' },
      { sentence: 'Ana and Sofia are sisters. ___ live in Madrid.', correct: 'They', explain: 'More than one person becomes "They".' },
      { sentence: 'Look at that woman. ___ is a good teacher.', correct: 'She', explain: 'A woman is replaced with "She".' },
    ]
  },
  objectPronouns: {
    label: 'Object Pronouns',
    icon: '👉',
    options: ['me', 'you', 'him', 'her', 'it', 'us', 'them'],
    items: [
      { sentence: 'This letter is for Maria. Please give it to ___.', correct: 'her', explain: 'Maria is a girl, so the object pronoun is "her".' },
      { sentence: "I don't know Tom. Can you introduce me to ___?", correct: 'him', explain: 'Tom is a boy, so the object pronoun is "him".' },
      { sentence: 'These are my keys. Please give ___ back.', correct: 'them', explain: '"Keys" is plural, so we use "them".' },
      { sentence: 'I have a question. Can you help ___?', correct: 'me', explain: 'The speaker uses "me" as the object.' },
      { sentence: 'We are new here. Can you show ___ the way?', correct: 'us', explain: '"We" as an object becomes "us".' },
      { sentence: 'Do you like this song? I love ___.', correct: 'it', explain: 'A thing (a song) uses "it" as the object.' },
      { sentence: 'You are very kind. Thank ___.', correct: 'you', explain: '"You" stays the same as subject and object.' },
      { sentence: 'My parents are outside. Can you call ___?', correct: 'them', explain: 'More than one person becomes "them".' },
      { sentence: "I see Ana. Let's wave to ___.", correct: 'her', explain: 'Ana is a girl, so the object pronoun is "her".' },
      { sentence: 'This is my dog. Do you want to pet ___?', correct: 'it', explain: 'An animal without more context uses "it".' },
    ]
  },
  possessiveAdjectives: {
    label: 'Possessive Adjectives',
    icon: '📖',
    options: ['my', 'your', 'his', 'her', 'its', 'our', 'their'],
    items: [
      { sentence: 'This is ___ book.', correct: 'my', explain: '"I" → "my" before a noun.' },
      { sentence: 'Is this ___ car?', correct: 'your', explain: '"You" → "your" before a noun.' },
      { sentence: 'Tom lost ___ phone.', correct: 'his', explain: '"He" → "his" before a noun.' },
      { sentence: 'Maria forgot ___ umbrella.', correct: 'her', explain: '"She" → "her" before a noun.' },
      { sentence: 'The dog wagged ___ tail.', correct: 'its', explain: '"It" → "its" before a noun (no apostrophe).' },
      { sentence: 'We love ___ new house.', correct: 'our', explain: '"We" → "our" before a noun.' },
      { sentence: 'The students did ___ homework.', correct: 'their', explain: '"They" → "their" before a noun.' },
      { sentence: '___ name is Carlos.', correct: 'my', explain: '"I" → "my" before a noun.' },
      { sentence: 'What is ___ favorite color?', correct: 'your', explain: '"You" → "your" before a noun.' },
      { sentence: 'The cat cleaned ___ paws.', correct: 'its', explain: '"It" → "its", never "it\'s" (that means "it is").' },
    ]
  },
  possessivePronouns: {
    label: 'Possessive Pronouns',
    icon: '🎁',
    options: ['mine', 'yours', 'his', 'hers', 'ours', 'theirs'],
    items: [
      { sentence: 'This book is ___. (it belongs to me)', correct: 'mine', explain: '"Mine" replaces "my book" — no noun needed after it.' },
      { sentence: 'Is that car ___? (does it belong to you)', correct: 'yours', explain: '"Yours" replaces "your car".' },
      { sentence: "This pen isn't mine, it's ___. (it belongs to him)", correct: 'his', explain: '"His" works both as adjective and pronoun.' },
      { sentence: 'That bag is ___. (it belongs to her)', correct: 'hers', explain: '"Hers" replaces "her bag" — note there is no apostrophe.' },
      { sentence: 'This house is ___. (it belongs to us)', correct: 'ours', explain: '"Ours" replaces "our house".' },
      { sentence: 'Those seats are ___. (they belong to them)', correct: 'theirs', explain: '"Theirs" replaces "their seats".' },
      { sentence: 'Whose is this jacket? It\'s ___. (it belongs to me)', correct: 'mine', explain: '"Mine" stands alone, without a noun.' },
      { sentence: "This isn't my phone, it's ___. (it belongs to you)", correct: 'yours', explain: '"Yours" stands alone, without a noun.' },
      { sentence: 'The blue car is ___. (it belongs to him)', correct: 'his', explain: '"His" stands alone, without a noun.' },
      { sentence: 'These books are ___. (they belong to them)', correct: 'theirs', explain: '"Theirs" stands alone, without a noun.' },
    ]
  },
};
