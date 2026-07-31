export const CATEGORIES = {
  regularPlurals: {
    label: 'Regular Plurals',
    icon: '📚',
    options: ['book', 'books', 'boxs'],
    items: [
      { sentence: 'I have three ___.', correct: 'books', explain: 'Add -s to most nouns to make them plural.' },
      { sentence: 'She bought two ___ of apples.', correct: 'boxes', explain: "Nouns ending in -x add -es: box → boxes.", options: ['boxs', 'boxes', 'box'] },
      { sentence: 'There are five ___ in the classroom.', correct: 'chairs', explain: 'Add -s to make "chair" plural.', options: ['chair', 'chairs', 'chaires'] },
      { sentence: 'He has two ___.', correct: 'dogs', explain: 'Add -s to make "dog" plural.', options: ['dog', 'dogs', 'doges'] },
      { sentence: 'We watched two ___ yesterday.', correct: 'movies', explain: 'Nouns ending in a vowel + y just add -s: movie → movies.', options: ['movys', 'movies', 'movyes'] },
      { sentence: 'I need three ___ of paper.', correct: 'pieces', explain: "Nouns ending in -ce add -s: piece → pieces.", options: ['piece', 'pieces', 'peices'] },
      { sentence: 'There are many ___ on the table.', correct: 'dishes', explain: "Nouns ending in -sh add -es: dish → dishes.", options: ['dish', 'dishs', 'dishes'] },
      { sentence: 'She has two ___.', correct: 'watches', explain: "Nouns ending in -ch add -es: watch → watches.", options: ['watchs', 'watches', 'watche'] },
      { sentence: 'I bought four ___.', correct: 'bags', explain: 'Add -s to make "bag" plural.', options: ['bag', 'bags', 'bages'] },
      { sentence: 'There are ten ___ in my class.', correct: 'students', explain: 'Add -s to make "student" plural.', options: ['student', 'students', 'studentes'] },
    ]
  },
  irregularPlurals: {
    label: 'Irregular Plurals',
    icon: '🌀',
    options: ['child', 'children', 'childs'],
    items: [
      { sentence: 'They have three ___.', correct: 'children', explain: '"Child" has an irregular plural: children.' },
      { sentence: 'I saw two ___ in the park.', correct: 'men', explain: '"Man" has an irregular plural: men.', options: ['mans', 'men', 'mens'] },
      { sentence: 'There were many ___ at the party.', correct: 'women', explain: '"Woman" has an irregular plural: women.', options: ['womans', 'women', 'womens'] },
      { sentence: 'I have two ___.', correct: 'feet', explain: '"Foot" has an irregular plural: feet.', options: ['foots', 'feet', 'feets'] },
      { sentence: 'The cat caught three ___.', correct: 'mice', explain: '"Mouse" has an irregular plural: mice.', options: ['mouses', 'mice', 'mices'] },
      { sentence: 'I brushed my ___ this morning.', correct: 'teeth', explain: '"Tooth" has an irregular plural: teeth.', options: ['tooths', 'teeth', 'teeths'] },
      { sentence: 'There are two ___ in the field.', correct: 'sheep', explain: '"Sheep" has the same singular and plural form.', options: ['sheeps', 'sheep', 'sheepes'] },
      { sentence: 'We saw many ___ swimming.', correct: 'fish', explain: '"Fish" has the same singular and plural form.', options: ['fishes', 'fish', 'fishs'] },
      { sentence: 'My grandparents live with their ___.', correct: 'children', explain: '"Child" has an irregular plural: children.', options: ['childs', 'children', 'childes'] },
      { sentence: 'The farmer has many ___.', correct: 'geese', explain: '"Goose" has an irregular plural: geese.', options: ['gooses', 'geese', 'geeses'] },
    ]
  },
  possessiveApostropheS: {
    label: "Possessive 's",
    icon: "✍️",
    options: ["'s", "s'", "of"],
    items: [
      { sentence: "This is Tom___ car.", correct: "'s", explain: "Add 's to a singular name or noun to show possession." },
      { sentence: "The girl___ bag is red.", correct: "'s", explain: "Add 's to a singular noun to show possession.", options: ["'s", "s'", "s"] },
      { sentence: "My parents___ house is big.", correct: "s'", explain: "For plural nouns ending in -s, add only an apostrophe.", options: ["'s", "s'", "es"] },
      { sentence: "The children___ toys are on the floor.", correct: "'s", explain: "'Children' is already plural but doesn't end in -s, so add 's.", options: ["'s", "s'", "s"] },
      { sentence: "This is my sister___ phone.", correct: "'s", explain: "Add 's to a singular noun to show possession.", options: ["'s", "s'", "es"] },
      { sentence: "The dog___ tail is short.", correct: "'s", explain: "Add 's to a singular noun to show possession.", options: ["'s", "s'", "s"] },
      { sentence: "The students___ books are new.", correct: "s'", explain: "For plural nouns ending in -s, add only an apostrophe.", options: ["'s", "s'", "es"] },
      { sentence: "This is Maria___ house.", correct: "'s", explain: "Add 's to a singular name to show possession.", options: ["'s", "s'", "es"] },
      { sentence: "My friend___ birthday is in June.", correct: "'s", explain: "Add 's to a singular noun to show possession.", options: ["'s", "s'", "s"] },
      { sentence: "The teachers___ room is upstairs.", correct: "s'", explain: "For plural nouns ending in -s, add only an apostrophe.", options: ["'s", "s'", "es"] },
    ]
  },
  possessiveSVsIsContraction: {
    label: "'s = possession or is?",
    icon: '🤔',
    options: ['possession', 'is'],
    items: [
      { sentence: "Sara's happy today.", correct: 'is', explain: "Here 's is short for 'is' (Sara is happy)." },
      { sentence: "This is Sara's book.", correct: 'possession', explain: "Here 's shows that the book belongs to Sara." },
      { sentence: "My dog's very friendly.", correct: 'is', explain: "Here 's is short for 'is' (My dog is friendly)." },
      { sentence: "My dog's tail is short.", correct: 'possession', explain: "Here 's shows possession — the tail belongs to the dog." },
      { sentence: "It's raining today.", correct: 'is', explain: "Here it's is short for 'it is'." },
      { sentence: "The car's engine is loud.", correct: 'possession', explain: "Here 's shows that the engine belongs to the car." },
      { sentence: "He's a doctor.", correct: 'is', explain: "Here 's is short for 'is' (He is a doctor)." },
      { sentence: "That's my brother's jacket.", correct: 'possession', explain: "The second 's shows the jacket belongs to the brother." },
      { sentence: "John's tired after work.", correct: 'is', explain: "Here 's is short for 'is' (John is tired)." },
      { sentence: "John's car is new.", correct: 'possession', explain: "Here 's shows that the car belongs to John." },
    ]
  }
};
