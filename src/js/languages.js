import MovieApiService from './movieService';
import refs from './refs';
const {
  searchInputRef,
  messageFailure,
  myLibraryRef,
  homeRef,
  btnDay,
  btnWeek,
  btnTop,
  btnUpcoming,
  modalRef,
  galleryRef,
  
} = refs;
import {
  onClickBtnDay,
  onClickBtnWeek,
  onClickBtnUpcoming,
  onClickBtnTop,
} from '../js/period-buttons';
const x = new MovieApiService();

const EnBtn = document.getElementById('en-btn');
const UaBtn = document.getElementById('ua-btn');
const RuBtn = document.getElementById('ru-btn');
const watchedBtn = document.querySelector('[data-value="watched"]');
const queueBtn = document.querySelector('[data-value="queue"]');
const langBtns = document.querySelector('.lang');
const footerText1 = document.querySelector('.footer-wrapper__text--rights');
const footerText2 = document.querySelector('.footer-wrapper__text--by');
const addToWatched = document.querySelector('.button_watched');
const addToQueue = document.querySelector('.button_queue');
const openTrailer = document.querySelector('.button_open');

langBtns.addEventListener('click', changeLang);

const en = {
  language: 'en-EN',
  library: 'LIBRARY',
  home: 'HOME',
  placeholder: 'Search movies',
  messageFailure: 'Search result not successful. Enter the correct movie name and try again',
  day: 'DAY',
  week: 'WEEK',
  top: 'top rated',
  upcoming: 'upcoming',
  footerText1: '© 2021 | All Rights Reserved | Developed with ',
  footerText2: 'by',
  watched: 'WATCHED',
  queue: 'queue',
  addToWatched: 'add To Watched',
  addToQueue: 'add To Queue',
  openTrailer: 'трейлер',
  btn: 'EnBtn',
};

const ru = {
  language: 'ru-RU',
  library: 'БИБЛИОТЕКА',
  home: 'ГЛАВНАЯ',
  placeholder: 'Поиск фильмов',
  messageFailure: 'Поиск не дал результатов. Введите корректное имя фильма и попробуйте ещё раз',
  day: 'ДЕНЬ',
  week: 'НЕДЕЛЯ',
  top: 'ПОПУЛЯРНЫЕ',
  upcoming: 'ПРЕМЬЕРА',
  footerText1: ' © 2021 | Все права защищены | Создано c',
  footerText2: '',
  watched: 'ПРОСМОТРЕНЫЕ',
  queue: 'ПОCМОТРЕТЬ',
  addToWatched: 'В ПРОСМОТРЕНЫЕ',
  addToQueue: 'посмотреть позже',
  openTrailer: 'трейлер',
  btn: 'RuBtn',
};

const ua = {
  language: 'uk-UA',
  library: 'БІБЛІОТЕКА',
  home: 'ГОЛОВНА',
  placeholder: 'Пошук фільмів',
  messageFailure: "Результат пошуку невдалий. Введіть коректне ім'я фільму і спробуйте ще раз",
  day: 'ДЕНЬ',
  week: 'НЕДіЛЯ',
  top: 'ПОПУЛЯНІ',
  upcoming: "ПРЕМ'ЄРА",
  footerText1: ' © 2021 | Всі права захищені | Створено з',
  footerText2: '',
  watched: 'ПЕРЕГЛЯНУТІ',
  queue: 'ЧЕРГА',
  addToWatched: 'В ПЕРЕГЛЯНУТІ',
  addToQueue: 'В чергу',
  openTrailer: 'трейлер',
  btn: 'UaBtn',
};

const localLang = localStorage.getItem('currentLanguage');
const parselocalLang = JSON.parse(localLang);

if (parselocalLang === null) {
  setTextcontent(en);
  setCurrentLangBtn(EnBtn);
} else {
  setTextcontent(parselocalLang);
  if (parselocalLang.btn === 'UaBtn') {
    setCurrentLangBtn(UaBtn);
  } else if (parselocalLang.btn === 'RuBtn') {
    setCurrentLangBtn(RuBtn);
  } else {
    setCurrentLangBtn(EnBtn);
  }
}

function changeLang(event) {
  
  switch (event.target) {
    case UaBtn:
      localStorage.setItem('currentLanguage', JSON.stringify(ua));
      changeCardsLang();
      setTextcontent(ua);
      setCurrentLangBtn(UaBtn);
      break;

    case EnBtn:
      localStorage.setItem('currentLanguage', JSON.stringify(en));
      changeCardsLang();
      setTextcontent(en);
      setCurrentLangBtn(EnBtn);
      break;

    case RuBtn:
      localStorage.setItem('currentLanguage', JSON.stringify(ru));
      changeCardsLang();
      setTextcontent(ru);
      setCurrentLangBtn(RuBtn);
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
  x.getCurrentClientLang();
  x.fetchGenres().then(res => {
  localStorage.setItem('genresList', JSON.stringify(res));})
  const currentPeriodActiveBtn=document.querySelector('.period-buttons__btn--active')
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

// console.log (modalRef.classList.contains('.is-open'));