// ===== UI.JS - COMPONENTES DE INTERFAZ =====

// ===== FAQ ACCORDION (robusta) =====
export function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems || faqItems.length === 0) {
    console.log('initFAQ: no hay .faq-item');
    return;
  }
  console.log(`initFAQ: ${faqItems.length} items`);

  // Aseguramos accesibilidad y estado inicial (sin abrir ninguno)
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-question');
    const a = item.querySelector('.faq-answer');
    if (!q || !a) return;
    item.classList.remove('active');
    q.setAttribute('aria-expanded', 'false');
    a.setAttribute('aria-hidden', 'true');
    // quitar inline maxHeight si existe
    a.style.maxHeight = null;
    // forzar transición en max-height si no existe
    a.style.transition = a.style.transition || 'max-height 0.35s ease, padding 0.25s ease';
  });

  // Manejador de click (delegación en contenedor si existe)
  const container = document.querySelector('.faq-container') || document;

  container.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.faq-question');
    if (!btn) return;
    const item = btn.closest('.faq-item');
    if (!item) return;

    const answer = item.querySelector('.faq-answer');
    if (!answer) return;

    const wasActive = item.classList.contains('active');

    // Cerrar todos (acordeón)
    faqItems.forEach(i => {
      const q = i.querySelector('.faq-question');
      const a = i.querySelector('.faq-answer');
      if (!q || !a) return;
      if (i !== item) {
        i.classList.remove('active');
        q.setAttribute('aria-expanded', 'false');
        a.setAttribute('aria-hidden', 'true');
        // quitar altura para colapsar
        a.style.maxHeight = null;
        a.style.paddingTop = '';
        a.style.paddingBottom = '';
      }
    });

    if (!wasActive) {
      // Abrir clickeado
      item.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
      answer.setAttribute('aria-hidden', 'false');

      // Asegurarse de que el elemento esté en DOM y contenido medible
      requestAnimationFrame(() => {
        // reset padding to ensure we can animate it (only if needed)
        answer.style.paddingTop = getComputedStyle(answer).paddingTop;
        answer.style.paddingBottom = getComputedStyle(answer).paddingBottom;

        // Forzar reflow antes de leer scrollHeight
        // eslint-disable-next-line no-unused-expressions
        answer.offsetHeight;

        const targetH = answer.scrollHeight + 'px';
        answer.style.maxHeight = targetH;
      });
    } else {
      // Cerrar el mismo
      item.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      answer.setAttribute('aria-hidden', 'true');
      answer.style.maxHeight = null;
      answer.style.paddingTop = '';
      answer.style.paddingBottom = '';
    }
  }, false);
}


// ===== VALIDACIÓN DE FORMULARIO =====
export function initFormValidation() {
  const form = document.getElementById('contact-form');
  const messageDiv = document.getElementById('formMessage');

  if (!form || !messageDiv) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener valores
    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();

    // Validaciones
    if (!name || !email || !message) {
      showMessage('Por favor completa todos los campos requeridos.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showMessage('Por favor ingresa un email válido.', 'error');
      return;
    }

    // Deshabilitar botón durante envío
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';

    // Simular envío (aquí integrarías con tu backend)
    setTimeout(() => {
      showMessage(`¡Gracias ${name}! Recibí tu mensaje y me pondré en contacto pronto. 🚀`, 'success');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      
      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 5000);
    }, 1500);
  });
}

// ===== VALIDAR EMAIL =====
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ===== MOSTRAR MENSAJE =====
function showMessage(text, type) {
  const messageDiv = document.getElementById('formMessage');
  if (!messageDiv) return;

  messageDiv.className = `form-message ${type}`;
  messageDiv.innerHTML = type === 'success'
    ? `<i class="bi bi-check-circle"></i> ${text}`
    : `<i class="bi bi-exclamation-circle"></i> ${text}`;
  messageDiv.style.display = 'block';
}

// ===== EFECTOS HOVER EN CARDS =====
export function initCardHoverEffects() {
  const cards = document.querySelectorAll('.service-card, .blog-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// ===== TOAST NOTIFICATIONS =====
export function showToast(message, type = 'info', duration = 3000) {
  // Crear toast si no existe
  let toast = document.getElementById('toast-notification');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      padding: 15px 20px;
      border-radius: 8px;
      background: white;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 10px;
      transform: translateX(400px);
      transition: transform 0.3s ease;
    `;
    document.body.appendChild(toast);
  }

  // Configurar colores según tipo
  const colors = {
    success: '#7bc92d',
    error: '#ef4444',
    info: '#ec4899',
    warning: '#f59e0b'
  };

  const icons = {
    success: 'bi-check-circle-fill',
    error: 'bi-x-circle-fill',
    info: 'bi-info-circle-fill',
    warning: 'bi-exclamation-triangle-fill'
  };

  toast.style.borderLeft = `4px solid ${colors[type] || colors.info}`;
  toast.innerHTML = `
    <i class="bi ${icons[type] || icons.info}" style="color: ${colors[type] || colors.info}; font-size: 1.2rem;"></i>
    <span style="color: #1F2937; font-weight: 500;">${message}</span>
  `;

  // Mostrar
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);

  // Ocultar después de duration
  setTimeout(() => {
    toast.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, duration);
}

// ===== LOADING SPINNER =====
export function showLoadingSpinner(show = true) {
  let spinner = document.getElementById('loading-spinner');

  if (show) {
    if (!spinner) {
      spinner = document.createElement('div');
      spinner.id = 'loading-spinner';
      spinner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      `;
      spinner.innerHTML = `
        <div style="
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255,255,255,0.3);
          border-top-color: #ec4899;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        "></div>
      `;
      
      // Agregar animación
      if (!document.getElementById('spinner-style')) {
        const style = document.createElement('style');
        style.id = 'spinner-style';
        style.textContent = `
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `;
        document.head.appendChild(style);
      }
      
      document.body.appendChild(spinner);
    }
    spinner.style.display = 'flex';
  } else {
    if (spinner) {
      spinner.style.display = 'none';
    }
  }
}

// ===== SCROLL TO TOP BUTTON =====
export function initScrollToTop() {
  // Crear botón
  const button = document.createElement('button');
  button.id = 'scroll-to-top';
  button.innerHTML = '<i class="bi bi-arrow-up"></i>';
  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    z-index: 1000;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
  `;
  
  document.body.appendChild(button);

  // Mostrar/ocultar según scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      button.style.opacity = '1';
      button.style.visibility = 'visible';
    } else {
      button.style.opacity = '0';
      button.style.visibility = 'hidden';
    }
  });

  // Funcionalidad
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Hover effect
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-5px)';
    button.style.boxShadow = '0 8px 25px rgba(236, 72, 153, 0.4)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '0 4px 15px rgba(236, 72, 153, 0.3)';
  });
}