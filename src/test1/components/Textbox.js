import createTemplate from '../infrastructure/template.js';
import createComponent from '../infrastructure/component.js';

const template = createTemplate(`<input type="textbox"></input>`);

export default (handler) => {
  return class Textbox extends createComponent(template) {
    #handler = null;
    #value = '';

    get value() {
      return this.#value;
    }

    set value(value) {
      if (this.#value === value) return;

      this.#value = this.shadowRoot.children[0].value = value;

      this.dispatchEvent(
        new CustomEvent('value-changed', {
          detail: value,
        })
      );

      this.#handler?.changed?.(this.value);
    }

    constructor() {
      super();

      this.#handler = handler?.(this);
    }

    connectedElements() {
      this.shadowRoot.children[0].addEventListener('input', (event) => {
        this.value = event.target.value;
      });

      this.#handler?.connected?.();
    }
  };
};
