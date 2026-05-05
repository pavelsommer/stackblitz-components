import { createTemplate, useTemplate } from "./../../Core";

const template = createTemplate(``);

export default class Self extends HTMLElement {
	static #template = () =>
		useTemplate(template, (fragment) => {
			const header = fragment.children[0];

			return {
				footer,
			};
		});

	connectedCallback() {
		this.className = "application-footer";

		const { fragment, ...template } = Self.#template();

		this.append(fragment);
	}
}
