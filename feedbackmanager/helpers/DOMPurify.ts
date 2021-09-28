import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

export class DOMPurify {
  constructor() {
    this.dirty = '';
    this.clean = '';
  }

  scrub(): string {
    const window = new JSDOM('').window;
    const sanitizer = createDOMPurify(window);
    const clean = sanitizer.sanitize(this.dirty);
    this.clean = clean;
    return this.clean;
  }
}

