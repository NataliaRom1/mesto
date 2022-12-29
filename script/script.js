const popupElement = document.querySelector('.pop-up');
const popupCloseButtonElement = popupElement.querySelector('.pop-up__btn-close');
const popupOpenButtonElement = document.querySelector('.profile__btn-edit');

const openPopup = function () {
  popupElement.classList.add('pop-up__opened');
}
const closePopup = function () {
  popupElement.classList.remove('pop-up__opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);


let formElement = popupElement.querySelector('.pop-up__btn-save');
let nameInput = popupElement.querySelector('.pop-up__name');
let jobInput = popupElement.querySelector('.pop-up__description');
let profileNameElement = document.querySelector('.profile__info_name');
let profileDescriptionElement = document.querySelector('.profile__info_description');

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileNameElement.textContent = nameInput.value;
  profileDescriptionElement.textContent = jobInput.value;
}

formElement.addEventListener('click', handleFormSubmit);
formElement.addEventListener('submit', handleFormSubmit);


