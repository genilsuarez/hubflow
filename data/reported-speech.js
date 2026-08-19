/**
 * Reported Speech Data — tense backshift, time/place changes
 */

// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
export const CATEGORIES = {
  backshift: {
    label: 'Tense Backshift',
    icon: '⏪',
    options: ['was', 'had', 'would', 'could', 'had to'],
    studyCards: [
      { front: 'Regla general', back: 'todo retrocede un tiempo atrás', detail: 'Present simple → past simple. Present perfect → past perfect. Will → would. Can → could. Must → had to.' },
      { front: '"She said she ___ tired."', back: 'am → was', detail: '"I am tired" → She said she WAS tired. El presente simple se convierte en pasado simple.' },
      { front: 'Excepciones', back: 'No hay backshift si la situación sigue siendo verdad, o con "that"', detail: '"He said that Paris is in France." (sigue siendo verdad → no backsift necesario)' },
    ],
    items: [
      { sentence: '"I am tired," she said. → She said she ___ tired.', correct: 'was', explain: 'Present simple ("am") → past simple ("was") in reported speech.' },
      { sentence: '"I will call you," he said. → He said he ___ call me.', correct: 'would', explain: '"Will" → "would" in reported speech.' },
      { sentence: '"I can swim," she said. → She said she ___ swim.', correct: 'could', explain: '"Can" → "could" in reported speech.' },
      { sentence: '"I have finished," he said. → He said he ___ finished.', correct: 'had', explain: 'Present perfect ("have finished") → past perfect ("had finished").' },
      { sentence: '"I must leave now," she said. → She said she ___ leave then.', correct: 'had to', explain: '"Must" (obligation) → "had to" in reported speech.' },
      { sentence: '"I am working," he said. → He said he ___ working.', correct: 'was', explain: 'Present continuous → past continuous in reported speech.' },
      { sentence: '"I will help," she said. → She said she ___ help.', correct: 'would', explain: '"Will" → "would" in reported speech.' },
      { sentence: '"I have seen that film," he said. → He said he ___ seen that film.', correct: 'had', explain: 'Present perfect → past perfect in reported speech.' },
      { sentence: '"I am ready," he said. → He said he ___ ready.', correct: 'was', explain: 'Present simple ("am") → past simple ("was") in reported speech.' },
      { sentence: '"I have already eaten," she said. → She said she ___ already eaten.', correct: 'had', explain: 'Present perfect → past perfect in reported speech.' }
    ]
  },
  timePlace: {
    label: 'Time & Place Words',
    icon: '🕰️',
    options: ['that day', 'the next day', 'the day before', 'there', 'then'],
    studyCards: [
      { front: 'Palabras de tiempo', back: 'today → that day | tomorrow → the next day | yesterday → the day before | now → then', detail: '"I\'m busy today" → she said she was busy THAT DAY. "I\'ll call tomorrow" → he said he\'d call THE NEXT DAY.' },
      { front: 'Palabras de lugar', back: 'here → there', detail: '"I arrived here" → he said he had arrived THERE. El punto de referencia cambia de quién habla a quién informa.' },
    ],
    items: [
      { sentence: '"I\'ll see you tomorrow," she said. → She said she\'d see me ___.', correct: 'the next day', explain: '"Tomorrow" → "the next day" in reported speech.' },
      { sentence: '"I arrived here yesterday," he said. → He said he had arrived ___.', correct: 'there', explain: '"Here" → "there" in reported speech.' },
      { sentence: '"I\'m busy today," she said. → She said she was busy ___.', correct: 'that day', explain: '"Today" → "that day" in reported speech.' },
      { sentence: '"I saw him yesterday," he said. → He said he had seen him ___.', correct: 'the day before', explain: '"Yesterday" → "the day before" in reported speech.' },
      { sentence: '"I need it now," she said. → She said she needed it ___.', correct: 'then', explain: '"Now" → "then" in reported speech.' },
      { sentence: '"We\'ll finish it today," they said. → They said they would finish it ___.', correct: 'that day', explain: '"Today" → "that day" in reported speech.' },
      { sentence: '"I\'ll call you tomorrow," he said. → He said he would call me ___.', correct: 'the next day', explain: '"Tomorrow" → "the next day" in reported speech.' },
      { sentence: '"I was here yesterday," she said. → She said she had been ___ the day before.', correct: 'there', explain: '"Here" → "there" in reported speech.' },
      { sentence: '"I\'m meeting her today," he said. → He said he was meeting her ___.', correct: 'that day', explain: '"Today" → "that day" in reported speech.' },
      { sentence: '"I finished it yesterday," she said. → She said she had finished it ___.', correct: 'the day before', explain: '"Yesterday" → "the day before" in reported speech.' }
    ]
  },
  reportedQuestions: {
    label: 'Reported Questions',
    icon: '❓',
    options: ['if', 'whether', 'what', 'where', 'when', 'why', 'how'],
    studyCards: [
      { front: 'Preguntas de Sí/No → if/whether', back: '"She asked if/whether I was coming."', detail: 'Las preguntas de sí/no no llevan la palabra-wh original → se introduce con "if" o "whether" (son intercambiables).' },
      { front: 'Preguntas-wh → conservar la palabra-wh', back: '"He asked me WHERE I lived."', detail: '"Where do you live?" → He asked where I LIVED. El orden pasa a ser de frase afirmativa (sujeto + verbo).' },
      { front: 'Trampa: no más auxiliar "do/does/did"', back: 'desaparece el auxiliar en preguntas reportadas', detail: '"What time DOES it start?" → She asked WHEN it STARTED. "Do" desaparece; el tiempo del verbo retrocede.' },
    ],
    items: [
      { sentence: '"Are you coming?" she asked. → She asked ___ I was coming.', correct: ['if', 'whether'], explain: 'Yes/no questions use "if" or "whether" in reported speech — both are correct here.' },
      { sentence: '"Where do you live?" he asked. → He asked me ___ I lived.', correct: 'where', explain: 'Wh-questions keep the question word; word order becomes statement order.' },
      { sentence: '"What time does it start?" she asked. → She asked ___ it started.', correct: 'when', explain: '"What time" questions are often reported with "when"; tense backshifts and "does" disappears.' },
      { sentence: '"Did you see the news?" he asked. → He asked ___ I had seen the news.', correct: ['if', 'whether'], explain: 'Yes/no question → "if" or "whether" + statement word order — both are correct here.' },
      { sentence: '"Why are you late?" she asked. → She asked me ___ I was late.', correct: 'why', explain: '"Why" stays as the reporting word; tense backshifts.' },
      { sentence: '"How long have you been waiting?" he asked. → He asked ___ I had been waiting.', correct: 'how', explain: '"How" stays as the question word; "how long" uses "how" as the key reported word.' },
      { sentence: '"Can you swim?" she asked. → She asked ___ I could swim.', correct: ['if', 'whether'], explain: 'Yes/no question → "if" or "whether" + backshifted auxiliary ("can" → "could") — both are correct here.' },
      { sentence: '"When will the results come out?" they asked. → They asked ___ the results would come out.', correct: 'when', explain: '"When" stays; "will" → "would" in reported speech.' },
      { sentence: '"Is there a doctor here?" he asked. → He asked ___ there was a doctor there.', correct: ['if', 'whether'], explain: 'Yes/no question → "if" or "whether" + statement word order; "here" → "there" — both are correct here.' },
      { sentence: '"How do you spell that?" she asked. → She asked me ___ I spelled that.', correct: 'how', explain: '"How" stays as the reporting word; tense backshifts.' },
    ]
  }
};
