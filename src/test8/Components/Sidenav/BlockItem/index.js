import { createTemplate, useTemplate } from "./../../../Core";

export default class Self extends HTMLLIElement {
	constructor() {
		super();

		if (!this.hasAttribute("is")) this.setAttribute("is", "sidenav-block-item");
	}

	connectedCallback() {
		Object.assign(this.style, {
			padding: "0.5rem 1rem",
			cursor: "pointer",
			color: "green",
		});
	}
}

customElements.define("sidenav-block-item", Self, { extends: "li" });
