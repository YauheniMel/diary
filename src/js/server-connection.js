class ServerConnection {
  formData = '';
  constructor(command, id, form) {
    this.command = command;
    this.id = id;
    this.form = form;

    this.init();
  }

  init() {
    if (this.command == 'delete') {
      this.delData(this.id);
    } else if (this.command == 'post') {
      this.formData = new FormData(this.form);

      this.postData();
    } else if (this.command == 'put') {
      this.formData = new FormData(this.form);

      this.putData(this.id);
    }
  }

  async getData() {
    const response = await fetch('/api/data', {
      method: 'GET',
    });

    return await response.json();
  }

  async postData() {
    await fetch('api/data', {
      method: 'POST',
      body: this.formData,
    });

    return;
  }

  async delData(id) {
    await fetch(`api/data/${id}`, {
      method: 'DELETE',
    });

    return;
  }

  async putData(id) {
    await fetch(`api/data/${id}`, {
      method: 'PUT',
      body: this.formData,
    });

    return;
  }
}

export default ServerConnection;
