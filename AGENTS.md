# HubFlow — Agent Guide

## What is it

Interactive English exercise platform — vocabulary, pronunciation, grammar, and production.
Part of the Learn Platform (alongside DeskFlow, FluentFlow, and LyricFlow).

## Stack

- HTML5 + CSS3 + Vanilla JS (ES modules) — no build step, served directly
- Design tokens: `--lp-*` prefix (shared with DeskFlow, FluentFlow, LyricFlow)
- Google Fonts: Newsreader (display) + Manrope (UI)
- Dark mode via `[data-theme="dark"]`

## Structure

```
index.html          — Dashboard SPA: categories + "Mi Progreso" (learning paths)
exercises/          — 44 exercise pages, one per topic
guides/             — 44 reference pages (rules, tables, quick lookup). Cobertura completa:
                      los 150 módulos de catalog.js apuntan a una guía (muchos vía #ancla).
data/
  catalog.js        — Metadata for 61 modules (title, category, CEFR, scoreKey...)
  *.js              — One data file per exercise topic
css/
  base.css          — Tokens --lp-*, reset, typography
  buttons.css       — Shared button system (.lp-btn/.lp-icon-btn/.lp-pill)
  components.css    — Top-bar, categories, progress; imports ex-bottom-nav.css
  ex-bottom-nav.css — Bottom control bar (canonical, mirrors FluentFlow game-controls)
  sidebar.css       — Sidebar drawer + index shell grid + exercise footer
  lp-nav-active.css — Active nav item (copy of scripts/)
  lp-about.css      — About modal styles (copy of scripts/)
  guide-layout.css  — Shared guide footer (.guide-footer)
  guide-sections.css— Primitivas .gx-* de las secciones de guía (tablas, cards, tips)
  *-shell.css       — Per-engine-family styles
js/
  engines/          — TODOS los motores de ejercicio, uno por familia. Ningún
                      ejercicio lleva su motor inline en el HTML: la página solo
                      importa su data file y llama al `init*()` del engine.
    manifest.mjs    — Contrato de claves de progreso de cada engine (lo lee
                      scripts/lib/derive-catalog.mjs; ver más abajo)
  nav-sections.js   — Secciones de nav (fuente única: index.html + exercise-shell.js)
  exercise-shell.js — Sidebar drawer, header; calls ex-bottom-nav.js
  ex-bottom-nav.js    — Bottom nav canonical (mirrors FluentFlow game-controls)
  array-utils.js    — shuffle
  progress-store.js — recordScore, progress tracking, header stats, cloud sync,
                      modal "Progreso del módulo" + badges ✓ en chips de sección
                      y mode tabs (orden y etiquetas leídos de los chips visibles)
  exercise-ui.js    — renderCatBar, wireModeTabs, syncModeTabsActive,
                      updateProgress, Timer, formatTime, makeTimerState
  exercise-flow.js  — finishExercise, advanceStudyCard, createMatchMode
  speech.js         — Web Speech API (speak, isSpeechAvailable)
  lp-theme.js       — Theme init before first paint (copy of scripts/)
  lp-platform-urls.js — Cross-app URLs (copy of scripts/)
  lp-nav-icons.js   — Sidebar icon SVGs (copy of scripts/)
  lp-nav-helpers.js — themedAppHref, toggleTheme, navIcon (copy of scripts/)
  lp-about.js       — About LearnFlow modal (copy of scripts/)
  lp-auth-setup.js  — Supabase auth wiring (copy of scripts/)
  lp-supabase.js    — Supabase client (copy of scripts/)
  sync-engine.js    — Cloud sync base (copy of scripts/)
  lp-progress-summary.js — Progress summary (copy of scripts/)
lp-login.js         — Login modal at repo root (copy of scripts/)
lp-guest-reset.js   — Guest/logout at repo root (copy of scripts/)
docs/
  mi-progreso-decisions.md  — Learning paths design decisions
scripts/
  validate-content.js       — Validates data/*.js before deploy (blocking, runs in CI)
  sync-catalog.mjs          — Recomputes catalog.js derived values from data/*.js
  lib/derive-catalog.mjs    — Shared derivation logic (used by both of the above)
  analyze-content.mjs       — Content analysis
  tmp/                      — Temporary scripts (gitignored)
build.sh            — Commit + push + wait for CI Validate/CD Deploy
```

**Removed:** `js/theme-init.js` (all pages now use `js/lp-theme.js`), `js/portal-link.js` (back nav lives in `exercise-shell.js`), `js/lp-stats-pending-init.js` (huérfano: nadie lo cargaba y ningún CSS/JS leía su flag `data-stats-pending`).

## Serve in development

From the `Learn` platform root (not this repo alone):

```bash
learnctl start   # → http://localhost:3000/hubflow/
```

Do not use `npx serve` or `python -m http.server` on separate ports — only `localhost:3000` shares `localStorage` with the other apps.

## Script execution rules

- **ALL scripts** must live in `scripts/` (or `scripts/tmp/` for one-offs)
- NEVER execute inline JS/Python in the terminal
- `scripts/tmp/` is gitignored — use for audits, QA, temporary analysis
- Execute with: `node scripts/<name>.js` or `node scripts/tmp/<name>.js`
- Allowed direct commands: `learnctl start` (from `Learn/` root), `git`, simple shell utils
- Avoid `npx serve` / `python -m http.server` on per-app ports — use the gateway at `localhost:3000`

## catalog.js — qué es derivado y qué es a mano

`data/catalog.js` es el índice (metadata, navegación, contrato de progreso). El
contenido real vive en `data/<ejercicio>.js` (`export const CATEGORIES`).

Dos valores de catalog.js **no se editan a mano** — se calculan desde `data/*.js`:

| Valor | Qué es |
|---|---|
| `MODULE_DEPTH[id].items` / `.categories` | el "20 items · 2 categorías" que ve el usuario |
| nombres de subcategoría en `PROGRESS_RULES` | claves de `localStorage` que definen si el módulo está completado |

**Al renombrar, dividir o agregar una subcategoría en un data file:**

```bash
node scripts/sync-catalog.mjs
```

`validate-content.js` falla con `CAT-DEPTH` / `CAT-SCOREKEY` si quedan
desfasados, y corre bloqueante en CI y en `build.sh`. Sin ese paso, renombrar una
categoría rompe en silencio el progreso guardado de los usuarios.

No derivable (se mantiene a mano): `engine`, `hasBattle`, `modes`, y los módulos
cuyo data file no expone `CATEGORIES`/`LEVELS` (hoy solo `irregular-verbs`).

## Categorías

`CATEGORIES` en `data/catalog.js` es el registro de las 4 categorías top-level
(el valor de `category` en cada módulo): label, clase de spine y token de color.
Usar el helper `catColor(key, soft?)` en vez de escribir `var(--lp-cat-*)`.

Antes el label estaba en 3 sitios y los colores en 4 mapas de `index.html` (dos
de ellos copia literal uno del otro). Guards: `CAT-CATEGORY` valida el `category`
de cada módulo; `NAV-SYNC` valida los títulos de estantería y subsección contra
`CATEGORIES` / `SUBCATEGORIES`.

## Secciones de navegación

`js/nav-sections.js` es la fuente única de las 8 secciones del sidebar; las 4 de
categoría toman su label de `CATEGORIES`. La consumen `index.html`
(`VALID_SECTIONS`, `CATALOG_SECTIONS`, `OVERVIEW_SECTIONS`) y
`js/exercise-shell.js` (render + `VALID_BACK_SECTIONS`).

Dos sitios **no** pueden importarla y son espejos obligados — ambos validados
con `NAV-SYNC`, que falla el build si divergen:

| Sitio | Por qué es espejo |
|---|---|
| Sidebar estático de `index.html` | se pinta antes de que corra el JS |
| `var vs = [...]` en el script inline | corre antes de los módulos ES (evita el flash de sección) |

Al agregar/renombrar una sección: editar `nav-sections.js` **y** los dos espejos.
`node scripts/validate-content.js` dice exactamente cuál quedó desfasado.

## Categories and CEFR levels

| Category | Modules | CEFR |
|----------|---------|------|
| Vocabulary & Words | 18 | A2–C1 |
| Grammar & Spelling | 25 | A1–B2 |
| Pronunciation | 10 | A1–B2 |
| Analysis & Production | 8 | A2–C1 |
| **Total** | **61** | **A1–C1** |

## Exercise engine families

Each exercise imports one of these shared engines:

Todos viven en `js/engines/`. **No quedan motores inline** — si un ejercicio
necesita lógica propia, se crea su archivo aquí, no un `<script type="module">`
con 300 líneas en el HTML (un motor inline es invisible para el mapeo del
repo y se desincroniza en silencio del validador de progreso).

| Engine | Modes | Páginas |
|--------|-------|---------|
| `flashcard-engine.js` | Study / Quiz / Match / Battle / Timed | 62 — vocabulary, opposites, pronunciation-study |
| `sentence-quiz-engine.js` | Study / Practice / Timed | 58 — articles, conditionals, inversions |
| `typed-answer-engine.js` | Study / Practice / Timed, respuesta escrita | 9 — paraphrasing, word-order, register-switch |
| `spelling-engine.js` | Beginner / Intermediate / Exceptions / God Mode | 3 — ed-spelling, ing-spelling, noun-adjuncts |
| `dictation-engine.js` | Practice / Timed, dictado con TTS | 1 — dictation-sprint |
| `word-choice-engine.js` | Study / Practice / Timed, elegir del par | 4 — apostrophe-traps, confusing-verbs, grammar-confusions, lookalike-words |
| `text-hunt-engine.js` | Hunt / Timed, marcar y corregir errores | 2 — error-hunt, punctuation-fix |
| `phonics-engine.js` | Study / Practice / Timed / Match | 1 — phonics |
| `phrasal-verbs-engine.js` | Study / Quiz / Timed / Match / Write / Sort | 1 — phrasal-verbs |
| `irregular-verbs-engine.js` | Study / Quiz / Timed / Match / Sort / Write | 1 — irregular-verbs |
| `verb-chunks-engine.js` | Study / Practice / Timed / Write / Sort | 1 — verb-chunks |
| `prepositions-engine.js` | Study / Practice / Timed | 1 — prepositions |
| `tenses-engine.js` | Study / Practice / Timed | 1 — tenses |
| `word-formation-engine.js` | Study / Practice / Timed, respuesta escrita | 1 — word-formation |
| `listening-engine.js` | Practice / Timed con TTS | 1 — listening |
| `spelling-by-ear-engine.js` | Practice / Timed con TTS | 1 — spelling-by-ear |
| `odd-one-out-engine.js` | Practice / Timed | 1 — odd-one-out |
| `paragraph-cloze-engine.js` | Practice / Timed | 1 — paragraph-cloze |

Cada engine tiene su `*-shell.css` cuando la familia comparte layout; los de una
sola página usan `exercise-enhanced.css`.

### manifest.mjs — el contrato de scoreKeys

`js/engines/manifest.mjs` declara, por engine, qué sufijos de clave de progreso
escribe (`-quiz`, `-timed`, `-study`, `-match`, `-write`, `-sort`, o ninguno).
`scripts/lib/derive-catalog.mjs` lo importa para validar `PROGRESS_RULES`.

**Al cambiar la clave que un engine pasa a `recordScore()` / `recordStudyItemSeen()`
hay que actualizar su entrada en el manifiesto.** Antes esa convención se deducía
con regex sobre el HTML de cada página, y un cambio dentro de un engine dejaba el
validador ciego — así se acumularon 935 errores `CAT-SCOREKEY` sin que nada
señalara la causa.

Each family uses `[data-color="..."]` on its wrapper to pick up category color (`--lp-cat-*`).

### Flashcard flip — never use rotateY/backface-visibility

`.fc-card` / `.battle-card` flip via a **scaleX "squeeze" + display swap** (`.fc-inner` → `scaleX(.02)`,
JS toggles `display:flex`/`none` on `.fc-face`/`.fc-face.fc-back` at the squeeze midpoint, see
`squeezeToggle()` in `flashcard-engine.js` and the `.fc-card`/`.fc-inner`/`.fc-face` rules in
`components.css`), **not** a 3D `rotateY(180deg)` + `backface-visibility: hidden` flip.

**Why:** a true 3D flip was tried first and showed the *other* face mirrored/upside-down for a frame
mid-transition — confirmed on both Safari and Chromium, via a recorded video (screenshot below).
This is a GPU-compositor race in `backface-visibility` under frame pressure, not something
`-webkit-` prefixes or `translateZ` reliably fix. The squeeze approach never renders both faces at
once (verified by sampling every animation frame's computed `display`), so it cannot glitch this way
regardless of browser or device load. **Do not reintroduce `rotateY`/`backface-visibility`/`perspective`
for card flips in this codebase — reach for the squeeze pattern instead.**

## Mi Progreso — Learning paths

19 cross-category paths with pedagogical purpose, covering all 150 modules (30/30 per CEFR level).
Non-blocking — suggested progression only; every step is always a navigable link.
Progress calculated from `scoreKey` entries in localStorage (≥60% = completed).

`data/learning-paths.js` holds only `id/title/icon/description/modules` — the CEFR range and the
stage (Fundamentos/Intermedio/Avanzado) are **derived** from the catalog, never declared.
CI enforces PATH-ID / PATH-ORDER / PATH-DUP / PATH-SECTIONS and reports PATH-COVERAGE.

See `docs/mi-progreso-decisions.md` for full details.

## Auth, login, and shared nav

- **Index:** `lpLogin.bindNavButton('#loginTrigger')`, `lpAbout.open()` — see inline module in `index.html`
- **Exercises:** `exercise-shell.js` builds sidebar; login via `#sbLoginBtn`, about via `lpAbout.open()`
- **Nav helpers:** `LpNavHelpers` from `js/lp-nav-helpers.js` (not duplicated in `exercise-shell.js`)
- **Theme:** always `js/lp-theme.js` on index, exercises, and guides — never `theme-init.js`
- **Exercise HTML** loads: `lp-theme.js`, `lp-platform-urls.js`, `lp-nav-icons.js`, `lp-login.js`, `lp-nav-helpers.js`, `lp-about.js`, `sidebar.css`, `lp-nav-active.css`, `lp-about.css`

## Design conventions

- Warm editorial theme (paper tone, consistent with DeskFlow)
- CSS custom properties in `:root` with `--lp-` prefix
- Typography: Newsreader for display, Manrope for UI
- Dark mode via `[data-theme="dark"]`
- Mobile-first responsive
- Category colors via `--lp-cat-*` tokens

## Button system

`css/buttons.css` defines the 3 shared primitives: `.lp-btn` (action), `.lp-icon-btn` (circular icon), `.lp-pill` (tab). Min hit-area 44×44px.

Legacy: ~~34 exercises still use `.btn` class~~ — migrated to `.lp-btn` (July 2026).

## Exercise bottom nav (mirrors FluentFlow `game-controls`)

Canonical files — edit visibility/order here, not per exercise HTML:

| File | Role |
|------|------|
| `js/ex-bottom-nav.js` | `BOTTOM_NAV` config, `resolveBottomNavProfile()`, hoist/reorder/sync |
| `css/ex-bottom-nav.css` | Bar layout, mobile sticky, `.ex-bottom-nav__desktop-only` hide rule |

Imported via `@import` in `css/components.css` (all exercise pages load it).

**Profiles** (`resolveBottomNavProfile()`):

| Profile | When | Mobile bar |
|---------|------|------------|
| `study` | Flashcard/sentence-quiz study area | 📊 · ← · → |
| `practice` | Pages with `#checkBtn` (typed-answer, dictation, spelling, error-hunt, paragraph-cloze) | 📊 · ✓ · → |
| `battle` | Flashcard battle mode | 📊 · battle actions |
| `minimal` | Tap-to-answer practice/timed (sentence-quiz, listening, spelling-by-ear, odd-one-out) | 📊 only |
| `hidden` | Flashcard quiz/match areas | bar hidden |

**Canonical order (desktop, left → right):**

1. Progress detail (📊) — always visible (except `hidden`)
2. Secondary icons (🔀 shuffle, 🔊 speak, 💡 hint, ⏭ skip) — **desktop only** (`.ex-bottom-nav__desktop-only`)
3. Prev (←) — study modes
4. Primary (✓ check / battle claim)
5. Next (→)

**Per-engine matrix:**

| Engine / family | Exercises | Bottom nav |
|-----------------|-----------|------------|
| `flashcard-engine.js` | vocabulary, opposites, pronunciation-study | study: fc-nav hoisted · quiz/match: hidden · battle: claim/judge/next |
| `sentence-quiz-engine.js` | articles, conditionals, clauses, … (13) | study: shuffle/prev/next · practice/timed: minimal (tap options) |
| `typed-answer-engine.js` | paraphrasing, word-order, register-switch, sentence-combining, key-word-transformation | practice: check/next/hint hoisted |
| `spelling-engine.js` | ed-spelling, ing-spelling, noun-adjuncts | practice: check hoisted (`setupPracticeBottomNav`) |
| `dictation-engine.js` | dictation-sprint | practice: check/next/skip hoisted |
| Standalone inline | error-hunt, paragraph-cloze | practice: auto-hoist via `setupContentBottomNav()` |
| Standalone inline | listening, spelling-by-ear, odd-one-out | minimal (no check button) |
| Standalone + fc-nav | confusing-words, irregular-verbs, phonics, phrasal-verbs, prepositions, tenses, verb-chunks, word-formation | study fc-nav hoisted; mode-specific profile |

`exercise-shell.js` calls `initBottomNav()` on load; engines call `window.__syncBottomNavMode?.()` on mode switches. Typed/dictation engines also call `setupPracticeBottomNav()` / `setPracticeBottomNav()`.

### Botones de acción: siempre en la barra, nunca en el contenido

Un botón de acción (comprobar / saltar / siguiente) **no se deja suelto dentro de
`[data-area]`** — se iza a `#exBottomNav`. Dos formas:

| Caso | Cómo |
|---|---|
| Modo de práctica con IDs canónicos | usar `checkBtn` / `nextBtn` / `hintBtn` / `skipBtn` y llamar `window.__setupPracticeBottomNav?.()` al mostrar el área |
| Botón propio de un modo (ej. `sortCheck`) | crearlo fuera de `[data-area]` y colocarlo con `window.__insertInBottomNav?.(btn)` |
| Battle | los 3 grupos **deben** llamarse `battleClaim` / `battleJudge` / `battleNext`, y la fase se cambia con `window.__syncBattleActionVisibility?.(phase)` — no togglear `style.display` a mano |

El guard `NAV-BTN` falla si un grupo de battle usa otro id o si aparece un botón
de comprobar con id propio sin `__insertInBottomNav`.

En páginas **multi-modo** (phrasal-verbs, verb-chunks, irregular-verbs) el
`#checkBtn` vive dentro de `[data-area="write"]`. `ex-bottom-nav.js` memoriza esa
área en `data-owner-area` la primera vez, porque el hoist saca el botón de ahí:

- `resolveBottomNavProfile()` solo devuelve `practice` si el área de origen está visible — si no, Study perdería su navegación de tarjetas.
- `PRACTICE_NAV_IDS` oculta check/skip/hint fuera de `practice` (simétrico de `STUDY_NAV_IDS`).
- `setupPracticeBottomNav()` solo adopta los botones de la **misma** área, para no reestilizar el `#nextBtn` de Study.

## Deploy

`build.sh` commits + pushes and waits for `CI Validate` + `CD Deploy` workflows on GitHub Actions.
`CD Deploy` only publishes to GitHub Pages if `CI Validate` passed first.

## Known issues

- (none documented)

## Notes

- `📋` icon is used for "Resumen" (not `🏠` — that's reserved for DeskFlow portal across the platform)
- Theme toggle and portal button are `.lp-icon-btn` in the topbar, single instance (no duplicates)
