export class CardList {
  constructor(container) {
      this.container = container;
  }
  render(objCard) {
    this.container.appendChild(objCard)
  }
}