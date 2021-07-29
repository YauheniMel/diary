import ServerConnection from '../server-connection';
import getServerValues from '../get-server-values';

class CardHandler {
  constructor() {
    this.wrapCardEl = document.querySelector('.main__wrap-card');
    this.apiMethods = new ServerConnection();

    this.templateEl = template.content.cloneNode(true);
  }

  renderCard(value) {
    const cardEl = this.templateEl.querySelector('.card');
    const cardDescriptionEl = this.templateEl.querySelector('.card__description');
    const cardTimeEl = this.templateEl.querySelector('.card__time');
    const btnDelCardEl = this.templateEl.querySelector('.card__btn-delete');

    cardEl.setAttribute('id', value.id);

    cardEl.addEventListener('click', () => this.handleClickOpenCard());
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

    this.apiMethods.delData(cardIdValue)
      .then(getServerValues())
      .catch((err) => console.log(err));
  }

  handleClickOpenCard() {
    const targetEl = event.target;

    const targetCardEl = targetEl.closest('.card');
    const targetBtnCardDelEl = targetEl.closest('.card__btn-delete');

    if (targetCardEl && !targetBtnCardDelEl) {
      const cardIdValue = targetCardEl.getAttribute('id');

      this.apiMethods.getData()
        .then((response) => response.json())
        .then((data) => data.filter((obj) => obj.id == cardIdValue))
        .then((currentData) => {
          document.dispatchEvent(new CustomEvent('show-card_reviewer', {
            detail: {
              data: currentData,
              wrapEl: this.wrapCardEl,
            },
          }));
        })
        .catch((err) => console.log(err));
    }
  }
}

export default CardHandler;
