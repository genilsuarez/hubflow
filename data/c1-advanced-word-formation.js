// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
// Bugs corregidos:
// - verbToAdjective: "tedious" no deriva de ningún verbo; reemplazado por item
//   que sí prueba el patrón -ing/-ed (boring → bored).
// - multiAffixWords: "a completely misunderstanding" (agramatical) → item
//   reemplazado. "unanimously approved" → explain copy-paste corregido.
export const CATEGORIES = {
  abstractNounSuffixes: {
    label: 'Abstract Noun Suffixes',
    icon: '💭',
    options: ['significance', 'significant', 'signify'],
    studyCards: [
      { front: '-ance / -ence → abstract noun from adjective', back: 'significant → significance · resilient → resilience · competent → competence', detail: 'Si el adjetivo termina en -ant → -ance. Si termina en -ent → -ence. Hay excepciones, pero la regla cubre la mayoría.' },
      { front: '-tion / -ment / -ity / -cy / -ness → otros sustantivos abstractos', back: 'contribute → contribution · develop → development · able → ability · transparent → transparency · attentive → attentiveness', detail: 'Cada sufijo aporta un matiz; aprende el más común de cada grupo verbal/adjetival.' },
    ],
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
    studyCards: [
      { front: '-ing (activo)', back: 'describe la cosa que causa el sentimiento', detail: 'a convincing argument · surprising results · a fascinating lecture · an irritating delay. La COSA tiene esa propiedad.' },
      { front: '-ed (pasivo)', back: 'describe la persona que siente el efecto', detail: 'I was convinced · I was surprised · The audience was fascinated · She felt irritated. La PERSONA experimenta ese estado.' },
      { front: 'Trampa clásica', back: 'I am very interesting (✗) → I am very interested (✓)', detail: '"Interesting" describe la cosa; "interested" describe cómo se siente la persona. Confundirlos es el error más frecuente de hispanohablantes.' },
    ],
    items: [
      { sentence: "Her argument was very ___.", correct: 'convincing', explain: "The suffix -ing turns the verb 'convince' into an active adjective." },
      { sentence: "I was completely ___ by her argument.", correct: 'convinced', explain: "The suffix -ed turns the verb into a passive adjective (how someone feels).", options: ['convinced', 'convincing', 'convince'] },
      { sentence: "I was really ___ by the amount of noise. (to bore)", correct: 'bored', explain: "-ed describes how the person feels: 'bore' → 'bored'.", options: ['bored', 'boring', 'bore'] },
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
    studyCards: [
      { front: 'mis- = "wrongly/badly"', back: 'misinterpret · misguided · misleading · misrepresent', detail: '"Mis-" no es simplemente negativo — implica error o equivocación en la acción. "Misguided" = guided in the wrong direction.' },
      { front: 'un- / in- para estados y adjetivos', back: 'unrealistic · inconsistent · unsubstantiated · unjustifiable · unfounded', detail: '"Un-" es el prefijo más versátil para adjetivos. "In-" también es común, especialmente antes de consonantes no asimiladas.' },
    ],
    items: [
      { sentence: "She tried to ___ his words.", correct: 'misinterpret', explain: "'Mis-' means 'wrongly': misinterpret = to interpret wrongly." },
      { sentence: "The plan was ___ from the start.", correct: 'misguided', explain: "'Mis-' means 'wrongly': misguided = guided wrongly.", options: ['misguided', 'unguided', 'inguided'] },
      { sentence: "The information given was ___.", correct: 'misleading', explain: "'Mis-' means 'wrongly': misleading = leading someone wrongly.", options: ['misleading', 'unleading', 'inleading'] },
      { sentence: "Their expectations were rather ___.", correct: 'unrealistic', explain: "'Un-' negates the adjective 'realistic'.", options: ['unrealistic', 'misrealistic', 'inrealistic'] },
      { sentence: "The evidence was ___ with his statement.", correct: 'inconsistent', explain: "'In-' negates the adjective 'consistent'.", options: ['inconsistent', 'unconsistent', 'misconsistent'] },
      { sentence: "He felt completely ___ from his colleagues.", correct: 'alienated', explain: "'Alienated' describes the feeling of being made an outsider (distinct word, not formed with a negative prefix).", options: ['alienated', 'unalienated', 'disalienated'] },
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
    studyCards: [
      { front: 'Cadena de afijos: prefijo + raíz + sufijo(s)', back: 'un- + question + -able + -ly = unquestionably', detail: '"Unquestionably" = sin duda alguna. Cada afijo suma una capa: un- (negación) + question (base) + -able (posibilidad) + -ly (adverbio).' },
      { front: 'Identificar la raíz', back: 'quitar prefijos y sufijos uno por uno para llegar a la raíz', detail: '"Incomprehensible" → in- + comprehend + -ible. "Irresponsibly" → ir- + responsible + -ly. "Uninhabitable" → un- + inhabit + -able.' },
    ],
    items: [
      { sentence: "It was ___ the best solution available.", correct: 'unquestionably', explain: "'Un-' + 'question' + '-able' + '-ly' builds a full adverb: beyond question." },
      { sentence: "The results were ___.", correct: 'incomprehensible', explain: "'In-' + comprehend + '-ible' negates the ability to be understood.", options: ['incomprehensible', 'uncomprehensible', 'discomprehensible'] },
      { sentence: "His actions were seen as ___.", correct: 'irresponsibly', explain: "'Ir-' + responsible + '-ly' negates and turns the adjective into an adverb.", options: ['irresponsibly', 'unresponsibly', 'disresponsibly'] },
      { sentence: "The building was declared ___.", correct: 'uninhabitable', explain: "'Un-' + inhabit + '-able' means 'not able to be lived in'.", options: ['uninhabitable', 'inuninhabitable', 'disinhabitable'] },
      { sentence: "The board voted ___ to approve the decision.", correct: 'unanimously', explain: "'Un-' (all) + 'anima' (spirit) + '-ous' + '-ly' = with one mind/voice; everyone agreed.", options: ['unanimously', 'unanimity', 'unanimous'] },
      { sentence: "The claim was found to be ___.", correct: 'unsustainable', explain: "'Un-' + sustain + '-able' means 'not able to be sustained'.", options: ['unsustainable', 'insustainable', 'dissustainable'] },
      { sentence: "The process was surprisingly ___.", correct: 'uncomplicated', explain: "'Un-' + complicate + '-ed' means 'not complicated'.", options: ['uncomplicated', 'incomplicated', 'discomplicated'] },
      { sentence: "His argument was ___ flawed.", correct: 'fundamentally', explain: "Fundament + '-al' + '-ly' turns the noun into an adverb meaning 'at the core'.", options: ['fundamentally', 'unfundamentally', 'infundamentally'] },
      { sentence: "The outcome was ___ predictable.", correct: 'entirely', explain: "Entire + '-ly' turns the adjective into an adverb of degree.", options: ['entirely', 'unentirely', 'disentirely'] },
      { sentence: "The findings were ___ significant.", correct: 'undeniably', explain: "'Un-' + deny + '-able' + '-ly': impossible to deny. Multi-affix adverb.", options: ['undeniably', 'deniably', 'undeniable'] },
    ]
  }
};
