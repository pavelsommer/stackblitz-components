class Fragment extends DocumentFragment {
  constructor(content) {
    super();

    const fragment = document.createDocumentFragment();

    Array.isArray(content)
      ? fragment.append(...content)
      : fragment.append(content);

    return fragment;
  }
}

class ComponentBase extends HTMLElement {
  element;

  constructor(options) {
    super();

    this.init = () => {
      if (!options) return;

      const element = document.createElement(options.tagName ?? 'div');

      options.style && Object.assign(element.style, options.style);
      options.attrs && Object.assign(element, options.attrs);

      options.content &&
        (Array.isArray(options.content)
          ? element.append(new Fragment(options.content))
          : element.append(options.content));

      return element;
    };
  }

  connectedCallback() {
    this.element = this.init();
    this.connected();
  }

  connected() {
    this.replaceChildren(this.element);
  }
}

class Table extends ComponentBase {
  constructor(options) {
    super({
      tagName: 'table',
      ...options,
    });
  }

  connected() {
    super.connected();
  }
}

class GridView extends HTMLElement {
  connectedCallback() {
    this.replaceChildren(
      new ComponentBase({
        tagName: 'div',
        attrs: {
          textContent: 'Ahoj',
        },
      })
    );
  }
}

customElements.define('my-table', Table);
customElements.define('my-grid', GridView);
