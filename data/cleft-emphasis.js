/**
 * Cleft Sentences & Focus Structures Data (C1)
 * Categories: Identify type, Choose the correct cleft, Transform to add emphasis
 */

export const CATEGORIES = {
  identify: {
    label: 'Which type?',
    icon: '🎯',
    options: ['It-cleft', 'Wh-cleft', 'All-cleft', 'Reverse wh-cleft'],
    items: [
      { sentence: 'It was Maria who organised the entire event.', correct: 'It-cleft', explain: '"It + be + focused element + who/that..." — emphasises the doer (Maria).' },
      { sentence: 'What I need is a good night\'s sleep.', correct: 'Wh-cleft', explain: '"What + subject + verb + is..." — emphasises the thing needed.' },
      { sentence: 'All I want is a cup of coffee.', correct: 'All-cleft', explain: '"All + subject + verb + is..." — emphasises that it\'s ONLY this, nothing more.' },
      { sentence: 'A good night\'s sleep is what I need.', correct: 'Reverse wh-cleft', explain: 'Focused element first + "is what..." — reverses the wh-cleft for different emphasis.' },
      { sentence: 'It was in 2019 that the company went public.', correct: 'It-cleft', explain: '"It + was + time expression + that..." — emphasises WHEN something happened.' },
      { sentence: 'What bothers me is his complete lack of effort.', correct: 'Wh-cleft', explain: '"What + verb + is..." — emphasises the cause of the feeling.' },
      { sentence: 'All they did was complain about the food.', correct: 'All-cleft', explain: '"All + subject + did + was..." — emphasises the ONLY action taken (often critical).' },
      { sentence: 'The lack of communication is what caused the problem.', correct: 'Reverse wh-cleft', explain: 'Focused element first + "is what..." — useful in arguments to pinpoint a cause.' },
    ]
  },
  complete: {
    label: 'Complete',
    icon: '✏️',
    options: ['It was John who', 'What we need is', 'All she did was', 'It is the cost that'],
    items: [
      { sentence: '___ broke the window, not Tom.', correct: 'It was John who', explain: 'It-cleft: emphasises WHO did it (John, contrasted with Tom).' },
      { sentence: '___ better communication between departments.', correct: 'What we need is', explain: 'Wh-cleft: "What + subject + verb + is..." emphasises the solution needed.' },
      { sentence: '___ stare at her phone during the entire meeting.', correct: 'All she did was', explain: 'All-cleft: emphasises the ONLY thing done (critical tone).' },
      { sentence: '___ concerns most investors, not the timeline.', correct: 'It is the cost that', explain: 'It-cleft: emphasises WHAT concerns them (present tense for current situation).' },
      { sentence: '___ recommended the restaurant, so blame him.', correct: 'It was John who', explain: 'It-cleft: assigns responsibility/blame to a specific person.' },
      { sentence: '___ a clear strategy going forward.', correct: 'What we need is', explain: 'Wh-cleft: highlights the requirement/solution.' },
      { sentence: '___ apologise without offering any explanation.', correct: 'All she did was', explain: 'All-cleft: the "only thing" she did, implying it wasn\'t enough.' },
      { sentence: '___ worries me about the plan, not the feasibility.', correct: 'It is the cost that', explain: 'It-cleft: isolates the specific concern from other possible objections.' },
    ]
  },
  transform: {
    label: 'Add emphasis',
    icon: '💡',
    options: [
      'It was the noise that kept me awake.',
      'What she really wants is recognition.',
      'All I ask is that you listen.',
      'It was in Paris that they first met.'
    ],
    items: [
      { sentence: 'The noise kept me awake. (It-cleft: emphasise "the noise")', correct: 'It was the noise that kept me awake.', explain: 'Move "the noise" into focus position: It + was + focus + that + rest.' },
      { sentence: 'She really wants recognition. (Wh-cleft: emphasise "recognition")', correct: 'What she really wants is recognition.', explain: '"What + subject + verb + is + focused element" — puts the desire in end-focus.' },
      { sentence: 'I only ask that you listen. (All-cleft: emphasise simplicity of request)', correct: 'All I ask is that you listen.', explain: '"All + subject + verb + is + minimal request" — stresses how little is being asked.' },
      { sentence: 'They first met in Paris. (It-cleft: emphasise "in Paris")', correct: 'It was in Paris that they first met.', explain: 'Move the place into focus: It + was + place + that + event.' },
    ]
  }
};
