import ServerConnection from '../server-connection.js';
import getServerValues from '../get-server-values.js';

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

  async checkValidation() {
    if (!this.form.checkValidity()) {
      this.showErrors(this.arrFormElements);
    } else {
      const apiMethods = new ServerConnection(this.form);

      apiMethods.postData();

      getServerValues();
    }
  }
}

export default Validation;
