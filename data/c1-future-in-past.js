export const CATEGORIES = {
  wasGoingTo: {
    label: 'Was/Were Going To',
    icon: '⏮️🔮',
    options: ['was going to call', 'will call', 'would call'],
    items: [
      { sentence: "She said she ___ me later, but she never did.", correct: 'was going to call', explain: "'Was/were going to' expresses a past plan or intention that often didn't happen." },
      { sentence: "They ___ leave early, but they got delayed.", correct: 'were going to', explain: "'Was/were going to' expresses a past plan that changed.", options: ['were going to', 'will', 'would'] },
      { sentence: "I ___ study abroad, but my plans changed.", correct: 'was going to', explain: "'Was/were going to' expresses a past intention that didn't happen.", options: ['was going to', 'will', 'would'] },
      { sentence: "He ___ the meeting, but something came up.", correct: 'was going to attend', explain: "'Was/were going to' expresses a past plan.", options: ['was going to attend', 'will attend', 'would attend'] },
      { sentence: "We ___ dinner at home, but we ended up eating out.", correct: 'were going to have', explain: "'Was/were going to' expresses a past plan that changed.", options: ['were going to have', 'will have', 'would have'] },
      { sentence: "She ___ him the truth, but she lost her nerve.", correct: 'was going to tell', explain: "'Was/were going to' expresses a past intention that didn't happen.", options: ['was going to tell', 'will tell', 'would tell'] },
      { sentence: "They ___ move to a new city, but they decided to stay.", correct: 'were going to', explain: "'Was/were going to' expresses a past plan that changed.", options: ['were going to', 'will', 'would'] },
      { sentence: "I ___ finish the project by Friday, but I ran out of time.", correct: 'was going to', explain: "'Was/were going to' expresses a past intention.", options: ['was going to', 'will', 'would'] },
      { sentence: "He ___ apologize, but he never got the chance.", correct: 'was going to', explain: "'Was/were going to' expresses a past intention that didn't happen.", options: ['was going to', 'will', 'would'] },
      { sentence: "We ___ visit them, but the weather ruined our plans.", correct: 'were going to', explain: "'Was/were going to' expresses a past plan that changed.", options: ['were going to', 'will', 'would'] },
    ]
  },
  wouldFutureInPast: {
    label: "'Would' as Future-in-the-Past",
    icon: '🔮',
    options: ['would become', 'will become', 'was becoming'],
    items: [
      { sentence: "No one knew that he ___ famous.", correct: 'would become', explain: "'Would' can express a future action as seen from a point in the past." },
      { sentence: "She didn't realize that this decision ___ her whole life.", correct: 'would change', explain: "'Would' expresses a future action from a past viewpoint.", options: ['would change', 'will change', 'was changing'] },
      { sentence: "Little did they know that the company ___ within a year.", correct: 'would fail', explain: "'Would' expresses a future action from a past viewpoint.", options: ['would fail', 'will fail', 'was failing'] },
      { sentence: "He had no idea that they ___ again.", correct: 'would meet', explain: "'Would' expresses a future action from a past viewpoint.", options: ['would meet', 'will meet', 'were meeting'] },
      { sentence: "She promised that she ___ back.", correct: 'would come', explain: "'Would' is the past form of 'will' in reported speech and narration.", options: ['would come', 'will come', 'came'] },
      { sentence: "They didn't expect that the storm ___ so much damage.", correct: 'would cause', explain: "'Would' expresses a future action from a past viewpoint.", options: ['would cause', 'will cause', 'was causing'] },
      { sentence: "I never imagined that I ___ live abroad.", correct: 'would', explain: "'Would' expresses a future action from a past viewpoint.", options: ['would', 'will', 'was'] },
      { sentence: "He knew that this moment ___ define his career.", correct: 'would', explain: "'Would' expresses a future action from a past viewpoint.", options: ['would', 'will', 'was'] },
      { sentence: "She believed that things ___ get better.", correct: 'would', explain: "'Would' expresses a future action from a past viewpoint.", options: ['would', 'will', 'was'] },
      { sentence: "No one predicted that the plan ___ so well.", correct: 'would work', explain: "'Would' expresses a future action from a past viewpoint.", options: ['would work', 'will work', 'was working'] },
    ]
  },
  reportedFutureTense: {
    label: 'Reported Future Tense',
    icon: '💬',
    options: ['would arrive', 'will arrive', 'arrived'],
    items: [
      { sentence: "She said the train ___ at noon. (original: 'The train will arrive at noon.')", correct: 'would arrive', explain: "In reported speech, 'will' changes to 'would'." },
      { sentence: "He told me he ___ the report by Friday. (original: 'I will finish the report by Friday.')", correct: 'would finish', explain: "In reported speech, 'will' changes to 'would'.", options: ['would finish', 'will finish', 'finished'] },
      { sentence: "They announced that prices ___ next month. (original: 'Prices will rise next month.')", correct: 'would rise', explain: "In reported speech, 'will' changes to 'would'.", options: ['would rise', 'will rise', 'rose'] },
      { sentence: "She warned us that it ___ rain later. (original: 'It will rain later.')", correct: 'would rain', explain: "In reported speech, 'will' changes to 'would'.", options: ['would rain', 'will rain', 'rained'] },
      { sentence: "He explained that the meeting ___ postponed. (original: 'The meeting will be postponed.')", correct: 'would be', explain: "In reported speech, 'will' changes to 'would'.", options: ['would be', 'will be', 'was'] },
      { sentence: "She said she ___ me as soon as possible. (original: 'I will call you as soon as possible.')", correct: 'would call', explain: "In reported speech, 'will' changes to 'would'.", options: ['would call', 'will call', 'called'] },
      { sentence: "They promised the results ___ ready by Monday. (original: 'The results will be ready by Monday.')", correct: 'would be', explain: "In reported speech, 'will' changes to 'would'.", options: ['would be', 'will be', 'were'] },
      { sentence: "He said the company ___ new offices next year. (original: 'The company will open new offices next year.')", correct: 'would open', explain: "In reported speech, 'will' changes to 'would'.", options: ['would open', 'will open', 'opened'] },
      { sentence: "She mentioned that she ___ the job. (original: 'I will accept the job.')", correct: 'would accept', explain: "In reported speech, 'will' changes to 'would'.", options: ['would accept', 'will accept', 'accepted'] },
      { sentence: "They said the flight ___ on time. (original: 'The flight will arrive on time.')", correct: 'would arrive', explain: "In reported speech, 'will' changes to 'would'.", options: ['would arrive', 'will arrive', 'arrived'] },
    ]
  },
  futurePerfectInPast: {
    label: 'Future Perfect in the Past',
    icon: '✅⏮️',
    options: ['would have finished', 'will have finished', 'had finished'],
    items: [
      { sentence: "She said that by June, she ___ her degree. (original: 'By June, I will have finished my degree.')", correct: 'would have finished', explain: "In reported speech, 'will have' changes to 'would have'." },
      { sentence: "He told me that by 2020, the company ___ its goals. (original: 'By 2020, the company will have achieved its goals.')", correct: 'would have achieved', explain: "In reported speech, 'will have' changes to 'would have'.", options: ['would have achieved', 'will have achieved', 'had achieved'] },
      { sentence: "They believed that by the end of the year, sales ___. (original: 'By the end of the year, sales will have doubled.')", correct: 'would have doubled', explain: "In reported speech, 'will have' changes to 'would have'.", options: ['would have doubled', 'will have doubled', 'had doubled'] },
      { sentence: "She thought that by the time we arrived, they ___. (original: 'By the time you arrive, they will have left.')", correct: 'would have left', explain: "In reported speech, 'will have' changes to 'would have'.", options: ['would have left', 'will have left', 'had left'] },
      { sentence: "He assumed that by Friday, the report ___. (original: 'By Friday, the report will have been submitted.')", correct: 'would have been submitted', explain: "In reported speech, 'will have' changes to 'would have'.", options: ['would have been submitted', 'will have been submitted', 'had been submitted'] },
      { sentence: "She said that by the age of thirty, she ___ her own business. (original: 'By thirty, I will have started my own business.')", correct: 'would have started', explain: "In reported speech, 'will have' changes to 'would have'.", options: ['would have started', 'will have started', 'had started'] },
      { sentence: "They predicted that by next year, the project ___. (original: 'By next year, the project will have been completed.')", correct: 'would have been completed', explain: "In reported speech, 'will have' changes to 'would have'.", options: ['would have been completed', 'will have been completed', 'had been completed'] },
      { sentence: "He hoped that by the deadline, he ___ everything. (original: 'By the deadline, I will have finished everything.')", correct: 'would have finished', explain: "In reported speech, 'will have' changes to 'would have'.", options: ['would have finished', 'will have finished', 'had finished'] },
      { sentence: "She expected that by then, prices ___. (original: 'By then, prices will have risen.')", correct: 'would have risen', explain: "In reported speech, 'will have' changes to 'would have'.", options: ['would have risen', 'will have risen', 'had risen'] },
      { sentence: "They said that by midnight, the storm ___. (original: 'By midnight, the storm will have passed.')", correct: 'would have passed', explain: "In reported speech, 'will have' changes to 'would have'.", options: ['would have passed', 'will have passed', 'had passed'] },
    ]
  }
};
