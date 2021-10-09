class ServerConnection {
  formData = '';
  constructor(command, id, form) {
    this.command = command;
    this.id = id;
    this.form = form;

    this.getData = this.getData.bind(this);
    this.postData = this.postData.bind(this);
    this.delData = this.delData.bind(this);
    this.putData = this.putData.bind(this);

    this.init();
  }

  async init() {
    if (this.command == 'delete') {
      this.delData(this.id);
    } else if (this.command == 'post') {
      this.formData = new FormData(this.form);

      this.postData();
    } else if (this.command == 'put') {
      this.formData = new FormData(this.form);

      await this.putData(this.id);
    }

    const result = this.getData();
    return result;
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
