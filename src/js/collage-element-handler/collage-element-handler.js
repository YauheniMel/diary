import CardHandler from '../card-elem/card-handler';

class CollageElementHandler {
  position = {
    left: 0,
    top: 0
  }

  shifts = {
    x: 0,
    y: 0
  }

  collageElem = null;

  constructor() {
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);

    this.deleteCollageItem = this.deleteCollageItem.bind(this);

    this.init();
  }

  init() {
    document.addEventListener('mousedown', this.mouseDown);

    document.addEventListener('render-collage', (event) => {
      this.renderCollage(event.detail.collage);
    });

    document.addEventListener('click', this.deleteCollageItem);
  }

  mouseDown(event) {
    const targetEl = event.target;
    if(targetEl.closest('.collage-item')) {
      this.collageElem = targetEl.closest('.collage-item');

      this.shifts.x = event.clientX - this.collageElem.getBoundingClientRect().left;
      this.shifts.y = event.clientY - this.collageElem.getBoundingClientRect().top + 60;

      document.addEventListener('mousemove', this.mouseMove);
      document.addEventListener('mouseup', this.mouseUp);
    }

    return false;
  }

  mouseMove(event) {
    this.position.left = event.clientX - this.shifts.x;
    this.position.top = event.clientY - this.shifts.y;

    this.collageElem.style.left = this.position.left + 'px';
    this.collageElem.style.top = this.position.top + 'px';
  }

  mouseUp(event) {
    let arrLocalStorage = JSON.parse(localStorage.getItem('collage'));

    const collageItemId = this.collageElem.querySelector('.collage-item__image').dataset.id;

    arrLocalStorage.map(item => {
      if(item.id == collageItemId) {
        item.top = this.position.top;
        item.left = this.position.left;
      }
    })

    const str = JSON.stringify(arrLocalStorage);
    localStorage.setItem('collage', str);

    document.removeEventListener('mousemove', this.mouseMove);
  }

  renderCollage(arr) {
    const collageWrapEl = document.querySelector('.home');
    collageWrapEl.innerHTML = '';

    if(collageWrapEl.querySelectorAll('.collage-item__image')) {
      const collageImages = collageWrapEl.querySelectorAll('.collage-item__image');

      arr.forEach(item => {
        for(let i = 0; i < arr.length; i++) {
          if(collageImages[i] && collageImages[i].dataset.id == item.id) return;
        }

        const template = `
          <button class="collage-item__btn">X</button>
          <p data-id="${item.id}" class="collage-item__image"></p>
        `;

        const collageItem = document.createElement('div');
        collageItem.classList.add('collage-item');
        collageItem.innerHTML = template;

        const imageCollageEl = collageItem.querySelector('.collage-item__image');

        collageItem.style.cssText = `
          top: ${item.top}px;
          left: ${item.left}px;
        `;

        imageCollageEl.style.cssText = `
          display: inline-block;
          background: url(./photo/${item.id}.jpg) no-repeat;
          background-size: cover;
          background-position-y: center;
        `;

        collageWrapEl.append(collageItem);
      });
    }

    new CardHandler();
  }

  deleteCollageItem(event) {
    const targetEl = event.target;

    if(targetEl.closest('.collage-item__btn')) {
      const collageItem = targetEl.closest('.collage-item');

      let arrLocalStorage = JSON.parse(localStorage.getItem('collage'));

      const collageItemId = this.collageElem.querySelector('.collage-item__image').dataset.id;

      arrLocalStorage = arrLocalStorage.filter(item => item.id != collageItemId);
      const str = JSON.stringify(arrLocalStorage);
      localStorage.setItem('collage', str);

      this.renderCollage(arrLocalStorage);
    }
  }
}

export default CollageElementHandler;
