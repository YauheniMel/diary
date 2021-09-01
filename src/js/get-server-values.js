import ServerConnection from './server-connection';

async function getServerValues() {
  const serverContact = new ServerConnection();
  const result = await serverContact.getData();

  return result;
}

export default getServerValues;
