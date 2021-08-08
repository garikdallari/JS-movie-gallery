
const linkMyLibraryRef = document.querySelector('.js-link-library');
const linkMyHomeRef = document.querySelector('.js-link-home');
const headerBackgroundImageRef = document.querySelector('.header-background-img');
const searchFormRef = document.querySelector('.search-form');
const headerButtonsRef = document.querySelector('.header-menu-btn');

linkMyLibraryRef.addEventListener('click', onClickLib);
linkMyHomeRef.addEventListener('click', onClickHome);

function onClickLib() {
    searchFormRef.classList.add('is-closed');
    headerButtonsRef.classList.replace('is-closed', 'is-open');
    headerBackgroundImageRef.classList.replace('header-background-img', 'header-background-img-lib');
    linkMyHomeRef.classList.remove('nav-menu__link--current-page');
    linkMyLibraryRef.classList.add('nav-menu__link--current-page');
}

function onClickHome() {
    searchFormRef.classList.remove('is-closed');
    headerButtonsRef.classList.replace('is-open', 'is-closed');
    headerBackgroundImageRef.classList.replace('header-background-img-lib', 'header-background-img')
    linkMyLibraryRef.classList.remove('nav-menu__link--current-page');
    linkMyHomeRef.classList.add('nav-menu__link--current-page');
}


