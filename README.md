# HubFlow

Plataforma de ejercicios interactivos de inglés — vocabulario, pronunciación, gramática y producción. Parte del Learn Platform (junto a DeskFlow, FluentFlow y LyricFlow).

> Autor: Genil Suárez

---

## Stack

- HTML5 + CSS3 + Vanilla JS (ES modules) — sin build step, se sirve directo.
- Tokens de diseño compartidos `--lp-*` (mismo sistema que DeskFlow y LyricFlow).
- Tipografía: Newsreader (display) + Manrope (UI).

## Estructura

```
HubFlow/
├── index.html          # Dashboard SPA: categorías + "Mi Progreso" (rutas de aprendizaje)
├── exercises/           # 43 páginas de ejercicio, una por tema
├── guides/              # 23 páginas de referencia (reglas, tablas, consulta rápida)
├── data/                # Un archivo por tema con el contenido del ejercicio
│   └── catalog.js       # Metadata de los 61 módulos (título, categoría, CEFR, scoreKey...)
├── css/
│   ├── base.css          # Tokens --lp-*, reset, tipografía
│   ├── buttons.css       # Sistema de botones compartido (.lp-btn/.lp-icon-btn/.lp-pill)
│   ├── components.css    # Top-bar, categorías, progreso, flashcards
│   └── *-shell.css       # Estilos propios de cada familia de ejercicio
├── js/
│   ├── *-engine.js       # Un motor por familia de ejercicio
│   ├── utils.js          # shuffle, Timer, recordScore, theme helpers...
│   ├── exercise-shell.js # Sidebar, header homologation, back-nav (replaces portal-link.js)
│   ├── lp-theme.js       # Lee ?theme=/localStorage antes del primer paint
│   ├── lp-nav-helpers.js # themedAppHref, toggleTheme, navIcon
│   └── lp-about.js       # Modal "About LearnFlow"
├── docs/
│   └── mi-progreso-decisions.md  # Documento de decisiones de rutas de aprendizaje
├── scripts/
│   ├── validate-content.js  # Valida data/*.js antes de deployar (bloqueante)
│   └── analyze-content.mjs
└── build.sh              # Commit + push + espera CI Validate/CD Deploy
```

## Categorías y niveles CEFR

| Categoría | Módulos | CEFR |
|-----------|---------|------|
| Vocabulary & Words | 18 | A2–C1 |
| Grammar & Spelling | 25 | A1–B2 |
| Pronunciation | 10 | A1–B2 |
| Analysis & Production | 8 | A2–C1 |
| **Total** | **61** | **A1–C1** |

## Mi Progreso — Rutas de aprendizaje

Feature del dashboard que ofrece 6 rutas transversales (cruzan 3+ categorías) con propósito pedagógico. No bloquean acceso — son sugerencias de progresión.

| Ruta | CEFR | Secciones cruzadas |
|------|------|--------------------|
| ✏️ Spell It Right | A1 → B1 | G + P + V + A |
| 🧱 Build Sentences | A1 → B1 | G + V + A |
| 👂 Decode Speech | A2 → B1 | P + V + A |
| 🗣️ Sound Natural | A2 → B1 | V + G + P + A |
| 🔄 Transform & Produce | A2 → B1 | G + A + V |
| 🏆 Advanced Mastery | B2 → C1 | G + A + V |

El progreso se calcula leyendo los `scoreKey` existentes de localStorage (≥60% = completado).

Ver `docs/mi-progreso-decisions.md` para detalles completos.

## Familias de ejercicio

Cada ejercicio importa uno de estos motores compartidos según su tipo:

| Motor | CSS asociado | Patrón de modos | Ejemplos |
|---|---|---|---|
| `flashcard-engine.js` | `flashcard-shell.css` | Study / Quiz / Match / Battle / Timed | vocabulary, opposites, pronunciation-study |
| `spelling-engine.js` | `spelling-shell.css` | Niveles: Beginner / Intermediate / Exceptions / God Mode | ed-spelling, ing-spelling, noun-adjuncts |
| `sentence-quiz-engine.js` | `sentence-quiz.css` | Study / Practice / Timed + categorías (`.cat-btn`) | articles, conditionals, inversions, cleft-emphasis... |
| `typed-answer-engine.js` | `typed-answer-shell.css` | Study / Practice / Timed, respuesta escrita | paraphrasing, word-order, register-switch... |
| — (standalone) | `exercise-enhanced.css` | Cada página maneja su propio estado | confusing-words, listening, error-hunt... |

Cada familia usa `[data-color="..."]` en su wrapper para tomar el color de categoría (`--lp-cat-*`).

## Sistema de botones

`css/buttons.css` define las 3 primitivas compartidas con DeskFlow/LyricFlow: `.lp-btn` (acción), `.lp-icon-btn` (icono circular), `.lp-pill` (tab). Hit-area mínimo 44×44px, radios solo desde `--lp-radius-md`/`--lp-radius-full`/círculo.

## Desarrollo

Desde el repo `Learn` (raíz de la plataforma):

```bash
learnctl start   # → http://localhost:3000/hubflow/
```

No uses `npx serve` ni `python -m http.server` en puertos sueltos — el gateway en **3000** comparte `localStorage` con DeskFlow, FluentFlow y LyricFlow.

## Deploy

`build.sh` hace commit + push y espera (no bloqueante) a que terminen los workflows `CI Validate` y `CD Deploy` en GitHub Actions. `CD Deploy` solo publica en GitHub Pages si `CI Validate` pasó primero.
