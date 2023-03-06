class FormValidator {
  constructor(formValidationConfig, formElement) {
    this._formSelector = formValidationConfig.formSelector;
    this._inputSelector = formValidationConfig.inputSelector;
    this._submitButtonSelector = formValidationConfig.submitButtonSelector;
    this._inactiveButtonClass = formValidationConfig.inactiveButtonClass;
    this._inputErrorClass = formValidationConfig.inputErrorClass;
    this._errorClass = formValidationConfig.errorClass;

    this._formElement = formElement;
    this._buttonSubmit = this._formElement.querySelector(this._submitButtonSelector);
  }

  // Получение формы
  _getFormList() {
    const formList = Array.from(document.querySelectorAll(this._formSelector)); //form
    return formList;
  }

  enableValidation() {
    this._addInputListeners();
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  }

  // Проверка валидности полей ввода
  _checkInputValidity(inputElement) {
    const inputElementId = inputElement.id;
    const formError = document.querySelector(`#${inputElementId}-error`);

    if (!inputElement.validity.valid) {
      this.showInputError(inputElement, formError);
    } else {
      this.hideInputError(inputElement, formError);
    }
  }

  // Показ ошибки
  showInputError(inputElement, formError) {
    inputElement.classList.add(this._inputErrorClass); //подчеркивание
    formError.classList.add(this._errorClass); //текст ошибки стиль
    formError.textContent = inputElement.validationMessage; //текст ошибки
  };

  // Скрытие ошибки
  hideInputError(inputElement, formError) {
    inputElement.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorClass);
    formError.textContent = '';
  };

  // Проверка, есть ли невалидный инпут
  _hasInvalidInput() {
    const isFormValid = this._formElement.checkValidity();
    return !isFormValid;
  }

  // Отключить кнопки
  turnOffButton() {
    this._buttonSubmit.classList.add(this._inactiveButtonClass);
    this._buttonSubmit.disabled = true;
  }

  // Активировать кнопки
  turnOnButton() {
    this._buttonSubmit.classList.remove(this._inactiveButtonClass);
    this._buttonSubmit.disabled = false;

  }

  _toggleButton() {
    if (this._hasInvalidInput(this._formElement)) {
      // сделай кнопку неактивной
      this.turnOffButton();
    } else {
      // иначе сделай кнопку активной
      this.turnOnButton()
    }
  }

  _addInputListeners() {
    this._inputList = this._formElement.querySelectorAll(this._inputSelector);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButton();
      });
    });
  }
}

export default FormValidator;