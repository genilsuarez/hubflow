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
      { word_a: "full", word_b: "fool", ipa_a: "/fʊl/", ipa_b: "/fuːl/", sound: "/ʊ/ vs /uː/", es: "lleno / tonto", tip: "/ʊ/ is short. /uː/ is long — round your lips more." },
      { word_a: "cat", word_b: "cut", ipa_a: "/kæt/", ipa_b: "/kʌt/", sound: "/æ/ vs /ʌ/", es: "gato / cortar", tip: "/æ/ mouth open wide. /ʌ/ mouth more relaxed, central." },
      { word_a: "bad", word_b: "bed", ipa_a: "/bæd/", ipa_b: "/bed/", sound: "/æ/ vs /e/", es: "malo / cama", tip: "Drop your jaw more for /æ/ ('bad')." },
      { word_a: "cot", word_b: "caught", ipa_a: "/kɒt/", ipa_b: "/kɔːt/", sound: "/ɒ/ vs /ɔː/", es: "cuna / atrapó", tip: "/ɒ/ short. /ɔː/ long and more open." },
    ]
  },
  'consonant-pairs': {
    label: 'Consonant Pairs',
    icon: '👂',
    description: 'Distinguish voiced/voiceless consonants',
    items: [
      { word_a: "fan", word_b: "van", ipa_a: "/fæn/", ipa_b: "/væn/", sound: "/f/ vs /v/", es: "ventilador / furgoneta", tip: "/f/ voiceless. /v/ voiced. Both use upper teeth on lower lip." },
      { word_a: "think", word_b: "this", ipa_a: "/θɪŋk/", ipa_b: "/ðɪs/", sound: "/θ/ vs /ð/", es: "pensar / esto", tip: "/θ/ voiceless 'th'. /ð/ voiced 'th'. Same tongue position." },
      { word_a: "sink", word_b: "zinc", ipa_a: "/sɪŋk/", ipa_b: "/zɪŋk/", sound: "/s/ vs /z/", es: "lavabo / zinc", tip: "/s/ voiceless hiss. /z/ voiced buzz." },
      { word_a: "rich", word_b: "ridge", ipa_a: "/rɪtʃ/", ipa_b: "/rɪdʒ/", sound: "/tʃ/ vs /dʒ/", es: "rico / cresta", tip: "/tʃ/ voiceless 'ch'. /dʒ/ voiced 'j'." },
      { word_a: "light", word_b: "right", ipa_a: "/laɪt/", ipa_b: "/raɪt/", sound: "/l/ vs /r/", es: "luz / derecha", tip: "/l/ tongue tip touches roof. /r/ tongue curls back, no contact." },
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
    ]
  },
  'silent-letters': {
    label: 'Silent Letters',
    icon: '🤫',
    description: 'Identify letters that are not pronounced',
    items: [
      { word: "knife", ipa: "/naɪf/", silent: "k", rule: "Silent K before N", es: "cuchillo", tip: "K is always silent before N: know, knee, knock." },
      { word: "write", ipa: "/raɪt/", silent: "w", rule: "Silent W before R", es: "escribir", tip: "W is silent before R: wrong, wrap, wrist." },
      { word: "listen", ipa: "/ˈlɪsən/", silent: "t", rule: "Silent T after S", es: "escuchar", tip: "Silent T: listen, castle, whistle, fasten." },
      { word: "doubt", ipa: "/daʊt/", silent: "b", rule: "Silent B after M / before T", es: "duda", tip: "Silent B: doubt, debt, climb, bomb, thumb." },
      { word: "island", ipa: "/ˈaɪlənd/", silent: "s", rule: "Silent S in 'island'", es: "isla", tip: "The S in 'island' is silent — /ˈaɪlənd/." },
    ]
  }
};
