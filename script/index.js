const popupProfileElement = document.querySelector('.popup__profile');
const popupPlaceElement = document.querySelector('.popup__place');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeProfileButton = popupProfileElement.querySelector('.popup__close-button_profile');
const closePlaceButton = popupPlaceElement.querySelector('.popup__close-button_place');
let formProfileElement = popupProfileElement.querySelector('.popup__window_profile');
let formPlaceElement = popupPlaceElement.querySelector('.popup__window_place')
let nameInput = formProfileElement.querySelector('.popup__edit_type_name');
let jobInput = formProfileElement.querySelector('.popup__edit_type_bio');
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');
// const ESC_KEY = "Escape";

const elements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// add cards to foto section
let section = document.querySelector('.elements');
let cardTemplate = section.querySelector('.element');
section.removeChild(cardTemplate);

elements.forEach(function(el) {
  const cardElement = cardTemplate.cloneNode(true);
  let cardImg = cardElement.querySelector('.element__img');
  cardImg.src = el.link;
  cardImg.alt = el.name;

  let cardName = cardElement.querySelector('.element__name');
  cardName.textContent = el.name;

  section.append(cardElement);
});

function openPopupProfile () {
  nameInput.value = profileName.textContent
  jobInput.value = profileBio.textContent
  popupProfileElement.classList.add('popup_opened');
  // document.addEventListener('keyup', onDocumentKeyUp);
}

function closeProfilePopup() {
  popupProfileElement.classList.remove('popup_opened');
  // document.removeEventListener('keyup', onDocumentKeyUp);
}

function formSubmitProfileHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value
  profileBio.textContent = jobInput.value
  closeProfilePopup();
}

// function onDocumentKeyUp (event) {
//   if(event.key === ESC_KEY) {
//     closePopup();
//   }
// }

formProfileElement.addEventListener('submit', formSubmitProfileHandler);
editButton.addEventListener('click', openPopupProfile);  
closeProfileButton.addEventListener('click', closeProfilePopup);


function openPopupPlace() {
  popupPlaceElement.classList.add('popup_opened');
}

function closePlacePopup() {
  popupPlaceElement.classList.remove('popup_opened');
}

function formSubmitPlaceHandler(evt) {
  // TODO add card
}

formPlaceElement.addEventListener('submit', formSubmitPlaceHandler)
addButton.addEventListener('click', openPopupPlace);
closePlaceButton.addEventListener('click', closePlacePopup);