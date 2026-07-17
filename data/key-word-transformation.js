/**
 * HubFlow — Key Word Transformation Data
 * Cambridge-style: given a sentence + keyword, rewrite using 2-5 words including the keyword.
 * Categories: grammar, vocabulary, connectors, mixed (10 items each = 40 total)
 */

export const CATEGORIES = {
  grammar: {
    label: "Grammar Transforms",
    icon: "🔄",
    level: "B1–B2",
    items: [
      {
        original: "They built this bridge in 1990.",
        keyword: "WAS",
        correct: [
          "This bridge was built in 1990."
        ],
        hint: "Change to passive voice",
        explain: "Active → passive: 'was built' uses the keyword and keeps the meaning."
      },
      {
        original: "It's not necessary for you to come.",
        keyword: "HAVE",
        correct: [
          "You don't have to come."
        ],
        hint: "Express lack of obligation",
        explain: "'Don't have to' = it's not necessary."
      },
      {
        original: "I started learning French three years ago.",
        keyword: "BEEN",
        correct: [
          "I have been learning French for three years."
        ],
        hint: "Use present perfect continuous",
        explain: "'Have been learning' shows duration from the past until now."
      },
      {
        original: "She can't possibly be at home.",
        keyword: "CAN'T",
        correct: [
          "She can't be at home."
        ],
        hint: "Modal of deduction (negative)",
        explain: "'Can't be' expresses impossibility/strong deduction."
      },
      {
        original: "Perhaps he missed the train.",
        keyword: "MIGHT",
        correct: [
          "He might have missed the train."
        ],
        hint: "Modal of past possibility",
        explain: "'Might have missed' = it's possible that he missed it."
      },
      {
        original: "People say he is very rich.",
        keyword: "SAID",
        correct: [
          "He is said to be very rich."
        ],
        hint: "Impersonal passive structure",
        explain: "'Is said to be' is the passive reporting structure."
      },
      {
        original: "I last saw her two weeks ago.",
        keyword: "SEEN",
        correct: [
          "I haven't seen her for two weeks."
        ],
        hint: "Convert to present perfect negative",
        explain: "'Haven't seen for' = time since last occurrence."
      },
      {
        original: "It was wrong of you to shout at her.",
        keyword: "SHOULDN'T",
        correct: [
          "You shouldn't have shouted at her."
        ],
        hint: "Past regret with modal",
        explain: "'Shouldn't have + past participle' = past criticism."
      },
      {
        original: "Nobody told me about the meeting.",
        keyword: "TOLD",
        correct: [
          "I wasn't told about the meeting."
        ],
        hint: "Passive with indirect object",
        explain: "'I wasn't told' makes 'me' the subject of a passive sentence."
      },
      {
        original: "He doesn't usually arrive this late.",
        keyword: "UNUSUAL",
        correct: [
          "It is unusual for him to arrive this late."
        ],
        hint: "Use 'it is + adjective + for' structure",
        explain: "'It is unusual for him to...' rephrases the negative habit."
      }
    ]
  },
  vocabulary: {
    label: "Vocabulary Swaps",
    icon: "📝",
    level: "B1–B2",
    items: [
      {
        original: "She resembles her mother.",
        keyword: "TAKES",
        correct: [
          "She takes after her mother."
        ],
        hint: "Phrasal verb for 'resemble'",
        explain: "'Take after' = look or behave like a family member."
      },
      {
        original: "He tolerates her bad manners.",
        keyword: "PUTS",
        correct: [
          "He puts up with her bad manners."
        ],
        hint: "Phrasal verb for 'tolerate'",
        explain: "'Put up with' = tolerate something unpleasant."
      },
      {
        original: "She refused the job offer.",
        keyword: "TURNED",
        correct: [
          "She turned down the job offer."
        ],
        hint: "Phrasal verb for 'refuse'",
        explain: "'Turn down' = reject/refuse an offer."
      },
      {
        original: "They postponed the meeting.",
        keyword: "PUT",
        correct: [
          "They put off the meeting."
        ],
        hint: "Phrasal verb for 'postpone'",
        explain: "'Put off' = delay to a later time."
      },
      {
        original: "I can't tolerate loud music.",
        keyword: "STAND",
        correct: [
          "I can't stand loud music."
        ],
        hint: "Use 'can't stand' for intolerance",
        explain: "'Can't stand' = can't tolerate / hate."
      },
      {
        original: "He invented that story.",
        keyword: "MADE",
        correct: [
          "He made up that story."
        ],
        hint: "Phrasal verb for 'invent' (a lie)",
        explain: "'Make up' = invent / fabricate."
      },
      {
        original: "The plane departed on time.",
        keyword: "TOOK",
        correct: [
          "The plane took off on time."
        ],
        hint: "Phrasal verb for 'depart' (planes)",
        explain: "'Take off' = leave the ground (aviation)."
      },
      {
        original: "She discovered the truth by accident.",
        keyword: "FOUND",
        correct: [
          "She found out the truth by accident."
        ],
        hint: "Phrasal verb for 'discover'",
        explain: "'Find out' = discover information."
      },
      {
        original: "He raised his children alone.",
        keyword: "BROUGHT",
        correct: [
          "He brought up his children alone."
        ],
        hint: "Phrasal verb for 'raise children'",
        explain: "'Bring up' = raise / educate children."
      },
      {
        original: "The meeting was cancelled.",
        keyword: "CALLED",
        correct: [
          "The meeting was called off."
        ],
        hint: "Phrasal verb for 'cancel'",
        explain: "'Call off' = cancel something planned."
      }
    ]
  },
  connectors: {
    label: "Linkers & Contrast",
    icon: "⚡",
    level: "B2",
    items: [
      {
        original: "He was tired. He finished the work.",
        keyword: "ALTHOUGH",
        correct: [
          "Although he was tired, he finished the work."
        ],
        hint: "Add concession with although",
        explain: "'Although' introduces a contrast between tiredness and completing work."
      },
      {
        original: "She studied hard. She failed the exam.",
        keyword: "DESPITE",
        correct: [
          "Despite studying hard, she failed the exam."
        ],
        hint: "Use 'despite + -ing'",
        explain: "'Despite + gerund' shows an unexpected result."
      },
      {
        original: "The weather was bad. We still had fun.",
        keyword: "SPITE",
        correct: [
          "In spite of the bad weather, we still had fun."
        ],
        hint: "Use 'in spite of + noun'",
        explain: "'In spite of' = despite."
      },
      {
        original: "I left early so that I wouldn't be late.",
        keyword: "ORDER",
        correct: [
          "I left early in order not to be late."
        ],
        hint: "Purpose with 'in order to'",
        explain: "'In order not to' = purpose (avoiding something)."
      },
      {
        original: "He's rich but he's not happy.",
        keyword: "HOWEVER",
        correct: [
          "He's rich. However, he's not happy.",
          "He's rich; however, he's not happy."
        ],
        hint: "Separate into two sentences with however",
        explain: "'However' adds formal contrast between two ideas."
      },
      {
        original: "She speaks French and Spanish.",
        keyword: "WELL",
        correct: [
          "She speaks French as well as Spanish."
        ],
        hint: "Use 'as well as' for addition",
        explain: "'As well as' = in addition to / and also."
      },
      {
        original: "It was raining so we stayed inside.",
        keyword: "THEREFORE",
        correct: [
          "It was raining. Therefore, we stayed inside.",
          "It was raining; therefore, we stayed inside."
        ],
        hint: "Formal result connector",
        explain: "'Therefore' = so / as a result (formal)."
      },
      {
        original: "She didn't only sing. She also danced.",
        keyword: "BUT",
        correct: [
          "She not only sang but also danced.",
          "Not only did she sing, but she also danced."
        ],
        hint: "Use 'not only... but also'",
        explain: "'Not only... but also' emphasizes both actions."
      },
      {
        original: "He worked hard. As a result, he got promoted.",
        keyword: "CONSEQUENCE",
        correct: [
          "He worked hard. As a consequence, he got promoted."
        ],
        hint: "Replace 'as a result' with synonym",
        explain: "'As a consequence' = as a result (more formal)."
      },
      {
        original: "The hotel was expensive. On the other hand, it was very comfortable.",
        keyword: "WHEREAS",
        correct: [
          "The hotel was expensive, whereas it was very comfortable.",
          "Whereas the hotel was expensive, it was very comfortable."
        ],
        hint: "Direct contrast connector",
        explain: "'Whereas' directly contrasts two facts in one sentence."
      }
    ]
  },
  mixed: {
    label: "Mixed Challenge",
    icon: "🎯",
    level: "B2–C1",
    items: [
      {
        original: "I've never tasted such delicious food.",
        keyword: "MOST",
        correct: [
          "This is the most delicious food I've ever tasted."
        ],
        hint: "Superlative + present perfect",
        explain: "'The most... I've ever' converts the negative into a superlative."
      },
      {
        original: "He prefers tea to coffee.",
        keyword: "RATHER",
        correct: [
          "He would rather drink tea than coffee."
        ],
        hint: "Use 'would rather... than'",
        explain: "'Would rather... than' = preference structure."
      },
      {
        original: "You'd better leave now or you'll miss the bus.",
        keyword: "UNLESS",
        correct: [
          "Unless you leave now, you'll miss the bus."
        ],
        hint: "Condition: unless = if not",
        explain: "'Unless you leave' = if you don't leave."
      },
      {
        original: "I'm sorry I didn't call you earlier.",
        keyword: "APOLOGISE",
        correct: [
          "I apologise for not calling you earlier."
        ],
        hint: "Use 'apologise for + -ing'",
        explain: "'Apologise for not calling' = formal way to say sorry."
      },
      {
        original: "It's a long time since I saw a good film.",
        keyword: "AGES",
        correct: [
          "I haven't seen a good film for ages."
        ],
        hint: "Present perfect + 'for ages'",
        explain: "'Haven't seen for ages' = a very long time has passed."
      },
      {
        original: "He got the job although he had no experience.",
        keyword: "LACK",
        correct: [
          "He got the job despite his lack of experience."
        ],
        hint: "Use 'despite + noun (lack)'",
        explain: "'Despite his lack of' = although he didn't have."
      },
      {
        original: "It isn't worth trying to fix it.",
        keyword: "POINT",
        correct: [
          "There's no point in trying to fix it.",
          "There is no point in trying to fix it."
        ],
        hint: "Use 'no point in + -ing'",
        explain: "'No point in trying' = it's not worth the effort."
      },
      {
        original: "I'd prefer not to go out tonight.",
        keyword: "RATHER",
        correct: [
          "I'd rather not go out tonight."
        ],
        hint: "Use 'would rather not' + base verb",
        explain: "'Would rather not' = prefer not to (direct, informal)."
      },
      {
        original: "Nobody has ever asked me that before.",
        keyword: "TIME",
        correct: [
          "This is the first time anyone has asked me that.",
          "It's the first time anyone has ever asked me that."
        ],
        hint: "First time + present perfect",
        explain: "'The first time + has asked' converts 'never' into 'first time'."
      },
      {
        original: "He didn't say a word during the entire meeting.",
        keyword: "THROUGHOUT",
        correct: [
          "He remained silent throughout the entire meeting."
        ],
        hint: "Vocabulary swap + preposition of time",
        explain: "'Remained silent throughout' = didn't speak during all of."
      }
    ]
  }
};
