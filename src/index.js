import {
  buttonSignUp,
  serverUrl,
  userInfoName,
  userInfoJob,
  userInfoFoto,
  cardFragment,
  popupElement,
  editPhoto,
  formFragment,
  buttonPopupOpen,
  root,
} from './scripts/constants/index';
import {
  Api
} from './scripts/Api';
import {
  CardList
} from './scripts/CardList';
import {
  Card
} from './scripts/Card';
import {
  Popup
} from './scripts/Popup';
import {
  addClassOpen,
  removeClassOpen,
  chekToken
} from './scripts/utils/utils';

const api = new Api(serverUrl);

chekToken();

function requestApi() {
  let userStorage = localStorage.getItem('user');
  let userParse = JSON.parse(userStorage);
  let formData;
  switch (document.forms[0]) {
    case document.forms.signup:
      formData = new FormData(document.forms.signup);
      api.signup(formData)
        .then(res => console.log(res));
        popup.close();
    break;
    case document.forms.login:
      formData = new FormData(document.forms.login);
      api.logIn(formData)
        .then(res => {
          localStorage.setItem('user', JSON.stringify(res));
          localStorage.setItem('token', res.token);
          chekToken();
          popup.close();
        });
    break;
    case document.forms.place:
      formData = new FormData(document.forms.place);
      // root.appendChild(new Card(cardFragment).create(formData));
      api.postCard(formData)
        .then(res => console.log(res));
        popup.close();
    break;
    case document.forms.upuser:
      formData = new FormData(document.forms.upuser);
      api.upUser(formData)
        .then(res => {
          userInfoName.textContent = res.name;
          userInfoJob.textContent = res.about;
          buttonSignUp.textContent = res.name + ' [->';
          userParse.name = res.name;
          userParse.about = res.about;
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(userParse));
        });
        popup.close();
    break;
    case document.forms.upavatar:
      formData = new FormData(document.forms.upavatar);
      api.upAvatar(formData)
        .then(res => {
          userInfoFoto
            .setAttribute('style', `background-image: url(${'data:' + res.type + ';base64,' + res.ava})`);
          userParse.ava = res.ava;
          userParse.type = res.type;
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(userParse));
        });
        popup.close();
  }
}

export const popup = new Popup(popupElement, requestApi);

buttonPopupOpen.signin
  .addEventListener('click', function() {
      const formLogin = formFragment.signin.content.cloneNode(true).querySelector('.tem');
      popup.open(formLogin);
  });
buttonPopupOpen.place
  .addEventListener('click', function() {
      const formPlace = formFragment.place.content.cloneNode(true).querySelector('.tem');
      popup.open(formPlace);
  });
buttonPopupOpen.upuser
  .addEventListener('click', function() {
      const formUpuser = formFragment.upuser.content.cloneNode(true).querySelector('.tem');
      popup.open(formUpuser);
  });
buttonPopupOpen.upavatar
  .addEventListener('click', function() {
      const formUpavatar = formFragment.upavatar.content.cloneNode(true).querySelector('.tem');
      popup.open(formUpavatar);
  });
buttonPopupOpen.avatar
  .addEventListener('mouseover', () => {
      addClassOpen(editPhoto);
  });
buttonPopupOpen.avatar
  .addEventListener('mouseout', () => {
      removeClassOpen(editPhoto);
  });