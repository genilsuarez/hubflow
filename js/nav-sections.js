/**
 * nav-sections.js — Secciones de navegación de HubFlow (fuente única).
 *
 * La misma lista se necesitaba en index.html (sidebar del dashboard) y en
 * exercise-shell.js (sidebar dentro de un ejercicio). Estaban duplicadas y
 * derivaron: "Rutas guiadas" existía en el dashboard pero no en los ejercicios,
 * aunque exercise-shell.js sí la aceptaba como sección de vuelta válida.
 *
 * `primary: true` = va suelta arriba del sidebar.
 * El resto se agrupa bajo "Explorar temas".
 *
 * El sidebar de index.html es HTML estático (se pinta antes de que corra el JS).
 * No se genera desde aquí a propósito, pero validate-content.js comprueba que
 * coincida con esta lista — si divergen, falla el build (NAV-SYNC).
 */

import { CATEGORIES } from '../data/catalog.js';

/** Clase de color del sidebar por categoría (la inicial, histórica en el CSS). */
const SIDEBAR_CLS = { vocab: 'v', grammar: 'g', pronunciation: 'p', analysis: 'a' };

export const NAV_SECTIONS = [
  { key: 'resumen',     icon: 'home',  label: 'Inicio',           cls: '',     primary: true },
  { key: 'rutas',       icon: 'route', label: 'Rutas guiadas',    cls: 'path', primary: true },
  { key: 'mi-progreso', icon: 'chart', label: 'Mis estadísticas', cls: 'path', primary: true },
  // Las 4 categorías salen de catalog.js — su label es el mismo que el de las
  // estanterías del dashboard, así que no se reescribe aquí.
  ...Object.entries(CATEGORIES).map(([key, cat]) => ({
    key, icon: 'diamond', label: cat.label, cls: SIDEBAR_CLS[key] || '',
  })),
  { key: 'guides',      icon: 'diamond', label: 'Guías de referencia', cls: 'r' },
];

/** Claves válidas de sección — para validar ?section= y la vuelta desde un ejercicio. */
export const NAV_SECTION_KEYS = NAV_SECTIONS.map((s) => s.key);
