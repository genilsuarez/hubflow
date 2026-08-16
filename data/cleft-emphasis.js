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
      { sentence: 'What bothers me is his complete lack of effort.', correct: 'Wh-cleft', explain: '"What + verb + is..." — emphasises the cause of the feeling.' },
      { sentence: 'All they did was complain about the food.', correct: 'All-cleft', explain: '"All + subject + did + was..." — emphasises the ONLY action taken (often critical).' },
      { sentence: 'The lack of communication is what caused the problem.', correct: 'Reverse wh-cleft', explain: 'Focused element first + "is what..." — useful in arguments to pinpoint a cause.' },
      { sentence: 'It was the manager who approved the budget.', correct: 'It-cleft', explain: '"It + be + foco + who/that" → It-cleft.' },
      { sentence: 'It is trust that holds a team together.', correct: 'It-cleft', explain: '"It is + foco + that" → It-cleft en presente.' },
      { sentence: 'What surprised everyone was the final score.', correct: 'Wh-cleft', explain: '"What + clause + be" → Wh-cleft.' }
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
      { sentence: '___ a clear strategy going forward.', correct: 'What we need is', explain: 'Wh-cleft: highlights the requirement/solution.' },
      { sentence: '___ apologise without offering any explanation.', correct: 'All she did was', explain: 'All-cleft: the "only thing" she did, implying it wasn\'t enough.' },
      { sentence: '___ worries me about the plan, not the feasibility.', correct: 'It is the cost that', explain: 'It-cleft: isolates the specific concern from other possible objections.' },
      { sentence: '___ suggested the idea in the first place.', correct: 'It was John who', explain: 'It-cleft: puts the person in focus.' },
      { sentence: '___ signed the contract, not the director.', correct: 'It was John who', explain: 'It-cleft: contrasts who did it with who did not.' },
      { sentence: '___ nod and say nothing.', correct: 'All she did was', explain: 'All-cleft: reduces the action to one single thing.' }
    ]
  },
  transform: {
    label: 'Add emphasis',
    icon: '💡',
    options: [
      'It was the noise that kept me awake.',
      'What she really wants is recognition.',
      'All I ask is that you listen.',
      'It was in Paris that they first met.',
      'What they need is more time.',
      'All he wanted was an apology.', 'It was the rain that ruined the picnic.', 'What we want is honesty.', 'All he said was sorry.', 'It was on Sunday that they arrived.'],
    items: [
      { sentence: 'The noise kept me awake. (It-cleft: emphasise "the noise")', correct: 'It was the noise that kept me awake.', explain: 'Move "the noise" into focus position: It + was + focus + that + rest.' },
      { sentence: 'She really wants recognition. (Wh-cleft: emphasise "recognition")', correct: 'What she really wants is recognition.', explain: '"What + subject + verb + is + focused element" — puts the desire in end-focus.' },
      { sentence: 'I only ask that you listen. (All-cleft: emphasise simplicity of request)', correct: 'All I ask is that you listen.', explain: '"All + subject + verb + is + minimal request" — stresses how little is being asked.' },
      { sentence: 'They need more time. (Wh-cleft: emphasise "more time")', correct: 'What they need is more time.', explain: '"What + subject + verb + is" puts the object in focus.' },
      { sentence: 'He only wanted an apology. (All-cleft: emphasise the single thing wanted)', correct: 'All he wanted was an apology.', explain: '"All + subject + verb + was" reduces the request to one single thing.' },
      { sentence: 'They first met in Paris. (It-cleft: emphasise "in Paris")', correct: 'It was in Paris that they first met.', explain: 'Move the place into focus: It + was + place + that + event.' },
      { sentence: 'The rain ruined the picnic. (It-cleft: emphasise "the rain")', correct: 'It was the rain that ruined the picnic.', explain: 'The subject moves into focus: It + was + subject + that.' },
      { sentence: 'We want honesty. (Wh-cleft: emphasise "honesty")', correct: 'What we want is honesty.', explain: '"What + subject + verb + is" puts the object in focus.' },
      { sentence: 'He only said sorry. (All-cleft: emphasise how little he said)', correct: 'All he said was sorry.', explain: '"All + subject + verb + was" marks that there was nothing else.' },
      { sentence: 'They arrived on Sunday. (It-cleft: emphasise "on Sunday")', correct: 'It was on Sunday that they arrived.', explain: 'The time expression moves into focus.' }
    ]
  },
  emphaticDo: {
    label: 'Emphatic Do',
    icon: '❗',
    options: ['do', 'does', 'did'],
    items: [
      { sentence: 'I ___ love this song!', correct: 'do', explain: 'Emphatic "do" before the base verb stresses a true present feeling.' },
      { sentence: 'She ___ call you — I heard her on the phone.', correct: 'did', explain: 'Emphatic "did" + base verb insists a past action really happened.' },
      { sentence: "He ___ know the answer, he's just too shy to say it.", correct: 'does', explain: 'Emphatic "does" (3rd person) insists something is true despite appearances.' },
      { sentence: "We ___ try to warn you, but you wouldn't listen.", correct: 'did', explain: 'Emphatic "did" insists the action was genuinely attempted.' },
      { sentence: "I ___ want to help, I just don't have time.", correct: 'do', explain: 'Emphatic "do" contradicts an assumption that you don\'t want to help.' },
      { sentence: 'She ___ enjoy the film, even though she said she didn\'t.', correct: 'did', explain: 'Emphatic "did" contradicts what she claimed.' },
      { sentence: 'They ___ care about the result, despite acting indifferent.', correct: 'do', explain: 'Emphatic "do" insists on a true feeling that contrasts with appearances.' },
      { sentence: 'He ___ finish the report — I saw it on his desk.', correct: 'did', explain: 'Emphatic "did" confirms the action really took place.' },
      { sentence: 'It ___ make sense once you think about it.', correct: 'does', explain: 'Emphatic "does" insists something is true, against initial doubt.' },
      { sentence: 'I ___ believe you, honestly.', correct: 'do', explain: 'Emphatic "do" reinforces a sincere present statement.' }
    ]
  }
};
