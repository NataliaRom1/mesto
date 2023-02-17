const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector)); //form

  formList.forEach((formElement) => {
    addInputListeners(formElement, config);

    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    formElement.addEventListener('input', function (evt) {
      toggleButton(formElement, config);
    })
  });
}

function checkInputValidity(evt, config) {
  const inputElement = evt.target;
  const inputElementId = inputElement.id;
  const formError = document.querySelector(`#${inputElementId}-error`);

  if (!inputElement.validity.valid) {
    showInputError(config, inputElement, formError);
  } else {
    hideInputError(config, inputElement, formError);
  }
}

function showInputError(config, inputElement, formError) {
  inputElement.classList.add(config.inputErrorClass); //подчеркивание
  formError.classList.add(config.errorClass); //текст ошибки стиль
  formError.textContent = inputElement.validationMessage; //текст ошибки
};

function hideInputError(config, inputElement, formError) {
  inputElement.classList.remove(config.inputErrorClass);
  formError.classList.remove(config.errorClass);
  formError.textContent = '';
};

// проверка, есть ли невалидный инпут
function hasInvalidInput(formElement) {
  const isFormValid = formElement.checkValidity();
  return !isFormValid;
}

function turnOffButton(buttonSubmit, config) {
  buttonSubmit.classList.add(config.inactiveButtonClass);
  buttonSubmit.disabled = true;
}

function turnOnButton(buttonSubmit, config) {
  buttonSubmit.classList.remove(config.inactiveButtonClass);
  buttonSubmit.disabled = false;
}

// активирует/деактивирует кнопки
function toggleButton(formElement, config) {
  const buttonSubmit = formElement.querySelector(config.submitButtonSelector);

  if (hasInvalidInput(formElement)) {
    // сделай кнопку неактивной
    turnOffButton(buttonSubmit, config);
  } else {
    // иначе сделай кнопку активной
    turnOnButton(buttonSubmit, config)
  }


}

// добавляет слушателей на инпуты
function addInputListeners(formList, config) {
  const inputList = Array.from(document.querySelectorAll(config.inputSelector));

  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(evt, config);
      toggleButton(formList, config);
    });
  });
}

enableValidation(formValidationConfig);