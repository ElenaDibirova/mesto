export class FormValidator {
  // formSettings - объект настроек с селекторами и классами формы
  // formElement - элемент той формы, которая валидируется
  constructor(formSettings, formElement) {
    this._inputSelector = formSettings.inputSelector;
    this._submitButtonSelector = formSettings.submitButtonSelector;
    this._inactiveButtonClass = formSettings.inactiveButtonClass;
    this._inputErrorClass = formSettings.inputErrorClass;
    this._errorClass = formSettings.errorClass;
    this._editError = formSettings._editError;

    this._formElement = formElement;
    this._saveButton = this._formElement.querySelector(this._submitButtonSelector);
    this._errorSpanList = this._formElement.querySelectorAll(this._editError);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }
  // включает валидацию формы
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    
    this._setEventListeners();
  }

  _setEventListeners() {
      this._inputList.forEach((input) => input.addEventListener('input', () => {
      this._isValid(input);
      this._handleSaveButton(input);
    }));
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
        this._hideInputError(input);
      }
  }

  _handleSaveButton() {
    if (!this._isAllInputValid()) {
      this._saveButton.classList.add(this._inactiveButtonClass);
      this._saveButton.disabled = true;
    } else {
        this._saveButton.classList.remove(this._inactiveButtonClass);
        this._saveButton.disabled = false;
      }
  }

  _isAllInputValid = () => {
    return this._inputList.every((input) => input.validity.valid);
  };
  
  _showInputError = (input) => {
    const errorSpan = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorSpan.textContent = input.validationMessage;
    errorSpan.classList.add(this._errorClass);
  };

  _hideInputError = (input) => {
    const errorSpan = this._formElement.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorSpan.classList.remove(this._errorClass);
    errorSpan.textContent = '';
  };

  clearError = () => {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  
    this._handleSaveButton();
  }
}