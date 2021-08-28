class NavManager {
  constructor(formPostEl) {
    this.linkMainEl = document.querySelector('.nav__link-main');
    this.linkMemoryEl = document.querySelector('.nav__link-memory');
    this.linkPostEl = document.querySelector('.nav__link-post');

    this.formPostEl = formPostEl;

    this.init();
  }

  init() {
    document.addEventListener('click', this.hideShowElem.bind(this));
  }

  hideShowElem(event) {
    const targetEl = event.target;

    if (targetEl === this.linkPostEl) {
      this.formPostEl.classList.toggle('show');
    } else if (targetEl.closest('form') !== this.formPostEl) {
      this.formPostEl.classList.remove('show');
    }
  }
}

export default NavManager;
