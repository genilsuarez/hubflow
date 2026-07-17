/**
 * Paste this into the browser console on HubFlow (localhost:3000/hubflow/)
 * to clear ALL progress, activity, and score data.
 * After running, refresh the page.
 */

// 1. Remove the two main projections
localStorage.removeItem('learnflow:progress:hubflow:v1');
localStorage.removeItem('learnflow:activity:hubflow:v1');

// 2. Remove ALL individual score-history keys
// Complete list of prefixes from catalog.js PROGRESS_RULES
const scoreKeyPrefixes = [
  'advcoll-', 'art-', 'causative-', 'clause-', 'cleft-', 'coll-', 'comp-',
  'cond-', 'conf-', 'dict-', 'errhunt-', 'ger-', 'inver-', 'irr-', 'kwt-',
  'listen-', 'madeof-', 'modals-', 'odd-', 'paracloze-', 'paraphrase-',
  'phonics-', 'phrasal-', 'plural-', 'pos-', 'pref-', 'prep-', 'pron-study-',
  'quant-', 'regswitch-', 'rs-', 'sbe-', 'sentcomb-', 'stress-', 'tense-',
  'usedto-', 'vchunks-', 'vocab-', 'wf-', 'wordorder-', 'wr-'
];

let removed = 0;
const allKeys = Object.keys(localStorage);
for (const key of allKeys) {
  if (scoreKeyPrefixes.some(prefix => key.startsWith(prefix))) {
    localStorage.removeItem(key);
    removed++;
  }
}

console.log(`✓ HubFlow progress cleared. Removed 2 projections + ${removed} score keys.`);
console.log('Refresh the page (Cmd+Shift+R) to see a clean state.');
