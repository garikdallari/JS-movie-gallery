import MovieApiService from './movieService';
import refs from './refs';
import {
  onClickBtnDay,
  onClickBtnWeek,
  onClickBtnUpcoming,
  onClickBtnTop,
} from '../js/period-buttons';
import { ua, en, ru } from './languages';
const {
  searchInputRef,
  messageFailure,
  myLibraryRef,
  homeRef,
  btnDay,
  btnWeek,
  btnTop,
  btnUpcoming,
  EnBtn,
  UaBtn,
  RuBtn,
  watchedBtn,
  queueBtn,
  langBtns,
} = refs;

const movieAS = new MovieApiService();

const footerText1 = document.querySelector('.footer-wrapper__text--rights');
const footerText2 = document.querySelector('.footer-wrapper__text--by');

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
  }
}

function changeLang(event) {
  switch (event.target) {
    case UaBtn:
      localStorage.setItem('currentLanguage', JSON.stringify(ua));
      changeCardsLang();
      setTextcontent(ua);
      setCurrentLangBtn(UaBtn);
      setLibraryTextContent();
      break;

    case EnBtn:
      localStorage.setItem('currentLanguage', JSON.stringify(en));
      changeCardsLang();
      setTextcontent(en);
      setCurrentLangBtn(EnBtn);
      setLibraryTextContent();
      break;

    case RuBtn:
      localStorage.setItem('currentLanguage', JSON.stringify(ru));
      changeCardsLang();
      setTextcontent(ru);
      setCurrentLangBtn(RuBtn);
      setLibraryTextContent();
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
}

function setCurrentLangBtn(langBtn) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('lang-btn--current');
  });
  langBtn.classList.add('lang-btn--current');
}

function changeCardsLang() {
  movieAS.getCurrentClientLang();
  movieAS.fetchGenres().then(res => {
    localStorage.setItem('genresList', JSON.stringify(res));
  });
  const currentPeriodActiveBtn = document.querySelector('.period-buttons__btn--active');
  switch (currentPeriodActiveBtn) {
    case btnTop:
      onClickBtnTop();
      break;

    case btnDay:
      onClickBtnDay();
      break;

    case btnWeek:
      onClickBtnWeek();
      break;

    case btnUpcoming:
      onClickBtnUpcoming();
      break;
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

  if (parselocalLang === null) {
    openTrailer.textContent = en.openTrailer;
    listKey === 'watched'
      ? (addToWatched.textContent = en.addToWatched)
      : (addToQueue.textContent = en.addToQueue);
  } else {
    openTrailer.textContent = parselocalLang.openTrailer;
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

export {
  setCurrentModalLang,
  setCurrentModalRemoveLang,
  setLibraryTextContent,
  removePeriodBtnActiveClass,
};
