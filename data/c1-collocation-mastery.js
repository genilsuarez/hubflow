// `studyCards` enseña la colocación fija como REGLA antes de examinarla en
// Quiz. Antes Study mostraba las mismas 10 frases del Quiz con la respuesta
// detrás — el examen disfrazado de flashcard. Mismo patrón que
// a1-plurals-possessives.js.
export const CATEGORIES = {
  verbNounCollocations: {
    label: 'Verb + Noun',
    icon: '🤝',
    options: ['draw', 'reach', 'strike', 'forge'],
    studyCards: [
      { front: 'reach', back: 'reach an agreement / a consensus / a compromise', detail: 'Llegar a un acuerdo tras negociar.' },
      { front: 'forge', back: 'forge an alliance / a partnership / a bond', detail: 'Crear una conexión fuerte, con esfuerzo, entre partes.' },
      { front: 'strike', back: 'strike a balance', detail: 'Encontrar el punto medio entre dos cosas opuestas.' },
      { front: 'draw', back: 'draw a conclusion', detail: 'Deducir algo a partir de evidencia o datos.' },
    ],
    items: [
      { sentence: 'After much debate, the committee managed to ___ a consensus.', correct: 'reach', explain: '"Reach a consensus" is a fixed collocation.' },
      { sentence: 'The two countries decided to ___ an alliance.', correct: 'forge', explain: '"Forge an alliance" is a fixed collocation.' },
      { sentence: "It's important to ___ a balance between work and life.", correct: 'strike', explain: '"Strike a balance" is a fixed collocation.' },
      { sentence: 'Based on the evidence, we can ___ a conclusion.', correct: 'draw', explain: '"Draw a conclusion" is a fixed collocation.' },
      { sentence: 'The negotiators worked hard to ___ an agreement.', correct: 'reach', explain: '"Reach an agreement" is a fixed collocation.' },
      { sentence: 'They managed to ___ a compromise after hours of talks.', correct: 'reach', explain: '"Reach a compromise" is a fixed collocation.' },
      { sentence: 'The two companies decided to ___ a partnership.', correct: 'forge', explain: '"Forge a partnership" is a fixed collocation.' },
      { sentence: 'You need to ___ a balance between saving and spending.', correct: 'strike', explain: '"Strike a balance" is a fixed collocation.' },
      { sentence: 'From this data, researchers ___ several important conclusions.', correct: 'draw', explain: '"Draw conclusions" is a fixed collocation.' },
      { sentence: 'The allies worked together to ___ a strong bond.', correct: 'forge', explain: '"Forge a bond" is a fixed collocation.' },
    ]
  },
  adjectiveNounCollocations: {
    label: 'Intensifying Adjectives',
    icon: '❗',
    options: ['sheer', 'utter', 'blatant', 'stark'],
    studyCards: [
      { front: 'sheer', back: 'sheer luck / determination', detail: '"Puro, completo" — intensifica sin juicio negativo.' },
      { front: 'utter', back: 'utter nonsense / disbelief', detail: 'Intensifica sustantivos abstractos negativos.' },
      { front: 'blatant', back: 'blatant lie / disregard', detail: 'Obvio y descarado, sin vergüenza.' },
      { front: 'stark', back: 'stark contrast / difference', detail: 'Marcadamente obvio, que salta a la vista.' },
    ],
    items: [
      { sentence: 'It was ___ nonsense from start to finish.', correct: 'utter', explain: '"Utter nonsense" intensifies a negative abstract noun.' },
      { sentence: 'The contrast between the two designs was ___.', correct: 'stark', explain: '"Stark contrast" describes something strikingly obvious.' },
      { sentence: 'That was a ___ lie, and everyone knew it.', correct: 'blatant', explain: '"Blatant lie" describes something obviously and shamelessly wrong.' },
      { sentence: 'It took ___ determination to finish the marathon.', correct: 'sheer', explain: '"Sheer determination" intensifies a quality, meaning "pure, complete".' },
      { sentence: 'The difference in opinion was ___.', correct: 'stark', explain: '"Stark difference" describes something strikingly obvious.' },
      { sentence: 'His disregard for the rules was ___.', correct: 'blatant', explain: '"Blatant disregard" describes something obviously and shamelessly wrong.' },
      { sentence: 'It was ___ luck that we found the last ticket.', correct: 'sheer', explain: '"Sheer luck" intensifies a noun, meaning "pure, complete".' },
      { sentence: 'The proposal was met with ___ disbelief.', correct: 'utter', explain: '"Utter disbelief" intensifies a negative abstract noun.' },
      { sentence: 'There was a ___ contrast in their approaches.', correct: 'stark', explain: '"Stark contrast" describes something strikingly obvious.' },
      { sentence: 'It was an act of ___ disrespect.', correct: 'blatant', explain: '"Blatant disrespect" describes something obviously and shamelessly wrong.' },
    ]
  },
  verbAdverbCollocations: {
    label: 'Verb + Adverb',
    icon: '💪',
    options: ['firmly', 'strongly', 'deeply', 'wholeheartedly'],
    studyCards: [
      { front: 'firmly', back: 'firmly believe', detail: 'Convicción estable, sin dudas.' },
      { front: 'strongly', back: 'strongly recommend / disagree / oppose', detail: 'El intensificador más versátil de este grupo.' },
      { front: 'deeply', back: 'deeply regret / moved', detail: 'Emoción profunda, a menudo dolorosa o conmovedora.' },
      { front: 'wholeheartedly', back: 'wholeheartedly support / embrace', detail: 'Con todo el corazón, sin reservas.' },
    ],
    items: [
      { sentence: 'She ___ believes that education is a right.', correct: 'firmly', explain: '"Firmly believe" is a fixed collocation.' },
      { sentence: 'We ___ recommend that you read the instructions first.', correct: 'strongly', explain: '"Strongly recommend" is a fixed collocation.' },
      { sentence: 'He ___ regrets his decision.', correct: 'deeply', explain: '"Deeply regret" is a fixed collocation.' },
      { sentence: 'The team ___ supported the new strategy.', correct: 'wholeheartedly', explain: '"Wholeheartedly support" is a fixed collocation.' },
      { sentence: 'I ___ disagree with that statement.', correct: 'strongly', explain: '"Strongly disagree" is a fixed collocation.' },
      { sentence: 'She ___ believes in second chances.', correct: 'firmly', explain: '"Firmly believe" is a fixed collocation.' },
      { sentence: 'He was ___ moved by the story.', correct: 'deeply', explain: '"Deeply moved" is a fixed collocation.' },
      { sentence: 'They ___ embraced the new changes.', correct: 'wholeheartedly', explain: '"Wholeheartedly embrace" is a fixed collocation.' },
      { sentence: 'The committee ___ opposed the proposal.', correct: 'strongly', explain: '"Strongly oppose" is a fixed collocation.' },
      { sentence: 'She ___ believes she made the right choice.', correct: 'firmly', explain: '"Firmly believe" is a fixed collocation.' },
    ]
  },
  prepositionalCollocations: {
    label: 'Prepositional Phrases',
    icon: '🔗',
    options: ['prone to', 'subject to', 'conducive to', 'indicative of'],
    studyCards: [
      { front: 'prone to', back: 'likely to suffer from', detail: 'This area is prone to flooding. (vulnerabilidad, riesgo)' },
      { front: 'subject to', back: 'dependent on / affected by', detail: 'Prices are subject to change. (condicionado a algo externo)' },
      { front: 'conducive to', back: 'making something more likely to happen', detail: 'A quiet room is conducive to studying. (favorece un resultado positivo)' },
      { front: 'indicative of', back: 'suggesting evidence of', detail: 'These symptoms are indicative of stress. (es una señal de)' },
    ],
    items: [
      { sentence: 'This area is ___ flooding during the rainy season.', correct: 'prone to', explain: '"Prone to" means likely to suffer from something.' },
      { sentence: 'All prices are ___ change without notice.', correct: 'subject to', explain: '"Subject to" means likely to be affected by something.' },
      { sentence: 'A quiet room is more ___ studying.', correct: 'conducive to', explain: '"Conducive to" means making something more likely to happen.' },
      { sentence: 'This behavior is ___ a deeper problem.', correct: 'indicative of', explain: '"Indicative of" means suggesting or showing evidence of.' },
      { sentence: 'Older buildings are often ___ structural issues.', correct: 'prone to', explain: '"Prone to" means likely to suffer from something.' },
      { sentence: "Approval is ___ management's review.", correct: 'subject to', explain: '"Subject to" means dependent on or affected by.' },
      { sentence: 'A supportive environment is ___ learning.', correct: 'conducive to', explain: '"Conducive to" means making something more likely to happen.' },
      { sentence: 'These symptoms are ___ stress.', correct: 'indicative of', explain: '"Indicative of" means suggesting or showing evidence of.' },
      { sentence: 'The region is ___ earthquakes.', correct: 'prone to', explain: '"Prone to" means likely to suffer from something.' },
      { sentence: 'Final results are ___ verification.', correct: 'subject to', explain: '"Subject to" means dependent on or affected by.' },
    ]
  },
};
