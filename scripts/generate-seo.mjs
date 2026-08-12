#!/usr/bin/env node
// Genera <meta name="description"> para las 150 páginas de exercises/ y el
// sitemap.xml completo, a partir de data/catalog.js (fuente única). Ver
// docs/auditoria-y-plan.md — A.3 (SEO).
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MODULES, CATEGORIES } from '../data/catalog.js';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = 'https://genilsuarez.github.io/hubflow';

function escapeAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function descriptionFor(mod) {
  const catLabel = CATEGORIES[mod.category]?.label || 'Ejercicio';
  const cefr = (mod.cefr || '').toUpperCase();
  const meta = (mod.meta || '').replace(/\s+·\s+/g, ', ');
  let text = `${mod.title} — ${catLabel}${cefr ? ` nivel ${cefr}` : ''}. ${meta}. Practica gratis en HubFlow.`;
  if (text.length > 155) {
    text = `${mod.title} — ${catLabel}${cefr ? ` nivel ${cefr}` : ''}. Practica gratis en HubFlow.`;
  }
  return text;
}

async function injectMeta(filePath, description) {
  const html = await readFile(filePath, 'utf8');
  if (/<meta\s+name="description"/i.test(html)) {
    const updated = html.replace(
      /<meta\s+name="description"[^>]*>/i,
      `<meta name="description" content="${escapeAttr(description)}">`
    );
    if (updated !== html) await writeFile(filePath, updated);
    return updated !== html ? 'updated' : 'unchanged';
  }
  const updated = html.replace(
    /(<title>[^<]*<\/title>)/i,
    `$1\n<meta name="description" content="${escapeAttr(description)}">`
  );
  if (updated === html) return 'no-title-tag';
  await writeFile(filePath, updated);
  return 'inserted';
}

async function main() {
  const stats = { inserted: 0, updated: 0, unchanged: 0, missing: 0 };
  const urls = [
    { loc: `${SITE}/`, priority: '0.8' },
  ];

  for (const mod of MODULES) {
    if (!mod.exercise) continue;
    const filePath = path.join(ROOT, mod.exercise);
    try {
      const result = await injectMeta(filePath, descriptionFor(mod));
      stats[result] = (stats[result] || 0) + 1;
      urls.push({ loc: `${SITE}/${mod.exercise}`, priority: '0.6' });
    } catch (err) {
      console.error(`MISSING: ${mod.exercise} (${err.code})`);
      stats.missing++;
    }
  }

  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls
      .map(
        (u) =>
          `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
      )
      .join('\n') +
    '\n</urlset>\n';
  await writeFile(path.join(ROOT, 'sitemap.xml'), sitemap);

  console.log(`Meta description: ${stats.inserted} insertadas, ${stats.updated} actualizadas, ${stats.unchanged} sin cambio, ${stats.missing} faltantes.`);
  console.log(`sitemap.xml: ${urls.length} URLs.`);
}

main();
