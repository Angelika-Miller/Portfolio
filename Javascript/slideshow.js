var slideshows = document.querySelectorAll('[data-component="slideshow"]');

slideshows.forEach(initSlideShow);

function initSlideShow(slideshow) {

  var slides = document.querySelectorAll(`#${slideshow.id} [role="list"] .slide`);
  var progressBar = slideshow.querySelector('.slideshow-progress-bar');

  var index = 0, time = 9000;
  slides[index].classList.add('active');
  playProgress();

  setInterval( () => {
    slides[index].classList.remove('active');
    index++;
    if (index === slides.length) index = 0;

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
