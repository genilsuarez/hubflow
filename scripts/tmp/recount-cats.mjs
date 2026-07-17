import { MODULES, MODULE_DEPTH } from '../../data/catalog.js';

console.log('=== PRONUNCIATION (target 400) ===');
const pronModules = MODULES.filter(m => m.category === 'pronunciation');
pronModules.sort((a, b) => (MODULE_DEPTH[a.id]?.items || 0) - (MODULE_DEPTH[b.id]?.items || 0));
let pronTotal = 0;
pronModules.forEach(m => {
  const items = MODULE_DEPTH[m.id]?.items || 0;
  pronTotal += items;
  console.log(`  ${m.id.padEnd(28)} ${items}`);
});
console.log(`  TOTAL: ${pronTotal} | need +${400 - pronTotal}`);

console.log('\n=== VOCABULARY (target 1600) ===');
const vocabModules = MODULES.filter(m => m.category === 'vocab');
vocabModules.sort((a, b) => (MODULE_DEPTH[b.id]?.items || 0) - (MODULE_DEPTH[a.id]?.items || 0));
let vocabTotal = 0;
vocabModules.forEach(m => {
  const items = MODULE_DEPTH[m.id]?.items || 0;
  vocabTotal += items;
  console.log(`  ${m.id.padEnd(28)} ${items}`);
});
console.log(`  TOTAL: ${vocabTotal} | need -${vocabTotal - 1600}`);
