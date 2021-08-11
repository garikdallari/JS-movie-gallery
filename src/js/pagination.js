import refs from './refs';
import MovieApiService from './movieService'
import galleryCard from '../templates/gallery-card.hbs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
const { galleryRef } = refs;

const movieApiService = new MovieApiService();
const options = {
    totalItems: 20000,
    itemsPerPage: 22,
    visiblePages: 5,
    page: 0,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
            '<a href="#" class="tui-page-btn tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</a>',
        disabledMoveButton:
            '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</span>',
        moreButton:
            '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
            '<span class="tui-ico-ellip">...</span>' +
            '</a>'
    }

}; 

const container = document.getElementById('tui-pagination-container');
const pagination = new Pagination(container, options);
const page = pagination.getCurrentPage();


movieApiService.fetchDate(page).then(response => {
    pagination.reset(response.total_pages);
     renderMoveGallery(response.results);
 });

 
pagination.on('afterMove', (event) => {
    const currentPage = event.page;
   
    clearGallery();
    movieApiService.fetchDate(currentPage).then(response => {
        renderMoveGallery(response.results);
        
    } )
});
 function renderMoveGallery(data) {
    galleryRef.insertAdjacentHTML('beforeend', galleryCard(data));
};
function clearGallery() {
     galleryRef.innerHTML = '';
    
};

