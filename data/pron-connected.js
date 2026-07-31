export const CATEGORIES = {
  connectedSpeech: {
    label: "🔗 Connected Speech",
    items: [
      { term: "Wanna", es: "Want to", meaning: "Linking: 'want to' → /wɒnə/", emoji: "🗣️", example: "I wanna go home. = I want to go home." },
      { term: "Gonna", es: "Going to", meaning: "Reduction: 'going to' → /ɡʌnə/", emoji: "🏃", example: "I'm gonna call her. = I'm going to call her." },
      { term: "Gotta", es: "Got to / Have to", meaning: "Reduction: 'got to' → /ɡɒtə/", emoji: "💪", example: "I gotta leave. = I've got to leave." },
      { term: "Shoulda", es: "Should have", meaning: "Reduction: 'should have' → /ʃʊdə/", emoji: "🤔", example: "I shoulda known. = I should have known." },
      { term: "Coulda", es: "Could have", meaning: "Reduction: 'could have' → /kʊdə/", emoji: "💭", example: "You coulda told me. = You could have told me." },
      { term: "Woulda", es: "Would have", meaning: "Reduction: 'would have' → /wʊdə/", emoji: "🔮", example: "I woulda helped. = I would have helped." },
      { term: "Kinda", es: "Kind of", meaning: "Reduction: 'kind of' → /kaɪndə/", emoji: "🤷", example: "It's kinda cold. = It's kind of cold." },
      { term: "Lemme", es: "Let me", meaning: "Linking: 'let me' → /lemi/", emoji: "✋", example: "Lemme think. = Let me think." },
      { term: "Gimme", es: "Give me", meaning: "Linking: 'give me' → /ɡɪmi/", emoji: "🤲", example: "Gimme a sec. = Give me a second." },
      { term: "Dunno", es: "Don't know", meaning: "Reduction: 'don't know' → /dʌnəʊ/", emoji: "🤷", example: "I dunno. = I don't know." },
      { term: "Musta", es: "Must have", meaning: "Reduction: 'must have' → /mʌstə/", emoji: "🤔", example: "You musta forgotten. = You must have forgotten." },
      { term: "Oughta", es: "Ought to", meaning: "Reduction: 'ought to' → /ˈɔːtə/", emoji: "☝️", example: "You oughta call her. = You ought to call her." },
      { term: "Cuz", es: "Because", meaning: "Reduction: 'because' → /kəz/", emoji: "💬", example: "I'm late cuz of traffic. = I'm late because of traffic." },
      { term: "Sorta", es: "Sort of", meaning: "Reduction: 'sort of' → /ˈsɔːrtə/", emoji: "🤷", example: "It's sorta strange. = It's sort of strange." },
    ]
  },
  linking: {
    label: "⛓️ Linking & Elision",
    items: [
      { term: "Turn_off", es: "Apagar (linked)", meaning: "Consonant-vowel link: /tɜːnɒf/ sounds like 'tur-noff'", emoji: "💡", example: "Turn‿off the light → /tɜː.nɒf/" },
      { term: "An_apple", es: "Una manzana (linked)", meaning: "N links to vowel: /ənæpəl/ sounds like 'a-napple'", emoji: "🍎", example: "An‿apple → /ə.næ.pəl/" },
      { term: "Go_away", es: "Vete (linked)", meaning: "Vowel-vowel link adds /w/: 'go-waway'", emoji: "👋", example: "Go‿away → /ɡəʊ.wə.weɪ/" },
      { term: "She_is", es: "Ella es (linked)", meaning: "Vowel-vowel link adds /j/: 'she-yiz'", emoji: "👩", example: "She‿is → /ʃiː.jɪz/" },
      { term: "Last_night", es: "Anoche (elision)", meaning: "Elision: /t/ drops between consonants", emoji: "🌙", example: "Las(t) night → /lɑːs.naɪt/" },
      { term: "Hand_bag", es: "Bolso (elision)", meaning: "Elision: /d/ drops between consonants", emoji: "👜", example: "Han(d)bag → /hæn.bæɡ/" },
      { term: "Don't_be", es: "No seas (assimilation)", meaning: "Assimilation: /t/ → /p/ before /b/", emoji: "🚫", example: "Don'(t) be → /dəʊm.biː/" },
      { term: "Far_away", es: "Lejos (intrusive r)", meaning: "Intrusive /r/ between vowels: 'far-raway'", emoji: "🌄", example: "Far‿away → /fɑː.rə.weɪ/" },
      { term: "Want_to_go", es: "Querer ir (linking)", meaning: "Multiple links: 'wanto-go' → /wɒn.tə.ɡəʊ/", emoji: "🚶", example: "Want‿to‿go → /wɒn.tə.ɡəʊ/" },
      { term: "I_agree", es: "Estoy de acuerdo", meaning: "Vowel-vowel link adds /j/: 'I-yagree'", emoji: "🤝", example: "I‿agree → /aɪ.jə.ɡriː/" },
      { term: "Next_day", es: "Al día siguiente (elision)", meaning: "Elision: /t/ drops between consonants", emoji: "📆", example: "Nex(t) day → /neks.deɪ/" },
      { term: "Try_it", es: "Pruébalo (linked)", meaning: "Consonant-vowel link: /traɪ ɪt/ sounds like 'try-yit'", emoji: "🧪", example: "Try‿it → /traɪ.jɪt/" },
      { term: "Not_at_all", es: "Para nada (linking)", meaning: "Multiple links: /nɒ.tə.tɔːl/", emoji: "🙅", example: "Not‿at‿all → /nɒ.tə.tɔːl/" },
    ]
  },
  assimilation: {
    label: "🔀 Assimilation",
    items: [
      { term: "in Paris", es: "en París", meaning: "/n/ → /m/ before /p/: bilabial assimilation", emoji: "🗼", example: "in Paris → /ɪm ˈpærɪs/" },
      { term: "good boy", es: "buen chico", meaning: "/d/ → /b/ before /b/: bilabial assimilation of final plosive", emoji: "👦", example: "good boy → /ɡʊb bɔɪ/" },
      { term: "that person", es: "esa persona", meaning: "/t/ → /p/ before /p/: bilabial assimilation", emoji: "🧑", example: "that person → /ðæp ˈpɜːrsən/" },
      { term: "ten minutes", es: "diez minutos", meaning: "/n/ → /m/ before /m/: bilabial assimilation", emoji: "⏱️", example: "ten minutes → /tem ˈmɪnɪts/" },
      { term: "input", es: "entrada / aportación", meaning: "/n/ → /m/ before /p/: very common in fast speech", emoji: "⌨️", example: "input → /ˈɪmpʊt/" },
      { term: "I can go", es: "Puedo ir", meaning: "/n/ → /ŋ/ before /g/: velar assimilation", emoji: "🚶", example: "can go → /kæŋ ɡəʊ/" },
      { term: "that car", es: "ese coche", meaning: "/t/ → /k/ before /k/: velar assimilation", emoji: "🚗", example: "that car → /ðæk kɑːr/" },
      { term: "in case", es: "por si acaso", meaning: "/n/ → /ŋ/ before /k/: velar assimilation", emoji: "📦", example: "in case → /ɪŋ keɪs/" },
      { term: "don't go", es: "no vayas", meaning: "/t/ → /k/ before /g/: velar assimilation", emoji: "🚫", example: "don't go → /dəʊŋk ɡəʊ/" },
      { term: "green car", es: "coche verde", meaning: "/n/ → /ŋ/ before /k/: velar assimilation in noun phrases", emoji: "💚", example: "green car → /ɡriːŋ kɑːr/" },
      { term: "sun cream", es: "protector solar", meaning: "/n/ → /ŋ/ before /k/: velar assimilation", emoji: "☀️", example: "sun cream → /sʌŋ kriːm/" },
      { term: "brown paper", es: "papel marrón", meaning: "/n/ → /m/ before /p/: bilabial assimilation", emoji: "📦", example: "brown paper → /braʊm ˈpeɪpər/" },
      { term: "red car", es: "coche rojo", meaning: "/d/ → /g/ before /k/: velar assimilation", emoji: "🚗", example: "red car → /reg kɑːr/" },
    ]
  },
};
