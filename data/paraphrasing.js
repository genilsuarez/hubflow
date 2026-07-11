/**
 * HubFlow — Paraphrasing / Key Word Transformation Data
 * Format identical to sentence-combining.js / register-switch.js
 * Categories: grammar-transform (B1-B2), vocabulary-transform (B2), formal-to-informal (B1)
 * Each entry: { source, keyword, correct: string[], hint, explain }
 * The user rewrites `source` using the `keyword` without changing the meaning.
 */

export const CATEGORIES = {
  grammarTransform: {
    label: 'Grammar Transformations',
    icon: '🔄',
    level: 'B1–B2',
    items: [
      { source: "I started learning English five years ago.", keyword: "BEEN", correct: ["I have been learning English for five years."], hint: "Change to present perfect continuous", explain: "'Started X ago' = 'have been doing X for' (duration until now)." },
      { source: "They built this castle in 1450.", keyword: "BUILT", correct: ["This castle was built in 1450."], hint: "Change to passive voice", explain: "Active → Passive: object becomes subject + was/were + past participle." },
      { source: "It's not necessary for you to come.", keyword: "HAVE", correct: ["You don't have to come."], hint: "not necessary = don't have to", explain: "'It's not necessary' = 'don't have to' (no obligation)." },
      { source: "She is too young to drive.", keyword: "ENOUGH", correct: ["She isn't old enough to drive.", "She is not old enough to drive."], hint: "too young = not old enough", explain: "'Too + adj' can be rewritten as 'not + opposite adj + enough'." },
      { source: "I regret not studying harder.", keyword: "WISH", correct: ["I wish I had studied harder."], hint: "Regret + not doing → wish + past perfect", explain: "'Regret not doing' = 'wish + had + past participle' (past wish)." },
      { source: "Perhaps he missed the train.", keyword: "MIGHT", correct: ["He might have missed the train."], hint: "Perhaps = might have (speculation about the past)", explain: "'Perhaps + past simple' = 'might have + past participle'." },
      { source: "The last time I saw her was in 2019.", keyword: "SINCE", correct: ["I haven't seen her since 2019."], hint: "Last time + past = haven't + since", explain: "'The last time' + past → present perfect negative + since." },
      { source: "We couldn't go out because of the storm.", keyword: "PREVENTED", correct: ["The storm prevented us from going out."], hint: "because of X = X prevented us from", explain: "'Prevent someone from doing' replaces 'couldn't because of'." },
      { source: "He said 'I will help you tomorrow.'", keyword: "WOULD", correct: ["He said he would help me the following day."], hint: "Change to reported speech", explain: "Direct → Reported: will→would, tomorrow→the following day, you→me." },
      { source: "It's possible that she forgot.", keyword: "MAY", correct: ["She may have forgotten."], hint: "It's possible + past = may have + past participle", explain: "'It's possible that X did' = 'X may have done'." },
      { source: "I'd prefer you didn't smoke here.", keyword: "RATHER", correct: ["I'd rather you didn't smoke here."], hint: "I'd prefer = I'd rather + subject + past simple", explain: "'Would rather + subject + past' for polite requests about others." },
      { source: "She speaks French and she speaks German.", keyword: "BOTH", correct: ["She speaks both French and German."], hint: "both...and for two positives", explain: "'Both X and Y' combines two items the subject does." },
      { source: "Nobody told me about the meeting.", keyword: "INFORMED", correct: ["I was not informed about the meeting.", "I wasn't informed about the meeting."], hint: "Nobody told me = I wasn't informed (passive)", explain: "'Nobody told me' → passive: 'I was not informed'." },
      { source: "Running is good for your health.", keyword: "DOES", correct: ["Running does you good.", "Running does good for your health."], hint: "'does good' = is beneficial", explain: "'Be good for' can be rewritten with 'does X good'." },
      { source: "I'm sure he didn't do it on purpose.", keyword: "CAN'T", correct: ["He can't have done it on purpose."], hint: "I'm sure X didn't = X can't have", explain: "'I'm sure not' → 'can't have + past participle' (strong deduction)." },
    ],
  },
  vocabTransform: {
    label: 'Vocabulary Rewrites',
    icon: '📝',
    level: 'B2',
    items: [
      { source: "The meeting has been postponed.", keyword: "PUT", correct: ["The meeting has been put off."], hint: "postponed = put off (phrasal verb)", explain: "'Postpone' = 'put off' in everyday English." },
      { source: "I can't stand this noise.", keyword: "BEAR", correct: ["I can't bear this noise."], hint: "can't stand = can't bear", explain: "'Stand' and 'bear' both mean 'tolerate'." },
      { source: "He resembles his father.", keyword: "TAKES", correct: ["He takes after his father."], hint: "resemble = take after", explain: "'Resemble' = 'take after' (phrasal verb for family likeness)." },
      { source: "The project failed because of poor planning.", keyword: "DUE", correct: ["The project failed due to poor planning."], hint: "because of = due to", explain: "'Due to' is a formal synonym for 'because of'." },
      { source: "She didn't expect to win.", keyword: "CAME", correct: ["The win came as a surprise to her.", "Winning came as a surprise to her."], hint: "didn't expect = came as a surprise", explain: "'Come as a surprise' = the opposite of expecting something." },
      { source: "He stopped smoking last year.", keyword: "GAVE", correct: ["He gave up smoking last year."], hint: "stopped = gave up", explain: "'Give up' is the phrasal verb for 'stop' (a habit)." },
      { source: "I really admire her determination.", keyword: "UP", correct: ["I really look up to her determination."], hint: "admire = look up to", explain: "'Look up to' = admire (someone or a quality)." },
      { source: "We need to reduce costs.", keyword: "CUT", correct: ["We need to cut down on costs.", "We need to cut costs."], hint: "reduce = cut down on", explain: "'Cut down on' = reduce (especially expenses/consumption)." },
      { source: "The event was called off.", keyword: "CANCELLED", correct: ["The event was cancelled."], hint: "called off = cancelled", explain: "'Call off' is the phrasal verb for 'cancel'." },
      { source: "She considered all the options carefully.", keyword: "WEIGHED", correct: ["She weighed up all the options carefully."], hint: "considered = weighed up", explain: "'Weigh up' = consider carefully before deciding." },
      { source: "The news spread quickly.", keyword: "GOT", correct: ["The news got around quickly.", "Word got around quickly."], hint: "spread = got around", explain: "'Get around' = spread (of news, information)." },
      { source: "I'll investigate the problem.", keyword: "LOOK", correct: ["I'll look into the problem."], hint: "investigate = look into", explain: "'Look into' = investigate or examine." },
    ],
  },
  linkers: {
    label: 'Linkers & Cohesion',
    icon: '🔗',
    level: 'B1–B2',
    items: [
      { source: "She was tired. She kept working.", keyword: "DESPITE", correct: ["Despite being tired, she kept working.", "She kept working despite being tired."], hint: "Despite + -ing = contrast", explain: "'Despite' + noun/-ing shows contrast between two facts." },
      { source: "He studied hard. He passed the exam.", keyword: "AS A RESULT", correct: ["He studied hard. As a result, he passed the exam."], hint: "'As a result' links cause → effect", explain: "'As a result' introduces a consequence of the previous statement." },
      { source: "The food was expensive. The service was terrible.", keyword: "NOT ONLY", correct: ["Not only was the food expensive, but the service was also terrible."], hint: "Not only...but also for emphasis", explain: "'Not only...but also' emphasizes that both things were bad." },
      { source: "I like pizza. I also like pasta.", keyword: "IN ADDITION", correct: ["I like pizza. In addition, I like pasta.", "In addition to pizza, I also like pasta."], hint: "'In addition' adds information", explain: "'In addition (to)' introduces extra supporting information." },
      { source: "He arrived late. He missed the beginning.", keyword: "CONSEQUENTLY", correct: ["He arrived late. Consequently, he missed the beginning."], hint: "'Consequently' = formal 'so'", explain: "'Consequently' is a formal connector showing result." },
      { source: "She didn't study. She failed.", keyword: "OWING TO", correct: ["Owing to not studying, she failed.", "She failed owing to a lack of studying."], hint: "'Owing to' + noun/-ing = cause", explain: "'Owing to' is a formal way to express cause." },
      { source: "He's rich. He's not happy.", keyword: "NEVERTHELESS", correct: ["He's rich. Nevertheless, he's not happy."], hint: "'Nevertheless' = formal 'but'", explain: "'Nevertheless' introduces a surprising contrast." },
      { source: "Study hard. Otherwise you'll fail.", keyword: "PROVIDED", correct: ["You'll pass provided you study hard.", "Provided you study hard, you'll pass."], hint: "'Provided' = on the condition that", explain: "'Provided/providing' introduces a necessary condition." },
      { source: "She can sing. She can also dance.", keyword: "MOREOVER", correct: ["She can sing. Moreover, she can dance."], hint: "'Moreover' = what's more (addition)", explain: "'Moreover' adds impressive extra information." },
      { source: "I'll go even if it rains.", keyword: "REGARDLESS", correct: ["I'll go regardless of the weather.", "Regardless of whether it rains, I'll go."], hint: "'Regardless of' = it doesn't matter", explain: "'Regardless of' means the decision won't change." },
      { source: "He left early so that he wouldn't be late.", keyword: "IN ORDER", correct: ["He left early in order not to be late.", "In order not to be late, he left early."], hint: "'In order (not) to' = purpose", explain: "'In order to' expresses purpose more formally than 'to'." },
      { source: "To summarize, the project was a success.", keyword: "ALL IN ALL", correct: ["All in all, the project was a success."], hint: "'All in all' = summary conclusion", explain: "'All in all' introduces a final summary or conclusion." },
    ],
  },
  sentenceTransform: {
    label: 'Sentence Transformations',
    icon: '🔀',
    level: 'B2–C1',
    items: [
      { source: "People believe he is innocent.", keyword: "BELIEVED", correct: ["He is believed to be innocent."], hint: "Impersonal passive: It is believed / He is believed to", explain: "'People believe X' → 'X is believed to be' (passive reporting)." },
      { source: "It was such a good film that I watched it twice.", keyword: "SO", correct: ["The film was so good that I watched it twice."], hint: "such a + noun → so + adjective + that", explain: "'Such a good film' = 'so good that' — the emphasis shifts." },
      { source: "She said 'I didn't take it.'", keyword: "DENIED", correct: ["She denied taking it.", "She denied having taken it."], hint: "deny + -ing", explain: "'Say I didn't' → 'deny + gerund' in reported speech." },
      { source: "It's a pity I can't come to the party.", keyword: "WISH", correct: ["I wish I could come to the party."], hint: "It's a pity = I wish + past/could", explain: "'It's a pity + can't' → 'wish + could' (unreal present)." },
      { source: "They think the fire started accidentally.", keyword: "THOUGHT", correct: ["The fire is thought to have started accidentally."], hint: "Passive reporting structure", explain: "'They think X did' → 'X is thought to have done'." },
      { source: "I haven't eaten since breakfast.", keyword: "LAST", correct: ["The last time I ate was at breakfast.", "I last ate at breakfast."], hint: "since X = the last time was X", explain: "'Haven't done since X' = 'the last time was X'." },
      { source: "She is the fastest runner in the school.", keyword: "FASTER", correct: ["She runs faster than anyone else in the school.", "Nobody in the school runs faster than her."], hint: "Superlative → comparative + than anyone", explain: "'The fastest' = 'faster than anyone else'." },
      { source: "I couldn't sleep because the music was so loud.", keyword: "KEPT", correct: ["The loud music kept me awake.", "The music kept me from sleeping."], hint: "'keep someone awake/from sleeping'", explain: "'Keep + object + adj/from -ing' shows cause." },
      { source: "He insisted on paying for dinner.", keyword: "WOULDN'T", correct: ["He wouldn't let me pay for dinner.", "He wouldn't let anyone else pay for dinner."], hint: "insisted on = wouldn't let others", explain: "'Insisted on doing' can become 'wouldn't let X do otherwise'." },
      { source: "You should have told me earlier.", keyword: "WHY", correct: ["Why didn't you tell me earlier?"], hint: "Should have = rhetorical 'why didn't you'", explain: "'You should have' often implies a reproachful 'why didn't you?'" },
    ],
  },
};
