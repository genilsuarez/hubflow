/**
 * Audit: detect categories where the title/options promise multiple topics
 * but the correct answers only cover a subset of the options.
 */
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../../data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.js'));

const issues = [];

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract CATEGORIES object entries with options arrays
  // We look for patterns like: label: '...', options: [...], items: [...]
  const categoryBlocks = content.match(/(\w+)\s*:\s*\{[^}]*label\s*:\s*['"`]([^'"`]+)['"`][^}]*options\s*:\s*\[([^\]]+)\][^]*?items\s*:\s*\[([\s\S]*?)\]\s*\}/g);

  if (!categoryBlocks) continue;

  for (const block of categoryBlocks) {
    // Extract label
    const labelMatch = block.match(/label\s*:\s*['"`]([^'"`]+)['"`]/);
    const optionsMatch = block.match(/options\s*:\s*\[([^\]]+)\]/);
    
    if (!labelMatch || !optionsMatch) continue;

    const label = labelMatch[1];
    const options = optionsMatch[1].match(/['"`]([^'"`]+)['"`]/g)?.map(o => o.replace(/['"`]/g, '')) || [];

    // Extract all correct answers
    const correctMatches = [...block.matchAll(/correct\s*:\s*['"`]([^'"`]+)['"`]/g)];
    const correctAnswers = new Set(correctMatches.map(m => m[1]));

    // Check which options never appear as correct
    const missingOptions = options.filter(opt => !correctAnswers.has(opt));

    if (missingOptions.length > 0) {
      issues.push({
        file,
        label,
        options,
        correctAnswersFound: [...correctAnswers],
        missingFromCorrect: missingOptions,
        totalItems: correctMatches.length
      });
    }
  }
}

if (issues.length === 0) {
  console.log('✅ All categories with multiple options have balanced correct answers.');
} else {
  console.log(`⚠️  Found ${issues.length} imbalanced categories:\n`);
  for (const issue of issues) {
    console.log(`📄 ${issue.file} → "${issue.label}"`);
    console.log(`   Options declared: [${issue.options.join(', ')}]`);
    console.log(`   Correct answers used: [${issue.correctAnswersFound.join(', ')}]`);
    console.log(`   MISSING as correct: [${issue.missingFromCorrect.join(', ')}]`);
    console.log(`   Total items: ${issue.totalItems}`);
    console.log('');
  }
}
