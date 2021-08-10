import { func } from "assert-plus";
import refs from "./refs"
import MovieApiService from './movieService';
import movieCard from "../templates/gallery-card.hbs";
const API = new MovieApiService;

refs.btnDay.addEventListener('click', onClickBtnDay);
refs.btnWeek.addEventListener('click', onClickBtnWeek);
refs.btnTop.addEventListener('click',onClickBtnTop)
refs.btnUpcoming.addEventListener('click',onClickBtnUpcoming)

function onClickBtnDay() {
    getMovieByPeriod('day');
}

function onClickBtnWeek() {
    getMovieByPeriod('week');
}

function onClickBtnTop() {
    getMovieByType(API.fetchTopRatedMovies());
}

function onClickBtnUpcoming() {
    getMovieByType(API.fetchUpcomingMovies());
}



async function getMovieByPeriod(period) {
    try {
        const response = await API.fetchTrendingMovies(period).then(response => renderMovieCards(response));
        return response
        
        } catch (error) {
                console.log(error);
            }   
}

async function getMovieByType(type) {
        try {
            const response = await type.then(response => renderMovieCards(response));
            return response

        } catch (error) {
                console.log(error);
            }   
}


function renderMovieCards(response) {
    const queryValue = response.data.results;
    const result = movieCard(queryValue);
    refs.galleryRef.innerHTML = result;
    queryValue.forEach(movie => {
        API.editDate(movie);
        API.editGenres(movie);
    })
}