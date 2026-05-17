import {
  createTemplate,
  useTemplate,
  createBehavior,
  createFragment,
  useState,
} from "@lib";
import { getItems } from "@services/Sidenav/Items";

const template = createTemplate(
  `<li is="ui-menu-item" class="ui-menu-item"></li>`,
);

export default (Base) =>
  class Self extends createBehavior(Base) {
    async mounted() {
      const { props, watch } = await useState({
        id: this.dataset.stateId,
      });

      const items = getItems(this.dataset.id);

      this.append(
        createFragment(items[0], (item) => {
          const props = {
            dataset: {
              id: item,
              label: items[1][item].label,
            },
          };

          return useTemplate(template, (fragment) => {
            const element = fragment.children[0];
            Object.assignProps(element, props);
          }).fragment;
        }),
      );
    }
  };
