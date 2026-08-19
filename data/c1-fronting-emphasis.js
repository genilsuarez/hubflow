// `studyCards` enseña la REGLA antes de examinarla en Quiz. Mismo patrón que
// a1-imperatives.js.
export const CATEGORIES = {
  negativeAdverbialInversion: {
    label: 'Negative Adverbial Inversion',
    icon: '🔄',
    options: ['had I', 'did I', 'have I', 'was I'],
    studyCards: [
      { front: 'Adverbio negativo al frente → inversión auxiliar + sujeto', back: 'Never / Rarely / Seldom / Little / Not once / Not until', detail: '"Never have I seen such a sunset." · "Rarely have I met someone so talented." · "Little did I know what awaited me."' },
      { front: 'Auxiliar correcto', back: 'presente perfecto → have/has · pasado simple → did · "was/were" → was/were · past perfect → had', detail: '"No sooner had I arrived..." · "Never before was I so nervous." · "Not once did I complain."' },
    ],
    items: [
      { sentence: 'Never ___ seen such a beautiful sunset.', correct: 'have I', explain: '"Never" fronted triggers subject-auxiliary inversion with "have".' },
      { sentence: 'Rarely ___ met someone so talented.', correct: 'have I', explain: '"Rarely" fronted triggers subject-auxiliary inversion with "have".' },
      { sentence: 'Not until later ___ realize my mistake.', correct: 'did I', explain: '"Not until" fronted triggers subject-auxiliary inversion with "did".' },
      { sentence: 'Little ___ know what awaited me.', correct: 'did I', explain: '"Little" fronted triggers subject-auxiliary inversion with "did".' },
      { sentence: 'No sooner ___ arrived than it started raining.', correct: 'had I', explain: '"No sooner" fronted triggers subject-auxiliary inversion with "had".' },
      { sentence: 'Never before ___ so nervous.', correct: 'was I', explain: '"Never before" fronted triggers subject-auxiliary inversion with "was".' },
      { sentence: 'Seldom ___ seen such dedication.', correct: 'have I', explain: '"Seldom" fronted triggers subject-auxiliary inversion with "have".' },
      { sentence: 'Not once ___ complained about the workload.', correct: 'did I', explain: '"Not once" fronted triggers subject-auxiliary inversion with "did".' },
      { sentence: 'Hardly ___ sat down when the phone rang.', correct: 'had I', explain: '"Hardly" fronted triggers subject-auxiliary inversion with "had".' },
      { sentence: 'Never ___ expected such a warm welcome.', correct: 'have I', explain: '"Never" fronted triggers subject-auxiliary inversion with "have".' },
    ]
  },
  soSuchInversion: {
    label: 'So / Such Inversion',
    icon: '❗',
    options: ['So', 'Such'],
    studyCards: [
      { front: 'So + adjetivo + was + sujeto', back: '"So great was the pressure that he gave up."', detail: '"So" precede a un adjetivo. Luego invierte: "So loud was the music that neighbors complained."' },
      { front: 'Such + was + sustantivo', back: '"Such was her surprise that she could not speak."', detail: '"Such" precede a un sustantivo (sin adjetivo) o "such a + adj + noun": "Such a shock was the news that she fainted."' },
    ],
    items: [
      { sentence: '___ was her surprise that she could not speak.', correct: 'Such', explain: '"Such" + "was" + noun phrase fronts for emphasis.' },
      { sentence: '___ great was the pressure that he gave up.', correct: 'So', explain: '"So" + adjective + "was" fronts for emphasis.' },
      { sentence: '___ a mess was the room that we did not know where to start.', correct: 'Such', explain: '"Such a" + noun + "was" fronts for emphasis.' },
      { sentence: '___ loud was the music that neighbors complained.', correct: 'So', explain: '"So" + adjective + "was" fronts for emphasis.' },
      { sentence: '___ was the silence that you could hear a pin drop.', correct: 'Such', explain: '"Such" + "was" + noun phrase fronts for emphasis.' },
      { sentence: '___ difficult was the exam that many students failed.', correct: 'So', explain: '"So" + adjective + "was" fronts for emphasis.' },
      { sentence: '___ a shock was the news that she fainted.', correct: 'Such', explain: '"Such a" + noun + "was" fronts for emphasis.' },
      { sentence: '___ strong was the wind that trees fell.', correct: 'So', explain: '"So" + adjective + "was" fronts for emphasis.' },
      { sentence: '___ was the chaos that no one knew what to do.', correct: 'Such', explain: '"Such" + "was" + noun phrase fronts for emphasis.' },
      { sentence: '___ fast did he run that he broke the record.', correct: 'So', explain: '"So" + adjective + "did" fronts for emphasis.' },
    ]
  },
  onlyInversion: {
    label: 'Only... Inversion',
    icon: '🔑',
    options: ['did she', 'did he', 'was I', 'could we'],
    studyCards: [
      { front: 'Only after/when/by + expresión → inversión en la cláusula principal', back: '"Only after the meeting did she understand."', detail: '"Only" + expresión temporal o modal dispara la inversión. El auxiliar va antes del sujeto en la cláusula principal.' },
    ],
    items: [
      { sentence: 'Only after the meeting ___ understand the full plan.', correct: 'did she', explain: '"Only after" fronted triggers subject-auxiliary inversion.' },
      { sentence: 'Only when he apologized ___ satisfied.', correct: 'was I', explain: '"Only when" fronted triggers subject-auxiliary inversion.' },
      { sentence: 'Only by working together ___ finish the project on time.', correct: 'could we', explain: '"Only by" fronted triggers subject-auxiliary inversion.' },
      { sentence: 'Only after months of practice ___ master the skill.', correct: 'did he', explain: '"Only after" fronted triggers subject-auxiliary inversion.' },
      { sentence: 'Only after reading the report ___ realize the problem.', correct: 'did she', explain: '"Only after" fronted triggers subject-auxiliary inversion.' },
      { sentence: 'Only when the lights came on ___ see the damage.', correct: 'was I', explain: '"Only when" fronted triggers subject-auxiliary inversion.' },
      { sentence: 'Only by asking for help ___ solve the issue.', correct: 'could we', explain: '"Only by" fronted triggers subject-auxiliary inversion.' },
      { sentence: 'Only after the accident ___ start driving carefully.', correct: 'did he', explain: '"Only after" fronted triggers subject-auxiliary inversion.' },
      { sentence: 'Only after her explanation ___ understand.', correct: 'did she', explain: '"Only after" fronted triggers subject-auxiliary inversion.' },
      { sentence: 'Only when it was too late ___ realize his mistake.', correct: 'did he', explain: '"Only when" fronted triggers subject-auxiliary inversion.' },
    ]
  },
  soDoAgreement: {
    label: '"So do I" Agreement',
    icon: '🤝',
    options: ['so do I', 'so did I', 'so am I', 'so have I'],
    studyCards: [
      { front: '"So + auxiliar + I" — acuerdo positivo', back: 'el auxiliar refleja el tiempo del verbo original', detail: '"She loves music, and so do I." (do = loves) · "He finished, and so did I." · "She is thrilled, and so am I." · "They have visited, and so have I."' },
    ],
    items: [
      { sentence: 'She loves classical music, and ___.', correct: 'so do I', explain: 'Present simple agreement uses "so do I".' },
      { sentence: 'He finished the marathon, and ___.', correct: 'so did I', explain: 'Past simple agreement uses "so did I".' },
      { sentence: 'She is thrilled about the news, and ___.', correct: 'so am I', explain: '"To be" agreement uses "so am I".' },
      { sentence: 'They have visited Japan, and ___.', correct: 'so have I', explain: 'Present perfect agreement uses "so have I".' },
      { sentence: 'My brother enjoys hiking, and ___.', correct: 'so do I', explain: 'Present simple agreement uses "so do I".' },
      { sentence: 'She passed the test, and ___.', correct: 'so did I', explain: 'Past simple agreement uses "so did I".' },
      { sentence: 'He is worried about the deadline, and ___.', correct: 'so am I', explain: '"To be" agreement uses "so am I".' },
      { sentence: 'We have finished the report, and ___.', correct: 'so have I', explain: 'Present perfect agreement uses "so have I".' },
      { sentence: 'My friends like spicy food, and ___.', correct: 'so do I', explain: 'Present simple agreement uses "so do I".' },
      { sentence: 'She arrived early, and ___.', correct: 'so did I', explain: 'Past simple agreement uses "so did I".' },
    ]
  },
};
