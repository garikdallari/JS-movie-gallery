// var modal = document.querySelector("#modal");
// var modalOverlay = document.querySelector("#modal-overlay");
// var closeButton = document.querySelector("#close-button");
// var openButton = document.querySelector("#open-button");

// let close = () => {
//   modal.classList.toggle("closed");
//   modalOverlay.classList.toggle("closed");
//   document.body.style.overflow = 'hidden';
// }

// closeButton.addEventListener("click", close);
// openButton.addEventListener("click", close);
// modalOverlay.addEventListener('click', close);
// window.addEventListener('keydown', closeModalOnEsc);

// function closeModalOnEsc(e) {
//   if (e.code === 'Escape') {
//     close;
//   }
// }


const footerOpenModalBtn = document.querySelector('.footer-wrapper__underline');
const modal = document.querySelector('.modal');
const buttonClose = document.querySelector('.close-button');
const overlay = document.querySelector('.modal-overlay');

footerOpenModalBtn.addEventListener('click', openModalOnClick);
buttonClose.addEventListener('click',closeModalOnClick);
overlay.addEventListener('click', onOverleyClick);



function openModalOnClick(e) {
    e.preventDefault()
  modal.classList.remove('closed');
  window.addEventListener('keydown', closeModalOnEsk);
  window.addEventListener('keydown', onOverleyClick);
  document.body.style.overflow = 'hidden';
  overlay.style.pointerEvents = 'none'
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

};

function closeModalOnEsk(e) {
  if(e.code==="Escape"){
    closeModalOnClick();
  }
}