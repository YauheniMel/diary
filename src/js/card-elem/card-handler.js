class CardHandler {
  constructor() {
    this.wrapCardEl = document.querySelector('.main__wrap-card');

    this.templateEl = template.content.cloneNode(true);
  }

  renderCard(value) {
    const cardEl = this.templateEl.querySelector('.card');
    const cardDescriptionEl = this.templateEl.querySelector('.card__description');
    const cardTimeEl = this.templateEl.querySelector('.card__time');

    cardEl.style.cssText = `
      background: url(../data/publick-foto/${value.imageName}) no-repeat;
    `;

    cardDescriptionEl.innerHTML = value.title;
    cardTimeEl.innerHTML = value.date;

    this.wrapCardEl.append(this.templateEl);
  }
}

export default CardHandler;
