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
├── exercises/           # 150 páginas de ejercicio, una por módulo
├── guides/              # 30 páginas de referencia (reglas, tablas, consulta rápida)
├── data/                # Un archivo por módulo con el contenido del ejercicio (153 archivos)
│   └── catalog.js       # Metadata de los 150 módulos (título, categoría, CEFR, scoreKey...) + MODULE_DEPTH (items/categorías/modos derivados del contenido real)
├── css/
│   ├── base.css          # Tokens --lp-*, reset, tipografía
│   ├── buttons.css       # Sistema de botones compartido (.lp-btn/.lp-icon-btn/.lp-pill)
│   ├── components.css    # Top-bar, categorías, progreso, flashcards
│   └── *-shell.css       # Estilos propios de cada familia de ejercicio
├── js/
│   ├── *-engine.js       # Un motor por familia de ejercicio (flashcard, spelling, sentence-quiz, typed-answer, dictation)
│   ├── array-utils.js    # shuffle
│   ├── progress-store.js # recordScore, progress tracking, cloud sync
│   ├── exercise-ui.js    # renderCatBar, mode tabs, Timer, progress bar
│   ├── exercise-flow.js  # finishExercise, advanceStudyCard, createMatchMode
│   ├── speech.js         # Web Speech API (speak, isSpeechAvailable)
│   ├── exercise-shell.js # Sidebar, header homologation, back-nav (replaces portal-link.js)
│   ├── lp-theme.js       # Lee ?theme=/localStorage antes del primer paint
│   ├── lp-nav-helpers.js # themedAppHref, toggleTheme, navIcon
│   └── lp-about.js       # Modal "About LearnFlow"
├── scripts/
│   ├── validate-content.js  # Valida data/*.js antes de deployar (bloqueante)
│   ├── sync-catalog.mjs     # Deriva MODULE_DEPTH real (items/categorías/modos) desde data/*.js y exercises/*.html
│   ├── analyze-content.mjs
│   └── lib/derive-catalog.mjs
└── build.sh              # Commit + push + espera CI Validate/CD Deploy
```

## Categorías y niveles CEFR

| Categoría | Módulos | Items | CEFR |
|-----------|---------|-------|------|
| Vocabulary & Words | 50 | 2.500 | A1–C1 |
| Grammar & Spelling | 50 | 2.000 | A1–C1 |
| Pronunciation | 25 | 1.000 | A1–C1 |
| Analysis & Production | 25 | 1.000 | A1–C1 |
| **Total** | **150** | **6.500** | **A1–C1** |

Los números de esta tabla se derivan del contenido real en `data/*.js` — no son un conteo manual. `node scripts/sync-catalog.mjs --check` falla si `catalog.js` se desincroniza del contenido real. El inventario dinámico que antes vivía en `docs/inventory.html` se movió a `Learn/index.html` — ahora es un panel único para las 3 apps de contenido (FluentFlow, HubFlow, LyricFlow), servido vía `learnctl` en `http://localhost:3000/panel/`.

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
