import { MODULES } from '../../data/catalog.js';
import { readFileSync } from 'fs';

const grammarModules = MODULES.filter(m => m.category === 'grammar');
let total = 0;

for (const mod of grammarModules) {
  const file = mod.dataFile;
  const content = readFileSync(file, 'utf-8');
  // Count items by counting occurrences of common item patterns
  // Most files have { sentence: or { base: or items arrays
  const sentenceMatches = (content.match(/\{\s*sentence\s*:/g) || []).length;
  const baseMatches = (content.match(/\{\s*base\s*:/g) || []).length;
  const wordMatches = (content.match(/\{\s*word\s*:/g) || []).length;
  const items = Math.max(sentenceMatches, baseMatches, wordMatches);
  total += items;
  console.log(`${mod.id.padEnd(24)} ${items}`);
}
console.log('─'.repeat(36));
console.log('REAL TOTAL Grammar:', total);
console.log('Target 1000, need:', 1000 - total);
