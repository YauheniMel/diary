import ServerConnection from '../server-connection';
import getServerValues from '../get-server-values';

class CardHandler {
  constructor() {
    this.wrapCardEl = document.querySelector('.main__wrap-card');

    this.templateEl = template.content.cloneNode(true);
  }

  renderCard(value) {
    const cardEl = this.templateEl.querySelector('.card');
    const cardDescriptionEl = this.templateEl.querySelector('.card__description');
    const cardTimeEl = this.templateEl.querySelector('.card__time');
    const btnDelCardEl = this.templateEl.querySelector('.card__btn-delete');

    cardEl.setAttribute('id', value.id);

    btnDelCardEl.addEventListener('click', () => this.handleClickDeleteCard());

    cardEl.style.cssText = `
      background: url(./publick/foto/${value.imageName}) no-repeat;
      background-size: 100% auto;
      overflow: hidden;
      background-position-y: center;
    `;

    cardDescriptionEl.innerHTML = value.title;
    cardTimeEl.innerHTML = value.date;

    this.wrapCardEl.append(this.templateEl);
  }

  handleClickDeleteCard() {
    const targetCardEl = event.target.closest('.card');

    const cardIdValue = targetCardEl.getAttribute('id');

    const apiMethods = new ServerConnection();

    apiMethods.delData(cardIdValue);

    getServerValues();
  }
}

export default CardHandler;
