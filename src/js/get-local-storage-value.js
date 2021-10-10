function getLocalStorageValue() {
  let arrLocalStorage = JSON.parse(localStorage.getItem('collage'));

  document.dispatchEvent(new CustomEvent('render-collage', {
    detail : {
      collage: arrLocalStorage
    }
  }));
}

export default getLocalStorageValue;
