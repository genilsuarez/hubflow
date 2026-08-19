// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
export const CATEGORIES = {
  referenceWords: {
    label: 'This / That / These / Those',
    icon: '👉',
    options: ['this', 'that', 'these', 'those'],
    studyCards: [
      { front: 'this / these (referencia cercana o reciente)', back: 'un hecho recién enunciado o un conjunto reciente', detail: '"The company announced profits, and this came as a surprise." · "He proposed solutions, but these were rejected."' },
      { front: 'that / those (referencia distante o anterior)', back: 'algo enunciado antes o con más distancia', detail: '"The results were inconclusive, and that frustrated the researchers." · "They cited older studies, but those have since been disproven."' },
    ],
    items: [
      { sentence: 'The company announced record profits, and ___ came as a surprise to analysts.', correct: 'this', explain: '"This" refers back to the single fact just stated.' },
      { sentence: 'He proposed several solutions, but ___ were all rejected.', correct: 'these', explain: '"These" refers back to a plural set of items just mentioned.' },
      { sentence: 'The results were inconclusive, and ___ frustrated the researchers.', correct: 'that', explain: '"That" refers back to the preceding idea, at a slight distance.' },
      { sentence: 'We reviewed the old policies, since ___ no longer apply.', correct: 'those', explain: '"Those" refers back to a plural set of items, at a slight distance.' },
      { sentence: 'The report highlighted several issues; ___ needs urgent attention.', correct: 'this', explain: '"This" refers back to the situation just described.' },
      { sentence: 'She raised many concerns, and ___ were valid.', correct: 'these', explain: '"These" refers back to a plural set of items just mentioned.' },
      { sentence: 'The data was flawed, and ___ was concerning.', correct: 'that', explain: '"That" refers back to the preceding fact.' },
      { sentence: 'They cited older studies, but ___ have since been disproven.', correct: 'those', explain: '"Those" refers back to a plural set of items, at a slight distance.' },
      { sentence: 'The new system launched successfully, and ___ pleased everyone.', correct: 'this', explain: '"This" refers back to the event just described.' },
      { sentence: 'The team faced multiple obstacles, yet ___ were overcome.', correct: 'these', explain: '"These" refers back to a plural set of items just mentioned.' },
    ]
  },
  formerLatter: {
    label: 'The Former / The Latter',
    icon: '🔀',
    options: ['the former', 'the latter'],
    studyCards: [
      { front: 'the former / the latter', back: 'el primero mencionado / el segundo mencionado (de dos)', detail: '"Between science and art, the former relies on evidence." (science = 1st) · "...the latter on emotion." (art = 2nd)' },
    ],
    items: [
      { sentence: 'Between science and art, ___ relies more on empirical evidence.', correct: 'the former', explain: '"The former" refers to the first of two items mentioned (science).' },
      { sentence: 'Between science and art, ___ often relies on emotional expression.', correct: 'the latter', explain: '"The latter" refers to the second of two items mentioned (art).' },
      { sentence: 'He compared two candidates; ___ had more experience.', correct: 'the former', explain: '"The former" refers to the first of the two candidates.' },
      { sentence: 'He compared two candidates; ___ had better communication skills.', correct: 'the latter', explain: '"The latter" refers to the second of the two candidates.' },
      { sentence: 'The report discussed two theories; ___ was widely accepted.', correct: 'the former', explain: '"The former" refers to the first theory mentioned.' },
      { sentence: 'The report discussed two theories; ___ was more controversial.', correct: 'the latter', explain: '"The latter" refers to the second theory mentioned.' },
      { sentence: 'Comparing print and digital media, ___ is declining in popularity.', correct: 'the former', explain: '"The former" refers to the first item mentioned (print).' },
      { sentence: 'Comparing print and digital media, ___ continues to grow.', correct: 'the latter', explain: '"The latter" refers to the second item mentioned (digital).' },
      { sentence: 'Of the two proposals, ___ was approved.', correct: 'the former', explain: '"The former" refers to the first proposal mentioned.' },
      { sentence: 'Of the two proposals, ___ was rejected.', correct: 'the latter', explain: '"The latter" refers to the second proposal mentioned.' },
    ]
  },
  cohesiveLinkers: {
    label: 'Cohesive Linkers',
    icon: '🔗',
    options: ['Consequently', 'Meanwhile', 'Nonetheless', 'Similarly'],
    studyCards: [
      { front: 'Consequently / Meanwhile', back: 'resultado directo / dos acciones simultáneas', detail: '"Sales dropped. Consequently, costs were cut." · "He studied. Meanwhile, his sister prepared for an interview."' },
      { front: 'Nonetheless / Similarly', back: 'contraste inesperado / punto comparable', detail: '"It rained. Nonetheless, the match continued." · "One study found X. Similarly, a second confirmed the trend."' },
    ],
    items: [
      { sentence: 'Sales dropped significantly. ___, the company had to cut costs.', correct: 'Consequently', explain: '"Consequently" introduces a direct result.' },
      { sentence: 'The rain continued all day. ___, the match was not canceled.', correct: 'Nonetheless', explain: '"Nonetheless" introduces an unexpected contrast.' },
      { sentence: 'He was studying for finals. ___, his sister was preparing for a job interview.', correct: 'Meanwhile', explain: '"Meanwhile" links two events happening at the same time.' },
      { sentence: 'The first study showed positive results. ___, the second study confirmed the same trend.', correct: 'Similarly', explain: '"Similarly" introduces a comparable point.' },
      { sentence: 'The bridge was closed for repairs. ___, traffic increased on nearby roads.', correct: 'Consequently', explain: '"Consequently" introduces a direct result.' },
      { sentence: 'She was finishing her thesis. ___, her classmates were already on vacation.', correct: 'Meanwhile', explain: '"Meanwhile" links two events happening at the same time.' },
      { sentence: 'The economy slowed down. ___, unemployment remained low.', correct: 'Nonetheless', explain: '"Nonetheless" introduces an unexpected contrast.' },
      { sentence: 'One region saw a rise in tourism. ___, a nearby region saw the same pattern.', correct: 'Similarly', explain: '"Similarly" introduces a comparable point.' },
      { sentence: 'The negotiations failed. ___, the strike continued.', correct: 'Consequently', explain: '"Consequently" introduces a direct result.' },
      { sentence: 'He apologized sincerely. ___, she was still upset.', correct: 'Nonetheless', explain: '"Nonetheless" introduces an unexpected contrast.' },
    ]
  },
  discourseReferenceIt: {
    label: 'It / This / That (Discourse)',
    icon: '🧵',
    options: ['it', 'this', 'that'],
    studyCards: [
      { front: 'it (referencia a sustantivo singular)', back: 'un objeto, persona o concepto específico ya nombrado', detail: '"The proposal seems promising, but it still requires approval." (it = the proposal)' },
      { front: 'it (sujeto "dummy")', back: 'sujeto vacío para comentarios generales', detail: '"It is worth noting that costs have risen." · "It has become difficult to find housing." (it no refiere a nada)' },
      { front: 'this / that (referencia a situación)', back: 'toda una situación o afirmación anterior', detail: '"They canceled without warning; this upset many partners." · "She said she would resign. That surprised no one."' },
    ],
    items: [
      { sentence: 'The proposal seems promising, but ___ still requires approval.', correct: 'it', explain: '"It" refers back to a specific single noun ("the proposal").' },
      { sentence: '___ is worth noting that costs have risen sharply.', correct: 'it', explain: '"It" here is a dummy subject introducing a comment, not referring to a noun.' },
      { sentence: 'The team worked overtime for weeks; ___ was exhausting for everyone.', correct: 'this', explain: '"This" refers to the whole preceding situation, not a single noun.' },
      { sentence: 'She said she would resign. ___ surprised no one.', correct: 'that', explain: '"That" refers back to the reported statement.' },
      { sentence: 'The machine broke down twice; ___ needs repair.', correct: 'it', explain: '"It" refers back to a specific single noun ("the machine").' },
      { sentence: '___ has become increasingly difficult to find affordable housing.', correct: 'it', explain: '"It" here is a dummy subject, not referring to a noun.' },
      { sentence: 'They canceled the contract without warning; ___ upset many partners.', correct: 'this', explain: '"This" refers to the whole preceding situation.' },
      { sentence: 'He claimed he was innocent, but few believed ___.', correct: 'that', explain: '"That" refers back to the claim just mentioned.' },
      { sentence: 'The results were released early; ___ caused some confusion.', correct: 'this', explain: '"This" refers to the whole preceding event.' },
      { sentence: '___ is unclear why the decision was delayed.', correct: 'it', explain: '"It" here is a dummy subject, not referring to a noun.' },
    ]
  },
};
