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
const modal = document.querySelector('.js-lightbox');
const buttonClose = document.querySelector('.lightbox__button');
const content = document.querySelector('.lightbox__content');
const overley = document.querySelector('.lightbox__overlay');

galleryRef.addEventListener('click', openModalOnClick);

function openModalOnClick(e) {
  e.preventDefault();

  if (!e.target.classList.contains('cards-list__img')) {
    return;
  }
  document.body.style.overflow = 'hidden';
  modal.classList.add('is-open');
  movieApiService.id = +e.target.getAttribute('data-img-id');
  window.addEventListener('keydown', closeModalOnEsc);
  buttonClose.addEventListener('click', closeModalOnClick);
  overley.addEventListener('click', closeModalOnClick);
  fetchMovieById();
  content.addEventListener('click', openTrailer);

  content.addEventListener('click', closeTrailer);
}

function openTrailer(e) {
  if (e.target.classList.contains('button_open')) {
    document.querySelector('.plyr__video-embed').style.display = 'block';
  }
}
function closeTrailer(e) {
  if (e.target.classList.contains('trailer_button')) {
    document.querySelector('.plyr__video-embed').style.display = 'none';
  }
}
function closeModalOnClick() {
  modal.classList.remove('is-open');
  document.body.style.overflow = 'visible';
  const modalContent = content.lastElementChild;
  modalContent.remove();
  window.removeEventListener('keydown', closeModalOnEsc);
  buttonClose.removeEventListener('click', closeModalOnClick);
  overley.removeEventListener('click', closeModalOnClick);
  content.removeEventListener('click', closeTrailer);
  content.removeEventListener('click', openTrailer);

  markupGrabbedList(pageForExport);
}

function closeModalOnEsc(e) {
  if (e.code === 'Escape') {
    closeModalOnClick();
  }
}

async function fetchMovieById() {
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
}
