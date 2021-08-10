const axios = require('axios');
import { API_KEY, TRENDING, SEARCH_MOVIE } from './searchProps';
import { parseGenres } from './genres';
import refs from './refs';

const { galleryRef } = refs;

axios.defaults.baseURL = `https://api.themoviedb.org/3/`;

export default class MovieApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.lang = 'en-EN';
    this.SearchId = 1;
  }

  async fetchTrendingMovies(period) {
    return axios.get(`trending/movie/${period}?api_key=${API_KEY}`);
  }

  async searchMovieByWord() {
    const response = await axios.get(
      `${SEARCH_MOVIE}?api_key=${API_KEY}&query=${this.searchQuery}&page=${this.page}`,
    );
    const movies = await response.data.results;
    return movies;
  }

  async getMovieInfo() {
    return axios.get(`movie/${this.SearchId}?api_key=${API_KEY}&language=${this.lang}`);
  }

  async fetchGenres() {
    const res = await axios.get(`genre/movie/list?api_key=${API_KEY}&language=${this.lang}`);
    const genres = await res.data.genres;
    return genres;
  }

  editGenres(obj) {
    const genresRef = document.querySelector(`[data-genre-id="${obj.id}"]`);
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

  get currentLang() {
    return this.lang;
  }

  set currentLang(value) {
    this.lang = value;
  }
  get id() {
    return this.SearchId;
  }
  set id(newId) {
    this.SearchId = newId;
  }

  clearGallery() {
    galleryRef.innerHTML = '';
  }

  createLocalList(listKey) {
    const storedList = JSON.stringify([]);
    localStorage.setItem(listKey, storedList);
  }

  updateLocalList(listKey, data) {
    const isListExists = localStorage.getItem(listKey);
    if (!isListExists) {
      createLocalList(listKey);
    }
    if (data === undefined) return;
    const storedList = getLocalStoredList(listKey);
    storedList.push(data);
    const updatedList = JSON.stringify(storedList);

    localStorage.setItem(listKey, updatedList);
  }

  getLocalStoredList(listKey) {
    const stringifyList = localStorage.getItem(listKey);
    return JSON.parse(stringifyList);
  }
}
