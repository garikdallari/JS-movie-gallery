import { func } from "assert-plus";
import refs from "./refs"
import MovieApiService from './movieService';
import movieCard from "../templates/gallery-card.hbs";
import { loader } from './loaders';
const API = new MovieApiService;


const { btnDay, btnWeek, btnTop, btnUpcoming, galleryRef } = refs;

btnDay.addEventListener('click', onClickBtnDay);
btnWeek.addEventListener('click', onClickBtnWeek);
btnTop.addEventListener('click', onClickBtnTop);
btnUpcoming.addEventListener('click', onClickBtnUpcoming);

function onClickBtnDay() {
    API.clearGallery();
    loader.on();
    getMovieByPeriod('day').finally(() => loader.off());
    // btnDay.style.backgroundColor = 'tomato';
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