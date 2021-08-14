
import { func } from 'assert-plus';
import refs from './refs'

const { messageFailure, searchFormRef,headerBtns,homeRef,myLibraryRef,periodBtnBox,headerBackgroundImageRef,paginationBox,watchedBtn,queueBtn} = refs;

myLibraryRef.addEventListener('click', onClickLib);
homeRef.addEventListener('click', onClickHome);
headerBtns.addEventListener('click', onClickMenuBtns);

function onClickLib() {
  messageFailure.style.display = 'none';
  addElementClass(searchFormRef, 'is-closed');
  replaceElementClass(headerBtns, 'is-closed', 'is-open');
  replaceElementClass(headerBackgroundImageRef, 'header-background-img', 'header-background-img-lib');
  removeElementClass(homeRef, 'nav-menu__link--current-page');
  addElementClass(myLibraryRef, 'nav-menu__link--current-page');
  addStyleDisplay(periodBtnBox, 'none');
  addElementClass(watchedBtn, 'header-menu-btn__item--active');
  removeElementClass(queueBtn, 'header-menu-btn__item--active');
  removePagination();
}

function onClickHome() {
  removeElementClass(searchFormRef, 'is-closed');
  replaceElementClass(headerBtns, 'is-open', 'is-closed');
  replaceElementClass(headerBackgroundImageRef, 'header-background-img-lib', 'header-background-img');
  removeElementClass(myLibraryRef, 'nav-menu__link--current-page');
  addElementClass(homeRef, 'nav-menu__link--current-page');
  addStyleDisplay(periodBtnBox, '');
  addsPagination();
}

function onClickMenuBtns(evt) {
  addActiveBtn(evt);
}


function replaceElementClass(element, remove, add) {
  element.classList.replace(remove, add);
};

function addElementClass(element, name) {
  element.classList.add(name);
  
}

function removeElementClass(element, name) {
  element.classList.remove(name);
  
}

function addStyleDisplay(element, value) {
  element.style.display = value;
  
}

function removePagination() {
  paginationBox.classList.add('tui-pagination--closed');

}

function addsPagination() {
  paginationBox.classList.remove('tui-pagination--closed');
}

function addActiveBtn(evt) {
  if (evt.target.nodeName !== "BUTTON") {
    return
  }
  const currentBtn = evt.target;
  const currentActiveBtn = document.querySelector('.header-menu-btn__item--active');
    if (currentActiveBtn) {
        currentActiveBtn.classList.remove('header-menu-btn__item--active');
    }
    currentBtn.classList.add('header-menu-btn__item--active');
  
}


