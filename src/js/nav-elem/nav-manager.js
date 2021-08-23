class NavManager {
  constructor(formCreatorEl) {
    this.linkMainEl = document.querySelector('.nav__link-main');
    this.linkMemoryEl = document.querySelector('.nav__link-memory');
    this.linkCreatorEl = document.querySelector('.nav__link-creator');

    this.formCreatorEl = formCreatorEl;

    this.init();
  }

  init() {
    document.addEventListener('click', this.hideShowElem.bind(this));
  }

  hideShowElem(event) {
    const targetEl = event.target;

    if (targetEl === this.linkCreatorEl) {
      this.formCreatorEl.classList.toggle('show');
    } else if (targetEl.closest('form') !== this.formCreatorEl) {
      this.formCreatorEl.classList.remove('show');
    }
  }
}

export default NavManager;
