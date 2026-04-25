const $refs = (fragment) => {
  return Object.fromEntries(
    [...fragment.querySelectorAll('[data-ref]')].map((element) => [
      element.dataset.ref,
      element,
    ])
  );
};

class Template {
  constructor(innerHTML) {
    const template = document.createElement('template');

    template.innerHTML = innerHTML;

    return template;
  }
}

class Fragment {
  static #createElement(tagName, o) {
    const element = document.createElement(tagName);

    if (o) {
      const { style, dataset, content, ...options } = o;
      if (style) Object.assign(element.style, style);
      if (dataset) Object.assign(element.dataset, dataset);

      Object.assign(element, options);
    }

    return element;
  }

  static #createFragment(o) {
    const fragment = document.createDocumentFragment();

    for (const key of Object.keys(o)) {
      const { style, dataset, content, ...options } = o[key];
      const element = document.createElement(key);

      if (style) Object.assign(element.style, style);
      if (dataset) Object.assign(element.dataset, dataset);

      Object.assign(element, options);

      if (content) element.append(createFragment(content));

      fragment.appendChild(element);
    }

    return fragment;
  }

  constructor(p1, p2) {
    switch (typeof p1) {
      case 'string':
        return Fragment.#createElement(p1, p2);

      case 'object':
        return Fragment.#createFragment(p1);
    }
  }
}

class List {
  constructor(tagNameOrTemplate, array, callback) {
    const fragment = document.createDocumentFragment();
    const element =
      typeof tagNameOrTemplate === 'string'
        ? document.createElement(tagNameOrTemplate)
        : tagNameOrTemplate;

    fragment.append(
      ...array.map((item) => {
        const instance = element.cloneNode(true);

        callback(item, instance);

        return instance;
      })
    );

    return fragment;
  }
}

const toolbarButtons = {
  default: ['button1', 'button2', 'button3'],
};

class Toolbar extends HTMLElement {
  static #buttonTemplate = new Fragment('button');

  connectedCallback() {
    this.replaceChildren(
      new List(
        Toolbar.#buttonTemplate,
        toolbarButtons.default,
        (text, element) => {
          element.textContent = text;
        }
      )
    );
  }
}

class Application extends HTMLElement {}

customElements.define('my-toolbar', Toolbar);
customElements.define('my-application', Application);
