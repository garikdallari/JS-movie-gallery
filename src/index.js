import './sass/main.scss';
// API 93e18502a4f670f89316c5fc1b091bd6

const axios = require('axios');
const url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=93e18502a4f670f89316c5fc1b091bd6&language=en-US&page=1'

async function getMovies() {
    const {data} = await axios.get(url)
    
    console.log(data.results)
}
getMovies()