import { createTemplate, useTemplate } from "./../../Core";

const template = createTemplate(`<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>`);

export default class Self extends HTMLElement {
	static #template = () =>
		useTemplate(template, (fragment) => {
			const root = fragment.children[0];

			return {
				root,
			};
		});

	connectedCallback() {
		const { fragment, ...template } = Self.#template();

		this.append(fragment);
	}
}
