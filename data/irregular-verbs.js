/**
 * HubFlow — Irregular Verbs Data
 * Categories: Common (A2), Intermediate (B1), Advanced (B2)
 * Each entry: base form, past simple, past participle, translation ES.
 * `ipa`/`pastIpa`/`ppIpa`: pronunciación americana (rótica) de cada forma —
 * antes solo existía `ipa` (base), y la tarjeta de Study solo mostraba esa,
 * dejando past/p.part. sin pronunciación. 2026-08-24.
 */

export const VERBS = [
  // ─── COMMON (A2) ───
  { base: "be", ipa: "/biː/", past: "was/were", pastIpa: "/wʌz, wɜr/", pp: "been", ppIpa: "/bɪn/", es: "ser/estar", cat: "common" },
  { base: "have", ipa: "/hæv/", past: "had", pastIpa: "/hæd/", pp: "had", ppIpa: "/hæd/", es: "tener", cat: "common" },
  { base: "do", ipa: "/duː/", past: "did", pastIpa: "/dɪd/", pp: "done", ppIpa: "/dʌn/", es: "hacer", cat: "common" },
  { base: "say", ipa: "/seɪ/", past: "said", pastIpa: "/sɛd/", pp: "said", ppIpa: "/sɛd/", es: "decir", cat: "common" },
  { base: "go", ipa: "/ɡoʊ/", past: "went", pastIpa: "/wɛnt/", pp: "gone", ppIpa: "/ɡɔːn/", es: "ir", cat: "common" },
  { base: "get", ipa: "/ɡɛt/", past: "got", pastIpa: "/ɡɑt/", pp: "got/gotten", ppIpa: "/ɡɑt, ˈɡɑtən/", es: "obtener", cat: "common" },
  { base: "make", ipa: "/meɪk/", past: "made", pastIpa: "/meɪd/", pp: "made", ppIpa: "/meɪd/", es: "hacer/fabricar", cat: "common" },
  { base: "come", ipa: "/kʌm/", past: "came", pastIpa: "/keɪm/", pp: "come", ppIpa: "/kʌm/", es: "venir", cat: "common" },
  { base: "know", ipa: "/noʊ/", past: "knew", pastIpa: "/nuː/", pp: "known", ppIpa: "/noʊn/", es: "saber/conocer", cat: "common" },
  { base: "take", ipa: "/teɪk/", past: "took", pastIpa: "/tʊk/", pp: "taken", ppIpa: "/ˈteɪkən/", es: "tomar", cat: "common" },
  { base: "see", ipa: "/siː/", past: "saw", pastIpa: "/sɔː/", pp: "seen", ppIpa: "/siːn/", es: "ver", cat: "common" },
  { base: "think", ipa: "/θɪŋk/", past: "thought", pastIpa: "/θɔːt/", pp: "thought", ppIpa: "/θɔːt/", es: "pensar", cat: "common" },
  { base: "give", ipa: "/ɡɪv/", past: "gave", pastIpa: "/ɡeɪv/", pp: "given", ppIpa: "/ˈɡɪvən/", es: "dar", cat: "common" },
  { base: "find", ipa: "/faɪnd/", past: "found", pastIpa: "/faʊnd/", pp: "found", ppIpa: "/faʊnd/", es: "encontrar", cat: "common" },
  { base: "tell", ipa: "/tɛl/", past: "told", pastIpa: "/toʊld/", pp: "told", ppIpa: "/toʊld/", es: "decir/contar", cat: "common" },
  { base: "become", ipa: "/bɪˈkʌm/", past: "became", pastIpa: "/bɪˈkeɪm/", pp: "become", ppIpa: "/bɪˈkʌm/", es: "convertirse", cat: "common" },
  { base: "leave", ipa: "/liːv/", past: "left", pastIpa: "/lɛft/", pp: "left", ppIpa: "/lɛft/", es: "salir/dejar", cat: "common" },
  { base: "put", ipa: "/pʊt/", past: "put", pastIpa: "/pʊt/", pp: "put", ppIpa: "/pʊt/", es: "poner", cat: "common" },
  { base: "run", ipa: "/rʌn/", past: "ran", pastIpa: "/ræn/", pp: "run", ppIpa: "/rʌn/", es: "correr", cat: "common" },
  { base: "eat", ipa: "/iːt/", past: "ate", pastIpa: "/eɪt/", pp: "eaten", ppIpa: "/ˈiːtən/", es: "comer", cat: "common" },

  // ─── INTERMEDIATE (B1) ───
  { base: "begin", ipa: "/bɪˈɡɪn/", past: "began", pastIpa: "/bɪˈɡæn/", pp: "begun", ppIpa: "/bɪˈɡʌn/", es: "comenzar", cat: "intermediate" },
  { base: "break", ipa: "/breɪk/", past: "broke", pastIpa: "/broʊk/", pp: "broken", ppIpa: "/ˈbroʊkən/", es: "romper", cat: "intermediate" },
  { base: "bring", ipa: "/brɪŋ/", past: "brought", pastIpa: "/brɔːt/", pp: "brought", ppIpa: "/brɔːt/", es: "traer", cat: "intermediate" },
  { base: "build", ipa: "/bɪld/", past: "built", pastIpa: "/bɪlt/", pp: "built", ppIpa: "/bɪlt/", es: "construir", cat: "intermediate" },
  { base: "catch", ipa: "/kætʃ/", past: "caught", pastIpa: "/kɔːt/", pp: "caught", ppIpa: "/kɔːt/", es: "atrapar", cat: "intermediate" },
  { base: "choose", ipa: "/tʃuːz/", past: "chose", pastIpa: "/tʃoʊz/", pp: "chosen", ppIpa: "/ˈtʃoʊzən/", es: "elegir", cat: "intermediate" },
  { base: "cut", ipa: "/kʌt/", past: "cut", pastIpa: "/kʌt/", pp: "cut", ppIpa: "/kʌt/", es: "cortar", cat: "intermediate" },
  { base: "draw", ipa: "/drɔː/", past: "drew", pastIpa: "/druː/", pp: "drawn", ppIpa: "/drɔːn/", es: "dibujar", cat: "intermediate" },
  { base: "drive", ipa: "/draɪv/", past: "drove", pastIpa: "/droʊv/", pp: "driven", ppIpa: "/ˈdrɪvən/", es: "conducir", cat: "intermediate" },
  { base: "fall", ipa: "/fɔːl/", past: "fell", pastIpa: "/fɛl/", pp: "fallen", ppIpa: "/ˈfɔːlən/", es: "caer", cat: "intermediate" },
  { base: "feel", ipa: "/fiːl/", past: "felt", pastIpa: "/fɛlt/", pp: "felt", ppIpa: "/fɛlt/", es: "sentir", cat: "intermediate" },
  { base: "fly", ipa: "/flaɪ/", past: "flew", pastIpa: "/fluː/", pp: "flown", ppIpa: "/floʊn/", es: "volar", cat: "intermediate" },
  { base: "forget", ipa: "/fərˈɡɛt/", past: "forgot", pastIpa: "/fərˈɡɑt/", pp: "forgotten", ppIpa: "/fərˈɡɑtən/", es: "olvidar", cat: "intermediate" },
  { base: "grow", ipa: "/ɡroʊ/", past: "grew", pastIpa: "/ɡruː/", pp: "grown", ppIpa: "/ɡroʊn/", es: "crecer", cat: "intermediate" },
  { base: "hear", ipa: "/hɪr/", past: "heard", pastIpa: "/hɜrd/", pp: "heard", ppIpa: "/hɜrd/", es: "oír", cat: "intermediate" },
  { base: "hide", ipa: "/haɪd/", past: "hid", pastIpa: "/hɪd/", pp: "hidden", ppIpa: "/ˈhɪdən/", es: "esconder", cat: "intermediate" },
  { base: "hold", ipa: "/hoʊld/", past: "held", pastIpa: "/hɛld/", pp: "held", ppIpa: "/hɛld/", es: "sostener", cat: "intermediate" },
  { base: "keep", ipa: "/kiːp/", past: "kept", pastIpa: "/kɛpt/", pp: "kept", ppIpa: "/kɛpt/", es: "mantener", cat: "intermediate" },
  { base: "lead", ipa: "/liːd/", past: "led", pastIpa: "/lɛd/", pp: "led", ppIpa: "/lɛd/", es: "liderar", cat: "intermediate" },
  { base: "learn", ipa: "/lɜːrn/", past: "learnt", pastIpa: "/lɜrnt/", pp: "learnt", ppIpa: "/lɜrnt/", es: "aprender", cat: "intermediate" },

  // ─── ADVANCED (B2) ───
  { base: "arise", ipa: "/əˈraɪz/", past: "arose", pastIpa: "/əˈroʊz/", pp: "arisen", ppIpa: "/əˈrɪzən/", es: "surgir", cat: "advanced" },
  { base: "bear", ipa: "/bɛr/", past: "bore", pastIpa: "/bɔːr/", pp: "borne", ppIpa: "/bɔːrn/", es: "soportar/cargar", cat: "advanced" },
  { base: "bind", ipa: "/baɪnd/", past: "bound", pastIpa: "/baʊnd/", pp: "bound", ppIpa: "/baʊnd/", es: "atar/vincular", cat: "advanced" },
  { base: "blow", ipa: "/bloʊ/", past: "blew", pastIpa: "/bluː/", pp: "blown", ppIpa: "/bloʊn/", es: "soplar", cat: "advanced" },
  { base: "breed", ipa: "/briːd/", past: "bred", pastIpa: "/brɛd/", pp: "bred", ppIpa: "/brɛd/", es: "criar/reproducir", cat: "advanced" },
  { base: "cast", ipa: "/kæst/", past: "cast", pastIpa: "/kæst/", pp: "cast", ppIpa: "/kæst/", es: "lanzar/emitir", cat: "advanced" },
  { base: "cling", ipa: "/klɪŋ/", past: "clung", pastIpa: "/klʌŋ/", pp: "clung", ppIpa: "/klʌŋ/", es: "aferrarse", cat: "advanced" },
  { base: "creep", ipa: "/kriːp/", past: "crept", pastIpa: "/krɛpt/", pp: "crept", ppIpa: "/krɛpt/", es: "arrastrarse", cat: "advanced" },
  { base: "dig", ipa: "/dɪɡ/", past: "dug", pastIpa: "/dʌɡ/", pp: "dug", ppIpa: "/dʌɡ/", es: "cavar", cat: "advanced" },
  { base: "dwell", ipa: "/dwɛl/", past: "dwelt", pastIpa: "/dwɛlt/", pp: "dwelt", ppIpa: "/dwɛlt/", es: "habitar", cat: "advanced" },
  { base: "flee", ipa: "/fliː/", past: "fled", pastIpa: "/flɛd/", pp: "fled", ppIpa: "/flɛd/", es: "huir", cat: "advanced" },
  { base: "forbid", ipa: "/fərˈbɪd/", past: "forbade", pastIpa: "/fərˈbeɪd/", pp: "forbidden", ppIpa: "/fərˈbɪdən/", es: "prohibir", cat: "advanced" },
  { base: "forsake", ipa: "/fɔːrˈseɪk/", past: "forsook", pastIpa: "/fərˈsʊk/", pp: "forsaken", ppIpa: "/fərˈseɪkən/", es: "abandonar", cat: "advanced" },
  { base: "grind", ipa: "/ɡraɪnd/", past: "ground", pastIpa: "/ɡraʊnd/", pp: "ground", ppIpa: "/ɡraʊnd/", es: "moler", cat: "advanced" },
  { base: "leap", ipa: "/liːp/", past: "leapt", pastIpa: "/lɛpt/", pp: "leapt", ppIpa: "/lɛpt/", es: "saltar", cat: "advanced" },
  { base: "lend", ipa: "/lɛnd/", past: "lent", pastIpa: "/lɛnt/", pp: "lent", ppIpa: "/lɛnt/", es: "prestar", cat: "advanced" },
  { base: "overcome", ipa: "/ˌoʊvərˈkʌm/", past: "overcame", pastIpa: "/ˌoʊvərˈkeɪm/", pp: "overcome", ppIpa: "/ˌoʊvərˈkʌm/", es: "superar", cat: "advanced" },
  { base: "seek", ipa: "/siːk/", past: "sought", pastIpa: "/sɔːt/", pp: "sought", ppIpa: "/sɔːt/", es: "buscar", cat: "advanced" },
  { base: "shake", ipa: "/ʃeɪk/", past: "shook", pastIpa: "/ʃʊk/", pp: "shaken", ppIpa: "/ˈʃeɪkən/", es: "sacudir", cat: "advanced" },
  { base: "shrink", ipa: "/ʃrɪŋk/", past: "shrank", pastIpa: "/ʃræŋk/", pp: "shrunk", ppIpa: "/ʃrʌŋk/", es: "encoger", cat: "advanced" },
];
