import { createTemplate, useTemplate } from "./../../../Core";
import state from "./../State";

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
		const { props, subscribe } = state;

		this.template = { ...template };

		this.template.button.textContent = props.collapsed ? "off" : "on";
		this.template.button.addEventListener("click", () => {
			props.collapsed = !props.collapsed;
		});

		subscribe((event) => {
			switch (event.detail.key) {
				case "collapsed":
					this.template.button.textContent = event.detail.value ? "off" : "on";

					break;
			}
		});

		this.append(fragment);
	}
}
