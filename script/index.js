const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');
let formElement = popupElement.querySelector('.popup__window')
let nameInput = formElement.querySelector('.popup__edit_type_name');
let jobInput = formElement.querySelector('.popup__edit_type_bio');
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

function openPopup () {
  nameInput.value = profileName.textContent
  jobInput.value = profileBio.textContent
  popupElement.classList.add('popup_opened');
  // document.addEventListener('keyup', onDocumentKeyUp);
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
  // document.removeEventListener('keyup', onDocumentKeyUp);
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value
  profileBio.textContent = jobInput.value
  closePopup();
}

// function onDocumentKeyUp (event) {
//   if(event.key === ESC_KEY) {
//     closePopup();
//   }
// }

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);  
closeButton.addEventListener('click', closePopup);