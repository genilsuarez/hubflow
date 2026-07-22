/**
 * HubFlow — Word Order Data
 * Categories: statements (A2), questions (A2-B1), adverbs (B1), complex (B2)
 * Each entry: { words: string[], correct: string[], hint, explain }
 * The user arranges the words into a correct sentence.
 */

export const CATEGORIES = {
  statements: {
    label: 'Statements',
    icon: '📝',
    level: 'A2',
    items: [
      { words: ["always", "she", "coffee", "drinks", "morning", "in", "the"], correct: ["She always drinks coffee in the morning."], hint: "Subject + adverb + verb + object + time", explain: "Frequency adverbs go between the subject and main verb." },
      { words: ["yesterday", "went", "to", "we", "cinema", "the"], correct: ["We went to the cinema yesterday.", "Yesterday we went to the cinema."], hint: "Subject + verb + place + time", explain: "Time expressions can go at the start or end of a sentence." },
      { words: ["been", "has", "never", "she", "to", "Japan"], correct: ["She has never been to Japan."], hint: "Subject + has + never + past participle", explain: "'Never' goes between the auxiliary and main verb." },
      { words: ["is", "what", "doing", "he", "now", "right"], correct: ["What is he doing right now?"], hint: "Wh- + auxiliary + subject + verb", explain: "Questions: wh-word + auxiliary + subject + -ing form." },
      { words: ["enough", "isn't", "old", "she", "to", "drive"], correct: ["She isn't old enough to drive."], hint: "'Enough' comes after the adjective", explain: "The pattern is: adjective + enough + to-infinitive." },
      { words: ["the", "made", "was", "cake", "by", "grandmother", "my"], correct: ["The cake was made by my grandmother."], hint: "Passive: subject + was + past participle + by + agent", explain: "Passive voice puts the object first." },
      { words: ["either", "don't", "I", "like", "pizza", "or", "pasta"], correct: ["I don't like either pizza or pasta."], hint: "neither...nor or don't...either...or", explain: "'Either...or' is used with negative verbs." },
      { words: ["so", "tired", "was", "he", "that", "fell", "he", "asleep"], correct: ["He was so tired that he fell asleep."], hint: "so + adjective + that + result", explain: "The so...that construction shows cause and effect." },
      { words: ["interesting", "a", "such", "it", "was", "book"], correct: ["It was such an interesting book."], hint: "'Such' + a/an + adjective + noun", explain: "'Such' goes before the article in this structure." },
      { words: ["will", "finished", "have", "by", "I", "tomorrow", "it"], correct: ["I will have finished it by tomorrow."], hint: "Subject + will have + past participle + time", explain: "Future perfect: will + have + past participle." },
      { words: ["to", "used", "we", "walk", "school", "to"], correct: ["We used to walk to school."], hint: "Subject + used to + base verb", explain: "'Used to' describes past habits." },
    ],
  },
  questions: {
    label: 'Questions',
    icon: '❓',
    level: 'A2–B1',
    items: [
      { words: ["do", "how", "often", "you", "exercise"], correct: ["How often do you exercise?"], hint: "Wh- + do/does + subject + base verb", explain: "'How often' asks about frequency." },
      { words: ["been", "have", "long", "how", "waiting", "you"], correct: ["How long have you been waiting?"], hint: "How long + have + subject + been + -ing", explain: "Present perfect continuous for duration of an ongoing action." },
      { words: ["would", "if", "do", "what", "won", "you", "the", "lottery", "you"], correct: ["What would you do if you won the lottery?"], hint: "What would + subject + do + if + past simple", explain: "Second conditional: imaginary present/future situation." },
      { words: ["supposed", "am", "to", "what", "do", "I"], correct: ["What am I supposed to do?"], hint: "Wh- + am + subject + supposed to + verb", explain: "'Be supposed to' asks about expected behaviour." },
      { words: ["mind", "would", "the", "you", "opening", "window"], correct: ["Would you mind opening the window?"], hint: "Would you mind + -ing (polite request)", explain: "'Would you mind' + gerund is a polite request format." },
      { words: ["did", "why", "leave", "you", "early", "so"], correct: ["Why did you leave so early?"], hint: "Wh- + did + subject + base verb", explain: "Past simple questions use did + base form." },
      { words: ["have", "finished", "they", "yet"], correct: ["Have they finished yet?"], hint: "Have + subject + past participle + yet", explain: "'Yet' goes at the end of present perfect questions." },
      { words: ["could", "me", "tell", "where", "is", "you", "the", "station"], correct: ["Could you tell me where the station is?"], hint: "Indirect question: no inversion after 'where'", explain: "In indirect questions, word order stays: where + subject + verb." },
      { words: ["isn't", "she", "coming", "is"], correct: ["She is coming, isn't she?"], hint: "Statement + opposite tag", explain: "Positive statement → negative tag." },
      { words: ["supposed", "we", "aren't", "to", "be", "there", "by", "6"], correct: ["Aren't we supposed to be there by 6?"], hint: "Negative question for confirmation", explain: "Negative questions express surprise or seek confirmation." },
      { words: ["chance", "is", "there", "any", "coming", "of", "her"], correct: ["Is there any chance of her coming?"], hint: "Is there any chance of + gerund", explain: "'Any chance of' + gerund asks about possibility." },
    ],
  },
  adverbs: {
    label: 'Adverb Position',
    icon: '📍',
    level: 'B1',
    items: [
      { words: ["hardly", "she", "could", "speak"], correct: ["She could hardly speak."], hint: "Adverb goes after the modal verb", explain: "'Hardly' (= almost not) goes after the auxiliary." },
      { words: ["always", "not", "you", "are", "right"], correct: ["You are not always right."], hint: "Frequency adverb after 'not'", explain: "With negatives, frequency adverbs go after 'not'." },
      { words: ["only", "realized", "I", "later", "the", "mistake"], correct: ["I only realized the mistake later.", "Only later did I realize the mistake."], hint: "'Only' can modify the verb or be fronted", explain: "Front position triggers inversion for emphasis." },
      { words: ["well", "extremely", "she", "English", "speaks"], correct: ["She speaks English extremely well."], hint: "Manner adverbs go at the end", explain: "Degree adverb + manner adverb come after the object." },
      { words: ["never", "have", "seen", "I", "such", "a", "beautiful", "sunset"], correct: ["I have never seen such a beautiful sunset.", "Never have I seen such a beautiful sunset."], hint: "Negative adverb can trigger inversion", explain: "'Never' before auxiliary triggers inversion in formal English." },
      { words: ["probably", "they", "won't", "come"], correct: ["They probably won't come."], hint: "Probability adverb before the negative auxiliary", explain: "'Probably' usually goes before won't/can't/don't." },
      { words: ["still", "she", "hasn't", "replied"], correct: ["She still hasn't replied."], hint: "'Still' goes before the negative auxiliary", explain: "'Still' + negative = something hasn't changed." },
      { words: ["already", "have", "I", "it", "finished"], correct: ["I have already finished it."], hint: "'Already' between have and past participle", explain: "'Already' goes between auxiliary and main verb in affirmative." },
      { words: ["just", "has", "he", "left"], correct: ["He has just left."], hint: "'Just' for very recent past", explain: "'Just' goes between 'has/have' and past participle." },
      { words: ["seldom", "we", "go", "out", "weekdays", "on"], correct: ["We seldom go out on weekdays.", "Seldom do we go out on weekdays."], hint: "'Seldom' = almost never", explain: "Formal fronted position triggers inversion." },
    ],
  },
  complex: {
    label: 'Complex Structures',
    icon: '🧠',
    level: 'B2',
    items: [
      { words: ["not", "only", "intelligent", "is", "she", "but", "also", "kind"], correct: ["Not only is she intelligent, but also kind.", "Not only is she intelligent but she is also kind."], hint: "Not only + inversion + but also", explain: "'Not only' at the start triggers subject-verb inversion." },
      { words: ["had", "I", "known", "told", "would", "you", "I", "have"], correct: ["Had I known, I would have told you."], hint: "Third conditional with inversion (no 'if')", explain: "Had + subject = formal version of 'If I had...'" },
      { words: ["sooner", "no", "arrived", "had", "I", "than", "raining", "started", "it"], correct: ["No sooner had I arrived than it started raining."], hint: "No sooner + had + subject + than", explain: "'No sooner...than' = immediately after arriving." },
      { words: ["the", "matter", "what", "happens", "give", "don't", "up"], correct: ["No matter what happens, don't give up."], hint: "'No matter what' = regardless", explain: "'No matter what' means the result is the same regardless of what occurs." },
      { words: ["were", "it", "for", "not", "you", "failed", "would", "I", "have"], correct: ["Were it not for you, I would have failed."], hint: "Were it not for = If it weren't for (formal)", explain: "Formal inversion replaces 'if it weren't for'." },
      { words: ["should", "you", "require", "further", "information", "hesitate", "do", "not", "to", "contact", "us"], correct: ["Should you require further information, do not hesitate to contact us."], hint: "Should + subject = formal 'if'", explain: "'Should you' replaces 'if you' in formal English." },
      { words: ["little", "did", "know", "he", "about", "the", "problem"], correct: ["Little did he know about the problem."], hint: "Negative fronting triggers inversion", explain: "'Little' at the front requires auxiliary before subject." },
      { words: ["under", "no", "circumstances", "should", "you", "this", "open", "door"], correct: ["Under no circumstances should you open this door."], hint: "Negative fronting: 'under no circumstances'", explain: "Negative adverbial phrases at the start trigger inversion." },
    ],
  },
};
