export const CATEGORIES = {
  beContractions: {
    label: 'Be Contractions',
    icon: '🔗',
    options: ["I'm", "you're", "she's"],
    items: [
      { sentence: '___ a student.', correct: "I'm", explain: "I'm is short for 'I am'.", options: ["I'm", "you're", "he's"] },
      { sentence: '___ my best friend.', correct: "you're", explain: "You're is short for 'you are'.", options: ["I'm", "you're", "she's"] },
      { sentence: '___ very kind.', correct: "she's", explain: "She's is short for 'she is'.", options: ["she's", "they're", "I'm"] },
      { sentence: '___ from Canada.', correct: "he's", explain: "He's is short for 'he is'.", options: ["he's", "we're", "I'm"] },
      { sentence: '___ at home right now.', correct: "we're", explain: "We're is short for 'we are'.", options: ["we're", "he's", "I'm"] },
      { sentence: '___ ready for the trip.', correct: "they're", explain: "They're is short for 'they are'.", options: ["they're", "she's", "you're"] },
      { sentence: '___ a nice day today.', correct: "it's", explain: "It's is short for 'it is'.", options: ["it's", "he's", "we're"] },
      { sentence: '___ tired after school.', correct: "I'm", explain: "I'm is short for 'I am'.", options: ["I'm", "he's", "they're"] },
      { sentence: '___ my neighbors.', correct: "they're", explain: "They're is short for 'they are'.", options: ["they're", "we're", "she's"] },
      { sentence: '___ happy to meet you.', correct: "we're", explain: "We're is short for 'we are'.", options: ["we're", "you're", "it's"] },
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
      { sentence: '___ got a new phone.', correct: "I've", explain: "I've is short for 'I have'.", options: ["I've", "she's", "we've"] },
      { sentence: '___ got two brothers.', correct: "she's got", explain: "She's got is short for 'she has got'.", options: ["she's got", "I've got", "they've got"] },
      { sentence: '___ got a lot of homework.', correct: "we've", explain: "We've is short for 'we have'.", options: ["we've", "I've", "he's"] },
      { sentence: '___ got a new car.', correct: "they've", explain: "They've is short for 'they have'.", options: ["they've", "she's", "I've"] },
      { sentence: '___ got a big house.', correct: "he's got", explain: "He's got is short for 'he has got'.", options: ["he's got", "we've got", "I've got"] },
      { sentence: '___ never seen that movie.', correct: "I've", explain: "I've is short for 'I have'.", options: ["I've", "she's", "he's"] },
      { sentence: '___ already left the office.', correct: "she's", explain: "She's is short for 'she has' (with a past participle).", options: ["she's", "I've", "we've"] },
      { sentence: '___ finished the project.', correct: "we've", explain: "We've is short for 'we have'.", options: ["we've", "he's", "they've"] },
      { sentence: '___ never been to Paris.', correct: "they've", explain: "They've is short for 'they have'.", options: ["they've", "we've", "I've"] },
      { sentence: '___ got a headache.', correct: "I've", explain: "I've is short for 'I have'.", options: ["I've", "she's", "you've"] },
    ]
  },
  willContractions: {
    label: 'Will Contractions',
    icon: '🔮',
    options: ["I'll", "we'll", "she'll"],
    items: [
      { sentence: '___ call you tomorrow.', correct: "I'll", explain: "I'll is short for 'I will'.", options: ["I'll", "we'll", "she'll"] },
      { sentence: '___ help you with that.', correct: "we'll", explain: "We'll is short for 'we will'.", options: ["we'll", "I'll", "he'll"] },
      { sentence: '___ arrive at six o\'clock.', correct: "she'll", explain: "She'll is short for 'she will'.", options: ["she'll", "they'll", "we'll"] },
      { sentence: '___ finish the report soon.', correct: "he'll", explain: "He'll is short for 'he will'.", options: ["he'll", "I'll", "you'll"] },
      { sentence: '___ visit us next week.', correct: "they'll", explain: "They'll is short for 'they will'.", options: ["they'll", "we'll", "she'll"] },
      { sentence: '___ love this present.', correct: "you'll", explain: "You'll is short for 'you will'.", options: ["you'll", "I'll", "he'll"] },
      { sentence: '___ be sunny tomorrow.', correct: "it'll", explain: "It'll is short for 'it will'.", options: ["it'll", "he'll", "we'll"] },
      { sentence: '___ probably be late.', correct: "I'll", explain: "I'll is short for 'I will'.", options: ["I'll", "she'll", "they'll"] },
      { sentence: '___ need more time.', correct: "we'll", explain: "We'll is short for 'we will'.", options: ["we'll", "you'll", "it'll"] },
      { sentence: '___ enjoy the concert.', correct: "they'll", explain: "They'll is short for 'they will'.", options: ["they'll", "she'll", "we'll"] },
    ]
  }
};
