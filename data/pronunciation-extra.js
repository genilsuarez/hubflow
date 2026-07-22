/**
 * HubFlow — Extended Pronunciation Data
 * Uses FlashcardEngine-compatible format (term/es/meaning/emoji/example)
 * Covers: Connected Speech, Intonation, Common Mispronunciations, Vowel Sounds,
 * Schwa, Consonant Clusters, Sentence Stress, and Rhythm.
 */

export const CATEGORIES = {
  connectedSpeech: {
    label: "🔗 Connected Speech",
    items: [
      { term: "Wanna",          es: "Want to",               meaning: "Linking: 'want to' → /wɒnə/",                    emoji: "🗣️", example: "I wanna go home. = I want to go home." },
      { term: "Gonna",          es: "Going to",              meaning: "Reduction: 'going to' → /ɡʌnə/",                 emoji: "🏃", example: "I'm gonna call her. = I'm going to call her." },
      { term: "Gotta",          es: "Got to / Have to",      meaning: "Reduction: 'got to' → /ɡɒtə/",                   emoji: "💪", example: "I gotta leave. = I've got to leave." },
      { term: "Shoulda",        es: "Should have",           meaning: "Reduction: 'should have' → /ʃʊdə/",              emoji: "🤔", example: "I shoulda known. = I should have known." },
      { term: "Coulda",         es: "Could have",            meaning: "Reduction: 'could have' → /kʊdə/",               emoji: "💭", example: "You coulda told me. = You could have told me." },
      { term: "Woulda",         es: "Would have",            meaning: "Reduction: 'would have' → /wʊdə/",               emoji: "🔮", example: "I woulda helped. = I would have helped." },
      { term: "Kinda",          es: "Kind of",               meaning: "Reduction: 'kind of' → /kaɪndə/",                emoji: "🤷", example: "It's kinda cold. = It's kind of cold." },
      { term: "Lemme",          es: "Let me",                meaning: "Linking: 'let me' → /lemi/",                      emoji: "✋", example: "Lemme think. = Let me think." },
      { term: "Gimme",          es: "Give me",               meaning: "Linking: 'give me' → /ɡɪmi/",                     emoji: "🤲", example: "Gimme a sec. = Give me a second." },
      { term: "Dunno",          es: "Don't know",            meaning: "Reduction: 'don't know' → /dʌnəʊ/",              emoji: "🤷", example: "I dunno. = I don't know." },
    ]
  },
  linking: {
    label: "⛓️ Linking & Elision",
    items: [
      { term: "Turn_off",       es: "Apagar (linked)",       meaning: "Consonant-vowel link: /tɜːnɒf/ sounds like 'tur-noff'", emoji: "💡", example: "Turn‿off the light → /tɜː.nɒf/" },
      { term: "An_apple",       es: "Una manzana (linked)",  meaning: "N links to vowel: /ənæpəl/ sounds like 'a-napple'", emoji: "🍎", example: "An‿apple → /ə.næ.pəl/" },
      { term: "Go_away",        es: "Vete (linked)",         meaning: "Vowel-vowel link adds /w/: 'go-waway'",           emoji: "👋", example: "Go‿away → /ɡəʊ.wə.weɪ/" },
      { term: "She_is",         es: "Ella es (linked)",      meaning: "Vowel-vowel link adds /j/: 'she-yiz'",            emoji: "👩", example: "She‿is → /ʃiː.jɪz/" },
      { term: "Last_night",     es: "Anoche (elision)",      meaning: "Elision: /t/ drops between consonants",           emoji: "🌙", example: "Las(t) night → /lɑːs.naɪt/" },
      { term: "Hand_bag",       es: "Bolso (elision)",       meaning: "Elision: /d/ drops between consonants",           emoji: "👜", example: "Han(d)bag → /hæn.bæɡ/" },
      { term: "Don't_be",       es: "No seas (assimilation)", meaning: "Assimilation: /t/ → /p/ before /b/",             emoji: "🚫", example: "Don'(t) be → /dəʊm.biː/" },
      { term: "Far_away",       es: "Lejos (intrusive r)",   meaning: "Intrusive /r/ between vowels: 'far-raway'",       emoji: "🌄", example: "Far‿away → /fɑː.rə.weɪ/" },
      { term: "Want_to_go",     es: "Querer ir (linking)",   meaning: "Multiple links: 'wanto-go' → /wɒn.tə.ɡəʊ/",     emoji: "🚶", example: "Want‿to‿go → /wɒn.tə.ɡəʊ/" },
      { term: "I_agree",        es: "Estoy de acuerdo",      meaning: "Vowel-vowel link adds /j/: 'I-yagree'",           emoji: "🤝", example: "I‿agree → /aɪ.jə.ɡriː/" },
    ]
  },
  intonation: {
    label: "📈 Intonation Patterns",
    items: [
      { term: "Falling (statement)",  es: "Descendente (afirmación)", meaning: "Pitch goes DOWN at the end — statements, wh-questions", emoji: "⬇️", example: "I'm going HOME. ↘ / WHERE do you live? ↘" },
      { term: "Rising (yes/no)",      es: "Ascendente (sí/no)",       meaning: "Pitch goes UP at the end — yes/no questions",           emoji: "⬆️", example: "Are you COMING? ↗ / Is this YOURS? ↗" },
      { term: "Fall-rise (but...)",   es: "Descendente-ascendente",   meaning: "Pitch falls then rises — uncertainty, 'but' implied",   emoji: "↩️", example: "I LIKE it... ↘↗ (but I'm not sure)" },
      { term: "Rise-fall (surprise)", es: "Ascendente-descendente",   meaning: "Pitch rises then drops — surprise or strong feeling",   emoji: "😮", example: "Really?! ↗↘ / That's AMAZING! ↗↘" },
      { term: "Tag questions (sure)", es: "Tag confirmando",          meaning: "Falling tag = you expect agreement",                    emoji: "✅", example: "Nice day, ISN'T it? ↘ (I'm sure)" },
      { term: "Echo question",        es: "Pregunta eco",             meaning: "Repeating with rising pitch = surprise/disbelief",      emoji: "🔁", example: "He did WHAT? ↗ / She's HOW old? ↗" },
    ]
  },
  mispronunciations: {
    label: "⚠️ Common Mispronunciations",
    items: [
      { term: "Comfortable",    es: "/ˈkʌmftəbəl/",         meaning: "3 syllables, NOT 4 — 'CUMF-tuh-bul'",            emoji: "🛋️", example: "Wrong: com-FOR-ta-ble. Right: COMF-tuh-bul." },
      { term: "Vegetable",      es: "/ˈvedʒtəbəl/",         meaning: "3 syllables — 'VEJ-tuh-bul'",                     emoji: "🥦", example: "Wrong: ve-ge-TA-ble. Right: VEJ-tuh-bul." },
      { term: "Wednesday",      es: "/ˈwenzdeɪ/",           meaning: "2 syllables — the first D is silent",             emoji: "📅", example: "Wrong: Wed-NES-day. Right: WENZ-day." },
      { term: "February",       es: "/ˈfebruəri/",          meaning: "The first R is often dropped: 'FEB-yoo-ree'",     emoji: "❄️", example: "Wrong: feb-ROO-a-ry. Right: FEB-roo-ree." },
      { term: "Colleague",      es: "/ˈkɒliːɡ/",           meaning: "2 syllables — 'KOL-eeg', NOT 'ko-LEE-gue'",       emoji: "🤝", example: "Wrong: ko-lee-GUE. Right: KOL-eeg." },
      { term: "Recipe",         es: "/ˈresɪpi/",            meaning: "3 syllables — 'RES-uh-pee', the E is pronounced", emoji: "📖", example: "Wrong: re-SIPE. Right: RES-uh-pee." },
      { term: "Queue",          es: "/kjuː/",               meaning: "Sounds like 'cue' — one syllable, silent UEUE",   emoji: "🧍", example: "Wrong: kway-way. Right: kyoo." },
      { term: "Colonel",        es: "/ˈkɜːnəl/",           meaning: "Sounds like 'kernel' — the L is NOT pronounced",   emoji: "🎖️", example: "Wrong: ko-LO-nel. Right: KER-nul." },
      { term: "Chaos",          es: "/ˈkeɪɒs/",            meaning: "Starts with /k/ — 'KAY-oss', NOT 'chay-oss'",      emoji: "🌪️", example: "Wrong: CHA-os. Right: KAY-oss." },
      { term: "Specific",       es: "/spəˈsɪfɪk/",         meaning: "Starts with /sp/ — NOT 'pacific'",                 emoji: "🎯", example: "Wrong: pa-SIF-ic. Right: spuh-SIF-ik." },
    ]
  },
  vowelSounds: {
    label: "🔊 12 English Vowels",
    items: [
      { term: "/iː/ — fleece",   es: "Vocal larga cerrada",    meaning: "Long, tense — tongue high and front, lips spread",  emoji: "🐑", example: "see, tea, machine, believe" },
      { term: "/ɪ/ — kit",       es: "Vocal corta cerrada",    meaning: "Short, relaxed — slightly lower than /iː/",          emoji: "🧰", example: "sit, gym, busy, women" },
      { term: "/e/ — dress",     es: "Vocal media",            meaning: "Mid-front — jaw slightly open",                       emoji: "👗", example: "bed, head, said, friend" },
      { term: "/æ/ — trap",      es: "Vocal abierta frontal",  meaning: "Low-front — jaw drops more than /e/",                emoji: "🪤", example: "cat, bad, laugh, have" },
      { term: "/ɑː/ — palm",    es: "Vocal larga abierta",    meaning: "Long, open — back of tongue, jaw fully open",         emoji: "🌴", example: "car, father, heart, calm" },
      { term: "/ɒ/ — lot",       es: "Vocal corta redondeada", meaning: "Short — back of tongue, lips slightly rounded",       emoji: "🎰", example: "hot, dog, what, because" },
      { term: "/ɔː/ — thought",  es: "Vocal larga redondeada", meaning: "Long — back, lips well rounded",                     emoji: "💭", example: "law, door, more, talk" },
      { term: "/ʊ/ — foot",      es: "Vocal corta posterior",  meaning: "Short — tongue back and high, lips slightly rounded", emoji: "🦶", example: "put, book, could, woman" },
      { term: "/uː/ — goose",    es: "Vocal larga posterior",  meaning: "Long — tongue high and back, lips very rounded",     emoji: "🪿", example: "food, blue, shoe, through" },
      { term: "/ʌ/ — strut",     es: "Vocal central corta",    meaning: "Short — central, relaxed jaw",                       emoji: "🏗️", example: "cup, love, blood, enough" },
      { term: "/ɜː/ — nurse",    es: "Vocal central larga",    meaning: "Long — central, lips neutral (not rounded)",         emoji: "👩‍⚕️", example: "bird, word, learn, journey" },
      { term: "/ə/ — schwa",     es: "Vocal neutra (átona)",   meaning: "The most common English sound — weak, unstressed",   emoji: "😐", example: "about, banana, problem, doctor" },
    ]
  },
  schwa: {
    label: "😐 The Schwa /ə/",
    items: [
      { term: "About",          es: "/əˈbaʊt/",             meaning: "The 'a' is a schwa — not 'ah' but a quick /ə/",   emoji: "📖", example: "a-BOUT: the 'a' is barely there." },
      { term: "Banana",         es: "/bəˈnɑːnə/",          meaning: "TWO schwas — first 'a' and last 'a'",              emoji: "🍌", example: "buh-NAH-nuh: only the middle vowel is full." },
      { term: "Doctor",         es: "/ˈdɒktə/",             meaning: "The 'or' becomes schwa — 'DOK-tuh'",              emoji: "👨‍⚕️", example: "Not 'dock-TOR' — it's 'DOK-tuh'." },
      { term: "Family",         es: "/ˈfæmli/",             meaning: "The 'i' disappears — 'FAM-lee'",                  emoji: "👪", example: "2 syllables in natural speech, not 3." },
      { term: "Chocolate",      es: "/ˈtʃɒklət/",           meaning: "2 syllables — 'CHOK-lit', the 'o' vanishes",      emoji: "🍫", example: "Not 'cho-co-LATE' — just 'CHOK-lit'." },
      { term: "Interesting",    es: "/ˈɪntrəstɪŋ/",         meaning: "3 syllables — 'IN-truh-sting'",                   emoji: "🤔", example: "Not 'in-ter-ES-ting' — the 'e' is schwa." },
      { term: "Camera",         es: "/ˈkæmrə/",             meaning: "2 syllables — 'CAM-ruh'",                         emoji: "📸", example: "Not 'ca-me-ra' — just 'CAM-ruh'." },
      { term: "Secretary",      es: "/ˈsekrətri/",          meaning: "3 syllables — 'SEK-ruh-tree'",                    emoji: "📝", example: "Not 'sec-re-ta-ry' — collapsed." },
    ]
  },
  consonantClusters: {
    label: "🔤 Consonant Clusters",
    items: [
      { term: "/str/ — street",  es: "Grupo consonántico inicial", meaning: "3 consonants before a vowel — tongue stays up",  emoji: "🛣️", example: "street, strong, strange, struggle" },
      { term: "/spr/ — spring",  es: "Grupo consonántico inicial", meaning: "Lips go from /s/ position to rounded /r/",       emoji: "🌸", example: "spring, spray, spread, sprout" },
      { term: "/θr/ — three",    es: "Grupo difícil",              meaning: "Tongue between teeth → retroflex /r/ quickly",    emoji: "3️⃣", example: "three, throw, through, threat" },
      { term: "/sts/ — costs",   es: "Grupo consonántico final",   meaning: "3 consonants at the end — don't add a vowel",    emoji: "💰", example: "costs, lists, tests, guests" },
      { term: "/lz/ — calls",    es: "Grupo final sonoro",         meaning: "Voice the /z/ — don't devoice to /s/",           emoji: "📞", example: "calls, walls, tells, falls" },
      { term: "/ŋk/ — think",    es: "Nasal velar + plosiva",     meaning: "The 'n' is actually /ŋ/ (back of tongue on soft palate)", emoji: "🧠", example: "think, bank, drink, thank" },
      { term: "/spl/ — split",   es: "Grupo consonántico inicial", meaning: "Move quickly from /s/ to plosive /p/ to /l/",    emoji: "✂️", example: "split, splash, splendid, explain" },
      { term: "/fl/ — fly",     es: "Grupo inicial suave",        meaning: "Upper teeth on lip for /f/ then lateral /l/",     emoji: "🪰", example: "fly, floor, flower, flat" },
      { term: "/dr/ — drink",   es: "Grupo africado",             meaning: "Often sounds like /dʒr/ — 'jrink'",               emoji: "🥤", example: "drink, dream, drive, drop" },
      { term: "/tr/ — tree",    es: "Grupo africado",             meaning: "Often sounds like /tʃr/ — 'chree'",               emoji: "🌳", example: "tree, train, try, trouble" },
    ]
  },
  sentenceStress: {
    label: "💪 Sentence Stress",
    items: [
      { term: "Content words stressed",   es: "Palabras de contenido = fuertes", meaning: "Nouns, main verbs, adjectives, adverbs get stress", emoji: "🔊", example: "I BOUGHT a NEW CAR yesToday." },
      { term: "Function words weak",      es: "Palabras función = débiles",      meaning: "Articles, prepositions, pronouns are weak/fast",   emoji: "🔈", example: "I went to the SHOP for some BREAD." },
      { term: "Stress for contrast",      es: "Estrés contrastivo",              meaning: "Move stress to show what's new/important info",    emoji: "⚡", example: "I said BLUE, not GREEN." },
      { term: "De-stress 'the'",          es: "Debilitar 'the'",                 meaning: "'The' is /ðə/ before consonants, /ði/ before vowels", emoji: "📰", example: "the /ðə/ book vs the /ði/ apple" },
      { term: "Weak 'to'",               es: "Debilitar 'to'",                  meaning: "'To' reduces to /tə/ in connected speech",          emoji: "➡️", example: "I want to go = I want /tə/ go" },
      { term: "Stress-timed rhythm",      es: "Ritmo acentual",                  meaning: "English squeezes unstressed syllables between stresses", emoji: "🥁", example: "DOGS chase CATS (2 beats) = The DOGS will be CHASing the CATS (still 2 beats)" },
      { term: "Compound noun stress",     es: "Estrés en sustantivos compuestos", meaning: "First word stressed: BLACKboard, not black BOARD",  emoji: "📦", example: "WHITE house (a house) vs WHITEhouse (the building)" },
    ]
  },
  rhythm: {
    label: "🥁 English Rhythm",
    items: [
      { term: "Stress-timed",        es: "Ritmo acentual (inglés)",   meaning: "Time between stresses is roughly equal — unstressed syllables compressed", emoji: "🇬🇧", example: "CATS CHASE MICE = caTERpillars are EATing the LEAVES (same rhythm)" },
      { term: "Syllable-timed",      es: "Ritmo silábico (español)",  meaning: "Each syllable gets equal time — Spanish rhythm, NOT English",              emoji: "🇪🇸", example: "Spanish: ca-da-sí-la-ba-i-gual. English: NOT like this." },
      { term: "Weak forms",          es: "Formas débiles",            meaning: "Common words have a 'weak' version in natural speech",                     emoji: "🔉", example: "was→/wəz/, can→/kən/, are→/ə/, have→/əv/" },
      { term: "Strong forms",        es: "Formas fuertes",            meaning: "Used at sentence end, in contrast, or emphasis",                           emoji: "🔊", example: "Yes I CAN /kæn/. I WAS /wɒz/ there." },
      { term: "Thought groups",      es: "Grupos de significado",     meaning: "We pause between meaningful chunks, not random words",                     emoji: "💬", example: "The man / who called yesterday / is my boss." },
      { term: "Linking R",           es: "R de enlace",               meaning: "A silent R is pronounced when next word starts with a vowel",              emoji: "🔗", example: "far away → /fɑːr əˈweɪ/, water and → /wɔːtər ænd/" },
      { term: "Glottal stop",        es: "Parada glotal /ʔ/",         meaning: "A catch in the throat replacing /t/ in casual speech",                     emoji: "⛔", example: "butter → /bʌʔə/, bottle → /bɒʔl/" },
    ]
  },
  edPronunciation: {
    label: "📢 -ED Pronunciation",
    items: [
      { term: "/t/ after voiceless",   es: "Terminación sorda",       meaning: "After /p, k, f, s, ʃ, tʃ/ → -ed sounds like /t/",   emoji: "🤫", example: "walked /wɔːkt/, helped /helpt/, washed /wɒʃt/" },
      { term: "/d/ after voiced",      es: "Terminación sonora",      meaning: "After vowels and voiced consonants → -ed sounds /d/", emoji: "🔊", example: "played /pleɪd/, called /kɔːld/, lived /lɪvd/" },
      { term: "/ɪd/ after t/d",        es: "Sílaba extra",            meaning: "After /t/ or /d/ → adds a syllable: /ɪd/",           emoji: "➕", example: "wanted /wɒntɪd/, needed /niːdɪd/, started /stɑːtɪd/" },
      { term: "Stopped",               es: "/stɒpt/",                 meaning: "Voiceless /p/ → /t/ ending, NOT 'stop-ped'",          emoji: "🛑", example: "1 syllable: /stɒpt/" },
      { term: "Loved",                 es: "/lʌvd/",                  meaning: "Voiced /v/ → /d/ ending, NOT 'lov-ed'",               emoji: "❤️", example: "1 syllable: /lʌvd/" },
      { term: "Decided",               es: "/dɪˈsaɪdɪd/",            meaning: "Ends in /d/ → adds /ɪd/ extra syllable",              emoji: "🤔", example: "3 syllables: de-CI-did" },
      { term: "Cooked",                es: "/kʊkt/",                  meaning: "Voiceless /k/ → /t/ ending",                          emoji: "👨‍🍳", example: "1 syllable: /kʊkt/" },
      { term: "Opened",                es: "/ˈəʊpənd/",              meaning: "Voiced /n/ → /d/ ending",                             emoji: "🚪", example: "2 syllables: O-pened /ˈəʊ.pənd/" },
      { term: "Fixed",                 es: "/fɪkst/",                 meaning: "Voiceless /ks/ → /t/ ending",                        emoji: "🔧", example: "1 syllable: /fɪkst/" },
      { term: "Watched",               es: "/wɒtʃt/",                meaning: "Voiceless /tʃ/ → /t/ ending",                        emoji: "📺", example: "1 syllable: /wɒtʃt/" },
    ]
  },
  tricky50: {
    label: "🎯 50 Tricky Words",
    items: [
      { term: "Clothes",       es: "/kləʊðz/",        meaning: "1 syllable — sounds like 'cloze', NOT 'clo-THES'",      emoji: "👔" },
      { term: "World",         es: "/wɜːld/",         meaning: "The 'or' is /ɜː/ — don't add a syllable",               emoji: "🌍" },
      { term: "Squirrel",      es: "/ˈskwɪrəl/",     meaning: "2 syllables — 'SKWIR-ul', not 3",                        emoji: "🐿️" },
      { term: "Months",        es: "/mʌnθs/",         meaning: "Ends /nθs/ — tongue between teeth then /s/",             emoji: "📅" },
      { term: "Iron",          es: "/ˈaɪən/",         meaning: "2 syllables — 'EYE-un', the R is silent",                emoji: "🔨" },
      { term: "Onion",         es: "/ˈʌnjən/",        meaning: "2 syllables — 'UN-yun'",                                 emoji: "🧅" },
      { term: "Bury",          es: "/ˈberi/",         meaning: "Sounds like 'berry' — NOT 'boo-ry'",                     emoji: "⚰️" },
      { term: "Subtle",        es: "/ˈsʌtəl/",       meaning: "The B is silent — 'SUT-ul'",                             emoji: "🤫" },
      { term: "Debt",          es: "/det/",            meaning: "The B is silent — just 'det'",                           emoji: "💳" },
      { term: "Stomach",       es: "/ˈstʌmək/",      meaning: "The 'ch' is /k/ — 'STUM-uk'",                            emoji: "🤢" },
    ]
  },
};
