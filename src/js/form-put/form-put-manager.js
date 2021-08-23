import Validation from '../validation';

class FormPutManager {
  constructor(data) {
    this.data = data;
    this.cardRevierEl = document.querySelector('.card-reviewer');
    this.templateEl = templateFormPut.content.cloneNode(true);
    this.formEl = this.templateEl.querySelector('form');

    this.init();
  }

  init() {
    this.buildFormPut();

    this.formEl.addEventListener('submit', this.handleSubmitGetValue.bind(this));
  }

  buildFormPut() {
    this.cardRevierEl.append(this.formEl);

    this.pushDefaultValue(this.formEl);
  }

  pushDefaultValue(form) {
    const inputTitleEl = form.querySelector('.form-put__title');
    const textareaContentEl = form.querySelector('.form-put__content');
    const inputDateEl = form.querySelector('.form-put__date');
    const previewImgEl = form.querySelector('.form-put__preview');

    inputTitleEl.value = this.data.title;
    textareaContentEl.value = this.data.content;
    inputDateEl.value = this.data.date;
    this.getImgEl(previewImgEl);
  }

  getImgEl(wrapEl) {
    wrapEl.style.cssText = `
      background: url(./foto/${this.data.imageName}) no-repeat;
      background-size: contain;
      overflow: auto;
      background-position-x: center;
    `;
  }

  handleSubmitGetValue(event) {
    event.preventDefault();

    new Validation(this.formEl, 'put');
  }
}

export default FormPutManager;
