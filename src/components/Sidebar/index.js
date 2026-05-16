import { createTemplate, useTemplate, createBehavior, createFragment, useState } from "./../../lib";

const template = createTemplate(`<ul is="app-expandmenu"></ul>`);

export default (Base) =>
	class Self extends createBehavior(Base) {
		static #template = () => useTemplate(template);

		mounted() {
			const { fragment } = Self.#template();

			this.append(fragment);
		}
	};
