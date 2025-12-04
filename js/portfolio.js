// ===== PORTFOLIO.JS =====
// Carousel simple para la sección de proyectos

export function initPortfolioCarousel(options = {}) {
  const slidesEl = document.getElementById('carouselSlides');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const indicatorsEl = document.getElementById('carouselIndicators');

  if (!slidesEl) return;

  const slides = slidesEl.children;
  if (slides.length === 0) return;

  let index = 0;
  const total = slides.length;
  const interval = options.interval || 5000;
  let timer = null;

  function goTo(i) {
    index = (i + total) % total;
    slidesEl.style.transform = `translateX(-${index * 100}%)`;
    updateIndicators();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function start() {
    stop();
    timer = setInterval(next, interval);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); start(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); start(); });

  function updateIndicators() {
    if (!indicatorsEl) return;
    indicatorsEl.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const btn = document.createElement('button');
      btn.className = 'carousel-indicator';
      if (i === index) btn.classList.add('active');
      btn.addEventListener('click', () => { goTo(i); start(); });
      indicatorsEl.appendChild(btn);
    }
  }

  // Inicializar
  goTo(0);
  updateIndicators();
  start();

  // Pausar on hover
  slidesEl.addEventListener('mouseenter', stop);
  slidesEl.addEventListener('mouseleave', start);
}
