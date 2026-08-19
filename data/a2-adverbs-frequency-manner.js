// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
// Bugs corregidos:
// - frequencyAdverbsPosition: distractor 3 ('eats breakfast always') repetía 'breakfast'
//   que ya aparece en la frase → reemplazado por 'breakfast always eats'.
// - mannerAdverbsFormation: explain de 'beautifully' decía "Adjectives ending in -l
//   double before -ly" — regla falsa. Corregido a "adjectives ending in -ful just add -ly".
// - mannerAdverbsIrregular: item comparativo ('runs faster than') reemplazado por uno
//   de adverbio irregular puro.
export const CATEGORIES = {
  frequencyAdverbsPosition: {
    label: 'Frequency Adverbs — Position',
    icon: '📍',
    options: ['always eats', 'eats always', 'always breakfast eats'],
    studyCards: [
      { front: 'Antes del verbo principal', back: 'sujeto + adverbio + verbo', detail: 'I always eat breakfast. · She never drives to work. · He rarely watches TV.' },
      { front: 'Después de "be"', back: 'sujeto + be + adverbio', detail: 'I am never late. · She is sometimes tired. · They are usually hungry.' },
      { front: 'Trampa común', back: 'Nunca entre el verbo y su objeto', detail: '✗ She eats always breakfast. → ✓ She always eats breakfast.' },
    ],
    items: [
      { sentence: 'She ___ breakfast at 7am.', correct: 'always eats', explain: "Frequency adverbs usually go before the main verb." },
      { sentence: 'I ___ late for school.', correct: 'am never', explain: "With 'be', frequency adverbs go after the verb.", options: ['am never', 'never am', 'never be'] },
      { sentence: 'We ___ to the gym on Mondays.', correct: 'usually go', explain: "Frequency adverbs usually go before the main verb.", options: ['usually go', 'go usually', 'go to usually'] },
      { sentence: 'He ___ watches TV in the morning.', correct: 'rarely', explain: "Frequency adverbs usually go before the main verb.", options: ['rarely', 'watches rarely', 'is rarely'] },
      { sentence: 'They ___ visit their grandparents.', correct: 'often', explain: "Frequency adverbs usually go before the main verb.", options: ['often', 'visit often', 'are often'] },
      { sentence: 'She ___ tired after work.', correct: 'is sometimes', explain: "With 'be', frequency adverbs go after the verb.", options: ['is sometimes', 'sometimes is', 'sometimes be'] },
      { sentence: 'I ___ eat fast food.', correct: 'seldom', explain: "Frequency adverbs usually go before the main verb.", options: ['seldom', 'eat seldom', 'am seldom'] },
      { sentence: 'We ___ study together on weekends.', correct: 'sometimes', explain: "Frequency adverbs usually go before the main verb.", options: ['sometimes', 'study sometimes', 'are sometimes'] },
      { sentence: 'He ___ arrives on time.', correct: 'always', explain: "Frequency adverbs usually go before the main verb.", options: ['always', 'arrives always', 'is always arrives'] },
      { sentence: 'They ___ hungry after school.', correct: 'are usually', explain: "With 'be', frequency adverbs go after the verb.", options: ['are usually', 'usually are', 'usually be'] },
    ]
  },
  frequencyAdverbsMeaning: {
    label: 'Frequency Adverbs — Meaning',
    icon: '📅',
    options: ['always (100%)', 'never (0%)', 'sometimes (~50%)'],
    studyCards: [
      { front: '100% → always | 0% → never', back: 'los dos extremos', detail: 'I always brush my teeth. · She never eats meat.' },
      { front: '~80% → usually | ~70% → often | ~50% → sometimes', back: 'frecuencias medias', detail: 'usually > often > sometimes en frecuencia.' },
      { front: '~10% → rarely / seldom', back: 'casi nunca', detail: '"Rarely" y "seldom" son sinónimos, más formales que "almost never".' },
    ],
    items: [
      { sentence: 'I ___ brush my teeth every day. (100% of the time)', correct: 'always', explain: "'Always' means 100% of the time.", options: ['always', 'never', 'rarely'] },
      { sentence: 'She ___ eats meat. (0% of the time)', correct: 'never', explain: "'Never' means 0% of the time.", options: ['never', 'always', 'often'] },
      { sentence: 'We ___ go to the beach. (about 50% of the time)', correct: 'sometimes', explain: "'Sometimes' means about 50% of the time.", options: ['sometimes', 'always', 'never'] },
      { sentence: 'He ___ arrives late. (very rarely)', correct: 'rarely', explain: "'Rarely' means very rarely, close to 0%.", options: ['rarely', 'always', 'usually'] },
      { sentence: 'They ___ visit us. (most of the time, ~80%)', correct: 'usually', explain: "'Usually' means most of the time, around 80-90%.", options: ['usually', 'never', 'rarely'] },
      { sentence: 'I ___ go for a walk after dinner. (most days, ~70%)', correct: 'often', explain: "'Often' means frequently, around 70%.", options: ['often', 'never', 'rarely'] },
      { sentence: 'She ___ drinks coffee. (almost never)', correct: 'seldom', explain: "'Seldom' means almost never, similar to 'rarely'.", options: ['seldom', 'always', 'usually'] },
      { sentence: 'We ___ eat pizza on Fridays. (every single time)', correct: 'always', explain: "'Always' means every single time, 100%.", options: ['always', 'never', 'sometimes'] },
      { sentence: 'He ___ misses the bus. (once in a while)', correct: 'sometimes', explain: "'Sometimes' means occasionally, about 50%.", options: ['sometimes', 'always', 'never'] },
      { sentence: 'They ___ complain about the weather. (frequently)', correct: 'often', explain: "'Often' means frequently.", options: ['often', 'never', 'rarely'] },
    ]
  },
  mannerAdverbsFormation: {
    label: 'Manner Adverbs — Formation',
    icon: '🔧',
    options: ['quickly', 'quick', 'quickley'],
    studyCards: [
      { front: 'Regla general', back: 'adjetivo + -ly', detail: 'quick → quickly · calm → calmly · honest → honestly · slow → slowly' },
      { front: 'Consonante + y → -ily', back: 'y cambia a i antes de -ly', detail: 'easy → easily · happy → happily · angry → angrily' },
      { front: 'Trampa: terminados en -ful', back: '-ful + -ly = -fully (doble l por encuentro ortográfico)', detail: 'careful → carefully · beautiful → beautifully · graceful → gracefully. (No es una regla de "doblado"; es simplemente -ful + -ly juntos.)' },
    ],
    items: [
      { sentence: 'She ran ___ to catch the bus.', correct: 'quickly', explain: "Add -ly to the adjective 'quick' to form the adverb." },
      { sentence: 'He spoke ___ during the meeting.', correct: 'calmly', explain: "Add -ly to the adjective 'calm' to form the adverb.", options: ['calmly', 'calm', 'calmley'] },
      { sentence: 'They worked ___ on the project.', correct: 'carefully', explain: "Add -ly to the adjective 'careful' to form the adverb (-ful + -ly = -fully).", options: ['carefully', 'careful', 'carefuly'] },
      { sentence: 'She sang ___ at the concert.', correct: 'beautifully', explain: "Add -ly to the adjective 'beautiful' (-ful + -ly = -fully).", options: ['beautifully', 'beautifuly', 'beautiful'] },
      { sentence: 'He answered the question ___.', correct: 'honestly', explain: "Add -ly to the adjective 'honest' to form the adverb.", options: ['honestly', 'honest', 'honestley'] },
      { sentence: 'We finished the test ___.', correct: 'easily', explain: "Consonant + y: change y to i and add -ly: easy → easily.", options: ['easily', 'easyly', 'easy'] },
      { sentence: 'She smiled ___ at the camera.', correct: 'happily', explain: "Consonant + y: change y to i and add -ly: happy → happily.", options: ['happily', 'happyly', 'happy'] },
      { sentence: 'He drove ___ through the city.', correct: 'slowly', explain: "Add -ly to the adjective 'slow' to form the adverb.", options: ['slowly', 'slow', 'slowley'] },
      { sentence: 'They danced ___ at the party.', correct: 'gracefully', explain: "Add -ly to the adjective 'graceful' (-ful + -ly = -fully).", options: ['gracefully', 'graceful', 'gracefuly'] },
      { sentence: 'She explained the rule ___.', correct: 'clearly', explain: "Add -ly to the adjective 'clear' to form the adverb.", options: ['clearly', 'clear', 'clearley'] },
    ]
  },
  mannerAdverbsIrregular: {
    label: 'Manner Adverbs — Irregular',
    icon: '🌀',
    options: ['well', 'good', 'goodly'],
    studyCards: [
      { front: 'good → well', back: 'único irregular de uso frecuente', detail: 'She sings well. · He did well on the exam. (nunca "she sings good" como adverbio)' },
      { front: 'fast / hard / late / early', back: 'misma forma como adjetivo y como adverbio', detail: 'a fast car → she runs fast. a hard test → he works hard. Note: "lately" ≠ late — "lately" = "recently".' },
      { front: 'Trampa: hard vs hardly', back: 'hard = con esfuerzo | hardly = casi nada', detail: '"He works hard." (con esfuerzo) ≠ "He hardly works." (casi no trabaja)' },
    ],
    items: [
      { sentence: 'She sings very ___.', correct: 'well', explain: "'Well' is the irregular adverb form of 'good'." },
      { sentence: 'He drives ___.', correct: 'fast', explain: "'Fast' has the same form as adjective and adverb.", options: ['fast', 'fastly', 'faster'] },
      { sentence: 'They arrived ___.', correct: 'late', explain: "'Late' has the same form as adjective and adverb.", options: ['late', 'lately', 'later'] },
      { sentence: 'She works ___.', correct: 'hard', explain: "'Hard' has the same form as adjective and adverb. 'Hardly' means 'almost not'.", options: ['hard', 'hardly', 'harder'] },
      { sentence: 'He did ___ on the exam.', correct: 'well', explain: "'Well' is the irregular adverb form of 'good'.", options: ['well', 'good', 'goodly'] },
      { sentence: 'The plane arrived ___.', correct: 'early', explain: "'Early' has the same form as adjective and adverb.", options: ['early', 'earlily', 'earlier'] },
      { sentence: 'She plays the piano very ___.', correct: 'well', explain: "'Well' is the irregular adverb form of 'good'.", options: ['well', 'good', 'goodly'] },
      { sentence: 'He left ___ in the morning to beat the traffic.', correct: 'early', explain: "'Early' is both adjective and adverb — no -ly needed.", options: ['early', 'earlily', 'earlier'] },
      { sentence: 'They worked ___ to finish on time.', correct: 'hard', explain: "'Hard' has the same form as adjective and adverb.", options: ['hard', 'hardly', 'harder'] },
      { sentence: 'I ___ believe what happened.', correct: 'hardly', explain: "'Hardly' means 'almost not' — very different from 'hard'.", options: ['hardly', 'hard', 'harder'] },
    ]
  }
};
