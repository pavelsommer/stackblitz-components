import createTemplate from '../../../infrastructure/template.js';
import createComponent from '../../../infrastructure/component.js';

export default (handler) => {
  const template = createTemplate(`<li>
  <strong>
    <slot name="title"></slot>
  </strong>
</li>`);

  const title = (() => {
    const template = document.createElement('span');

    return (text) => {
      const element = template.cloneNode(true);
      element.slot = 'title';
      element.textContent = text;

      return {
        element,
        setText: (text) => (element.textContent = text),
      };
    };
  })();

  return class extends createComponent(template) {
    static observedAttributes = ['data-title'];

    #title = null;

    setTitle = null;

    connectedCallback() {
      super.connectedCallback();

      ({ element: this.#title, setText: this.setTitle } = title(
        this.dataset.title || ''
      ));

      this.appendChild(this.#title);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'data-title':
          this.shadowRoot && this.setTitle(newValue || '');

          break;
      }
    }
  };
};
