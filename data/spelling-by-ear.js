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
      { base: 'write', correct: 'writing', form: '-ing', rule: 'drop-e', explain: 'Silent -e: write → writing (drop the e)' },
      { base: 'lie', correct: 'lying', form: '-ing', rule: 'ie-to-y', explain: '-ie ending: lie → lying (ie → y)' },
      { base: 'open', correct: 'opening', form: '-ing', rule: 'add', explain: 'Stress on 1st syllable: open → opening (no doubling)' },
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
      { base: 'study', correct: 'studied', form: '-ed', rule: 'y-to-i', explain: 'Consonant + y: study → studied (y → i + ed)' },
      { base: 'prefer', correct: 'preferred', form: '-ed', rule: 'double', explain: 'Stress on last CVC: prefer → preferred (double the r)' },
      { base: 'hope', correct: 'hoped', form: '-ed', rule: 'drop-e', explain: 'Silent -e: hope → hoped (just add -d)' },
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
      { base: 'marry', correct: 'married', form: '-ed', rule: 'y-to-i', explain: 'marry → married (consonant+y → i+ed)' },
      { base: 'cry', correct: 'crying', form: '-ing', rule: 'add', explain: 'cry → crying (keep the y before -ing)' },
    ]
  }
};
