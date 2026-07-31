/**
 * HubFlow — A1 Sentence Build Data
 * Categories: simpleStatements, simpleQuestions, simpleNegatives — all A1
 * Each entry: { words: string[], correct: string[], hint, explain }
 * The user arranges the words into a correct sentence. Easier lead-in to word-order (B1).
 */

export const CATEGORIES = {
  simpleStatements: {
    label: 'Simple Statements',
    icon: '📝',
    items: [
      { words: ["cat", "The", "black", "is"], correct: ["The cat is black."], hint: "The + noun + is + adjective", explain: "Basic sentence order: subject, verb 'be', adjective." },
      { words: ["like", "I", "pizza"], correct: ["I like pizza."], hint: "Subject + verb + object", explain: "The simplest sentence shape: subject, verb, object." },
      { words: ["plays", "She", "tennis"], correct: ["She plays tennis."], hint: "He/she + verb+s + object", explain: "Add -s to the verb with he/she/it in the present simple." },
      { words: ["dog", "My", "big", "is"], correct: ["My dog is big."], hint: "Possessive + noun + is + adjective", explain: "'My' comes before the noun it describes." },
      { words: ["We", "school", "to", "walk"], correct: ["We walk to school."], hint: "Subject + verb + to + place", explain: "'To' introduces the destination after a movement verb." },
      { words: ["books", "reads", "He", "every", "day"], correct: ["He reads books every day."], hint: "Subject + verb+s + object + time", explain: "Time expressions like 'every day' usually go at the end." },
      { words: ["happy", "am", "I", "today"], correct: ["I am happy today."], hint: "I + am + adjective + time", explain: "'I' always goes with 'am'." },
      { words: ["a", "have", "They", "car", "new"], correct: ["They have a new car."], hint: "Subject + have + article + adjective + noun", explain: "Adjectives go before the noun: 'a new car'." },
      { words: ["blue", "is", "sky", "The"], correct: ["The sky is blue."], hint: "The + noun + is + adjective", explain: "Basic sentence order: subject, verb 'be', adjective." },
      { words: ["works", "hospital", "at", "the", "She"], correct: ["She works at the hospital."], hint: "Subject + verb + at + the + place", explain: "'At' introduces the place where someone works." },
      { words: ["cooks", "dinner", "He", "every", "evening"], correct: ["He cooks dinner every evening."], hint: "Subject + verb+s + object + time", explain: "Add -s to the verb with he/she/it in the present simple." },
      { words: ["a", "have", "sister", "I"], correct: ["I have a sister."], hint: "Subject + verb + article + noun", explain: "'Have' is used to talk about family and possession." },
      { words: ["tired", "am", "very", "I"], correct: ["I am very tired."], hint: "I + am + adverb + adjective", explain: "'Very' goes before the adjective it intensifies." },
      { words: ["park", "to", "go", "We", "often"], correct: ["We often go to the park."], hint: "Subject + adverb of frequency + verb + to + place", explain: "Frequency adverbs like 'often' usually go before the main verb." },
    ]
  },
  simpleQuestions: {
    label: 'Simple Questions',
    icon: '❓',
    items: [
      { words: ["your", "is", "name", "What"], correct: ["What is your name?"], hint: "What + is + your + noun", explain: "'What' questions ask for information, not yes/no." },
      { words: ["you", "old", "are", "How"], correct: ["How old are you?"], hint: "How + adjective + are + you", explain: "'How old' asks about age." },
      { words: ["from", "you", "are", "Where"], correct: ["Where are you from?"], hint: "Where + are + you + from", explain: "'Where...from' asks about origin." },
      { words: ["like", "coffee", "you", "Do"], correct: ["Do you like coffee?"], hint: "Do + you + verb + object", explain: "Yes/no questions in the present simple start with 'Do'." },
      { words: ["is", "this", "What"], correct: ["What is this?"], hint: "What + is + this", explain: "'What' questions ask to identify a thing." },
      { words: ["she", "Does", "Spanish", "speak"], correct: ["Does she speak Spanish?"], hint: "Does + she + base verb + object", explain: "With he/she/it, yes/no questions start with 'Does'." },
      { words: ["time", "is", "it", "What"], correct: ["What time is it?"], hint: "What + time + is + it", explain: "'What time' asks for the clock time." },
      { words: ["live", "you", "Where", "do"], correct: ["Where do you live?"], hint: "Where + do + you + base verb", explain: "'Where' questions ask about a location." },
      { words: ["a", "you", "Do", "have", "car"], correct: ["Do you have a car?"], hint: "Do + you + have + article + noun", explain: "Yes/no questions with 'have' start with 'Do'." },
      { words: ["is", "he", "Who"], correct: ["Who is he?"], hint: "Who + is + he", explain: "'Who' questions ask to identify a person." },
      { words: ["is", "job", "your", "What"], correct: ["What is your job?"], hint: "What + is + your + noun", explain: "'What' questions ask for information, not yes/no." },
      { words: ["like", "you", "music", "Do"], correct: ["Do you like music?"], hint: "Do + you + verb + object", explain: "Yes/no questions in the present simple start with 'Do'." },
      { words: ["brothers", "have", "you", "Do", "any"], correct: ["Do you have any brothers?"], hint: "Do + you + have + any + plural noun", explain: "'Any' is used with plural nouns in questions." },
    ]
  },
  simpleNegatives: {
    label: 'Simple Negatives',
    icon: '🙅',
    items: [
      { words: ["don't", "coffee", "I", "like"], correct: ["I don't like coffee."], hint: "I + don't + verb + object", explain: "'Don't' negates the present simple for I/you/we/they." },
      { words: ["isn't", "cold", "It", "today"], correct: ["It isn't cold today."], hint: "It + isn't + adjective + time", explain: "'Isn't' is the negative of 'is'." },
      { words: ["doesn't", "He", "meat", "eat"], correct: ["He doesn't eat meat."], hint: "He + doesn't + base verb + object", explain: "'Doesn't' negates the present simple for he/she/it." },
      { words: ["not", "are", "They", "here"], correct: ["They are not here."], hint: "They + are + not + place", explain: "'Not' goes right after 'are' to make it negative." },
      { words: ["don't", "have", "We", "time"], correct: ["We don't have time."], hint: "We + don't + have + object", explain: "'Don't' negates the present simple for I/you/we/they." },
      { words: ["isn't", "My", "brother", "tall"], correct: ["My brother isn't tall."], hint: "Subject + isn't + adjective", explain: "'Isn't' is the negative of 'is'." },
      { words: ["doesn't", "She", "coffee", "drink"], correct: ["She doesn't drink coffee."], hint: "She + doesn't + base verb + object", explain: "'Doesn't' negates the present simple for he/she/it." },
      { words: ["can't", "I", "swim"], correct: ["I can't swim."], hint: "I + can't + base verb", explain: "'Can't' expresses lack of ability." },
      { words: ["aren't", "hungry", "We"], correct: ["We aren't hungry."], hint: "We + aren't + adjective", explain: "'Aren't' is the negative of 'are'." },
      { words: ["don't", "understand", "I"], correct: ["I don't understand."], hint: "I + don't + base verb", explain: "'Don't' negates the present simple for I/you/we/they." },
      { words: ["don't", "We", "cook", "dinner"], correct: ["We don't cook dinner."], hint: "We + don't + base verb + object", explain: "'Don't' negates the present simple for I/you/we/they." },
      { words: ["isn't", "easy", "This"], correct: ["This isn't easy."], hint: "This + isn't + adjective", explain: "'Isn't' is the negative of 'is'." },
      { words: ["doesn't", "like", "She", "tea"], correct: ["She doesn't like tea."], hint: "She + doesn't + base verb + object", explain: "'Doesn't' negates the present simple for he/she/it." },
    ]
  },
};
