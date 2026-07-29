/**
 * HubFlow — Punctuation Fix Data
 * Categories: Commas & Periods, Apostrophes & Capitals
 * Same shape as error-hunt.js: { text, errors: [{ word, index, correction, rule }] }
 */

export const CATEGORIES = {
  commasAndPeriods: {
    label: 'Commas & Periods',
    icon: '✏️',
    level: 'A2–B1',
    items: [
      {
        text: "I bought apples oranges and bananas for the picnic.",
        errors: [
          { word: "apples", index: 2, correction: "apples,", rule: "Use a comma to separate items in a list of three or more." }
        ]
      },
      {
        text: "After the meeting we went straight to lunch.",
        errors: [
          { word: "meeting", index: 2, correction: "meeting,", rule: "Use a comma after an introductory phrase." }
        ]
      },
      {
        text: "My brother who lives in Canada is visiting next week.",
        errors: [
          { word: "brother", index: 1, correction: "brother,", rule: "Non-defining relative clauses need a comma before \"who\"." },
          { word: "Canada", index: 5, correction: "Canada,", rule: "Non-defining relative clauses need a comma after the clause too." }
        ]
      },
      {
        text: "She was tired but she kept working.",
        errors: [
          { word: "tired", index: 2, correction: "tired,", rule: "Use a comma before \"but\" when joining two independent clauses." }
        ]
      },
      {
        text: "Yes I would love to join you for dinner.",
        errors: [
          { word: "Yes", index: 0, correction: "Yes,", rule: "Use a comma after an introductory word like \"Yes\" or \"No\"." }
        ]
      },
      {
        text: "The report which was due yesterday is still not finished.",
        errors: [
          { word: "report", index: 1, correction: "report,", rule: "Non-defining relative clauses need a comma before \"which\"." },
          { word: "yesterday", index: 5, correction: "yesterday,", rule: "Non-defining relative clauses need a comma after the clause too." }
        ]
      },
      {
        text: "However the results were still disappointing.",
        errors: [
          { word: "However", index: 0, correction: "However,", rule: "Use a comma after a sentence-initial linking adverb." }
        ]
      },
      {
        text: "My best friend Sarah is coming to the party.",
        errors: [
          { word: "friend", index: 2, correction: "friend,", rule: "An appositive (a renaming phrase) needs commas around it." },
          { word: "Sarah", index: 3, correction: "Sarah,", rule: "The appositive needs a comma after it too." }
        ]
      },
      {
        text: "If it rains tomorrow we will cancel the picnic.",
        errors: [
          { word: "tomorrow", index: 3, correction: "tomorrow,", rule: "Use a comma after an introductory conditional clause." }
        ]
      },
      {
        text: "The cake which she baked herself was delicious.",
        errors: [
          { word: "cake", index: 1, correction: "cake,", rule: "Non-defining relative clauses need a comma before \"which\"." },
          { word: "herself", index: 5, correction: "herself,", rule: "Non-defining relative clauses need a comma after the clause too." }
        ]
      }
    ]
  },
  apostrophesCapitals: {
    label: 'Apostrophes & Capitals',
    icon: '🔤',
    level: 'A2–B1',
    items: [
      {
        text: "The dogs bone was buried in the garden.",
        errors: [
          { word: "dogs", index: 1, correction: "dog's", rule: "Missing possessive apostrophe — the bone belongs to the dog." }
        ]
      },
      {
        text: "Its a beautiful day outside.",
        errors: [
          { word: "Its", index: 0, correction: "It's", rule: "\"It's\" (it is) vs \"its\" (possessive) — this needs the contraction." }
        ]
      },
      {
        text: "i think we should leave now.",
        errors: [
          { word: "i", index: 0, correction: "I", rule: "The pronoun \"I\" is always capitalized." }
        ]
      },
      {
        text: "My sisters car broke down yesterday.",
        errors: [
          { word: "sisters", index: 1, correction: "sister's", rule: "Missing possessive apostrophe — the car belongs to the sister." }
        ]
      },
      {
        text: "We visited paris last summer.",
        errors: [
          { word: "paris", index: 2, correction: "Paris", rule: "Proper nouns (city names) are always capitalized." }
        ]
      },
      {
        text: "Whos going to the concert tonight.",
        errors: [
          { word: "Whos", index: 0, correction: "Who's", rule: "\"Who's\" (who is) needs an apostrophe." }
        ]
      },
      {
        text: "The childrens toys were scattered everywhere.",
        errors: [
          { word: "childrens", index: 1, correction: "children's", rule: "\"Children\" is already plural — just add 's for the possessive." }
        ]
      },
      {
        text: "i love reading books on sunday afternoons.",
        errors: [
          { word: "i", index: 0, correction: "I", rule: "The pronoun \"I\" is always capitalized." },
          { word: "sunday", index: 5, correction: "Sunday", rule: "Days of the week are always capitalized." }
        ]
      },
      {
        text: "Its important to check your work carefully.",
        errors: [
          { word: "Its", index: 0, correction: "It's", rule: "\"It's\" (it is) vs \"its\" (possessive) — this needs the contraction." }
        ]
      },
      {
        text: "The teachers classroom was very colorful.",
        errors: [
          { word: "teachers", index: 1, correction: "teacher's", rule: "Missing possessive apostrophe — the classroom belongs to the teacher." }
        ]
      }
    ]
  }
};
