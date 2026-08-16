document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');

  // toggle a class instead of writing inline styles
  const onScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  // initial check in case page is loaded with scroll already
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // smooth scrolling with guards
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const href = this.getAttribute('href');
      if (!href || href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      try {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        } else {
          // fallback: scroll to top if target not found
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch (err) {
        // if selector is invalid, fallback to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
});
