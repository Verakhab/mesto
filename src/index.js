import {
  root,
  serverUrl,
  userInfoName,
  userInfoJob,
  userInfoFoto,
  cardFragment,
  placesContainer,
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
import {
  addClassOpen,
  removeClassOpen,
  chekToken
} from './scripts/utils/utils';

const api = new Api(serverUrl);


if (localStorage.getItem('token')) {
  api.getAppInfo()
    .then(([userInfo, cardsInfo]) => {
      console.log([userInfo, cardsInfo]);
      console.log(userInfo);
      chekToken(userInfo);
      const getCardData = cardData => {
        return {
          data: { ...cardData, currentUserId: userInfo._id },
          removeCard: card => {
            api.removeCard(card.id)
              .then(res => {
                console.log(res);
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
          openImage: () => {
            addClassOpen(root.querySelector('.dark-layer'));
          }
        }
      }

      const cardListInstance = new CardList(placesContainer);
      
      cardListInstance.render(cardsInfo.map(card => getCardData(card)),(arrCard) => {
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
    
const requestApi = () => {
  const popupLoader = root.querySelector('.loader');
  popupLoader.setAttribute('style', 'display: block');
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
          console.log(res)
          localStorage.setItem('token', res.token);
          chekToken(res);
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
          cardListInstance.render(getCardData(res),(cardData) => {
            const card = new Card(cardData,(data) => {
              const newCard = cardFragment.cloneNode(true);
              newCard.querySelector('.place-card__image')
              .setAttribute(
                'style',
                `background-image: url(${'data:' + data.imageType + ';base64,' + data.imageCard})`
              );
              newCard.querySelector('.place-card__name').textContent = data.name;
              placesContainer.append(newCard);
            })
          });
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
          popupData.buttonPopupOpen.signup.textContent = res.name + ' [->';
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
          popup.close();
        })
        .catch(err => {
          popupLoader.setAttribute('style', 'display: none');
          document.forms.upavatar
            .lastElementChild.textContent = err;
        });
  }
}
export const popup = new Popup(popupData, requestApi);