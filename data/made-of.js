/**
 * Made Of / From / With / Out Of Data
 */

export const CATEGORIES = {
  madeOf: {
    label: 'Made Of / From / With / Out Of',
    icon: '🧱',
    options: ['made of', 'made from', 'made with', 'made out of'],
    items: [
      { sentence: 'This table is ___ wood.', correct: 'made of', explain: 'The material is still recognisable in the final product → "made of".' },
      { sentence: 'Wine is ___ grapes.', correct: 'made from', explain: 'The original material is transformed and no longer recognisable → "made from".' },
      { sentence: 'This cake is ___ fresh eggs and butter.', correct: 'made with', explain: '"Made with" lists an ingredient among several, not the whole substance.' },
      { sentence: 'She made a sculpture ___ old newspapers.', correct: 'made out of', explain: '"Made out of" emphasizes an unusual or creative use of material.' },
      { sentence: 'This ring is ___ gold.', correct: 'made of', explain: 'Gold is still visibly gold in the ring → "made of".' },
      { sentence: 'Paper is ___ wood pulp.', correct: 'made from', explain: 'The wood is transformed into something unrecognisable → "made from".' },
      { sentence: 'This soup is ___ fresh vegetables.', correct: 'made with', explain: '"Made with" highlights one ingredient in a dish.' },
      { sentence: 'The kids built a fort ___ cardboard boxes.', correct: 'made out of', explain: '"Made out of" for improvised/creative construction.' },
      { sentence: 'Cheese is ___ milk.', correct: 'made from', explain: 'Milk is transformed into cheese, unrecognisable → "made from".' },
      { sentence: 'This chair is ___ plastic.', correct: 'made of', explain: 'The plastic is still visibly plastic → "made of".' }
    ]
  }
};
