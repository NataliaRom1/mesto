class Card {
  constructor(cardInfo, myId, templateSelector, handleCardClick, handleTrashClick, handleLikeAdd, handleLikeDelete) {
    this._name = cardInfo.name;
    this._link = cardInfo.link;
    this._likes = cardInfo.likes;

    this._cardId = cardInfo._id;
    this._userId = cardInfo.owner._id;
    this._myId = myId;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeAdd = handleLikeAdd;
    this._handleLikeDelete = handleLikeDelete;
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
    this._likesNumElement = this._cardElement.querySelector('.element__likes-num');

    this._setEventListeners();
    this._isCardLiked();

    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTitleElement.textContent = this._name;

    this._likesNumElement.textContent = this._likes.length;

    return this._cardElement;
  }

  // Поставить/снять лайк
  toggleLike(data) {
    this._likesNumElement.textContent = data.length;
    this._cardLikeElement.classList.toggle('element__icon_active');
  }

  // Проверка, пользователь ли поставил лайк
  _isCardLiked() {
    if (this._likes.some((elem) => elem._id === this._myId)) {
      this._cardLikeElement.classList.add('element__icon_active');
    }
  }

  // Удаление карточки по клику на корзину
  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
    this._cardLikeElement = null;
    this._cardDeleteButtonElement = null;
  }

  // Открытие попапа с картинкой по клику на картинку
  _handleClickByImage() {
    this._handleCardClick(this._name, this._link);
  }

  // Открытие попапа удаления картинки по клику на корзину
  _handleDeleteCard() {
    this._handleTrashClick(this._cardId, this);
  }

  // Установка слушателей на события
  _setEventListeners() {
    this._cardLikeElement = this._cardElement.querySelector('.element__icon'); //Лайк
    this._cardDeleteButtonElement = this._cardElement.querySelector('.element__trash-img'); //Корзина
    this._approveDeleteButtonElement = document.querySelectorAll('.popup__btn-delete') //кнопка подтверждения удаления каточки из попапа

    // Если каточка создана пользователем, то ее можно удалить
    if (this._userId === this._myId) {
      this._cardDeleteButtonElement.addEventListener('click', () => this._handleDeleteCard());
    } else {
      this._cardDeleteButtonElement.remove();
    }

    // Клик по лайку
    this._cardLikeElement.addEventListener('click', () => {
      if (!this._cardLikeElement.classList.contains('element__icon_active')) {
        this._handleLikeAdd(this);
      } else {
        this._handleLikeDelete(this);
      }
    });

    this._cardImageElement.addEventListener('click', () => this._handleClickByImage()) //Клик по картинке
  }
}

export default Card;