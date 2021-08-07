import axios from 'axios';
import { BASE_URL, API_KEY } from './searchProps';
import MovieApiService from './movieService';

const movieApiService = new MovieApiService();
// ======STORE GENRES
movieApiService.fetchGenres().then(res => {
  localStorage.setItem('genresList', JSON.stringify(res));
});

// ===== parse genres from localStorage
const genresList = localStorage.getItem('genresList');
const genresObj = JSON.parse(genresList);

// function fetchGenres() {
//   return axios
//     .get(`genre/movie/list?api_key=${API_KEY}&language=en-US`)
//     .then(res => res.data.genres);
// }

// ===============================================
function editDate(obj) {
  const yearRef = document.querySelector(`[data-year-id="${obj.id}"]`);
  const yearVal = yearRef.textContent;
  yearRef.textContent = `| ${yearVal.slice(0, 4)}`;
}

function editGenres(obj) {
  const genresRef = document.querySelector(`[data-id="${obj.id}"]`);
  const parsedGenres = [];

  for (let i = 0; i < obj.genre_ids.length; i += 1) {
    obj.genre_ids.map(genre => {
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
