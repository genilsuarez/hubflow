# LearnHub

Espacio personal de estudio de inglés: ejercicios interactivos de ortografía y gramática.

> Autor: Genil Suarez

---

## Ejercicios disponibles

| Archivo | Tema | Versión | En index |
|---|---|---|---|
| `ing-spelling-rules.html` | -ing Spelling Rules | v1 (legacy) | ✅ |
| `ing-spelling-rules-v2.html` | -ing Spelling Rules | v2 | ✅ |
| `ed-spelling-rules-v1.html` | -ed Spelling Rules | v1 | ❌ falta |
| `noun-adjuncts-v1.html` | Noun Adjuncts | v1 | ✅ |
| `ing-rules-guide.html` | Full -ing Rules Guide | — | solo desde sidebar de v2 |

---

## Estructura de carpetas

```
LearnHub/
├── index.html
├── ing-spelling-rules.html      # legacy
├── ing-spelling-rules-v2.html
├── ed-spelling-rules-v1.html
├── noun-adjuncts-v1.html
├── ing-rules-guide.html
└── README.md
```

---

## Modos de ejercicio

Todos los ejercicios modernos (-ing v2, -ed v1, noun-adjuncts v1) comparten la misma arquitectura:

| Modo | -ing v1 | -ing v2 | -ed v1 | Noun Adjuncts v1 |
|---|:---:|:---:|:---:|:---:|
| 📖 Study | ✅ | ✅ | ✅ | ✅ |
| ⚡ Challenge | ✅ | ✅ | ✅ | ✅ |
| ⏱️ Timed | ❌ | ✅ | ✅ | ✅ |

**-ing v1** es legacy: sin Timed, sin dark mode, sin sidebar/menu, sin niveles, sin historial ni spaced repetition.

### 📖 Study
- Cards coloreadas desde el inicio según su regla.
- Clic en card revela la respuesta con animación + TTS.
- La explicación (`why`) aparece cuando la card está `done`.
- Botones: **Show All** y **Reset**. No graba score en historial.

### ⚡ Challenge
- Cards en color neutro (sin pista visual).
- El usuario escribe la respuesta (ing-form / past-tense / modifier).
- Al acertar aparece el **color picker** para clasificar la regla.
- Hints progresivos:
  - Intento 1: pista general sobre la regla.
  - Intento 2: pista más específica.
  - Intento 3+: muestra mitad de la respuesta + nº de letras.
- **Check Answers** evalúa spelling y color pick por separado.
- Aparece **Stars Overlay** (1–3 ⭐) y graba en localStorage.

### ⏱️ Timed
- Idéntico a Challenge con countdown de 60 segundos.
- Timer pulsa/warn al llegar a ≤10 s.
- Al llegar a 0 se llama `checkAll()` automáticamente.

---

## Niveles (iguales en todos los ejercicios v2+)

| Nivel | Icono | Descripción |
|---|---|---|
| Beginner | 🌱 | Casos básicos sin excepciones |
| Intermediate | 📗 | Palabras polisílabas, reglas de stress |
| Exceptions | ⚡ | Excepciones reales (-x, -ie→ying, -c+k, -oe, -ee…) |
| God Mode | 💀 | Mezcla de todo, incluyendo trampas y edge cases |

---

## Sistema de colores

Los 3 colores (rojo, azul, verde) son consistentes en UI pero su **semántica varía por ejercicio**:

### -ing v2 / -ed v1
| Color | -ing | -ed |
|---|---|---|
| 🔴 Red | Solo añadir -ing | Solo añadir -ed |
| 🔵 Blue | Eliminar -e silenciosa + -ing | Eliminar -e / consonante+y→ied + -ed |
| 🟢 Green | Doblar consonante final + -ing | Doblar consonante final + -ed |

### Noun Adjuncts v1
| Color | Categoría | Ejemplo |
|---|---|---|
| 🔵 Blue | Noun adjunct directo | stone wall, car door |
| 🟢 Green | -ing nominal (actividad/disciplina) | swimming pool, software engineering |
| 🔴 Red | Genitivo / of | engineer's report, cup of coffee |

---

## Scoring

```
score = Math.round(((spellings_ok + colors_ok) / (total * 2)) * 100)
```

| Estrellas | Condición |
|---|---|
| ⭐⭐⭐ | 100% |
| ⭐⭐ | ≥ 60% |
| ⭐ | < 60% |

---

## localStorage

| Ejercicio | Key |
|---|---|
| -ing v2 | `learnhub_ing_v2` |
| -ed v1 | `learnhub_ed_v1` |
| Noun Adjuncts v1 | `learnhub_noun_adjuncts_v1` |

Campos: `best` (%), `played` (int), `history` (últimas 10 sesiones), `failedWords` (verb→count), `theme` (light/dark).

**Spaced repetition:** palabras con más fallos en `failedWords` aparecen primero en el shuffle.

---

## Bugs conocidos

1. **`ed-spelling-rules-v1.html` no está en `index.html`** — solo accesible desde el sidebar de Noun Adjuncts.
2. **"Try Again" del Stars Overlay va siempre a Challenge**, no al modo actual. El botón del post-check sí usa `setMode(mode)` correctamente.
3. **`-ing v1` convive con v2 en el index** sin distinción clara — es inferior en todas las métricas.
4. **Sesiones de Study no se registran en historial** — `recordScore()` solo se llama desde `checkAll()`.
5. **`ing-rules-guide.html` no está en index** — solo accesible desde el sidebar de -ing v2.

---

## Exploits que anulan la dificultad en God Mode

1. **Intentos ilimitados sin penalización** — se puede llegar a 100% por fuerza bruta antes de pulsar Check.
2. **El hint del intento 3 regala la respuesta** — para palabras cortas es la respuesta completa. Combinado con el punto 1: fallar 3 veces a propósito = respuesta gratis.
3. **El streak es cosmético** — no multiplica score ni desbloquea nada.
4. **Stars binarias** — un 99% y un 61% dan lo mismo (ambos 2⭐).
5. **`failedWords` nunca decae** — una palabra fallada una vez queda primera para siempre.
6. **Noun Adjuncts: el color picker da feedback en vivo** — elegir, ver el rojo, y cambiar es posible. En -ing v2 y -ed v1 el pick no da feedback hasta Check. El 50% del score de colores queda garantizado.
7. **Noun Adjuncts God: 11 de 16 respuestas son azules** — pulsar siempre azul acierta el 69% sin saber nada.
8. **Timer de 60s fijo sin importar el nivel** — God -ing tiene 34 palabras (68 tareas); 60s es imposible, lo que invita a ignorar el modo Timed en niveles altos.
9. **Solapamiento masivo Exceptions→God** — 10 de 16 palabras de Exceptions se repiten en God en -ing v2.
10. **Error de clasificación:** `data science team` está marcado verde pero debería ser azul (noun adjunct, no hay -ing real).

---

## Mejoras propuestas

### P1 — Arreglar exploits (impacto alto, esfuerzo bajo)

| # | Mejora | Detalle |
|---|---|---|
| 1 | **Penalizar intentos en el score** | 100% al 1er intento, 60% al 2do, 30% al 3ro+. `attempts` ya existe en `st[i]`, solo falta usarlo en `checkAll()` |
| 2 | **Quitar el hint revelador en God** | En God: solo hints de regla, nunca letras |
| 3 | **Eliminar feedback en vivo del color picker en Noun Adjuncts** | Igualarlo a -ing/-ed: el pick colorea la card pero no dice si es correcto hasta Check |
| 4 | **Escalar el timer** | `timeLeft = words.length * N` (5-6 s/palabra en beginner, 4 en God) |

### P2 — Endurecer God Mode

| # | Mejora | Detalle |
|---|---|---|
| 5 | **Sistema de vidas en God** | 3 fallos totales = game over, grabado en history |
| 6 | **Reducir solapamiento Exceptions→God** | Sustituir repetidos por variantes nuevas o pares trampa (dying/dyeing, hoping/hopping) |
| 7 | **Balancear colores en Noun Adjuncts God** | Apuntar a ~6/5/5 y diversificar temas (no solo títulos tech) |
| 8 | **Corregir `data science team`** a azul |
| 9 | **Streak con valor** | Bonus de score por racha o multiplier en Timed |

### P3 — Mejoras estructurales

| # | Mejora | Detalle |
|---|---|---|
| 10 | **Gate de niveles** | Desbloquear Exceptions con ≥2⭐ en Intermediate, God con ≥2⭐ en Exceptions |
| 11 | **Best score por nivel y modo** | Ahora `best` es global; separarlo por nivel |
| 12 | **Decay de `failedWords`** | Restar 1 al acertar a la primera |
| 13 | **Modo "Reverse"** | Dado "dyeing", escribir el verbo base + elegir regla |
| 14 | **Respuestas múltiples válidas en Noun Adjuncts** | Campo `accept: ["stone","brick"]` o gloss en español |
| 15 | **Stars más granulares** | 3⭐ ≥95%, 2⭐ ≥75%, 1⭐ ≥50% |

---

## Noun Adjuncts — Referencia pedagógica

### Las 3 categorías

| Color | Categoría | Descripción | Ejemplo |
|---|---|---|---|
| 🔵 Azul | Noun Adjunct directo | Sustantivo modifica sustantivo sin cambio morfológico | stone wall, car door |
| 🟢 Verde | -ing nominal (disciplina) | El modificador denota actividad o campo | software engineering, swimming pool |
| 🔴 Rojo | Genitivo / of / alternativo | La relación pide 's, "of", o adjetivo puro | engineer's report, wall of stone |

### Estructura de datos de cada tarjeta

```js
{
  prompt: "stone ___",
  modifier: "stone",
  nucleus: "wall",
  full: "stone wall",
  rule: "blue",
  why: "Noun adjunct: sustantivo modifica sustantivo directamente",
  focus: "material"   // etiqueta semántica del modificador
}
```

### Niveles de Noun Adjuncts

**🌱 Beginner** — Noun adjunct directo simple (todos azul)
`stone wall, car door, cloud server, garden party, bus stop, coffee cup, kitchen table, fire station, rain coat, night shift, book shelf, beach house, sun glasses, road sign, lunch box, air bag`

**📗 Intermediate** — Mezcla adjunto / -ing nominal
`software engineering (verde) vs. software engineer (azul)`, `swimming pool (verde) vs. swim team (azul)`, `parking space (verde) vs. car park (azul)`, `cooking class (verde) vs. cook book (azul)`, `driving license (verde) vs. driver seat (azul)`

**⚡ Exceptions** — Genitivo vs. adjunto vs. of
`engineer's report, manager of engineering, children's hospital, team's decision, cup of coffee, piece of advice, wall of fire, company policy (azul)`

**💀 God Mode** — Títulos corporativos, orden de modificadores
`cloud engineering manager, senior software engineer, data science team, head of engineering, VP of product, platform & finops manager`
