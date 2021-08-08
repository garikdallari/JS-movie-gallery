import MovieApiService from './movieService';
import refs from './refs';


const movieApiService = new MovieApiService();
const { galleryRef } = refs;
const modal = document.querySelector('.js-lightbox');
const buttonClose = document.querySelector('.lightbox__button');
const content = document.querySelector('.lightbox__content');

galleryRef.addEventListener('click', openModalOnClick);
  
function openModalOnClick(e) {
    
    e.preventDefault();
    // console.log(e.target)

    if (!e.target.classList.contains('cards-list__img')) {
        return;
    }
    document.body.style.overflow = "hidden";
    modal.classList.add('is-open');

    movieApiService.id = +e.target.getAttribute('data-img-id');
    // console.log(movieApiService.id)

    window.addEventListener('keydown', closeModalOnEsk);
    buttonClose.addEventListener('click', closeModalOnClick);
    modal.addEventListener('click', closeModalOnClick);
     fetchMovieById();
     
}

function closeModalOnClick() {
    modal.classList.remove('is-open');
    document.body.style.overflow = "visible";
    const modalContent = content.firstElementChild;
    modalContent.innerHTML="";
    window.removeEventListener('keydown', closeModalOnEsk);
    buttonClose.removeEventListener('click',closeModalOnClick);
    modal.removeEventListener('click', closeModalOnClick);
};
 
function closeModalOnEsk(e) {
     if(e.code==="Escape"){
          closeModalOnClick();
     }
};

async function fetchMovieById() {
    const results = await movieApiService.getMovieInfo();
    // console.log(results)
    content.insertAdjacentHTML( "afterbegin",movieCardById(results));
    

}
