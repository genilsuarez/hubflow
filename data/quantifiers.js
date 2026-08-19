/**
 * Quantifiers Data — some/any/much/many/a lot of/few/little/...
 * Categories: Some/Any, Much/Many, Few/Little, A lot / A little
 */

// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperativas.js.
export const CATEGORIES = {
  someany: {
    label: 'Some / Any',
    icon: '🔀',
    options: ['some', 'any'],
    studyCards: [
      { front: 'some', back: 'afirmativas + ofertas/peticiones (contexto positivo)', detail: '"I have some money." · "Would you like some coffee?" (oferta) · "Can I have some water?" (petición cortés)' },
      { front: 'any', back: 'negativas y preguntas neutras', detail: '"There isn\'t any milk left." · "Do you have any questions?" · "Did you find any information?"' },
    ],
    items: [
      { sentence: 'I have ___ money in my wallet.', correct: 'some', explain: 'Use "some" in affirmative sentences.' },
      { sentence: 'Do you have ___ questions?', correct: 'any', explain: 'Use "any" in questions.' },
      { sentence: 'There isn\'t ___ milk left.', correct: 'any', explain: 'Use "any" in negative sentences.' },
      { sentence: 'Would you like ___ coffee?', correct: 'some', explain: 'Use "some" in offers and requests, even in question form.' },
      { sentence: 'She bought ___ apples at the market.', correct: 'some', explain: 'Use "some" in affirmative sentences.' },
      { sentence: 'Are there ___ good restaurants nearby?', correct: 'any', explain: 'Use "any" in questions.' },
      { sentence: 'Can I have ___ water, please?', correct: 'some', explain: 'Use "some" in requests.' },
      { sentence: 'He didn\'t give me ___ advice.', correct: 'any', explain: 'Use "any" in negative sentences.' },
      { sentence: 'We need ___ help with this project.', correct: 'some', explain: 'Use "some" in affirmative sentences.' },
      { sentence: 'Is there ___ sugar in my tea?', correct: 'any', explain: 'Use "any" in questions.' }
    ]
  },
  muchmany: {
    label: 'Much / Many',
    icon: '📊',
    options: ['much', 'many'],
    studyCards: [
      { front: 'many + contable plural', back: 'puedes contar uno por uno → many', detail: '"How many people / books / languages?" Tiene plural real.' },
      { front: 'much + incontable', back: 'no tiene plural real → much', detail: '"How much money / water / time / information / noise?" No dices "one money, two moneys..."' },
    ],
    items: [
      { sentence: 'How ___ money do you have?', correct: 'much', explain: 'Use "much" with uncountable nouns (money).' },
      { sentence: 'How ___ people came to the party?', correct: 'many', explain: 'Use "many" with countable plural nouns (people).' },
      { sentence: 'There isn\'t ___ time left.', correct: 'much', explain: 'Use "much" with uncountable nouns (time).' },
      { sentence: 'She doesn\'t have ___ friends here.', correct: 'many', explain: 'Use "many" with countable plural nouns (friends).' },
      { sentence: 'How ___ languages do you speak?', correct: 'many', explain: 'Use "many" with countable plural nouns (languages).' },
      { sentence: 'There is too ___ noise in here.', correct: 'much', explain: 'Use "much" with uncountable nouns (noise).' },
      { sentence: 'He doesn\'t have ___ books.', correct: 'many', explain: 'Use "many" with countable plural nouns (books).' },
      { sentence: 'How ___ water do you drink daily?', correct: 'much', explain: 'Use "much" with uncountable nouns (water).' },
      { sentence: 'Were there ___ cars on the road?', correct: 'many', explain: 'Use "many" with countable plural nouns (cars).' },
      { sentence: 'We don\'t have ___ information yet.', correct: 'much', explain: 'Use "much" with uncountable nouns (information).' }
    ]
  },
  fewlittle: {
    label: 'Few / Little',
    icon: '🤏',
    options: ['few', 'little', 'a few', 'a little'],
    studyCards: [
      { front: 'few / little — negativo', back: 'casi ninguno / casi nada (connotación negativa)', detail: '"Few students passed." (casi ninguno — malo) · "We have little time." (casi nada — urgencia)' },
      { front: 'a few / a little — positivo', back: 'algunos / un poco (connotación positiva)', detail: '"I have a few friends." (algunos — suficiente) · "Add a little salt." (un poco — cantidad positiva)' },
      { front: 'few / a few + contable | little / a little + incontable', back: 'mismo contraste de contable/incontable que many/much', detail: '"a few minutes" (contable) · "a little time" (incontable)' },
    ],
    items: [
      { sentence: 'I have ___ friends, so I\'m never lonely.', correct: 'a few', explain: '"A few" (countable) = some, a positive amount.' },
      { sentence: 'She has ___ money, so she can\'t buy it.', correct: 'little', explain: '"Little" (uncountable) = almost none, negative sense.' },
      { sentence: 'There are ___ people who understand this.', correct: 'few', explain: '"Few" (countable) = almost none, negative sense.' },
      { sentence: 'Add ___ salt to the soup.', correct: 'a little', explain: '"A little" (uncountable) = a small positive amount.' },
      { sentence: 'We have ___ time, let\'s hurry.', correct: 'little', explain: '"Little" (uncountable) = almost no time.' },
      { sentence: 'I need ___ minutes to finish.', correct: 'a few', explain: '"A few" (countable) = a small positive number.' },
      { sentence: 'Very ___ students passed the exam.', correct: 'few', explain: '"Few" (countable) = almost none.' },
      { sentence: 'He speaks ___ words of Spanish.', correct: 'a few', explain: '"A few" (countable) = some words.' },
      { sentence: 'Could you speak ___ louder, please?', correct: 'a little', explain: '"A little" + comparative = a small positive amount.' },
      { sentence: 'There is ___ hope of finding it now.', correct: 'little', explain: '"Little" (uncountable) = almost no hope.' }
    ]
  },
  general: {
    label: 'A lot / Enough',
    icon: '⚖️',
    options: ['a lot of', 'enough', 'too much', 'too many'],
    studyCards: [
      { front: 'a lot of', back: 'gran cantidad, contable e incontable (positivo)', detail: '"She has a lot of books." · "I drink a lot of water." Funciona en ambos tipos de nombre.' },
      { front: 'enough', back: 'la cantidad suficiente (ni más ni menos)', detail: '"Do we have enough chairs?" (¿lo justo?) · "We don\'t have enough money." (falta)' },
      { front: 'too much / too many', back: 'exceso: too much (incontable) / too many (contable)', detail: '"There is too much traffic." · "There are too many people." Implica un problema.' },
    ],
    items: [
      { sentence: 'She has ___ books — hundreds of them.', correct: 'a lot of', explain: '"A lot of" works with both countable and uncountable nouns.' },
      { sentence: 'Do we have ___ chairs for everyone?', correct: 'enough', explain: '"Enough" = the right/sufficient amount.' },
      { sentence: 'There is ___ traffic today, we\'ll be late.', correct: 'too much', explain: '"Too much" (uncountable) = more than needed.' },
      { sentence: 'There are ___ people in this room.', correct: 'too many', explain: '"Too many" (countable) = more than needed.' },
      { sentence: 'I drink ___ water every day.', correct: 'a lot of', explain: '"A lot of" works with uncountable nouns too.' },
      { sentence: 'We don\'t have ___ money for a holiday.', correct: 'enough', explain: '"Enough" = sufficient amount (here, negative).' },
      { sentence: 'You eat ___ sugar — it\'s unhealthy.', correct: 'too much', explain: '"Too much" (uncountable) = excessive.' },
      { sentence: 'He made ___ mistakes in the test.', correct: 'too many', explain: '"Too many" (countable) = excessive number.' },
      { sentence: 'We had ___ fun at the concert.', correct: 'a lot of', explain: '"A lot of" works with both countable and uncountable nouns in positive statements.' },
      { sentence: 'Is there ___ food for the guests?', correct: 'enough', explain: '"Enough" = sufficient amount.' }
    ]
  }
};
