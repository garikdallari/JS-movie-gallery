const axios = require('axios');
import { BASE_URL, API_KEY, TRENDING, SEARCH_MOVIE } from './searchProps';

export default class MovieApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;  
    };
   

    async fetchTrendingMovies() {
      
    };

    async searchMovieByName() {
       
    };

    async getMovieInfo(id) {

    };

}
