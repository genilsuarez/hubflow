/**
 * HubFlow — Error Hunt Data
 * Categories: Grammar (A2-B1), Tenses (A2-B2), Vocabulary (B1-B2), Prepositions (A2-B1)
 *
 * Each entry:
 *   text: string — the full text WITH errors
 *   errors: Array<{ word: string, index: number, correction: string, rule: string }>
 *     - word: the incorrect word as it appears
 *     - index: word-position in the text (0-based, split by spaces)
 *     - correction: the correct form
 *     - rule: short explanation
 */

export const CATEGORIES = {
  grammar: {
    label: 'Grammar',
    icon: '📝',
    level: 'A2–B1',
    items: [
      {
        text: "She don't like coffee. Every morning she drink tea with milk and eat a toast.",
        errors: [
          { word: "don't", index: 1, correction: "doesn't", rule: "Third person singular uses 'doesn't'" },
          { word: "drink", index: 5, correction: "drinks", rule: "Third person singular: verb + s" },
          { word: "a", index: 11, correction: "some", rule: "'Toast' is uncountable — use 'some toast'" }
        ]
      },
      {
        text: "There is many people in the park today. The childrens are playing and the dogs is running.",
        errors: [
          { word: "is", index: 1, correction: "are", rule: "'Many people' is plural — use 'there are'" },
          { word: "childrens", index: 9, correction: "children", rule: "'Children' is already plural — no 's' needed" },
          { word: "is", index: 15, correction: "are", rule: "'Dogs' is plural — use 'are'" }
        ]
      },
      {
        text: "He told me that he can swims very good. I don't believed him because he never go to the pool.",
        errors: [
          { word: "swims", index: 6, correction: "swim", rule: "After modal 'can', use base form" },
          { word: "good", index: 8, correction: "well", rule: "Adverb needed to modify a verb: 'well'" },
          { word: "believed", index: 11, correction: "believe", rule: "After 'don't', use base form" },
          { word: "go", index: 15, correction: "goes", rule: "Third person singular: 'he never goes'" }
        ]
      },
      {
        text: "My sister is more taller than me. She has long hairs and blue eyes. Everyone say she is beautiful.",
        errors: [
          { word: "more", index: 3, correction: "", rule: "'Taller' already has -er — don't add 'more'" },
          { word: "hairs", index: 10, correction: "hair", rule: "'Hair' (on head) is uncountable" },
          { word: "say", index: 15, correction: "says", rule: "Third person singular: 'everyone says'" }
        ]
      },
      {
        text: "I have been to Paris last year. It were amazing. I visited the Eiffel Tower and taked many photos.",
        errors: [
          { word: "have", index: 1, correction: "went", rule: "'Last year' = past simple, not present perfect" },
          { word: "were", index: 7, correction: "was", rule: "'It' takes 'was', not 'were'" },
          { word: "taked", index: 15, correction: "took", rule: "'Take' is irregular: take → took → taken" }
        ]
      },
      {
        text: "If I will have time tomorrow, I will going to the gym. I need to do more exercise for stay fit.",
        errors: [
          { word: "will", index: 2, correction: "", rule: "First conditional: 'If + present simple' — no 'will' in the if-clause" },
          { word: "going", index: 10, correction: "go", rule: "After 'will', use base form" },
          { word: "for", index: 16, correction: "to", rule: "Infinitive of purpose: 'to stay fit'" }
        ]
      },
      {
        text: "The informations you gave me was very useful. I already readed the document and writed my report.",
        errors: [
          { word: "informations", index: 1, correction: "information", rule: "'Information' is uncountable — no plural" },
          { word: "was", index: 5, correction: "were", rule: "Subject is 'informations (information)' but the verb should match: if uncountable → 'was' is OK; the real fix is making the noun singular. Accept 'was' with corrected noun." },
          { word: "readed", index: 10, correction: "read", rule: "'Read' is irregular: read → read → read (past = same spelling, /rɛd/)" },
          { word: "writed", index: 14, correction: "wrote", rule: "'Write' is irregular: write → wrote → written" }
        ]
      },
      {
        text: "She suggested me to go to the doctor. I agreed going there next week.",
        errors: [
          { word: "me", index: 2, correction: "", rule: "'Suggest' doesn't take indirect object + to-infinitive. Use: 'suggested that I go' or 'suggested going'" },
          { word: "going", index: 11, correction: "to go", rule: "'Agree' takes to + infinitive: 'agreed to go'" }
        ]
      },
      {
        text: "He is knowing the answer but he doesn't wants to tell nobody.",
        errors: [
          { word: "knowing", index: 2, correction: "knows", rule: "'Know' is a state verb — not used in continuous" },
          { word: "wants", index: 6, correction: "want", rule: "After 'doesn't', use base form" },
          { word: "nobody", index: 9, correction: "anybody", rule: "Double negative: 'doesn't' + 'nobody'. Use 'anybody'" }
        ]
      },
      {
        text: "We was waiting since two hours when the bus finally arrived. Everyone were very tired and cold.",
        errors: [
          { word: "was", index: 1, correction: "had been", rule: "'Since two hours' + past event = past perfect continuous" },
          { word: "since", index: 3, correction: "for", rule: "'Two hours' is a duration — use 'for', not 'since'" },
          { word: "were", index: 12, correction: "was", rule: "'Everyone' is singular — use 'was'" }
        ]
      },
      {
        text: "I have less problems than you, but she have much less patience for this than her sister.",
        errors: [
          { word: "less", index: 2, correction: "fewer", rule: "'Problems' is countable — use 'fewer', not 'less'" },
          { word: "have", index: 8, correction: "has", rule: "Third person singular: 'she has'" }
        ]
      },
      {
        text: "He is more taller than his brother, and he speak english very good since three years.",
        errors: [
          { word: "more", index: 2, correction: "", rule: "'Taller' already has -er — don't add 'more'" },
          { word: "speak", index: 9, correction: "speaks", rule: "Third person singular: 'he speaks'" },
          { word: "english", index: 10, correction: "English", rule: "Language names are always capitalized" },
          { word: "since", index: 13, correction: "for", rule: "'Three years' is a duration — use 'for', not 'since'" }
        ]
      },
      {
        text: "There is too much cars in this city and not enough parkings for everyone.",
        errors: [
          { word: "is", index: 1, correction: "are", rule: "'Cars' is plural — use 'there are'" },
          { word: "much", index: 3, correction: "many", rule: "'Cars' is countable — use 'many', not 'much'" },
          { word: "parkings", index: 11, correction: "parking", rule: "'Parking' is uncountable — no plural 's'" }
        ]
      },
      {
        text: "She gave me some good advices and useful informations about the trip, but her luggages were full of old furnitures.",
        errors: [
          { word: "advices", index: 5, correction: "advice", rule: "'Advice' is uncountable — never add 's'" },
          { word: "informations", index: 8, correction: "information", rule: "'Information' is uncountable — never add 's'" },
          { word: "luggages", index: 14, correction: "luggage", rule: "'Luggage' is uncountable — never add 's'" },
          { word: "furnitures.", index: 19, correction: "furniture.", rule: "'Furniture' is uncountable — never add 's'" }
        ]
      }
    ]
  },
  tenses: {
    label: 'Tenses',
    icon: '⏱️',
    level: 'A2–B2',
    items: [
      {
        text: "I live here since 2015. Before that, I was lived in a small town near the coast.",
        errors: [
          { word: "live", index: 1, correction: "have lived", rule: "'Since 2015' requires present perfect: 'have lived'" },
          { word: "was", index: 8, correction: "", rule: "Remove 'was': past simple is 'lived', not 'was lived'" }
        ]
      },
      {
        text: "When I arrived, she already left. The house was empty and nobody was waited for me.",
        errors: [
          { word: "left", index: 5, correction: "had already left", rule: "Earlier past action needs past perfect: 'had already left'" },
          { word: "waited", index: 14, correction: "waiting", rule: "Past continuous: 'was waiting', not 'was waited'" }
        ]
      },
      {
        text: "By next year, I will finished my degree. Then I am going to looked for a job abroad.",
        errors: [
          { word: "finished", index: 5, correction: "have finished", rule: "Future perfect: 'will have finished'" },
          { word: "looked", index: 14, correction: "look", rule: "'Going to' + base form: 'going to look'" }
        ]
      },
      {
        text: "She is studying English for three years. She started when she has been in school.",
        errors: [
          { word: "is", index: 0, correction: "has been", rule: "'For three years' = present perfect continuous: 'has been studying'" },
          { word: "has", index: 11, correction: "was", rule: "Past reference: 'when she was in school'" }
        ]
      },
      {
        text: "I was walking home when suddenly it has started raining. I didn't had an umbrella so I runned to the shop.",
        errors: [
          { word: "has", index: 7, correction: "", rule: "Narrative sequence = past simple: 'it started raining'" },
          { word: "had", index: 12, correction: "have", rule: "After 'didn't', use base form: 'didn't have'" },
          { word: "runned", index: 16, correction: "ran", rule: "'Run' is irregular: run → ran → run" }
        ]
      },
      {
        text: "By the time he will arrive, we will already eating dinner. He always comes lately.",
        errors: [
          { word: "will", index: 4, correction: "", rule: "Time clauses use present simple: 'By the time he arrives'" },
          { word: "eating", index: 9, correction: "be eating", rule: "Future continuous: 'will already be eating'" },
          { word: "lately", index: 13, correction: "late", rule: "'Late' = not on time. 'Lately' = recently" }
        ]
      },
      {
        text: "I wish I didn't said that yesterday. If only I would think before speaking.",
        errors: [
          { word: "said", index: 4, correction: "say", rule: "After 'didn't', use base form" },
          { word: "would", index: 9, correction: "had", rule: "'If only' + past perfect for past regret: 'If only I had thought'" },
          { word: "think", index: 10, correction: "thought", rule: "Past participle needed after 'had': 'had thought'" }
        ]
      },
      {
        text: "She told me she will call me later but she never did. I have waited all night.",
        errors: [
          { word: "will", index: 4, correction: "would", rule: "Reported speech: 'will' → 'would'" },
          { word: "have", index: 13, correction: "had", rule: "Context is past: past simple 'waited' or 'had waited'" }
        ]
      },
      {
        text: "They are married since 1990. They first meet at a party and immediately falled in love.",
        errors: [
          { word: "are", index: 1, correction: "have been", rule: "'Since 1990' = present perfect: 'have been married'" },
          { word: "meet", index: 7, correction: "met", rule: "Past narrative: 'met' (past simple)" },
          { word: "falled", index: 13, correction: "fell", rule: "'Fall' is irregular: fall → fell → fallen" }
        ]
      },
      {
        text: "Right now she is seeming tired. She has been worked all day and she didn't ate lunch.",
        errors: [
          { word: "seeming", index: 4, correction: "seems", rule: "'Seem' is a state verb — use simple present" },
          { word: "worked", index: 9, correction: "working", rule: "Present perfect continuous: 'has been working'" },
          { word: "ate", index: 14, correction: "eat", rule: "After 'didn't', use base form: 'didn't eat'" }
        ]
      }
    ]
  },
  vocabulary: {
    label: 'Vocabulary',
    icon: '📚',
    level: 'B1–B2',
    items: [
      {
        text: "The economic situation is getting worst every day. Many people are loosing their works and can't afford basic necessities.",
        errors: [
          { word: "worst", index: 5, correction: "worse", rule: "Comparative form: 'worse'. 'Worst' is superlative" },
          { word: "loosing", index: 10, correction: "losing", rule: "'Lose' → 'losing'. 'Loose' means not tight" },
          { word: "works", index: 12, correction: "jobs", rule: "'Job' is countable (specific position). 'Work' is uncountable" }
        ]
      },
      {
        text: "I'm very interesting in this course. The professor's advices are always practical and he makes us to think critically.",
        errors: [
          { word: "interesting", index: 2, correction: "interested", rule: "-ed adjective for feelings: 'I am interested'" },
          { word: "advices", index: 7, correction: "advice", rule: "'Advice' is uncountable — no plural form" },
          { word: "to", index: 14, correction: "", rule: "'Make' + object + bare infinitive: 'makes us think'" }
        ]
      },
      {
        text: "She did a big fault in her presentation. Her colleagues were very disappointing and the manager said it was unacceptable.",
        errors: [
          { word: "fault", index: 4, correction: "mistake", rule: "'Mistake' = error you make. 'Fault' = responsibility/blame" },
          { word: "disappointing", index: 10, correction: "disappointed", rule: "-ed for people's feelings: 'they were disappointed'" }
        ]
      },
      {
        text: "Could you borrow me your pen? I forgot mines at home and I need to make my homework before class.",
        errors: [
          { word: "borrow", index: 2, correction: "lend", rule: "'Lend' = give temporarily. 'Borrow' = take temporarily" },
          { word: "mines", index: 7, correction: "mine", rule: "Possessive pronoun: 'mine' (no 's')" },
          { word: "make", index: 13, correction: "do", rule: "Collocation: 'do homework', not 'make homework'" }
        ]
      },
      {
        text: "The travel from London to Paris takes about two hours by train. It's a very comfortble journey with beautiful countryside.",
        errors: [
          { word: "travel", index: 1, correction: "journey", rule: "'Journey/trip' = specific instance. 'Travel' = general activity (uncountable)" },
          { word: "comfortble", index: 14, correction: "comfortable", rule: "Spelling: 'comfortable' (don't skip the 'a')" },
          { word: "countryside", index: 17, correction: "scenery", rule: "'Scenery' = views from a vehicle. 'Countryside' = rural area (less natural here)" }
        ]
      },
      {
        text: "I'm looking forward to see you at the meeting. Please remember me to bring the documents.",
        errors: [
          { word: "see", index: 5, correction: "seeing", rule: "'Look forward to' + gerund: 'to seeing'" },
          { word: "remember", index: 10, correction: "remind", rule: "'Remind' someone to do something. 'Remember' = recall" }
        ]
      },
      {
        text: "Actually, I don't agree with you. In my opinion, this is a very sensible topic and we should be careful discussing it.",
        errors: [
          { word: "sensible", index: 13, correction: "sensitive", rule: "'Sensitive' = delicate. 'Sensible' = practical/reasonable" }
        ]
      },
      {
        text: "He said me that the exam was really hard. He couldn't respond all the questions and he thinks he will not pass it.",
        errors: [
          { word: "said", index: 1, correction: "told", rule: "'Tell' + indirect object: 'told me'. 'Say' doesn't take indirect object directly" },
          { word: "respond", index: 10, correction: "answer", rule: "'Answer' a question. 'Respond' to a situation/letter" }
        ]
      },
      {
        text: "She's actually a very sympathetic person who gets along with everyone. Sometimes she's too much sensible to criticism though.",
        errors: [
          { word: "sympathetic", index: 4, correction: "friendly", rule: "False friend: 'sympathetic' = showing pity. 'Simpático' = friendly/nice" },
          { word: "much", index: 14, correction: "", rule: "'Too sensible' — don't use 'much' before adjectives after 'too'" },
          { word: "sensible", index: 15, correction: "sensitive", rule: "'Sensitive' = easily affected. 'Sensible' = practical" }
        ]
      },
      {
        text: "The assistant explained us the process very good. At the end we received a comprehensive inform about our options.",
        errors: [
          { word: "us", index: 2, correction: "to us", rule: "'Explain' + to + indirect object: 'explained to us'" },
          { word: "good", index: 6, correction: "well", rule: "Adverb needed: 'explained well', not 'good'" },
          { word: "inform", index: 14, correction: "report", rule: "'Report/document' = noun. 'Inform' is only a verb in English" }
        ]
      }
    ]
  },
  prepositions: {
    label: 'Prepositions',
    icon: '📌',
    level: 'A2–B1',
    items: [
      {
        text: "I arrived to the office in Monday morning. My boss was waiting for me since an hour.",
        errors: [
          { word: "to", index: 2, correction: "at", rule: "'Arrive at' a building/place (not 'to')" },
          { word: "in", index: 5, correction: "on", rule: "Days use 'on': 'on Monday'" },
          { word: "since", index: 13, correction: "for", rule: "'An hour' is a duration — use 'for'" }
        ]
      },
      {
        text: "She's afraid from spiders. She depends of her brother to remove them from the house.",
        errors: [
          { word: "from", index: 2, correction: "of", rule: "'Afraid of' (not 'from')" },
          { word: "of", index: 5, correction: "on", rule: "'Depend on' (not 'of')" }
        ]
      },
      {
        text: "We are going in holiday in August. We will stay in a hotel at the beach for two weeks.",
        errors: [
          { word: "in", index: 3, correction: "on", rule: "'Go on holiday' (not 'in')" },
          { word: "at", index: 14, correction: "on/near", rule: "'On the beach' or 'near the beach' (not 'at')" }
        ]
      },
      {
        text: "He's very good in maths. He's interested on becoming an engineer and applied to a university.",
        errors: [
          { word: "in", index: 3, correction: "at", rule: "'Good at' a subject (not 'in')" },
          { word: "on", index: 7, correction: "in", rule: "'Interested in' (not 'on')" }
        ]
      },
      {
        text: "I usually go to work with car but today I went by foot because the weather was nice.",
        errors: [
          { word: "with", index: 5, correction: "by", rule: "'By car' (mode of transport)" },
          { word: "by", index: 10, correction: "on", rule: "'On foot' (not 'by foot')" }
        ]
      },
      {
        text: "The meeting starts in 9 o'clock. Please sit down on your chair and look on the screen.",
        errors: [
          { word: "in", index: 3, correction: "at", rule: "Specific times use 'at': 'at 9 o'clock'" },
          { word: "on", index: 8, correction: "in/on", rule: "'Sit in a chair' (armchair) or 'sit on a chair' — not 'down on'" },
          { word: "on", index: 12, correction: "at", rule: "'Look at' (not 'look on')" }
        ]
      },
      {
        text: "She married with a man she met at Internet. They have been together since five years now.",
        errors: [
          { word: "with", index: 2, correction: "", rule: "'Marry' someone directly (no preposition): 'married a man'" },
          { word: "at", index: 7, correction: "on", rule: "'On the Internet' (not 'at')" },
          { word: "since", index: 12, correction: "for", rule: "'Five years' is a duration — use 'for'" }
        ]
      },
      {
        text: "I dreamed with my grandmother last night. She told me to believe on myself and never give up.",
        errors: [
          { word: "with", index: 2, correction: "about", rule: "'Dream about' (not 'with' — that's a Spanish calque)" },
          { word: "on", index: 12, correction: "in", rule: "'Believe in' (not 'on')" }
        ]
      },
      {
        text: "He apologized for arrive late. He explained that he was stuck on traffic during rush hour.",
        errors: [
          { word: "arrive", index: 3, correction: "arriving", rule: "'Apologize for' + gerund: 'for arriving'" },
          { word: "on", index: 10, correction: "in", rule: "'Stuck in traffic' (not 'on')" }
        ]
      },
      {
        text: "We discussed about the problem in the meeting. Everyone agreed in the solution except my boss who insisted in changing the plan.",
        errors: [
          { word: "about", index: 2, correction: "", rule: "'Discuss' is transitive — no preposition: 'discussed the problem'" },
          { word: "in", index: 9, correction: "on", rule: "'Agree on' a solution (not 'in')" },
          { word: "in", index: 15, correction: "on", rule: "'Insist on' (not 'in')" }
        ]
      }
    ]
  }
};
