const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../data/phrasal-verbs.js');

const IPA = {
  "boil down to": "/bɔɪl daʊn tuː/",
  "branch out": "/brɑːntʃ aʊt/",
  "brush up on": "/brʌʃ ʌp ɒn/",
  "chip in": "/tʃɪp ɪn/",
  "cut down on": "/kʌt daʊn ɒn/",
  "dish up": "/dɪʃ ʌp/",
  "eat up": "/iːt ʌp/",
  "fill up": "/fɪl ʌp/",
  "hold back": "/hoʊld bæk/",
  "hold off": "/hoʊld ɒf/",
  "iron out": "/ˈaɪərn aʊt/",
  "live on": "/lɪv ɒn/",
  "live up to": "/lɪv ʌp tuː/",
  "own up to": "/oʊn ʌp tuː/",
  "polish off": "/ˈpɒlɪʃ ɒf/",
  "single out": "/ˈsɪŋɡəl aʊt/",
  "stem from": "/stɛm frɒm/",
  "turn against": "/tɜːrn əˈɡɛnst/",
  "turn away": "/tɜːrn əˈweɪ/",
  "turn back": "/tɜːrn bæk/",
  "turn into": "/tɜːrn ˈɪntuː/",
  "turn out": "/tɜːrn aʊt/",
  "turn over": "/tɜːrn ˈoʊvər/",
  "turn to": "/tɜːrn tuː/",
  "warm up": "/wɔːrm ʌp/",
  "weigh up": "/weɪ ʌp/",
  "whip up": "/wɪp ʌp/",
  "wolf down": "/wʊlf daʊn/",
};

let content = fs.readFileSync(filePath, 'utf8');
let added = 0;
for (const [term, ipa] of Object.entries(IPA)) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(\\{ verb: "${escaped}",)(?! ipa:)`, 'g');
  const newContent = content.replace(regex, `$1 ipa: "${ipa}",`);
  if (newContent !== content) { content = newContent; added++; }
}
fs.writeFileSync(filePath, content, 'utf8');

const total = (content.match(/\{ verb:/g) || []).length;
const withIpa = (content.match(/ipa:/g) || []).length;
console.log(`Added: ${added}. Final: ${withIpa}/${total} with IPA`);
