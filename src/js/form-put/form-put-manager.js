import Validation from '../validation';
import ServerConnection from '../server-connection';

class FormPutManager {
  constructor(data) {
    this.data = data;
    this.cardRevierEl = document.querySelector('.card-reviewer');
    this.templateEl = templateFormPut.content.cloneNode(true);
    this.formEl = this.templateEl.querySelector('form');
    this.previewImgEl = this.formEl.querySelector('.form-put__preview');
    this.inputFileEl = this.formEl.querySelector('.form-put__picture');
    this.cancelBtnEl = this.formEl.querySelector('.form-put__button-cancel');

    this.handleCancelButton = this.handleCancelButton.bind(this);

    this.init();
  }

  init() {
    this.buildFormPut();

    this.formEl.addEventListener('submit', this.handleSubmitPutValue.bind(this));
    this.cancelBtnEl.addEventListener('click', this.handleCancelButton);
  }

  buildFormPut() {
    this.cardRevierEl.append(this.formEl);

    this.pushDefaultValue(this.formEl);
  }

  pushDefaultValue(form) {
    form.classList.remove('hide');

    const inputTitleEl = form.querySelector('.form-put__title');
    const textareaContentEl = form.querySelector('.form-put__content');
    const inputDateEl = form.querySelector('.form-put__date');

    this.inputFileEl.addEventListener('change', this.handleChangeInputFileEl.bind(this));

    inputTitleEl.value = this.data.title;
    textareaContentEl.value = this.data.content;
    inputDateEl.value = this.data.date;
    this.getImgEl(this.data.imageName);
  }

  getImgEl(url) {
    const imgEl = document.createElement('img');
    imgEl.src = `./photo/${url}`;

    this.previewImgEl.append(imgEl);
  }

  async handleSubmitPutValue(event) {
    event.preventDefault();

    new Validation(this.formEl, 'put', this.data.id);

    const apiMethods = new ServerConnection;

    const result = await apiMethods.getData();

    const targetData = await result.filter(item => item.id == this.data.id);

    document.dispatchEvent(new CustomEvent('show-card_reviewer', {
      detail: {
        data: targetData,
      },
    }));

    this.formEl.remove();
  }

  handleCancelButton() {
    this.formEl.remove();
  }

  handleChangeInputFileEl() {
    this.previewImgEl.innerHTML = '';

    const file = this.inputFileEl.files[0];

    if (file) {
      const urlFile = URL.createObjectURL(file);
      const imgEl = document.createElement('img');
      imgEl.style.cssText = `
        height: 100%;
      `;

      imgEl.src = urlFile;

      this.previewImgEl.append(imgEl);
    }
  }
}

export default FormPutManager;
