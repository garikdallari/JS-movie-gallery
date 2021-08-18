import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/fontawesome';

// ===== SMOOTH SCROOL
document.querySelector('a[href^="#lang-menu"]').addEventListener('click', function (e) {
  e.preventDefault();
  const id = this.getAttribute('href');

  document.querySelector(id).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});
