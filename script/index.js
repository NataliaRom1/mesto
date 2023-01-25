const popupElement = document.querySelector('.popup');

const popupEditElement = document.querySelector('.popup__edit'); //имя попап
const popupAddElement = document.querySelector('.popup__add'); //карточка попап
const popupImgElement = document.querySelector('.popup__img'); //картинка попап


const popupCloseButtonElement = popupElement.querySelector('.popup__btn-close');
const popupEditCloseButtonElement = popupEditElement.querySelector('.popup__btn-close'); //новый попап
const popupAddCloseButtonElement = popupAddElement.querySelector('.popup__btn-close'); //новый попап
const popupImgCloseButtonElement = popupImgElement.querySelector('.popup__btn-close'); //новый попап

const popupEditOpenButtonElement = document.querySelector('.profile__btn-edit'); //изм
const popupAddOpenButtonElement = document.querySelector('.profile__btn-add'); //новый попап
const cardCreateButtonElement = document.querySelector('.popup__btn-create'); //кнопка создание карточки из попапа

let formElement = popupElement.querySelector('.popup__form');
let formEditElement = popupEditElement.querySelector('.popup__form-edit');
let formAddElement = popupAddElement.querySelector('.popup__form-add');

let nameInput = popupEditElement.querySelector('.popup__input_type_name');
let descriptionInput = popupEditElement.querySelector('.popup__input_type_description');
const placeTitleInput = popupAddElement.querySelector('.popup__input_type_place-name');
const placeLinkInput = popupAddElement.querySelector('.popup__input_type_place-link');

let profileNameElement = document.querySelector('.profile__name');
let profileDescriptionElement = document.querySelector('.profile__description');

const cardContainerElement = document.querySelector('.elements');
const cardTemplateElement = document.querySelector('#element-template');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// открыть попап
const openPopup = function (popup) {
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
  popup.classList.add('popup_opened');
  popup.classList.remove('popup_closed');
}

// закрыть попап
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  popup.classList.add('popup_closed');
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = descriptionInput.value;
  closePopup(popupEditElement);
}

//появление новой карточки с начала
const formAddSubmitHandler = (evt) => {
  evt.preventDefault();

  const placeTitle = placeTitleInput.value;
  const placeLink = placeLinkInput.value;

  let placeInfo = {};
  placeInfo.name = placeTitle;
  placeInfo.link = placeLink;

  cardContainerElement.prepend(createCard(placeInfo));
  closePopup(popupAddElement);
};

// создаю элемент
const createCard = function (cardInfo) {
  const cardElement = cardTemplateElement.content.querySelector('.element').cloneNode(true);
  let cardImageElement = cardElement.querySelector('.element__img');
  let cardTitleElement = cardElement.querySelector('.element__heading');

  cardImageElement.src = cardInfo.link;
  cardImageElement.alt = cardInfo.name;
  cardTitleElement.textContent = cardInfo.name;

  // лайк
  cardElement.querySelector('.element__icon').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__icon_active')
  });

  // удаление карточки по клику на корзину
  const cardDeleteButtonElement = cardElement.querySelector('.element__trash-img');
  cardDeleteButtonElement.addEventListener('click', () => {
    cardElement.remove();
  });

  // открытие попапа с карточкой по клику на картинку
  cardImageElement.addEventListener('click', function (evt) {
    openPopup(popupImgElement);
    popupImgElement.querySelector('.popup__img_photo').src = cardImageElement.src;
    popupImgElement.querySelector('.popup__img_photo').alt = cardImageElement.alt;
    popupImgElement.querySelector('.popup__img_title').textContent = cardTitleElement.textContent;
  });

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

popupEditOpenButtonElement.addEventListener('click', () => openPopup(popupEditElement));
popupEditCloseButtonElement.addEventListener('click', () => closePopup(popupEditElement));

popupAddOpenButtonElement.addEventListener('click', () => openPopup(popupAddElement));
popupAddCloseButtonElement.addEventListener('click', () => closePopup(popupAddElement));

popupImgCloseButtonElement.addEventListener('click', () => closePopup(popupImgElement));

formEditElement.addEventListener('submit', handleFormSubmit); //изменить профиль
formAddElement.addEventListener('submit', formAddSubmitHandler); //добавить карточку


