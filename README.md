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
├── index.html          # Dashboard: lista y filtra los 58 módulos de data/catalog.js
├── exercises/           # 40 páginas de ejercicio, una por tema
├── guides/               # 23 páginas de referencia (reglas, tablas, consulta rápida)
├── data/                # Un archivo por tema con el contenido del ejercicio
│   └── catalog.js       # Metadata de los 58 módulos (título, categoría, ejercicio, icono...)
├── css/
│   ├── base.css          # Tokens --lp-*, reset, tipografía
│   ├── buttons.css        # Sistema de botones compartido (.lp-btn/.lp-icon-btn/.lp-pill)
│   ├── components.css     # Top-bar, categorías, progreso, flashcards
│   └── *-shell.css        # Estilos propios de cada familia de ejercicio (ver abajo)
├── js/
│   ├── *-engine.js        # Un motor por familia de ejercicio (ver abajo)
│   ├── utils.js           # shuffle, Timer, recordScore, initTheme/toggleTheme...
│   ├── theme-init.js      # Lee ?theme=/localStorage antes del primer paint
│   └── portal-link.js     # Botón "volver": history.back() o fallback a index
├── scripts/
│   ├── validate-content.js  # Valida data/*.js antes de deployar (bloqueante)
│   └── analyze-content.mjs
└── build.sh              # Commit + push + espera CI Validate/CD Deploy
```

## Familias de ejercicio

Cada ejercicio importa uno de estos motores compartidos según su tipo, en vez de reimplementar la lógica en cada página:

| Motor | CSS asociado | Patrón de modos | Ejemplos |
|---|---|---|---|
| `flashcard-engine.js` | `flashcard-shell.css` | Study / Quiz / Match / Battle / Timed | vocabulary, opposites, pronunciation-study |
| `spelling-engine.js` | `spelling-shell.css` | Niveles: Beginner / Intermediate / Exceptions / God Mode | ed-spelling, ing-spelling, noun-adjuncts |
| `sentence-quiz-engine.js` | `sentence-quiz.css` | Study / Practice / Timed + categorías (`.cat-btn`) | articles, clauses, comparisons, tenses... |
| `typed-answer-engine.js` | `typed-answer-shell.css` | Study / Practice / Timed, respuesta escrita | paraphrasing, word-order, register-switch... |
| — (standalone) | `exercise-enhanced.css` | Cada página maneja su propio estado | confusing-words, listening, error-hunt... |

Cada familia de ejercicio usa `[data-color="..."]` en su wrapper para tomar el color de categoría (`--lp-cat-*`) sin duplicar reglas por tema.

## Sistema de botones

`css/buttons.css` define las 3 primitivas compartidas con DeskFlow/LyricFlow: `.lp-btn` (acción), `.lp-icon-btn` (icono circular — volver/portal/tema), `.lp-pill` (tab). Todo botón interactivo respeta un hit-area mínimo de 44×44px (extendido vía `::after` cuando el tamaño visual es menor) y radios solo desde `--lp-radius-md`/`--lp-radius-full`/círculo.

## Desarrollo

```bash
npx serve . -p 3002
# o
python3 -m http.server 3002
```

## Deploy

`build.sh` hace commit + push y espera (no bloqueante) a que terminen los workflows `CI Validate` y `CD Deploy` en GitHub Actions. `CD Deploy` solo publica en GitHub Pages si `CI Validate` pasó primero.
