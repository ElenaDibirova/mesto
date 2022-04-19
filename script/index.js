const popupProfileElement = document.querySelector('.popup_profile');
const popupPlaceElement = document.querySelector('.popup_place');
const popupPicElement = document.querySelector('.popup_pic');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeProfileButton = popupProfileElement.querySelector('.popup__close-button_profile');
const closePlaceButton = popupPlaceElement.querySelector('.popup__close-button_place');
const closePopupButton = popupPicElement.querySelector('.popup__close-button_pic');
const formProfileElement = popupProfileElement.querySelector('.popup__window_profile');
const formPlaceElement = popupPlaceElement.querySelector('.popup__window_place')
const nameInput = formProfileElement.querySelector('.popup__edit_type_name');
const jobInput = formProfileElement.querySelector('.popup__edit_type_bio');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const placeName = formPlaceElement.querySelector('.popup__edit_type_place');
const placeLink = formPlaceElement.querySelector('.popup__edit_type_link');
const section = document.querySelector('.elements');
const cardTemplate = section.querySelector('.element');
const popupPic = document.querySelector('.popup__image');
const saveButton = document.querySelector('.popup__save-button');

const handleLikeButton = (event) => {
  event.currentTarget.classList.toggle('element__like_active');
}

const handleRemoveButton = (event) => {
  event.currentTarget.closest('.element').remove();
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  clearError(popup);
}

elements.forEach(function(el) {
  addCardToContainer(section, createCard(el.link, el.name));
})

function openPlacePopup() {
  placeName.value = '';
  placeLink.value = '';
  openPopup(popupPlaceElement);
}

function openProfilePopup () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  openPopup(popupProfileElement);
}

function formSubmitProfileHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value
  profileBio.textContent = jobInput.value
  closePopup(popupProfileElement);
}

function createCard(srcValue, nameValue) {
  const newCardElement = cardTemplate.cloneNode(true);

  const newCardImg = newCardElement.querySelector('.element__img');
  newCardImg.src = srcValue;
  newCardImg.alt = nameValue;
  newCardImg.addEventListener('click', openPopupPic);

  const newCardName = newCardElement.querySelector('.element__name');
  newCardName.textContent = nameValue;

  const likeBtn = newCardElement.querySelector('.element__like');
  likeBtn.addEventListener('click', handleLikeButton);

  const removeBtn = newCardElement.querySelector('.element__remove');
  removeBtn.addEventListener('click', handleRemoveButton);

  return newCardElement;
}

function handleCardRendering(evt) {
  evt.preventDefault();
  addCardToContainer(section, createCard(placeLink.value, placeName.value));
  placeName.value = '';
  placeLink.value = '';
  closePopup(popupPlaceElement);
}

function addCardToContainer(container, card) {
  container.prepend(card);
}

function openPopupPic(event) {  
  popupPic.src = event.currentTarget.src;
  popupPic.alt = event.currentTarget.alt;

  const popupName = document.querySelector('.popup__text');
  const divElement = event.currentTarget.closest('.element');
  const nameElement = divElement.querySelector('.element__name');
  popupName.textContent = nameElement.textContent;

  openPopup(popupPicElement);
}

section.removeChild(cardTemplate);

const showInputError = (form, input, errorMessage) => {
  const errorSpan = form.querySelector(`.${input.id}-error`);
  input.classList.add('popup__error');
  errorSpan.textContent = errorMessage;
  errorSpan.classList.add('popup__edit-error_active');
};

const hideInputError = (form, input) => {
  const errorSpan = form.querySelector(`.${input.id}-error`);
  input.classList.remove('popup__error');
  errorSpan.classList.remove('popup__edit-error_active');
  errorSpan.textContent = '';
};

const clearError = (popup) => {
  const inputList = Array.from(popup.querySelectorAll('.popup__edit'));
  const errorSpanList = Array.from(popup.querySelectorAll('.popup__edit-error'));

  inputList.forEach((input) => {
    input.classList.remove('popup__error');
  });

  errorSpanList.forEach((errorSpan) => {
    errorSpan.classList.add('popup__edit-error_active');
    errorSpan.textContent = '';
  });
  const saveButton = popup.querySelector('.popup__save-button');
  saveButton.classList.remove('popup__save-button_inactive');
}

const isValid = (form, input) => {
  const saveButton = form.querySelector('.popup__save-button');
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
    saveButton.classList.add('popup__save-button_inactive');
    saveButton.disabled = true;
  } else {
    hideInputError(form, input);
    if (isAllInputValid(form)) {
      saveButton.classList.remove('popup__save-button_inactive');
      saveButton.disabled = false;
    }
  }
};

const isAllInputValid = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__edit'));
  return inputList.every((input) => input.validity.valid);
}  
 
const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__edit'));

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input)
    });
  });
}; 

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__window'));

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
};

formProfileElement.addEventListener('submit', formSubmitProfileHandler);
editButton.addEventListener('click', openProfilePopup);  
closeProfileButton.addEventListener('click', () => closePopup(popupProfileElement));
formPlaceElement.addEventListener('submit', handleCardRendering)
addButton.addEventListener('click', openPlacePopup);
closePlaceButton.addEventListener('click', () => closePopup(popupPlaceElement));
closePopupButton.addEventListener('click', () => closePopup(popupPicElement));
formProfileElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

enableValidation();