import {
  buttonSignUp,
  serverUrl,
  userInfoName,
  userInfoJob,
  userInfoFoto,
  cardFragment,
  popupElement,
  placesContainer,
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
const popup = new Popup(popupElement, requestApi);

chekToken();

api.getAppInfo()
  .then(([userInfo, cardsInfo]) => {
    console.log(cardsInfo);
    const cardInstance = new Card(cardFragment, callBackCard());
    const placesList = new CardList(placesContainer);
    cardsInfo.forEach(cardInfo => {
      const card = cardInstance.create(userInfo, cardInfo);
      placesList.render(card);
    });
    function callBackCard() {
      return {
        callBackRemove: (e) => {
          console.log(e);
          const c = e.path[2]
          console.log(c);
          // api.removeCard(e.target.cardId)
          //   .then(res => {

          //   })
          //   .catch(err => console.log(err));
        },
        callBackLike: (e) => {
          console.log(e);
          // api.removeCard(e.target.cardId)
          //   .then(res => {

          //   })
          //   .catch(err => console.log(err));
        }
      }
    }
  })
  .catch(err => console.log(err));

function requestApi() {
  const popupLoader = root.querySelector('.loader');
  popupLoader.setAttribute('style', 'display: block');
  let userStorage = localStorage.getItem('user');
  let userParse = JSON.parse(userStorage);
  let formData;
  switch (document.forms[0]) {
    case document.forms.signup:
      formData = new FormData(document.forms.signup);
      api.signup(formData)
        .then(res => {
          if (res.message) {
            return Promise.reject(res.message);
          }
          popup.close();
        })
        .catch(err => {
          popupLoader.setAttribute('style', 'display: none');
          document.forms.signup
            .lastElementChild.textContent = err;
        });
    break;
    case document.forms.login:
      formData = new FormData(document.forms.login);
      api.logIn(formData)
        .then(res => {
          if (res.message) {
            return Promise.reject(res.message);
          }
          localStorage.setItem('user', JSON.stringify(res));
          localStorage.setItem('token', res.token);
          chekToken();
          popup.close();
        })
        .catch(err => {
          popupLoader.setAttribute('style', 'display: none');
          document.forms.login
            .lastElementChild.textContent = err;
        });
    break;
    case document.forms.place:
      formData = new FormData(document.forms.place);
      api.postCard(formData)
        .then(res => {
          if (res.message) {
            return Promise.reject(res.message);
          }
          const cardd = cardInstance.create(userParse, res);
          placesList.render(cardd);
          popup.close();
        })
        .catch(err => {
          popupLoader.setAttribute('style', 'display: none');
          document.forms.place
            .lastElementChild.textContent = err;
        });
    break;
    case document.forms.upuser:
      formData = new FormData(document.forms.upuser);
      api.upUser(formData)
        .then(res => {
          if (res.message) {
            return Promise.reject(res.message);
          }
          userInfoName.textContent = res.name;
          userInfoJob.textContent = res.about;
          buttonSignUp.textContent = res.name + ' [->';
          userParse.name = res.name;
          userParse.about = res.about;
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(userParse));
          popup.close();
        })
        .catch(err => {
          popupLoader.setAttribute('style', 'display: none');
          document.forms.upuser
            .lastElementChild.textContent = err;
        });
    break;
    case document.forms.upavatar:
      formData = new FormData(document.forms.upavatar);
      api.upAvatar(formData)
        .then(res => {
          if (res.message) {
            return Promise.reject(res.message);
          }
          userInfoFoto
            .setAttribute('style', `background-image: url(${'data:' + res.type + ';base64,' + res.ava})`);
          userParse.ava = res.ava;
          userParse.type = res.type;
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(userParse));
          popup.close();
        })
        .catch(err => {
          popupLoader.setAttribute('style', 'display: none');
          document.forms.upavatar
            .lastElementChild.textContent = err;
        });
  }
}

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