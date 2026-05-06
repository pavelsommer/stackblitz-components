import { createTemplate, useTemplate } from "./../../Core";

const contentTemplate = createTemplate(`<button is="sidebar-switch"></button>`);

export default class Self extends HTMLElement {
	static #contentTemplate = () =>
		useTemplate(contentTemplate, (fragment) => {
			return {};
		});

	connectedCallback() {
		const { fragment } = Self.#contentTemplate();

		this.append(fragment);
	}
}

customElements.define("application-header", Self, { extends: "header" });
