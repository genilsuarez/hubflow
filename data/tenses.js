/**
 * Tenses Data — choose the correct verb form
 * Categories: Present, Past, Future, Perfect
 */

export const CATEGORIES = {
  present: {
    label: 'Present',
    icon: '🔵',
    options: ['do', 'does', 'is doing', 'are doing'],
    items: [
      { sentence: 'She ___ to work every day.', correct: 'goes', options: ['goes', 'go', 'is going', 'going'], explain: 'Present simple, 3rd person: she goes.' },
      { sentence: 'They ___ football on Saturdays.', correct: 'play', options: ['play', 'plays', 'are playing', 'played'], explain: 'Present simple, plural subject: they play.' },
      { sentence: 'He ___ TV right now.', correct: 'is watching', options: ['is watching', 'watches', 'watch', 'watched'], explain: 'Present continuous: action happening now → is + -ing.' },
      { sentence: 'I ___ coffee every morning.', correct: 'drink', options: ['drink', 'drinks', 'am drinking', 'drank'], explain: 'Present simple, 1st person: I drink.' },
      { sentence: 'Look! It ___ outside.', correct: 'is raining', options: ['is raining', 'rains', 'rained', 'rain'], explain: 'Present continuous: happening at this moment → is raining.' },
      { sentence: 'She ___ speak three languages.', correct: 'can', options: ['can', 'cans', 'is canning', 'could'], explain: 'Modal verb "can" + base form. No -s for 3rd person.' },
      { sentence: 'Water ___ at 100 degrees Celsius.', correct: 'boils', options: ['boils', 'is boiling', 'boil', 'boiled'], explain: 'Present simple for scientific facts / permanent truths.' },
      { sentence: 'We ___ a meeting at 3 pm today.', correct: 'are having', options: ['are having', 'have', 'has', 'had'], explain: 'Present continuous for scheduled future arrangements.' },
      { sentence: 'The train ___ at 9:15 every morning.', correct: 'leaves', options: ['leaves', 'is leaving', 'leave', 'left'], explain: 'Present simple for timetables and schedules.' },
      { sentence: 'She ___ like vegetables.', correct: "doesn't", options: ["doesn't", "don't", "isn't", "not"], explain: "Negative present simple, 3rd person: doesn't + base verb." },
      { sentence: 'What ___ you doing here?', correct: 'are', options: ['are', 'do', 'is', 'does'], explain: 'Present continuous question: What are you doing?' },
      { sentence: 'He never ___ to class on time.', correct: 'comes', options: ['comes', 'come', 'is coming', 'came'], explain: 'Present simple with frequency adverb "never".' }
    ]
  },
  past: {
    label: 'Past',
    icon: '🟠',
    options: ['did', 'was', 'were', 'had'],
    items: [
      { sentence: 'I ___ to the cinema yesterday.', correct: 'went', options: ['went', 'go', 'gone', 'going'], explain: 'Past simple irregular: go → went.' },
      { sentence: 'She ___ sleeping when I called.', correct: 'was', options: ['was', 'is', 'were', 'been'], explain: 'Past continuous: was/were + -ing. She (singular) → was.' },
      { sentence: 'They ___ in London for five years (but now they live in Paris).', correct: 'lived', options: ['lived', 'live', 'have lived', 'living'], explain: 'Past simple: finished action in the past.' },
      { sentence: 'He ___ the book before the film came out.', correct: 'had read', options: ['had read', 'read', 'has read', 'reads'], explain: 'Past perfect: action completed before another past event.' },
      { sentence: 'We ___ dinner when the phone rang.', correct: 'were having', options: ['were having', 'had', 'have', 'are having'], explain: 'Past continuous: interrupted action → were + -ing.' },
      { sentence: '___ you see the match last night?', correct: 'Did', options: ['Did', 'Do', 'Were', 'Have'], explain: 'Past simple question: Did + subject + base verb.' },
      { sentence: 'She ___ born in 1990.', correct: 'was', options: ['was', 'is', 'has been', 'were'], explain: 'Past simple passive: was born (fixed expression).' },
      { sentence: 'I ___ already finished when he arrived.', correct: 'had', options: ['had', 'have', 'was', 'did'], explain: 'Past perfect: had + past participle (before another past event).' },
      { sentence: 'They ___ very tired after the long walk.', correct: 'were', options: ['were', 'was', 'are', 'been'], explain: 'Past simple of "be": They (plural) → were.' },
      { sentence: 'He ___ his homework and then went out.', correct: 'did', options: ['did', 'does', 'was doing', 'has done'], explain: 'Past simple: did (completed action in sequence).' },
      { sentence: 'While I ___ for the bus, it started to rain.', correct: 'was waiting', options: ['was waiting', 'waited', 'wait', 'am waiting'], explain: 'Past continuous: background action interrupted by another event.' },
      { sentence: 'She ___ never been to Asia before that trip.', correct: 'had', options: ['had', 'has', 'was', 'did'], explain: 'Past perfect: had never been (experience before a past reference point).' }
    ]
  },
  future: {
    label: 'Future',
    icon: '🟢',
    options: ['will', 'going to', 'shall', "'ll"],
    items: [
      { sentence: 'I ___ help you with that.', correct: 'will', options: ['will', 'going to', 'am', 'do'], explain: 'Spontaneous decision / offer: will + base verb.' },
      { sentence: 'She ___ visit her parents next weekend.', correct: 'is going to', options: ['is going to', 'will', 'does', 'has'], explain: 'Planned intention: be going to + base verb.' },
      { sentence: 'Look at those clouds! It ___ rain.', correct: 'is going to', options: ['is going to', 'will', 'shall', 'does'], explain: 'Prediction based on evidence: be going to.' },
      { sentence: 'I think he ___ pass the exam.', correct: 'will', options: ['will', 'is going to', 'does', 'shall'], explain: 'Opinion/prediction without evidence: will.' },
      { sentence: 'The plane ___ at 6:30 tomorrow morning.', correct: 'leaves', options: ['leaves', 'will leave', 'is leaving', 'left'], explain: 'Present simple for scheduled/timetabled events.' },
      { sentence: 'We ___ dinner at that new restaurant tonight.', correct: "are having", options: ['are having', 'will have', 'have', 'had'], explain: 'Present continuous for personal arrangements.' },
      { sentence: 'Don\'t worry, I ___ forget.', correct: "won't", options: ["won't", "don't", "am not", "haven't"], explain: "Promise/assurance: won't (will not) + base verb." },
      { sentence: 'By next year, she ___ graduated.', correct: 'will have', options: ['will have', 'will', 'has', 'had'], explain: 'Future perfect: will have + past participle (completed before a future point).' },
      { sentence: 'This time tomorrow I ___ on the beach.', correct: 'will be lying', options: ['will be lying', 'will lie', 'am lying', 'lie'], explain: 'Future continuous: will be + -ing (action in progress at a future time).' },
      { sentence: '___ I open the window?', correct: 'Shall', options: ['Shall', 'Will', 'Do', 'Am'], explain: 'Shall I...? = offer/suggestion (1st person).' },
      { sentence: 'He ___ 30 next month.', correct: 'will be', options: ['will be', 'is', 'is being', 'was'], explain: 'Future fact: will be (age/date in future).' },
      { sentence: 'I ___ to call him later.', correct: 'am going', options: ['am going', 'will', 'shall', 'do'], explain: 'Planned intention: am going + to + verb.' }
    ]
  },
  perfect: {
    label: 'Perfect',
    icon: '🟣',
    options: ['have', 'has', 'had', "'ve"],
    items: [
      { sentence: 'I ___ just finished my homework.', correct: 'have', options: ['have', 'has', 'had', 'am'], explain: 'Present perfect: I have just finished (recent past).' },
      { sentence: 'She ___ lived here since 2015.', correct: 'has', options: ['has', 'have', 'had', 'is'], explain: 'Present perfect: She has lived (duration up to now).' },
      { sentence: 'They ___ never been to Japan.', correct: 'have', options: ['have', 'has', 'had', 'are'], explain: 'Present perfect for experience: They have never been.' },
      { sentence: 'He ___ already left when I arrived.', correct: 'had', options: ['had', 'has', 'have', 'was'], explain: 'Past perfect: had already left (before another past event).' },
      { sentence: '___ you ever eaten sushi?', correct: 'Have', options: ['Have', 'Has', 'Did', 'Do'], explain: 'Present perfect question for experience: Have you ever...?' },
      { sentence: 'She ___ been working here for three years.', correct: 'has', options: ['has', 'have', 'had', 'is'], explain: 'Present perfect continuous: has been + -ing (duration up to now).' },
      { sentence: 'We ___ visited that museum twice.', correct: 'have', options: ['have', 'has', 'had', 'are'], explain: 'Present perfect for number of times: We have visited.' },
      { sentence: 'By 2030, they ___ completed the project.', correct: 'will have', options: ['will have', 'have', 'had', 'will'], explain: 'Future perfect: will have + past participle.' },
      { sentence: 'I ___ known him since childhood.', correct: 'have', options: ['have', 'has', 'had', 'am'], explain: 'Present perfect for duration from past to now: have known since.' },
      { sentence: 'She ___ lost her keys — she can\'t find them anywhere.', correct: 'has', options: ['has', 'have', 'had', 'is'], explain: 'Present perfect: result visible now (she has lost → still lost).' },
      { sentence: 'After he ___ eaten, he went for a walk.', correct: 'had', options: ['had', 'has', 'have', 'was'], explain: 'Past perfect: action completed before another past action.' },
      { sentence: 'I ___ been waiting for an hour!', correct: 'have', options: ['have', 'has', 'had', 'am'], explain: 'Present perfect continuous: have been + -ing (frustration/duration up to now).' }
    ]
  }
};
