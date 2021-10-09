import ServerConnection from './server-connection.js';
import CardHandler from './card-elem/card-handler.js';

class Validation {
  srcImgEl = '';

  constructor(formEl, command, id = null) {
    this.formEl = formEl;
    this.command = command;
    this.id = id;
    this.arrFormElements = formEl.querySelectorAll('label > input,textarea');

    this.init();
  }

  init() {
    this.checkValidation();
  }

  showErrors(arr) {
    arr.forEach((elem) => {
      if (elem.validity.valueMissing) {
        this.formEl.classList.add('check_valid');
        elem.nextElementSibling.innerHTML = 'Данные отсутствуют';
      } else if (!elem.validity.valid && !elem.validity.valueMissing) {
        this.formEl.classList.add('check_valid');

        const atr = elem.getAttribute('maxlength');
        elem.nextElementSibling.innerHTML = `Поле должно содержать от 2 до ${atr} символов`;
      }
    });
  }

  checkValidation() {
    if (!this.formEl.checkValidity()) {
      this.showErrors(this.arrFormElements);
    } else {
      if(this.command == 'post') {
        new ServerConnection(this.command, this.id, this.formEl);

        this.clearFormEl();

        new CardHandler();
      } else if(this.command == 'put') {
        new ServerConnection(this.command, this.id, this.formEl);
      }
    }
  }

  clearFormEl() {
    this.formEl.reset();

    const imgEl = this.formEl.querySelector('img');
    imgEl.remove();

    this.formEl.classList.remove('show');
    this.formEl.classList.remove('check_valid');
  }
}

export default Validation;
