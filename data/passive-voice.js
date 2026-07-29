/**
 * Passive Voice Data — identify the tense used, and choose the correct auxiliary
 */

export const CATEGORIES = {
  tense: {
    label: 'Which Tense?',
    icon: '🎭',
    options: ['Present Simple', 'Past Simple', 'Present Perfect', 'Future'],
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
  }
};
