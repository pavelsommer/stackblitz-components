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
    get level() {
      return parseInt(this.dataset.level ?? "1");
    }

    async mounted() {
      const { props, watch } = await useState({
        id: this.dataset.stateId,
      });

      const items = getItems(this.dataset.id);

      this.append(
        createFragment(items[0], (item, index) => {
          const props = {
            className:
              this.level === 1 && index === 0
                ? "ui-menu-item expanded"
                : "ui-menu-item",

            dataset: {
              id: item,
              label: items[1][item].label,
              level: this.level,
            },
          };

          return useTemplate(template, (fragment) => {
            const menuItem = fragment.children[0];
            Object.assignProps(menuItem, props);

            // TODO: move this to Item component?
            props.dataset.level === 1 &&
              watch(
                "sidenavArea",
                (event) => {
                  if (event.detail.value === item)
                    menuItem.classList.add("expanded");
                  else menuItem.classList.remove("expanded");
                },
                this.abortSignal,
              );
          }).fragment;
        }),
      );
    }
  };
