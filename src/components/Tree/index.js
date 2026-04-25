import createTemplate from '../../infrastructure/template.js';
import createComponent from '../../infrastructure/component.js';

export default (handler) => {
  const template =
    createTemplate(`<link href="./src/index.css" rel="stylesheet" />
<ul>
  <slot></slot>
</ul>`);

  const itemTemplate = createTemplate(`<tree-item></tree-item>`);

  const items = (() => {
    const template = createTemplate(`<tree-item></tree-item>`);

    return (items) => {
      return items.map((i) => {
        const element = template.content.cloneNode(true);

        element.children[0].dataset.title = i;

        return element;
      });
    };
  })();

  return class extends createComponent(template) {
    #items = ['1', '2', '3'];

    connectedCallback() {
      super.connectedCallback();

      this.replaceChildren(...items(this.#items));
    }
  };
};
