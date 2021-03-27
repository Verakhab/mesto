import '../../styles/style.css';

const serverUrl = NODE_ENV === 'development' ?
    'https://api.mesto.gq/' : 'https://api.mesto.gq/';
const root = document.querySelector('.root');
const profile = root.querySelector('.profile');
const userInfoName = root.querySelector('.user-info__name');
const userInfoJob = root.querySelector('.user-info__job');
const userInfoFoto = root.querySelector('.user-info__photo');
const placesContainer = root.querySelector('.places-list');
const cardFragment = root.querySelector('.template-card').content.querySelector('.place-card');
const welcomeFragment = root.querySelector('.template-welcome').content.querySelector('.popup__welcome');
const popupData = {
    formFragment: {
        signup: root.querySelector('.template-signup'),
        signin: root.querySelector('.template-login'),
        place: root.querySelector('.template-place'),
        upuser: root.querySelector('.template-upuser'),
        upavatar: root.querySelector('.template-upavatar')
    },
    buttonPopupOpen: {
        place: document.querySelector('.user-info__button_info'),
        upuser: document.querySelector('.user-info__button_edit-button'),
        avatar: document.querySelector('.user-info__photo'),
        upavatar: document.querySelector('.user-info__edit-photo'),
        signin: document.querySelector('.header__button_signin'),
        signup: document.querySelector('.header__button_signup'),
        exit: document.querySelector('.header__button_exit'),
    },
    errorCollection: {
        errorAlways: 'Это обязательное поле',
        errorLength: 'Должно быть от 2 до 30 символов',
        errorLink: 'Здесь должна быть ссылка',
        errorEmail: 'Здесь должен быть email',
        save: 'Сохранить',
        plus: '+',
        remove: 'Вы действительно хотите удалить эту карточку?',
        ESCAPE_CODE: 27
    },
    popupElement: root.querySelector('.popup'),
    editPhoto: root.querySelector('.user-info__edit-photo')
}

export {
    root,
    profile,
    serverUrl,
    userInfoName,
    userInfoJob,
    userInfoFoto,
    placesContainer,
    popupData,
    cardFragment,
    welcomeFragment
};
