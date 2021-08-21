import { Notify } from 'notiflix';
import MovieApiService from './movieService';
import refs from './refs';
import movieCard from '../templates/movie-popup.hbs';
import { loader } from './loaders';
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
const { galleryRef, modalRef, overlay, buttonClose, content, modalMovie, modalMovieAboutFilm } = refs;

galleryRef.addEventListener('click', openModalOnClick);

function openModalOnClick(e) {
  
  if (!e.target.classList.contains('cards-list__img')) {
    return;
  }
  loader.on();

  document.body.style.overflow = 'hidden';
  modalRef.classList.add('is-open');
  movieApiService.id = +e.target.getAttribute('data-img-id');
  window.addEventListener('keydown', closeModalOnEsc);
  buttonClose.addEventListener('click', closeModalOnClick);
  overlay.addEventListener('click', closeModalOnClick);
  fetchMovieById();

  content.addEventListener('click', openTrailer);
}

function closeModalOnClick() {

  const modalMovie = document.querySelector('.modal_movie');
  const modalMovieAboutFilm = document.querySelector('.modal_movie_about-film');

  modalRef.classList.remove('is-open');
  document.body.style.overflow = 'visible';
  const modalContent = content.lastElementChild;
  modalContent.remove();
  modalMovie.remove();
  // modalMovieAboutFilm.remove()
  removeListenerFromCloseModal();
  // markupGrabbedList(pageForExport);
}

function removeListenerFromCloseModal() {
  //  window.removeEventListener('keydown', closeModalOnEsc);
  buttonClose.removeEventListener('click', closeModalOnClick);
  overlay.removeEventListener('click', closeModalOnClick);
  content.removeEventListener('click', openTrailer);
}

function closeModalOnEsc(e) {
  if (e.code === 'Escape') {
    closeModalOnClick();
  }
}

function openTrailer(e) {
  
  if (!e.target.classList.contains("button_open")) {
 return;
  }
  document.querySelector('.plyr__video-embed').style.display = 'block';
  buttonClose.style.display = 'none';
  addListenerForOpentrailer();
  window.removeEventListener('keydown', closeModalOnEsc);
  const iframe = document.querySelector('.ytplayer');
  let src = iframe.getAttribute('src');
  const btnOpenTrailer = document.querySelector('.button_open');
  const backdrop = document.querySelector('.backdrop');
  const srcWithoutTrailer =
    'https://www.youtube.com/embed/W9nZ6u15yis?origin=https://plyr.io&iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1';
  if (src === srcWithoutTrailer) {
    iframe.style.display = 'none';
    buttonClose.style.display = 'flex';
    backdrop.classList.remove('backdrop-is-open');
    btnOpenTrailer.disabled = true;
    btnOpenTrailer.style.cursor = 'default';
    btnOpenTrailer.style.background = 'transparent';
    btnOpenTrailer.style.color = 'gray';
    btnOpenTrailer.style.border = '1px solid lightgray';
    Notify.init({
      position: 'right-top',
      fontSize: '15px',
      warning: { background: '#ff6f09' },
      timeout: 1500,
    });
    Notify.warning("Sorry!We don't have a trailer for this movie.");
  }
}

function addListenerForOpentrailer() {
  const backdrop = document.querySelector('.backdrop');
  backdrop.classList.add('backdrop-is-open');
  const overlayForTrailer = document.querySelector('.backdrop_overlay');
  const btnCloseTrailer = document.querySelector('.trailer_button');
  btnCloseTrailer.addEventListener('click', closeTrailer);
  overlayForTrailer.addEventListener('click', closeTrailer);
  window.addEventListener('keydown', closeTrailerOnEsc);
}

function closeTrailer() {
  document.querySelector('.plyr__video-embed').style.display = 'none';
  buttonClose.style.display = 'flex';
  const backdrop = document.querySelector('.backdrop');
  backdrop.classList.remove('backdrop-is-open');
  window.addEventListener('keydown', closeModalOnEsc);
  removeListenerFromCloseTrailer();
  stopPlayer();
}

function removeListenerFromCloseTrailer() {
  const overlayForTrailer = document.querySelector('.backdrop_overlay');
  overlayForTrailer.removeEventListener('click', closeTrailer);
  window.removeEventListener('keydown', closeTrailerOnEsc);
  const btnCloseTrailer = document.querySelector('.trailer_button');
  btnCloseTrailer.removeEventListener('click', closeTrailer);
}
function closeTrailerOnEsc(e) {
  if (e.code === 'Escape') {
    closeTrailer();
  }
}

function stopPlayer() {
  const iframe = document.querySelector('.ytplayer');
  let src = iframe.getAttribute('src');
  iframe.setAttribute('src', '');
  iframe.setAttribute('src', src);
}

async function fetchMovieById() {
  movieApiService.getCurrentClientLang();

  const { data } = await movieApiService.getMovieInfo();
  const genres = data.genres
    .slice(0, 3)
    .map(genre => genre.name)
    .join(' ');

  const { results } = await movieApiService.fetchTrailer();
  let key;

  if (results.length === 0) {
    key = 'W9nZ6u15yis';
    movieApiService.markupTempl({ data, genres, key }, content, movieCard);
  } else {
    key = results[0].key;
    movieApiService.markupTempl({ data, genres, key }, content, movieCard);
  }

  // check for this movie if it exists in storage
  const isQueue = addProp(data, QUEUE_LIST);

  const isWatched = addProp(data, WATCHED_LIST);

  // movieApiService.markupTempl({ data, genres, isWatched, isQueue }, content, movieCard);

  toggleBtnText(isWatched, WATCHED_LIST);
  toggleBtnText(isQueue, QUEUE_LIST);
  await loader.off();
}
