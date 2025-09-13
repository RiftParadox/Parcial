
//Script SPA

document.addEventListener("DOMContentLoaded", () => {
  const links = Array.from(document.querySelectorAll('.nav-link[data-section]'));
  const sections = Array.from(document.querySelectorAll('.page-section'));

  if (sections.length === 0) return; 


  function showSectionById(id) {
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) {
      console.warn('No existe sección con id:', id);
      return;
    }
    sections.forEach(s => {
      s.classList.add('d-none');
      s.classList.remove('active');
    });
    target.classList.remove('d-none');
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const hash = location.hash.replace('#','');
  const initial = hash || (document.getElementById('inicio') ? 'inicio' : sections[0].id);

  sections.forEach(s => s.classList.add('d-none'));
  showSectionById(initial);

  links.forEach(l => l.classList.remove('active'));
  const initialLink = document.querySelector(`.nav-link[data-section="${initial}"]`);
  if (initialLink) initialLink.classList.add('active');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.dataset.section;
      if (!sectionId) return; 
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      showSectionById(sectionId);
      history.pushState(null, '', `#${sectionId}`);
    });
  });

  window.addEventListener('popstate', () => {
    const idFromHash = location.hash.replace('#','') || initial;
    showSectionById(idFromHash);
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const a = document.querySelector(`.nav-link[data-section="${idFromHash}"]`);
    if (a) a.classList.add('active');
  });
});
