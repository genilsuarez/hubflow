export const CATEGORIES = {
  perfectVsSimpleAspect: {
    label: 'Perfect vs Simple Aspect',
    icon: '⚖️',
    options: ['have lived', 'lived', 'live'],
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
    items: [
      { sentence: "I ___ about your offer — give me a moment. (mental process happening now)", correct: "'m thinking", explain: "'Think' as a continuous verb means the mental process of considering, not a fixed opinion.", options: ["'m thinking", 'think'] },
      { sentence: "I ___ this is the right choice. (opinion/belief)", correct: 'think', explain: "'Think' as a stative verb (no continuous) expresses a belief or opinion.", options: ['think', "'m thinking"] },
      { sentence: "This soup ___ amazing! (perception happening now)", correct: 'tastes', explain: "'Taste' meaning 'to have a flavor' is stative, not used in continuous.", options: ['tastes', "'s tasting"] },
      { sentence: "The chef ___ the soup to check the seasoning. (action of tasting)", correct: "'s tasting", explain: "'Taste' meaning 'to actively sample food' can be continuous.", options: ["'s tasting", 'tastes'] },
      { sentence: "I ___ you — you're lying. (belief)", correct: "don't believe", explain: "'Believe' is a stative verb, not normally used in continuous form.", options: ["don't believe", "'m not believing"] },
      { sentence: "She ___ to see her lawyer this afternoon. (planned action)", correct: "'s seeing", explain: "'See' meaning 'to meet' can be used in the continuous for arrangements.", options: ["'s seeing", 'sees'] },
      { sentence: "I ___ what you mean now. (understanding at this moment)", correct: 'see', explain: "'See' meaning 'to understand' is stative, not used in continuous.", options: ['see', "'m seeing"] },
      { sentence: "He ___ that the plan is too risky. (opinion)", correct: 'feels', explain: "'Feel' meaning 'to have an opinion' is generally stative.", options: ['feels', "'s feeling"] },
      { sentence: "She ___ sick, so she went home early. (physical sensation)", correct: "was feeling", explain: "'Feel' describing a physical/emotional state can be used in the continuous.", options: ["was feeling", 'felt'] },
      { sentence: "This box ___ heavier than it looks. (perceived weight)", correct: 'weighs', explain: "'Weigh' meaning 'to have a weight' is stative, not used in continuous.", options: ['weighs', "'s weighing"] },
    ]
  },
  timeAdverbsPlacement: {
    label: 'Time Adverbs — Placement',
    icon: '📍',
    options: ['have never been', 'never have been'],
    items: [
      { sentence: "I ___ to Japan.", correct: 'have never been', explain: "'Never' goes between the auxiliary and the main verb in perfect tenses." },
      { sentence: "She ___ finished the report by the deadline.", correct: 'had already', explain: "'Already' typically goes between the auxiliary and the main verb.", options: ['had already', 'already had'] },
      { sentence: "We ___ met before, I'm sure of it.", correct: "'ve definitely", explain: "'Definitely' goes between the auxiliary and the main verb.", options: ["'ve definitely", "definitely've"] },
      { sentence: "He ___ arrived when I got there.", correct: 'had just', explain: "'Just' goes between the auxiliary and the main verb.", options: ['had just', 'just had'] },
      { sentence: "They ___ seen that movie.", correct: "'ve already", explain: "'Already' goes between the auxiliary and the main verb.", options: ["'ve already", "already've"] },
      { sentence: "I ___ finished this book — it's amazing.", correct: "'ve just", explain: "'Just' goes between the auxiliary and the main verb.", options: ["'ve just", "just've"] },
      { sentence: "She ___ told me the truth, so I was surprised.", correct: 'had never', explain: "'Never' goes between the auxiliary and the main verb.", options: ['had never', 'never had'] },
      { sentence: "We ___ finished when the phone rang.", correct: 'had barely', explain: "'Barely' goes between the auxiliary and the main verb.", options: ['had barely', 'barely had'] },
      { sentence: "He ___ completed the marathon by noon.", correct: 'had already', explain: "'Already' goes between the auxiliary and the main verb.", options: ['had already', 'already had'] },
      { sentence: "I ___ heard such a beautiful song.", correct: "'ve never", explain: "'Never' goes between the auxiliary and the main verb.", options: ["'ve never", "never've"] },
    ]
  },
  aspectInNarrative: {
    label: 'Aspect in Narrative',
    icon: '📖',
    options: ['had already left', 'left', 'was leaving'],
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
