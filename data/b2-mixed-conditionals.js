export const CATEGORIES = {
  pastResultPresent: {
    label: 'Past Condition → Present Result',
    icon: '⏮️➡️',
    options: ['would be', 'would have been', 'will be'],
    items: [
      { sentence: "If I had studied medicine, I ___ a doctor now.", correct: 'would be', explain: "Past condition (had studied) + present result (would be) — a past action affecting the present." },
      { sentence: "If she had taken that job, she ___ in New York now.", correct: 'would be living', explain: "Past condition + present result.", options: ['would be living', 'would have lived', 'will be living'] },
      { sentence: "If we had bought that house, we ___ so much space now.", correct: 'would have', explain: "Past condition + present result.", options: ['would have', 'would have had', 'will have'] },
      { sentence: "If he hadn't missed the flight, he ___ here right now.", correct: 'would be', explain: "Past condition + present result.", options: ['would be', 'would have been', 'will be'] },
      { sentence: "If I hadn't lost my job, I ___ stressed right now.", correct: "wouldn't be", explain: "Past condition + present result.", options: ["wouldn't be", "wouldn't have been", "won't be"] },
      { sentence: "If they had saved more money, they ___ richer now.", correct: 'would be', explain: "Past condition + present result.", options: ['would be', 'would have been', 'will be'] },
      { sentence: "If you had learned to swim as a child, you ___ afraid of water now.", correct: "wouldn't be", explain: "Past condition + present result.", options: ["wouldn't be", "wouldn't have been", "won't be"] },
      { sentence: "If she had married him, she ___ his last name now.", correct: 'would have', explain: "Past condition + present result.", options: ['would have', 'would have had', 'will have'] },
      { sentence: "If we hadn't moved abroad, our children ___ bilingual now.", correct: "wouldn't be", explain: "Past condition + present result.", options: ["wouldn't be", "wouldn't have been", "won't be"] },
      { sentence: "If I had finished my degree, I ___ a better salary now.", correct: 'would have', explain: "Past condition + present result.", options: ['would have', 'would have had', 'will have'] },
    ]
  },
  presentResultPast: {
    label: 'Present/General Condition → Past Result',
    icon: '➡️⏮️',
    options: ['would have spoken', 'would speak', 'will have spoken'],
    items: [
      { sentence: "If she weren't so shy, she ___ up in the meeting yesterday.", correct: 'would have spoken', explain: "Present/general condition (isn't shy) + past result — a general truth affecting a past event." },
      { sentence: "If I were rich, I ___ that painting at the auction.", correct: 'would have bought', explain: "Present/general condition + past result.", options: ['would have bought', 'would buy', 'will have bought'] },
      { sentence: "If he weren't so lazy, he ___ the job last year.", correct: 'would have gotten', explain: "Present/general condition + past result.", options: ['would have gotten', 'would get', 'will have gotten'] },
      { sentence: "If they didn't live so far away, they ___ to the wedding.", correct: 'would have come', explain: "Present/general condition + past result.", options: ['would have come', 'would come', 'will have come'] },
      { sentence: "If I weren't afraid of heights, I ___ skydiving with them.", correct: 'would have gone', explain: "Present/general condition + past result.", options: ['would have gone', 'would go', 'will have gone'] },
      { sentence: "If she didn't hate flying, she ___ us on the trip.", correct: 'would have joined', explain: "Present/general condition + past result.", options: ['would have joined', 'would join', 'will have joined'] },
      { sentence: "If he weren't so stubborn, he ___ our advice last week.", correct: 'would have taken', explain: "Present/general condition + past result.", options: ['would have taken', 'would take', 'will have taken'] },
      { sentence: "If I didn't love my job, I ___ it years ago.", correct: 'would have quit', explain: "Present/general condition + past result.", options: ['would have quit', 'would quit', 'will have quit'] },
      { sentence: "If she weren't so kind, she ___ him with the move.", correct: "wouldn't have helped", explain: "Present/general condition + past result.", options: ["wouldn't have helped", "wouldn't help", "won't have helped"] },
      { sentence: "If we didn't trust him, we ___ him the money.", correct: "wouldn't have lent", explain: "Present/general condition + past result.", options: ["wouldn't have lent", "wouldn't lend", "won't have lent"] },
    ]
  },
  thirdConditionalReview: {
    label: 'Third Conditional (review)',
    icon: '🔁',
    options: ['would have passed', 'would pass', 'will have passed'],
    items: [
      { sentence: "If she had studied harder, she ___ the exam.", correct: 'would have passed', explain: "Third conditional: if + past perfect, would have + past participle — for a completed unreal past situation." },
      { sentence: "If we had left earlier, we ___ the train.", correct: "wouldn't have missed", explain: "Third conditional: if + past perfect, would have + past participle.", options: ["wouldn't have missed", "wouldn't miss", "won't have missed"] },
      { sentence: "If he had listened to me, he ___ that mistake.", correct: "wouldn't have made", explain: "Third conditional: if + past perfect, would have + past participle.", options: ["wouldn't have made", "wouldn't make", "won't have made"] },
      { sentence: "If they had checked the weather, they ___ their umbrellas.", correct: 'would have brought', explain: "Third conditional: if + past perfect, would have + past participle.", options: ['would have brought', 'would bring', 'will have brought'] },
      { sentence: "If I had known about the party, I ___.", correct: 'would have come', explain: "Third conditional: if + past perfect, would have + past participle.", options: ['would have come', 'would come', 'will have come'] },
      { sentence: "If she had booked earlier, she ___ a better seat.", correct: 'would have gotten', explain: "Third conditional: if + past perfect, would have + past participle.", options: ['would have gotten', 'would get', 'will have gotten'] },
      { sentence: "If we had had more time, we ___ the whole city.", correct: 'would have explored', explain: "Third conditional: if + past perfect, would have + past participle.", options: ['would have explored', 'would explore', 'will have explored'] },
      { sentence: "If he had saved his work, he ___ it.", correct: "wouldn't have lost", explain: "Third conditional: if + past perfect, would have + past participle.", options: ["wouldn't have lost", "wouldn't lose", "won't have lost"] },
      { sentence: "If they had arrived on time, they ___ the beginning.", correct: "wouldn't have missed", explain: "Third conditional: if + past perfect, would have + past participle.", options: ["wouldn't have missed", "wouldn't miss", "won't have missed"] },
      { sentence: "If I had known the answer, I ___ it.", correct: 'would have said', explain: "Third conditional: if + past perfect, would have + past participle.", options: ['would have said', 'would say', 'will have said'] },
    ]
  },
  mixedConditionalMeaning: {
    label: 'Choosing the Right Mixed Conditional',
    icon: '🧭',
    options: ['past→present', 'present→past'],
    items: [
      { sentence: "'If I had taken that job, I would be earning more now.' — this describes:", correct: 'past→present', explain: "A past decision (didn't take the job) affects the present situation." },
      { sentence: "'If she weren't so careless, she wouldn't have broken the vase.' — this describes:", correct: 'present→past', explain: "A general characteristic (being careless) explains a past event." },
      { sentence: "'If he had trained harder, he would be a professional athlete now.' — this describes:", correct: 'past→present', explain: "A past decision affects the present." },
      { sentence: "'If I didn't love traveling, I wouldn't have moved abroad.' — this describes:", correct: 'present→past', explain: "A general truth about the person explains a past decision." },
      { sentence: "'If they hadn't sold the house, they would still live there.' — this describes:", correct: 'past→present', explain: "A past action affects the present." },
      { sentence: "'If she weren't so generous, she wouldn't have given away her savings.' — this describes:", correct: 'present→past', explain: "A general characteristic explains a past action." },
      { sentence: "'If I had learned to drive, I would be more independent now.' — this describes:", correct: 'past→present', explain: "A past decision affects the present." },
      { sentence: "'If he didn't hate conflict, he wouldn't have avoided the argument.' — this describes:", correct: 'present→past', explain: "A general characteristic explains a past action." },
      { sentence: "'If we had invested earlier, we would be financially secure now.' — this describes:", correct: 'past→present', explain: "A past decision affects the present." },
      { sentence: "'If she weren't so honest, she wouldn't have admitted her mistake.' — this describes:", correct: 'present→past', explain: "A general characteristic explains a past action." },
    ]
  }
};
