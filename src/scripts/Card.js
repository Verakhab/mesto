export class Card {
  constructor({ data, removeCard, likeCard }, createCard) {
    this.removeCard = removeCard;
    this.likeCard = likeCard;
    this._elem = createCard(data);
    this._removeHandle = this._removeHandle.bind(this);
    this._likeHandle = this._likeHandle.bind(this);

    this._buttonLike = this._elem.querySelector('.place-card__like-icon');
    this._buttonRemove = this._elem.querySelector('.place-card__delete-icon');
    this.setView(data);
    this._addListener();
  }

  get node() {
    return this._elem;
  }
  get id() {
    return this.data._id;
  }
  get isLiked() {
    return Boolean(this.data.likes.find(item => item === this.data.currentUserId))
  }
  
  like() {
    this._buttonLike.classList.toggle('place-card__like-icon_liked');
  }
  remove() {
    this._removeListener();
    this._elem.remove();
  }
  setView(data) {
    this.data = data;
    if (this.isLiked) {
      this.like();
    } else this._buttonLike.classList.remove('place-card__like-icon_liked'); 
    this._elem.querySelector('.place-card__counter').textContent = this.data.likes.length;
    this._buttonRemove.style.display = this.data.owner === this.data.currentUserId ? 'block' : 'none';
  }

  _removeHandle() {
    return this.removeCard(this);
  }
  _likeHandle() {
    return this.likeCard(this);
  }
  _addListener() {
    this._buttonRemove
      .addEventListener('click', this._removeHandle);
    this._buttonLike
      .addEventListener('click', this._likeHandle);
  }
  _removeListener() {
    this._buttonRemove
      .addEventListener('click', this._removeHandle);
    this._buttonLike
      .addEventListener('click', this._likeHandle);
  }
}


// const card = this.cardFragment.content.cloneNode(true).querySelector('.place-card');
//     const cardImage = card.querySelector('.place-card__image');
//     const cardName = card.querySelector('.place-card__name');
//     const cardLikeIcon = card.querySelector('.place-card__like-icon');
//     const cardLikeCount = card.querySelector('.place-card__counter');
//     const cardDeleteButton = card.querySelector('.place-card__delete-icon');
//     cardImage
//       .setAttribute(
//         'style',
//         `background-image: url(${'data:' + objCard.imageType + ';base64,' + objCard.imageCard})`
//       );
//     if (objCard.owner !== objUser._id) {
//       cardDeleteButton.remove();
//     } else {
//       cardDeleteButton
//         .setAttribute(
//           'style',
//           'display: block'
//         );
//     }
//     cardName.textContent = objCard.name;
//     if (objCard.likes.includes(objUser._id)) {
//       cardLikeIcon.classList.toggle('place-card__like-icon_liked');
//     }
//     cardLikeCount.textContent = objCard.likes.lenght;
//     card.querySelector('.place-card__delete-icon')
//       .addEventListener('click', this.remove);
//     card.querySelector('.place-card__like-icon')
//       .addEventListener('click', this.like);
//       console.log(this)
//     return card;