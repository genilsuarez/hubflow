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
      },
      {
        text: "After finishing his homework he watched television.",
        errors: [
          { word: "homework", index: 3, correction: "homework,", rule: "Use a comma after an introductory phrase." }
        ]
      },
      {
        text: "The museum which opened last year is very popular.",
        errors: [
          { word: "museum", index: 1, correction: "museum,", rule: "Non-defining relative clauses need a comma before \"which\"." },
          { word: "year", index: 5, correction: "year,", rule: "Non-defining relative clauses need a comma after the clause too." }
        ]
      },
      {
        text: "No I haven't finished the assignment yet.",
        errors: [
          { word: "No", index: 0, correction: "No,", rule: "Use a comma after an introductory word like \"Yes\" or \"No\"." }
        ]
      },
      {
        text: "My neighbor Tom fixed our fence last week.",
        errors: [
          { word: "neighbor", index: 1, correction: "neighbor,", rule: "An appositive (a renaming phrase) needs commas around it." },
          { word: "Tom", index: 2, correction: "Tom,", rule: "The appositive needs a comma after it too." }
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
      },
      {
        text: "The cats toy rolled under the sofa.",
        errors: [
          { word: "cats", index: 1, correction: "cat's", rule: "Missing possessive apostrophe — the toy belongs to the cat." }
        ]
      },
      {
        text: "Youre going to love this restaurant.",
        errors: [
          { word: "Youre", index: 0, correction: "You're", rule: "\"You're\" (you are) needs an apostrophe." }
        ]
      },
      {
        text: "we visited london and rome during our holiday.",
        errors: [
          { word: "we", index: 0, correction: "We", rule: "The first word of a sentence must be capitalized." },
          { word: "london", index: 2, correction: "London", rule: "Proper nouns (city names) are always capitalized." },
          { word: "rome", index: 4, correction: "Rome", rule: "Proper nouns (city names) are always capitalized." }
        ]
      }
    ]
  },
  semicolonsColons: {
    label: 'Semicolons & Colons',
    icon: '⚡',
    level: 'B1–B2',
    items: [
      {
        text: "I have visited three countries France Italy and Spain.",
        errors: [
          { word: "countries", index: 4, correction: "countries:", rule: "Use a colon before a list that follows a complete statement." }
        ]
      },
      {
        text: "She was exhausted however she finished the report.",
        errors: [
          { word: "exhausted", index: 2, correction: "exhausted;", rule: "Use a semicolon before 'however' when joining two independent clauses." }
        ]
      },
      {
        text: "There is only one solution work harder.",
        errors: [
          { word: "solution", index: 4, correction: "solution:", rule: "Use a colon to introduce a conclusion or explanation that follows a complete clause." }
        ]
      },
      {
        text: "He loves cooking his hobbies include baking, grilling and experimenting with spices.",
        errors: [
          { word: "cooking", index: 2, correction: "cooking;", rule: "Use a semicolon to separate two closely related independent clauses without a conjunction." }
        ]
      },
      {
        text: "The instructions were clear clean the surface wait ten minutes apply the glue.",
        errors: [
          { word: "clear", index: 3, correction: "clear:", rule: "Use a colon before a list of instructions that follows a complete statement." }
        ]
      },
      {
        text: "She has three goals improve her fitness, read more books and learn to code.",
        errors: [
          { word: "goals", index: 3, correction: "goals:", rule: "Use a colon before a list." }
        ]
      },
      {
        text: "The meeting was long nevertheless, everyone left feeling motivated.",
        errors: [
          { word: "long", index: 3, correction: "long;", rule: "Use a semicolon before a conjunctive adverb like 'nevertheless'." }
        ]
      },
      {
        text: "There are two options stay and fight, or leave quietly.",
        errors: [
          { word: "options", index: 3, correction: "options:", rule: "Use a colon before options or alternatives listed after a complete clause." }
        ]
      },
      {
        text: "The café was packed as a result, we decided to eat outside.",
        errors: [
          { word: "packed", index: 3, correction: "packed;", rule: "Use a semicolon before 'as a result' when connecting two independent clauses." }
        ]
      },
      {
        text: "The rule is simple never leave a door unlocked.",
        errors: [
          { word: "simple", index: 3, correction: "simple:", rule: "Use a colon to introduce a rule or principle that follows a complete clause." }
        ]
      },
      {
        text: "The recipe requires three ingredients flour sugar and butter.",
        errors: [
          { word: "ingredients", index: 4, correction: "ingredients:", rule: "Use a colon before a list that follows a complete statement." }
        ]
      },
      {
        text: "The traffic was terrible therefore we arrived late.",
        errors: [
          { word: "terrible", index: 3, correction: "terrible;", rule: "Use a semicolon before 'therefore' when joining two independent clauses." }
        ]
      },
      {
        text: "There is one rule listen carefully before you speak.",
        errors: [
          { word: "rule", index: 3, correction: "rule:", rule: "Use a colon to introduce a rule or principle that follows a complete clause." }
        ]
      }
    ]
  }
};
