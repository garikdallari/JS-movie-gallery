import MovieApiService from './movieService';
import galleryCard from '../templates/gallery-card.hbs';
import refs from './refs';
import {loader} from './loaders';
const { galleryRef} = refs;

const movieApiService = new MovieApiService();

loader.on();
movieApiService.fetchTrendingMovies('day').then(res => {
 
  const queryResult = res.data.results;

  movieApiService.markupTempl(queryResult, galleryRef, galleryCard);

  // ====== edit date & genres
  queryResult.forEach(movie => {
    movieApiService.editDate(movie);

    movieApiService.editGenres(movie);
  });
})
.finally(() => loader.off());
