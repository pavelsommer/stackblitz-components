import { createTemplate, useTemplate } from "./../../../Core";
await import("./../BlockItem");

const itemTemplate = createTemplate(`<li is="sidenav-block-item"></li>`);

export default class Self extends HTMLUListElement {
	static #itemTemplate = (options) =>
		useTemplate(itemTemplate, (fragment) => {
			const item = fragment.children[0];

			options && Object.assign(item, options);
			options?.style && Object.assign(item.style, options.style);

			return {
				item,
			};
		});

	#list = null;

	connectedCallback() {
		this.renderContent();
	}

	mapUser(source) {
		return {
			textContent: source.name,
		};
	}

	mapBlock(source) {
		return {
			textContent: source.id,
		};
	}

	async renderUsers(response, target) {
		const users = await response.json();
		const content = document.createDocumentFragment();

		for (const user of users) {
			const { fragment } = target(this.mapUser(user));
			content.append(fragment);
		}

		return content;
	}

	async renderBlocks(response, target) {
		const blocks = await response.json();
		const content = document.createDocumentFragment();

		for (const block of blocks) {
			const { fragment } = target(this.mapBlock(block));
			content.append(fragment);
		}

		return content;
	}

	async renderContent() {
		this.replaceChildren(
			await this.renderBlocks(await fetch("/src/test8/api/sidenav/index.json"), Self.#itemTemplate),
		);
	}
}

customElements.define("sidenav-block-list", Self, { extends: "ul" });
