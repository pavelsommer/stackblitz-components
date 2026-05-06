import { createTemplate, useTemplate } from "./../../../Core";

export default class Self extends HTMLLIElement {
	constructor() {
		super();

		!this.hasAttribute("is") && this.setAttribute("is", "sidenav-block-item");
	}

	connectedCallback() {
		this.#connectState();
	}

	async #connectState() {
		const { props, watch } = (await import("./../../Sidebar/State")).default;

		this.#update(props.blockId === this.dataset.id);

		watch("blockId", (event) => {
			this.#update(event.detail.value === this.dataset.id);
		});
	}

	#update(active) {
		if (active) this.classList.add("active");
		else this.classList.remove("active");
	}
}

customElements.define("sidenav-block-item", Self, { extends: "li" });
