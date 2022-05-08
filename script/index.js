import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { elements } from './cards.js';

const validationSettings = {
  formSelector: '.popup__window',
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__error',
  errorClass: 'popup__edit-error_active',
  editError: '.popup__edit-error'
}
const popupProfileElement = document.querySelector('.popup_profile');
const popupPlaceElement = document.querySelector('.popup_place');
const popupPicElement = document.querySelector('.popup_pic');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const formProfileElement = popupProfileElement.querySelector('.popup__window_profile');
const formPlaceElement = popupPlaceElement.querySelector('.popup__window_place');
const nameInput = formProfileElement.querySelector('.popup__edit_type_name');
const jobInput = formProfileElement.querySelector('.popup__edit_type_bio');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const placeName = formPlaceElement.querySelector('.popup__edit_type_place');
const placeLink = formPlaceElement.querySelector('.popup__edit_type_link');
const section = document.querySelector('.elements');
const popupPic = document.querySelector('.popup__image');
const overlayList = Array.from(document.querySelectorAll('.popup'));
const popupName = document.querySelector('.popup__text');
const closePopupButtons = Array.from(document.querySelectorAll('.popup__close-button'));
const profileValidation = new FormValidator(validationSettings, formProfileElement);
const newCardValidation = new FormValidator(validationSettings, formPlaceElement);

profileValidation.enableValidation();
newCardValidation.enableValidation();

function handleEscKey (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscKey);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscKey);
}

function openPlacePopup() {
  openPopup(popupPlaceElement);
}

function openProfilePopup () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  profileValidation.clearError();
  openPopup(popupProfileElement);
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value
  profileBio.textContent = jobInput.value
  closePopup(popupProfileElement);
}

function prependCardToContainer(container, card) {
  container.prepend(card);
}

function openPopupPic(srcValue, nameValue) {  
  popupPic.src = srcValue;
  popupPic.alt = nameValue;
  popupName.textContent = nameValue;

  openPopup(popupPicElement);
}

function generateCardTemplate(item) {
  const card = new Card(item, '.element__template', openPopupPic);
  const cardElement = card.generateCard();
  return cardElement;
}

function appendCardToContainer(container, card) {
  container.append(card);
}

function handleCardRendering(evt) {
  evt.preventDefault();
  const newData = {
    link: placeLink.value,
    name: placeName.value
  }
  
  prependCardToContainer(section, generateCardTemplate(newData));
  closePopup(popupPlaceElement);

  newCardValidation.disableSubmitButton(evt);
}

closePopupButtons.forEach((btn) => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
});

overlayList.forEach((overlay) => overlay.addEventListener('click', (event) => {
  const isClosest = event.target.closest('.popup__container');
  if (!isClosest) {
    closePopup(overlay);
  }
}));

elements.forEach((item) => {
  appendCardToContainer(section, generateCardTemplate(item));
});

formProfileElement.addEventListener('submit', handleProfileFormSubmit);
editButton.addEventListener('click', openProfilePopup);  
formPlaceElement.addEventListener('submit', handleCardRendering)
addButton.addEventListener('click', openPlacePopup);