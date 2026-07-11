/**
 * Deep Audit of all HubFlow data modules
 * Checks:
 * 1. Option balance — all declared options appear as correct at least once
 * 2. Structural integrity — all items have required fields
 * 3. Correct answers match one of the declared options (where applicable)
 * 4. Duplicate sentences within a category
 * 5. Empty/missing fields
 */
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../../data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.js'));

const results = {
  balanceIssues: [],
  structuralIssues: [],
  correctNotInOptions: [],
  duplicates: [],
  emptyFields: [],
  stats: {}
};

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Try to extract CATEGORIES
  if (!content.includes('CATEGORIES')) continue;

  // Use a sandboxed eval approach to parse the module
  let categories;
  try {
    // Replace export with assignment for eval
    const evalContent = content
      .replace(/export\s+const\s+CATEGORIES\s*=/, 'var CATEGORIES =')
      .replace(/export\s+default\s+CATEGORIES;?/, '')
      .replace(/export\s*\{[^}]*\};?/, '');
    
    const fn = new Function(evalContent + '; return CATEGORIES;');
    categories = fn();
  } catch (e) {
    results.structuralIssues.push({ file, error: `Parse error: ${e.message}` });
    continue;
  }

  if (!categories || typeof categories !== 'object') continue;

  let totalItems = 0;
  const catKeys = Object.keys(categories);

  for (const key of catKeys) {
    const cat = categories[key];
    if (!cat || !cat.items || !Array.isArray(cat.items)) {
      results.structuralIssues.push({ file, category: key, error: 'Missing or non-array items' });
      continue;
    }

    const label = cat.label || key;
    const options = cat.options || [];
    totalItems += cat.items.length;

    // Check option balance (only for categories that use shared options pattern)
    // Determine if items have their own per-item options
    const hasPerItemOptions = cat.items.some(item => item.options && Array.isArray(item.options));
    
    if (options.length > 0 && !hasPerItemOptions) {
      const correctAnswers = new Set(cat.items.map(item => item.correct));
      const missingOptions = options.filter(opt => !correctAnswers.has(opt));
      
      if (missingOptions.length > 0) {
        results.balanceIssues.push({
          file, label, options, 
          correctUsed: [...correctAnswers],
          missing: missingOptions,
          itemCount: cat.items.length
        });
      }

      // Check if any correct answer is NOT in options
      for (const item of cat.items) {
        if (item.correct && !options.includes(item.correct)) {
          results.correctNotInOptions.push({
            file, label, 
            sentence: item.sentence || item.text,
            correct: item.correct,
            options
          });
        }
      }
    }

    // Structural checks per item
    const sentences = [];
    for (let i = 0; i < cat.items.length; i++) {
      const item = cat.items[i];
      
      // Check required fields based on module type
      const hasSentence = item.sentence || item.text || item.front;
      if (!hasSentence) {
        results.emptyFields.push({ file, label, index: i, field: 'sentence/text/front' });
      }

      // Check for correct answer
      if (!item.correct && !item.blank && !item.back) {
        // Some modules (like listening) use 'blank' instead of 'correct'
        if (!item.words && !item.term) {
          results.emptyFields.push({ file, label, index: i, field: 'correct/blank/back' });
        }
      }

      // Check for empty strings
      for (const [field, value] of Object.entries(item)) {
        if (typeof value === 'string' && value.trim() === '') {
          results.emptyFields.push({ file, label, index: i, field: `${field} (empty string)` });
        }
      }

      // Check duplicates
      const sentenceKey = (item.sentence || item.text || item.front || '').trim().toLowerCase();
      if (sentenceKey && sentences.includes(sentenceKey)) {
        results.duplicates.push({ file, label, sentence: sentenceKey });
      }
      sentences.push(sentenceKey);
    }
  }

  results.stats[file] = { categories: catKeys.length, totalItems };
}

// Print report
console.log('═══════════════════════════════════════════════════════');
console.log('  HUBFLOW DEEP AUDIT REPORT');
console.log('═══════════════════════════════════════════════════════\n');

console.log('📊 MODULE STATS:');
console.log('─────────────────────────────────────────────────────');
let grandTotal = 0;
for (const [file, stat] of Object.entries(results.stats)) {
  console.log(`  ${file.padEnd(30)} ${stat.categories} cats, ${stat.totalItems} items`);
  grandTotal += stat.totalItems;
}
console.log(`  ${'TOTAL'.padEnd(30)} ${grandTotal} items`);

console.log('\n\n⚖️  BALANCE ISSUES (option never used as correct):');
console.log('─────────────────────────────────────────────────────');
if (results.balanceIssues.length === 0) {
  console.log('  ✅ All balanced');
} else {
  for (const issue of results.balanceIssues) {
    console.log(`  ⚠️  ${issue.file} → "${issue.label}"`);
    console.log(`     Missing: [${issue.missing.join(', ')}] (${issue.itemCount} items)`);
  }
}

console.log('\n\n❌ CORRECT ANSWER NOT IN OPTIONS:');
console.log('─────────────────────────────────────────────────────');
if (results.correctNotInOptions.length === 0) {
  console.log('  ✅ All correct answers match declared options');
} else {
  for (const issue of results.correctNotInOptions) {
    console.log(`  ⚠️  ${issue.file} → "${issue.label}"`);
    console.log(`     Sentence: "${issue.sentence}"`);
    console.log(`     Correct: "${issue.correct}" NOT IN [${issue.options.join(', ')}]`);
  }
}

console.log('\n\n🔁 DUPLICATES:');
console.log('─────────────────────────────────────────────────────');
if (results.duplicates.length === 0) {
  console.log('  ✅ No duplicates found');
} else {
  for (const dup of results.duplicates) {
    console.log(`  ⚠️  ${dup.file} → "${dup.label}": "${dup.sentence.substring(0, 60)}..."`);
  }
}

console.log('\n\n📋 EMPTY/MISSING FIELDS:');
console.log('─────────────────────────────────────────────────────');
if (results.emptyFields.length === 0) {
  console.log('  ✅ All fields present');
} else {
  for (const ef of results.emptyFields) {
    console.log(`  ⚠️  ${ef.file} → "${ef.label}" item[${ef.index}]: missing "${ef.field}"`);
  }
}

console.log('\n\n🔧 STRUCTURAL/PARSE ISSUES:');
console.log('─────────────────────────────────────────────────────');
if (results.structuralIssues.length === 0) {
  console.log('  ✅ All files parsed correctly');
} else {
  for (const si of results.structuralIssues) {
    console.log(`  ⚠️  ${si.file}: ${si.error}`);
  }
}

console.log('\n═══════════════════════════════════════════════════════');
