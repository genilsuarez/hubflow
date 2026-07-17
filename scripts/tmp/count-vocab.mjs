import { CATEGORIES } from '../../data/vocabulary.js';

const cats = Object.entries(CATEGORIES);
let total = 0;
const plan = [];

cats.forEach(([key, cat]) => {
  const current = cat.items.length;
  total += current;
  const target = Math.max(current, 24);
  const needed = target - current;
  if (needed > 0) plan.push({ key, label: cat.label, current, target, needed });
});

console.log(`Current total: ${total}`);
console.log(`Target: 1600`);
console.log(`Need: ${1600 - total} more items\n`);
console.log('Plan (grow to 24 per category):');
let willAdd = 0;
plan.sort((a, b) => b.needed - a.needed);
plan.forEach(p => {
  console.log(`  ${p.key.padEnd(26)} ${p.current} → ${p.target} (+${p.needed})`);
  willAdd += p.needed;
});
console.log(`\nTotal to add: ${willAdd}`);
console.log(`Result: ${total + willAdd}`);
