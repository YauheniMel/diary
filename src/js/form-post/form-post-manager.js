import Validation from '../validation';

class FormPostManager {
  constructor(form) {
    this.form = form;
    this.imgPreviewEl = form.querySelector('.form-post__preview');
    this.inputFileEl = document.querySelector('.form-post__picture');

    this.init();
  }

  init() {
    this.form.addEventListener('submit', this.handleSubmitPostValue.bind(this));

    this.inputFileEl.addEventListener('change', this.handleChangeInputFileEl.bind(this));
  }

  handleSubmitPostValue(event) {
    event.preventDefault();

    new Validation(this.form, 'post');
  }

  handleChangeInputFileEl() {
    this.imgPreviewEl.innerHTML = '';

    const file = this.inputFileEl.files[0];

    const urlFile = URL.createObjectURL(file);
    const img = document.createElement('img');
    img.style.cssText = `
      height: 100%;
    `;
    img.src = urlFile;

    this.imgPreviewEl.append(img);
  }
}

export default FormPostManager;
