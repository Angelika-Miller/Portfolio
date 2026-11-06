var slideshowLabels = {
  de: { prev: 'Vorheriges Banner', next: 'Nächstes Banner', pause: 'Pausieren', play: 'Abspielen', dot: 'Banner' },
  en: { prev: 'Previous banner', next: 'Next banner', pause: 'Pause', play: 'Play', dot: 'Banner' }
};

document.querySelectorAll('[data-component="slideshow"]').forEach(initSlideShow);

function initSlideShow(slideshow) {
  var slides = slideshow.querySelectorAll('[role="list"] .slide');
  var progressBar = slideshow.querySelector('.slideshow-progress-bar');
  var prevButton = slideshow.querySelector('[data-action="prev"]');
  var nextButton = slideshow.querySelector('[data-action="next"]');
  var pauseButton = slideshow.querySelector('[data-action="pause"]');
  var dotsContainer = slideshow.querySelector('.slideshow-dots');

  if (slides.length === 0) return;

  var time = 12000;
  var index = 0;
  var timer = null;
  var paused = false;
  var dots = [];

  if (dotsContainer) {
    slides.forEach((slide, i) => {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slideshow-dot';
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
  }

  function show(newIndex) {
    slides[index].classList.remove('active');
    index = (newIndex + slides.length) % slides.length;
    slides[index].classList.add('active');
    dots.forEach((dot, i) => dot.setAttribute('aria-current', i === index ? 'true' : 'false'));
  }

  function schedule() {
    clearTimeout(timer);
    if (paused) return;
    playProgress();
    timer = setTimeout(() => {
      show(index + 1);
      schedule();
    }, time);
  }

  function goTo(newIndex) {
    show(newIndex);
    if (paused) {
      resetProgress();
    } else {
      schedule();
    }
  }

  function setPaused(value) {
    paused = value;
    if (pauseButton) pauseButton.setAttribute('aria-pressed', paused ? 'true' : 'false');
    updateLabels();
    if (paused) {
      clearTimeout(timer);
      freezeProgress();
    } else {
      schedule();
    }
  }

  function playProgress() {
    if (!progressBar) return;
    resetProgress();
    void progressBar.offsetWidth;
    progressBar.style.transition = `width ${time}ms linear`;
    progressBar.style.width = '100%';
  }

  function resetProgress() {
    if (!progressBar) return;
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
  }

  function freezeProgress() {
    if (!progressBar) return;
    var currentWidth = getComputedStyle(progressBar).width;
    progressBar.style.transition = 'none';
    progressBar.style.width = currentWidth;
  }

  function updateLabels() {
    var lang = document.documentElement.lang === 'en' ? 'en' : 'de';
    var text = slideshowLabels[lang];
    if (prevButton) prevButton.setAttribute('aria-label', text.prev);
    if (nextButton) nextButton.setAttribute('aria-label', text.next);
    if (pauseButton) pauseButton.setAttribute('aria-label', paused ? text.play : text.pause);
    dots.forEach((dot, i) => dot.setAttribute('aria-label', `${text.dot} ${i + 1}`));
  }

  if (prevButton) prevButton.addEventListener('click', () => goTo(index - 1));
  if (nextButton) nextButton.addEventListener('click', () => goTo(index + 1));
  if (pauseButton) pauseButton.addEventListener('click', () => setPaused(!paused));

  slideshow.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') goTo(index - 1);
    if (event.key === 'ArrowRight') goTo(index + 1);
  });

  document.addEventListener('languagechange', updateLabels);

  slides[index].classList.add('active');
  show(0);
  updateLabels();
  schedule();
}
