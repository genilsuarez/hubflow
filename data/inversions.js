/**
 * Inversions & Emphatic Fronting Data (B2)
 * Categories: Identify the inversion type, Complete with correct structure, Rewrite using inversion
 */

export const CATEGORIES = {
  identify: {
    label: 'Which type?',
    icon: '🔄',
    options: ['Negative adverb', 'Only + time', 'So/Such...that', 'No sooner/Hardly'],
    items: [
      { sentence: 'Never have I seen such a beautiful sunset.', correct: 'Negative adverb', explain: 'Negative adverb (never) at front → auxiliary + subject inversion.' },
      { sentence: 'Only after the meeting did he realise his mistake.', correct: 'Only + time', explain: '"Only after/when/once..." fronted → inversion in main clause.' },
      { sentence: 'So tired was she that she fell asleep on the sofa.', correct: 'So/Such...that', explain: '"So + adjective" fronted → was + subject inversion.' },
      { sentence: 'No sooner had we arrived than it started to rain.', correct: 'No sooner/Hardly', explain: '"No sooner...than" → past perfect inversion.' },
      { sentence: 'Rarely does one find such dedication in a student.', correct: 'Negative adverb', explain: '"Rarely" is a negative frequency adverb → auxiliary inversion.' },
      { sentence: 'Only when she spoke did I recognise her.', correct: 'Only + time', explain: '"Only when..." fronted → inversion in main clause.' },
      { sentence: 'Such was the force of the explosion that windows shattered.', correct: 'So/Such...that', explain: '"Such was..." → noun subject complement fronted with inversion.' },
      { sentence: 'Hardly had the game begun when it started raining.', correct: 'No sooner/Hardly', explain: '"Hardly...when" → past perfect inversion.' },
    ]
  },
  complete: {
    label: 'Complete',
    icon: '✏️',
    options: ['had I', 'did she', 'have we', 'does he'],
    items: [
      { sentence: 'Never ___ seen anything like it.', correct: 'have we', explain: 'Never + have + subject — present perfect inversion.' },
      { sentence: 'Not only ___ forget the meeting, she also lost the files.', correct: 'did she', explain: 'Not only + did + subject — past simple inversion.' },
      { sentence: 'Rarely ___ complain about anything.', correct: 'does he', explain: 'Rarely + does + subject — present simple inversion.' },
      { sentence: 'Hardly ___ sat down when the phone rang.', correct: 'had I', explain: 'Hardly + had + subject — past perfect inversion.' },
      { sentence: 'At no time ___ considered giving up.', correct: 'have we', explain: 'At no time + have + subject — present perfect inversion.' },
      { sentence: 'Seldom ___ arrive late to work.', correct: 'does he', explain: 'Seldom + does + subject — present simple inversion.' },
      { sentence: 'Only then ___ understand the gravity of the situation.', correct: 'did she', explain: 'Only then + did + subject — past simple inversion.' },
      { sentence: 'No sooner ___ finished the report than the deadline changed.', correct: 'had I', explain: 'No sooner + had + subject — past perfect inversion.' },
    ]
  },
  rewrite: {
    label: 'Rewrite',
    icon: '🔁',
    options: ['Not only did he pass, he also got top marks.', 'Never had she felt so alone.', 'Only after checking twice did I find the error.', 'Hardly had they left when the storm hit.'],
    items: [
      { sentence: 'He passed the exam. He also got top marks. (Not only...)', correct: 'Not only did he pass, he also got top marks.', explain: '"Not only + inversion, (but) also + normal order" — combines two facts with emphasis.' },
      { sentence: 'She had never felt so alone in her life. (Never...)', correct: 'Never had she felt so alone.', explain: 'Move "never" to front → had + subject inversion.' },
      { sentence: 'I found the error only after checking twice. (Only after...)', correct: 'Only after checking twice did I find the error.', explain: '"Only after..." fronted → past simple inversion in main clause.' },
      { sentence: 'They had hardly left when the storm hit. (Hardly...)', correct: 'Hardly had they left when the storm hit.', explain: '"Hardly + had + subject" at front → "when" introduces the second event.' },
    ]
  }
};
