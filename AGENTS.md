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
exercises/          — 43 exercise pages, one per topic
guides/             — 23 reference pages (rules, tables, quick lookup)
data/
  catalog.js        — Metadata for 61 modules (title, category, CEFR, scoreKey...)
  *.js              — One data file per exercise topic
css/
  base.css          — Tokens --lp-*, reset, typography
  buttons.css       — Shared button system (.lp-btn/.lp-icon-btn/.lp-pill)
  components.css    — Top-bar, categories, progress, flashcards, .cat-btn, .word-opt
  *-shell.css       — Per-engine-family styles
js/
  *-engine.js       — One engine per exercise family
  utils.js          — shuffle, Timer, recordScore, initTheme/toggleTheme, progress tracking
  theme-init.js     — Reads ?theme=/localStorage before first paint
  portal-link.js    — "Back" button: history.back() or fallback to index
docs/
  mi-progreso-decisions.md  — Learning paths design decisions
scripts/
  validate-content.js       — Validates data/*.js before deploy (blocking)
  analyze-content.mjs       — Content analysis
  tmp/                      — Temporary scripts (gitignored)
build.sh            — Commit + push + wait for CI Validate/CD Deploy
```

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

| Engine | CSS | Modes | Examples |
|--------|-----|-------|----------|
| `flashcard-engine.js` | `flashcard-shell.css` | Study / Quiz / Match / Battle / Timed | vocabulary, opposites, pronunciation-study |
| `spelling-engine.js` | `spelling-shell.css` | Beginner / Intermediate / Exceptions / God Mode | ed-spelling, ing-spelling, noun-adjuncts |
| `sentence-quiz-engine.js` | `sentence-quiz.css` | Study / Practice / Timed + categories (`.cat-btn`) | articles, conditionals, inversions |
| `typed-answer-engine.js` | `typed-answer-shell.css` | Study / Practice / Timed, typed response | paraphrasing, word-order, register-switch |
| — (standalone) | `exercise-enhanced.css` | Page manages its own state | confusing-words, listening, error-hunt |

Each family uses `[data-color="..."]` on its wrapper to pick up category color (`--lp-cat-*`).

## Mi Progreso — Learning paths

6 cross-category paths with pedagogical purpose. Non-blocking — suggested progression only.
Progress calculated from `scoreKey` entries in localStorage (≥60% = completed).

See `docs/mi-progreso-decisions.md` for full details.

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

## Deploy

`build.sh` commits + pushes and waits for `CI Validate` + `CD Deploy` workflows on GitHub Actions.
`CD Deploy` only publishes to GitHub Pages if `CI Validate` passed first.

## Known issues

- (none documented)

## Notes

- `📋` icon is used for "Resumen" (not `🏠` — that's reserved for DeskFlow portal across the platform)
- Theme toggle and portal button are `.lp-icon-btn` in the topbar, single instance (no duplicates)
