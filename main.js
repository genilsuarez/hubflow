/**
 * HubFlow — single bundle entry point for the initial-load classic scripts.
 *
 * Side-effect imports in the EXACT order the old <script defer> tags had in
 * index.html (deferred scripts execute in document order regardless of
 * head/body position, so this linear order reproduces prior behavior).
 * Each imported file is a self-contained IIFE that exposes itself via
 * `window.X` when other scripts need it — none rely on implicit globals —
 * so wrapping them as ESM side-effect imports is safe without touching
 * their internals.
 *
 * NOT included here (deliberately left as-is in index.html):
 *  - js/lp-theme.js — must stay synchronous/unbundled, runs before first
 *    paint to avoid a theme flash.
 *  - The several inline <script> blocks in <head> (theme-color sync, dev
 *    ?reset=full, early section detection, app-ready failsafe) — they must
 *    run synchronously before any deferred/module script; Vite doesn't
 *    touch plain inline scripts anyway.
 *  - The inline <script type="module"> at the end of body (dashboard boot:
 *    catalog, progress-store, sync-engine, dashboard-*, level-status) —
 *    Vite bundles inline module scripts natively as their own graph, no
 *    need to fold it in here. It already runs after these imports in
 *    document order, same as before.
 *  - js/engines/* — already lazy-loaded per exercise type on demand.
 *
 * CSS is NOT imported here — see main.css and the <link rel="stylesheet">
 * in index.html. Importing CSS from this file would make Vite inject it
 * via a <style> tag at runtime in dev, after this deferred module script
 * runs — a visible flash of unstyled content on every reload that a real
 * blocking <link> doesn't have.
 */
import './js/lp-input-zoom.js';
import './js/lp-platform-urls.js';
import './js/lp-nav-icons.js';
import './js/lp-analytics.js';
import './js/lp-cookie-consent.js';
import './js/lp-nav-helpers.js';
import './js/lp-guest-reset.js';
import './js/lp-login.js';
import './js/lp-login-nudge.js';
import './js/lp-placement-banner.js';
import './js/lp-about-content.js';
import './js/lp-about.js';
import './js/lp-settings.js';
import './js/lp-dev-tools.js';
