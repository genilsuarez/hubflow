/**
 * Listening Data — listen (TTS) and choose the missing word / word you heard
 * Categories by CEFR-ish difficulty: Everyday (A2), Travel & Work (B1), Numbers & Homophones
 * Each item: { text (full sentence spoken), blank (word to guess), options[] }
 */

export const CATEGORIES = {
  everyday: {
    label: 'Everyday',
    icon: '☕',
    items: [
      { text: 'I usually wake up at seven in the morning.', blank: 'wake up', options: ['wake up', 'work out', 'walk up', 'wait up'] },
      { text: 'She is having breakfast in the kitchen.', blank: 'kitchen', options: ['kitchen', 'chicken', 'children', 'kitten'] },
      { text: 'Can you turn off the lights, please?', blank: 'turn off', options: ['turn off', 'turn on', 'take off', 'turn up'] },
      { text: 'We are going to the cinema tonight.', blank: 'cinema', options: ['cinema', 'sonita', 'senior', 'seminar'] },
      { text: 'He forgot his keys at the office.', blank: 'keys', options: ['keys', 'cheese', 'case', 'ease'] },
      { text: 'I would like a cup of coffee, please.', blank: 'cup', options: ['cup', 'cap', 'cop', 'cape'] },
      { text: 'The weather is very cold today.', blank: 'cold', options: ['cold', 'called', 'gold', 'coal'] },
    ]
  },
  travelwork: {
    label: 'Travel & Work',
    icon: '✈️',
    items: [
      { text: 'The meeting has been scheduled for Monday.', blank: 'scheduled', options: ['scheduled', 'schooled', 'shielded', 'settled'] },
      { text: 'I need to book a flight to London.', blank: 'flight', options: ['flight', 'fright', 'flute', 'fight'] },
      { text: 'Our department is hiring new employees.', blank: 'employees', options: ['employees', 'employers', 'emphasis', 'empathies'] },
      { text: 'Please send me the report by email.', blank: 'report', options: ['report', 'resort', 'rapport', 'reward'] },
      { text: 'We should arrive at the airport early.', blank: 'airport', options: ['airport', 'aeroplane', 'airline', 'harbour'] },
      { text: 'The deadline for the project is Friday.', blank: 'deadline', options: ['deadline', 'headline', 'dateline', 'redline'] },
      { text: 'She works as a software engineer.', blank: 'engineer', options: ['engineer', 'engine ear', 'engineered', 'engineering'] }
    ]
  },
  tricky: {
    label: 'Tricky Pairs',
    icon: '🎧',
    items: [
      { text: 'I can see the ship on the horizon.', blank: 'ship', options: ['ship', 'sheep', 'chip', 'shape'] },
      { text: 'He ate three pieces of cake.', blank: 'three', options: ['three', 'free', 'tree', 'threw'] },
      { text: 'The desert is very hot and dry.', blank: 'desert', options: ['desert', 'dessert', 'deserve', 'decent'] },
      { text: 'Please write your name here.', blank: 'write', options: ['write', 'right', 'rite', 'ride'] },
      { text: 'I bought a new pair of shoes.', blank: 'pair', options: ['pair', 'pear', 'pare', 'peer'] },
      { text: 'We need to accept the new terms.', blank: 'accept', options: ['accept', 'except', 'expect', 'access'] }
    ]
  }
};
