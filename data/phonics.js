/**
 * HubFlow — Pronunciation / Phonics Data
 * Categories: Minimal Pairs (vowels), Minimal Pairs (consonants), Word Stress, Silent Letters
 * Modes: Listen & Choose (quiz), Study (flashcard with IPA)
 */

export const CATEGORIES = {
  'vowel-pairs': {
    label: 'Vowels',
    icon: '🔊',
    description: 'Distinguish similar vowel sounds',
    items: [
      { word_a: "hill", word_b: "heel", ipa_a: "/hɪl/", ipa_b: "/hiːl/", sound: "/ɪ/ vs /iː/", es: "colina / talón", tip: "Short /ɪ/ = relaxed. Long /iː/ = tense, smile." },
      { word_a: "full", word_b: "fool", ipa_a: "/fʊl/", ipa_b: "/fuːl/", sound: "/ʊ/ vs /uː/", es: "lleno / tonto", tip: "/ʊ/ is short. /uː/ is long — round your lips more." },
      { word_a: "cat", word_b: "cut", ipa_a: "/kæt/", ipa_b: "/kʌt/", sound: "/æ/ vs /ʌ/", es: "gato / cortar", tip: "/æ/ mouth open wide. /ʌ/ mouth more relaxed, central." },
      { word_a: "sat", word_b: "set", ipa_a: "/sæt/", ipa_b: "/sɛt/", sound: "/æ/ vs /e/", es: "se sentó / puso", tip: "Drop your jaw more for /æ/ ('sat')." },
      { word_a: "cot", word_b: "caught", ipa_a: "/kɒt/", ipa_b: "/kɔːt/", sound: "/ɒ/ vs /ɔː/", es: "cuna / atrapó", tip: "/ɒ/ short. /ɔː/ long and more open." },
      { word_a: "bit", word_b: "beat", ipa_a: "/bɪt/", ipa_b: "/biːt/", sound: "/ɪ/ vs /iː/", es: "poco / golpear", tip: "Short /ɪ/ relaxed. Long /iː/ tense, wider smile." },
      { word_a: "pull", word_b: "pool", ipa_a: "/pʊl/", ipa_b: "/puːl/", sound: "/ʊ/ vs /uː/", es: "tirar / piscina", tip: "/ʊ/ short and relaxed. /uː/ long, rounded lips." },
      { word_a: "man", word_b: "men", ipa_a: "/mæn/", ipa_b: "/mɛn/", sound: "/æ/ vs /ɛ/", es: "hombre / hombres", tip: "/æ/ mouth wide open. /ɛ/ mid, more closed." },
      { word_a: "bag", word_b: "bug", ipa_a: "/bæɡ/", ipa_b: "/bʌɡ/", sound: "/æ/ vs /ʌ/", es: "bolsa / insecto", tip: "/æ/ front, open. /ʌ/ central, relaxed." },
      { word_a: "shot", word_b: "short", ipa_a: "/ʃɒt/", ipa_b: "/ʃɔːrt/", sound: "/ɒ/ vs /ɔː/", es: "disparo / corto", tip: "/ɒ/ short and rounded. /ɔː/ long, more rounded and tense." },
    ]
  },
  'consonant-pairs': {
    label: 'Consonants',
    icon: '👂',
    description: 'Distinguish voiced/voiceless consonants',
    items: [
      { word_a: "fan", word_b: "van", ipa_a: "/fæn/", ipa_b: "/væn/", sound: "/f/ vs /v/", es: "ventilador / furgoneta", tip: "/f/ voiceless. /v/ voiced. Both use upper teeth on lower lip." },
      { word_a: "think", word_b: "this", ipa_a: "/θɪŋk/", ipa_b: "/ðɪs/", sound: "/θ/ vs /ð/", es: "pensar / esto", tip: "/θ/ voiceless 'th'. /ð/ voiced 'th'. Same tongue position." },
      { word_a: "sink", word_b: "zinc", ipa_a: "/sɪŋk/", ipa_b: "/zɪŋk/", sound: "/s/ vs /z/", es: "lavabo / zinc", tip: "/s/ voiceless hiss. /z/ voiced buzz." },
      { word_a: "rich", word_b: "ridge", ipa_a: "/rɪtʃ/", ipa_b: "/rɪdʒ/", sound: "/tʃ/ vs /dʒ/", es: "rico / cresta", tip: "/tʃ/ voiceless 'ch'. /dʒ/ voiced 'j'." },
      { word_a: "light", word_b: "right", ipa_a: "/laɪt/", ipa_b: "/raɪt/", sound: "/l/ vs /r/", es: "luz / derecha", tip: "/l/ tongue tip touches roof. /r/ tongue curls back, no contact." },
      { word_a: "pat", word_b: "bat", ipa_a: "/pæt/", ipa_b: "/bæt/", sound: "/p/ vs /b/", es: "palmadita / murciélago", tip: "/p/ voiceless, puff of air. /b/ voiced, no puff." },
      { word_a: "very", word_b: "berry", ipa_a: "/ˈvɛri/", ipa_b: "/ˈbɛri/", sound: "/v/ vs /b/", es: "muy / baya", tip: "Confusión típica del español: /v/ toca el labio con los dientes, /b/ junta los labios." },
      { word_a: "yet", word_b: "jet", ipa_a: "/jɛt/", ipa_b: "/dʒɛt/", sound: "/j/ vs /dʒ/", es: "todavía / avión a reacción", tip: "/j/ es un deslizamiento tipo 'y'. /dʒ/ es una africada sonora." },
      { word_a: "wine", word_b: "vine", ipa_a: "/waɪn/", ipa_b: "/vaɪn/", sound: "/w/ vs /v/", es: "vino / vid", tip: "/w/ labios redondeados, sin dientes. /v/ dientes tocan el labio inferior." },
      { word_a: "seal", word_b: "zeal", ipa_a: "/siːl/", ipa_b: "/ziːl/", sound: "/s/ vs /z/", es: "foca / entusiasmo", tip: "/s/ silbido sordo. /z/ zumbido sonoro — igual que sink/zinc." },
    ]
  },
  'word-stress': {
    label: 'Stress',
    icon: '💪',
    description: 'Identify which syllable is stressed',
    items: [
      { word: "record", stress_a: "RE-cord", stress_b: "re-CORD", meaning_a: "noun: a vinyl disc / written account", meaning_b: "verb: to capture audio/video", es: "registro / grabar", tip: "Noun = first syllable. Verb = second syllable." },
      { word: "present", stress_a: "PRE-sent", stress_b: "pre-SENT", meaning_a: "noun: a gift / adjective: here now", meaning_b: "verb: to give formally", es: "regalo / presentar", tip: "Noun/adj = PRE-sent. Verb = pre-SENT." },
      { word: "object", stress_a: "OB-ject", stress_b: "ob-JECT", meaning_a: "noun: a thing", meaning_b: "verb: to disagree", es: "objeto / objetar", tip: "Noun = OB-ject. Verb = ob-JECT." },
      { word: "permit", stress_a: "PER-mit", stress_b: "per-MIT", meaning_a: "noun: a licence/document", meaning_b: "verb: to allow", es: "permiso / permitir", tip: "Noun = PER-mit. Verb = per-MIT." },
      { word: "produce", stress_a: "PRO-duce", stress_b: "pro-DUCE", meaning_a: "noun: fresh food/vegetables", meaning_b: "verb: to make/create", es: "productos / producir", tip: "Noun = PRO-duce. Verb = pro-DUCE." },
      { word: "conduct", stress_a: "CON-duct", stress_b: "con-DUCT", meaning_a: "noun: behaviour", meaning_b: "verb: to carry out / to lead", es: "conducta / conducir", tip: "Noun = CON-duct. Verb = con-DUCT." },
      { word: "contract", stress_a: "CON-tract", stress_b: "con-TRACT", meaning_a: "noun: a formal agreement", meaning_b: "verb: to become smaller / to catch (an illness)", es: "contrato / contraer", tip: "Noun = CON-tract. Verb = con-TRACT." },
      { word: "export", stress_a: "EX-port", stress_b: "ex-PORT", meaning_a: "noun: goods sold abroad", meaning_b: "verb: to sell/send abroad", es: "exportación / exportar", tip: "Noun = EX-port. Verb = ex-PORT." },
      { word: "import", stress_a: "IM-port", stress_b: "im-PORT", meaning_a: "noun: goods brought in", meaning_b: "verb: to bring in from abroad", es: "importación / importar", tip: "Noun = IM-port. Verb = im-PORT." },
      { word: "increase", stress_a: "IN-crease", stress_b: "in-CREASE", meaning_a: "noun: a rise or growth", meaning_b: "verb: to grow/make bigger", es: "aumento / aumentar", tip: "Noun = IN-crease. Verb = in-CREASE." },
    ]
  },
  'silent-letters': {
    label: 'Silent',
    icon: '🤫',
    description: 'Identify letters that are not pronounced',
    items: [
      { word: "knife", ipa: "/naɪf/", silent: "k", rule: "Silent K before N", es: "cuchillo", tip: "K is always silent before N: know, knee, knock." },
      { word: "write", ipa: "/raɪt/", silent: "w", rule: "Silent W before R", es: "escribir", tip: "W is silent before R: wrong, wrap, wrist." },
      { word: "listen", ipa: "/ˈlɪsən/", silent: "t", rule: "Silent T after S", es: "escuchar", tip: "Silent T: listen, castle, whistle, fasten." },
      { word: "doubt", ipa: "/daʊt/", silent: "b", rule: "Silent B after M / before T", es: "duda", tip: "Silent B: doubt, debt, climb, bomb, thumb." },
      { word: "island", ipa: "/ˈaɪlənd/", silent: "s", rule: "Silent S in 'island'", es: "isla", tip: "The S in 'island' is silent — /ˈaɪlənd/." },
      { word: "honest", ipa: "/ˈɒnɪst/", silent: "h", rule: "Silent H at the start of some words", es: "honesto", tip: "H is silent: honest, hour, honor." },
      { word: "sword", ipa: "/sɔːrd/", silent: "w", rule: "Silent W after S", es: "espada", tip: "W is silent: sword, answer, two." },
      { word: "though", ipa: "/ðoʊ/", silent: "gh", rule: "Silent GH after a vowel", es: "aunque", tip: "GH is silent: though, through, thought, night." },
      { word: "half", ipa: "/hæf/", silent: "l", rule: "Silent L before F/K/M", es: "mitad", tip: "Silent L: half, walk, calm, salmon." },
      { word: "castle", ipa: "/ˈkæsəl/", silent: "t", rule: "Silent T after S", es: "castillo", tip: "Same pattern as 'listen': whistle, wrestle, castle." },
    ]
  }
};
