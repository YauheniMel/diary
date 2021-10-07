class CollageElementHandler {
  position = {
    left: 0,
    top: 50
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

    this.init();
  }

  init() {
    document.addEventListener('mousedown', this.mouseDown);
  }

  mouseDown(event) {
    const targetEl = event.target;
    if(targetEl.closest('.collage-item')) {
      this.collageElem = targetEl.closest('.collage-item');

      this.shifts.x = event.clientX - this.collageElem.getBoundingClientRect().left;
      this.shifts.y = event.clientY - this.collageElem.getBoundingClientRect().top;

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

  mouseUp() {
    document.removeEventListener('mousemove', this.mouseMove);
  }

}

export default CollageElementHandler;
