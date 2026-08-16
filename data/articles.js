/**
 * Articles Data — a/an/the/∅ (no article)
 * Categories: Basics, Geographic, Expressions, Context, Never Use "The"
 * 20 items per category
 */

export const CATEGORIES = {
  basics: {
    label: 'Basics',
    icon: '📘',
    options: ['a', 'an', 'the', '∅'],
    items: [
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
      { sentence: 'I love ___ chocolate.', correct: '∅', explain: 'General uncountable nouns (likes/dislikes) take no article.' },
      { sentence: '___ life is short.', correct: '∅', explain: 'Abstract nouns used in a general sense take no article.' },
      { sentence: 'She is ___ only child in the family.', correct: 'the', explain: '"The only" → "the" because it identifies a unique person.' },
      { sentence: 'I need ___ hour to finish this.', correct: 'an', explain: '"Hour" starts with a silent h → vowel sound → "an".' },
      { sentence: '___ moon looks full tonight.', correct: 'the', explain: 'Unique celestial bodies take "the".' },
      { sentence: 'He bought ___ second-hand car.', correct: 'a', explain: 'First mention, countable singular → "a".' },
      { sentence: 'This is ___ most interesting film I\'ve seen.', correct: 'the', explain: 'Superlative → "the".' },
      { sentence: '___ gold is very expensive nowadays.', correct: '∅', explain: 'Uncountable nouns in a general sense take no article.' },
      { sentence: 'She has ___ MBA from Oxford.', correct: 'an', explain: '"MBA" is read letter by letter — starts with /ɛm/ → "an".' },
      { sentence: 'Could you pass me ___ pen on the table?', correct: 'the', explain: 'The speaker specifies which pen ("on the table") → "the".' }
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
      { sentence: 'I live in ___ Madrid.', correct: '∅', explain: 'City names → no article.' },
      { sentence: 'We flew over ___ Alps.', correct: 'the', explain: 'Mountain ranges take "the" — but single peaks do not (Mount Everest).' },
      { sentence: "She's from ___ South America.", correct: '∅', explain: 'Continents take no article.' },
      { sentence: '___ Lake Geneva is beautiful.', correct: '∅', explain: 'Lakes named "Lake X" take no article (compare: the Amazon).' },
      { sentence: 'The ship crossed ___ Suez Canal.', correct: 'the', explain: 'Canals take "the".' },
      { sentence: 'He has always wanted to see ___ Grand Canyon.', correct: 'the', explain: 'Named geographic landmarks typically take "the".' },
      { sentence: 'They sailed around ___ Cape of Good Hope.', correct: 'the', explain: '"Cape of Good Hope" is a geographic landmark → "the".' },
      { sentence: '___ Nile flows through Egypt.', correct: 'the', explain: 'River names use "the".' },
      { sentence: 'She grew up in ___ Texas.', correct: '∅', explain: 'US state names take no article.' },
      { sentence: 'We drove across ___ Mojave Desert.', correct: 'the', explain: 'Deserts take "the".' },
      { sentence: '___ Maldives is known for its clear waters.', correct: 'the', explain: 'Plural country names take "the".' },
      { sentence: 'They landed at ___ Heathrow Airport.', correct: '∅', explain: 'Airport names (proper names) take no article.' }
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
      { sentence: 'Let\'s go for ___ walk.', correct: 'a', explain: '"Go for a walk/swim/drive" → "a".' },
      { sentence: 'I listen to ___ radio in the morning.', correct: 'the', explain: '"The radio" is fixed — but note: watch ∅ television.' },
      { sentence: 'They got married ___ church.', correct: '∅', explain: '"In church" (as a ceremony/purpose) → no article.' },
      { sentence: 'She is going to ___ university next year.', correct: '∅', explain: '"Go to university" (purpose) → no article.' },
      { sentence: 'He was sent to ___ sea at age sixteen.', correct: '∅', explain: '"Go to sea" (as a sailor, by profession) → no article.' },
      { sentence: 'I go to ___ gym three times a week.', correct: 'the', explain: '"The gym" is a specific, shared-knowledge place → "the".' },
      { sentence: 'We had ___ great time at the party.', correct: 'a', explain: '"Have a great/good time" → "a".' },
      { sentence: 'She was released from ___ hospital after two days.', correct: '∅', explain: 'Leaving hospital (as patient) → no article (same pattern as prison, school).' },
      { sentence: 'He caught ___ train to London.', correct: 'the', explain: 'A specific train (you know which one) → "the".' },
      { sentence: 'I need to take ___ break.', correct: 'a', explain: '"Take a break/look/seat" → "a".' }
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
      { sentence: 'She bought ___ dress. The dress was blue.', correct: 'a', explain: 'First mention → "a". Second mention → "the".' },
      { sentence: '___ English is spoken worldwide.', correct: '∅', explain: 'Language names → no article.' },
      { sentence: 'I went to ___ cinema last night.', correct: 'the', explain: 'Shared knowledge (the usual cinema) → "the".' },
      { sentence: 'She is reading ___ interesting book.', correct: 'an', explain: 'First mention + vowel sound → "an".' },
      { sentence: 'They went to ___ same school.', correct: 'the', explain: '"Same" always takes "the".' },
      { sentence: '___ rich should help the poor.', correct: 'the', explain: '"The" + adjective = group of people (the rich, the poor).' },
      { sentence: "I need ___ umbrella — it's raining.", correct: 'an', explain: '"An" before a vowel sound (umbrella).' },
      { sentence: 'It\'s ___ fact that exercise is good for you.', correct: 'a', explain: 'Countable noun, first mention → "a".' },
      { sentence: 'The officer handed him ___ form. The form was in French.', correct: 'a', explain: 'First mention, countable singular, consonant sound → "a form". Second mention → "the form".' },
      { sentence: 'Have you seen ___ latest Star Wars film?', correct: 'the', explain: '"The latest" → superlative-like → "the".' },
      { sentence: '___ news was shocking.', correct: 'the', explain: 'Specific news being discussed → "the". "News" is uncountable.' },
      { sentence: 'She gave ___ advice that changed my life.', correct: '∅', explain: '"Advice" is uncountable — general advice → no article.' },
      { sentence: 'I heard ___ strange noise outside.', correct: 'a', explain: 'First mention, countable, consonant sound → "a".' },
      { sentence: 'He is ___ honest politician — quite rare!', correct: 'an', explain: '"Honest" starts with a silent h → "an".' },
      { sentence: 'We discussed ___ problem for an hour.', correct: 'the', explain: 'A specific problem already known to both speakers → "the".' }
    ]
  },
  noThe: {
    label: 'Never Use "The"',
    icon: '🚫',
    options: ['the', '∅'],
    items: [
      { sentence: '___ Sarah is my best friend.', correct: '∅', explain: 'Personal names never take "the".' },
      { sentence: 'They moved to ___ Germany.', correct: '∅', explain: 'Most country names take no article.' },
      { sentence: 'She loves playing ___ tennis.', correct: '∅', explain: 'Sports and games take no article.' },
      { sentence: '___ Mandarin is spoken by over a billion people.', correct: '∅', explain: 'Language names take no article.' },
      { sentence: 'We\'re having ___ Christmas dinner at my parents\'.', correct: '∅', explain: 'Meal names, even festive ones, take no article.' },
      { sentence: 'He has ___ flu again.', correct: '∅', explain: 'Most illnesses take no article (has flu, has cancer) — a few take "a": a cold, a headache.' },
      { sentence: '___ Maths is my favourite subject.', correct: '∅', explain: 'Academic subjects take no article.' },
      { sentence: 'We\'re meeting on ___ Monday.', correct: '∅', explain: 'Days, months, and holidays take no article.' },
      { sentence: '___ President Biden gave a speech.', correct: '∅', explain: 'Title + name never takes "the" ("President Biden", not "the President Biden").' },
      { sentence: 'We invited ___ Hammonds to the party.', correct: 'the', explain: 'Exception: plural family surnames DO take "the" ("the Hammonds" = the Hammond family).' },
      { sentence: 'She works in ___ Hague.', correct: 'the', explain: 'Exception: "The Hague" keeps "the" even though city names normally don\'t.' },
      { sentence: 'Do you mean ___ Andy who lives down the road?', correct: 'the', explain: 'Exception: "the" + name distinguishes one specific person from others sharing that name.' },
      { sentence: 'I study ___ Biology at university.', correct: '∅', explain: 'Academic subjects take no article.' },
      { sentence: '___ Professor Smith will teach our class.', correct: '∅', explain: 'Title + name → no article.' },
      { sentence: 'I was born in ___ April.', correct: '∅', explain: 'Month names take no article.' },
      { sentence: 'She speaks ___ Japanese fluently.', correct: '∅', explain: 'Language names take no article.' },
      { sentence: '___ Saint Patrick\'s Day is on the 17th of March.', correct: '∅', explain: 'Holiday names take no article.' },
      { sentence: 'He plays ___ chess every evening.', correct: '∅', explain: 'Board games and sports take no article.' },
      { sentence: 'She is studying ___ law at Oxford.', correct: '∅', explain: 'Academic disciplines studied at university → no article.' },
      { sentence: '___ Lake Titicaca is the highest navigable lake.', correct: '∅', explain: 'Lakes named "Lake X" take no article.' }
    ]
  }
};
