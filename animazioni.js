/**
 * ἁρμονία — Animazioni al scroll + Banner cookie
 */

/* ── Banner cookie ── */
(function () {
  if (localStorage.getItem('cookieAccettato')) return;

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML = `
    <p class="cookie-testo">
      Questo sito utilizza esclusivamente cookie tecnici strettamente necessari
      al suo funzionamento. Non vengono raccolti dati personali, non sono presenti
      cookie di profilazione o di terze parti. I font sono caricati localmente
      e nessuna richiesta viene inviata a servizi esterni.
    </p>
    <button class="cookie-btn" id="cookie-ok">Ho capito</button>
  `;
  document.body.appendChild(banner);

  document.getElementById('cookie-ok').addEventListener('click', function () {
    localStorage.setItem('cookieAccettato', '1');
    banner.classList.add('cookie-nascosto');
    setTimeout(() => banner.remove(), 400);
  });
})();
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
