import Popup from "./Popup.js";

// Класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open. В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImgPhotoElement = document.querySelector(`${popupSelector}` + `__photo`);
    this._popupImgTitleElement = document.querySelector(`${popupSelector}` + `__title`);
  }

  // Вставляет в попап картинку с src изображения и подписью к картинке и открывает его
  open(name, link) {
    this._popupImgPhotoElement.src = link;
    this._popupImgPhotoElement.alt = name;
    this._popupImgTitleElement.textContent = name;

    super.open();
  }
}

export default PopupWithImage;
