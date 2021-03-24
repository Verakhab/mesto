export class CardList {
  constructor(container) {
      this.container = container;
  }
  render(dataCard, createCard) {
    this.container.append(createCard(dataCard));
  }
}