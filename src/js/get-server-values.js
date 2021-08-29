import ServerConnection from './server-connection';
import CardHandler from './card-elem/card-handler';

function getServerValues() {
  const fetchMethods = new ServerConnection();

  const wrapCardEl = document.querySelector('.main__wrap-card');
  wrapCardEl.innerHTML = '';

  fetchMethods.getData()
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      result.forEach((obj) => {
        const cardControl = new CardHandler(obj);

        cardControl.renderCard(obj);
      });
    })
    .catch((err) => console.error(err));
}

export default getServerValues;
