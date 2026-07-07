/**
 * HubFlow — Pronunciation / Phonics Data
 * Categories: Minimal Pairs (vowels), Minimal Pairs (consonants), Word Stress, Silent Letters
 * Modes: Listen & Choose (quiz), Study (flashcard with IPA)
 */

export const CATEGORIES = {
  'vowel-pairs': {
    label: 'Vowel Pairs',
    icon: '🔊',
    description: 'Distinguish similar vowel sounds',
    items: [
      { word_a: "ship", word_b: "sheep", ipa_a: "/ʃɪp/", ipa_b: "/ʃiːp/", sound: "/ɪ/ vs /iː/", es: "barco / oveja", tip: "Short /ɪ/ = relaxed. Long /iː/ = tense, smile." },
      { word_a: "bit", word_b: "beat", ipa_a: "/bɪt/", ipa_b: "/biːt/", sound: "/ɪ/ vs /iː/", es: "pedazo / golpear", tip: "/ɪ/ is quick. /iː/ hold the sound longer." },
      { word_a: "sit", word_b: "seat", ipa_a: "/sɪt/", ipa_b: "/siːt/", sound: "/ɪ/ vs /iː/", es: "sentarse / asiento", tip: "Listen for length — 'seat' vowel is longer." },
      { word_a: "full", word_b: "fool", ipa_a: "/fʊl/", ipa_b: "/fuːl/", sound: "/ʊ/ vs /uː/", es: "lleno / tonto", tip: "/ʊ/ is short. /uː/ is long — round your lips more." },
      { word_a: "pull", word_b: "pool", ipa_a: "/pʊl/", ipa_b: "/puːl/", sound: "/ʊ/ vs /uː/", es: "jalar / piscina", tip: "'Pool' has a longer vowel sound." },
      { word_a: "look", word_b: "Luke", ipa_a: "/lʊk/", ipa_b: "/luːk/", sound: "/ʊ/ vs /uː/", es: "mirar / Lucas", tip: "/ʊ/ quick. /uː/ sustained and rounded." },
      { word_a: "cat", word_b: "cut", ipa_a: "/kæt/", ipa_b: "/kʌt/", sound: "/æ/ vs /ʌ/", es: "gato / cortar", tip: "/æ/ mouth open wide. /ʌ/ mouth more relaxed, central." },
      { word_a: "bat", word_b: "but", ipa_a: "/bæt/", ipa_b: "/bʌt/", sound: "/æ/ vs /ʌ/", es: "murciélago / pero", tip: "/æ/ = jaw drops. /ʌ/ = neutral, short." },
      { word_a: "man", word_b: "men", ipa_a: "/mæn/", ipa_b: "/men/", sound: "/æ/ vs /e/", es: "hombre / hombres", tip: "/æ/ is more open. /e/ is mid-height." },
      { word_a: "bad", word_b: "bed", ipa_a: "/bæd/", ipa_b: "/bed/", sound: "/æ/ vs /e/", es: "malo / cama", tip: "Drop your jaw more for /æ/ ('bad')." },
      { word_a: "not", word_b: "nut", ipa_a: "/nɒt/", ipa_b: "/nʌt/", sound: "/ɒ/ vs /ʌ/", es: "no / nuez", tip: "/ɒ/ rounded lips. /ʌ/ relaxed, unrounded." },
      { word_a: "cop", word_b: "cup", ipa_a: "/kɒp/", ipa_b: "/kʌp/", sound: "/ɒ/ vs /ʌ/", es: "policía / taza", tip: "Round your lips for 'cop', relax for 'cup'." },
      { word_a: "hat", word_b: "heart", ipa_a: "/hæt/", ipa_b: "/hɑːt/", sound: "/æ/ vs /ɑː/", es: "sombrero / corazón", tip: "/æ/ short front vowel. /ɑː/ long back vowel." },
      { word_a: "cot", word_b: "caught", ipa_a: "/kɒt/", ipa_b: "/kɔːt/", sound: "/ɒ/ vs /ɔː/", es: "cuna / atrapó", tip: "/ɒ/ short. /ɔː/ long and more open." },
    ]
  },
  'consonant-pairs': {
    label: 'Consonant Pairs',
    icon: '👂',
    description: 'Distinguish voiced/voiceless consonants',
    items: [
      { word_a: "pie", word_b: "buy", ipa_a: "/paɪ/", ipa_b: "/baɪ/", sound: "/p/ vs /b/", es: "pastel / comprar", tip: "/p/ voiceless (no vibration). /b/ voiced (throat vibrates)." },
      { word_a: "ten", word_b: "den", ipa_a: "/ten/", ipa_b: "/den/", sound: "/t/ vs /d/", es: "diez / guarida", tip: "/t/ voiceless. /d/ voiced. Same mouth position." },
      { word_a: "coat", word_b: "goat", ipa_a: "/kəʊt/", ipa_b: "/ɡəʊt/", sound: "/k/ vs /ɡ/", es: "abrigo / cabra", tip: "/k/ voiceless. /ɡ/ voiced. Touch your throat to feel." },
      { word_a: "fan", word_b: "van", ipa_a: "/fæn/", ipa_b: "/væn/", sound: "/f/ vs /v/", es: "ventilador / furgoneta", tip: "/f/ voiceless. /v/ voiced. Both use upper teeth on lower lip." },
      { word_a: "think", word_b: "this", ipa_a: "/θɪŋk/", ipa_b: "/ðɪs/", sound: "/θ/ vs /ð/", es: "pensar / esto", tip: "/θ/ voiceless 'th'. /ð/ voiced 'th'. Same tongue position." },
      { word_a: "sink", word_b: "zinc", ipa_a: "/sɪŋk/", ipa_b: "/zɪŋk/", sound: "/s/ vs /z/", es: "lavabo / zinc", tip: "/s/ voiceless hiss. /z/ voiced buzz." },
      { word_a: "sip", word_b: "zip", ipa_a: "/sɪp/", ipa_b: "/zɪp/", sound: "/s/ vs /z/", es: "sorbo / cierre", tip: "Put hand on throat: /z/ vibrates, /s/ doesn't." },
      { word_a: "rice", word_b: "rise", ipa_a: "/raɪs/", ipa_b: "/raɪz/", sound: "/s/ vs /z/", es: "arroz / subir", tip: "Final /s/ is a hiss. Final /z/ buzzes." },
      { word_a: "rich", word_b: "ridge", ipa_a: "/rɪtʃ/", ipa_b: "/rɪdʒ/", sound: "/tʃ/ vs /dʒ/", es: "rico / cresta", tip: "/tʃ/ voiceless 'ch'. /dʒ/ voiced 'j'." },
      { word_a: "cheap", word_b: "jeep", ipa_a: "/tʃiːp/", ipa_b: "/dʒiːp/", sound: "/tʃ/ vs /dʒ/", es: "barato / jeep", tip: "'Ch' = no vibration. 'J' = vibration." },
      { word_a: "light", word_b: "right", ipa_a: "/laɪt/", ipa_b: "/raɪt/", sound: "/l/ vs /r/", es: "luz / derecha", tip: "/l/ tongue tip touches roof. /r/ tongue curls back, no contact." },
      { word_a: "led", word_b: "red", ipa_a: "/led/", ipa_b: "/red/", sound: "/l/ vs /r/", es: "dirigió / rojo", tip: "For /l/ touch alveolar ridge. For /r/ tongue doesn't touch." },
      { word_a: "wine", word_b: "vine", ipa_a: "/waɪn/", ipa_b: "/vaɪn/", sound: "/w/ vs /v/", es: "vino / enredadera", tip: "/w/ = round lips, no teeth. /v/ = teeth on lip." },
      { word_a: "west", word_b: "vest", ipa_a: "/west/", ipa_b: "/vest/", sound: "/w/ vs /v/", es: "oeste / chaleco", tip: "/w/ both lips round. /v/ upper teeth bite lower lip." },
    ]
  },
  'word-stress': {
    label: 'Word Stress',
    icon: '💪',
    description: 'Identify which syllable is stressed',
    items: [
      { word: "record", stress_a: "RE-cord", stress_b: "re-CORD", meaning_a: "noun: a vinyl disc / written account", meaning_b: "verb: to capture audio/video", es: "registro / grabar", tip: "Noun = first syllable. Verb = second syllable." },
      { word: "present", stress_a: "PRE-sent", stress_b: "pre-SENT", meaning_a: "noun: a gift / adjective: here now", meaning_b: "verb: to give formally", es: "regalo / presentar", tip: "Noun/adj = PRE-sent. Verb = pre-SENT." },
      { word: "object", stress_a: "OB-ject", stress_b: "ob-JECT", meaning_a: "noun: a thing", meaning_b: "verb: to disagree", es: "objeto / objetar", tip: "Noun = OB-ject. Verb = ob-JECT." },
      { word: "permit", stress_a: "PER-mit", stress_b: "per-MIT", meaning_a: "noun: a licence/document", meaning_b: "verb: to allow", es: "permiso / permitir", tip: "Noun = PER-mit. Verb = per-MIT." },
      { word: "produce", stress_a: "PRO-duce", stress_b: "pro-DUCE", meaning_a: "noun: fresh food/vegetables", meaning_b: "verb: to make/create", es: "productos / producir", tip: "Noun = PRO-duce. Verb = pro-DUCE." },
      { word: "desert", stress_a: "DE-sert", stress_b: "de-SERT", meaning_a: "noun: a dry sandy place", meaning_b: "verb: to abandon", es: "desierto / desertar", tip: "Noun = DE-sert. Verb = de-SERT." },
      { word: "refuse", stress_a: "RE-fuse", stress_b: "re-FUSE", meaning_a: "noun: rubbish/waste", meaning_b: "verb: to say no", es: "basura / rechazar", tip: "Noun = RE-fuse. Verb = re-FUSE." },
      { word: "content", stress_a: "CON-tent", stress_b: "con-TENT", meaning_a: "noun: what's inside", meaning_b: "adjective: satisfied/happy", es: "contenido / contento", tip: "Noun = CON-tent. Adjective = con-TENT." },
      { word: "increase", stress_a: "IN-crease", stress_b: "in-CREASE", meaning_a: "noun: a rise", meaning_b: "verb: to go up", es: "aumento / aumentar", tip: "Noun = IN-crease. Verb = in-CREASE." },
      { word: "insult", stress_a: "IN-sult", stress_b: "in-SULT", meaning_a: "noun: an offensive remark", meaning_b: "verb: to offend someone", es: "insulto / insultar", tip: "Noun = IN-sult. Verb = in-SULT." },
      { word: "contract", stress_a: "CON-tract", stress_b: "con-TRACT", meaning_a: "noun: a legal agreement", meaning_b: "verb: to shrink / to get (illness)", es: "contrato / contraer", tip: "Noun = CON-tract. Verb = con-TRACT." },
      { word: "conduct", stress_a: "CON-duct", stress_b: "con-DUCT", meaning_a: "noun: behaviour", meaning_b: "verb: to lead/manage", es: "conducta / conducir", tip: "Noun = CON-duct. Verb = con-DUCT." },
    ]
  },
  'silent-letters': {
    label: 'Silent Letters',
    icon: '🤫',
    description: 'Identify letters that are not pronounced',
    items: [
      { word: "knife", ipa: "/naɪf/", silent: "k", rule: "Silent K before N", es: "cuchillo", tip: "K is always silent before N: know, knee, knock." },
      { word: "write", ipa: "/raɪt/", silent: "w", rule: "Silent W before R", es: "escribir", tip: "W is silent before R: wrong, wrap, wrist." },
      { word: "hour", ipa: "/aʊər/", silent: "h", rule: "Silent H in some words", es: "hora", tip: "Silent H: hour, honest, honour, heir." },
      { word: "listen", ipa: "/ˈlɪsən/", silent: "t", rule: "Silent T after S", es: "escuchar", tip: "Silent T: listen, castle, whistle, fasten." },
      { word: "doubt", ipa: "/daʊt/", silent: "b", rule: "Silent B after M / before T", es: "duda", tip: "Silent B: doubt, debt, climb, bomb, thumb." },
      { word: "island", ipa: "/ˈaɪlənd/", silent: "s", rule: "Silent S in 'island'", es: "isla", tip: "The S in 'island' is silent — /ˈaɪlənd/." },
      { word: "Wednesday", ipa: "/ˈwenzdeɪ/", silent: "d", rule: "Silent D in Wednesday", es: "miércoles", tip: "Say 'WENZ-day' — the first D is silent." },
      { word: "psychology", ipa: "/saɪˈkɒlədʒi/", silent: "p", rule: "Silent P before S (Greek origin)", es: "psicología", tip: "Silent P: psychology, pneumonia, pseudo." },
      { word: "salmon", ipa: "/ˈsæmən/", silent: "l", rule: "Silent L in some words", es: "salmón", tip: "Silent L: salmon, calm, half, talk, walk." },
      { word: "ghost", ipa: "/ɡəʊst/", silent: "h", rule: "Silent H after G", es: "fantasma", tip: "GH words: ghost, ghastly — H is silent." },
      { word: "gnaw", ipa: "/nɔː/", silent: "g", rule: "Silent G before N", es: "roer", tip: "Silent G: gnaw, gnat, gnome, sign." },
      { word: "muscle", ipa: "/ˈmʌsəl/", silent: "c", rule: "Silent C in some words", es: "músculo", tip: "Silent C: muscle, science, scissors, scene." },
      { word: "receipt", ipa: "/rɪˈsiːt/", silent: "p", rule: "Silent P in 'receipt'", es: "recibo", tip: "The P in 'receipt' is silent: /rɪˈsiːt/." },
      { word: "autumn", ipa: "/ˈɔːtəm/", silent: "n", rule: "Silent N after M", es: "otoño", tip: "Silent N: autumn, column, hymn, damn." },
    ]
  }
};
