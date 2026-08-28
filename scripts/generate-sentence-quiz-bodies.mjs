#!/usr/bin/env node
// Normaliza el <body> de las páginas que usan sentence-quiz-engine.js —
// hoy 59 de las 150 de exercises/, y de lejos las más homogéneas (ver
// docs/pendientes.md — "HubFlow: templating del <body>"). Verificado
// programáticamente contra las 59 páginas existentes antes de escribir este
// script: el <body> completo es idéntico byte a byte salvo 4 valores por
// página (color, h1, emoji, el bloque <script type="module"> con el import
// + init) — todo lo demás (top-bar, pill-bar, timer, progress, áreas de
// quiz/study, fc-nav, result-overlay, script del shell) es literal.
//
// Reemplazo QUIRÚRGICO del <body> completo (mismo principio que
// generate-exercise-heads.mjs: comparar contra lo que ya existe, no asumir
// una plantilla nueva). El <head> de cada página (título, description,
// favicon, stylesheets extra) queda intacto — eso ya lo normaliza
// generate-exercise-heads.mjs aparte.
//
// Bug encontrado al extraer esta config: noun-adjuncts.html no tenía la
// clase "art-front" en su fc-face (todas las demás 58 sí) — el término de
// Study le renderizaba en un tamaño de fuente más chico que el resto de la
// familia sentence-quiz, sin razón aparente. PAGES la incluye para las 59
// (art-front es literal en la plantilla, no un campo de config) — corregido
// como efecto de normalizar, igual que el bug de contraste que encontró
// A.2b en su momento.
//
// PAGES es la fuente de verdad de aquí en más para el <body> de estas 59
// páginas — para agregar un ejercicio nuevo de este tipo, agregar su entry
// acá y correr este script, no editar el HTML a mano.
//
// Uso:
//   node scripts/generate-sentence-quiz-bodies.mjs --check   # reporta drift, exit 1 si hay
//   node scripts/generate-sentence-quiz-bodies.mjs            # aplica
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const EXERCISES_DIR = path.join(ROOT, "exercises");
const CHECK_ONLY = process.argv.includes("--check");

export const PAGES = [
  {
    id: "a1-contractions",
    color: "amber",
    h1: "🔗 Contractions",
    emoji: "🔗",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/a1-contractions.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'contract' });\n",
  },
  {
    id: "a1-demonstratives",
    color: "amber",
    h1: "👉 This, That, These, Those",
    emoji: "👉",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/a1-demonstratives.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'demonstr' });\n",
  },
  {
    id: "a1-imperatives",
    color: "amber",
    h1: "☝️ Imperatives &amp; Instructions",
    emoji: "☝️",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/a1-imperatives.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'imperative' });\n",
  },
  {
    id: "a1-match-meaning",
    color: "teal",
    h1: "🔗 Match the Meaning",
    emoji: "🔗",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/a1-match-meaning.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'a1match' });\n",
  },
  {
    id: "a1-plurals-possessives",
    color: "amber",
    h1: "📚 Plurals &amp; Possessives",
    emoji: "📚",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/a1-plurals-possessives.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'pluralposs' });\n",
  },
  {
    id: "a1-pronouns-possessives",
    color: "amber",
    h1: "🙋 Pronouns &amp; Possessives",
    emoji: "🙋",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/a1-pronouns-possessives.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'pronouns' });\n",
  },
  {
    id: "a1-questions",
    color: "teal",
    h1: "❓ Questions",
    emoji: "❓",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/a1-questions.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'a1q' });\n",
  },
  {
    id: "a1-some-any-quantity",
    color: "amber",
    h1: "➕ Some, Any &amp; Quantity Basics",
    emoji: "➕",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/a1-some-any-quantity.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'someany' });\n",
  },
  {
    id: "a1-to-be-have",
    color: "amber",
    h1: "😊 To Be &amp; Have",
    emoji: "😊",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/a1-to-be-have.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'tobehave' });\n",
  },
  {
    id: "a2-adverbs-frequency-manner",
    color: "amber",
    h1: "📍 Adverbs of Frequency &amp; Manner",
    emoji: "📍",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/a2-adverbs-frequency-manner.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'adverbs' });\n",
  },
  {
    id: "a2-error-spot-basic",
    color: "teal",
    h1: "🔎 Error Spot Basic",
    emoji: "🔎",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/a2-error-spot-basic.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'a2errspot' });\n",
  },
  {
    id: "a2-past-simple-continuous",
    color: "amber",
    h1: "⏮️ Past Simple vs Past Continuous",
    emoji: "⏮️",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/a2-past-simple-continuous.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'pastsimplecont' });\n",
  },
  {
    id: "advanced-collocations",
    color: "purple",
    h1: "🎓 Advanced Collocations",
    emoji: "🎓",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/advanced-collocations.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'advcoll' });\n",
  },
  {
    id: "articles",
    color: "azure",
    h1: "📝 Articles (a/an/the/∅)",
    emoji: "📝",
    total: 20,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/articles.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({\n  categories: CATEGORIES,\n  scoreKeyPrefix: 'art',\n  timedQuestionCount: 12,\n});\n",
  },
  {
    id: "b2-compound-words",
    color: "amber",
    h1: "🧩 Compound Words &amp; Word Formation",
    emoji: "🧩",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/b2-compound-words.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'compound' });\n",
  },
  {
    id: "b2-connotation-nuance",
    color: "purple",
    h1: "🎭 Connotation &amp; Nuance",
    emoji: "🎭",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/b2-connotation-nuance.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'connotation' });\n",
  },
  {
    id: "b2-formal-register",
    color: "purple",
    h1: "🎩 Formal Register",
    emoji: "🎩",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/b2-formal-register.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'formalreg' });\n",
  },
  {
    id: "b2-future-forms",
    color: "amber",
    h1: "🔮 Future Forms &amp; Predictions",
    emoji: "🔮",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/b2-future-forms.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'future' });\n",
  },
  {
    id: "b2-mixed-conditionals",
    color: "amber",
    h1: "⏮️ Mixed Conditionals",
    emoji: "⏮️",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/b2-mixed-conditionals.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'mixedcond' });\n",
  },
  {
    id: "b2-modals-deduction",
    color: "amber",
    h1: "🔍 Modals of Deduction",
    emoji: "🔍",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/b2-modals-deduction.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'modaldeduct' });\n",
  },
  {
    id: "b2-negative-affixes",
    color: "amber",
    h1: "🚫 Negative Prefixes &amp; Suffixes",
    emoji: "🚫",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/b2-negative-affixes.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'negaffix' });\n",
  },
  {
    id: "b2-participle-clauses",
    color: "amber",
    h1: "🏃 Participle Clauses",
    emoji: "🏃",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/b2-participle-clauses.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'particip' });\n",
  },
  {
    id: "b2-relative-advanced",
    color: "amber",
    h1: "🧵 Advanced Relative Clauses",
    emoji: "🧵",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/b2-relative-advanced.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'reladv' });\n",
  },
  {
    id: "c1-advanced-word-formation",
    color: "amber",
    h1: "💭 Advanced Word Formation",
    emoji: "💭",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/c1-advanced-word-formation.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'advwordform' });\n",
  },
  {
    id: "c1-argumentation",
    color: "teal",
    h1: "⚔️ Argumentation",
    emoji: "⚔️",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/c1-argumentation.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'argument' });\n",
  },
  {
    id: "c1-aspect-time-nuance",
    color: "amber",
    h1: "⚖️ Aspect &amp; Time Nuance",
    emoji: "⚖️",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/c1-aspect-time-nuance.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'aspect' });\n",
  },
  {
    id: "c1-collocation-mastery",
    color: "purple",
    h1: "🧩 Collocation Mastery",
    emoji: "🧩",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/c1-collocation-mastery.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'collmastery' });\n",
  },
  {
    id: "c1-compounding-blends",
    color: "amber",
    h1: "🌀 Compounding &amp; Blends",
    emoji: "🌀",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/c1-compounding-blends.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'blends' });\n",
  },
  {
    id: "c1-discourse-analysis",
    color: "teal",
    h1: "🧵 Discourse Analysis",
    emoji: "🧵",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/c1-discourse-analysis.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'discourse' });\n",
  },
  {
    id: "c1-ellipsis-substitution",
    color: "amber",
    h1: "✂️ Ellipsis &amp; Substitution",
    emoji: "✂️",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/c1-ellipsis-substitution.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'ellipsis' });\n",
  },
  {
    id: "c1-fronting-emphasis",
    color: "amber",
    h1: "🔄 Fronting &amp; Emphasis",
    emoji: "🔄",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/c1-fronting-emphasis.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'fronting' });\n",
  },
  {
    id: "c1-future-in-past",
    color: "amber",
    h1: "⏮️ Future in the Past &amp; Reported Tenses",
    emoji: "⏮️",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/c1-future-in-past.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'futurepast' });\n",
  },
  {
    id: "c1-hedging-softening",
    color: "amber",
    h1: "🌫️ Hedging &amp; Softening Language",
    emoji: "🌫️",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/c1-hedging-softening.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'hedging' });\n",
  },
  {
    id: "c1-nominalisation",
    color: "amber",
    h1: "📄 Nominalisation",
    emoji: "📄",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/c1-nominalisation.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'nominal' });\n",
  },
  {
    id: "c1-register-precision",
    color: "teal",
    h1: "🎩 Register Precision",
    emoji: "🎩",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/c1-register-precision.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'regprecision' });\n",
  },
  {
    id: "c1-subjunctive-unreal",
    color: "amber",
    h1: "🎭 Subjunctive &amp; Unreal",
    emoji: "🎭",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/c1-subjunctive-unreal.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'subjunctive' });\n",
  },
  {
    id: "c1-summarising",
    color: "teal",
    h1: "📌 Summarising",
    emoji: "📌",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/c1-summarising.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'summarize' });\n",
  },
  {
    id: "causative-verbs",
    color: "green",
    h1: "🛠️ Causative Verbs",
    emoji: "🛠️",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/causative-verbs.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'causative' });\n",
  },
  {
    id: "clauses",
    color: "green",
    h1: "🧩 Relative Clauses",
    emoji: "🧩",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/clauses.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'clause' });\n",
  },
  {
    id: "cleft-emphasis",
    color: "amber",
    h1: "💡 Cleft Sentences & Emphasis",
    emoji: "💡",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/cleft-emphasis.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'cleft' });\n",
  },
  {
    id: "collocations",
    color: "teal",
    h1: "🔗 Collocations",
    emoji: "🔗",
    total: 12,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/collocations.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({\n  categories: CATEGORIES,\n  scoreKeyPrefix: 'coll',\n  shuffleOptions: true,\n  studyBlankPlaceholder: '_____',\n});\n",
  },
  {
    id: "comparisons",
    color: "purple",
    h1: "⚖️ Comparisons",
    emoji: "⚖️",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/comparisons.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'comp' });\n",
  },
  {
    id: "conditionals",
    color: "amber",
    h1: "🔀 Conditionals",
    emoji: "🔀",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/conditionals.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'cond' });\n",
  },
  {
    id: "gerunds-infinitives",
    color: "amber",
    h1: "🔁 Gerunds & Infinitives",
    emoji: "🔁",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/gerunds-infinitives.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'ger' });\n",
  },
  {
    id: "idiom-in-context",
    color: "teal",
    h1: "🗯️ Idiom in Context",
    emoji: "🗯️",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/idiom-in-context.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'idiomctx' });\n",
  },
  {
    id: "inversions",
    color: "teal",
    h1: "🔄 Inversions",
    emoji: "🔄",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/inversions.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'inver' });\n",
  },
  {
    id: "linking-words",
    color: "teal",
    h1: "🔗 Linking Words & Connectors",
    emoji: "🔗",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/linking-words.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'linking' });\n",
  },
  {
    id: "made-of",
    color: "green",
    h1: "🧱 Made Of / From / With",
    emoji: "🧱",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/made-of.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'madeof' });\n",
  },
  {
    id: "modals",
    color: "teal",
    h1: "🧭 Modal Verbs",
    emoji: "🧭",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/modals.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'modals' });\n",
  },
  {
    id: "noun-adjuncts",
    color: "green",
    h1: '🧩 Noun <span class="h1-suffix">Adjuncts</span>',
    emoji: "🧩",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/noun-adjuncts-data.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'noun' });\n",
  },
  {
    id: "parts-of-speech",
    color: "blue",
    h1: "🔤 Parts of Speech",
    emoji: "🔤",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/parts-of-speech.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'pos' });\n",
  },
  {
    id: "passive-voice",
    color: "amber",
    h1: "🎭 Passive Voice",
    emoji: "🎭",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/passive-voice.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'passive' });\n",
  },
  {
    id: "plural-endings",
    color: "blue",
    h1: "🔊 Plural Endings",
    emoji: "🔊",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/plural-endings.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\n// speech: todo el ejercicio va de cómo suena el final -s, así que las tres\n// categorías (nouns, verbs, possessives) llevan pronunciación, no solo la que\n// tiene 🔊 como icono.\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'plural', speech: true });\n",
  },
  {
    id: "preferences",
    color: "purple",
    h1: "💭 Prefer / Would Prefer / Would Rather",
    emoji: "💭",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/preferences.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'pref' });\n",
  },
  {
    id: "quantifiers",
    color: "purple",
    h1: "📊 Quantifiers",
    emoji: "📊",
    total: 12,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/quantifiers.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({\n  categories: CATEGORIES,\n  scoreKeyPrefix: 'quant',\n  shuffleOptions: true,\n  studyBlankPlaceholder: '_____',\n});\n",
  },
  {
    id: "reported-speech",
    color: "blue",
    h1: "⏪ Reported Speech",
    emoji: "⏪",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/reported-speech.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'rs' });\n",
  },
  {
    id: "text-cohesion",
    color: "teal",
    h1: "🧵 Text Cohesion",
    emoji: "🧵",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/text-cohesion.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'cohesion' });\n",
  },
  {
    id: "used-to",
    color: "blue",
    h1: "🕰️ Used To & Would",
    emoji: "🕰️",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/used-to.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'usedto' });\n",
  },
  {
    id: "word-stress-quiz",
    color: "amber",
    h1: "🗣️ Word Stress",
    emoji: "🗣️",
    total: 10,
    scriptBody:
      "\nimport { CATEGORIES } from '../data/word-stress-quiz.js';\nimport { initSentenceQuiz } from '../js/engines/sentence-quiz-engine.js';\n\n// speech: identificar la sílaba tónica sin poder oír la palabra es adivinar.\ninitSentenceQuiz({ categories: CATEGORIES, scoreKeyPrefix: 'stress', speech: true });\n",
  },
];

function renderBody(p) {
  return `<body>
<div class="wrap" data-color="${p.color}">
  <div class="top-bar">
    <a href="../index.html" class="lp-icon-btn" aria-label="Volver a HubFlow" title="Volver a HubFlow">←</a>
  </div>

  <div class="header">
    <h1>${p.h1}</h1>

    <div class="cat-bar" id="catBar"></div>

    <div class="pill-bar">
      <button class="pill-btn active" data-mode="study">📖 Study</button>
      <button class="pill-btn" data-mode="quiz">🎯 Quiz</button>
      <button class="pill-btn" data-mode="timed">⏱️ Timed</button>
    </div>

    <div class="timer-bar" id="timerBar"><span class="timer-display" id="timerDisplay">1:00</span></div>

    <div class="progress">
      <div class="progress__labels"><span id="progTxt">0 / ${p.total}</span><span id="progPct">0%</span></div>
      <div class="progress__track"><div class="progress__fill" id="progFill"></div></div>
    </div>
  </div>

  <div class="scroll-body">
    <div data-area="quiz">
      <div class="sentence-card">
        <div class="sc-icon" id="scIcon"></div>
        <div class="sc-text" id="scText"></div>
        <div class="sc-counter" id="scCounter"></div>
      </div>
      <div class="word-options" id="wordOptions"></div>
      <div class="explain-box" id="explainBox"></div>
    </div>

    <div data-area="study">
      <div class="fc-count" id="fcCounter">1 / ${p.total}</div>
      <div class="fc-card" id="fcCard">
        <div class="fc-inner">
          <div class="fc-face art-front">
            <div class="fc-emoji" id="fcEmoji">${p.emoji}</div>
            <div class="fc-term" id="fcSentence"></div>
            <div class="fc-hint">tap to see answer</div>
          </div>
          <div class="fc-face fc-back">
            <div class="fc-term" id="fcAnswer" style="font-size:1.4rem;color:var(--lp-success)"></div>
            <div class="fc-detail" id="fcExplain"></div>
          </div>
        </div>
      </div>
      <div class="fc-nav">
        <button class="lp-btn lp-btn--ghost" id="shuffleBtn">🔀</button>
        <button class="lp-btn lp-btn--ghost" id="prevBtn">←</button>
        <button class="lp-btn lp-btn--primary" id="nextBtn">→</button>
        <button class="lp-btn lp-btn--ghost" id="quizSkipBtn">⏭ Saltar</button>
        <button class="lp-btn lp-btn--purple" id="quizNextBtn" hidden>Siguiente →</button>
      </div>
    </div>
  </div>

  <div class="result-overlay" id="resultOverlay"></div>
</div>

<script type="module">${p.scriptBody}</script>

<script type="module" src="../js/exercise-shell.js"></script>
</body>`;
}

async function processFile(p) {
  const filePath = path.join(EXERCISES_DIR, `${p.id}.html`);
  const html = await readFile(filePath, "utf8");
  const bodyRe = /<body>[\s\S]*<\/body>/;
  if (!bodyRe.test(html)) throw new Error(`${p.id}: <body> no encontrado`);

  const newHtml = html.replace(bodyRe, renderBody(p));
  if (newHtml === html) return "unchanged";
  if (CHECK_ONLY) return "drift";
  await writeFile(filePath, newHtml);
  return "updated";
}

async function main() {
  const stats = { unchanged: 0, updated: 0, drift: 0 };
  const driftFiles = [];

  for (const p of PAGES) {
    try {
      const result = await processFile(p);
      stats[result]++;
      if (result === "drift") driftFiles.push(p.id);
    } catch (err) {
      console.error(`ERROR ${p.id}: ${err.message}`);
      process.exitCode = 1;
    }
  }

  console.log(
    `${PAGES.length} páginas sentence-quiz — ${stats.unchanged} sin cambio, ${stats.updated} actualizadas, ${stats.drift} con drift.`,
  );
  if (driftFiles.length) {
    console.log("Con drift:", driftFiles.join(", "));
    process.exitCode = 1;
  }
}

main();
