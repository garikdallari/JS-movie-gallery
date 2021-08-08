// const axios = require('axios');
import axios from 'axios';
import { API_KEY, TRENDING, SEARCH_MOVIE } from './searchProps';

axios.defaults.baseURL = `https://api.themoviedb.org/3/`;

export default class MovieApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchTrendingMovies() {}

  async searchMovieByName() {}

  async getMovieInfo(id) {}
}
