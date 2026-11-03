// Fade/slide in each text block once it scrolls into view
var textBlocks = document.querySelectorAll('.textblock');

var revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

textBlocks.forEach((block) => revealObserver.observe(block));

// Keep a CSS variable in sync with the header's real height so mobile layout
// (where the header becomes position: fixed) can reserve the right amount of
// space for it. A ResizeObserver catches language-toggle text changes, font
// loading, and orientation changes automatically.
var siteHeader = document.getElementById('site-header');

function syncHeaderHeight() {
  if (siteHeader) {
    document.documentElement.style.setProperty('--header-height', siteHeader.offsetHeight + 'px');
  }
}

if (siteHeader) {
  syncHeaderHeight();

  if ('ResizeObserver' in window) {
    new ResizeObserver(syncHeaderHeight).observe(siteHeader);
  } else {
    window.addEventListener('resize', syncHeaderHeight);
  }
}

// Hide the header (mobile only, see CSS) once the user scrolls down, show it
// again at the very top, and toggle the back-to-top button — all batched into
// a single rAF-throttled scroll handler to avoid jank.
var backToTopButton = document.getElementById('back-to-top');
var scrollTicking = false;

function handleScroll() {
  var y = window.scrollY;

  if (siteHeader) {
    siteHeader.classList.toggle('header-hidden', y > 0);
  }

  if (backToTopButton) {
    backToTopButton.classList.toggle('visible', y > 400);
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
