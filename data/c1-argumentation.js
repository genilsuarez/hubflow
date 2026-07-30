export const CATEGORIES = {
  concessionConnectors: {
    label: 'Concession',
    icon: '🤝',
    options: ['Admittedly', 'Granted', 'While it is true that', 'Even though'],
    items: [
      { sentence: '___, the plan has flaws, but its benefits outweigh them.', correct: 'Admittedly', explain: '"Admittedly" concedes a point before countering it.' },
      { sentence: '___ costs are high, the long-term savings justify the investment.', correct: 'Even though', explain: '"Even though" introduces a concession clause before the main point.' },
      { sentence: '___ some risks remain, the project should proceed.', correct: 'While it is true that', explain: '"While it is true that" formally concedes a point before countering it.' },
      { sentence: '___, the results were not perfect, they still represent progress.', correct: 'Granted', explain: '"Granted" concedes a point before countering it.' },
      { sentence: '___ the critics have a point, the overall strategy is sound.', correct: 'While it is true that', explain: '"While it is true that" formally concedes a point before countering it.' },
      { sentence: '___, mistakes were made, but the team learned valuable lessons.', correct: 'Admittedly', explain: '"Admittedly" concedes a point before countering it.' },
      { sentence: '___ the process is slow, it ensures accuracy.', correct: 'Even though', explain: '"Even though" introduces a concession clause before the main point.' },
      { sentence: '___, the theory has limitations, it remains widely used.', correct: 'Granted', explain: '"Granted" concedes a point before countering it.' },
      { sentence: '___ some data is missing, the conclusions still hold.', correct: 'Even though', explain: '"Even though" introduces a concession clause before the main point.' },
      { sentence: '___, there are challenges ahead, but we are prepared.', correct: 'Admittedly', explain: '"Admittedly" concedes a point before countering it.' },
    ]
  },
  counterArgumentOpeners: {
    label: 'Counter-Argument Openers',
    icon: '⚔️',
    options: ['On the other hand', 'Critics argue that', 'However', 'That said'],
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
    ]
  },
  hedgingBoosting: {
    label: 'Hedging & Boosting',
    icon: '🎚️',
    options: ['arguably', 'undeniably', 'presumably', 'ostensibly'],
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
    ]
  },
};
