// ===== NAVIGATION.JS =====
// Control del menú de navegación y efectos

export function initNavigation() {
  console.log("🔧 Navigation inicializada");

  const nav = document.querySelector('nav');
  if (!nav) return;

  const mobileBtn = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.nav-list');

  // --- Sticky Navbar ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  });

  // --- Mobile Menu ---
  if (mobileBtn && mobileMenu) {
    // Estado accesible inicial
    mobileBtn.setAttribute('aria-expanded', 'false');

    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileBtn.classList.toggle('open', isOpen);
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Cerrar menú al hacer clic en un enlace
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileBtn.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}
