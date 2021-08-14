import MovieApiService from './movieService';
import galleryCard from '../templates/gallery-card.hbs';
import refs from './refs';
import { addsActiveButton } from './period-buttons';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../sass/pagination.scss';
import { paginContainer, paginOptions, onPeriodPagination } from './pagination';

import { loader } from './loaders';
const { galleryRef, homeRef, btnDay } = refs;

const movieApiService = new MovieApiService();
loader.on();
let queryResult = null;

homeRef.addEventListener('click', onHomeClick);

movieApiService
  .fetchTrendingMovies('day')
  .then(res => {
    queryResult = res.data.results;
    movieApiService.markupTempl(queryResult, galleryRef, galleryCard);

    // ====== edit date & genres
    queryResult.forEach(movie => {
      movieApiService.editDate(movie);
      movieApiService.editGenres(movie);
    });

    initialisePagination();
  })
  .finally(() => loader.off());

function initialisePagination() {
  if (queryResult.length > 20) return;
  // ===== INITIALISE PAGINATION
  const pagination = new Pagination(paginContainer, paginOptions);
  // ===== GET NEXT PAGES
  onPeriodPagination(pagination, 'day');
}

// ===== ON HOME LINK CLICK
function onHomeClick(e) {
  movieApiService.clearGallery();
  addsActiveButton(btnDay);
  movieApiService.fetchTrendingMovies('day').then(res => {
    const queryResult = res.data.results;

    movieApiService.markupTempl(queryResult, galleryRef, galleryCard);

    // ====== edit date & genres
    queryResult.forEach(movie => {
      movieApiService.editDate(movie);
      movieApiService.editGenres(movie);
    });
  });
}
