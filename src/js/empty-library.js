import refs from './refs';
import MovieApiService from './movieService';
import {WATCHED_LIST,QUEUE_LIST} from './clients-lists';

const movieApiService = new MovieApiService();
const { myLibraryRef, galleryRef,homeRef,watchedBtn,queueBtn} = refs;
const section= document.querySelector(".movies");
const message=document.querySelector('[id="empty-library"]')



myLibraryRef.addEventListener("click", textMessage);
homeRef.addEventListener("click",deleteTextMessage);


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
  if(que.length===0||watched.length===0){ 
 message.style.display="block";
}  
watchedBtn.addEventListener("click",onBtnWatchedClick);
queueBtn.addEventListener("click",onBtnQueueClick); 
window.addEventListener("click",onWindowClick);
}


function onWindowClick(e){
    // console.log(e.target)

const que = movieApiService.getLocalStoredList(QUEUE_LIST);
const watched = movieApiService.getLocalStoredList(WATCHED_LIST);

    if (e.target.textContent === "add to watched" && watched.length === 0&&que.length===0) {
        // location.reload();
 message.style.display="block";
}

else if(e.target.textContent==="add to queue"&&que.length===0&&watched.length===0){
 message.style.display="block";
}
};


function onBtnWatchedClick(e) {
//    console.log(e.target) 
  const watched = movieApiService.getLocalStoredList(WATCHED_LIST);
  if (watched.length !== 0) {
    message.style.display = "none";
  }
  else {
    message.style.display = "block";
  }
 }

function onBtnQueueClick(e) {
//    console.log(e.target)  
const que = movieApiService.getLocalStoredList(QUEUE_LIST);
 if (que.length !== 0) {
    message.style.display = "none";
  }
  else {
    message.style.display = "block";
  }
};
