import { createTemplate, useTemplate, createState } from "./../../../Core";

const { props, watch } = createState();

export default class Self extends HTMLElement {
	static #template = (() => {
		const template = createTemplate(`<button></button>`);

		return () =>
			useTemplate(template, (fragment) => {
				const button = fragment.children[0];

				return {
					button,
				};
			});
	})();

	template = {};

	connectedCallback() {
		const { fragment, ...template } = Self.#template();

		this.template = { ...template };

		this.template.button.textContent = props.collapsed ? "off" : "on";
		this.template.button.addEventListener("click", () => {
			props.collapsed = !props.collapsed;
		});

		watch("collapsed", (event) => {
			this.template.button.textContent = event.detail.value ? "off" : "on";
		});

		this.append(fragment);
	}
}
