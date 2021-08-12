import refs from './refs';
const { searchInputRef, messageFailure, myLibraryRef, homeRef, btnDay, 
  btnWeek, btnTop,  btnUpcoming} = refs;

const EnBtn = document.getElementById('en-btn');
const UaBtn = document.getElementById('ua-btn');
const RuBtn = document.getElementById('ru-btn');
const watchedBtn= document.querySelector('[data-value="watched"]');
const queueBtn= document.querySelector('[data-value="queue"]');
console.log (queueBtn);
const langBtns = document.querySelector('.lang');
const footerText1 = document.querySelector('.footer-wrapper__text--rights');
const footerText2 = document.querySelector('.footer-wrapper__text--by');
langBtns.addEventListener('click', changeLang);

const ru={ 
  library: 'БИБЛИОТЕКА',
  home: 'ГЛАВНАЯ',
  placeholder: 'Поиск фильма',
  messageFailure: 'Поиск не дал результатов. Пожалуйста, попробуйте ещё раз',
  day:'ДЕНЬ',
  week: 'НЕДЕЛЯ',
  top: 'ПОПУЛЯРНЫЕ',
  upcoming: 'ПРЕМЬЕРА',
  footerText1: ' © 2020 | Все права защищены | Создано ',
  footerText2: '',
  watched: 'ПРОСМОТРЕНЫЕ',
  queue: 'ПОcМОТРЕТЬ ПОЗЖЕ',
}

function changeLang(event) {
  switch (event.target) {
    case UaBtn:
      myLibraryRef.textContent='rdf-rdf';
      console.log('ua');
      break;

    case EnBtn:
      console.log('en');
      break;

    case RuBtn:
      searchInputRef.placeholder = ru.placeholder;
      myLibraryRef.textContent=ru.library;
      homeRef.textContent=ru.home;
      messageFailure.textContent=ru.messageFailure; 
      btnDay.textContent=ru.day;
      btnWeek.textContent=ru.week;
      btnTop.textContent=ru.top;
      btnUpcoming.textContent=ru.upcoming;
      footerText1.textContent=ru.footerText1;
      footerText2.textContent=ru.footerText2;
      watchedBtn.textContent=ru.watched;
      queueBtn.textContent=ru.queue;
      console.log('ru');
      break;
  }
}



