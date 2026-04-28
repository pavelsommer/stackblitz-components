import createComponent from '../infrastructure/component.js';

export default (template, handler) => {
  return class extends createComponent(template) {
    #value = false;
    #handler = null;

    get value() {
      return this.#value;
    }

    set value(value) {
      if (this.#value === value) return;

      this.#value = value;
      this.dispatchEvent(
        new CustomEvent('value-changed', {
          detail: this.#value,
        })
      );

      this.#handler?.changed?.(value);
    }

    constructor() {
      super();

      this.#handler = handler?.(this);
    }

    connectedElements() {
      this.addEventListener('click', (event) => {
        this.value = !this.value;
      });

      this.#handler?.connected?.();
    }
  };
};
