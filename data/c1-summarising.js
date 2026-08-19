// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
export const CATEGORIES = {
  summarizingConnectors: {
    label: 'Summarizing Connectors',
    icon: '📌',
    options: ['In short', 'To sum up', 'Overall', 'In a nutshell'],
    studyCards: [
      { front: 'Overall / To sum up', back: 'resumen general / cierre con punto final', detail: '"Overall, things turned out better than expected." · "To sum up, we recommend proceeding with caution."' },
      { front: 'In short / In a nutshell', back: 'conclusión concisa o directa', detail: '"In short, the plan simply won\'t work." (directo) · "In a nutshell, it\'s a good investment." (muy breve, informal-formal)' },
    ],
    items: [
      { sentence: '___, the project was a success despite the initial setbacks.', correct: 'Overall', explain: '"Overall" summarizes a general impression after weighing several points.' },
      { sentence: '___, we recommend proceeding with caution.', correct: 'To sum up', explain: '"To sum up" closes a discussion with a final recommendation.' },
      { sentence: "___, the plan simply won't work.", correct: 'In short', explain: '"In short" gives a blunt, condensed conclusion.' },
      { sentence: "___, it's a good investment with manageable risk.", correct: 'In a nutshell', explain: '"In a nutshell" gives a very brief, essential summary.' },
      { sentence: '___, the evidence points to one clear conclusion.', correct: 'To sum up', explain: '"To sum up" closes a discussion with a final point.' },
      { sentence: '___, things turned out better than expected.', correct: 'Overall', explain: '"Overall" summarizes a general impression.' },
      { sentence: "___, we're out of time and options.", correct: 'In short', explain: '"In short" gives a blunt, condensed conclusion.' },
      { sentence: '___, the strategy is sound but needs refinement.', correct: 'In a nutshell', explain: '"In a nutshell" gives a very brief, essential summary.' },
      { sentence: '___, the team performed well this quarter.', correct: 'Overall', explain: '"Overall" summarizes a general impression.' },
      { sentence: '___, here is what we found.', correct: 'To sum up', explain: '"To sum up" closes a discussion with a final point.' },
      { sentence: '___, the merger benefited both companies in the end.', correct: 'Overall', explain: '"Overall" summarizes a general impression after weighing several points.' },
      { sentence: '___, we believe the risks are manageable.', correct: 'To sum up', explain: '"To sum up" closes a discussion with a final recommendation.' },
      { sentence: '___, the negotiations failed.', correct: 'In short', explain: '"In short" gives a blunt, condensed conclusion.' },
      { sentence: '___, the report says spending should be reduced.', correct: 'In a nutshell', explain: '"In a nutshell" gives a very brief, essential summary.' },
    ]
  },
  summarizingVerbs: {
    label: 'Summarizing Verbs',
    icon: '✍️',
    options: ['summarizes', 'highlights', 'outlines', 'concludes'],
    studyCards: [
      { front: 'summarizes / outlines / highlights / concludes', back: 'verbos de reporte para describir lo que dice un texto', detail: 'summarizes = versión condensada del todo · outlines = lista estructurada de puntos · highlights = énfasis en lo importante · concludes = juicio final.' },
    ],
    items: [
      { sentence: 'The article ___ that renewable energy is the future.', correct: 'concludes', explain: '"Concludes" reports the final judgment of a text.' },
      { sentence: 'The report ___ the main challenges facing the industry.', correct: 'outlines', explain: '"Outlines" reports a structured list of points.' },
      { sentence: 'This paragraph ___ the key findings of the study.', correct: 'summarizes', explain: '"Summarizes" reports a condensed version of the whole.' },
      { sentence: 'The author ___ the importance of early intervention.', correct: 'highlights', explain: '"Highlights" reports what the text emphasizes as important.' },
      { sentence: 'The summary ___ the entire chapter in two sentences.', correct: 'summarizes', explain: '"Summarizes" reports a condensed version of the whole.' },
      { sentence: 'The document ___ the steps needed to apply.', correct: 'outlines', explain: '"Outlines" reports a structured list of points.' },
      { sentence: 'Her speech ___ several urgent issues.', correct: 'highlights', explain: '"Highlights" reports what the text emphasizes as important.' },
      { sentence: 'The study ___ that further testing is needed.', correct: 'concludes', explain: '"Concludes" reports the final judgment of a text.' },
      { sentence: 'The introduction ___ the structure of the essay.', correct: 'outlines', explain: '"Outlines" reports a structured list of points.' },
      { sentence: "The abstract ___ the paper's main argument.", correct: 'summarizes', explain: '"Summarizes" reports a condensed version of the whole.' },
      { sentence: 'The report ___ that immediate action is required.', correct: 'concludes', explain: '"Concludes" reports the final judgment of a text.' },
      { sentence: 'The presentation ___ the main risks of the project.', correct: 'highlights', explain: '"Highlights" reports what the text emphasizes as important.' },
      { sentence: 'The manual ___ the setup process step by step.', correct: 'outlines', explain: '"Outlines" reports a structured list of points.' },
    ]
  },
  concisenessMarkers: {
    label: 'Conciseness Markers',
    icon: '🎯',
    options: ['Essentially', 'In essence', 'briefly', 'Put simply'],
    studyCards: [
      { front: 'Essentially / In essence', back: 'reducir algo complejo a su núcleo', detail: '"Essentially, the plan failed because of poor timing." · "In essence, this is a story about resilience." Más reflexivo que "In short".' },
      { front: 'Put simply / briefly', back: 'introducir una reafirmación directa o una explicación corta', detail: '"Put simply, we need more time." (reafirmación llana) · "Let me explain briefly: the results were mixed." (explicación condensada)' },
    ],
    items: [
      { sentence: '___, the plan failed because of poor timing.', correct: 'Essentially', explain: '"Essentially" reduces a complex situation to its core cause.' },
      { sentence: '___, we ran out of funding.', correct: 'Put simply', explain: '"Put simply" introduces a plain, direct restatement.' },
      { sentence: 'Let me explain ___: the results were mixed.', correct: 'briefly', explain: '"Briefly" signals a short, condensed explanation follows.' },
      { sentence: '___, this is a story about resilience.', correct: 'In essence', explain: '"In essence" reduces a complex idea to its core meaning.' },
      { sentence: "___, the deal didn't go through.", correct: 'Essentially', explain: '"Essentially" reduces a complex situation to its core outcome.' },
      { sentence: '___, we need more time.', correct: 'Put simply', explain: '"Put simply" introduces a plain, direct restatement.' },
      { sentence: 'To explain ___, the merger was called off due to legal issues.', correct: 'briefly', explain: '"Briefly" signals a short, condensed explanation follows.' },
      { sentence: '___, this represents a shift in strategy.', correct: 'In essence', explain: '"In essence" reduces a complex idea to its core meaning.' },
      { sentence: '___, they disagreed on almost everything.', correct: 'Essentially', explain: '"Essentially" reduces a complex situation to its core.' },
      { sentence: "___, it's too expensive.", correct: 'Put simply', explain: '"Put simply" introduces a plain, direct restatement.' },
      { sentence: '___, they lost because they were unprepared.', correct: 'Essentially', explain: '"Essentially" reduces a complex situation to its core cause.' },
      { sentence: 'To put it ___, the team needs more resources.', correct: 'briefly', explain: '"Briefly" signals a short, condensed explanation follows.' },
      { sentence: '___, the whole plan depends on funding.', correct: 'In essence', explain: '"In essence" reduces a complex idea to its core meaning.' },
    ]
  },
};
