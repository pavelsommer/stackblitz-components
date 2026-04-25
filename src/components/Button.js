import createTemplate from '../infrastructure/template.js';
import createComponent from '../infrastructure/component.js';

const template = createTemplate(`<button>Click Me!</button>`);

export default class Button extends createComponent(template) {
  connectedCallback() {
    super.connectedCallback();
  }
}
