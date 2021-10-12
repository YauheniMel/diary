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
    const copyData = data.slice();
    const calendar = this.buildCalendar(data);
    this.sectionMemoryEl.innerHTML = '';

    let arrLocalStorage = JSON.parse(localStorage.getItem('collage'));

    calendar.forEach((item) => {
      copyData.forEach((item2) => {
        if(item2.id == item.id) {

          const templateCardEl = templateCard.content.cloneNode(true);
          const cardEl = templateCardEl.querySelector('.card');
          const cardTitleEl = templateCardEl.querySelector('.card__title');
          const cardDateEl = templateCardEl.querySelector('.card__date');
          const btnDelCardEl = templateCardEl.querySelector('.card__btn-delete');
          const cardImageEl = templateCardEl.querySelector('.card__image');

          cardEl.setAttribute('id', item.id);

          cardEl.addEventListener('click', () => this.handleClickCard());
          btnDelCardEl.addEventListener('click', () => this.handleClickDeleteCard());

          cardEl.style.cssText = `
            background: url(./photo/${item2.imageName}) no-repeat;
            background-size: 100% auto;
            overflow: hidden;
            background-position-y: center;
          `;

          cardTitleEl.innerHTML = item2.title;
          cardDateEl.innerHTML = item2.date;

          if(document.querySelector(`[data-date="${item.date}"]`)){
            const wrapper = document.querySelector(`[data-date="${item.date}"]`);

            wrapper.append(cardEl);
          } else {
            const template = `
              <h2 class="memory__date">${item.date}</h2>
              <div class="memory__wrap-card"></div>
            `;

            const articleEl = document.createElement('article');
            articleEl.innerHTML = template;
            const wrapCardEl = articleEl.querySelector('.memory__wrap-card');
            wrapCardEl.setAttribute('data-date', item.date);

            wrapCardEl.append(cardEl);

            this.sectionMemoryEl.append(articleEl);
          }

          for(let key in arrLocalStorage) {
            if(arrLocalStorage[key].id == item.id) {
              cardImageEl.style.cssText = `
                opacity: 1;
              `;
            }
          }
        }
      })
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
    const arrNum = [];

    arr.forEach(item => {
      const num = item.date.match(/\d/gi).join("");

      arrNum.push(num);
    })

    arrNum.sort();

    let sortArr = [];

    arrNum.forEach(item => {
      arr.forEach((item2, index) => {
        const num = item2.date.match(/\d/g).join("");
        if(item == num) {
          sortArr.push(item2);
          arr.splice(index, 1);
        }
      })
    })

    return sortArr;
  }

  buildCalendar(data) {
    const sortArr = this.getSortArr(data);

    const dateArr = [];
    sortArr.forEach(item => {

      const year = item.date.match(/[0-9]+/);
      const str = item.date.match(/-[0-9]+-/);
      const month = str[0].match(/[0-9]+/);
      const nameMonth = this.getNameMonth(month[0]);

      const date = nameMonth + ' ' + year[0];
      let n = 0;
      let obj = {};
      // if(dateArr[0]) {

      //   for(let key in dateArr) {
      //     if(dateArr[key].date == date) return n++;
      //   }
      //   if(n == 0) {
      //     obj.date = date;
      //     obj.id = item.id;
      //     dateArr.push(obj);
      //   }
      // } else {
        obj.date = date;
        obj.id = item.id;

        dateArr.push(obj);
      // }
    })

    return dateArr;
  }

  getNameMonth(num) {
    if(num == 1) {
      return 'январь';
    } else if(num == 2) {
      return 'февраль';
    } else if(num == 3) {
      return 'март';
    } else if(num == 4) {
      return 'апрель';
    } else if(num == 5) {
      return 'май';
    } else if(num == 6) {
      return 'июнь';
    } else if(num == 7) {
      return 'июль';
    } else if(num == 8) {
      return 'август';
    } else if(num == 9) {
      return 'сентябрь';
    } else if(num == 10) {
      return 'октябрь';
    } else if(num == 11) {
      return 'ноябрь';
    } else return 'декабрь';
  }
}

export default CardHandler;
