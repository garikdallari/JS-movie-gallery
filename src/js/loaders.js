window.onload = function(){setTimeout(function () {
  document.querySelector('.preloader-box').style.display='none';
  document.body.style.overflow='visible';
}, 3000)}

const loaderRef = document.querySelector('.loader');

const loader = {
  off() {
    loaderRef.style.display = 'none';
  },
  on() {
    loaderRef.style.display = 'flex';
  },
};
export { loader };
