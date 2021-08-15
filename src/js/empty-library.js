import refs from './refs';
import MovieApiService from './movieService';
import {WATCHED_LIST,QUEUE_LIST} from './clients-lists';

const movieApiService = new MovieApiService();
const { myLibraryRef, galleryRef,homeRef,watchedBtn,queueBtn} = refs;
const section= document.querySelector(".movies");


myLibraryRef.addEventListener("click", textMessage);
homeRef.addEventListener("click",deleteTextMessage);


function deleteTextMessage() {
    if(!document.querySelector('[id="empty-library"]')){
        return;
    }
    document.querySelector('[id="empty-library"]').remove();
    window.removeEventListener("click",onWindowClick);
}

function textMessage() {
const que = movieApiService.getLocalStoredList(QUEUE_LIST);
const watched = movieApiService.getLocalStoredList(WATCHED_LIST);
if(que.length===0&&watched.length===0){
   section.insertAdjacentHTML("afterbegin",`<span id="empty-library">You don't have added any movies yet</span>`); 
}
window.addEventListener("click",onWindowClick);

}


function onWindowClick(e){

const que = movieApiService.getLocalStoredList(QUEUE_LIST);
const watched = movieApiService.getLocalStoredList(WATCHED_LIST);
    if(e.target.classList.contains("button_watched")||e.target.classList.contains("button_queue")){
if(que.length===0&&watched.length===0){
    section.insertAdjacentHTML("afterbegin", `<span id="empty-library">You haven't added any movies yet</span>`);
}
    }
    }


