export class Card {
  constructor(cardFragment, { callBackRemove, callBackLike }) {
    this.cardFragment = cardFragment;
    this.callBackRemove = callBackRemove;
    this.callBackLike = callBackLike;
    this.remove = this.remove.bind(this);
    this.like = this.like.bind(this);
  }
  create(objUser, objCard) {
    const card = this.cardFragment.content.cloneNode(true).querySelector('.place-card');
    const cardImage = card.querySelector('.place-card__image');
    const cardName = card.querySelector('.place-card__name');
    const cardLikeIcon = card.querySelector('.place-card__like-icon');
    const cardLikeCount = card.querySelector('.place-card__counter');
    const cardDeleteButton = card.querySelector('.place-card__delete-icon');
    cardImage
      .setAttribute(
        'style',
        `background-image: url(${'data:' + objCard.imageType + ';base64,' + objCard.imageCard})`
      );
    if (objCard.owner !== objUser._id) {
      cardDeleteButton.remove();
    } else {
      cardDeleteButton
        .setAttribute(
          'style',
          'display: block'
        );
    }
    cardName.textContent = objCard.name;
    if (objCard.likes.includes(objUser._id)) {
      cardLikeIcon.classList.toggle('place-card__like-icon_liked');
    }
    cardLikeCount.textContent = objCard.likes.lenght;
    card.querySelector('.place-card__delete-icon')
      .addEventListener('click', this.remove);
    card.querySelector('.place-card__like-icon')
      .addEventListener('click', this.like);
    return card;
  }
  remove(e) {
    return this.callBackRemove(e);
  }
  like(e) {
    return this.callBackLike(e);
  }
  // _addListener() {
  //   document.querySelector('.place-card__delete-icon')
  //     .addEventListener('click', this.remove);
  //   document.querySelector('.place-card__like-icon')
  //     .addEventListener('click', this.like);
  // }
}
