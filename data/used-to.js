/**
 * Used To Data — used to vs would (states), used to vs be used to vs get used to
 */

export const CATEGORIES = {
  stateException: {
    label: 'Used To vs Would',
    icon: '🕰️',
    options: ['used to', 'would'],
    items: [
      { sentence: 'I ___ be really shy at school.', correct: 'used to', explain: 'For past STATES (be, have, like, know, own...) only "used to" works — "would" is impossible.' },
      { sentence: 'She ___ have a dog when she was a kid.', correct: 'used to', explain: '"Have" (possession) is a state → only "used to", never "would".' },
      { sentence: 'We ___ live in a small flat before we moved here.', correct: 'used to', explain: '"Live" here describes a past state → "used to", not "would".' },
      { sentence: 'He ___ believe in ghosts, but not anymore.', correct: 'used to', explain: '"Believe" is a state verb → only "used to".' },
      { sentence: 'Every summer, my dad ___ take us fishing at the lake.', correct: 'would', explain: '"Take" is an ACTION repeated in the past → "would" works perfectly here (and so does "used to").' },
      { sentence: 'After school, we ___ play football in the park for hours.', correct: 'would', explain: '"Play" is a repeated past ACTION → "would" is natural here to describe the routine.' },
      { sentence: 'She ___ always bring homemade cake to the office on Fridays.', correct: 'would', explain: '"Bring" is an ACTION repeated habitually → "would" emphasises the nostalgic routine.' },
      { sentence: 'On rainy days, grandma ___ read us stories by the fire.', correct: 'would', explain: '"Read" is a repeated past ACTION → "would" paints the nostalgic picture of that routine.' },
      { sentence: 'I ___ like broccoli, but now I love it.', correct: 'used to', explain: '"Like" is a state verb → only "used to".' },
      { sentence: 'Every morning he ___ walk to the bakery and buy fresh bread.', correct: 'would', explain: '"Walk" and "buy" are repeated past ACTIONS → "would" is ideal for describing habitual routines.' }
    ]
  },
  accustomed: {
    label: 'Used To / Be Used To / Get Used To',
    icon: '🔄',
    options: ['used to', 'am used to', 'am getting used to'],
    items: [
      { sentence: "I ___ waking up early now — it wasn't easy at first, but I'm managing.", correct: 'am getting used to', explain: '"Get used to" + -ing = the ongoing process of becoming accustomed.' },
      { sentence: 'I ___ the cold weather here after living here for years.', correct: 'am used to', explain: '"Be used to" + noun/-ing = already accustomed (a settled state).' },
      { sentence: 'When I was a student, I ___ stay up late every night.', correct: 'used to', explain: '"Used to" + base verb = a past habit that no longer happens.' },
      { sentence: 'I still ___ driving on the left since moving to the UK.', correct: 'am getting used to', explain: '"Get used to" + -ing = still adjusting, a process not yet complete.' },
      { sentence: 'I ___ visit my grandmother every Sunday when I was a child.', correct: 'used to', explain: '"Used to" + base verb = a repeated past action.' },
      { sentence: "I ___ the noise from the airport now — I've lived here for 20 years.", correct: 'am used to', explain: '"Be used to" + noun = accustomed to it now (settled state).' },
      { sentence: 'I ___ smoke, but I quit five years ago.', correct: 'used to', explain: '"Used to" + base verb = a discontinued past habit.' },
      { sentence: 'I ___ working night shifts — my body clock is adjusting slowly.', correct: 'am getting used to', explain: '"Get used to" + -ing = the adjustment is still in progress ("slowly").' },
      { sentence: 'She ___ live in the countryside, but now she prefers the city.', correct: 'used to', explain: '"Used to" + base verb = a past state no longer true.' },
      { sentence: 'She ___ the long commute — it no longer bothers her.', correct: 'am used to', explain: '"Be used to" + noun = fully accustomed.' }
    ]
  }
};
