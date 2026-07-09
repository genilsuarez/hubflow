/**
 * Spelling by Ear Data — listen to the base verb, write the -ing or -ed form
 * Reutilizes concepts from ing-words.js and ed-words.js
 * Each item: { base, correct, form ('-ing' or '-ed'), rule, explain }
 */

export const CATEGORIES = {
  ing: {
    label: '-ing Forms',
    icon: '🔊',
    items: [
      { base: 'run', correct: 'running', form: '-ing', rule: 'double', explain: 'CVC word: run → running (double the n)' },
      { base: 'make', correct: 'making', form: '-ing', rule: 'drop-e', explain: 'Silent -e: make → making (drop the e)' },
      { base: 'die', correct: 'dying', form: '-ing', rule: 'ie-to-y', explain: '-ie ending: die → dying (ie → y)' },
      { base: 'play', correct: 'playing', form: '-ing', rule: 'add', explain: 'Just add -ing: play → playing' },
      { base: 'swim', correct: 'swimming', form: '-ing', rule: 'double', explain: 'CVC word: swim → swimming (double the m)' },
      { base: 'write', correct: 'writing', form: '-ing', rule: 'drop-e', explain: 'Silent -e: write → writing (drop the e)' },
      { base: 'sit', correct: 'sitting', form: '-ing', rule: 'double', explain: 'CVC word: sit → sitting (double the t)' },
      { base: 'come', correct: 'coming', form: '-ing', rule: 'drop-e', explain: 'Silent -e: come → coming (drop the e)' },
      { base: 'lie', correct: 'lying', form: '-ing', rule: 'ie-to-y', explain: '-ie ending: lie → lying (ie → y)' },
      { base: 'stop', correct: 'stopping', form: '-ing', rule: 'double', explain: 'CVC word: stop → stopping (double the p)' },
      { base: 'open', correct: 'opening', form: '-ing', rule: 'add', explain: 'Stress on 1st syllable: open → opening (no doubling)' },
      { base: 'begin', correct: 'beginning', form: '-ing', rule: 'double', explain: 'Stress on last CVC syllable: begin → beginning (double the n)' },
      { base: 'travel', correct: 'travelling', form: '-ing', rule: 'double', explain: 'BrE: travel → travelling (double l in British English)' },
      { base: 'dance', correct: 'dancing', form: '-ing', rule: 'drop-e', explain: 'Silent -e: dance → dancing (drop the e)' },
      { base: 'eat', correct: 'eating', form: '-ing', rule: 'add', explain: 'Just add -ing: eat → eating (vowel cluster, no doubling)' }
    ]
  },
  ed: {
    label: '-ed Forms',
    icon: '🎧',
    items: [
      { base: 'stop', correct: 'stopped', form: '-ed', rule: 'double', explain: 'CVC word: stop → stopped (double the p)' },
      { base: 'live', correct: 'lived', form: '-ed', rule: 'drop-e', explain: 'Silent -e: live → lived (just add -d)' },
      { base: 'carry', correct: 'carried', form: '-ed', rule: 'y-to-i', explain: 'Consonant + y: carry → carried (y → i + ed)' },
      { base: 'play', correct: 'played', form: '-ed', rule: 'add', explain: 'Vowel + y: play → played (just add -ed)' },
      { base: 'plan', correct: 'planned', form: '-ed', rule: 'double', explain: 'CVC word: plan → planned (double the n)' },
      { base: 'dance', correct: 'danced', form: '-ed', rule: 'drop-e', explain: 'Silent -e: dance → danced (just add -d)' },
      { base: 'try', correct: 'tried', form: '-ed', rule: 'y-to-i', explain: 'Consonant + y: try → tried (y → i + ed)' },
      { base: 'open', correct: 'opened', form: '-ed', rule: 'add', explain: 'Stress on 1st syllable: open → opened (no doubling)' },
      { base: 'prefer', correct: 'preferred', form: '-ed', rule: 'double', explain: 'Stress on last CVC: prefer → preferred (double the r)' },
      { base: 'study', correct: 'studied', form: '-ed', rule: 'y-to-i', explain: 'Consonant + y: study → studied (y → i + ed)' },
      { base: 'drop', correct: 'dropped', form: '-ed', rule: 'double', explain: 'CVC word: drop → dropped (double the p)' },
      { base: 'travel', correct: 'travelled', form: '-ed', rule: 'double', explain: 'BrE: travel → travelled (double l in British English)' },
      { base: 'enjoy', correct: 'enjoyed', form: '-ed', rule: 'add', explain: 'Vowel + y: enjoy → enjoyed (just add -ed)' },
      { base: 'hope', correct: 'hoped', form: '-ed', rule: 'drop-e', explain: 'Silent -e: hope → hoped (just add -d)' },
      { base: 'admit', correct: 'admitted', form: '-ed', rule: 'double', explain: 'Stress on last CVC: admit → admitted (double the t)' }
    ]
  },
  mixed: {
    label: 'Mixed',
    icon: '🔀',
    items: [
      { base: 'grab', correct: 'grabbing', form: '-ing', rule: 'double', explain: 'grab → grabbing (CVC, double b)' },
      { base: 'wrap', correct: 'wrapped', form: '-ed', rule: 'double', explain: 'wrap → wrapped (CVC, double p)' },
      { base: 'bake', correct: 'baking', form: '-ing', rule: 'drop-e', explain: 'bake → baking (drop silent e)' },
      { base: 'phone', correct: 'phoned', form: '-ed', rule: 'drop-e', explain: 'phone → phoned (add -d to silent e)' },
      { base: 'cry', correct: 'crying', form: '-ing', rule: 'add', explain: 'cry → crying (keep the y before -ing)' },
      { base: 'marry', correct: 'married', form: '-ed', rule: 'y-to-i', explain: 'marry → married (consonant+y → i+ed)' },
      { base: 'rob', correct: 'robbing', form: '-ing', rule: 'double', explain: 'rob → robbing (CVC, double b)' },
      { base: 'beg', correct: 'begged', form: '-ed', rule: 'double', explain: 'beg → begged (CVC, double g)' },
      { base: 'close', correct: 'closing', form: '-ing', rule: 'drop-e', explain: 'close → closing (drop silent e)' },
      { base: 'smoke', correct: 'smoked', form: '-ed', rule: 'drop-e', explain: 'smoke → smoked (add -d to silent e)' },
      { base: 'fly', correct: 'flying', form: '-ing', rule: 'add', explain: 'fly → flying (keep the y before -ing)' },
      { base: 'copy', correct: 'copied', form: '-ed', rule: 'y-to-i', explain: 'copy → copied (consonant+y → i+ed)' }
    ]
  }
};
