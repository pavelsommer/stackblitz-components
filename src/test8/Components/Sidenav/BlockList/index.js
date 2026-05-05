import { createTemplate, useTemplate } from "./../../../Core";

const containerTemplate = createTemplate(`<ul></ul>`);
const itemTemplate = createTemplate(`<li></li>`);

export default class Self extends HTMLElement {
	static containerTemplate = () =>
		useTemplate(containerTemplate, (fragment) => {
			const list = fragment.children[0];

			return {
				list,
			};
		});

	static #itemTemplate = (options) =>
		useTemplate(itemTemplate, (fragment) => {
			const item = fragment.children[0];

			options && Object.assign(item, options);
			options?.style && Object.assign(item.style, options.style);

			return {
				item: item,
			};
		});

	#list = null;

	connectedCallback() {
		const { fragment, ...refs } = Self.containerTemplate();

		this.#list = refs.list;

		this.append(fragment);
		this.renderBlocks();
	}

	async renderBlocks() {
		const response = await fetch("https://jsonplaceholder.typicode.com/users");
		const users = await response.json();
		const content = document.createDocumentFragment();

		for (const user of users) {
			const { fragment } = Self.#itemTemplate({
				textContent: user.name,
				className: "block",
			});

			content.append(fragment);
		}

		this.#list.append(content);
	}
}

customElements.define("sidenav-block-list", Self);
