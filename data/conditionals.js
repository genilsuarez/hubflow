/**
 * Conditionals Data
 * Categories: Identify the type (Zero/First/Second/Third), Connectors (if/unless/provided that/as long as)
 */

export const CATEGORIES = {
  identifyType: {
    label: 'Which type?',
    icon: '🔀',
    options: ['Zero', 'First', 'Second', 'Third'],
    items: [
      { sentence: 'If you heat ice, it melts.', correct: 'Zero', explain: 'General truth/fact → Zero Conditional (if + present, present).' },
      { sentence: 'If it rains tomorrow, we will cancel the picnic.', correct: 'First', explain: 'Real future possibility → First Conditional (if + present, will + base).' },
      { sentence: 'If I won the lottery, I would travel the world.', correct: 'Second', explain: 'Unlikely/hypothetical situation → Second Conditional (if + past simple, would + base).' },
      { sentence: 'If she had studied harder, she would have passed the exam.', correct: 'Third', explain: 'Impossible past, didn\'t happen → Third Conditional (if + past perfect, would have + past participle).' },
      { sentence: 'If you mix blue and yellow, you get green.', correct: 'Zero', explain: 'Scientific fact → Zero Conditional.' },
      { sentence: "If I have time this weekend, I'll clean the garage.", correct: 'First', explain: 'Real future possibility → First Conditional.' },
      { sentence: 'If I were you, I would apologise.', correct: 'Second', explain: 'Hypothetical advice, uses "were" for all subjects → Second Conditional.' },
      { sentence: "If I lived closer to work, I wouldn't need a car.", correct: 'Second', explain: 'Past simple + would — an unreal present situation → Second conditional.' },
      { sentence: 'If you had told me sooner, I could have helped.', correct: 'Third', explain: 'Past perfect + could have — an unreal past situation → Third conditional.' },
      { sentence: "If we had left earlier, we wouldn't have missed the train.", correct: 'Third', explain: 'Impossible past → Third Conditional.' },
    ]
  },
  connectors: {
    label: 'Connectors',
    icon: '🔗',
    options: ['if', 'unless', 'provided that', 'as long as'],
    items: [
      { sentence: "You'll miss the bus ___ you hurry up.", correct: 'unless', explain: '"Unless" = "if...not" — introduces a negative condition.' },
      { sentence: "I'll come to the party ___ I finish work on time.", correct: 'if', explain: '"If" introduces a simple, neutral condition.' },
      { sentence: 'You can borrow my car ___ you bring it back by 6pm.', correct: 'as long as', explain: '"As long as" = the condition that must be met for something to happen.' },
      { sentence: 'We\'ll sign the contract ___ all terms are met.', correct: 'provided that', explain: '"Provided that" is a formal way of saying "if".' },
      { sentence: "You won't pass the test ___ you study.", correct: 'unless', explain: '"Unless" = "if you don\'t study".' },
      { sentence: 'I\'ll help you ___ you ask politely.', correct: 'if', explain: '"If" introduces a straightforward condition.' },
      { sentence: '___ you follow the recipe exactly, it should turn out fine.', correct: 'if', explain: '"If" introduces a simple conditional expectation.' },
      { sentence: 'You can stay ___ you keep quiet.', correct: 'as long as', explain: '"As long as" = the ongoing requirement for permission.' },
      { sentence: 'The refund is available ___ you return the item within 30 days.', correct: 'provided that', explain: '"Provided that" sets a formal requirement.' },
      { sentence: 'I never eat dessert ___ it\'s a special occasion.', correct: 'unless', explain: '"Unless" = the only exception when the action happens.' }
    ]
  },
  mixedConditionals: {
    label: 'Mixed Conditionals',
    icon: '🔀',
    options: ['would have', 'would', 'had', 'were'],
    items: [
      { sentence: 'If I ___ studied law, I would be a lawyer now.', correct: 'had', explain: 'Mixed conditional: past perfect in the if-clause (unreal past action) + would + base for present result.' },
      { sentence: 'If she ___ more patient, she would have finished the project.', correct: 'were', explain: 'Mixed conditional: unreal present character + would have for a past consequence.' },
      { sentence: 'If I had slept better last night, I ___ feel so tired now.', correct: 'would', explain: 'Unreal past cause → present result: "would + base" in the result clause (contracted: wouldn\'t feel).' },
      { sentence: 'If he ___ taken the job offer, he would be living abroad now.', correct: 'had', explain: 'Past perfect in the if-clause; "would + be + -ing" for the present state.' },
      { sentence: 'If I ___ braver, I would have asked for the promotion.', correct: 'were', explain: 'Unreal present quality → missed past opportunity.' },
      { sentence: 'She ___ been able to help if she had known about the problem.', correct: 'would have', explain: 'Unreal past: "would have + past participle" in the result clause.' },
      { sentence: 'If I ___ a morning person, I would have caught that flight.', correct: 'were', explain: 'Present character (I am not a morning person) → past missed event.' },
      { sentence: 'If they ___ invested earlier, they would be wealthy now.', correct: 'had', explain: 'Past perfect in if-clause + "would be" for present result.' },
      { sentence: 'I ___ passed the exam if I had started revising earlier.', correct: 'would have', explain: '"Would have + past participle" in the result clause of a third conditional.' },
      { sentence: 'If he ___ more disciplined, he would have met his deadline.', correct: 'were', explain: 'Present character flaw → unreal past result.' },
    ]
  }
};
