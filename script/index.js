const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');
let formElement = popupElement.querySelector('.popup__window')
let nameInput = formElement.querySelector('.popup__edit_type_name');
let jobInput = formElement.querySelector('.popup__edit_type_bio');
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');
// const ESC_KEY = "Escape";

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