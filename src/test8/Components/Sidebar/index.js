import { createTemplate, useTemplate, createState } from "./../../Core";

export default class Self extends HTMLElement {
	static #template = (() => {
		const template = createTemplate(`<aside></aside>`);

		return () =>
			useTemplate(template, (fragment) => ({
				root: fragment.children[0],
			}));
	})();

	connectedCallback() {
		const { fragment, ...template } = Self.#template();

		this.append(fragment);
	}

	show() {
		this.classList.remove("collapsed");
	}

	hide() {
		this.classList.add("collapsed");
	}

	switch() {
		this.classList.toggle("collapsed");
	}
}
