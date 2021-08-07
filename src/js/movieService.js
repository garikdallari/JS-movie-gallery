const axios = require('axios');
import { BASE_URL, API_KEY, TRENDING, SEARCH_MOVIE } from './searchProps';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/'; // ---------------- удалить перед пулом

export default class MovieApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchTrendingMovies() {}

  async searchMovieByName() {}

  async getMovieInfo(id) {}

  async fetchGenres() {
    const res = await axios.get(`genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const genres = await res.data.genres;
    return genres;
  }
}
