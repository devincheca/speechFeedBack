export default class Request {
  constructor() {
    this.endpoint = '';
    this.data = {};
  }
  async send() {
    if (this.endpoint === '') { throw new Error('req.endpoint must be specified'); }
    const res = await fetch('/api/' + this.endpoint, {
      method: 'POST',
      body: JSON.stringify(this.data),
    });
    return res.json();
  }
}
