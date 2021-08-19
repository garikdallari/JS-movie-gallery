
const footerOpenModalBtn = document.querySelector('.footer-wrapper__underline');
const modal = document.querySelector('.modal');
const buttonClose = document.querySelector('.close-button');

footerOpenModalBtn.addEventListener('click', openModalOnClick);
buttonClose.addEventListener('click',closeModalOnClick);

function openModalOnClick(e) {
  e.preventDefault();
  modal.classList.remove('closed');
  window.addEventListener('keydown', closeModalOnEsk);
  document.body.style.overflow = 'hidden';

}

function closeModalOnClick() {
  modal.classList.add('closed');
  window.removeEventListener('keydown', closeModalOnEsk);
  document.body.style.overflow = 'visible';
}

function closeModalOnEsk(e) {
  if (e.code === 'Escape') {
    closeModalOnClick();
  }
}

