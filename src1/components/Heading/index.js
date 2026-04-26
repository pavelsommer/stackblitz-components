import createTemplate from '../../template.js';
import createComponent from '../../component.js';

export default (initializer) => {
  const template = createTemplate(`<h1>
  <slot name="title"></slot>
</h1>
<hr />`);

  const titleEl = (() => {
    const template = document.createElement('span');

    return (component, value) => {
      const element = template.cloneNode(true);
      element.slot = 'title';
      element.textContent = value;

      return {
        element,
        setText: (value) => {
          if (element.textContent === value) return;

          element.textContent = value;

          component.dispatchEvent(new CustomEvent('value-changed', {
            detail: {
              target: element,
              key: 'title',
              value
            }
          }));
        },
      };
    };
  })();

  return class extends createComponent(template, initializer) {
    static observedAttributes = ['data-title'];

    #titleEl = null;

    setTitle = null;

    ready() {
      ({ element: this.#titleEl, setText: this.setTitle } = titleEl(this,
        this.dataset.title || ''
      ));

      this.appendChild(this.#titleEl);
    }
  }
}