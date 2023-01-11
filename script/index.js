const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__btn-close');
const popupOpenButtonElement = document.querySelector('.profile__btn-edit');
let formElement = popupElement.querySelector('.popup__form');
let popupSaveButtonElement = popupElement.querySelector('.popup__btn-save');
let nameInput = popupElement.querySelector('.popup__input_type_name');
let descriptionInput = popupElement.querySelector('.popup__input_type_description');
let profileNameElement = document.querySelector('.profile__name');
let profileDescriptionElement = document.querySelector('.profile__description');

const openPopup = function () {
  popupElement.classList.add('popup_active');
}
const closePopup = function () {
  popupElement.classList.remove('popup_active');
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = descriptionInput.value;
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit);
popupSaveButtonElement.addEventListener('click', closePopup);


