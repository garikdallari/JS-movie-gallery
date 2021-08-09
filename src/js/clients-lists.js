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
function onModalBtnsClick(e) {
  const movieId = e.target.dataset.id;
  const btn = e.target;
  const btnAction = btn.dataset.action;
  const btnText = btn.textContent;

  // ===== close modal
  if (btnAction === 'close-modal') {
    movieApiService.clearGallery();

    return;
  }

  // ===== add to the list
  if (btn.nodeName !== 'BUTTON') return;

  if (btnAction === 'add-to-watched') {
    movieApiService.addToMovieList(movieId, WATCHED_LIST);
    btnText = 'remove from watched';
    btnAction = 'remove-from-watched';
  }
  if (btnAction === 'add-to-queue') {
    movieApiService.addToMovieList(movieId, QUEUE_LIST);
    btnText = 'remove from queue';
    btnAction = 'remove-from-queue';
  }
  if (btnAction === 'remove-from-watched') {
    movieApiService.removefromMovieList(movieId, WATCHED_LIST);
    btnText = 'add to watched';
    btnAction = 'add-to-watched';
  }
  if (btnAction === 'remove-from-queue') {
    movieApiService.removefromMovieList(movieId, QUEUE_LIST);
    btnText = 'add to queue';
    btnAction = 'add-to-queue';
  }
}
