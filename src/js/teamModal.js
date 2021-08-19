
const footerOpenModalBtn = document.querySelector('.footer-wrapper__underline');
const modal = document.querySelector('.modal');
const buttonClose = document.querySelector('.close-button');
const overlay = document.querySelector('.modal-overlay');

footerOpenModalBtn.addEventListener('click', openModalOnClick);

buttonClose.addEventListener('click',closeModalOnClick);
// overlay.addEventListener('click', onOverleyClick);




function openModalOnClick(e) {
  e.preventDefault();
  modal.classList.remove('closed');
  window.addEventListener('keydown', closeModalOnEsk);
  window.addEventListener('keydown', onOverleyClick);


}

function closeModalOnClick() {
  modal.classList.add('closed');
  window.removeEventListener('keydown', closeModalOnEsk);
  window.removeEventListener('keydown', onOverleyClick);
  document.body.style.overflow = 'visible';
}

function onOverleyClick(e) {
  if (e.currentTarget === e.target) {
    closeModalOnClick();
  }
}

function closeModalOnEsk(e) {
  if (e.code === 'Escape') {
    closeModalOnClick();
  }
}

