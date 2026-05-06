import { createTemplate, useTemplate } from "./../../Core";

const template = createTemplate(`<span>Hello!</span>`);

export default class Self extends HTMLHeadingElement {
	static #template = (options) =>
		useTemplate(template, (fragment) => {
			const text = fragment.children[0];

			options?.text && Object.assign(text, options.text);
			options?.text?.style && Object.assign(text.style, options.text.style);

			return {
				text,
			};
		});

	#options = {
		self: {
			style: {
				color: "green",
				fontSize: "3rem",
			},
		},
	};

	connectedCallback() {
		const { fragment } = Self.#template({
			text: {
				textContent: this.dataset.text || "Heading",
			},
		});

		this.#options?.self?.style && Object.assign(this.style, this.#options.self.style);

		this.append(fragment);
	}
}

customElements.define("application-heading", Self, { extends: "h1" });
