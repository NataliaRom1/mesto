import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js'
import {
  initialCards,
  formValidationConfig,
  cardListSectionSelector,
  popupEditSelector,
  popupAddSelector,
  popupImgSelector,
  userNameSelector,
  userInfoSelector
} from '../utils/data.js';
import {
  popupEditElement,
  popupAddElement,
  popupImgElement,
  popupEditOpenButtonElement,
  popupAddOpenButtonElement,
  formEditElement,
  formAddElement,
  nameInput,
  descriptionInput,
  placeTitleInput,
  placeLinkInput,
  profileNameElement,
  profileDescriptionElement,
  cardContainerElement
} from '../utils/constants.js';


const validationProfile = new FormValidator(formValidationConfig, formEditElement);
validationProfile.enableValidation();
const validationCard = new FormValidator(formValidationConfig, formAddElement);
validationCard.enableValidation();


function updatePopupEditInputs() {
  nameInput.value = profileNameElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
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

// открывает карточку 
function handleCardClick(name, link) {
  showCardPopup.open(name, link);
}


function createCard(placeInfo, templateSelector) {
  const card = new Card(placeInfo, templateSelector, handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}


const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, "#element-template", handleCardClick);
    const cardElement = card.generateCard();

    cardsList.addItem(cardElement)
  }
},
  cardListSectionSelector
)
// отрисовка карточек
cardsList.renderItems();


const editProfilePopup = new Popup(popupEditSelector);
editProfilePopup.setEventListeners();

popupEditOpenButtonElement.addEventListener('click', () => {
  updatePopupEditInputs();
  validationProfile.resetValidation();
  editProfilePopup.open();
  addData();
});


const addCardPopup = new Popup(popupAddSelector);
addCardPopup.setEventListeners();

popupAddOpenButtonElement.addEventListener('click', () => {
  clearPopupAddInputs();
  validationCard.resetValidation();
  addCardPopup.open();
})


const showCardPopup = new PopupWithImage(popupImgSelector);
showCardPopup.setEventListeners();


const editProfilePopupForm = new PopupWithForm(
  popupEditSelector,
  {
    handleFormSubmit: () => {
      profileNameElement.textContent = nameInput.value;
      profileDescriptionElement.textContent = descriptionInput.value;
    }
  });
editProfilePopupForm.setEventListeners();


const addCardPopupForm = new PopupWithForm(
  popupAddSelector,
  {
    handleFormSubmit: () => {
      const placeTitle = placeTitleInput.value;
      const placeLink = placeLinkInput.value;

      const placeInfo = {};
      placeInfo.name = placeTitle;
      placeInfo.link = placeLink;

      cardContainerElement.prepend(createCard(placeInfo, "#element-template", handleCardClick));
    }
  }
);
addCardPopupForm.setEventListeners();

const userInfo = new UserInfo({ userNameSelector, userInfoSelector });