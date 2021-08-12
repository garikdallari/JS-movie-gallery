import refs from './refs';
import MovieApiService from './movieService';
import galleryCard from '../templates/gallery-card.hbs';

const { myLibraryRef, galleryRef, libraryBtns, modalRef, homeRef } = refs;

const movieApiService = new MovieApiService();
const WATCHED_LIST = 'watched';
const QUEUE_LIST = 'queue';
let pageForExport = null;

// ===== LISTENTERS
myLibraryRef.addEventListener('click', onLibraryClick);
homeRef.addEventListener('click', onHomeRefClick);

libraryBtns.addEventListener('click', onLibraryBtnsClick);
modalRef.addEventListener('click', onModalBtnsClick);

// ===== CREATE EMPTY LISTS
if (localStorage.getItem(WATCHED_LIST) === null) movieApiService.createLocalList(WATCHED_LIST);
if (localStorage.getItem(QUEUE_LIST) === null) movieApiService.createLocalList(QUEUE_LIST);

// ===== ON HOME BUTTON CLICK
function onHomeRefClick() {
  pageForExport = null;
}

// ===== ON LIBRARY LINK CLICK
function onLibraryClick(e) {
  movieApiService.clearGallery();

  pageForExport = WATCHED_LIST;

  // ===== get watched list & render it
  const grabbedData = movieApiService.getLocalStoredList(WATCHED_LIST);
  movieApiService.markupTempl(grabbedData, galleryRef, galleryCard);

  grabbedData.forEach(movie => {
    movieApiService.editDate(movie);
    editMovieGenres(movie);
  });
}

function editMovieGenres(obj) {
  const genresRef = document.querySelector(`[data-genre-id="${obj.id}"]`);
  let parsedGenres = [];
  obj.genres.forEach(genre => {
    parsedGenres.push(genre.name);
  });

  if (parsedGenres.length > 2)
    return (genresRef.innerHTML = parsedGenres.splice(0, 3).join(', ') + '&nbsp;');
  genresRef.innerHTML = parsedGenres.join(', ');
}

// ===== LIBRARY BUTTONS CLICK
function onLibraryBtnsClick(e) {
  movieApiService.clearGallery();
  if (e.target.dataset.value === 'watched') {
    movieApiService.updateLocalList(WATCHED_LIST);

    pageForExport = WATCHED_LIST;

    const grabbedData = movieApiService.getLocalStoredList('watched');
    movieApiService.markupTempl(grabbedData, galleryRef, galleryCard);

    grabbedData.forEach(movie => {
      movieApiService.editDate(movie);
      editMovieGenres(movie);
    });
  }

  if (e.target.dataset.value === 'queue') {
    movieApiService.updateLocalList(QUEUE_LIST);

    pageForExport = QUEUE_LIST;

    const grabbedData = movieApiService.getLocalStoredList(QUEUE_LIST);
    movieApiService.markupTempl(grabbedData, galleryRef, galleryCard);

    grabbedData.forEach(movie => {
      movieApiService.editDate(movie);
      editMovieGenres(movie);
    });
  }
}

export { pageForExport };

// ===== ON MODAL BUTTONS CLICK
function onModalBtnsClick(e) {
  const movieId = Number(e.target.dataset.id);
  const btn = e.target;

  // ===== add to the list
  if (btn.nodeName !== 'BUTTON') return;

  if (btn.dataset.action === 'add-to-watched') {
    btn.textContent = 'remove from watched';
    btn.dataset.action = 'remove-from-watched';

    movieApiService.addToMovieList(movieId, WATCHED_LIST);
    return;
  }

  if (btn.dataset.action === 'add-to-queue') {
    btn.textContent = 'remove from queue';
    btn.dataset.action = 'remove-from-queue';

    movieApiService.addToMovieList(movieId, QUEUE_LIST);
    return;
  }

  if (btn.dataset.action === 'remove-from-watched') {
    btn.textContent = 'add to watched';
    btn.dataset.action = 'add-to-watched';

    movieApiService.removefromMovieList(movieId, WATCHED_LIST);

    return;
  }

  if (btn.dataset.action === 'remove-from-queue') {
    btn.textContent = 'add to queue';
    btn.dataset.action = 'add-to-queue';

    movieApiService.removefromMovieList(movieId, QUEUE_LIST);

    return;
  }
}

export function markupGrabbedList(listKey) {
  if (listKey === null) return;
  movieApiService.clearGallery();

  const grabbedData = movieApiService.getLocalStoredList(listKey);
  movieApiService.markupTempl(grabbedData, galleryRef, galleryCard);

  grabbedData.forEach(movie => {
    movieApiService.editDate(movie);
    editMovieGenres(movie);
  });
}

// ============ fucntions for movie-by-id.js

export function editWatchedBtnText(boolean) {
  const watchedBtn = document.querySelector('.button_watched');
  if (boolean) {
    watchedBtn.textContent = 'remove from watched';
    watchedBtn.dataset.action = 'remove-from-watched';
  } else {
    watchedBtn.textContent = 'add to watched';
    watchedBtn.dataset.action = 'add-to-watched';
  }
}

export function editQueueBtnText(boolean) {
  const queueBtn = document.querySelector('[data-action="add-to-queue"]');
  if (!boolean) {
    queueBtn.textContent = 'remove from queue';
    queueBtn.dataset.action = 'remove-from-queue';
  }
}

// ===== add isWAtched property
export function addIsWatchedProp(data) {
  const localList = movieApiService.getLocalStoredList('watched');
  const movieId = data.id;
  const isIdExists = localList.some(movie => movieId === movie.id);
  isIdExists ? (data.isWatched = true) : (data.isWatched = false);

  return data.isWatched;
}

// ===== add isQueue Property
export function addIsQueueProp(data) {
  const localList = movieApiService.getLocalStoredList('queue');
  const movieId = data.id;
  const isIdExists = localList.some(movie => movieId === movie.id);
  if (isIdExists) {
    data.isQueue = false;
  } else {
    data.isQueue = true;
  }

  const isQueue = data.isQueue;
  return isQueue;
}
