import MovieApiService from './movieService';
import galleryCard from '../templates/gallery-card.hbs';
import refs from './refs';
import { addsActiveButton } from './period-buttons';
import { saveCurrentPageToLocalStorage } from './reload-page';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../sass/pagination.scss';
import {
  paginContainer,
  paginOptions,
  onPeriodPagination,
  // activatePagination,
  // fetchMovieByPeriod,
  // getCurrentPageFromLocalStorage,
  // renderSavedPage,
  // renderPageAfterReload,
} from './pagination';

import { loader } from './loaders';
const { galleryRef, homeRef, btnDay, logoLink } = refs;

const movieApiService = new MovieApiService();
loader.on();
let queryResult = null;

homeRef.addEventListener('click', onHomeLink);

logoLink.addEventListener('click', onHomeLink);


function onHomeLink() {

  movieApiService.getCurrentClientLang();
  addsActiveButton(btnDay)
  movieApiService.clearGallery()


  movieApiService
    .fetchTrendingMovies('day')
    .then(res => {
      queryResult = res.data.results;
      movieApiService.markupTempl(queryResult, galleryRef, galleryCard);

      saveCurrentPageToLocalStorage(1, 'day', null, 'fetchByPeriod', 20000);
      localStorage.setItem('totalItems', JSON.stringify(20000));


      // ====== edit date & genres
      queryResult.forEach(movie => {
        movieApiService.editDate(movie);
        movieApiService.editGenres(movie);
      });

      // ===== INITIALISE PAGINATION
      const pagination = new Pagination(paginContainer, paginOptions);
      // ===== GET NEXT PAGES
      onPeriodPagination(pagination, 'day');
      // activatePagination(pagination, 'day', null, fetchMovieByPeriod);
    })
    .finally(() => loader.off());
}
