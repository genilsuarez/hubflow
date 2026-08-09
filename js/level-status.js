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

export function refreshLevelStatusBanner() {
  const banner = document.getElementById('levelStatusBanner');
  const icon = document.getElementById('levelStatusBannerIcon');
  const text = document.getElementById('levelStatusBannerText');
  const link = document.getElementById('levelStatusBannerLink');
  if (!banner || !icon || !text) return;

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

  if (hubflowDone) {
    icon.textContent = '🔒';
    text.textContent = `Nivel ${upperLevel} · ya hiciste tu parte en HubFlow. Tu nivel es compartido con FluentFlow y LyricFlow — revisa qué falta.`;
    if (link) {
      link.hidden = false;
      if (typeof window.LPPlatformUrls?.portalHref === 'function') {
        link.href = window.LPPlatformUrls.portalHref();
      }
    }
  } else {
    icon.textContent = '🎯';
    text.textContent = `Nivel ${upperLevel} · llevas ${hubflowPct}% de ${HUBFLOW_THRESHOLD_PCT}% en HubFlow para hacer tu parte y avanzar de nivel.`;
    if (link) link.hidden = true;
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
