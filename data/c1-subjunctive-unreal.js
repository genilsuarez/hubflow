export const CATEGORIES = {
  mandativeSubjunctive: {
    label: 'Mandative Subjunctive',
    icon: '📋',
    options: ['be', 'go', 'submit', 'arrive'],
    items: [
      { sentence: 'It is essential that everyone ___ on time.', correct: 'arrive', explain: 'The subjunctive uses the base form after "essential that", regardless of subject.' },
      { sentence: 'The teacher demanded that the students ___ quiet.', correct: 'be', explain: 'The subjunctive uses the base form "be" after "demand that".' },
      { sentence: 'She suggested that he ___ to the meeting.', correct: 'go', explain: 'The subjunctive uses the base form after "suggest that".' },
      { sentence: 'The committee requires that applicants ___ their forms before Monday.', correct: 'submit', explain: 'The subjunctive uses the base form after "require that".' },
      { sentence: "It's important that she ___ early tomorrow morning.", correct: 'arrive', explain: 'The subjunctive uses the base form after "important that".' },
      { sentence: 'The rule states that visitors ___ silent in the library.', correct: 'be', explain: 'The subjunctive uses the base form "be" after "state that" (a rule/requirement).' },
      { sentence: 'I recommend that you ___ to see the doctor soon.', correct: 'go', explain: 'The subjunctive uses the base form after "recommend that".' },
      { sentence: 'The professor insists that students ___ their essays by email.', correct: 'submit', explain: 'The subjunctive uses the base form after "insist that".' },
      { sentence: "It's crucial that the team ___ ready by 9 AM.", correct: 'be', explain: 'The subjunctive uses the base form "be" after "crucial that".' },
      { sentence: 'They demanded that he ___ at headquarters immediately.', correct: 'arrive', explain: 'The subjunctive uses the base form after "demand that".' },
    ]
  },
  thirdConditional: {
    label: 'Third Conditional',
    icon: '⏮️',
    options: ['had', 'would have'],
    items: [
      { sentence: 'If I ___ known about the traffic, I would have left earlier.', correct: 'had', explain: 'The if-clause of the third conditional uses "had" + past participle.' },
      { sentence: 'If she had studied harder, she ___ passed the exam.', correct: 'would have', explain: 'The result clause of the third conditional uses "would have" + past participle.' },
      { sentence: "If we ___ left on time, we wouldn't have missed the flight.", correct: 'had', explain: 'The if-clause of the third conditional uses "had" + past participle.' },
      { sentence: 'If they had asked for help, we ___ gladly assisted.', correct: 'would have', explain: 'The result clause of the third conditional uses "would have" + past participle.' },
      { sentence: "If he ___ listened to advice, he wouldn't have made that mistake.", correct: 'had', explain: 'The if-clause of the third conditional uses "had" + past participle.' },
      { sentence: 'If you had told me earlier, I ___ changed my plans.', correct: 'would have', explain: 'The result clause of the third conditional uses "would have" + past participle.' },
      { sentence: "If I ___ seen the sign, I wouldn't have parked there.", correct: 'had', explain: 'The if-clause of the third conditional uses "had" + past participle.' },
      { sentence: 'If she had called, we ___ picked her up.', correct: 'would have', explain: 'The result clause of the third conditional uses "would have" + past participle.' },
      { sentence: 'If we ___ known the truth, we would have acted differently.', correct: 'had', explain: 'The if-clause of the third conditional uses "had" + past participle.' },
      { sentence: 'If he had apologized, she ___ forgiven him.', correct: 'would have', explain: 'The result clause of the third conditional uses "would have" + past participle.' },
    ]
  },
  wishRegret: {
    label: 'Wish + Past Perfect',
    icon: '💭',
    options: ['had studied', 'had listened', 'had known', 'had gone'],
    items: [
      { sentence: 'I wish I ___ harder for the exam.', correct: 'had studied', explain: '"Wish" + past perfect expresses regret about the past.' },
      { sentence: 'She wishes she ___ to his advice.', correct: 'had listened', explain: '"Wish" + past perfect expresses regret about the past.' },
      { sentence: 'We wish we ___ about the change earlier.', correct: 'had known', explain: '"Wish" + past perfect expresses regret about the past.' },
      { sentence: 'He wishes he ___ to the party.', correct: 'had gone', explain: '"Wish" + past perfect expresses regret about the past.' },
      { sentence: 'I wish I ___ more before the test.', correct: 'had studied', explain: '"Wish" + past perfect expresses regret about the past.' },
      { sentence: 'They wish they ___ to the warning.', correct: 'had listened', explain: '"Wish" + past perfect expresses regret about the past.' },
      { sentence: 'She wishes she ___ the truth sooner.', correct: 'had known', explain: '"Wish" + past perfect expresses regret about the past.' },
      { sentence: 'We wish we ___ with them yesterday.', correct: 'had gone', explain: '"Wish" + past perfect expresses regret about the past.' },
      { sentence: 'I wish I ___ for that exam properly.', correct: 'had studied', explain: '"Wish" + past perfect expresses regret about the past.' },
      { sentence: 'He wishes he ___ to his doctor sooner.', correct: 'had listened', explain: '"Wish" + past perfect expresses regret about the past.' },
    ]
  },
  subjunctiveWere: {
    label: 'Subjunctive "Were"',
    icon: '🎭',
    options: ['were', 'was'],
    items: [
      { sentence: 'If I ___ you, I would apologize.', correct: 'were', explain: 'Formal English uses "were" for all subjects in unreal conditions, not "was".' },
      { sentence: 'I wish it ___ Friday already.', correct: 'were', explain: 'Formal English uses "were" for all subjects in unreal wishes, not "was".' },
      { sentence: 'If she ___ taller, she could reach the shelf.', correct: 'were', explain: 'Formal English uses "were" for all subjects in unreal conditions, not "was".' },
      { sentence: 'He acts as if he ___ the boss.', correct: 'were', explain: '"As if" + unreal situation uses "were" in formal English.' },
      { sentence: 'If only it ___ sunny today.', correct: 'were', explain: '"If only" + unreal wish uses "were" in formal English.' },
      { sentence: 'If I ___ rich, I would travel the world.', correct: 'were', explain: 'Formal English uses "were" for all subjects in unreal conditions, not "was".' },
      { sentence: 'She talks as if she ___ an expert.', correct: 'were', explain: '"As if" + unreal situation uses "were" in formal English.' },
      { sentence: 'If he ___ here, he would know what to do.', correct: 'were', explain: 'Formal English uses "were" for all subjects in unreal conditions, not "was".' },
      { sentence: 'I wish I ___ more confident.', correct: 'were', explain: 'Formal English uses "were" for all subjects in unreal wishes, not "was".' },
      { sentence: "If it ___ up to me, I'd change the schedule.", correct: 'were', explain: 'Formal English uses "were" for all subjects in unreal conditions, not "was".' },
    ]
  },
};
