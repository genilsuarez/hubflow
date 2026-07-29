export const CATEGORIES = {
  consonantClusters: {
    label: "🔤 Consonant Clusters",
    items: [
      { term: "/str/ — street", es: "Grupo consonántico inicial", meaning: "3 consonants before a vowel — tongue stays up", emoji: "🛣️", example: "street, strong, strange, struggle" },
      { term: "/spr/ — spring", es: "Grupo consonántico inicial", meaning: "Lips go from /s/ position to rounded /r/", emoji: "🌸", example: "spring, spray, spread, sprout" },
      { term: "/θr/ — three", es: "Grupo difícil", meaning: "Tongue between teeth → retroflex /r/ quickly", emoji: "3️⃣", example: "three, throw, through, threat" },
      { term: "/sts/ — costs", es: "Grupo consonántico final", meaning: "3 consonants at the end — don't add a vowel", emoji: "💰", example: "costs, lists, tests, guests" },
      { term: "/lz/ — calls", es: "Grupo final sonoro", meaning: "Voice the /z/ — don't devoice to /s/", emoji: "📞", example: "calls, walls, tells, falls" },
      { term: "/ŋk/ — think", es: "Nasal velar + plosiva", meaning: "The 'n' is actually /ŋ/ (back of tongue on soft palate)", emoji: "🧠", example: "think, bank, drink, thank" },
      { term: "/spl/ — split", es: "Grupo consonántico inicial", meaning: "Move quickly from /s/ to plosive /p/ to /l/", emoji: "✂️", example: "split, splash, splendid, explain" },
      { term: "/fl/ — fly", es: "Grupo inicial suave", meaning: "Upper teeth on lip for /f/ then lateral /l/", emoji: "🪰", example: "fly, floor, flower, flat" },
      { term: "/dr/ — drink", es: "Grupo africado", meaning: "Often sounds like /dʒr/ — 'jrink'", emoji: "🥤", example: "drink, dream, drive, drop" },
      { term: "/tr/ — tree", es: "Grupo africado", meaning: "Often sounds like /tʃr/ — 'chree'", emoji: "🌳", example: "tree, train, try, trouble" },
    ]
  },
  edPronunciation: {
    label: "📢 -ED Pronunciation",
    items: [
      { term: "/t/ after voiceless", es: "Terminación sorda", meaning: "After /p, k, f, s, ʃ, tʃ/ → -ed sounds like /t/", emoji: "🤫", example: "walked /wɔːkt/, helped /helpt/, washed /wɒʃt/" },
      { term: "/d/ after voiced", es: "Terminación sonora", meaning: "After vowels and voiced consonants → -ed sounds /d/", emoji: "🔊", example: "played /pleɪd/, called /kɔːld/, lived /lɪvd/" },
      { term: "/ɪd/ after t/d", es: "Sílaba extra", meaning: "After /t/ or /d/ → adds a syllable: /ɪd/", emoji: "➕", example: "wanted /wɒntɪd/, needed /niːdɪd/, started /stɑːtɪd/" },
      { term: "Stopped", es: "/stɒpt/", meaning: "Voiceless /p/ → /t/ ending, NOT 'stop-ped'", emoji: "🛑", example: "1 syllable: /stɒpt/" },
      { term: "Loved", es: "/lʌvd/", meaning: "Voiced /v/ → /d/ ending, NOT 'lov-ed'", emoji: "❤️", example: "1 syllable: /lʌvd/" },
      { term: "Decided", es: "/dɪˈsaɪdɪd/", meaning: "Ends in /d/ → adds /ɪd/ extra syllable", emoji: "🤔", example: "3 syllables: de-CI-did" },
      { term: "Cooked", es: "/kʊkt/", meaning: "Voiceless /k/ → /t/ ending", emoji: "👨‍🍳", example: "1 syllable: /kʊkt/" },
      { term: "Opened", es: "/ˈəʊpənd/", meaning: "Voiced /n/ → /d/ ending", emoji: "🚪", example: "2 syllables: O-pened /ˈəʊ.pənd/" },
      { term: "Fixed", es: "/fɪkst/", meaning: "Voiceless /ks/ → /t/ ending", emoji: "🔧", example: "1 syllable: /fɪkst/" },
      { term: "Watched", es: "/wɒtʃt/", meaning: "Voiceless /tʃ/ → /t/ ending", emoji: "📺", example: "1 syllable: /wɒtʃt/" },
    ]
  },
  silentConsonants: {
    label: "🤐 Silent Consonants",
    items: [
      { term: "/p/ — psychology", es: "/saɪˈkɒlədʒi/", meaning: "'ps' at the start: P is always silent", emoji: "🧠", example: "Wrong: p-sy-chol-ogy. Right: /saɪˈkɒlədʒi/." },
      { term: "/k/ — kneel", es: "/niːl/", meaning: "'kn' at the start: K is always silent", emoji: "🙏", example: "Wrong: k-neel. Right: /niːl/." },
      { term: "/g/ — sign", es: "/saɪn/", meaning: "'gn' medially or at end: G is silent", emoji: "🪧", example: "sign /saɪn/, foreign /ˈfɒrən/, gnarl /nɑːrl/." },
      { term: "/h/ — heir", es: "/eər/", meaning: "Silent H at the start of some words — 'air'", emoji: "👑", example: "heir /eər/, hour /ˈaʊər/, honest /ˈɒnɪst/." },
      { term: "/w/ — write", es: "/raɪt/", meaning: "'wr' at the start: W is always silent", emoji: "✍️", example: "write, wrong, wrap, wrist — W never sounds." },
      { term: "/b/ — doubt", es: "/daʊt/", meaning: "'bt' combination: B is silent", emoji: "🤨", example: "doubt /daʊt/, subtle /ˈsʌtəl/, debt /det/." },
      { term: "/t/ — castle", es: "/ˈkɑːsəl/", meaning: "'st' in certain words: T is silent", emoji: "🏰", example: "castle, listen, whistle, fasten — T drops." },
      { term: "/c/ — scissors", es: "/ˈsɪzərz/", meaning: "'sc' before 'i' or 'e': C is silent", emoji: "✂️", example: "scissors /ˈsɪzərz/, science /ˈsaɪəns/." },
      { term: "/l/ — calm", es: "/kɑːm/", meaning: "'lm' combination: L is silent", emoji: "🧘", example: "calm /kɑːm/, palm /pɑːm/, psalm /sɑːm/." },
      { term: "/n/ — autumn", es: "/ˈɔːtəm/", meaning: "'mn' at the end: N is silent", emoji: "🍂", example: "autumn /ˈɔːtəm/, column /ˈkɒləm/, solemn /ˈsɒləm/." },
    ]
  },
};
