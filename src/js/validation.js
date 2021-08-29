import ServerConnection from './server-connection.js';
import getServerValues from './get-server-values.js';

class Validation {
  srcImgEl = '';

  constructor(formEl, command) {
    this.formEl = formEl;
    this.command = command;

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
        this.postData();
      } else if(this.command == 'put') {
        this.putData();
      }
    }
  }

  postData() {
    const apiMethods = new ServerConnection(this.formEl);

    this.clearFormEl();

    apiMethods.postData()
      .then(getServerValues())
      .catch(err => console.log(err));
  }

  putData() {
    const apiMethods = new ServerConnection(this.formEl);

    const cardRevierEl = this.formEl.closest('.card-reviewer');
    const id = cardRevierEl.getAttribute('id');

    apiMethods.putData(id)
      .then(getServerValues())
      .catch(err => console.log(err));
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
