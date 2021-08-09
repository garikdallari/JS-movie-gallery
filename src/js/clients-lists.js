import refs from './refs';
import MovieApiService from './movieService';
import galleryCard from '../templates/gallery-card.hbs';

const { headerBtns, myLibraryRef, galleryRef, libraryBtns } = refs;

const movieApiService = new MovieApiService();
const WATCHED_LIST = 'watched';
const QUEUE_LIST = 'queue';

myLibraryRef.addEventListener('click', onLibraryClick);
libraryBtns.addEventListener('click', onLibraryBtnsClick);

// ===== ON LIBRARY LINK CLICK
function onLibraryClick(e) {
  movieApiService.clearGallery();

  // ===== watched list
  movieApiService.updateLocalList(WATCHED_LIST);

  const grabbedData = movieApiService.getLocalStoredList(WATCHED_LIST);
  movieApiService.markupTempl(grabbedData, galleryRef, galleryCard);

  grabbedData.forEach(movie => {
    movieApiService.editDate(movie);
    // movieApiService.editGenres(movie);
    editMovieGenres(movie);
  });
}

function editMovieGenres(obj) {
  const genresRef = document.querySelector(`[data-genre-id="${obj.id}"]`);
  // console.log(obj.id);
  let parsedGenres = [];
  obj.genres.forEach(genre => {
    parsedGenres.push(genre.name);
  });

  if (parsedGenres.length > 2)
    return (genresRef.innerHTML = parsedGenres.splice(0, 3).join(', ') + ' ...');
  genresRef.innerHTML = parsedGenres.join(', ');
}
// ===== ADD MOVIE TO THE LIST
function addMovieToList(movieId, listKey) {
  movieApiService.id = movieId;

  // ===== check aviability this id in local storage
  const localList = movieApiService.getLocalStoredList(listKey);
  const isIdExists = localList.find(movie => movie.id === movieId);
  if (isIdExists !== undefined) return;

  movieApiService.getMovieInfo().then(res => {
    if (listKey === WATCHED_LIST) {
      res.data.isWatched = true;
    }
    if (listKey === QUEUE_LIST) {
      res.data.isQueue = true;
    }

    movieApiService.updateLocalList(listKey, res.data);
  });
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

// ===== CREATE LOCAL_STORAGE LIST
// function createLocalList(listKey) {
//   const storedList = JSON.stringify([]);
//   localStorage.setItem(listKey, storedList);
// }

// ===== UPDATE LOCAL_STORAGE LIST
// function updateLocalList(listKey, data) {
//   const isListExists = localStorage.getItem(listKey);
//   if (!isListExists) {
//     createLocalList(listKey);
//   }
//   if (data === undefined) return;
//   const storedList = getLocalStoredList(listKey);
//   storedList.push(data);
//   const updatedList = JSON.stringify(storedList);

//   localStorage.setItem(listKey, updatedList);
// }

// ===== GET LOCAL_STORAGE LIST
// function getLocalStoredList(listKey) {
//   const stringifyList = localStorage.getItem(listKey);
//   return JSON.parse(stringifyList);
// }
