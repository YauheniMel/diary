import Validation from '../validation';
import ServerConnection from '../server-connection';

class FormPutManager {
  constructor(data) {
    this.data = data;
    this.cardRevierEl = document.querySelector('.card-reviewer');
    this.templateEl = templateFormPut.content.cloneNode(true);
    this.formEl = this.templateEl.querySelector('form');
    this.previewImgEl = this.formEl.querySelector('.form-put__preview');
    this.apiMethods = new ServerConnection();
    this.inputFileEl = this.formEl.querySelector('.form-put__picture');

    this.init();
  }

  init() {
    this.buildFormPut();

    this.formEl.addEventListener('submit', this.handleSubmitPutValue.bind(this));
    this.formEl.addEventListener('click', this.handleClickButtons.bind(this));
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
    imgEl.src = `./foto/${url}`;

    this.previewImgEl.append(imgEl);
  }

  handleSubmitPutValue(event) {
    event.preventDefault();

    new Validation(this.formEl, 'put');
  }

  handleClickButtons() {
    const targetEl = event.target;

    const targetBtnEl = targetEl.closest('.form-put__button');

    if (!targetBtnEl) return;

    if (targetBtnEl.dataset.action == 'confirm') {
      this.formEl.classList.add('hide');

      const cardIdValue = this.cardRevierEl.getAttribute('id');

      this.apiMethods.getData()
        .then((response) => response.json())
        .then((data) => data.filter((obj) => obj.id == cardIdValue))
        .then((currentData) => {
          document.dispatchEvent(new CustomEvent('show-card_reviewer', {
            detail: {
              data: currentData,
            },
          }));
        })
        .catch((err) => console.log(err));

      document.removeEventListener('click', this.handleClickButtons);
    } else if (targetBtnEl.dataset.action == 'cancel') {
      this.formEl.classList.add('hide');
    }
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
