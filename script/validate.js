const enableValidation = (validationSettings) => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector))
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, validationSettings);
  });
};

const setEventListeners = (form, validationSettings) => {
  const inputList = Array.from(form.querySelectorAll(validationSettings.inputSelector));

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, validationSettings)
    });
  });
}; 

const isValid = (form, input, validationSettings) => {
  const saveButton = form.querySelector(validationSettings.submitButtonSelector);
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, validationSettings);
    saveButton.classList.add(validationSettings.inactiveButtonClass);
    saveButton.disabled = true;
  } else {
    hideInputError(form, input, validationSettings);
    if (isAllInputValid(form, validationSettings.inputSelector)) {
      saveButton.classList.remove(validationSettings.inactiveButtonClass);
      saveButton.disabled = false;
    }
  }
};

const isAllInputValid = (form, inputSelector) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  return inputList.every((input) => input.validity.valid);
};

const showInputError = (form, input, errorMessage, validationSettings) => {
  const errorSpan = form.querySelector(`.${input.id}-error`);
  input.classList.add(validationSettings.inputErrorClass);
  errorSpan.textContent = errorMessage;
  errorSpan.classList.add(validationSettings.errorClass);
};

const hideInputError = (form, input, validationSettings) => {
  const errorSpan = form.querySelector(`.${input.id}-error`);
  input.classList.remove(validationSettings.inputErrorClass);
  errorSpan.classList.remove(validationSettings.errorClass);
  errorSpan.textContent = '';
};