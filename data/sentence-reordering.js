/**
 * HubFlow — Sentence Reordering Data
 * Categories: everydayStories (A2-B1), instructionsProcesses (B1)
 * Each entry: { sentences: [{label, text}], correct: [labelSequence], hint, explain }
 * The user types the correct order using the letters (e.g. "CADB").
 */

export const CATEGORIES = {
  everydayStories: {
    label: 'Everyday Stories',
    icon: '📖',
    items: [
      { sentences: [
          { label: 'C', text: 'Maria woke up early and made her bed.' },
          { label: 'A', text: 'Then she poured herself a cup of coffee.' },
          { label: 'D', text: 'After that, she took a quick shower.' },
          { label: 'B', text: 'Finally, she sat down to check her emails.' },
        ], correct: ['CADB'], hint: 'Think about the order of a morning routine.', explain: 'Wake up → coffee → shower → emails.' },
      { sentences: [
          { label: 'B', text: 'Tom got dressed and had a quick breakfast.' },
          { label: 'A', text: 'He locked the door and left for work.' },
          { label: 'D', text: 'On the way, his car got a flat tire.' },
          { label: 'C', text: 'He finally arrived at the office ten minutes late.' },
        ], correct: ['BADC'], hint: 'Getting ready comes before leaving the house.', explain: 'Get ready → leave → flat tire → arrive late.' },
      { sentences: [
          { label: 'C', text: 'We arrived in Rome early in the morning.' },
          { label: 'B', text: 'We walked around the old town for hours.' },
          { label: 'A', text: 'They finally found a small café near the museum.' },
          { label: 'D', text: 'After lunch, we visited the Colosseum.' },
        ], correct: ['CBAD'], hint: 'Arrival comes before exploring the city.', explain: 'Arrive → walk around → find a café → visit after lunch.' },
      { sentences: [
          { label: 'B', text: 'Anna mixed the flour, sugar, and eggs together.' },
          { label: 'C', text: 'She then poured the batter into a pan.' },
          { label: 'A', text: 'She opened the oven and checked the cake.' },
          { label: 'D', text: 'It was perfectly golden, so she took it out.' },
        ], correct: ['BCAD'], hint: 'Mixing ingredients comes before baking.', explain: 'Mix → pour → check → take out.' },
      { sentences: [
          { label: 'A', text: 'He packed his suitcase the night before.' },
          { label: 'B', text: 'James woke up at 5am to catch his flight.' },
          { label: 'C', text: 'He grabbed his suitcase and called a taxi.' },
          { label: 'D', text: 'Luckily, he arrived at the airport just in time.' },
        ], correct: ['ABCD'], hint: 'What happens the night before a trip?', explain: 'Pack the night before → wake up → grab bags → arrive.' },
      { sentences: [
          { label: 'B', text: 'The kids got very excited when they saw the ocean.' },
          { label: 'A', text: 'We drove to the beach early on Saturday.' },
          { label: 'D', text: 'They built a huge sandcastle together.' },
          { label: 'C', text: 'By evening, everyone was tired but happy.' },
        ], correct: ['ABDC'], hint: 'Travel comes before arriving and playing.', explain: 'Drive → see ocean → build sandcastle → tired by evening.' },
      { sentences: [
          { label: 'D', text: 'She had been feeling sick for two days.' },
          { label: 'A', text: 'Finally, she decided to see a doctor.' },
          { label: 'C', text: 'The doctor said it was just a bad cold.' },
          { label: 'B', text: 'She went home and rested for the weekend.' },
        ], correct: ['DACB'], hint: 'Feeling sick comes before deciding to act.', explain: 'Feel sick → see doctor → diagnosis → rest.' },
      { sentences: [
          { label: 'A', text: 'The students arrived at the museum by bus.' },
          { label: 'C', text: 'A guide showed them the ancient artifacts.' },
          { label: 'B', text: 'They asked many questions during the tour.' },
          { label: 'D', text: 'Before leaving, they bought souvenirs in the gift shop.' },
        ], correct: ['ACBD'], hint: 'Arrival comes before the guided tour.', explain: 'Arrive → guided tour → questions → souvenirs.' },
      { sentences: [
          { label: 'B', text: 'He had wanted a dog for years.' },
          { label: 'A', text: 'Finally, his parents agreed to get one.' },
          { label: 'D', text: 'They visited a shelter the next weekend.' },
          { label: 'C', text: 'He picked a small brown puppy immediately.' },
        ], correct: ['BADC'], hint: 'Wanting something comes before getting permission.', explain: 'Wanted a dog → parents agreed → visited shelter → picked puppy.' },
      { sentences: [
          { label: 'C', text: 'The power went out during the storm.' },
          { label: 'A', text: 'Everyone lit candles and waited quietly.' },
          { label: 'D', text: 'After an hour, the lights came back on.' },
          { label: 'B', text: 'They were relieved the storm had passed.' },
        ], correct: ['CADB'], hint: 'The power cut is the trigger event.', explain: 'Power out → light candles → power back → relief.' },
    ]
  },
  instructionsProcesses: {
    label: 'Instructions & Processes',
    icon: '📋',
    items: [
      { sentences: [
          { label: 'A', text: 'First, preheat the oven to 180 degrees.' },
          { label: 'C', text: 'Then mix the dry ingredients in a bowl.' },
          { label: 'B', text: 'Next, add the eggs and milk.' },
          { label: 'D', text: 'Finally, bake the mixture for 25 minutes.' },
        ], correct: ['ACBD'], hint: 'Preheating usually happens first.', explain: 'Preheat → mix dry ingredients → add wet ingredients → bake.' },
      { sentences: [
          { label: 'B', text: 'First, turn off the main power switch.' },
          { label: 'D', text: 'Then remove the cover of the socket.' },
          { label: 'A', text: 'Next, connect the new wire carefully.' },
          { label: 'C', text: 'Finally, turn the power back on.' },
        ], correct: ['BDAC'], hint: 'Safety first — power off before anything else.', explain: 'Power off → remove cover → connect wire → power on.' },
      { sentences: [
          { label: 'C', text: 'First, create an account on the website.' },
          { label: 'A', text: 'Then verify your email address.' },
          { label: 'D', text: 'Next, fill in your personal details.' },
          { label: 'B', text: 'Finally, submit the form to complete registration.' },
        ], correct: ['CADB'], hint: 'You need an account before verifying anything.', explain: 'Create account → verify email → fill details → submit.' },
      { sentences: [
          { label: 'D', text: 'First, gather all your camping equipment.' },
          { label: 'B', text: "Then choose a flat, dry spot for the tent." },
          { label: 'A', text: 'Next, set up the tent poles carefully.' },
          { label: 'C', text: 'Finally, secure the tent with pegs.' },
        ], correct: ['DBAC'], hint: 'You need equipment before choosing a spot.', explain: 'Gather equipment → choose spot → set up poles → secure with pegs.' },
      { sentences: [
          { label: 'A', text: 'First, wash the vegetables thoroughly.' },
          { label: 'D', text: 'Then chop them into small pieces.' },
          { label: 'C', text: 'Next, heat some oil in the pan.' },
          { label: 'B', text: 'Finally, stir-fry everything for five minutes.' },
        ], correct: ['ADCB'], hint: 'Washing comes before chopping.', explain: 'Wash → chop → heat oil → stir-fry.' },
      { sentences: [
          { label: 'B', text: 'First, back up all your important files.' },
          { label: 'A', text: 'Then insert the installation disk.' },
          { label: 'D', text: 'Next, follow the on-screen instructions.' },
          { label: 'C', text: "Finally, restart your computer when it's done." },
        ], correct: ['BADC'], hint: 'Always back up before installing anything.', explain: 'Back up → insert disk → follow instructions → restart.' },
      { sentences: [
          { label: 'C', text: "First, measure the wall where you'll hang the shelf." },
          { label: 'A', text: 'Then mark the positions for the screws.' },
          { label: 'D', text: 'Next, drill holes at each mark.' },
          { label: 'B', text: 'Finally, attach the shelf with the screws.' },
        ], correct: ['CADB'], hint: 'Measuring comes before marking.', explain: 'Measure → mark → drill → attach.' },
      { sentences: [
          { label: 'D', text: 'First, apply for the necessary permits.' },
          { label: 'B', text: 'Then hire a licensed contractor.' },
          { label: 'A', text: 'Next, order all the building materials.' },
          { label: 'C', text: 'Finally, begin construction on the agreed date.' },
        ], correct: ['DBAC'], hint: 'Permits are needed before hiring anyone.', explain: 'Permits → hire contractor → order materials → begin construction.' },
      { sentences: [
          { label: 'A', text: 'First, sort your laundry by colour.' },
          { label: 'C', text: 'Then choose the right water temperature.' },
          { label: 'D', text: 'Next, add the correct amount of detergent.' },
          { label: 'B', text: 'Finally, start the washing machine.' },
        ], correct: ['ACDB'], hint: 'Sorting always comes first.', explain: 'Sort → choose temperature → add detergent → start.' },
      { sentences: [
          { label: 'B', text: 'First, research the topic thoroughly.' },
          { label: 'D', text: 'Then create a detailed outline.' },
          { label: 'A', text: 'Next, write the first draft.' },
          { label: 'C', text: 'Finally, edit and proofread the essay.' },
        ], correct: ['BDAC'], hint: 'Research always comes before writing.', explain: 'Research → outline → draft → edit.' },
    ]
  }
};
