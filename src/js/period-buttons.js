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
    getMovieByWeek('day');
}

function onClickBtnWeek() {
    getMovieByWeek('week');
}

function onClickBtnTop() {
    getMovieTopRated();
}

function onClickBtnUpcoming() {
    getMovieUpComing();
}



async function getMovieByWeek(period) {
    try { 
        const response = await API.fetchTrendingMovies(period).then(item => item.data.results);
        const result = movieCard(response);
        refs.galleryRef.innerHTML = result;
        
} catch (error) {
        console.log(error);
    }   
}

async function getMovieTopRated() {

    try {
        const response = await API.fetchTopRatedMovies().then(item => item.data.results);
        console.log(response)
        const result = movieCard(response);
        refs.galleryRef.innerHTML = result;

} catch (error) {
        console.log(error);
    }   

}

async function getMovieUpComing() {
    try {
        const response = await API.fetchUpcomingMovies().then(item => item.data.results);
        console.log(response)
        const result = movieCard(response);
        refs.galleryRef.innerHTML = result;

} catch (error) {
        console.log(error);
    }   
}

