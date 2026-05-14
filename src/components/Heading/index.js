import { createTemplate, useTemplate, createBehavior } from "./../../lib";

export default (Base) =>
	class Self extends createBehavior(Base) {
		connectedCallback() {
			super.connectedCallback();
			this.textContent = this.dataset.title || "";
		}
	};
