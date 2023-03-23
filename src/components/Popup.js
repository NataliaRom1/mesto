// Отвечает за открытие и закрытие попапа
class Popup {
  // Принимает в конструктор единственный параметр — селектор попапа.
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._handleOverlayAndCrossClose = this._handleOverlayAndCrossClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._popup.classList.remove('popup_closed');

    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._popup.classList.add('popup_closed');

    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Содержит логику закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close(this.__popupSelector);
    }
  }

  // Содержит логику закрытия попапа клавишей кликом по оверлею и крестику
  _handleOverlayAndCrossClose(evt) {
    if (evt.target.classList.contains('popup_opened') ||
      evt.target.classList.contains('popup__btn-close')) {
      this.close();
    }
  }

  // Добавляет слушатель клика по крестику и оверлею
  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleOverlayAndCrossClose);
  }
}

export default Popup;