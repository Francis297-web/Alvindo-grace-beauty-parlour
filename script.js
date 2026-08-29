// Accessible nav toggle + existing behaviours

document.addEventListener('DOMContentLoaded', () => {
  // ---------- NAV TOGGLE ----------
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-navigation');
  const nav = document.querySelector('nav');

  // Ensure elements exist
  if (navToggle && primaryNav) {
    // Initialize aria-hidden based on whether menu is open
    primaryNav.setAttribute('aria-hidden', String(!primaryNav.classList.contains('open')));
    navToggle.setAttribute('aria-expanded', String(primaryNav.classList.contains('open')));

    const openNav = () => {
      primaryNav.classList.add('open');
      primaryNav.setAttribute('aria-hidden', 'false');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.classList.add('is-open');
    };

    const closeNav = () => {
      primaryNav.classList.remove('open');
      primaryNav.setAttribute('aria-hidden', 'true');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('is-open');
    };

    const toggleNav = () => {
      if (primaryNav.classList.contains('open')) closeNav();
      else openNav();
    };

    // Click / touch
    navToggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggleNav();
    });

    // Keyboard activation (Enter / Space)
    navToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleNav();
      }
    });

    // Close when clicking a link (good UX on mobile)
    primaryNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        // small screens: close menu after selection
        if (primaryNav.classList.contains('open')) closeNav();
      });
    });

    // Close when clicking outside the nav
    document.addEventListener('click', (e) => {
      if (!primaryNav.contains(e.target) && !navToggle.contains(e.target) && primaryNav.classList.contains('open')) {
        closeNav();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('open')) closeNav();
    });
  }

  // ---------- SCROLL NAV BACKGROUND ----------
  // Keep your existing scroll behavior but guard against missing element
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 50) {
        nav.style.background = "#000";
      } else {
        // if the nav is open on small screens we still want it visible
        if (primaryNav && primaryNav.classList.contains('open')) {
          nav.style.background = "#000";
        } else {
          nav.style.background = "transparent";
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // run once to initialize
    onScroll();
  }

  // ---------- SMOOTH SCROLL FOR HASH LINKS ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // ignore links that are just "#" or empty
      const target = this.getAttribute('href');
      if (!target || target === '#') return;
      const el = document.querySelector(target);
      if (!el) return;

      e.preventDefault();

      // Close nav on small screens when navigating
      if (primaryNav && primaryNav.classList.contains('open')) {
        primaryNav.classList.remove('open');
        primaryNav.setAttribute('aria-hidden', 'true');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }

      el.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

});
