export const LEVELS = {
  beginner: [
    // 🔵 Noun + Noun (6)
    { prompt: "___ stop",    modifier: "bus",      nucleus: "stop",    full: "bus stop",      rule: "blue",  why: "🔵 Noun+Noun: tipo de parada. Modifier SINGULAR", focus: "type" },
    { prompt: "___ key",     modifier: "car",      nucleus: "key",     full: "car key",       rule: "blue",  why: "🔵 Noun+Noun: a qué pertenece la llave", focus: "object" },
    { prompt: "___ station", modifier: "fire",     nucleus: "station", full: "fire station",  rule: "blue",  why: "🔵 Noun+Noun: tipo de servicio", focus: "type" },
    { prompt: "___ shift",   modifier: "night",    nucleus: "shift",   full: "night shift",   rule: "blue",  why: "🔵 Noun+Noun: cuándo ocurre el turno", focus: "time" },
    // 🟢 -ing nominal (5)
    { prompt: "___ pool",    modifier: "swimming", nucleus: "pool",    full: "swimming pool", rule: "green", why: "🟢 -ing nominal: la actividad define el propósito", focus: "purpose" },
    { prompt: "___ shoes",   modifier: "running",  nucleus: "shoes",   full: "running shoes", rule: "green", why: "🟢 -ing nominal: actividad para la que están diseñados", focus: "activity" },
    { prompt: "___ machine", modifier: "washing",  nucleus: "machine", full: "washing machine", rule: "green", why: "🟢 -ing nominal: función principal de la máquina", focus: "function" },
    { prompt: "___ class",   modifier: "cooking",  nucleus: "class",   full: "cooking class", rule: "green", why: "🟢 -ing nominal: la disciplina define la clase", focus: "activity" },
    { prompt: "___ bag",     modifier: "sleeping", nucleus: "bag",     full: "sleeping bag",  rule: "green", why: "🟢 -ing nominal: actividad para la que se usa", focus: "purpose" },
    // 🔴 Genitivo 's / of (5)
    { prompt: "dog's ___",       modifier: "bone",     nucleus: "bone",     full: "dog's bone",       rule: "red", why: "🔴 Genitivo 's: el hueso pertenece al perro", focus: "possession" },
    { prompt: "cup of ___",      modifier: "tea",      nucleus: "cup",      full: "cup of tea",       rule: "red", why: "🔴 Partitivo 'of': una porción de algo incontable", focus: "partitive" },
    { prompt: "children's ___",  modifier: "toys",     nucleus: "toys",     full: "children's toys",  rule: "red", why: "🔴 Genitivo 's plural irregular: children+'s", focus: "possession" },
    { prompt: "piece of ___",    modifier: "cake",     nucleus: "piece",    full: "piece of cake",    rule: "red", why: "🔴 Partitivo 'of': una porción de algo", focus: "partitive" },
    { prompt: "teacher's ___",   modifier: "desk",     nucleus: "desk",     full: "teacher's desk",   rule: "red", why: "🔴 Genitivo 's: el escritorio pertenece al profesor", focus: "possession" },
  ],
  intermediate: [
    // 🔵 Noun + Noun (5)
    { prompt: "___ park",    modifier: "car",      nucleus: "park",    full: "car park",      rule: "blue",  why: "🔵 Noun+Noun: tipo de aparcamiento", focus: "type" },
    { prompt: "___ book",    modifier: "cook",     nucleus: "book",    full: "cook book",     rule: "blue",  why: "🔵 Noun+Noun: 'cook' (oficio/persona) + book", focus: "type" },
    { prompt: "___ pad",     modifier: "note",     nucleus: "pad",     full: "note pad",      rule: "blue",  why: "🔵 Noun+Noun: propósito del bloc. Modifier SINGULAR", focus: "purpose" },
    { prompt: "___ track",   modifier: "sprint",   nucleus: "track",   full: "sprint track",  rule: "blue",  why: "🔵 Noun+Noun: 'sprint' define el tipo de pista", focus: "type" },
    { prompt: "___ room",    modifier: "board",    nucleus: "room",    full: "board room",    rule: "blue",  why: "🔵 Noun+Noun: 'board' (junta directiva) define la sala", focus: "type" },
    // 🟢 -ing nominal (6)
    { prompt: "___ space",   modifier: "parking",  nucleus: "space",   full: "parking space",   rule: "green", why: "🟢 -ing nominal: actividad que define el espacio", focus: "activity" },
    { prompt: "___ license", modifier: "driving",  nucleus: "license", full: "driving license", rule: "green", why: "🟢 -ing nominal UK: la actividad que autoriza", focus: "activity" },
    { prompt: "___ desk",    modifier: "writing",  nucleus: "desk",    full: "writing desk",    rule: "green", why: "🟢 -ing nominal: actividad principal del mueble", focus: "activity" },
    { prompt: "___ room",    modifier: "meeting",  nucleus: "room",    full: "meeting room",    rule: "green", why: "🟢 -ing nominal: la actividad (reunirse) define la sala", focus: "activity" },
    { prompt: "___ oil",     modifier: "cooking",  nucleus: "oil",     full: "cooking oil",     rule: "green", why: "🟢 -ing nominal: propósito funcional del aceite", focus: "purpose" },
    // 🔴 Genitivo 's / of (5)
    { prompt: "team's ___",     modifier: "decision",  nucleus: "decision",  full: "team's decision",   rule: "red", why: "🔴 Genitivo 's: propiedad del equipo", focus: "possession" },
    { prompt: "cup of ___",     modifier: "coffee",    nucleus: "cup",       full: "cup of coffee",     rule: "red", why: "🔴 Partitivo 'of': una porción de algo incontable", focus: "partitive" },
    { prompt: "bottle of ___",  modifier: "water",     nucleus: "bottle",    full: "bottle of water",   rule: "red", why: "🔴 Partitivo 'of': contenedor + contenido medible", focus: "partitive" },
    { prompt: "company's ___",  modifier: "policy",    nucleus: "policy",    full: "company's policy",  rule: "red", why: "🔴 Genitivo 's: la política pertenece a la empresa", focus: "possession" },
    { prompt: "slice of ___",   modifier: "pizza",     nucleus: "slice",     full: "slice of pizza",    rule: "red", why: "🔴 Partitivo 'of': porción de algo contable", focus: "partitive" },
  ],
  exceptions: [
    // Pares contrastantes: misma palabra base, distinto tipo
    { prompt: "___ wall",       modifier: "stone",       nucleus: "wall",        full: "stone wall",             rule: "blue",  why: "🔵 Noun+Noun: material directo (neutro)", focus: "material" },
    { prompt: "wall of ___",    modifier: "stone",       nucleus: "wall",        full: "wall of stone",          rule: "red",   why: "🔴 'of' énfasis/tono literario", focus: "emphasis" },
    { prompt: "___ store",      modifier: "book",        nucleus: "store",       full: "book store",             rule: "blue",  why: "🔵 Noun+Noun: tipo de tienda. Modifier SINGULAR", focus: "type" },
    { prompt: "___ gear",       modifier: "fishing",     nucleus: "gear",        full: "fishing gear",           rule: "green", why: "🟢 -ing nominal: actividad para la que se usa el equipo", focus: "activity" },
    { prompt: "___ engineer",   modifier: "software",    nucleus: "engineer",    full: "software engineer",      rule: "blue",  why: "🔵 Noun+Noun: 'software' define el dominio del rol", focus: "person" },
    { prompt: "___ engineering", modifier: "software",   nucleus: "engineering", full: "software engineering",   rule: "green", why: "🟢 -ing nominal invertida: -ing es el NÚCLEO", focus: "discipline" },
    { prompt: "manager of ___", modifier: "engineering", nucleus: "manager",     full: "manager of engineering", rule: "red",   why: "🔴 'of' para roles+disciplinas abstractas (formal)", focus: "role" },
    { prompt: "___ policy",     modifier: "company",     nucleus: "policy",      full: "company policy",         rule: "blue",  why: "🔵 Noun+Noun: dominio general (tipo empresa)", focus: "domain" },
    { prompt: "company's ___",  modifier: "profit",      nucleus: "profit",      full: "company's profit",       rule: "red",   why: "🔴 Genitivo 's: la ganancia pertenece a la empresa", focus: "possession" },
    { prompt: "___ room",       modifier: "dining",      nucleus: "room",        full: "dining room",            rule: "green", why: "🟢 -ing nominal: actividad habitual del espacio", focus: "activity" },
    { prompt: "___ shop",       modifier: "shoe",        nucleus: "shop",        full: "shoe shop",              rule: "blue",  why: "🔵 REGLA SINGULAR: modifier SIEMPRE en singular", focus: "singular" },
    { prompt: "___ line",       modifier: "finishing",    nucleus: "line",        full: "finishing line",          rule: "green", why: "🟢 -ing nominal: la acción que define la línea", focus: "activity" },
    { prompt: "children's ___", modifier: "hospital",    nucleus: "hospital",    full: "children's hospital",    rule: "red",   why: "🔴 Genitivo 's plural irregular: children+'s", focus: "possession" },
    { prompt: "___ hat",        modifier: "cowboy",      nucleus: "hat",         full: "cowboy hat",             rule: "blue",  why: "🔵 Noun+Noun: tipo de persona que lo usa", focus: "type" },
  ],
  god: [
    // 🔵 Noun + Noun (6) — incluye excepciones de pluralización
    { prompt: "senior ___ engineer",  modifier: "software",    nucleus: "engineer",    full: "senior software engineer",    rule: "blue",  why: "🔵 Noun+Noun en stack: 'software' modifica 'engineer'", focus: "title" },
    { prompt: "chief ___ officer",    modifier: "technology",  nucleus: "officer",     full: "chief technology officer",    rule: "blue",  why: "🔵 Noun+Noun: 'technology' define el dominio ejecutivo", focus: "title" },
    { prompt: "soft blue ___ house",  modifier: "brick",       nucleus: "house",       full: "soft blue brick house",       rule: "blue",  why: "🔵 Orden canónico: Opinión→Color→Material→Noun", focus: "order" },
    { prompt: "___ car",              modifier: "sports",      nucleus: "car",         full: "sports car",                  rule: "blue",  why: "🔵 EXCEPCIÓN regla singular: 'sports' plural lexicalizado", focus: "singular-exception" },
    { prompt: "___ account",          modifier: "savings",     nucleus: "account",     full: "savings account",             rule: "blue",  why: "🔵 EXCEPCIÓN regla singular: 'savings' permanece plural", focus: "singular-exception" },
    { prompt: "___ belt",             modifier: "seat",        nucleus: "belt",        full: "seat belt",                   rule: "blue",  why: "🔵 Noun+Noun: propósito (el asiento). Modifier SINGULAR", focus: "purpose" },
    // 🟢 -ing nominal (6) — roles y contextos avanzados
    { prompt: "___ board",            modifier: "diving",      nucleus: "board",       full: "diving board",                rule: "green", why: "🟢 -ing nominal: actividad del trampolín", focus: "activity" },
    { prompt: "___ director",         modifier: "engineering", nucleus: "director",    full: "engineering director",        rule: "green", why: "🟢 -ing nominal: la disciplina lidera el rol", focus: "title" },
    { prompt: "___ list",             modifier: "waiting",     nucleus: "list",        full: "waiting list",                rule: "green", why: "🟢 -ing nominal: actividad que define la lista", focus: "activity" },
    { prompt: "___ system",           modifier: "heating",     nucleus: "system",      full: "heating system",              rule: "green", why: "🟢 -ing nominal: función que define el sistema", focus: "function" },
    { prompt: "___ rod",              modifier: "fishing",     nucleus: "rod",         full: "fishing rod",                 rule: "green", why: "🟢 -ing nominal: actividad para la que se usa", focus: "activity" },
    // 🔴 Genitivo 's / of (6) — títulos ejecutivos y expresiones formales
    { prompt: "head of ___",          modifier: "engineering", nucleus: "head",        full: "head of engineering",         rule: "red",   why: "🔴 'of' para jefatura+disciplina abstracta (formal)", focus: "hierarchy" },
    { prompt: "VP of ___",            modifier: "product",     nucleus: "VP",          full: "VP of product",               rule: "red",   why: "🔴 'of' en títulos ejecutivos con dominio abstracto", focus: "title" },
    { prompt: "board of ___",         modifier: "directors",   nucleus: "board",       full: "board of directors",          rule: "red",   why: "🔴 'of' fijo: órgano compuesto por personas", focus: "composition" },
    { prompt: "driver's ___",         modifier: "license",     nucleus: "license",     full: "driver's license",            rule: "red",   why: "🔴 Genitivo 's (US): la licencia 'del' conductor", focus: "possession" },
    { prompt: "master's ___",         modifier: "degree",      nucleus: "degree",      full: "master's degree",             rule: "red",   why: "🔴 Genitivo 's fosilizado en títulos académicos", focus: "possession" },
    { prompt: "director of ___",      modifier: "operations",  nucleus: "director",    full: "director of operations",      rule: "red",   why: "🔴 'of' para rol ejecutivo + área funcional", focus: "hierarchy" },
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
