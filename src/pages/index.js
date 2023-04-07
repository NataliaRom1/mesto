import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithDelete from '../components/PopupWithDelete.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  initialCards,
  formValidationConfig,
  cardListSectionSelector,
  popupEditSelector,
  popupAddSelector,
  popupImgSelector,
  popupDeleteSelector,
  popupEditAvatarSelector,
  userNameSelector,
  userInfoSelector,
  userAvatarSelector
} from '../utils/data.js';
import {
  popupEditElement,
  popupAddElement,
  popupImgElement,
  popupEditOpenButtonElement,
  popupAddOpenButtonElement,
  avatarEditOpenButtonElement,
  popupDeleteOpenButtonElement,
  cardDeleteButtonElement,
  formEditElement,
  formAddElement,
  formEditAvatarElement,
  nameInput,
  descriptionInput,
  placeTitleInput,
  placeLinkInput,
  profileNameElement,
  profileDescriptionElement,
  cardContainerElement,
} from '../utils/constants.js';
let userId;


// Функция обновления данных в инпутах попапа профиля
// function updatePopupEditInputs(profileInfo) {
//   nameInput.value = profileInfo.name;
//   descriptionInput.value = profileInfo.info;
// }

// Функция открывает карточку 
function handleCardClick(name, link) {
  showCardPopup.open(name, link);
}

// Функция открывает попап удаления карточки
function handleTrashClick(cardId, cardElement) {
  deleteCardPopup.open(cardId, cardElement)
}

// Функция создания карточки
function createCard(placeInfo) {
  const card = new Card(placeInfo, userId, "#element-template", handleCardClick, handleTrashClick, handleLikeAdd, handleLikeDelete);
  const cardElement = card.generateCard();

  return cardElement;
}

// Функция добавления лайка
function handleLikeAdd(cardElement) {
  api.addLike(cardElement._cardId)
    .then((data) => {
      cardElement.toggleLike(data.likes);
    })
    .catch(err => console.log('Ошибка: ', err))
}

// Функция удаления лайка
function handleLikeDelete(cardElement) {
  api.removeLike(cardElement._cardId)
    .then((data) => {
      cardElement.toggleLike(data.likes);
    })
    .catch(err => console.log('Ошибка: ', err))
}


// Экземплятры классов валидаци
const validationProfile = new FormValidator(formValidationConfig, formEditElement);
validationProfile.enableValidation();
const validationCard = new FormValidator(formValidationConfig, formAddElement);
validationCard.enableValidation();
const validationAvatar = new FormValidator(formValidationConfig, formEditAvatarElement);
validationAvatar.enableValidation();


// Экземпляр класса управления данными профиля пользователя
const userInfo = new UserInfo({
  nameSelector: userNameSelector,
  infoSelector: userInfoSelector,
  avatarSelector: userAvatarSelector
});


// Экземпляр класса дабавления массива карточек
const cardsList = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    cardsList.addItem(createCard(item))
  }
},
  cardListSectionSelector
)


// Попапа редактирования профиля
const editProfilePopup = new PopupWithForm(
  popupEditSelector,
  {
    handleFormSubmit: (data) => {
      editProfilePopup.renderLoading(true);
      api.setUserInfo({
        name: data.name,
        about: data.info,
      })
        .then(() => {
          userInfo.setUserInfo({
            newName: data.name,
            newInfo: data.info,
          });
          editProfilePopup.close();
        })
        .catch(err => console.log('Ошибка: ', err))
        .finally(() => {
          editProfilePopup.renderLoading(false);
        })
    }
  });
editProfilePopup.setEventListeners();

popupEditOpenButtonElement.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  editProfilePopup.setInputValues(profileInfo);
  validationProfile.resetValidation();
  editProfilePopup.open();
});


// Попап добавления карточек
const addCardPopup = new PopupWithForm(
  popupAddSelector,
  {
    handleFormSubmit: (inputs) => {
      addCardPopup.renderLoading(true);
      api.addNewCard({
        name: inputs['place-name'],
        link: inputs['place-link']
      })
        .then((data) => {
          cardsList.addItem(createCard(data));
          addCardPopup.close();
        })
        .catch(err => console.log('Ошибка: ', err))
        .finally(() => {
          addCardPopup.renderLoading(false);
        })
    }
  }
);
addCardPopup.setEventListeners();

popupAddOpenButtonElement.addEventListener('click', () => {
  validationCard.resetValidation();
  addCardPopup.open();
})


// Попап с картинкой
const showCardPopup = new PopupWithImage(popupImgSelector);
showCardPopup.setEventListeners();


// Работа с сервером
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '1b89146d-38a1-46b2-8f80-71ac6c2466b0',
    'Content-Type': 'application/json',
  }
});


// Подтверждение удаления карточки из попапа
const deleteCardPopup = new PopupWithDelete(popupDeleteSelector,
  {
    handleFormSubmit: (cardId, cardElement) => {
      deleteCardPopup.renderLoading(true);
      api.deleteCard(cardId)
        .then(() => {
          cardElement.deleteCard();
          deleteCardPopup.close();
        })
        .catch(err => console.log('Ошибка: ', err))
        .finally(() => {
          deleteCardPopup.renderLoading(false);
        })
    }
  });

deleteCardPopup.setEventListeners();


// Экземпляр класса попапа редактирования аватарки профиля
const editAvatarPopup = new PopupWithForm(popupEditAvatarSelector, {
  handleFormSubmit: (data) => {
    editAvatarPopup.renderLoading(true);
    api.editAvatar({ avatar: data['avatar-link'] })
      .then((data) => {
        userInfo.setUserAvatar({ newAvatar: data.avatar });
        editAvatarPopup.close();

      })
      .catch(err => console.log('Ошибка: ', err))
      .finally(() => {
        editAvatarPopup.renderLoading(false);
      })
  }
});
editAvatarPopup.setEventListeners();

avatarEditOpenButtonElement.addEventListener('click', () => {
  validationAvatar.resetValidation();
  editAvatarPopup.open();
})


// Получение данных пользователя и начальных карточек с сервера вместе
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCardsData]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });
    cardsList.renderItems(initialCardsData);
  })
  .catch((err) => {
    console.log('Ошибка при получении данных юзера и карточек: ', err);
  })