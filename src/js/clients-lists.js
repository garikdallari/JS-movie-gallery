import refs from './refs';
import MovieApiService from './movieService';
import galleryCard from '../templates/gallery-card.hbs';

const { headerBtns, myLibraryRef, galleryRef, libraryBtns, modalRef } = refs;

const movieApiService = new MovieApiService();
const WATCHED_LIST = 'watched';
const QUEUE_LIST = 'queue';

// ===== LISTENTERS
myLibraryRef.addEventListener('click', onLibraryClick);
libraryBtns.addEventListener('click', onLibraryBtnsClick);
modalRef.addEventListener('click', onModalBtnsClick);

// ===== ON LIBRARY LINK CLICK
function onLibraryClick(e) {
  movieApiService.clearGallery();

  // ===== watched list
  movieApiService.updateLocalList(WATCHED_LIST);

  const grabbedData = movieApiService.getLocalStoredList(WATCHED_LIST);
  movieApiService.markupTempl(grabbedData, galleryRef, galleryCard);

  grabbedData.forEach(movie => {
    console.log(movie);
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
    return (genresRef.innerHTML = parsedGenres.splice(0, 3).join(', ') + ' ...');
  genresRef.innerHTML = parsedGenres.join(', ');
}

// ===== LIBRARY BUTTONS CLICK
function onLibraryBtnsClick(e) {
  movieApiService.clearGallery();
  if (e.target.dataset.value === 'watched') {
    movieApiService.updateLocalList(WATCHED_LIST);

    const grabbedData = movieApiService.getLocalStoredList('watched');
    movieApiService.markupTempl(grabbedData, galleryRef, galleryCard);
  }

  if (e.target.dataset.value === 'queue') {
    movieApiService.updateLocalList(QUEUE_LIST);

    const grabbedData = movieApiService.getLocalStoredList(QUEUE_LIST);
    movieApiService.markupTempl(grabbedData, galleryRef, galleryCard);
  }
}

// ===== ON MODAL BUTTONS CLICK
export function onModalBtnsClick(e) {
  const movieId = Number(e.target.dataset.id);
  const btn = e.target;

  // ===== close modal
  // if (btn.dataset.action === 'close-modal') {
  //   movieApiService.clearGallery();

  //   // ===== update gallery to trends
  //   return movieApiService.fetchTrendingMovies('day').then(res => {
  //     const queryResult = res.data.results;

  //     movieApiService.markupTempl(queryResult, galleryRef, galleryCard);

  //     // ====== edit date & genres
  //     queryResult.forEach(movie => {
  //       movieApiService.editDate(movie);

  //       movieApiService.editGenres(movie);
  //     });
  //   });
  // }

  // ===== add to the list
  if (btn.nodeName !== 'BUTTON') return;

  if (btn.dataset.action === 'add-to-watched') {
    // check for ability in list
    const isListExists = Boolean(localStorage.getItem(WATCHED_LIST));
    if (!isListExists) {
      movieApiService.createLocalList(WATCHED_LIST);
    }
    movieApiService.addToMovieList(movieId, WATCHED_LIST);
    // btn.textContent = 'remove from watched';
    // btn.dataset.action = 'remove-from-watched';

    markupGrabbedList(WATCHED_LIST);
  }

  // if (btn.dataset.action === 'add-to-queue') {
  //   movieApiService.checkForStorageDataExist(QUEUE_LIST);
  //   movieApiService.addToMovieList(movieId, QUEUE_LIST);
  //   btn.textContent = 'remove from queue';
  //   btn.dataset.action = 'remove-from-queue';

  //   markupGrabbedList(QUEUE_LIST);
  // }
  if (btn.dataset.action === 'remove-from-watched') {
    movieApiService.removefromMovieList(movieId, WATCHED_LIST);
    btn.textContent = 'add to watched';
    btn.dataset.action = 'add-to-watched';

    markupGrabbedList(WATCHED_LIST);
  }
  // if (btn.dataset.action === 'remove-from-queue') {
  //   movieApiService.removefromMovieList(movieId, QUEUE_LIST);
  //   btn.textContent = 'add to queue';
  //   btn.dataset.action = 'add-to-queue';

  //   markupGrabbedList(QUEUE_LIST);
  // }
}

function markupGrabbedList(listKey) {
  movieApiService.clearGallery();
  const grabbedData = movieApiService.getLocalStoredList(listKey);
  movieApiService.markupTempl(grabbedData, galleryRef, galleryCard);
}

// ============ fucntions for movie-by-id.js

export function editWatchedBtnText(boolean) {
  const watchedBtn = document.querySelector('[data-action="add-to-watched"]');
  if (!boolean) {
    watchedBtn.textContent = 'remove from watched';
    watchedBtn.dataset.action = 'remove-from-watched';
  }
}

export function editQueueBtnText(boolean) {
  const queueBtn = document.querySelector('[data-action="add-to-queue"]');
  if (!boolean) {
    queueBtn.textContent = 'remove from queue';
    queueBtn.dataset.action = 'remove-from-queue';
  }
}

export function addIsWatchedProp(data) {
  // if list is absent create empty list
  movieApiService.updateLocalList(WATCHED_LIST);

  const localList = movieApiService.getLocalStoredList('watched');
  const movieId = data.id;
  console.log(localList);
  const isIdExists = localList.some(movie => movieId === movie.id);
  if (isIdExists) {
    data.isWatched = false;
  } else {
    data.isWatched = true;
  }

  const isWatched = data.isWatched;
  return isWatched;
}

export function addIsQueueProp(data) {
  // if list is absent create empty list
  movieApiService.updateLocalList(QUEUE_LIST);

  const localList = movieApiService.getLocalStoredList('queue');
  const movieId = data.id;
  // console.log(localList);
  const isIdExists = localList.some(movie => movieId === movie.id);
  if (isIdExists) {
    data.isQueue = false;
  } else {
    data.isQueue = true;
  }

  const isQueue = data.isQueue;
  return isQueue;
}
