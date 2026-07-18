/**
 * HubFlow — Verb + Prep Chunks Data
 * Fixed combinations: verbs that ALWAYS require their preposition,
 * and Wh-questions with stranded prepositions (end-of-question pattern).
 *
 * Categories:
 *   prepositional — verb + obligatory preposition (listen to, wait for…)
 *   questions     — Wh-questions with preposition at end (Where are you from?)
 */

export const CATEGORIES = {
  prepositional: {
    label: 'Verb + Prep',
    icon: '🔗',
    items: [
      { verb: "listen", ipa: "/ˈlɪsən/",    prep: "to",    es: "escuchar",              example: "I always listen to music on the bus.",           gap: "I always listen ___ music on the bus." },
      { verb: "look", ipa: "/lʊk/",      prep: "at",    es: "mirar",                 example: "Look at this photo!",                           gap: "Look ___ this photo!" },
      { verb: "look", ipa: "/lʊk/",      prep: "for",   es: "buscar",                example: "She's looking for her phone.",                   gap: "She's looking ___ her phone." },
      { verb: "look", ipa: "/lʊk/",      prep: "after", es: "cuidar de",             example: "He looks after his little brother.",             gap: "He looks ___ his little brother." },
      { verb: "wait", ipa: "/weɪt/",      prep: "for",   es: "esperar",               example: "We're waiting for the bus.",                     gap: "We're waiting ___ the bus." },
      { verb: "talk", ipa: "/tɔːk/",      prep: "to",    es: "hablar con",            example: "Can I talk to you for a minute?",               gap: "Can I talk ___ you for a minute?" },
      { verb: "work", ipa: "/wɜːrk/",      prep: "on",    es: "trabajar en",           example: "I'm working on a new project.",                  gap: "I'm working ___ a new project." },
      { verb: "take care", ipa: "/teɪk kɛr/", prep: "of",    es: "cuidar / encargarse",   example: "She takes care of everything.",                  gap: "She takes care ___ everything." },
      { verb: "depend", ipa: "/dɪˈpɛnd/",    prep: "on",    es: "depender de",           example: "It depends on the weather.",                     gap: "It depends ___ the weather." },
      { verb: "belong", ipa: "/bɪˈlɒŋ/",    prep: "to",    es: "pertenecer a",          example: "This book belongs to me.",                       gap: "This book belongs ___ me." },
      { verb: "agree", ipa: "/əˈɡriː/",     prep: "with",  es: "estar de acuerdo con",  example: "I agree with you completely.",                   gap: "I agree ___ you completely." },
      { verb: "think", ipa: "/θɪŋk/",     prep: "about", es: "pensar en",             example: "I'm thinking about the problem.",                gap: "I'm thinking ___ the problem." },
      { verb: "ask", ipa: "/æsk/",       prep: "for",   es: "pedir",                 example: "He asked for a glass of water.",                 gap: "He asked ___ a glass of water." },
      { verb: "pay", ipa: "/peɪ/",       prep: "for",   es: "pagar por",             example: "Who's going to pay for dinner?",                 gap: "Who's going to pay ___ dinner?" },
      { verb: "apologize", ipa: "/əˈpɒlədʒaɪz/", prep: "for",   es: "disculparse por",       example: "She apologized for being late.",                 gap: "She apologized ___ being late." },
      { verb: "dream", ipa: "/driːm/",     prep: "about", es: "soñar con",             example: "I dream about travelling the world.",            gap: "I dream ___ travelling the world." },
      { verb: "believe", ipa: "/bɪˈliːv/",   prep: "in",    es: "creer en",              example: "Do you believe in ghosts?",                      gap: "Do you believe ___ ghosts?" },
      { verb: "laugh", ipa: "/lɑːf/",     prep: "at",    es: "reírse de",             example: "Don't laugh at him.",                            gap: "Don't laugh ___ him." },
      { verb: "suffer", ipa: "/ˈsʌfər/",    prep: "from",  es: "sufrir de",             example: "She suffers from headaches.",                    gap: "She suffers ___ headaches." },
      { verb: "consist", ipa: "/kənˈsɪst/",   prep: "of",    es: "consistir en",          example: "The team consists of five people.",              gap: "The team consists ___ five people." },
      { verb: "spend", ipa: "/spɛnd/",     prep: "on",    es: "gastar en",             example: "He spends too much on clothes.",                 gap: "He spends too much ___ clothes." },
      { verb: "complain", ipa: "/kəmˈpleɪn/",  prep: "about", es: "quejarse de",           example: "Stop complaining about the food.",               gap: "Stop complaining ___ the food." },
      { verb: "concentrate", ipa: "/ˈkɒnsəntreɪt/", prep: "on",  es: "concentrarse en",       example: "I can't concentrate on my work.",                gap: "I can't concentrate ___ my work." },
      { verb: "insist", ipa: "/ɪnˈsɪst/",    prep: "on",    es: "insistir en",           example: "She insisted on paying.",                        gap: "She insisted ___ paying." },
    ]
  },
  questions: {
    label: 'Question Chunks',
    icon: '❓',
    items: [
      { pattern: "Where … from",   prep: "from",  es: "¿De dónde…?",           example: "Where are you from?",                     gap: "Where are you ___?" },
      { pattern: "Who … with",     prep: "with",  es: "¿Con quién…?",           example: "Who are you going with?",                 gap: "Who are you going ___?" },
      { pattern: "What … about",   prep: "about", es: "¿De qué / sobre qué…?", example: "What are you talking about?",              gap: "What are you talking ___?" },
      { pattern: "Who … to",       prep: "to",    es: "¿A quién / con quién…?", example: "Who did you speak to?",                   gap: "Who did you speak ___?" },
      { pattern: "What … for",     prep: "for",   es: "¿Para qué…?",            example: "What is this button for?",                gap: "What is this button ___?" },
      { pattern: "Who … for",      prep: "for",   es: "¿Para quién…?",          example: "Who is this present for?",                gap: "Who is this present ___?" },
      { pattern: "What … in",      prep: "in",    es: "¿En qué…?",              example: "What city do you live in?",               gap: "What city do you live ___?" },
      { pattern: "What … at",      prep: "at",    es: "¿A qué / en qué…?",      example: "What are you looking at?",                gap: "What are you looking ___?" },
      { pattern: "Who … at",       prep: "at",    es: "¿A quién…? (mirar)",     example: "Who are you laughing at?",                gap: "Who are you laughing ___?" },
      { pattern: "What … on",      prep: "on",    es: "¿En qué…? (trabajar)",   example: "What are you working on?",                gap: "What are you working ___?" },
      { pattern: "Where … to",     prep: "to",    es: "¿A dónde…?",             example: "Where are you going to?",                 gap: "Where are you going ___?" },
      { pattern: "Who … about",    prep: "about", es: "¿Sobre quién…?",         example: "Who are you thinking about?",             gap: "Who are you thinking ___?" },
      { pattern: "What … of",      prep: "of",    es: "¿De qué…? (opinión)",    example: "What do you think of this?",              gap: "What do you think ___?" },
      { pattern: "What … with",    prep: "with",  es: "¿Con qué…?",             example: "What did you open it with?",              gap: "What did you open it ___?" },
      { pattern: "Who … from",     prep: "from",  es: "¿De quién…?",            example: "Who did you get this from?",              gap: "Who did you get this ___?" },
      { pattern: "Where … at",     prep: "at",    es: "¿En dónde…?",            example: "Where are you staying at?",               gap: "Where are you staying ___?" },
    ]
  }
};
