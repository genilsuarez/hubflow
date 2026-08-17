// Las tarjetas de `studyCards` son deliberadamente distintas de los `items`:
// Study presenta la REGLA (y sus ejemplos) y Quiz pide aplicarla. Antes ambos
// modos mostraban las mismas 10 frases con hueco, así que "estudiar" era el
// examen con la respuesta detrás y la regla no se enunciaba en ninguna parte.
export const CATEGORIES = {
  regularPlurals: {
    label: 'Regular Plurals',
    icon: '📚',
    options: ['book', 'books', "book's"],
    studyCards: [
      { front: 'Most nouns', back: '+ s', detail: 'book → books · student → students · chair → chairs' },
      { front: 'Ends in -s, -x, -ch, -sh', back: '+ es', detail: 'box → boxes · dish → dishes · watch → watches' },
      { front: 'Consonant + y', back: 'y → ies', detail: 'baby → babies · city → cities · story → stories' },
      { front: 'Vowel + y', back: '+ s (y stays)', detail: 'day → days · boy → boys · key → keys' },
      { front: 'Ends in -f / -fe', back: 'f → ves', detail: 'knife → knives · leaf → leaves · wife → wives' },
      { front: 'A plural is never written with an apostrophe', back: 'two dogs, not two dog’s', detail: "The apostrophe is only for possession: the dog's tail." },
    ],
    items: [
      { sentence: 'I have three ___ (book).', correct: 'books', explain: 'Most nouns just add -s: book → books. A plural takes no apostrophe.', options: ['book', 'books', "book's"] },
      { sentence: 'There are ten ___ (student) in my class.', correct: 'students', explain: 'Most nouns just add -s: student → students. A plural takes no apostrophe.', options: ['student', 'students', "student's"] },
      { sentence: 'She bought two ___ (box) of apples.', correct: 'boxes', explain: 'Nouns ending in -s, -x, -ch or -sh add -es: box → boxes.', options: ['boxs', 'boxes', 'box'] },
      { sentence: 'There are many ___ (dish) on the table.', correct: 'dishes', explain: 'Nouns ending in -s, -x, -ch or -sh add -es: dish → dishes.', options: ['dish', 'dishs', 'dishes'] },
      { sentence: 'She has two ___ (watch).', correct: 'watches', explain: 'Nouns ending in -s, -x, -ch or -sh add -es: watch → watches.', options: ['watch', 'watchs', 'watches'] },
      { sentence: 'They have two ___ (baby).', correct: 'babies', explain: 'Consonant + y: change the y to i and add -es. baby → babies.', options: ['babys', 'babies', 'babyes'] },
      { sentence: 'I visited three ___ (city) last year.', correct: 'cities', explain: 'Consonant + y: change the y to i and add -es. city → cities.', options: ['city', 'citys', 'cities'] },
      { sentence: 'We stayed there for five ___ (day).', correct: 'days', explain: 'Vowel + y: the y stays and you just add -s. day → days (not "daies").', options: ['days', 'daies', 'dayes'] },
      { sentence: 'I need two ___ (knife) for the kitchen.', correct: 'knives', explain: 'Nouns ending in -f or -fe change to -ves: knife → knives.', options: ['knifes', 'knives', 'knifs'] },
      { sentence: 'The ___ (leaf) fall in autumn.', correct: 'leaves', explain: 'Nouns ending in -f or -fe change to -ves: leaf → leaves.', options: ['leaf', 'leafs', 'leaves'] },
    ]
  },
  irregularPlurals: {
    label: 'Irregular Plurals',
    icon: '🌀',
    options: ['child', 'children', 'childs'],
    studyCards: [
      { front: 'child', back: 'children', detail: 'Irregular ending in -ren. Also: ox → oxen.' },
      { front: 'person', back: 'people', detail: 'A completely different word. "Persons" only survives in legal English.' },
      { front: 'man / woman', back: 'men / women', detail: 'Vowel change: a → e. Written women, but pronounced /ˈwɪmɪn/.' },
      { front: 'foot / tooth / goose', back: 'feet / teeth / geese', detail: 'Vowel change: oo → ee.' },
      { front: 'mouse', back: 'mice', detail: 'Vowel change: ou → i. Also: louse → lice.' },
      { front: 'sheep / fish / deer', back: 'sheep / fish / deer', detail: 'Invariable: the plural looks exactly like the singular.' },
    ],
    items: [
      { sentence: 'They have three ___ (child).', correct: 'children', explain: '"Child" has an irregular plural: children.' },
      { sentence: 'I saw two ___ (man) in the park.', correct: 'men', explain: '"Man" has an irregular plural: men (vowel change a → e).', options: ['mans', 'men', 'mens'] },
      { sentence: 'There were many ___ (woman) at the party.', correct: 'women', explain: '"Woman" has an irregular plural: women (vowel change a → e).', options: ['womans', 'women', 'womens'] },
      { sentence: 'I have two ___ (foot).', correct: 'feet', explain: '"Foot" has an irregular plural: feet (vowel change oo → ee).', options: ['foots', 'feet', 'feets'] },
      { sentence: 'The cat caught three ___ (mouse).', correct: 'mice', explain: '"Mouse" has an irregular plural: mice.', options: ['mouses', 'mice', 'mices'] },
      { sentence: 'I brushed my ___ (tooth) this morning.', correct: 'teeth', explain: '"Tooth" has an irregular plural: teeth (vowel change oo → ee).', options: ['tooths', 'teeth', 'teeths'] },
      { sentence: 'There are two ___ (sheep) in the field.', correct: 'sheep', explain: '"Sheep" has the same singular and plural form.', options: ['sheeps', 'sheep', 'sheepes'] },
      { sentence: 'We saw many ___ (fish) swimming.', correct: 'fish', explain: '"Fish" has the same singular and plural form.', options: ['fishes', 'fish', 'fishs'] },
      { sentence: 'There are three ___ (person) waiting outside.', correct: 'people', explain: '"Person" has an irregular plural: people.', options: ['persons', 'people', 'peoples'] },
      { sentence: 'The farmer has many ___ (goose).', correct: 'geese', explain: '"Goose" has an irregular plural: geese (vowel change oo → ee).', options: ['gooses', 'geese', 'geeses'] },
    ]
  },
  possessiveApostropheS: {
    label: "Possessive 's",
    icon: "✍️",
    options: ["'s", "s'", "s"],
    studyCards: [
      { front: 'Singular noun or name', back: "+ 's", detail: "Tom → Tom's car · the girl → the girl's bag" },
      { front: 'Plural that ends in -s', back: "+ ' only", detail: "my parents → my parents' house · the students → the students' books" },
      { front: "Plural that doesn't end in -s", back: "+ 's", detail: "children → children's toys · men → men's team · people → people's opinions" },
      { front: 'Plural with no owner', back: 'no apostrophe at all', detail: 'two dogs (not two dog’s) · the cars are new' },
      { front: 'Name already ending in -s', back: "James's or James'", detail: 'Both are accepted. Say /ˈdʒeɪmzɪz/ either way.' },
      { front: 'How to choose', back: 'Is the owner plural AND ending in -s?', detail: "Yes → just '. No → 's. Nothing owned → no apostrophe." },
    ],
    items: [
      { sentence: "This is Tom___ car.", correct: "'s", explain: "Singular name: add 's. Tom's car = the car of Tom.", options: ["'s", "s'", "s"] },
      { sentence: "The girl___ bag is red.", correct: "'s", explain: "Singular noun: add 's. The girl's bag = the bag of the girl.", options: ["'s", "s'", "s"] },
      { sentence: "My friend___ birthday is in June.", correct: "'s", explain: "Singular noun: add 's. My friend's birthday = the birthday of my friend.", options: ["'s", "s'", "s"] },
      { sentence: "The children___ toys are on the floor.", correct: "'s", explain: "'Children' is plural but doesn't end in -s, so it takes 's like a singular.", options: ["'s", "s'", "s"] },
      { sentence: "The men___ team won the game.", correct: "'s", explain: "'Men' is plural but doesn't end in -s, so it takes 's like a singular.", options: ["'s", "s'", "s"] },
      { sentence: "My parents___ house is big.", correct: "s'", explain: "'Parents' is plural and ends in -s, so add only the apostrophe, after the s.", options: ["'s", "s'", "s"] },
      { sentence: "The students___ books are new.", correct: "s'", explain: "'Students' is plural and ends in -s, so add only the apostrophe, after the s.", options: ["'s", "s'", "s"] },
      { sentence: "The teachers___ room is upstairs.", correct: "s'", explain: "'Teachers' is plural and ends in -s, so add only the apostrophe, after the s.", options: ["'s", "s'", "s"] },
      // Estos dos van con la palabra entera, no con el sufijo: el hueco del
      // motor lleva padding y "two dog s at home" se leía como dos palabras.
      // Además el contraste dogs / dog's / dogs' es justamente el error real.
      { sentence: "I have two ___ at home. (dog)", correct: "dogs", explain: "Nothing belongs to the dogs here — it's just a plural, and plurals take no apostrophe.", options: ["dogs", "dog's", "dogs'"] },
      { sentence: "The ___ in the street are new. (car)", correct: "cars", explain: "Just a plural (the cars). Nothing is owned, so no apostrophe.", options: ["cars", "car's", "cars'"] },
    ]
  },
  possessiveSVsIsContraction: {
    label: "'s = is, has or possession?",
    icon: '🤔',
    options: ["'s = is", "'s = has", "'s = possession"],
    studyCards: [
      { front: "'s + adjective, noun or -ing", back: "'s = is", detail: "Sara's happy · He's a doctor · It's raining" },
      { front: "'s + past participle, or 's got", back: "'s = has", detail: "She's finished · He's got two brothers · My sister's been to London" },
      { front: "'s + a noun that belongs to it", back: "'s = possession", detail: "Sara's book · John's car · the dog's tail" },
      { front: 'How to decide', back: "Expand it: try 'is', then 'has'", detail: "If neither expansion makes sense, the 's shows possession." },
      { front: "Careful: one sentence can have both", back: "That's my brother's jacket.", detail: "That is my brother's jacket — the first 's is is, the second is possession." },
    ],
    items: [
      { sentence: "Sara___ happy today.", correct: "'s = is", fill: "'s", explain: "Replace 's with 'is': \"Sara is happy today\" works, so 's = is." },
      { sentence: "It___ raining today.", correct: "'s = is", fill: "'s", explain: "Replace 's with 'is': \"It is raining today\" works, so 's = is." },
      { sentence: "He___ a doctor.", correct: "'s = is", fill: "'s", explain: "Replace 's with 'is': \"He is a doctor\" works, so 's = is." },
      { sentence: "That___ my brother's jacket.", correct: "'s = is", fill: "'s", explain: "Replace 's with 'is': \"That is my brother's jacket\" works. The second 's (brother's) is the possessive one." },
      { sentence: "He___ got two brothers.", correct: "'s = has", fill: "'s", explain: "\"He is got\" is impossible. Replace 's with 'has': \"He has got two brothers\", so 's = has." },
      { sentence: "She___ finished her homework.", correct: "'s = has", fill: "'s", explain: "A past participle (finished) follows, so 's = has: \"She has finished her homework.\"" },
      { sentence: "My sister___ been to London.", correct: "'s = has", fill: "'s", explain: "A past participle (been) follows, so 's = has: \"My sister has been to London.\"" },
      { sentence: "This is Sara___ book.", correct: "'s = possession", fill: "'s", explain: "Neither \"Sara is book\" nor \"Sara has book\" works. A noun (book) follows that belongs to Sara, so 's = possession." },
      { sentence: "My dog___ tail is short.", correct: "'s = possession", fill: "'s", explain: "Neither \"my dog is tail\" nor \"my dog has tail\" works. The tail belongs to the dog, so 's = possession." },
      { sentence: "John___ car is new.", correct: "'s = possession", fill: "'s", explain: "Neither \"John is car\" nor \"John has car\" works. The car belongs to John, so 's = possession." },
    ]
  }
};
