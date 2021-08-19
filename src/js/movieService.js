const axios = require('axios');
import { API_KEY, TRENDING, SEARCH_MOVIE } from './searchProps';
import { getGenresList, createNewGenresList } from './genres';
import refs from './refs';
import galleryCard from '../templates/gallery-card.hbs';

const { galleryRef } = refs;

axios.defaults.baseURL = `https://api.themoviedb.org/3/`;

export default class MovieApiService {
  constructor() {
    this.searchQuery = '';
    this.page =`${this.getCurrentClientPage()}`;
    this.lang = `${this.getCurrentClientLang()}`;
    this.SearchId = 1;
    this.time_window = 'day';
    this.media_type = '/movie/';
    this.home = 'trending';
  }

  async fetchTrendingMovies(period, page = 1) {
    this.saveCurrentPageToLocalStorage(1, period, null, 'fetchByPeriod');
    return axios.get(
      `trending/movie/${period}?api_key=${API_KEY}&language=${this.lang}&page=${page}`,
    );
  }

  async fetchDate(page) {
    const url = `${axios.defaults.baseURL}${this.home}${this.media_type}${this.time_window}?api_key=${API_KEY}&page=${page}&language=${this.lang}`;
    const response = await axios.get(url);
    return response.data;
  }

  async fetchTopRatedMovies(page = 1) {
    this.saveCurrentPageToLocalStorage(1, null, null, 'fetchTopRated');
    return axios.get(`movie/top_rated?api_key=${API_KEY}&language=${this.lang}&page=${page}`);
  }

  async fetchUpcomingMovies(page = 1) {
    this.saveCurrentPageToLocalStorage(1, null, null, 'fetchUpcoming');
    return axios.get(`movie/upcoming?api_key=${API_KEY}&language=${this.lang}&page=${page}`);
  }

  async searchMovieByWord(page = 1) {
    this.saveCurrentPageToLocalStorage(1, null, this.searchQuery, 'fetchByWord');
    const response = await axios.get(
      `${SEARCH_MOVIE}?api_key=${API_KEY}&query=${this.searchQuery}&page=${page}&language=${this.lang}`,
    );

    return response;
  }

  async getMovieInfo() {
    return axios.get(`movie/${this.SearchId}?api_key=${API_KEY}&language=${this.lang}`);
  }

  async fetchTrailer() {
    const response = await axios.get(
      `movie/${this.SearchId}/videos?api_key=${API_KEY}&language=${this.lang}`,
    );
    const trailers = await response.data;
    return trailers;
  }

  async fetchGenres() {
    const res = await axios.get(`genre/movie/list?api_key=${API_KEY}&language=${this.lang}`);
    const genres = await res.data.genres;
    return genres;
  }

  editGenres(obj) {
    const genresRef = document.querySelector(`[data-genre-id="${obj.id}"]`);
    const genresObj = getGenresList();
    const editedGenresList = [];
    const fetchedGenres = obj.genre_ids;

    createNewGenresList(fetchedGenres, genresObj, editedGenresList);

    if (editedGenresList.length > 2)
      return (genresRef.innerHTML = editedGenresList.splice(0, 3).join(', ') + '&nbsp;');
    genresRef.innerHTML = editedGenresList.join(', ');
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
    if (data === undefined) return;

    const storedList = this.getLocalStoredList(listKey);
    storedList.push(data);
    const updatedList = JSON.stringify(storedList);

    localStorage.setItem(listKey, updatedList);
  }

  getLocalStoredList(listKey) {
    const stringifyList = localStorage.getItem(listKey);
    return JSON.parse(stringifyList);
  }

  addToMovieList(movieId, listKey) {
    this.id = movieId;
    const WATCHED_LIST = 'watched';
    const QUEUE_LIST = 'queue';

    // ===== check aviability this id in local storage
    const localList = this.getLocalStoredList(listKey);
    const isIdExists = localList.some(movie => movieId === movie.id);
    if (isIdExists) return;

    this.getMovieInfo().then(res => {
      if (listKey === WATCHED_LIST) {
        res.data.isWatched = true;
      }
      if (listKey === QUEUE_LIST) {
        res.data.isQueue = true;
      }

      this.updateLocalList(listKey, res.data);
    });
  }

  removefromMovieList(movieId, listKey) {
    this.id = movieId;

    const localList = this.getLocalStoredList(listKey);
    const isIdExists = localList.find(movie => movie.id === movieId);
    if (isIdExists === undefined) return;

    const updatedList = localList.filter(movie => {
      return movie.id !== movieId;
    });

    localStorage.setItem(listKey, JSON.stringify(updatedList));
  }

  markupGrabbedList() {
    this.clearGallery();
    const grabbedData = this.getLocalStoredList(this.screenPage);
    this.markupTempl(grabbedData, galleryRef, galleryCard);
  }

  getCurrentClientLang() {
    const localLang = localStorage.getItem('currentLanguage');
    const parselocalLang = JSON.parse(localLang);

    if (parselocalLang === null) {
      this.lang = 'en-EN';
    } else {
      this.lang = parselocalLang.language;
    }
    return this.lang;

  }

  getCurrentClientPage() {
    const currentPageSettings = localStorage.getItem('currentPageSettings');
    const parseCurrentPageSettings = JSON.parse(currentPageSettings);
     if (parseCurrentPageSettings === null) {
      this.page = 1;
    } else {
      this.page = parseCurrentPageSettings.currentPage;
    }
    return this.page;
  }

  saveCurrentPageToLocalStorage(currentPage, period, query, fetchQuery) {
    const savedSettings = { currentPage, period, query, fetchQuery };
    localStorage.setItem('currentPageSettings', JSON.stringify(savedSettings));
  }
}
