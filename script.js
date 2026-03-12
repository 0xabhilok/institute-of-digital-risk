/**
 * script.js — Institute of Digital Risk (IDR)
 * Author  : [Student Name]
 * Purpose : Handles navbar scroll behaviour, mobile menu,
 *           scroll-reveal animations, and form submission.
 */

/* ────────────────────────────────────────────
   1. STICKY NAVBAR — Add/remove .scrolled class
──────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    // Add shadow + border when page is scrolled more than 10px
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on page load
})();


/* ────────────────────────────────────────────
   2. MOBILE MENU TOGGLE
──────────────────────────────────────────── */
(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('is-open');
    mobileMenu.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close menu when any link inside it is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
})();


/* ────────────────────────────────────────────
   3. SCROLL REVEAL — Animate elements into view
──────────────────────────────────────────── */
(function initScrollReveal() {
  // All elements with class "reveal" will animate when they enter the viewport
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stop observing once animated — no need to re-trigger
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,      // Trigger when 12% of element is visible
      rootMargin: '0px 0px -40px 0px'  // Slight offset from bottom
    }
  );

  revealEls.forEach(el => observer.observe(el));
})();


/* ────────────────────────────────────────────
   4. ACTIVE NAV LINK — Highlight current section
──────────────────────────────────────────── */
(function initActiveNav() {
  const sections  = document.querySelectorAll('main section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Remove active class from all links
          navLinks.forEach(a => a.removeAttribute('data-active'));
          // Add to the matching link
          const id = entry.target.getAttribute('id');
          const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
          if (activeLink) activeLink.setAttribute('data-active', 'true');
        }
      });
    },
    {
      rootMargin: '-35% 0px -60% 0px'
    }
  );

  sections.forEach(sec => sectionObserver.observe(sec));
})();


/* ────────────────────────────────────────────
   5. CONTACT FORM — Simulated submission
──────────────────────────────────────────── */
(function initContactForm() {
  const form        = document.getElementById('contact-form');
  const successMsg  = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic client-side validation
    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Simulate a short loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      // Hide all form fields
      form.querySelectorAll('.form-group, .form-row, .form-footer')
          .forEach(el => { el.style.display = 'none'; });

      // Show success message
      if (successMsg) successMsg.classList.add('show');
    }, 900);
  });

  /** Simple email format check */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
})();


/* ────────────────────────────────────────────
   6. SMOOTH SCROLL POLYFILL — for older browsers
      (modern browsers handle scroll-behavior: smooth in CSS)
──────────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      const navHeight = document.getElementById('navbar')?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ────────────────────────────────────────────
   7. YEAR — Keep footer copyright current
──────────────────────────────────────────── */
(function updateYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
