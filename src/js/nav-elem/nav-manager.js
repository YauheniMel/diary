class NavManager {
  constructor(formPostEl) {
    this.linkMainEl = document.querySelector('.nav__link-main');
    this.linkMemoryEl = document.querySelector('.nav__link-memory');
    this.linkPostEl = document.querySelector('.nav__link-post');

    this.hideForm = this.hideForm.bind(this);
    this.showMainPage = this.showMainPage.bind(this);
    this.showMemoryPage = this.showMemoryPage.bind(this);

    this.formPostEl = formPostEl;

    this.init();
  }

  init() {
    document.addEventListener('click', (event) => {
      const targetEl = event.target;
      if (targetEl === this.linkPostEl) {
        this.formPostEl.classList.toggle('show');
        this.linkPostEl.style.cssText = `
          background-color: lightgray;
        `;
      } else if(targetEl.closest('form') !== this.formPostEl) {
        this.hideForm();
        this.linkPostEl.style.cssText = `
          background-color: none;
        `;

        if (targetEl == this.linkMainEl) {
          this.showMainPage();
        } else if (targetEl == this.linkMemoryEl) {
          this.showMemoryPage();
        }
      }
    });
  }

  hideForm() {
    this.formPostEl.classList.remove('show');
  }

  showMainPage() {
    const pageHomeEl = document.querySelector('.home');
    const pageMemoryEl = document.querySelector('.memory');

    this.linkMainEl.classList.add('active');
    this.linkMemoryEl.classList.remove('active');

    pageHomeEl.classList.remove('hide');
    pageMemoryEl.classList.add('hide');
  }

  showMemoryPage() {
    const pageHomeEl = document.querySelector('.home');
    const pageMemoryEl = document.querySelector('.memory');

    this.linkMemoryEl.classList.add('active');
    this.linkMainEl.classList.remove('active');

    pageMemoryEl.classList.remove('hide');
    pageHomeEl.classList.add('hide');
  }
}

export default NavManager;
