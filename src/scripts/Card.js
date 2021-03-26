export class Card {
  constructor({ data, removeCard, likeCard, openImage }, createCard) {
    this.removeCard = removeCard;
    this.likeCard = likeCard;
    this.openImage = openImage;
    this._elem = createCard(data);
    this._removeHandle = this._removeHandle.bind(this);
    this._likeHandle = this._likeHandle.bind(this);
    this._openHandle = this._openHandle.bind(this);

    this._buttonLike = this._elem.querySelector('.place-card__like-icon');
    this._buttonRemove = this._elem.querySelector('.place-card__delete-icon');
    this._cardImage = this._elem.querySelector('.place-card__image');
    this.setView(data);
    this._addListener();
  }

  get node() {
    return this._elem;
  }
  get id() {
    return (this.data._id || this.data.idCard);
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
  _openHandle(e) {
    return this.openImage(e);
  }
  _addListener() {
    this._buttonRemove
      .addEventListener('click', this._removeHandle);
    this._buttonLike
      .addEventListener('click', this._likeHandle);
    this._cardImage
      .addEventListener('click', this._openHandle);
  }
  _removeListener() {
    this._buttonRemove
      .removeEventListener('click', this._removeHandle);
    this._buttonLike
      .removeEventListener('click', this._likeHandle);
    this._cardImage
      .removeEventListener('click', this._openHandle);
  }
}