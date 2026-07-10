const fs = require('fs');
const path = require('path');

const exercisesDir = path.join(__dirname, '..', '..', 'exercises');
const files = fs.readdirSync(exercisesDir)
  .filter(function(f) { return f.endsWith('.html'); })
  .map(function(f) { return path.join(exercisesDir, f); });

let modified = 0;

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  let content = fs.readFileSync(file, 'utf-8');
  const basename = path.basename(file);

  if (content.indexOf('timedSeconds') === -1) continue;

  // Add timedSeconds = 0 inside stopTimer function
  // Pattern: function stopTimer() { if (timer) { timer.stop(); timer = null; } }
  var oldStop = 'function stopTimer() { if (timer) { timer.stop(); timer = null; } }';
  var newStop = 'function stopTimer() { if (timer) { timer.stop(); timer = null; } timedSeconds = 0; }';

  if (content.indexOf(oldStop) !== -1 && content.indexOf('timedSeconds = 0; }') === -1) {
    content = content.replace(oldStop, newStop);
    fs.writeFileSync(file, content, 'utf-8');
    modified++;
    console.log('OK ' + basename);
  }
}

console.log('Modified: ' + modified);
