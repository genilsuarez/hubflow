// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
// Bug crítico corregido: timeAdverbsPlacement y continuousForStativeShift tenían
// respuestas que comenzaban con apóstrofe ("'ve definitely", "'m thinking",
// "'s tasting", "'s seeing", "'ve already", "'ve just", "'ve never"). Al
// rellenarse en la frase ("We ___ met before") quedaba un espacio espurio antes
// del apóstrofe: "We 've definitely met before". Fix: se expandieron las
// respuestas para incluir el pronombre sujeto o se reformularon las frases para
// que el hueco NO quede inmediatamente antes del apóstrofe.
export const CATEGORIES = {
  perfectVsSimpleAspect: {
    label: 'Perfect vs Simple Aspect',
    icon: '⚖️',
    options: ['have lived', 'lived', 'live'],
    studyCards: [
      { front: 'Present Perfect vs Past Simple', back: 'conexión al presente (PP) vs acción terminada sin conexión (PS)', detail: '"I have lived here for ten years." (sigo aquí) vs "I lived in Madrid for five years." (ya no, período cerrado)' },
      { front: 'Past Perfect', back: 'had + participio: anterior a otro evento pasado', detail: '"She had written three novels before she turned thirty." (primero escribió, luego cumplió treinta)' },
    ],
    items: [
      { sentence: "I ___ here for ten years. (still true now)", correct: 'have lived', explain: "Present perfect connects a past action to the present — the situation continues now." },
      { sentence: "I ___ in Madrid for five years before I moved to Paris. (finished)", correct: 'lived', explain: "Past simple describes a completed period with no connection to the present." },
      { sentence: "She ___ three novels so far. (ongoing career)", correct: 'has written', explain: "Present perfect is used when the count is still open — she may write more.", options: ['has written', 'wrote', 'writes'] },
      { sentence: "She ___ three novels before she turned thirty. (finished by that point)", correct: 'had written', explain: "Past perfect describes a completed action before a specific past point.", options: ['had written', 'wrote', 'has written'] },
      { sentence: "He ___ the company since 2015. (still working there)", correct: 'has worked for', explain: "Present perfect connects the past to the present — he still works there.", options: ['has worked for', 'worked for', 'works for'] },
      { sentence: "He ___ for the company for ten years before he retired. (finished)", correct: 'worked', explain: "Past simple describes a completed period disconnected from the present.", options: ['worked', 'has worked', 'works'] },
      { sentence: "We ___ each other since college. (still know each other)", correct: 'have known', explain: "Present perfect connects the past to the present.", options: ['have known', 'knew', 'know'] },
      { sentence: "We ___ each other for years before we lost touch. (finished)", correct: 'had known', explain: "Past perfect describes something completed before another past event (losing touch).", options: ['had known', 'knew', 'have known'] },
      { sentence: "I ___ this book twice already. (implies possibly again)", correct: 'have read', explain: "Present perfect emphasizes the experience up to now, with relevance to the present.", options: ['have read', 'read', 'was reading'] },
      { sentence: "I ___ the book by the time the movie came out. (finished before another past event)", correct: 'had read', explain: "Past perfect describes something completed before another past event.", options: ['had read', 'read', 'have read'] },
    ]
  },
  continuousForStativeShift: {
    label: 'Continuous with Stative Verbs (shift of meaning)',
    icon: '🔄',
    options: ['is thinking', 'thinks'],
    studyCards: [
      { front: 'Verbos estativos no usan continuo (base form)', back: 'think (opinar) · taste (saber) · believe · see (entender) · feel (opinar) · weigh', detail: '"I think this is right." (opinión, no continuo) · "This soup tastes amazing." (sabor, estativo)' },
      { front: 'Los mismos verbos SÍ usan continuo con significado activo', back: 'think (considerar activamente) · taste (probar) · see (reunirse) · feel (sensación física)', detail: '"I am thinking about your offer." (proceso activo) · "The chef is tasting the soup." (acción de probar)' },
    ],
    items: [
      { sentence: "I am ___ about your offer — give me a moment. (mental process happening now)", correct: 'thinking', explain: "'Think' as a continuous verb means the mental process of considering, not a fixed opinion.", options: ['thinking', 'think'] },
      { sentence: "I ___ this is the right choice. (opinion/belief)", correct: 'think', explain: "'Think' as a stative verb (no continuous) expresses a belief or opinion.", options: ['think', 'am thinking'] },
      { sentence: "This soup ___ amazing! (perception happening now)", correct: 'tastes', explain: "'Taste' meaning 'to have a flavor' is stative, not used in continuous.", options: ['tastes', 'is tasting'] },
      { sentence: "The chef is ___ the soup to check the seasoning. (action of tasting)", correct: 'tasting', explain: "'Taste' meaning 'to actively sample food' can be continuous.", options: ['tasting', 'tastes'] },
      { sentence: "I ___ you — you're lying. (belief)", correct: "don't believe", explain: "'Believe' is a stative verb, not normally used in continuous form.", options: ["don't believe", "am not believing"] },
      { sentence: "She is ___ her lawyer this afternoon. (planned meeting)", correct: 'seeing', explain: "'See' meaning 'to meet' can be used in the continuous for arrangements.", options: ['seeing', 'sees'] },
      { sentence: "I ___ what you mean now. (understanding at this moment)", correct: 'see', explain: "'See' meaning 'to understand' is stative, not used in continuous.", options: ['see', 'am seeing'] },
      { sentence: "He ___ that the plan is too risky. (opinion)", correct: 'feels', explain: "'Feel' meaning 'to have an opinion' is generally stative.", options: ['feels', 'is feeling'] },
      { sentence: "She ___ sick, so she went home early. (physical sensation)", correct: "was feeling", explain: "'Feel' describing a physical/emotional state can be used in the continuous.", options: ["was feeling", 'felt'] },
      { sentence: "This box ___ heavier than it looks. (perceived weight)", correct: 'weighs', explain: "'Weigh' meaning 'to have a weight' is stative, not used in continuous.", options: ['weighs', 'is weighing'] },
    ]
  },
  timeAdverbsPlacement: {
    label: 'Time Adverbs — Placement',
    icon: '📍',
    options: ['have never been', 'never have been'],
    studyCards: [
      { front: 'Posición del adverbio de tiempo en perfect', back: 'auxiliar + adverbio + participio', detail: '"I have NEVER been to Japan." · "She had ALREADY finished." · "We have JUST arrived." · "They have DEFINITELY met before."' },
      { front: 'Nunca antes del auxiliar', back: '"already have" y "definitely have" son incorrectos como orden fijo', detail: '"He had JUST arrived" (✓) vs "He JUST had arrived" (✗). El adverbio se intercala entre el auxiliar y el participio.' },
    ],
    items: [
      { sentence: "I ___ been to Japan.", correct: 'have never', explain: "'Never' goes between the auxiliary and the main verb in perfect tenses.", options: ['have never', 'never have'] },
      { sentence: "She ___ finished the report by the deadline.", correct: 'had already', explain: "'Already' typically goes between the auxiliary and the main verb.", options: ['had already', 'already had'] },
      { sentence: "We have ___ met before, I'm sure of it.", correct: 'definitely', explain: "'Definitely' goes between the auxiliary and the main verb.", options: ['definitely', 'surely already'] },
      { sentence: "He ___ arrived when I got there.", correct: 'had just', explain: "'Just' goes between the auxiliary and the main verb.", options: ['had just', 'just had'] },
      { sentence: "They have ___ seen that movie.", correct: 'already', explain: "'Already' goes between the auxiliary and the main verb.", options: ['already', 'just ever'] },
      { sentence: "I have ___ finished this book — it's amazing.", correct: 'just', explain: "'Just' goes between the auxiliary and the main verb.", options: ['just', 'already ever'] },
      { sentence: "She ___ told me the truth, so I was surprised.", correct: 'had never', explain: "'Never' goes between the auxiliary and the main verb.", options: ['had never', 'never had'] },
      { sentence: "We ___ finished when the phone rang.", correct: 'had barely', explain: "'Barely' goes between the auxiliary and the main verb.", options: ['had barely', 'barely had'] },
      { sentence: "He ___ completed the marathon by noon.", correct: 'had already', explain: "'Already' goes between the auxiliary and the main verb.", options: ['had already', 'already had'] },
      { sentence: "I have ___ heard such a beautiful song.", correct: 'never', explain: "'Never' goes between the auxiliary and the main verb.", options: ['never', 'not yet'] },
    ]
  },
  aspectInNarrative: {
    label: 'Aspect in Narrative',
    icon: '📖',
    options: ['had already left', 'left', 'was leaving'],
    studyCards: [
      { front: 'Past Continuous = fondo | Past Perfect = anterior', back: 'fondo de la historia vs evento completado antes', detail: '"As I walked in, everyone was staring." (continuo = en curso) · "She realized she had left her keys." (perfecto = anterior al momento)' },
      { front: 'Past Perfect Continuous = duración antes de otro evento', back: 'had been + -ing', detail: '"They had been waiting for hours before the bus finally arrived." (duración de la espera antes de la llegada)' },
    ],
    items: [
      { sentence: "By the time I arrived at the station, the train ___.", correct: 'had already left', explain: "Past perfect shows an action completed before another past event (my arrival)." },
      { sentence: "As I walked into the room, everyone ___ at me.", correct: 'was staring', explain: "Past continuous describes an action already in progress at the moment described.", options: ['was staring', 'had stared', 'stared'] },
      { sentence: "She realized she ___ her keys at home.", correct: 'had left', explain: "Past perfect shows an action completed before the realization (a past event).", options: ['had left', 'left', 'was leaving'] },
      { sentence: "While he ___ dinner, the phone rang.", correct: 'was cooking', explain: "Past continuous describes the background action interrupted by another event.", options: ['was cooking', 'had cooked', 'cooked'] },
      { sentence: "By the end of the meeting, they ___ a decision.", correct: 'had reached', explain: "Past perfect shows an action completed before the reference point (end of meeting).", options: ['had reached', 'reached', 'were reaching'] },
      { sentence: "The sun ___ when we finally reached the summit.", correct: 'was setting', explain: "Past continuous describes an action in progress at that past moment.", options: ['was setting', 'had set', 'set'] },
      { sentence: "After she ___ the letter, she felt much better.", correct: 'had written', explain: "Past perfect shows an action completed before the next event (feeling better).", options: ['had written', 'wrote', 'was writing'] },
      { sentence: "They ___ for hours before the bus finally arrived.", correct: 'had been waiting', explain: "Past perfect continuous emphasizes the duration of an action before another past event.", options: ['had been waiting', 'waited', 'were waiting'] },
      { sentence: "When I called, she ___ about her trip.", correct: 'was talking', explain: "Past continuous describes what was in progress when the call happened.", options: ['was talking', 'had talked', 'talked'] },
      { sentence: "By midnight, we ___ walking for six hours straight.", correct: 'had been', explain: "Past perfect continuous emphasizes duration up to a past point.", options: ['had been', 'were', 'have been'] },
    ]
  }
};
