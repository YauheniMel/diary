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

    new Validation(this.form, this.getData);
  }

  getData(elem) {
    const data = new FormData(elem);

    const obj = {};

    data.forEach((value, name) => {
      obj[name] = value;

      const inputEl = document.querySelector(`[name="${name}"]`);
      inputEl.value = '';
    });

    obj.id = +new Date();

    return obj;
  }
}

export default FormManager;
