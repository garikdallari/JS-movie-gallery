import MovieApiService from './movieService';
import refs from './refs';
import galleryCard from '../templates/gallery-card.hbs';
import { loader } from './loaders';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../sass/pagination.scss';
import { paginContainer, paginOptions, onPagination } from './pagination';

const { searchFormRef, searchInputRef, galleryRef, messageFailure } = refs;
const movieApiService = new MovieApiService();

searchFormRef.addEventListener('submit', event => {
  event.preventDefault();
  loader.on();

  // ===== INITIALISE PAGINATION
  const pagination = new Pagination(paginContainer, paginOptions);
  // const page = pagination.getCurrentPage();
  movieApiService.searchQuery = searchInputRef.value.trim();
  const searchQuery = movieApiService.searchQuery;
  // movieApiService.clearGallery();

  // ====== GET FIRST REQUESTED PAGE
  getMovie();

  // ===== GET NEXT PAGES
  onPagination(pagination, searchQuery);
});

function getMovie() {
  messageFailure.style.display = 'none';
  movieApiService.searchQuery = searchInputRef.value.trim();

  if (movieApiService.searchQuery === '') {
    loader.off();
    return;
  } else {
    movieApiService.clearGallery();
    movieApiService
      .searchMovieByWord()
      .then(res => {
        return res.data.results;
      })
      .then(movies => {
        if (movies.length === 0) {
          messageFailure.style.display = 'block';
        } else {
          renderMovie(movies);
        }
      })
      .finally(() => loader.off());
  }
}

function renderMovie(movies) {
  movieApiService.markupTempl(movies, galleryRef, galleryCard);
  movies.forEach(movie => {
    movieApiService.editDate(movie);
    movieApiService.editGenres(movie);
  });
}

// const movieApiService = new MovieApiService();
// const options = {
//   totalItems: 20000,
//   itemsPerPage: 20,
//   visiblePages: 5,
//   page: 0,
//   centerAlign: true,
//   firstItemClassName: 'tui-first-child',
//   lastItemClassName: 'tui-last-child',
//   template: {
//     page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//     currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//     moveButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</a>',
//     disabledMoveButton:
//       '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</span>',
//     moreButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//       '<span class="tui-ico-ellip">...</span>' +
//       '</a>',
//   },
// };

// const container = document.getElementById('tui-pagination-container');
// const pagination = new Pagination(container, options);
// const page = pagination.getCurrentPage();

// movieApiService.fetchDate(page).then(response => {
//     pagination.reset(response.total_pages);
//      renderMoveGallery(response.results);
//  });

// function renderMoveGallery(data) {
//   galleryRef.insertAdjacentHTML('beforeend', galleryCard(data));
// }
