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
      { sentence: 'The deal is valid ___ both parties agree.', correct: 'provided that', explain: '"Provided that" — formal condition that must be met.' },
      { sentence: '___ you follow the recipe exactly, it should turn out fine.', correct: 'if', explain: '"If" introduces a simple conditional expectation.' },
      { sentence: 'You can stay ___ you keep quiet.', correct: 'as long as', explain: '"As long as" = the ongoing requirement for permission.' },
      { sentence: 'We\'ll go hiking ___ it doesn\'t rain.', correct: 'as long as', explain: '"As long as" = the condition must hold for the plan to proceed.' },
      { sentence: 'The refund is available ___ you return the item within 30 days.', correct: 'provided that', explain: '"Provided that" sets a formal requirement.' },
      { sentence: 'I never eat dessert ___ it\'s a special occasion.', correct: 'unless', explain: '"Unless" = the only exception when the action happens.' }
    ]
  }
};
