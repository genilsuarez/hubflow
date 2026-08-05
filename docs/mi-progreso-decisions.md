# Mi Progreso — Decisiones de diseño e implementación

> Este archivo se borró en `39939bd` mientras `AGENTS.md` seguía apuntando a él. Se restauró y
> actualizó al sistema actual (agosto 2026). El historial original está en
> `git show 39939bd~1:docs/mi-progreso-decisions.md`.

## Concepto

**Rutas de aprendizaje transversales** — agrupaciones de módulos que cruzan categorías con un
propósito pedagógico definido. Se muestran en dos vistas sobre los mismos datos:

- **Rutas guiadas** (`renderRutas`) — grid de cards con los pasos como chips.
- **Mi Progreso** (`renderPaths`) — acordeón con el detalle de cada paso y su estado.

No reemplaza nada. Las categorías del sidebar (Vocabulary, Grammar, Pronunciation, Analysis,
Guides) se mantienen intactas. Es una capa adicional que da dirección sin bloquear.

---

## Principios

1. **No restrictivo** — todos los módulos siguen accesibles libremente desde sus categorías.
2. **Transversal** — cada ruta cruza mínimo 3 de las 4 secciones (V/G/P/A). Excepción: `deepDive`.
3. **Propósito real** — la ruta responde a "¿qué logro?" no "¿de qué tipo es?".
4. **Módulos reutilizados** — un módulo puede aparecer en más de una ruta.
5. **Orden por CEFR** — dentro de cada ruta los módulos van de menor a mayor nivel.
6. **Datos en localStorage** — el progreso se calcula leyendo los `scoreKey` existentes.

### Excepción `deepDive` (agosto 2026)

`clear-speech` y `native-prosody` cruzan **una sola sección** y llevan `deepDive: true`. Los 11
módulos de Pronunciation por encima de A2 no tienen pareja temática en otra sección: o son una
ruta de una sola categoría, o quedan fuera del sistema guiado — Pronunciation C1 estaba en 0/5.

La excepción es explícita y validada en los dos sentidos: una ruta `deepDive` que llegue a cruzar
3 secciones también falla, para que la marca no sobreviva a su motivo.

---

## Qué NO se declara en `learning-paths.js`

`data/learning-paths.js` contiene solo `id`, `title`, `icon`, `description`, `modules` (y el flag
`deepDive` donde aplica). Todo lo demás se **deriva del catálogo**:

| Dato | Se deriva con | Por qué no se declara |
|------|---------------|------------------------|
| Rango CEFR (`"A1 → B1"`) | `pathCefrRange()` | Un string en duro mintió durante todo el rebalanceo de julio 2026: el catálogo re-niveló `pron-connected`, `causative-verbs` y `register-switch` de B1 a B2, y tres rutas siguieron anunciando "A2 → B1". |
| Etapa del grid | `pathStage()` / `pathsByStage()` | Un campo más que mantener a mano es un campo más que se desincroniza. |
| Secciones cruzadas | `pathSections()` | Igual: se lee del `category` de cada módulo. |
| Color de la ruta | — | El campo `color` existió y **nunca lo leyó ningún render** (`renderRutas` forzaba `var(--lp-accent)`). Se eliminó. Si algún día se quiere color por ruta, cablearlo primero y declararlo después. |

---

## Etapas del grid

Se derivan del nivel al que la ruta **te lleva** ("si la terminas, quedas en X"), no del nivel de
entrada: una ruta que arranca en A1 y termina en B2 no es material de Fundamentos.

| Etapa | Regla | Rutas |
|-------|-------|-------|
| Fundamentos | target ≤ A2 | 4 |
| Intermedio | target B1–B2 | 10 |
| Avanzado | target C1 | 5 |

---

## Bloqueo de módulos: descartado, y por qué se revirtió

El diseño original lo listaba en *Decisiones descartadas* ("contradice naturaleza referencial"),
pero `renderPaths` lo implementó igual: `canOpen = done || isNext`, y todo lo demás salía como
`<div aria-disabled="true">` con pill "Pendiente".

Tres problemas:

1. Contradecía el principio 1.
2. Combinado con los saltos de orden CEFR que había, obligaba a aprobar un B2 para abrir un B1.
3. Las dos vistas de los mismos datos no coincidían: `renderRutas` nunca bloqueó, `renderPaths` sí.

Hoy **todos los pasos son `<a>` navegables** en ambas vistas. "Pendiente" señala el orden sugerido,
no un candado.

---

## Lógica de progreso

- **Completado**: ≥1 entrada bajo su `scoreKey` con score ≥ `HUBFLOW_PASS_SCORE_PCT` (60%).
- **Estado de la ruta**: Sin empezar (0) · En progreso (≥1) · Completada (todos).
- **"Siguiente"**: el primer módulo no completado en el orden de la ruta.
- **Barra**: `completados / total * 100%`.

Nota: los módulos compartidos entre rutas (principio 4) cuentan en todas. Una ruta puede mostrar
progreso sin haberla visitado si sus módulos se completaron desde otra.

---

## Validación en CI

`scripts/validate-content.js` → `validateLearningPaths()`:

| Código | Regla |
|--------|-------|
| `PATH-ID` | todo id existe en `catalog.js`; no hay rutas con id duplicado |
| `PATH-ORDER` | ningún par consecutivo baja de nivel CEFR (principio 5) |
| `PATH-DUP` | un id no se repite dentro de la misma ruta |
| `PATH-SECTIONS` | ≥3 secciones, salvo `deepDive` (y `deepDive` sin motivo también falla) |
| `PATH-FIELD` | rechaza reintroducir `cefr` o `color` |
| `PATH-COVERAGE` | **warning**: imprime cobertura total y por nivel en cada build |

`PATH-COVERAGE` es warning a propósito: el catálogo siempre puede crecer más rápido que las rutas.
Lo que importa es que el número sea visible en cada build — en julio 2026 entraron 71 módulos al
catálogo, ninguno entró a una ruta, y nadie se enteró durante cuatro días.

---

## Decisiones descartadas

- ❌ Barras de progreso en el sidebar por categoría.
- ❌ ~~Streak (días consecutivos) en el topbar~~ — revertido 2026-08-04, ver *Reversiones*.
- ❌ Stats badge (sesiones / mastered) en el topbar.
- ❌ ~~"Continúa aquí" como sección separada~~ — revertido 2026-08-04, ver *Reversiones*.
- ❌ Rutas que replican las categorías 1:1.
- ❌ **Bloqueo de módulos** (contradice naturaleza referencial) — ver arriba.
- ❌ Zustand o state manager (localStorage existente es suficiente).
- ❌ Declarar el rango CEFR, la etapa o el color a mano.

---

## Reversiones (2026-08-04)

Dos ítems de *Decisiones descartadas* se revierten con el plan de mejoras UX de esta fecha
(`Learn/docs/ux-improvement-plan.md`, decisión 5). El resto de la lista queda intacta.

- **Streak en el topbar** → se revierte. El descarte original era sobre la **ubicación**
  (topbar), no sobre el concepto: un bloque de streak en el cuerpo del dashboard no lo
  contradice literalmente. Alcance decidido: streak de plataforma, que suma actividad de
  FluentFlow + HubFlow + LyricFlow (Fase 4.1 del plan).
- **"Continúa aquí" como sección separada** → se revierte.

Nota aparte, no una tercera reversión: esta lista ya estaba desactualizada antes de este
plan. También descarta "Stats badge (sesiones / mastered) en el topbar", y hoy las 4 apps
tienen exactamente eso (`.lp-header-stats`) — ya se había revertido en la práctica sin que
nadie actualizara este documento. Queda anotado para que no genere la misma confusión que
el streak.
