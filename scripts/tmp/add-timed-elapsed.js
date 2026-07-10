const fs = require('fs');
const path = require('path');

const exercisesDir = path.join(__dirname, '..', '..', 'exercises');
const files = fs.readdirSync(exercisesDir)
  .filter(function(f) { return f.endsWith('.html') && f !== 'phrasal-verbs.html'; })
  .map(function(f) { return path.join(exercisesDir, f); });

let modified = 0;
let skipped = [];

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  let content = fs.readFileSync(file, 'utf-8');
  const basename = path.basename(file);

  if (content.indexOf('let timer = null') === -1 || content.indexOf('showResult') === -1) {
    skipped.push(basename + ' (no timer/showResult)');
    continue;
  }

  if (content.indexOf('timedSeconds') !== -1) {
    skipped.push(basename + ' (already done)');
    continue;
  }

  let changed = false;

  // 1. Add timedSeconds after let timer = null;
  content = content.replace('let timer = null;', 'let timer = null;\nlet timedSeconds = 0;');
  changed = true;

  // 2. Capture timedSeconds before timer creation
  // Match: timer = new Timer(EXPR,
  content = content.replace(
    /(\s+)(timer = new Timer\()([^,]+),/,
    function(m, indent, prefix, expr) {
      return indent + 'timedSeconds = ' + expr.trim() + ';\n' + indent + prefix + 'timedSeconds,';
    }
  );

  // 3. In finish functions, add elapsed calc and pass to showResult
  // Find: function finishXxx() { ... showResult({...}) ... }
  // We need a different approach since the regex is complex
  
  // First: remove stopTimer() that appears right before a finish call
  content = content.replace(/stopTimer\(\); (finish\w+\(\))/g, '$1');
  content = content.replace(/\{ stopTimer\(\); (finish\w+\(\);) return;/g, '{ $1 return;');

  // Now find the finish function and inject elapsed logic
  // Pattern: function finishXXX() {\n  ...stopTimer()...\n  ...showResult({...\n  });\n  ...}
  var finishMatch = content.match(/function (finish\w+)\(\) \{/);
  if (finishMatch) {
    var fnStart = content.indexOf(finishMatch[0]);
    var fnName = finishMatch[1];
    
    // Insert elapsed calc right after opening brace
    var insertPos = fnStart + finishMatch[0].length;
    var elapsedCode = '\n  const elapsed = timedSeconds ? timedSeconds - (timer && timer.remaining != null ? timer.remaining : 0) : null;\n  stopTimer();';
    content = content.slice(0, insertPos) + elapsedCode + content.slice(insertPos);
    
    // Remove any existing standalone stopTimer() inside the finish function (avoid duplicate)
    // Find the function body end
    var afterInsert = content.indexOf(finishMatch[0]);
    var bodyStart = afterInsert + finishMatch[0].length;
    var braceCount = 1;
    var pos = bodyStart;
    while (braceCount > 0 && pos < content.length) {
      if (content[pos] === '{') braceCount++;
      if (content[pos] === '}') braceCount--;
      pos++;
    }
    var fnBody = content.slice(bodyStart, pos - 1);
    
    // Remove duplicate stopTimer (not the one we just added)
    var lines = fnBody.split('\n');
    var newLines = [];
    var foundOurStopTimer = false;
    for (var li = 0; li < lines.length; li++) {
      var line = lines[li];
      if (line.trim() === 'stopTimer();') {
        if (!foundOurStopTimer) {
          foundOurStopTimer = true;
          newLines.push(line);
        }
        // skip duplicate
      } else {
        newLines.push(line);
      }
    }
    content = content.slice(0, bodyStart) + newLines.join('\n') + content.slice(pos - 1);
    
    // Add elapsedSeconds to showResult call inside this function
    // Find showResult({ inside the function
    var showResultIdx = content.indexOf('showResult({', bodyStart);
    if (showResultIdx !== -1 && showResultIdx < bodyStart + fnBody.length + 200) {
      // Find the closing })
      var searchFrom = showResultIdx + 'showResult({'.length;
      var depth = 1;
      var endIdx = searchFrom;
      while (depth > 0 && endIdx < content.length) {
        if (content[endIdx] === '{') depth++;
        if (content[endIdx] === '}') depth--;
        endIdx++;
      }
      // endIdx is right after the closing }
      // Insert elapsedSeconds before the closing }
      var innerContent = content.slice(searchFrom, endIdx - 1);
      var trimmedInner = innerContent.trimEnd();
      var needsComma = trimmedInner.endsWith(',') ? '' : ',';
      var newInner = innerContent.trimEnd() + needsComma + '\n    elapsedSeconds: elapsed\n  ';
      content = content.slice(0, searchFrom) + newInner + content.slice(endIdx - 1);
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf-8');
    modified++;
    console.log('OK ' + basename);
  }
}

console.log('\nModified: ' + modified);
if (skipped.length > 0) {
  console.log('Skipped: ' + skipped.length);
  skipped.forEach(function(s) { console.log('  - ' + s); });
}
