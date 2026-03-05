/* =========================================
   OMR Beauty — Main JavaScript
   ========================================= */

(function () {
  'use strict';

  // --- Loading Screen ---
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('loader--hidden');
        loader.addEventListener('transitionend', () => {
          loader.remove();
        }, { once: true });
      }, 1800);
    });
  }

  // --- Custom Cursor ---
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover states
    const hoverTargets = document.querySelectorAll('a, button, .product-card, .size-option, input');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('cursor-dot--hover');
        ring.classList.add('cursor-ring--hover');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('cursor-dot--hover');
        ring.classList.remove('cursor-ring--hover');
      });
    });

    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    document.querySelectorAll('a, button, input').forEach(el => {
      el.style.cursor = 'none';
    });
  }

  // --- Mobile Menu ---
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isActive = mobileMenu.classList.toggle('mobile-menu--active');
      hamburger.classList.toggle('nav__hamburger--active');
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('mobile-menu--active');
        hamburger.classList.remove('nav__hamburger--active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Navigation scroll effect ---
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // --- Scroll Text Reveal ---
  document.querySelectorAll('.reveal-text').forEach(el => {
    const text = el.textContent.trim();
    const html = el.innerHTML;

    // Check if it contains <br> tags
    if (html.includes('<br')) {
      const parts = html.split(/<br\s*\/?>/);
      el.innerHTML = parts.map(part => {
        const words = part.trim().split(/\s+/);
        return words.map(w => `<span class="word"><span class="word-inner">${w}</span></span>`).join(' ');
      }).join('<br>');
    } else {
      const words = text.split(/\s+/);
      el.innerHTML = words.map(w => `<span class="word"><span class="word-inner">${w}</span></span>`).join(' ');
    }
  });

  // --- Fade-in + Reveal on scroll (Intersection Observer) ---
  const animEls = document.querySelectorAll('.fade-in, .reveal-text');
  if (animEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('fade-in')) {
            entry.target.classList.add('fade-in--visible');
          }
          if (entry.target.classList.contains('reveal-text')) {
            entry.target.classList.add('revealed');
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    animEls.forEach(el => observer.observe(el));
  }

  // --- Page Transitions ---
  const transition = document.getElementById('page-transition');
  if (transition) {
    document.querySelectorAll('a[data-link]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#' || href.startsWith('#') || href.startsWith('javascript')) return;

        e.preventDefault();
        transition.classList.add('page-transition--active');

        setTimeout(() => {
          window.location.href = href;
        }, 400);
      });
    });
  }

  // --- Back to Top ---
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('back-to-top--visible', window.scrollY > window.innerHeight);
    }, { passive: true });

    backToTop.querySelector('a').addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Email Capture Modal ---
  const modal = document.getElementById('email-modal');
  const modalDismiss = document.getElementById('modal-dismiss');
  const emailForm = document.getElementById('email-form');

  if (modal && !sessionStorage.getItem('ramo-modal-dismissed')) {
    // Wait for loader to finish + delay
    setTimeout(() => {
      modal.classList.add('modal-overlay--active');
    }, 5000);
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('modal-overlay--active');
      sessionStorage.setItem('ramo-modal-dismissed', 'true');
    }
  }

  if (modalDismiss) {
    modalDismiss.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = emailForm.querySelector('input');
      if (input && input.value) {
        emailForm.innerHTML = '<p style="font-size: 0.85rem; font-weight: 300; color: rgba(255,255,255,0.7); letter-spacing: 0.04em;">Welcome to the state.</p>';
        setTimeout(closeModal, 2000);
      }
    });
  }

  // --- Cart Drawer ---
  const cartToggle = document.getElementById('cart-toggle');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartClose = document.getElementById('cart-close');

  function openCart() {
    if (cartDrawer) cartDrawer.classList.add('cart-drawer--active');
    if (cartOverlay) cartOverlay.classList.add('cart-overlay--active');
  }

  function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove('cart-drawer--active');
    if (cartOverlay) cartOverlay.classList.remove('cart-overlay--active');
  }

  if (cartToggle) cartToggle.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeModal();
    }
  });

})();
