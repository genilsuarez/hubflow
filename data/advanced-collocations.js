/**
 * Advanced Collocations Data (B2)
 * Categories: Academic/Formal, Hedging Language, Reporting Verbs
 */

export const CATEGORIES = {
  academic: {
    label: 'Academic',
    icon: '🎓',
    options: ['carry out', 'draw conclusions', 'raise awareness', 'pose a threat'],
    items: [
      { sentence: 'The researchers ___ an extensive study on climate patterns.', correct: 'carry out', explain: '"Carry out a study/experiment/research" — standard academic collocation for conducting research.' },
      { sentence: 'Based on these findings, we can ___ about consumer behaviour.', correct: 'draw conclusions', explain: '"Draw conclusions" — formal way to state what the evidence suggests.' },
      { sentence: 'The campaign aims to ___ about mental health issues.', correct: 'raise awareness', explain: '"Raise awareness" — established collocation for bringing attention to an issue.' },
      { sentence: 'Rising sea levels ___ to coastal communities worldwide.', correct: 'pose a threat', explain: '"Pose a threat/risk/challenge" — formal way to describe a danger.' },
      { sentence: 'Further studies need to ___ before we can confirm the hypothesis.', correct: 'carry out', explain: '"Carry out" collocates with studies, investigations, and experiments.' },
      { sentence: 'It is premature to ___ from such a small sample size.', correct: 'draw conclusions', explain: '"Draw conclusions from..." — the "from" signals the evidence source.' },
      { sentence: 'Social media has helped ___ about environmental destruction.', correct: 'raise awareness', explain: '"Raise awareness about/of" — "about" introduces the topic.' },
      { sentence: 'Antibiotic resistance could ___ to public health in the coming decades.', correct: 'pose a threat', explain: '"Pose a threat to..." — "to" introduces what is threatened.' },
    ]
  },
  hedging: {
    label: 'Hedging',
    icon: '🛡️',
    options: ['it would appear that', 'to a certain extent', 'it is widely acknowledged', 'there is a tendency to'],
    items: [
      { sentence: '___ the new policy has had minimal impact on employment rates.', correct: 'it would appear that', explain: '"It would appear that" — cautious, tentative claim; softer than "it is clear that".' },
      { sentence: 'The results support the hypothesis, ___, but further research is needed.', correct: 'to a certain extent', explain: '"To a certain extent" — partially agrees while leaving room for doubt.' },
      { sentence: '___ that regular exercise improves mental health outcomes.', correct: 'it is widely acknowledged', explain: '"It is widely acknowledged/accepted/recognised" — attributes the claim to general consensus.' },
      { sentence: 'In media coverage, ___ sensationalise scientific findings.', correct: 'there is a tendency to', explain: '"There is a tendency to" — describes a pattern without absolute certainty.' },
      { sentence: '___ automation will transform the job market significantly.', correct: 'it would appear that', explain: 'Hedged prediction — avoids definitive claims about the future.' },
      { sentence: 'Cultural factors play a role, ___, in shaping dietary choices.', correct: 'to a certain extent', explain: 'Acknowledges influence while not overstating it.' },
      { sentence: '___ that climate change disproportionately affects developing nations.', correct: 'it is widely acknowledged', explain: 'References broad scientific/academic consensus.' },
      { sentence: 'Among younger voters, ___ prioritise social issues over economic ones.', correct: 'there is a tendency to', explain: 'Describes a general trend without claiming it is universal.' },
    ]
  },
  reporting: {
    label: 'Reporting Verbs',
    icon: '📝',
    options: ['acknowledge', 'contend', 'refute', 'advocate'],
    items: [
      { sentence: 'The authors ___ that their study has several limitations.', correct: 'acknowledge', explain: '"Acknowledge" = admit/accept (often used for weaknesses or counterpoints).' },
      { sentence: 'Critics ___ that the government\'s approach is fundamentally flawed.', correct: 'contend', explain: '"Contend" = argue strongly (often used when there is disagreement).' },
      { sentence: 'The defence team attempted to ___ the prosecution\'s key evidence.', correct: 'refute', explain: '"Refute" = prove wrong/disprove (stronger than "deny" or "reject").' },
      { sentence: 'Many experts ___ a shift towards renewable energy sources.', correct: 'advocate', explain: '"Advocate" = publicly support/recommend (formal, used for positions/policies).' },
      { sentence: 'The CEO ___ that mistakes were made during the transition.', correct: 'acknowledge', explain: '"Acknowledge" here means to publicly admit something negative.' },
      { sentence: 'Some economists ___ that inflation is primarily driven by supply-side factors.', correct: 'contend', explain: '"Contend" signals a debatable position, not consensus.' },
      { sentence: 'New evidence has been presented that appears to ___ the original theory.', correct: 'refute', explain: '"Refute" = disprove with evidence (stronger than simply disagreeing).' },
      { sentence: 'The report ___ increased investment in early childhood education.', correct: 'advocate', explain: '"Advocate (for)" = recommend as a policy position.' },
    ]
  }
};
