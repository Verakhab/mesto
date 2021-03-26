import {
    addClassOpen,
    removeClassOpen,
    exit
} from './utils/utils';

export class Popup {
  constructor(popupData, callbackRequest) {
    this._popupData = popupData;
    this._callbackRequest = callbackRequest;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._elementPopup = this._elementPopup.bind(this);
    this._validatorForm = this._validatorForm.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleRequest = this._handleRequest.bind(this);
    this._addListener();
  }

  open(content) {
    const elemClass = content.className.split(" ")[0];
    this._popupData.popupElement.append(content);
    addClassOpen(this._popupData.popupElement);
    document.querySelector('.popup__close')
      .addEventListener('click', this.close);
    document
      .addEventListener('keyup', this._handleEscClose);
    if (elemClass === 'popup__content') {
      document.forms[0]
        .addEventListener('click', this._validatorForm);
      document.forms[0]
        .addEventListener('input', this._validatorForm);
      document.forms[0].querySelector('.popup__button')
        .addEventListener('click', this._handleRequest);
    }
  }
  
  close() {
    removeClassOpen(this._popupData.popupElement);
    if (!this._popupData.popupElement.querySelector('.popup__content')) {
      document.querySelector('.popup__close')
        .removeEventListener('click', this.close);
      document
        .removeEventListener('keyup', this._handleEscClose);
      this._popupData.popupElement.lastElementChild.remove();
    } else {
      document.forms[0]
        .removeEventListener('click', this._validatorForm);
      document.forms[0]
        .removeEventListener('input', this._validatorForm);
      document.forms[0].querySelector('.popup__button')
        .removeEventListener('click', this._handleRequest);
      this._popupData.popupElement.querySelector('.popup__content').remove();
    }
  }

  _elementPopup(e) {
    switch (e.target) {
      case this._popupData.buttonPopupOpen.signup:
        const formSignup = this._popupData.formFragment.signup.content.cloneNode(true)
          .querySelector('.popup__content');
        this.open(formSignup);
      break;
      case this._popupData.buttonPopupOpen.signin:
        const formLogin = this._popupData.formFragment.signin.content.cloneNode(true)
          .querySelector('.popup__content');
        this.open(formLogin);
      break;
      case this._popupData.buttonPopupOpen.exit:
        exit();
      break;
      case this._popupData.buttonPopupOpen.place:
        const formPlace = this._popupData.formFragment.place.content.cloneNode(true)
          .querySelector('.popup__content');
        this.open(formPlace);
      break;
      case this._popupData.buttonPopupOpen.upuser:
        const formUpuser = this._popupData.formFragment.upuser.content.cloneNode(true)
          .querySelector('.popup__content');
        this.open(formUpuser);
      break;
      case this._popupData.buttonPopupOpen.upavatar:
        const formUpavatar = this._popupData.formFragment.upavatar.content.cloneNode(true)
        .querySelector('.popup__content');
        this.open(formUpavatar);
      break;
      case this._popupData.buttonPopupOpen.avatar:
        if (e.type === 'mouseenter') {
          addClassOpen(this._popupData.editPhoto);
        } else removeClassOpen(this._popupData.editPhoto);
      break;
    }
  }

  _handleEscClose(e) {
    if (e.keyCode === this._popupData.errorCollection.ESCAPE_CODE) {
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
            error = this._popupData.errorCollection.errorLength;
        }
        if (textInput.validity.valueMissing) {
            error = this._popupData.errorCollection.errorAlways;
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
            error = this._popupData.errorCollection.errorAlways;
        }
        if (linkInput.validity.typeMismatch) {
            error = this._popupData.errorCollection.errorLink;
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
            error = this._popupData.errorCollection.errorAlways;
        }
        if (emailInput.validity.typeMismatch) {
            error = this._popupData.errorCollection.errorEmail;
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
    this._popupData.buttonPopupOpen.signup
      .addEventListener('click', this._elementPopup);
    this._popupData.buttonPopupOpen.signin
      .addEventListener('click', this._elementPopup);
    this._popupData.buttonPopupOpen.exit
      .addEventListener('click', this._elementPopup);
    this._popupData.buttonPopupOpen.place
      .addEventListener('click', this._elementPopup);
    this._popupData.buttonPopupOpen.upuser
      .addEventListener('click', this._elementPopup);
    this._popupData.buttonPopupOpen.upavatar
      .addEventListener('click', this._elementPopup);
    this._popupData.buttonPopupOpen.avatar
      .addEventListener('mouseenter', this._elementPopup);
    this._popupData.buttonPopupOpen.avatar
      .addEventListener('mouseleave', this._elementPopup);
  }
}
