import { createTemplate, useTemplate } from "./../../Core";

const template = createTemplate(``);

export default class Self extends HTMLElement {
	static #template = () =>
		useTemplate(template, (fragment) => {
			const header = fragment.children[0];

			return {
				header,
			};
		});

	connectedCallback() {
		this.className = "application-header";

		const { fragment, ...template } = Self.#template();

		this.append(fragment);
	}
}
