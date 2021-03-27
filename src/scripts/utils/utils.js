import {
  profile,
  popupData,
  placesContainer
} from '../constants/index';

function addClassOpen(element) {
  element.classList.add('popup_is-opened');
}

function removeClassOpen(element) {
  element.classList.remove('popup_is-opened');
}

function exit() {
  localStorage.removeItem('token');
  profile.style.display = 'none';
  popupData.buttonPopupOpen.signup.style.display = 'block';
  popupData.buttonPopupOpen.signin.style.display = 'block';
  popupData.buttonPopupOpen.exit.style.display = 'none';
  placesContainer.style.display = 'none';
  while (placesContainer.firstChild) {
    placesContainer.firstChild.remove();
  }
}

export {
  addClassOpen,
  removeClassOpen,
  exit
}