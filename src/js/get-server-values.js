import ServerConnection from './server-connection';

function getServerValues() {
  const fetchMethods = new ServerConnection();

  fetchMethods.getData()
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((err) => console.error(err));
}

export default getServerValues;
