class Card {
  constructor(cardInfo, templateSelector, handleCardClick) {
    this._name = cardInfo.name;
    this._link = cardInfo.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  // Получение шаблона карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  // Создание карточки
  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImageElement = this._cardElement.querySelector('.element__img');
    this._cardTitleElement = this._cardElement.querySelector('.element__heading');

    this._setEventListeners();

    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTitleElement.textContent = this._name;

    return this._cardElement;
  }

  // Поставить/снять лайк
  _toggleLike() {
    this._cardLikeElement.classList.toggle('element__icon_active')
  }

  // Удаление карточки по клику на корзину
  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
    this._cardLikeElement = null;
    this._cardDeleteButtonElement = null;
  }

  // Открытие попапа с картинкой по клику на картинку
  _handleClickByImage() {
    this._handleCardClick(this._name, this._link);
  }

  // Установка слушателей на события
  _setEventListeners() {
    this._cardLikeElement = this._cardElement.querySelector('.element__icon'); //Лайк
    this._cardDeleteButtonElement = this._cardElement.querySelector('.element__trash-img'); //Корзина

    this._cardLikeElement.addEventListener('click', () => this._toggleLike());
    this._cardDeleteButtonElement.addEventListener('click', () => this._deleteCard());
    this._cardImageElement.addEventListener('click', () => this._handleClickByImage())
  }
}

export default Card;