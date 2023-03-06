import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards, formValidationConfig } from './data.js';

const popupElementList = document.querySelectorAll('.popup');

const popupEditElement = document.querySelector('.popup-edit'); //имя попап
const popupAddElement = document.querySelector('.popup-add'); //карточка попап
const popupImgElement = document.querySelector('.popup-img'); //картинка попап

const popupCloseButtonElement = document.querySelectorAll('.popup__btn-close');
const popupEditCloseButtonElement = popupEditElement.querySelector('.popup__btn-close');
const popupAddCloseButtonElement = popupAddElement.querySelector('.popup__btn-close');
const popupImgCloseButtonElement = popupImgElement.querySelector('.popup__btn-close');

const popupImgPhotoElement = popupImgElement.querySelector('.popup-img__photo');
const popupImgTitleElement = popupImgElement.querySelector('.popup-img__title');

const popupEditOpenButtonElement = document.querySelector('.profile__btn-edit'); //открыть попап ред. профиля
const popupAddOpenButtonElement = document.querySelector('.profile__btn-add'); //открыть попап созд. карточки
const cardCreateButtonElement = document.querySelector('.popup__btn-create'); //кнопка создание карточки из попапа
const profileDataSaveButtonElement = document.querySelector('.popup__btn-save');//кнопка сохранени данных профиля пользователя

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


const validationProfile = new FormValidator(formValidationConfig, formEditElement);
const validationCard = new FormValidator(formValidationConfig, formAddElement);

// открыть попап
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  popup.classList.remove('popup_closed');

  popup.addEventListener('mousedown', closePopupByOverlayAndCross);
  document.addEventListener('keydown', closePopupByEscape);
}

function updatePopupEditInputs() {
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
  console.log(2)
}

function clearPopupAddInputs() {
  placeTitleInput.value = '';
  placeLinkInput.value = '';
}

// передать данные инпута попапа редактирования в профиль
const addData = function () {
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
}

// закрыть попап
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  popup.classList.add('popup_closed');

  popup.removeEventListener('mousedown', closePopupByOverlayAndCross);
  document.removeEventListener('keydown', closePopupByEscape);
}

function closePopupByOverlayAndCross(evt) {
  if (evt.target.classList.contains('popup_opened') ||
    evt.target.classList.contains('popup__btn-close')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
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

  cardContainerElement.prepend(createCard(placeInfo, "#element-template"));
  closePopup(popupAddElement);
  placeTitleInput.value = '';
  placeLinkInput.value = '';
};

function createCard(placeInfo, templateSelector) {
  const card = new Card(placeInfo, templateSelector);
  const cardElement = card.generateCard();

  return cardElement;
}

const renderCard = function (cardInfo) {
  cardContainerElement.append(createCard(cardInfo, "#element-template"));
}

// Перебираю массив
initialCards.forEach((item) => {
  renderCard(item);
});

popupEditOpenButtonElement.addEventListener('click', () => {
  const inputPopupEditList = Array.from(popupEditElement.querySelectorAll(formValidationConfig.inputSelector));
  updatePopupEditInputs();

  inputPopupEditList.forEach((inputElement) => {
    const formErrors = popupEditElement.querySelectorAll('.form__input-error');
    formErrors.forEach((formError) =>
      validationProfile.hideInputError(inputElement, formError)
    )
  });

  openPopup(popupEditElement);
  addData();
  validationProfile.turnOnButton(profileDataSaveButtonElement);
  validationProfile.enableValidation();

});


popupAddOpenButtonElement.addEventListener('click', () => {
  const inputPopupAddList = Array.from(popupAddElement.querySelectorAll(formValidationConfig.inputSelector));
  clearPopupAddInputs();

  inputPopupAddList.forEach((inputElement) => {
    const formErrors = popupAddElement.querySelectorAll('.form__input-error');
    formErrors.forEach((formError) =>
      validationCard.hideInputError(inputElement, formError)
    )
  });

  openPopup(popupAddElement);
  validationCard.turnOffButton(cardCreateButtonElement);
  validationCard.enableValidation();
})

formEditElement.addEventListener('submit', handleFormEditSubmit); //изменить профиль
formAddElement.addEventListener('submit', handleFormAddSubmit); //добавить карточку