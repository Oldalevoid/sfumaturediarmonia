/**
 * ἁρμονία — Animazioni al scroll
 */
document.addEventListener('DOMContentLoaded', () => {

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visibile');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -30px 0px'
  });

  // 1. Osserva elementi già marcati da-animare nell'HTML (chi-siamo)
  document.querySelectorAll('.da-animare').forEach(el => {
    observer.observe(el);
  });

  // 2. Aggiunge e osserva elementi della home al scroll
  const selettoriHome = [
    '.sez-titolo-centro',
    '.servizio',
    '.benessere-servizio',
    '.profilo-testo',
    '.profilo-citazione',
    '.hero-destra-titolo',
    '.hero-destra-riga',
  ];

  document.querySelectorAll(selettoriHome.join(', ')).forEach((el, i) => {
    if (!el.classList.contains('da-animare')) {
      el.classList.add('da-animare');
      observer.observe(el);
    }
  });

  // 3. Stagger per card servizi
  document.querySelectorAll('.griglia-servizi .servizio, .benessere-contenuto .benessere-servizio')
    .forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.12}s`;
    });
});
