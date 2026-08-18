# Niveles de dominio por módulo (Aprobado / Maestría) — Plan

> Estado: **propuesta, decisiones de diseño cerradas (§5), sin implementar**. Generado a pedido
> del usuario tras discutir el ring de progreso del nivel
> ([js/level-status.js](../../js/level-status.js)) — idea inspirada en el patrón de Duolingo
> (check normal vs. corona dorada por lección). Ampliado luego para exigir Study también en el
> nivel base "Aprobado", no solo en "Maestría".

## 1. Pedido original

Hoy un módulo de HubFlow se marca "completado" (✓ en la tarjeta, cuenta para el % de progreso)
con un único umbral parejo para todos. La propuesta: separar en dos niveles, igual que Duolingo —

- **Aprobado**: basta con pasar el quiz para contar como hecho (rápido, cubre lo esencial).
- **Maestría/100%**: solo se gana si el usuario pasó por *todo* el contenido del módulo — todas las
  categorías, todos los modos (Study, Quiz, Match, Battle, Timed, etc.), no solo el quiz.

Objetivo declarado: dar una señal honesta de "hiciste lo mínimo" vs. "te lo sabes de verdad",
sin obligar a nadie a hacer el trabajo pesado si no quiere.

### 1.1 Ampliación del pedido — Study obligatorio también para Aprobado

El usuario no quiere que Study quede como algo que solo suma para Maestría — no quiere que nadie
se lo salte, ni siquiera para el nivel básico. Esto **redefine "Aprobado"**, no solo agrega un
tier nuevo: pasar por Study (ver todos los items) pasa a ser requisito, junto con el quiz actual,
para que un módulo cuente como Aprobado. Ver §4.1 (tabla actualizada) y §4.4 (impacto técnico y
en el umbral de nivel).

## 2. Cómo funciona hoy (línea base)

### 2.1 Regla de "completado" actual

[data/catalog.js:2262](../../data/catalog.js) define `PROGRESS_RULES` por módulo: un contrato
explícito de qué `scoreKey`s de localStorage cuentan y qué % de acierto (`HUBFLOW_PASS_SCORE_PCT
= 60`, [data/catalog.js:2236](../../data/catalog.js)) hace falta por cada uno.

**El bar actual ya es inconsistente entre módulos** — no es un umbral parejo como parecía desde
afuera:

- La mayoría de los módulos de vocabulario (`flashcard`, 5 modos: Study/Quiz/Match/Battle/Timed)
  solo exigen pasar el **quiz** de cada categoría interna. Ej. `body-appearance` — 4 categorías ×
  modo `quiz` únicamente ([data/catalog.js:2263](../../data/catalog.js)).
- Algunos módulos de gramática/pronunciación ya exigen **varios modos** para marcarse completos.
  Ej. `phrasal-verbs` exige `quiz` + `write` + `sort` + `match` ×  8 categorías
  ([data/catalog.js:2287](../../data/catalog.js)); `irregular-verbs` exige `quiz`+`write`+`match`+`sort`
  ([data/catalog.js:2305](../../data/catalog.js)).

O sea: hoy ya existen dos poblaciones de módulos con exigencia distinta, pero no se comunica —
todos muestran el mismo ✓ verde. La propuesta del usuario no solo agrega un tier nuevo, también
**resuelve esta inconsistencia silenciosa** al hacerla explícita.

### 2.2 Profundidad real por módulo

[data/catalog.js:2440](../../data/catalog.js) `MODULE_DEPTH` ya trackea el universo completo por
módulo: `items`, `categories`, `modes`, `hasBattle` — es lo que hoy se muestra en el badge
`.book-depth` de cada tarjeta ("40 items · 4 cat · 5 modos ⚔️2P"). **Ya existe el dato de "cuánto
es el 100%"**, solo no se usa como criterio de completitud, solo como texto informativo.

### 2.3 Dónde se ve hoy

`.book-progress` ([js/dashboard-shelves.js:70](../../js/dashboard-shelves.js)) renderiza `X%` o un
✓ (`book-progress--done`) según `getContentProgress(mod.id).completed` — un solo booleano, sin
espacio para un segundo nivel.

### 2.4 Study hoy no guarda nada (hallazgo crítico para §1.1)

Revisado [js/engines/flashcard-engine.js](../../js/engines/flashcard-engine.js) — el motor de Study en la mayoría
de los módulos (49 módulos declaran `engine: 'flashcard'` en `MODULE_DEPTH`, más los que se
calculan dinámicamente desde `vocabulary.js`). **Study no persiste ningún estado por item**: no
hay `scoreKey`, no hay flag de "visto", no hay nada en localStorage salvo una preferencia de
auto-lectura de audio (`AUTOSPEAK_KEY`). Exigir Study para Aprobado requiere instrumentar el
motor desde cero para trackear qué cartas vio el usuario — no es un cálculo nuevo sobre datos que
ya existen, como sí lo eran Quiz/Match/Write/Timed.

## 3. Opinión sobre el enfoque

**Vale la pena, y encaja mejor de lo que parece** — la mitad de la infraestructura de datos ya
existe (`MODULE_DEPTH` describe el 100% real; `PROGRESS_RULES` ya es por-módulo y ya varía en
exigencia). Falta la mitad de "usarlo como segundo umbral" y la mitad de UI.

Tres puntos que había que resolver antes de tocar código, porque cada uno tenía una trampa —
decisiones tomadas en §5:

**a) Modo Study no tiene "aprobar".** Study es repaso de flashcards sin quiz — no genera un
`scoreKey` con score, solo attempts/vistas. Se resolvió: cuenta como cumplido con "visto todos
los items al menos una vez", sin exigir un score que Study no genera.

**b) Battle es 2 jugadores.** Si "maestría" exigiera completar *todos* los modos y Battle fuera
uno de ellos, un usuario que juega solo nunca podría llegar a maestría. Se excluye del criterio
explícitamente (igual que ya está excluido de `PROGRESS_RULES` hoy).

**c) El umbral de nivel (50%) sí se ve afectado — por decisión explícita.** El % que cuenta para
subir de nivel compartido con FluentFlow/LyricFlow se calcula sobre "Aprobado"
([js/lp-progress-summary.js:737](../../js/lp-progress-summary.js), promedio de `progressPct` por
módulo). Como §1.1 redefine Aprobado para exigir Study, subir de nivel se vuelve automáticamente
más difícil — decisión tomada conscientemente en §5, no un efecto colateral no deseado. Maestría
en sí (el tier de arriba, todas las categorías × todos los modos salvo Battle) sigue sin tocar el
umbral — la capa que sí lo toca es la redefinición de Aprobado, no Maestría.

Con esas tres reglas explícitas, el diseño queda sólido y el patrón (check vs. corona) es un
lenguaje visual que el usuario ya conoce de otras apps — baja fricción de aprendizaje para leer
la interfaz.

## 4. Propuesta de diseño

### 4.1 Definición de los dos niveles

| Nivel | Criterio | Cambia vs. hoy |
|---|---|---|
| **Aprobado** (✓ actual) | `PROGRESS_RULES[id]` actual (quiz de cada categoría, o quiz+otros modos en los ~20 módulos que ya lo exigen) **+ Study: ver todos los items del módulo al menos una vez** | **Sí cambia** — se agrega Study como requisito nuevo a todos los módulos, sobre el criterio existente |
| **Maestría** (nuevo) | Todas las categorías × todos los modos de `MODULE_DEPTH[id]`, **excluyendo Battle**, con el mismo `passScorePct` (60%) donde el modo tenga score; Study ya viene cubierto por el requisito que ahora tiene Aprobado | Nuevo — para la mayoría de módulos flashcard, la diferencia con Aprobado queda en completar también Match y Timed |

Para los ~20 módulos que ya exigen varios modos en `PROGRESS_RULES` (`phrasal-verbs`,
`irregular-verbs`, etc.), **Maestría no exige nada adicional** — si Aprobado ya cubre
prácticamente todo el contenido salvo Study/Battle, coinciden automáticamente sin inventar un
requisito extra artificial. Solo aplica la definición general de la tabla; no hay reglas
especiales por módulo.

### 4.2 UI

- Tarjeta de módulo (`.book-progress`): el ✓ verde actual sigue representando "Aprobado". Al
  llegar a maestría, se agrega **👑 (corona)** junto al ✓ — mismo patrón visual que el badge
  `⚔️2P` ya usado en `.book-depth` (icono + texto corto "Maestría" en el label accesible, sin
  romper el layout ya compactado).
- `getContentProgress()` en [js/progress-store.js](../../js/progress-store.js) necesita devolver
  un segundo booleano (`mastered`, o `masteryTier: 'approved' | 'mastered'`) sin romper el
  contrato actual de `completed` (consumido en varios lugares: hero, rutas guiadas, mis
  estadísticas).
- **Retroactividad automática solo para Quiz/Match/Write/Timed** (ya tienen `scoreKeys` en
  localStorage). **Para Study no hay retroactividad posible** — nunca se guardó nada, así que no
  hay dato histórico que leer (ver §2.4 y §4.4).
- Mis estadísticas / Rutas guiadas: decidir si cuentan solo "Aprobados" (como hoy) o si suman un
  contador aparte de maestrías — probablemente un contador aparte, no reemplazo.

### 4.3 Fuera de alcance explícito

- No se bloquea el acceso a Quiz ni a ningún otro modo esperando a que el usuario pase por Study
  primero — el orden queda libre, solo cambia qué cuenta como Aprobado (decisión §5). Principio
  "No restrictivo" ya establecido en
  [docs/mi-progreso-decisions.md](../mi-progreso-decisions.md) §Principios se mantiene para
  *acceso*; sí se abandona para *cómputo de completitud*, que es lo que el usuario pidió.

### 4.4 Impacto real del día del lanzamiento (léase antes de implementar)

Combinando §2.4 (Study nunca guardó nada) con la decisión de §5 (retroactividad pareja, sin
excepción por fecha de corte):

- **El día que esto se despliegue, todos los módulos que hoy muestran ✓ pierden el check en todas
  las cuentas** (locales y las sincronizadas por Supabase, si aplica) hasta que el usuario entre
  a Study y pase por cada item — sin importar si ya lo había hecho antes, porque no quedó
  registrado. No es un efecto marginal: es un reset visible del check de aprobación de,
  potencialmente, todos los módulos que alguien ya tenía marcados.
- Por la misma razón, **el % de HubFlow que alimenta el umbral de nivel compartido (50%) puede
  bajar de golpe** para cuentas que ya estaban cerca o por encima del umbral — incluida la cuenta
  actual del usuario si tiene módulos aprobados sin Study registrado.
- Recomendado (no decidido aún, agregar si se confirma): comunicar el cambio antes o al momento
  del lanzamiento — un aviso puntual en Inicio ("ahora Study también cuenta para el ✓ — repasa tus
  módulos aprobados") evita que se lea como un bug o una pérdida de progreso silenciosa.

## 5. Decisiones de diseño (cerradas)

| Pregunta | Decisión |
|---|---|
| Modo Study sin score | Cuenta como cumplido con **"visto todos los items al menos una vez"** — no exige un score que Study no genera. |
| Ícono / nombre del tier | **👑 Corona — "Maestría"**. |
| Retroactividad (Quiz/Match/Write/Timed) | **Automática.** Se calcula leyendo los `scoreKeys` ya existentes en localStorage. |
| Módulos ya multi-modo (`phrasal-verbs`, `irregular-verbs`, etc.) | **Maestría = Aprobado ahí**, sin requisito adicional artificial. |
| **Study obligatorio también para Aprobado** (no solo Maestría) | **Sí** — nadie debe poder saltárselo, ni para el nivel básico. Redefine Aprobado (§4.1). |
| Bloquear Quiz hasta completar Study en la UI | **No** — solo cambia el cálculo de qué cuenta como Aprobado; el acceso a los modos queda libre. |
| Módulos ya aprobados sin Study registrado, al lanzar la feature | **Pierden el ✓ parejo, sin excepción por fecha** — confirmado incluso sabiendo que Study nunca guardó nada y esto afecta el 100% de los módulos aprobados existentes, no solo casos puntuales (§4.4). |

## 6. Fases sugeridas (listo para implementar)

0. **Instrumentar Study** (bloqueante — nada más puede leer un dato que no existe): agregar
   tracking de "item visto" en [js/engines/flashcard-engine.js](../../js/engines/flashcard-engine.js) (y motores
   equivalentes de módulos no-flashcard, si Study aplica ahí) — un nuevo `scoreKey` o flag por
   item que se guarde en localStorage al navegar cada carta. Definir el contrato en
   `PROGRESS_RULES` igual que ya existe para quiz/write/etc.
1. **Datos**: redefinir `PROGRESS_RULES`/`getContentProgress()` para que Aprobado exija el
   criterio actual + Study (items vistos), y calcular el tier Maestría por módulo a partir de
   `MODULE_DEPTH` + los `scoreKeys` de todos los modos salvo Battle.
2. **Aviso de lanzamiento** (ver §4.4): banner puntual explicando el cambio antes de que la gente
   note que sus checks desaparecieron.
3. **UI**: el ✓ verde ahora depende del nuevo criterio (incluye Study); badge 👑 Maestría en
   `.book-progress` + contador global en Mis estadísticas.
4. **Validación**: correr sobre datos reales de progreso existentes para confirmar cuántos módulos
   quedan sin ✓ tras el cambio (esperado: todos, hasta que se rejuegue Study — ver §4.4) y que el
   % de nivel se recalcula coherentemente.
5. **Rutas guiadas** (opcional, fase posterior): si se quiere, mostrar maestrías también ahí.
