export const CATEGORIES = {
  regularPlurals: {
    label: 'Regular Plurals',
    icon: '📚',
    options: ['book', 'books', 'boxs'],
    items: [
      { sentence: 'I have three ___ (book).', correct: 'books', explain: 'Add -s to most nouns to make them plural.', options: ['book', 'books', 'bookes'] },
      { sentence: 'She bought two ___ (box) of apples.', correct: 'boxes', explain: "Nouns ending in -x add -es: box → boxes.", options: ['boxs', 'boxes', 'box'] },
      { sentence: 'There are five ___ (chair) in the classroom.', correct: 'chairs', explain: 'Add -s to make "chair" plural.', options: ['chair', 'chairs', 'chaires'] },
      { sentence: 'He has two ___ (dog).', correct: 'dogs', explain: 'Add -s to make "dog" plural.', options: ['dog', 'dogs', 'doges'] },
      { sentence: 'We watched two ___ (movie) yesterday.', correct: 'movies', explain: 'Nouns ending in -e just add -s: movie → movies.', options: ['movie', 'movies', 'moviees'] },
      { sentence: 'I need three ___ (piece) of paper.', correct: 'pieces', explain: "Nouns ending in -ce add -s: piece → pieces.", options: ['piece', 'pieces', 'peices'] },
      { sentence: 'There are many ___ (dish) on the table.', correct: 'dishes', explain: "Nouns ending in -sh add -es: dish → dishes.", options: ['dish', 'dishs', 'dishes'] },
      { sentence: 'She has two ___ (watch).', correct: 'watches', explain: "Nouns ending in -ch add -es: watch → watches.", options: ['watchs', 'watches', 'watche'] },
      { sentence: 'I bought four ___ (bag).', correct: 'bags', explain: 'Add -s to make "bag" plural.', options: ['bag', 'bags', 'bages'] },
      { sentence: 'There are ten ___ (student) in my class.', correct: 'students', explain: 'Add -s to make "student" plural.', options: ['student', 'students', 'studentes'] },
    ]
  },
  irregularPlurals: {
    label: 'Irregular Plurals',
    icon: '🌀',
    options: ['child', 'children', 'childs'],
    items: [
      { sentence: 'They have three ___ (child).', correct: 'children', explain: '"Child" has an irregular plural: children.' },
      { sentence: 'I saw two ___ (man) in the park.', correct: 'men', explain: '"Man" has an irregular plural: men.', options: ['mans', 'men', 'mens'] },
      { sentence: 'There were many ___ (woman) at the party.', correct: 'women', explain: '"Woman" has an irregular plural: women.', options: ['womans', 'women', 'womens'] },
      { sentence: 'I have two ___ (foot).', correct: 'feet', explain: '"Foot" has an irregular plural: feet.', options: ['foots', 'feet', 'feets'] },
      { sentence: 'The cat caught three ___ (mouse).', correct: 'mice', explain: '"Mouse" has an irregular plural: mice.', options: ['mouses', 'mice', 'mices'] },
      { sentence: 'I brushed my ___ (tooth) this morning.', correct: 'teeth', explain: '"Tooth" has an irregular plural: teeth.', options: ['tooths', 'teeth', 'teeths'] },
      { sentence: 'There are two ___ (sheep) in the field.', correct: 'sheep', explain: '"Sheep" has the same singular and plural form.', options: ['sheeps', 'sheep', 'sheepes'] },
      { sentence: 'We saw many ___ (fish) swimming.', correct: 'fish', explain: '"Fish" has the same singular and plural form.', options: ['fishes', 'fish', 'fishs'] },
      { sentence: 'My grandparents live with their ___ (child).', correct: 'children', explain: '"Child" has an irregular plural: children.', options: ['childs', 'children', 'childes'] },
      { sentence: 'The farmer has many ___ (goose).', correct: 'geese', explain: '"Goose" has an irregular plural: geese.', options: ['gooses', 'geese', 'geeses'] },
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
    options: ["'s = is", "'s = possession"],
    items: [
      { sentence: "Sara___ happy today.", correct: "'s = is", fill: "'s", explain: "Replace 's with 'is': \"Sara is happy today\" works, so 's = is." },
      { sentence: "This is Sara___ book.", correct: "'s = possession", fill: "'s", explain: "\"Sara is book\" makes no sense. A noun (book) follows, so 's = possession." },
      { sentence: "My dog___ very friendly.", correct: "'s = is", fill: "'s", explain: "Replace 's with 'is': \"My dog is very friendly\" works, so 's = is." },
      { sentence: "My dog___ tail is short.", correct: "'s = possession", fill: "'s", explain: "\"My dog is tail\" makes no sense. A noun (tail) follows, so 's = possession." },
      { sentence: "It___ raining today.", correct: "'s = is", fill: "'s", explain: "Replace 's with 'is': \"It is raining today\" works, so 's = is." },
      { sentence: "The car___ engine is loud.", correct: "'s = possession", fill: "'s", explain: "\"The car is engine\" makes no sense. A noun (engine) follows, so 's = possession." },
      { sentence: "He___ a doctor.", correct: "'s = is", fill: "'s", explain: "Replace 's with 'is': \"He is a doctor\" works, so 's = is." },
      { sentence: "That___ my brother's jacket.", correct: "'s = is", fill: "'s", explain: "Replace 's with 'is': \"That is my brother's jacket\" works. The second 's (brother's) is the possessive one." },
      { sentence: "John___ tired after work.", correct: "'s = is", fill: "'s", explain: "Replace 's with 'is': \"John is tired after work\" works, so 's = is." },
      { sentence: "John___ car is new.", correct: "'s = possession", fill: "'s", explain: "\"John is car\" makes no sense. A noun (car) follows, so 's = possession." },
    ]
  }
};
