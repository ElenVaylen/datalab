let buttons = document.querySelectorAll('.start-screen__buttons .button');


let disableButton = (button) => {
  button.addEventListener("click", function() {
    if(window.innerWidth < 768) {
      this.setAttribute('disabled', 'disabled');
    }
  });
};
buttons.forEach(function(item) {
  disableButton(item);
});

let removeDisable = () => {
  buttons.forEach(function(item) {
    if(item.hasAttribute('disabled') && (window.innerWidth > 767)) {
      item.removeAttribute('disabled');
    }
  });
};
window.addEventListener("resize", removeDisable);