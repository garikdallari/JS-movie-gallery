import MovieApiService from './movieService';
import galleryCard from '../templates/gallery-card.hbs';
import refs from './refs';

const { galleryRef } = refs;

const movieApiService = new MovieApiService();

movieApiService.fetchTrendingMovies('day').then(res => {
  const queryResult = res.data.results;

  movieApiService.markupTempl(queryResult, galleryRef, galleryCard);

  // ====== edit date & genres
  queryResult.forEach(movie => {
    movieApiService.editDate(movie);

    movieApiService.editGenres(movie);
  });
});
