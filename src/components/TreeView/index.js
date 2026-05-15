import {
  createBehavior,
  createFragment,
  createTemplate,
  useTemplate,
} from "./../../lib";

const itemTemplate = createTemplate(`<li is="app-treeitem"></li>`);

export default (Base) =>
  class Self extends createBehavior(Base) {
    static #itemTemplate = (dataset) => {
      const { fragment, element } = useTemplate(itemTemplate, (fragment) => {
        const element = fragment.children[0];

        dataset && Object.assign(element.dataset, dataset);

        return {
          element,
        };
      });

      return fragment;
    };

    async mounted() {
      !this.dataset.level && this.classList.add("blocks");

      await this.renderChildren();
    }

    async renderChildren() {
      const { default: getItems } = await import("./../../services/TreeView");
      const [children, items] = getItems(this.dataset.id);

      this.append(
        createFragment(children, (child) => {
          const level = parseInt(this.dataset.level ?? "1");
          const dataset = {
            id: child,
            level,
          };

          level > 1 && (dataset.label = items[child].title);

          return Self.#itemTemplate(dataset);
        }),
      );
    }
  };
