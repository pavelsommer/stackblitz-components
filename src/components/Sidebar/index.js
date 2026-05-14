import {
	createTemplate,
	useTemplate,
	createBehavior,
	createFragment,
	useState,
} from "./../../lib";

const template = createTemplate(`<ul is="app-treeview"></ul>`);

export default (Base) =>
	class Self extends createBehavior(Base) {
		static #template = () =>
			useTemplate(template, (fragment) => {
				const ul = fragment.children[0];

				return {
					ul,
				};
			});

		mounted() {
			const { fragment } = Self.#template();

			this.append(fragment);
		}
	};
