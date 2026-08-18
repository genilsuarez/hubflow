export const CATEGORIES = {
  beContractions: {
    label: 'Be Contractions',
    icon: '🔗',
    options: ["I'm", "you're", "she's"],
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
  haveContractions: {
    label: 'Have Contractions',
    icon: '🎒',
    options: ["I've", "she's got", "we've"],
    items: [
      { sentence: "My phone broke yesterday, so ___ got a new one.", correct: "I've", explain: "I've is short for 'I have'. The sentence is in first person.", options: ["I've", "she's", "we've"] },
      { sentence: "My sister is very popular at school. ___ got two brothers and lots of friends.", correct: "she's got", explain: "She's got is short for 'she has got'. The subject is 'my sister' = she.", options: ["she's got", "I've got", "they've got"] },
      { sentence: "Our class has a test tomorrow. ___ got a lot of homework tonight.", correct: "we've", explain: "We've is short for 'we have'. Our class = we.", options: ["we've", "I've", "he's"] },
      { sentence: "My parents work really hard. ___ got a new car this year.", correct: "they've", explain: "They've is short for 'they have'. My parents = they.", options: ["they've", "she's", "I've"] },
      { sentence: "My uncle is very successful. ___ got a big house in the countryside.", correct: "he's got", explain: "He's got is short for 'he has got'. The subject is 'my uncle' = he.", options: ["he's got", "we've got", "I've got"] },
      { sentence: "That film is so good — ___ never seen anything like it.", correct: "I've", explain: "I've is short for 'I have'. The speaker is talking about their own experience.", options: ["I've", "she's", "he's"] },
      { sentence: "Where is Emma? ___ already left the office.", correct: "she's", explain: "She's is short for 'she has' (used with a past participle). Emma = she.", options: ["she's", "I've", "we've"] },
      { sentence: "The deadline was yesterday. ___ finished the project just in time.", correct: "we've", explain: "We've is short for 'we have'. The team = we.", options: ["we've", "he's", "they've"] },
      { sentence: "The Garcias love exploring. ___ never been to Paris, but they want to go.", correct: "they've", explain: "They've is short for 'they have'. The Garcias = they.", options: ["they've", "we've", "I've"] },
      { sentence: "I ate too much at lunch. ___ got a headache now.", correct: "I've", explain: "I've is short for 'I have'. The speaker is describing their own state.", options: ["I've", "she's", "you've"] },
    ]
  },
  willContractions: {
    label: 'Will Contractions',
    icon: '🔮',
    options: ["I'll", "we'll", "she'll"],
    items: [
      { sentence: "Don't worry about the meeting. ___ call you tomorrow with all the details.", correct: "I'll", explain: "I'll is short for 'I will'. The speaker is making a personal promise.", options: ["I'll", "we'll", "she'll"] },
      { sentence: "Our team has a plan. ___ help you with that project.", correct: "we'll", explain: "We'll is short for 'we will'. Our team = we.", options: ["we'll", "I'll", "he'll"] },
      { sentence: "My colleague has the address. ___ arrive at six o'clock.", correct: "she'll", explain: "She'll is short for 'she will'. My colleague = she.", options: ["she'll", "they'll", "we'll"] },
      { sentence: "Ask David — ___ finish the report soon.", correct: "he'll", explain: "He'll is short for 'he will'. David = he.", options: ["he'll", "I'll", "you'll"] },
      { sentence: "My parents are coming for the weekend. ___ visit us next week too.", correct: "they'll", explain: "They'll is short for 'they will'. My parents = they.", options: ["they'll", "we'll", "she'll"] },
      { sentence: "Open it! ___ love this present.", correct: "you'll", explain: "You'll is short for 'you will'. The speaker is addressing the listener directly.", options: ["you'll", "I'll", "he'll"] },
      { sentence: "Check the forecast — ___ be sunny tomorrow.", correct: "it'll", explain: "It'll is short for 'it will'. We use 'it' for weather.", options: ["it'll", "he'll", "we'll"] },
      { sentence: "My flight is at 7 pm and traffic is terrible. ___ probably be late.", correct: "I'll", explain: "I'll is short for 'I will'. The speaker is predicting their own situation.", options: ["I'll", "she'll", "they'll"] },
      { sentence: "This project is huge. ___ need more time to finish it.", correct: "we'll", explain: "We'll is short for 'we will'. The team = we.", options: ["we'll", "you'll", "it'll"] },
      { sentence: "My friends got front-row seats. ___ enjoy the concert for sure.", correct: "they'll", explain: "They'll is short for 'they will'. My friends = they.", options: ["they'll", "she'll", "we'll"] },
    ]
  }
};
