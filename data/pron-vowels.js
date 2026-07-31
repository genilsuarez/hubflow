export const CATEGORIES = {
  vowelSounds: {
    label: "🔊 12 English Vowels",
    items: [
      { term: "/iː/ — fleece", es: "Vocal larga cerrada", meaning: "Long, tense — tongue high and front, lips spread", emoji: "🐑", example: "see, tea, machine, believe" },
      { term: "/ɪ/ — kit", es: "Vocal corta cerrada", meaning: "Short, relaxed — slightly lower than /iː/", emoji: "🧰", example: "sit, gym, busy, women" },
      { term: "/e/ — dress", es: "Vocal media", meaning: "Mid-front — jaw slightly open", emoji: "👗", example: "bed, head, said, friend" },
      { term: "/æ/ — trap", es: "Vocal abierta frontal", meaning: "Low-front — jaw drops more than /e/", emoji: "🪤", example: "cat, bad, laugh, have" },
      { term: "/ɑː/ — palm", es: "Vocal larga abierta", meaning: "Long, open — back of tongue, jaw fully open", emoji: "🌴", example: "car, father, heart, calm" },
      { term: "/ɒ/ — lot", es: "Vocal corta redondeada", meaning: "Short — back of tongue, lips slightly rounded", emoji: "🎰", example: "hot, dog, what, because" },
      { term: "/ɔː/ — thought", es: "Vocal larga redondeada", meaning: "Long — back, lips well rounded", emoji: "💭", example: "law, door, more, talk" },
      { term: "/ʊ/ — foot", es: "Vocal corta posterior", meaning: "Short — tongue back and high, lips slightly rounded", emoji: "🦶", example: "put, book, could, woman" },
      { term: "/uː/ — goose", es: "Vocal larga posterior", meaning: "Long — tongue high and back, lips very rounded", emoji: "🪿", example: "food, blue, shoe, through" },
      { term: "/ʌ/ — strut", es: "Vocal central corta", meaning: "Short — central, relaxed jaw", emoji: "🏗️", example: "cup, love, blood, enough" },
      { term: "/ɜː/ — nurse", es: "Vocal central larga", meaning: "Long — central, lips neutral (not rounded)", emoji: "👩‍⚕️", example: "bird, word, learn, journey" },
      { term: "/ə/ — schwa", es: "Vocal neutra (átona)", meaning: "The most common English sound — weak, unstressed", emoji: "😐", example: "about, banana, problem, doctor" },
    ]
  },
  schwa: {
    label: "😐 The Schwa /ə/",
    items: [
      { term: "About", es: "/əˈbaʊt/", meaning: "The 'a' is a schwa — not 'ah' but a quick /ə/", emoji: "📖", example: "a-BOUT: the 'a' is barely there." },
      { term: "Banana", es: "/bəˈnɑːnə/", meaning: "TWO schwas — first 'a' and last 'a'", emoji: "🍌", example: "buh-NAH-nuh: only the middle vowel is full." },
      { term: "Doctor", es: "/ˈdɒktə/", meaning: "The 'or' becomes schwa — 'DOK-tuh'", emoji: "👨‍⚕️", example: "Not 'dock-TOR' — it's 'DOK-tuh'." },
      { term: "Family", es: "/ˈfæmli/", meaning: "The 'i' disappears — 'FAM-lee'", emoji: "👪", example: "2 syllables in natural speech, not 3." },
      { term: "Chocolate", es: "/ˈtʃɒklət/", meaning: "2 syllables — 'CHOK-lit', the 'o' vanishes", emoji: "🍫", example: "Not 'cho-co-LATE' — just 'CHOK-lit'." },
      { term: "Interesting", es: "/ˈɪntrəstɪŋ/", meaning: "3 syllables — 'IN-truh-sting'", emoji: "🤔", example: "Not 'in-ter-ES-ting' — the 'e' is schwa." },
      { term: "Camera", es: "/ˈkæmrə/", meaning: "2 syllables — 'CAM-ruh'", emoji: "📸", example: "Not 'ca-me-ra' — just 'CAM-ruh'." },
      { term: "Secretary", es: "/ˈsekrətri/", meaning: "3 syllables — 'SEK-ruh-tree'", emoji: "📝", example: "Not 'sec-re-ta-ry' — collapsed." },
      { term: "Comfortable", es: "/ˈkʌmftəbl/", meaning: "3 syllables in natural speech — 'KUMF-tuh-bl', not 4", emoji: "🛋️", example: "Not 'com-for-ta-ble' — collapsed to 3." },
      { term: "Different", es: "/ˈdɪfrənt/", meaning: "2 syllables — 'DIF-rənt', the middle 'e' vanishes", emoji: "🔀", example: "Not 'dif-fer-ent' — just 'DIF-rənt'." },
      { term: "Vegetable", es: "/ˈvedʒtəbl/", meaning: "3 syllables — 'VEJ-tuh-bl', the middle 'e' disappears", emoji: "🥦", example: "Not 've-ge-ta-ble' — collapsed." },
      { term: "Especially", es: "/ɪˈspeʃli/", meaning: "3 syllables — 'i-SPESH-lee', not 4", emoji: "⭐", example: "Not 'es-pe-cial-ly' — collapsed." },
      { term: "Support", es: "/səˈpɔːt/", meaning: "The first syllable is a schwa — 'suh-PORT'", emoji: "🤝", example: "Not 'SUP-port' — stress falls on the second syllable." },
    ]
  },
  confusedVowelPairs: {
    label: "🔄 Confused Vowel Pairs",
    items: [
      { term: "/iː/ vs /ɪ/ — sheep vs ship", es: "larga vs corta", meaning: "/iː/ is tense and long; /ɪ/ is short and relaxed", emoji: "🐑", example: "sheep /ʃiːp/ vs ship /ʃɪp/ — a different vowel, not just length." },
      { term: "/e/ vs /æ/ — bed vs bad", es: "media vs abierta", meaning: "/e/ is mid-front; /æ/ is lower with more jaw drop", emoji: "🛏️", example: "bed /bed/ vs bad /bæd/ — don't merge them." },
      { term: "/ɑː/ vs /ʌ/ — heart vs hut", es: "larga abierta vs central", meaning: "/ɑː/ is long and back; /ʌ/ is short and central", emoji: "❤️", example: "heart /hɑːt/ vs hut /hʌt/." },
      { term: "/ɒ/ vs /ɔː/ — hot vs hoot", es: "corta vs larga redondeada", meaning: "/ɒ/ is short; /ɔː/ is long with strong lip rounding", emoji: "🔥", example: "pot /pɒt/ vs port /pɔːt/." },
      { term: "/ʊ/ vs /uː/ — foot vs food", es: "corta posterior vs larga", meaning: "/ʊ/ is short and relaxed; /uː/ is long and tense", emoji: "🦶", example: "foot /fʊt/ vs food /fuːd/." },
      { term: "/e/ vs /eɪ/ — ten vs ten", es: "monoptongo vs diptongo", meaning: "/e/ is a single position; /eɪ/ glides upward", emoji: "✋", example: "pen /pen/ vs pain /peɪn/ — watch the glide." },
      { term: "/ɜː/ vs /ɔː/ — bird vs board", es: "central larga vs posterior", meaning: "/ɜː/ is central, lips neutral; /ɔː/ is back with rounded lips", emoji: "🐦", example: "bird /bɜːd/ vs board /bɔːd/." },
      { term: "/ə/ vs /ʌ/ — about vs bun", es: "átona vs tónica", meaning: "/ə/ only appears unstressed; /ʌ/ can be stressed", emoji: "😐", example: "The 'a' in 'about' is /ə/; the 'u' in 'bun' is /ʌ/." },
      { term: "/æ/ vs /ɑː/ — cat vs cart", es: "abierta frontal vs abierta posterior", meaning: "Key distinction in RP: /æ/ is front, /ɑː/ is back and long", emoji: "🐱", example: "cat /kæt/ vs cart /kɑːt/ — length AND position differ." },
      { term: "/ɪ/ vs /e/ — bit vs bet", es: "cerrada corta vs media", meaning: "/ɪ/ is higher and shorter; /e/ has more jaw drop", emoji: "🎰", example: "bit /bɪt/ vs bet /bet/ — Spanish speakers often merge these." },
      { term: "/ɒ/ vs /ʌ/ — not vs nut", es: "corta redondeada vs central", meaning: "/ɒ/ has rounded lips and a back tongue; /ʌ/ is central and unrounded", emoji: "🚫", example: "not /nɒt/ vs nut /nʌt/." },
      { term: "/ɜː/ vs /ʌ/ — shirt vs shut", es: "central larga vs central corta", meaning: "/ɜː/ is long with neutral lips; /ʌ/ is short and more open", emoji: "👕", example: "shirt /ʃɜːt/ vs shut /ʃʌt/." },
      { term: "/ɑː/ vs /ɒ/ — heart vs hot", es: "larga abierta vs corta redondeada", meaning: "/ɑː/ is long with an open jaw; /ɒ/ is short with rounded lips", emoji: "❤️", example: "heart /hɑːt/ vs hot /hɒt/." },
      { term: "/iː/ vs /e/ — seat vs set", es: "cerrada larga vs media", meaning: "/iː/ is tense, high and long; /e/ is mid and short", emoji: "💺", example: "seat /siːt/ vs set /set/." },
      { term: "/ɔː/ vs /ɑː/ — court vs cart", es: "posterior redondeada vs abierta", meaning: "/ɔː/ has rounded lips; /ɑː/ has an open, unrounded jaw", emoji: "🎾", example: "court /kɔːt/ vs cart /kɑːt/." },
    ]
  },
};
