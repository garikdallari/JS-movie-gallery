import MovieApiService from './movieService';
import galleryCard from '../templates/gallery-card.hbs';
import refs from './refs';

import {loader} from './loader';
const { galleryRef, homeRef } = refs;

homeRef.addEventListener('click', onHomeClick);

const movieApiService = new MovieApiService();



movieApiService.fetchTrendingMovies('day').then(res => {
 
  const queryResult = res.data.results;

  movieApiService.markupTempl(queryResult, galleryRef, galleryCard);

  // ====== edit date & genres
  queryResult.forEach(movie => {
    movieApiService.editDate(movie);

    movieApiService.editGenres(movie);
  }).finally(() => loader.off());



// ===== ON HOME LINK CLICK
function onHomeClick(e) {
  movieApiService.clearGallery();

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

