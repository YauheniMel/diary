import Validation from './validation';

class FormManager {
  constructor(form) {
    this.form = form;

    this.init();
  }

  init() {
    this.form.addEventListener('submit', this.handelSubmitGetValue.bind(this));
  }

  handelSubmitGetValue(event) {
    event.preventDefault();

    new Validation(this.form);
  }
}

export default FormManager;
