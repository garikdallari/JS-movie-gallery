import { addsActiveButton, removeActiveButton, onClickBtnDay } from './period-buttons';
import refs from './refs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../sass/pagination.scss';
import { renderLocalList } from './clients-lists';
import { onClickLib, addElementClass, removeElementClass } from './change-header';
import {removePeriodBtnActiveClass } from './set-languages';
import MovieApiService from './movieService';

import {
  paginContainer,
  paginOptions,
  fetchMovieByWord,
  fetchMovieByPeriod,
  fetchTopRatedMovie,
  fetchUpcomingMovies,
  onPeriodPagination,
  onTopRatedPagination,
  onUpcomingPagination,
  onByWordPagination,
  scrollUpOnPagination,
  hidePagination,
  getTotalItemsFromStorage,
} from './pagination';

const { btnDay, btnWeek, btnTop, btnUpcoming, watchedBtn, queueBtn, paginationBox } = refs;
const movieApiService = new MovieApiService();

document.addEventListener('DOMContentLoaded', renderPageAfterReload);

function createCurrentPageSettings() {
  const isStorageExists = localStorage.getItem('currentPageSettings');
  if (isStorageExists) return;
  else {
    saveCurrentPageToLocalStorage(1, 'day', null, 'fetchByPeriod', 20000);
    onClickBtnDay();
    return true;
  }
}

function renderPageAfterReload() {
  if (createCurrentPageSettings()) return;

  const pageSettings = getCurrentPageFromLocalStorage();
  renderSavedPage(pageSettings);
}

function renderSavedPage(objOfSettings) {
  let { currentPage, period, query, fetchQuery } = objOfSettings;

  switch (fetchQuery) {
    case 'watched':
      onClickLib();
      hidePagination();
      movieApiService.getCurrentClientLang();
      movieApiService.updateLocalList('watched');
      renderLocalList('watched');
      removePeriodBtnActiveClass();
      break;

    case 'queue':
      onClickLib();
      hidePagination();
      addElementClass(queueBtn, 'header-menu-btn__item--active');
      removeElementClass(watchedBtn, 'header-menu-btn__item--active');
      movieApiService.getCurrentClientLang();
      movieApiService.updateLocalList('queue');
      renderLocalList('queue');
      removePeriodBtnActiveClass();
      break;
  }

  const pagination = createPagination(objOfSettings);

  switch (fetchQuery) {
    case 'fetchByPeriod':
      fetchMovieByPeriod(period, currentPage);
      switchPeriod(period, pagination);
      scrollUpOnPagination();
      break;

    case 'fetchTopRated':
      fetchTopRatedMovie(currentPage);
      addsActiveButton(btnTop);
      // pagination = createPagination(objOfSettings);
      onTopRatedPagination(pagination);
      scrollUpOnPagination();
      break;

    case 'fetchUpcoming':
      fetchUpcomingMovies(currentPage);
      addsActiveButton(btnUpcoming);
      // pagination = createPagination(objOfSettings);
      onUpcomingPagination(pagination);
      scrollUpOnPagination();
      break;

    case 'fetchByWord':
      fetchMovieByWord(currentPage, query);
      removeActiveButton(btnDay);
      // pagination = createPagination(objOfSettings);
      onByWordPagination(pagination, query);
      scrollUpOnPagination();
      break;
  }

  function switchPeriod(period, pagination) {
    switch (period) {
      case 'day':
        addsActiveButton(btnDay);
        onPeriodPagination(pagination, 'day');
        break;
      case 'week':
        addsActiveButton(btnWeek);
        onPeriodPagination(pagination, 'week');
        break;
    }
  }
}

function saveCurrentPageToLocalStorage(currentPage, period, query, fetchQuery, totalItems) {
  const savedSettings = { currentPage, period, query, fetchQuery, totalItems };
  localStorage.setItem('currentPageSettings', JSON.stringify(savedSettings));
}

function getCurrentPageFromLocalStorage() {
  const savedSettings = localStorage.getItem('currentPageSettings');
  return JSON.parse(savedSettings);
}

function createPagination(objOfSettings) {
  let { currentPage, totalItems } = objOfSettings;
  totalItems = getTotalItemsFromStorage();
  const pagination = new Pagination(paginContainer, {
    ...paginOptions,
    page: currentPage,
    totalItems,
  });
  return pagination;
}

export { saveCurrentPageToLocalStorage };
