import MovieApiService from './movieService';
import refs from './refs';
import {onClickBtnDay, onClickBtnWeek, onClickBtnUpcoming, onClickBtnTop, } from '../js/period-buttons';
import { ua, en, ru, es } from './languages';
const { langIcon, searchInputRef, messageFailure, myLibraryRef, homeRef, btnDay, btnWeek, btnTop, btnUpcoming, EnBtn,
  UaBtn, RuBtn, EsBtn, watchedBtn, queueBtn, langBtns, footerGoitText, footerText1, footerText2, } = refs;
  import {
    WATCHED_LIST,
    QUEUE_LIST,
    updateCurrentPage,
    editDateAndGenres,
  } from './clients-lists';
 
const movieAS = new MovieApiService();

langBtns.addEventListener('click', changeLang);

const localLang = localStorage.getItem('currentLanguage');
const parselocalLang = JSON.parse(localLang);
if (parselocalLang === null) {
  setTextcontent(en);
  setCurrentLangBtn(EnBtn);
} else {
  setTextcontent(parselocalLang);

  switch (parselocalLang.btn) {
    case 'UaBtn':
      setCurrentLangBtn(UaBtn);
      break;
    case 'RuBtn':
      setCurrentLangBtn(RuBtn);
      break;
    case 'EnBtn':
      setCurrentLangBtn(EnBtn);
      break;
    case 'EsBtn':
      setCurrentLangBtn(EsBtn);
      break;
  }
}

function changeLang(event) {
  switch (event.target) {
    case UaBtn:
      localStorage.setItem('currentLanguage', JSON.stringify(ua));
      setCurrentLibCardLang(WATCHED_LIST);
      setCurrentLibCardLang(QUEUE_LIST);
      changeCardsLang();
      setTextcontent(ua);
      setCurrentLangBtn(UaBtn);
      setLibraryTextContent();
      changeLangInLibrary();
      break;

    case EnBtn:
      localStorage.setItem('currentLanguage', JSON.stringify(en));
      setCurrentLibCardLang(WATCHED_LIST);
      setCurrentLibCardLang(QUEUE_LIST);
      changeCardsLang();
      setTextcontent(en);
      setCurrentLangBtn(EnBtn);
      setLibraryTextContent();
      changeLangInLibrary();
      break;

    case RuBtn:
      localStorage.setItem('currentLanguage', JSON.stringify(ru));
      setCurrentLibCardLang(WATCHED_LIST);
      setCurrentLibCardLang(QUEUE_LIST);
      changeCardsLang();
      setTextcontent(ru);
      setCurrentLangBtn(RuBtn);
      setLibraryTextContent();
      changeLangInLibrary();
      break;

    case EsBtn:
      localStorage.setItem('currentLanguage', JSON.stringify(es));
      setCurrentLibCardLang(WATCHED_LIST);
      setCurrentLibCardLang(QUEUE_LIST);
      changeCardsLang();
      setTextcontent(es);
      setCurrentLangBtn(EsBtn);
      setLibraryTextContent();
      changeLangInLibrary();
      break;
  }
}

function setTextcontent(lang) {
  myLibraryRef.textContent = lang.library;
  homeRef.textContent = lang.home;
  messageFailure.textContent = lang.messageFailure;
  btnDay.textContent = lang.day;
  btnWeek.textContent = lang.week;
  btnTop.textContent = lang.top;
  btnUpcoming.textContent = lang.upcoming;
  footerText1.textContent = lang.footerText1;
  footerText2.textContent = lang.footerText2;
  watchedBtn.textContent = lang.watched;
  queueBtn.textContent = lang.queue;
  searchInputRef.placeholder = lang.placeholder;
  footerGoitText.textContent = lang.footerGoitText;
  langIcon.setAttribute('data-title', `${lang.langIcon}`);

}

function setCurrentLangBtn(langBtn) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('lang-btn--current');
  });
  langBtn.classList.add('lang-btn--current');
}

function changeCardsLang() {
  movieAS.getCurrentClientPage();
  movieAS.fetchGenres().then(res => {
    localStorage.setItem('genresList', JSON.stringify(res));
  });
  const currentPeriodActiveBtn = document.querySelector('.period-buttons__btn--active');
  if (!currentPeriodActiveBtn) {
    return;
  } else {
    switch (currentPeriodActiveBtn) {
      case btnTop:
        movieAS.getCurrentClientPage();
        onClickBtnTop();
        break;

      case btnDay:
        movieAS.getCurrentClientPage();
        onClickBtnDay();
        break;

      case btnWeek:
        movieAS.getCurrentClientPage();
        onClickBtnWeek();
        break;

      case btnUpcoming:
        movieAS.getCurrentClientPage();
        onClickBtnUpcoming();
        break;
    }
  }
}

function removePeriodBtnActiveClass() {
  const periodBtnActive = document.querySelector('.period-buttons__btn--active');
  if (periodBtnActive !== null) {
    periodBtnActive.classList.remove('period-buttons__btn--active');
  } else return;
}

function setCurrentModalLang(listKey) {
  const localLang = localStorage.getItem('currentLanguage');
  const parselocalLang = JSON.parse(localLang);
  const addToWatched = document.querySelector('.button_watched');
  const addToQueue = document.querySelector('.button_queue');
  const openTrailer = document.querySelector('.button_open');
  const aboutTitle= document.querySelector('.title_about');
  const vote = document.querySelector('.vote');
  const popularity = document.querySelector('.popularity');
  const  title= document.querySelector('.title');
  const  genre= document.querySelector('.genre');
  
  if (parselocalLang === null) {
    openTrailer.textContent = en.openTrailer;
    aboutTitle.textContent = en.aboutTitle;
    vote.textContent = en.vote;
    popularity.textContent = en.popularity;
    title.textContent = en.title;
    genre.textContent =  en.genre;
    listKey === 'watched'
      ? (addToWatched.textContent = en.addToWatched)
      : (addToQueue.textContent = en.addToQueue);

  } else {
    openTrailer.textContent = parselocalLang.openTrailer;
    aboutTitle.textContent =  parselocalLang.aboutTitle;
    vote.textContent = parselocalLang.vote;
    popularity.textContent =  parselocalLang.popularity;
    title.textContent = parselocalLang.title;
    genre.textContent =  parselocalLang.genre;
    listKey === 'watched'
      ? (addToWatched.textContent = parselocalLang.addToWatched)
      : (addToQueue.textContent = parselocalLang.addToQueue);
  }
}

function setCurrentModalRemoveLang(listKey) {
  const localLang = localStorage.getItem('currentLanguage');
  const parselocalLang = JSON.parse(localLang);
  const addToWatched = document.querySelector('.button_watched');
  const addToQueue = document.querySelector('.button_queue');

  if (parselocalLang === null) {
    listKey === 'watched'
      ? (addToWatched.textContent = en.removeFromWatched)
      : (addToQueue.textContent = en.removeFromQueue);
  } else {
    listKey === 'watched'
      ? (addToWatched.textContent = parselocalLang.removeFromWatched)
      : (addToQueue.textContent = parselocalLang.removeFromQueue);
  }
}

function setLibraryTextContent() {
  const emptyLibrary = document.getElementById('empty-library');
  if (emptyLibrary !== null) {
    const localLang = localStorage.getItem('currentLanguage');
    const parselocalLang = JSON.parse(localLang);
    parselocalLang === null
      ? (emptyLibrary.textContent = en.emptyLibrary)
      : (emptyLibrary.textContent = parselocalLang.emptyLibrary);
  } else return;
}

function setCurrentLibCardLang(list) {
  const localList = movieAS.getLocalStoredList(list);
  if (!localList) {
    return;
  } else {
    let newLocalList = [];
    movieAS.getCurrentClientLang();
    localList.forEach(l => {
      movieAS.SearchId = l.id;
      movieAS.getMovieInfo().then(res => {
        newLocalList.push(res.data);
        localStorage.setItem(list, JSON.stringify(newLocalList));
      });
    });
  }
}

function changeLangInLibrary() {
  const currentActiveBtn =  document.querySelector('.header-menu-btn__item--active');
  if (!currentActiveBtn) {
    return;
  } else if (currentActiveBtn === queueBtn) {
    changeLangInList(QUEUE_LIST);
  } else if (currentActiveBtn === watchedBtn) {
    changeLangInList(WATCHED_LIST);
  }
}

function changeLangInList(list) {
  const localList = movieAS.getLocalStoredList(list);
  if (!localList) {
    return;
  } else {
    let newLocalList = [];
    movieAS.getCurrentClientLang();
    localList.forEach(l => {
      movieAS.SearchId = l.id;
      movieAS
        .getMovieInfo()
        .then(res => {
          newLocalList.push(res.data);
          localStorage.setItem(list, JSON.stringify(newLocalList));
        })
        .then(() => {
          movieAS.clearGallery();
          const grabbedData = updateCurrentPage(list);
          editDateAndGenres(grabbedData);
        });
    });
  }
}

export {
  setCurrentModalLang,
  setCurrentModalRemoveLang,
  setLibraryTextContent,
  removePeriodBtnActiveClass,
  setCurrentLibCardLang,
}

