// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
// Bug corregido: label '-ness / -ness Nouns' (copy-paste) → '-ness / -ance / -ence Nouns'.
export const CATEGORIES = {
  verbToNounTion: {
    label: '-tion Nouns',
    icon: '📄',
    options: ['decision', 'implementation', 'investigation', 'organization'],
    studyCards: [
      { front: 'Verbo → sustantivo con -tion', back: 'decide → decision · implement → implementation · investigate → investigation · organize → organization', detail: 'El sufijo -tion (o -ation, -ition) convierte verbos en sustantivos abstractos. Es el sufijo nominalizador más frecuente en inglés académico.' },
    ],
    items: [
      { sentence: 'The committee made a ___ to postpone the vote.', correct: 'decision', explain: '"Decide" → "decision".' },
      { sentence: 'The ___ of the new policy took several months.', correct: 'implementation', explain: '"Implement" → "implementation".' },
      { sentence: 'Police launched an ___ into the incident.', correct: 'investigation', explain: '"Investigate" → "investigation".' },
      { sentence: 'The ___ of the event required careful planning.', correct: 'organization', explain: '"Organize" → "organization".' },
      { sentence: 'Their ___ to leave surprised everyone.', correct: 'decision', explain: '"Decide" → "decision".' },
      { sentence: 'Full ___ of the system will happen next year.', correct: 'implementation', explain: '"Implement" → "implementation".' },
      { sentence: 'The ___ revealed several irregularities.', correct: 'investigation', explain: '"Investigate" → "investigation".' },
      { sentence: 'Good ___ is key to a successful conference.', correct: 'organization', explain: '"Organize" → "organization".' },
      { sentence: 'It was a difficult ___ to make.', correct: 'decision', explain: '"Decide" → "decision".' },
      { sentence: 'The company began ___ of the new software.', correct: 'implementation', explain: '"Implement" → "implementation".' },
    ]
  },
  verbToNounMent: {
    label: '-ment Nouns',
    icon: '📈',
    options: ['development', 'achievement', 'agreement', 'improvement'],
    studyCards: [
      { front: 'Verbo → sustantivo con -ment', back: 'develop → development · achieve → achievement · agree → agreement · improve → improvement', detail: '-ment es otro sufijo nominalizador común, frecuente con verbos que describen procesos o estados.' },
    ],
    items: [
      { sentence: 'The ___ of the new drug took ten years.', correct: 'development', explain: '"Develop" → "development".' },
      { sentence: 'Winning the award was a great ___.', correct: 'achievement', explain: '"Achieve" → "achievement".' },
      { sentence: 'They finally reached an ___ on the terms.', correct: 'agreement', explain: '"Agree" → "agreement".' },
      { sentence: 'There has been a significant ___ in sales.', correct: 'improvement', explain: '"Improve" → "improvement".' },
      { sentence: 'Economic ___ is a key government goal.', correct: 'development', explain: '"Develop" → "development".' },
      { sentence: 'Her greatest ___ was finishing the marathon.', correct: 'achievement', explain: '"Achieve" → "achievement".' },
      { sentence: 'The two sides signed a formal ___.', correct: 'agreement', explain: '"Agree" → "agreement".' },
      { sentence: 'We need continuous ___ in our processes.', correct: 'improvement', explain: '"Improve" → "improvement".' },
      { sentence: "The city's ___ has been rapid.", correct: 'development', explain: '"Develop" → "development".' },
      { sentence: 'It was a remarkable ___ for such a young athlete.', correct: 'achievement', explain: '"Achieve" → "achievement".' },
    ]
  },
  adjectiveToNounIty: {
    label: '-ity Nouns',
    icon: '⚖️',
    options: ['difficulty', 'stability', 'popularity', 'ability'],
    studyCards: [
      { front: 'Adjetivo → sustantivo con -ity', back: 'able → ability · stable → stability · difficult → difficulty · popular → popularity', detail: '-ity convierte adjetivos en sustantivos abstractos. Cuidado con los cambios de ortografía: "difficult" → "difficulty" (y no "difficultity").' },
    ],
    items: [
      { sentence: "The exam tested students' ___ to solve problems quickly.", correct: 'ability', explain: '"Able" → "ability".' },
      { sentence: 'The country enjoyed years of political ___.', correct: 'stability', explain: '"Stable" → "stability".' },
      { sentence: 'Despite the ___, they finished the project on time.', correct: 'difficulty', explain: '"Difficult" → "difficulty".' },
      { sentence: "The singer's ___ grew after the concert.", correct: 'popularity', explain: '"Popular" → "popularity".' },
      { sentence: 'Her ___ to speak three languages impressed everyone.', correct: 'ability', explain: '"Able" → "ability".' },
      { sentence: 'Financial ___ is essential for long-term planning.', correct: 'stability', explain: '"Stable" → "stability".' },
      { sentence: 'We faced significant ___ during the negotiation.', correct: 'difficulty', explain: '"Difficult" → "difficulty".' },
      { sentence: "The app's ___ increased dramatically last year.", correct: 'popularity', explain: '"Popular" → "popularity".' },
      { sentence: 'His ___ to lead the team was clear.', correct: 'ability', explain: '"Able" → "ability".' },
      { sentence: 'The bridge needed repairs to ensure ___.', correct: 'stability', explain: '"Stable" → "stability".' },
    ]
  },
  adjectiveToNounNess: {
    label: '-ness / -ance / -ence Nouns',
    icon: '🔍',
    options: ['awareness', 'effectiveness', 'weakness', 'fairness'],
    studyCards: [
      { front: '-ness → sustantivo de adjetivo', back: 'aware → awareness · effective → effectiveness · weak → weakness · fair → fairness', detail: '-ness es el sufijo más versátil: se puede añadir a casi cualquier adjetivo. "Awareness" = estado de ser consciente.' },
    ],
    items: [
      { sentence: 'The campaign raised public ___ about climate change.', correct: 'awareness', explain: '"Aware" → "awareness".' },
      { sentence: 'The new method proved its ___ in trials.', correct: 'effectiveness', explain: '"Effective" → "effectiveness".' },
      { sentence: 'Everyone has a ___ they need to work on.', correct: 'weakness', explain: '"Weak" → "weakness".' },
      { sentence: 'The judge was known for ___ in every decision.', correct: 'fairness', explain: '"Fair" → "fairness".' },
      { sentence: 'Growing ___ led to policy changes.', correct: 'awareness', explain: '"Aware" → "awareness".' },
      { sentence: 'Doctors measured the ___ of the treatment.', correct: 'effectiveness', explain: '"Effective" → "effectiveness".' },
      { sentence: 'His main ___ was a lack of confidence.', correct: 'weakness', explain: '"Weak" → "weakness".' },
      { sentence: 'The rules were designed to ensure ___.', correct: 'fairness', explain: '"Fair" → "fairness".' },
      { sentence: "Public ___ of the issue has grown steadily.", correct: 'awareness', explain: '"Aware" → "awareness".' },
      { sentence: "Studies confirmed the drug's ___.", correct: 'effectiveness', explain: '"Effective" → "effectiveness".' },
    ]
  },
};
