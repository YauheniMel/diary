import delElemHTML from '../del-elem-html';

class CardReviewerManager {
  _elem;
  _data;
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('show-card_reviewer', (event) => {
      this._elem = event.detail.wrapEl;
      this._data = event.detail.data[0];
      this.renderCardReviewer();
    });
  }

  renderCardReviewer() {
    const wrapCardReviewerEl = document.createElement('div');
    wrapCardReviewerEl.classList.add('wrap_card-reviewer');

    const template = `
      <div onclick="${delElemHTML(wrapCardReviewerEl)}" class="card-reviewer">
        <div class="card-reviewer__title">
          <h2>${this._data.title}</h2>
        </div>
        <div class="card-reviewer__main">
          <div class="card-reviewer__image">
            <img src="./publick/foto/${this._data.imageName}" alt="">
          </div>
          <div class="card-reviewer__content">${this._data.content}</div>
        </div>
        <div class="card-reviewer__footer">
          <div class="card-reviewer__btn-section">
            <button class="card-reviewer__btn-correct">Изменить</button>
            <button class="card-reviewer__btn-hidden">Закрыть</button>
          </div>
          <time class="card-reviewer__date">${this._data.date}</time>
        </div>
      </div>
    `;

    wrapCardReviewerEl.innerHTML = template;

    this._elem.append(wrapCardReviewerEl);
  }
}



export default CardReviewerManager;
