// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
// Bug corregido: directnessLevels item "I need help understand this contract
// clause" → agramatical (falta "to" o gerundio). Corregido a "understanding".
export const CATEGORIES = {
  formalEmailPhrases: {
    label: 'Formal Email Phrases',
    icon: '📧',
    options: ['I am writing to', 'I would be grateful if', 'Please do not hesitate to', 'I look forward to'],
    studyCards: [
      { front: 'Apertura / cierre formal', back: '"I am writing to..." / "I look forward to hearing from you."', detail: '"I am writing to" introduce el propósito. "I look forward to + -ing" cierra la comunicación. Son fórmulas fijas.' },
      { front: '"I would be grateful if" / "Please do not hesitate to"', back: 'petición cortés / invitar a contactar', detail: '"I would be grateful if you could confirm receipt." · "Please do not hesitate to contact me should you require further information."' },
    ],
    items: [
      { sentence: '___ inquire about the position advertised on your website.', correct: 'I am writing to', explain: 'A standard formal opener stating the purpose of the email.' },
      { sentence: '___ you could confirm receipt of this email.', correct: 'I would be grateful if', explain: 'A formal way to make a polite request.' },
      { sentence: '___ contact me should you require further information.', correct: 'Please do not hesitate to', explain: 'A formal way to invite further contact.' },
      { sentence: '___ hearing from you soon.', correct: 'I look forward to', explain: 'A standard formal closing phrase.' },
      { sentence: '___ inform you of a change in our schedule.', correct: 'I am writing to', explain: 'A standard formal opener stating the purpose of the email.' },
      { sentence: '___ you could send the documents by Friday.', correct: 'I would be grateful if', explain: 'A formal way to make a polite request.' },
      { sentence: '___ reach out with any questions.', correct: 'Please do not hesitate to', explain: 'A formal way to invite further contact.' },
      { sentence: '___ your response.', correct: 'I look forward to', explain: 'A standard formal closing phrase.' },
      { sentence: '___ request an extension on the deadline.', correct: 'I am writing to', explain: 'A standard formal opener stating the purpose of the email.' },
      { sentence: '___ you could clarify this point.', correct: 'I would be grateful if', explain: 'A formal way to make a polite request.' },
      { sentence: '___ apply for the marketing position advertised last week.', correct: 'I am writing to', explain: 'A standard formal opener stating the purpose of the email.' },
      { sentence: '___ you could review the attached proposal before Monday.', correct: 'I would be grateful if', explain: 'A formal way to make a polite request.' },
      { sentence: '___ get in touch if you need any further clarification.', correct: 'Please do not hesitate to', explain: 'A formal way to invite further contact.' },
      { sentence: '___ working with you on this project.', correct: 'I look forward to', explain: 'A standard formal closing phrase.' },
    ]
  },
  academicVsCasualOpinion: {
    label: 'Academic vs Casual Opinion',
    icon: '🎓',
    options: ['It could be argued that', 'I reckon', 'It appears that', 'I guess'],
    studyCards: [
      { front: 'Académico / formal', back: '"It could be argued that..." / "It appears that..."', detail: 'Presentan la opinión como una posibilidad o una observación tentativa, distanciándose del yo.' },
      { front: 'Casual / informal', back: '"I reckon..." / "I guess..."', detail: '"I reckon" es muy casual (BrE). "I guess" es más universal pero igualmente informal. Nunca en un ensayo académico.' },
    ],
    items: [
      { sentence: '___ the results support the initial hypothesis.', correct: 'It appears that', explain: 'Formal, hedged academic phrasing for an observation.' },
      { sentence: '___ this policy has unintended consequences.', correct: 'It could be argued that', explain: 'Formal academic phrasing that introduces a debatable claim.' },
      { sentence: '___ we should just try it and see what happens.', correct: 'I reckon', explain: 'Casual, informal way to state an opinion.' },
      { sentence: "___ it doesn't really matter either way.", correct: 'I guess', explain: 'Casual, informal way to state an opinion.' },
      { sentence: '___ the data is inconclusive at this stage.', correct: 'It appears that', explain: 'Formal, hedged academic phrasing for an observation.' },
      { sentence: '___ further research is warranted.', correct: 'It could be argued that', explain: 'Formal academic phrasing that introduces a debatable claim.' },
      { sentence: "___ he's just having a bad day.", correct: 'I reckon', explain: 'Casual, informal way to state an opinion.' },
      { sentence: '___ we should leave it for now.', correct: 'I guess', explain: 'Casual, informal way to state an opinion.' },
      { sentence: '___ the sample size was too small.', correct: 'It could be argued that', explain: 'Formal academic phrasing that introduces a debatable claim.' },
      { sentence: '___ conditions have improved slightly.', correct: 'It appears that', explain: 'Formal, hedged academic phrasing for an observation.' },
      { sentence: '___ the current approach is not sustainable in the long term.', correct: 'It could be argued that', explain: 'Formal academic phrasing that introduces a debatable claim.' },
      { sentence: "___ it's probably going to rain later.", correct: 'I guess', explain: 'Casual, informal way to state an opinion.' },
      { sentence: '___ the new method reduces errors significantly.', correct: 'It appears that', explain: 'Formal, hedged academic phrasing for an observation.' },
    ]
  },
  directnessLevels: {
    label: 'Directness Levels',
    icon: '🎚️',
    options: ['Help me', 'Could you possibly help me', 'I need help', 'Would you be so kind as to help me'],
    studyCards: [
      { front: 'Escala de cortesía', back: 'Help me → I need help → Could you possibly help me → Would you be so kind as to help me', detail: 'De más directo a más formal. El mismo significado; diferente tono y contexto social.' },
    ],
    items: [
      { sentence: '___ with this heavy box.', correct: 'Help me', explain: 'Very direct, blunt phrasing — appropriate only among close friends/family.' },
      { sentence: "___ with this report? I'd really appreciate it.", correct: 'Could you possibly help me', explain: 'Polite, everyday phrasing for a reasonable request.' },
      { sentence: '___ with the move this weekend.', correct: 'I need help', explain: 'Neutral, straightforward phrasing.' },
      { sentence: '___ with these forms?', correct: 'Would you be so kind as to help me', explain: 'Very formal, highly polite phrasing.' },
      { sentence: '___ carry these bags!', correct: 'Help me', explain: 'Very direct, blunt phrasing.' },
      { sentence: '___ understanding this contract clause.', correct: 'I need help', explain: 'Neutral, straightforward phrasing. Note: "I need help understanding" (gerund), not "help understand".' },
      { sentence: '___ with directions to the station?', correct: 'Could you possibly help me', explain: 'Polite, everyday phrasing for a reasonable request.' },
      { sentence: '___ with a small matter, when you have a moment?', correct: 'Would you be so kind as to help me', explain: 'Very formal, highly polite phrasing.' },
      { sentence: '___ fix this right now.', correct: 'Help me', explain: 'Very direct, blunt phrasing.' },
      { sentence: '___ finishing this project on time.', correct: 'I need help', explain: 'Neutral, straightforward phrasing.' },
      { sentence: '___ move this table, would you?', correct: 'Help me', explain: 'Very direct, blunt phrasing — appropriate only among close friends/family.' },
      { sentence: '___ understanding this diagram.', correct: 'I need help', explain: 'Neutral, straightforward phrasing.' },
      { sentence: "___ open the window? It's quite warm in here.", correct: 'Could you possibly help me', explain: 'Polite, everyday phrasing for a reasonable request.' },
    ]
  },
};
