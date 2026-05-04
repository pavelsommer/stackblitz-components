import { createTemplate, useTemplate } from "./../../Core";

import state from "./State";

const { props, watch } = state;

export default class Self extends HTMLElement {
  static #template = (() => {
    const template = createTemplate(`<aside></aside>`);

    return () =>
      useTemplate(template, (fragment) => {
        const root = fragment.children[0];

        return {
          root,
        };
      });
  })();

  set collapsed(value) {
    if (value) this.classList.add("collapsed");
    else this.classList.remove("collapsed");
  }

  connectedCallback() {
    const { fragment, ...template } = Self.#template();

    this.collapsed = props.collapsed;
    watch("collapsed", (event) => {
      this.collapsed = event.detail.value;
    });

    this.append(fragment);
  }
}
