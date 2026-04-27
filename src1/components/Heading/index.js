import createTemplate from '../../template.js';
import createComponent from '../../component.js';

export default (initializer) => {
  const template = createTemplate(`<h1>
  <slot name="title"></slot>
</h1>
<hr />`);

  const titleFragment = (() => {
    const template = document.createElement('span');

    return (component, options) => {
      const element = template.cloneNode(true);

      options?.slot && (element.slot = options.slot);
      options?.text && (element.textContent = options.text);

      return {
        element,

        setStyle: (style) => {
          Object.assign(element.style, style);
        },

        getText: () => element.textContent,
        setText: (text) => {
          if (element.textContent === text) return;

          element.textContent = text;

          element.dispatchEvent(new CustomEvent('value-changed', {
            detail: {
              target: element,
              key: 'text',
              value: text
            }
          }));
        },
      };
    };
  })();

  return class extends createComponent(template, initializer) {
    static observedAttributes = ['data-title'];

    #Title = null;

    get Title() {
      return this.#Title.getText();
    }

    set Title(value) {
      this.#Title.setText(value);
    }

    set Style(value) {
      value?.title && (this.#Title.setStyle(value.title));

      if (value?.root) {
        const element = this.shadowRoot.querySelector('h1');

        if (element) {
          Object.assign(element.style, value.root);
        }
      }
    }

    ready() {
      this.#Title = titleFragment(this,
        {
          text: this.dataset.title || '',
          slot: 'title'
        }
      );

      this.#Title.element.addEventListener('value-changed', event => {
        this.dispatchEvent(new CustomEvent('value-changed', {
          detail: {
            target: this.#Title,
            key: 'title',
            value: event.detail.value
          }
        }));
      });

      this.appendChild(this.#Title.element);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (!this.shadowRoot) return;

      switch (name) {
        case 'data-title':
          this.Title = newValue;

          break;
      }
    }
  };
};
