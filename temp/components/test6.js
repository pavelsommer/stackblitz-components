const createTemplate = (innerHTML) => {
  const template = document.createElement('template');

  template.innerHTML = innerHTML;

  return template;
};

const createElement = (tagName, o) => {
  const fragment = document.createElement(tagName);

  // TODO:
  if (o) {
    const { style, dataset, content, ...options } = o;
    if (style) Object.assign(fragment.style, style);
    if (dataset) Object.assign(fragment.dataset, dataset);

    Object.assign(fragment, options);

    // for (const key of Object.keys(o)) {
    //   const { style, dataset, content, ...options } = o[key];
    //   const element = document.createElement(key);

    //   if (style) Object.assign(element.style, style);
    //   if (dataset) Object.assign(element.dataset, dataset);

    //   Object.assign(element, options);

    //   if (content) element.append(createFragment(content));

    //   fragment.appendChild(element);
    // }
  }

  return fragment;
};

const createFragment = (o) => {
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
};

class Toolbar extends HTMLElement {
  static #button =
    createTemplate(`<button class="group flex items-center px-2 py-2 bg-red-50 rounded transition cursor-pointer">
</button>`);

  static #h1 = createElement('h1');

  connectedCallback() {
    const items = Array(50);
    const fragment = document.createDocumentFragment();

    requestAnimationFrame(() => {
      for (let i = 0, len = items.length; i < len; i++) {
        const template = Toolbar.#h1.cloneNode(true);

        template.textContent = i.toString();

        fragment.appendChild(template);
      }

      this.replaceChildren(fragment);
    });
  }
}

customElements.define('my-toolbar', Toolbar);
