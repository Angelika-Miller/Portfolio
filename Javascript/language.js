// Simple DE/EN toggle: swaps every element that carries data-de / data-en
var langToggle = document.getElementById('lang-toggle');
var translatable = document.querySelectorAll('[data-de][data-en]');
var currentLang = 'de';

if (langToggle) {
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'de' ? 'en' : 'de';
    applyLanguage(currentLang);
  });
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  langToggle.textContent = lang === 'de' ? 'EN' : 'DE';
  langToggle.setAttribute('aria-label', lang === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln');

  translatable.forEach((el) => {
    el.textContent = lang === 'de' ? el.dataset.de : el.dataset.en;
  });
}
