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
    ]
  },
};
