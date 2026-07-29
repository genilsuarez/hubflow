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
      { sentence: 'Social media has helped ___ about environmental destruction.', correct: 'raise awareness', explain: '"Raise awareness about/of" — "about" introduces the topic.' },
      { sentence: 'Antibiotic resistance could ___ to public health in the coming decades.', correct: 'pose a threat', explain: '"Pose a threat to..." — "to" introduces what is threatened.' },
      { sentence: 'The team will ___ a series of experiments before publishing the results.', correct: 'carry out', explain: '"Carry out an experiment/trial" — standard collocation for conducting research.' },
      { sentence: 'It would be premature to ___ from such a small sample size.', correct: 'draw conclusions', explain: '"Draw conclusions from" — introduces the evidence a conclusion is based on.' },
      { sentence: 'Invasive species can ___ to local ecosystems.', correct: 'pose a threat', explain: '"Pose a threat to" — formal register, common in academic and environmental writing.' },
      { sentence: 'The documentary succeeded in helping to ___ of the refugee crisis.', correct: 'raise awareness', explain: '"Raise awareness of" — "of" also works alongside "about" to introduce the topic.' },
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
      { sentence: '___ that climate change disproportionately affects developing nations.', correct: 'it is widely acknowledged', explain: 'References broad scientific/academic consensus.' },
      { sentence: 'Among younger voters, ___ prioritise social issues over economic ones.', correct: 'there is a tendency to', explain: 'Describes a general trend without claiming it is universal.' },
      { sentence: 'The proposal addresses the problem, ___, though significant gaps remain.', correct: 'to a certain extent', explain: '"To a certain extent" — partial agreement, softened right before a contrast.' },
      { sentence: '___ the market has begun to stabilise after months of volatility.', correct: 'it would appear that', explain: 'Hedged observation — avoids stating the trend as a certain fact.' },
      { sentence: '___ that early intervention leads to better long-term outcomes.', correct: 'it is widely acknowledged', explain: 'Attributes the claim to general consensus rather than the writer alone.' },
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
      { sentence: 'Some economists ___ that inflation is primarily driven by supply-side factors.', correct: 'contend', explain: '"Contend" signals a debatable position, not consensus.' },
      { sentence: 'New evidence has been presented that appears to ___ the original theory.', correct: 'refute', explain: '"Refute" = disprove with evidence (stronger than simply disagreeing).' },
      { sentence: 'The report ___ increased investment in early childhood education.', correct: 'advocate', explain: '"Advocate (for)" = recommend as a policy position.' },
      { sentence: 'The committee ___ that more resources are needed to address the backlog.', correct: 'acknowledge', explain: '"Acknowledge" = admit as true, often conceding a shortcoming.' },
      { sentence: 'Environmental groups continue to ___ stricter emissions regulations.', correct: 'advocate', explain: '"Advocate" = publicly support a policy or course of action.' },
      { sentence: "The study's authors were quick to ___ claims that their methodology was flawed.", correct: 'refute', explain: '"Refute" = disprove with evidence, stronger than simply disagreeing.' },
    ]
  },
  causeEffect: {
    label: 'Cause & Effect',
    icon: '⚙️',
    options: ['give rise to', 'stem from', 'bring about', 'have implications for'],
    items: [
      { sentence: 'Rapid urbanisation can ___ significant pressure on public infrastructure.', correct: 'give rise to', explain: '"Give rise to" — formal way to say "cause/produce", especially for problems or consequences.' },
      { sentence: 'Many of the social inequalities observed today ___ historical injustice.', correct: 'stem from', explain: '"Stem from" — means "originate from", used to trace a cause back to its source.' },
      { sentence: 'Technological advances in the 20th century helped ___ profound social change.', correct: 'bring about', explain: '"Bring about" — formal collocation meaning "to cause", often for large-scale or deliberate change.' },
      { sentence: 'The proposed legislation could ___ millions of low-income households.', correct: 'have implications for', explain: '"Have implications for" — formal way to say a change will affect or impact someone/something.' },
      { sentence: 'Economic instability can ___ increased rates of social unrest.', correct: 'give rise to', explain: '"Give rise to" — links a cause to its consequence; common in formal writing.' },
      { sentence: 'The conflict appears to ___ deep-seated political and ethnic tensions.', correct: 'stem from', explain: '"Stem from" — traces the current situation back to its underlying causes.' },
      { sentence: 'Grassroots movements have historically helped ___ lasting political reform.', correct: 'bring about', explain: '"Bring about" — collocates naturally with "change", "reform", "transformation".' },
      { sentence: 'Budget cuts in education will ___ future workforce development.', correct: 'have implications for', explain: '"Have implications for" — highlights downstream consequences without specifying them precisely.' },
      { sentence: 'Poor nutrition in early childhood can ___ developmental challenges in later life.', correct: 'give rise to', explain: '"Give rise to" — formal register; avoids the simpler "cause" or "lead to".' },
      { sentence: 'Her reluctance to delegate appears to ___ a lack of trust in her team.', correct: 'stem from', explain: '"Stem from" — identifies the root cause of a behaviour or situation.' },
    ]
  },
  criticalThinking: {
    label: 'Critical Thinking',
    icon: '🧠',
    options: ['call into question', 'take into account', 'shed light on', 'weigh up the evidence'],
    items: [
      { sentence: 'These new findings ___ the validity of the original conclusions.', correct: 'call into question', explain: '"Call into question" — formal collocation meaning to cast doubt on something.' },
      { sentence: 'Any fair assessment must ___ both short- and long-term consequences.', correct: 'take into account', explain: '"Take into account" — consider a factor when making a decision or judgement.' },
      { sentence: 'The documentary sought to ___ the systemic causes of poverty.', correct: 'shed light on', explain: '"Shed light on" — reveal or clarify something that was previously unclear or hidden.' },
      { sentence: 'Before reaching a verdict, jurors must carefully ___.', correct: 'weigh up the evidence', explain: '"Weigh up the evidence" — formally evaluate all available facts before deciding.' },
      { sentence: 'This study aims to ___ the relationship between diet and cognitive performance.', correct: 'shed light on', explain: '"Shed light on" — collocates with complex or abstract relationships that need clarifying.' },
      { sentence: 'Recent whistleblower reports ___ the company\'s ethical practices.', correct: 'call into question', explain: '"Call into question" — raise serious doubts; often used in journalism and formal commentary.' },
      { sentence: 'A thorough policy review must ___ the perspectives of all stakeholders.', correct: 'take into account', explain: '"Take into account" — ensure a factor is not overlooked in a decision-making process.' },
      { sentence: 'Researchers must ___ before drawing any firm conclusions.', correct: 'weigh up the evidence', explain: '"Weigh up the evidence" — evaluate competing data points before committing to a conclusion.' },
      { sentence: 'The tribunal\'s report appeared to ___ several inconsistencies in the original investigation.', correct: 'call into question', explain: '"Call into question" — highlights contradictions or unreliability in previous findings.' },
      { sentence: 'We must ___ the social context before judging individual behaviour.', correct: 'take into account', explain: '"Take into account" — avoid judging in isolation; consider the broader picture.' },
    ]
  },
};
