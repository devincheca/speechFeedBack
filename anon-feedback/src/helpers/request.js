export default class Request {
  constructor() {
    this.endpoint = '';
    this.data = {};
  }
  async send() {
    if (this.endpoint === '') { throw new Error('req.endpoint must be specified'); }
    const res = await fetch('/api/' + this.endpoint, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(this.data),
    });
    console.log(res);
    console.log(await res.json());
    return await res.json();
  }
}
