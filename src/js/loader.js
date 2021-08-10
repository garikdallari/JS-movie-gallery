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
