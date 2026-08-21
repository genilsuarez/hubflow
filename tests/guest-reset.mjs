#!/usr/bin/env node
// lp-guest-reset.js — borrado de progreso local (reset de invitado / logout).
//
// Específico de HubFlow porque necesita data/catalog.js, pero lo que prueba es
// el archivo COMPARTIDO (canónico en Learn/scripts/, copiado a las 4 apps).
// El gate de deriva de lp-build-validate.sh garantiza que las copias coinciden,
// así que verificarlo acá cubre a las cuatro.
//
// Por qué existe: HUB_SCORE_PREFIX_RE es una lista de prefijos mantenida a mano
// que se desincronizó del catálogo — cubría 41 de 88, así que un reset dejaba
// vivo el historial de los módulos con los 47 prefijos faltantes. El síntoma es
// silencioso: el reset "funciona", y el progreso reaparece en cuanto
// progress-store.js reconstruye la proyección desde los scoreKeys sobrevivientes.
//
// Es el mismo patrón que ya costó dos rondas en el sistema de progreso: una
// lista estática que se cae del catálogo sin que nada avise.
//
// Correr:  node tests/guest-reset.mjs

import { PROGRESS_RULES } from '../data/catalog.js';

let passed = 0;
const failures = [];

function check(name, fn) {
  try {
    fn();
    passed++;
  } catch (error) {
    failures.push({ name, message: error.message });
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) throw new Error(`${message} — esperado ${expected}, obtenido ${actual}`);
}

// Las claves se modelan como propiedades y los métodos como no-enumerables: el
// código bajo prueba recorre Object.keys(localStorage), así que un stub con los
// métodos enumerables haría pasar la prueba sin ejercitar nada.
function makeStorage(seed = {}) {
  const store = {};
  const define = (name, value) =>
    Object.defineProperty(store, name, { value, enumerable: false, writable: true, configurable: true });
  define('getItem', (key) => (typeof store[key] === 'string' ? store[key] : null));
  define('setItem', (key, value) => { store[key] = String(value); });
  define('removeItem', (key) => { delete store[key]; });
  define('clear', () => { for (const k of Object.keys(store)) delete store[k]; });
  define('key', (i) => Object.keys(store)[i] ?? null);
  Object.defineProperty(store, 'length', { get: () => Object.keys(store).length, enumerable: false, configurable: true });
  for (const [key, value] of Object.entries(seed)) store[key] = String(value);
  return store;
}

function install(seed = {}, sessionSeed = {}) {
  globalThis.localStorage = makeStorage(seed);
  globalThis.sessionStorage = makeStorage(sessionSeed);
  return globalThis.localStorage;
}

globalThis.addEventListener = () => {};
globalThis.dispatchEvent = () => true;
globalThis.CustomEvent = class { constructor(type, init) { this.type = type; Object.assign(this, init); } };
install();

await import('../js/lp-guest-reset.js');
const guestReset = globalThis.lpGuestReset;
assert(guestReset, 'lp-guest-reset.js no expuso lpGuestReset');

// Los scoreKeys del catálogo son la fuente de verdad: el historial de intentos
// de HubFlow vive en `<scoreKey>:v1`.
const scoreKeys = [...new Set(
  Object.values(PROGRESS_RULES).flatMap((rule) =>
    rule.requiredActivities.flatMap((activity) => activity.scoreKeys)
  )
)];
const prefixes = [...new Set(scoreKeys.map((key) => key.split('-')[0]))].sort();

/** Un scoreKey representativo por prefijo — cubre el catálogo sin sembrar 624 claves. */
const oneKeyPerPrefix = prefixes.map(
  (prefix) => scoreKeys.find((key) => key.split('-')[0] === prefix)
);

const attempt = JSON.stringify([{ pct: 90, date: '2026-07-24T01:07:27.768Z' }]);

function seedFullState() {
  const seed = {
    'lp-theme': 'dark',
    'lp-user': JSON.stringify({ isSupabaseUser: true, name: 'Test' }),
    'lp-level': 'a1',
    'lp-sync-pending': '1',
    'progress-storage': JSON.stringify({ state: {} }),
    'learnflow:catalog:hubflow:v1': JSON.stringify({ totalContent: 150, ids: ['opposites'] }),
    'learnflow:catalog:fluentflow:v1': JSON.stringify({ totalContent: 330, ids: ['m1'] }),
    'learnflow:progress:hubflow:v1': JSON.stringify({ app: 'hubflow', content: { opposites: { completed: true } } }),
    'learnflow:progress:fluentflow:v1': JSON.stringify({ app: 'fluentflow', content: { m1: { completed: true } } }),
    'learnflow:progress:lyricflow:v1': JSON.stringify({ app: 'lyricflow', content: { s1: { completed: true } } }),
    'learnflow:activity:hubflow:v1': JSON.stringify({ app: 'hubflow', events: [{ eventId: 'e1' }] }),
    'sb-dfbokwebquvgsjgpnikw-auth-token': JSON.stringify({ access_token: 'tok' }),
  };
  for (const key of oneKeyPerPrefix) seed[`${key}:v1`] = attempt;
  return install(seed);
}

// ── La cobertura del catálogo: el bug que motivó estas pruebas ──────────────

check('borra el historial de TODOS los prefijos del catálogo', () => {
  const store = seedFullState();
  guestReset.clearGuestLocalProgress();

  const sobrevivientes = oneKeyPerPrefix.filter((key) => store.getItem(`${key}:v1`) !== null);
  if (sobrevivientes.length) {
    const sinCubrir = [...new Set(sobrevivientes.map((key) => key.split('-')[0]))];
    throw new Error(
      `${sobrevivientes.length} de ${oneKeyPerPrefix.length} scoreKeys sobrevivieron al reset.\n` +
      `     Prefijos sin cubrir en HUB_SCORE_PREFIX_RE (${sinCubrir.length}): ${sinCubrir.join(' ')}\n` +
      `     Reemplazar el regex en scripts/lp-guest-reset.js por:\n` +
      `     /^(${prefixes.join('|')})-/`
    );
  }
});

check('el catálogo declara los 88 prefijos esperados', () => {
  // Centinela: si el catálogo crece, esta prueba avisa antes de que el regex
  // quede corto en silencio. Actualizar el número junto con el regex.
  assertEqual(prefixes.length, 91, 'cantidad de prefijos en PROGRESS_RULES');
});

// ── El resto del contrato de clearGuestLocalProgress ────────────────────────

check('borra la proyección y el ledger de las tres apps', () => {
  const store = seedFullState();
  guestReset.clearGuestLocalProgress();

  for (const app of ['hubflow', 'fluentflow', 'lyricflow']) {
    assertEqual(store.getItem(`learnflow:progress:${app}:v1`), null, `progress de ${app}`);
  }
  assertEqual(store.getItem('learnflow:activity:hubflow:v1'), null, 'ledger de actividad');
});

check('borra las flags local-ready y los cursores de revisión', () => {
  const store = seedFullState();
  store.setItem('learnflow:hubflow:local-ready:v1', '1');
  store.setItem('learnflow:lyricflow:local-ready:v1', '1');
  store.setItem('lp-sync-revision', '30');
  store.setItem('lp-sync-revision:user-a:vanilla', '30');

  guestReset.clearGuestLocalProgress();

  // Las flags le dicen a hasLocalStatsCache() (sync-engine.js) que ya hay
  // proyección publicada. Si sobreviven a un localStorage recién vaciado,
  // downloadOnLogin marca cloudHydrated=true en su rama de error y habilita el
  // push con estado vacío. HubFlow ya limpiaba la suya en su listener de
  // 'lp-guest-reset', pero ese listener solo existe en páginas de HubFlow: un
  // reset hecho desde DeskFlow o LyricFlow las dejaba vivas.
  assertEqual(store.getItem('learnflow:hubflow:local-ready:v1'), null, 'flag de hubflow');
  assertEqual(store.getItem('learnflow:lyricflow:local-ready:v1'), null, 'flag de lyricflow');
  // El cursor de revisión (migración 026) es por usuario y por motor; un
  // residuo hace que el arranque compare contra un número ajeno y concluya
  // "al día" sin pullear nada.
  assertEqual(store.getItem('lp-sync-revision'), null, 'cursor global legacy');
  assertEqual(store.getItem('lp-sync-revision:user-a:vanilla'), null, 'cursor por usuario');
});

check('conserva las claves de catálogo', () => {
  const store = seedFullState();
  guestReset.clearGuestLocalProgress();

  // learnflow:catalog:<app>:v1 guarda totalContent + ids del catálogo vigente.
  // Borrarlo dejaría a readCatalogIdsFallback() devolviendo null, la poda de
  // huérfanos haría fail-open y el portal mostraría un total degradado.
  assert(store.getItem('learnflow:catalog:hubflow:v1') !== null, 'catálogo de hubflow');
  assert(store.getItem('learnflow:catalog:fluentflow:v1') !== null, 'catálogo de fluentflow');
});

check('borra lp-level, que se deriva del progreso', () => {
  const store = seedFullState();
  guestReset.clearGuestLocalProgress();

  // Dejarlo vivo mostraría contenido desbloqueado que el progreso ya no justifica.
  assertEqual(store.getItem('lp-level'), null, 'lp-level');
  assertEqual(store.getItem('lp-sync-pending'), null, 'lp-sync-pending');
});

check('conserva el tema y borra la identidad', () => {
  const store = seedFullState();
  guestReset.clearGuestLocalProgress();

  assertEqual(store.getItem('lp-theme'), 'dark', 'lp-theme sobrevive al reset');
  assertEqual(store.getItem('lp-user'), null, 'lp-user se borra');
});

// ── clearLocalCachePreserveSession: borra todo menos la sesión ──────────────

check('clearLocalCachePreserveSession conserva sesión, tema y nombre', () => {
  const store = seedFullState();
  guestReset.clearLocalCachePreserveSession();

  assertEqual(store.getItem('lp-theme'), 'dark', 'lp-theme');
  assert(store.getItem('lp-user') !== null, 'lp-user sobrevive: preserva el nombre a mostrar');
  assert(store.getItem('sb-dfbokwebquvgsjgpnikw-auth-token') !== null,
    'el token de Supabase sobrevive: si no, se cierra la sesión');
  assertEqual(store.getItem('learnflow:progress:hubflow:v1'), null, 'el progreso sí se borra');
  assertEqual(store.getItem('learnflow:catalog:hubflow:v1'), null,
    'a diferencia del reset de invitado, acá el catálogo también se limpia');
});

// ── hasLocalProgress: decide si forzar descarga de la nube ──────────────────

check('hasLocalProgress distingue progreso real de documento vacío', () => {
  install({ 'learnflow:progress:hubflow:v1': JSON.stringify({ app: 'hubflow', content: {} }) });
  assertEqual(guestReset.hasLocalProgress(), false, 'un doc con content vacío no es progreso');

  install({ 'learnflow:progress:hubflow:v1': JSON.stringify({ app: 'hubflow', content: { opposites: {} } }) });
  assertEqual(guestReset.hasLocalProgress(), true, 'un doc con contenido sí es progreso');
});

check('shouldForceCloudDownload fuerza descarga cuando no queda progreso local', () => {
  // Es la ruta que hace que el reset "aguante": tras limpiar el local, la app
  // baja de la nube en vez de reconstruir desde restos.
  const seed = {
    'lp-user': JSON.stringify({ isSupabaseUser: true }),
    'learnflow:progress:hubflow:v1': JSON.stringify({ app: 'hubflow', content: { opposites: {} } }),
  };
  install(seed);
  assertEqual(guestReset.shouldForceCloudDownload(), false, 'con progreso local no fuerza');

  install({ 'lp-user': seed['lp-user'] });
  assertEqual(guestReset.shouldForceCloudDownload(), true, 'sin progreso local fuerza descarga');
});

// ── Reporte ────────────────────────────────────────────────────────────────

console.log('');
if (failures.length === 0) {
  console.log(`✅ Guest reset — ${passed}/${passed} OK (${prefixes.length} prefijos del catálogo)`);
  process.exit(0);
}
console.log(`❌ Guest reset — ${passed} OK, ${failures.length} fallo(s)`);
for (const f of failures) {
  console.log(`   ✗ ${f.name}`);
  console.log(`     ${f.message}`);
}
console.log('');
console.log('   Contexto: docs/progress-counting-system.md');
process.exit(1);
