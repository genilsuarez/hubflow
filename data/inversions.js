/**
 * Inversions & Emphatic Fronting Data (B2)
 * Categories: Identify the inversion type, Complete with correct structure, Rewrite using inversion
 */

// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
export const CATEGORIES = {
  identify: {
    label: 'Which type?',
    icon: '🔄',
    options: ['Negative adverb', 'Only + time', 'So/Such...that', 'No sooner/Hardly'],
    studyCards: [
      { front: 'Adverbio negativo al frente', back: 'Never / Rarely / Little / Under no circumstances → auxiliar + sujeto', detail: '"Never have I seen..." · "Little did they know..." · "Under no circumstances should you..."' },
      { front: 'Only + expresión temporal', back: '"Only after/when/once..." → did/had + sujeto en la cláusula principal', detail: '"Only after the meeting did he realise..." · "Only when she spoke did I recognise her."' },
      { front: 'No sooner/Hardly · So/Such...that · Conditional inversion', back: 'narrativa · énfasis · formal si', detail: '"Hardly had they left when..." · "So tired was she that..." · "Were I in your shoes, I would..."' },
    ],
    items: [
      { sentence: 'Never have I seen such a beautiful sunset.', correct: 'Negative adverb', explain: 'Negative adverb (never) at front → auxiliary + subject inversion.' },
      { sentence: 'Only after the meeting did he realise his mistake.', correct: 'Only + time', explain: '"Only after/when/once..." fronted → inversion in main clause.' },
      { sentence: 'So tired was she that she fell asleep on the sofa.', correct: 'So/Such...that', explain: '"So + adjective" fronted → was + subject inversion.' },
      { sentence: 'No sooner had we arrived than it started to rain.', correct: 'No sooner/Hardly', explain: '"No sooner...than" → past perfect inversion.' },
      { sentence: 'Only when she spoke did I recognise her.', correct: 'Only + time', explain: '"Only when..." fronted → inversion in main clause.' },
      { sentence: 'Such was the force of the explosion that windows shattered.', correct: 'So/Such...that', explain: '"Such was..." → noun subject complement fronted with inversion.' },
      { sentence: 'Hardly had the game begun when it started raining.', correct: 'No sooner/Hardly', explain: '"Hardly...when" → past perfect inversion.' },
      { sentence: 'Little did they know what was waiting for them.', correct: 'Negative adverb', explain: '"Little" in initial position forces inversion.' },
      { sentence: 'Under no circumstances should you sign that.', correct: 'Negative adverb', explain: 'Negative adverbial fronted → inversion.' },
      { sentence: 'So dangerous was the road that they turned back.', correct: 'So/Such...that', explain: '"So + adjective" fronted → inversion with "that".' }
    ]
  },
  complete: {
    label: 'Complete',
    icon: '✏️',
    options: ['had I', 'did she', 'have we', 'does he'],
    studyCards: [
      { front: 'Auxiliar correcto en la inversión', back: 'Simple presente → does/do · Simple pasado → did · Perfect → have/has/had', detail: '"Rarely does he complain." · "Not only did she forget..." · "Never have we seen..." · "Hardly had I sat down..."' },
    ],
    items: [
      { sentence: 'Never ___ seen anything like it.', correct: 'have we', explain: 'Never + have + subject — present perfect inversion.' },
      { sentence: 'Not only ___ forget the meeting, she also lost the files.', correct: 'did she', explain: 'Not only + did + subject — past simple inversion.' },
      { sentence: 'Rarely ___ complain about anything.', correct: 'does he', explain: 'Rarely + does + subject — present simple inversion.' },
      { sentence: 'Hardly ___ sat down when the phone rang.', correct: 'had I', explain: 'Hardly + had + subject — past perfect inversion.' },
      { sentence: 'At no time ___ considered giving up.', correct: 'have we', explain: 'At no time + have + subject — present perfect inversion.' },
      { sentence: 'Only then ___ understand the gravity of the situation.', correct: 'did she', explain: 'Only then + did + subject — past simple inversion.' },
      { sentence: 'No sooner ___ finished the report than the deadline changed.', correct: 'had I', explain: 'No sooner + had + subject — past perfect inversion.' },
      { sentence: 'Seldom ___ ask for help.', correct: 'does he', explain: '"Seldom" fronted → auxiliary "does" before the subject.' },
      { sentence: 'Little ___ realise how much it would cost.', correct: 'did she', explain: '"Little" fronted → auxiliary "did" before the subject.' },
      { sentence: 'Not once ___ complained about the extra hours.', correct: 'have we', explain: '"Not once" fronted → auxiliary "have" before the subject.' }
    ]
  },
  rewrite: {
    label: 'Rewrite',
    icon: '🔁',
    options: ['Not only did he pass, he also got top marks.', 'Never had she felt so alone.', 'Only after checking twice did I find the error.', 'Hardly had they left when the storm hit.', 'Only then did she realise the truth.', 'Seldom have we faced such a challenge.', 'No sooner had I sat down than the doorbell rang.', 'Under no circumstances should you sign this.', 'Little did they know what was coming.', 'Rarely has she spoken in public.'],
    studyCards: [
      { front: 'Patrón de reescritura', back: 'Mueve el adverbio negativo/restrictivo al frente, luego invierte auxiliar y sujeto', detail: '"She had never felt so alone." → "Never had she felt so alone." El auxiliar pasa antes del sujeto.' },
    ],
    items: [
      { sentence: 'He passed the exam. He also got top marks. (Not only...)', correct: 'Not only did he pass, he also got top marks.', explain: '"Not only + inversion, (but) also + normal order" — combines two facts with emphasis.' },
      { sentence: 'She had never felt so alone in her life. (Never...)', correct: 'Never had she felt so alone.', explain: 'Move "never" to front → had + subject inversion.' },
      { sentence: 'I found the error only after checking twice. (Only after...)', correct: 'Only after checking twice did I find the error.', explain: '"Only after..." fronted → past simple inversion in main clause.' },
      { sentence: 'They had hardly left when the storm hit. (Hardly...)', correct: 'Hardly had they left when the storm hit.', explain: '"Hardly + had + subject" at front → "when" introduces the second event.' },
      { sentence: 'She realised the truth only then. (Only then...)', correct: 'Only then did she realise the truth.', explain: '"Only then" fronted → auxiliary "did" before the subject.' },
      { sentence: 'We have seldom faced such a challenge. (Seldom...)', correct: 'Seldom have we faced such a challenge.', explain: '"Seldom" fronted → auxiliary "have" before the subject.' },
      { sentence: 'I had no sooner sat down than the doorbell rang. (No sooner...)', correct: 'No sooner had I sat down than the doorbell rang.', explain: '"No sooner" fronted → had + subject, and "than" for the second event.' },
      { sentence: 'You should not sign this under any circumstances. (Under no circumstances...)', correct: 'Under no circumstances should you sign this.', explain: 'The fronted negative phrase pulls the auxiliary before the subject.' },
      { sentence: 'They did not know what was coming. (Little...)', correct: 'Little did they know what was coming.', explain: '"Little" fronted → did + subject + base form.' },
      { sentence: 'She has rarely spoken in public. (Rarely...)', correct: 'Rarely has she spoken in public.', explain: '"Rarely" fronted → has + subject + past participle.' }
    ]
  },
  conditional: {
    label: 'Conditional Inversion',
    icon: '🎩',
    options: ['Were', 'Had', 'Should'],
    studyCards: [
      { front: 'Were / Had / Should = If (formal)', back: 'reemplaza "if" en condicionales formales', detail: '"If I were you..." → "Were I you..." · "If we had known..." → "Had we known..." · "If you should need help..." → "Should you need help..."' },
      { front: 'Uso', back: 'escritura formal, cartas de negocio, inglés escrito avanzado', detail: '"Should you require further assistance, do not hesitate to contact us." Equivale a "If you should require..."' },
    ],
    items: [
      { sentence: '___ I in your shoes, I would take the job.', correct: 'Were', explain: 'Formal inversion of "If I were" — Were + subject + complement.' },
      { sentence: '___ we known about the strike, we would have taken the train.', correct: 'Had', explain: 'Formal inversion of a third conditional: "If we had known..."' },
      { sentence: '___ you have any questions, feel free to email me.', correct: 'Should', explain: 'Formal inversion of "If you should have..." — common in business writing.' },
      { sentence: '___ she more experienced, she would be promoted.', correct: 'Were', explain: 'Formal inversion of "If she were more experienced..."' },
      { sentence: "___ they arrived earlier, they wouldn't have missed the flight.", correct: 'Had', explain: 'Formal inversion of a third conditional: "If they had arrived..."' },
      { sentence: "___ the weather improve, we'll go hiking tomorrow.", correct: 'Should', explain: 'Formal inversion of "If the weather should improve..."' },
      { sentence: "___ he been more careful, the accident wouldn't have happened.", correct: 'Had', explain: 'Formal inversion of a third conditional: "If he had been..."' },
      { sentence: '___ I to win the lottery, I would travel the world.', correct: 'Were', explain: '"Were + subject + to-infinitive" for a hypothetical future.' },
      { sentence: "___ you require further assistance, don't hesitate to contact us.", correct: 'Should', explain: 'Formal inversion of "If you should require..." — typical of formal letters.' },
      { sentence: '___ it not for your help, I would have failed.', correct: 'Were', explain: '"Were it not for" = fixed formal expression for "if it weren\'t for."' }
    ]
  }
};
