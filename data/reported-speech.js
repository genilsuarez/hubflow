/**
 * Reported Speech Data — tense backshift, time/place changes
 */

export const CATEGORIES = {
  backshift: {
    label: 'Tense Backshift',
    icon: '⏪',
    options: ['was', 'had', 'would', 'could', 'had to'],
    items: [
      { sentence: '"I am tired," she said. → She said she ___ tired.', correct: 'was', explain: 'Present simple ("am") → past simple ("was") in reported speech.' },
      { sentence: '"I will call you," he said. → He said he ___ call me.', correct: 'would', explain: '"Will" → "would" in reported speech.' },
      { sentence: '"I can swim," she said. → She said she ___ swim.', correct: 'could', explain: '"Can" → "could" in reported speech.' },
      { sentence: '"I have finished," he said. → He said he ___ finished.', correct: 'had', explain: 'Present perfect ("have finished") → past perfect ("had finished").' },
      { sentence: '"I must leave now," she said. → She said she ___ leave then.', correct: 'had to', explain: '"Must" (obligation) → "had to" in reported speech.' },
      { sentence: '"I am working," he said. → He said he ___ working.', correct: 'was', explain: 'Present continuous → past continuous in reported speech.' },
      { sentence: '"I will help," she said. → She said she ___ help.', correct: 'would', explain: '"Will" → "would" in reported speech.' },
      { sentence: '"I have seen that film," he said. → He said he ___ seen that film.', correct: 'had', explain: 'Present perfect → past perfect in reported speech.' }
    ]
  },
  timePlace: {
    label: 'Time & Place Words',
    icon: '🕰️',
    options: ['that day', 'the next day', 'the day before', 'there', 'then'],
    items: [
      { sentence: '"I\'ll see you tomorrow," she said. → She said she\'d see me ___.', correct: 'the next day', explain: '"Tomorrow" → "the next day" in reported speech.' },
      { sentence: '"I arrived here yesterday," he said. → He said he had arrived ___.', correct: 'there', explain: '"Here" → "there" in reported speech.' },
      { sentence: '"I\'m busy today," she said. → She said she was busy ___.', correct: 'that day', explain: '"Today" → "that day" in reported speech.' },
      { sentence: '"I saw him yesterday," he said. → He said he had seen him ___.', correct: 'the day before', explain: '"Yesterday" → "the day before" in reported speech.' },
      { sentence: '"I need it now," she said. → She said she needed it ___.', correct: 'then', explain: '"Now" → "then" in reported speech.' },
      { sentence: '"We\'ll finish it today," they said. → They said they would finish it ___.', correct: 'that day', explain: '"Today" → "that day" in reported speech.' },
      { sentence: '"I\'ll call you tomorrow," he said. → He said he would call me ___.', correct: 'the next day', explain: '"Tomorrow" → "the next day" in reported speech.' },
      { sentence: '"I was here yesterday," she said. → She said she had been ___ the day before.', correct: 'there', explain: '"Here" → "there" in reported speech.' }
    ]
  }
};
