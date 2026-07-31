export const CATEGORIES = {
  affirmativeCommands: {
    label: 'Affirmative Commands',
    icon: '☝️',
    options: ['Open', 'Opens', 'Opening'],
    items: [
      { sentence: '___ the door, please.', correct: 'Open', explain: 'Imperatives use the base form of the verb, with no subject.' },
      { sentence: '___ your homework now.', correct: 'Do', explain: 'Imperatives use the base form of the verb.', options: ['Do', 'Does', 'Doing'] },
      { sentence: '___ down, please.', correct: 'Sit', explain: 'Imperatives use the base form of the verb.', options: ['Sit', 'Sits', 'Sitting'] },
      { sentence: '___ your books, please.', correct: 'Bring', explain: 'Imperatives use the base form of the verb.', options: ['Bring', 'Brings', 'Brought'] },
      { sentence: '___ quiet, please.', correct: 'Be', explain: "'Be' is the base form used in imperatives with 'to be'.", options: ['Be', 'Is', 'Being'] },
      { sentence: '___ your hands before eating.', correct: 'Wash', explain: 'Imperatives use the base form of the verb.', options: ['Wash', 'Washes', 'Washing'] },
      { sentence: '___ to the board.', correct: 'Look', explain: 'Imperatives use the base form of the verb.', options: ['Look', 'Looks', 'Looking'] },
      { sentence: '___ your name on the paper.', correct: 'Write', explain: 'Imperatives use the base form of the verb.', options: ['Write', 'Writes', 'Wrote'] },
      { sentence: '___ your seatbelt.', correct: 'Wear', explain: 'Imperatives use the base form of the verb.', options: ['Wear', 'Wears', 'Wearing'] },
      { sentence: '___ the window, please.', correct: 'Close', explain: 'Imperatives use the base form of the verb.', options: ['Close', 'Closes', 'Closing'] },
    ]
  },
  negativeCommands: {
    label: 'Negative Commands',
    icon: '🙅',
    options: ["Don't run", 'Not run', "Doesn't run"],
    items: [
      { sentence: '___ in the hallway.', correct: "Don't run", explain: "Negative imperatives use 'Don't' + base verb." },
      { sentence: '___ that, please.', correct: "Don't touch", explain: "Negative imperatives use 'Don't' + base verb.", options: ["Don't touch", 'Not touch', "Doesn't touch"] },
      { sentence: '___ so much noise.', correct: "Don't make", explain: "Negative imperatives use 'Don't' + base verb.", options: ["Don't make", "Doesn't make", "No make"] },
      { sentence: '___ late for class.', correct: "Don't be", explain: "'Don't be' is used with adjectives in negative imperatives.", options: ["Don't be", "Not be", "Doesn't be"] },
      { sentence: '___ your phone during the exam.', correct: "Don't use", explain: "Negative imperatives use 'Don't' + base verb.", options: ["Don't use", "Doesn't use", "No use"] },
      { sentence: '___ your homework at school.', correct: "Don't forget", explain: "Negative imperatives use 'Don't' + base verb.", options: ["Don't forget", "Doesn't forget", "Not forget"] },
      { sentence: '___ afraid.', correct: "Don't be", explain: "'Don't be' is used with adjectives in negative imperatives.", options: ["Don't be", "Not be", "Aren't"] },
      { sentence: '___ in class.', correct: "Don't eat", explain: "Negative imperatives use 'Don't' + base verb.", options: ["Don't eat", "Doesn't eat", "No eat"] },
      { sentence: '___ to me like that.', correct: "Don't talk", explain: "Negative imperatives use 'Don't' + base verb.", options: ["Don't talk", "Doesn't talk", "Not talk"] },
      { sentence: '___ the plants, please.', correct: "Don't water", explain: "Negative imperatives use 'Don't' + base verb.", options: ["Don't water", "Doesn't water", "No water"] },
    ]
  },
  pleaseRequests: {
    label: 'Polite Requests with Please',
    icon: '🙏',
    options: ['Please sit down', 'Sit down please only', 'Please to sit down'],
    items: [
      { sentence: '___ down.', correct: 'Please sit', explain: "'Please' + imperative makes a request more polite.", options: ['Please sit', 'Please sits', 'Please to sit'] },
      { sentence: '___ the door, please.', correct: 'Close', explain: "'Please' can go at the start or end of an imperative.", options: ['Close', 'Closes', 'To close'] },
      { sentence: '___ wait a moment.', correct: 'Please', explain: "'Please' softens a command into a polite request.", options: ['Please', 'Pleases', 'Pleasing'] },
      { sentence: 'Turn off your phone, ___.', correct: 'please', explain: "'Please' at the end also makes a request polite.", options: ['please', 'pleases', 'pleasing'] },
      { sentence: '___ speak more slowly.', correct: 'Please', explain: "'Please' at the start of an imperative makes it polite.", options: ['Please', 'Pleases', 'You please'] },
      { sentence: '___ help me with this bag.', correct: 'Please', explain: "'Please' at the start of an imperative makes it polite.", options: ['Please', 'Pleases', 'Pleased'] },
      { sentence: 'Come in, ___.', correct: 'please', explain: "'Please' at the end of an imperative also works.", options: ['please', 'pleases', 'pleased'] },
      { sentence: '___ show me your ticket.', correct: 'Please', explain: "'Please' at the start of an imperative makes it polite.", options: ['Please', 'Pleases', 'You please'] },
      { sentence: 'Take a seat, ___.', correct: 'please', explain: "'Please' at the end of an imperative also works.", options: ['please', 'pleases', 'pleasing'] },
      { sentence: '___ be quiet during the film.', correct: 'Please', explain: "'Please' + 'be' softens the imperative.", options: ['Please', 'Pleases', 'Please to'] },
    ]
  },
  letsSuggestions: {
    label: "Let's Suggestions",
    icon: '🙌',
    options: ["Let's go", "Let's to go", "Lets go"],
    items: [
      { sentence: "___ to the park.", correct: "Let's go", explain: "'Let's' + base verb makes a suggestion for 'you and me'." },
      { sentence: "___ a movie tonight.", correct: "Let's watch", explain: "'Let's' + base verb makes a suggestion.", options: ["Let's watch", "Let's to watch", "Lets watching"] },
      { sentence: "___ dinner together.", correct: "Let's have", explain: "'Let's' + base verb makes a suggestion.", options: ["Let's have", "Let's to have", "Lets have"] },
      { sentence: "___ a break now.", correct: "Let's take", explain: "'Let's' + base verb makes a suggestion.", options: ["Let's take", "Let's to take", "Lets taking"] },
      { sentence: "___ home now.", correct: "Let's walk", explain: "'Let's' + base verb makes a suggestion.", options: ["Let's walk", "Let's to walk", "Lets walk"] },
      { sentence: "___ this exercise together.", correct: "Let's do", explain: "'Let's' + base verb makes a suggestion.", options: ["Let's do", "Let's does", "Lets do"] },
      { sentence: "___ some music.", correct: "Let's play", explain: "'Let's' + base verb makes a suggestion.", options: ["Let's play", "Let's to play", "Lets play"] },
      { sentence: "___ the bus today.", correct: "Let's take", explain: "'Let's' + base verb makes a suggestion.", options: ["Let's take", "Let's to take", "Lets take"] },
      { sentence: "___ our teacher a question.", correct: "Let's ask", explain: "'Let's' + base verb makes a suggestion.", options: ["Let's ask", "Let's to ask", "Lets ask"] },
      { sentence: "___ ready for the party.", correct: "Let's get", explain: "'Let's' + base verb makes a suggestion.", options: ["Let's get", "Let's to get", "Lets get"] },
    ]
  }
};
