// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
export const CATEGORIES = {
  beContractions: {
    label: 'Be Contractions',
    icon: '🔗',
    options: ["I'm", "you're", "she's"],
    studyCards: [
      { front: 'I am → I\'m · you are → you\'re · he/she/it is → he\'s / she\'s / it\'s', back: 'Sujeto + am/is/are → contraction', detail: 'I\'m a student. · She\'s tired. · It\'s raining. (pronombre + apóstrofe + forma corta)' },
      { front: 'we are → we\'re · they are → they\'re', back: 'Plurales y grupos', detail: '"Tom and I" = we → we\'re. "Sarah and Ben" = they → they\'re.' },
      { front: 'Cuándo NO contraer', back: 'Al final de frase, siempre forma larga', detail: '"Yes, I am." (no "Yes, I\'m.") · "Yes, she is." (no "Yes, she\'s.")' },
    ],
    items: [
      { sentence: 'My name is Alex. ___ a student.', correct: "I'm", explain: "I'm is short for 'I am'. Alex is speaking about himself.", options: ["I'm", "you're", "he's"] },
      { sentence: 'This is my sister. ___ very kind.', correct: "she's", explain: "She's is short for 'she is'.", options: ["she's", "they're", "I'm"] },
      { sentence: 'My friend Mark lives in Toronto. ___ from Canada.', correct: "he's", explain: "He's is short for 'he is'.", options: ["he's", "we're", "I'm"] },
      { sentence: 'Tom and I are not at school today. ___ at home right now.', correct: "we're", explain: "We're is short for 'we are'. Tom and I = we.", options: ["we're", "he's", "I'm"] },
      { sentence: 'Look at Sarah and Ben! ___ ready for the trip.', correct: "they're", explain: "They're is short for 'they are'. Sarah and Ben = they.", options: ["they're", "she's", "you're"] },
      { sentence: '___ a nice day today.', correct: "it's", explain: "It's is short for 'it is'. We use 'it' for weather.", options: ["it's", "he's", "we're"] },
      { sentence: 'I ran five kilometers this morning. ___ tired after school.', correct: "I'm", explain: "I'm is short for 'I am'. The speaker is talking about themselves.", options: ["I'm", "he's", "they're"] },
      { sentence: 'Do you know the Johnsons? ___ my neighbors.', correct: "they're", explain: "They're is short for 'they are'. The Johnsons = they.", options: ["they're", "we're", "she's"] },
      { sentence: 'I speak for my whole team. ___ happy to meet you.', correct: "we're", explain: "We're is short for 'we are'. My team and I = we.", options: ["we're", "you're", "it's"] },
      { sentence: 'Hi! I just started at this company. ___ the new intern.', correct: "I'm", explain: "I'm is short for 'I am'.", options: ["I'm", "she's", "they're"] },
    ]
  },
  negativeContractions: {
    label: 'Negative Contractions',
    icon: '🚫',
    options: ["don't", "doesn't", "isn't"],
    studyCards: [
      { front: 'do not → don\'t · does not → doesn\'t', back: 'Negativo presente simple', detail: 'I don\'t like coffee. · She doesn\'t eat meat. (3ª persona → doesn\'t, nunca "don\'t")' },
      { front: 'is not → isn\'t · are not → aren\'t', back: 'Negativo to be', detail: 'It isn\'t raining. · They aren\'t at school.' },
      { front: 'have not → haven\'t · has not → hasn\'t', back: 'Negativo presente perfecto', detail: 'I haven\'t finished. · He hasn\'t finished. (3ª persona → hasn\'t)' },
    ],
    items: [
      { sentence: "I ___ like coffee.", correct: "don't", explain: "Don't is short for 'do not'.", options: ["don't", "doesn't", "isn't"] },
      { sentence: "She ___ like coffee.", correct: "doesn't", explain: "Doesn't is short for 'does not'.", options: ["don't", "doesn't", "aren't"] },
      { sentence: "It ___ raining today.", correct: "isn't", explain: "Isn't is short for 'is not'.", options: ["isn't", "aren't", "don't"] },
      { sentence: "They ___ at school today.", correct: "aren't", explain: "Aren't is short for 'are not'.", options: ["isn't", "aren't", "doesn't"] },
      { sentence: "I ___ finished my homework.", correct: "haven't", explain: "Haven't is short for 'have not'.", options: ["haven't", "hasn't", "don't"] },
      { sentence: "He ___ finished his homework.", correct: "hasn't", explain: "Hasn't is short for 'has not'.", options: ["haven't", "hasn't", "doesn't"] },
      { sentence: "We ___ go to school on Sunday.", correct: "don't", explain: "Don't is short for 'do not'.", options: ["don't", "doesn't", "isn't"] },
      { sentence: "You ___ need to worry.", correct: "don't", explain: "Don't is short for 'do not'.", options: ["don't", "doesn't", "aren't"] },
      { sentence: "My sister ___ eat meat.", correct: "doesn't", explain: "Doesn't is short for 'does not'.", options: ["don't", "doesn't", "isn't"] },
      { sentence: "The shops ___ open on Sunday.", correct: "aren't", explain: "Aren't is short for 'are not'.", options: ["isn't", "aren't", "don't"] },
    ]
  },
  mixedContractions: {
    label: 'Mixed Contractions',
    icon: '🔀',
    studyCards: [
      { front: 'I\'ve / she\'s / they\'ve (con participio)', back: 'have/has → experiencia o resultado reciente', detail: 'I\'ve got a new phone. · She\'s left. · They\'ve never been to Paris.' },
      { front: 'I\'ll / she\'ll / they\'ll', back: 'will → promesa, predicción o decisión futura', detail: 'I\'ll call you tomorrow. · She\'ll arrive at six.' },
      { front: 'Trampa: she\'s puede ser is o has', back: 'Mira lo que viene después', detail: '"She\'s happy" = she IS. · "She\'s finished" = she HAS. El participio pasado tras \'s indica has.' },
    ],
    items: [
      {
        sentence: "My phone broke yesterday, so ___ got a new one.",
        correct: "I've",
        explain: "I've is short for 'I have' — used here for a recent experience. I'll would mean a future action.",
        options: ["I've", "I'll", "I'm"]
      },
      {
        sentence: "Don't worry about the meeting. ___ call you tomorrow with all the details.",
        correct: "I'll",
        explain: "I'll is short for 'I will' — a promise about the future. I've would mean a past experience.",
        options: ["I'll", "I've", "I'm"]
      },
      {
        sentence: "Where is Emma? ___ already left the office.",
        correct: "she's",
        explain: "She's is short for 'she has' here (with a past participle). She'll would be a future promise.",
        options: ["she's", "she'll", "she'd"]
      },
      {
        sentence: "My colleague has the address. ___ arrive at six o'clock.",
        correct: "she'll",
        explain: "She'll is short for 'she will' — a future action. She's here would mean she has already arrived.",
        options: ["she'll", "she's", "she'd"]
      },
      {
        sentence: "The Garcias love exploring. ___ never been to Paris, but they want to go.",
        correct: "they've",
        explain: "They've is short for 'they have' — describing a life experience up to now. They'll is for future plans.",
        options: ["they've", "they'll", "they're"]
      },
      {
        sentence: "My parents are coming for the weekend. ___ visit us next week too.",
        correct: "they'll",
        explain: "They'll is short for 'they will' — a future visit. They've would mean they have already visited.",
        options: ["they'll", "they've", "they're"]
      },
      {
        sentence: "Our class has a test tomorrow. ___ got a lot of homework tonight.",
        correct: "we've",
        explain: "We've is short for 'we have' — describing the current situation. We'll is for what we will do.",
        options: ["we've", "we'll", "we're"]
      },
      {
        sentence: "This project is huge. ___ need more time to finish it.",
        correct: "we'll",
        explain: "We'll is short for 'we will' — predicting a future need. We've would mean we have already needed time.",
        options: ["we'll", "we've", "we're"]
      },
      {
        sentence: "Ask David — ___ finish the report soon.",
        correct: "he'll",
        explain: "He'll is short for 'he will' — a future action. He's here would mean he has already finished.",
        options: ["he'll", "he's", "he'd"]
      },
      {
        sentence: "Check the forecast — ___ be sunny tomorrow.",
        correct: "it'll",
        explain: "It'll is short for 'it will'. We use 'it' for weather predictions. It's would describe the weather now.",
        options: ["it'll", "it's", "it'd"]
      },
    ]
  }
};
