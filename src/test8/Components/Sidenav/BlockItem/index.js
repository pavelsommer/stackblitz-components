import * as vali from "valibot";
import { createTemplate, useTemplate } from "./../../../Core";

await import("./../Item/Title");

const titleTemplate = createTemplate(`<div is="sidenav-item-title">
</div>`);

const contentTemplate = createTemplate(`<div class="items">
	<div class="items__inner">
		<ul>
		</ul>
	</div>
</div>`);

export default class Self extends HTMLLIElement {
  static #renderTitle = (sidenav, options) => {
    const { fragment, titleEl } = useTemplate(titleTemplate, (fragment) => {
      return {
        titleEl: fragment.children[0],
      };
    });

    titleEl.textContent = options.textContent ?? "";
    titleEl.addEventListener("click", () => {
      console.log("Hello!");
    });

    return fragment;
  };

  static #renderContent = (sidenav, options) => {
    const { fragment, itemsEl } = useTemplate(contentTemplate, (fragment) => {
      return {
        itemsEl: fragment.children[0],
      };
    });

    return fragment;
  };

  connectedCallback() {
    this.#connectState();
    this.#render();
  }

  async #connectState() {
    const { props, watch } = (await import("./../../Sidebar/State")).default;

    this.#update(props.blockId === this.dataset.id);
    this.classList.add("mounted");

    watch("blockId", (event) => {
      this.#update(event.detail.value === this.dataset.id);
    });
  }

  async #render() {
    const sidenav = (await import("./../Items")).default;
    const refs = sidenav.refs[this.dataset.id];
    const items = sidenav.items;

    for (const ref of refs) {
      this.append(Self.#renderContent(sidenav, {}));
    }
  }

  #update(active) {
    if (active) this.classList.add("active");
    else this.classList.remove("active");
  }
}

customElements.define("sidenav-block-item", Self, { extends: "li" });
