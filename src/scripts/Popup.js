import {
    errorCollection,
    buttonPopupClose,
} from './constants/index';
import {
    addClassOpen,
    removeClassOpen,
} from './utils/utils';

export class Popup {
  constructor(popupContainer, callbackRequest) {
    this._callbackRequest = callbackRequest;
    this._popupContainer = popupContainer;
    this.close = this.close.bind(this);
    this._validatorForm = this._validatorForm.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleRequest = this._handleRequest.bind(this);
  }

  open(form) {
    this._popupContainer.lastElementChild.appendChild(form);
    addClassOpen(this._popupContainer);
    this._addListener();
  }

  close() {
    removeClassOpen(this._popupContainer);
    this._removeListener();
    this._popupContainer.querySelector('.tem').remove();
  }

  _handleEscClose(e) {
    if (e.keyCode === errorCollection.ESCAPE_CODE) {
        this.close();
    }
  }

  _handleRequest(e) {
      e.preventDefault();
    return this._callbackRequest();
  }

  _validatorForm(e) {
    switch (e.target.name) {
        case 'link':
            this._validLinkInput(e.target);
            break;
        case 'email':
            this._validEmailInput(e.target);
            break;
        default:
            this._validTextInput(e.target);
    }
    this._validButton();
  }

  _validTextInput(textInput) {
    let error = '';
    if (!textInput.checkValidity()) {
        if (textInput.validity.tooShort || textInput.validity.tooLong) {
            error = errorCollection.errorLength;
        }
        if (textInput.validity.valueMissing) {
            error = errorCollection.errorAlways;
        }
    }
    if (textInput.nextElementSibling !== null) {
        textInput.nextElementSibling.textContent = error;
    }
  }

  _validLinkInput(linkInput) {
    let error = '';
    if (!linkInput.checkValidity()) {
        if (linkInput.validity.valueMissing) {
            error = errorCollection.errorAlways;
        }
        if (linkInput.validity.typeMismatch) {
            error = errorCollection.errorLink;
        }
    }
    if (linkInput.nextElementSibling !== null) {
        linkInput.nextElementSibling.textContent = error;
    }
  }

  _validEmailInput(emailInput) {
    let error = '';
    if (!emailInput.checkValidity()) {
        if (emailInput.validity.valueMissing) {
            error = errorCollection.errorAlways;
        }
        if (emailInput.validity.typeMismatch) {
            error = errorCollection.errorEmail;
        }
    }
    if (emailInput.nextElementSibling !== null) {
        emailInput.nextElementSibling.textContent = error;
    }
  }

  _validButton() {
    if (document.forms[0].checkValidity()) {
        document.forms[0].querySelector('.popup__button')
            .setAttribute('style', 'background-color: black; color: white;');
        document.forms[0].querySelector('.popup__button').disabled = !document.forms[0].checkValidity();
    } else {
        document.forms[0].querySelector('.popup__button')
            .removeAttribute('style', 'background-color: black; color: white;');
        document.forms[0].querySelector('.popup__button').disabled = !document.forms[0].checkValidity();
    }
}

  _addListener() {
    document.forms[0]
        .addEventListener('click', this._validatorForm);
    document.forms[0]
        .addEventListener('input', this._validatorForm);
    document.forms[0].querySelector('.popup__button')
        .addEventListener('click', this._handleRequest);
    buttonPopupClose
        .addEventListener('click', this.close);
    document
        .addEventListener('keyup', this._handleEscClose);
    
  }

  _removeListener() {
    document.forms[0]
        .removeEventListener('click', this._validatorForm);
    document.forms[0]
        .removeEventListener('input', this._validatorForm);
    document.forms[0].querySelector('.popup__button')
        .removeEventListener('click', this._handleRequest);
    buttonPopupClose
        .addEventListener('click', this.close);
    document
        .removeEventListener('keyup', this._handleEscClose);
  }
}
