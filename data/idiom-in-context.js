/**
 * Idiom in Context Data — choose the correct idiom to complete a passage
 */

export const CATEGORIES = {
  everydayIdioms: {
    label: 'Everyday Idioms',
    icon: '🗯️',
    options: ['piece of cake', 'break the ice', 'under the weather', 'cost an arm and a leg', 'once in a blue moon', 'hit the sack', 'spill the beans', 'keep an eye on', 'call it a day', 'hit the books'],
    items: [
      { sentence: 'The exam was so easy, it was a ___.', correct: 'piece of cake', explain: '"A piece of cake" = something very easy.' },
      { sentence: 'I felt a bit ___ this morning, so I stayed home.', correct: 'under the weather', explain: '"Under the weather" = feeling slightly unwell.' },
      { sentence: 'That designer bag must have ___.', correct: 'cost an arm and a leg', explain: '"Cost an arm and a leg" = be very expensive.' },
      { sentence: 'He told a joke to ___ at the party.', correct: 'break the ice', explain: '"Break the ice" = start a conversation in an awkward situation.' },
      { sentence: 'We only see each other ___, maybe once a year.', correct: 'once in a blue moon', explain: '"Once in a blue moon" = very rarely.' },
      { sentence: "Don't worry about the test, it'll be a ___ for you.", correct: 'piece of cake', explain: '"A piece of cake" = something very easy.' },
      { sentence: "She's felt ___ ever since she caught that cold.", correct: 'under the weather', explain: '"Under the weather" = feeling slightly unwell.' },
      { sentence: 'Fixing that antique clock will ___.', correct: 'cost an arm and a leg', explain: '"Cost an arm and a leg" = be very expensive.' },
      { sentence: 'The host asked a fun question to ___.', correct: 'break the ice', explain: '"Break the ice" = ease tension in a new social situation.' },
      { sentence: "He visits his hometown ___, it's very rare.", correct: 'once in a blue moon', explain: '"Once in a blue moon" = very rarely.' },
      { sentence: "I'm exhausted, I think I'll ___ early tonight.", correct: 'hit the sack', explain: '"Hit the sack" = go to bed.' },
      { sentence: 'After the long trip, all he wanted to do was ___.', correct: 'hit the sack', explain: '"Hit the sack" = go to bed.' },
      { sentence: 'Come on, ___ — what happened at the party?', correct: 'spill the beans', explain: '"Spill the beans" = reveal a secret.' },
      { sentence: 'She accidentally ___ about the surprise party.', correct: 'spill the beans', explain: '"Spill the beans" = reveal a secret.' },
      { sentence: 'Could you ___ my bag while I get coffee?', correct: 'keep an eye on', explain: '"Keep an eye on" = watch or look after something.' },
      { sentence: 'Parents need to ___ young children near the pool.', correct: 'keep an eye on', explain: '"Keep an eye on" = watch or look after something.' },
      { sentence: "We've worked for ten hours, let's ___.", correct: 'call it a day', explain: '"Call it a day" = stop working for the day.' },
      { sentence: 'The team decided to ___ after finishing the report.', correct: 'call it a day', explain: '"Call it a day" = stop working for the day.' },
      { sentence: 'Exams start tomorrow, so I need to ___ tonight.', correct: 'hit the books', explain: '"Hit the books" = study hard.' },
      { sentence: 'Instead of going out, she decided to ___ for the test.', correct: 'hit the books', explain: '"Hit the books" = study hard.' },
    ]
  },
  businessFormalIdioms: {
    label: 'Business & Formal Idioms',
    icon: '💼',
    options: ['think outside the box', 'get the ball rolling', 'on the same page', 'back to the drawing board', 'raise the bar', 'touch base', 'cut corners', 'learn the ropes', 'keep in the loop', 'go the extra mile'],
    items: [
      { sentence: "Let's ___ and start the meeting.", correct: 'get the ball rolling', explain: '"Get the ball rolling" = start something in motion.' },
      { sentence: "The design failed, so it's ___ for the whole team.", correct: 'back to the drawing board', explain: '"Back to the drawing board" = starting the planning process over.' },
      { sentence: 'We need to ___ to solve this unusual problem.', correct: 'think outside the box', explain: '"Think outside the box" = think creatively, beyond conventional ideas.' },
      { sentence: "Before we proceed, let's make sure everyone is ___.", correct: 'on the same page', explain: '"On the same page" = in agreement, sharing the same understanding.' },
      { sentence: 'Their new product really managed to ___ in the industry.', correct: 'raise the bar', explain: '"Raise the bar" = set a new, higher standard.' },
      { sentence: 'After the client rejected the proposal, it was ___.', correct: 'back to the drawing board', explain: '"Back to the drawing board" = they had to start planning again.' },
      { sentence: 'The manager asked the team to ___ for fresh ideas.', correct: 'think outside the box', explain: '"Think outside the box" = think creatively.' },
      { sentence: "We're all ___ regarding the new deadline.", correct: 'on the same page', explain: '"On the same page" = everyone shares the same understanding.' },
      { sentence: "Let's ___ on this project — time is short.", correct: 'get the ball rolling', explain: '"Get the ball rolling" = start the process moving.' },
      { sentence: 'Their customer service continues to ___ for the whole sector.', correct: 'raise the bar', explain: '"Raise the bar" = set a higher standard for others to follow.' },
      { sentence: "Let's ___ next week to check on progress.", correct: 'touch base', explain: '"Touch base" = make brief contact to share an update.' },
      { sentence: 'I wanted to ___ before the deadline.', correct: 'touch base', explain: '"Touch base" = make brief contact to share an update.' },
      { sentence: 'The company got in trouble for trying to ___ on safety.', correct: 'cut corners', explain: '"Cut corners" = do something the cheapest or easiest way, often sacrificing quality.' },
      { sentence: "We can't ___ on quality control.", correct: 'cut corners', explain: '"Cut corners" = do something the cheapest or easiest way, often sacrificing quality.' },
      { sentence: 'It took her a few weeks to ___ in her new job.', correct: 'learn the ropes', explain: '"Learn the ropes" = learn how to do a new job or task.' },
      { sentence: 'New employees usually need time to ___.', correct: 'learn the ropes', explain: '"Learn the ropes" = learn how to do a new job or task.' },
      { sentence: "The manager promised to ___ throughout the process.", correct: 'keep in the loop', explain: '"Keep in the loop" = keep everyone informed.' },
      { sentence: "It's important to ___ during a big project.", correct: 'keep in the loop', explain: '"Keep in the loop" = keep everyone informed.' },
      { sentence: 'Great employees always ___ to satisfy customers.', correct: 'go the extra mile', explain: '"Go the extra mile" = make an extra effort beyond what is expected.' },
      { sentence: 'She always ___ to help her colleagues.', correct: 'go the extra mile', explain: '"Go the extra mile" = make an extra effort beyond what is expected.' },
    ]
  }
};
