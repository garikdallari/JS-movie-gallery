import { addsActiveButton, removeActiveButton } from './period-buttons';
import refs from './refs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../sass/pagination.scss';
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
} from './pagination';

const { btnDay, btnWeek, btnTop, btnUpcoming } = refs;

createCurrentPageSettings();
document.addEventListener('DOMContentLoaded', renderPageAfterReload);

function createCurrentPageSettings() {
  const isStorageExists = localStorage.getItem('currentPageSettings');
  if (!isStorageExists) saveCurrentPageToLocalStorage(1, 'day', null, 'fetchByPeriod');
}

function renderPageAfterReload() {
  const pageSettings = getCurrentPageFromLocalStorage();
  renderSavedPage(pageSettings);
}

function renderSavedPage(objOfSettings) {
  let { currentPage, period, query, fetchQuery } = objOfSettings;
  const pagination = new Pagination(paginContainer, { ...paginOptions, page: currentPage });

  switch (fetchQuery) {
    case 'fetchByPeriod':
      fetchMovieByPeriod(period, currentPage);
      switchPeriod(period);
      break;

    case 'fetchTopRated':
      fetchTopRatedMovie(currentPage);
      addsActiveButton(btnTop);
      onTopRatedPagination(pagination);
      break;

    case 'fetchUpcoming':
      fetchUpcomingMovies(currentPage);
      addsActiveButton(btnUpcoming);
      onUpcomingPagination(pagination);
      break;

    case 'fetchByWord':
      fetchMovieByWord(currentPage, query);
      removeActiveButton(btnDay);
      onByWordPagination(pagination, query);
      break;
  }

  function switchPeriod(period) {
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

function saveCurrentPageToLocalStorage(currentPage, period, query, fetchQuery) {
  const savedSettings = { currentPage, period, query, fetchQuery };
  localStorage.setItem('currentPageSettings', JSON.stringify(savedSettings));
}

function getCurrentPageFromLocalStorage() {
  const savedSettings = localStorage.getItem('currentPageSettings');
  return JSON.parse(savedSettings);
}

export { saveCurrentPageToLocalStorage };
