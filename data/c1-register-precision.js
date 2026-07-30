export const CATEGORIES = {
  formalEmailPhrases: {
    label: 'Formal Email Phrases',
    icon: '📧',
    options: ['I am writing to', 'I would be grateful if', 'Please do not hesitate to', 'I look forward to'],
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
    ]
  },
  academicVsCasualOpinion: {
    label: 'Academic vs Casual Opinion',
    icon: '🎓',
    options: ['It could be argued that', 'I reckon', 'It appears that', 'I guess'],
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
    ]
  },
  directnessLevels: {
    label: 'Directness Levels',
    icon: '🎚️',
    options: ['Help me', 'Could you possibly help me', 'I need help', 'Would you be so kind as to help me'],
    items: [
      { sentence: '___ with this heavy box.', correct: 'Help me', explain: 'Very direct, blunt phrasing — appropriate only among close friends/family.' },
      { sentence: "___ with this report? I'd really appreciate it.", correct: 'Could you possibly help me', explain: 'Polite, everyday phrasing for a reasonable request.' },
      { sentence: '___ with the move this weekend.', correct: 'I need help', explain: 'Neutral, straightforward phrasing.' },
      { sentence: '___ with these forms?', correct: 'Would you be so kind as to help me', explain: 'Very formal, highly polite phrasing.' },
      { sentence: '___ carry these bags!', correct: 'Help me', explain: 'Very direct, blunt phrasing.' },
      { sentence: '___ understand this contract clause.', correct: 'I need help', explain: 'Neutral, straightforward phrasing.' },
      { sentence: '___ with directions to the station?', correct: 'Could you possibly help me', explain: 'Polite, everyday phrasing for a reasonable request.' },
      { sentence: '___ with a small matter, when you have a moment?', correct: 'Would you be so kind as to help me', explain: 'Very formal, highly polite phrasing.' },
      { sentence: '___ fix this right now.', correct: 'Help me', explain: 'Very direct, blunt phrasing.' },
      { sentence: '___ finishing this project on time.', correct: 'I need help', explain: 'Neutral, straightforward phrasing.' },
    ]
  },
};
