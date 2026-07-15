# Mi Progreso — Decisiones de diseño e implementación

## Concepto

Nueva pestaña en el sidebar de HubFlow que muestra **rutas de aprendizaje transversales** — agrupaciones de módulos que cruzan categorías con un propósito pedagógico definido.

No reemplaza nada. Las categorías del sidebar (Vocabulary, Grammar, Pronunciation, Analysis, Guides) se mantienen intactas. "Mi Progreso" es una capa adicional que da dirección sin bloquear.

---

## Principios

1. **No restrictivo** — todos los módulos siguen accesibles libremente desde sus categorías.
2. **Transversal** — cada ruta cruza mínimo 3 de las 4 secciones (V/G/P/A).
3. **Propósito real** — la ruta responde a "¿qué logro?" no "¿de qué tipo es?".
4. **Módulos reutilizados** — un módulo puede aparecer en más de una ruta.
5. **Orden por CEFR** — dentro de cada ruta los módulos van de menor a mayor nivel.
6. **Datos en localStorage** — el progreso se calcula leyendo los `scoreKey` existentes (no hay store nuevo).

---

## Diseño visual

### Ubicación
- Nueva pestaña "🛤️ Mi Progreso" en el sidebar, debajo de "📋 Resumen".
- El sidebar NO tiene barras de progreso por categoría (se decidió quitar).
- El topbar NO tiene streak ni stats badge (eso vive solo en Mi Progreso).

### Layout de la sección
- Título: "Mi Progreso — *Rutas de aprendizaje*"
- Botones expand/collapse all: dos iconos SVG (chevrones dobles ↓↓ / ↑↑) a la derecha del título, en un contenedor tipo segmented control con fondo `--lp-bg-paper`.
- Cards colapsables usando `<details>/<summary>` nativo.

### Card colapsada (resumen — estado por defecto)
```
[icon] [título] [badge CEFR: "A1 → B1"]  ...  [Siguiente: Nombre] [status pill] [chevron ▼]
       [═══════════ progress bar ═══════════]                                  [frac: 4/7]
```

### Card expandida
- Descripción de la ruta (1 línea).
- Lista de módulos con:
  - Step indicator (número o ✓).
  - Título + emoji + badge CEFR inline (`.pm-cefr`).
  - Meta (descripción corta).
  - Status pill: "⭐ 95%" (done), "Siguiente →" (next), "Pendiente" (locked).

### Colores por ruta
| Ruta | CSS class | Color |
|------|-----------|-------|
| Spell It Right | `.spell` | `--lp-cat-amber` |
| Build Sentences | `.build` | `--lp-cat-green` |
| Decode Speech | `.decode` | `--lp-cat-blue` |
| Sound Natural | `.natural` | `--lp-cat-purple` |
| Transform & Produce | `.transform` | `--lp-cat-teal` |
| Advanced Mastery | `.advanced` | `--lp-accent` |

---

## Rutas definidas

### 1. ✏️ Spell It Right — "De la regla al oído al texto"
**CEFR: A1 → B1** | Cruza: G + P + V + A

| # | Módulo (id) | CEFR | Sección |
|---|-------------|------|---------|
| 1 | plural-endings | A1 | Pronunciation |
| 2 | ing-spelling | A2 | Grammar |
| 3 | ed-spelling | A2 | Grammar |
| 4 | spelling-by-ear | A2 | Pronunciation |
| 5 | confusing-words | A2 | Vocabulary |
| 6 | paragraph-cloze | A2 | Analysis |
| 7 | word-formation | B1 | Grammar |

### 2. 🧱 Build Sentences — "De piezas sueltas a oraciones completas"
**CEFR: A1 → B1** | Cruza: G + V + A

| # | Módulo (id) | CEFR | Sección |
|---|-------------|------|---------|
| 1 | parts-of-speech | A1 | Grammar |
| 2 | articles | A1 | Grammar |
| 3 | tenses | A1 | Grammar |
| 4 | prepositions | A2 | Grammar |
| 5 | vocabulary | A2 | Vocabulary |
| 6 | word-order | A2 | Analysis |
| 7 | collocations | B1 | Grammar |
| 8 | sentence-combining | B1 | Analysis |

### 3. 👂 Decode Speech — "Del fonema al párrafo completo"
**CEFR: A2 → B1** | Cruza: P + V + A

| # | Módulo (id) | CEFR | Sección |
|---|-------------|------|---------|
| 1 | phonics | A2 | Pronunciation |
| 2 | pron-vowels | A2 | Pronunciation |
| 3 | confusing-words | A2 | Vocabulary |
| 4 | listening | A2 | Pronunciation |
| 5 | dictation-sprint | A2 | Analysis |
| 6 | word-stress-quiz | B1 | Pronunciation |
| 7 | pron-connected | B1 | Pronunciation |
| 8 | phrasal-verbs | B1 | Vocabulary |

### 4. 🗣️ Sound Natural — "De correcto a fluido"
**CEFR: A2 → B1** | Cruza: V + G + P + A

| # | Módulo (id) | CEFR | Sección |
|---|-------------|------|---------|
| 1 | confusing-words | A2 | Vocabulary |
| 2 | phrasal-verbs | B1 | Vocabulary |
| 3 | collocations | B1 | Grammar |
| 4 | pron-intonation | B1 | Pronunciation |
| 5 | pron-connected | B1 | Pronunciation |
| 6 | causative-verbs | B1 | Grammar |
| 7 | preferences | B1 | Grammar |
| 8 | register-switch | B1 | Analysis |

### 5. 🔄 Transform & Produce — "Expresar lo mismo de formas distintas"
**CEFR: A2 → B1** | Cruza: G + A + V

| # | Módulo (id) | CEFR | Sección |
|---|-------------|------|---------|
| 1 | comparisons | A2 | Grammar |
| 2 | opposites | A2 | Vocabulary |
| 3 | odd-one-out | A2 | Analysis |
| 4 | gerunds-infinitives | B1 | Grammar |
| 5 | reported-speech | B1 | Grammar |
| 6 | noun-adjuncts | B1 | Grammar |
| 7 | paraphrasing | B1 | Analysis |
| 8 | register-switch | B1 | Analysis |

### 6. 🏆 Advanced Mastery — "Domina las estructuras avanzadas"
**CEFR: B2 → C1** | Cruza: G + A + V

| # | Módulo (id) | CEFR | Sección |
|---|-------------|------|---------|
| 1 | advanced-collocations | B2 | Grammar |
| 2 | inversions | B2 | Grammar |
| 3 | vocab-pack-sound-natural | B2 | Vocabulary |
| 4 | paraphrasing | B1 | Analysis |
| 5 | register-switch | B1 | Analysis |
| 6 | vocab-pack-c1 | C1 | Vocabulary |
| 7 | cleft-emphasis | C1 | Analysis |

---

## Lógica de progreso

### Cálculo de "completado"
Un módulo se considera completado si tiene al menos 1 entrada en localStorage bajo su `scoreKey` con score ≥ 60%.

```js
function isModuleCompleted(scoreKey) {
  const history = JSON.parse(localStorage.getItem(scoreKey) || '[]');
  return history.some(entry => entry.pct >= 60);
}
```

### Cálculo de "mastered" (⭐)
Score más reciente ≥ 90% O mejor score histórico ≥ 90%.

### Estado de la ruta
- **Sin empezar**: 0 módulos completados.
- **En progreso**: ≥1 módulo completado.
- **Completada**: todos los módulos completados.

### "Siguiente" módulo
El primer módulo no completado en el orden de la ruta.

### Barra de progreso
`completados / total * 100%`

---

## Implementación técnica

### Archivos a modificar
- `index.html` — agregar pestaña en sidebar, sección HTML, CSS, JS.

### No crear archivos nuevos
Todo vive en `index.html` (inline) como el resto de la app. El catálogo de rutas se define como un array en el script del index (no en `data/catalog.js` porque las rutas son una vista, no datos del catálogo).

### Estructura de datos (inline en el script)
```js
const LEARNING_PATHS = [
  {
    id: 'spell-it-right',
    title: 'Spell It Right',
    icon: '✏️',
    color: 'spell', // CSS class
    cefr: 'A1 → B1',
    description: 'De la regla al oído al texto...',
    modules: ['plural-endings', 'ing-spelling', 'ed-spelling', 'spelling-by-ear', 'confusing-words', 'paragraph-cloze', 'word-formation'],
  },
  // ... etc
];
```

### Resolución de scoreKey
Cada `id` del path se busca en el `MODULES` array importado del catálogo para obtener su `scoreKey`.

---

## Decisiones descartadas

- ❌ Barras de progreso en el sidebar por categoría.
- ❌ Streak (días consecutivos) en el topbar.
- ❌ Stats badge (sesiones / mastered) en el topbar.
- ❌ "Continúa aquí" como sección separada.
- ❌ Rutas que replican las categorías 1:1.
- ❌ Rutas tipo "escenario vital" (Job Interview, Pass the Test) — demasiado ambicioso para el contenido actual.
- ❌ Bloqueo de módulos (contradice naturaleza referencial).
- ❌ Zustand o state manager (localStorage existente es suficiente).

---

## Referencia visual

El archivo `preview-paths.html` en la raíz del proyecto muestra el mockup funcional con dark mode, sidebar, y las 5 rutas colapsables. Eliminar después de implementar.
