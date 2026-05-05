import { createTemplate, useTemplate } from "./../../Core";

const template = createTemplate(`<h1>Hello!</h1><hr />`);

export default class Self extends HTMLElement {
	static #template = (options) =>
		useTemplate(template, (fragment) => {
			const h1 = fragment.children[0];

			options?.h1?.style && Object.assign(h1.style, options.h1.style);

			return {
				h1,
			};
		});

	#options = {
		h1: {
			style: {
				color: "green",
				fontSize: "3rem",
			},
		},
	};

	connectedCallback() {
		const { fragment, ...template } = Self.#template(this.options);

		this.append(fragment);
	}
}
