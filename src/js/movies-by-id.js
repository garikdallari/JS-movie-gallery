import { Notify} from "notiflix";
import MovieApiService from './movieService';
import refs from './refs';
import movieCard from '../templates/movie-popup.hbs';
import {
  WATCHED_LIST,
  QUEUE_LIST,
  addProp,
  editWatchedBtnText,
  editQueueBtnText,
  markupGrabbedList,
  pageForExport,
  toggleBtnText,
} from './clients-lists';

const movieApiService = new MovieApiService();
const { galleryRef } = refs;
const links = {
  modal: document.querySelector('.js-lightbox'),
  buttonClose:document.querySelector('.lightbox__button'),
  content :document.querySelector('.lightbox__content'),
  overley : document.querySelector('.lightbox__overlay'),
};

galleryRef.addEventListener('click', openModalOnClick);

function openModalOnClick(e) {
  // e.preventDefault();
if (!e.target.classList.contains('cards-list__img')) {
    return;
  }

  document.body.style.overflow = 'hidden';
  links.modal.classList.add('is-open');
  movieApiService.id = +e.target.getAttribute('data-img-id');
  window.addEventListener('keydown', closeModalOnEsc);
  links.buttonClose.addEventListener('click', closeModalOnClick);
  links.overley.addEventListener('click', closeModalOnClick);
  fetchMovieById();
  links.content.addEventListener('click', openTrailer);
};



function closeModalOnClick() {
  links.modal.classList.remove('is-open');
  document.body.style.overflow = 'visible';
  const modalContent = links.content.lastElementChild;
  modalContent.remove();
  removeListenerFromCloseModal();

  markupGrabbedList(pageForExport);
};

function removeListenerFromCloseModal() {
   window.removeEventListener('keydown', closeModalOnEsc);
  links.buttonClose.removeEventListener('click', closeModalOnClick);
  links.overley.removeEventListener('click', closeModalOnClick);
  links.content.removeEventListener('click', closeTrailer);
  links.content.removeEventListener('click', openTrailer);
};

function closeModalOnEsc(e) {
  if (e.code === 'Escape') {
    closeModalOnClick();
  }
};


function openTrailer(e) {
  if (!e.target.classList.contains("button_open")) {
    return;
  }
   document.querySelector(".plyr__video-embed").style.display = 'block';
   addListenerForOpentrailer();
};

function addListenerForOpentrailer() {
  const backdrop = document.querySelector(".backdrop");
   backdrop.classList.add("backdrop-is-open");
   const btnCloseTrailer = document.querySelector(".trailer_button")
   btnCloseTrailer.addEventListener("click", closeTrailer);
   const overlayForTrailer = document.querySelector(".backdrop_overlay");
   overlayForTrailer.addEventListener("click", closeTrailer);
};


function closeTrailer(e) {
  
  document.querySelector(".plyr__video-embed").style.display = 'none';
  const backdrop = document.querySelector(".backdrop");
  backdrop.classList.remove("backdrop-is-open");
  removeListenerFromCloseTrailer();
    stopPlayer();
};
  
function removeListenerFromCloseTrailer() {
  const overlayForTrailer = document.querySelector(".backdrop_overlay");
  overlayForTrailer.removeEventListener("click", closeTrailer);
  const btnCloseTrailer = document.querySelector(".trailer_button")
  btnCloseTrailer.removeEventListener("click", closeTrailer);

};


function stopPlayer() {
const iframe = document.querySelector('.ytplayer');
let src = iframe.getAttribute('src');
iframe.setAttribute('src', '');
iframe.setAttribute('src', src);
};


async function fetchMovieById() {
  const { data } = await movieApiService.getMovieInfo();
  const genres = data.genres
    .slice(0, 3)
    .map(genre => genre.name)
    .join(' ');

  const { results } = await movieApiService.fetchTrailer();
  let key;

    if(results.length === 0){
      key='W9nZ6u15yis';
      movieApiService.markupTempl(({ data, genres, key }), links.content, movieCard);
      Notify.init({ distance:"300px",fontSize:"15px", warning: {background:"#ff6f09",}, }); 
      Notify.warning("Sorry!We  don't have a trailer for this movie.");
    }
    else{
       key = results[0].key; 
      movieApiService.markupTempl(({data,genres,key}), links.content, movieCard);

  }

  // check for this movie if it exists in storage
  const isQueue = addProp(data, QUEUE_LIST);
  const isWatched = addProp(data, WATCHED_LIST);

  // movieApiService.markupTempl({ data, genres, isWatched, isQueue }, content, movieCard);

  toggleBtnText(isWatched, WATCHED_LIST);
  toggleBtnText(isQueue, QUEUE_LIST);
}
