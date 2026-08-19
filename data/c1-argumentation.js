// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
// Bugs corregidos:
// - concessionConnectors: 2 items con "Granted" producían coma splice al
//   rellenar ("Granted, the results were not perfect, they still represent
//   progress."). Corregidos añadiendo "but" en la segunda cláusula.
export const CATEGORIES = {
  concessionConnectors: {
    label: 'Concession',
    icon: '🤝',
    options: ['Admittedly', 'Granted', 'While it is true that', 'Even though'],
    studyCards: [
      { front: 'Admittedly / Granted', back: 'conceder un punto antes de contraargumentar (sigue "but" o coma + cláusula)', detail: '"Admittedly, the plan has flaws, but its benefits outweigh them." · "Granted, mistakes were made, but the team learned valuable lessons."' },
      { front: 'While it is true that / Even though', back: 'concesión dentro de una cláusula subordinada', detail: '"While it is true that costs are high, the savings justify the investment." · "Even though the process is slow, it ensures accuracy."' },
    ],
    items: [
      { sentence: '___, the plan has flaws, but its benefits outweigh them.', correct: 'Admittedly', explain: '"Admittedly" concedes a point before countering it.' },
      { sentence: '___ costs are high, the long-term savings justify the investment.', correct: 'Even though', explain: '"Even though" introduces a concession clause before the main point.' },
      { sentence: '___ some risks remain, the project should proceed.', correct: 'While it is true that', explain: '"While it is true that" formally concedes a point before countering it.' },
      { sentence: '___, the results were not perfect, but they still represent progress.', correct: 'Granted', explain: '"Granted" concedes a point; a contrasting clause with "but" must follow.' },
      { sentence: '___ the critics have a point, the overall strategy is sound.', correct: 'While it is true that', explain: '"While it is true that" formally concedes a point before countering it.' },
      { sentence: '___, mistakes were made, but the team learned valuable lessons.', correct: 'Admittedly', explain: '"Admittedly" concedes a point before countering it.' },
      { sentence: '___ the process is slow, it ensures accuracy.', correct: 'Even though', explain: '"Even though" introduces a concession clause before the main point.' },
      { sentence: '___, the theory has limitations, but it remains widely used.', correct: 'Granted', explain: '"Granted" concedes a point; a contrasting clause with "but" must follow.' },
      { sentence: '___ some data is missing, the conclusions still hold.', correct: 'Even though', explain: '"Even though" introduces a concession clause before the main point.' },
      { sentence: '___, there are challenges ahead, but we are prepared.', correct: 'Admittedly', explain: '"Admittedly" concedes a point before countering it.' },
      { sentence: '___, the new software has a learning curve, but it saves time in the long run.', correct: 'Admittedly', explain: '"Admittedly" concedes a point before countering it.' },
      { sentence: '___ the budget is tight, the project can still succeed with careful planning.', correct: 'Even though', explain: '"Even though" introduces a concession clause before the main point.' },
      { sentence: '___ the market is competitive, this company still has room to grow.', correct: 'While it is true that', explain: '"While it is true that" formally concedes a point before countering it.' },
      { sentence: '___, the initial results were disappointing, but the team persevered.', correct: 'Granted', explain: '"Granted" concedes a point; a contrasting clause with "but" must follow.' },
    ]
  },
  counterArgumentOpeners: {
    label: 'Counter-Argument Openers',
    icon: '⚔️',
    options: ['On the other hand', 'Critics argue that', 'However', 'That said'],
    studyCards: [
      { front: 'However / That said', back: 'contraste directo / matiz suave tras afirmación positiva', detail: '"The plan seems effective. However, it may be too expensive." · "The results are promising. That said, more research is needed."' },
      { front: 'On the other hand / Critics argue that', back: 'perspectiva contraria / atribuir el contraargumento a otros', detail: '"Some see this as progress. On the other hand, others see it as a step backward." · "The system boosts efficiency. Critics argue that it reduces job security."' },
    ],
    items: [
      { sentence: 'Some support the policy. ___, others strongly oppose it.', correct: 'On the other hand', explain: '"On the other hand" introduces a contrasting viewpoint.' },
      { sentence: 'The plan seems effective. ___, it may be too expensive to implement.', correct: 'However', explain: '"However" introduces a direct contrast to the previous statement.' },
      { sentence: 'The new system boosts efficiency. ___ it reduces job security.', correct: 'Critics argue that', explain: '"Critics argue that" attributes the counter-argument to a specific group.' },
      { sentence: 'The results are promising. ___, more research is needed.', correct: 'That said', explain: '"That said" softens a contrasting point after a positive statement.' },
      { sentence: 'Supporters praise the reform. ___, it favors large corporations.', correct: 'Critics argue that', explain: '"Critics argue that" attributes the counter-argument to a specific group.' },
      { sentence: 'The strategy worked well initially. ___, results have since declined.', correct: 'However', explain: '"However" introduces a direct contrast to the previous statement.' },
      { sentence: 'Some see this as progress. ___, others see it as a step backward.', correct: 'On the other hand', explain: '"On the other hand" introduces a contrasting viewpoint.' },
      { sentence: 'The idea has merit. ___, it needs further testing.', correct: 'That said', explain: '"That said" softens a contrasting point after a positive statement.' },
      { sentence: 'Proponents highlight the benefits. ___ the costs are underestimated.', correct: 'Critics argue that', explain: '"Critics argue that" attributes the counter-argument to a specific group.' },
      { sentence: "It's a bold plan. ___, it comes with significant risk.", correct: 'However', explain: '"However" introduces a direct contrast to the previous statement.' },
      { sentence: 'Many praise the new policy. ___, some worry about its long-term effects.', correct: 'However', explain: '"However" introduces a direct contrast to the previous statement.' },
      { sentence: 'The programme is popular with parents. ___ it fails to address the underlying problem.', correct: 'Critics argue that', explain: '"Critics argue that" attributes the counter-argument to a specific group.' },
      { sentence: 'The results look encouraging. ___, we should interpret them cautiously.', correct: 'That said', explain: '"That said" softens a contrasting point after a positive statement.' },
    ]
  },
  hedgingBoosting: {
    label: 'Hedging & Boosting',
    icon: '🎚️',
    options: ['arguably', 'undeniably', 'presumably', 'ostensibly'],
    studyCards: [
      { front: 'Hedging: arguably / presumably / ostensibly', back: 'debatable · assumed · stated but perhaps not real', detail: '"This is arguably the best solution." (open to debate) · "She left, presumably to catch her flight." (assumption) · "The meeting was ostensibly about budget, but politics dominated." (stated vs real purpose)' },
      { front: 'Boosting: undeniably', back: 'más allá de toda duda, fortalece la afirmación', detail: '"The evidence is undeniably clear." · "The benefits are undeniably significant." Opuesto al hedging: confirma en vez de suavizar.' },
    ],
    items: [
      { sentence: 'This is ___ the best solution available.', correct: 'arguably', explain: '"Arguably" softens a strong claim, leaving room for debate.' },
      { sentence: 'The evidence is ___ clear.', correct: 'undeniably', explain: '"Undeniably" strengthens a claim, presenting it as beyond doubt.' },
      { sentence: 'The delay was, ___, caused by technical issues.', correct: 'presumably', explain: '"Presumably" signals an assumption not yet confirmed.' },
      { sentence: 'The policy was ___ designed to help small businesses, though critics disagree.', correct: 'ostensibly', explain: '"Ostensibly" signals the stated purpose, which may not be the real one.' },
      { sentence: 'This remains ___ one of the most important discoveries of the century.', correct: 'arguably', explain: '"Arguably" softens a strong claim, leaving room for debate.' },
      { sentence: 'The benefits of exercise are ___ significant.', correct: 'undeniably', explain: '"Undeniably" strengthens a claim, presenting it as beyond doubt.' },
      { sentence: 'She left early, ___ to catch her flight.', correct: 'presumably', explain: '"Presumably" signals an assumption not yet confirmed.' },
      { sentence: 'The meeting was ___ about budget planning, but politics dominated.', correct: 'ostensibly', explain: '"Ostensibly" signals the stated purpose, which may not be the real one.' },
      { sentence: 'It is ___ the most efficient method we have.', correct: 'arguably', explain: '"Arguably" softens a strong claim, leaving room for debate.' },
      { sentence: 'The impact of the change is ___ positive.', correct: 'undeniably', explain: '"Undeniably" strengthens a claim, presenting it as beyond doubt.' },
      { sentence: 'This is ___ the most controversial decision the board has ever made.', correct: 'arguably', explain: '"Arguably" softens a strong claim, leaving room for debate.' },
      { sentence: 'The data shows ___ significant improvement across all regions.', correct: 'undeniably', explain: '"Undeniably" strengthens a claim, presenting it as beyond doubt.' },
      { sentence: 'He left the meeting early, ___ because of a family emergency.', correct: 'presumably', explain: '"Presumably" signals an assumption not yet confirmed.' },
    ]
  },
};
