import {
  profile,
  userInfoName,
  userInfoJob,
  userInfoFoto,
  popupData
} from '../constants/index';

import {
  popup
} from '../../index';

function addClassOpen(element) {
  element.classList.add('popup_is-opened');
}

function removeClassOpen(element) {
  element.classList.remove('popup_is-opened');
}

function exit() {
  localStorage.removeItem('token');
  profile.setAttribute('style', 'display: none');
  popupData.buttonPopupOpen.signup.textContent = 'SignUp';
  popupData.buttonPopupOpen.signin.setAttribute('style', 'display: block');
  popupData.buttonPopupOpen.signup
    .addEventListener('click', entrance);
}

function entrance() {
  const formSignup = formFragment.signup.content.cloneNode(true).querySelector('.popup__content');
  popup.open(formSignup);
}

function chekToken(userInfo) {
  if (localStorage.getItem('token')) {
    userInfoFoto
      .setAttribute('style',
      `background-image:
      url(${'data:' + userInfo.avatarType + ';base64,'+ (userInfo.avatar || userInfo.ava)})`);
    userInfoName.textContent = userInfo.name;
    userInfoJob.textContent = userInfo.about;
    popupData.buttonPopupOpen.signup.textContent = userInfo.name + ' [->';
    popupData.buttonPopupOpen.signup
      .removeEventListener('click', entrance);
    popupData.buttonPopupOpen.signup
      .addEventListener('click', exit);
    profile.setAttribute('style', 'display: flex');
    popupData.buttonPopupOpen.signin.setAttribute('style', 'display: none');
  } else {
    popupData.buttonPopupOpen.signup
      .addEventListener('click', entrance);
  }
}

export {
  addClassOpen,
  removeClassOpen,
  chekToken
}