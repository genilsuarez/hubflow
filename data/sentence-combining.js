/**
 * HubFlow — Sentence Combining Data
 * Categories: relative (B1), connectors (B1-B2), participles (B2-C1), mixed (B2)
 * Each entry: { sentences: string[2], correct: string[], hint, explain }
 * The user combines the two source sentences into one; `correct` holds every
 * acceptable combined version (checked with normalized fuzzy matching).
 */

export const CATEGORIES = {
  relative: {
    label: 'Relative Clauses',
    icon: '🧩',
    level: 'B1',
    items: [
      { sentences: ["The man is my neighbor.", "He lives next door."], correct: ["The man who lives next door is my neighbor.", "The man that lives next door is my neighbor."], hint: "Use a relative pronoun for people", explain: "'Who'/'that' introduces a relative clause describing the man." },
      { sentences: ["This is the restaurant.", "We had our first date there."], correct: ["This is the restaurant where we had our first date."], hint: "Use 'where' for places", explain: "'Where' replaces 'there' when combining a place with a relative clause." },
      { sentences: ["She's the woman.", "Her car was stolen."], correct: ["She's the woman whose car was stolen."], hint: "Use 'whose' for possession", explain: "'Whose' shows that the car belongs to the woman." },
      { sentences: ["That's the reason.", "I left early for that reason."], correct: ["That's the reason why I left early.", "That's why I left early."], hint: "Use 'why' for reasons", explain: "'Why' introduces a relative clause about a reason." },
      { sentences: ["I met a girl.", "Her father works at NASA."], correct: ["I met a girl whose father works at NASA."], hint: "Use 'whose' again", explain: "'Whose' = the girl's father." },
      { sentences: ["The film won an award.", "It was directed by a newcomer."], correct: ["The film that won an award was directed by a newcomer.", "The film which won an award was directed by a newcomer."], hint: "The relative clause is the subject here", explain: "'That'/'which won an award' describes the film as subject of the sentence." },
      { sentences: ["My sister lives in Barcelona.", "She is a doctor."], correct: ["My sister, who is a doctor, lives in Barcelona."], hint: "Non-defining clause needs commas", explain: "Extra information about a named person uses commas + 'who', never 'that'." },
      { sentences: ["The hotel was right on the beach.", "We stayed there."], correct: ["The hotel where we stayed was right on the beach."], hint: "Use 'where' again", explain: "'Where' replaces 'there' for the hotel." },
      { sentences: ["I work with some people.", "They are very friendly."], correct: ["The people I work with are very friendly.", "The people who I work with are very friendly.", "The people that I work with are very friendly."], hint: "The pronoun can be omitted here", explain: "As object of the clause, the relative pronoun is optional." },
      { sentences: ["London has over 8 million people.", "London is the capital of England."], correct: ["London, which is the capital of England, has over 8 million people."], hint: "Non-defining clause about a place", explain: "Extra info about a named place uses commas + 'which'." },
    ],
  },
  connectors: {
    label: 'Connectors',
    icon: '🔗',
    level: 'B1–B2',
    items: [
      { sentences: ["It was raining.", "We went for a walk."], correct: ["Although it was raining, we went for a walk.", "We went for a walk although it was raining.", "Despite the rain, we went for a walk."], hint: "Use a contrast connector", explain: "'Although'/'despite' link two contrasting ideas." },
      { sentences: ["She studied hard.", "She passed the exam."], correct: ["She studied hard, so she passed the exam.", "Because she studied hard, she passed the exam."], hint: "Use a cause/result connector", explain: "'So'/'because' link a cause to its result." },
      { sentences: ["He was tired.", "He kept working."], correct: ["Although he was tired, he kept working.", "He was tired, but he kept working."], hint: "Use a contrast connector", explain: "'Although'/'but' show the unexpected contrast." },
      { sentences: ["The traffic was terrible.", "We arrived on time."], correct: ["Despite the terrible traffic, we arrived on time.", "Although the traffic was terrible, we arrived on time."], hint: "'Despite' + noun phrase", explain: "'Despite' is followed by a noun phrase, not a full clause." },
      { sentences: ["I don't like coffee.", "I drink it every morning."], correct: ["Although I don't like coffee, I drink it every morning.", "I don't like coffee, but I drink it every morning."], hint: "Use a contrast connector", explain: "The two ideas contrast, so 'although'/'but' fit." },
      { sentences: ["Prices went up.", "Demand fell."], correct: ["Because prices went up, demand fell.", "Prices went up, so demand fell."], hint: "Use a cause/result connector", explain: "Rising prices caused falling demand." },
      { sentences: ["He didn't study.", "He failed the test."], correct: ["Since he didn't study, he failed the test.", "He didn't study, so he failed the test."], hint: "'Since' can also mean 'because' here", explain: "'Since' at the start of a clause can express reason, not just time." },
      { sentences: ["The team lost the game.", "They played very well."], correct: ["Although they played very well, the team lost the game.", "The team lost the game even though they played very well."], hint: "Use a stronger contrast connector", explain: "'Even though' emphasizes the contrast more than 'although'." },
      { sentences: ["The company cut costs.", "Profits increased."], correct: ["Because the company cut costs, profits increased.", "The company cut costs, so profits increased."], hint: "Use a cause/result connector", explain: "Cutting costs caused profits to rise." },
      { sentences: ["He apologized.", "She was still angry."], correct: ["Although he apologized, she was still angry.", "He apologized, but she was still angry."], hint: "Use a contrast connector", explain: "The apology didn't change her anger — a contrast." },
    ],
  },
  participles: {
    label: 'Participle Clauses',
    icon: '✂️',
    level: 'B2–C1',
    items: [
      { sentences: ["She opened the door.", "She saw the surprise party."], correct: ["Opening the door, she saw the surprise party."], hint: "Use an -ing participle clause", explain: "'Opening the door' replaces 'she opened the door' as an -ing clause." },
      { sentences: ["He was exhausted after the race.", "He went straight to bed."], correct: ["Exhausted after the race, he went straight to bed."], hint: "Use a past participle", explain: "'Exhausted' (past participle) starts the sentence, describing 'he'." },
      { sentences: ["The book was written in 1990.", "It became a bestseller."], correct: ["Written in 1990, the book became a bestseller."], hint: "Use a past participle", explain: "'Written in 1990' is a passive participle clause describing the book." },
      { sentences: ["She finished her homework.", "She went out to play."], correct: ["Having finished her homework, she went out to play."], hint: "Use 'having' + past participle for a completed action", explain: "'Having finished' shows the first action was completed before the second." },
      { sentences: ["He didn't know the answer.", "He guessed."], correct: ["Not knowing the answer, he guessed."], hint: "Negative participle clause", explain: "'Not' goes before the -ing form to make a negative participle clause." },
      { sentences: ["The house was built in the 1800s.", "It needs major repairs."], correct: ["Built in the 1800s, the house needs major repairs."], hint: "Use a past participle", explain: "'Built in the 1800s' is a passive participle clause." },
      { sentences: ["She walked into the room.", "She noticed everyone staring."], correct: ["Walking into the room, she noticed everyone staring."], hint: "Use an -ing participle clause", explain: "'Walking into the room' replaces 'she walked into the room'." },
      { sentences: ["The workers were surprised by the news.", "They stopped working."], correct: ["Surprised by the news, the workers stopped working."], hint: "Use a past participle", explain: "'Surprised' describes the workers' reaction as a participle clause." },
      { sentences: ["He had lost his job.", "He decided to start his own business."], correct: ["Having lost his job, he decided to start his own business."], hint: "Use 'having' + past participle", explain: "'Having lost' shows the job loss happened before the decision." },
      { sentences: ["The letter was sent last week.", "It still hasn't arrived."], correct: ["Sent last week, the letter still hasn't arrived."], hint: "Use a past participle", explain: "'Sent last week' is a passive participle clause describing the letter." },
    ],
  },
  mixed: {
    label: 'Mixed Practice',
    icon: '🎲',
    level: 'B2',
    items: [
      { sentences: ["The scientist discovered a new species.", "She had been researching for years."], correct: ["Having researched for years, the scientist discovered a new species."], hint: "Use 'having' + past participle", explain: "The years of research happened before the discovery." },
      { sentences: ["The car broke down.", "It was very old."], correct: ["The car, which was very old, broke down.", "Being very old, the car broke down."], hint: "Non-defining clause or participle clause", explain: "Both a relative clause and a participle clause work here." },
      { sentences: ["He lost the match.", "He trained hard for months."], correct: ["Although he trained hard for months, he lost the match."], hint: "Use a contrast connector", explain: "The training didn't lead to winning — a contrast." },
      { sentences: ["The building was damaged in the storm.", "It has been repaired."], correct: ["The building, which was damaged in the storm, has been repaired."], hint: "Non-defining relative clause", explain: "Extra info about the building, set off by commas." },
      { sentences: ["She missed the bus.", "She was late for work."], correct: ["Having missed the bus, she was late for work.", "Because she missed the bus, she was late for work."], hint: "Cause and result", explain: "Missing the bus caused her to be late." },
      { sentences: ["The museum was closed.", "We visited the park instead."], correct: ["Since the museum was closed, we visited the park instead."], hint: "'Since' meaning 'because'", explain: "'Since' introduces the reason for visiting the park." },
      { sentences: ["The teacher explained the rule.", "The rule was confusing."], correct: ["The rule, which was confusing, was explained by the teacher.", "The teacher explained the rule that was confusing."], hint: "Relative clause about the rule", explain: "'Which'/'that' describes the confusing rule." },
      { sentences: ["He worked overtime every week.", "He was rarely tired."], correct: ["Although he worked overtime every week, he was rarely tired."], hint: "Use a contrast connector", explain: "Working overtime would normally cause tiredness — a contrast." },
      { sentences: ["The company launched a new product.", "It became very popular."], correct: ["The company launched a new product, which became very popular."], hint: "Non-defining relative clause", explain: "'Which' adds extra info about the new product." },
      { sentences: ["She saved money every month.", "She bought a house."], correct: ["Having saved money every month, she bought a house.", "Because she saved money every month, she bought a house."], hint: "Cause and result", explain: "The saving happened before — and caused — the purchase." },
    ],
  },
};
