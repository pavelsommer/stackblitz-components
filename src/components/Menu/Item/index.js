import {
  createTemplate,
  useTemplate,
  createBehavior,
  createFragment,
  useState,
} from "@lib";
import { getItems } from "@services/Sidenav/Items";

const separatorTemplate = createTemplate(
  `<div class="ui-menu-item-group-separator"></div>`,
);

const titleTemplate = createTemplate(`<div class="ui-menu-item-title">
  <span class="ui-menu-item-text">
  </span>
</div>
<div class="ui-menu-item-divider"></div>`);

const itemsTemplate = createTemplate(`<div class="menu-container">
  <ul is="ui-menu" class="ui-menu">
  </ul>
</div>`);

export default (Base) =>
  class Self extends createBehavior(Base) {
    async mounted() {
      const items = getItems(this.dataset.id);
      const item = items[1][this.dataset.id];
      const hasChildren = items[0].length > 0;

      const props = {
        separator: item.separator ?? false,

        text: {
          textContent: item.label,
        },
      };

      this.append(
        useTemplate(titleTemplate, (fragment) => {
          const title = fragment.children[0];
          const text = title.children[0];
          const divider = fragment.children[1];

          Object.assignProps(text, props?.text);

          props?.separator &&
            divider.append(useTemplate(separatorTemplate).fragment);

          if (hasChildren) {
            const props = {
              menu: {
                dataset: {
                  id: this.dataset.id,
                },
              },
            };

            fragment.append(
              useTemplate(itemsTemplate, (fragment) => {
                const container = fragment.children[0];
                const menu = container.children[0];

                title.addEventListener(
                  "click",
                  (event) => container.classList.toggle("expanded"),
                  { signal: this.abortSignal },
                );

                Object.assignProps(menu, props?.menu);
              }).fragment,
            );
          }
        }).fragment,
      );
    }
  };
