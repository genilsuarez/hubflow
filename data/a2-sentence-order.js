/**
 * HubFlow — A2 Sentence Order Data
 * Categories: presentContinuous, pastSimple, comparatives — all A2
 * Each entry: { words: string[], correct: string[], hint, explain }
 * Easier lead-in to word-order (B1): shorter sentences, one grammar point at a time.
 */

export const CATEGORIES = {
  presentContinuous: {
    label: 'Present Continuous',
    icon: '🎬',
    items: [
      { words: ["is", "She", "cooking", "dinner"], correct: ["She is cooking dinner."], hint: "Subject + is/am/are + verb-ing + object", explain: "Present continuous: subject + be + verb-ing." },
      { words: ["are", "playing", "They", "football"], correct: ["They are playing football."], hint: "Subject + are + verb-ing + object", explain: "Plural subjects use 'are' before the -ing verb." },
      { words: ["am", "reading", "I", "a book"], correct: ["I am reading a book."], hint: "I + am + verb-ing + object", explain: "'I' always goes with 'am'." },
      { words: ["is", "raining", "It"], correct: ["It is raining."], hint: "It + is + verb-ing", explain: "Weather sentences often use present continuous." },
      { words: ["working", "He", "is", "today"], correct: ["He is working today."], hint: "Subject + is + verb-ing + time", explain: "He/she/it use 'is' before the -ing verb." },
      { words: ["watching", "are", "We", "a movie"], correct: ["We are watching a movie."], hint: "We + are + verb-ing + object", explain: "'We' uses 'are' before the -ing verb." },
      { words: ["studying", "is", "She", "English"], correct: ["She is studying English."], hint: "Subject + is + verb-ing + object", explain: "He/she/it use 'is' before the -ing verb." },
      { words: ["you", "Are", "listening"], correct: ["Are you listening?"], hint: "Are + you + verb-ing", explain: "Questions invert 'be' and the subject." },
      { words: ["waiting", "for", "the bus", "I'm"], correct: ["I'm waiting for the bus."], hint: "I'm + verb-ing + for + object", explain: "'I'm' is the short form of 'I am'." },
      { words: ["playing", "is", "He", "the guitar"], correct: ["He is playing the guitar."], hint: "Subject + is + verb-ing + object", explain: "He/she/it use 'is' before the -ing verb." },
      { words: ["eating", "are", "They", "breakfast"], correct: ["They are eating breakfast."], hint: "Subject + are + verb-ing + object", explain: "Plural subjects use 'are' before the -ing verb." },
      { words: ["snowing", "is", "It"], correct: ["It is snowing."], hint: "It + is + verb-ing", explain: "Weather sentences often use present continuous." },
      { words: ["writing", "am", "I", "an email"], correct: ["I am writing an email."], hint: "I + am + verb-ing + object", explain: "'I' always goes with 'am'." },
      { words: ["sleeping", "is", "The baby"], correct: ["The baby is sleeping."], hint: "Subject + is + verb-ing", explain: "He/she/it (singular) use 'is' before the -ing verb." },
    ]
  },
  pastSimple: {
    label: 'Past Simple',
    icon: '⏮️',
    items: [
      { words: ["visited", "We", "grandmother", "our", "yesterday"], correct: ["We visited our grandmother yesterday."], hint: "Subject + past verb + object + time", explain: "Regular past simple verbs end in -ed." },
      { words: ["went", "She", "the store", "to"], correct: ["She went to the store."], hint: "Subject + past verb + to + place", explain: "'Went' is the irregular past of 'go'." },
      { words: ["watched", "a movie", "I", "last night"], correct: ["I watched a movie last night."], hint: "Subject + past verb + object + time", explain: "Time expressions like 'last night' often go at the end." },
      { words: ["called", "you", "Did"], correct: ["Did you call?"], hint: "Did + subject + base verb", explain: "Past simple questions use 'Did' + base verb, not the -ed form." },
      { words: ["didn't", "He", "the exam", "pass"], correct: ["He didn't pass the exam."], hint: "Subject + didn't + base verb + object", explain: "'Didn't' + base verb forms the past negative." },
      { words: ["cooked", "dinner", "They"], correct: ["They cooked dinner."], hint: "Subject + past verb + object", explain: "Regular past simple verbs end in -ed." },
      { words: ["was", "tired", "very", "I"], correct: ["I was very tired."], hint: "Subject + was + adverb + adjective", explain: "'Was' is the past simple of 'am/is'." },
      { words: ["bought", "a", "car", "new", "We"], correct: ["We bought a new car."], hint: "Subject + past verb + article + adjective + noun", explain: "'Bought' is the irregular past of 'buy'." },
      { words: ["arrived", "We", "late", "yesterday"], correct: ["We arrived late yesterday."], hint: "Subject + past verb + adverb + time", explain: "Regular past simple verbs end in -ed." },
      { words: ["saw", "I", "a movie", "at the cinema"], correct: ["I saw a movie at the cinema."], hint: "Subject + past verb + object + place", explain: "'Saw' is the irregular past of 'see'." },
      { words: ["finish", "Did", "the report", "you"], correct: ["Did you finish the report?"], hint: "Did + subject + base verb + object", explain: "Past simple questions use 'Did' + base verb, not the -ed form." },
      { words: ["didn't", "She", "enjoy", "the trip"], correct: ["She didn't enjoy the trip."], hint: "Subject + didn't + base verb + object", explain: "'Didn't' + base verb forms the past negative." },
      { words: ["were", "happy", "very", "We"], correct: ["We were very happy."], hint: "Subject + were + adverb + adjective", explain: "'Were' is the past simple of 'are'." },
    ]
  },
  comparatives: {
    label: 'Comparatives',
    icon: '⚖️',
    items: [
      { words: ["is", "taller", "than", "John", "Mike"], correct: ["Mike is taller than John."], hint: "Subject + is + adjective-er + than + noun", explain: "Short adjectives add -er: tall → taller." },
      { words: ["this", "is", "book", "That", "than", "interesting", "more"], correct: ["That book is more interesting than this."], hint: "Subject + is + more + adjective + than", explain: "Long adjectives use 'more' instead of -er." },
      { words: ["cheaper", "is", "This", "phone", "that", "than"], correct: ["This phone is cheaper than that."], hint: "Subject + is + adjective-er + than", explain: "Short adjectives add -er: cheap → cheaper." },
      { words: ["better", "is", "coffee", "Tea", "than"], correct: ["Tea is better than coffee."], hint: "Subject + is + adjective-er + than", explain: "'Better' is the irregular comparative of 'good'." },
      { words: ["as", "is", "old", "My brother", "as", "me"], correct: ["My brother is as old as me."], hint: "Subject + is + as + adjective + as", explain: "'As...as' shows two things are equal." },
      { words: ["faster", "runs", "than", "She", "him"], correct: ["She runs faster than him."], hint: "Subject + verb + adjective-er + than", explain: "Short adjectives add -er: fast → faster." },
      { words: ["worse", "is", "traffic", "today", "The"], correct: ["The traffic is worse today."], hint: "Subject + is + adjective-er + time", explain: "'Worse' is the irregular comparative of 'bad'." },
      { words: ["bigger", "house", "Their", "ours", "is", "than"], correct: ["Their house is bigger than ours."], hint: "Subject + is + adjective-er + than", explain: "Short adjectives ending in one vowel + consonant double the consonant: big → bigger." },
      { words: ["is", "smaller", "than", "France", "Portugal"], correct: ["Portugal is smaller than France."], hint: "Subject + is + adjective-er + than + noun", explain: "Short adjectives add -er: small → smaller." },
      { words: ["is", "more", "difficult", "This exam", "than", "the last one"], correct: ["This exam is more difficult than the last one."], hint: "Subject + is + more + adjective + than", explain: "Long adjectives use 'more' instead of -er." },
      { words: ["older", "is", "My father", "than", "my mother"], correct: ["My father is older than my mother."], hint: "Subject + is + adjective-er + than", explain: "Short adjectives add -er: old → older." },
      { words: ["worse", "is", "This coffee", "than", "that one"], correct: ["This coffee is worse than that one."], hint: "Subject + is + adjective-er + than", explain: "'Worse' is the irregular comparative of 'bad'." },
      { words: ["as", "is", "tall", "She", "as", "her sister"], correct: ["She is as tall as her sister."], hint: "Subject + is + as + adjective + as", explain: "'As...as' shows two things are equal." },
    ]
  },
};
