export const CATEGORIES = {
  presentDeductionCertain: {
    label: 'Present — Certain',
    icon: '🔒',
    options: ['must be', "can't be"],
    items: [
      { sentence: "He's not answering his phone. He ___ busy.", correct: 'must be', explain: '"Must be" expresses a confident positive deduction.' },
      { sentence: 'She knows everything about Paris. She ___ from there.', correct: 'must be', explain: '"Must be" expresses a confident positive deduction.' },
      { sentence: 'That ___ true; I saw it with my own eyes.', correct: 'must be', explain: '"Must be" expresses certainty based on evidence.' },
      { sentence: "You've been driving for 10 hours. You ___ exhausted.", correct: 'must be', explain: '"Must be" expresses a confident positive deduction.' },
      { sentence: "This ___ right; the numbers don't add up.", correct: "can't be", explain: '"Can\'t be" expresses a confident negative deduction.' },
      { sentence: 'He never makes mistakes; he ___ a professional.', correct: 'must be', explain: '"Must be" expresses a confident positive deduction.' },
      { sentence: "She says she's 12, but she ___; she looks like an adult.", correct: "can't be", explain: '"Can\'t be" expresses that something is logically impossible.' },
      { sentence: "They ___ home; the lights are off and the car's gone.", correct: "can't be", explain: '"Can\'t be" expresses a confident negative deduction.' },
      { sentence: "It's freezing outside. You ___ cold without a jacket.", correct: 'must be', explain: '"Must be" expresses a confident positive deduction.' },
      { sentence: "That ___ him; he's on vacation this week.", correct: "can't be", explain: '"Can\'t be" expresses that something is logically impossible.' },
    ]
  },
  presentDeductionPossible: {
    label: 'Present — Possible',
    icon: '🔓',
    options: ['might be', 'could be', 'may be'],
    items: [
      { sentence: "I'm not sure, but she ___ at the office.", correct: 'might be', explain: '"Might be" expresses an uncertain possibility.' },
      { sentence: 'The noise ___ just the wind.', correct: 'could be', explain: '"Could be" expresses a possible explanation.' },
      { sentence: 'He ___ late because of traffic.', correct: 'may be', explain: '"May be" expresses a formal possibility.' },
      { sentence: "That ___ a good idea, let's think about it.", correct: 'could be', explain: '"Could be" expresses a possible option.' },
      { sentence: "She's not answering; she ___ asleep.", correct: 'might be', explain: '"Might be" expresses an uncertain possibility.' },
      { sentence: "It ___ true, but I'm not completely sure.", correct: 'may be', explain: '"May be" expresses a formal possibility.' },
      { sentence: 'There ___ a problem with the connection.', correct: 'could be', explain: '"Could be" expresses a possible explanation.' },
      { sentence: "He ___ at home, I haven't checked.", correct: 'might be', explain: '"Might be" expresses an uncertain possibility.' },
      { sentence: 'The results ___ different next time.', correct: 'may be', explain: '"May be" expresses a formal possibility.' },
      { sentence: 'That ___ the reason for the delay.', correct: 'could be', explain: '"Could be" expresses a possible explanation.' },
    ]
  },
  pastDeductionCertain: {
    label: 'Past — Certain',
    icon: '🔒',
    options: ['must have', "can't have", "couldn't have"],
    items: [
      { sentence: 'The lights are on. Someone ___ forgotten to turn them off.', correct: 'must have', explain: '"Must have" + past participle expresses certainty about the past.' },
      { sentence: "He ___ left already; his car isn't here.", correct: 'must have', explain: '"Must have" + past participle expresses certainty about the past.' },
      { sentence: 'She ___ done it; she was with me all evening.', correct: "can't have", explain: '"Can\'t have" expresses that something was logically impossible.' },
      { sentence: "They ___ arrived yet; the flight isn't scheduled to land for an hour.", correct: "couldn't have", explain: '"Couldn\'t have" expresses that something was impossible given the facts.' },
      { sentence: 'He ___ worked all night; he looks exhausted.', correct: 'must have', explain: '"Must have" + past participle expresses certainty about the past.' },
      { sentence: 'She ___ known about the surprise; she looked so shocked.', correct: "can't have", explain: '"Can\'t have" expresses that something was logically impossible.' },
      { sentence: 'The plants are dead. Someone ___ forgotten to water them.', correct: 'must have', explain: '"Must have" + past participle expresses certainty about the past.' },
      { sentence: "He ___ passed the exam; he didn't study at all.", correct: "can't have", explain: '"Can\'t have" expresses that something was logically impossible.' },
      { sentence: 'It ___ been easy; she finished it so quickly.', correct: 'must have', explain: '"Must have" + past participle expresses certainty about the past.' },
      { sentence: "They ___ left without saying goodbye; that's not like them.", correct: "couldn't have", explain: '"Couldn\'t have" expresses that something was impossible given what we know.' },
    ]
  },
  pastDeductionPossible: {
    label: 'Past — Possible',
    icon: '🔓',
    options: ['might have', 'could have', 'may have'],
    items: [
      { sentence: "She ___ missed the bus; that's why she's late.", correct: 'might have', explain: '"Might have" + past participle expresses an uncertain past possibility.' },
      { sentence: 'He ___ forgotten about the meeting.', correct: 'could have', explain: '"Could have" + past participle expresses a possible explanation.' },
      { sentence: 'They ___ already left when we arrived.', correct: 'may have', explain: '"May have" + past participle expresses a formal possibility.' },
      { sentence: 'I ___ left my keys at the office.', correct: 'might have', explain: '"Might have" + past participle expresses an uncertain past possibility.' },
      { sentence: 'The email ___ gone to spam.', correct: 'could have', explain: '"Could have" + past participle expresses a possible explanation.' },
      { sentence: 'She ___ taken a different route.', correct: 'may have', explain: '"May have" + past participle expresses a formal possibility.' },
      { sentence: 'He ___ misunderstood the instructions.', correct: 'might have', explain: '"Might have" + past participle expresses an uncertain past possibility.' },
      { sentence: 'It ___ been a mistake.', correct: 'could have', explain: '"Could have" + past participle expresses a possible explanation.' },
      { sentence: 'They ___ changed their plans.', correct: 'may have', explain: '"May have" + past participle expresses a formal possibility.' },
      { sentence: 'The delay ___ been caused by the weather.', correct: 'could have', explain: '"Could have" + past participle expresses a possible explanation.' },
    ]
  },
  mixedDeduction: {
    label: 'Mixed Review',
    icon: '🔀',
    options: ['must be', 'must have', "can't be", "can't have"],
    items: [
      { sentence: 'The ground is wet. It ___ rained last night.', correct: 'must have', explain: 'Past evidence needs "must have" + past participle.' },
      { sentence: "He's not picking up. He ___ in a meeting right now.", correct: 'must be', explain: 'A present situation needs "must be".' },
      { sentence: 'She ___ finished already; she only started an hour ago.', correct: "can't have", explain: 'Past impossibility needs "can\'t have" + past participle.' },
      { sentence: "That ___ right; the math doesn't work.", correct: "can't be", explain: 'Present impossibility needs "can\'t be".' },
      { sentence: 'You ___ tired after that long flight.', correct: 'must be', explain: 'A present situation needs "must be".' },
      { sentence: 'They ___ won; they were losing by 20 points with 2 minutes left.', correct: "can't have", explain: 'Past impossibility needs "can\'t have" + past participle.' },
      { sentence: 'He ___ studied hard; he got the top score.', correct: 'must have', explain: 'Past evidence needs "must have" + past participle.' },
      { sentence: "This ___ the right address; there's no house here.", correct: "can't be", explain: 'Present impossibility needs "can\'t be".' },
      { sentence: 'She ___ home; I can see the lights on.', correct: 'must be', explain: 'A present situation needs "must be".' },
      { sentence: "He ___ done it alone; it's too big a job for one person.", correct: "can't have", explain: 'Past impossibility needs "can\'t have" + past participle.' },
    ]
  },
};
