// Отвечает за открытие и закрытие попапа
class Popup {
  constructor(popupSelector) {
    // Принимает в конструктор единственный параметр — селектор попапа.
    this._popupSelector = document.querySelector(`.${popupSelector}`);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._handleOverlayAndCrossClose = this._handleOverlayAndCrossClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    this._popupSelector.classList.remove('popup_closed');

    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    this._popupSelector.classList.add('popup_closed');

    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Содержит логику закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      // this.openedPopup = document.querySelector('.popup_opened');
      this.close(this.__popupSelector);
    }
  }

  // Содержит логику закрытия попапа клавишей кликом по оверлею и крестику
  _handleOverlayAndCrossClose(evt) {
    if (evt.target.classList.contains('popup_opened') ||
      evt.target.classList.contains('popup__btn-close')) {
      this._openedPopup = document.querySelector('.popup_opened');
      this.close();
    }
  }

  // Добавляет слушатель клика по крестику и оверлею
  setEventListeners() {
    this._popupSelector.addEventListener('click', this._handleOverlayAndCrossClose)
    this._popupSelector.addEventListener('mousedown', this._handleOverlayAndCrossClose);
  }
}

export default Popup;