/**
 * Linking Words & Connectors Data — cohesive devices for contrast/addition and cause/result
 */

export const CATEGORIES = {
  contrastAddition: {
    label: 'Contrast & Addition',
    icon: '🔗',
    options: ['however', 'moreover', 'in addition', 'on the other hand', 'nevertheless'],
    items: [
      { sentence: 'The hotel was expensive. ___, it was worth every penny.', correct: 'however', explain: '"However" introduces a contrast with the previous sentence.' },
      { sentence: 'She studied hard for the exam. ___, she still failed.', correct: 'nevertheless', explain: '"Nevertheless" = despite the previous fact, a contrasting result still happens.' },
      { sentence: "The car is fast. ___, it's also very fuel-efficient.", correct: 'moreover', explain: '"Moreover" adds an extra, reinforcing point.' },
      { sentence: "I love the city's energy. ___, I find it exhausting sometimes.", correct: 'on the other hand', explain: '"On the other hand" presents a contrasting perspective on the same topic.' },
      { sentence: "He's a great cook. ___, he's a terrible cleaner.", correct: 'on the other hand', explain: '"On the other hand" contrasts two sides of the same person/topic.' },
      { sentence: 'The report was well-written. ___, it lacked concrete evidence.', correct: 'however', explain: '"However" signals a contrasting weakness.' },
      { sentence: "The house has a lovely garden. ___, it's close to the beach.", correct: 'in addition', explain: '"In addition" adds another positive point.' },
      { sentence: 'The team lost the match. ___, they played with great spirit.', correct: 'nevertheless', explain: '"Nevertheless" acknowledges the loss but adds a positive contrast.' },
      { sentence: 'The product is affordable. ___, it comes with a 2-year warranty.', correct: 'moreover', explain: '"Moreover" reinforces the positive point already made.' },
      { sentence: 'The gym has modern equipment. ___, membership is very affordable.', correct: 'in addition', explain: '"In addition" adds a second advantage.' },
    ]
  },
  causeResult: {
    label: 'Cause & Result',
    icon: '➡️',
    options: ['therefore', 'as a result', 'since', 'due to', 'consequently'],
    items: [
      { sentence: 'It rained heavily all night. ___, the streets were flooded by morning.', correct: 'as a result', explain: '"As a result" introduces the direct consequence of the rain.' },
      { sentence: '___ traffic was heavy, we arrived twenty minutes late.', correct: 'since', explain: '"Since" introduces a reason at the start of a sentence.' },
      { sentence: 'The flight was cancelled ___ bad weather.', correct: 'due to', explain: '"Due to" + noun phrase introduces the cause.' },
      { sentence: 'She missed too many classes. ___, she failed the course.', correct: 'consequently', explain: '"Consequently" formally introduces the result.' },
      { sentence: 'The company lost its biggest client. ___, profits fell sharply.', correct: 'as a result', explain: '"As a result" links the loss to its financial effect.' },
      { sentence: "He hadn't slept in two days; ___, he made several mistakes.", correct: 'therefore', explain: '"Therefore" introduces a logical consequence.' },
      { sentence: '___ the new policy, employees must clock in by 9am.', correct: 'due to', explain: '"Due to" + noun phrase introduces the reason for the rule.' },
      { sentence: 'Prices rose sharply. ___, many customers switched suppliers.', correct: 'consequently', explain: '"Consequently" formally introduces the outcome.' },
      { sentence: '___ she was the only qualified candidate, she got the job.', correct: 'since', explain: '"Since" gives the reason before the main clause.' },
      { sentence: 'The bridge was damaged; ___, traffic was diverted for weeks.', correct: 'therefore', explain: '"Therefore" introduces the logical result of the damage.' },
    ]
  },
  concessionPurpose: {
    label: 'Concession & Purpose',
    icon: '🎯',
    options: ['although', 'in order to', 'despite', 'so that', 'even though'],
    items: [
      { sentence: '___ it was raining, we went for a walk.', correct: 'although', explain: '"Although" introduces a concession — the rain did not stop them.' },
      { sentence: 'She studied hard ___ pass her exams.', correct: 'in order to', explain: '"In order to" expresses purpose — why she studied.' },
      { sentence: '___ the cold weather, they held the event outside.', correct: 'despite', explain: '"Despite" + noun phrase introduces a concession.' },
      { sentence: 'He whispered ___ not wake the baby.', correct: 'so that', explain: '"So that" introduces the intended result.' },
      { sentence: '___ he was tired, he kept working until midnight.', correct: 'even though', explain: '"Even though" is stronger than "although" — emphasizes the contrast.' },
      { sentence: 'She wore a coat ___ keep warm in the cold wind.', correct: 'in order to', explain: '"In order to" + infinitive gives the reason for an action.' },
      { sentence: '___ his best efforts, the project still failed.', correct: 'despite', explain: '"Despite" + noun phrase shows the effort did not prevent the outcome.' },
      { sentence: 'He turned off his phone ___ nobody could disturb him.', correct: 'so that', explain: '"So that" introduces the intended result of an action.' },
      { sentence: '___ she worked full-time, she still found time to volunteer.', correct: 'although', explain: '"Although" introduces a contrast between two facts.' },
      { sentence: 'They left early ___ avoid the rush-hour traffic.', correct: 'in order to', explain: '"In order to" expresses purpose — why they left early.' },
    ]
  }
};
