import ServerConnection from '../server-connection';
import getServerValues from '../get-server-values';

class CardHandler {
  constructor() {
    this.sectionMemoryEl = document.querySelector('.memory');
    this.navLinkPostEl = document.querySelector('.nav__link-post');

    this.init();
  }

  async init() {
    const result = await getServerValues();

    this.renderCard(result);

    this.navLinkPostEl.style.cssText = `
      backgroun-color: none;
    `;
  }

  renderCard(data) {
    this.getSortArr(data);

    this.sectionMemoryEl.innerHTML = '';
    const template = `
      <h2 class="memory__date">июль 2021</h2>
      <div class="memory__wrap-card"></div>
    `;

    const articleEl = document.createElement('article');
    articleEl.innerHTML = template;
    const wrapCardEl = articleEl.querySelector('.memory__wrap-card');

    let arrLocalStorage = JSON.parse(localStorage.getItem('collage'));

    data.forEach((item, index) => {
      const templateCardEl = templateCard.content.cloneNode(true);
      const cardEl = templateCardEl.querySelector('.card');
      const cardTitleEl = templateCardEl.querySelector('.card__title');
      const cardDateEl = templateCardEl.querySelector('.card__date');
      const btnDelCardEl = templateCardEl.querySelector('.card__btn-delete');
      const cardImageEl = templateCardEl.querySelector('.card__image');

      for(let key in arrLocalStorage) {
        if(arrLocalStorage[key].id == item.id) {
          cardImageEl.style.cssText = `
            opacity: 1;
          `;
        }
      }

      cardEl.setAttribute('id', item.id);

      cardEl.addEventListener('click', () => this.handleClickCard());
      btnDelCardEl.addEventListener('click', () => this.handleClickDeleteCard());

      cardEl.style.cssText = `
        background: url(./photo/${item.imageName}) no-repeat;
        background-size: 100% auto;
        overflow: hidden;
        background-position-y: center;
      `;

      cardTitleEl.innerHTML = item.title;
      cardDateEl.innerHTML = item.date;

      wrapCardEl.append(cardEl);

      this.sectionMemoryEl.append(articleEl);
    });
  }

  async handleClickDeleteCard() {
    const targetCardEl = event.target.closest('.card');

    const cardIdValue = targetCardEl.getAttribute('id');

    new ServerConnection('delete', cardIdValue, null);

    let arrLocalStorage = JSON.parse(localStorage.getItem('collage'));
    arrLocalStorage = arrLocalStorage.filter(item => item.id !== cardIdValue);
    const str = JSON.stringify(arrLocalStorage);
    localStorage.setItem('collage', str);

    document.dispatchEvent(new CustomEvent('render-collage', {
      detail : {
        collage: arrLocalStorage
      }
    }));

    const result = await getServerValues();

    this.renderCard(result);
  }

  async handleClickCard() {
    const targetEl = event.target;

    const targetCardEl = targetEl.closest('.card');
    const targetBtnCardDelEl = targetEl.closest('.card__btn-delete');
    const targetImageEl = targetEl.closest('.card__image');
    if (targetImageEl) this.setFavouritCardEl(targetImageEl);
    if (targetCardEl && !targetBtnCardDelEl && !targetImageEl) {
      const cardIdValue = targetCardEl.getAttribute('id');

      const result = await getServerValues();
      const targetObj = result.filter((obj) => obj.id == cardIdValue);

      document.dispatchEvent(new CustomEvent('show-card_reviewer', {
        detail: {
          data: targetObj,
        },
      }));
    }
  }

  setFavouritCardEl(el) {
    el.style.cssText = `
      opacity: 1;
    `;

    const targetCardEl = el.closest('.card');

    const obj = {
      id: targetCardEl.id,
      top: 50,
      left: 20,
    }

    if(!localStorage.getItem('collage')) {
      localStorage.setItem('collage', '[]');
      let arrLocalStorage = JSON.parse(localStorage.getItem('collage'));
      arrLocalStorage.push(obj);
      const str = JSON.stringify(arrLocalStorage);
      localStorage.setItem('collage', str);

      document.dispatchEvent(new CustomEvent('render-collage', {
        detail : {
          collage: arrLocalStorage
        }
      }));
    } else {
      let arrLocalStorage = JSON.parse(localStorage.getItem('collage'));

      let i = 0;

      for(let item in arrLocalStorage) {
        if(arrLocalStorage[item].id == obj.id) {
          i++;
          break;
        }
      }

      if(i === 0) arrLocalStorage.push(obj);

      const str = JSON.stringify(arrLocalStorage);
      localStorage.setItem('collage', str);

      document.dispatchEvent(new CustomEvent('render-collage', {
        detail : {
          collage: arrLocalStorage
        }
      }));
    }
  }

  getSortArr(arr) {
    console.log(arr);
  }
}

export default CardHandler;
