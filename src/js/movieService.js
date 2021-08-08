const axios = require('axios');
import { BASE_URL, API_KEY, TRENDING, SEARCH_MOVIE } from './searchProps';
import { parseGenres } from './genres';
export default class MovieApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchTrendingMovies(period) {
    return axios.get(`trending/movie/${period}?api_key=${API_KEY}`);
  }

  async searchMovieByName() {}

  async getMovieInfo(id) {}

  async fetchGenres() {
    const res = await axios.get(`genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const genres = await res.data.genres;
    return genres;
  }

  editGenres(obj) {
    const genresRef = document.querySelector(`[data-id="${obj.id}"]`);
    const parsedGenres = [];

    for (let i = 0; i < obj.genre_ids.length; i += 1) {
      obj.genre_ids.map(genre => {
        const genresObj = parseGenres();
        genresObj.forEach(genreSet => {
          if (genre === genreSet.id) {
            parsedGenres.push(genreSet.name);
          }
        });
      });
    }

    if (parsedGenres.length > 2)
      return (genresRef.innerHTML = parsedGenres.splice(0, 3).join(', ') + ' ...');
    genresRef.innerHTML = parsedGenres.join(', ');
  }

  editDate(obj) {
    const yearRef = document.querySelector(`[data-year-id="${obj.id}"]`);
    const yearVal = yearRef.textContent;
    yearRef.textContent = `| ${yearVal.slice(0, 4)}`;
  }

  markupTempl(data, el, templ) {
    el.insertAdjacentHTML('beforeend', templ(data));
  }

}
