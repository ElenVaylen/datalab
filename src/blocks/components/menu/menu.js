let menuBar = document.querySelector('.menu__bar');

let clickMenuBar = () => {
  menuBar.addEventListener("click", function() {
    document.body.classList.toggle("menu-open");
  });
};
clickMenuBar();