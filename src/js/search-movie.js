import MovieApiService from './movieService';
import refs from './refs';
import galleryCard from '../templates/gallery-card.hbs';
const { searchFormRef, searchInputRef, galleryRef, messageFailure } = refs;
import { loader } from './loaders';

const SearchMovie = new MovieApiService();

function getMovie() {
  messageFailure.style.display = 'none';
  SearchMovie.searchQuery = searchInputRef.value.trim();

  if (SearchMovie.searchQuery === '') {
    loader.off();
    return;
  } else {
    SearchMovie.clearGallery();
    SearchMovie.searchMovieByWord()
      .then(movies => {
        if (movies.length === 0) {
          messageFailure.style.display = 'block';
        } else renderMovie(movies);
      })
      .finally(() => loader.off());
  }
}

function renderMovie(movies) {
  SearchMovie.markupTempl(movies, galleryRef, galleryCard);
  movies.forEach(movie => {
    SearchMovie.editDate(movie);
    SearchMovie.editGenres(movie);
  });
}

searchFormRef.addEventListener('submit', event => {
  event.preventDefault();
  loader.on();
  getMovie();
});
