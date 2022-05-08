export class Card {
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

  generateCard() {
    this._element = this._getTemplate();   
    this._element.querySelector('.element__name').textContent = this._name;

    this._elementImg = this._element.querySelector('.element__img');
    this._elementImg.src = this._link;
    this._elementImg.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
  
  handleOpenedImage(event) {  
    event.currentTarget.closest('.element').remove();
  }

  _handleLikeButton = () => {
    this._likeBtn.classList.toggle('element__like_active');
  }

  _handleRemoveButton = () => {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeBtn = this._element.querySelector('.element__like');
    const removeBtn = this._element.querySelector('.element__remove');

    this._likeBtn.addEventListener('click', this._handleLikeButton);
    removeBtn.addEventListener('click', this._handleRemoveButton);
    this._elementImg.addEventListener('click', () => this._openPopupFunction(this._link, this._name));
  }
}