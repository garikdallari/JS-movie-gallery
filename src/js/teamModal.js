var modal = document.querySelector("#modal");
var modalOverlay = document.querySelector("#modal-overlay");
var closeButton = document.querySelector("#close-button");
var openButton = document.querySelector("#open-button");

let close = () => {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
  document.body.style.overflow = 'hidden';
}

closeButton.addEventListener("click", close);
openButton.addEventListener("click", close);
modalOverlay.addEventListener('click', close);
window.addEventListener('keydown', closeModalOnEsc);

function closeModalOnEsc(e) {
  if (e.code === 'Escape') {
    close;
  }
}