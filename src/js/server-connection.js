class ServerConnection {
  constructor(form) {
    this.formData = new FormData(form);
  }

  async getData() {
    return await fetch('/api/data', {
      method: 'GET',
    });
  }

  async postData() {
    await fetch('api/data', {
      method: 'POST',
      body: this.formData,
    });
  }

  async delData(id) {
    await fetch(`api/data/${id}`, {
      method: 'DELETE',
    });
  }

  async putData(id) {
    await fetch(`api/data/${id}`, {
      method: 'PUT',
      body: this.formData,
    });
  }
}

export default ServerConnection;
