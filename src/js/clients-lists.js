import refs from './refs';
import MovieApiService from './movieService';
import galleryCard from '../templates/gallery-card.hbs';
import { saveCurrentPageToLocalStorage } from './reload-page';
import {
  setCurrentModalLang,
  setCurrentModalRemoveLang,
  removePeriodBtnActiveClass,
  setCurrentLibCardLang,
} from './set-languages';
import { loader } from './loaders';
import { hidePagination } from './pagination';
const {
  searchInputRef,
  messageFailure,
  myLibraryRef,
  galleryRef,
  libraryBtns,
  modalRef,
  homeRef,
  paginationBox,
} = refs;

const movieApiService = new MovieApiService();
const WATCHED_LIST = 'watched';
const QUEUE_LIST = 'queue';
let pageForExport = null;
let currentLang = null;

// ===== LISTENTERS
myLibraryRef.addEventListener('click', onLibraryClick);
homeRef.addEventListener('click', onHomeRefClick);
libraryBtns.addEventListener('click', onLibraryBtnsClick);
modalRef.addEventListener('click', onModalBtnsClick);

// ===== CREATE EMPTY LISTS
createEmptyLists();

// ===== FUNCTIONS'S DECLARATIONS
function createEmptyLists() {
  if (localStorage.getItem(WATCHED_LIST) === null) movieApiService.createLocalList(WATCHED_LIST);
  if (localStorage.getItem(QUEUE_LIST) === null) movieApiService.createLocalList(QUEUE_LIST);
}

function onHomeRefClick() {
  pageForExport = null;
}

// ===== ON LIBRARY LINK CLICK
function onLibraryClick(e) {
  hidePagination();
  messageFailure.style.display = 'none';
  searchInputRef.value = '';
  movieApiService.clearGallery();
  removePeriodBtnActiveClass();
  pageForExport = WATCHED_LIST;
  saveCurrentPageToLocalStorage(null, null, null, WATCHED_LIST);

  // ===== get watched list & render it
  setCurrentLibCardLang(WATCHED_LIST);
  setCurrentLibCardLang(QUEUE_LIST);
  renderLocalList(WATCHED_LIST);
}

// ===== LIBRARY BUTTONS CLICK
function onLibraryBtnsClick(e) {
  const btn = e.target;
  if (btn.nodeName !== 'BUTTON') return;
  movieApiService.clearGallery();
  movieApiService.getCurrentClientLang();

  setCurrentLibCardLang(WATCHED_LIST);
  setCurrentLibCardLang(QUEUE_LIST);

  renderPageByLibBtnClick(btn, WATCHED_LIST);
  renderPageByLibBtnClick(btn, QUEUE_LIST);
}

function renderPageByLibBtnClick(btnRef, listKey) {
  movieApiService.getCurrentClientLang();
  if (btnRef.dataset.value !== listKey) return;
  pageForExport = listKey;
  movieApiService.updateLocalList(listKey);
  renderLocalList(listKey);
  saveCurrentPageToLocalStorage(null, null, null, listKey);
}

function renderLocalList(listKey) {
  const grabbedData = updateCurrentPage(listKey);
  editDateAndGenres(grabbedData);
  loader.off();
}

// ===== ON MODAL BUTTONS CLICK
function onModalBtnsClick(e) {
  const movieId = Number(e.target.dataset.id);
  const btn = e.target;

  // ===== add/remove from the list
  if (btn.nodeName !== 'BUTTON') return;

  switchBtnTextByCkicking(btn, movieId, WATCHED_LIST);
  switchBtnTextByCkicking(btn, movieId, QUEUE_LIST);
}

function switchBtnTextByCkicking(btnRef, movieId, listKey) {
  if (btnRef.dataset.action === `remove-from-${listKey}`) {
    setCurrentModalLang(listKey);
    btnRef.dataset.action = `add-to-${listKey}`;
    movieApiService.removefromMovieList(movieId, listKey);
  } else if (btnRef.dataset.action === `add-to-${listKey}`) {
    setCurrentModalRemoveLang(listKey);
    btnRef.dataset.action = `remove-from-${listKey}`;
    movieApiService.addToMovieList(movieId, listKey);
  }
}

function updateCurrentPage(listKey) {
  movieApiService.getCurrentClientLang();
  const grabbedData = movieApiService.getLocalStoredList(listKey);
  movieApiService.markupTempl(grabbedData, galleryRef, galleryCard);
  return grabbedData;
}

function editDateAndGenres(array) {
  movieApiService.getCurrentClientLang();
  array.forEach(movie => {
    movieApiService.editDate(movie);
    editMovieGenres(movie);
  });
}

function editMovieGenres(obj) {
  movieApiService.getCurrentClientLang();
  const genresRef = document.querySelector(`[data-genre-id="${obj.id}"]`);
  let parsedGenres = [];
  obj.genres.forEach(genre => {
    parsedGenres.push(genre.name);
  });

  if (parsedGenres.length > 2)
    return (genresRef.innerHTML = parsedGenres.splice(0, 3).join(', ') + '&nbsp;');
  genresRef.innerHTML = parsedGenres.join(', ');
}

function markupGrabbedList(listKey) {
  if (listKey === null) return;
  movieApiService.clearGallery();
  movieApiService.getCurrentClientLang();
  const grabbedData = updateCurrentPage(listKey);
  editDateAndGenres(grabbedData);
}

// ============ fucntions for movie-by-id.js

function toggleBtnText(isInList, listKey) {
  const targetBtn = document.querySelector(`.${listKey}`);
  if (isInList) {
    setCurrentModalRemoveLang(listKey);
    targetBtn.dataset.action = `remove-from-${listKey}`;
  } else {
    setCurrentModalLang(listKey);
    targetBtn.dataset.action = `add-to-${listKey}`;
  }
}

// ===== add watched or queue property
function addProp(data, listKey) {
  movieApiService.getCurrentClientLang();
  const localList = movieApiService.getLocalStoredList(listKey);
  const movieId = data.id;
  const isIdExists = localList.some(movie => movieId === movie.id);
  return isIdExists ? (data[`${listKey}`] = true) : (data[`${listKey}`] = false);
}

export {
  WATCHED_LIST,
  QUEUE_LIST,
  pageForExport,
  markupGrabbedList,
  addProp,
  toggleBtnText,
  editDateAndGenres,
  onLibraryBtnsClick,
  renderPageByLibBtnClick,
  updateCurrentPage,
  renderLocalList,
  onLibraryClick,
};
