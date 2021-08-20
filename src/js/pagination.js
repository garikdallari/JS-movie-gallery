import refs from './refs';
import MovieApiService from './movieService';
import galleryCard from '../templates/gallery-card.hbs';
// import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
// import '../sass/pagination.scss';
import { loader } from './loaders';
import { saveCurrentPageToLocalStorage } from './reload-page';

const { galleryRef, messageFailure, logoLink, paginationBox } = refs;
const movieApiService = new MovieApiService();

const paginOptions = {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const paginContainer = document.getElementById('tui-pagination-container');

function scrollUpOnPagination() {
  paginContainer.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('tui-pagination')) return;
    logoLink.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
}

function onPeriodPagination(pagination, period) {
  pagination.on('afterMove', event => {
    movieApiService.getCurrentClientLang();
    scrollUpOnPagination();
    const currentPage = event.page;
    movieApiService.clearGallery();
    fetchMovieByPeriod(period, currentPage);
  });
}

function onTopRatedPagination(pagination) {
  movieApiService.getCurrentClientLang();
  pagination.on('afterMove', event => {
    scrollUpOnPagination();
    const currentPage = event.page;
    movieApiService.clearGallery();
    fetchTopRatedMovie(currentPage);
  });
}

function onUpcomingPagination(pagination) {
  movieApiService.getCurrentClientLang();
  pagination.on('afterMove', event => {
    scrollUpOnPagination();
    const currentPage = event.page;
    movieApiService.clearGallery();
    fetchUpcomingMovies(currentPage);
  });
}

function onByWordPagination(pagination, query) {
  movieApiService.getCurrentClientLang();
  pagination.on('afterMove', event => {
    scrollUpOnPagination();
    const currentPage = event.page;
    movieApiService.clearGallery();
    fetchMovieByWord(currentPage, query);
  });
}

function fetchMovieByWord(page, query) {
  movieApiService.getCurrentClientLang();
  movieApiService.searchQuery = query;
  movieApiService
    .searchMovieByWord(page)
    .then(res => {
      return res.data.results;
    })
    .then(movies => {
      if (movies.length === 0) {
        messageFailure.style.display = 'block';
        document.querySelector('.tui-pagination').style.display = 'none';
      } else {
        movieApiService.markupTempl(movies, galleryRef, galleryCard);
        editDatesAndGenres(movies);
        document.querySelector('.tui-pagination').style.display='block';
      }
    })
    .then(res => {
      saveCurrentPageToLocalStorage(page, null, query, 'fetchByWord');
    })
    .finally(() => loader.off());
}

function fetchMovieByPeriod(period, page) {
  movieApiService.getCurrentClientLang();
  movieApiService
    .fetchTrendingMovies(period, page)
    .then(res => {
      const movies = res.data.results;
      if (movies.length === 0) {
        messageFailure.style.display = 'block';
      } else {
        movieApiService.markupTempl(movies, galleryRef, galleryCard);
        editDatesAndGenres(movies);
      }
      return res;
    })
    .then(res => {
      const totalItems = res.data.total_results;
      saveCurrentPageToLocalStorage(page, period, null, 'fetchByPeriod', totalItems);
    })
    .finally(() => loader.off());
}

function fetchTopRatedMovie(page) {
  movieApiService.getCurrentClientLang();
  movieApiService
    .fetchTopRatedMovies(page)
    .then(res => {
      const movies = res.data.results;
      if (movies.length === 0) {
        messageFailure.style.display = 'block';
      } else {
        movieApiService.markupTempl(movies, galleryRef, galleryCard);
        editDatesAndGenres(movies);
      }
      return res;
    })
    .then(res => {
      const totalItems = res.data.total_results;
      saveCurrentPageToLocalStorage(page, null, null, 'fetchTopRated', totalItems);
    })
    .finally(() => loader.off());
}

function fetchUpcomingMovies(page) {
  movieApiService.getCurrentClientLang();
  movieApiService
    .fetchUpcomingMovies(page)
    .then(res => {
      const movies = res.data.results;
      if (movies.length === 0) {
        messageFailure.style.display = 'block';
      } else {
        movieApiService.markupTempl(movies, galleryRef, galleryCard);
        editDatesAndGenres(movies);
      }
      return res;
    })
    .then(res => {
      const totalItems = res.data.total_results;
      saveCurrentPageToLocalStorage(page, null, null, 'fetchUpcoming', totalItems);
    })
    .finally(() => loader.off());
}

function getTotalItemsFromStorage() {
  const result = localStorage.getItem('totalItems');
  return JSON.parse(result);
}

function editDatesAndGenres(movies) {
  movieApiService.getCurrentClientLang();
  movies.forEach(movie => {
    movieApiService.editDate(movie);
    movieApiService.editGenres(movie);
  });
}

function hidePagination() {
  paginationBox.style.display = 'none';
}

export {
  paginContainer,
  paginOptions,
  fetchMovieByWord,
  fetchMovieByPeriod,
  fetchTopRatedMovie,
  fetchUpcomingMovies,
  getTotalItemsFromStorage,
  onPeriodPagination,
  onTopRatedPagination,
  onUpcomingPagination,
  onByWordPagination,
  scrollUpOnPagination,
  hidePagination,
};
