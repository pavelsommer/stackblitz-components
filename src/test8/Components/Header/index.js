import { createTemplate, useTemplate } from "./../../Core";

const template = createTemplate(`<application-sidebar-switch></application-sidebar-switch>`);

export default class Self extends HTMLElement {
	static #template = () =>
		useTemplate(template, (fragment) => {
			return {};
		});

	connectedCallback() {
		this.className = "application-header";

		const { fragment, ...template } = Self.#template();

		this.append(fragment);
	}
}

customElements.define("application-header", Self);
