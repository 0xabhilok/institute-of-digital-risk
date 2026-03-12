/**
 * script.js — Institute of Digital Risk (IDR) v2.0
 * Handles: navbar state, mobile menu, scroll reveal,
 *          active nav, floating-label select, form UX.
 */

/* ──────────────────────────────────────────
   1. NAVBAR — transparent on dark hero,
      dark scrolled when on hero,
      light when past hero
────────────────────────────────────────── */
// Uses scroll position to toggle .scrolled and .on-light classes
(function initNavbar() {
  const nav    = document.getElementById('navbar');
  const hero   = document.getElementById('hero');
  if (!nav) return;

  function update() {
    const scrolled    = window.scrollY > 10;
    const pastHero    = hero ? window.scrollY > hero.offsetHeight - 80 : false;

    // Always remove both first
    nav.classList.remove('scrolled', 'on-light');

    if (pastHero) {
      // On light-background sections — use white nav
      nav.classList.add('on-light');
    } else if (scrolled) {
      // Scrolled but still over dark hero — dark glass nav
      nav.classList.add('scrolled');
    }
    // else: top of page, nav is transparent over dark hero
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ──────────────────────────────────────────
   2. MOBILE MENU
────────────────────────────────────────── */
(function initMobileMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('is-open');
    menu.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('is-open');
      menu.classList.remove('is-open');
      btn.setAttribute('aria-expanded', false);
    });
  });
})();


/* ──────────────────────────────────────────
   3. SMOOTH SCROLL  (polyfill for older browsers)
────────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = document.getElementById('navbar')?.offsetHeight || 68;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ──────────────────────────────────────────
   4. SCROLL REVEAL — elements with .reveal,
      .rev-l, .rev-r animate into view
────────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal, .rev-l, .rev-r');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -36px 0px' });

  els.forEach(el => io.observe(el));
})();


/* ──────────────────────────────────────────
   5. ACTIVE NAV LINK — highlight current section
────────────────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !links.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.removeAttribute('data-active'));
        const match = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (match) match.setAttribute('data-active', 'true');
      }
    });
  }, { rootMargin: '-30% 0px -65% 0px' });

  sections.forEach(s => io.observe(s));
})();


/* ──────────────────────────────────────────
   6. FLOATING LABEL — select element
      Add .filled class when a value is chosen
      so the CSS label floats up correctly.
────────────────────────────────────────── */
(function initSelectLabel() {
  const selects = document.querySelectorAll('.f-group select');
  selects.forEach(sel => {
    sel.addEventListener('change', () => {
      sel.classList.toggle('filled', sel.value !== '');
    });
  });
})();


/* ──────────────────────────────────────────
   7. CONTACT FORM — validation + success UX
────────────────────────────────────────── */
(function initForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-ok');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect values
    const fname   = form.querySelector('#fname')?.value.trim();
    const lname   = form.querySelector('#lname')?.value.trim();
    const email   = form.querySelector('#email')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();

    // Simple validation
    if (!fname || !lname || !email || !message) {
      showFieldErrors(form);
      return;
    }
    if (!validEmail(email)) {
      const emailInput = form.querySelector('#email');
      emailInput.style.borderColor = '#EF4444';
      emailInput.focus();
      return;
    }

    // Loading state
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span style="opacity:.6">Sending…</span>`;

    // Simulate async submit (replace with real fetch in production)
    setTimeout(() => {
      // Hide all form fields gracefully
      Array.from(form.children).forEach(child => {
        if (child.id !== 'form-ok') {
          child.style.transition = 'opacity .3s ease';
          child.style.opacity = '0';
          setTimeout(() => { child.style.display = 'none'; }, 300);
        }
      });

      // Show success
      setTimeout(() => {
        if (success) success.classList.add('show');
      }, 350);
    }, 900);
  });

  function showFieldErrors(form) {
    const required = form.querySelectorAll('[required]');
    required.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#EF4444';
        field.addEventListener('input', () => {
          field.style.borderColor = '';
        }, { once: true });
      }
    });
    // Focus first empty required field
    const first = Array.from(required).find(f => !f.value.trim());
    if (first) first.focus();
  }

  function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Clear red border on input
  form.querySelectorAll('input, textarea, select').forEach(el => {
    el.addEventListener('input', () => { el.style.borderColor = ''; });
    el.addEventListener('change', () => { el.style.borderColor = ''; });
  });
})();


/* ──────────────────────────────────────────
   8. FOOTER YEAR
────────────────────────────────────────── */
(function updateYear() {
  const el = document.getElementById('current-year');
  if (el) el.textContent = new Date().getFullYear();
})();
