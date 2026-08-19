// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
// Bug corregido: disPrefix, item "They decided to dissolve the contract" →
// "dissolve a contract" es poco natural; lo idiomático es "terminate/cancel a
// contract". Corregido el item y su explain.
export const CATEGORIES = {
  unPrefix: {
    label: 'Un- Prefix',
    icon: '🚫',
    options: ['unhappy', 'inhappy', 'dishappy'],
    studyCards: [
      { front: 'un-', back: 'el prefijo negativo más versátil del inglés', detail: 'unhappy · unclear · unfair · unacceptable · unstable · uncertain · untidy. Si tienes duda del prefijo correcto, prueba "un-" primero.' },
      { front: 'un- para participios y estados', back: 'unexpected · unhelpful · unwise', detail: 'Muchos adjetivos formados de participios o estados toman "un-": unexpected, unopened, unfinished.' },
    ],
    items: [
      { sentence: 'She felt ___ about the news.', correct: 'unhappy', explain: "'Un-' is the negative prefix for 'happy'." },
      { sentence: 'The instructions were ___.', correct: 'unclear', explain: "'Un-' is the negative prefix for 'clear'.", options: ['unclear', 'inclear', 'disclear'] },
      { sentence: 'It seemed like an ___ task.', correct: 'unfair', explain: "'Un-' is the negative prefix for 'fair'.", options: ['unfair', 'infair', 'disfair'] },
      { sentence: 'His behavior was completely ___.', correct: 'unacceptable', explain: "'Un-' is the negative prefix for 'acceptable'.", options: ['unacceptable', 'inacceptable', 'disacceptable'] },
      { sentence: 'The situation became ___.', correct: 'unstable', explain: "'Un-' is the negative prefix for 'stable'.", options: ['unstable', 'instable', 'disstable'] },
      { sentence: 'She was ___ about her decision.', correct: 'uncertain', explain: "'Un-' is the negative prefix for 'certain'.", options: ['uncertain', 'incertain', 'discertain'] },
      { sentence: 'The room was completely ___.', correct: 'untidy', explain: "'Un-' is the negative prefix for 'tidy'.", options: ['untidy', 'intidy', 'distidy'] },
      { sentence: 'His comment was ___.', correct: 'unhelpful', explain: "'Un-' is the negative prefix for 'helpful'.", options: ['unhelpful', 'inhelpful', 'dishelpful'] },
      { sentence: 'It was an ___ decision.', correct: 'unwise', explain: "'Un-' is the negative prefix for 'wise'.", options: ['unwise', 'inwise', 'diswise'] },
      { sentence: 'The results were ___.', correct: 'unexpected', explain: "'Un-' is the negative prefix for 'expected'.", options: ['unexpected', 'inexpected', 'disexpected'] },
    ]
  },
  disPrefix: {
    label: 'Dis- Prefix',
    icon: '➖',
    options: ['disagree', 'undagree', 'inagree'],
    studyCards: [
      { front: 'dis-', back: 'negación, inversión o separación', detail: 'disagree · dissatisfied · disqualify · disappear · discourage · disprove · disconnect · disorganize' },
      { front: 'dis- + encourage = discourage', back: 'dis- invierte la dirección del verbo "encourage"', detail: '"Encourage" = dar ánimo. "Discourage" = quitar el ánimo. El prefijo dis- añade el significado opuesto.' },
    ],
    items: [
      { sentence: 'I ___ with your opinion.', correct: 'disagree', explain: "'Dis-' is the negative prefix for 'agree'." },
      { sentence: 'She was ___ with the service.', correct: 'dissatisfied', explain: "'Dis-' is the negative prefix for 'satisfied'.", options: ['dissatisfied', 'unsatisfied', 'insatisfied'] },
      { sentence: 'He tried to ___ the committee.', correct: 'disqualify', explain: "'Dis-' is the negative prefix for 'qualify'.", options: ['disqualify', 'unqualify', 'inqualify'] },
      { sentence: 'The audience began to ___.', correct: 'disappear', explain: "'Dis-' is the negative prefix for 'appear'.", options: ['disappear', 'unappear', 'inappear'] },
      { sentence: 'She felt ___ by his answer.', correct: 'discouraged', explain: "'Dis-' reverses the meaning of 'encourage': to dis-courage = to take away courage/motivation.", options: ['discouraged', 'uncouraged', 'incouraged'] },
      { sentence: 'They decided to ___ the contract.', correct: 'terminate', explain: "'Terminate a contract' is the natural collocation — dissolve is used for partnerships or organisations, not individual contracts.", options: ['terminate', 'dissolve', 'discontract'] },
      { sentence: 'His actions ___ the whole team.', correct: 'disorganized', explain: "'Dis-' is the negative prefix for 'organized'.", options: ['disorganized', 'unorganized', 'inorganized'] },
      { sentence: 'The teacher will ___ any cheating.', correct: 'discourage', explain: "'Dis-' reverses 'encourage': to discourage = to take away motivation.", options: ['discourage', 'uncourage', 'incourage'] },
      { sentence: 'She wanted to ___ the rumor.', correct: 'disprove', explain: "'Dis-' is the negative prefix for 'prove'.", options: ['disprove', 'unprove', 'inprove'] },
      { sentence: 'He was ___ from the club.', correct: 'disconnected', explain: "'Dis-' is the negative prefix for 'connected'.", options: ['disconnected', 'unconnected', 'inconnected'] },
    ]
  },
  imInIrPrefix: {
    label: 'Im-, In-, Ir- Prefixes',
    icon: '🔀',
    options: ['impossible', 'inpossible', 'unpossible'],
    studyCards: [
      { front: 'Regla de asimilación fonética', back: 'in- cambia su letra final para sonar mejor', detail: 'in- + possible → im-possible (p) · in- + rational → ir-rational (r) · in- + logical → il-logical (l) · in- + mature → im-mature (m)' },
      { front: 'Regla rápida', back: 'P/B → im- · R → ir- · L → il- · resto → in-', detail: 'impossible · irresponsible · illogical · inaccurate · incomplete · invisible · irreversible' },
    ],
    items: [
      { sentence: 'It was ___ to finish on time.', correct: 'impossible', explain: "'Im-' is used before words starting with 'p': possible → impossible." },
      { sentence: 'The results were ___.', correct: 'inaccurate', explain: "'In-' is the negative prefix for 'accurate'.", options: ['inaccurate', 'unaccurate', 'imaccurate'] },
      { sentence: 'His argument was ___.', correct: 'irrational', explain: "'Ir-' is used before words starting with 'r': rational → irrational.", options: ['irrational', 'inrational', 'unrational'] },
      { sentence: 'The decision seemed ___.', correct: 'illogical', explain: "'Il-' is used before words starting with 'l': logical → illogical.", options: ['illogical', 'inlogical', 'unlogical'] },
      { sentence: 'It was an ___ mistake.', correct: 'immature', explain: "'Im-' is used before words starting with 'm': mature → immature.", options: ['immature', 'inmature', 'unmature'] },
      { sentence: 'The information was ___.', correct: 'incomplete', explain: "'In-' is the negative prefix for 'complete'.", options: ['incomplete', 'uncomplete', 'imcomplete'] },
      { sentence: 'His behavior was ___.', correct: 'irresponsible', explain: "'Ir-' is used before words starting with 'r': responsible → irresponsible.", options: ['irresponsible', 'inresponsible', 'unresponsible'] },
      { sentence: 'The plan was ___.', correct: 'impractical', explain: "'Im-' is used before words starting with 'p': practical → impractical.", options: ['impractical', 'inpractical', 'unpractical'] },
      { sentence: 'It was an ___ risk to take.', correct: 'irreversible', explain: "'Ir-' is used before words starting with 'r': reversible → irreversible.", options: ['irreversible', 'inreversible', 'unreversible'] },
      { sentence: 'The document remained ___.', correct: 'invisible', explain: "'In-' is the negative prefix for 'visible'.", options: ['invisible', 'unvisible', 'imvisible'] },
    ]
  },
  lessSuffix: {
    label: '-less Suffix',
    icon: '🔚',
    options: ['harmless', 'unharm', 'harmnot'],
    studyCards: [
      { front: '-less = "without"', back: 'adjetivo que describe ausencia de algo', detail: 'harmless (without harm) · helpless (without help) · hopeless (without hope) · meaningless (without meaning)' },
    ],
    items: [
      { sentence: 'The spider was completely ___.', correct: 'harmless', explain: "'-less' means 'without': harm + less = without harm." },
      { sentence: 'His comment was ___.', correct: 'meaningless', explain: "'-less' means 'without': meaning + less = without meaning.", options: ['meaningless', 'unmeaning', 'inmeaning'] },
      { sentence: 'She felt ___ after the accident.', correct: 'helpless', explain: "'-less' means 'without': help + less = without help.", options: ['helpless', 'unhelp', 'inhelp'] },
      { sentence: 'The night sky was ___.', correct: 'cloudless', explain: "'-less' means 'without': cloud + less = without clouds.", options: ['cloudless', 'uncloud', 'incloud'] },
      { sentence: 'His effort seemed ___.', correct: 'hopeless', explain: "'-less' means 'without': hope + less = without hope.", options: ['hopeless', 'unhope', 'inhope'] },
      { sentence: 'The room was completely ___.', correct: 'colorless', explain: "'-less' means 'without': color + less = without color.", options: ['colorless', 'uncolor', 'incolor'] },
      { sentence: 'His job was ___ and repetitive.', correct: 'thankless', explain: "'-less' means 'without': thanks + less = without thanks or gratitude.", options: ['thankless', 'unthank', 'inthank'] },
      { sentence: 'The child seemed ___ in the crowd.', correct: 'fearless', explain: "'-less' means 'without': fear + less = without fear.", options: ['fearless', 'unfear', 'infear'] },
      { sentence: 'The old building looked ___.', correct: 'lifeless', explain: "'-less' means 'without': life + less = without life.", options: ['lifeless', 'unlife', 'inlife'] },
      { sentence: 'His actions were completely ___.', correct: 'senseless', explain: "'-less' means 'without': sense + less = without sense, making no sense.", options: ['senseless', 'unsense', 'insense'] },
    ]
  }
};
