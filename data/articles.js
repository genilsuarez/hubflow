/**
 * Articles Data — a/an/the/∅ (no article)
 * Categories: Basics, Geographic, Expressions, Context
 */

export const CATEGORIES = {
  basics: {
    label: 'Basics',
    icon: '📘',
    options: ['a', 'an', 'the', '∅'],
    items: [
      { sentence: 'I have ___ cat.', correct: 'a', explain: 'Use "a" before consonant sounds (cat).' },
      { sentence: 'She is ___ honest person.', correct: 'an', explain: 'Use "an" before silent "h" (honest → vowel sound).' },
      { sentence: 'I saw ___ elephant at the zoo.', correct: 'an', explain: 'Use "an" before vowel sounds (elephant).' },
      { sentence: 'Can you close ___ door?', correct: 'the', explain: 'Both people know which door → "the".' },
      { sentence: '___ sun is shining today.', correct: 'the', explain: 'Unique things (only one sun) → "the".' },
      { sentence: 'There is ___ university here.', correct: 'a', explain: '"University" starts with /juː/ (consonant sound) → "a".' },
      { sentence: 'He is ___ engineer.', correct: 'an', explain: '"Engineer" starts with /ɛ/ (vowel sound) → "an".' },
      { sentence: 'I need ___ umbrella.', correct: 'an', explain: '"Umbrella" starts with /ʌ/ (vowel sound) → "an".' },
      { sentence: 'She wants to be ___ doctor.', correct: 'a', explain: 'Professions use "a/an": "a doctor".' },
      { sentence: 'We live in ___ small flat.', correct: 'a', explain: 'First mention, non-specific → "a".' },
      { sentence: '___ book you lent me is great.', correct: 'the', explain: 'Specific book (you lent me) → "the".' },
      { sentence: 'I had ___ orange for breakfast.', correct: 'an', explain: '"Orange" starts with /ɒ/ (vowel sound) → "an".' },
      { sentence: 'He is ___ best player in the team.', correct: 'the', explain: 'Superlatives always use "the".' },
      { sentence: 'She bought ___ new phone yesterday.', correct: 'a', explain: 'First mention, non-specific → "a".' },
      { sentence: '___ moon looks beautiful tonight.', correct: 'the', explain: 'Unique things (only one moon) → "the".' },
      { sentence: 'I want ___ apple.', correct: 'an', explain: '"Apple" starts with /æ/ (vowel sound) → "an".' },
      { sentence: 'He is ___ European.', correct: 'a', explain: '"European" starts with /jʊ/ (consonant sound) → "a".' },
      { sentence: 'She is ___ first person to arrive.', correct: 'the', explain: 'Ordinal numbers use "the".' }
    ]
  },
  geographic: {
    label: 'Geographic',
    icon: '🌍',
    options: ['the', '∅'],
    items: [
      { sentence: 'She lives in ___ United Kingdom.', correct: 'the', explain: 'Countries with Kingdom/States/Republic → "the".' },
      { sentence: '___ Amazon is the longest river.', correct: 'the', explain: 'River names use "the".' },
      { sentence: 'I want to visit ___ France.', correct: '∅', explain: 'Most country names → no article.' },
      { sentence: '___ Pacific Ocean is very deep.', correct: 'the', explain: 'Oceans, seas → "the".' },
      { sentence: 'He climbed ___ Mount Everest.', correct: '∅', explain: 'Individual mountains → no article.' },
      { sentence: '___ Sahara Desert is very hot.', correct: 'the', explain: 'Deserts → "the".' },
      { sentence: 'They visited ___ Japan last year.', correct: '∅', explain: 'Most country names → no article.' },
      { sentence: '___ Alps are in Europe.', correct: 'the', explain: 'Mountain ranges → "the".' },
      { sentence: 'She swam across ___ English Channel.', correct: 'the', explain: 'Channels and canals → "the".' },
      { sentence: 'We went to ___ Lake Titicaca.', correct: '∅', explain: 'Individual lakes → no article.' },
      { sentence: '___ Philippines has many islands.', correct: 'the', explain: 'Plural country names → "the".' },
      { sentence: 'I live in ___ Madrid.', correct: '∅', explain: 'City names → no article.' }
    ]
  },
  expressions: {
    label: 'Fixed Expressions',
    icon: '🔒',
    options: ['a', 'the', '∅'],
    items: [
      { sentence: 'She goes to ___ school every day.', correct: '∅', explain: '"Go to school" (activity) → no article.' },
      { sentence: 'He went to ___ bed early.', correct: '∅', explain: '"Go to bed" (sleep) → no article.' },
      { sentence: 'I travel by ___ bus.', correct: '∅', explain: '"By + transport" → no article.' },
      { sentence: 'She is at ___ work right now.', correct: '∅', explain: '"At work" → no article.' },
      { sentence: 'I had ___ lunch at noon.', correct: '∅', explain: 'Meal names → no article.' },
      { sentence: 'He plays ___ football on Sundays.', correct: '∅', explain: 'Sports → no article.' },
      { sentence: 'She plays ___ piano very well.', correct: 'the', explain: 'Musical instruments → "the".' },
      { sentence: 'He is at ___ home now.', correct: '∅', explain: '"At home" → no article.' },
      { sentence: 'She went to ___ hospital to visit her friend.', correct: 'the', explain: 'Visiting (not as patient) → "the hospital".' },
      { sentence: 'He is in ___ prison for theft.', correct: '∅', explain: '"In prison" (as prisoner) → no article.' },
      { sentence: 'I have ___ headache.', correct: 'a', explain: 'Ailments: "a headache", "a cold", "a fever".' },
      { sentence: 'Let\'s go for ___ walk.', correct: 'a', explain: '"Go for a walk/swim/drive" → "a".' },
      { sentence: 'He drives to ___ work every day.', correct: '∅', explain: '"Drive to work" → no article.' },
      { sentence: 'We had ___ dinner at 8 pm.', correct: '∅', explain: 'Meal names → no article.' }
    ]
  },
  context: {
    label: 'In Context',
    icon: '💬',
    options: ['a', 'an', 'the', '∅'],
    items: [
      { sentence: '___ water is essential for life.', correct: '∅', explain: 'General uncountable nouns → no article.' },
      { sentence: 'I like ___ dogs. They are friendly.', correct: '∅', explain: 'General plural nouns → no article.' },
      { sentence: '___ happiness is important.', correct: '∅', explain: 'Abstract nouns in general → no article.' },
      { sentence: 'Pass me ___ salt, please.', correct: 'the', explain: 'Both people can see the specific salt → "the".' },
      { sentence: '___ children in my class are smart.', correct: 'the', explain: 'Specific group (defined by "in my class") → "the".' },
      { sentence: 'She bought ___ dress. ___ dress was blue.', correct: 'a', explain: 'First mention → "a". Second mention → "the".' },
      { sentence: '___ English is spoken worldwide.', correct: '∅', explain: 'Language names → no article.' },
      { sentence: 'I went to ___ cinema last night.', correct: 'the', explain: 'Shared knowledge (the usual cinema) → "the".' },
      { sentence: 'She is reading ___ interesting book.', correct: 'an', explain: 'First mention + vowel sound → "an".' },
      { sentence: '___ love is all you need.', correct: '∅', explain: 'Abstract nouns in general → no article.' },
      { sentence: 'They went to ___ same school.', correct: 'the', explain: '"Same" always takes "the".' },
      { sentence: 'He drinks ___ coffee every morning.', correct: '∅', explain: 'General habit + uncountable → no article.' },
      { sentence: 'I want to be ___ actor.', correct: 'an', explain: 'Professions + vowel sound → "an actor".' },
      { sentence: '___ rich should help ___ poor.', correct: 'the', explain: '"The" + adjective = group of people (the rich, the poor).' }
    ]
  }
};
