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

function cardLike(event) {
  event.currentTarget.classList.toggle('element__like_active');
}

function cardRemove(event) {
  event.currentTarget.parentElement.remove();
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

elements.forEach(function(el) {
  section.append(createCard(el.link, el.name));
})

function openPopupProfile () {
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

  let newCardImg = newCardElement.querySelector('.element__img');
  newCardImg.src = srcValue;
  newCardImg.alt = nameValue;
  newCardImg.addEventListener('click', openPopupPic);

  let newCardName = newCardElement.querySelector('.element__name');
  newCardName.textContent = nameValue;

  let likeBtn = newCardElement.querySelector('.element__like');
  likeBtn.addEventListener('click', cardLike);

  let removeBtn = newCardElement.querySelector('.element__remove');
  removeBtn.addEventListener('click', cardRemove);

  return newCardElement;
}

function renderCard(evt) {
  evt.preventDefault();
  section.prepend(createCard(placeLink.value, placeName.value));
  placeName.value = '';
  placeLink.value = '';
  closePopup(popupPlaceElement);
}

function openPopupPic(event) {  
  popupPic.src = event.currentTarget.src;
  popupPic.alt = event.currentTarget.alt;

  let popupName = document.querySelector('.popup__text');
  let divElement = event.currentTarget.parentElement;
  const nameElement = divElement.querySelector('.element__name');
  popupName.textContent = nameElement.textContent;

  openPopup(popupPicElement);
}

section.removeChild(cardTemplate);

formProfileElement.addEventListener('submit', formSubmitProfileHandler);
editButton.addEventListener('click', openPopupProfile);  
closeProfileButton.addEventListener('click', () => closePopup(popupProfileElement));
formPlaceElement.addEventListener('submit', renderCard)
addButton.addEventListener('click', () => openPopup(popupPlaceElement));
closePlaceButton.addEventListener('click', () => closePopup(popupPlaceElement));
closePopupButton.addEventListener('click', () => closePopup(popupPicElement));