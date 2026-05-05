import { createTemplate, useTemplate } from "./../../Core";

const template = createTemplate(`<h1>Hello!</h1><hr />`);

export default class Self extends HTMLElement {
	static #template = (options) =>
		useTemplate(template, (fragment) => {
			const h1 = fragment.children[0];

			const x = { h1 };

			Object.assign(x, options);

			return {
				h1,
			};
		});

	connectedCallback() {
		const { fragment, ...template } = Self.#template({
			h1: {
				style: {
					color: "green",
					fontSize: "3rem",
				},
			},
		});

		this.append(fragment);
	}
}
