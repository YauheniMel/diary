import ServerConnection from '../server-connection';
import getServerValues from '../get-server-values';

class CardHandler {
  constructor() {
    this.wrapCardEl = document.querySelector('.main__wrap-card');

    this.init();
  }

  async init() {
    const result = await getServerValues();

    this.renderCard(result);
  }

  renderCard(data) {
    this.wrapCardEl.innerHTML = '';

    data.forEach((item) => {
      const templateCardEl = templateCard.content.cloneNode(true);
      const cardEl = templateCardEl.querySelector('.card');
      const cardTitleEl = templateCardEl.querySelector('.card__title');
      const cardDateEl = templateCardEl.querySelector('.card__date');
      const btnDelCardEl = templateCardEl.querySelector('.card__btn-delete');

      cardEl.setAttribute('id', item.id);

      cardEl.addEventListener('click', () => this.handleClickOpenCard());
      btnDelCardEl.addEventListener('click', () => this.handleClickDeleteCard());

      cardEl.style.cssText = `
        background: url(./photo/${item.imageName}) no-repeat;
        background-size: 100% auto;
        overflow: hidden;
        background-position-y: center;
      `;

      cardTitleEl.innerHTML = item.title;
      cardDateEl.innerHTML = item.date;

      this.wrapCardEl.append(cardEl);
    });
  }

  async handleClickDeleteCard() {
    const targetCardEl = event.target.closest('.card');

    const cardIdValue = targetCardEl.getAttribute('id');

    new ServerConnection('delete', cardIdValue, null);

    const result = await getServerValues();

    this.renderCard(result);
  }

  async handleClickOpenCard() {
    const targetEl = event.target;

    const targetCardEl = targetEl.closest('.card');
    const targetBtnCardDelEl = targetEl.closest('.card__btn-delete');

    if (targetCardEl && !targetBtnCardDelEl) {
      const cardIdValue = targetCardEl.getAttribute('id');

      const result = await getServerValues();
      const targetObj = result.filter((obj) => obj.id == cardIdValue);

      document.dispatchEvent(new CustomEvent('show-card_reviewer', {
        detail: {
          data: targetObj,
        },
      }));
    }
  }
}

export default CardHandler;
