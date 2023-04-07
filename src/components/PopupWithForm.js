import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._submitBtn = this._popup.querySelector('.popup__button'); // Кнопка подверждения действия из попапа
    this._submitBtnText = this._submitBtn.textContent; // фиксируем начальный текст кнопки 1 раз в конструкторе
  }

  //  Cобирает данные всех полей формы
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      // console.log(data[input.info])
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  // Метод, который будет вставляет данные в инпуты
  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  close() {
    this._formElement.reset();
    super.close();
  }

   // Меняем текст кнопки во время загрузки. Указываем 2 параметра (2й с текстом по умолчанию, чтобы не указывать лишний раз его)
  renderLoading(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }
}

export default PopupWithForm;