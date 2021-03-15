export class Card {
  constructor(template) {
    // this.callBack = callBack;
    this.template = template;
  }
  create(form) {
    const card = this.template.content.cloneNode(true).querySelector('.place-card');
    console.log(card);
    console.log(form);
  }
}
