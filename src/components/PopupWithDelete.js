import Popup from "./Popup.js";

class PopupWithDelete extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.popup__form');
    this._submitBtn = this._popup.querySelector('.popup__button'); //Кнопка подверждения действия из попапа
    this._submitBtnText = this._submitBtn.textContent; // фиксируем начальный текст кнопки 1 раз в конструкторе
  }

  // Открывает попап удаления
  open(cardId, cardElement) {
    this._cardElement = cardElement;
    this._cardId = cardId;

    super.open();
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  // Меняем текст кнопки во время загрузки. Указываем 2 параметра (2й с текстом по умолчанию, чтобы не указывать лишний раз его)
  renderLoading(isLoading, loadingText = 'Удаление...') {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardId, this._cardElement);
    })
  }
}

export default PopupWithDelete;