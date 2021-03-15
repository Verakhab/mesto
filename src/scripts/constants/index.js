import '../../styles/style.css';

const serverUrl = NODE_ENV === 'development' ?
    'https://api.mest.ml/' : 'https://api.mest.ml/';
const root = document.querySelector('.root');
const buttonSignUp = root.querySelector('.header__button_signup');
const profile = root.querySelector('.profile');
const buttonSignIn = root.querySelector('.header__button_signin');
const buttonPopupClose = root.querySelector('.popup__close');
const userInfoName = root.querySelector('.user-info__name');
const userInfoJob = root.querySelector('.user-info__job');
const userInfoFoto = root.querySelector('.user-info__photo');
const placesList = root.querySelector('.places-list');
const popupElement = root.querySelector('.popup');
const editPhoto = root.querySelector('.user-info__edit-photo');
const formFragment = {
    signup: root.querySelector('.template-signup'),
    signin: root.querySelector('.template-login'),
    place: root.querySelector('.template-place'),
    upuser: root.querySelector('.template-upuser'),
    upavatar: root.querySelector('.template-upavatar')
};
const buttonPopupOpen = {
    place: document.querySelector('.user-info__button_info'),
    upuser: document.querySelector('.user-info__button_edit-button'),
    avatar: document.querySelector('.user-info__photo'),
    upavatar: document.querySelector('.user-info__edit-photo'),
    signin: document.querySelector('.header__button_signin'),
    signup: document.querySelector('.header__button_signup'),
};
const cardFragment = root.querySelector('.template-card');
const cardImage =  root.querySelector('.place-card__image');
const cardName =  root.querySelector('.place-card__name');
const cardLikeCount =  root.querySelector('.place-card__counter');
const errorCollection = {
    errorAlways: 'Это обязательное поле',
    errorLength: 'Должно быть от 2 до 30 символов',
    errorLink: 'Здесь должна быть ссылка',
    errorEmail: 'Здесь должен быть email',
    load: 'Загрузка...',
    save: 'Сохранить',
    plus: '+',
    remove: 'Вы действительно хотите удалить эту карточку?',
    ESCAPE_CODE: 27
};

export {
    root,
    profile,
    buttonSignUp,
    buttonSignIn,
    serverUrl,
    userInfoName,
    userInfoJob,
    userInfoFoto,
    placesList,
    popupElement,
    editPhoto,
    formFragment,
    cardFragment,
    buttonPopupOpen,
    buttonPopupClose,
    errorCollection
};
