/**
 * Preferences Data — prefer / would prefer / would rather
 * Categories: Expression choice, Structure (to/than/that/∅)
 */

export const CATEGORIES = {
  expression: {
    label: 'Which expression?',
    icon: '💭',
    options: ['prefer', 'would prefer', 'would rather'],
    items: [
      { sentence: 'I ___ dogs to cats in general.', correct: 'prefer', explain: 'General, ongoing preference → "prefer" (present simple).' },
      { sentence: 'They ___ tea to coffee — it\'s always been their favourite.', correct: 'prefer', explain: 'General, ongoing preference → "prefer".' },
      { sentence: 'Right now, I ___ pizza to pasta for dinner.', correct: 'would prefer', explain: 'A specific choice on this occasion → "would prefer" + noun.' },
      { sentence: 'For the party, we ___ a live band to a DJ.', correct: 'would prefer', explain: 'Specific occasion, formal tone → "would prefer".' },
      { sentence: 'I ___ stay home tonight than go out in the rain.', correct: 'would rather', explain: '"Would rather" + base verb + "than" for a specific choice between actions.' },
      { sentence: 'He ___ walk than take the bus, even in winter.', correct: 'would rather', explain: '"Would rather" + base verb, more informal than "would prefer".' },
      { sentence: 'She ___ classical music to pop, generally speaking.', correct: 'prefer', explain: 'General preference signalled by "generally speaking" → "prefer".' },
      { sentence: 'I ___ not go out tonight; I\'m too tired.', correct: 'would rather', explain: '"Would rather not" + base verb is the standard negative form.' },
      { sentence: 'We ___ stay at a hotel than camp, if given the choice tonight.', correct: 'would rather', explain: 'Specific one-off choice + base verb → "would rather".' },
      { sentence: 'In general, most people ___ comfort to style.', correct: 'prefer', explain: 'General truth about people → "prefer".' }
    ]
  },
  structure: {
    label: 'Structure (to/than/that/∅)',
    icon: '🧩',
    options: ['to', 'than', 'that', '∅'],
    items: [
      { sentence: 'I prefer dogs ___ cats.', correct: 'to', explain: '"Prefer" + noun + "to" + noun.' },
      { sentence: 'She prefers to walk rather ___ drive.', correct: 'than', explain: '"Rather than" compares two actions.' },
      { sentence: 'We prefer ___ guests remove their shoes before entering.', correct: 'that', explain: '"Prefer that" + clause is the formal structure.' },
      { sentence: 'I would rather ___ stay in than go out.', correct: '∅', explain: '"Would rather" is followed directly by the base verb — no "to".' },
      { sentence: 'He prefers reading ___ watching TV.', correct: 'to', explain: '"Prefer" + -ing + "to" + -ing.' },
      { sentence: 'Rather ___ going abroad, we stayed in the UK this summer.', correct: 'than', explain: '"Rather than" + -ing describes the alternative not chosen.' },
      { sentence: 'I\'d prefer ___ stay in tonight.', correct: 'to', explain: '"Would prefer" + to-infinitive for a specific choice.' },
      { sentence: 'They would rather fly ___ drive to Paris.', correct: 'than', explain: '"Would rather X than Y" compares two actions.' },
      { sentence: 'I prefer tea ___ coffee in the mornings.', correct: 'to', explain: '"Prefer" + noun + "to" + noun.' },
      { sentence: 'I would rather ___ not discuss this right now.', correct: '∅', explain: '"Would rather" + base verb, no "to" even in the negative form.' },
      { sentence: "She'd prefer ___ eat at home tonight.", correct: 'to', explain: '"Would prefer" + to-infinitive for a specific occasion.' },
      { sentence: 'I prefer cycling ___ running for exercise.', correct: 'to', explain: '"Prefer" + -ing + "to" + -ing for general preferences.' },
      { sentence: 'We would rather leave early ___ get stuck in traffic.', correct: 'than', explain: '"Would rather X than Y" contrasts the preferred option.' },
      { sentence: 'I prefer ___ people call before visiting.', correct: 'that', explain: '"Prefer that" + subject + verb for a formal wish.' },
      { sentence: 'He would rather ___ take the train.', correct: '∅', explain: '"Would rather" + base verb — no preposition needed.' }
    ]
  }
};
