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
      // "might be" / "could be" / "may be" are near-perfect synonyms for weak
      // present possibility — none of these sentences give a textual cue that
      // rules out the other two, so all three are accepted for every item.
      { sentence: "I'm not sure, but she ___ at the office.", correct: ['might be', 'could be', 'may be'], explain: '"Might be" expresses an uncertain possibility — "could be" and "may be" work just as well here.' },
      { sentence: 'The noise ___ just the wind.', correct: ['could be', 'might be', 'may be'], explain: '"Could be" expresses a possible explanation — "might be" and "may be" work just as well here.' },
      { sentence: 'He ___ late because of traffic.', correct: ['may be', 'might be', 'could be'], explain: '"May be" expresses a possibility — "might be" and "could be" work just as well here.' },
      { sentence: "That ___ a good idea, let's think about it.", correct: ['could be', 'might be', 'may be'], explain: '"Could be" expresses a possible option — "might be" and "may be" work just as well here.' },
      { sentence: "She's not answering; she ___ asleep.", correct: ['might be', 'could be', 'may be'], explain: '"Might be" expresses an uncertain possibility — "could be" and "may be" work just as well here.' },
      { sentence: "It ___ true, but I'm not completely sure.", correct: ['may be', 'might be', 'could be'], explain: '"May be" expresses a possibility — "might be" and "could be" work just as well here.' },
      { sentence: 'There ___ a problem with the connection.', correct: ['could be', 'might be', 'may be'], explain: '"Could be" expresses a possible explanation — "might be" and "may be" work just as well here.' },
      { sentence: "He ___ at home, I haven't checked.", correct: ['might be', 'could be', 'may be'], explain: '"Might be" expresses an uncertain possibility — "could be" and "may be" work just as well here.' },
      { sentence: 'The results ___ different next time.', correct: ['may be', 'might be', 'could be'], explain: '"May be" expresses a possibility — "might be" and "could be" work just as well here.' },
      { sentence: 'That ___ the reason for the delay.', correct: ['could be', 'might be', 'may be'], explain: '"Could be" expresses a possible explanation — "might be" and "may be" work just as well here.' },
    ]
  },
  pastDeductionCertain: {
    label: 'Past — Certain',
    icon: '🔒',
    options: ['must have', "can't have", "couldn't have"],
    items: [
      { sentence: 'The lights are on. Someone ___ forgotten to turn them off.', correct: 'must have', explain: '"Must have" + past participle expresses certainty about the past.' },
      { sentence: "He ___ left already; his car isn't here.", correct: 'must have', explain: '"Must have" + past participle expresses certainty about the past.' },
      { sentence: 'She ___ done it; she was with me all evening.', correct: ["can't have", "couldn't have"], explain: '"Can\'t have" expresses that something was logically impossible — "couldn\'t have" works just as well here.' },
      { sentence: "They ___ arrived yet; the flight isn't scheduled to land for an hour.", correct: ["couldn't have", "can't have"], explain: '"Couldn\'t have" expresses that something was impossible given the facts — "can\'t have" works just as well here.' },
      { sentence: 'He ___ worked all night; he looks exhausted.', correct: 'must have', explain: '"Must have" + past participle expresses certainty about the past.' },
      { sentence: 'She ___ known about the surprise; she looked so shocked.', correct: ["can't have", "couldn't have"], explain: '"Can\'t have" expresses that something was logically impossible — "couldn\'t have" works just as well here.' },
      { sentence: 'The plants are dead. Someone ___ forgotten to water them.', correct: 'must have', explain: '"Must have" + past participle expresses certainty about the past.' },
      { sentence: "He ___ passed the exam; he didn't study at all.", correct: ["can't have", "couldn't have"], explain: '"Can\'t have" expresses that something was logically impossible — "couldn\'t have" works just as well here.' },
      { sentence: 'It ___ been easy; she finished it so quickly.', correct: 'must have', explain: '"Must have" + past participle expresses certainty about the past.' },
      { sentence: "They ___ left without saying goodbye; that's not like them.", correct: ["couldn't have", "can't have"], explain: '"Couldn\'t have" expresses that something was impossible given what we know — "can\'t have" works just as well here.' },
    ]
  },
  pastDeductionPossible: {
    label: 'Past — Possible',
    icon: '🔓',
    options: ['might have', 'could have', 'may have'],
    items: [
      // Same overlap as presentDeductionPossible: "might/could/may have" are
      // near-perfect synonyms for weak past possibility with no textual cue
      // to pick one over the others, so all three are accepted per item.
      { sentence: "She ___ missed the bus; that's why she's late.", correct: ['might have', 'could have', 'may have'], explain: '"Might have" + past participle expresses an uncertain past possibility — "could have" and "may have" work just as well here.' },
      { sentence: 'He ___ forgotten about the meeting.', correct: ['could have', 'might have', 'may have'], explain: '"Could have" + past participle expresses a possible explanation — "might have" and "may have" work just as well here.' },
      { sentence: 'They ___ already left when we arrived.', correct: ['may have', 'might have', 'could have'], explain: '"May have" + past participle expresses a possibility — "might have" and "could have" work just as well here.' },
      { sentence: 'I ___ left my keys at the office.', correct: ['might have', 'could have', 'may have'], explain: '"Might have" + past participle expresses an uncertain past possibility — "could have" and "may have" work just as well here.' },
      { sentence: 'The email ___ gone to spam.', correct: ['could have', 'might have', 'may have'], explain: '"Could have" + past participle expresses a possible explanation — "might have" and "may have" work just as well here.' },
      { sentence: 'She ___ taken a different route.', correct: ['may have', 'might have', 'could have'], explain: '"May have" + past participle expresses a possibility — "might have" and "could have" work just as well here.' },
      { sentence: 'He ___ misunderstood the instructions.', correct: ['might have', 'could have', 'may have'], explain: '"Might have" + past participle expresses an uncertain past possibility — "could have" and "may have" work just as well here.' },
      { sentence: 'It ___ been a mistake.', correct: ['could have', 'might have', 'may have'], explain: '"Could have" + past participle expresses a possible explanation — "might have" and "may have" work just as well here.' },
      { sentence: 'They ___ changed their plans.', correct: ['may have', 'might have', 'could have'], explain: '"May have" + past participle expresses a possibility — "might have" and "could have" work just as well here.' },
      { sentence: 'The delay ___ been caused by the weather.', correct: ['could have', 'might have', 'may have'], explain: '"Could have" + past participle expresses a possible explanation — "might have" and "may have" work just as well here.' },
    ]
  },
};
