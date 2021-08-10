
import { func } from 'assert-plus';
import refs from './refs'

const { searchFormRef,headerBtns,homeRef,myLibraryRef,periodBtnBox,headerBackgroundImageRef} = refs;

myLibraryRef.addEventListener('click', onClickLib);
homeRef.addEventListener('click', onClickHome);

function onClickLib() {
  addElementClass(searchFormRef, 'is-closed');
  replaceElementClass(headerBtns, 'is-closed', 'is-open');
  replaceElementClass(headerBackgroundImageRef, 'header-background-img', 'header-background-img-lib');
  removeElementClass(homeRef, 'nav-menu__link--current-page');
  addElementClass(myLibraryRef, 'nav-menu__link--current-page');
  addStyleDisplay(periodBtnBox, 'none');

  
}

function onClickHome() {
  removeElementClass(searchFormRef, 'is-closed');
  replaceElementClass(headerBtns, 'is-open', 'is-closed');
  replaceElementClass(headerBackgroundImageRef, 'header-background-img-lib', 'header-background-img');
  removeElementClass(myLibraryRef, 'nav-menu__link--current-page');
  addElementClass(homeRef, 'nav-menu__link--current-page');
  addStyleDisplay(periodBtnBox, '');
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

