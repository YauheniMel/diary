import FormPutManager from '../form-put/form-put-manager';
import CardHandler from '../card-elem/card-handler';

class CardReviewerManager {
  data;
  elem;
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('show-card_reviewer', (event) => {
      this.data = event.detail.data[0];
      this.renderCardReviewer();
    });
  }

  renderCardReviewer() {
    let wrapCardReviewerEl = document.querySelector('.wrap_card-reviewer');

    if (!wrapCardReviewerEl) {
      wrapCardReviewerEl = document.createElement('div');
      wrapCardReviewerEl.classList.add('wrap_card-reviewer');
    }

    const template = `
      <div class="card-reviewer" id="${this.data.id}">
        <div class="card-reviewer__title">
          <h2>${this.data.title}</h2>
        </div>
        <div class="card-reviewer__main">
          <div class="card-reviewer__image">
            <img src="./photo/${this.data.imageName}" alt="">
          </div>
          <div class="card-reviewer__content">${this.data.content}</div>
        </div>
        <div class="card-reviewer__footer">
          <div class="card-reviewer__btn-section">
            <button data-action="put" class="card-reviewer__btn-put">Изменить</button>
            <button data-action="delete" class="card-reviewer__btn-delete">Закрыть</button>
          </div>
          <time class="card-reviewer__date">${this.data.date}</time>
        </div>
      </div>
    `;

    wrapCardReviewerEl.innerHTML = template;

    document.body.append(wrapCardReviewerEl);

    wrapCardReviewerEl.addEventListener('click', this.handleClickDeleteEl.bind(this));
  }

  handleClickDeleteEl(event) {
    const targetEl = event.target;

    const wrapEl = document.querySelector('.wrap_card-reviewer');

    if (targetEl.dataset.action == 'delete') {
      new CardHandler();

      wrapEl.remove();
    } else if (targetEl.dataset.action == 'put') {
      new FormPutManager(this.data);
    }
  }
}

export default CardReviewerManager;
