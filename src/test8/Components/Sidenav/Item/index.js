import { createTemplate, useTemplate, defineBehavior } from "./../../../Core";

const behavior = (Base) =>
	class Self extends defineBehavior(Base) {
		connectedCallback() {
			super.connectedCallback();
		}
	};

customElements.define("sidenav-item", class extends behavior(HTMLLIElement) {}, {
	extends: "li",
});
