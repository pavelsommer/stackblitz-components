import createTemplate from '../infrastructure/template.js';
import createComponent from '../infrastructure/component.js';

const template = (() => {
  return createTemplate(`<button>off</button>`);
})();

export default (connected) => {
  return class StateButton extends createComponent(template) {
    #state = false;

    get state() {
      return this.#state;
    }

    set state(value) {
      if (this.#state === value) return;

      this.#state = value;
      this.dispatchEvent(
        new CustomEvent('value-changed', {
          detail: this.#state,
        })
      );

      this.updateElements();
    }

    connectedElements() {
      this.addEventListener('click', (event) => {
        this.state = !this.state;
      });

      if (connected) connected(this);
    }

    updateElements() {
      this.shadowRoot.children[0].textContent = this.#state ? 'on' : 'off';
    }
  };
};
