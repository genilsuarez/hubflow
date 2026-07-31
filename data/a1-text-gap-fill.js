/**
 * HubFlow — A1 Text Gap Fill Data
 * Categories: connectorsInContext, verbFormsInContext, prepositionsInContext
 * Each entry: { sentence, correct: string[], hint, explain }
 * The user types the missing word(s) into the gap.
 */

export const CATEGORIES = {
  connectorsInContext: {
    label: 'Connectors',
    icon: '🔗',
    items: [
      { sentence: 'I was tired, ___ I went to bed early.', correct: ['so'], hint: 'A connector showing result', explain: '"So" introduces the result of the first idea.' },
      { sentence: "She likes tea, ___ she doesn't like coffee.", correct: ['but'], hint: 'A connector showing contrast', explain: '"But" introduces a contrast.' },
      { sentence: '___ it was raining, we still went for a walk.', correct: ['Although', 'Even though'], hint: 'A connector showing contrast at the start', explain: '"Although/Even though" introduces a surprising contrast.' },
      { sentence: 'He studied hard. ___, he passed the exam.', correct: ['Therefore', 'So'], hint: 'A connector showing result', explain: '"Therefore/So" introduces the result of the previous sentence.' },
      { sentence: 'You can pay by card ___ by cash.', correct: ['or'], hint: 'A connector showing an alternative', explain: '"Or" presents an alternative option.' },
      { sentence: '___ I finish work, I usually go to the gym.', correct: ['After', 'When'], hint: 'A connector of time', explain: '"After/When" introduces the time relationship between two actions.' },
      { sentence: 'She was happy ___ she got the job.', correct: ['because'], hint: 'A connector showing reason', explain: '"Because" introduces a reason.' },
      { sentence: 'I like both coffee ___ tea.', correct: ['and'], hint: 'A connector joining two things', explain: '"And" joins two similar things.' },
      { sentence: 'We stayed home ___ the storm.', correct: ['because of'], hint: 'A connector + noun showing reason', explain: '"Because of" is followed by a noun, not a full clause.' },
      { sentence: '___ you study, you will pass the exam.', correct: ['If'], hint: 'A connector introducing a condition', explain: '"If" introduces a condition for something to happen.' },
      { sentence: 'I was cooking ___ he was cleaning.', correct: ['while'], hint: 'A connector showing two actions at the same time', explain: '"While" connects two actions happening together.' },
      { sentence: "You can't enter ___ you have a ticket.", correct: ['unless'], hint: 'A connector meaning "if not"', explain: '"Unless" means "if...not".' },
      { sentence: '___ she got home, she went straight to sleep.', correct: ['As soon as'], hint: 'A connector meaning "immediately after"', explain: '"As soon as" shows one action happening right after another.' },
      { sentence: 'We went out ___ the rain.', correct: ['despite', 'in spite of'], hint: 'A connector + noun showing contrast', explain: '"Despite/In spite of" is followed by a noun, not a full clause.' },
    ]
  },
  verbFormsInContext: {
    label: 'Verb Forms',
    icon: '⏳',
    items: [
      { sentence: 'She ___ (like) pizza a lot.', correct: ['likes'], hint: 'Present simple: he/she/it + verb-s', explain: 'Third person singular adds -s to the verb.' },
      { sentence: 'I ___ (go) to school yesterday.', correct: ['went'], hint: 'Past simple of "go" (irregular)', explain: '"Go" is irregular in the past: go → went.' },
      { sentence: 'They ___ (not / have) a car.', correct: ["don't have"], hint: 'Present simple negative: I/you/we/they', explain: '"Don\'t" + base verb makes the negative for I/you/we/they.' },
      { sentence: 'He ___ (be) very tired now.', correct: ['is'], hint: '"To be": he/she/it', explain: '"He" goes with "is".' },
      { sentence: 'We ___ (watch) a movie last night.', correct: ['watched'], hint: 'Past simple: regular verb + -ed', explain: 'Regular verbs add -ed in the past simple.' },
      { sentence: 'I ___ (not / like) coffee.', correct: ["don't like"], hint: 'Present simple negative: I/you/we/they', explain: '"Don\'t" + base verb makes the negative for I/you/we/they.' },
      { sentence: 'She ___ (have) two brothers.', correct: ['has'], hint: 'Present simple of "have": he/she/it', explain: '"She" goes with "has".' },
      { sentence: 'It ___ (be) cold yesterday.', correct: ['was'], hint: '"To be" in the past: it', explain: '"It" goes with "was" in the past simple.' },
      { sentence: 'We ___ (play) football every weekend.', correct: ['play'], hint: 'Present simple: I/we/you/they + base verb', explain: 'I/we/you/they use the base form of the verb in the present simple.' },
      { sentence: 'She ___ (not / go) to school on Sundays.', correct: ["doesn't go"], hint: 'Present simple negative: he/she/it', explain: '"Doesn\'t" + base verb makes the negative for he/she/it.' },
      { sentence: 'They ___ (visit) their grandparents last weekend.', correct: ['visited'], hint: 'Past simple: regular verb + -ed', explain: 'Regular verbs add -ed in the past simple.' },
      { sentence: 'I ___ (be) at the cinema last night.', correct: ['was'], hint: '"To be" in the past: I', explain: '"I" goes with "was" in the past simple.' },
      { sentence: 'He ___ (study) English every day.', correct: ['studies'], hint: 'Present simple: he/she/it + verb-s (y→ies)', explain: 'Verbs ending in consonant+y change y to ies for he/she/it.' },
    ]
  },
  prepositionsInContext: {
    label: 'Prepositions',
    icon: '📍',
    items: [
      { sentence: "I'm interested ___ learning Spanish.", correct: ['in'], hint: 'Adjective + preposition pattern', explain: '"Interested in" is a fixed adjective + preposition combination.' },
      { sentence: "She's good ___ math.", correct: ['at'], hint: 'Adjective + preposition pattern', explain: '"Good at" is a fixed adjective + preposition combination.' },
      { sentence: 'He apologized ___ being late.', correct: ['for'], hint: 'Verb + preposition pattern', explain: '"Apologize for" is a fixed verb + preposition combination.' },
      { sentence: "We're looking forward ___ the trip.", correct: ['to'], hint: 'Verb phrase + preposition pattern', explain: '"Look forward to" is a fixed phrase, followed by a noun or -ing.' },
      { sentence: "I'm worried ___ the exam.", correct: ['about'], hint: 'Adjective + preposition pattern', explain: '"Worried about" is a fixed adjective + preposition combination.' },
      { sentence: "She's married ___ a doctor.", correct: ['to'], hint: 'Adjective + preposition pattern', explain: '"Married to" is a fixed adjective + preposition combination.' },
      { sentence: 'They arrived ___ the airport early.', correct: ['at'], hint: 'Verb + preposition for a specific place', explain: '"Arrive at" is used for specific places like airports or buildings.' },
      { sentence: "He's afraid ___ spiders.", correct: ['of'], hint: 'Adjective + preposition pattern', explain: '"Afraid of" is a fixed adjective + preposition combination.' },
      { sentence: "I'm proud ___ my sister.", correct: ['of'], hint: 'Adjective + preposition pattern', explain: '"Proud of" is a fixed adjective + preposition combination.' },
      { sentence: 'She listens ___ music every morning.', correct: ['to'], hint: 'Verb + preposition pattern', explain: '"Listen to" is a fixed verb + preposition combination.' },
      { sentence: 'We depend ___ public transport.', correct: ['on'], hint: 'Verb + preposition pattern', explain: '"Depend on" is a fixed verb + preposition combination.' },
      { sentence: "He's similar ___ his father.", correct: ['to'], hint: 'Adjective + preposition pattern', explain: '"Similar to" is a fixed adjective + preposition combination.' },
      { sentence: 'They live ___ a small village.', correct: ['in'], hint: 'Preposition of place for enclosed areas', explain: '"In" is used for enclosed places like villages, cities, or countries.' },
    ]
  },
};
