class Validation {
  constructor(form, callback) {
    this.form = form;
    this.callback = callback;

    this.arrFormElements = form.querySelectorAll('label > *');

    this.init();
  }

  init() {
    this.checkErrors(this.arrFormElements);
  }

  checkErrors(arr) {
    arr.forEach((elem) => {
      console.log(elem.validity.valueMissing);
      console.log(elem.validity.valid);

      // if (elem.validity.valueMissing) {
      // } else if (!elem.validity.valid && !elem.validity.valueMissing) {
      // }
    });
  }
}

export default Validation;
