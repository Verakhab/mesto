import {
  root,
  profile,
  serverUrl,
  userInfoName,
  userInfoJob,
  userInfoFoto,
  cardFragment,
  placesContainer,
  welcomeFragment,
  popupData
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

const api = new Api(serverUrl);
const cardListInstance = new CardList(placesContainer);
export const popup = new Popup(popupData, requestApi);
const getCardData = (cardData, userInfo) => {
  return {
    data: { ...cardData, currentUserId: userInfo._id },
    removeCard: card => {
      api.removeCard(card.id)
        .then(res => {
          card.remove();
        })
        .catch(err => console.log(err));
    },
    likeCard: card => {
      api.changelikeCard(card.id, !card.isLiked)
        .then(res => {
          card.setView({ ...res, currentUserId: userInfo._id });
        })
        .catch(err => console.log(err));
    },
    openImage: (e) => {
      if (e.target.className === 'place-card__image') {
        const image = e.target.cloneNode(true);
        const button = image.querySelector('.place-card__delete-icon');
        const imgClose = document.createElement('img');
        imgClose.src = './images/close.svg';
        imgClose.classList.add('popup__close');
        image.append(imgClose);
        image.classList.add('place-card__image_max');
        image.removeChild(button);
        popup.open(image);
      }
    }
  }
}

function requestApi() {
  const popupLoader = root.querySelector('.loader');
  popupLoader.style.display = 'block';
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
          popupLoader.style.display = 'none';
          document.forms.signup
            .lastElementChild.textContent = err;
        });
    break;
    case document.forms.login:
      formData = new FormData(document.forms.login);
      api.logIn(formData)
        .then(userInfo => {
          if (userInfo.message) {
            return Promise.reject(userInfo.message);
          }
          localStorage.setItem('token', userInfo.token);
          api.getInitialCards()
            .then((cardsInfo) => {
              userInfoFoto
                .setAttribute('style',
                `background-image:
                url(${'data:' + userInfo.avatarType + ';base64,'+ (userInfo.avatar || userInfo.ava)})`);
              userInfoName.textContent = userInfo.name;
              userInfoJob.textContent = userInfo.about;
              popupData.buttonPopupOpen.signup.style.display = 'none';
              popupData.buttonPopupOpen.signin.style.display = 'none';
              popupData.buttonPopupOpen.exit.style.display = 'block';
              popupData.buttonPopupOpen.exit.textContent = userInfo.name + ' [->';
              profile.style.display = 'flex';
              placesContainer.style.display = 'grid';
              
              cardListInstance.render(cardsInfo.map(card => getCardData(card, userInfo)),(arrCard) => {
                return [].concat(arrCard).reduce((fragment, objCard) => {
                  const card = new Card(objCard,(data) => {
                    const newCard = cardFragment.cloneNode(true);
                    newCard.querySelector('.place-card__image')
                    .setAttribute(
                      'style',
                      `background-image: url(${'data:' + data.imageType + ';base64,' + data.imageCard})`
                    );
                    newCard.querySelector('.place-card__name').textContent = data.name;
                    return newCard;
                  })
                  fragment.append(card.node);
                  return fragment;
                }, document.createDocumentFragment());
              });
            })
            .catch(err => console.log(err));
          popup.close();
        })
        .catch(err => {
          popupLoader.style.display = 'none';
          document.forms.login
            .lastElementChild.textContent = err;
        });
    break;
    case document.forms.place:
      formData = new FormData(document.forms.place);
      api.getInitialInfo()
        .then(userInfo => {
          if (userInfo.message) {
            return Promise.reject(userInfo.message);
          }
        api.postCard(formData)
          .then(card => {
            if (card.message) {
              return Promise.reject(card.message);
            }
            const cardData = getCardData(card, userInfo);
            const cardd = new Card(cardData,(data) => {
              const newCard = cardFragment.cloneNode(true);
              newCard.querySelector('.place-card__image')
                .setAttribute(
                  'style',
                  `background-image: url(${'data:' + data.imageType + ';base64,' + data.imageCard})`
                );
              newCard.querySelector('.place-card__name').textContent = data.name;
              placesContainer.append(newCard);
              return newCard;
            })
            popup.close();
          })
          .catch(err => {
            popupLoader.style.display = 'none';
            document.forms.place
              .lastElementChild.textContent = err;
          });
        })
      .catch(err => {
        popupLoader.style.display = 'none';
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
          popupData.buttonPopupOpen.exit.textContent = res.name + ' [->';
          popup.close();
        })
        .catch(err => {
          popupLoader.style.display = 'none';
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
            .setAttribute(
              'style',
              `background-image: url(${'data:' + res.type + ';base64,' + res.ava})`);
          popup.close();
        })
        .catch(err => {
          popupLoader.style.display = 'none';
          document.forms.upavatar
            .lastElementChild.textContent = err;
        });
  }
}

if (!localStorage.getItem('token')) {
  const welcomePopup = welcomeFragment.cloneNode(true);
  popup.open(welcomePopup);
} else {
  api.getAppInfo()
    .then(([userInfo, cardsInfo]) => {
      userInfoFoto
        .setAttribute('style',
        `background-image:
        url(${'data:' + userInfo.avatarType + ';base64,'+ (userInfo.avatar || userInfo.ava)})`);
      userInfoName.textContent = userInfo.name;
      userInfoJob.textContent = userInfo.about;
      popupData.buttonPopupOpen.signup.style.display = 'none';
      popupData.buttonPopupOpen.signin.style.display = 'none';
      popupData.buttonPopupOpen.exit.style.display = 'block';
      popupData.buttonPopupOpen.exit.textContent = userInfo.name + ' [->';
      profile.setAttribute('style', 'display: flex');

      cardListInstance.render(cardsInfo.map(card => getCardData(card, userInfo)),(arrCard) => {
        return [].concat(arrCard).reduce((fragment, objCard) => {
          const card = new Card(objCard,(data) => {
            const newCard = cardFragment.cloneNode(true);
            newCard.querySelector('.place-card__image')
            .setAttribute(
              'style',
              `background-image: url(${'data:' + data.imageType + ';base64,' + data.imageCard})`
            );
            newCard.querySelector('.place-card__name').textContent = data.name;
            return newCard;
          })
          fragment.append(card.node);
          return fragment;
        }, document.createDocumentFragment());
      });
    })
    .catch(err => console.log(err));
}
