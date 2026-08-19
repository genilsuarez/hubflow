// `studyCards` enseña la REGLA (con la trampa típica de un hispanohablante)
// antes de examinarla en Quiz. Antes Study mostraba las mismas 10 frases del
// Quiz con la respuesta detrás: "estudiar" era el examen disfrazado y la
// regla no se enunciaba en ningún lado. Mismo patrón que
// a1-plurals-possessives.js.
export const CATEGORIES = {
  affirmativeCommands: {
    label: 'Affirmative Commands',
    icon: '☝️',
    options: ['Open', 'Opens', 'Opening'],
    studyCards: [
      { front: 'Instructions to anyone', back: 'Base verb, no subject', detail: 'Close the door. · Sit down. · Bring your books.' },
      { front: "With 'to be'", back: "Be + adjective", detail: 'Be quiet. · Be careful. · Be nice. (never "Is quiet" or "Are quiet")' },
      { front: 'The subject is always the same', back: "(You) — implied, never written", detail: 'Open the door. = (You) open the door.' },
      { front: 'Common mistake', back: "Never -s or -ing on the verb", detail: '✗ Opens the door · ✗ Opening the door · ✓ Open the door' },
    ],
    items: [
      { sentence: '___ the door, please.', correct: 'Open', explain: 'Imperatives use the base form of the verb, with no subject.' },
      { sentence: '___ your homework now.', correct: 'Do', explain: 'Imperatives use the base form of the verb.', options: ['Do', 'Does', 'Doing'] },
      { sentence: '___ down, please.', correct: 'Sit', explain: 'Imperatives use the base form of the verb.', options: ['Sit', 'Sits', 'Sitting'] },
      { sentence: '___ your books, please.', correct: 'Bring', explain: 'Imperatives use the base form of the verb.', options: ['Bring', 'Brings', 'Brought'] },
      { sentence: '___ quiet, please.', correct: 'Be', explain: "'Be' is the base form used in imperatives with 'to be'.", options: ['Be', 'Is', 'Being'] },
      { sentence: '___ your hands before eating.', correct: 'Wash', explain: 'Imperatives use the base form of the verb.', options: ['Wash', 'Washes', 'Washing'] },
      { sentence: '___ at the board.', correct: 'Look', explain: 'Imperatives use the base form of the verb. "Look at" (not "look to") is how you direct someone\'s attention.', options: ['Look', 'Looks', 'Looking'] },
      { sentence: '___ your name on the paper.', correct: 'Write', explain: 'Imperatives use the base form of the verb.', options: ['Write', 'Writes', 'Wrote'] },
      { sentence: '___ your seatbelt.', correct: 'Wear', explain: 'Imperatives use the base form of the verb.', options: ['Wear', 'Wears', 'Wearing'] },
      { sentence: '___ the window, please.', correct: 'Close', explain: 'Imperatives use the base form of the verb.', options: ['Close', 'Closes', 'Closing'] },
    ]
  },
  negativeCommands: {
    label: 'Negative Commands',
    icon: '🙅',
    options: ["Don't run", 'Not run', "Doesn't run"],
    studyCards: [
      { front: 'Any verb', back: "Don't + base verb", detail: "Don't run. · Don't touch that. · Don't forget your keys." },
      { front: "With 'be' + adjective", back: "Don't be + adjective", detail: "Don't be late. · Don't be afraid. · Don't be rude." },
      { front: 'Common mistake', back: "Never 'Doesn't' or 'Not' alone", detail: "✗ Doesn't run · ✗ Not run · ✓ Don't run" },
      { front: 'Where it comes from', back: "Don't = Do not", detail: "'Don't' is the natural spoken form. 'Do not' sounds formal or serious: 'Do not enter.'" },
    ],
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
    studyCards: [
      { front: "'Please' at the start", back: 'Please + base verb', detail: 'Please sit down. · Please wait a moment. · Please speak more slowly.' },
      { front: "'Please' at the end", back: 'Imperative + , please.', detail: 'Sit down, please. · Come in, please. · Take a seat, please.' },
      { front: 'Same meaning, both positions', back: 'Start = end in politeness', detail: '"Please close the door" = "Close the door, please."' },
      { front: 'Common mistake', back: "Never 'please to' + verb", detail: "✗ Please to sit down · ✓ Please sit down" },
    ],
    items: [
      { sentence: 'You want to ask a stranger for directions politely. You say: "___ tell me how to get to the station?"', correct: 'Could you', explain: '"Could you...?" is the standard polite request form for strangers. "Please tell me" is also possible but "Could you" is more natural when asking for information.', options: ['Could you', 'Tell me', 'Please to'] },
      { sentence: 'You are in class. The teacher says: "___ open your books to page 12."', correct: 'Please', explain: '"Please" + imperative is the natural way to soften a classroom instruction.', options: ['Please', 'Could you please to', 'Would you to'] },
      { sentence: 'A friend asks you to turn down the music. They say: "Turn it down, ___."', correct: 'please', explain: '"Please" at the end softens a direct request. It is informal but polite.', options: ['please', 'if you please to', 'would you'] },
      { sentence: 'You are a customer in a café. You want another coffee. You say: "___ have another coffee?"', correct: 'Could I', explain: '"Could I have...?" is the standard polite request when asking for something for yourself.', options: ['Could I', 'Please I', 'I please'] },
      { sentence: 'A sign in a library reads: "___ keep your voice down."', correct: 'Please', explain: 'Signs use "Please" + imperative — short, neutral, and polite.', options: ['Please', 'Could you please to', 'Would you mind to'] },
      { sentence: 'You want someone to repeat what they said. You say: "___ repeat that?"', correct: 'Could you', explain: '"Could you repeat that?" is the standard polite request. Just the imperative ("Repeat that!") would sound rude.', options: ['Could you', 'Please to', 'You please'] },
      { sentence: 'Your boss sends an email: "___ submit the report by Friday."', correct: 'Please', explain: 'In formal written instructions, "Please" + imperative is the standard.', options: ['Please', 'Could you please to', 'Would please'] },
      { sentence: 'You want to pass someone in a corridor. You say: "___ excuse me?"', correct: 'Could you', explain: '"Could you excuse me?" is a polite way to ask someone to move aside.', options: ['Could you', 'Please to', 'Excuse please'] },
      { sentence: 'A waiter takes your order: "What ___ I get you?"', correct: 'can', explain: '"What can I get you?" is the standard service phrase. "Could" is also possible but "can" is more natural in this context.', options: ['can', 'please', 'would please'] },
      { sentence: 'You are asking for help in a shop. You say: "___ help me find this size?"', correct: 'Could you', explain: '"Could you help me...?" is the natural polite form when asking someone for assistance.', options: ['Could you', 'Please you', 'Help me please to'] },
    ]
  },
  letsSuggestions: {
    label: "Let's Suggestions",
    icon: '🙌',
    options: ["Let's go", "Let's to go", "Lets go"],
    studyCards: [
      { front: 'You + me, an idea', back: "Let's + base verb", detail: "Let's go. · Let's watch a movie. · Let's take a break." },
      { front: 'How to write it', back: "Let's = Let us", detail: "'Let's' always has an apostrophe. 'Lets' (no apostrophe) is a different word — the verb 'let' with -s." },
      { front: 'Common mistake', back: "Never 'Let's to' + verb", detail: "✗ Let's to go · ✓ Let's go (same rule as other imperatives: base verb, no 'to')" },
      { front: 'Who it includes', back: 'Speaker + listener(s)', detail: "\"Let's go\" means you and I go together — different from \"Go\" (only you)." },
    ],
    items: [
      { sentence: 'You want to suggest going to the cinema together. You say: "___"', correct: "Let's go to the cinema.", explain: "'Let's' includes the speaker — it's a shared suggestion, not a command.", options: ["Let's go to the cinema.", "Go to the cinema.", "Let's to go to the cinema."] },
      { sentence: 'You want to suggest NOT going out tonight. You say: "___"', correct: "Let's not go out tonight.", explain: "The negative form is 'Let's not' + base verb — never 'Don't let's' in standard English.", options: ["Let's not go out tonight.", "Let's don't go out tonight.", "Not let's go out."] },
      { sentence: '"Let\'s take a break." — Who does this include?', correct: 'The speaker and the listener(s)', explain: "'Let's' = Let us. It always includes the speaker. 'Take a break!' (no Let's) would only mean the listener.", options: ['The speaker and the listener(s)', 'Only the listener', 'Only the speaker'] },
      { sentence: '"___ open the window — it\'s hot in here." You want to include yourself in the action.', correct: "Let's", explain: "'Let's' includes you and the other person. 'Please open' is a request to someone else alone.", options: ["Let's", "Please", "Don't"] },
      { sentence: '"She ___ her daughter stay up late on weekends." (She gives permission.)', correct: 'lets', explain: "'Lets' (no apostrophe, 3rd person -s) = allows. Completely different from 'Let's' (the suggestion).", options: ['lets', "let's", 'let'] },
      { sentence: 'Your friend says "Let\'s go for a walk." You agree. You reply: "___"', correct: "OK, let's!", explain: "'OK, let's!' is the natural short agreement. The verb is omitted after 'let's' in the response.", options: ["OK, let's!", "OK, let's to!", "OK, lets!"] },
      { sentence: 'You want to suggest having dinner together, more formally. You say: "___"', correct: "Shall we have dinner together?", explain: "'Shall we...?' is a more formal equivalent of 'Let's...?' — both make inclusive suggestions.", options: ["Shall we have dinner together?", "Let's to have dinner together.", "We shall have dinner?"] },
      { sentence: '"___ forget about the past and focus on the future." (Suggestion not to do something.)', correct: "Let's", explain: "'Let's forget...' is a suggestion. Followed immediately by a base verb — here 'forget'.", options: ["Let's", "Don't let's", "Let's to"] },
      { sentence: '"The teacher ___ the students leave early." (The teacher gives permission.)', correct: 'lets', explain: "'Lets' (no apostrophe) = allows/permits. This is the verb 'let' + -s for 3rd person. Not a suggestion.", options: ['lets', "let's", 'let us'] },
      { sentence: 'You want to suggest taking a taxi instead of walking. "___"', correct: "Let's take a taxi.", explain: "'Let's' + base verb is the standard form for inclusive suggestions.", options: ["Let's take a taxi.", "Let's to take a taxi.", "Lets take a taxi."] },
    ]
  }
};
