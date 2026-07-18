const fs = require('fs');
const path = require('path');
const dataDir = path.join(__dirname, '../../data');

function addIpa(filePath, termField, ipaMap) {
  let content = fs.readFileSync(filePath, 'utf8');
  let added = 0;
  for (const [term, ipa] of Object.entries(ipaMap)) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match items that DON'T already have ipa
    const regex = new RegExp(`(\\{ ${termField}: "${escaped}",)(?! ipa:)`, 'g');
    const newContent = content.replace(regex, `$1 ipa: "${ipa}",`);
    if (newContent !== content) { content = newContent; added++; }
  }
  fs.writeFileSync(filePath, content, 'utf8');
  return added;
}

// Remaining phrasal verbs
const PV = {
  "stand up": "/stænd ʌp/",
  "run out": "/rʌn aʊt/",
  "hang up": "/hæŋ ʌp/",
  "carry out": "/ˈkæri aʊt/",
  "take on": "/teɪk ɒn/",
  "come up with": "/kʌm ʌp wɪð/",
  "keep up with": "/kiːp ʌp wɪð/",
  "go over": "/ɡoʊ ˈoʊvər/",
  "turn down": "/tɜːrn daʊn/",
  "cheer up": "/tʃɪr ʌp/",
  "hang out": "/hæŋ aʊt/",
  "show off": "/ʃoʊ ɒf/",
  "stop over": "/stɒp ˈoʊvər/",
  "get by": "/ɡɛt baɪ/",
  "get through": "/ɡɛt θruː/",
  "get around": "/ɡɛt əˈraʊnd/",
  "get down to": "/ɡɛt daʊn tuː/",
  "get out of": "/ɡɛt aʊt ɒv/",
  "get across": "/ɡɛt əˈkrɒs/",
  "eat out": "/iːt aʊt/",
  "pick up": "/pɪk ʌp/",
  "take off": "/teɪk ɒf/",
  "make up": "/meɪk ʌp/",
  "look up": "/lʊk ʌp/",
  "figure out": "/ˈfɪɡjər aʊt/",
  "hand in": "/hænd ɪn/",
  "come back": "/kʌm bæk/",
  "bring back": "/brɪŋ bæk/",
  "put away": "/pʊt əˈweɪ/",
  "carry on": "/ˈkæri ɒn/",
  "keep up": "/kiːp ʌp/",
  "run out of": "/rʌn aʊt ɒv/",
  "catch up": "/kætʃ ʌp/",
  "cut off": "/kʌt ɒf/",
  "drop out": "/drɒp aʊt/",
  "get along": "/ɡɛt əˈlɒŋ/",
  "go through": "/ɡoʊ θruː/",
  "hold on": "/hoʊld ɒn/",
  "let down": "/lɛt daʊn/",
  "pull out": "/pʊl aʊt/",
  "sort out": "/sɔːrt aʊt/",
  "take up": "/teɪk ʌp/",
  "turn up": "/tɜːrn ʌp/",
  "wind up": "/waɪnd ʌp/",
  "fall out": "/fɔːl aʊt/",
  "get on": "/ɡɛt ɒn/",
  "get over": "/ɡɛt ˈoʊvər/",
  "go on": "/ɡoʊ ɒn/",
  "grow up": "/ɡroʊ ʌp/",
  "look forward to": "/lʊk ˈfɔːrwərd tuː/",
  "break up": "/breɪk ʌp/",
  "ask out": "/æsk aʊt/",
  "cheat on": "/tʃiːt ɒn/",
  "drift apart": "/drɪft əˈpɑːrt/",
  "put up with": "/pʊt ʌp wɪð/",
  "settle down": "/ˈsɛtəl daʊn/",
  "split up": "/splɪt ʌp/",
  "stand by": "/stænd baɪ/",
  "get together": "/ɡɛt təˈɡɛðər/",
  "open up": "/ˈoʊpən ʌp/",
  "lean on": "/liːn ɒn/",
  "look down on": "/lʊk daʊn ɒn/",
  "bump into": "/bʌmp ˈɪntuː/",
  "check in": "/tʃɛk ɪn/",
  "check out": "/tʃɛk aʊt/",
  "drop off": "/drɒp ɒf/",
  "get back": "/ɡɛt bæk/",
  "get off": "/ɡɛt ɒf/",
  "head off": "/hɛd ɒf/",
  "pull over": "/pʊl ˈoʊvər/",
  "see off": "/siː ɒf/",
  "stop by": "/stɒp baɪ/",
  "turn around": "/tɜːrn əˈraʊnd/",
  "speed up": "/spiːd ʌp/",
  "slow down": "/sloʊ daʊn/",
  "end up": "/ɛnd ʌp/",
  "run into": "/rʌn ˈɪntuː/",
  "get away": "/ɡɛt əˈweɪ/",
  "move on": "/muːv ɒn/",
  "pass by": "/pæs baɪ/",
  "back up": "/bæk ʌp/",
  "come across": "/kʌm əˈkrɒs/",
  "cut down": "/kʌt daʊn/",
  "fill in": "/fɪl ɪn/",
  "give back": "/ɡɪv bæk/",
  "hand over": "/hænd ˈoʊvər/",
  "kick off": "/kɪk ɒf/",
  "lay off": "/leɪ ɒf/",
  "pass on": "/pæs ɒn/",
  "point out": "/pɔɪnt aʊt/",
  "rule out": "/ruːl aʊt/",
  "shut down": "/ʃʌt daʊn/",
  "stand out": "/stænd aʊt/",
  "step down": "/stɛp daʊn/",
  "think over": "/θɪŋk ˈoʊvər/",
  "try on": "/traɪ ɒn/",
  "use up": "/juːz ʌp/",
  "wear out": "/wɛr aʊt/",
  "write down": "/raɪt daʊn/",
  "zoom in": "/zuːm ɪn/",
  "opt out": "/ɒpt aʊt/",
  "pay off": "/peɪ ɒf/",
  "come in": "/kʌm ɪn/",
};

// Remaining irregular verbs
const IV = {
  "eat": "/iːt/",
  "drink": "/drɪŋk/",
  "buy": "/baɪ/",
  "cut": "/kʌt/",
  "learn": "/lɜːrn/",
  "shine": "/ʃaɪn/",
  "cast": "/kæst/",
  "dwell": "/dwɛl/",
  "forsake": "/fɔːrˈseɪk/",
};

// Remaining verb chunks
const VC = {
  "agree": "/əˈɡriː/",
  "pay": "/peɪ/",
  "apologize": "/əˈpɒlədʒaɪz/",
  "laugh": "/lɑːf/",
  "suffer": "/ˈsʌfər/",
  "spend": "/spɛnd/",
  "worry": "/ˈwʌri/",
  "apologise": "/əˈpɒlədʒaɪz/",
  "apply": "/əˈplaɪ/",
  "succeed": "/səkˈsiːd/",
  "participate": "/pɑːrˈtɪsɪpeɪt/",
  "refer": "/rɪˈfɜːr/",
  "cope": "/koʊp/",
  "result": "/rɪˈzʌlt/",
};

console.log('Phrasal:', addIpa(path.join(dataDir, 'phrasal-verbs.js'), 'verb', PV));
console.log('Irregular:', addIpa(path.join(dataDir, 'irregular-verbs.js'), 'base', IV));
console.log('Chunks:', addIpa(path.join(dataDir, 'verb-chunks.js'), 'verb', VC));

// Final report
const files = ['phrasal-verbs.js', 'irregular-verbs.js', 'verb-chunks.js'];
const fields = ['verb', 'base', 'verb'];
files.forEach((f, i) => {
  const c = fs.readFileSync(path.join(dataDir, f), 'utf8');
  const total = (c.match(new RegExp(`\\{ ${fields[i]}:`, 'g')) || []).length;
  const withIpa = (c.match(/ipa:/g) || []).length;
  console.log(`${f}: ${withIpa}/${total} with IPA`);
});
