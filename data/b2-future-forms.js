export const CATEGORIES = {
  willVsGoingTo: {
    label: 'Will vs Going To',
    icon: '🔮',
    options: ['will help', "'m going to visit"],
    items: [
      { sentence: "I think it ___ rain tomorrow. (a prediction/opinion)", correct: 'will', explain: "'Will' is used for predictions based on opinion.", options: ['will', "'m going to"] },
      { sentence: "Look at those clouds! It ___ rain. (evidence now)", correct: "'s going to", explain: "'Going to' is used for predictions based on present evidence.", options: ["'s going to", 'will'] },
      { sentence: "I ___ visit my grandma next weekend. (already decided)", correct: "'m going to", explain: "'Going to' is used for planned intentions.", options: ["'m going to", 'will'] },
      { sentence: "The phone is ringing — I ___ answer it. (decided now)", correct: 'will', explain: "'Will' is used for spontaneous decisions made at the moment of speaking.", options: ['will', "'m going to"] },
      { sentence: "We ___ get married in June. (already planned)", correct: "'re going to", explain: "'Going to' is used for planned intentions.", options: ["'re going to", 'will'] },
      { sentence: "Don't worry, I ___ help you with that. (offer)", correct: 'will', explain: "'Will' is used for offers made at the moment of speaking.", options: ['will', "'m going to"] },
      { sentence: "She ___ study medicine next year. (firm plan)", correct: "'s going to", explain: "'Going to' is used for planned intentions.", options: ["'s going to", 'will'] },
      { sentence: "I promise I ___ call you tonight.", correct: 'will', explain: "'Will' is used for promises.", options: ['will', "'m going to"] },
      { sentence: "Careful, that glass ___ fall! (evidence right now)", correct: "'s going to", explain: "'Going to' is used for predictions based on present evidence.", options: ["'s going to", 'will'] },
      { sentence: "I ___ probably stay home this weekend. (prediction/opinion)", correct: 'will', explain: "'Will' is used for predictions based on opinion.", options: ['will', "'m going to"] },
    ]
  },
  presentContinuousFuture: {
    label: 'Present Continuous for Future',
    icon: '📅',
    options: ["'m meeting", 'will meet', "'m going to meet"],
    items: [
      { sentence: "I ___ my friends tonight. (fixed arrangement)", correct: "'m meeting", explain: "Present continuous is used for fixed future arrangements with a specific time/place." },
      { sentence: "She ___ to London next Tuesday. (booked flight)", correct: "'s flying", explain: "Present continuous is used for fixed future arrangements.", options: ["'s flying", 'will fly', 'flies'] },
      { sentence: "We ___ dinner at 8pm tomorrow. (reservation made)", correct: "'re having", explain: "Present continuous is used for fixed future arrangements.", options: ["'re having", 'will have', 'have'] },
      { sentence: "He ___ the doctor at 10am. (appointment booked)", correct: "'s seeing", explain: "Present continuous is used for fixed future arrangements.", options: ["'s seeing", 'will see', 'sees'] },
      { sentence: "They ___ their new house this weekend. (planned move)", correct: "'re moving into", explain: "Present continuous is used for fixed future arrangements.", options: ["'re moving into", 'will move into', 'move into'] },
      { sentence: "I ___ a presentation on Friday. (scheduled)", correct: "'m giving", explain: "Present continuous is used for fixed future arrangements.", options: ["'m giving", 'will give', 'give'] },
      { sentence: "She ___ her exam results tomorrow. (scheduled release)", correct: "'s getting", explain: "Present continuous is used for fixed future arrangements.", options: ["'s getting", 'will get', 'gets'] },
      { sentence: "We ___ the train at 6pm. (booked ticket)", correct: "'re catching", explain: "Present continuous is used for fixed future arrangements.", options: ["'re catching", 'will catch', 'catch'] },
      { sentence: "He ___ his parents this Christmas. (planned visit)", correct: "'s visiting", explain: "Present continuous is used for fixed future arrangements.", options: ["'s visiting", 'will visit', 'visits'] },
      { sentence: "I ___ the report by email tonight. (planned action)", correct: "'m sending", explain: "Present continuous is used for fixed future arrangements.", options: ["'m sending", 'will send', 'send'] },
    ]
  },
  futureContinuous: {
    label: 'Future Continuous',
    icon: '⏳',
    options: ['will be working', 'will work', 'is working'],
    items: [
      { sentence: "This time tomorrow, I ___ on my project.", correct: 'will be working', explain: "Future continuous describes an action in progress at a specific future time." },
      { sentence: "At 8pm tonight, she ___ dinner.", correct: 'will be cooking', explain: "Future continuous: will be + verb-ing.", options: ['will be cooking', 'will cook', 'is cooking'] },
      { sentence: "This time next week, we ___ on the beach.", correct: 'will be relaxing', explain: "Future continuous: will be + verb-ing.", options: ['will be relaxing', 'will relax', 'are relaxing'] },
      { sentence: "At noon tomorrow, he ___ his presentation.", correct: 'will be giving', explain: "Future continuous: will be + verb-ing.", options: ['will be giving', 'will give', 'is giving'] },
      { sentence: "By this time next year, I ___ in a new city.", correct: 'will be living', explain: "Future continuous: will be + verb-ing.", options: ['will be living', 'will live', 'am living'] },
      { sentence: "This time tomorrow, they ___ on the plane.", correct: 'will be flying', explain: "Future continuous: will be + verb-ing.", options: ['will be flying', 'will fly', 'are flying'] },
      { sentence: "At 9am, she ___ her classes.", correct: 'will be teaching', explain: "Future continuous: will be + verb-ing.", options: ['will be teaching', 'will teach', 'is teaching'] },
      { sentence: "This time next month, we ___ in Paris.", correct: 'will be traveling', explain: "Future continuous: will be + verb-ing.", options: ['will be traveling', 'will travel', 'are traveling'] },
      { sentence: "At midnight, he ___ still ___.", correct: 'will be studying', explain: "Future continuous: will be + verb-ing.", options: ['will be studying', 'will study', 'is studying'] },
      { sentence: "This time tomorrow, I ___ my exam.", correct: 'will be taking', explain: "Future continuous: will be + verb-ing.", options: ['will be taking', 'will take', 'am taking'] },
    ]
  },
  futurePerfect: {
    label: 'Future Perfect',
    icon: '✅',
    options: ['will have finished', 'will finish', 'will be finishing'],
    items: [
      { sentence: "By 6pm, I ___ my homework.", correct: 'will have finished', explain: "Future perfect: will have + past participle, for actions completed before a future time." },
      { sentence: "By next year, she ___ university.", correct: 'will have graduated', explain: "Future perfect: will have + past participle.", options: ['will have graduated', 'will graduate', 'will be graduating'] },
      { sentence: "By the time you arrive, we ___ dinner.", correct: 'will have cooked', explain: "Future perfect: will have + past participle.", options: ['will have cooked', 'will cook', 'will be cooking'] },
      { sentence: "By 2030, they ___ the new bridge.", correct: 'will have built', explain: "Future perfect: will have + past participle.", options: ['will have built', 'will build', 'will be building'] },
      { sentence: "By the end of the year, he ___ his book.", correct: 'will have written', explain: "Future perfect: will have + past participle.", options: ['will have written', 'will write', 'will be writing'] },
      { sentence: "By next month, I ___ this project.", correct: 'will have completed', explain: "Future perfect: will have + past participle.", options: ['will have completed', 'will complete', 'will be completing'] },
      { sentence: "By 9pm, the movie ___.", correct: 'will have ended', explain: "Future perfect: will have + past participle.", options: ['will have ended', 'will end', 'will be ending'] },
      { sentence: "By the time we get there, she ___.", correct: 'will have left', explain: "Future perfect: will have + past participle.", options: ['will have left', 'will leave', 'will be leaving'] },
      { sentence: "By 2025, he ___ his degree.", correct: 'will have finished', explain: "Future perfect: will have + past participle.", options: ['will have finished', 'will finish', 'will be finishing'] },
      { sentence: "By the end of this year, we ___ five countries.", correct: 'will have visited', explain: "Future perfect: will have + past participle.", options: ['will have visited', 'will visit', 'will be visiting'] },
    ]
  }
};
