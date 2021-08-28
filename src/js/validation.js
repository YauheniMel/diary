import ServerConnection from './server-connection.js';
import getServerValues from './get-server-values.js';

class Validation {
  srcImgEl = '';

  constructor(form, command) {
    this.form = form;
    this.command = command;

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
      if(this.command == 'post') {
        this.postData();
      } else if(this.command == 'put') {
        this.putData();
      }
    }
  }

  postData() {
    const apiMethods = new ServerConnection(this.form);

      apiMethods.postData()
        .then(getServerValues())
        .catch(err => console.log(err));
  }

  putData() {
    const apiMethods = new ServerConnection(this.form);

    const cardRevierEl = this.form.closest('.card-reviewer');
    const id = cardRevierEl.getAttribute('id');

    apiMethods.putData(id)
      .then(getServerValues())
      .catch(err => console.log(err));
  }
}

export default Validation;
