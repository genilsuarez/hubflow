export const CATEGORIES = {
  compoundNouns: {
    label: 'Compound Nouns',
    icon: '🧩',
    options: ['toothbrush', 'tooth brush', 'brushtooth'],
    items: [
      { sentence: 'I forgot to pack my ___.', correct: 'toothbrush', explain: "'Toothbrush' is a compound noun written as one word." },
      { sentence: 'She works as a ___ at the hospital.', correct: 'firefighter', explain: "'Firefighter' is a compound noun written as one word.", options: ['firefighter', 'fire fighter', 'fighterfire'] },
      { sentence: 'The ___ was full of interesting articles.', correct: 'newspaper', explain: "'Newspaper' is a compound noun written as one word.", options: ['newspaper', 'news paper', 'paper news'] },
      { sentence: 'He checked the ___ before leaving.', correct: 'weather forecast', explain: "'Weather forecast' is a compound noun written as two words.", options: ['weather forecast', 'weatherforecast', 'forecastweather'] },
      { sentence: 'The children played in the ___.', correct: 'playground', explain: "'Playground' is a compound noun written as one word.", options: ['playground', 'play ground', 'groundplay'] },
      { sentence: 'She bought a new ___ for the kitchen.', correct: 'dishwasher', explain: "'Dishwasher' is a compound noun written as one word.", options: ['dishwasher', 'dish washer', 'washerdish'] },
      { sentence: 'He drives to work on the ___.', correct: 'motorway', explain: "'Motorway' is a compound noun written as one word.", options: ['motorway', 'motor way', 'waymotor'] },
      { sentence: 'The ___ was very useful for the trip.', correct: 'guidebook', explain: "'Guidebook' is a compound noun written as one word.", options: ['guidebook', 'guide book', 'bookguide'] },
      { sentence: 'She has a great ___ at her new job.', correct: 'job title', explain: "'Job title' is a compound noun written as two words.", options: ['job title', 'jobtitle', 'titlejob'] },
      { sentence: 'They installed a new ___ in the office.', correct: 'air conditioner', explain: "'Air conditioner' is a compound noun written as two words.", options: ['air conditioner', 'airconditioner', 'conditionerair'] },
    ]
  },
  compoundAdjectives: {
    label: 'Compound Adjectives',
    icon: '🎨',
    options: ['well-known', 'wellknown', 'known-well'],
    items: [
      { sentence: 'She is a ___ actress.', correct: 'well-known', explain: "'Well-known' is a compound adjective, hyphenated before a noun." },
      { sentence: 'He gave a ___ speech.', correct: 'thought-provoking', explain: "'Thought-provoking' is a compound adjective, hyphenated before a noun.", options: ['thought-provoking', 'thoughtprovoking', 'provoking-thought'] },
      { sentence: 'It was a ___ decision.', correct: 'last-minute', explain: "'Last-minute' is a compound adjective, hyphenated before a noun.", options: ['last-minute', 'lastminute', 'minute-last'] },
      { sentence: 'They live in a ___ neighborhood.', correct: 'middle-class', explain: "'Middle-class' is a compound adjective, hyphenated before a noun.", options: ['middle-class', 'middleclass', 'class-middle'] },
      { sentence: 'She has a ___ attitude towards life.', correct: 'easy-going', explain: "'Easy-going' is a compound adjective, hyphenated before a noun.", options: ['easy-going', 'easygoing', 'going-easy'] },
      { sentence: 'It was a ___ effort by the whole team.', correct: 'well-organized', explain: "'Well-organized' is a compound adjective, hyphenated before a noun.", options: ['well-organized', 'wellorganized', 'organized-well'] },
      { sentence: 'He bought a ___ car.', correct: 'second-hand', explain: "'Second-hand' is a compound adjective, hyphenated before a noun.", options: ['second-hand', 'secondhand', 'hand-second'] },
      { sentence: 'She is a ___ professional.', correct: 'highly-skilled', explain: "'Highly-skilled' is a compound adjective, hyphenated before a noun.", options: ['highly-skilled', 'highlyskilled', 'skilled-highly'] },
      { sentence: 'It was a ___ meal.', correct: 'home-cooked', explain: "'Home-cooked' is a compound adjective, hyphenated before a noun.", options: ['home-cooked', 'homecooked', 'cooked-home'] },
      { sentence: 'He has a ___ personality.', correct: 'good-natured', explain: "'Good-natured' is a compound adjective, hyphenated before a noun.", options: ['good-natured', 'goodnatured', 'natured-good'] },
    ]
  },
  compoundVerbs: {
    label: 'Compound Verbs',
    icon: '⚡',
    options: ['babysit', 'baby sit', 'sitbaby'],
    items: [
      { sentence: 'She often ___ for her neighbors.', correct: 'babysits', explain: "'Babysit' is a compound verb written as one word.", options: ['babysits', 'baby sits', 'sitsbaby'] },
      { sentence: 'He needs to ___ his old computer.', correct: 'upgrade', explain: "'Upgrade' is a compound verb written as one word.", options: ['upgrade', 'up grade', 'gradeup'] },
      { sentence: 'They will ___ the new product next month.', correct: 'showcase', explain: "'Showcase' is a compound verb written as one word.", options: ['showcase', 'show case', 'caseshow'] },
      { sentence: 'She had to ___ the plan quickly.', correct: 'overhaul', explain: "'Overhaul' is a compound verb written as one word.", options: ['overhaul', 'over haul', 'haulover'] },
      { sentence: 'He will ___ the meeting for next week.', correct: 'reschedule', explain: "'Reschedule' is formed with the prefix re-, written as one word.", options: ['reschedule', 're schedule', 'schedulere'] },
      { sentence: 'They want to ___ the whole system.', correct: 'streamline', explain: "'Streamline' is a compound verb written as one word.", options: ['streamline', 'stream line', 'linestream'] },
      { sentence: 'She decided to ___ from her job.', correct: 'withdraw', explain: "'Withdraw' is a compound verb written as one word.", options: ['withdraw', 'with draw', 'drawwith'] },
      { sentence: 'He tends to ___ his abilities.', correct: 'overestimate', explain: "'Overestimate' is formed with the prefix over-, written as one word.", options: ['overestimate', 'over estimate', 'estimateover'] },
      { sentence: 'They will ___ the results tomorrow.', correct: 'double-check', explain: "'Double-check' is a compound verb, often hyphenated.", options: ['double-check', 'doublecheck', 'check-double'] },
      { sentence: 'She wants to ___ her old habits.', correct: 'outgrow', explain: "'Outgrow' is a compound verb written as one word.", options: ['outgrow', 'out grow', 'growout'] },
    ]
  },
  hyphenationRules: {
    label: 'Hyphenation Rules',
    icon: '➖',
    options: ['a well-known actor', 'the actor is well known', 'a well known actor'],
    items: [
      { sentence: 'She is ___. (before the noun, hyphenated)', correct: 'a well-known actor', explain: "Compound adjectives are hyphenated when placed before the noun." },
      { sentence: 'The actor ___. (after the verb, not hyphenated)', correct: 'is well known', explain: "Compound adjectives are usually not hyphenated after the verb 'be'.", options: ['is well known', 'is well-known', 'is wellknown'] },
      { sentence: 'He made a ___ decision. (before the noun)', correct: 'last-minute', explain: "Compound adjectives are hyphenated when placed before the noun.", options: ['last-minute', 'last minute', 'lastminute'] },
      { sentence: 'The decision was made ___. (after the verb)', correct: 'at the last minute', explain: "As a phrase after the verb, it isn't hyphenated as a compound adjective.", options: ['at the last minute', 'at the last-minute', 'at the lastminute'] },
      { sentence: 'This is a ___ book. (before the noun)', correct: 'thought-provoking', explain: "Compound adjectives are hyphenated when placed before the noun.", options: ['thought-provoking', 'thought provoking', 'thoughtprovoking'] },
      { sentence: 'The book is ___. (after the verb)', correct: 'thought provoking', explain: "After the verb 'be', it's often written without a hyphen.", options: ['thought provoking', 'thought-provoking', 'thoughtprovoking'] },
      { sentence: 'She bought a ___ car. (before the noun)', correct: 'second-hand', explain: "Compound adjectives are hyphenated when placed before the noun.", options: ['second-hand', 'second hand', 'secondhand'] },
      { sentence: 'The car is ___. (after the verb)', correct: 'second hand', explain: "As a description after 'be', 'second hand' is often written without a hyphen.", options: ['second hand', 'second-hand', 'secondhand'] },
      { sentence: 'It was a ___ effort. (before the noun)', correct: 'well-organized', explain: "Compound adjectives are hyphenated when placed before the noun.", options: ['well-organized', 'well organized', 'wellorganized'] },
      { sentence: 'The event was ___. (after the verb)', correct: 'well organized', explain: "After 'be', it's often written without a hyphen.", options: ['well organized', 'well-organized', 'wellorganized'] },
    ]
  }
};
