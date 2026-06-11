# Plan: noun-adjuncts-v1.html

## Tema pedagógico
Noun Adjuncts y composición nominal en inglés — cómo un sustantivo modifica a otro,
cuándo usar la forma base, la forma -ing (disciplina), genitivo o preposición of.

---

## Las 3 "reglas" / categorías (colores)

| Color | Categoría | Descripción | Ejemplo |
|-------|-----------|-------------|---------|
| 🔵 Azul | Noun Adjunct directo | Sustantivo modifica sustantivo sin cambio morfológico | stone wall, car door, cloud server |
| 🟢 Verde | -ing nominal (disciplina) | El modificador denota actividad o campo → forma -ing | software engineering, swimming pool |
| 🔴 Rojo | Genitivo / of / alternativo | La relación pide 's, "of", o adjetivo puro | the engineer's report, wall of stone |

---

## Mecánica de la tarjeta (heart card)

La tarjeta muestra el **núcleo** + un **contexto semántico** (quién/qué modifica).

Ejemplo de tarjeta:
- Prompt: `___ wall` + etiqueta "material"
- Respuesta: `stone wall` (azul — noun adjunct directo)

O en modo Challenge el alumno escribe el modificador correcto y elige el color de categoría.

---

## Niveles

### 🌱 Beginner — Noun adjunct directo simple
Pares claros donde el sustantivo modifica sin ambigüedad.
- stone wall, car door, cloud server, garden party
- bus stop, coffee cup, kitchen table, fire station
- rain coat, night shift, book shelf, beach house
- sun glasses, road sign, lunch box, air bag

Todos son **azul** (noun adjunct directo).

### 📗 Intermediate — Mezcla adjunto / -ing nominal
Introduce la distinción persona vs. disciplina y propósito.
- software engineering (verde) vs. software engineer (azul)
- swimming pool (verde) vs. swim team (azul)
- parking space (verde) vs. car park (azul)
- cooking class (verde) vs. cook book (azul)
- driving license (verde) vs. driver seat (azul)
- running shoes (verde) vs. sprint track (azul)
- writing desk (verde) vs. note pad (azul)
- meeting room (verde) vs. board room (azul)

### ⚡ Exceptions — Genitivo vs. adjunto vs. of
Casos donde el noun adjunct falla o cambia de significado.
- the engineer's report (rojo — posesión individual)
- manager of engineering (rojo — of formal)
- children's hospital (rojo — 's con plural irregular)
- team's decision (rojo — asociación colectiva)
- cup of coffee (rojo — composición/contenido con of)
- piece of advice (rojo — of para incontables)
- wall of fire (rojo — of metafórico)
- company policy (azul — adjunto institucional sin 's)

### 💀 God Mode — Título corporativo / orden de modificadores
Los casos más finos: persona vs. disciplina, orden canónico de modificadores.
- cloud engineering manager (verde+azul — disciplina + rol)
- cloud engineer manager (azul — manager de individuos, suena raro)
- soft blue brick house → orden correcto Opinion→Color→Material→Noun
- senior software engineer (azul — opinion/rank + dominio + rol)
- data science team (verde+azul)
- head of engineering (rojo — of formal en títulos)
- VP of product (rojo)
- platform & finops manager (azul — dominio + rol)

---

## Mecánica del challenge (adaptada al tema)

**Modo Study:** se muestra el par completo + categoría + explicación al hacer click.

**Modo Challenge:**
- Se muestra el **núcleo** (p.ej. "pool")
- El alumno escribe el modificador correcto (p.ej. "swimming")
- Luego elige el color de categoría (azul/verde/rojo)
- Hints progresivos si falla:
  - 1er intento: pista semántica ("¿modifica una cosa o una actividad?")
  - 2do intento: pista estructural ("¿termina en -ing?")
  - 3er intento: muestra primeras letras

**Modo Timed:** igual que challenge pero con 60s.

---

## Datos de tarjeta (estructura JS)

```js
{
  prompt: "stone ___",       // lo que ve el alumno
  modifier: "stone",         // modificador correcto
  nucleus: "wall",           // núcleo
  full: "stone wall",        // forma completa
  rule: "blue",              // azul/verde/rojo
  why: "Noun adjunct: sustantivo modifica sustantivo directamente",
  focus: "material"          // etiqueta semántica del modificador
}
```

---

## Reglas mini (sidebar)

```
🔵 Noun adjunct    stone wall
🟢 -ing nominal    swimming pool
🔴 Genitivo / of   engineer's report
```

---

## Título y gradiente

- Título: `Noun Adjuncts`
- Subtítulo badge: `v1`
- Gradiente h1: azul → verde → rojo (los 3 colores del tema)

---

## Archivo de salida

`noun-adjuncts-v1.html`

Enlace desde `index.html` con la tarjeta:
```html
<a class="topic-card" href="noun-adjuncts-v1.html">
  <h2>🔤 Noun Adjuncts</h2>
  <p>Composición nominal: adjunto, -ing nominal, genitivo y "of"</p>
</a>
```
