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
  }
  // включает валидацию формы
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
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

  _handleSaveButton(input) {
    if (!input.validity.valid) {
      this._saveButton.classList.add(this._inactiveButtonClass);
      this._saveButton.disabled = true;
    } else if(this._isAllInputValid()) {
          this._saveButton.classList.remove(this._inactiveButtonClass);
          this._saveButton.disabled = false;
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

  disableSubmitButton(evt) {
    evt.target.reset();
    evt.submitter.disabled = true;
    evt.submitter.classList.add(this._inactiveButtonClass);
  }

  clearError = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const errorSpanList = Array.from(this._formElement.querySelectorAll(this._editError));
  
    inputList.forEach((input) => {
      input.classList.remove(this._inputErrorClass);
    });
  
    errorSpanList.forEach((errorSpan) => {
      errorSpan.classList.add(this._errorClass);
      errorSpan.textContent = '';
    });
    const saveButton = this._formElement.querySelector(this._submitButtonSelector);
    saveButton.classList.add(this._inactiveButtonClass);
    saveButton.disabled = true;
  }
}