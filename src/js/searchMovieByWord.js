import MovieApiService from './movieService';
import refs from './refs';
import galleryCard from '../templates/gallery-card.hbs';
const { searchFormRef, searchFormInputRef, galleryRef, messageFailure } = refs;

let loader = document.querySelector('.loader');

const SearchMovieApiService = new MovieApiService();

function searchMovie() {
  messageFailure.style.display = 'none';
  SearchMovieApiService.searchQuery = searchFormInputRef.value.trim();
  const searchWord = SearchMovieApiService.searchQuery;

  if (searchWord === '') {
    loader.style.display = 'none';
    return;
  } else {
    SearchMovieApiService.searchMovieByWord(searchWord)
      .then(movies => {
        if (movies.length === 0) {
          messageFailure.style.display = 'block';
        } else SearchMovieApiService.markupTempl(movies, galleryRef, galleryCard);

        movies.forEach(movie => {
          // if (movie.poster_path === null) {
          //   let img = document.querySelector(`[data-img-id="${movie.id}"]`);
          //   img.src = 'https://raw.githubusercontent.com/marvall/filmoteka/main/src/images/no-poster.png.org/t/p/original';
          // }
        });
      })
      .finally(() => (loader.style.display = 'none'));
  }
}

searchFormRef.addEventListener('submit', event => {
  event.preventDefault();
  galleryRef.innerHTML = '';
  loader.style.display = 'flex';
  searchMovie();
});

window.onload = function () {
  loader.style.display = 'none';
};