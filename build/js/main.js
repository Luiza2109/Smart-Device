'use strict';

(function () {
  const button = document.querySelectorAll(".accordion__btn");

  var showPane = function (evt) {
    let target = evt.target;
    let parent = target.parentElement;

    if (parent.classList.contains("accordion--closed")) {
      parent.classList.remove("accordion--closed");
      target.classList.add("accordion__btn--open");
      parent.classList.add("accordion--opened");
    } else {
      parent.classList.add("accordion--closed");
      target.classList.remove("accordion__btn--open");
      parent.classList.remove("accordion--opened");
    }
  };

  button.forEach(function(elem) {
    elem.addEventListener("click", function(evt) {
      showPane(evt);
    });
  });
})();
