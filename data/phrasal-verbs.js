/**
 * HubFlow — Phrasal Verbs Data
 * Categories: Everyday (A2-B1), Work & Study (B1), Relationships (B1), Travel & Movement (B1-B2)
 * Each entry: verb + particle, meaning ES, example sentence, gap sentence for drill
 */

export const CATEGORIES = {
  everyday: {
    label: 'Everyday',
    icon: '🏠',
    items: [
      { verb: "wake up",     particle: "up",    base: "wake",    es: "despertarse",         example: "I wake up at 7 every morning.",            gap: "I ___ ___ at 7 every morning." },
      { verb: "clean up",    particle: "up",    base: "clean",   es: "limpiar",             example: "She cleans up her room every weekend.",    gap: "She ___ ___ her room every weekend." },
      { verb: "turn on",     particle: "on",    base: "turn",    es: "encender",            example: "Can you turn on the lights?",              gap: "Can you ___ ___ the lights?" },
      { verb: "turn off",    particle: "off",   base: "turn",    es: "apagar",              example: "Turn off the TV before bed.",              gap: "___ ___ the TV before bed." },
      { verb: "pick up",     particle: "up",    base: "pick",    es: "recoger / levantar",  example: "I'll pick up the kids from school.",       gap: "I'll ___ ___ the kids from school." },
      { verb: "put on",      particle: "on",    base: "put",     es: "ponerse (ropa)",      example: "Put on your jacket, it's cold.",           gap: "___ ___ your jacket, it's cold." },
      { verb: "take off",    particle: "off",   base: "take",    es: "quitarse (ropa)",     example: "Take off your shoes at the door.",         gap: "___ ___ your shoes at the door." },
      { verb: "throw away",  particle: "away",  base: "throw",   es: "tirar / botar",       example: "Don't throw away that box.",               gap: "Don't ___ ___ that box." },
      { verb: "look for",    particle: "for",   base: "look",    es: "buscar",              example: "I'm looking for my keys.",                 gap: "I'm ___ ___ my keys." },
      { verb: "find out",    particle: "out",   base: "find",    es: "descubrir / enterarse", example: "I found out the truth yesterday.",       gap: "I ___ ___ the truth yesterday." },
      { verb: "give up",     particle: "up",    base: "give",    es: "rendirse / dejar",    example: "Never give up on your dreams.",            gap: "Never ___ ___ on your dreams." },
      { verb: "come back",   particle: "back",  base: "come",    es: "volver / regresar",   example: "She'll come back tomorrow.",               gap: "She'll ___ ___ tomorrow." },
      { verb: "sit down",    particle: "down",  base: "sit",     es: "sentarse",            example: "Please sit down and relax.",               gap: "Please ___ ___ and relax." },
      { verb: "stand up",    particle: "up",    base: "stand",   es: "ponerse de pie",      example: "Stand up when the teacher enters.",        gap: "___ ___ when the teacher enters." },
      { verb: "go out",      particle: "out",   base: "go",      es: "salir",               example: "We're going out tonight.",                 gap: "We're ___ ___ tonight." },
      { verb: "run out",     particle: "out",   base: "run",     es: "quedarse sin",        example: "We've run out of milk.",                   gap: "We've ___ ___ of milk." },
      { verb: "hang up",     particle: "up",    base: "hang",    es: "colgar (teléfono)",   example: "She hung up without saying goodbye.",      gap: "She ___ ___ without saying goodbye." },
      { verb: "fill in",     particle: "in",    base: "fill",    es: "rellenar (formulario)", example: "Please fill in this form.",              gap: "Please ___ ___ this form." },
    ]
  },
  work: {
    label: 'Work & Study',
    icon: '💼',
    items: [
      { verb: "set up",      particle: "up",    base: "set",     es: "montar / configurar", example: "We need to set up the projector.",         gap: "We need to ___ ___ the projector." },
      { verb: "carry out",   particle: "out",   base: "carry",   es: "llevar a cabo",       example: "They carried out the experiment.",         gap: "They ___ ___ the experiment." },
      { verb: "look into",   particle: "into",  base: "look",    es: "investigar",          example: "We'll look into the issue.",               gap: "We'll ___ ___ the issue." },
      { verb: "point out",   particle: "out",   base: "point",   es: "señalar / indicar",   example: "She pointed out the error.",               gap: "She ___ ___ the error." },
      { verb: "figure out",  particle: "out",   base: "figure",  es: "resolver / descifrar", example: "I can't figure out this problem.",        gap: "I can't ___ ___ this problem." },
      { verb: "write down",  particle: "down",  base: "write",   es: "anotar / apuntar",    example: "Write down the instructions.",             gap: "___ ___ the instructions." },
      { verb: "hand in",     particle: "in",    base: "hand",    es: "entregar (tarea)",    example: "Hand in your essays by Friday.",           gap: "___ ___ your essays by Friday." },
      { verb: "put off",     particle: "off",   base: "put",     es: "posponer / aplazar",  example: "Don't put off the meeting again.",         gap: "Don't ___ ___ the meeting again." },
      { verb: "take on",     particle: "on",    base: "take",    es: "asumir / aceptar",    example: "She took on more responsibility.",         gap: "She ___ ___ more responsibility." },
      { verb: "bring up",    particle: "up",    base: "bring",   es: "mencionar / plantear", example: "He brought up an interesting point.",     gap: "He ___ ___ an interesting point." },
      { verb: "come up with", particle: "up with", base: "come", es: "idear / proponer",    example: "She came up with a great idea.",           gap: "She ___ ___ ___ a great idea." },
      { verb: "keep up with", particle: "up with", base: "keep", es: "mantenerse al día",   example: "It's hard to keep up with the news.",     gap: "It's hard to ___ ___ ___ the news." },
      { verb: "go over",     particle: "over",  base: "go",      es: "repasar / revisar",   example: "Let's go over the plan again.",            gap: "Let's ___ ___ the plan again." },
      { verb: "work out",    particle: "out",   base: "work",    es: "resolver / funcionar", example: "It'll work out in the end.",              gap: "It'll ___ ___ in the end." },
      { verb: "call off",    particle: "off",   base: "call",    es: "cancelar",            example: "They called off the event.",               gap: "They ___ ___ the event." },
      { verb: "turn down",   particle: "down",  base: "turn",    es: "rechazar",            example: "She turned down the job offer.",           gap: "She ___ ___ the job offer." },
    ]
  },
  relationships: {
    label: 'Relationships',
    icon: '❤️',
    items: [
      { verb: "get along",   particle: "along", base: "get",     es: "llevarse bien",       example: "They get along really well.",              gap: "They ___ ___ really well." },
      { verb: "break up",    particle: "up",    base: "break",   es: "romper / terminar",   example: "They broke up last month.",                gap: "They ___ ___ last month." },
      { verb: "make up",     particle: "up",    base: "make",    es: "reconciliarse",       example: "They argued but made up quickly.",         gap: "They argued but ___ ___ quickly." },
      { verb: "ask out",     particle: "out",   base: "ask",     es: "invitar a salir",     example: "He asked her out on a date.",              gap: "He ___ her ___ on a date." },
      { verb: "look after",  particle: "after", base: "look",    es: "cuidar de",           example: "She looks after her little sister.",       gap: "She ___ ___ her little sister." },
      { verb: "look up to",  particle: "up to", base: "look",    es: "admirar",             example: "I look up to my grandmother.",             gap: "I ___ ___ ___ my grandmother." },
      { verb: "let down",    particle: "down",  base: "let",     es: "decepcionar",         example: "Don't let me down.",                       gap: "Don't ___ me ___." },
      { verb: "fall out",    particle: "out",   base: "fall",    es: "pelearse / distanciarse", example: "They fell out over money.",            gap: "They ___ ___ over money." },
      { verb: "cheer up",    particle: "up",    base: "cheer",   es: "animar / alegrar",    example: "Cheer up! It's not that bad.",             gap: "___ ___! It's not that bad." },
      { verb: "grow up",     particle: "up",    base: "grow",    es: "crecer / madurar",    example: "She grew up in a small town.",             gap: "She ___ ___ in a small town." },
      { verb: "hang out",    particle: "out",   base: "hang",    es: "pasar el rato",       example: "We hang out every weekend.",               gap: "We ___ ___ every weekend." },
      { verb: "put up with", particle: "up with", base: "put",   es: "aguantar / tolerar",  example: "I can't put up with this noise.",          gap: "I can't ___ ___ ___ this noise." },
      { verb: "show off",    particle: "off",   base: "show",    es: "presumir / lucirse",  example: "He's always showing off.",                 gap: "He's always ___ ___." },
      { verb: "turn up",     particle: "up",    base: "turn",    es: "aparecer / presentarse", example: "She turned up late to the party.",      gap: "She ___ ___ late to the party." },
    ]
  },
  travel: {
    label: 'Travel',
    icon: '✈️',
    items: [
      { verb: "check in",    particle: "in",    base: "check",   es: "registrarse",         example: "We need to check in at the hotel.",        gap: "We need to ___ ___ at the hotel." },
      { verb: "check out",   particle: "out",   base: "check",   es: "hacer el check-out",  example: "Check out is at 11 a.m.",                  gap: "___ ___ is at 11 a.m." },
      { verb: "set off",     particle: "off",   base: "set",     es: "partir / emprender viaje", example: "We set off early in the morning.",    gap: "We ___ ___ early in the morning." },
      { verb: "take off",    particle: "off",   base: "take",    es: "despegar (avión)",    example: "The plane took off on time.",               gap: "The plane ___ ___ on time." },
      { verb: "get on",      particle: "on",    base: "get",     es: "subirse (transporte)", example: "We got on the bus at the station.",       gap: "We ___ ___ the bus at the station." },
      { verb: "get off",     particle: "off",   base: "get",     es: "bajarse (transporte)", example: "Get off at the next stop.",               gap: "___ ___ at the next stop." },
      { verb: "drop off",    particle: "off",   base: "drop",    es: "dejar (a alguien)",   example: "I'll drop you off at the airport.",        gap: "I'll ___ you ___ at the airport." },
      { verb: "pick up",     particle: "up",    base: "pick",    es: "recoger (a alguien)", example: "Can you pick me up at 5?",                 gap: "Can you ___ me ___ at 5?" },
      { verb: "slow down",   particle: "down",  base: "slow",    es: "reducir velocidad",   example: "Slow down, you're driving too fast.",      gap: "___ ___, you're driving too fast." },
      { verb: "speed up",    particle: "up",    base: "speed",   es: "acelerar",            example: "We need to speed up or we'll be late.",    gap: "We need to ___ ___ or we'll be late." },
      { verb: "pull over",   particle: "over",  base: "pull",    es: "orillarse / detenerse", example: "The police told him to pull over.",      gap: "The police told him to ___ ___." },
      { verb: "look around", particle: "around", base: "look",   es: "mirar alrededor / recorrer", example: "Let's look around the city.",      gap: "Let's ___ ___ the city." },
      { verb: "head off",    particle: "off",   base: "head",    es: "irse / dirigirse",    example: "We should head off before dark.",           gap: "We should ___ ___ before dark." },
      { verb: "stop over",   particle: "over",  base: "stop",    es: "hacer escala",        example: "We stopped over in Dubai.",                gap: "We ___ ___ in Dubai." },
    ]
  },
  getVerbs: {
    label: "'Get' Verbs",
    icon: '🎯',
    items: [
      { verb: "get up",      particle: "up",     base: "get", es: "levantarse",              example: "I get up at 6 every day.",              gap: "I ___ ___ at 6 every day." },
      { verb: "get on",      particle: "on",     base: "get", es: "llevarse bien / subirse",  example: "We get on really well.",                gap: "We ___ ___ really well." },
      { verb: "get by",      particle: "by",     base: "get", es: "arreglárselas",            example: "We get by on a small budget.",          gap: "We ___ ___ on a small budget." },
      { verb: "get over",    particle: "over",   base: "get", es: "superar (algo)",           example: "It took months to get over the flu.",   gap: "It took months to ___ ___ the flu." },
      { verb: "get through", particle: "through",base: "get", es: "lograr terminar / superar", example: "I don't know how I'll get through this week.", gap: "I don't know how I'll ___ ___ this week." },
      { verb: "get away",    particle: "away",   base: "get", es: "escaparse",                example: "We need to get away for the weekend.",  gap: "We need to ___ ___ for the weekend." },
      { verb: "get around",  particle: "around", base: "get", es: "moverse / evitar (un problema)", example: "It's easy to get around the city by bike.", gap: "It's easy to ___ ___ the city by bike." },
      { verb: "get back",    particle: "back",   base: "get", es: "regresar",                 example: "What time did you get back?",           gap: "What time did you ___ ___?" },
      { verb: "get down to", particle: "down to",base: "get", es: "ponerse en serio con algo", example: "Let's get down to business.",           gap: "Let's ___ ___ ___ business." },
      { verb: "get out of",  particle: "out of", base: "get", es: "librarse de (una obligación)", example: "He got out of doing the dishes.",     gap: "He ___ ___ ___ doing the dishes." },
      { verb: "get across",  particle: "across", base: "get", es: "hacer entender (una idea)", example: "I couldn't get my point across.",       gap: "I couldn't ___ my point ___." },
      { verb: "get together",particle: "together",base: "get",es: "reunirse",                 example: "Let's get together this weekend.",      gap: "Let's ___ ___ this weekend." },
    ]
  },
  food: {
    label: 'Food',
    icon: '🍽️',
    items: [
      { verb: "eat out",     particle: "out",   base: "eat",     es: "comer fuera",              example: "We eat out every Friday.",              gap: "We ___ ___ every Friday." },
      { verb: "dish up",     particle: "up",    base: "dish",    es: "servir (comida)",           example: "She dished up dinner for everyone.",    gap: "She ___ ___ dinner for everyone." },
      { verb: "warm up",     particle: "up",    base: "warm",    es: "calentar (comida)",         example: "Can you warm up the soup?",             gap: "Can you ___ ___ the soup?" },
      { verb: "eat up",      particle: "up",    base: "eat",     es: "comer todo",                example: "Eat up, it's getting cold!",            gap: "___ ___, it's getting cold!" },
      { verb: "wolf down",   particle: "down",  base: "wolf",    es: "devorar (comer rápido)",    example: "He wolfed down his lunch in five minutes.", gap: "He ___ ___ his lunch in five minutes." },
      { verb: "cut down on", particle: "down on",base: "cut",    es: "reducir (consumo)",         example: "I'm cutting down on sugar.",            gap: "I'm ___ ___ ___ sugar." },
      { verb: "fill up",     particle: "up",    base: "fill",    es: "llenarse (de comida)",      example: "That meal really filled me up.",        gap: "That meal really ___ me ___." },
      { verb: "polish off",  particle: "off",   base: "polish",  es: "terminarse (comida) rápido", example: "They polished off the whole pizza.",   gap: "They ___ ___ the whole pizza." },
      { verb: "live on",     particle: "on",    base: "live",    es: "alimentarse principalmente de", example: "Students often live on instant noodles.", gap: "Students often ___ ___ instant noodles." },
      { verb: "whip up",     particle: "up",    base: "whip",    es: "preparar algo rápido",      example: "She whipped up a quick dinner.",        gap: "She ___ ___ a quick dinner." },
    ]
  },
  turn: {
    label: "'Turn' Verbs",
    icon: '🔄',
    items: [
      { verb: "turn up",     particle: "up",   base: "turn", es: "aparecer / subir volumen",     example: "Turn up the music!",                 gap: "___ ___ the music!" },
      { verb: "turn down",   particle: "down", base: "turn", es: "rechazar / bajar volumen",     example: "Turn down the TV, please.",          gap: "___ ___ the TV, please." },
      { verb: "turn into",   particle: "into", base: "turn", es: "convertirse en",               example: "The caterpillar turned into a butterfly.", gap: "The caterpillar ___ ___ a butterfly." },
      { verb: "turn out",    particle: "out",  base: "turn", es: "resultar (ser)",               example: "The party turned out great.",        gap: "The party ___ ___ great." },
      { verb: "turn back",   particle: "back", base: "turn", es: "regresar / dar la vuelta",     example: "It's too dangerous, let's turn back.", gap: "It's too dangerous, let's ___ ___." },
      { verb: "turn over",   particle: "over", base: "turn", es: "voltear",                      example: "Turn over the pancake now.",         gap: "___ ___ the pancake now." },
      { verb: "turn away",   particle: "away", base: "turn", es: "rechazar la entrada a alguien", example: "They turned him away at the door.", gap: "They ___ him ___ at the door." },
      { verb: "turn against", particle: "against", base: "turn", es: "ponerse en contra de",   example: "His friends turned against him.",    gap: "His friends ___ ___ him." },
      { verb: "turn off",    particle: "off",  base: "turn", es: "apagar / desagradar",          example: "That comment really turned me off.", gap: "That comment really ___ me ___." },
      { verb: "turn to",     particle: "to",   base: "turn", es: "recurrir a",                   example: "She turned to her sister for advice.", gap: "She ___ ___ her sister for advice." },
    ]
  },
  advanced: {
    label: 'Advanced',
    icon: '🚀',
    items: [
      { verb: "boil down to",  particle: "down to", base: "boil",  es: "reducirse a (la esencia)",  example: "It all boils down to trust.",         gap: "It all ___ ___ ___ trust." },
      { verb: "chip in",       particle: "in",      base: "chip",  es: "contribuir (dinero/ayuda)",  example: "We all chipped in for the gift.",     gap: "We all ___ ___ for the gift." },
      { verb: "iron out",      particle: "out",     base: "iron",  es: "resolver (detalles/problemas)", example: "We ironed out the details.",       gap: "We ___ ___ the details." },
      { verb: "hold off",      particle: "off",     base: "hold",  es: "posponer / esperar",         example: "Let's hold off on the decision.",     gap: "Let's ___ ___ on the decision." },
      { verb: "own up to",     particle: "up to",   base: "own",   es: "admitir (una culpa)",         example: "He finally owned up to his mistake.", gap: "He finally ___ ___ ___ his mistake." },
      { verb: "brush up on",   particle: "up on",   base: "brush", es: "repasar / refrescar (una habilidad)", example: "I need to brush up on my French.", gap: "I need to ___ ___ ___ my French." },
      { verb: "stem from",     particle: "from",    base: "stem",  es: "originarse de",               example: "Her fear stems from a childhood accident.", gap: "Her fear ___ ___ a childhood accident." },
      { verb: "single out",    particle: "out",     base: "single",es: "señalar / destacar a alguien", example: "The teacher singled her out for praise.", gap: "The teacher ___ her ___ for praise." },
      { verb: "weigh up",      particle: "up",      base: "weigh", es: "sopesar (opciones)",          example: "We need to weigh up our options.",    gap: "We need to ___ ___ our options." },
      { verb: "branch out",    particle: "out",     base: "branch",es: "diversificarse / expandirse", example: "The company is branching out into new markets.", gap: "The company is ___ ___ into new markets." },
      { verb: "hold back",     particle: "back",    base: "hold",  es: "contenerse / reprimir",       example: "She held back her tears.",            gap: "She ___ ___ her tears." },
      { verb: "live up to",    particle: "up to",   base: "live",  es: "estar a la altura de",        example: "The film lived up to the hype.",      gap: "The film ___ ___ ___ the hype." },
    ]
  }
};
