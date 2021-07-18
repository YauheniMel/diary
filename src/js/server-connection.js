class ServerConnection {
  constructor(data) {
    this.data = data;

    this.headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
  }

  async getData() {
    return await fetch('/api/data', {
      method: 'GET',
      headers: this.headers,
    });
  }
}

export default ServerConnection;
