/* ═══════════════════════════════════════════════════════
   HubFlow — Level Status Banner
   LearnFlow Progression System — docs/to-do/learnflow-progression-system.md
   § "Comunicación cuando el nivel no avanza": el nivel CEFR es compartido
   entre las 3 apps y solo sube cuando FluentFlow ≥100%, LyricFlow ≥100% y
   HubFlow ≥50% del nivel activo se cumplen a la vez. El banner tiene dos
   estados mientras eso no pasa:
   - HubFlow todavía no llega a su propio 50%: muestra el nivel activo y el
     avance propio hacia ese umbral (lo que faltaba comunicar — antes no se
     veía nada acá hasta cumplirlo).
   - HubFlow ya cumplió su parte pero otra app no: aviso con enlace a
     DeskFlow (el widget de nivel de DeskFlow es la vista de "estadísticas
     globales").
   ═══════════════════════════════════════════════════════ */

import { getActiveLevel, getCombinedLevelProgress } from './lp-progress-summary.js';

const HUBFLOW_THRESHOLD_PCT = 50;

/** Misma paleta por nivel que dashboard-filters.js usa en los chips de CEFR —
 * se reutiliza aquí para que el ring del banner y los filtros hablen el mismo
 * lenguaje visual de color por nivel. */
const LEVEL_COLORS = { a1: '#22c55e', a2: '#eab308', b1: '#f97316', b2: '#ef4444', c1: '#a855f7', c2: '#374151' };

export function refreshLevelStatusBanner() {
  const banner = document.getElementById('levelStatusBanner');
  const text = document.getElementById('levelStatusBannerText');
  const title = document.getElementById('levelStatusBannerTitle');
  const link = document.getElementById('levelStatusBannerLink');
  const ringFill = document.getElementById('levelStatusBannerRingFill');
  const ringPct = document.getElementById('levelStatusBannerRingPct');
  if (!banner || !text) return;

  const level = getActiveLevel();
  const upperLevel = level.toUpperCase();
  const progress = getCombinedLevelProgress(level);
  const hubflowPct = Math.round(progress.hubflow.progressPct);
  const hubflowDone = hubflowPct >= HUBFLOW_THRESHOLD_PCT;
  const allDone = hubflowDone && progress.fluentflow.progressPct >= 100 && progress.lyricflow.progressPct >= 100;

  // Si las 3 ya se cumplieron, checkLevelAdvancement() ya debería haber
  // subido el nivel (se dispara al guardar progreso) — no mostrar el aviso
  // en ese instante de transición para no parpadear justo antes de avanzar.
  if (allDone) {
    banner.hidden = true;
    return;
  }

  banner.hidden = false;
  banner.style.setProperty('--level-color', LEVEL_COLORS[level] || 'var(--lp-accent)');

  // El ring llena al 100% cuando se alcanza el umbral propio de HubFlow
  // (50%, no 100%) — visualmente "completo" significa "ya cumpliste tu
  // parte", no "terminaste todo el contenido".
  const normalized = hubflowDone ? 100 : Math.max(0, Math.min(100, Math.round((hubflowPct / HUBFLOW_THRESHOLD_PCT) * 100)));
  if (ringFill) ringFill.setAttribute('stroke-dasharray', `${normalized}, 100`);
  if (ringPct) ringPct.textContent = hubflowDone ? '✓' : `${hubflowPct}%`;

  if (title) title.textContent = `Tu progreso en el nivel ${upperLevel}`;

  if (hubflowDone) {
    text.textContent = 'Ya hiciste tu parte en HubFlow. Tu nivel es compartido con FluentFlow y LyricFlow — revisa qué falta.';
    if (link) {
      link.hidden = false;
      link.target = '_blank';
      link.setAttribute('rel', 'noopener');
      link.textContent = 'Ver progreso global →';
      if (typeof window.LPPlatformUrls?.portalHref === 'function') {
        link.href = window.LPPlatformUrls.portalHref();
      }
    }
  } else {
    text.textContent = `Te falta ${HUBFLOW_THRESHOLD_PCT - hubflowPct}% en HubFlow para avanzar de nivel.`;
    if (link) {
      // Lleva a "Explorar" sin filtrar por nivel — no se abre en pestaña
      // nueva porque es navegación dentro de la misma app. section=all
      // fuerza esa sección porque "resumen" (sección por defecto) se
      // excluye del filtrado en dashboard-filters.js applyFilters().
      link.hidden = false;
      link.target = '_self';
      link.removeAttribute('rel');
      link.href = '?section=all';
      link.textContent = 'Ver ejercicios →';
    }
  }
}

export function initLevelStatus() {
  refreshLevelStatusBanner();
  window.addEventListener('hubflow-progress-updated', refreshLevelStatusBanner);
  window.addEventListener('lp-level-advanced-locally', refreshLevelStatusBanner);
  window.addEventListener('storage', (event) => {
    if (event.key === 'lp-level') refreshLevelStatusBanner();
  });
}
