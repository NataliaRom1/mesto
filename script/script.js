const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__btn-close');
const popupOpenButtonElement = document.querySelector('.profile__btn-edit');

const openPopup = function () {
  popupElement.classList.add('popup__opened');
}
const closePopup = function () {
  popupElement.classList.remove('popup__opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);


let formElement = popupElement.querySelector('.popup__btn-save');
let nameInput = popupElement.querySelector('.popup__name');
let jobInput = popupElement.querySelector('.popup__description');
let profileNameElement = document.querySelector('.profile__name');
let profileDescriptionElement = document.querySelector('.profile__description');

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = jobInput.value;
}

formElement.addEventListener('click', handleFormSubmit);
formElement.addEventListener('submit', handleFormSubmit);


