/* ═══════════════════════════════════════════════════════
   HubFlow Dashboard — Tag Filter + Search
   Self-initializing: queries its own DOM, wires its own listeners. The
   orchestrator (index.html) only calls the 3 functions this returns.
   ═══════════════════════════════════════════════════════ */

import { MODULES, TAGS } from '../data/catalog.js';

export function initDashboardFilters() {
  // ─── FILTER MENU (homologado con FluentFlow UnifiedFilter) ───
  const filterMenu = document.getElementById('filterMenu');
  const filterToggle = document.getElementById('filterToggle');
  const filterBadge = document.getElementById('filterBadge');
  const filterBackdrop = document.getElementById('filterBackdrop');
  const filterClose = document.getElementById('filterClose');
  const tagBar = document.getElementById('tagBar');
  const tagBarCefr = document.getElementById('tagBarCefr');
  const tagBarSkills = document.getElementById('tagBarSkills');
  const filterTabCefr = document.getElementById('filterTabCefr');
  const filterTabSkill = document.getElementById('filterTabSkill');
  const filterTabCountCefr = document.getElementById('filterTabCountCefr');
  const filterTabCountSkill = document.getElementById('filterTabCountSkill');
  const tagBarPanelCefr = document.getElementById('tagBarPanelCefr');
  const tagBarPanelSkills = document.getElementById('tagBarPanelSkills');
  const activeTags = new Set((new URLSearchParams(location.search).get('tag') || '').split(',').filter(Boolean));
  const LEVEL_COLORS = { a1: '#22c55e', a2: '#eab308', b1: '#f97316', b2: '#ef4444', c1: '#a855f7', c2: '#374151' };
  let activeFilterTab = 'cefr';

  function usedTags(list) {
    const used = new Set();
    MODULES.forEach(m => m.tags.forEach(t => { if (list.includes(t)) used.add(t); }));
    return list.filter(t => used.has(t));
  }

  function countActiveIn(list) {
    return list.filter(t => activeTags.has(t)).length;
  }

  function setFilterTab(tab) {
    activeFilterTab = tab;
    filterTabCefr?.classList.toggle('tagbar__tab--active', tab === 'cefr');
    filterTabSkill?.classList.toggle('tagbar__tab--active', tab === 'skill');
    filterTabCefr?.setAttribute('aria-selected', tab === 'cefr');
    filterTabSkill?.setAttribute('aria-selected', tab === 'skill');
    if (tagBarPanelCefr) tagBarPanelCefr.hidden = tab !== 'cefr';
    if (tagBarPanelSkills) tagBarPanelSkills.hidden = tab !== 'skill';
  }

  function updateFilterTabCounts() {
    const cefrCount = countActiveIn(usedTags(TAGS.cefr));
    const skillCount = countActiveIn(usedTags(TAGS.skill));
    if (filterTabCountCefr) {
      filterTabCountCefr.hidden = cefrCount === 0;
      filterTabCountCefr.textContent = cefrCount;
    }
    if (filterTabCountSkill) {
      filterTabCountSkill.hidden = skillCount === 0;
      filterTabCountSkill.textContent = skillCount;
    }
  }

  function tagChipHTML(t, group) {
    const isActive = activeTags.has(t);
    const isLevel = group === 'cefr';
    const label = t.length <= 2 ? t.toUpperCase() : t.charAt(0).toUpperCase() + t.slice(1);
    const levelStyle = isLevel ? ` style="--level-color:${LEVEL_COLORS[t] || 'var(--lp-accent)'}"` : '';
    const classes = ['filter-chip', isLevel ? 'filter-chip--level' : '', isActive ? 'filter-chip--active' : ''].filter(Boolean).join(' ');
    return `<button type="button" class="${classes}" data-tag="${t}"${levelStyle}>${label}</button>`;
  }

  function updateFilterBadge() {
    filterBadge.hidden = activeTags.size === 0;
    filterBadge.textContent = activeTags.size;
    filterToggle.classList.toggle('filter-toggle--active', activeTags.size > 0);
    updateFilterTabCounts();
  }

  const FILTER_MOBILE_MQ = window.matchMedia('(max-width: 639px)');
  function isFilterMobile() { return FILTER_MOBILE_MQ.matches; }

  function closeFilterPanel() {
    if (!tagBar) return;
    tagBar.classList.remove('open');
    if (filterBackdrop) filterBackdrop.hidden = true;
    filterToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openFilterPanel() {
    tagBar.classList.add('open');
    if (filterBackdrop && isFilterMobile()) filterBackdrop.hidden = false;
    filterToggle.setAttribute('aria-expanded', 'true');
    if (isFilterMobile()) document.body.style.overflow = 'hidden';
  }

  function toggleFilterPanel() {
    if (tagBar.classList.contains('open')) closeFilterPanel();
    else openFilterPanel();
  }

  if (tagBar && tagBarCefr && tagBarSkills) {
    tagBarCefr.innerHTML = usedTags(TAGS.cefr).map(t => tagChipHTML(t, 'cefr')).join('');
    tagBarSkills.innerHTML = usedTags(TAGS.skill).map(t => tagChipHTML(t, 'skill')).join('');
    updateFilterBadge();
    setFilterTab(activeFilterTab);

    filterToggle.addEventListener('click', (e) => { e.stopPropagation(); toggleFilterPanel(); });
    filterClose?.addEventListener('click', closeFilterPanel);
    filterBackdrop?.addEventListener('click', closeFilterPanel);
    tagBar.querySelector('.tagbar__tabs')?.addEventListener('click', (e) => {
      const tabBtn = e.target.closest('[data-filter-tab]');
      if (!tabBtn) return;
      setFilterTab(tabBtn.dataset.filterTab);
    });
    document.addEventListener('click', (e) => {
      if (!tagBar.classList.contains('open') || isFilterMobile()) return;
      if (!filterMenu.contains(e.target)) closeFilterPanel();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && tagBar.classList.contains('open')) { closeFilterPanel(); filterToggle.focus(); }
    });

    tagBar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-tag]');
      if (!btn) return;
      const t = btn.dataset.tag;
      if (activeTags.has(t)) activeTags.delete(t); else activeTags.add(t);
      btn.classList.toggle('filter-chip--active', activeTags.has(t));
      updateFilterBadge();
      applyFilters();
      const u = new URL(location.href);
      if (activeTags.size) u.searchParams.set('tag', [...activeTags].join(',')); else u.searchParams.delete('tag');
      history.replaceState(null, '', u);
    });
  }

  // ─── SEARCH + TAG FILTER (combinados: AND entre texto y tags activos) ───
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearch');
  const noResults = document.getElementById('noResults');

  function applyFilters() {
    const sections = document.querySelectorAll('.section');
    const q = searchInput.value.trim().toLowerCase();
    clearBtn.classList.toggle('visible', q.length > 0);
    // "all" (Todos los módulos) apila las 5 secciones de catálogo sin filtro —
    // se comporta como una búsqueda cross-section permanente, sin texto.
    const isAllMode = document.body.dataset.active === 'all';
    const filtering = q.length > 0 || activeTags.size > 0 || isAllMode;
    // Cross-section search cuando hay texto o estás en "all" — el filtrado solo
    // por tags se queda dentro de la categoría activa para no romper el contexto.
    const crossSection = q.length > 0 || isAllMode;
    let anyVisible = false;

    sections.forEach(sec => {
      if (sec.dataset.key === 'resumen') { sec.classList.toggle('search-visible', false); return; }
      const isActive = sec.classList.contains('active-section');
      const shelfOrGuides = sec.querySelectorAll('.shelf, .guides');
      if (!shelfOrGuides.length) return;
      let sectionVisible = false;
      shelfOrGuides.forEach(container => {
        let containerVisible = false;
        container.querySelectorAll('.book, .guide-link').forEach(card => {
          // When not cross-section and this section isn't active, skip filtering
          // (cards stay in their default hidden/visible state via active-section CSS)
          if (!crossSection && !isActive) return;
          const text = card.textContent.toLowerCase();
          const textMatch = !q || text.includes(q);
          const cardTags = card.dataset.tags ? card.dataset.tags.split(',') : [];
          // El nivel se compara contra data-cefr (valor único, la fuente de verdad del
          // pill que se ve en la tarjeta), no contra data-tags: ese array arrastra tags
          // de nivel históricos que no siempre coinciden con el cefr actual del módulo
          // (ver docs/to-do/hubflow-cefr-rebalance.md — "nivel mixto"). Comparar contra
          // tags hacía que filtrar por A2 mostrara tarjetas con el pill en A1.
          const tagMatch = activeTags.size === 0 || [...activeTags].every(t =>
            TAGS.cefr.includes(t) ? card.dataset.cefr === t : cardTags.includes(t)
          );
          const match = textMatch && tagMatch;
          card.classList.toggle('hidden', !match);
          if (match && filtering) { containerVisible = true; sectionVisible = true; }
        });
        // Oculta la subsección entera (ej. "Morfología y ortografía") si ninguna de
        // sus tarjetas pasa el filtro — evita encabezados huérfanos sin tarjetas debajo.
        const subsec = container.closest('.subsec');
        if (subsec && (crossSection || isActive)) subsec.classList.toggle('hidden', filtering && !containerVisible);
      });
      // Only promote non-active sections to visible during cross-section (text) search
      if (crossSection) {
        sec.classList.toggle('search-visible', filtering && sectionVisible);
        if (sectionVisible) anyVisible = true;
      } else {
        sec.classList.remove('search-visible');
        if (isActive && sectionVisible) anyVisible = true;
      }
    });

    noResults.style.display = (filtering && !anyVisible) ? 'block' : 'none';
  }

  searchInput.addEventListener('input', applyFilters);
  clearBtn.addEventListener('click', () => { searchInput.value = ''; applyFilters(); searchInput.focus(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) { e.preventDefault(); searchInput.focus(); }
    if (e.key === 'Escape' && document.activeElement === searchInput) { searchInput.value = ''; applyFilters(); searchInput.blur(); }
  });

  /** setActive() clears the search box on every section change before
   *  re-applying filters — kept as a separate step (not folded into
   *  applyFilters) to match the exact original order of operations. */
  function clearSearch() {
    if (searchInput.value) searchInput.value = '';
  }

  return { applyFilters, closeFilterPanel, clearSearch };
}
