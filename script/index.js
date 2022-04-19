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
}

elements.forEach(function(el) {
  addCardToContainer(section, createCard(el.link, el.name));
})

function openPopupProfile () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  openPopup(popupProfileElement);
  clearError(formProfileElement);
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

formProfileElement.addEventListener('submit', formSubmitProfileHandler);
editButton.addEventListener('click', openPopupProfile);  
closeProfileButton.addEventListener('click', () => closePopup(popupProfileElement));
formPlaceElement.addEventListener('submit', handleCardRendering)
addButton.addEventListener('click', () => openPopup(popupPlaceElement));
closePlaceButton.addEventListener('click', () => closePopup(popupPlaceElement));
closePopupButton.addEventListener('click', () => closePopup(popupPicElement));



// Вынесем все необходимые элементы формы в константы
// formProfileElement //const formElement = document.querySelector('.form');
// nameInput //const formInput = formElement.querySelector('.form__input');
// const formError = formProfileElement.querySelector(`.${nameInput.id}-error`); //уникальный код ошибки

// Функция, которая добавляет класс с ошибкой
const showInputError = (formProfileElement, element, errorMessage) => {
  const formError = formProfileElement.querySelector(`.${element.id}-error`);
  element.classList.add('popup__error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__edit-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formProfileElement, element) => {
  const formError = formProfileElement.querySelector(`.${element.id}-error`);
  element.classList.remove('popup__error');
  formError.classList.remove('popup__edit-error_active');
  formError.textContent = '';
};

//создадим функцию очистки попапа от ошибок при открытии
//   //в ф-ции клирэррор нужно удалить класс popup__error из input, и класс popup__edit-error_active from span.

const clearError = (popup) => {
  const nameList = Array.from(popup.querySelectorAll('.popup__edit'));
  const bioList = Array.from(popup.querySelectorAll('.popup__edit-error'));

  nameList.forEach((popup) => {
    popup.classList.remove('popup__error');
  });

  bioList.forEach((popup) => {
    popup.classList.add('popup__edit-error_active');
    popup.textContent = '';
  });

  saveButton.classList.remove('popup__save-button_inactive');

}

// Функция, которая проверяет валидность поля
const isValid = (formProfileElement, input) => {
  if (!input.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formProfileElement, input, input.validationMessage);
    saveButton.classList.add('popup__save-button_inactive');

  } else {
    // Если проходит, скроем
    hideInputError(formProfileElement, input);
    saveButton.classList.remove('popup__save-button_inactive');
  }
};
 
formProfileElement.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
});

const setEventListeners = (formProfileElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formProfileElement.querySelectorAll('.popup__edit'));

  // Обойдём все элементы полученной коллекции
  inputList.forEach((input) => {
    // каждому полю добавим обработчик события input
    input.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formProfileElement, input)
    });
  });
}; 

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__window_profile'));

  // Переберём полученную коллекцию
  formList.forEach((formProfileElement) => {
    formProfileElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formProfileElement);
  });
};

// Вызовем функцию
enableValidation();

// Вызовем функцию isValid на каждый ввод символа
// nameInput.addEventListener('input', isValid);