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
      { sentence: 'Only when she spoke did I recognise her.', correct: 'Only + time', explain: '"Only when..." fronted → inversion in main clause.' },
      { sentence: 'Such was the force of the explosion that windows shattered.', correct: 'So/Such...that', explain: '"Such was..." → noun subject complement fronted with inversion.' },
      { sentence: 'Hardly had the game begun when it started raining.', correct: 'No sooner/Hardly', explain: '"Hardly...when" → past perfect inversion.' },
      { sentence: 'Little did they know what was waiting for them.', correct: 'Negative adverb', explain: '"Little" en posición inicial fuerza la inversión.' },
      { sentence: 'Under no circumstances should you sign that.', correct: 'Negative adverb', explain: 'Frase adverbial negativa al inicio → inversión.' },
      { sentence: 'So dangerous was the road that they turned back.', correct: 'So/Such...that', explain: '"So + adjetivo" al inicio → inversión con "that".' }
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
      { sentence: 'Only then ___ understand the gravity of the situation.', correct: 'did she', explain: 'Only then + did + subject — past simple inversion.' },
      { sentence: 'No sooner ___ finished the report than the deadline changed.', correct: 'had I', explain: 'No sooner + had + subject — past perfect inversion.' },
      { sentence: 'Seldom ___ ask for help.', correct: 'does he', explain: '"Seldom" fronted → auxiliar "does" antes del sujeto.' },
      { sentence: 'Little ___ realise how much it would cost.', correct: 'did she', explain: '"Little" fronted → auxiliar "did" antes del sujeto.' },
      { sentence: 'Not once ___ complained about the extra hours.', correct: 'have we', explain: '"Not once" fronted → auxiliar "have" antes del sujeto.' }
    ]
  },
  rewrite: {
    label: 'Rewrite',
    icon: '🔁',
    options: ['Not only did he pass, he also got top marks.', 'Never had she felt so alone.', 'Only after checking twice did I find the error.', 'Hardly had they left when the storm hit.', 'Only then did she realise the truth.', 'Seldom have we faced such a challenge.', 'No sooner had I sat down than the doorbell rang.', 'Under no circumstances should you sign this.', 'Little did they know what was coming.', 'Rarely has she spoken in public.'],
    items: [
      { sentence: 'He passed the exam. He also got top marks. (Not only...)', correct: 'Not only did he pass, he also got top marks.', explain: '"Not only + inversion, (but) also + normal order" — combines two facts with emphasis.' },
      { sentence: 'She had never felt so alone in her life. (Never...)', correct: 'Never had she felt so alone.', explain: 'Move "never" to front → had + subject inversion.' },
      { sentence: 'I found the error only after checking twice. (Only after...)', correct: 'Only after checking twice did I find the error.', explain: '"Only after..." fronted → past simple inversion in main clause.' },
      { sentence: 'They had hardly left when the storm hit. (Hardly...)', correct: 'Hardly had they left when the storm hit.', explain: '"Hardly + had + subject" at front → "when" introduces the second event.' },
      { sentence: 'She realised the truth only then. (Only then...)', correct: 'Only then did she realise the truth.', explain: '"Only then" fronted → auxiliary "did" before the subject.' },
      { sentence: 'We have seldom faced such a challenge. (Seldom...)', correct: 'Seldom have we faced such a challenge.', explain: '"Seldom" fronted → auxiliary "have" before the subject.' },
      { sentence: 'I had no sooner sat down than the doorbell rang. (No sooner...)', correct: 'No sooner had I sat down than the doorbell rang.', explain: '"No sooner" al inicio → had + sujeto, y "than" para el segundo suceso.' },
      { sentence: 'You should not sign this under any circumstances. (Under no circumstances...)', correct: 'Under no circumstances should you sign this.', explain: 'La frase negativa al inicio arrastra el auxiliar delante del sujeto.' },
      { sentence: 'They did not know what was coming. (Little...)', correct: 'Little did they know what was coming.', explain: '"Little" al inicio → did + sujeto + infinitivo.' },
      { sentence: 'She has rarely spoken in public. (Rarely...)', correct: 'Rarely has she spoken in public.', explain: '"Rarely" al inicio → has + sujeto + participio.' }
    ]
  }
};
