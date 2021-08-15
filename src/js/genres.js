import MovieApiService from './movieService';

const movieApiService = new MovieApiService();

// ======STORE GENRES
movieApiService.getCurrentClientLang();
movieApiService.fetchGenres().then(res => {
  localStorage.setItem('genresList', JSON.stringify(res));
});

// ===== parse genres from localStorage
export function getGenresList() {
  const genresList = localStorage.getItem('genresList');
  return JSON.parse(genresList);
}