import { createTemplate, useTemplate } from "./../../Core";
import state from "./State";

const { props, watch } = state;

console.log(props);

export default class Self extends HTMLElement {
	static #template = (() => {
		const template = createTemplate(``);

		return () =>
			useTemplate(template, (fragment) => {
				return {};
			});
	})();

	set collapsed(value) {
		if (value) this.classList.add("collapsed");
		else this.classList.remove("collapsed");
	}

	connectedCallback() {
		this.className = "application-sidebar";

		const { fragment, ...template } = Self.#template();

		this.collapsed = props.collapsed;
		watch("collapsed", (event) => {
			this.collapsed = event.detail.value;
		});

		this.append(fragment);
	}
}
