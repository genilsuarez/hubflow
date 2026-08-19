// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
// Bugs críticos corregidos:
// - portmanteauWords: 2 items sin "___" (sin hueco jugable).
//   "The fog made driving dangerous. (smoke + fog)" → corregido.
//   "The device combines a phone and a camera. (picture + element)" → corregido.
// - compoundAdjectivesAdvanced: "mutually-beneficial" con guion (incorrecto,
//   los adverbios en -ly no se guionan). Corregido.
// - prefixedNeologisms: "personalized" usaba sufijo (-ized), no prefijo.
//   Item reemplazado.
export const CATEGORIES = {
  portmanteauWords: {
    label: 'Portmanteau Words (Blends)',
    icon: '🌀',
    options: ['brunch', 'breakfast-lunch', 'brefunch'],
    studyCards: [
      { front: 'Portmanteau / Blend = dos palabras fusionadas', back: 'breakfast + lunch = brunch · smoke + fog = smog · web + seminar = webinar', detail: 'El comienzo de una palabra se combina con el final de otra (o partes de ambas) para crear una nueva.' },
      { front: 'Neologismos comunes en inglés actual', back: 'brunch · smog · motel · infomercial · webinar · docudrama · dramedy · pixel · biotech · advertorial', detail: 'Muchos son tan comunes que ya no se sienten como mezclas, sino como palabras propias.' },
    ],
    items: [
      { sentence: "We had ___ at that new cafe. (breakfast + lunch)", correct: 'brunch', explain: "'Brunch' blends 'breakfast' and 'lunch' into one word." },
      { sentence: "The thick ___ made driving dangerous. (smoke + fog)", correct: 'smog', explain: "'Smog' blends 'smoke' and 'fog'.", options: ['smog', 'smoke-fog', 'smofog'] },
      { sentence: "He watched a ___ on the streaming service. (documentary + drama)", correct: 'docudrama', explain: "'Docudrama' blends 'documentary' and 'drama'.", options: ['docudrama', 'documadrama', 'docdrama'] },
      { sentence: "She works in the ___ industry. (motor + hotel)", correct: 'motel', explain: "'Motel' blends 'motor' and 'hotel'.", options: ['motel', 'motorel', 'mohotel'] },
      { sentence: "The ___ was very informative. (information + commercial)", correct: 'infomercial', explain: "'Infomercial' blends 'information' and 'commercial'.", options: ['infomercial', 'informecial', 'infocommercial'] },
      { sentence: "Each ___ on your screen is a tiny square of color. (picture + element)", correct: 'pixel', explain: "'Pixel' blends 'picture' and 'element'.", options: ['pixel', 'picel', 'pixelement'] },
      { sentence: "He gave a ___ talk about the merger. (web + seminar)", correct: 'webinar', explain: "'Webinar' blends 'web' and 'seminar'.", options: ['webinar', 'webseminar', 'webnar'] },
      { sentence: "The show is a ___ of comedy and tragedy.", correct: 'dramedy', explain: "'Dramedy' blends 'drama' and 'comedy'.", options: ['dramedy', 'comedrama', 'dracomedy'] },
      { sentence: "The app uses ___ technology. (biology + technology)", correct: 'biotech', explain: "'Biotech' blends 'biology' and 'technology'.", options: ['biotech', 'biotechnol', 'biology-tech'] },
      { sentence: "The magazine covers ___ trends. (advertisement + editorial)", correct: 'advertorial', explain: "'Advertorial' blends 'advertisement' and 'editorial'.", options: ['advertorial', 'adeditorial', 'advertedit'] },
    ]
  },
  compoundAdjectivesAdvanced: {
    label: 'Advanced Compound Adjectives',
    icon: '🎨',
    options: ['state-of-the-art', 'state of art', 'stateoftheart'],
    studyCards: [
      { front: 'Multi-word compound adjectives antes del sustantivo → guionados', back: 'state-of-the-art · once-in-a-lifetime · well-thought-out · split-second', detail: '"The lab uses state-of-the-art equipment." · "It was a once-in-a-lifetime decision."' },
      { front: 'Trampa: adverbio en -ly + adjetivo/participio → sin guion', back: '"mutually beneficial" (no "mutually-beneficial")', detail: 'Los adverbios en -ly no llevan guion aunque modifiquen un adjetivo compuesto: "mutually beneficial agreement", "widely accepted theory".' },
    ],
    items: [
      { sentence: "The lab uses ___ equipment.", correct: 'state-of-the-art', explain: "'State-of-the-art' is a multi-word compound adjective, hyphenated before the noun." },
      { sentence: "It was a ___ decision by the committee.", correct: 'once-in-a-lifetime', explain: "'Once-in-a-lifetime' is a multi-word compound adjective, hyphenated.", options: ['once-in-a-lifetime', 'once in lifetime', 'onceinalifetime'] },
      { sentence: "She has a ___ approach to problem-solving.", correct: 'no-nonsense', explain: "'No-nonsense' is a compound adjective, hyphenated before the noun.", options: ['no-nonsense', 'nononsense', 'no nonsense'] },
      { sentence: "It was a ___ argument.", correct: 'well-thought-out', explain: "'Well-thought-out' is a multi-word compound adjective, hyphenated.", options: ['well-thought-out', 'wellthoughtout', 'well thought out'] },
      { sentence: "The company adopted a ___ strategy.", correct: 'long-term', explain: "'Long-term' is a compound adjective, hyphenated before the noun.", options: ['long-term', 'longterm', 'long term'] },
      { sentence: "He gave a ___ presentation.", correct: 'thought-provoking', explain: "'Thought-provoking' is a compound adjective, hyphenated before the noun.", options: ['thought-provoking', 'thoughtprovoking', 'thought provoking'] },
      { sentence: "It was a ___ decision, made in seconds.", correct: 'split-second', explain: "'Split-second' is a compound adjective, hyphenated before the noun.", options: ['split-second', 'splitsecond', 'split second'] },
      { sentence: "The negotiations reached a ___ agreement.", correct: 'mutually beneficial', explain: "Adverbs ending in -ly do NOT take a hyphen: 'mutually beneficial' (no hyphen before -ly adverbs).", options: ['mutually beneficial', 'mutually-beneficial', 'mutuallybeneficial'] },
      { sentence: "She has a ___ personality.", correct: 'larger-than-life', explain: "'Larger-than-life' is a multi-word compound adjective, hyphenated.", options: ['larger-than-life', 'largerthanlife', 'larger than life'] },
      { sentence: "It was a ___ solution to the crisis.", correct: 'one-size-fits-all', explain: "'One-size-fits-all' is a multi-word compound adjective, hyphenated.", options: ['one-size-fits-all', 'onesizefitsall', 'one size fits all'] },
    ]
  },
  prefixedNeologisms: {
    label: 'Prefixed Neologisms',
    icon: '🆕',
    options: ['cyberbullying', 'ecyberbullying', 'cyber-bully-ing'],
    studyCards: [
      { front: 'Prefijos modernos frecuentes', back: 'cyber- · e- · eco- · bio- · multi- · hyper- · pro- · nano-', detail: '"cyberbullying" · "e-commerce" · "eco-friendly" · "bioengineering" · "multitasking" · "hyperconnected" · "pro-environment" · "nanotech"' },
      { front: 'Trampa: sufijo ≠ prefijo', back: '"personalized" usa el sufijo -ized, no un prefijo', detail: 'Los prefijos van AL INICIO (cyber-, eco-, bio-). Los sufijos van AL FINAL (-ized, -ful, -ness). "Personalized" = person + -alize + -d (sufijo).' },
    ],
    items: [
      { sentence: "The school addressed the issue of ___.", correct: 'cyberbullying', explain: "'Cyber-' is a modern prefix meaning 'related to computers/the internet'." },
      { sentence: "The company focuses on ___ solutions.", correct: 'e-commerce', explain: "'E-' is a modern prefix meaning 'electronic', often hyphenated.", options: ['e-commerce', 'ecommerce', 'electroncommerce'] },
      { sentence: "The city promotes ___ practices.", correct: 'eco-friendly', explain: "'Eco-' is a modern prefix meaning 'related to the environment'.", options: ['eco-friendly', 'ecofriendly', 'ecology-friendly'] },
      { sentence: "She works in the field of ___.", correct: 'bioengineering', explain: "'Bio-' is a modern prefix meaning 'related to living organisms'.", options: ['bioengineering', 'biologyengineering', 'bio-engine'] },
      { sentence: "The device has ___ capabilities.", correct: 'multitasking', explain: "'Multi-' is a prefix meaning 'many', combined with 'tasking'.", options: ['multitasking', 'manytasking', 'multi-task-ing'] },
      { sentence: "The team works in a ___ environment.", correct: 'hyperconnected', explain: "'Hyper-' is a prefix meaning 'extremely', combined with 'connected'.", options: ['hyperconnected', 'superconnected', 'hyper-connect'] },
      { sentence: "The government launched a ___ campaign.", correct: 'pro-environment', explain: "'Pro-' is a prefix meaning 'in favor of'.", options: ['pro-environment', 'anti-environment', 'in-environment'] },
      { sentence: "The startup is developing ___ technology.", correct: 'nanotech', explain: "'Nano-' is a modern prefix meaning 'extremely small'.", options: ['nanotech', 'microtech', 'minitech'] },
      { sentence: "Their new ___ campaign reached millions online.", correct: 'cyber', explain: "'Cyber-' prefixes words related to internet/online activity.", options: ['cyber', 'e-', 'bio-'] },
      { sentence: "The policy aims to be ___.", correct: 'future-proof', explain: "'Future-proof' is a compound describing something built to withstand future changes.", options: ['future-proof', 'futureproofed', 'proof-future'] },
    ]
  },
  technicalCompounds: {
    label: 'Technical Compounds',
    icon: '⚙️',
    options: ['cost-effective', 'effectivecost', 'cost effect'],
    studyCards: [
      { front: 'Compuestos técnicos — siempre guionados antes del sustantivo', back: 'cost-effective · user-friendly · data-driven · time-saving · energy-efficient', detail: '"A cost-effective solution." · "A user-friendly interface." · "An energy-efficient process."' },
    ],
    items: [
      { sentence: "The new method is much more ___.", correct: 'cost-effective', explain: "'Cost-effective' is a technical compound adjective, hyphenated." },
      { sentence: "The system is designed to be ___.", correct: 'user-friendly', explain: "'User-friendly' is a technical compound adjective, hyphenated.", options: ['user-friendly', 'userfriendly', 'friendly-user'] },
      { sentence: "The plan needs a ___ approach.", correct: 'data-driven', explain: "'Data-driven' is a technical compound adjective, hyphenated.", options: ['data-driven', 'datadriven', 'driven-data'] },
      { sentence: "The company is known for its ___ solutions.", correct: 'time-saving', explain: "'Time-saving' is a technical compound adjective, hyphenated.", options: ['time-saving', 'timesaving', 'saving-time'] },
      { sentence: "It's an ___ process.", correct: 'energy-efficient', explain: "'Energy-efficient' is a technical compound adjective, hyphenated.", options: ['energy-efficient', 'energyefficient', 'efficient-energy'] },
      { sentence: "The device is completely ___.", correct: 'self-sufficient', explain: "'Self-sufficient' is a technical compound adjective, hyphenated.", options: ['self-sufficient', 'selfsufficient', 'sufficient-self'] },
      { sentence: "The team follows a ___ methodology.", correct: 'results-oriented', explain: "'Results-oriented' is a technical compound adjective, hyphenated.", options: ['results-oriented', 'resultsoriented', 'oriented-results'] },
      { sentence: "It is a ___ platform.", correct: 'cross-platform', explain: "'Cross-platform' is a technical compound adjective, hyphenated.", options: ['cross-platform', 'crossplatform', 'platform-cross'] },
      { sentence: "The system offers ___ support.", correct: 'round-the-clock', explain: "'Round-the-clock' is a multi-word compound adjective, hyphenated.", options: ['round-the-clock', 'roundtheclock', 'round the clock'] },
      { sentence: "The design follows a ___ approach.", correct: 'mobile-first', explain: "'Mobile-first' is a technical compound adjective, hyphenated.", options: ['mobile-first', 'mobilefirst', 'first-mobile'] },
    ]
  }
};
