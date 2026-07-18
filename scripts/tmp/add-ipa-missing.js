const fs = require('fs');
const path = require('path');

// Find all items without ipa field and add them
function addMissingIpa(filePath, termField, ipaMap) {
  let content = fs.readFileSync(filePath, 'utf8');
  let added = 0;

  for (const [term, ipa] of Object.entries(ipaMap)) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match items that have the term but NOT already ipa
    const regex = new RegExp(`(\\{ ${termField}: "${escaped}",)(?! ipa:)`, 'g');
    const replacement = `$1 ipa: "${ipa}",`;
    const newContent = content.replace(regex, replacement);
    if (newContent !== content) {
      content = newContent;
      added++;
    }
  }
  fs.writeFileSync(filePath, content, 'utf8');
  return added;
}

const dataDir = path.join(__dirname, '../../data');

// Missing phrasal verbs
const PHRASAL_MISSING = {
  "look for": "/lʊk fɔːr/",
  "look around": "/lʊk əˈraʊnd/",
  "come in": "/kʌm ɪn/",
  "bring back": "/brɪŋ bæk/",
  "put away": "/pʊt əˈweɪ/",
  "carry on": "/ˈkæri ɒn/",
  "keep up": "/kiːp ʌp/",
  "run out of": "/rʌn aʊt ɒv/",
  "take over": "/teɪk ˈoʊvər/",
  "break down": "/breɪk daʊn/",
  "catch up": "/kætʃ ʌp/",
  "cut off": "/kʌt ɒf/",
  "drop out": "/drɒp aʊt/",
  "get along": "/ɡɛt əˈlɒŋ/",
  "go through": "/ɡoʊ θruː/",
  "hold on": "/hoʊld ɒn/",
  "let down": "/lɛt daʊn/",
  "make up": "/meɪk ʌp/",
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
};

// Missing irregular verbs
const IRREGULAR_MISSING = {
  "spend": "/spɛnd/",
  "deal": "/diːl/",
  "feed": "/fiːd/",
  "hurt": "/hɜːrt/",
  "light": "/laɪt/",
  "ride": "/raɪd/",
  "shoot": "/ʃuːt/",
  "sing": "/sɪŋ/",
  "steal": "/stiːl/",
  "swim": "/swɪm/",
  "teach": "/tiːtʃ/",
  "throw": "/θroʊ/",
  "wake": "/weɪk/",
  "wear": "/wɛr/",
  "win": "/wɪn/",
  "arise": "/əˈraɪz/",
  "bear": "/bɛr/",
  "bind": "/baɪnd/",
  "bite": "/baɪt/",
  "bleed": "/bliːd/",
  "blow": "/bloʊ/",
  "breed": "/briːd/",
  "burst": "/bɜːrst/",
  "cling": "/klɪŋ/",
  "creep": "/kriːp/",
  "dig": "/dɪɡ/",
  "flee": "/fliː/",
  "forbid": "/fərˈbɪd/",
  "freeze": "/friːz/",
  "grind": "/ɡraɪnd/",
  "kneel": "/niːl/",
  "lay": "/leɪ/",
  "leap": "/liːp/",
  "overcome": "/ˌoʊvərˈkʌm/",
  "seek": "/siːk/",
  "shrink": "/ʃrɪŋk/",
  "sow": "/soʊ/",
  "spin": "/spɪn/",
  "spring": "/sprɪŋ/",
  "sting": "/stɪŋ/",
  "stride": "/straɪd/",
  "strive": "/straɪv/",
  "swear": "/swɛr/",
  "sweep": "/swiːp/",
  "swing": "/swɪŋ/",
  "tear": "/tɛr/",
  "tread": "/trɛd/",
  "undergo": "/ˌʌndərˈɡoʊ/",
  "weave": "/wiːv/",
  "withdraw": "/wɪðˈdrɔː/",
  "withstand": "/wɪðˈstænd/",
  "wring": "/rɪŋ/",
};

// Missing verb chunks
const CHUNK_MISSING = {
  "worry": "/ˈwʌri/",
  "apologise": "/əˈpɒlədʒaɪz/",
  "apply": "/əˈplaɪ/",
  "succeed": "/səkˈsiːd/",
  "participate": "/pɑːrˈtɪsɪpeɪt/",
  "refer": "/rɪˈfɜːr/",
  "cope": "/koʊp/",
  "result": "/rɪˈzʌlt/",
};

console.log('--- Phrasal Verbs (missing) ---');
let n = addMissingIpa(path.join(dataDir, 'phrasal-verbs.js'), 'verb', PHRASAL_MISSING);
console.log(`Added: ${n}`);

console.log('--- Irregular Verbs (missing) ---');
n = addMissingIpa(path.join(dataDir, 'irregular-verbs.js'), 'base', IRREGULAR_MISSING);
console.log(`Added: ${n}`);

console.log('--- Verb Chunks (missing) ---');
n = addMissingIpa(path.join(dataDir, 'verb-chunks.js'), 'verb', CHUNK_MISSING);
console.log(`Added: ${n}`);

// Final count
const pvContent = fs.readFileSync(path.join(dataDir, 'phrasal-verbs.js'), 'utf8');
const ivContent = fs.readFileSync(path.join(dataDir, 'irregular-verbs.js'), 'utf8');
const vcContent = fs.readFileSync(path.join(dataDir, 'verb-chunks.js'), 'utf8');
console.log('\n--- TOTALS ---');
console.log(`Phrasal verbs with ipa: ${(pvContent.match(/ipa:/g) || []).length} / ${(pvContent.match(/{ verb:/g) || []).length}`);
console.log(`Irregular verbs with ipa: ${(ivContent.match(/ipa:/g) || []).length} / ${(ivContent.match(/{ base:/g) || []).length}`);
console.log(`Verb chunks with ipa: ${(vcContent.match(/ipa:/g) || []).length} / ${(vcContent.match(/{ verb:/g) || []).length}`);
