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

function updatePopupEditInputs(profileInfo) {
  nameInput.value = profileInfo.name;
  descriptionInput.value = profileInfo.info;
}


const validationProfile = new FormValidator(formValidationConfig, formEditElement);
validationProfile.enableValidation();
const validationCard = new FormValidator(formValidationConfig, formAddElement);
validationCard.enableValidation();

const userInfo = new UserInfo({
  nameSelector: userNameSelector,
  infoSelector: userInfoSelector
});

// открывает карточку 
function handleCardClick(name, link) {
  showCardPopup.open(name, link);
}


function createCard(placeInfo) {
  const card = new Card(placeInfo, "#element-template", handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}


const cardsList = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    cardsList.addItem(createCard(item))
  }
},
  cardListSectionSelector
)
// отрисовка карточек
cardsList.renderItems();


const editProfilePopup = new Popup(popupEditSelector);
editProfilePopup.setEventListeners();

popupEditOpenButtonElement.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  updatePopupEditInputs(profileInfo);
  validationProfile.resetValidation();
  editProfilePopup.open();
});


const addCardPopup = new Popup(popupAddSelector);
addCardPopup.setEventListeners();

popupAddOpenButtonElement.addEventListener('click', () => {
  validationCard.resetValidation();
  addCardPopup.open();
})


const showCardPopup = new PopupWithImage(popupImgSelector);
showCardPopup.setEventListeners();


const editProfilePopupForm = new PopupWithForm(
  popupEditSelector,
  {
    handleFormSubmit: (data) => {
      userInfo.setUserInfo({
        newName: data.name,
        newInfo: data.description,
      })
    }
  });
editProfilePopupForm.setEventListeners();


const addCardPopupForm = new PopupWithForm(
  popupAddSelector,
  {
    handleFormSubmit: (inputs) => {
      cardsList.addItem(createCard(inputs));
    }
  }
);
addCardPopupForm.setEventListeners();

