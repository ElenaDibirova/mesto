export default class Card {
  constructor(data, templateSelector, openPopupFunction) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPopupFunction = openPopupFunction;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  
    return cardElement;
  }

  // _getImageElement() {
  //   const imageElement = document
  //     .querySelector(this._templateSelector)
  //     .content
  //     .querySelector('.element__img')

  //   return imageElement;
  // }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
  
    const elementImg = this._element.querySelector('.element__img'); 
    this._element.querySelector('.element__name').textContent = this._name;
    elementImg.src = this._link;
    elementImg.alt = this._name;
  
    return this._element;
  }
  
  handleOpenedImage(event) {  
    event.currentTarget.closest('.element').remove();
  }

  _handleLikeButton = (event) => {
    event.currentTarget.classList.toggle('element__like_active');
  }

  _handleRemoveButton = (event) => {
    event.currentTarget.closest('.element').remove();
  }

  _setEventListeners() {
    const likeBtn = this._element.querySelector('.element__like');
    const removeBtn = this._element.querySelector('.element__remove');
    const imageElement = this._element.querySelector('.element__img');


    likeBtn.addEventListener('click', this._handleLikeButton);
    removeBtn.addEventListener('click', this._handleRemoveButton);
    imageElement.addEventListener('click', () => this._openPopupFunction(this._link, this._name));
  }
}