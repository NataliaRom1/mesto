import Popup from "./Popup.js";

class PopupWithDelete extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.popup__form');
    this._popupBtnElement = this._popup.querySelector('.popup__button'); //Кнопка подверждения действия попапа
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardId, this._cardElement);
      this.close();
    })
  }

  // Открывает попап удаления
  open(cardId, cardElement) {
    this._cardElement = cardElement;
    this._cardId = cardId;

    super.open();
  }

  // Меняем текст кнопки в процессе удаления
  load(text) {
    this._popupBtnElement.textContent = text;
  }
}

export default PopupWithDelete;