const popupElement = document.querySelector('.popup');

const popupEditElement = document.querySelector('.popup-edit'); //имя попап
const popupAddElement = document.querySelector('.popup-add'); //карточка попап
const popupImgElement = document.querySelector('.popup-img'); //картинка попап

const popupCloseButtonElement = popupElement.querySelector('.popup__btn-close');
const popupEditCloseButtonElement = popupEditElement.querySelector('.popup__btn-close');
const popupAddCloseButtonElement = popupAddElement.querySelector('.popup__btn-close');
const popupImgCloseButtonElement = popupImgElement.querySelector('.popup__btn-close');

const popupImgPhotoElement = popupImgElement.querySelector('.popup-img__photo');
const popupImgTitleElement = popupImgElement.querySelector('.popup-img__title');

const popupEditOpenButtonElement = document.querySelector('.profile__btn-edit'); //изм
const popupAddOpenButtonElement = document.querySelector('.profile__btn-add'); //новый попап
const cardCreateButtonElement = document.querySelector('.popup__btn-create'); //кнопка создание карточки из попапа

const formElement = popupElement.querySelector('.popup__form');
const formEditElement = popupEditElement.querySelector('.popup__form-edit');
const formAddElement = popupAddElement.querySelector('.popup__form-add');

const nameInput = popupEditElement.querySelector('.popup__input_type_name');
const descriptionInput = popupEditElement.querySelector('.popup__input_type_description');
const placeTitleInput = popupAddElement.querySelector('.popup__input_type_place-name');
const placeLinkInput = popupAddElement.querySelector('.popup__input_type_place-link');

const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

const cardContainerElement = document.querySelector('.elements');
const cardTemplateElement = document.querySelector('#element-template');

// открыть попап
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  popup.classList.remove('popup_closed');
}

// передать данные инпута попапа редактирования в профиль
const addData = function () {
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
}

const removeData = function () {

}

// закрыть попап
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  popup.classList.add('popup_closed');
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormEditSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = descriptionInput.value;
  closePopup(popupEditElement);
}

//появление новой карточки с начала
const handleFormAddSubmit = (evt) => {
  evt.preventDefault();

  const placeTitle = placeTitleInput.value;
  const placeLink = placeLinkInput.value;

  const placeInfo = {};
  placeInfo.name = placeTitle;
  placeInfo.link = placeLink;

  cardContainerElement.prepend(createCard(placeInfo));
  closePopup(popupAddElement);
  placeTitleInput.value = '';
  placeLinkInput.value = '';
};

// создаю элемент
const createCard = function (cardInfo) {
  const cardElement = cardTemplateElement.content.querySelector('.element').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.element__img');
  const cardTitleElement = cardElement.querySelector('.element__heading');

  cardImageElement.src = cardInfo.link;
  cardImageElement.alt = cardInfo.name;
  cardTitleElement.textContent = cardInfo.name;

  // лайк
  const cardLikeElement = cardElement.querySelector('.element__icon');
  cardLikeElement.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__icon_active')
  });

  // удаление карточки по клику на корзину
  const cardDeleteButtonElement = cardElement.querySelector('.element__trash-img');
  cardDeleteButtonElement.addEventListener('click', () => {
    cardElement.remove();
  });

  // открывает карточку
  const openPopupImage = function (name, link) {
    popupImgPhotoElement.src = cardImageElement.src;
    popupImgPhotoElement.alt = cardImageElement.alt;
    popupImgTitleElement.textContent = cardTitleElement.textContent;
    openPopup(popupImgElement);
  }

  // открытие попапа с карточкой по клику на картинку
  cardImageElement.addEventListener('click', () => openPopupImage(cardInfo.name, cardInfo.link))

  return cardElement;
}

// функция добавляет данные на страницу с конца
const renderCard = function (cardInfo) {
  cardContainerElement.append(createCard(cardInfo));
}

//Перебираю массив
initialCards.forEach((item) => {
  renderCard(item);
});

popupEditOpenButtonElement.addEventListener('click', () => openPopup(popupEditElement), addData());
popupEditCloseButtonElement.addEventListener('click', () => closePopup(popupEditElement));

popupAddOpenButtonElement.addEventListener('click', () => openPopup(popupAddElement));
popupAddCloseButtonElement.addEventListener('click', () => closePopup(popupAddElement));

popupImgCloseButtonElement.addEventListener('click', () => closePopup(popupImgElement));

formEditElement.addEventListener('submit', handleFormEditSubmit); //изменить профиль
formAddElement.addEventListener('submit', handleFormAddSubmit); //добавить карточку


