'use strict';

(function () {
  const button = document.querySelectorAll(".accordion__btn");
  const accordion = document.querySelectorAll(".accordion");
  const pageFooterAccordion = document.querySelector(".page-footer__wrapper-site");

  pageFooterAccordion.classList.remove("page-footer--nojs-accordion");

  var showPane = function (evt) {
    let target = evt.target;
    let parent = target.closest(".accordion");

    if (parent.classList.contains("accordion--opened")) {
      parent.classList.remove("accordion--opened");
    } else {
      for(let i = 0; i < accordion.length; i++) {
        accordion[i].classList.remove("accordion--opened");
      }

      parent.classList.add("accordion--opened");
    }
  };

  button.forEach(function(elem) {
    elem.addEventListener("click", function(evt) {
      showPane(evt);
    });
  });
})();

'use strict';

(function () {
  const body = document.querySelector("body");
  const modalOpen = document.querySelector(".page-header__btn");
  const modal = document.querySelector(".modal");
  const modalClose = modal.querySelector(".modal__close");
  const modalPlug = document.querySelector(".modal-plug");
  const inputName = modal.querySelector("input[name='name']");

  const onPopupEscPress = function (evt) {
    if (evt.key === "Escape") {
      evt.preventDefault();
      closePopup();
    }
  };

  const openPopup = function () {
    modal.classList.remove("hidden");
    modalPlug.classList.remove("hidden");
    body.classList.add("modal-open");
    inputName.focus();

    document.addEventListener("keydown", onPopupEscPress);
  };

  const closePopup = function () {
    modal.classList.add("hidden");
    modalPlug.classList.add("hidden");
    body.classList.remove("modal-open");

    document.removeEventListener("keydown", onPopupEscPress);
  };

  modalOpen.addEventListener("click", function () {
    openPopup();
  });

  modalOpen.addEventListener("keydown", function (evt) {
    if (evt.key === "Enter") {
      openPopup();
    }
  });

  modalClose.addEventListener("click", function () {
    closePopup();
  });

  modalClose.addEventListener("keydown", function (evt) {
    if (evt.key === "Enter") {
      closePopup();
    }
  });

  modalPlug.addEventListener("click", function () {
    closePopup();
  });
})();

'use strict';

(function () {
  const form = document.querySelector(".feedback__form");
  const formFileds = form.elements;
  const submitBtn = form.querySelector(".feedback__btn");

  const changeHandler = function () {
    if (this.type !== "checkbox") {
      localStorage.setItem(this.name, this.value);
      console.log(this.name, this.value)
    } else {
      localStorage.setItem(this.name, this.checked);
      console.log(this.name, this.checked)
    }
  };

  const attachEvents = function () {
    for (let i = 0; i < formFileds.length; i++) {
      formFileds[i].addEventListener("change", changeHandler);
    }
  };

  const checkStorage = function () {
    for (let i = 0; i < formFileds.length; i++) {
      if (formFileds[i].type !== "submit") {
        if (formFileds[i].type === "checked") {
          formFileds[i].checked = localStorage.getItem(formFileds[i].name);
        } else {
          formFileds[i].value = localStorage.getItem(formFileds[i].name)
        }
      }
    }

    attachEvents();
  };

  checkStorage();

  const clearStorage = function () {
    localStorage.clear();
  };

  submitBtn.addEventListener("click", clearStorage);
})();

'use strict';

(function () {
  const phoneInputs = document.querySelectorAll("input[data-tel-input]");

  const getInputNumbersValue = function (input) {
    return input.value.replace(/\D/g, '');
  }

  const onPhonePaste = function (evt) {
    let input = evt.target,
        inputNumbersValue = getInputNumbersValue(input);

    let pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      let pastedText = pasted.getData("Text");
        if (/\D/g.test(pastedText)) {
          input.value = inputNumbersValue;
          return;
        }
    }
  }

  const onPhoneInput = function (e) {
    let input = e.target,
        inputNumbersValue = getInputNumbersValue(input),
        selectionStart = input.selectionStart,
        formattedInputValue = "";

    if (!inputNumbersValue) {
      return input.value = "";
    }

    if (input.value.length != selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;

      let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
      formattedInputValue = input.value = firstSymbols + " ";

      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
      }
    }

    input.value = formattedInputValue;
  }

  const onPhoneKeyDown = function (e) {
    let inputValue = e.target.value.replace(/\D/g, '');
    if (e.keyCode == 8 && inputValue.length == 1) {
        e.target.value = "";
    }
  }

  for (let phoneInput of phoneInputs) {
    phoneInput.addEventListener("keydown", onPhoneKeyDown);
    phoneInput.addEventListener("input", onPhoneInput, false);
    phoneInput.addEventListener("paste", onPhonePaste, false);
  }
})();
