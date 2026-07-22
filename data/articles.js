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
      { sentence: 'She wants to be ___ doctor.', correct: 'a', explain: 'Professions use "a/an": "a doctor".' },
      { sentence: 'We live in ___ small flat.', correct: 'a', explain: 'First mention, non-specific → "a".' },
      { sentence: '___ book you lent me is great.', correct: 'the', explain: 'Specific book (you lent me) → "the".' },
      { sentence: 'He is ___ best player in the team.', correct: 'the', explain: 'Superlatives always use "the".' },
      { sentence: 'She is ___ first person to arrive.', correct: 'the', explain: 'Ordinal numbers use "the".' },
      { sentence: 'I love ___ chocolate.', correct: '∅', explain: 'General uncountable nouns (likes/dislikes) take no article.' },
      { sentence: 'She speaks ___ French fluently.', correct: '∅', explain: 'Language names never take an article.' },
      { sentence: '___ life is short.', correct: '∅', explain: 'Abstract nouns used in a general sense take no article.' }
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
      { sentence: 'She swam across ___ English Channel.', correct: 'the', explain: 'Channels and canals → "the".' },
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
      { sentence: 'She went to ___ hospital to visit her friend.', correct: 'the', explain: 'Visiting (not as patient) → "the hospital".' },
      { sentence: 'He is in ___ prison for theft.', correct: '∅', explain: '"In prison" (as prisoner) → no article.' },
      { sentence: 'I have ___ headache.', correct: 'a', explain: 'Ailments: "a headache", "a cold", "a fever".' },
      { sentence: 'Let\'s go for ___ walk.', correct: 'a', explain: '"Go for a walk/swim/drive" → "a".' }
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
      { sentence: 'They went to ___ same school.', correct: 'the', explain: '"Same" always takes "the".' },
      { sentence: '___ rich should help ___ poor.', correct: 'the', explain: '"The" + adjective = group of people (the rich, the poor).' }
    ]
  },
  noThe: {
    label: 'Never Use "The"',
    icon: '🚫',
    options: ['the', '∅'],
    items: [
      { sentence: '___ Sarah is my best friend.', correct: '∅', explain: 'Personal names never take "the".' },
      { sentence: 'They moved to ___ Germany.', correct: '∅', explain: 'Most country names take no article.' },
      { sentence: '___ Tokyo is my favourite city.', correct: '∅', explain: 'Towns and cities take no article.' },
      { sentence: 'She loves playing ___ tennis.', correct: '∅', explain: 'Sports and games take no article.' },
      { sentence: '___ Mandarin is spoken by over a billion people.', correct: '∅', explain: 'Language names take no article.' },
      { sentence: 'We\'re having ___ Christmas dinner at my parents\'.', correct: '∅', explain: 'Meal names, even festive ones, take no article.' },
      { sentence: 'He has ___ flu again.', correct: '∅', explain: 'Most illnesses take no article (has flu, has cancer) — a few take "a": a cold, a headache.' },
      { sentence: '___ Maths is my favourite subject.', correct: '∅', explain: 'Academic subjects take no article.' },
      { sentence: 'We\'re meeting on ___ Monday.', correct: '∅', explain: 'Days, months, and holidays take no article.' },
      { sentence: '___ President Biden gave a speech.', correct: '∅', explain: 'Title + name never takes "the" ("President Biden", not "the President Biden").' },
      { sentence: 'He\'s from ___ Texas.', correct: '∅', explain: 'US states and UK counties take no article.' },
      { sentence: 'We invited ___ Hammonds to the party.', correct: 'the', explain: 'Exception: plural family surnames DO take "the" ("the Hammonds" = the Hammond family).' },
      { sentence: 'She works in ___ Hague.', correct: 'the', explain: 'Exception: "The Hague" keeps "the" even though city names normally don\'t.' },
      { sentence: 'Do you mean ___ Andy who lives down the road?', correct: 'the', explain: 'Exception: "the" + name distinguishes one specific person from others sharing that name.' }
    ]
  }
};
