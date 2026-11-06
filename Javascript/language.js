var langToggle = document.getElementById('lang-toggle');
var langMenuToggle = document.getElementById('menu-toggle');
var langBackToTop = document.getElementById('back-to-top');
var translatable = document.querySelectorAll('[data-de][data-en]');

var labels = {
  de: { toggle: 'Switch to English', menu: 'Menü öffnen', top: 'Nach oben scrollen' },
  en: { toggle: 'Auf Deutsch wechseln', menu: 'Open menu', top: 'Back to top' }
};

var currentLang = 'de';

try {
  var savedLang = localStorage.getItem('lang');
  if (savedLang === 'de' || savedLang === 'en') currentLang = savedLang;
} catch (error) {}

applyLanguage(currentLang);

if (langToggle) {
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'de' ? 'en' : 'de';
    applyLanguage(currentLang);
    try {
      localStorage.setItem('lang', currentLang);
    } catch (error) {}
  });
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  translatable.forEach((element) => {
    element.textContent = element.dataset[lang];
  });

  if (langToggle) {
    langToggle.textContent = lang === 'de' ? 'EN' : 'DE';
    langToggle.setAttribute('aria-label', labels[lang].toggle);
  }

  if (langMenuToggle) langMenuToggle.setAttribute('aria-label', labels[lang].menu);
  if (langBackToTop) langBackToTop.setAttribute('aria-label', labels[lang].top);
}
