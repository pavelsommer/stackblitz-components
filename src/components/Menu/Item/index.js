import { createTemplate, useTemplate, createBehavior, createFragment, useState } from "@lib";

export default (Base) =>
	class Self extends createBehavior(Base) {
		mounted() {
			this.textContent = this.dataset.label;
		}
	};
