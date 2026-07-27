/**
 * Gerunds & Infinitives Data — verb + -ing vs verb + to-infinitive
 */

export const CATEGORIES = {
  gerundVerbs: {
    label: 'Gerund (-ing)',
    icon: '🔁',
    options: ['doing', 'to do'],
    items: [
      { sentence: 'I enjoy ___ my homework early.', correct: 'doing', explain: '"Enjoy" is followed by the -ing form (gerund).' },
      { sentence: 'They avoided ___ the difficult questions.', correct: 'doing', explain: '"Avoid" is followed by the -ing form.' },
      { sentence: 'We finished ___ the project last night.', correct: 'doing', explain: '"Finish" is followed by the -ing form.' },
      { sentence: 'She suggested ___ it differently.', correct: 'doing', explain: '"Suggest" is followed by the -ing form.' },
      { sentence: 'He admitted ___ it wrong.', correct: 'doing', explain: '"Admit" is followed by the -ing form.' },
      { sentence: 'She practised ___ it every day.', correct: 'doing', explain: '"Practise" is followed by the -ing form.' },
      { sentence: 'He denied ___ anything wrong.', correct: 'doing', explain: '"Deny" is followed by the -ing form.' },
      { sentence: 'She keeps ___ it wrong, no matter how often I explain.', correct: 'doing', explain: '"Keep" (= continue) is followed by the -ing form.' },
      { sentence: 'I miss ___ things the way we used to.', correct: 'doing', explain: '"Miss" is followed by the -ing form.' },
      { sentence: 'She considered ___ it differently this time.', correct: 'doing', explain: '"Consider" is followed by the -ing form.' }
    ]
  },
  infinitiveVerbs: {
    label: 'Infinitive (to-)',
    icon: '➡️',
    options: ['doing', 'to do'],
    items: [
      { sentence: 'She wants ___ her homework early today.', correct: 'to do', explain: '"Want" is followed by the to-infinitive.' },
      { sentence: 'He decided ___ his homework before dinner.', correct: 'to do', explain: '"Decide" is followed by the to-infinitive.' },
      { sentence: 'I promise ___ better next time.', correct: 'to do', explain: '"Promise" is followed by the to-infinitive.' },
      { sentence: 'They agreed ___ it together.', correct: 'to do', explain: '"Agree" is followed by the to-infinitive.' },
      { sentence: 'We plan ___ it next week.', correct: 'to do', explain: '"Plan" is followed by the to-infinitive.' },
      { sentence: 'We offered ___ the dishes after dinner.', correct: 'to do', explain: '"Offer" is followed by the to-infinitive.' },
      { sentence: 'He pretended ___ it, but he hadn\'t even started.', correct: 'to do', explain: '"Pretend" is followed by the to-infinitive.' },
      { sentence: 'We managed ___ it before the deadline.', correct: 'to do', explain: '"Manage" is followed by the to-infinitive.' },
      { sentence: 'I expect ___ it properly next time.', correct: 'to do', explain: '"Expect" is followed by the to-infinitive.' },
      { sentence: 'They hoped ___ it before the deadline.', correct: 'to do', explain: '"Hope" is followed by the to-infinitive.' }
    ]
  }
};
