import { func } from 'assert-plus';
import refs from './refs';
import MovieApiService from './movieService';
import movieCard from '../templates/gallery-card.hbs';
import { loader } from './loaders';
import throttle from 'lodash.throttle';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../sass/pagination.scss';
import {
  paginContainer,
  paginOptions,
  onPeriodPagination,
  onTopRatedPagination,
  onUpcomingPagination,
  getTotalItemsFromStorage,
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

const THROTTLE_DELAY = 1000;
btnDay.addEventListener('click', throttle(onClickBtnDay, THROTTLE_DELAY));
btnWeek.addEventListener('click', throttle(onClickBtnWeek, THROTTLE_DELAY));
btnTop.addEventListener('click', throttle(onClickBtnTop, THROTTLE_DELAY));
btnUpcoming.addEventListener('click', throttle(onClickBtnUpcoming, THROTTLE_DELAY));

function onClickBtnDay() {
  API.clearGallery();
  loader.on();
  // ====== GET FIRST REQUESTED PAGE
  getMovieByPeriod('day').finally(() => loader.off());
  addsActiveButton(btnDay);

  // ===== INITIALISE PAGINATION
  const pagination = new Pagination(paginContainer, paginOptions);
  // ===== GET NEXT PAGES
  onPeriodPagination(pagination, 'day');
}

function onClickBtnWeek() {
  API.clearGallery();
  loader.on();
  getMovieByPeriod('week').finally(() => loader.off());
  addsActiveButton(btnWeek);

  const pagination = new Pagination(paginContainer, paginOptions);
  onPeriodPagination(pagination, 'week');
}

function onClickBtnTop() {
  API.clearGallery();
  loader.on();
  getMovieByType(API.fetchTopRatedMovies()).finally(() => loader.off());
  addsActiveButton(btnTop);

  const totalItems = getTotalItemsFromStorage();
  const pagination = new Pagination(paginContainer, { ...paginOptions, totalItems });
  onTopRatedPagination(pagination);
}

function onClickBtnUpcoming() {
  API.clearGallery();
  loader.on();
  getMovieByType(API.fetchUpcomingMovies()).finally(() => loader.off());
  addsActiveButton(btnUpcoming);

  const totalItems = getTotalItemsFromStorage();
  const pagination = new Pagination(paginContainer, { ...paginOptions, totalItems });
  onUpcomingPagination(pagination);
}

async function getMovieByPeriod(period) {
  try {
    const response = await API.fetchTrendingMovies(period).then(response =>
      renderMovieCards(response),
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getMovieByType(type) {
  try {
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

export { addsActiveButton };
