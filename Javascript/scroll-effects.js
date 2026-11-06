var revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  var revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

var nav = document.getElementById('nav');
var menuToggle = document.getElementById('menu-toggle');

function setMenu(open) {
  if (!nav || !menuToggle) return;
  nav.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    setMenu(!nav.classList.contains('open'));
  });
}

if (nav) {
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) setMenu(false);
});

var backToTopButton = document.getElementById('back-to-top');
var scrollTicking = false;

function handleScroll() {
  if (backToTopButton) {
    backToTopButton.classList.toggle('visible', window.scrollY > 500);
  }
  scrollTicking = false;
}

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(handleScroll);
    scrollTicking = true;
  }
}, { passive: true });

if (backToTopButton) {
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
