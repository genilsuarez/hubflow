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
      { words: ["few", "little", "many", "much"], odd: 0, reason: "'Few' is for countable nouns + negative meaning. But 'many' is also countable. Actually: 'little' and 'much' are uncountable; 'few' and 'many' are countable. Odd = 'few' has negative connotation unlike 'many'", group: "Large quantity words" },
      { words: ["am", "is", "are", "be"], odd: 3, reason: "'Be' is the infinitive/base form. The others are conjugated forms", group: "Conjugated forms of 'be'" },
      { words: ["will", "going to", "shall", "yesterday"], odd: 3, reason: "'Yesterday' refers to the past. The others express future", group: "Future markers" },
      { words: ["the", "a", "an", "some"], odd: 3, reason: "'Some' is a quantifier. The others are articles", group: "Articles" },
      { words: ["whom", "whose", "which", "when"], odd: 2, reason: "'Which' is for things. The others relate to people or time in relative clauses", group: "Relative pronouns for people/time" },
      { words: ["hadn't", "wouldn't", "shouldn't", "doesn't"], odd: 3, reason: "'Doesn't' is present. The others are past/conditional negatives", group: "Past/conditional negative contractions" },
      { words: ["herself", "himself", "themselves", "their"], odd: 3, reason: "'Their' is a possessive adjective. The others are reflexive pronouns", group: "Reflexive pronouns" },
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
      { words: ["ceiling", "roof", "floor", "wall"], odd: 2, reason: "'Floor' is horizontal at the bottom. Ceiling, roof, and wall are above or vertical", group: "Parts above ground level" },
      { words: ["surgeon", "nurse", "lawyer", "pharmacist"], odd: 2, reason: "'Lawyer' works in law. The others work in healthcare", group: "Healthcare professions" },
      { words: ["nephew", "niece", "cousin", "colleague"], odd: 3, reason: "'Colleague' is a work relationship. The others are family", group: "Family members" },
      { words: ["drought", "flood", "earthquake", "sunrise"], odd: 3, reason: "'Sunrise' is a daily event. The others are natural disasters", group: "Natural disasters" },
      { words: ["exhausted", "shattered", "drained", "tired"], odd: 3, reason: "'Tired' is mild. The others are extreme/emphatic synonyms", group: "Extreme tiredness" },
      { words: ["glimpse", "stare", "glance", "peek"], odd: 1, reason: "'Stare' means to look for a long time. The others are brief looks", group: "Brief looks" },
      { words: ["spacious", "cramped", "tiny", "narrow"], odd: 0, reason: "'Spacious' means big/roomy. The others describe small spaces", group: "Small/tight spaces" },
      { words: ["borrow", "lend", "steal", "return"], odd: 2, reason: "'Steal' is taking without permission. The others involve permission/agreement", group: "Legitimate exchange of items" },
      { words: ["stubborn", "determined", "flexible", "persistent"], odd: 2, reason: "'Flexible' means adaptable. The others mean not easily changing one's mind", group: "Unwillingness to change" },
      { words: ["huge", "enormous", "tiny", "massive"], odd: 2, reason: "'Tiny' means very small. The others mean very big", group: "Extremely large" },
      { words: ["relieved", "anxious", "nervous", "tense"], odd: 0, reason: "'Relieved' is a positive feeling. The others express worry/stress", group: "Feelings of anxiety" },
      { words: ["bake", "fry", "boil", "chop"], odd: 3, reason: "'Chop' is cutting. The others are cooking methods using heat", group: "Heat-based cooking methods" },
      { words: ["elbow", "wrist", "ankle", "knee"], odd: 0, reason: "'Elbow' is in the arm. Wrist is borderline, but ankle and knee are leg joints. Actually: elbow and wrist are arm; ankle and knee are leg. Odd = 'elbow' is the only one that bends backward", group: "Joints that flex forward" }
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
      { words: ["catch a cold", "catch a bus", "catch fire", "catch a decision"], odd: 3, reason: "It's 'MAKE a decision', not 'catch a decision'", group: "Correct collocations with 'catch'" },
      { words: ["keep a secret", "keep a promise", "keep in touch", "keep a lie"], odd: 3, reason: "It's 'TELL a lie', not 'keep a lie'", group: "Correct collocations with 'keep'" },
      { words: ["fast food", "fast asleep", "fast car", "fast awake"], odd: 3, reason: "It's 'wide awake', not 'fast awake'", group: "Correct collocations with 'fast'" },
      { words: ["get married", "get divorced", "get engaged", "get single"], odd: 3, reason: "'Get single' doesn't exist. You 'become single' or 'stay single'", group: "Life event collocations with 'get'" },
      { words: ["break a record", "break the law", "break a promise", "break an effort"], odd: 3, reason: "You 'MAKE an effort', not 'break an effort'", group: "Correct collocations with 'break'" },
      { words: ["run a business", "run a risk", "run a bath", "run a lie"], odd: 3, reason: "You 'TELL a lie', not 'run a lie'", group: "Correct collocations with 'run'" },
      { words: ["deeply offended", "deeply moved", "deeply asleep", "deeply affected"], odd: 2, reason: "It's 'fast/sound asleep', not 'deeply asleep'", group: "Correct collocations with 'deeply'" },
      { words: ["highly unlikely", "highly qualified", "highly tall", "highly recommend"], odd: 2, reason: "'Tall' doesn't collocate with 'highly'. Use 'very tall'", group: "Correct collocations with 'highly'" },
      { words: ["bitterly cold", "bitterly disappointed", "bitterly regret", "bitterly happy"], odd: 3, reason: "'Happy' is positive — 'bitterly' only collocates with negative words", group: "Correct collocations with 'bitterly'" }
    ]
  },
  pronunciation: {
    label: 'Pronunciation',
    icon: '🔊',
    level: 'A2–B1',
    items: [
      { words: ["through", "though", "thought", "thorough"], odd: 1, reason: "'Though' /ðoʊ/ has a different vowel sound. The others have /θr/ or /θɔː/", group: "Words with /θ/ + different vowel pattern" },
      { words: ["read", "lead", "head", "bead"], odd: 2, reason: "'Head' has /ɛ/. The others can have /iː/ (long 'ee' sound)", group: "Words with potential /iː/ sound" },
      { words: ["cough", "enough", "rough", "dough"], odd: 3, reason: "'Dough' rhymes with 'go' /oʊ/. The others have /ʌf/ or /ɒf/", group: "Words where '-ough' = /ʌf/ or /ɒf/" },
      { words: ["knight", "know", "knife", "king"], odd: 3, reason: "'King' pronounces the K. In the others, K is silent", group: "Words with silent K" },
      { words: ["island", "listen", "castle", "whistle"], odd: 0, reason: "'Island' has a silent 's'. The others have a silent 't'", group: "Words with silent T" },
      { words: ["food", "mood", "blood", "spoon"], odd: 2, reason: "'Blood' has /ʌ/ (like 'cut'). The others have /uː/ (long 'oo')", group: "Words with /uː/ sound" },
      { words: ["bear", "wear", "pear", "fear"], odd: 3, reason: "'Fear' has /ɪə/ (like 'ear'). The others have /eə/ (like 'air')", group: "Words with /eə/ sound" },
      { words: ["bomb", "climb", "thumb", "timber"], odd: 3, reason: "'Timber' pronounces the B. In the others, B is silent", group: "Words with silent B" },
      { words: ["great", "steak", "break", "weak"], odd: 3, reason: "'Weak' has /iː/. The others have /eɪ/ (like 'day')", group: "Words where 'ea' = /eɪ/" },
      { words: ["hour", "honest", "hotel", "honour"], odd: 2, reason: "'Hotel' pronounces the H. In the others, H is silent", group: "Words with silent H" },
      { words: ["women", "give", "mint", "tin"], odd: 0, reason: "'Women' has /ɪ/ in the first syllable despite being spelled with 'o'", group: "Words with /ɪ/ sound spelled with 'i'" },
      { words: ["recipe", "complete", "athlete", "concrete"], odd: 0, reason: "'Recipe' has 3 syllables (/ˈrɛsɪpi/). The others have 2-3 syllables with stress on different patterns", group: "Words ending in '-ete/-ete' with 2 syllables" },
      { words: ["laugh", "calf", "half", "although"], odd: 3, reason: "'Although' has /oʊ/. The others have /ɑːf/", group: "Words with /ɑːf/ sound" },
      { words: ["ache", "chemistry", "character", "church"], odd: 3, reason: "'Church' has /tʃ/ (ch as in 'chip'). The others have /k/ for 'ch'", group: "Words where 'ch' = /k/" },
      { words: ["pleasure", "measure", "treasure", "sure"], odd: 3, reason: "'Sure' has /ʃ/. The others have /ʒ/ (like the 's' in 'vision')", group: "Words with /ʒ/ sound" }
    ]
  }
};
