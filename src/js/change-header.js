
const linkMyLibraryRef = document.querySelector('.js-link-library')
const linkMyHomeRef = document.querySelector('.js-link-home')
const headerBackroundImage = document.querySelector('.header-background-img')
const searchFormRef = document.querySelector('.search-form')
const headerButtons = document.querySelector('.header-menu-btn');


linkMyLibraryRef.addEventListener('click', onClickLib)
linkMyHomeRef.addEventListener('click', onClickHome)



function onClickLib() {
    searchFormRef.classList.add('is-closed');
    headerButtons.classList.replace('is-closed', 'is-open');
    headerBackroundImage.classList.replace('header-background-img', 'header-background-img-lib');
   
}

function onClickHome() {
    searchFormRef.classList.remove('is-closed');
     headerButtons.classList.replace('is-open', 'is-closed');
     headerBackroundImage.classList.replace('header-background-img-lib', 'header-background-img')

}

