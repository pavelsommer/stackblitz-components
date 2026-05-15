import {
  createBehavior,
  createFragment,
  createTemplate,
  useTemplate,
} from "./../../../lib";

const childrenTemplate = createTemplate(
  `<div class="items"><div class="items__inner"><ul is="app-treeview"></ul></div></div>`,
);

export default (Base) =>
  class Self extends createBehavior(Base) {
    static #childrenTemplate = (dataset) => {
      const { fragment, element } = useTemplate(
        childrenTemplate,
        (fragment) => {
          const element = fragment.children[0].children[0].children[0];

          dataset && Object.assign(element.dataset, dataset);

          return {
            element,
          };
        },
      );

      return fragment;
    };

    static #observedAttributes = ["label"];

    static get observedAttributes() {
      return Self.#observedAttributes;
    }

    async mounted() {
      this.dataset.label && (this.textContent = this.dataset.label);

      this.classList.add(
        parseInt(this.dataset.level ?? "1") > 1 ? "item" : "block",
      );

      await this.renderChildren();
    }

    async renderChildren() {
      const { default: getItems } =
        await import("./../../../services/TreeView");
      const [children, items] = getItems(this.dataset.id);

      if (children.length < 1) return;

      this.append(
        Self.#childrenTemplate({
          id: this.dataset.id,
          label: this.dataset.label,
          level: parseInt(this.dataset.level ?? "0") + 1,
        }),
      );
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "label") this.textContent = newValue;
    }
  };
