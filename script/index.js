const popupProfileElement = document.querySelector('.popup_profile');
const popupPlaceElement = document.querySelector('.popup_place');
const popupPicElement = document.querySelector('.popup_pic');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeProfileButton = popupProfileElement.querySelector('.popup__close-button_profile');
const closePlaceButton = popupPlaceElement.querySelector('.popup__close-button_place');
const closePopupButton = popupPicElement.querySelector('.popup__close-button_pic');
const formProfileElement = popupProfileElement.querySelector('.popup__window_profile');
const formPlaceElement = popupPlaceElement.querySelector('.popup__window_place');
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
const ESC_KEY = "Escape";
const overlayList = Array.from(document.querySelectorAll('.popup'));
const popupName = document.querySelector('.popup__text');

function handleEscKey (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const handleLikeButton = (event) => {
  event.currentTarget.classList.toggle('element__like_active');
}

const handleRemoveButton = (event) => {
  event.currentTarget.closest('.element').remove();
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscKey);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscKey);
}

elements.forEach(function(el) {
  addCardToContainer(section, createCard(el.link, el.name));
})

function openPlacePopup() {
  openPopup(popupPlaceElement);
}

function openProfilePopup () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  openPopup(popupProfileElement);
  clearError(popupProfileElement);
}

function formSubmitProfileHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value
  profileBio.textContent = jobInput.value
  closePopup(popupProfileElement);
  placeName.value = '';
  placeLink.value = '';
}

function createCard(srcValue, nameValue) {
  const newCardElement = cardTemplate.cloneNode(true);

  const newCardImg = newCardElement.querySelector('.element__img');
  newCardImg.src = srcValue;
  newCardImg.alt = nameValue;
  newCardImg.addEventListener('click', () => openPopupPic(srcValue, nameValue));

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
  closePopup(popupPlaceElement);
  formPlaceElement.reset();
  evt.submitter.disabled = true;
  evt.submitter.classList.add('popup__save-button_inactive');
}

function addCardToContainer(container, card) {
  container.prepend(card);
}

function openPopupPic(srcValue, nameValue) {  
  popupPic.src = srcValue;
  popupPic.alt = nameValue;
  popupName.textContent = nameValue;

  openPopup(popupPicElement);
}

// удаление пустого шаблона карточки из разметки
section.removeChild(cardTemplate);

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
  saveButton.classList.add('popup__save-button_inactive');
  saveButton.disabled = true;
}

formProfileElement.addEventListener('submit', formSubmitProfileHandler);
editButton.addEventListener('click', openProfilePopup);  
closeProfileButton.addEventListener('click', () => closePopup(popupProfileElement));
formPlaceElement.addEventListener('submit', handleCardRendering)
addButton.addEventListener('click', openPlacePopup);
closePlaceButton.addEventListener('click', () => closePopup(popupPlaceElement));
closePopupButton.addEventListener('click', () => closePopup(popupPicElement));

overlayList.forEach((overlay) => overlay.addEventListener('click', (event) => {
  const isClosest = event.target.closest('.popup__container');
  if (!isClosest) {
    closePopup(overlay);
  }
}));

enableValidation({
  formSelector: '.popup__window',
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__error',
  errorClass: 'popup__edit-error_active'
}); 