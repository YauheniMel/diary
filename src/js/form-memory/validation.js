class Validation {
  postObj = {};
  constructor(form, callback) {
    this.form = form;
    this.callback = callback;

    this.arrFormElements = form.querySelectorAll('label > input,textarea');

    this.init();
  }

  init() {
    this.checkValidation();
  }

  showErrors(arr) {
    arr.forEach((elem) => {
      if (elem.validity.valueMissing) {
        this.form.classList.add('check_valid');
        elem.nextElementSibling.innerHTML = 'Данные отсутствуют';
      } else if (!elem.validity.valid && !elem.validity.valueMissing) {
        this.form.classList.add('check_valid');

        const atr = elem.getAttribute('maxlength');
        elem.nextElementSibling.innerHTML = `Поле должно содержать от 2 до ${atr} символов`;
      }
    });
  }

  checkValidation() {
    if (!this.form.checkValidity()) {
      this.showErrors(this.arrFormElements);
    } else {
      this.postObj = this.callback(this.form);

      console.log(this.postObj);
    }
  }
}

export default Validation;
