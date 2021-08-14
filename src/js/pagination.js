import refs from './refs';
import MovieApiService from './movieService';
import galleryCard from '../templates/gallery-card.hbs';
// import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
// import '../sass/pagination.scss';

const { galleryRef } = refs;
const movieApiService = new MovieApiService();

const paginOptions = {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 0,
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

function onPagination(pagination, query) {
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    movieApiService.clearGallery();
    fetchMovieByPage(currentPage, query);
  });
}

function onPeriodPagination(pagination, period) {
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    movieApiService.clearGallery();
    fetchMovieByPeriod(period, currentPage);
  });
}

function fetchMovieByPage(page, query) {
  movieApiService.searchQuery = query;
  movieApiService
    .searchMovieByWord(page)
    .then(res => {
      return res.data.results;
    })
    .then(movies => {
      if (movies.length === 0) {
        console.log('no movies found');
        // messageFailure.style.display = 'block';
      } else {
        movieApiService.markupTempl(movies, galleryRef, galleryCard);
        movies.forEach(movie => {
          movieApiService.editDate(movie);
          movieApiService.editGenres(movie);
        });
      }
    });
}

function fetchMovieByPeriod(period, page) {
  //   movieApiService.searchQuery = query;
  movieApiService
    .fetchTrendingMovies(period, page)
    .then(res => {
      return res.data.results;
    })
    .then(movies => {
      if (movies.length === 0) {
        console.log('no movies found');
        // messageFailure.style.display = 'block';
      } else {
        movieApiService.markupTempl(movies, galleryRef, galleryCard);
        movies.forEach(movie => {
          movieApiService.editDate(movie);
          movieApiService.editGenres(movie);
        });
      }
    });
}

export { paginContainer, paginOptions, onPagination, onPeriodPagination };
