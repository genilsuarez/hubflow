// `studyCards` enseña la REGLA del par antes de examinarla en Quiz. Antes
// Study mostraba las mismas 10 frases del Quiz con la respuesta detrás — el
// examen disfrazado de flashcard, sin la regla enunciada en ningún lado.
// Mismo patrón que sentence-quiz-engine.js / a1-plurals-possessives.js.
export const CATEGORIES = {
  'there-their-theyre': {
    label: "There / Their / They're",
    icon: "🏠",
    pairs: ["there","their","they're"],
    studyCards: [
      { front: 'there', back: 'place / existence', detail: "Put it over there. · There isn't much time. (adverbio de lugar, o 'there is/are')" },
      { front: 'their', back: 'possessive (de ellos)', detail: 'Their house · their car — va siempre antes de un sustantivo.' },
      { front: "they're", back: "= they are", detail: "They're coming tonight. Si puedes expandirlo a 'they are' sin que suene raro, es 'they're'." },
      { front: 'Cómo elegir', back: "Expándelo a 'they are'", detail: "¿Tiene sentido? → they're. ¿Es un lugar? → there. ¿Es de ellos? → their." },
    ],
    items: [
      { sentence: "Put the box over ___.", correct: "there", explain: "'There' = lugar (adverbio de lugar)." },
      { sentence: "___ house is on the corner.", correct: "their", explain: "'Their' = posesivo (de ellos)." },
      { sentence: "___ coming to the party tonight.", correct: "they're", explain: "'They're' = contraction of 'they are'." },
      { sentence: "___ isn't much time left.", correct: "there", explain: "'There' + is/are/isn't = existencia." },
      { sentence: "I saw ___ new car yesterday.", correct: "their", explain: "'Their' = possessive before a noun." },
      { sentence: "___ always late to meetings.", correct: "they're", explain: "'They're' = 'they are' + adjective." },
      { sentence: "We left the keys over ___.", correct: "there", explain: "'There' = lugar." },
      { sentence: "Look over ___, near the door.", correct: "there", explain: "'There' = lugar (adverbio de lugar)." },
      { sentence: "___ car broke down on the motorway.", correct: "Their", explain: "'Their' = posesivo." },
      { sentence: "___ not sure if they can come.", correct: "They're", explain: "'They're' = contraction of 'they are'." },
    ]
  },
  'your-youre': {
    label: "Your / You're",
    icon: "👤",
    pairs: ["your","you're"],
    studyCards: [
      { front: 'your', back: 'possessive (de ti)', detail: 'Your bag · your passport — va siempre antes de un sustantivo.' },
      { front: "you're", back: "= you are", detail: "You're right. · You're welcome. Si puedes expandirlo a 'you are', es 'you're'." },
      { front: 'Error más común', back: "'your welcome' es incorrecto", detail: "'You're welcome' = de nada (you ARE welcome). 'Your welcome' no tiene sentido: welcome no es tuyo." },
    ],
    items: [
      { sentence: "Is this ___ bag?", correct: "your", explain: "'Your' = posesivo (de ti)." },
      { sentence: "___ going to love this movie.", correct: "you're", explain: "'You're' = contraction of 'you are'." },
      { sentence: "Don't forget ___ passport.", correct: "your", explain: "'Your' + noun = possessive." },
      { sentence: "___ right, I made a mistake.", correct: "you're", explain: "'You're' = 'you are' + adjective." },
      { sentence: "What's ___ favourite colour?", correct: "your", explain: "'Your' = posesivo." },
      { sentence: "___ doing a great job.", correct: "you're", explain: "'You're' = 'you are' + gerundio." },
      { sentence: "I love ___ new haircut.", correct: "your", explain: "'Your' = posesivo." },
      { sentence: "___ welcome to join us anytime.", correct: "You're", explain: "'You're' = contraction of 'you are'." },
      { sentence: "Where did you leave ___ keys?", correct: "your", explain: "'Your' + noun = possessive." },
      { sentence: "___ not going to believe this.", correct: "You're", explain: "'You're' = 'you are' + going to." },
    ]
  },
  'its-its': {
    label: "Its / It's",
    icon: "🐾",
    pairs: ["its","it's"],
    studyCards: [
      { front: 'its (sin apóstrofe)', back: 'possessive', detail: "The dog wagged its tail. · The company changed its policy." },
      { front: "it's (con apóstrofe)", back: "= it is / it has", detail: "It's raining. (it is) · It's been a long day. (it has)" },
      { front: 'Trampa clásica', back: "el apóstrofe NO marca posesivo aquí", detail: "A diferencia de 'Tom's car', 'it's' con apóstrofe nunca es posesivo. El posesivo es 'its', sin apóstrofe." },
    ],
    items: [
      { sentence: "The dog wagged ___ tail.", correct: "its", explain: "'Its' (no apostrophe) = possessive." },
      { sentence: "___ raining again.", correct: "it's", explain: "'It's' = contraction of 'it is'." },
      { sentence: "The company changed ___ policy.", correct: "its", explain: "'Its' = posesivo." },
      { sentence: "___ been a long day.", correct: "it's", explain: "'It's' = 'it has' (contraction)." },
      { sentence: "Every dog has ___ day.", correct: "its", explain: "'Its' = possessive (in this saying)." },
      { sentence: "___ too late to cancel now.", correct: "it's", explain: "'It's' = 'it is'." },
      { sentence: "The cat licked ___ paw.", correct: "its", explain: "'Its' (no apostrophe) = possessive." },
      { sentence: "___ nice to finally meet you.", correct: "It's", explain: "'It's' = contraction of 'it is'." },
      { sentence: "The company updated ___ website.", correct: "its", explain: "'Its' = posesivo." },
      { sentence: "___ getting late, we should go.", correct: "It's", explain: "'It's' = 'it is'." },
    ]
  },
};
