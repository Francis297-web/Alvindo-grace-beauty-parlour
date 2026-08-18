// Off-canvas nav toggling with basic accessibility and guards.

(function () {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  const overlay = document.getElementById('nav-overlay');
  const FOCUSABLE = 'a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])';

  // Guard: stop if required elements are missing
  if (!toggle || !nav || !overlay) {
    // Elements not found; nothing to wire up.
    // Avoid throwing errors so site continues to work.
    console.warn('Mobile nav: required elements missing (nav-toggle / primary-nav / nav-overlay).');
    return;
  }

  function openNav() {
    nav.classList.add('is-open');
    nav.hidden = false;
    nav.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    overlay.hidden = false;
    document.body.classList.add('no-scroll');

    // move focus into first focusable element in nav
    const first = nav.querySelector(FOCUSABLE);
    if (first) first.focus();
  }

  function closeNav() {
    nav.classList.remove('is-open');
    nav.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    overlay.hidden = true;
    document.body.classList.remove('no-scroll');

    // After the transition finishes, hide the nav so it is removed from the accessibility tree
    nav.addEventListener('transitionend', () => {
      if (!nav.classList.contains('is-open')) nav.hidden = true;
    }, { once: true });

    // return focus to the toggle so keyboard users have a predictable place
    toggle.focus();
  }

  // Toggle behavior
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeNav();
    else openNav();
  });

  // Close when overlay clicked
  overlay.addEventListener('click', closeNav);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeNav();
    }
  });

  // Optional: close navigation when a nav link is clicked (mobile UX)
  nav.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.tagName === 'A' && window.innerWidth < 768) {
      closeNav();
    }
  });
})();
