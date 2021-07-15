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

    const data = new FormData(this.form);

    const obj = {};

    data.forEach((value, name) => {
      obj[name] = value;

      const inputEl = document.querySelector(`[name="${name}"]`);
      inputEl.value = '';
    });

    obj.id = +new Date();

    console.log(obj);
  }
}

export default FormManager;
