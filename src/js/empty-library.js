import refs from './refs';
import MovieApiService from './movieService';
import {WATCHED_LIST,QUEUE_LIST, markupGrabbedList, pageForExport} from './clients-lists';
import { setLibraryTextContent } from './set-languages'
const movieApiService = new MovieApiService();
const { myLibraryRef,homeRef,watchedBtn,queueBtn, logoLink} = refs;
const message = document.querySelector('[id="empty-library"]');



myLibraryRef.addEventListener("click", textMessage);
homeRef.addEventListener("click", deleteTextMessage);
logoLink.addEventListener('click', onLogoClick)  


function deleteTextMessage() {

    if( message.style.display==="block"){
    message.style.display="none";
    window.removeEventListener("click",onWindowClick);
    watchedBtn.removeEventListener("click",onBtnWatchedClick);
    queueBtn.removeEventListener("click",onBtnQueueClick);
    myLibraryRef.addEventListener("click", textMessage);
    }
}

function textMessage() {
const que = movieApiService.getLocalStoredList(QUEUE_LIST);
const watched = movieApiService.getLocalStoredList(WATCHED_LIST);
  if(que.length===0&&queueBtn.classList.contains("header-menu-btn__item--active")||watched.length===0&&watchedBtn.classList.contains("header-menu-btn__item--active")){ 
 message.style.display="block";
    setLibraryTextContent();
}  
watchedBtn.addEventListener("click",onBtnWatchedClick);
queueBtn.addEventListener("click",onBtnQueueClick); 
window.addEventListener("click", onWindowClick);
}

function onLogoClick() {
  const que = movieApiService.getLocalStoredList(QUEUE_LIST);
  const watched = movieApiService.getLocalStoredList(WATCHED_LIST);
  
   if (watched.length === 0 || que.length === 0  ) {
    message.style.display = "none";
  }

}

function onWindowClick(e){
const que = movieApiService.getLocalStoredList(QUEUE_LIST);
const watched = movieApiService.getLocalStoredList(WATCHED_LIST);
  if (e.target.dataset.action === "add-to-watched" && watched.length === 0 && watchedBtn.classList.contains("header-menu-btn__item--active")) {
    message.style.display = "block";
    setLibraryTextContent();
  }
  else if (e.target.dataset.action === "add-to-queue" && que.length === 0 && queueBtn.classList.contains("header-menu-btn__item--active")) {
    message.style.display = "block";
  }
  else if (e.target.dataset.action !== "add-to-queue" && myLibraryRef.classList.contains("nav-menu__link--current-page")
    || e.target.dataset.action !== "add-to-watched" && myLibraryRef.classList.contains("nav-menu__link--current-page")) {
     markupGrabbedList(pageForExport);
  }
};

function onBtnWatchedClick() {

  const watched = movieApiService.getLocalStoredList(WATCHED_LIST);
  if (watched.length !== 0) {
    message.style.display = "none";
  }
  else {
    message.style.display = "block";
  }
 }

function onBtnQueueClick() { 
const que = movieApiService.getLocalStoredList(QUEUE_LIST);
 if (que.length !== 0) {
    message.style.display = "none";
  }
  else {
    message.style.display = "block";
  }
};
