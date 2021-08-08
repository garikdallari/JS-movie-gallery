import MovieApiService from './movieService';
import refs from './refs';
import debounce from 'lodash.debounce';
import galleryCard from '../templates/gallery-card.hbs';
const {searchFormRef, searchFormInputRef, galleryRef, messageFailure}=refs;

const SearchMovieApiService=new MovieApiService();

function searchMovie(){
  messageFailure.style.display='none';
  const searchWord=searchFormInputRef.value.trim();
  if (searchWord===''){
    return;}
  else {
    SearchMovieApiService.searchMovieByWord(searchWord)
   .then(movies=>{
      galleryRef.innerHTML='';
      if(movies.length===0){
        messageFailure.style.display='block';
      } 
      else SearchMovieApiService.markupTempl(movies, galleryRef, galleryCard);
    })
  }
}

searchFormRef.addEventListener('submit', event=>event.preventDefault());
searchFormInputRef.addEventListener('input', debounce(searchMovie, 300));
