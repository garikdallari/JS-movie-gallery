import axios from 'axios';
// import { BASE_URL, API_KEY } from './searchProps';
import MovieApiService from './movieService';

const movieApiService = new MovieApiService();
// ======STORE GENRES
movieApiService.fetchGenres().then(res => {
  localStorage.setItem('genresList', JSON.stringify(res));
});

// ===== parse genres from localStorage
export function parseGenres() {
  const genresList = localStorage.getItem('genresList');
  return JSON.parse(genresList);
}
