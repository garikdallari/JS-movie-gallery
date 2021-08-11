document.addEventListener("scroll", handleScroll);
// get a reference to our predefined button
const scrollToTopBtn = document.querySelector(".scrollToTopBtn");

function handleScroll() {
  const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const GOLDEN_RATIO = 0.2;

  if ((document.documentElement.scrollTop / scrollableHeight ) > GOLDEN_RATIO) {
    //show button
    if(!scrollToTopBtn.classList.contains("showScrollBtn"))
    scrollToTopBtn.classList.add("showScrollBtn")
  } else {
    //hide button
    if(scrollToTopBtn.classList.contains("showScrollBtn"))
    scrollToTopBtn.classList.remove("showScrollBtn")
  }
}

scrollToTopBtn.addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}