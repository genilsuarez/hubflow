/**
 * HubFlow — Paragraph Cloze Data
 * Categories: a2, b1, b2 — full-paragraph gap-fill, several blanks per passage
 * so the grammar is practiced in context instead of isolated sentences.
 * Each entry: { title, text (with ___N___ markers), blanks: [{n, correct: string[], hint}], explain }
 */

export const CATEGORIES = {
  a2: {
    label: 'A2 — Past & Future Basics',
    icon: '📗',
    level: 'A2',
    items: [
      {
        title: 'A Trip to London',
        text: "Last summer, I ___1___ to London with my family. We ___2___ three museums and ___3___ a lot of photos. In the evening, we ___4___ dinner at a small restaurant near the river. It ___5___ a wonderful trip.",
        blanks: [
          { n: 1, correct: ['went', 'travelled', 'traveled'], hint: "past simple of 'go'" },
          { n: 2, correct: ['visited'], hint: 'past simple' },
          { n: 3, correct: ['took'], hint: "past simple of 'take'" },
          { n: 4, correct: ['had', 'ate'], hint: 'past simple' },
          { n: 5, correct: ['was'], hint: "past simple of 'be'" },
        ],
        explain: 'Past simple review: regular and irregular verbs for a story about the past.',
      },
      {
        title: 'My Daily Routine',
        text: "Every day, I ___1___ up at seven o'clock. I ___2___ a shower and ___3___ breakfast quickly. Then I ___4___ to work by bus. I usually ___5___ home at six in the evening.",
        blanks: [
          { n: 1, correct: ['wake', 'get'], hint: "present simple of 'wake up'" },
          { n: 2, correct: ['take', 'have'], hint: 'present simple' },
          { n: 3, correct: ['eat', 'have'], hint: 'present simple' },
          { n: 4, correct: ['go', 'travel'], hint: 'present simple' },
          { n: 5, correct: ['arrive', 'get', 'come'], hint: 'present simple' },
        ],
        explain: 'Present simple for daily habits and routines.',
      },
      {
        title: 'A Birthday Party',
        text: "Last Saturday, we ___1___ a birthday party for my brother. My mom ___2___ a big cake and we all ___3___ presents. My brother ___4___ very happy when he ___5___ his gifts.",
        blanks: [
          { n: 1, correct: ['had', 'organized'], hint: 'past simple' },
          { n: 2, correct: ['made', 'baked'], hint: 'past simple' },
          { n: 3, correct: ['brought', 'gave'], hint: 'past simple' },
          { n: 4, correct: ['was', 'felt'], hint: 'past simple' },
          { n: 5, correct: ['opened', 'saw'], hint: 'past simple' },
        ],
        explain: 'Past simple narrative for describing a specific past event.',
      },
      {
        title: 'Weekend Plans',
        text: "This weekend, I ___1___ going to visit my grandparents. We ___2___ going to cook a special dinner together. My sister ___3___ going to bring her new puppy. On Sunday, we ___4___ probably going to watch a movie. I ___5___ really excited about it!",
        blanks: [
          { n: 1, correct: ['am', "'m"], hint: "going to' future — 'be' for I" },
          { n: 2, correct: ['are', "'re"], hint: "'going to' future — 'be' for we" },
          { n: 3, correct: ['is', "'s"], hint: "'going to' future — 'be' for she" },
          { n: 4, correct: ['are', "'re"], hint: "'going to' future — 'be' for we" },
          { n: 5, correct: ['am', "'m"], hint: "present simple 'be' for feelings" },
        ],
        explain: "'Going to' future for plans already decided.",
      },
      {
        title: 'A Rainy Day',
        text: "Yesterday afternoon, it ___1___ heavily when I left the house. I ___2___ my umbrella at home, so I ___3___ very wet. While I ___4___ for the bus, a friend ___5___ me a lift instead.",
        blanks: [
          { n: 1, correct: ['was raining'], hint: 'past continuous (background action)' },
          { n: 2, correct: ['forgot'], hint: 'past simple' },
          { n: 3, correct: ['got'], hint: 'past simple' },
          { n: 4, correct: ['was waiting'], hint: 'past continuous' },
          { n: 5, correct: ['gave'], hint: 'past simple (interrupting action)' },
        ],
        explain: 'Past continuous for background actions interrupted by past simple events.',
      },
      {
        title: 'Future Predictions',
        text: "In fifty years, I think people ___1___ live longer and healthier lives. Scientists believe robots ___2___ do most dangerous jobs. Cars ___3___ probably drive themselves without any human help. I don't think we ___4___ need paper money anymore. Life ___5___ be very different from today.",
        blanks: [
          { n: 1, correct: ['will'], hint: "'will' future for predictions" },
          { n: 2, correct: ['will'], hint: 'will future' },
          { n: 3, correct: ['will'], hint: 'will future' },
          { n: 4, correct: ['will'], hint: 'will future' },
          { n: 5, correct: ['will'], hint: 'will future' },
        ],
        explain: "'Will' for predictions and beliefs about the future.",
      },
      {
        title: 'At the Supermarket',
        text: "My mother ___1___ shopping every Saturday morning. She always ___2___ a list before she leaves home. She usually ___3___ fresh vegetables and fruit first. My father sometimes ___4___ her, but he ___5___ shopping very much.",
        blanks: [
          { n: 1, correct: ['goes'], hint: 'present simple 3rd person' },
          { n: 2, correct: ['makes', 'writes'], hint: 'present simple' },
          { n: 3, correct: ['buys', 'chooses'], hint: 'present simple' },
          { n: 4, correct: ['helps', 'joins'], hint: 'present simple' },
          { n: 5, correct: ["doesn't enjoy", "doesn't like"], hint: 'present simple negative' },
        ],
        explain: 'Present simple third person -s for habitual routines.',
      },
    ],
  },
  b1: {
    label: 'B1 — Modals, Passive & Reported Speech',
    icon: '📘',
    level: 'B1',
    items: [
      {
        title: 'Choosing a Career',
        text: "When choosing a career, you ___1___ think carefully about your interests. You ___2___ ask experienced people for advice, although it isn't obligatory. Some jobs ___3___ a university degree, while others don't. You ___4___ start working right after school if you prefer practical experience. Whatever you choose, you ___5___ enjoy what you do.",
        blanks: [
          { n: 1, correct: ['should', 'must'], hint: 'modal of advice/obligation' },
          { n: 2, correct: ['should', 'could'], hint: 'modal of advice' },
          { n: 3, correct: ['require', 'need'], hint: 'present simple' },
          { n: 4, correct: ['can', 'could'], hint: 'modal of possibility' },
          { n: 5, correct: ['should'], hint: 'modal of advice' },
        ],
        explain: 'Modal verbs for advice, obligation, and possibility.',
      },
      {
        title: 'Environmental Problems',
        text: 'Every year, millions of tons of plastic ___1___ into the ocean. Many species ___2___ threatened by pollution. New laws ___3___ being introduced to reduce waste, but more action is needed. Renewable energy ___4___ increasingly used instead of fossil fuels. If these problems are not addressed, the planet ___5___ be seriously damaged.',
        blanks: [
          { n: 1, correct: ['are dumped', 'are thrown', 'end up'], hint: 'passive present simple' },
          { n: 2, correct: ['are'], hint: "passive present simple — 'are threatened'" },
          { n: 3, correct: ['are'], hint: "passive present continuous — 'are being introduced'" },
          { n: 4, correct: ['is'], hint: "passive present simple — 'is used'" },
          { n: 5, correct: ['will', 'could', 'may'], hint: 'future passive' },
        ],
        explain: 'Passive voice for describing processes without naming who does the action.',
      },
      {
        title: 'A Difficult Decision',
        text: 'My friend told me that she ___1___ moving to another city. She said she ___2___ found a new job there and that she ___3___ start next month. I asked her if she ___4___ miss her family. She admitted that she ___5___ worried about it.',
        blanks: [
          { n: 1, correct: ['was'], hint: 'reported speech: is → was' },
          { n: 2, correct: ['had'], hint: 'reported speech: has → had' },
          { n: 3, correct: ['would'], hint: 'reported speech: will → would' },
          { n: 4, correct: ['would'], hint: 'reported yes/no question' },
          { n: 5, correct: ['was'], hint: 'reported speech: is → was' },
        ],
        explain: 'Reported speech backshift: present/future forms move one step into the past.',
      },
      {
        title: 'Learning a New Language',
        text: "Learning a new language takes time. Many people enjoy ___1___ with apps because it's flexible. However, experts recommend ___2___ speaking with native speakers regularly. It's important ___3___ mistakes without feeling embarrassed. Some learners decide ___4___ a formal course, while others prefer ___5___ on their own.",
        blanks: [
          { n: 1, correct: ['studying'], hint: "gerund after 'enjoy'" },
          { n: 2, correct: ['practicing', 'practising'], hint: "gerund after 'recommend'" },
          { n: 3, correct: ['to make'], hint: "infinitive after 'it's important'" },
          { n: 4, correct: ['to take'], hint: "infinitive after 'decide'" },
          { n: 5, correct: ['to learn', 'learning'], hint: "infinitive or gerund after 'prefer' — both work" },
        ],
        explain: 'Gerunds and infinitives after common verbs and expressions.',
      },
      {
        title: 'Office Rules',
        text: "In this office, employees ___1___ arrive before nine o'clock. You ___2___ wear a uniform, but smart clothes are expected. Staff ___3___ smoke inside the building under any circumstances. If you finish early, you ___4___ leave, but please tell your manager first. New employees ___5___ ask questions whenever they need help.",
        blanks: [
          { n: 1, correct: ['must', 'have to'], hint: 'obligation' },
          { n: 2, correct: ["don't have to", "needn't"], hint: 'lack of obligation' },
          { n: 3, correct: ["mustn't", "can't"], hint: 'prohibition' },
          { n: 4, correct: ['can', 'may'], hint: 'permission' },
          { n: 5, correct: ['should', 'can'], hint: 'advice/permission' },
        ],
        explain: 'Modal verbs expressing obligation, prohibition, and permission in workplace rules.',
      },
      {
        title: 'A Historic Building',
        text: 'This old theatre ___1___ built in 1890 by a famous architect. It ___2___ used as a cinema during the 1950s. Sadly, the building ___3___ damaged in a fire in 1975. Fortunately, it ___4___ restored a few years later. Today, concerts ___5___ still held here every summer.',
        blanks: [
          { n: 1, correct: ['was'], hint: 'passive past simple' },
          { n: 2, correct: ['was'], hint: 'passive past simple' },
          { n: 3, correct: ['was'], hint: 'passive past simple' },
          { n: 4, correct: ['was'], hint: 'passive past simple' },
          { n: 5, correct: ['are'], hint: 'passive present simple' },
        ],
        explain: 'Passive voice for describing the history of a building without naming who did the actions.',
      },
      {
        title: 'Job Interview Tips',
        text: "Before an interview, it's a good idea ___1___ some research about the company. Try ___2___ questions in advance so you feel more confident. Avoid ___3___ negatively about previous employers. Remember ___4___ your ID and any documents they ask for. Most candidates admit ___5___ nervous, and that's completely normal.",
        blanks: [
          { n: 1, correct: ['to do'], hint: "infinitive after 'a good idea'" },
          { n: 2, correct: ['answering', 'to answer'], hint: "'try' + gerund/infinitive" },
          { n: 3, correct: ['speaking', 'talking'], hint: "gerund after 'avoid'" },
          { n: 4, correct: ['to bring'], hint: "infinitive after 'remember' (future action)" },
          { n: 5, correct: ['being', 'feeling'], hint: "gerund after 'admit'" },
        ],
        explain: 'Gerunds and infinitives after common interview-related verbs and expressions.',
      },
    ],
  },
  b2: {
    label: 'B2 — Conditionals, Reported Speech & Passive',
    icon: '📙',
    level: 'B2',
    items: [
      {
        title: 'The Future of Work',
        text: 'If more companies ___1___ remote work, employees would have greater flexibility today. If automation continues to advance, many traditional jobs ___2___ disappear within a decade. Workers who ___3___ new skills now will be better prepared for the changes ahead. If governments had invested more in education years ago, the workforce ___4___ more adaptable today. Ultimately, whether the future of work improves ___5___ on how well we prepare for it.',
        blanks: [
          { n: 1, correct: ['had adopted', 'adopted'], hint: 'mixed conditional: past unreal → present result' },
          { n: 2, correct: ['will', 'could', 'may'], hint: 'first conditional: real future' },
          { n: 3, correct: ['learn', 'develop'], hint: 'present simple in a relative clause' },
          { n: 4, correct: ['would be'], hint: 'mixed conditional: past unreal → present result' },
          { n: 5, correct: ['depends'], hint: 'present simple' },
        ],
        explain: 'Mixed conditionals combine a past condition with a present result, or vice versa.',
      },
      {
        title: 'A Cultural Misunderstanding',
        text: 'During my trip, a local resident asked me if I ___1___ ever visited before. I explained that it ___2___ my first time in the country. She warned me that some gestures I used ___3___ considered rude locally. I apologized and asked her ___4___ she could explain the customs. She said she ___5___ happy to help.',
        blanks: [
          { n: 1, correct: ['had'], hint: 'reported speech: present perfect → past perfect' },
          { n: 2, correct: ['was'], hint: 'reported speech: is → was' },
          { n: 3, correct: ['might be', 'could be', 'were'], hint: 'reported speech: modal backshift' },
          { n: 4, correct: ['whether', 'if'], hint: 'reported yes/no question' },
          { n: 5, correct: ['would be'], hint: 'reported speech: will → would' },
        ],
        explain: 'Advanced reported speech: backshift across perfect tenses and modal verbs.',
      },
      {
        title: 'Scientific Discovery',
        text: 'The vaccine, which ___1___ developed over several years, has saved millions of lives. It ___2___ tested on thousands of volunteers before approval. The researchers, whose work ___3___ funded by several governments, published their findings last year. The discovery, which ___4___ widely praised by experts, changed modern medicine. Further studies ___5___ currently being conducted to improve its effectiveness.',
        blanks: [
          { n: 1, correct: ['was'], hint: 'passive past simple inside a relative clause' },
          { n: 2, correct: ['was'], hint: 'passive past simple' },
          { n: 3, correct: ['was'], hint: 'passive past simple inside a relative clause' },
          { n: 4, correct: ['was'], hint: 'passive past simple inside a relative clause' },
          { n: 5, correct: ['are'], hint: 'passive present continuous' },
        ],
        explain: 'Passive voice combined with relative clauses to describe research formally.',
      },
      {
        title: 'An Unexpected Opportunity',
        text: 'By the time she received the job offer, she ___1___ already accepted another position. She had been working at her old company for five years when the new offer ___2___. If she ___3___ known about the opportunity sooner, she might have made a different choice. Now she wonders what ___4___ happened if she had taken the new job. Looking back, she realizes she ___5___ learned an important lesson about timing.',
        blanks: [
          { n: 1, correct: ['had'], hint: 'past perfect' },
          { n: 2, correct: ['arrived', 'came'], hint: 'past simple' },
          { n: 3, correct: ['had'], hint: 'third conditional' },
          { n: 4, correct: ['would have'], hint: 'third conditional' },
          { n: 5, correct: ['has'], hint: 'present perfect' },
        ],
        explain: 'Mixed narrative tenses: past perfect, past simple, third conditional, and present perfect working together.',
      },
      {
        title: 'What Could Have Been',
        text: "If the company ___1___ invested in technology earlier, it wouldn't be struggling now. Had the manager listened to her team, the project ___2___ have failed so badly. If employees ___3___ more support today, morale would probably be higher. The whole situation might have been avoided if leadership ___4___ acted sooner. Looking back, everyone agrees that things ___5___ have been handled differently.",
        blanks: [
          { n: 1, correct: ['had'], hint: 'mixed conditional (past unreal → present result)' },
          { n: 2, correct: ["wouldn't", "might not"], hint: 'third conditional negative' },
          { n: 3, correct: ['received', 'had'], hint: 'second conditional (present unreal)' },
          { n: 4, correct: ['had'], hint: 'third conditional' },
          { n: 5, correct: ['could', 'should'], hint: 'modal for hindsight' },
        ],
        explain: 'Mixed and third conditionals combining hypothetical past and present situations.',
      },
      {
        title: 'The Discovery of a Lost City',
        text: 'The ancient city, which ___1___ hidden in the jungle for centuries, was finally discovered by archaeologists. The ruins, which ___2___ believed to be over a thousand years old, attracted researchers from around the world. Several artifacts, which ___3___ carefully preserved, were sent to a museum. The site, where many treasures ___4___ found, is now protected by law. Further excavations ___5___ planned for next year.',
        blanks: [
          { n: 1, correct: ['had been'], hint: 'passive past perfect inside a relative clause' },
          { n: 2, correct: ['are'], hint: 'passive present simple' },
          { n: 3, correct: ['were'], hint: 'passive past simple' },
          { n: 4, correct: ['were'], hint: 'passive past simple' },
          { n: 5, correct: ['are'], hint: 'passive present simple' },
        ],
        explain: 'Passive voice across multiple tenses, combined with relative clauses, in a formal narrative.',
      },
    ],
  },
};
