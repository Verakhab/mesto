import {
  profile,
  userInfoName,
  userInfoJob,
  userInfoFoto,
  editPhoto,
  buttonSignUp,
  buttonSignIn,
  buttonPopupOpen,
  formFragment,
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
  localStorage.removeItem('user');
  profile.setAttribute('style', 'display: none');
  buttonSignUp.textContent = 'SignUp';
  buttonSignIn.setAttribute('style', 'display: block');
  buttonPopupOpen.signup
    .addEventListener('click', entrance);
}

function entrance() {
  const formSignup = formFragment.signup.content.cloneNode(true).querySelector('.tem');
  popup.open(formSignup);
}

function chekToken() {
  if (localStorage.getItem('token')) {
  buttonPopupOpen.signup
    .removeEventListener('click', entrance);
  buttonPopupOpen.signup
    .addEventListener('click', exit);
  const userLocal = JSON.parse(localStorage.getItem('user'));
  profile.setAttribute('style', 'display: flex');
  userInfoFoto
    .setAttribute('style', `background-image: url(${'data:' + userLocal.type + ';base64,'+ userLocal.ava})`);
  userInfoName.textContent = userLocal.name;
  userInfoJob.textContent = userLocal.about;
  buttonSignUp.textContent = userLocal.name + ' [->';
  buttonSignIn.setAttribute('style', 'display: none');
  } else {
    buttonPopupOpen.signup
      .addEventListener('click', entrance);
  }
}

export {
  addClassOpen,
  removeClassOpen,
  exit,
  entrance,
  chekToken
}