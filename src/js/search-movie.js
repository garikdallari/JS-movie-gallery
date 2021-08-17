import MovieApiService from './movieService';
import refs from './refs';
import galleryCard from '../templates/gallery-card.hbs';
import { loader } from './loaders';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../sass/pagination.scss';
import {
  paginContainer,
  paginOptions,
  // activatePagination,
  onByWordPagination,
  fetchMovieByWord,
  getTotalItemsFromStorage,
} from './pagination';

const { searchFormRef, searchInputRef, galleryRef, messageFailure } = refs;
const movieApiService = new MovieApiService();

searchFormRef.addEventListener('submit', event => {
  event.preventDefault();
  loader.on();
  getMovie();
});

function getMovie() {
  messageFailure.style.display = 'none';
  movieApiService.searchQuery = searchInputRef.value.trim();

  if (movieApiService.searchQuery === '') {
    messageFailure.style.display = 'none';
    loader.off();
    return;
  } else {
    movieApiService.clearGallery();
    movieApiService
      .searchMovieByWord()
      .then(res => {
        localStorage.setItem('totalItems', JSON.stringify(res.data.total_results));
        return res.data.results;
      })
      .then(movies => {
        const totalItems = getTotalItemsFromStorage();
        return { movies, totalItems };
      })
      .then(({ movies, totalItems }) => {
        const pagination = new Pagination(paginContainer, { ...paginOptions, totalItems });
        movieApiService.searchQuery = searchInputRef.value.trim();
        const searchQuery = movieApiService.searchQuery;
        // activatePagination(pagination, null, searchQuery, fetchMovieByWord);
        onByWordPagination(pagination, searchQuery);

        return movies;
      })
      .then(movies => {
        if (movies.length === 0) {
          messageFailure.style.display = 'block';
          document.querySelector('.tui-pagination').style.display='none';
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
