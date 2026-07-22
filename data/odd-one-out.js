/**
 * HubFlow — Odd One Out Data
 * Categories: Grammar (A2-B1), Vocabulary (B1-B2), Collocations (B1-B2), Pronunciation (A2-B1)
 *
 * Each entry:
 *   words: string[] — 4 options (one is the odd one)
 *   odd: number — index of the odd one (0-based)
 *   reason: string — short explanation of why it doesn't belong
 *   group: string — what the other 3 share
 */

export const CATEGORIES = {
  grammar: {
    label: 'Grammar',
    icon: '📝',
    level: 'A2–B1',
    items: [
      { words: ["running", "swimming", "eating", "beautiful"], odd: 3, reason: "'Beautiful' is an adjective, not a gerund (-ing verb form)", group: "Gerunds" },
      { words: ["went", "bought", "played", "saw"], odd: 2, reason: "'Played' is regular past (-ed). The others are irregular", group: "Irregular past tense" },
      { words: ["must", "should", "could", "walked"], odd: 3, reason: "'Walked' is a main verb. The others are modal verbs", group: "Modal verbs" },
      { words: ["bigger", "faster", "better", "biggest"], odd: 3, reason: "'Biggest' is superlative. The others are comparatives", group: "Comparative adjectives" },
      { words: ["he's", "she's", "it's", "his"], odd: 3, reason: "'His' is a possessive pronoun. The others are contractions (is/has)", group: "Contractions with 's" },
      { words: ["quickly", "slowly", "friendly", "carefully"], odd: 2, reason: "'Friendly' is an adjective (not an adverb despite -ly)", group: "Adverbs of manner" },
      { words: ["since", "for", "during", "ago"], odd: 3, reason: "'Ago' goes after the time period. The others go before", group: "Time prepositions before a period" },
      { words: ["few", "many", "several", "little"], odd: 3, reason: "'Little' is used with uncountable nouns. 'Few', 'many', and 'several' are all used with countable nouns", group: "Countable-noun quantifiers" },
      { words: ["am", "is", "are", "be"], odd: 3, reason: "'Be' is the infinitive/base form. The others are conjugated forms", group: "Conjugated forms of 'be'" },
      { words: ["although", "however", "despite", "because"], odd: 3, reason: "'Because' shows cause. The others show contrast/concession", group: "Contrast connectors" }
    ]
  },
  vocabulary: {
    label: 'Vocabulary',
    icon: '📚',
    level: 'B1–B2',
    items: [
      { words: ["furious", "delighted", "angry", "annoyed"], odd: 1, reason: "'Delighted' is positive. The others express anger/irritation", group: "Words expressing anger" },
      { words: ["whisper", "shout", "yell", "scream"], odd: 0, reason: "'Whisper' is quiet. The others mean to speak/cry loudly", group: "Loud vocal expressions" },
      { words: ["surgeon", "nurse", "lawyer", "pharmacist"], odd: 2, reason: "'Lawyer' works in law. The others work in healthcare", group: "Healthcare professions" },
      { words: ["nephew", "niece", "cousin", "colleague"], odd: 3, reason: "'Colleague' is a work relationship. The others are family", group: "Family members" },
      { words: ["drought", "flood", "earthquake", "sunrise"], odd: 3, reason: "'Sunrise' is a daily event. The others are natural disasters", group: "Natural disasters" },
      { words: ["spacious", "cramped", "tiny", "narrow"], odd: 0, reason: "'Spacious' means big/roomy. The others describe small spaces", group: "Small/tight spaces" },
      { words: ["huge", "enormous", "tiny", "massive"], odd: 2, reason: "'Tiny' means very small. The others mean very big", group: "Extremely large" },
      { words: ["relieved", "anxious", "nervous", "tense"], odd: 0, reason: "'Relieved' is a positive feeling. The others express worry/stress", group: "Feelings of anxiety" },
      { words: ["bake", "fry", "boil", "chop"], odd: 3, reason: "'Chop' is cutting. The others are cooking methods using heat", group: "Heat-based cooking methods" },
      { words: ["elbow", "ankle", "knee", "hip"], odd: 0, reason: "'Elbow' is an arm joint. 'Ankle', 'knee', and 'hip' are all leg joints", group: "Leg joints" }
    ]
  },
  collocations: {
    label: 'Collocations',
    icon: '🔗',
    level: 'B1–B2',
    items: [
      { words: ["make a decision", "make a mistake", "make homework", "make an effort"], odd: 2, reason: "It's 'DO homework', not 'make homework'", group: "Correct collocations with 'make'" },
      { words: ["do business", "do a favour", "do an exam", "do a noise"], odd: 3, reason: "It's 'MAKE a noise', not 'do a noise'", group: "Correct collocations with 'do'" },
      { words: ["take a photo", "take a break", "take a shower", "take a mistake"], odd: 3, reason: "It's 'MAKE a mistake', not 'take a mistake'", group: "Correct collocations with 'take'" },
      { words: ["heavy rain", "heavy traffic", "heavy price", "heavy workload"], odd: 2, reason: "It's 'high price', not 'heavy price'", group: "Correct collocations with 'heavy'" },
      { words: ["strong coffee", "strong wind", "strong smell", "strong rain"], odd: 3, reason: "It's 'heavy rain', not 'strong rain'", group: "Correct collocations with 'strong'" },
      { words: ["pay attention", "pay a visit", "pay a compliment", "pay a fault"], odd: 3, reason: "'Pay a fault' doesn't exist. You 'commit a fault' or 'make a mistake'", group: "Correct collocations with 'pay'" },
      { words: ["keep a secret", "keep a promise", "keep in touch", "keep a lie"], odd: 3, reason: "It's 'TELL a lie', not 'keep a lie'", group: "Correct collocations with 'keep'" },
      { words: ["get married", "get divorced", "get engaged", "get single"], odd: 3, reason: "'Get single' doesn't exist. You 'become single' or 'stay single'", group: "Life event collocations with 'get'" },
      { words: ["break a record", "break the law", "break a promise", "break an effort"], odd: 3, reason: "You 'MAKE an effort', not 'break an effort'", group: "Correct collocations with 'break'" },
      { words: ["deeply offended", "deeply moved", "deeply asleep", "deeply affected"], odd: 2, reason: "It's 'fast/sound asleep', not 'deeply asleep'", group: "Correct collocations with 'deeply'" },
    ]
  },
  pronunciation: {
    label: 'Pronunciation',
    icon: '🔊',
    level: 'A2–B1',
    items: [
      { words: ["through", "though", "thought", "thorough"], odd: 1, reason: "'Though' /ðoʊ/ has a different vowel sound. The others have /θr/ or /θɔː/", group: "Words with /θ/ + different vowel pattern" },
      { words: ["cough", "enough", "rough", "dough"], odd: 3, reason: "'Dough' rhymes with 'go' /oʊ/. The others have /ʌf/ or /ɒf/", group: "Words where '-ough' = /ʌf/ or /ɒf/" },
      { words: ["knight", "know", "knife", "king"], odd: 3, reason: "'King' pronounces the K. In the others, K is silent", group: "Words with silent K" },
      { words: ["island", "listen", "castle", "whistle"], odd: 0, reason: "'Island' has a silent 's'. The others have a silent 't'", group: "Words with silent T" },
      { words: ["food", "mood", "blood", "spoon"], odd: 2, reason: "'Blood' has /ʌ/ (like 'cut'). The others have /uː/ (long 'oo')", group: "Words with /uː/ sound" },
      { words: ["bomb", "climb", "thumb", "timber"], odd: 3, reason: "'Timber' pronounces the B. In the others, B is silent", group: "Words with silent B" },
      { words: ["great", "steak", "break", "weak"], odd: 3, reason: "'Weak' has /iː/. The others have /eɪ/ (like 'day')", group: "Words where 'ea' = /eɪ/" },
      { words: ["hour", "honest", "hotel", "honour"], odd: 2, reason: "'Hotel' pronounces the H. In the others, H is silent", group: "Words with silent H" },
      { words: ["ache", "chemistry", "character", "church"], odd: 3, reason: "'Church' has /tʃ/ (ch as in 'chip'). The others have /k/ for 'ch'", group: "Words where 'ch' = /k/" },
      { words: ["pleasure", "measure", "treasure", "sure"], odd: 3, reason: "'Sure' has /ʃ/. The others have /ʒ/ (like the 's' in 'vision')", group: "Words with /ʒ/ sound" }
    ]
  }
};
