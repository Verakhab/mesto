import {
    root,
    serverUrl,
    userInfoName,
    userInfoJob,
    userInfoFoto,
    placesList,
    popupElement,
    editPhoto,
    formFragment,
    buttonPopupOpen,
    buttonPopupClose
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
    removeClassOpen
} from './scripts/utils/utils';

// if (localStorage.getItem('token')) {
//     const userInitial = new Api(serverUrl + 'users/:id').
//     getInitialInfo()
//     .then(user => {
//         userInfoFoto.setAttribute('style', `background-image: url(${user.avatar})`);
//         userInfoName.textContent = user.name;
//         userInfoJob.textContent = user.about;
//         userNameInput.value = user.name;
//         userAboutInput.value = user.about;
//     })
// }

// export const existingCard = new CardList(placesList);

// existingCard.render();

const api = new Api(serverUrl);

api.getInitialAllInfo()
    .then(res => console.log(res));

function requestApi(e) {
    e.preventDefault();
    switch (document.forms[0]) {
        case document.forms.signup:
            let name = document.forms.signup.name.value;
            let about = document.forms.signup.about.value;
            let avatar = document.forms.signup.link.value;
            let email = document.forms.signup.email.value;
            let password = document.forms.signup.password.value;
            const user = {
                name,
                about,
                avatar,
                email,
                password
            }
            const jsonUser = JSON.stringify(user);
            api.signup(jsonUser)
                .then(res => console.log(res));
                popup.close();
        break;
        case document.forms.login:
            email = document.forms.login.email.value;
            password = document.forms.login.password.value;
            const data = {
                email,
                password
            }
            const jsonData = JSON.stringify(data);
            api.logIn(jsonData)
                .then(res => {
                  console.log(res);
                  localStorage.setItem('token', res.token);
                  console.log(localStorage.setItem('token'));
                  popup.close();
                });
        break;
        case document.forms.place:
            name = document.forms.place.name.value;
            const link = document.forms.place.link.value;
            const place = {
                name,
                link
            }
            const jsonPlace = JSON.stringify(place);
            api.postCard(jsonPlace)
                .then(res => console.log(res));
                popup.close();
        break;
        case document.forms.upuser:
            name = document.forms.upuser.name.value;
            about = document.forms.upuser.about.value;
            const userNew = {
                name,
                about
            }
            const jsonUserNew = JSON.stringify(userNew);
            api.upUser(jsonUserNew)
                .then(res => console.log(res));
                popup.close();
        break;
        case document.forms.upavatar:
            avatar = document.forms.upavatar.link.value;
            const avaNew = {
              avatar
            }
            const jsonAvatarNew = JSON.stringify(avaNew);
            console.log(jsonAvatarNew);
            api.upAvatar(jsonAvatarNew)
                .then(res => console.log(res));
                popup.close();
    }
}

const popup = new Popup(popupElement, requestApi);

buttonPopupOpen.signup
    .addEventListener('click', function() {
        const formSignup = formFragment.signup.content.cloneNode(true).querySelector('.tem');
        popup.open(formSignup);
    });
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
buttonPopupClose
    .addEventListener('click', function() {
        popup.close();
    });
buttonPopupOpen.avatar
    .addEventListener('mouseover', () => {
        addClassOpen(editPhoto);
    });
buttonPopupOpen.avatar
    .addEventListener('mouseout', () => {
        removeClassOpen(editPhoto);
    });