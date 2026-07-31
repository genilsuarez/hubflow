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
      { sentences: [
          { label: 'C', text: 'Lisa checked her fridge and wrote a shopping list.' },
          { label: 'A', text: 'She drove to the supermarket and filled her cart.' },
          { label: 'D', text: 'She paid at the checkout and packed her bags.' },
          { label: 'B', text: 'Finally, she put everything away in the kitchen.' },
        ], correct: ['CADB'], hint: 'Making the list comes before shopping.', explain: 'Check fridge & write list → shop → pay → put groceries away.' },
      { sentences: [
          { label: 'B', text: 'Mark ironed his shirt and prepared his answers the night before.' },
          { label: 'D', text: 'He woke up early and had a light breakfast.' },
          { label: 'A', text: 'He arrived at the office ten minutes early.' },
          { label: 'C', text: "He answered the interviewer's questions confidently." },
        ], correct: ['BDAC'], hint: 'Preparation happens before the interview itself.', explain: 'Prepare the night before → wake up & eat → arrive early → answer questions.' },
      { sentences: [
          { label: 'D', text: 'The family packed all their boxes over the weekend.' },
          { label: 'A', text: 'The movers loaded the truck early in the morning.' },
          { label: 'C', text: 'They drove to the new house across town.' },
          { label: 'B', text: 'They spent the evening unpacking the kitchen boxes.' },
        ], correct: ['DACB'], hint: 'Packing always happens before the truck arrives.', explain: 'Pack boxes → load truck → drive to new house → unpack.' },
      { sentences: [
          { label: 'C', text: 'Emma planted tomato seeds in small pots.' },
          { label: 'A', text: 'She watered them every morning for two weeks.' },
          { label: 'D', text: 'Tiny green shoots began to appear in the soil.' },
          { label: 'B', text: 'By summer, the plants were full of ripe tomatoes.' },
        ], correct: ['CADB'], hint: 'Planting seeds comes before watering them.', explain: 'Plant seeds → water daily → shoots appear → tomatoes ripen.' },
      { sentences: [
          { label: 'B', text: 'Her friends secretly planned a surprise party for weeks.' },
          { label: 'D', text: 'They decorated the living room while she was at work.' },
          { label: 'A', text: 'Everyone hid quietly behind the sofa and the door.' },
          { label: 'C', text: 'When she walked in, they all shouted "Surprise!"' },
        ], correct: ['BDAC'], hint: 'Planning happens long before the surprise itself.', explain: 'Plan party → decorate → hide → shout surprise.' },
      { sentences: [
          { label: 'A', text: 'Dad held the back of the bike as Tim pedaled slowly.' },
          { label: 'C', text: 'Tim wobbled and almost fell off twice.' },
          { label: 'D', text: 'Little by little, he found his balance.' },
          { label: 'B', text: 'By the end of the afternoon, he was riding on his own.' },
        ], correct: ['ACDB'], hint: 'Holding the bike comes before letting go.', explain: 'Dad holds bike → wobbles → finds balance → rides alone.' },
      { sentences: [
          { label: 'D', text: 'Karen woke up ten minutes later than usual.' },
          { label: 'B', text: 'She rushed to get dressed and skipped breakfast.' },
          { label: 'A', text: 'She ran to the bus stop, but the bus had already left.' },
          { label: 'C', text: 'She had to wait twenty minutes for the next one.' },
        ], correct: ['DBAC'], hint: 'Waking up late is the first domino to fall.', explain: 'Wake up late → rush → miss the bus → wait for the next one.' },
      { sentences: [
          { label: 'C', text: 'Paul had a toothache for three days.' },
          { label: 'A', text: 'He finally booked an appointment with the dentist.' },
          { label: 'D', text: 'The dentist checked his teeth and found a small cavity.' },
          { label: 'B', text: 'She fixed it quickly, and the pain was gone.' },
        ], correct: ['CADB'], hint: 'The toothache comes before booking the appointment.', explain: 'Toothache → book appointment → check-up → fixed.' },
      { sentences: [
          { label: 'B', text: 'Sofia felt nervous on her first morning at the new school.' },
          { label: 'D', text: 'She found her classroom and sat down quietly.' },
          { label: 'A', text: 'A friendly classmate introduced herself during break.' },
          { label: 'C', text: 'By lunchtime, Sofia already had a new friend.' },
        ], correct: ['BDAC'], hint: 'Feeling nervous comes before finding the classroom.', explain: 'Feel nervous → find classroom → make a friend → lunch together.' },
      { sentences: [
          { label: 'A', text: 'It rained all day, so the family stayed inside.' },
          { label: 'C', text: 'They made popcorn and chose a movie together.' },
          { label: 'D', text: 'Halfway through, the power flickered but stayed on.' },
          { label: 'B', text: 'They finished the movie and went to bed early.' },
        ], correct: ['ACDB'], hint: 'The rain is why they stayed inside in the first place.', explain: 'Rain all day → make popcorn & pick movie → power flickers → finish & sleep.' },
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
      { sentences: [
          { label: 'A', text: 'First, boil water in the kettle.' },
          { label: 'C', text: 'Then put a tea bag in your cup.' },
          { label: 'D', text: 'Next, pour the hot water over the tea bag.' },
          { label: 'B', text: 'Finally, add milk or sugar if you like.' },
        ], correct: ['ACDB'], hint: 'You need boiling water before pouring it.', explain: 'Boil water → add tea bag → pour water → add milk/sugar.' },
      { sentences: [
          { label: 'B', text: 'First, turn off the light switch.' },
          { label: 'D', text: 'Then let the old bulb cool down completely.' },
          { label: 'A', text: 'Next, unscrew the old bulb carefully.' },
          { label: 'C', text: 'Finally, screw in the new bulb and turn the switch on.' },
        ], correct: ['BDAC'], hint: 'Safety first — the light must be off.', explain: 'Turn off switch → let it cool → unscrew old bulb → screw in new one.' },
      { sentences: [
          { label: 'C', text: 'First, place two slices of bread on a plate.' },
          { label: 'A', text: 'Then spread butter on both slices.' },
          { label: 'D', text: 'Next, add cheese, ham, and lettuce.' },
          { label: 'B', text: 'Finally, put the slices together and cut the sandwich in half.' },
        ], correct: ['CADB'], hint: 'The bread comes before anything is added.', explain: 'Bread → spread butter → add fillings → close & cut.' },
      { sentences: [
          { label: 'D', text: 'First, scrape the leftover food into the bin.' },
          { label: 'B', text: 'Then fill the sink with warm, soapy water.' },
          { label: 'A', text: 'Next, wash each plate and cup carefully.' },
          { label: 'C', text: 'Finally, rinse everything and let it dry.' },
        ], correct: ['DBAC'], hint: 'Scraping food off comes before washing.', explain: 'Scrape food → fill sink → wash → rinse & dry.' },
      { sentences: [
          { label: 'A', text: 'First, turn on the phone and choose your language.' },
          { label: 'C', text: 'Then connect to your Wi-Fi network.' },
          { label: 'D', text: 'Next, sign in with your email account.' },
          { label: 'B', text: 'Finally, install your favourite apps.' },
        ], correct: ['ACDB'], hint: 'You need Wi-Fi before signing in online.', explain: 'Turn on & choose language → connect Wi-Fi → sign in → install apps.' },
      { sentences: [
          { label: 'B', text: 'First, go to the library with your ID.' },
          { label: 'D', text: 'Then fill in a short registration form.' },
          { label: 'A', text: 'Next, the librarian checks your details.' },
          { label: 'C', text: 'Finally, you receive your new library card.' },
        ], correct: ['BDAC'], hint: 'You need your ID before filling in the form.', explain: 'Bring ID → fill form → librarian checks → receive card.' },
      { sentences: [
          { label: 'C', text: 'First, check if the soil feels dry.' },
          { label: 'A', text: 'Then fill a small watering can with water.' },
          { label: 'D', text: 'Next, pour the water slowly into the pot.' },
          { label: 'B', text: 'Finally, remove any extra water from the tray.' },
        ], correct: ['CADB'], hint: 'You only water when the soil is dry.', explain: 'Check soil → fill can → pour water → empty tray.' },
      { sentences: [
          { label: 'D', text: 'First, choose a box that fits the gift well.' },
          { label: 'B', text: 'Then cover the box with wrapping paper.' },
          { label: 'A', text: 'Next, fold the edges neatly and tape them down.' },
          { label: 'C', text: 'Finally, tie a ribbon and add a small card.' },
        ], correct: ['DBAC'], hint: 'The box comes before the paper.', explain: 'Choose box → wrap paper → fold & tape → ribbon & card.' },
      { sentences: [
          { label: 'A', text: 'First, turn off the alarm when it rings.' },
          { label: 'D', text: 'Then check your messages and the weather.' },
          { label: 'C', text: 'Next, put the phone on the charger while you shower.' },
          { label: 'B', text: 'Finally, grab the fully charged phone before leaving.' },
        ], correct: ['ADCB'], hint: 'The alarm always rings first.', explain: 'Turn off alarm → check messages → charge while showering → grab phone.' },
      { sentences: [
          { label: 'C', text: 'First, fill a small pot with soil.' },
          { label: 'A', text: 'Then make a small hole in the middle.' },
          { label: 'D', text: 'Next, drop the seed in and cover it gently.' },
          { label: 'B', text: 'Finally, water the soil and place the pot near light.' },
        ], correct: ['CADB'], hint: 'The pot needs soil before anything else.', explain: 'Fill pot → make hole → plant seed → water & place near light.' },
    ]
  }
};
