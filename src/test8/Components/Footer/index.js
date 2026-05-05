import { createTemplate, useTemplate } from "./../../Core";

const template = createTemplate(``);

export default class Self extends HTMLElement {
	static #template = () =>
		useTemplate(template, (fragment) => {
			return {};
		});

	connectedCallback() {
		this.className = "application-footer";

		const { fragment, ...template } = Self.#template();

		this.append(fragment);
	}
}
