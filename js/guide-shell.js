/**
 * HubFlow guide pages — auth/sync.
 * Theme/login/about are already reachable from the hamburger nav; guides
 * don't duplicate them locally.
 * Requires: lp-theme, lp-platform-urls, lp-nav-icons, lp-guest-reset, lp-login,
 *           lp-nav-helpers, lp-about (+ css), lp-about-content.js
 */
import { setupSupabaseAuth } from './lp-auth-setup.js';
import { hydrateHubFlowFromCloud } from './progress-store.js';

setupSupabaseAuth({
  onAfterLogin: () => hydrateHubFlowFromCloud(),
  onAfterLogout: () => hydrateHubFlowFromCloud(),
});
