/**
 * Passive Voice Data — identify the tense used, and choose the correct auxiliary
 */

// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
export const CATEGORIES = {
  tense: {
    label: 'Which Tense?',
    icon: '🎭',
    options: ['Present Simple', 'Past Simple', 'Present Perfect', 'Future'],
    studyCards: [
      { front: 'Pasiva — fórmula base', back: 'be (en el tiempo correcto) + participio pasado', detail: 'Present Simple: is/are spoken. Past Simple: was/were built. Future: will be published. Present Perfect: has/have been signed.' },
      { front: 'Identificar el tiempo', back: 'mira el auxiliar "be", no el participio', detail: '"was built" → was = past simple passive. "has been signed" → has been = present perfect passive. El participio siempre es el mismo.' },
    ],
    items: [
      { sentence: 'The bridge was built in 1932.', correct: 'Past Simple', explain: '"was built" — passive past simple (was/were + past participle).' },
      { sentence: 'English is spoken all over the world.', correct: 'Present Simple', explain: '"is spoken" — passive present simple (am/is/are + past participle).' },
      { sentence: 'The report will be published next month.', correct: 'Future', explain: '"will be published" — passive future (will be + past participle).' },
      { sentence: 'The documents have been signed already.', correct: 'Present Perfect', explain: '"have been signed" — passive present perfect (have/has been + past participle).' },
      { sentence: 'Dinner is served at 8pm every night.', correct: 'Present Simple', explain: '"is served" — passive present simple for a routine.' },
      { sentence: 'The cake was eaten before we arrived.', correct: 'Past Simple', explain: '"was eaten" — passive past simple for a completed past action.' },
      { sentence: 'New rules will be introduced next year.', correct: 'Future', explain: '"will be introduced" — passive future for a planned change.' },
      { sentence: 'The house has been sold to a new family.', correct: 'Present Perfect', explain: '"has been sold" — passive present perfect for a recent result.' },
      { sentence: 'These cars are made in Germany.', correct: 'Present Simple', explain: '"are made" — passive present simple for a general fact.' },
      { sentence: 'The letter was sent yesterday.', correct: 'Past Simple', explain: '"was sent" — passive past simple with a finished time reference.' },
    ]
  },
  auxiliary: {
    label: 'Choose the Auxiliary',
    icon: '🛠️',
    options: ['is', 'was', 'are', 'were', 'has been', 'have been', 'will be'],
    studyCards: [
      { front: 'Concordancia sujeto en pasiva', back: 'singular → is/was/has been | plural → are/were/have been', detail: '"The window was broken." (singular) · "These shoes are made in Italy." (plural)' },
      { front: 'Tiempo en pasiva', back: 'mira la referencia de tiempo en la frase', detail: 'yesterday/last week → was/were. routine → is/are. already/recently → has/have been. tomorrow/next → will be.' },
    ],
    items: [
      { sentence: 'The window ___ broken by the storm.', correct: 'was', explain: 'Singular subject, past simple passive: "was broken".' },
      { sentence: 'These shoes ___ made in Italy.', correct: 'are', explain: 'Plural subject, present simple passive: "are made".' },
      { sentence: 'The results ___ announced tomorrow.', correct: 'will be', explain: 'Future passive: "will be announced".' },
      { sentence: 'The project ___ already finished.', correct: 'has been', explain: 'Singular subject, present perfect passive: "has been finished".' },
      { sentence: 'This song ___ written by a famous composer.', correct: 'was', explain: 'Singular subject, past simple passive: "was written".' },
      { sentence: 'The rooms ___ cleaned every morning.', correct: 'are', explain: 'Plural subject, present simple passive: "are cleaned".' },
      { sentence: 'A decision ___ made by next week.', correct: 'will be', explain: 'Future passive: "will be made".' },
      { sentence: 'The email ___ sent an hour ago.', correct: 'was', explain: 'Singular subject, past simple passive: "was sent".' },
      { sentence: 'Millions of copies ___ sold worldwide.', correct: 'have been', explain: 'Plural subject, present perfect passive: "have been sold".' },
      { sentence: 'The tickets ___ bought last week.', correct: 'were', explain: 'Plural subject, past simple passive: "were bought".' },
    ]
  },
  byAgent: {
    label: 'By + Agent',
    icon: '🕵️',
    options: ['by', 'with', 'through', 'by being'],
    studyCards: [
      { front: 'by', back: 'introduce el agente (quién hace la acción)', detail: '"The painting was created by a local artist." · "She was surprised by the announcement." Agente = quien actúa.' },
      { front: 'with', back: 'introduce el instrumento o herramienta', detail: '"The door was opened with a key." · "The cake was cut with a sharp knife." El instrumento no actúa solo.' },
      { front: 'through', back: 'introduce el medio, proceso o método', detail: '"The problem was solved through careful analysis." · "Success is achieved through persistence." No es una persona ni un objeto físico.' },
    ],
    items: [
      { sentence: 'The painting was created ___ a local artist.', correct: 'by', explain: '"By" introduces the agent (the doer) in a passive sentence.' },
      { sentence: 'The door was opened ___ a key.', correct: 'with', explain: '"With" introduces the instrument/tool, not the agent (the key did not act independently).' },
      { sentence: 'The report was written ___ the research team.', correct: 'by', explain: '"By" introduces the agent performing the action.' },
      { sentence: 'The problem was solved ___ careful analysis.', correct: 'through', explain: '"Through" = by means of a process or method (not a person).' },
      { sentence: 'She was surprised ___ the announcement.', correct: 'by', explain: '"By" is used after passive verbs of emotion to introduce the cause.' },
      { sentence: 'The cake was cut ___ a sharp knife.', correct: 'with', explain: '"With" introduces the tool or instrument used.' },
      { sentence: 'The fire was started ___ a lit match.', correct: 'with', explain: '"With" = the instrument used to cause the action.' },
      { sentence: 'Success is achieved ___ persistence.', correct: 'through', explain: '"Through" introduces the means/process by which something is achieved.' },
      { sentence: 'The candidate was chosen ___ the committee.', correct: 'by', explain: '"By" introduces the agent — the group who performed the selection.' },
      { sentence: 'The child was embarrassed ___ praised publicly.', correct: 'by being', explain: '"By being + past participle" — the agent of the embarrassment was the act itself.' },
    ]
  }
};
