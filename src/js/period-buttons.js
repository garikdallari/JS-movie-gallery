import { func } from 'assert-plus';
import refs from './refs';
import MovieApiService from './movieService';
import movieCard from '../templates/gallery-card.hbs';
import { loader } from './loaders';
import throttle from 'lodash.throttle';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../sass/pagination.scss';
import { saveCurrentPageToLocalStorage } from './reload-page';
import {
  paginContainer,
  paginOptions,
  // activatePagination,
  // fetchMovieByPeriod,
  // fetchTopRatedMovie,
  // fetchUpcomingMovies,
  getTotalItemsFromStorage,
  onPeriodPagination,
  onTopRatedPagination,
  onUpcomingPagination,
} from './pagination';

const API = new MovieApiService();

const {
  btnDay,
  btnWeek,
  btnTop,
  btnUpcoming,
  galleryRef,
  searchFormRef,
  searchInputRef,
  messageFailure,
} = refs;

let currentPage = {
  page: null,
  period: null,
  searchQuery: null,
  fetchQuery: null,
};

const THROTTLE_DELAY = 1000;
btnDay.addEventListener('click', throttle(onClickBtnDay, THROTTLE_DELAY));
btnWeek.addEventListener('click', throttle(onClickBtnWeek, THROTTLE_DELAY));
btnTop.addEventListener('click', throttle(onClickBtnTop, THROTTLE_DELAY));
btnUpcoming.addEventListener('click', throttle(onClickBtnUpcoming, THROTTLE_DELAY));

function onClickBtnDay() {
  API.getCurrentClientLang();
  messageFailure.style.display = 'none';
  searchInputRef.value = '';
  API.clearGallery();
  loader.on();
  // ====== GET FIRST REQUESTED PAGE
  getMovieByPeriod('day').finally(() => loader.off());
  addsActiveButton(btnDay);

  // ===== INITIALISE PAGINATION
  document.querySelector('.tui-pagination').style.display='block';
  const pagination = new Pagination(paginContainer, paginOptions);
  // ===== GET NEXT PAGES
  onPeriodPagination(pagination, 'day');
}

function onClickBtnWeek() {
  API.getCurrentClientLang();
  searchInputRef.value = '';
  messageFailure.style.display = 'none';
  API.clearGallery();
  loader.on();
  getMovieByPeriod('week').finally(() => loader.off());
  addsActiveButton(btnWeek);
  document.querySelector('.tui-pagination').style.display='block';
  const pagination = new Pagination(paginContainer, paginOptions);
  onPeriodPagination(pagination, 'week');
}

function onClickBtnTop() {
  API.getCurrentClientLang();
  messageFailure.style.display = 'none';
  searchInputRef.value = '';
  API.clearGallery();
  loader.on();
  getMovieByType(API.fetchTopRatedMovies())
    .then(res => getTotalItemsFromStorage())
    .then(totalItems => {
      document.querySelector('.tui-pagination').style.display='block';
      const pagination = new Pagination(paginContainer, { ...paginOptions, totalItems });
      onTopRatedPagination(pagination);
    })
    .finally(() => loader.off());
  addsActiveButton(btnTop);
}

function onClickBtnUpcoming() {
  API.getCurrentClientLang();
  messageFailure.style.display = 'none';
  searchInputRef.value = '';
  API.clearGallery();
  loader.on();
  getMovieByType(API.fetchUpcomingMovies())
    .then(res => getTotalItemsFromStorage())
    .then(totalItems => {
      document.querySelector('.tui-pagination').style.display='block';
      const pagination = new Pagination(paginContainer, { ...paginOptions, totalItems });
      onUpcomingPagination(pagination);
    })
    .finally(() => loader.off());
  addsActiveButton(btnUpcoming);
}

async function getMovieByPeriod(period) {
  try {
    API.getCurrentClientLang();
    const response = await API.fetchTrendingMovies(period)
      .then(response => {
        renderMovieCards(response);
        return response;
      })
      .then(res => {
        const totalItems = res.data.total_results;
        localStorage.setItem('totalItems', totalItems);
        // saveCurrentPageToLocalStorage(page, period, null, 'fetchByPeriod', totalItems);
      });
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getMovieByType(type) {
  try {
    API.getCurrentClientLang();
    const response = await type.then(response => {
      localStorage.setItem('totalItems', JSON.stringify(response.data.total_results));
      renderMovieCards(response);
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

function renderMovieCards(response) {
  API.getCurrentClientLang();
  const queryValue = response.data.results;
  const result = movieCard(queryValue);
  galleryRef.innerHTML = result;
  queryValue.forEach(movie => {
    API.editDate(movie);
    API.editGenres(movie);
  });
}

function addsActiveButton(element) {
  const currentActiveBtn = document.querySelector('.period-buttons__btn--active');
  if (currentActiveBtn) {
    currentActiveBtn.classList.remove('period-buttons__btn--active');
  }
  element.classList.add('period-buttons__btn--active');
}

function removeActiveButton(element) {
  const currentActiveBtn = document.querySelector('.period-buttons__btn--active');
  currentActiveBtn.classList.remove('period-buttons__btn--active');
}

export {
  addsActiveButton,
  removeActiveButton,
  onClickBtnDay,
  onClickBtnWeek,
  onClickBtnUpcoming,
  onClickBtnTop,
};
