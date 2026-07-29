export const LEVELS = {
  beginner: [
    // 🔵 Noun + Noun
    { prompt: "___ stop",    modifier: "bus",      nucleus: "stop",    full: "bus stop",      rule: "blue",  why: "🔵 Noun+Noun: tipo de parada. Modifier SINGULAR", focus: "type" },
    { prompt: "___ key",     modifier: "car",      nucleus: "key",     full: "car key",       rule: "blue",  why: "🔵 Noun+Noun: a qué pertenece la llave", focus: "object" },
    { prompt: "___ station", modifier: "fire",     nucleus: "station", full: "fire station",  rule: "blue",  why: "🔵 Noun+Noun: tipo de servicio", focus: "type" },
    { prompt: "___ shift",   modifier: "night",    nucleus: "shift",   full: "night shift",   rule: "blue",  why: "🔵 Noun+Noun: cuándo ocurre el turno", focus: "time" },
    // 🟢 -ing nominal
    { prompt: "___ pool",    modifier: "swimming", nucleus: "pool",    full: "swimming pool", rule: "green", why: "🟢 -ing nominal: la actividad define el propósito", focus: "purpose" },
    { prompt: "___ machine", modifier: "washing",  nucleus: "machine", full: "washing machine", rule: "green", why: "🟢 -ing nominal: función principal de la máquina", focus: "function" },
    { prompt: "___ bag",     modifier: "sleeping", nucleus: "bag",     full: "sleeping bag",  rule: "green", why: "🟢 -ing nominal: actividad para la que se usa", focus: "purpose" },
    // 🔴 Genitivo 's / of
    { prompt: "dog's ___",       modifier: "bone",  nucleus: "bone",  full: "dog's bone",    rule: "red", why: "🔴 Genitivo 's: el hueso pertenece al perro", focus: "possession" },
    { prompt: "cup of ___",      modifier: "tea",   nucleus: "cup",   full: "cup of tea",    rule: "red", why: "🔴 Partitivo 'of': una porción de algo incontable", focus: "partitive" },
    { prompt: "piece of ___",    modifier: "cake",  nucleus: "piece", full: "piece of cake", rule: "red", why: "🔴 Partitivo 'of': una porción de algo", focus: "partitive" },
  ],
  intermediate: [
    // 🔵 Noun + Noun
    { prompt: "___ park",    modifier: "car",   nucleus: "park", full: "car park",   rule: "blue",  why: "🔵 Noun+Noun: tipo de aparcamiento", focus: "type" },
    { prompt: "___ book",    modifier: "cook",  nucleus: "book", full: "cook book",  rule: "blue",  why: "🔵 Noun+Noun: 'cook' (oficio/persona) + book", focus: "type" },
    { prompt: "___ pad",     modifier: "note",  nucleus: "pad",  full: "note pad",   rule: "blue",  why: "🔵 Noun+Noun: propósito del bloc. Modifier SINGULAR", focus: "purpose" },
    { prompt: "___ room",    modifier: "board", nucleus: "room", full: "board room", rule: "blue",  why: "🔵 Noun+Noun: 'board' (junta directiva) define la sala", focus: "type" },
    // 🟢 -ing nominal
    { prompt: "___ space",   modifier: "parking", nucleus: "space",   full: "parking space",   rule: "green", why: "🟢 -ing nominal: actividad que define el espacio", focus: "activity" },
    { prompt: "___ license", modifier: "driving", nucleus: "license", full: "driving license", rule: "green", why: "🟢 -ing nominal UK: la actividad que autoriza", focus: "activity" },
    { prompt: "___ room",    modifier: "meeting", nucleus: "room",    full: "meeting room",    rule: "green", why: "🟢 -ing nominal: la actividad (reunirse) define la sala", focus: "activity" },
    // 🔴 Genitivo 's / of
    { prompt: "team's ___",     modifier: "decision", nucleus: "decision", full: "team's decision",  rule: "red", why: "🔴 Genitivo 's: propiedad del equipo", focus: "possession" },
    { prompt: "bottle of ___",  modifier: "water",    nucleus: "bottle",   full: "bottle of water",  rule: "red", why: "🔴 Partitivo 'of': contenedor + contenido medible", focus: "partitive" },
    { prompt: "slice of ___",   modifier: "pizza",    nucleus: "slice",    full: "slice of pizza",   rule: "red", why: "🔴 Partitivo 'of': porción de algo contable", focus: "partitive" },
  ],
  exceptions: [
    // Pares contrastantes: misma palabra base, distinto tipo
    { prompt: "___ wall",        modifier: "stone",       nucleus: "wall",        full: "stone wall",             rule: "blue",  why: "🔵 Noun+Noun: material directo (neutro)", focus: "material" },
    { prompt: "wall of ___",     modifier: "stone",       nucleus: "wall",        full: "wall of stone",          rule: "red",   why: "🔴 'of' énfasis/tono literario", focus: "emphasis" },
    { prompt: "___ engineer",    modifier: "software",    nucleus: "engineer",    full: "software engineer",      rule: "blue",  why: "🔵 Noun+Noun: 'software' define el dominio del rol", focus: "person" },
    { prompt: "___ engineering", modifier: "software",    nucleus: "engineering", full: "software engineering",   rule: "green", why: "🟢 -ing nominal invertida: -ing es el NÚCLEO", focus: "discipline" },
    { prompt: "manager of ___",  modifier: "engineering", nucleus: "manager",     full: "manager of engineering", rule: "red",   why: "🔴 'of' para roles+disciplinas abstractas (formal)", focus: "role" },
    { prompt: "___ policy",      modifier: "company",     nucleus: "policy",      full: "company policy",         rule: "blue",  why: "🔵 Noun+Noun: dominio general (tipo empresa)", focus: "domain" },
    { prompt: "company's ___",   modifier: "profit",      nucleus: "profit",      full: "company's profit",       rule: "red",   why: "🔴 Genitivo 's: la ganancia pertenece a la empresa", focus: "possession" },
    { prompt: "___ room",        modifier: "dining",      nucleus: "room",        full: "dining room",            rule: "green", why: "🟢 -ing nominal: actividad habitual del espacio", focus: "activity" },
    { prompt: "___ shop",        modifier: "shoe",        nucleus: "shop",        full: "shoe shop",              rule: "blue",  why: "🔵 REGLA SINGULAR: modifier SIEMPRE en singular", focus: "singular" },
    { prompt: "___ glass",       modifier: "wine",        nucleus: "glass",       full: "wine glass",             rule: "blue",  why: "🔵 Noun+Noun: tipo de copa (por contenido habitual)", focus: "type" },
  ],
  god: [
    // 🔵 Noun + Noun — excepciones de pluralización y stacks
    { prompt: "senior ___ engineer",  modifier: "software",   nucleus: "engineer", full: "senior software engineer",  rule: "blue",  why: "🔵 Noun+Noun en stack: 'software' modifica 'engineer'", focus: "title" },
    { prompt: "chief ___ officer",    modifier: "technology", nucleus: "officer",  full: "chief technology officer",  rule: "blue",  why: "🔵 Noun+Noun: 'technology' define el dominio ejecutivo", focus: "title" },
    { prompt: "___ car",              modifier: "sports",     nucleus: "car",      full: "sports car",                rule: "blue",  why: "🔵 EXCEPCIÓN regla singular: 'sports' plural lexicalizado", focus: "singular-exception" },
    { prompt: "___ account",          modifier: "savings",    nucleus: "account",  full: "savings account",           rule: "blue",  why: "🔵 EXCEPCIÓN regla singular: 'savings' permanece plural", focus: "singular-exception" },
    // 🟢 -ing nominal — roles avanzados
    { prompt: "___ director",  modifier: "engineering", nucleus: "director", full: "engineering director", rule: "green", why: "🟢 -ing nominal: la disciplina lidera el rol", focus: "title" },
    { prompt: "___ list",      modifier: "waiting",     nucleus: "list",     full: "waiting list",         rule: "green", why: "🟢 -ing nominal: actividad que define la lista", focus: "activity" },
    // 🔴 Genitivo 's / of — títulos ejecutivos y expresiones formales
    { prompt: "head of ___",      modifier: "engineering", nucleus: "head",     full: "head of engineering",      rule: "red",   why: "🔴 'of' para jefatura+disciplina abstracta (formal)", focus: "hierarchy" },
    { prompt: "VP of ___",        modifier: "product",     nucleus: "VP",       full: "VP of product",            rule: "red",   why: "🔴 'of' en títulos ejecutivos con dominio abstracto", focus: "title" },
    { prompt: "board of ___",     modifier: "directors",   nucleus: "board",    full: "board of directors",       rule: "red",   why: "🔴 'of' fijo: órgano compuesto por personas", focus: "composition" },
    { prompt: "master's ___",     modifier: "degree",      nucleus: "degree",   full: "master's degree",          rule: "red",   why: "🔴 Genitivo 's fosilizado en títulos académicos", focus: "possession" },
  ],
};

export const RULE_COLORS_LIGHT = {
  red:   { idle: "#FFECEC", stroke: "#FF6B6B", active: "#FFCECE" },
  blue:  { idle: "#E4F0FF", stroke: "#4A90D9", active: "#C2DCFF" },
  green: { idle: "#E2FAF0", stroke: "#3DBE7A", active: "#B8F0D6" },
};
export const RULE_COLORS_DARK = {
  red:   { idle: "#5c2a2a", stroke: "#FF6B6B", active: "#803030" },
  blue:  { idle: "#1e3a5f", stroke: "#4A90D9", active: "#2a4f7a" },
  green: { idle: "#1e4a35", stroke: "#3DBE7A", active: "#2a5f45" },
};
