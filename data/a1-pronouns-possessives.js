// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
export const CATEGORIES = {
  subjectPronouns: {
    label: 'Subject Pronouns',
    icon: '🙋',
    options: ['I', 'You', 'He', 'She', 'It', 'We', 'They'],
    studyCards: [
      { front: 'I · you · he · she · it · we · they', back: 'hacen la acción (sujeto)', detail: 'She is a doctor. (sujeto de "is") · They work together. (sujeto de "work")' },
      { front: 'he / she / it', back: 'singular + tercera persona → verbo + s', detail: 'She works. · He likes. · It rains. (nunca "she work" o "he like")' },
      { front: 'we = yo + otro(s)', back: 'incluye siempre al hablante', detail: '"Peter and I" = we. "My team and I" = we. Si no incluyes al hablante → they.' },
    ],
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
    studyCards: [
      { front: 'me · you · him · her · it · us · them', back: 'reciben la acción (objeto)', detail: 'Give it to her. (her = objeto de "give to") · Can you help me? (me = objeto de "help")' },
      { front: 'him / her / them', back: 'he → him · she → her · they → them', detail: 'I know him. (Tom = he → him) · Call her. (Maria = she → her)' },
      { front: 'Trampa: you e it no cambian', back: 'you e it son iguales como sujeto y objeto', detail: '"You helped me" (you = sujeto) · "I helped you" (you = objeto). It: "It broke" vs "I fixed it".' },
    ],
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
    studyCards: [
      { front: 'my · your · his · her · its · our · their', back: 'van ANTES de un sustantivo', detail: 'my book · her umbrella · its tail (sin apóstrofe). Nunca van solos al final de frase.' },
      { front: 'its (adjetivo posesivo)', back: 'sin apóstrofe', detail: '"The dog wagged its tail." (its = de él/ella, el perro). "It\'s" con apóstrofe = it is. Dos palabras distintas.' },
      { front: 'Sujeto → adjetivo posesivo', back: 'I→my · he→his · she→her · they→their', detail: 'Misma lógica que los pronombres sujeto, solo cambia la forma.' },
    ],
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
    studyCards: [
      { front: 'mine · yours · his · hers · ours · theirs', back: 'van SOLOS, sin sustantivo después', detail: '"This book is mine." (no "my"). "That car is hers." (no "her car" en la misma frase).' },
      { front: 'Adjetivo posesivo → pronombre posesivo', back: 'my→mine · your→yours · her→hers · our→ours · their→theirs', detail: '"his" y "its" son iguales en ambas formas. "hers/ours/yours/theirs" añaden -s.' },
      { front: 'Trampa: hers/ours/theirs no tienen apóstrofe', back: 'nunca: her\'s / our\'s / their\'s', detail: 'A diferencia de "Tom\'s car", los pronombres posesivos nunca llevan apóstrofe.' },
    ],
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
