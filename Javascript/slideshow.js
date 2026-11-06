var slideshows = document.querySelectorAll('[data-component="slideshow"]');

slideshows.forEach(initSlideShow);

function initSlideShow(slideshow) {
  var slides = slideshow.querySelectorAll('[role="list"] .slide');
  var progressBar = slideshow.querySelector('.slideshow-progress-bar');

  if (slides.length === 0) return;

  var index = 0;
  var time = 9000;

  slides[index].classList.add('active');
  playProgress();

  setInterval(() => {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
    playProgress();
  }, time);

  function playProgress() {
    if (!progressBar) return;
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    void progressBar.offsetWidth;
    progressBar.style.transition = `width ${time}ms linear`;
    progressBar.style.width = '100%';
  }
}
