const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

class DOMPurify {
  constructor() {
    this.dirty = '';
    this.clean = '';
  }

  scrub() {
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
    const clean = DOMPurify.sanitize(this.dirty);
    this.clean = clean;
    return this.clean;
  }
}

module.exports = DOMPurify;
