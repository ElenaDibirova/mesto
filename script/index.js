const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');

let formElement = popupElement.querySelector('.popup__window')
let nameInput = formElement.querySelector('.popup__name-edit');
let jobInput = formElement.querySelector('.popup__bio-edit');

function openPopup () {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);

  nameInput.value = document.querySelector('.profile__name').textContent
  jobInput.value = document.querySelector('.profile__bio').textContent
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keyup', onDocumentKeyUp);
}

function onDocumentKeyUp (event) {
  if(event.key === ESC_KEY) {
    closePopup();
  }
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

const ESC_KEY = "Escape";

function formSubmitHandler (evt) {
  evt.preventDefault();

  document.querySelector('.profile__name').textContent = nameInput.value
  document.querySelector('.profile__bio').textContent = jobInput.value
  
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);