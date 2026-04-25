const templateRoot = (() => {
  const template = document.createElement('template');

  template.innerHTML = `<th>
</th>`;

  return template.content;
})();

const root = (options) => {
  options = options ?? {};

  const fragment = templateRoot.cloneNode(true);
  const element = fragment.children[0];
  const { style, dataset, ...props } = options;

  if (style) Object.assign(element.style, style);
  if (dataset) Object.assign(element.dataset, dataset);

  Object.assign(element, props);

  return { fragment, element };
};

export default class Self extends HTMLElement {
  #fieldName;
  #title;
  #root;

  connectedCallback() {
    this.#fieldName = this.dataset.fieldName;
    this.#title = this.dataset.title;

    const { fragment, element } = root({
      textContent: this.#title,
      style: {
        fontSize: '1.4rem',
        color: 'red',
      },
    });

    this.#root = element;
    this.replaceWith(fragment);
  }
}
