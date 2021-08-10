import MovieApiService from './movieService';
import refs from './refs';
import movieCard from '../templates/movie-popup.hbs';
import {
  addIsWatchedProp,
  addIsQueueProp,
  editWatchedBtnText,
  editQueueBtnText,
  markupGrabbedList,
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
}

function closeModalOnClick() {
  modal.classList.remove('is-open');
  document.body.style.overflow = 'visible';
  const modalContent = content.lastElementChild;
  modalContent.remove();
  window.removeEventListener('keydown', closeModalOnEsc);
  buttonClose.removeEventListener('click', closeModalOnClick);
  overley.removeEventListener('click', closeModalOnClick);

  // =====after modal close we get the library screen
  // markupGrabbedList('queue');
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

  // check for this movie exist in storage
  const isWatched = addIsWatchedProp(data);
  const isQueue = addIsQueueProp(data);

  movieApiService.markupTempl({ data, genres, isWatched, isQueue }, content, movieCard);

  // edit button text
  editWatchedBtnText(isWatched);
  editQueueBtnText(isQueue);
}
