export const CATEGORIES = {
  whoWhomWhose: {
    label: 'Who / Whom / Whose',
    icon: '🙋',
    options: ['who', 'whom', 'whose'],
    items: [
      { sentence: 'This is the man ___ car was stolen.', correct: 'whose', explain: '"Whose" shows possession before a noun.' },
      { sentence: "She's the woman ___ helped me yesterday.", correct: 'who', explain: '"Who" replaces the subject of the relative clause.' },
      { sentence: 'To ___ should I address this letter?', correct: 'whom', explain: '"Whom" is used after a preposition, in formal English.' },
      { sentence: 'The scientist ___ theory was proven correct received an award.', correct: 'whose', explain: '"Whose" shows possession before a noun.' },
      { sentence: "He's the person ___ I spoke to on the phone.", correct: 'whom', explain: '"Whom" is used as the object of the relative clause, in formal English.' },
      { sentence: 'The teacher ___ explains grammar so well is retiring.', correct: 'who', explain: '"Who" replaces the subject of the relative clause.' },
      { sentence: "That's the family ___ house burned down.", correct: 'whose', explain: '"Whose" shows possession before a noun.' },
      { sentence: "The client ___ we're meeting tomorrow is very important.", correct: 'whom', explain: '"Whom" is used as the object of the relative clause, in formal English.' },
      { sentence: 'Do you know the man ___ is standing over there?', correct: 'who', explain: '"Who" replaces the subject of the relative clause.' },
      { sentence: 'The author ___ book won the prize will speak tonight.', correct: 'whose', explain: '"Whose" shows possession before a noun.' },
    ]
  },
  whichThat: {
    label: 'Which / That',
    icon: '🔗',
    options: ['which', 'that'],
    items: [
      { sentence: 'The book, ___ I read last summer, was amazing.', correct: 'which', explain: 'Non-defining clauses (with commas, extra information) use "which", never "that".' },
      { sentence: 'The car ___ I bought last year broke down already.', correct: 'that', explain: 'Defining clauses (essential information, no commas) commonly use "that".' },
      { sentence: 'My phone, ___ is only a year old, stopped working.', correct: 'which', explain: 'Non-defining clauses (with commas) use "which".' },
      { sentence: 'This is the restaurant ___ we went to last week.', correct: 'that', explain: 'Defining clauses commonly use "that".' },
      { sentence: 'The Eiffel Tower, ___ was built in 1889, is in Paris.', correct: 'which', explain: 'Non-defining clauses (with commas) use "which".' },
      { sentence: 'I need the file ___ you sent me yesterday.', correct: 'that', explain: 'Defining clauses commonly use "that".' },
      { sentence: 'Her house, ___ has five bedrooms, is for sale.', correct: 'which', explain: 'Non-defining clauses (with commas) use "which".' },
      { sentence: 'The movie ___ we watched was boring.', correct: 'that', explain: 'Defining clauses commonly use "that".' },
      { sentence: 'London, ___ is the capital of England, is very expensive.', correct: 'which', explain: 'Non-defining clauses (with commas) use "which".' },
      { sentence: 'The laptop ___ I use for work is very fast.', correct: 'that', explain: 'Defining clauses commonly use "that".' },
    ]
  },
  prepositionPlusWhich: {
    label: 'Preposition + Which',
    icon: '🧩',
    options: ['in which', 'on which', 'with which', 'for which'],
    items: [
      { sentence: 'The hotel ___ we stayed had a great pool.', correct: 'in which', explain: '"Stay in a hotel" → "the hotel in which we stayed".' },
      { sentence: 'This is the reason ___ she left.', correct: 'for which', explain: '"A reason for something" → "the reason for which she left".' },
      { sentence: 'The desk ___ he works is covered in papers.', correct: 'on which', explain: '"Work on a desk" → "the desk on which he works".' },
      { sentence: 'The tool ___ she fixed it is quite unusual.', correct: 'with which', explain: '"Fix something with a tool" → "the tool with which she fixed it".' },
      { sentence: 'The city ___ I was born has changed a lot.', correct: 'in which', explain: '"Born in a city" → "the city in which I was born".' },
      { sentence: "The topic ___ we're most interested is climate change.", correct: 'in which', explain: '"Interested in a topic" → "the topic in which we\'re interested".' },
      { sentence: 'The method ___ they solved the problem was creative.', correct: 'with which', explain: '"Solve something with a method" → "the method with which they solved it".' },
      { sentence: 'The company ___ he works is very successful.', correct: 'for which', explain: '"Work for a company" → "the company for which he works".' },
      { sentence: 'The situation ___ we found ourselves was difficult.', correct: 'in which', explain: '"Find yourself in a situation" → "the situation in which we found ourselves".' },
      { sentence: 'The surface ___ the vase was placed was uneven.', correct: 'on which', explain: '"Place something on a surface" → "the surface on which it was placed".' },
    ]
  },
  reducedRelativeIng: {
    label: 'Reduced Clauses (-ing)',
    icon: '🏃',
    options: ['living', 'working', 'sitting', 'waiting'],
    items: [
      { sentence: 'The man ___ next to me on the plane was very talkative.', correct: 'sitting', explain: 'Reduces "who was sitting" — active, ongoing action.' },
      { sentence: 'People ___ in big cities often complain about traffic.', correct: 'living', explain: 'Reduces "who live" — active, ongoing action.' },
      { sentence: 'The woman ___ in that office is my manager.', correct: 'working', explain: 'Reduces "who works" — active, ongoing action.' },
      { sentence: 'Passengers ___ for flight 220 should proceed to gate 5.', correct: 'waiting', explain: 'Reduces "who are waiting" — active, ongoing action.' },
      { sentence: 'The dog ___ by the door started barking.', correct: 'sitting', explain: 'Reduces "which was sitting" — active, ongoing action.' },
      { sentence: 'Anyone ___ near the beach should be prepared for storms.', correct: 'living', explain: 'Reduces "who lives" — active, ongoing action.' },
      { sentence: 'The employees ___ on this project need more resources.', correct: 'working', explain: 'Reduces "who are working" — active, ongoing action.' },
      { sentence: 'The customers ___ in line were getting impatient.', correct: 'waiting', explain: 'Reduces "who were waiting" — active, ongoing action.' },
      { sentence: 'The cat ___ on the windowsill watched the birds.', correct: 'sitting', explain: 'Reduces "which was sitting" — active, ongoing action.' },
      { sentence: 'Students ___ hard usually get better grades.', correct: 'working', explain: 'Reduces "who work hard" — active, ongoing action.' },
    ]
  },
  reducedRelativePastParticiple: {
    label: 'Reduced Clauses (-ed)',
    icon: '📜',
    options: ['written', 'built', 'made', 'used'],
    items: [
      { sentence: 'The book ___ by that author became a bestseller.', correct: 'written', explain: 'Reduces "which was written" — passive meaning.' },
      { sentence: 'The bridge ___ last year is already famous.', correct: 'built', explain: 'Reduces "which was built" — passive meaning.' },
      { sentence: 'The decisions ___ by the committee were final.', correct: 'made', explain: 'Reduces "which were made" — passive meaning.' },
      { sentence: 'The tools ___ in this workshop are very old.', correct: 'used', explain: 'Reduces "which are used" — passive meaning.' },
      { sentence: 'The letter ___ in 1920 is now in a museum.', correct: 'written', explain: 'Reduces "which was written" — passive meaning.' },
      { sentence: 'The house ___ by my grandfather is still standing.', correct: 'built', explain: 'Reduces "which was built" — passive meaning.' },
      { sentence: 'The report ___ by the team impressed everyone.', correct: 'written', explain: 'Reduces "which was written" — passive meaning.' },
      { sentence: 'The furniture ___ from oak lasts for generations.', correct: 'made', explain: 'Reduces "which is made" — passive meaning.' },
      { sentence: 'The methods ___ today are much more advanced.', correct: 'used', explain: 'Reduces "which are used" — passive meaning.' },
      { sentence: 'The castle ___ in the 12th century still stands.', correct: 'built', explain: 'Reduces "which was built" — passive meaning.' },
    ]
  },
};
