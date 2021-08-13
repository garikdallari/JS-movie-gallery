import MovieApiService from './movieService';
import refs from './refs';
const { searchInputRef, messageFailure, myLibraryRef, homeRef, btnDay, 
  btnWeek, btnTop,  btnUpcoming} = refs;

  
const x= new MovieApiService();
console.log (x.lang);

const EnBtn = document.getElementById('en-btn');
const UaBtn = document.getElementById('ua-btn');
const RuBtn = document.getElementById('ru-btn');
const watchedBtn= document.querySelector('[data-value="watched"]');
const queueBtn= document.querySelector('[data-value="queue"]');
const langBtns = document.querySelector('.lang');
const footerText1 = document.querySelector('.footer-wrapper__text--rights');
const footerText2 = document.querySelector('.footer-wrapper__text--by');

langBtns.addEventListener('click', changeLang);

const en={ 
  language: 'en-EN',
  library: 'LIBRARY',
  home: 'HOME',
  placeholder: 'Search movies',
  messageFailure: 'Search result not successful. Enter the correct movie name and try again',
  day:'DAY',
  week: 'WEEK',
  top: 'top rated',
  upcoming: 'upcoming',
  footerText1: '© 2021 | All Rights Reserved | Developed with ',
  footerText2: 'by',
  watched: 'WATCHED',
  queue: 'queue',
}

const ru={ 
  language: 'ru-RU',
  library: 'БИБЛИОТЕКА',
  home: 'ГЛАВНАЯ',
  placeholder: 'Поиск фильмов',
  messageFailure: 'Поиск не дал результатов. Введите корректное имя фильма и попробуйте ещё раз',
  day:'ДЕНЬ',
  week: 'НЕДЕЛЯ',
  top: 'ПОПУЛЯРНЫЕ',
  upcoming: 'ПРЕМЬЕРА',
  footerText1: ' © 2021 | Все права защищены | Создано c',
  footerText2: '',
  watched: 'ПРОСМОТРЕНЫЕ',
  queue: 'ПОCМОТРЕТЬ ПОЗЖЕ',
}

const ua={ 
  language: 'uk-UA',
  library: 'БІБЛІОТЕКА',
  home: 'ГОЛОВНА',
  placeholder: 'Пошук фільмів',
  messageFailure: "Поиск не дал результатов. Введіть коректне ім'я фільму і спробуйте ще раз",
  day:'ДЕНЬ',
  week: 'НЕДіЛЯ',
  top: 'ПОПУЛЯНІ',
  upcoming: "ПРЕМ'ЄРА",
  footerText1: ' © 2021 | Всі права захищені | Створено з',
  footerText2: '',
  watched: 'ПЕРЕГЛЯНУТІ',
  queue: 'НА МАЙБУТНЄ',
}

const current=localStorage.getItem("currentLanguage");
const m=JSON.parse(current);

if (m===null){
  setTextcontent(en)
}
else {
  setTextcontent(m)
  x.lang=m.language;
}



function changeLang(event) {
  switch (event.target) {
    case UaBtn:
      setTextcontent(ua);
      localStorage.setItem("currentLanguage",JSON.stringify(ua));
      break;

    case EnBtn:
      setTextcontent(en);
      localStorage.setItem("currentLanguage",JSON.stringify(en));
      break;
  
    case RuBtn:
     setTextcontent(ru);
     localStorage.setItem("currentLanguage",JSON.stringify(ru));
     break;
  }
}

function setTextcontent (lang) {
    myLibraryRef.textContent=lang.library;
    homeRef.textContent=lang.home;
    messageFailure.textContent=lang.messageFailure; 
    btnDay.textContent=lang.day;
    btnWeek.textContent=lang.week;
    btnTop.textContent=lang.top;
    btnUpcoming.textContent=lang.upcoming;
    footerText1.textContent=lang.footerText1;
    footerText2.textContent=lang.footerText2;
    watchedBtn.textContent=lang.watched;
    queueBtn.textContent=lang.queue;
    searchInputRef.placeholder = lang.placeholder;
}

