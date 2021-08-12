import { func } from "assert-plus";
import refs from "./refs"
import MovieApiService from './movieService';
import movieCard from "../templates/gallery-card.hbs";
import { loader } from './loaders';
import throttle from 'lodash.throttle';
const API = new MovieApiService;

const { btnDay, btnWeek, btnTop, btnUpcoming, galleryRef } = refs;

const THROTTLE_DELAY = 1000;
btnDay.addEventListener('click', throttle(onClickBtnDay, THROTTLE_DELAY));
btnWeek.addEventListener('click', throttle(onClickBtnWeek, THROTTLE_DELAY));
btnTop.addEventListener('click', throttle(onClickBtnTop, THROTTLE_DELAY));
btnUpcoming.addEventListener('click',throttle(onClickBtnUpcoming, THROTTLE_DELAY));

function onClickBtnDay() {
    API.clearGallery();
    loader.on();
    getMovieByPeriod('day').finally(()=>loader.off());
};

function onClickBtnWeek() {
    API.clearGallery();
    loader.on();
    getMovieByPeriod('week').finally(()=>loader.off());
};

function onClickBtnTop() {
    API.clearGallery();
    loader.on();
    getMovieByType(API.fetchTopRatedMovies()).finally(()=>loader.off());
};

function onClickBtnUpcoming() {
    API.clearGallery();
    loader.on();
    getMovieByType(API.fetchUpcomingMovies()).finally(()=>loader.off());
};



async function getMovieByPeriod(period) {
    try {
        const response = await API.fetchTrendingMovies(period).then(response => renderMovieCards(response));
        return response
        
        } catch (error) {
                console.log(error);
            }   
};

async function getMovieByType(type) {
        try {
            const response = await type.then(response => renderMovieCards(response));
            return response

        } catch (error) {
                console.log(error);
            }   
};


function renderMovieCards(response) {
    const queryValue = response.data.results;
    const result = movieCard(queryValue);
    galleryRef.innerHTML = result;
    queryValue.forEach(movie => {
        API.editDate(movie);
        API.editGenres(movie);
    })
};