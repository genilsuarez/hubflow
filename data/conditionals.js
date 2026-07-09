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
      { sentence: 'Water boils if you heat it to 100°C.', correct: 'Zero', explain: 'Scientific fact → Zero Conditional.' },
      { sentence: "If he calls, tell him I'm busy.", correct: 'First', explain: 'Real future possibility, imperative in the result clause → First Conditional.' },
      { sentence: 'If I had more free time, I would learn the guitar.', correct: 'Second', explain: 'Hypothetical present situation → Second Conditional.' },
      { sentence: 'If they had known about the traffic, they would have taken another route.', correct: 'Third', explain: 'Impossible past → Third Conditional.' }
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
      { sentence: "She won't forgive you ___ you apologise.", correct: 'unless', explain: '"Unless" = "if you don\'t apologise".' },
      { sentence: "I'll lend you the money ___ you pay me back next week.", correct: 'as long as', explain: '"As long as" sets the required condition.' },
      { sentence: 'The trip will go ahead ___ the weather is good.', correct: 'provided that', explain: 'Formal condition → "provided that".' },
      { sentence: "You won't pass the test ___ you study.", correct: 'unless', explain: '"Unless" = "if you don\'t study".' }
    ]
  }
};
