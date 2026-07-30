export const CATEGORIES = {
  soNotSubstitution: {
    label: 'So / Not',
    icon: '🔁',
    options: ['so', 'not'],
    items: [
      { sentence: 'Will it rain tomorrow? I hope ___.', correct: 'not', explain: '"I hope not" substitutes for "I hope it will not rain".' },
      { sentence: 'Is she coming? I think ___.', correct: 'so', explain: '"I think so" substitutes for "I think she is coming".' },
      { sentence: 'Did he pass the exam? I believe ___.', correct: 'so', explain: '"I believe so" substitutes for the full clause.' },
      { sentence: 'Will they be late? I hope ___.', correct: 'not', explain: '"I hope not" substitutes for the negative full clause.' },
      { sentence: "Is it true? I'm afraid ___.", correct: 'so', explain: '"I\'m afraid so" substitutes for the full clause.' },
      { sentence: 'Can we still go? I suppose ___.', correct: 'so', explain: '"I suppose so" substitutes for the full clause.' },
      { sentence: "Is there enough time? I'm afraid ___.", correct: 'not', explain: '"I\'m afraid not" substitutes for the negative full clause.' },
      { sentence: "Did she call? I don't think ___.", correct: 'so', explain: '"I don\'t think so" substitutes for the full clause.' },
      { sentence: 'Will he agree? I guess ___.', correct: 'so', explain: '"I guess so" substitutes for the full clause.' },
      { sentence: 'Is the store open? I hope ___.', correct: 'so', explain: '"I hope so" substitutes for the full clause.' },
    ]
  },
  auxiliaryEllipsis: {
    label: 'Auxiliary Ellipsis',
    icon: '✂️',
    options: ['does', 'did', 'has', 'can'],
    items: [
      { sentence: 'She works harder than he ___.', correct: 'does', explain: 'The auxiliary "does" replaces the repeated verb "works".' },
      { sentence: 'They finished before we ___.', correct: 'did', explain: 'The auxiliary "did" replaces the repeated verb "finished".' },
      { sentence: 'He has traveled more than she ___.', correct: 'has', explain: 'The auxiliary "has" replaces the repeated verb phrase "has traveled".' },
      { sentence: 'I can cook better than she ___.', correct: 'can', explain: 'The modal "can" replaces the repeated verb phrase "can cook".' },
      { sentence: 'My mother cooks better than my father ___.', correct: 'does', explain: 'The auxiliary "does" replaces the repeated verb "cooks".' },
      { sentence: 'We arrived earlier than they ___.', correct: 'did', explain: 'The auxiliary "did" replaces the repeated verb "arrived".' },
      { sentence: 'She has read more books than he ___.', correct: 'has', explain: 'The auxiliary "has" replaces the repeated verb phrase.' },
      { sentence: 'He can run faster than I ___.', correct: 'can', explain: 'The modal "can" replaces the repeated verb phrase "can run".' },
      { sentence: 'The new model performs better than the old one ___.', correct: 'does', explain: 'The auxiliary "does" replaces the repeated verb "performs".' },
      { sentence: 'I studied longer than he ___.', correct: 'did', explain: 'The auxiliary "did" replaces the repeated verb "studied".' },
    ]
  },
  oneSubstitution: {
    label: 'One / Ones',
    icon: '1️⃣',
    options: ['one', 'ones'],
    items: [
      { sentence: "I don't like this shirt; I prefer the blue ___.", correct: 'one', explain: '"One" replaces a singular noun (shirt).' },
      { sentence: 'These shoes are nice, but I like the black ___.', correct: 'ones', explain: '"Ones" replaces a plural noun (shoes).' },
      { sentence: 'This car is expensive; do you have a cheaper ___?', correct: 'one', explain: '"One" replaces a singular noun (car).' },
      { sentence: 'I need new pens; these ___ are broken.', correct: 'ones', explain: '"Ones" replaces a plural noun (pens).' },
      { sentence: 'That house is too small; we want a bigger ___.', correct: 'one', explain: '"One" replaces a singular noun (house).' },
      { sentence: "These cookies are stale; let's buy fresh ___.", correct: 'ones', explain: '"Ones" replaces a plural noun (cookies).' },
      { sentence: 'This phone is old; I need a newer ___.', correct: 'one', explain: '"One" replaces a singular noun (phone).' },
      { sentence: 'Those photos are blurry; do you have clearer ___?', correct: 'ones', explain: '"Ones" replaces a plural noun (photos).' },
      { sentence: 'This chair is broken; can I use another ___?', correct: 'one', explain: '"One" replaces a singular noun (chair).' },
      { sentence: 'These questions are hard; the easy ___ come later.', correct: 'ones', explain: '"Ones" replaces a plural noun (questions).' },
    ]
  },
  doSoSubstitution: {
    label: 'Do So / Did So',
    icon: '➡️',
    options: ['do so', 'did so'],
    items: [
      { sentence: 'If you want to leave early, you may ___.', correct: 'do so', explain: '"Do so" replaces "leave early" in the present/future.' },
      { sentence: 'He promised to help, and he ___ willingly.', correct: 'did so', explain: '"Did so" replaces "helped" in the past.' },
      { sentence: 'She asked me to wait, so I ___.', correct: 'did so', explain: '"Did so" replaces "waited" in the past.' },
      { sentence: 'You can submit the form online if you wish to ___.', correct: 'do so', explain: '"Do so" replaces "submit the form" in the present/future.' },
      { sentence: 'They were told to leave, and they ___ immediately.', correct: 'did so', explain: '"Did so" replaces "left" in the past.' },
      { sentence: "If you'd like to comment, please feel free to ___.", correct: 'do so', explain: '"Do so" replaces "comment" in the present/future.' },
      { sentence: 'He was asked to apologize, and he ___ sincerely.', correct: 'did so', explain: '"Did so" replaces "apologized" in the past.' },
      { sentence: 'Employees may request time off if they need to ___.', correct: 'do so', explain: '"Do so" replaces "request time off" in the present/future.' },
      { sentence: 'She decided to resign, and she ___ quietly.', correct: 'did so', explain: '"Did so" replaces "resigned" in the past.' },
      { sentence: "You may proceed if you're ready to ___.", correct: 'do so', explain: '"Do so" replaces "proceed" in the present/future.' },
    ]
  },
};
