// HubFlow — dev server config (learnctl/gateway) + production build pipeline.
// Ships to GitHub Pages via CD Deploy, which runs `npm run build` and
// publishes dist/ (see .github/workflows/cd-deploy.yml).
// Truly-static pass-through files (manifest.json, icons, robots.txt,
// sitemap.xml, 404.html, privacy.html, js/lp-theme.js…) live in public/ —
// Vite copies that dir to dist/ verbatim and leaves any HTML reference to
// it untouched (no hashing), which matters for manifest.json: its icon
// paths are plain JSON strings Vite can't rewrite, so the referenced icons
// must stay at the exact same relative location as the manifest itself.
// js/lp-theme.js also needs to stay unbundled/unhashed: it's the one
// script that must run synchronously, before first paint, to avoid a theme
// flash — bundling it into main.js would defer it like everything else.
import { readdirSync, statSync, mkdirSync, copyFileSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { gatewayRedirectPlugin } from './scripts/vite-gateway-redirect.mjs';
import { stripDevSourcemapPlugin } from './scripts/vite-strip-dev-sourcemap.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// HubFlow has ~150 exercises/*.html + 44 guides/*.html — each its own static
// entry point loading shared shell JS/CSS directly (*.min.js/*.min.css in
// js/ and css/). Bundling all of those individually is a separate, much
// larger project; out of scope here. This build only bundles the dashboard
// (index.html + main.js — see main.js for what that covers). Everything
// else ships through verbatim so those ~194 pages keep working exactly as
// before.
const VERBATIM_DIRS = ['exercises', 'guides', 'js', 'css', 'data'];

function copyVerbatimDirsPlugin() {
  return {
    name: 'copy-verbatim-dirs',
    apply: 'build',
    closeBundle() {
      const outDir = resolve(__dirname, 'dist');
      const walk = (dir, destBase) => {
        for (const entry of readdirSync(dir)) {
          const abs = join(dir, entry);
          const dest = join(destBase, entry);
          if (statSync(abs).isDirectory()) {
            mkdirSync(dest, { recursive: true });
            walk(abs, dest);
          } else {
            mkdirSync(dirname(dest), { recursive: true });
            copyFileSync(abs, dest);
          }
        }
      };
      for (const dir of VERBATIM_DIRS) {
        const src = resolve(__dirname, dir);
        walk(src, join(outDir, dir));
      }
    },
  };
}

export default {
  // GitHub Pages serves this repo at /hubflow/ — CD Deploy sets
  // VITE_APP_BASE_URL; local ad-hoc builds default to root.
  base: process.env.VITE_APP_BASE_URL || '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: true,
    cssMinify: 'esbuild',
    minify: 'esbuild',
    target: 'es2018',
  },
  server: {
    headers: {
      // Avoid Cache-Control: no-store — it disables bfcache, so history.back()
      // from exercises always cold-reloads the dashboard in local dev.
      // max-age=0 + must-revalidate still prevents stale JS after restarts.
      'Cache-Control': 'max-age=0, must-revalidate',
    },
  },
  plugins: [
    gatewayRedirectPlugin({ app: 'hubflow' }),
    noCachePlugin(),
    fullReloadPlugin(),
    stripDevSourcemapPlugin(),
    copyVerbatimDirsPlugin(),
  ],
};

function noCachePlugin() {
  return {
    name: 'no-cache-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((_req, res, next) => {
        const origSetHeader = res.setHeader.bind(res);
        res.setHeader = (name, value) => {
          if (/^(etag|last-modified)$/i.test(name)) return res;
          if (/^cache-control$/i.test(name)) {
            return origSetHeader(name, 'max-age=0, must-revalidate');
          }
          return origSetHeader(name, value);
        };
        next();
      });
    },
  };
}

function fullReloadPlugin() {
  return {
    name: 'full-reload-js',
    apply: 'serve',
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.js') || file.endsWith('.html')) {
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    },
  };
}
