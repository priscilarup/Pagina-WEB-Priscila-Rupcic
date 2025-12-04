// ===== MAIN.JS - PUNTO DE ENTRADA =====
// Importación de módulos
import { initNavigation } from './navigation.js';
import { initPortfolioCarousel } from './portfolio.js';
import { initFAQ, initFormValidation } from './ui.js';

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Iniciando Portfolio Priscila Rupcic...');

  // Inicializar navegación
  initNavigation();

  // Inicializar carousel de proyectos
  initPortfolioCarousel();

  // Inicializar FAQ (ya funciona con la función corregida)
  initFAQ();

  // Inicializar validación de formulario
  initFormValidation();

  // Animaciones al hacer scroll
  initScrollAnimations();

  console.log('✅ Portfolio cargado correctamente');
});


// ===== ANIMACIONES AL HACER SCROLL =====
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.service-card, .blog-card, .skill-item');

  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));
}

// ===== EXPORTAR FUNCIONES SI ES NECESARIO =====
export { initScrollAnimations };