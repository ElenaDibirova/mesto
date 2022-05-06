export class FormValidator {
  // formSettings - объект настроек с селекторами и классами формы
  // formElement - элемент той формы, которая валидируется
  constructor(formSettings, formElement) {
    this._inputSelector = formSettings.inputSelector;
    this._submitButtonSelector = formSettings.submitButtonSelector;
    this._inactiveButtonClass = formSettings.inactiveButtonClass;
    this._inputErrorClass = formSettings.inputErrorClass;
    this._errorClass = formSettings.errorClass;

    this._formElement = formElement;
  }
  // включает валидацию формы
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    
    this._setEventListeners();
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputList.forEach((input) => input.addEventListener('input', () => {
      this._isValid(input);
    }));
  }

  _isValid(input) {
    const saveButton = this._formElement.querySelector(this._submitButtonSelector);
    if (!input.validity.valid) {
      this._showInputError(input);
      saveButton.classList.add(this._inactiveButtonClass);
      saveButton.disabled = true;
    } else {
      this._hideInputError(input);
      if (this._isAllInputValid()) {
        saveButton.classList.remove(this._inactiveButtonClass);
        saveButton.disabled = false;
      }
    }
  }

  _isAllInputValid = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    return inputList.every((input) => input.validity.valid);
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
}