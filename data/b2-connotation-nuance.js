export const CATEGORIES = {
  thinSkinnySlim: {
    label: 'Thin / Skinny / Slim',
    icon: '🧍',
    options: ['skinny', 'slim', 'thin'],
    items: [
      { sentence: 'You look amazing, so ___ in that dress!', correct: 'slim', explain: '"Slim" has a positive, complimentary connotation.' },
      { sentence: "He's too ___; he needs to eat more, poor thing.", correct: 'skinny', explain: '"Skinny" often carries a negative or worried connotation.' },
      { sentence: "The doctor said his blood test shows he's just naturally ___, nothing to worry about.", correct: 'thin', explain: '"Thin" is the neutral, factual word.' },
      { sentence: "She's been working out and looks really ___ now.", correct: 'slim', explain: '"Slim" has a positive, complimentary connotation.' },
      { sentence: 'That model is worryingly ___; she barely eats.', correct: 'skinny', explain: '"Skinny" often carries a negative or worried connotation.' },
      { sentence: 'The paper was so ___ you could see through it.', correct: 'thin', explain: '"Thin" is neutral and works for objects too.' },
      { sentence: "He's got a ___ athletic build, perfect for running.", correct: 'slim', explain: '"Slim" has a positive, complimentary connotation.' },
      { sentence: 'The stray cat was ___ and clearly hungry.', correct: 'skinny', explain: '"Skinny" often carries a negative connotation.' },
      { sentence: 'My laptop is very ___ and light.', correct: 'thin', explain: '"Thin" is the neutral word, common for objects.' },
      { sentence: 'She has always been naturally ___, even as a child.', correct: 'thin', explain: '"Thin" is the neutral, factual word.' },
    ]
  },
  cheapAffordable: {
    label: 'Cheap / Affordable',
    icon: '💵',
    options: ['cheap', 'inexpensive', 'affordable'],
    items: [
      { sentence: 'This restaurant is surprisingly ___ for such great food.', correct: 'affordable', explain: '"Affordable" has a positive connotation — good value.' },
      { sentence: 'The hotel was ___ but the walls were paper-thin and the service was terrible.', correct: 'cheap', explain: '"Cheap" implies low price AND low quality.' },
      { sentence: 'We found an ___ flight that still had good reviews.', correct: 'affordable', explain: '"Affordable" has a positive connotation — good value.' },
      { sentence: 'His clothes always look ___ and start falling apart after one wash.', correct: 'cheap', explain: '"Cheap" implies low price AND low quality.' },
      { sentence: "This is a very ___ option if you're on a budget, without sacrificing quality.", correct: 'inexpensive', explain: '"Inexpensive" is a neutral way to say low-cost without implying poor quality.' },
      { sentence: "Don't buy that brand, it's ___ and breaks easily.", correct: 'cheap', explain: '"Cheap" implies low price AND low quality.' },
      { sentence: 'The museum offers ___ tickets for students.', correct: 'inexpensive', explain: '"Inexpensive" is a neutral way to describe a low price.' },
      { sentence: 'You can get an ___ hotel room if you book early.', correct: 'affordable', explain: '"Affordable" has a positive connotation — good value.' },
      { sentence: 'The quality was poor because they used ___ materials.', correct: 'cheap', explain: '"Cheap" implies low price AND low quality.' },
      { sentence: "It's an ___ way to learn a new skill without spending much.", correct: 'affordable', explain: '"Affordable" has a positive connotation — good value.' },
    ]
  },
  oldElderlyAncient: {
    label: 'Old / Elderly / Ancient',
    icon: '⏳',
    options: ['old', 'elderly', 'ancient'],
    items: [
      { sentence: 'My ___ grandmother still walks every morning.', correct: 'elderly', explain: '"Elderly" is the respectful term for older people.' },
      { sentence: 'This vase is ___, from the Roman Empire.', correct: 'ancient', explain: '"Ancient" describes something extremely old, from history.' },
      { sentence: "My phone is getting ___; I should upgrade soon.", correct: 'old', explain: '"Old" is the neutral word, common for objects.' },
      { sentence: 'We should show respect and offer a seat to that ___ gentleman.', correct: 'elderly', explain: '"Elderly" is the respectful term for older people.' },
      { sentence: 'The ___ ruins attracted many tourists.', correct: 'ancient', explain: '"Ancient" describes something extremely old, from history.' },
      { sentence: "That's an ___ tradition, going back centuries.", correct: 'ancient', explain: '"Ancient" describes something extremely old, from history.' },
      { sentence: 'My car is quite ___ now, but it still runs fine.', correct: 'old', explain: '"Old" is the neutral word, common for objects.' },
      { sentence: 'The care home looks after ___ residents with dignity.', correct: 'elderly', explain: '"Elderly" is the respectful term for older people.' },
      { sentence: 'This ___ oak tree has stood here for 200 years.', correct: 'ancient', explain: '"Ancient" describes something extremely old.' },
      { sentence: "These shoes are ___; I've had them for years.", correct: 'old', explain: '"Old" is the neutral word, common for objects.' },
    ]
  },
  happyGladThrilled: {
    label: 'Happy / Glad / Thrilled',
    icon: '😊',
    options: ['happy', 'glad', 'thrilled', 'pleased'],
    items: [
      { sentence: "I'm ___ you could make it to the party!", correct: 'glad', explain: '"Glad" is a common, everyday way to express relief or pleasure about a specific thing.' },
      { sentence: 'We were absolutely ___ when we won the championship!', correct: 'thrilled', explain: '"Thrilled" expresses intense excitement, stronger than "happy".' },
      { sentence: "I'm ___ with the results of the project.", correct: 'pleased', explain: '"Pleased" is a more formal, measured way to express satisfaction.' },
      { sentence: 'She felt ___ just relaxing at home with a book.', correct: 'happy', explain: '"Happy" is the general, neutral word for this feeling.' },
      { sentence: 'He was ___ to hear the good news about his exam.', correct: 'glad', explain: '"Glad" is used for a specific piece of good news.' },
      { sentence: 'The fans were ___ when their team scored the winning goal.', correct: 'thrilled', explain: '"Thrilled" expresses intense excitement.' },
      { sentence: "I'm ___ to inform you that your application was successful.", correct: 'pleased', explain: '"Pleased" is common in formal announcements.' },
      { sentence: 'They looked genuinely ___ at the reunion.', correct: 'happy', explain: '"Happy" is the general, neutral word for this feeling.' },
      { sentence: "I'd be ___ to help you with that.", correct: 'glad', explain: '"Glad to..." is a common polite offer of help.' },
      { sentence: 'We are ___ to announce our new product launch.', correct: 'pleased', explain: '"Pleased" is common in formal announcements.' },
    ]
  },
  reportingVerbs: {
    label: 'Reporting Verbs',
    icon: '💬',
    options: ['whispered', 'shouted', 'mumbled', 'announced'],
    items: [
      { sentence: 'She ___ the secret so no one else could hear.', correct: 'whispered', explain: '"Whispered" means spoken very quietly.' },
      { sentence: 'He ___ angrily when he saw the mess.', correct: 'shouted', explain: '"Shouted" means spoken very loudly, often in anger.' },
      { sentence: 'The teacher ___ that school would close early.', correct: 'announced', explain: '"Announced" is used for formal or public statements.' },
      { sentence: "He ___ something under his breath, but I couldn't understand it.", correct: 'mumbled', explain: '"Mumbled" means spoken unclearly and quietly.' },
      { sentence: '"Be quiet!" she ___ across the room.', correct: 'shouted', explain: '"Shouted" means spoken very loudly.' },
      { sentence: 'The company ___ record profits this quarter.', correct: 'announced', explain: '"Announced" is used for formal or public statements.' },
      { sentence: 'He ___ an apology, too embarrassed to speak clearly.', correct: 'mumbled', explain: '"Mumbled" means spoken unclearly, often from embarrassment.' },
      { sentence: 'She ___ the answer so only her friend could hear.', correct: 'whispered', explain: '"Whispered" means spoken very quietly.' },
      { sentence: 'The coach ___ instructions from the sideline.', correct: 'shouted', explain: '"Shouted" means spoken very loudly, to be heard at a distance.' },
      { sentence: 'The results were ___ at the ceremony.', correct: 'announced', explain: '"Announced" is used for formal or public statements.' },
    ]
  },
};
