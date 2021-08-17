import MovieApiService from './movieService';

const movieApiService = new MovieApiService();

// ======STORE GENRES
movieApiService.getCurrentClientLang();
movieApiService.fetchGenres().then(res => {
  localStorage.setItem('genresList', JSON.stringify(res));
});

// ===== parse genres from localStorage
function getGenresList() {
  const genresList = localStorage.getItem('genresList');
  return JSON.parse(genresList);
}

function createNewGenresList(fetchedGenres, commonGenres, newList) {
  for (let i = 0; i < fetchedGenres.length; i += 1) {
    fetchedGenres.map(genre => {
      addGenreToNewArray(commonGenres, genre, newList);
    });
  }
}

function addGenreToNewArray(commonGenres, commonGenre, newList) {
  commonGenres.forEach(localGenre => {
    if (commonGenre === localGenre.id) {
      newList.push(localGenre.name);
    }
  });
}

export { getGenresList, createNewGenresList, addGenreToNewArray };

// --------------------

// for (let i = 0; i < obj.genre_ids.length; i += 1) {
//   obj.genre_ids.map(genre => {
//     addGenreToNewArray(genresObj, genreSet, editedGenresList);
// genresObj.forEach(genreSet => {
//   if (genre === genreSet.id) {
//     editedGenresList.push(genreSet.name);
//   }
// });
//   });
// }
