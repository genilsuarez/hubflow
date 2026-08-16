export const CATEGORIES = {
  abstractNounSuffixes: {
    label: 'Abstract Noun Suffixes',
    icon: '💭',
    options: ['significance', 'significant', 'signify'],
    items: [
      { sentence: "The discovery had huge ___ for the field.", correct: 'significance', explain: "The suffix -ance turns the adjective 'significant' into the abstract noun 'significance'." },
      { sentence: "Her ___ to the project was invaluable.", correct: 'contribution', explain: "The suffix -tion turns 'contribute' into the abstract noun 'contribution'.", options: ['contribution', 'contribute', 'contributory'] },
      { sentence: "The team showed great ___ under pressure.", correct: 'resilience', explain: "The suffix -ence turns 'resilient' into the abstract noun 'resilience'.", options: ['resilience', 'resilient', 'resiliently'] },
      { sentence: "His ___ was questioned by the board.", correct: 'competence', explain: "The suffix -ence turns 'competent' into the abstract noun 'competence'.", options: ['competence', 'competent', 'competently'] },
      { sentence: "The company values ___ in the workplace.", correct: 'transparency', explain: "The suffix -cy turns 'transparent' into the abstract noun 'transparency'.", options: ['transparency', 'transparent', 'transparently'] },
      { sentence: "The report lacked ___.", correct: 'coherence', explain: "The suffix -ence turns 'coherent' into the abstract noun 'coherence'.", options: ['coherence', 'coherent', 'coherently'] },
      { sentence: "Her ___ to detail impressed the interviewers.", correct: 'attentiveness', explain: "The suffix -ness turns 'attentive' into the abstract noun 'attentiveness'.", options: ['attentiveness', 'attentive', 'attentively'] },
      { sentence: "The council debated the ___ of the new policy.", correct: 'feasibility', explain: "The suffix -ity turns 'feasible' into the abstract noun 'feasibility'.", options: ['feasibility', 'feasible', 'feasibly'] },
      { sentence: "His ___ made him a great leader.", correct: 'humility', explain: "The suffix -ity turns 'humble' into the abstract noun 'humility'.", options: ['humility', 'humble', 'humbly'] },
      { sentence: "The negotiations required great ___.", correct: 'patience', explain: "The suffix -ence turns 'patient' into the abstract noun 'patience'.", options: ['patience', 'patient', 'patiently'] },
    ]
  },
  verbToAdjective: {
    label: 'Verb → Adjective',
    icon: '🔄',
    options: ['convincing', 'convince', 'convinced'],
    items: [
      { sentence: "Her argument was very ___.", correct: 'convincing', explain: "The suffix -ing turns the verb 'convince' into an active adjective." },
      { sentence: "I was completely ___ by her argument.", correct: 'convinced', explain: "The suffix -ed turns the verb into a passive adjective (how someone feels).", options: ['convinced', 'convincing', 'convince'] },
      { sentence: "The lecture was rather ___.", correct: 'tedious', explain: "'Tedious' is the adjective form related to boring, tiring content.", options: ['tedious', 'tediously', 'tedium'] },
      { sentence: "The results were ___.", correct: 'surprising', explain: "The suffix -ing describes the thing that causes the feeling.", options: ['surprising', 'surprised', 'surprise'] },
      { sentence: "I was ___ by the results.", correct: 'surprised', explain: "The suffix -ed describes how the person feels.", options: ['surprised', 'surprising', 'surprise'] },
      { sentence: "The lecture was ___.", correct: 'fascinating', explain: "The suffix -ing describes the thing that causes the feeling.", options: ['fascinating', 'fascinated', 'fascinate'] },
      { sentence: "The audience was ___ by the performance.", correct: 'fascinated', explain: "The suffix -ed describes how the audience feels.", options: ['fascinated', 'fascinating', 'fascinate'] },
      { sentence: "His behavior was quite ___.", correct: 'irritating', explain: "The suffix -ing describes the thing that causes the feeling.", options: ['irritating', 'irritated', 'irritate'] },
      { sentence: "She felt ___ by the delay.", correct: 'irritated', explain: "The suffix -ed describes how someone feels.", options: ['irritated', 'irritating', 'irritate'] },
      { sentence: "The news was ___.", correct: 'devastating', explain: "The suffix -ing describes the thing that causes the strong feeling.", options: ['devastating', 'devastated', 'devastate'] },
    ]
  },
  negativePrefixesAdvanced: {
    label: 'Negative Prefixes (advanced)',
    icon: '🚫',
    options: ['misinterpret', 'unsinterpret', 'ininterpret'],
    items: [
      { sentence: "She tried to ___ his words.", correct: 'misinterpret', explain: "'Mis-' means 'wrongly': misinterpret = to interpret wrongly." },
      { sentence: "The plan was ___ from the start.", correct: 'misguided', explain: "'Mis-' means 'wrongly': misguided = guided wrongly.", options: ['misguided', 'unguided', 'inguided'] },
      { sentence: "The information given was ___.", correct: 'misleading', explain: "'Mis-' means 'wrongly': misleading = leading someone wrongly.", options: ['misleading', 'unleading', 'inleading'] },
      { sentence: "Their expectations were rather ___.", correct: 'unrealistic', explain: "'Un-' negates the adjective 'realistic'.", options: ['unrealistic', 'misrealistic', 'inrealistic'] },
      { sentence: "The evidence was ___ with his statement.", correct: 'inconsistent', explain: "'In-' negates the adjective 'consistent'.", options: ['inconsistent', 'unconsistent', 'misconsistent'] },
      { sentence: "He felt completely ___ from his colleagues.", correct: 'alienated', explain: "'Alienated' means made to feel like an outsider (not a negative prefix, a distinct word).", options: ['alienated', 'unalienated', 'disalienated'] },
      { sentence: "The report contained several ___ claims.", correct: 'unsubstantiated', explain: "'Un-' negates 'substantiated' (proven with evidence).", options: ['unsubstantiated', 'insubstantiated', 'missubstantiated'] },
      { sentence: "The panel found his conduct entirely ___.", correct: 'unjustifiable', explain: "'Un-' negates the adjective 'justifiable'.", options: ['unjustifiable', 'injustifiable', 'disjustifiable'] },
      { sentence: "The witness clearly ___ the events.", correct: 'misrepresented', explain: "'Mis-' means 'wrongly': misrepresent = to represent wrongly.", options: ['misrepresented', 'unrepresented', 'disrepresented'] },
      { sentence: "The theory was proven to be ___.", correct: 'unfounded', explain: "'Un-' negates 'founded' (based on solid grounds).", options: ['unfounded', 'infounded', 'misfounded'] },
    ]
  },
  multiAffixWords: {
    label: 'Multi-Affix Words',
    icon: '🧬',
    options: ['unquestionably', 'questionably', 'unquestioned'],
    items: [
      { sentence: "It was ___ the best solution available.", correct: 'unquestionably', explain: "'Un-' + question + '-able' + '-ly' builds a full adverb from the noun 'question'." },
      { sentence: "The results were ___.", correct: 'incomprehensible', explain: "'In-' + comprehend + '-ible' negates the ability to be understood.", options: ['incomprehensible', 'uncomprehensible', 'discomprehensible'] },
      { sentence: "His actions were seen as ___.", correct: 'irresponsibly', explain: "'Ir-' + responsible + '-ly' negates and turns the adjective into an adverb.", options: ['irresponsibly', 'unresponsibly', 'disresponsibly'] },
      { sentence: "The building was declared ___.", correct: 'uninhabitable', explain: "'Un-' + inhabit + '-able' means 'not able to be lived in'.", options: ['uninhabitable', 'inuninhabitable', 'disinhabitable'] },
      { sentence: "The decision was ___ by the board.", correct: 'unanimously approved', explain: "'Un-' + anima + '-ous' + '-ly' = 'with everyone in agreement'.", options: ['unanimously approved', 'unanimity approved', 'unanimal approved'] },
      { sentence: "It was a ___ misunderstanding.", correct: 'completely', explain: "This tests recognition of the base 'complete' + '-ly' as a simple adverb, contrasted with multi-affix forms.", options: ['completely', 'incompletely', 'discompletely'] },
      { sentence: "The claim was found to be ___.", correct: 'unsustainable', explain: "'Un-' + sustain + '-able' means 'not able to be sustained'.", options: ['unsustainable', 'insustainable', 'dissustainable'] },
      { sentence: "The process was surprisingly ___.", correct: 'uncomplicated', explain: "'Un-' + complicate + '-ed' means 'not complicated'.", options: ['uncomplicated', 'incomplicated', 'discomplicated'] },
      { sentence: "His argument was ___ flawed.", correct: 'fundamentally', explain: "Fundament + '-al' + '-ly' turns the noun into an adverb meaning 'at the core'.", options: ['fundamentally', 'unfundamentally', 'infundamentally'] },
      { sentence: "The outcome was ___ predictable.", correct: 'entirely', explain: "Entire + '-ly' turns the adjective into an adverb of degree.", options: ['entirely', 'unentirely', 'disentirely'] },
    ]
  }
};
