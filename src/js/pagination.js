import refs from './refs';
import MovieApiService from './movieService';
import galleryCard from '../templates/gallery-card.hbs';
// import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
// import '../sass/pagination.scss';
import { loader } from './loaders';
// import { addsActiveButton } from './period-buttons';
import { saveCurrentPageToLocalStorage } from './reload-page';

const { galleryRef, messageFailure, btnDay, btnWeek, btnTop, btnUpcoming } = refs;
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

// function activatePagination(pagination, period, query, fetchQuery) {
//   pagination.on('afterMove', event => {
//     const currentPage = event.page;
//     movieApiService.clearGallery();
//     if (query !== null) return fetchQuery(currentPage, query);
//     if (period !== null) return fetchQuery(period, currentPage);
//     fetchQuery(currentPage);
//   });
// }

function onPeriodPagination(pagination, period) {
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    movieApiService.clearGallery();
    fetchMovieByPeriod(period, currentPage);
  });
}

function onTopRatedPagination(pagination) {
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    movieApiService.clearGallery();
    fetchTopRatedMovie(currentPage);
  });
}

function onUpcomingPagination(pagination) {
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    movieApiService.clearGallery();
    fetchUpcomingMovies(currentPage);
  });
}

function onByWordPagination(pagination, query) {
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    movieApiService.clearGallery();
    fetchMovieByWord(currentPage, query);
  });
}

function fetchMovieByWord(page, query) {
  movieApiService.searchQuery = query;
  movieApiService
    .searchMovieByWord(page)
    .then(res => {
      return res.data.results;
    })
    .then(movies => {
      if (movies.length === 0) {
        messageFailure.style.display = 'block';
      } else {
        movieApiService.markupTempl(movies, galleryRef, galleryCard);
        editDatesAndGenres(movies);
      }
    })
    .then(res => {
      saveCurrentPageToLocalStorage(page, null, query, 'fetchByWord');
    })
    .finally(() => loader.off());
}

function fetchMovieByPeriod(period, page) {
  movieApiService
    .fetchTrendingMovies(period, page)
    .then(res => {
      return res.data.results;
    })
    .then(movies => {
      if (movies.length === 0) {
        messageFailure.style.display = 'block';
      } else {
        movieApiService.markupTempl(movies, galleryRef, galleryCard);
        editDatesAndGenres(movies);
      }
    })
    .then(res => {
      saveCurrentPageToLocalStorage(page, period, null, 'fetchByPeriod');
    })
    .finally(() => loader.off());
}

function fetchTopRatedMovie(page) {
  movieApiService
    .fetchTopRatedMovies(page)
    .then(res => res.data.results)
    .then(movies => {
      if (movies.length === 0) {
        messageFailure.style.display = 'block';
      } else {
        movieApiService.markupTempl(movies, galleryRef, galleryCard);
        editDatesAndGenres(movies);
      }
    })
    .then(res => {
      saveCurrentPageToLocalStorage(page, null, null, 'fetchTopRated');
    })
    .finally(() => loader.off());
}

function fetchUpcomingMovies(page) {
  movieApiService
    .fetchUpcomingMovies(page)
    .then(res => res.data.results)
    .then(movies => {
      if (movies.length === 0) {
        messageFailure.style.display = 'block';
      } else {
        movieApiService.markupTempl(movies, galleryRef, galleryCard);
        editDatesAndGenres(movies);
      }
    })
    .then(res => {
      saveCurrentPageToLocalStorage(page, null, null, 'fetchUpcoming');
    })
    .finally(() => loader.off());
}

function getTotalItemsFromStorage() {
  const result = localStorage.getItem('totalItems');
  return JSON.parse(result);
}

function editDatesAndGenres(movies) {
  movies.forEach(movie => {
    movieApiService.editDate(movie);
    movieApiService.editGenres(movie);
  });
}

export {
  paginContainer,
  paginOptions,
  //  activatePagination,
  fetchMovieByWord,
  fetchMovieByPeriod,
  fetchTopRatedMovie,
  fetchUpcomingMovies,
  getTotalItemsFromStorage,
  onPeriodPagination,
  onTopRatedPagination,
  onUpcomingPagination,
  onByWordPagination,
};
