const template = (() => {
  const template = document.createElement('template');

  template.innerHTML = `<tbody>
</tbody>`;

  return template.content;
})();

const root = (options) => {
  options = options ?? {};

  const fragment = template.cloneNode(true);
  const element = fragment.children[0];
  const { style, dataset, ...props } = options;

  if (style) Object.assign(element.style, style);
  if (dataset) Object.assign(element.dataset, dataset);

  Object.assign(element, props);

  return { fragment, element };
};

export default class Self extends HTMLElement {
  #root;
  #table;

  constructor(table) {
    super();
    this.#table = table;
  }

  connectedCallback() {
    const { fragment, element } = root();

    this.#root = element;

    this.replaceWith(fragment);
  }
}
