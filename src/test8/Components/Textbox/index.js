import { createTemplate, useTemplate, createState } from "./../../Core";

export default class Self extends HTMLElement {
	static #template = (() => {
		const template = createTemplate(`<input type="text"></input>`);

		return () =>
			useTemplate(template, (fragment) => {
				const input = fragment.children[0];

				return {
					input,
				};
			});
	})();

	template = {};

	connectedCallback() {
		const { fragment, ...template } = Self.#template();

		this.template = { ...template };
		this.append(fragment);

		this.connectState();
	}

	async connectState() {
		await Promise.all([customElements.whenDefined("my-state")]);

		const stateEl = document.getElementById(this.dataset.storeId);
		const { props, watch } = stateEl.state;

		this.template.input.value = props[this.dataset.propValue] ?? "";
		this.template.input.addEventListener("input", (event) => {
			props[this.dataset.propValue] = event.target.value;
		});

		watch(this.dataset.propValue, (event) => {
			this.template.input.value = event.detail.value ?? "";
		});
	}
}
