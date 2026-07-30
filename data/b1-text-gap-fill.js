/**
 * HubFlow — B1 Text Gap Fill Data
 * Categories: connectorsInContext, verbFormsInContext, prepositionsInContext — all B1
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
      { sentence: 'By the time we arrived, the movie already ___ (start).', correct: ['had started'], hint: 'Past perfect: an action before another past action', explain: 'The past perfect shows the movie started before we arrived.' },
      { sentence: 'I ___ (live) here for five years.', correct: ['have lived'], hint: 'Present perfect: unfinished time from past to now', explain: 'The present perfect connects a past action to the present.' },
      { sentence: 'While she ___ (cook), the phone rang.', correct: ['was cooking'], hint: 'Past continuous: an action in progress when something happened', explain: 'The past continuous shows an action interrupted by another event.' },
      { sentence: 'They ___ (finish) the project by Friday.', correct: ['will have finished'], hint: 'Future perfect: completed before a future point', explain: 'The future perfect shows completion before a specific future time.' },
      { sentence: 'He ___ (never/be) to Japan.', correct: ['has never been'], hint: 'Present perfect: life experience', explain: 'The present perfect describes experiences up to now.' },
      { sentence: 'If I ___ (have) more time, I would travel more.', correct: ['had'], hint: 'Second conditional: unreal present', explain: 'The second conditional uses the past simple for an unreal present situation.' },
      { sentence: 'She ___ (work) here since 2020.', correct: ['has worked'], hint: 'Present perfect: unfinished time with "since"', explain: '"Since" + a point in time pairs with the present perfect.' },
      { sentence: 'We ___ (watch) TV when the lights went out.', correct: ['were watching'], hint: 'Past continuous: an action in progress', explain: 'The past continuous shows an action interrupted by another event.' },
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
